const config = require('../config.js');
const editor = require('../editor.js');
const file = require('./file.js');
const message = require('../message.js');
const path = require('path');
const token = require('./token.js');

/**
 * Gets a path to a script file that has to be executed in hostApp.
 * If document is undefined, then saves it into temp file,
 * defined in 'adobeScriptRunner.temporaryFile'
 *
 * @param {Function} callback Callback function that receives a result.
 */
function getScriptFile(callback) {
    const settings = config.get();
    let scriptFile;

    if (settings.executeFileFromToken && token.exists()) {
        scriptFile = getScriptFileFromToken();
    } else if (settings.executeFileFromConfig && settings.executeThis) {
        scriptFile = getScriptFileFromConfig();
    } else {
        scriptFile = getScriptFileFromEditor();
    }

    callback(scriptFile);
}

module.exports = getScriptFile;



function getScriptFileFromConfig() {
    let workspacePath = process.env.PWD;

    const workspaceFolder = config.getWorkspaceFolder();
    if (workspaceFolder) {
        workspacePath = workspaceFolder.uri.fsPath;
    }

    let scriptFile = path.join(workspacePath, config.get().executeThis);
    scriptFile = path.resolve(scriptFile);

    if (!file.exists(scriptFile)) {
        throw message.info(`File does not exist at path ${scriptFile}`);
    } else if (!file.isFile(scriptFile)) {
        throw message.info(`Path is not a file ${scriptFile}`);
    }

    return scriptFile;
}

function getScriptFileFromEditor() {
    let scriptFile = editor.getPath();
    const settings = config.get();
    const text = editor.ensureHasText();

    if (!editor.hasPath()) {
        scriptFile = file.saveFile(text, settings.temporaryFile);
    }

    if (editor.isDirty() && settings.saveFileBeforeExecution) {
        editor.save();
    }

    return scriptFile;
}

function getScriptFileFromToken() {
    let scriptFile = editor.ensereHasPath();
    let scriptFolder = path.dirname(scriptFile);

    let tokenPath = token.getPath();
    tokenPath = file.untildify(tokenPath);

    let targetFile;
    while (scriptFolder !== process.env.PWD) {
        targetFile = path.join(scriptFolder, tokenPath);
        targetFile = path.resolve(targetFile);

        if (file.exists(targetFile)) {
            return targetFile;
        }

        scriptFolder = path.dirname(scriptFolder);
    }

    throw message.info(`Could not find target file "${tokenPath}".`);
}