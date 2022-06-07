const hostApps = [
  {
    shortName: 'ae',
    appName: 'Adobe After Effects',
    darwin: `osascript -e 'tell application id "com.adobe.aftereffects" to {activate} DoScriptFile "{scriptFile}" with override'`,
    win32: `"{appExe}" -r {scriptFile}`,
    appExe: 'winAfterEffectsExe',
  },
  {
    shortName: 'ai',
    appName: 'Adobe Illustrator',
    darwin: `osascript -e 'tell application id "com.adobe.illustrator" to {activate} do javascript file "{scriptFile}"'`,
    win32: `"{appExe}" -r {scriptFile}`,
    appExe: 'winIllustratorExe',
  },
  {
    shortName: 'estk',
    appName: 'Adobe ExtendScript Toolkit',
    darwin: `osascript -e 'tell application id "com.adobe.estoolkit-4.0" to {activate} open "{scriptFile}"'`,
    win32: `"{appExe}" -run {scriptFile}`,
    appExe: 'winExtendscriptToolkitExe',
  },
  {
    shortName: 'ic',
    appName: 'Adobe InCopy',
    darwin: `osascript -e 'tell application id "com.adobe.InCopy" to {activate} do script "{scriptFile}" language javascript'`,
    win32: `powershell -command "$app = new-object -comobject InCopy.Application; $app.DoScript('{scriptFile}', 1246973031)"`, //http://jongware.mit.edu/idcs6js/pe_ScriptLanguage.html
  },
  {
    shortName: 'id',
    appName: 'Adobe InDesign',
    darwin: `osascript -e 'tell application id "com.adobe.InDesign" to {activate} do script "{scriptFile}" language javascript'`,
    win32: `powershell -command "$app = new-object -comobject InDesign.Application; $app.DoScript('{scriptFile}', 1246973031)"`, //http://jongware.mit.edu/idcs6js/pe_ScriptLanguage.html
  },
  {
    shortName: 'psd',
    appName: 'Adobe Photoshop',
    darwin: `osascript -e 'tell application id "com.adobe.photoshop" to {activate} do javascript file "{scriptFile}"'`,
    win32: `"{appExe}" -r {scriptFile}`,
    appExe: 'winPhotoshopExe',
  },
];

module.exports = hostApps;
