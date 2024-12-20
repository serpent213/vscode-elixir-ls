import type * as vscode from "vscode";
import { configureCopyDebugInfo } from "./commands/copyDebugInfo";
import { configureExpandMacro } from "./commands/expandMacro";
import { configureManipulatePipes } from "./commands/manipulatePipes";
import { configureMixClean } from "./commands/mixClean";
import { configureRestart } from "./commands/restart";
import { configureRpcCall } from "./commands/rpcCall";
import { configureTestRpc } from "./commands/testRpc";
import type { LanguageClientManager } from "./languageClientManager";

export function configureCommands(
  context: vscode.ExtensionContext,
  languageClientManager: LanguageClientManager,
) {
  configureCopyDebugInfo(context);
  configureExpandMacro(context, languageClientManager);
  configureRestart(context, languageClientManager);
  configureMixClean(context, languageClientManager, false);
  configureMixClean(context, languageClientManager, true);
  configureManipulatePipes(context, languageClientManager, "fromPipe");
  configureManipulatePipes(context, languageClientManager, "toPipe");
  configureRpcCall(context, languageClientManager);
  configureTestRpc(context, languageClientManager);
}
