const fs = require('fs');
const os = require('os');
const path = require('path');

const file = {
  /**
   * Checks if file exists at a given path.
   * @param {String} filePath Path to file.
   * @returns {Boolean} `True` if exists, `False` otherwise.
   */
  exists(filePath) {
    return fs.existsSync(filePath);
  },

  /**
   * Checks whether file exists at a path is file.
   * @param {String} filePath Path to file.
   * @returns {Boolean} `True` if file exists and is file, `False` otherwise.
   */
  isFile(filePath) {
    return this.exists(filePath) && fs.lstatSync(filePath).isFile();
  },

  /**
   * Saves contents of the file.
   * @param {String} contents Contents to save.
   * @param {String} filePath Path to a file.
   * @returns {String} Path to a saved file.
   */
  saveFile(contents, filePath) {
    filePath = this.untildify(filePath);

    const folder = path.dirname(filePath);
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, {
        recursive: true,
      });
    }

    fs.writeFileSync(filePath, contents);

    return filePath;
  },

  /**
   * Convert a tilde '~' path to an absolute path: '~/Desktop' to '/user/XXX/Desktop'
   * @param {String} pathWithTilde Path to untildify.
   * @returns {String} Absolute path as string.
   */
  untildify(pathWithTilde) {
    const homeDirectory = os.homedir();

    if (typeof pathWithTilde !== 'string') {
      throw new TypeError(`Expected a string, got ${typeof pathWithTilde}`);
    }

    return homeDirectory ? pathWithTilde.replace(/^~(?=$|\/|\\)/, homeDirectory) : pathWithTilde;
  },
};

module.exports = file;
