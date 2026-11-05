# 打包安卓 APK 指南（2026-11-06 重写版）

本项目**不走 Gradle / Capacitor**。APK 用一套轻量工具链（aapt2 → javac → d8 →
zipalign → apksigner）一条命令出包。壳（WebView）加载的是**在线地址**，
改网页内容后只需重新发布在线版，App 端无需重装；**只有壳代码/图标/版本号变了才需要重新出包**。

> **★ 真源在仓库外：`D:\小玩具\gaoshu-app\`（v1.0~v1.4 全在这里）。**
> 仓库里的 `gaoshu/android-app/` 是同步副本（2026-11-06 已对齐），仅作 git 备份，**出包请用 gaoshu-app**。
> 在 `gaoshu-app/` 改完壳代码/图标后，记得把改动复制回仓库 `android-app/` 留档（`cp` 三个文件：MainActivity.java、icon.png、AndroidManifest.xml），然后 `git add`。

## 一、本机依赖（私有，不进仓库）

- `D:\androidtools\`：JDK17（`jdk/`）+ build-tools（`bt/`：aapt2/d8/zipalign/apksigner）+ `android.jar`（platform-35）
- `gaoshu-app/c100-release.jks`：签名密钥（两处 jks 的 md5 必须一致——与「一百件小事」同源；`.gitignore` 排除 `*.jks`）
- 构建要 `export KSPASS='你的密钥密码'`（密钥密码只放本机环境变量，**绝不写进任何进 git 的文件**）

## 二、出 APK（当前已出到 versionCode 5 / v1.4）

在 Git Bash 里：

```bash
cd D:/小玩具/gaoshu-app
export KSPASS='你的密钥密码'        # PowerShell 用 $env:KSPASS='...'
```

**★ 版本号：必须改 `AndroidManifest.xml` 的 `android:versionCode` / `android:versionName`。**
（2026-11-06 实测：aapt2 中 manifest 赢，build.sh 的 `--version-code` 参数无法覆盖 manifest。
把 manifest 写 99、命令行传 5，产出的是 versionCode=99。）

改完 manifest 再出包（build.sh 的两个参数建议也一起写上，与 manifest 保持一致，避免混淆）：

```bash
# 例：出 v1.5（manifest 先改成 versionCode=6, versionName=1.5）
bash build.sh 6 1.5
```

产出在 `gaoshu-app/dist/高数学习工具-v1.5.apk`。

**出包后自检三件套**：
1. 体积：新图 v1.4 约 16.8KB；若突然 37KB → 图标用了旧占位图，检查 `res/drawable/icon.png`。
2. 版本号：`"D:/androidtools/bt/aapt2.exe" dump badging dist/xxx.apk | grep versionCode`。
3. 签名：`apksigner verify --print-certs` 的 SHA-256 必须 = `1f403ca6f13cb9612e22ab41ca0b0b05b56da017b5529324f6457e93efea41c8`（与 v1.0~v1.4 一致，否则覆盖安装会失败）。

## 三、壳代码特性（MainActivity.java）

- `HOME_URL` 指向在线地址 `https://gaoshu-09255.app.workbuddy.host/?sharecode=JIU2U3JLZU`，联网即用。
- `web.clearCache(true)`（v1.4 加入）：启动清 HTTP 缓存，线上发新版后手机能顶掉旧缓存；**不动 localStorage，学习进度安全**。
- JS 桥 `AndroidTheme.setBarColor(color)`：网页传当前主题 `--bg` 色值，原生按亮度 0.299R+0.587G+0.114B<140 决定系统栏图标明暗 → **以后加新配色只发网页、不改 APK**。

## 四、图标

- 现用：数学 lim + 右箭头（`res/drawable/icon.png`，192×192 RGB 满铺 4296B，不切圆角让 launcher 裁）。
- 已弃用：「100件小事」占位图（22KB）——仓库 `android-app` 曾误留，2026-11-06 已纠正同步。

## 五、已知限制（WebView 里）

- `window.print()`（打印）在 WebView 里无效 —— 不影响其它功能。
- 数据存 `localStorage`，卸载 App 会清空（用同步码迁移）。

## 六、发布在线网页版（APK 壳加载的就是它）

用 WorkBuddy 的「发布为应用」把 `D:/小玩具/gaoshu` 目录发布，**复用同一 appId/链接**
（`gaoshu-09255.app.workbuddy.host`），线上 URL 不变 → APK 壳无需改。每次改完前端（升 `?v=` 版 + 构建）后重新发布即可。
