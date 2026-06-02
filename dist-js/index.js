import { addPluginListener } from '@tauri-apps/api/core';

async function onKeyboardChange(handler) {
    return addPluginListener('keyboard-inset', 'keyboard', handler);
}
async function onInsetsChange(handler) {
    return addPluginListener('keyboard-inset', 'insets', handler);
}

export { onInsetsChange, onKeyboardChange };
