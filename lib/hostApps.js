const hostApps = [
  {
    shortName: 'ae',
    appName: 'Adobe After Effects',
    darwin: `osascript -e 'tell application id "com.adobe.AfterEffects" to {activate} DoScriptFile "{scriptFile}" with override'`,
    win32: `"{appExe}" -r {scriptFile}`,
    appExe: 'winAfterEffectsExe',
  },
  {
    shortName: 'ae-beta',
    appName: 'Adobe After Effects (Beta)',
    darwin: `osascript -e 'tell application id "com.adobe.AfterEffectsBeta" to {activate} DoScriptFile "{scriptFile}" with override'`,
    win32: `"{appExe}" -r {scriptFile}`,
    appExe: 'winAfterEffectsBetaExe',
  },
  {
    shortName: 'ai',
    appName: 'Adobe Illustrator',
    darwin: `osascript -e 'tell application id "com.adobe.illustrator" to {activate} do javascript file "{scriptFile}"'`,
    win32: `"{appExe}" -r {scriptFile}`,
    appExe: 'winIllustratorExe',
  },
  {
    shortName: 'ai-beta',
    appName: 'Adobe Illustrator (Beta)',
    darwin: `osascript -e 'tell application id "com.adobe.illustratorBeta" to {activate} do javascript file "{scriptFile}"'`,
    win32: `"{appExe}" -r {scriptFile}`,
    appExe: 'winIllustratorBetaExe',
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
    darwin: `osascript -e 'tell application id "com.adobe.Photoshop" to {activate} do javascript file "{scriptFile}"'`,
    win32: `"{appExe}" -r {scriptFile}`,
    appExe: 'winPhotoshopExe',
  },
  {
    shortName: 'psd-beta',
    appName: 'Adobe Photoshop (Beta)',
    // Mac: Adobe Photoshop uses the same CFBundleIdentifier name (com.adobe.Photoshop)
    // for Official and Beta versions, so there's no way to target Beta version specifically
    win32: `"{appExe}" -r {scriptFile}`,
    appExe: 'winPhotoshopBetaExe',
  },
];

module.exports = hostApps;
