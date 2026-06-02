import { type PluginListener } from '@tauri-apps/api/core';
export interface KeyboardChangeEvent {
    height: number;
    visible: boolean;
}
export declare function onKeyboardChange(handler: (event: KeyboardChangeEvent) => void): Promise<PluginListener>;
export interface InsetsChangeEvent {
    bottom: number;
}
export declare function onInsetsChange(handler: (event: InsetsChangeEvent) => void): Promise<PluginListener>;
