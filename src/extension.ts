// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { json } from 'stream/consumers';
import * as vscode from 'vscode';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import request from './request/request';
import JsonToTS from 'json-to-ts';
import { getViewColumn } from './utils';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  // console.log('Congratulations, your extension "Api2ts" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    'Api2ts.helloWorld',
    async () => {
      const tmpFilePath = path.join(os.tmpdir(), 'json-to-ts.ts');
      const tmpFileUri = vscode.Uri.file(tmpFilePath);
      const params = {
        baseURL: 'https://sioc.chinaemt.com',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        url: '/tool/createTool/indicators/getCount',
        data: { ctParameterCategoryId: 85 },
      };
      const json = await request(params);
      console.log(json);

      const interfaces = JsonToTS(json.data);
      console.log(interfaces);

      fs.writeFileSync(tmpFilePath, interfaces.join('\n'));

      vscode.commands.executeCommand(
        'vscode.open',
        tmpFileUri,
        getViewColumn()
      );

      // const arr = JsonToTS(res);
      // console.log(JSON.stringify(arr));
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage('hello world');
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
