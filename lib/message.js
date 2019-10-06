const vscode = require('vscode');

const message = {
    error (string) {
        vscode.window.showErrorMessage(string);
    },

    info (string) {
        vscode.window.showWarningMessage(string);
    },

    success (string) {
        vscode.window.showInformationMessage(string);
    },
};

module.exports = message;