import { addPluginListener } from '@tauri-apps/api/core';

async function onKeyboardChange(handler) {
    return addPluginListener('keyboard-inset', 'keyboard', handler);
}

export { onKeyboardChange };
