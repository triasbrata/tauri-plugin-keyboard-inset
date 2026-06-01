'use strict';

var core = require('@tauri-apps/api/core');

async function onKeyboardChange(handler) {
    return core.addPluginListener('keyboard-inset', 'keyboard', handler);
}

exports.onKeyboardChange = onKeyboardChange;
