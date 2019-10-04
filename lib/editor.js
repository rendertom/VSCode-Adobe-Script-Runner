const vscode = require('vscode');

const editor = {
    getActiveTextEditor() {
        return vscode.window.activeTextEditor;
    },

    getPath(activeTextEditor) {
        return activeTextEditor.document.fileName;
    },

    getText(activeTextEditor) {
        return activeTextEditor.document.getText();
    },

    hasPath(activeTextEditor) {
        return !activeTextEditor.document.isUntitled;
    },

    isDirty(activeTextEditor) {
        return activeTextEditor.document.isDirty && this.hasPath(activeTextEditor);
    },

    save(activeTextEditor) {
        activeTextEditor.document.save();
    }
};

module.exports = editor;