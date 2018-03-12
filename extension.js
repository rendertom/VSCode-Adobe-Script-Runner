const cp = require('child_process');
const fs = require('fs');
const path = require('path');
const vscode = require('vscode');

const config = vscode.workspace.getConfiguration('adobeScriptRunner');
const osName = getOSName();
const hostApps = {
	'ae': {
		'appName': 'Adobe After Effects',
		'mac': `osascript -e 'tell application id "com.adobe.aftereffects" to activate DoScriptFile "{scriptFile}"'`,
		'win': `"{appExe}" -r {scriptFile}`,
	},
	'ai': {
		'appName': 'Adobe Illustrator',
		'mac': `osascript -e 'tell application id "com.adobe.illustrator" to activate do javascript file "{scriptFile}"'`,
		'win': `"{appExe}" -r {scriptFile}`,
	},
	'estk': {
		'appName': 'Adobe ExtendScript Toolkit',
		'mac': `osascript -e 'tell application id "com.adobe.estoolkit-4.0" to activate open "{scriptFile}"'`,
		'win': `"{appExe}" -run {scriptFile}`,
	},
	'ic': {
		'appName': 'Adobe InCopy',
		'mac': `osascript -e 'tell application id "com.adobe.InCopy" to activate do script "{scriptFile}" language javascript'`,
		'win': `powershell -command "$app = new-object -comobject InCopy.Application; $app.DoScript('{scriptFile}', 1246973031)"`, //http://jongware.mit.edu/idcs6js/pe_ScriptLanguage.html
	},
	'id': {
		'appName': 'Adobe InDesign',
		'mac': `osascript -e 'tell application id "com.adobe.InDesign" to activate do script "{scriptFile}" language javascript'`,
		'win': `powershell -command "$app = new-object -comobject InDesign.Application; $app.DoScript('{scriptFile}', 1246973031)"`, //http://jongware.mit.edu/idcs6js/pe_ScriptLanguage.html
	},
	'psd': {
		'appName': 'Adobe Photoshop',
		'mac': `osascript -e 'tell application id "com.adobe.photoshop" to activate do javascript file "{scriptFile}"'`,
		'win': `"{appExe}" -r {scriptFile}`,
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

	const applicationName = hostApp.appName;
	const tempCommand = hostApp[osName];
	if (!tempCommand) {
		showErrorMessage(`${applicationName} is not hooked-up to work with ${osName} os.`);
		return null;
	}

	let appExe = '';
	if (osName === 'win') {
		// InDesign and InCopy does not expose 'appExe' in preferences - they are launched via Visual Basic magic.
		if (tempCommand.match('{appExe}')) {
			appExe = getExePath(applicationName);
			if (!appExe || !fs.existsSync(appExe)) {
				showErrorMessage(`Unable to find ${applicationName} executable defined in preferences. Make sure you have that path set-up correctly.`);
				return null;
			}
		}
	}

	const command = tempCommand
		.replace('{appExe}', appExe)
		.replace('{scriptFile}', scriptFile);

	console.log('Running shell command:', command);
	cp.exec(command, onError);

	showInformationMessage(`Script sent to ${applicationName}`);
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

/**
 * @description Gets app.exe path from user preferences
 * 
 * @param {string} applicationName Full name of application, aka "Adobe After Effects"
 * @returns {string} Path to app.exe of 'null' if path not set.
 */
function getExePath(applicationName) {
	let appExe;
	for (let propertyName in config) {
		appExe = config[propertyName];
		if (!config.hasOwnProperty(propertyName) || !isString(appExe)) {
			continue;
		}

		if (appExe.includes(applicationName)) {
			return appExe;
		}
	}
	return null;
}

function onError(err, result, raw) {
	if (err) {
		return console.error(err);
	}
	console.log(result);
	console.log(raw);
}

function isString(value) {
	return typeof value === "string";
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