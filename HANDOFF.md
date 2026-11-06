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
├── android-app/           ★ 唯一出包真源（build.sh/manifest/jks/dist/旧密钥备份全在此；外部 gaoshu-app 已于 2026-11-06 删除并入）
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
- **缓存版本**：`index.html` 里所有 `?v=N` 统一为当前 `v30`。改动任何前端文件后**必须升版**并同步到所有 15 个引用行。
- **构建确定性**：`node 构建单文件版.js` 输出字节级可重复（`test_metrics.py` 风格验证过）。
- **★ 真实出包通道 = 仓库内 `gaoshu/android-app/`（唯一真源）**。早期出包用仓库外 `gaoshu-app/`（v1.4 翻车就出在这套没跟仓库同步），2026-11-06 已删除 `gaoshu-app/`、把 jks/dist/旧密钥备份全并入 `android-app/`，从此**一套文件夹、且在 git 里**（jks 被 gitignore 排除、dist 产物不入库）。
  - 出包命令：`cd D:/小玩具/gaoshu/android-app && export KSPASS='你的密钥密码' && bash build.sh 6 1.5`。产物 `android-app/dist/`。
  - **★ 版本号机制（2026-11-06 实测推翻旧说法）**：aapt2 里 **manifest 赢，命令行参数无效**。`build.sh` 第 23-26 行虽把 `--version-code` 传给 aapt2，但 manifest 的 `android:versionCode` 存在时**以 manifest 为准**（把 manifest 写 99、命令行传 5，实测产出 versionCode=99）。所以改版本号**必须改 manifest 的 versionCode/versionName**，命令行那俩参数形同虚设、改不改都行。当前 manifest = `6 / 1.5`。
- **APK 壳特性**：
  - 加载**在线地址**（`HOME_URL`），联网即用，改内容不需重装 App。
  - 加载前 `web.clearCache(true)`：强制重抓线上最新 index.html，避免手机 WebView 缓存旧版顶不掉（**只清 HTTP 缓存，不动 localStorage，学习进度/错题本/同步码数据不受影响**）。2026-11-06 v1.4 加入。
  - JS 桥 `AndroidTheme.setBarColor(color)` 传当前主题 `--bg` 实际色值，原生按亮度决定浅色/深色状态栏图标 → 系统栏跟随主题。
  - 桌面图标：数学 lim + 右箭头（`res/drawable/icon.png`，192×192 RGB 满铺 4296B；旧「100件小事」占位图 22KB 已弃用，仓库 `android-app` 曾误留旧图，2026-11-06 已同步纠正）。
- **签名密钥**：`c100-release.jks`（gitignore 排除，不进仓库）。
  - **★ 2026-11-06 已轮换密钥**：旧密钥（密码曾明文进过 git 历史、现已公开仓库）已作废，新密钥密码只放本机环境变量 KSPASS。新证书 SHA-256 = `71fa1c68ac4b87b48259dad3562c29d604f36857536a80b28c4a07d55d993809`。
  - **★ 换证书后果**：装着旧 App（v1.4 及以前，旧证书 `1f403ca6…`）的手机**装不了 v1.5**（同包名 + 证书变更被系统拒绝）→ 必须先卸载旧 App 再装 v1.5。卸载会清 localStorage（学习进度/错题本/同步码全没）→ **装前先导出同步码**。
  - 同证书内 `versionCode` 保持递增即可覆盖升级（v1.5→v1.6 等不需卸载）。

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

