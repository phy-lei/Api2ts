import { ViewColumn, window } from 'vscode';

export function getViewColumn() {
  const activeEditor = window.activeTextEditor;
  if (!activeEditor)
    return ViewColumn.One;

  switch (activeEditor.viewColumn) {
    case ViewColumn.One:
      return ViewColumn.Two;
    case ViewColumn.Two:
      return ViewColumn.Three;
  }

  return activeEditor.viewColumn;
}

export function getSelectedText(): string {
  const { selection, document } = window.activeTextEditor!;
  return document.getText(selection).trim();
}

export function handleError(error: Error) {
  window.showErrorMessage(error.message);
}

export function parseJson(json: string): Promise<object> {
  const tryEval = (str: any) => eval(`const a = ${str}; a`);

  try {
    return Promise.resolve(JSON.parse(json));
  }
  catch (ignored) {}

  try {
    return Promise.resolve(tryEval(json));
  }
  catch (error) {
    return Promise.reject(new Error('Selected string is not a valid JSON'));
  }
}
