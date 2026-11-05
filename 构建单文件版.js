// 构建单文件版：把 index.html + KaTeX(含字体 base64) + ch1.js + app.js 内联成一个自包含 HTML
// 完全不依赖网络、不依赖任何外部文件，双击即可用。
const fs = require("fs");
const path = __dirname;

let html = fs.readFileSync(path + "/index.html", "utf8");
const gloss = fs.readFileSync(path + "/glossary.js", "utf8");
const ch1  = fs.readFileSync(path + "/chapters/ch1.js", "utf8");
const ch2  = fs.readFileSync(path + "/chapters/ch2.js", "utf8");
const ch3  = fs.readFileSync(path + "/chapters/ch3.js", "utf8");
const ch4  = fs.readFileSync(path + "/chapters/ch4.js", "utf8");
const ch5  = fs.readFileSync(path + "/chapters/ch5.js", "utf8");
const ch6  = fs.readFileSync(path + "/chapters/ch6.js", "utf8");
const ch7  = fs.readFileSync(path + "/chapters/ch7.js", "utf8");
const ch8  = fs.readFileSync(path + "/chapters/ch8.js", "utf8");
const ch9  = fs.readFileSync(path + "/chapters/ch9.js", "utf8");
const ch10 = fs.readFileSync(path + "/chapters/ch10.js", "utf8");
const ch11 = fs.readFileSync(path + "/chapters/ch11.js", "utf8");
const ch12 = fs.readFileSync(path + "/chapters/ch12.js", "utf8");
const app  = fs.readFileSync(path + "/app.js", "utf8");
const pinyin = fs.readFileSync(path + "/pinyin.js", "utf8");
const fuse = fs.readFileSync(path + "/vendor/fuse/fuse.min.js", "utf8");

/* ---------- 1) KaTeX CSS：把 fonts/*.woff2 转成 base64 内联 ---------- */
let kcss = fs.readFileSync(path + "/vendor/katex/katex.min.css", "utf8");
let fontCount = 0, fontBytes = 0;
kcss = kcss.replace(/url\(fonts\/([^)]+?\.woff2)\)/g, function (m, file) {
  const fp = path + "/vendor/katex/fonts/" + file;
  if (!fs.existsSync(fp)) { console.warn("缺字体:", file); return m; }
  const b64 = fs.readFileSync(fp).toString("base64");
  fontCount++; fontBytes += b64.length;
  return "url(data:font/woff2;base64," + b64 + ")";
});
// 去掉多余的 woff/ttf 备选（文件没打包），保留 woff2 即可
kcss = kcss.replace(/,url\(fonts\/[^)]+?\.(woff|ttf)\)\s*format\("(woff|truetype)"\)/g, "");

/* ---------- 2) 内联 KaTeX 与业务脚本 ---------- */
const katexJs = fs.readFileSync(path + "/vendor/katex/katex.min.js", "utf8");
const autoJs  = fs.readFileSync(path + "/vendor/katex/contrib/auto-render.min.js", "utf8");

function inlineScript(src) {
  // 防御：脚本里若出现 </script 会提前闭合，替换成安全形式
  return "<script>\n" + src.replace(/<\/script/gi, "<\\/script") + "\n</script>";
}

const tagKcss  = '<link rel="stylesheet" href="vendor/katex/katex.min.css" />';
const tagKjs   = '<script defer src="vendor/katex/katex.min.js"></script>';
const tagAuto  = '<script defer src="vendor/katex/contrib/auto-render.min.js"></script>';
const tagCh1   = '<script src="chapters/ch1.js?v=12"></script>';
const tagCh2   = '<script src="chapters/ch2.js?v=12"></script>';
const tagCh3   = '<script src="chapters/ch3.js?v=12"></script>';
const tagCh4   = '<script src="chapters/ch4.js?v=12"></script>';
const tagCh5   = '<script src="chapters/ch5.js?v=12"></script>';
const tagCh6   = '<script src="chapters/ch6.js?v=12"></script>';
const tagCh7   = '<script src="chapters/ch7.js?v=12"></script>';
const tagCh8   = '<script src="chapters/ch8.js?v=12"></script>';
const tagCh9   = '<script src="chapters/ch9.js?v=12"></script>';
const tagCh10  = '<script src="chapters/ch10.js?v=12"></script>';
const tagCh11  = '<script src="chapters/ch11.js?v=12"></script>';
const tagCh12  = '<script src="chapters/ch12.js?v=12"></script>';
const tagApp   = '<script src="app.js?v=12"></script>';
const tagGloss = '<script src="glossary.js?v=12"></script>';
const tagPinyin = '<script src="pinyin.js?v=12"></script>';
const tagFuse   = '<script defer src="vendor/fuse/fuse.min.js"></script>';

[["css", tagKcss, "<style>\n" + kcss + "\n</style>"],
 ["kjs", tagKjs, inlineScript(katexJs)],
 ["auto", tagAuto, inlineScript(autoJs)],
 ["gloss", tagGloss, inlineScript(gloss)],
 ["pinyin", tagPinyin, inlineScript(pinyin)],
 ["fuse", tagFuse, inlineScript(fuse)],
 ["ch1", tagCh1, inlineScript(ch1)],
 ["ch2", tagCh2, inlineScript(ch2)],
 ["ch3", tagCh3, inlineScript(ch3)],
 ["ch4", tagCh4, inlineScript(ch4)],
 ["ch5", tagCh5, inlineScript(ch5)],
 ["ch6", tagCh6, inlineScript(ch6)],
 ["ch7", tagCh7, inlineScript(ch7)],
 ["ch8", tagCh8, inlineScript(ch8)],
 ["ch9", tagCh9, inlineScript(ch9)],
 ["ch10", tagCh10, inlineScript(ch10)],
 ["ch11", tagCh11, inlineScript(ch11)],
 ["ch12", tagCh12, inlineScript(ch12)],
 ["app", tagApp, inlineScript(app)]
].forEach(function (x) {
  const name = x[0], tag = x[1], rep = x[2];
  if (!html.includes(tag)) { console.error("!! 找不到标签:", name); process.exit(1); }
  html = html.split(tag).join(rep);
});

fs.writeFileSync(path + "/高数学习工具.html", html, "utf8");

console.log("已生成单文件");
console.log("  总字节:", (html.length / 1024).toFixed(0) + " KB");
console.log("  内联字体:", fontCount, "个 (base64 共", (fontBytes / 1024).toFixed(0) + " KB)");
console.log("  剩余外部 script src:", (html.match(/<script src="[^"]+"><\/script>/g) || []).length);
console.log("  剩余外部 css link:", (html.match(/<link[^>]+href="https?:[^"]+"/g) || []).length);
console.log("  含 window.CHAPOS:", html.includes("window.CHAPOS"));
console.log("  含 katex:", html.indexOf("katex") >= 0);
