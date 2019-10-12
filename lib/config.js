const editor = require('./editor.js');
const vscode = require('vscode');

const config = {
	get() {
		return vscode.workspace.getConfiguration('adobeScriptRunner', editor.getDocument().uri);
	},

	getWorkspaceFolder() {
		return vscode.workspace.getWorkspaceFolder(editor.getDocument().uri);
	},
};

module.exports = config;