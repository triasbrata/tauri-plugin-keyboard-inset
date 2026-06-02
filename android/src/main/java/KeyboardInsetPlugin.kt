package com.plugin.keyboardinset

import android.app.Activity
import android.graphics.Rect
import android.os.Build
import android.webkit.WebView
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import app.tauri.annotation.TauriPlugin
import app.tauri.plugin.JSObject
import app.tauri.plugin.Plugin
import kotlin.math.max
import kotlin.math.roundToInt

@TauriPlugin
class KeyboardInsetPlugin(private val activity: Activity) : Plugin(activity) {

    override fun load(webView: WebView) {
        val root = activity.window.decorView

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            // API 30+: ime() insets are reliable
            ViewCompat.setOnApplyWindowInsetsListener(root) { _, insets ->
                val imeBottom = insets.getInsets(WindowInsetsCompat.Type.ime()).bottom
                val navBottom = insets.getInsets(WindowInsetsCompat.Type.navigationBars()).bottom
                val kbPx = max(0, imeBottom - navBottom)
                val density = activity.resources.displayMetrics.density
                val cssPx = (kbPx / density).roundToInt()
                emit(cssPx, cssPx > 0)
                val navCss = (navBottom / density).roundToInt()
                emitInsets(navCss)
                insets // do NOT consume — return unchanged
            }
        } else {
            // API 24–29 fallback: ime() returns 0; measure visible display frame
            root.viewTreeObserver.addOnGlobalLayoutListener {
                val rect = Rect()
                root.getWindowVisibleDisplayFrame(rect)
                val screenH = root.height
                val kbPx = screenH - rect.bottom
                val density = activity.resources.displayMetrics.density
                val cssPx = (kbPx / density).roundToInt()
                val threshold = 120 // dp; below this is nav/status bar, not keyboard
                val effectiveCssPx = if (cssPx > threshold) cssPx else 0
                emit(effectiveCssPx, effectiveCssPx > 0)
                val navPx = ViewCompat.getRootWindowInsets(root)
                    ?.getInsets(WindowInsetsCompat.Type.navigationBars())?.bottom ?: 0
                emitInsets((navPx / activity.resources.displayMetrics.density).roundToInt())
            }
        }
        root.post { ViewCompat.requestApplyInsets(root) }
    }

    private fun emit(heightCssPx: Int, visible: Boolean) {
        val payload = JSObject().apply {
            put("height", heightCssPx)
            put("visible", visible)
        }
        trigger("keyboard", payload)
    }

    private fun emitInsets(bottomCssPx: Int) {
        trigger("insets", JSObject().apply { put("bottom", bottomCssPx) })
    }
}
