import { type PluginListener } from '@tauri-apps/api/core';
export interface KeyboardChangeEvent {
    height: number;
    visible: boolean;
}
export declare function onKeyboardChange(handler: (event: KeyboardChangeEvent) => void): Promise<PluginListener>;
