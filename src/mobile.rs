use serde::de::DeserializeOwned;
use tauri::{
  plugin::{PluginApi, PluginHandle},
  AppHandle, Runtime,
};

#[cfg(target_os = "ios")]
tauri::ios_plugin_binding!(init_plugin_keyboard_inset);

// initializes the Kotlin or Swift plugin classes
pub fn init<R: Runtime, C: DeserializeOwned>(
  _app: &AppHandle<R>,
  api: PluginApi<R, C>,
) -> crate::Result<KeyboardInset<R>> {
  #[cfg(target_os = "android")]
  let handle = api.register_android_plugin("com.plugin.keyboardinset", "KeyboardInsetPlugin")?;
  #[cfg(target_os = "ios")]
  let handle = api.register_ios_plugin(init_plugin_keyboard_inset)?;
  Ok(KeyboardInset(handle))
}

/// Access to the keyboard-inset APIs.
pub struct KeyboardInset<R: Runtime>(PluginHandle<R>);
