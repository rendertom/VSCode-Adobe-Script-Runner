const file = require('./file.js');
const ide = require('./ide.js');
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
    const settings = ide.config.get();
    if (ide.editor.isDirty() && settings.saveFileBeforeExecution) {
        ide.editor.save();
    }

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

    const workspaceFolder = ide.config.getWorkspaceFolder();
    if (workspaceFolder) {
        workspacePath = workspaceFolder.uri.fsPath;
    }

    let scriptFile = path.join(workspacePath, ide.config.get().executeThis);
    scriptFile = path.resolve(scriptFile);

    if (!file.exists(scriptFile)) {
        throw ide.showInformationMessage(`File does not exist at path ${scriptFile}`);
    } else if (!file.isFile(scriptFile)) {
        throw ide.showInformationMessage(`Path is not a file ${scriptFile}`);
    }

    return scriptFile;
}

function getScriptFileFromEditor() {
    let scriptFile = ide.editor.getPath();
    const settings = ide.config.get();
    const text = ide.editor.ensureHasText();

    if (!ide.editor.hasPath()) {
        scriptFile = file.saveFile(text, settings.temporaryFile);
    }

    return scriptFile;
}

function getScriptFileFromToken() {
    let scriptFile = ide.editor.ensereHasPath();
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

    throw ide.showInformationMessage(`Could not find target file "${tokenPath}".`);
}