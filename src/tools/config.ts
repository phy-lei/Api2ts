import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { API2TS_CONFIG_KEY, CONFIG_FILE_NAME, WORKSPACE_PATH } from './const';

export interface ApiConfig {
  token: string
  baseURL: string
}

/**
 * 读取工作区配置文件
 */
const readApi2tsConfigFile = (configFilePath: string) => {
  if (WORKSPACE_PATH)
    return fs.readFileSync(path.join(WORKSPACE_PATH, configFilePath));

  return '';
};

/**
 * 获取vscode配置
 */
export const getCodeConfig = (configKey: string): string | undefined => {
  return vscode.workspace.getConfiguration().get(configKey);
};


/**
 * 初始配置文件
 */
export const initConfig = (): ApiConfig => {
  let config: ApiConfig = {
    token: '',
    baseURL: '',
  };
  const codeConfig = getCodeConfig(API2TS_CONFIG_KEY);
  if (codeConfig)
    config = JSON.parse(readApi2tsConfigFile(codeConfig).toString());
  else config = JSON.parse(readApi2tsConfigFile(CONFIG_FILE_NAME).toString());

  return config;
};
