const cp = require('child_process');
const getScriptFile = require('./getScriptFile.js');
const getShellCommand = require('./getShellCommand.js');

const message = require('../message.js');

/**
 * @description Implementation of the activation command.
 * @param {any} hostApp Object, entry from hostApps[hostApp].
 * @returns {boolean} Nothing on success. 'null' on error.
 */
function buildCommand(hostApp) {
	try {
		getScriptFile(function(scriptFile) {
			getShellCommand(hostApp, scriptFile, function(command) {
				console.log('Running shell command:', command);
				cp.exec(command, (error, stdout, stderr) => {
					if (error) {
						console.error(`exec error: ${error}`);
						return;
					}

					console.log(stdout);
					console.log(stderr);
				});
				message.success(`Script sent to ${hostApp.appName}`);
			});
		});
	} catch (error) {
		if (typeof error !== 'undefined') {
			console.log(error);
		}
	}
}

module.exports = buildCommand;