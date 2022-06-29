import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { API2TS_CONFIG_KEY, WORKSPACE_PATH } from './const';

export default () => {
  /**
   * 获取vscode配置
   */
  const getCodeConfig = (configKey: string): string | undefined => {
    return vscode.workspace.getConfiguration().get(configKey);
  };

  /**
   * 读取工作区配置文件
   */
  const readApi2tsConfigFile = (configFilePath: string) => {
    if (WORKSPACE_PATH) {
      return fs.readFileSync(path.join(WORKSPACE_PATH, configFilePath));
    }
    return '';
  };

  /**
   * 初始配置文件
   */
  const initConfig = () => {
    let config: any = {};
    const codeConfig = getCodeConfig(API2TS_CONFIG_KEY);
    if (codeConfig) {
      config = JSON.parse(readApi2tsConfigFile(codeConfig).toString());
    } else {
      config = JSON.parse(
        readApi2tsConfigFile('Api2ts.config.json').toString()
      );
    }
    return config;
  };

  return {
    initConfig,
  };
};
