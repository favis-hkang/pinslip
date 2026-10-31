import type { GlobalShortcutKey } from './types';

/** 全局快捷键预设键位池（速记/空白便签共用）的单一来源：
 *  有序键位列表（渲染层下拉选项顺序）、electron accelerator 映射（main 注册用）、
 *  本地化键名的 i18n 键（渲染层选项与托盘菜单共用）。
 *  新增键位在此登记三处映射即完成接入。 */
export const GLOBAL_SHORTCUT_KEYS: readonly Exclude<GlobalShortcutKey, 'off'>[] = [
  'ctrl+shift+n',
  'ctrl+alt+q',
  'ctrl+shift+q',
  'ctrl+alt+n',
  'ctrl+shift+alt+n',
  'ctrl+alt+insert',
  'ctrl+shift+win+n',
  'alt+win+n',
  'shift+win+n',
];

/** 仅 Windows 可用的键位（Win 键；macOS 上 Super 即 Cmd，语义不同）。
 *  Ctrl+Win+N 被系统占用（讲述人设置），注册必失败，不提供 */
const WINDOWS_ONLY_SHORTCUT_KEYS: ReadonlySet<GlobalShortcutKey> = new Set([
  'ctrl+shift+win+n',
  'alt+win+n',
  'shift+win+n',
]);

/** 指定平台（process.platform）可用的键位：渲染层下拉选项与 main 注册共用 */
export function shortcutKeysFor(platform: string): Exclude<GlobalShortcutKey, 'off'>[] {
  return GLOBAL_SHORTCUT_KEYS.filter((key) => platform === 'win32' || !WINDOWS_ONLY_SHORTCUT_KEYS.has(key));
}

export const GLOBAL_SHORTCUT_ACCELERATORS: Record<Exclude<GlobalShortcutKey, 'off'>, string> = {
  'ctrl+shift+n': 'CommandOrControl+Shift+N',
  'ctrl+alt+q': 'CommandOrControl+Alt+Q',
  'ctrl+shift+q': 'CommandOrControl+Shift+Q',
  'ctrl+alt+n': 'CommandOrControl+Alt+N',
  'ctrl+shift+alt+n': 'CommandOrControl+Shift+Alt+N',
  'ctrl+alt+insert': 'CommandOrControl+Alt+Insert',
  'ctrl+shift+win+n': 'Control+Shift+Super+N',
  'alt+win+n': 'Alt+Super+N',
  'shift+win+n': 'Shift+Super+N',
};

export const GLOBAL_SHORTCUT_LABEL_KEYS: Record<Exclude<GlobalShortcutKey, 'off'>, string> = {
  'ctrl+shift+n': 'settings.shortcutCtrlShiftN',
  'ctrl+alt+q': 'settings.shortcutCtrlAltQ',
  'ctrl+shift+q': 'settings.shortcutCtrlShiftQ',
  'ctrl+alt+n': 'settings.shortcutCtrlAltN',
  'ctrl+shift+alt+n': 'settings.shortcutCtrlShiftAltN',
  'ctrl+alt+insert': 'settings.shortcutCtrlAltInsert',
  'ctrl+shift+win+n': 'settings.shortcutCtrlShiftWinN',
  'alt+win+n': 'settings.shortcutAltWinN',
  'shift+win+n': 'settings.shortcutShiftWinN',
};
