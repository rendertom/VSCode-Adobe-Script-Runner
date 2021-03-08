# Change Log

All notable changes to the Adobe Script Runner extension will be documented in this file. The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added

-

### Changed

-

### Fixed

-

### Removed

-

---

## [0.4.0] 2021-03-09

### Added

- Option to toggle **Bring Host Application To Front** on execution for Mac.

### Changed

- Updates default paths for Illustrator and Photoshop for Windows to 2021 application version.
- Updates default path for After Effects for Windows to 2020 application version.

---

## [0.3.0] 2019-12-12

### Added

- Option to always **Execute File From Config** file defined in **Execute This** section, ignoring the one in active viewer.
- Option to **Execute File From Token** `Adobe-Script-Runner "path/to/file.jsx"` in active document to execute file between the quotes.

### Changed

- Codebase rewritten from scratch.
- Renamed configuration keys and titles.

### Removed

- Checkbox **Run Untitled**.

---

## [0.2.1] 2019-01-05

### Changed

- Updates default Windows paths to CC2019 version.
- Updates descriptions for `Run Untitled`, `Save Dirty`, and `Temp File` in extensions Settings window.

---

## [0.2.0] 2018-03-29

### Fixed

- Fixed bug when settings were not registered until app restart.
- Fixed issue with HOME "~/" paths.

### Changed

- Changed code flow. Splits everything into modules for easier maintenance and development. Also makes it easier for other apps to adopt the functionality.
- Ports functionality to [Atom.io](https://atom.io/packages/adobe-script-runner).

---

## [0.1.2] 2018-03-14

### Added

- Default keybinding `Cmd+R` ro tun `adobeScriptRunner.ae` command.
- Instructions on how to assign keybindings to commands in `README.md` file.

---

## [0.1.1] 2018-03-14

### Changed

- Extension icon.

---

## [0.1.0] 2018-03-13

### Added

- Support to execute scripts in `Adobe InCopy`.
- Support for Windows.

---

## [0.0.3] 2018-03-12

### Added

- Support to open scripts inside `Adobe ExtendScript Toolkit`.
- Looping gif to README.md file that looks amazing.

### Fixed

- Fixed typos in `README.md`.

### Changed

- Updated `extension.js` to use es6 syntax.
- Updated info message to show app name the script has been sent to.
- Renamed settings object `adobeScriptLauncher` to `adobeScriptRunner`.
- Changed location of temp file `Snippet.js` to `~/.vscode` instead of `~/Desktop` folder.
- Created `resources` folder to dump all image files there.

---

## [0.0.2] 2018-03-11

### Added

- Support to execute scripts in `Adobe Illustrator`.
- Support to execute scripts in `Adobe InDesign`.

### Changed

- README.md and CHANGELOG.md files to reflect changes.
- Refactored `scriptCommands` object.

---

## [0.0.1] 2018-03-10

- Initial release
