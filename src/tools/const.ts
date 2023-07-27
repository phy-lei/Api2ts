import * as vscode from 'vscode';

const { workspaceFolders } = vscode.workspace;

/** Api2ts vscode配置key */
export const API2TS_CONFIG_KEY = 'Api2ts.configFile';

/** 工作区路径 */
export const WORKSPACE_PATH = workspaceFolders
  ? workspaceFolders[0].uri.fsPath.replace(/\\/g, '/')
  : undefined;

/** 配置文件名 */
export const CONFIG_FILE_NAME = 'Api2ts.config.json';

/** 代码框选出ts命令key */
export const CODE_SELECTION_COMMAND = 'Api2ts.codeSelection'

/** 代码框选出http响应数据命令key */
export const CODE_RESPONSE_COMMAND = 'Api2ts.codeResponse'

/** 配置文件更新命令key */
export const UPDATE_CONFIG_COMMAND = 'Api2ts.api2tsUpdate'
