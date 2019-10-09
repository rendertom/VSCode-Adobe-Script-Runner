# Adobe Script Runner

Script runner for Adobe applications right from VSCode. Extension available for [Atom.io](https://atom.io/packages/adobe-script-runner), [Sublime Text](https://github.com/rendertom/Sublime-Text-Adobe-Script-Runner) and [VSCode](https://marketplace.visualstudio.com/items?itemName=renderTom.adobe-script-runner).

![Adobe Script Runner](/resources/Adobe-Script-Runner.gif)

## Supported applications

- Adobe After Effects
- Adobe ExtendScript Toolkit
- Adobe Illustrator
- Adobe InCopy
- Adobe InDesign
- Adobe Photoshop

## Features

Run commands are accessible via `Command Palette`. Simply click `F1` or `Cmd+Shift+P` and start typing the name of `supported applications`. Click enter to run the script inside the selected application.

The extension will open host application first if it's not running, and then execute the script.

> Tip: You don't need to have the file saved inside VSCode. The extension will be able to run code from unsaved documents. Kaboom!

Map keyboard shortcuts to execute a script even faster - `Cmd+R` is bind to run a script inside After Effects by default. Read how to change it in [Key bindings](#key-bindings).

## Installation

- ### From VSCode application
  - Open `Extensions` and type `Adobe Script Runner`.
  - Click `Install` and then `Reload` button.

- ### From GitHub
  - Download repository and unzip the package.
  - Copy `VSCode-Adobe-Script-Runner-master` to `/Users/YOURUSER/.vscode/extensions` folder.

## In action

- Launch VSCode and open jsx file, or for testing just type `alert("Hello World")`.
- Click `Cmd+R` on Mac or `Ctrl+R` on Windows or launch `Command Palette` with keyboard shortcut `F1` or `Cmd+Shift+P` and type `Adobe After Effects` and click enter.
- Hopefully After Effects will fire up and execute your script 🙏

## Evaluate Token

TODO

## Key bindings

Keyboard shortcut `Cmd+R` is bind to `adobeScriptRunner.ae` command, which will run a script inside Adobe After Effects. To change the command or assign a different shortcut, do the following:

- Open Keyboard Shortcuts editor and click on the link `keybindings.json`.
- This will open the Default Keyboard Shortcuts on the left and your `keybindings.json` file where you can overwrite the default bindings on the right.
- With `keybindings.json` in focus click `Cmd+K` twice to open an interactive keybinding modal window (or whatever it’s called) and follow the on-screen instructions. This will create a new binding entry in the `keybindings.json` file.
- Edit the `command` property to `adobeScriptRunner.XX`, where XX is an abbreviation of the application. Check available abbreviations in `Extensions > Adobe Script Runner > Contributions` tab. 

The result should look something like this:

```json
{
    "key": "cmd+r",
    "command": "adobeScriptRunner.ae",
    "when": "editorTextFocus"
},
```

For more information about keybinding check official [Key Bindings for Visual Studio Code](https://code.visualstudio.com/docs/getstarted/keybindings).

## Settings

Click `Cmd+,` on Mac or `Ctrl+,` on Windows to modify settings. Extension exposes the following settings:

- `adobeScriptRunner.saveFileBeforeExecution`: Whether to save file before execution.
- `adobeScriptRunner.temporaryFile`: Path to a temporary file where Untitled document gets saved prior to execution. Used only when active document does not have a path.

**For Windows users only:**

- `adobeScriptRunner.winAfterFxExe`: path to Adobe After Effects executable (AfterFX.exe).
- `adobeScriptRunner.winEstkExe`: path to Adobe ExtendScript Toolkit executable (ExtendScript Toolkit.exe).
- `adobeScriptRunner.winIllustratorExe`: path to Adobe Illustrator executable (Illustrator.exe).
- `adobeScriptRunner.winPhotoshopExe`: path to Adobe Photoshop executable (Photoshop.exe).

Executable paths for InCopy and InDesign for Windows are not exposed because they are handled differently than the rest of the Adobe apps. Go figure Adobe ¯\\\_(ツ)\_/¯

## Known issues

- The host application does not get focus on script run.