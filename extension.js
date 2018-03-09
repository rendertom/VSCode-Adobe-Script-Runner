const cp = require('child_process');
const fs = require('fs');
const path = require('path');
const vscode = require('vscode');

const scriptCommands = {
    "ae": 'tell application "Adobe After Effects CC 2018" to activate DoScriptFile',
    "psd": 'tell application "Adobe Photoshop CC 2018" to activate do javascript file',
};

/**
 * @description Method is called when extension is activated.
 *              Extension is activated the very first time the command is executed.
 * @param {any} context vscode.ExtensionContext
 */
function activate(context) {
    let hostApps = Object.keys(scriptCommands);
    for (let i = 0; i < hostApps.length; i++) {
        let hostApp = hostApps[i];
        let disposable = vscode.commands.registerCommand(`adobeScriptLauncher.${hostApp}`, function () {
            buildCommand(hostApp);
        });

        context.subscriptions.push(disposable);
    }
}

/**
 * @description Implementation of the command with registerCommand.
 * @param {any} hostApp String, abbreviation 'ae', 'psd' or similar.
 * @returns {boolean} Nothing on success. 'null' on error.
 */
function buildCommand(hostApp) {
    const activeTextEditor = vscode.window.activeTextEditor;
    if (!activeTextEditor) {
        showErrorMessage('No active editor detected.');
        return null;
    }

    const document = activeTextEditor.document;
    const scriptFile = getScriptFile(document);
    if (!scriptFile) {
        showErrorMessage('Please save document first.');
        return null;
    }

    // Run shell command
    const command = `osascript -e '${scriptCommands[hostApp]} "${scriptFile}"'`;
    cp.exec(command, onError);

    showInformationMessage('DONE');
}

/**
 * @description Rets path to script file that has to be executed in hostApp.
 *              If document is not saved, then saves it to snippet,
 *              defined in 'adobeScriptLauncher.tempFile'
 * 
 * @param {any} document vscode.window.activeTextEditor.document.
 * @returns {string} scriptFile as String, or 'null' if cannot get scriptFile.
 */
function getScriptFile(document) {
    const config = vscode.workspace.getConfiguration('adobeScriptLauncher');
    let scriptFile = document.fileName;

    if (document.isUntitled) {
        if (!config.runUntitled) {
            return null;
        }
        scriptFile = saveFile(document, config.tempFile);
    }

    if (isDirty(document)) {
        if (!config.saveDirty) {
            return null;
        }
        document.save();
    }
    return scriptFile;
}

/**
 * @description Saves contexts of document to snippet file,
 *              defined in 'adobeScriptLauncher.tempFile'
 * 
 * @param {object} document vscode.window.activeTextEditor.document.
 * @param {string} tempFile path to tempFile defined in 'adobeScriptLauncher.tempFile'
 * @returns {string} Absdolute path to scriptFile as String.
 */
function saveFile(document, tempFile) {
    try {
        const scriptFile = resolveHome(tempFile);
        const folder = path.dirname(scriptFile);

        if (!fs.existsSync(folder)) {
            mkdir(folder);
        }

        const text = document.getText();
        fs.writeFileSync(scriptFile, text);

        return scriptFile;
    } catch (e) {
        onError(e);
    }
}

/**
 * @description Recursivelly creates folder path
 * @param {string} dir path to folder
 */
function mkdir(dir) {
    // https://gist.github.com/bpedro/742162
    const sep = '/';
    const segments = dir.split(sep);
    let current = '';
    let i = 0;

    while (i < segments.length) {
        current = current + sep + segments[i];
        try {
            fs.statSync(current);
        } catch (e) {
            fs.mkdirSync(current);
        }
        i++;
    }
}

/**
 * @description Converts user path to absolute path: '~/Desktop' to '/user/XXX/Desktop'
 * @param {string} filepath string
 * @returns {string} Absolute path as string.
 */
function resolveHome(filepath) {
    // https://stackoverflow.com/questions/21077670/expanding-resolving-in-node-js/36221905#36221905
    if (filepath[0] === '~') {
        filepath = path.join(process.env.HOME, filepath.slice(1));
    }
    return filepath;
}

function onError(err, result, raw) {
    if (err) {
        showErrorMessage(err.message);
        return console.error(err);
    }
}

function isDirty(document) {
    return document.isDirty && !document.isUntitled;
}

function showErrorMessage(string) {
    vscode.window.showErrorMessage(string);
}

function showInformationMessage(string) {
    vscode.window.showInformationMessage(string);
}

function deactivate() { }
exports.activate = activate;
exports.deactivate = deactivate;