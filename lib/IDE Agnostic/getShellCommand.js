const file = require('./file.js');
const ide = require('../ide.js');

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
        throw ide.showInformationMessage(`${applicationName} is not hooked-up to work with ${platform} os.`);
    }

    if (platform === 'win32' && command.includes('{appExe}')) {
        // InDesign and InCopy does not expose 'appExe' in settings - they are launched via Visual Basic magic.
        const settings = ide.config.get();
        const appExe = settings[hostApp.appExe];
        if (!appExe || !file.exists(appExe)) {
            throw ide.showErrorMessage(`Unable to find ${applicationName} executable defined in settings. Make sure you have that path set-up correctly.`);
        }

        command = command.replace('{appExe}', appExe);
    }

    command = command.replace('{scriptFile}', scriptFile);

    callback(command);
}

module.exports = getShellCommand;