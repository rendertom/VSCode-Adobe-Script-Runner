const ASRToken = 'adobe-script-runner';
const editor = require('../editor.js');
const message = require('../message.js');

const token = {
	exists() {
		const string = editor.ensureHasText();
		return hasToken(string);
	},

	getPath() {
		const string = editor.ensureHasText();
		const tokeLine = getTokenLine(string);
		const tokenPath = getStringBetweenQuotes(tokeLine);

		return tokenPath;
	}
};

module.exports = token;


function getStringBetweenQuotes(string) {
	const quotedString = string.match(/['"](.*?)['"]/);
	if (!quotedString || !quotedString[1] || quotedString[1].trim() === '') {
		throw message.info('Could not parse token path.');
	}

	return quotedString[1].trim();
}

function getTokenLine(string) {
	const line = string.match(new RegExp(ASRToken + '.*'));
	if (!line) {
		throw message.info('Could not parse token line.');
	}

	return line[0];
}

function hasToken(string){
	return new RegExp(ASRToken, 'i').test(string);
}