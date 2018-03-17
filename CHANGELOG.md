# Change Log

All notable changes to the Adobe Script Runner extension will be documented in this file. The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/).

## [Unreleased]

- Fixed bug when settings were not registered until app restart.
- Fixed issue with HOME "~/" paths.
- Changed code flow. Splits everything to modules for easier maintenance and development. Also makes it easier to other apps to adopt the functionality.

## Released

## [0.1.2] 2018-03-14

### Added

- Added default keybinding `Cmd+R` ro tun `adobeScriptRunner.ae` command.
- Added instructions on how to assign keybindings to commands in `README.md` file.

## [0.1.1] 2018-03-14

### Changed

- Changed extension icon.

## [0.1.0] 2018-03-13

### Added

- Support to open scripts inside `Adobe InCopy`.
- Support for Windows.

## [0.0.3] 2018-03-12

### Added

- Support to open scripts inside `Adobe ExtendScript Toolkit`.
- Looping gif to README.md file that looks fantastic.
 
### Changed

- Updated `extension.js` to use es6 syntax.
- Updated info message to show app name the script has been sent to.
- Renamed settings object `adobeScriptLauncher` to `adobeScriptRunner`.
- Fixed typos in `README.md`.
- Changed location of temp file `Snippet.js` to `~/.vscode` instead of `~/Desktop` folder.
- Created `resources` folder to dump all image files there.

## [0.0.2] 2018-03-11

### Added

- Support to run scripts inside `Adobe Illustrator`.
- Support to run scripts inside `Adobe InDesign`.

### Changed

- README.md and CHANGELOG.md files to reflect changes.
- Refactored `scriptCommands` object.

## [0.0.1] 2018-03-10

- Initial release
