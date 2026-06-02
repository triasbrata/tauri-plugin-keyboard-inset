import { addPluginListener, type PluginListener } from '@tauri-apps/api/core'

export interface KeyboardChangeEvent {
  height: number
  visible: boolean
}

export async function onKeyboardChange(
  handler: (event: KeyboardChangeEvent) => void
): Promise<PluginListener> {
  return addPluginListener('keyboard-inset', 'keyboard', handler)
}

export interface InsetsChangeEvent {
  bottom: number
}

export async function onInsetsChange(
  handler: (event: InsetsChangeEvent) => void
): Promise<PluginListener> {
  return addPluginListener('keyboard-inset', 'insets', handler)
}
