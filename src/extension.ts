// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as path from 'path';
import * as vscode from 'vscode';
import { transformFromSelection, transformResponse } from './commands/commands';
import useConfig from './tools/useConfig';
import {
  API2TS_CONFIG_KEY,
  CONFIG_FILE_NAME,
  WORKSPACE_PATH,
} from './tools/const';

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
  const { initConfig, getCodeConfig } = useConfig();

  // 读取配置文件路径
  const workspaceConfigPath = path.join(
    WORKSPACE_PATH || '',
    getCodeConfig(API2TS_CONFIG_KEY) || CONFIG_FILE_NAME
  );

  console.log('%c [ workspaceConfigPath ]', 'font-size:13px; background:pink; color:#bf2c9f;', workspaceConfigPath);

  setGlobalConfig(context, initConfig());

  context.subscriptions.push(
    vscode.commands.registerCommand(
      'Api2ts.codeSelection',
      transformFromSelection(context)
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      'Api2ts.codeResponse',
      transformResponse(context)
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('Api2ts.api2tsUpdate', () => {
      setGlobalConfig(context, initConfig());
      vscode.window.showInformationMessage('api2ts配置更新');
    })
  );

  /** 监听配置文件保存 更新配置 */
  context.subscriptions.push(
    vscode.workspace.onDidSaveTextDocument(({ languageId, fileName }) => {
      // 过滤非 Json 语言文件 且非配置文件
      if (languageId !== 'json' || fileName !== workspaceConfigPath)
        return

      vscode.commands.executeCommand('Api2ts.api2tsUpdate');
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() { }
