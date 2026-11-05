# 打包安卓 APK 指南

本项目**不走 Gradle / Capacitor**（旧方案已移除）。APK 用 `android-app/` 里的一套轻量工具链
（aapt2 → javac → d8 → zipalign → apksigner）一条命令出包，壳加载的是**在线地址**，
改网页内容后只需重新出包即可，App 端无需改代码。

> 当前真实出包通道 = `android-app/build.sh`（产出的就是 v1.3 起在用的 APK：
> 数学 lim 图标 + 状态栏/导航栏跟随主题）。

## 一、本机依赖（私有，不进仓库）

- `D:\androidtools\`：JDK17 + build-tools34（`bt/`）+ `android.jar`（platform-35）
- `android-app/c100-release.jks`：签名密钥（`.gitignore` 已排除 `*.jks`，绝不能进仓库）

## 二、出 APK

在仓库根目录（`D:\小玩具\gaoshu`）的 Git Bash / PowerShell 里：

```bash
# 1. 设密钥密码（只在你本机，不写进脚本）
export KSPASS='你的密钥密码'        # PowerShell 用 $env:KSPASS='你的密钥密码'

# 2. 出 APK（版本号 / 版本名 两个参数）
bash android-app/build.sh 4 1.3
```

产出在 `android-app/dist/高数学习工具-v1.3.apk`。

## 三、说明

- **签名与「一百件小事」同源**，同一密钥可互相覆盖升级（保持 `versionCode` 递增）。
- 壳里 `MainActivity.java` 的 `HOME_URL` 指向在线地址，联网即用。
- 版本号在 `android-app/AndroidManifest.xml` 的 `versionCode`/`versionName` 处也可写死，
  但 `build.sh` 的两个参数会覆盖它，命令行传参即可。

## 四、已知限制（WebView 里）

- `window.print()`（打印）在 WebView 里无效 —— 不影响其它功能。
- 「导出进度」的下载在 WebView 里可能不弹保存框 —— 进度本就在本机，移动端用处不大。
- 数据存 `localStorage`，卸载 App 会清空（同步码 / 导出导入功能可迁移）。
