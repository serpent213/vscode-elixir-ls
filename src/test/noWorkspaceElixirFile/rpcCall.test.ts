import * as assert from "node:assert";
import * as vscode from "vscode";
import type { ElixirLS } from "../../extension";
import { getExtension } from "../utils";

let extension: vscode.Extension<ElixirLS>;

suite("RPC Call Command Tests", () => {
  vscode.window.showInformationMessage("Start RPC call tests.");

  suiteSetup(async () => {
    extension = getExtension();
  });

  test("extension.rpcCall command executes successfully", async () => {
    const result = await vscode.commands.executeCommand(
      "extension.rpcCall",
      "foo",
      "23",
    );

    assert.ok(result, "RPC call should return a result");
    assert.ok(typeof result === "string", "Version should be a string");
  }).timeout(3000);
});
