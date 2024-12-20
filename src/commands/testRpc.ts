import * as vscode from "vscode";
import type { LanguageClientManager } from "../languageClientManager";

export function configureTestRpc(
  context: vscode.ExtensionContext,
  languageClientManager: LanguageClientManager,
) {
  const disposable = vscode.commands.registerCommand(
    "extension.testRpc",
    async () => {
      console.log(
        "executeCommand:",
        await vscode.commands.executeCommand(
          "extension.rpcCall",
          "dev@squirrel",
          "Elixir.Ash.Resource.Info",
          "fields",
          ["__atom__Elixir.Heimdall.Members.Member"],
        ),
      );
    },
  );

  context.subscriptions.push(disposable);
}
