/* 章节范围检查：扫描每章内容，找出"用了后面章节才教的方法"的越界表述。
 * 规则：每个知识点标记它在第几章才引入；若某章 n 的内容里出现了 intro>n 的词，就报警。
 * 豁免：why 字段（"为什么学"本来就要预告后文动机）。
 * 用法：node 检查章节范围.js
 */
const fs = require("fs");
const path = __dirname;

/* 知识点 → 引入章节 */
const INTRO = {
  "洛必达": 3, "泰勒": 3, "中值定理": 3, "罗尔": 3, "拉格朗日": 3, "柯西": 3,
  "拐点": 3, "极值": 3, "曲率": 3, "渐近线": 3,
  "导数": 2, "求导": 2, "可导": 2, "微分": 2,
  "不定积分": 4, "换元积分": 4, "分部积分": 4, "原函数": 4,
  "定积分": 5, "反常积分": 5,
  "微分方程": 7,
  "向量": 8, "数量积": 8, "向量积": 8, "混合积": 8, "法向量": 8, "方向向量": 8,
  "平面方程": 8, "直线方程": 8, "点法式": 8, "二次曲面": 8, "柱面": 8,
  "偏导": 9, "多元函数": 9, "全微分": 9,
  "重积分": 10, "二重积分": 10, "三重积分": 10,
  "曲线积分": 11, "曲面积分": 11,
  "级数": 12, "幂级数": 12, "傅里叶": 12
};
// 长词优先匹配，避免"微分方程"被"微分"先吃掉
const TERMS = Object.keys(INTRO).sort((a, b) => b.length - a.length);

/* 载入所有章节数据 */
global.window = {};
const files = fs.readdirSync(path + "/chapters").filter(f => /^ch\d+\.js$/.test(f)).sort();
files.forEach(f => eval(fs.readFileSync(path + "/chapters/" + f, "utf8")));
const chapters = global.window.CHAPOS || [];

let total = 0;
chapters.forEach(ch => {
  const n = parseInt(ch.no, 10);
  const hits = [];
  const scan = (text, where) => {
    if (!text) return;
    const s = String(text);
    TERMS.forEach(t => {
      if (INTRO[t] <= n) return;
      // Ch7（微分方程）是终点章：7.4「全微分方程」是本章合法子类，
      // 用到「全微分 / 偏导」是定义这些方程的必要工具，不算越界，故豁免。
      if (n >= 7 && (t === "全微分" || t === "偏导")) return;
      let hit;
      if (t === "定积分") {
        // "不定积分"含"定积分"三字，需排除前面紧跟"不"的子串，避免误报
        hit = /(?<!不)定积分/.test(s);
      } else {
        hit = s.indexOf(t) >= 0;
      }
      if (hit) hits.push({ where: where, term: t, intro: INTRO[t], text: s.slice(0, 60) });
    });
  };

  (ch.sections || []).forEach(sec => {
    (sec.problems || []).forEach((p, pi) => {
      scan(p.stem, sec.idx + " 题" + (pi + 1) + " 题干");
      (p.sol || []).forEach((t, i) => scan(t, sec.idx + " 题" + (pi + 1) + " 详解" + (i + 1)));
      scan(p.first, sec.idx + " 题" + (pi + 1) + " 起手式");
      scan(p.tip, sec.idx + " 题" + (pi + 1) + " 点睛");
    });
    (sec.worked || []).forEach((w, wi) => {
      scan(w.stem, sec.idx + " 例题" + (wi + 1) + " 题干");
      scan(w.first, sec.idx + " 例题" + (wi + 1) + " 起手式");
      (w.steps || []).forEach((t, i) => scan(t, sec.idx + " 例题" + (wi + 1) + " 步骤" + (i + 1)));
      scan(w.take, sec.idx + " 例题" + (wi + 1) + " 回头看");
    });
    (sec.checklist || []).forEach(k => scan(k.knowledge, sec.idx + " 清单:" + k.id));
    (sec.formulas || []).forEach((f, i) => {
      scan(f.uses, sec.idx + " 公式" + (i + 1) + " 何时用");
      scan(f.pit, sec.idx + " 公式" + (i + 1) + " 易错");
      scan(f.from, sec.idx + " 公式" + (i + 1) + " 来源");
    });
    (sec.explain || []).forEach(b => {
      scan(b.text, sec.idx + " 讲解正文");
      scan(b.points, sec.idx + " 记这个");
      scan(b.pitfall, sec.idx + " 易错");
    });
  });

  if (hits.length) {
    total += hits.length;
    console.log("\n⚠ 第" + ch.no + "章《" + ch.title + "》发现 " + hits.length + " 处越界：");
    hits.forEach(h => console.log("   · " + h.where + " → 用了「" + h.term + "」（第" + h.intro + "章才学）\n     " + h.text + "…"));
  } else {
    console.log("✅ 第" + ch.no + "章《" + ch.title + "》范围检查通过（未使用后续章节方法）");
  }
});

console.log("\n" + (total ? "共 " + total + " 处问题，需要修。" : "全部通过。"));
process.exit(total ? 1 : 0);
