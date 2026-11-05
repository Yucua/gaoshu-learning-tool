// 一次性生成器：为书名/节名/术语用的汉字生成「汉字→全拼」静态表 → pinyin.js
// 用 pinyin-pro（仅本机构建时跑，不进浏览器运行包），浏览器只读内联的 JSON 表，零运行时依赖。
// 运行：node chapters/_gen_pinyin.js  （需要 D:/小玩具/gaoshu/package 目录已解压 pinyin-pro）
import { pinyin } from '../package/dist/index.mjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 1) 从全部标题里收集唯一汉字
let titles = [];
for (let i = 1; i <= 12; i++) {
  const src = fs.readFileSync(path.join(__dirname, 'ch' + i + '.js'), 'utf8');
  (src.match(/no:'\d+'\s*,\s*title:'([^']+)'/g) || []).forEach(m => titles.push(m.match(/title:'([^']+)'/)[1]));
  (src.match(/idx:'[^']+'\s*,\s*title:'([^']+)'/g) || []).forEach(m => titles.push(m.match(/title:'([^']+)'/)[1]));
}
const gloss = fs.readFileSync(path.join(__dirname, '..', 'glossary.js'), 'utf8');
titles = titles.concat((gloss.match(/name:'([^']+)'/g) || []).map(m => m.replace(/name:'|'/g, '')));

const chars = [...new Set(titles.join(''))].filter(ch => /[\u4e00-\u9fa5]/.test(ch));

// 2) 逐字取全拼（不带声调），建 汉字→全拼 表
const TABLE = {};
for (const ch of chars) {
  const r = pinyin(ch, { toneType: 'none', type: 'array' });
  TABLE[ch] = (r && r[0]) ? r[0] : '';
}

// 3) 自检：有字没转出拼音就报错（多为生僻字/多音字未覆盖）
const bad = chars.filter(c => !TABLE[c]);
if (bad.length) { console.error('!! 以下字没转出拼音：' + bad.join('')); process.exit(1); }

// 4) 输出 pinyin.js
let out = "/* 汉字→全拼 表：供全局搜索做「打拼音也能中」。由 chapters/_gen_pinyin.js 用 pinyin-pro 离线生成，浏览器只读此静态表。 */\n";
out += "window.PINYIN_FULL = " + JSON.stringify(TABLE) + ";\n";
fs.writeFileSync(path.join(__dirname, '..', 'pinyin.js'), out);
console.log('已生成 pinyin.js，覆盖 ' + chars.length + ' 个汉字');
