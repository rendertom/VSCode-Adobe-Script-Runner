const config = require('./config');
const file = require('./static/file.js');
const message = require('./message.js');
const vscode = require('vscode');

const editor = {
    ensureHasActiveTextEditor() {
        const activeTextEditor = this.getActiveTextEditor();
        if (!activeTextEditor) {
            throw message.info('No active editor detected.');
        }

        return activeTextEditor;
    },

    ensereHasPath() {
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

    getDocument() {
        const activeTextEditor = this.ensureHasActiveTextEditor();
        return activeTextEditor.document;
    },

    getPath() {
        const activeTextEditor = this.ensureHasActiveTextEditor();
        return activeTextEditor.document.fileName;
    },

    // getScriptFile() {
    //     let scriptFile = this.getPath();
    //     const settings = config.get();
    //     const text = this.ensureHasText();

    //     if (!this.hasPath()) {
    //         scriptFile = file.saveFile(text, settings.temporaryFile);
    //     }

    //     if (this.isDirty() && settings.saveFileBeforeExecution) {
    //         this.save();
    //     }

    //     return scriptFile;
    // },

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