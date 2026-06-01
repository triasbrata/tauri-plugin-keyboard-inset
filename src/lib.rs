use tauri::{
  plugin::{Builder, TauriPlugin},
  Manager, Runtime,
};

#[cfg(desktop)]
mod desktop;
#[cfg(mobile)]
mod mobile;

mod error;

pub use error::{Error, Result};

#[cfg(desktop)]
use desktop::KeyboardInset;
#[cfg(mobile)]
use mobile::KeyboardInset;

/// Extensions to [`tauri::App`], [`tauri::AppHandle`] and [`tauri::Window`] to access the keyboard-inset APIs.
pub trait KeyboardInsetExt<R: Runtime> {
  fn keyboard_inset(&self) -> &KeyboardInset<R>;
}

impl<R: Runtime, T: Manager<R>> crate::KeyboardInsetExt<R> for T {
  fn keyboard_inset(&self) -> &KeyboardInset<R> {
    self.state::<KeyboardInset<R>>().inner()
  }
}

/// Initializes the plugin.
pub fn init<R: Runtime>() -> TauriPlugin<R> {
  Builder::new("keyboard-inset")
    .setup(|app, api| {
      #[cfg(mobile)]
      let keyboard_inset = mobile::init(app, api)?;
      #[cfg(desktop)]
      let keyboard_inset = desktop::init(app, api)?;
      app.manage(keyboard_inset);
      Ok(())
    })
    .build()
}
