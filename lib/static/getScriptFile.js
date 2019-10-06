const ASRToken = 'adobe-script-runner';
const config = require('../config.js');
const editor = require('../editor.js');
const file = require('./file.js');
const message = require('../message.js');
const path = require('path');

/**
 * Gets a path to a script file that has to be executed in hostApp.
 * If document is undefined, then saves it into snippet,
 * defined in 'adobeScriptRunner.tempFile'
 *
 * @param {Function} callback Callback function that receives a result.
 */
function getScriptFile(callback) {
	const settings = config.get();

	const activeTextEditor = editor.getActiveTextEditor();
	if (!activeTextEditor) {
		throw message.info('No active editor detected.');
	}

	const text = editor.getText(activeTextEditor);
	if (text.trim() === '') {
		throw message.info('Document has no content.');
	}

	let scriptFile = editor.getPath(activeTextEditor);
	if (settings.evaluateToken && hasToken(text)) {
		if (!editor.hasPath(activeTextEditor)) {
			throw message.info('Cannot parse token from unsaved file.');
		}

		scriptFile = getScriptFileFromToken() || getScriptFileFromEditor();
	} else {
		scriptFile = getScriptFileFromEditor();
	}

	callback(scriptFile);


	
	function getScriptFileFromEditor() {
		let scriptFile = editor.getPath(activeTextEditor);

		if (!editor.hasPath(activeTextEditor)) {
			if (!settings.runUntitled) {
				throw message.info('Save file first.');
			}
			scriptFile = file.saveFile(text, settings.tempFile);
		} else if (editor.isDirty(activeTextEditor)) {
			if (!settings.saveDirty) {
				throw message.info('Save file first.');
			}
			editor.save(activeTextEditor);
			scriptFile = editor.getPath(activeTextEditor);
		}

		return scriptFile;
	}

	function getScriptFileFromToken() {
		const line = getTokenLine(text);
		if (!line) {
			return;
		}

		let pathBetweenQuotes = getStringBetweenQuotes(line);
		if (!pathBetweenQuotes) {
			throw message.info('Could not parse path');
		}
		pathBetweenQuotes = file.untildify(pathBetweenQuotes);

		let scriptFolder = path.dirname(scriptFile);
		let targetFile = path.join(scriptFolder, pathBetweenQuotes);
		targetFile = path.resolve(targetFile);

		if (file.exists(targetFile)) {
			return targetFile;
		}

		const targetFilesBaseName = path.basename(pathBetweenQuotes);
		let i = 0;
		let parts = scriptFolder.split(path.sep);

		while (parts.length > 1) {
			if (settings.searchLimit > -1) {
				if (i === settings.searchLimit) {
					throw message.info('Exceeded search limit: ' + settings.searchLimit);
				}
			}

			parts.pop();

			let parentFolder = path.join(...parts);
			targetFile = path.join(parentFolder, targetFilesBaseName);
			targetFile = path.resolve(targetFile);

			if (file.exists(targetFile)) {
				return targetFile;
			}

			i = i + 1;
		}
	}
}

function getTokenLine(string) {
	const line = string.match(new RegExp(ASRToken + '.*'));
	if (line) {
		return line[0];
	}
}

function getStringBetweenQuotes(string) {
	const quotedString = string.match(/['"](.*?)['"]/);
	if (quotedString) {
		return quotedString[1];
	}
}

function hasToken(string) {
	return new RegExp(ASRToken, 'i').test(string);
}

module.exports = getScriptFile;