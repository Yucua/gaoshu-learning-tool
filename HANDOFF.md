# HANDOFF.md — 高数学习工具 · 现状交接

> 最近更新：2026-11-05（Capacitor 死路清理后）

## 一、项目定位
同济八版《高等数学》（上+下）自学工具，纯前端零依赖，12 章 81 节。
数据存 `localStorage`（键 `gaoshu_check_v3` / `gaoshu_wrong_v3`）。
跨设备同步用**同步码**（按章节顺序位串 base64 + 指纹 + 校验位，满数据 ~574 字符，合并只升不降）。

## 二、仓库结构（清理后）
```
gaoshu/
├── index.html              主入口（内联 CSS + 内联 JS 骨架）
├── app.js                  主逻辑（主题/目录/同步码/PID 等）
├── glossary.js             术语表
├── pinyin.js               拼音表（chapters/_gen_pinyin.js 生成）
├── chapters/ch1.js … ch12.js   各章内容（window.CHAPOS）
├── vendor/
│   ├── katex/              KaTeX（构建单文件版内联用，含 woff2 字体）
│   └── fuse/fuse.min.js   Fuse 搜索
├── 构建单文件版.js          node 构建 → 高数学习工具.html（1.18MB，自包含，git 跟踪）
├── 检查章节范围.js          校验各章未越章使用后续方法
├── 启动-高数学习工具.bat   本地 python http.server 8300
├── 高数学习工具.html       构建产物（双击即用）
├── 打包APK指南.md          APK 打包流程
├── android-app/           ★ 真实出包通道（轻量 aapt2/d8/apksigner，无 Gradle）
│   ├── AndroidManifest.xml  versionCode/versionName（build.sh 参数覆盖）
│   ├── build.sh             一条命令出 APK（aapt2→javac→d8→zipalign→apksigner）
│   ├── src/com/yucua/gaoshu/MainActivity.java  WebView 壳，HOME_URL=在线地址
│   ├── res/                 图标/主题/颜色
│   ├── c100-release.jks     签名密钥（gitignore 排除，不进仓库）
│   └── dist/                构建产物（gitignore 排除）
└── LICENSE / README.md / .gitignore / package.json（纯脚本，零依赖）
```

**已删除（死路 / 本地临时）**：
`android/`（Capacitor Gradle 工程）、`.github/workflows/build-apk.yml`（CI）、
`capacitor.config.json`、`package-lock.json`、`node_modules/`、`www/`、
`dist/`（顶层构建目录）、`_py.tgz`、`package/`、`_test_speed.js`。

## 三、关键约定与红线
- **缓存版本**：`index.html` 里所有 `?v=N` 统一为当前 `v25`。改动任何前端文件后**必须升版**并同步到所有 15 个引用行。
- **构建确定性**：`node 构建单文件版.js` 输出字节级可重复（`test_metrics.py` 风格验证过）。
- **APK 出包**：只走 `android-app/build.sh`（`bash android-app/build.sh 4 1.3`），KSPASS 从环境变量读。签名 alias `c100`，密钥密码本机私有。
- **APK 壳特性**：
  - 加载**在线地址**（`HOME_URL`），联网即用，改内容不需重装 App。
  - JS 桥 `AndroidTheme.setBarColor(color)` 传当前主题 `--bg` 实际色值，原生按亮度决定浅色/深色状态栏图标 → 系统栏跟随主题。
  - 桌面图标：数学 lim + 右箭头（`res/drawable/icon.png`，192×192 RGB 满铺）。
- **签名密钥**：与「一百件小事」同源（`c100-release.jks`），`versionCode` 保持递增即可覆盖升级。

## 四、数据流
- **进度**：`localStorage.gaoshu_check_v3`（checks：0不会/1半懂/2会）、`gaoshu_wrong_v3`（wrong：布尔）
- **同步码**：按章节顺序位串编码 → base64 + 指纹 + 校验位（`sum % 99991`），`makeSyncCode()` 生成、`parseSyncCode()` 解析、`mergeSync()` 合并（只升级不降级）
- **跨设备**：手机生成同步码 → 电脑粘贴导入 → 两边一致

## 五、常用命令
```bash
# 构建单文件版
node 构建单文件版.js

# 校验章节范围
node 检查章节范围.js

# 出 APK（在仓库根目录，Git Bash）
export KSPASS='你的密钥密码'
bash android-app/build.sh 4 1.3

# 本地启动
# 双击 启动-高数学习工具.bat（python http.server 8300）
```

## 六、待办 / 可选改进
- 云端自动同步（替代手动同步码）——目前未做，若嫌手动繁琐可评估。
- Play Store 上架（需 Google Play 开发者账号 + release 签名）——短期不需要。
- 图标 / 配色微调——按用户反馈随时调。
