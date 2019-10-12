const buildCommand = require('./IDE Agnostic/buildCommand.js');
const hostApps = require('./IDE Agnostic/hostApps.js');
const vscode = require('vscode');

/**
 * @description Method is called when extension is activated.
 *              Extension is activated the very first time the command is executed.
 * @param {any} context vscode.ExtensionContext
 */
function activate(context) {
	hostApps.forEach(hostApp => {
		vscode.commands.registerCommand(
			`adobeScriptRunner.${hostApp.shortName}`,
			() => buildCommand(hostApp)
		);
	});
}

exports.activate = activate;
