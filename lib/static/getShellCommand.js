const config = require('../config.js');
const file = require('./file.js');
const message = require('../message.js');

/**
 * Builds ready-to-execute Shell command.
 * @param {Object} hostApp Application data.
 * @param {String} scriptFile Path to a script file.
 * @param {Function} callback Callback function that receives the result.
 */
function getShellCommand(hostApp, scriptFile, callback) {
    const applicationName = hostApp.appName;
    const platform = process.platform;
    
    let command = hostApp[platform];
    if (!command) {
        throw message.info(`${applicationName} is not hooked-up to work with ${platform} os.`);
    }

    if (platform === 'win32') {
        const settings = config.get();
        const appExe = settings[hostApp.winExeKey];

        // InDesign and InCopy does not expose 'appExe' in settings - they are launched via Visual Basic magic.
        if (command.includes('{appExe}')) {
            if (!appExe || !file.exists(appExe)) {
                throw message.error(`Unable to find ${applicationName} executable defined in settings. Make sure you have that path set-up correctly.`);
            }

            command = command.replace('{appExe}', appExe);
        }
    }

    command = command.replace('{scriptFile}', scriptFile);

    callback(command);
}

module.exports = getShellCommand;