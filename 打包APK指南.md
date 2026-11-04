# 打包安卓 APK 指南

本项目已经搭好了 Capacitor 安卓工程（`android/` 目录），**只要装好 JDK + Android SDK，一条命令就能出 APK**。

## 一、装环境（只装一次）

### 1. 装 JDK 17

- 下载：<https://adoptium.net/temurin/releases/?version=17>（选 Windows x64 的 `.msi`）
- 安装时勾选「设置 JAVA_HOME」「加入 PATH」

### 2. 装 Android SDK

最简单的方式是装 **Android Studio**（自带 SDK 管理）：

- 下载：<https://developer.android.com/studio>
- 首次打开会引导下载 SDK（勾选 Android SDK Platform 34 或 35 + Build-Tools + Platform-Tools）

装完确认环境变量（Android Studio 一般自动配好）：

```
ANDROID_HOME  = C:\Users\<你>\AppData\Local\Android\Sdk
JAVA_HOME     = C:\Program Files\Eclipse Adoptium\jdk-17...
```

验证：

```powershell
java -version        # 能看到 17.x 就对了
adb version          # 能看到版本就对了
```

## 二、出 APK

在项目根目录（`D:\小玩具\gaoshu`）的 PowerShell 里：

```powershell
# 1. 同步 web 资源到安卓工程（会先重新构建单文件版）
npm run sync:android

# 2. 打 debug 版 APK（最快，能直接装到自己手机）
npm run apk:debug
```

打完的 APK 在：

```
android\app\build\outputs\apk\debug\app-debug.apk
```

把这个 `.apk` 文件发到安卓手机上，点开安装即可（手机需允许「安装未知来源应用」）。

## 三、说明

- **debug 版**：直接能装能用，适合自己用、发给朋友试用。未优化、含调试信息。
- **release 版**：要签名（`signingConfig`）+ 才能上架商店，那是更后面的事，需要 Google Play 开发者账号。
- 改内容后要重新打包：先 `node 构建单文件版.js`，再 `npm run sync:android`，再 `npm run apk:debug`。

## 四、已知限制（WebView 里）

- `window.print()`（打印）在 WebView 里无效 —— 不影响其它功能。
- 「导出进度」的下载在 WebView 里可能不弹保存框 —— 进度本就在本机，移动端用处不大。
- 数据存 `localStorage`，卸载 App 会清空（导出/导入功能可迁移）。
