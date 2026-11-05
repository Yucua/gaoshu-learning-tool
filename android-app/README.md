# 高数学习工具 · 安卓 App（WebView 壳）

把「同济高数学习工具」打包成安卓 APK 的轻量工程。**不用 Gradle**，用本机一套 aapt2/javac/d8/apksigner 工具链，一条命令出 APK。

## 依赖

需要本机有 `D:\androidtools`（JDK17 + build-tools34 + android.jar platform-35）和签名密钥 `c100-release.jks`。

> 这两个都是**本机私有资产，不进仓库**（`.gitignore` 已排除 `*.jks`）。

## 打包

```bash
# 1. 设密钥密码（只在你本机，不写进脚本）
export KSPASS='你的密钥密码'

# 2. 出 APK
bash build.sh 1 1.0
```

产出在 `dist/高数学习工具-v1.0.apk`。

## 结构

- `AndroidManifest.xml` —— 包名 `com.yucua.gaoshu`，应用名「高数学习工具」
- `src/com/yucua/gaoshu/MainActivity.java` —— WebView 壳，加载在线地址
- `res/` —— 图标、主题、颜色
- `build.sh` —— 一键构建脚本（aapt2 → javac → d8 → zipalign → apksigner）

## 说明

- 加载的是**在线地址**，打开需联网；改内容后无需重装 App。
- 签名密钥与「一百件小事」同源，将来可互相覆盖升级。
