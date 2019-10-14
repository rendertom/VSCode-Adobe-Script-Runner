const ASRToken = 'adobe-script-runner';
const ide = require('./ide.js');

const token = {
	exists() {
		const string = ide.editor.ensureHasText();
		return hasToken(string);
	},

	getPath() {
		const string = ide.editor.ensureHasText();
		const tokeLine = getTokenLine(string);
		const tokenPath = getStringBetweenQuotes(tokeLine);

		return tokenPath.trim();
	},

	getContentWithoutToken() {
		const string = ide.editor.ensureHasText();
		const contentWithoutToken = removeToken(string);

		return contentWithoutToken.trim();
	},
};

module.exports = token;



function getStringBetweenQuotes(string) {
	const quotedString = string.match(/['"](.*?)['"]/);
	if (!quotedString || !quotedString[1] || quotedString[1].trim() === '') {
		throw ide.showInformationMessage('Could not parse token path.');
	}

	return quotedString[1];
}

function getTokenLine(string) {
	const line = string.match(new RegExp(ASRToken + '.*', 'i'));
	if (!line) {
		throw ide.showInformationMessage('Could not parse token line.');
	}

	return line[0];
}

function hasToken(string) {
	return new RegExp(ASRToken, 'i').test(string);
}

function removeToken(string) {
	return string.replace(/(\/\*)?(\/\/)?\s?adobe-script-runner\s?['"].*?['"]\h*;?\h*(\*\/)?/, '');
}