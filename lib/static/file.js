const fs = require('fs');
const path = require('path');

/**
 * Checks if file exists at a given path.
 * @param {String} filePath Path to file.
 * @returns {Boolean} `True` if exists, `False` otherwise.
 */
function exists(filePath) {
	return fs.existsSync(filePath);
}

/**
 * Saves contents of the file.
 * @param {String} contents Contents to save.
 * @param {String} filePath Path to a file.
 * @returns {String} Path to a saved file.
 */
function saveFile(contents, filePath) {
	filePath = untildify(filePath);

	const folder = path.dirname(filePath);
	if (!fs.existsSync(folder)) {
		fs.mkdirSync(folder, {
			recursive: true
		});
	}

	fs.writeFileSync(filePath, contents);

	return filePath;
}

/**
 * Convert a tilde '~' path to an absolute path: '~/Desktop' to '/user/XXX/Desktop'
 * @param {String} pathWithTilde Path to untildify.
 * @returns {String} Absolute path as string.
 */
function untildify(pathWithTilde) {
	const os = require('os');
	const homeDirectory = os.homedir();

	if (typeof pathWithTilde !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof pathWithTilde}`);
	}

	return homeDirectory ? pathWithTilde.replace(/^~(?=$|\/|\\)/, homeDirectory) : pathWithTilde;
}



Object.assign(exports, {
	exists,
	saveFile,
	untildify
});