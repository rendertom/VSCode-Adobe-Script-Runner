const editor = require('./editor.js');
const file = require('./static/file.js');
const message = require('./message.js');
const path = require('path');
const vscode = require('vscode');

const config = {
	get() {
		return vscode.workspace.getConfiguration('adobeScriptRunner', editor.getDocument().uri);
	},

	getScriptFile() {
		let workspacePath = process.env.PWD;

		const workspaceFolder = this.getWorkspaceFolder();
		if (workspaceFolder) {
			workspacePath = workspaceFolder.uri.fsPath;
		}

		let scriptFile = path.join(workspacePath, this.get().executeThis);
		scriptFile = path.resolve(scriptFile);

		if (!file.exists(scriptFile)) {
			throw message.info(`File does not exist at path ${scriptFile}`);
		} else if (!file.isFile(scriptFile)) {
			throw message.info(`Path is not a file ${scriptFile}`);
		}

		return scriptFile;
	},

	getWorkspaceFolder() {
		return vscode.workspace.getWorkspaceFolder(editor.getDocument().uri);
	},
};


module.exports = config;