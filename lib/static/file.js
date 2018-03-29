const fs = require('fs');
const path = require('path');

/**
 * @description Saves file
 * @param {string} text File contents
 * @param {string} filePath Path to file
 * @returns {string} Path to saved file
 */
function saveFile(text, filePath) {
	try {
		const scriptFile = resolveHome(filePath);
		const folder = path.dirname(scriptFile);

		if (!fs.existsSync(folder)) {
			mkdir(folder);
		}

		fs.writeFileSync(scriptFile, text);

		return scriptFile;
	} catch (e) {
		console.log(e);
	}
}

/**
 * @description Checks if file exists at a given path
 * @param {string} filePath Path to file
 * @returns {boolean} True if exists, False if does not exist
 */
function exists(filePath) {
	return fs.existsSync(filePath);
}

Object.assign(exports, {
	saveFile,
	exists
});


/**
 * @description Recursivelly creates folder path
 * @param {string} dir path to folder
 */
function mkdir(dir) {
	// https://gist.github.com/bpedro/742162
	const sep = '/';
	const segments = dir.split(sep);
	let current = '';
	let i = 0;

	while (i < segments.length) {
		current = current + sep + segments[i];
		try {
			fs.statSync(current);
		} catch (e) {
			fs.mkdirSync(current);
		}
		i++;
	}
}

/**
 * @description Converts user path to absolute path: '~/Desktop' to '/user/XXX/Desktop'
 * @param {string} filepath string
 * @returns {string} Absolute path as string.
 */
function resolveHome(filePath) {
	const os = require('os');
	const homedir = os.homedir();
	if (filePath[0] === '~') {
		filePath = path.join(homedir, filePath.slice(1));
	}
	return filePath;
}