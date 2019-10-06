const cp = require('child_process');
const getScriptFile = require('./getScriptFile.js');
const getShellCommand = require('./getShellCommand.js');
const message = require('../message.js');

/**
 * Builds and executes command.
 * @param {Object} hostApp entry from hostApps[hostApp].
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