'use strict';

var core = require('@tauri-apps/api/core');

async function onKeyboardChange(handler) {
    return core.addPluginListener('keyboard-inset', 'keyboard', handler);
}
async function onInsetsChange(handler) {
    return core.addPluginListener('keyboard-inset', 'insets', handler);
}

exports.onInsetsChange = onInsetsChange;
exports.onKeyboardChange = onKeyboardChange;
