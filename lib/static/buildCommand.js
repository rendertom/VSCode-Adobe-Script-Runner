const cp = require('child_process');
const getScriptFile = require('./getScriptFile.js');
const getShellCommand = require('./getShellCommand.js');

const config = require('../config.js');
const message = require('../message.js');

/**
 * @description Implementation of the activation command.
 * @param {any} hostApp Object, entry from hostApps[hostApp].
 * @returns {boolean} Nothing on success. 'null' on error.
 */
function buildCommand(hostApp) {
	try {
		const settings = config.update();
		const scriptFile = getScriptFile(settings);
		const command = getShellCommand(hostApp, scriptFile, settings);

		console.log('Running shell command:', command);
		cp.exec(command, (err, result, raw) => {
			if (err) {
				return console.error(err);
			}
			console.log(result);
			console.log(raw);
		});

		message.success(`Script sent to ${hostApp.appName}`);

	} catch (err) {
		if (err) {
			message.error(err.toString());
			console.log(err);
		}
	}
}

module.exports = buildCommand;