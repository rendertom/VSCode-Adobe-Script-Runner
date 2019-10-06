const vscode = require('vscode');

function get() {
	return vscode.workspace.getConfiguration('adobeScriptRunner');
}

module.exports.get = get;