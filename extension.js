const cp = require('child_process');
const fs = require('fs');
const osName = getOSName();
const path = require('path');
const vscode = require('vscode');

const hostApps = {
	"ae": {
		"appName": "Adobe After Effects",
		"mac": {
			"appId": 'com.adobe.aftereffects',
			"exec": 'DoScriptFile',
		},
		"win": undefined,
	},
	"ai": {
		"appName": "Adobe Illustrator",
		"mac": {
			"appId": 'com.adobe.illustrator',
			"exec": 'do javascript file',
		},
		"win": undefined,
	},
	"estk": {
		"appName": "Adobe ExtendScript Toolkit",
		"mac": {
			"appId": 'com.adobe.estoolkit-4.0',
			"exec": 'open',
		},
		"win": undefined,
	},
	"id": {
		"appName": "Adobe InDesign",
		"mac": {
			"appId": 'com.adobe.InDesign',
			"exec": 'do script',
			"suffix": 'language javascript',
		},
		"win": undefined,
	},
	"psd": {
		"appName": "Adobe Photoshop",
		"mac": {
			"appId": 'com.adobe.photoshop',
			"exec": 'do javascript file',
		},
		"win": undefined,
	},
};

/**
 * @description Method is called when extension is activated.
 *              Extension is activated the very first time the command is executed.
 * @param {any} context vscode.ExtensionContext
 */
function activate(context) {
	Object.keys(hostApps).forEach(hostApp => {
		let disposable = vscode.commands.registerCommand(
			`adobeScriptRunner.${hostApp}`,
			() => buildCommand(hostApps[hostApp])
		);
		context.subscriptions.push(disposable);
	});
}

/**
 * @description Implementation of the command with registerCommand.
 * @param {any} hostApp Object, entry from hostApps[hostApp].
 * @returns {boolean} Nothing on success. 'null' on error.
 */
function buildCommand(hostApp) {
	if (!hostApp[osName]) {
		showErrorMessage(`${osName} OS is not supported for this task.`);
		return null;
	}

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

	if (osName === "mac") {
		runShellCommand(hostApp[osName], scriptFile);
	}

	showInformationMessage(`Script sent to ${hostApp.appName}`);
}

/**
 * @description Runs Apple Script (osascript) to launch script
 * 				in hostApp.
 * 
 * @param {object} args Arguments for shell command
 * @param {string} scriptFile Path to jsx file.
 */
function runShellCommand(args, scriptFile) {
	const {
		appId,
		exec,
		suffix = '',
	} = args;

	const command = `osascript -e 'tell application id "${appId}" to activate ${exec} "${scriptFile}" ${suffix}'`;
	console.log('Running shell command:', command);
	cp.exec(command, onError);
}

/**
 * @description Gets path to script file that has to be executed in hostApp.
 *              If document is not saved, then saves it to snippet,
 *              defined in 'adobeScriptRunner.tempFile'
 * 
 * @param {any} document vscode.window.activeTextEditor.document.
 * @returns {string} scriptFile as String, or 'null' if cannot get scriptFile.
 */
function getScriptFile(document) {
	const config = vscode.workspace.getConfiguration('adobeScriptRunner');
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
 *              defined in 'adobeScriptRunner.tempFile'
 * 
 * @param {object} document vscode.window.activeTextEditor.document.
 * @param {string} tempFile path to tempFile defined in 'adobeScriptRunner.tempFile'
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

/**
 * @description Gets short name of operating system
 * @returns {string} "mac" or "win".
 */
function getOSName() {
	let osName;
	switch (process.platform) {
		case "win32":
			osName = "win";
			break;
		case "darwin":
			osName = "mac";
			break;
	}

	return osName;
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

function deactivate() {}
exports.activate = activate;
exports.deactivate = deactivate;