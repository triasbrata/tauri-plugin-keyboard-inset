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
