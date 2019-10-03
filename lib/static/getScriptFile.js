const file = require('./file.js');
const message = require('../message.js');
const editor = require('../editor.js');
const ASRToken = 'adobe-script-runner';

/**
 * @description Gets path to script file that has to be executed in hostApp.
 *              If document is not saved, then saves it to snippet,
 *              defined in 'adobeScriptRunner.tempFile'
 *
 * @param {object} settings Settings object.
 * @returns {string} Path to script file as String, or 'null' if cannot get scriptFile.
 */
function getScriptFile(settings) {
	const filePath = settings.tempFile;

	const activeTextEditor = editor.getActiveTextEditor();
	if (!activeTextEditor) {
		throw message.info('No active editor detected.');
	}

	const text = editor.getText(activeTextEditor);
	let scriptFile = editor.getPath(activeTextEditor);

	const path = require('path');
	var scriptFolder = path.dirname(scriptFile);
	// console.log('scriptFolder:', scriptFolder);

	// TODO check if searchForToken enabled in settings
	var searchForToken = true;
	var searchLimit = 2;
	if (searchForToken) {
		if (hasToken(text)) {
			var line = getTokenLine(text);
			if (line) {
				var pathBetweenQuotes = getStringBetweenQuotes(line);
				if (!pathBetweenQuotes) {
					throw message.info('Could not parse path');
				}
				
				var targetFile = path.join(scriptFolder, pathBetweenQuotes);
				targetFile = path.resolve(targetFile);

				if (file.exists(targetFile)) {
					return targetFile;
				} else {
					var i = 0;
					var targetFilesBaseName = path.basename(pathBetweenQuotes);

					var parts = scriptFolder.split(path.sep);
					while (parts.length > 1) {
						if (i === searchLimit) {
							throw message.info('Exceeded search limit' + searchLimit);
						} 

						parts.pop();

						var parentFolder = path.join(...parts);
						targetFile = path.join(parentFolder, targetFilesBaseName);
						targetFile = path.resolve(targetFile);

						if (file.exists(targetFile)) {
							return targetFile;
						}

						i = i + 1;
					}
				}
			}
		}
	}
	console.log('_______________');
	if (!editor.hasPath(activeTextEditor)) {
		if (!settings.runUntitled) {
			throw message.info('Save file first.');
		}
		scriptFile = file.saveFile(text, filePath);
	} else if (editor.isDirty(activeTextEditor)) {
		if (!settings.saveDirty) {
			throw message.info('Save file first.');
		}
		editor.save(activeTextEditor);
	}

	return scriptFile;
}

module.exports = getScriptFile;



function hasToken(string) {
	return new RegExp(ASRToken, 'i').test(string);
}

function getTokenLine(string) {
	var line = string.match(new RegExp(ASRToken + '.*'));
	if (line) {
		return line[0];
	}
}

function getStringBetweenQuotes(string) {
	var quotedString = string.match(/['"](.*?)['"]/);
	if (quotedString) {
		return quotedString[1];
	}
}