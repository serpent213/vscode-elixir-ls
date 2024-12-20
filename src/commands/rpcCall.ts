import * as vscode from "vscode";
import {
  type ExecuteCommandParams,
  ExecuteCommandRequest,
  State,
} from "vscode-languageclient";
import { ELIXIR_LS_EXTENSION_NAME } from "../constants";
import type { LanguageClientManager } from "../languageClientManager";

export function configureRpcCall(
  context: vscode.ExtensionContext,
  languageClientManager: LanguageClientManager,
) {
  const disposable = vscode.commands.registerCommand(
    "extension.rpcCall",
    async (rpc_node, rpc_module, rpc_function, rpc_arguments) => {
      const extension = vscode.extensions.getExtension(
        ELIXIR_LS_EXTENSION_NAME,
      );
      const editor = vscode.window.activeTextEditor;
      if (!extension || !editor) {
        return;
      }

      const uri = editor.document.uri;
      const clientPromise = languageClientManager.getClientPromiseByDocument(
        editor.document,
      );

      if (!clientPromise) {
        console.error(
          `ElixirLS: no language client for document ${uri.fsPath}`,
        );
        return;
      }

      const client = await clientPromise;

      if (!client.initializeResult) {
        console.error(
          `ElixirLS: unable to execute command on server ${
            client.name
          } in state ${State[client.state]}`,
        );
        return;
      }

      const command =
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        client.initializeResult.capabilities.executeCommandProvider?.commands.find(
          (c) => c.startsWith("rpcCall:"),
        )!;

      const params: ExecuteCommandParams = {
        command: command,
        arguments: [rpc_node, rpc_module, rpc_function, rpc_arguments],
      };

      const res: Record<string, string> = await client.sendRequest(
        ExecuteCommandRequest.type,
        params,
      );

      return res;
    },
  );

  context.subscriptions.push(disposable);
}
