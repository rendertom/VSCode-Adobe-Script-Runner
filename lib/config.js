const vscode = require('vscode');

function update() {
	return vscode.workspace.getConfiguration('adobeScriptRunner');
}

module.exports.update = update;