const file = require('./file.js');
const message = require('../message.js');

/**
 * @description return ready-to-execute Shell command.
 * @param {object} hostApp Object.
 * @param {string} scriptFile Path to script file.
 * @param {object} settings Settings object.
 * @returns 
 */
function getShellCommand(hostApp, scriptFile, settings) {
    const applicationName = hostApp.appName;
    const appExe = settings[hostApp.winExeKey];
    const platform = process.platform;
    const tempCommand = hostApp[platform];

    if (!tempCommand) {
        throw message.info(`${applicationName} is not hooked-up to work with ${platform} os.`);
    }

    if (platform === 'win32') {
        // InDesign and InCopy does not expose 'appExe' in settings - they are launched via Visual Basic magic.
        if (tempCommand.includes('{appExe}')) {
            if (!appExe || !file.exists(appExe)) {
                throw message.error(`Unable to find ${applicationName} executable defined in settings. Make sure you have that path set-up correctly.`);
            }
        }
    }

    const command = tempCommand
        .replace('{appExe}', appExe)
        .replace('{scriptFile}', scriptFile);

    return command;
}

module.exports = getShellCommand;