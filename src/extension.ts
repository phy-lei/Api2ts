// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { transformFromSelection } from './commands/commands';
import useConfig from './tools/useConfig';

const { initConfig } = useConfig();
const config = initConfig();

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'Api2ts.codeSelection',
      transformFromSelection(config)
    )
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
