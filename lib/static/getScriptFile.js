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
			if (settings.executeUntitledDocument) {
				scriptFile = file.saveFile(text, settings.temporaryFile);
			} else {
				throw message.info('Save file first.');
			}
		}

		if (editor.isDirty()) {
			if (settings.saveFileBeforeExecution) {
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
}

module.exports = getScriptFile;