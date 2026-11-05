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
- **缓存版本**：`index.html` 里所有 `?v=N` 统一为当前 `v28`。改动任何前端文件后**必须升版**并同步到所有 15 个引用行。
- **构建确定性**：`node 构建单文件版.js` 输出字节级可重复（`test_metrics.py` 风格验证过）。
- **★ 真实出包通道 = 仓库外 `D:\小玩具\gaoshu-app\`**（v1.0~v1.4 都在这；build.sh 与仓库 `android-app/` 同源，但仓库那套 2026-11-06 前是旧源——旧占位图标、壳缺系统栏桥，**出包别用它**，现已同步一致）。
  - 出包命令：`cd D:/小玩具/gaoshu-app && export KSPASS='c100journal' && bash build.sh 5 1.4`。产物 `gaoshu-app/dist/`。manifest 写死 versionCode，改版本号走命令行传参并同步改 manifest。当前已出 **versionCode 5 / v1.4**。
- **APK 壳特性**：
  - 加载**在线地址**（`HOME_URL`），联网即用，改内容不需重装 App。
  - 加载前 `web.clearCache(true)`：强制重抓线上最新 index.html，避免手机 WebView 缓存旧版顶不掉（**只清 HTTP 缓存，不动 localStorage，学习进度/错题本/同步码数据不受影响**）。2026-11-06 v1.4 加入。
  - JS 桥 `AndroidTheme.setBarColor(color)` 传当前主题 `--bg` 实际色值，原生按亮度决定浅色/深色状态栏图标 → 系统栏跟随主题。
  - 桌面图标：数学 lim + 右箭头（`res/drawable/icon.png`，192×192 RGB 满铺 4296B；旧「100件小事」占位图 22KB 已弃用，仓库 `android-app` 曾误留旧图，2026-11-06 已同步纠正）。
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

## 五点五、本次美化（v25→v26，2026-11-05）
- 只动 `index.html` 令牌层，不动 DOM：正文 `--fs-body` 14→**15px**、行高 `--lh` 1.68→**1.72**、辅档 `--fs-sm` 12.5→13px、间距 `--sp5/--sp6` 放大；字号阶梯收敛为 15/22（正文/大标题）。
- 移动端讲解块 `.why/.analogy/.keypoint/.pitfall`、题干 `.prob .stem` 跟上去（13.5/14→14.5px）。
- 暗色硬编码色纳入主题：`#pop` 弹卡阴影、`.search-overlay` 蒙层、`.search-panel` 阴影、`.term` 点状底 —— 暗色下不再发灰残留。
- 15 个 `?v=26` 行 + `构建单文件版.js` 同步升版；单文件版重建（1016KB）。
- 验证：系统 Edge 横屏 812×375 渲染亮/暗/章节页，0 JS 报错、`#errbanner` 不冒。
- **缓存版本现为 v26**（见下节红线）。

## 五点六、性能优化（v26→v27，2026-11-05）
针对「代码 review 找出的性能隐患」做两处纯前端优化，不动功能与视觉：
- **P0 · KaTeX 重排收窄**：`render()` 里 `typeset()` → `typeset(main)`，只重排主内容区，不再扫 `document.body`（含 `#sidebar`/`#pop`）。`typeset(el)` 接受目标元素参数。点掌握度/切页不再全页重排公式。
- **P1 · 术语标记 Trie 化**：`markTerms` 原来每字符线性扫 80 个术语（O(文本×术语数)），改成一次建 Trie（`buildTermTrie()`，叶子挂完整术语对象），每字符沿 Trie 走到底取最长未标命中，O(文本×命中链长)。语义与原先完全一致（最长优先 + 每词每页只标一次）。
- 15 个 `?v=27` 行 + `构建单文件版.js` 同步升版；单文件版重建（1017KB）。
- 验证：系统 Edge 横屏 812×375 —— 第 1 节学习页术语 8 个正常标记、公式手册页 228 个 KaTeX/144 卡片全渲染、点掌握度 1ms、0 JS 报错。
- **缓存版本现为 v27**（见下节红线）。

## 五点七、bug 修复：术语卡「去 xx 看完整讲解」跨章不跳（v27→v28，2026-11-05）
- **现象**：术语小卡底部「去『5.1』看完整讲解 →」点击无反应、页面不跳。
- **根因**：`jumpSec(idx)` 只在**当前章** `chap(view.ch)` 的节里按 idx 找，而术语 `sec` 是全局编号（如 `"5.1"`）。人在第 1 章点"5.1"，就在第 1 章里找 `"5.1"` → 找不到 → 静默 `return`，页面纹丝不动。
- **修法**（一行）：`jumpSec` 从编号前缀解析章号，交给现成的 `gotoSec(no, idx)`（带导航栈 + 找不到跳第 0 节兜底，正是搜索跨章跳正在用的函数）：
  ```js
  function jumpSec(idx){
    var no = parseInt(String(idx||"").split(".")[0],10);
    if(no) gotoSec(no, idx);
  }
  ```
- 15 个 `?v=28` 行 + `构建单文件版.js` 同步升版；单文件版重建。
- **缓存版本现为 v28**（见下节红线）。

## 六、待办 / 可选改进
- 云端自动同步（替代手动同步码）——目前未做，若嫌手动繁琐可评估。
- Play Store 上架（需 Google Play 开发者账号 + release 签名）——短期不需要。
- 图标 / 配色微调——按用户反馈随时调。
