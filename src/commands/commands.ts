import * as vscode from 'vscode';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import JsonToTS from 'json-to-ts';
import { getViewColumn, getSelectedText, parseJson } from '../tools/utils';
import request from '../request/request';

export const transformFromSelection =
  (config: Record<string, string>) => async () => {
    console.log(config, '123123');

    const tmpFilePath = path.join(os.tmpdir(), 'json-to-ts.ts');
    const tmpFileUri = vscode.Uri.file(tmpFilePath);

    const params = await parseJson(getSelectedText());
    console.log(params, 'params');

    const json = await request({
      ...params,
      ...config,
    });
    const interfaces = JsonToTS(json.data);

    fs.writeFileSync(tmpFilePath, interfaces.join('\n'));

    vscode.commands.executeCommand('vscode.open', tmpFileUri, getViewColumn());
  };
