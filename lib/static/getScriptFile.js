const config = require('../config.js');
const editor = require('../editor.js');
const file = require('./file.js');
const message = require('../message.js');
const path = require('path');
const token = require('./token.js');

/**
 * Gets a path to a script file that has to be executed in hostApp.
 * If document is undefined, then saves it into temp file,
 * defined in 'adobeScriptRunner.tempFile'
 *
 * @param {Function} callback Callback function that receives a result.
 */
function getScriptFile(callback) {
	const settings = config.get();
	let scriptFile;

	if (settings.evaluateToken && token.exists()) {
		scriptFile = getScriptFileFromToken();
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
		let parts = scriptFolder.split(path.sep);

		let tokenPath = token.getPath();
		tokenPath = file.untildify(tokenPath);

		let i = -1;
		while (parts.length > 1) {
			let parentFolder = path.join(...parts);
			let targetFile = path.join(parentFolder, tokenPath);
			targetFile = path.resolve(targetFile);
			console.log('->', targetFile);

			if (file.exists(targetFile)) {
				return targetFile;
			}

			parts.pop();
			i = i + 1;
			if (settings.searchLimit > -1 && i === settings.searchLimit) {
				throw message.info(`Could not find target file "${tokenPath}". Search limit exceeded.`);
			}
		}
	}
}

module.exports = getScriptFile;