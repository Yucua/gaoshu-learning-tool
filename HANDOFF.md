# HANDOFF.md — 高数学习工具 · 现状交接

> 最近更新：2026-11-06（全量过项目 + 文档漂移审计后）
> **接手前务必先读「五、接手速查」和「六、出包真源在哪」——本文档已逐项用硬事实核验过。**

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
├── android-app/           出包源副本（真源在仓库外 gaoshu-app，本目录 2026-11-06 已同步一致，仅作 git 可追溯备份）
│   ├── AndroidManifest.xml  ★ versionCode 以本文件为准（aapt2 命令行参数无法覆盖它，实测 manifest 赢）
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
  - 出包命令：`cd D:/小玩具/gaoshu-app && export KSPASS='你的密钥密码' && bash build.sh 5 1.4`。产物 `gaoshu-app/dist/`。
  - **★ 版本号机制（2026-11-06 实测推翻旧说法）**：aapt2 里 **manifest 赢，命令行参数无效**。`build.sh` 第 23-26 行虽把 `--version-code` 传给 aapt2，但 manifest 的 `android:versionCode` 存在时**以 manifest 为准**（把 manifest 写 99、命令行传 5，实测产出 versionCode=99）。所以改版本号**必须改 manifest 的 versionCode/versionName**，命令行那俩参数形同虚设、改不改都行。当前 manifest = `5 / 1.4`。
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

# 出 APK（真源在仓库外 gaoshu-app，不是仓库 android-app）
cd D:/小玩具/gaoshu-app
export KSPASS='你的密钥密码'
# ★ 先改 AndroidManifest.xml 的 versionCode/versionName（aapt2 以 manifest 为准，命令行参数无效）
# 再出包：
bash build.sh <vc> <ver>        # 例：bash build.sh 6 1.5（同时 manifest 已改成 6/1.5）

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

## 五、接手速查（2026-11-06 全量核验，全部有硬事实支撑）

| 项 | 当前事实 | 核验方式 |
|---|---|---|
| git | main 干净，远程 `Yucua/gaoshu-learning-tool`（GitHub） | `git status / remote -v` |
| 缓存版本 | **v28**：index.html 15 处 + 构建脚本 15 处全一致 | `grep -c '?v=28'` = 15/15 |
| 构建 | `node 构建单文件版.js` 输出**字节级可重复**（重建 diff 为空） | `cmp` 前后产物 |
| 章节 | `node 检查章节范围.js` 12/12 通过 | 直接跑 |
| 单文件产物 | `高数学习工具.html` ≈ 1017KB，git 跟踪，双击即用 | `ls -la` |
| 线上 | `https://gaoshu-09255.app.workbuddy.host/?sharecode=JIU2U3JLZU`，已发 **v28**（curl 实测 15 个 ?v=28） | `curl … \| grep -oE '\?v=[0-9]+'` |
| 出包真源 | **仓库外 `D:\小玩具\gaoshu-app\`**（v1.0~v1.4 全在其 dist/）；仓库 `gaoshu/android-app/` 已同步为一致副本，**只认 gaoshu-app** | 6 个源文件 `cmp` 全一致 + jks md5 同一 |
| 最新 APK | `gaoshu-app/dist/高数学习工具-v1.4.apk`（vc=5，16852B） | `aapt2 dump badging` |
| 签名 | jks 两处 md5 一致（同源）；v1.3/v1.4 SHA-256 `1f403ca6…` 一致可覆盖安装 | `md5sum` + `apksigner verify` |
| 图标 | lim+箭头新图 4296B（md5 `256dbd…`），两处一致；旧占位图 22KB 已全清 | `md5sum` |
| 壳特性 | 系统栏桥 `setBarColor`/`setTheme` + 启动 `clearCache(true)`（v1.4 加入） | `grep clearCache` = 1 |
| 版本号机制 | **aapt2 以 manifest 为准，命令行参数无效**（manifest=99 命令行=5 → 实测产出 99） | 临时副本实测 |
| 安全 | 签名密码已从 HANDOFF/build.sh 注释清除（历史 commit 里仍有过一次明文，见「七、已知风险」） | `grep c100journal` = 0 |

## 五点八、v1.4 出包 + 文档全量审计（2026-11-06）
- 在**真源 `gaoshu-app/`** 出 v1.4（vc 5）：壳加 `clearCache(true)`（只清 HTTP 缓存、不动 localStorage），修「线上发新版但手机缓存旧版顶不掉」。
- 同步仓库 `gaoshu/android-app/`（图标/壳/manifest 三件与真源 cmp 全一致），删其 dist 遗留旧包。
- **推翻旧结论**：「build.sh 参数覆盖 manifest」是错的——aapt2 实测 **manifest 赢**，改版本号必须改 manifest。
- **清掉明文签名密码**：HANDOFF.md、两份 build.sh 注释里的 `c100journal` 全换占位符（git 历史里曾存在一次，见「七、已知风险」）。
- `打包APK指南.md` 整篇重写（原写的是仓库内 android-app 旧通道 + 错版本号机制）。

## 七、已知风险（接手必读）
- **git 历史里有过一次签名密码明文**（`cefca5b` 之前的 HANDOFF.md，已清掉，仅历史 commit 可见）。jks 本体不在仓库，风险有限；若要彻底消除可对该仓库做 BFG/filter-branch 洗史 + 强制推送（会改 commit hash，慎做），或干脆换新密钥对重新签名出包。
- `gaoshu-app/` 在仓库外、**不在 git 里**：jks/新图标/壳代码改动无版本记录。出包前改动务必在仓库 `android-app/` 留同步副本。
- aapt2 参数 `--version-code` 写进 build.sh 但**实际无效**（manifest 赢），别被脚本参数骗到。

## 六、待办 / 可选改进
- 云端自动同步（替代手动同步码）——目前未做，若嫌手动繁琐可评估。
- Play Store 上架（需 Google Play 开发者账号 + release 签名）——短期不需要。
- 图标 / 配色微调——按用户反馈随时调。
