const vscode = require('vscode');
const message = {
    success (message) {
        vscode.window.showInformationMessage(message);
    },
    
    info (message) {
        vscode.window.showWarningMessage(message);
    },
    
    error (message) {
        vscode.window.showErrorMessage(message);
    }
};

module.exports = message;