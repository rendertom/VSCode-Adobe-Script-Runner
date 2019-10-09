const config = require('../config.js');
const editor = require('../editor.js');
const file = require('./file.js');
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

	if (settings.executeFileFromToken && token.exists()) {
		scriptFile = token.getScriptFile();
	} else if (settings.executeFileFromConfig && settings.executeThis){
		scriptFile = config.getScriptFile();
	} else {
		scriptFile = getScriptFileFromEditor();
	}

	callback(scriptFile);

    function getScriptFileFromEditor() {
        let scriptFile = editor.getPath();
        const settings = config.get();
        const text = editor.ensureHasText();

        if (!editor.hasPath()) {
            scriptFile = file.saveFile(text, settings.temporaryFile);
        }

        if (editor.isDirty() && settings.saveFileBeforeExecution) {
            editor.save();
        }

        return scriptFile;
    }
}

module.exports = getScriptFile;