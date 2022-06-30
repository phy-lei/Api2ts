// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { transformFromSelection } from './commands/commands';
import useConfig from './tools/useConfig';
import { API2TS_CONFIG_KEY } from './tools/const';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

type ConfigType = ReturnType<typeof useConfig>['initConfig'];

/**
 * 设置全局config变量
 */
const setGlobalConfig = (
  context: vscode.ExtensionContext,
  value: ReturnType<ConfigType>
) => {
  context.globalState.update(API2TS_CONFIG_KEY, value);
};

export function activate(context: vscode.ExtensionContext) {
  const { initConfig } = useConfig();
  setGlobalConfig(context, initConfig());

  context.subscriptions.push(
    vscode.commands.registerCommand(
      'Api2ts.codeSelection',
      transformFromSelection(context)
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('Api2ts.api2tsUpdate', () => {
      setGlobalConfig(context, initConfig());
      vscode.window.showInformationMessage('配置更新完成');
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
