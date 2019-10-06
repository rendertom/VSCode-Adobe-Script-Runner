const message = require('./message.js');
const vscode = require('vscode');

const editor = {
    ensureHasActiveTextEditor() {
        const activeTextEditor = vscode.window.activeTextEditor;
        if (!activeTextEditor) {
            throw message.info('No active editor detected.');
        }
        
        return activeTextEditor;
    },

    ensereHasPath(){
        const path = this.getPath();
		if (!path) {
			throw message.info('Document has no path.');
        }

        return path;
    },

    ensureHasText() {
        const text = this.getText();
        if (text.trim() === '') {
            throw message.info('Document has no content.');
        }

        return text;
    },

    getActiveTextEditor() {
        return vscode.window.activeTextEditor;
    },

    getPath() {
        const activeTextEditor = this.ensureHasActiveTextEditor();
        return activeTextEditor.document.fileName;
    },

    getText() {
        const activeTextEditor = this.ensureHasActiveTextEditor();
        return activeTextEditor.document.getText();
    },

    hasPath() {
        const activeTextEditor = this.ensureHasActiveTextEditor();
        return !activeTextEditor.document.isUntitled;
    },

    isDirty() {
        const activeTextEditor = this.ensureHasActiveTextEditor();
        return activeTextEditor.document.isDirty && this.hasPath(activeTextEditor);
    },

    save() {
        const activeTextEditor = this.ensureHasActiveTextEditor();
        activeTextEditor.document.save();
    }
};

module.exports = editor;