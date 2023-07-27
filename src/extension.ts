// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as path from 'path';
import * as vscode from 'vscode';
import { transformFromSelection, transformResponse } from './commands/commands';
import { initConfig, getCodeConfig as getCodeConfigPath, ApiConfig } from './tools/config';
import {
  API2TS_CONFIG_KEY,
  CONFIG_FILE_NAME,
  WORKSPACE_PATH,
  CODE_SELECTION_COMMAND,
  CODE_RESPONSE_COMMAND,
  UPDATE_CONFIG_COMMAND
} from './tools/const';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed


/**
 * 设置全局config变量
 */
const setGlobalConfig = (
  context: vscode.ExtensionContext,
  value: ApiConfig
) => {
  context.globalState.update(API2TS_CONFIG_KEY, value);
};

export function activate(context: vscode.ExtensionContext) {

  // 读取配置文件路径
  const workspaceConfigPath = path.join(
    WORKSPACE_PATH || '',
    getCodeConfigPath(API2TS_CONFIG_KEY) || CONFIG_FILE_NAME
  );


  setGlobalConfig(context, initConfig());

  context.subscriptions.push(
    vscode.commands.registerCommand(
      CODE_SELECTION_COMMAND,
      transformFromSelection(context)
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      CODE_RESPONSE_COMMAND,
      transformResponse(context)
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(UPDATE_CONFIG_COMMAND, () => {
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

      vscode.commands.executeCommand(UPDATE_CONFIG_COMMAND);
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() { }
