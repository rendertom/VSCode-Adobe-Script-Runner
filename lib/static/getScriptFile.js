const file = require('./file.js');
const message = require('../message.js');
const editor = require('../editor.js');

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