# 出 APK（真源在仓库内 android-app）
cd D:/小玩具/gaoshu/android-app
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
| 缓存版本 | **v30**：index.html 15 处 + 构建脚本 15 处全一致 | `grep -c '?v=30'` = 15/15 |
| 构建 | `node 构建单文件版.js` 输出**字节级可重复**（重建 diff 为空） | `cmp` 前后产物 |
| 章节 | `node 检查章节范围.js` 12/12 通过 | 直接跑 |
| 单文件产物 | `高数学习工具.html` ≈ 1017KB，git 跟踪，双击即用 | `ls -la` |
| 线上 | `https://gaoshu-09255.app.workbuddy.host/?sharecode=JIU2U3JLZU`，已发 **v29**；本地前端已改到 **v30**（2026-11-06 修「去完整讲解」跨章不跳，见「五点十一」），**尚未重新发布**，手机刷新暂是 v29（跳转 bug 仍在） | `curl … \| grep -oE '\?v=[0-9]+'` |
| 出包真源 | **仓库内 `gaoshu/android-app/`（唯一）**：build.sh/manifest/jks/dist/旧密钥备份全在此；外部 `gaoshu-app/` 已于 2026-11-06 删除并入。jks、dist 被 gitignore（不进公开仓库），源码进 git | `ls gaoshu/android-app` |
| 最新 APK | `gaoshu/android-app/dist/高数学习工具-v1.5.apk`（vc=6，16853B，**新证书**） | `aapt2 dump badging` |
| 签名 | **★ 2026-11-06 已轮换**：新 jks（`android-app/c100-release.jks`）新证书 SHA-256 `71fa1c68…`（v1.5 起）。旧证书 `1f403ca6…`（v1.0~v1.4）已作废，旧泄露 jks 备份在 `android-app/_backup/` | `apksigner verify` |
| 图标 | lim+箭头新图 4296B（md5 `256dbd…`）；旧占位图 22KB 已全清 | `md5sum` |
| 壳特性 | 系统栏桥 `setBarColor`/`setTheme` + 启动 `clearCache(true)`（v1.4 加入） | `grep clearCache` = 1 |
| 版本号机制 | **aapt2 以 manifest 为准，命令行参数无效**（manifest=99 命令行=5 → 实测产出 99） | 临时副本实测 |
| 换证书后果 | 装旧 App（≤v1.4 旧证书）的手机**装不了 v1.5**（同包名+换证书被拒）→ 先卸载旧 App 再装 v1.5；卸载清 localStorage → **装前先导出同步码** | 系统行为 |
| 安全 | 旧签名密码曾明文进过 git 历史（见「七、已知风险」），已轮换密钥使其作废；新密码只放本机环境变量 KSPASS，文档不写明文 | 对仓库跑 `grep -rn "旧密码本体"` 应 = 0 |

## 五点八、v1.4 出包 + 文档全量审计（2026-11-06）
- 在**真源 `gaoshu-app/`** 出 v1.4（vc 5）：壳加 `clearCache(true)`（只清 HTTP 缓存、不动 localStorage），修「线上发新版但手机缓存旧版顶不掉」。
- 同步仓库 `gaoshu/android-app/`（图标/壳/manifest 三件与真源 cmp 全一致），删其 dist 遗留旧包。
- （注：`gaoshu-app/` 是仓库外真源；**2026-11-06 晚些已删除、全部并入仓库内 `android-app/`**，见「五点十」。历史下文若提到 gaoshu-app，现一律指 `android-app/`。）
- **推翻旧结论**：「build.sh 参数覆盖 manifest」是错的——aapt2 实测 **manifest 赢**，改版本号必须改 manifest。
- **清掉明文签名密码**：HANDOFF.md、两份 build.sh 注释里的签名密码全换占位符（文档本身不再写明文密码本体，避免再扩散；git 历史里曾存在一次，见「七、已知风险」）。
- `打包APK指南.md` 整篇重写（原写的是仓库内 android-app 旧通道 + 错版本号机制）。

## 五点九、v1.5 密钥轮换（2026-11-06）
- 旧密钥对（`c100-release.jks`，证书 `1f403ca6…`，密码曾明文进过 git 历史、公开仓库可见）→ **对高数弃用**（高数从 v1.5 起换新证书），但**没作废**——它同时是「一百件小事」App 的**在役签名密钥**，备份在 `android-app/_backup/c100-release-OLD-leaked.jks`，**绝不能删**（删了「一百件小事」就再也无法出包/覆盖升级）。
- 生成新密钥对：`keytool -genkeypair -alias c100 -keyalg RSA -keysize 2048 -validity 10000 -keystore c100-release.jks -storetype PKCS12 -dname "CN=GaoshuTool, O=Yucua, C=CN"`。新密码只放本机环境变量 KSPASS（本机已 export，本文档与进 git 的文件均不写明文本体）。
- 新证书 SHA-256 = `71fa1c68ac4b87b48259dad3562c29d604f36857536a80b28c4a07d55d993809`。
- manifest 改到 `6 / 1.5`，重签出 `android-app/dist/高数学习工具-v1.5.apk`（vc=6，16853B，签名 SHA-256 与新证书一致，自检三件套全过）。
- 同步仓库 `gaoshu/android-app/`：manifest + build.sh + jks（jks 仍 gitignore，不入库）。
- **★ 用户须知**：装着 ≤v1.4（旧证书）的手机**装不了 v1.5**（同包名 + 换证书被系统拒绝）→ 先卸载旧 App 再装 v1.5。卸载会清 localStorage（学习进度/错题本/同步码全没）→ **装前先导出同步码**。备份的旧 jks（`android-app/_backup/c100-release-OLD-leaked.jks`，证书 `1f403ca6…`）**不是高数的了**——高数从 v1.5 起只认新证书；这份旧 jks **是「一百件小事」App 在役的签名密钥**（两项目早期共用同一 jks），**保留、勿删**，「一百件小事」继续出包/覆盖升级全靠它。

