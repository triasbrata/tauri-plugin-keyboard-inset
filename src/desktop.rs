use serde::de::DeserializeOwned;
use tauri::{plugin::PluginApi, AppHandle, Runtime};

pub fn init<R: Runtime, C: DeserializeOwned>(
  app: &AppHandle<R>,
  _api: PluginApi<R, C>,
) -> crate::Result<KeyboardInset<R>> {
  Ok(KeyboardInset(app.clone()))
}

/// Access to the keyboard-inset APIs (desktop no-op).
pub struct KeyboardInset<R: Runtime>(AppHandle<R>);
