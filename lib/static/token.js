const ASRToken = 'adobe-script-runner';
const editor = require('../editor.js');
const file = require('./file.js');
const message = require('../message.js');
const path = require('path');

const token = {
	exists() {
		const string = editor.ensureHasText();
		return hasToken(string);
	},

	getPath() {
		const string = editor.ensureHasText();
		const tokeLine = getTokenLine(string);
		const tokenPath = getStringBetweenQuotes(tokeLine);

		return tokenPath.trim();
	},

	getContentWithoutToken() {
		const string = editor.ensureHasText();
		const contentWithoutToken = removeToken(string);

		return contentWithoutToken.trim();
	},

	getScriptFile() {
		let scriptFile = editor.ensereHasPath();
		let scriptFolder = path.dirname(scriptFile);
		
		let tokenPath = this.getPath();
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
};

module.exports = token;


function getStringBetweenQuotes(string) {
	const quotedString = string.match(/['"](.*?)['"]/);
	if (!quotedString || !quotedString[1] || quotedString[1].trim() === '') {
		throw message.info('Could not parse token path.');
	}

	return quotedString[1];
}

function getTokenLine(string) {
	const line = string.match(new RegExp(ASRToken + '.*'));
	if (!line) {
		throw message.info('Could not parse token line.');
	}

	return line[0];
}

function hasToken(string) {
	return new RegExp(ASRToken, 'i').test(string);
}

function removeToken(string) {
	return string.replace(/(\/\*)?(\/\/)?\s?adobe-script-runner\s?['"].*?['"]\h*;?\h*(\*\/)?/, '');
}