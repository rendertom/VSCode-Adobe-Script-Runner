const vscode = require('vscode');

const editor = {
    getActiveTextEditor() {
        return vscode.window.activeTextEditor;
    },
    
    hasPath(activeTextEditor) {
        return !activeTextEditor.document.isUntitled;
    },
    
    isDirty(activeTextEditor) {
        return activeTextEditor.document.isDirty && this.hasPath(activeTextEditor);
    },
    
    getText(activeTextEditor) {
        return activeTextEditor.document.getText();
    },
    
    getPath(activeTextEditor) {
        let str = activeTextEditor.document.fileName;
        return (/.*(?=\.ts)/.test(str)) ? str.replace(/\.ts$/, '.jsx') : str;
    },
    
    save(activeTextEditor) {
        activeTextEditor.document.save();
    }
}

module.exports = editor;