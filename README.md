# Adobe Script Runner

Run Adobe After Effects and Adobe Photoshop scripts right from VSCode on Mac.

## Features

Run commands are accesible via `Command Palette`. Simply click `Cmd+Shit+P` and start typing `Adobe After Effects`, `Adobe Illustrator` or `Adobe Photoshop`. Click enter to run script inside the selected application.

Extension will open host application first if it's not running, and then execute the script.

> Tip: You don't need to have file saved inside VSCode. Extension will is able to run code from unsaved documents. Kaboom!

Map keyboard shortcuts to execute the script even faster.

**Note:** Contribution to support other Adobe applications as well as Windows is highly encouraged.

## Installation
* Download this repository and unzip the package.
* Copy `VSCode-Adobe-Script-Runner-master` to `/Users/YOURUSER/.vscode/extensions` folder.
* Launch VSCode and open your own jsx file, or for testing just type `alert("Hello World")`.
* Launch `Command Palette` with keyboard shortcut `Cmd+Shift+P` and type `Adobe After Effects` and click enter.
* Hopefully After Effects will fire up and run your script 🙏

## Settings

Extension exposes the following settings:

* `adobeScriptLauncher.saveDirty`: toggle to run unsaved (dirty) files.
* `adobeScriptLauncher.runUntitled`: toggle to run untitled files. Define location of temporary file in `adobeScriptLauncher.tempFile` setting.
* `adobeScriptLauncher.tempFile`: location to save temporary file. Used only when `adobeScriptLauncher.runUntitled` is enabled.

## Known issues
* Host application does not get focus on script run.

## Release Notes

### 0.0.1
2018-03-10 Released for public testing.

-----------------------------------------------------------------------------------------------------------