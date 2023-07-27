import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import * as vscode from 'vscode';
import JsonToTS from 'json-to-ts';
import { getSelectedText, getViewColumn, parseJson } from '../tools/utils';
import request from '../request/request';
import { API2TS_CONFIG_KEY } from '../tools/const';

const jsonFormat = require('json-format');
interface ApiConfig {
  token: string
  baseURL: string
}

const tmpFilePath = path.join(os.tmpdir(), 'api-to-ts.ts');
const tmpFileUri = vscode.Uri.file(tmpFilePath);

const httpRequest
  = async (context: vscode.ExtensionContext) => {
    const config: ApiConfig = context.globalState.get(API2TS_CONFIG_KEY) ?? {
      token: '',
      baseURL: '',
    };

    const params = await parseJson(getSelectedText());

    return await request({
      ...params,
      ...config,
    });

  };

/**
 * 文本select后 请求接口 转ts
 */
export const transformFromSelection
  = (context: vscode.ExtensionContext) => async () => {
    const json = await httpRequest(context);
    const interfaces = JsonToTS(json.data);

    fs.writeFileSync(tmpFilePath, interfaces.join('\n'));
    vscode.commands.executeCommand('vscode.open', tmpFileUri, getViewColumn());
  };

/**
 * 文本select后 请求接口 查看响应数据
 */
export const transformResponse
  = (context: vscode.ExtensionContext) => async () => {
    const json = await httpRequest(context);

    // 输出响应数据 会json美化
    fs.writeFileSync(tmpFilePath, jsonFormat(json.data));
    vscode.commands.executeCommand('vscode.open', tmpFileUri, getViewColumn());
  };
