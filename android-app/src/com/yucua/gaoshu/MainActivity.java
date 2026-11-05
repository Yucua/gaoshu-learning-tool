package com.yucua.gaoshu;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowInsets;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebResourceRequest;
import android.webkit.JavascriptInterface;
import android.widget.FrameLayout;

public class MainActivity extends Activity {

    // 高数学习工具在线地址
    private static final String HOME_URL = "https://gaoshu-09255.app.workbuddy.host/?sharecode=JIU2U3JLZU";
    // 伪装成普通 Chrome 移动端 UA，去掉 "wv" 标记
    private static final String UA =
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) "
            + "Chrome/126.0.0.0 Mobile Safari/537.36";

    private WebView web;
    private FrameLayout root;

    // 与网页端 --bg 保持一致
    private static final int BG_LIGHT = Color.parseColor("#F7F3EA");
    private static final int BG_DARK  = Color.parseColor("#191815");

    /** 网页把当前主题的背景色传进来，系统栏跟着变（以后加新配色不用再改 APK） */
    private class ThemeBridge {
        @JavascriptInterface
        public void setBarColor(final String color) {
            if (color == null) return;
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    try { applySystemBarColor(Color.parseColor(color.trim())); } catch (Exception ignored) {}
                }
            });
        }

        /** 兼容 v1.1 旧接口 */
        @JavascriptInterface
        public void setTheme(final String theme) {
            setBarColor("dark".equals(theme) ? "#191815" : "#F7F3EA");
        }
    }

    private void applySystemBarColor(int bg) {
        if (root != null) root.setBackgroundColor(bg);
        if (web != null) web.setBackgroundColor(bg);
        getWindow().setStatusBarColor(bg);
        getWindow().setNavigationBarColor(bg);

        // 按背景亮度自动决定图标用深色还是浅色（0.299R+0.587G+0.114B）
        int y = (int) (0.299 * Color.red(bg) + 0.587 * Color.green(bg) + 0.114 * Color.blue(bg));
        boolean lightIcons = y < 140;   // 背景深 → 图标用浅色

        if (Build.VERSION.SDK_INT >= 30) {
            android.view.WindowInsetsController c = getWindow().getInsetsController();
            if (c != null) {
                int light = android.view.WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS
                          | android.view.WindowInsetsController.APPEARANCE_LIGHT_NAVIGATION_BARS;
                c.setSystemBarsAppearance(lightIcons ? 0 : light, light);
            }
        } else {
            View v = getWindow().getDecorView();
            int flags = v.getSystemUiVisibility();
            if (lightIcons) flags &= ~View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;
            else flags |= View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;
            v.setSystemUiVisibility(flags);
        }
    }

    @SuppressLint({"SetJavaScriptEnabled", "AddJavascriptInterface"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        FrameLayout root = new FrameLayout(this);
        root.setBackgroundColor(Color.parseColor("#F7F3EA"));
        this.root = root;

        // Android 15（targetSdk 35）强制边到边，手动让出系统栏高度
        if (Build.VERSION.SDK_INT >= 30) {
            getWindow().setDecorFitsSystemWindows(false);
        }
        root.setOnApplyWindowInsetsListener(new View.OnApplyWindowInsetsListener() {
            @Override
            public WindowInsets onApplyWindowInsets(View v, WindowInsets insets) {
                if (Build.VERSION.SDK_INT < 30) {
                    v.setPadding(0, 0, 0, 0);
                    return insets;
                }
                android.graphics.Insets bars = insets.getInsets(
                        WindowInsets.Type.systemBars() | WindowInsets.Type.displayCutout());
                v.setPadding(0, bars.top, 0, bars.bottom);
                return insets;
            }
        });

        web = new WebView(this);
        web.setBackgroundColor(Color.parseColor("#F7F3EA"));
        FrameLayout.LayoutParams lp = new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
        root.addView(web, lp);
        setContentView(root);

        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setAllowFileAccess(false);
        s.setAllowContentAccess(false);
        s.setSupportZoom(false);
        s.setBuiltInZoomControls(false);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setCacheMode(WebSettings.LOAD_DEFAULT);
        s.setUseWideViewPort(true);
        s.setLoadWithOverviewMode(false);
        s.setUserAgentString(UA);
        web.addJavascriptInterface(new ThemeBridge(), "AndroidTheme");
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            s.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        }

        web.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return handleUrl(request.getUrl().toString());
            }

            @SuppressWarnings("deprecation")
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return handleUrl(url);
            }
        });

        // 清 HTTP 缓存（不影响 DOM storage / localStorage，学习进度安全）：
        // 线上重新发布后，旧缓存的 index.html(?v=旧版) 顶不掉，加这行强制重抓最新版
        web.clearCache(true);
        if (savedInstanceState != null) {
            web.restoreState(savedInstanceState);
        } else {
            web.loadUrl(HOME_URL);
        }
        web.setVisibility(View.INVISIBLE);
        web.postDelayed(new Runnable() {
            @Override
            public void run() {
                web.setVisibility(View.VISIBLE);
            }
        }, 120);
    }

    // 所有 http/https 一律留在 App 内加载，非 http 的协议交给系统
    private boolean handleUrl(String url) {
        if (url == null) return false;
        if (url.startsWith("http://") || url.startsWith("https://")) {
            return false;
        }
        try {
            startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(url)));
        } catch (ActivityNotFoundException ignored) {
        }
        return true;
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        if (web != null) web.saveState(outState);
    }

    @Override
    public void onBackPressed() {
        if (web != null && web.canGoBack()) {
            web.goBack();
            return;
        }
        moveTaskToBack(true);
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (web != null) web.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (web != null) web.onResume();
    }

    @Override
    protected void onDestroy() {
        if (web != null) {
            web.loadUrl("about:blank");
            web.destroy();
            web = null;
        }
        super.onDestroy();
    }
}
