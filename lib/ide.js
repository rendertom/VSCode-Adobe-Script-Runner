const vscode = require('vscode');

let ide = {
  showErrorMessage(string) {
    vscode.window.showErrorMessage(string);
  },

  showWarningMessage(string) {
    vscode.window.showWarningMessage(string);
  },

  showInformationMessage(string) {
    vscode.window.showInformationMessage(string);
  },
};

ide.config = {
  get() {
    const document = ide.editor.getDocument();
    return vscode.workspace.getConfiguration('adobeScriptRunner', document.uri);
  },

  getWorkspaceFolder() {
    const document = ide.editor.getDocument();
    return vscode.workspace.getWorkspaceFolder(document.uri);
  },
};

ide.editor = {
  ensureHasActiveTextEditor() {
    const activeTextEditor = ide.editor.getActiveTextEditor();
    if (!activeTextEditor) {
      throw ide.showInformationMessage('No active editor detected.');
    }

    return activeTextEditor;
  },

  ensereHasPath() {
    const path = ide.editor.getPath();
    if (!path) {
      throw ide.showInformationMessage('Document has no path.');
    }

    return path;
  },

  ensureHasText() {
    const text = ide.editor.getText();
    if (text.trim() === '') {
      throw ide.showInformationMessage('Document has no content.');
    }

    return text;
  },

  getActiveTextEditor() {
    return vscode.window.activeTextEditor;
  },

  getDocument() {
    const activeTextEditor = ide.editor.ensureHasActiveTextEditor();
    return activeTextEditor.document;
  },

  getPath() {
    const document = ide.editor.getDocument();
    return document.fileName;
  },

  getText() {
    const document = ide.editor.getDocument();
    return document.getText();
  },

  hasPath() {
    const document = ide.editor.getDocument();
    return !document.isUntitled;
  },

  isDirty() {
    const document = ide.editor.getDocument();
    return document.isDirty && ide.editor.hasPath();
  },

  save() {
    const document = ide.editor.getDocument();
    document.save();
  },
};

module.exports = ide;
