# Adobe Script Runner
Script runner for Adobe applications right from VSCode.

![Adobe Script Runner](/resources/Adobe-Script-Runner.gif)

## Supported applications

- Adobe After Effects
- Adobe ExtendScript Toolkit
- Adobe Illustrator
- Adobe InCopy
- Adobe InDesign
- Adobe Photoshop

## Features

Run commands are accessible via `Command Palette`. Simply click `F1` or `Cmd+Shift+P` and start typing the name of `supported applications`. Click enter to run script inside the selected application.

Extension will open host application first if it's not running, and then execute the script.

> Tip: You don't need to have file saved inside VSCode. Extension will be able to run code from unsaved documents. Kaboom!

Map keyboard shortcuts to execute script even faster - `Cmd+R` is bind to run script inside After Effects by default. Read how to change it in [Key bindings](#key-bindings).

**Note:** Contribution to support other Adobe applications is highly encouraged.

## Installation

- ### From VSCode application
  - Open `Extensions` and type `Adobe Script Runner`.
  - Click `Install` and then `Reload` button.

- ### From GitHub
  - Download repository and unzip the package.
  - Copy `VSCode-Adobe-Script-Runner-master` to `/Users/YOURUSER/.vscode/extensions` folder.

## In action

- Launch VSCode and open your own jsx file, or for testing just type `alert("Hello World")`.
- Click `Cmd+R` on Mac or `Ctrl+R` on Windows or launch `Command Palette` with keyboard shortcut `F1` or `Cmd+Shift+P` and type `Adobe After Effects` and click enter.
- Hopefully After Effects will fire up and run your script 🙏

## Key bindings

Keyboard shortcut `Cmd+R` is bind to `adobeScriptRunner.ae` command, which will run script inside Adobe After Effects. To change the command or assign different shortcut, do the following:

- Open Keyboard Shortcuts editor and click on the link `keybindings.json`.
- This will open the Default Keyboard Shortcuts on the left and your `keybindings.json` file where you can overwrite the default bindings on the right.
- With `keybindings.json` in focus click `Cmd+K` twice to open interactive keybinding modal window (or whatever it’s called) and follow the on screen instructions. This will create a new binding entry in `keybindings.json` file.
- Edit the `command` property to `adobeScriptRunner.XX`, where XX is abbreviation of the application. Check available abbreviations in `Extensions > Adobe Script Runner > Contributions` tab. 

End result should look like this.

```json
{
    "key": "cmd+r",
    "command": "adobeScriptRunner.ae",
    "when": "editorTextFocus"
},
```

For more information about keybinding check official [Key Bindings for Visual Studio Code]( https://code.visualstudio.com/docs/getstarted/keybindings).

## Settings

Click `Cmd+,` on Mac or `Ctrl+,` on Windows to modify settings. Extension exposes the following settings:

- `adobeScriptRunner.saveDirty`: toggle to run unsaved (dirty) files.
- `adobeScriptRunner.runUntitled`: toggle to run untitled files. Define location of temporary file in `adobeScriptRunner.tempFile` setting.
- `adobeScriptRunner.tempFile`: location to save temporary file. Used only when `adobeScriptRunner.runUntitled` is enabled.

**For Windows users only:**

- `adobeScriptRunner.winEstkExe`: path to Adobe ExtendScript Toolkit executable (ExtendScript Toolkit.exe).
- `adobeScriptRunner.winAfterFxExe`: path to Adobe After Effects executable (AfterFX.exe).
- `adobeScriptRunner.winIllustratorExe`: path to Adobe Illustrator executable (Illustrator.exe).
- `adobeScriptRunner.winPhotoshopExe`: path to Adobe Photoshop executable (Photoshop.exe).

Executable paths for InCopy and InDesign for Windows are not exposed because they are handled differently than the rest of the apps. Go figure Adobe ¯\\\_(ツ)\_/¯

## Known issues

- Host application does not get focus on script run.