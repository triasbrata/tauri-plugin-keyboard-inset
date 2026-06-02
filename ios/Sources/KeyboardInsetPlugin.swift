import SwiftRs
import Tauri
import UIKit
import WebKit

class KeyboardInsetPlugin: Plugin {
    private weak var webview: WKWebView?

    @objc override func load(webview: WKWebView) {
        self.webview = webview

        NotificationCenter.default.addObserver(
            self,
            selector: #selector(keyboardWillChangeFrame(_:)),
            name: UIResponder.keyboardWillChangeFrameNotification,
            object: nil
        )
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(keyboardWillHide(_:)),
            name: UIResponder.keyboardWillHideNotification,
            object: nil
        )
        emitInsets()
    }

    @objc private func keyboardWillChangeFrame(_ notification: Notification) {
        guard let userInfo = notification.userInfo,
              let endFrameValue = userInfo[UIResponder.keyboardFrameEndUserInfoKey] as? NSValue
        else { return }

        let endRect = endFrameValue.cgRectValue
        let screen = webview?.window?.screen.bounds ?? UIScreen.main.bounds
        let overlap = max(0.0, screen.maxY - endRect.minY)
        emit(overlap, overlap > 0)
    }

    @objc private func keyboardWillHide(_ notification: Notification) {
        emit(0, false)
        emitInsets()
    }

    @objc private func emitInsets() {
        let bottom = webview?.window?.safeAreaInsets.bottom ?? 0
        trigger("insets", data: ["bottom": Double(bottom)])
    }

    func emit(_ height: Double, _ visible: Bool) {
        trigger("keyboard", data: ["height": height, "visible": visible])
    }

    deinit {
        NotificationCenter.default.removeObserver(self)
    }
}

@_cdecl("init_plugin_keyboard_inset")
func initPlugin() -> Plugin {
    return KeyboardInsetPlugin()
}