## 五点十、目录合并：删 `gaoshu-app/`，只留 `android-app/`（2026-11-06）
- 删除仓库外 `D:\小玩具\gaoshu-app\`，并入 `gaoshu/android-app/`：jks（新密钥）+ `dist/` 6 个已出 APK + `_backup/c100-release-OLD-leaked.jks` 全部到位；`_chk/`（含 2KB 旧占位图）属临时垃圾，**未并入、已删**。
- 合并后**实测 `android-app/` 独立 `bash build.sh 6 1.5` 出包成功**（签名 `71fa1c68…`，BUILD_OK → `android-app/dist/`），证明它已是自足真源。
- 现状：全项目只有**一套 APK 源**（`gaoshu/android-app/`，在 git 里）；jks 与 dist 被 `.gitignore` 排除不进公开仓库。出包命令改为 `cd D:/小玩具/gaoshu/android-app && bash build.sh 6 1.5`。
- 文档里残留的 `gaoshu-app` 字样均为「五点八/五点九」的历史事件记录（当时真源确实在那里），已在对应节加了当前指向注。

## 五点十一、修「去完整讲解」跨章不跳的真根因（v29→v30，2026-11-06）
- **现象**：五点七修 `jumpSec` 让它跨章找节后，用户实测点「去「4.2」看完整讲解」仍不跳、弹层也不关。
- **真根因（类型失配）**：章节数据里 `no` 是**字符串**（`no:'4'`），`chap(no)` 用严格相等 `cs[i].no===no` 比对；而 `jumpSec` 用 `parseInt` 解析出**数字** 4 传给 `gotoSec` → `chap(4)` 里 `"4"===4` 为 false → 静默 `return`，页面纹丝不动。五点七只改了"找哪一章"，没发现 `chap()` 的严格相等被数字坑了。
- **修法（两处）**：① `chap(no)` 改 `String(cs[i].no)===String(no)`，字符串/数字都能匹配；② `gotoSec` 里 `view.ch = c.no`（存回章节对象自身的字符串 no），避免跳转后侧栏高亮 / `secStat` 查表再次因数字≠字符串失配。
- **验证（Edge 横屏实跑）**：人在第 5 章点正文「不定积分」(sec 4.1) → 弹层关、页面跳到 4.1、`#main .ix`=4.1，0 报错；跨章跳转坐实可用。
- 升版 v30（15+15 处 `?v=`），单文件版重建。

## 七、已知风险（接手必读）
- ~~git 历史里有过一次签名密码明文~~ → **已用密钥轮换化解**（2026-11-06，见「五点九」）：高数从 v1.5 起换新证书，泄露的旧密码**无法再签高数 v1.5+ 的包**。历史 commit 里仍可见旧明文密码，但因高数密钥已换、它签不了高数新版本（旧证书 `1f403ca6…` 仍活着的唯一原因是它还是「一百件小事」的在役密钥，与高数安全无关）。**未做 git 洗史**（旧密码 + 旧证书均已失效，洗史收益低且有改 hash 风险，暂不处理；如后续要上 Play Store 再评估）。
- `android-app/_backup/c100-release-OLD-leaked.jks`（旧证书 `1f403ca6…`）与 `c100-release.jks`（新证书 `71fa1c68…`）都在 gitignore 外、仅存本机：**旧 jks 是「一百件小事」App 的在役签名密钥，保留勿删**；**新 jks 是高数 v1.5+ 的唯一出包密钥，本机丢了就得重来（v1.5+ 全部要重签、手机重装）**——建议两份都备份到非本机的地方（U 盘/加密网盘）。
- aapt2 参数 `--version-code` 写进 build.sh 但**实际无效**（manifest 赢），别被脚本参数骗到。

## 六、待办 / 可选改进
- 云端自动同步（替代手动同步码）——目前未做，若嫌手动繁琐可评估。
- Play Store 上架（需 Google Play 开发者账号 + release 签名）——短期不需要。
- 图标 / 配色微调——按用户反馈随时调。
