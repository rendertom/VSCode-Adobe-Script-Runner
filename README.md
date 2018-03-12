# Adobe Script Runner
Script runner for Adobe applications right from VSCode on Mac.

![Adobe Script Runner](/resources/Adobe-Script-Runner.gif)

## Supported applications
- Adobe After Effects
- Adobe ExtendScript Toolkit
- Adobe Illustrator
- Adobe InCopy
- Adobe InDesign
- Adobe Photoshop

## Features

Run commands are accessible via `Command Palette`. Simply click `F1` or `Cmd+Shit+P` and start typing the name of `supported applications`. Click enter to run script inside the selected application.

Extension will open host application first if it's not running, and then execute the script.

> Tip: You don't need to have file saved inside VSCode. Extension will be able to run code from unsaved documents. Kaboom!

Map keyboard shortcuts to execute the script even faster.

**Note:** Contribution to support other Adobe applications as well as Windows is highly encouraged.

## Installation
* ### From Git.hub

    * Download this repository and unzip the package.
    * Copy `VSCode-Adobe-Script-Runner-master` to `/Users/YOURUSER/.vscode/extensions` folder.

* ### ~~From VSCode Marketplace~~
    * Extension is not published in the market just yet.

## In action
* Launch VSCode and open your own jsx file, or for testing just type `alert("Hello World")`.
* Launch `Command Palette` with keyboard shortcut `F1` or `Cmd+Shift+P` and type `Adobe After Effects` and click enter.
* Hopefully After Effects will fire up and run your script 🙏

## Settings

Click `Cmd+,` on Mac or `Ctrl+,` on Windows to modify settings. Extension exposes the following settings:

* `adobeScriptRunner.saveDirty`: toggle to run unsaved (dirty) files.
* `adobeScriptRunner.runUntitled`: toggle to run untitled files. Define location of temporary file in `adobeScriptRunner.tempFile` setting.
* `adobeScriptRunner.tempFile`: location to save temporary file. Used only when `adobeScriptRunner.runUntitled` is enabled.

**For Windows users only:**
* `adobeScriptRunner.winEstkExe`: path to Adobe ExtendScript Toolkit executable (ExtendScript Toolkit.exe).
* `adobeScriptRunner.winAfterFxExe`: path to Adobe After Effects executable (AfterFX.exe).
* `adobeScriptRunner.winIllustratorExe`: path to Adobe Illustrator executable (Illustrator.exe).
* `adobeScriptRunner.winPhotoshopExe`: path to Adobe Photoshop executable (Photoshop.exe).

Executable paths for InCopy and InDesign for Windows are not exposed because they are handles differently then the rest of the apps. Go figure Adobe ¯\\\_(ツ)\_/¯


## Known issues
* Host application does not get focus on script run.