import * as vscode from 'vscode';

const { workspaceFolders } = vscode.workspace;

/** Api2ts vscode配置key */
export const API2TS_CONFIG_KEY = 'Api2ts.configFile';

/** 工作区路径 */
export const WORKSPACE_PATH = workspaceFolders
  ? workspaceFolders[0].uri.fsPath.replace(/\\/g, '/')
  : undefined;
