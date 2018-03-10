# Change Log
All notable changes to the Adobe Script Runner extension will be documented in this file. The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/).


## [Unreleased]

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

## Released

## [0.0.2] 2018-03-11
### Added
- Support to run scripts inside `Adobe Illustrator`.
- Support to run scripts inside `Adobe InDesign`.

### Changed
- README.md and CHANGELOG.md files to reflect changes.
- Refactored `scriptCommands` object.

## [0.0.1] 2018-03-10
- Initial release
