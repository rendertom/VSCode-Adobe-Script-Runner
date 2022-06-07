const buildCommand = require('./buildCommand.js');
const hostApps = require('./hostApps.js');
const vscode = require('vscode');

/**
 * @description Method is called when extension is activated.
 *              Extension is activated the very first time the command is executed.
 */
function activate() {
	hostApps.forEach(hostApp => {
		vscode.commands.registerCommand(
			`adobeScriptRunner.${hostApp.shortName}`,
			() => buildCommand(hostApp)
		);
	});
}

exports.activate = activate;
