const config = require('../config.js');
const editor = require('../editor.js');
const file = require('./file.js');
const message = require('../message.js');
const path = require('path');
const token = require('./token.js');

/**
 * Gets a path to a script file that has to be executed in hostApp.
 * If document is undefined, then saves it into snippet,
 * defined in 'adobeScriptRunner.tempFile'
 *
 * @param {Function} callback Callback function that receives a result.
 */
function getScriptFile(callback) {
	const settings = config.get();
	let scriptFile;

	if (settings.evaluateToken) {
		if (token.exists) {
			scriptFile = getScriptFileFromToken() || getScriptFileFromEditor();
		} else {
			scriptFile = getScriptFileFromEditor();
		}
	} else {
		scriptFile = getScriptFileFromEditor();
	}

	callback(scriptFile);



	function getScriptFileFromEditor() {
		let scriptFile = editor.getPath();
		const text = editor.ensureHasText();

		if (!scriptFile) {
			if (settings.runUntitled) {
				scriptFile = file.saveFile(text, settings.tempFile);
			} else {
				throw message.info('Save file first.');
			}
		}

		if (editor.isDirty()) {
			if (settings.saveDirty) {
				editor.save();
				scriptFile = editor.getPath();
			} else {
				throw message.info('Save file first.');
			}
		}

		return scriptFile;
	}

	function getScriptFileFromToken() {
		let scriptFile = editor.ensereHasPath();
		let scriptFolder = path.dirname(scriptFile);
		let tokenPath = token.getPath();
		tokenPath = file.untildify(tokenPath);

		let targetFile = path.join(scriptFolder, tokenPath);
		targetFile = path.resolve(targetFile);

		if (file.exists(targetFile)) {
			return targetFile;
		}

		const targetFilesBaseName = path.basename(tokenPath);
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






module.exports = getScriptFile;