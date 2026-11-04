window.CHAPOS.push({
  no:'4', title:'不定积分', sub:'同济八版第四章 · 全 5 节',
  sections:[
  /* ========== 4.1 不定积分的概念与性质 ========== */
  {
    idx:'4.1', title:'不定积分的概念与性质',
    why:'前面会求导了，但求导是"减"的过程：把曲线削成斜率，信息被丢掉了。不定积分就是**反向操作**：给斜率函数，把曲线找回来。求面积、解微分方程，全靠这一章先有"反函数库"。',
    explain:[
      { analogy:'导数是"录像倒放"：知道斜率曲线，反推出原曲线。但倒放时起点（常数）不知道，所以答案**永远差一个 C**。',
        points:'若 $F\'(x)=f(x)$，则 $F(x)$ 是 $f(x)$ 的**原函数**。原函数有无穷多个（差一个常数），全部写成 $\\int f(x)\\,dx=F(x)+C$，**不定积分 = 全体原函数**。',
        pitfall:'两个高频错：① 漏写 $+C$——漏一个，整题 0 分；② 以为不定积分是"唯一的函数"，其实它是一**族**函数。' },
      { chain:'求导 f→f′ 丢信息（常数没了）→ 反推 f′→f 补回常数 → 写 $+C$ 承认"这一族都行"。',
        text:'记住积分与导数是**互逆运算**：$\\dfrac{d}{dx}\\left(\\int f\\,dx\\right)=f(x)$，反过来 $\\int F\'(x)\\,dx=F(x)+C$。' },
      { analogy:'就像乘法口诀的逆：除法。$\\int x^n\\,dx=\\dfrac{x^{n+1}}{n+1}+C$，就是把求导"$x^n\\to nx^{n-1}$"倒过来。',
        points:'**基本积分表**（求导表倒过来抄）：$\\int x^\\mu\\,dx=\\dfrac{x^{\\mu+1}}{\\mu+1}+C\\;(\\mu\\ne-1)$；$\\int \\dfrac1x\\,dx=\\ln|x|+C$；$\\int e^x\\,dx=e^x+C$；$\\int a^x\\,dx=\\dfrac{a^x}{\\ln a}+C$；$\\int \\sin x\\,dx=-\\cos x+C$；$\\int \\cos x\\,dx=\\sin x+C$；$\\int \\sec^2x\\,dx=\\tan x+C$；$\\int \\dfrac1{1+x^2}\\,dx=\\arctan x+C$；$\\int \\dfrac1{\\sqrt{1-x^2}}\\,dx=\\arcsin x+C$。',
        pitfall:'三个最要命的易错：① $\\int \\dfrac1x\\,dx$ 必须写 $\\ln|x|$，绝对值不能省；② $\\int \\sin x\\,dx$ 前面有**负号** $-\\cos x$；③ $\\int x^\\mu$ 当 $\\mu=-1$ 时公式失效，要单列成 $\\ln|x|$。' },
      { chain:'基本公式（10 条） → 记住"求导表倒过来" → 遇到组合就用运算律拆成基本式。',
        text:'两条运算律：$\\int(af+bg)\\,dx=a\\int f\\,dx+b\\int g\\,dx$（常数可提、可拆开）。技巧就一句：**能拆的拆，能提的提，拆到最后全是基本公式**。' }
    ],
    worked:[
      { stem:'求 $\\int 2x\\,dx$。',
        first:'看到"求不定积分"，第一反应是**找一个函数，导数等于被积函数**：谁的导数是 $2x$？',
        steps:['找原函数：$\\dfrac{d}{dx}\\left(x^2\\right)=2x$，所以 $F(x)=x^2$ 是一个原函数。',
               '原函数不唯一：$x^2+1$、$x^2-5$ 导数也是 $2x$，它们之间只差常数。',
               '写全族：$\\int 2x\\,dx=x^2+C$（$C$ 为任意常数）。'],
        take:'求不定积分 = 求原函数 + 补 $+C$。**$+C$ 是铁律，忘了就丢分。**' },
      { stem:'求 $\\int \\left(3x^2-\\dfrac{2}{x}+5\\sin x\\right)\\,dx$。',
        first:'看到"多项式的积分"，第一反应是**逐项拆开**，每项套基本公式，常数提出来。',
        steps:['拆：$\\int 3x^2\\,dx-\\int\\dfrac2x\\,dx+\\int5\\sin x\\,dx$。',
               '$\\int3x^2\\,dx=x^3$。',
               '$\\int\\dfrac2x\\,dx=2\\ln|x|$。',
               '$\\int5\\sin x\\,dx=-5\\cos x$。',
               '合并：$x^3-2\\ln|x|-5\\cos x+C$。'],
        take:'基本式积分 = **逐项 + 提常数 + 套公式**。$\\ln|x|$ 的绝对值和 $\\sin$ 的负号最容易丢。' }
    ],
    checklist:[
      {id:'antideriv', knowledge:'**原函数**：若 $F\'(x)=f(x)$，则 $F$ 是 $f$ 在区间上的一个原函数。'},
      {id:'family', knowledge:'**原函数族**：若 $F$ 是原函数，则 $F+C$（$C$ 任意）都是原函数；反过来全在原函数中。'},
      {id:'def', knowledge:'**不定积分**：$\\int f(x)\\,dx$ 表示 $f$ 的**全部原函数**，即 $F(x)+C$。'},
      {id:'inv', knowledge:'**互逆关系**：$\\dfrac{d}{dx}\\int f\\,dx=f$；$\\int F\'(x)\\,dx=F(x)+C$。'},
      {id:'prop', knowledge:'**两条运算律**：$\\int(af+bg)\\,dx=a\\int f\\,dx+b\\int g\\,dx$（常数可提、可拆开）。'},
      {id:'power', knowledge:'**幂函数**：$\\int x^\\mu\\,dx=\\dfrac{x^{\\mu+1}}{\\mu+1}+C$（$\\mu\\ne-1$）；$\\mu=-1$ 时是 $\\ln|x|+C$。'},
      {id:'exp', knowledge:'**指数**：$\\int e^x\\,dx=e^x+C$；$\\int a^x\\,dx=\\dfrac{a^x}{\\ln a}+C$。'},
      {id:'trig', knowledge:'**三角**：$\\int \\sin x\\,dx=-\\cos x+C$；$\\int \\cos x\\,dx=\\sin x+C$。'},
      {id:'sec', knowledge:'**倒数三角**：$\\int \\sec^2x\\,dx=\\tan x+C$；$\\int \\sec x\\,dx=\\ln|\\sec x+\\tan x|+C$。'},
      {id:'lin', knowledge:'**分式两条**：$\\int \\dfrac1x\\,dx=\\ln|x|+C$；$\\int \\dfrac1{1+x^2}\\,dx=\\arctan x+C$。'}
    ],
    formulas:[
      { latex:'\\int f(x)\\,dx=F(x)+C,\\quad F\'(x)=f(x)',
        from:'不定积分定义', uses:'所有求不定积分题的写法规范',
        pit:'必须写 $+C$；F 是 f 的任意一个原函数。' },
      { latex:'\\int x^\\mu\\,dx=\\frac{x^{\\mu+1}}{\\mu+1}+C\\;(\\mu\\neq-1),\\qquad \\int \\frac1x\\,dx=\\ln|x|+C',
        from:'幂函数与对数', uses:'一切多项式、分母带 x 的积分',
        pit:'μ=-1 公式失效，单列 ln|x|；|x| 的绝对值不能省。' },
      { latex:'\\int \\sin x\\,dx=-\\cos x+C,\\qquad \\int \\cos x\\,dx=\\sin x+C',
        from:'三角积分', uses:'被积函数是 sin/cos 时',
        pit:'sin 积分带负号；cos 不带。' },
      { latex:'\\int e^x\\,dx=e^x+C,\\qquad \\int a^x\\,dx=\\frac{a^x}{\\ln a}+C',
        from:'指数积分', uses:'被积函数是 a^x 时',
        pit:'a^x 要除以 ln a，别漏。' }
    ],
    problems:[
      { stem:'求 $\\int \\dfrac{x^3+x}{x}\\,dx$。', kpt:'先化简再积分', lv:1,
        first:'被积函数是**分式**，第一反应不是硬套公式，而是**先约分拆成两项**，再逐项积分。',
        sol:['化简：$\\dfrac{x^3+x}{x}=x^2+1$。',
             '逐项积分：$\\int(x^2+1)\\,dx=\\dfrac{x^3}{3}+x+C$。'],
        tip:'遇到分式先约分，很多"复杂被积函数"其实一拆就露出基本公式。' },
      { stem:'设 $F\'(x)=\\dfrac1{1+x^2}$ 且 $F(0)=0$，求 $F(x)$。', kpt:'带定条件的原函数', lv:2,
        first:'先求出原函数族（含 C），再用**给定的初值**把 C 定死。',
        sol:['查公式：$\\dfrac1{1+x^2}=\\tan^{-1}x$ 的导数，所以 $F(x)=\\arctan x+C$。',
             '代入 $F(0)=0$：$\\arctan 0+C=0$，得 $C=0$。',
             '所以 $F(x)=\\arctan x$。'],
        tip:'给初值的题 = 不定积分 + 解一个 $C$。别把"$+C$"当成装饰品。' },
      { stem:'求 $\\int x\\sqrt{x}\\,dx$。', kpt:'化为幂函数', lv:1,
        first:'看到"$x$ 乘以根号 $x$"，第一反应是**合并成幂**：$x\\cdot x^{1/2}=x^{3/2}$，套幂公式。',
        sol:['合并：$x\\sqrt{x}=x\\cdot x^{1/2}=x^{3/2}$。',
             '$\\int x^{3/2}\\,dx=\\dfrac{x^{5/2}}{5/2}+C=\\dfrac25x^{5/2}+C$。'],
        tip:'看到根号先写成分数指数，幂公式一次搞定。' },
      { stem:'求 $\\int \\dfrac{\\sin x+\\cos x}{\\cos x}\\,dx$。', kpt:'分式化简', lv:2,
        first:'分式先**逐项除**：$\\dfrac{\\sin x}{\\cos x}+\\dfrac{\\cos x}{\\cos x}=\\tan x+1$，再分别积分。',
        sol:['逐项：$\\tan x+1$。',
             '$\\int \\tan x\\,dx=-\\ln|\\cos x|+C$；$\\int1\\,dx=x$。',
             '合并：$-\\ln|\\cos x|+x+C$。'],
        tip:'分母是单一函数时，先逐项除再积分，比直接套公式省事。' }
    ],
    quickCheck:[
      { q:'原函数唯一吗？', a:'不唯一，差一个常数都是一族。所以要写 $+C$。' },
      { q:'不定积分与导数什么关系？', a:'互逆：先积分再求导，回到被积函数本身。' },
      { q:'$\\int f\'(x)\\,dx$ 等于什么？', a:'$f(x)+C$。对 f′ 求积分还原出 f（加常数）。' },
      { q:'$\\int \\dfrac1x\\,dx$ 为什么带绝对值？', a:'因为 $\\ln x$ 只在 $x>0$ 有定义，$x<0$ 时原函数是 $\\ln(-x)$，统一写 $\\ln|x|$。' },
      { q:'$\\int \\sin x\\,dx$ 有没有负号？', a:'有，$=-\\cos x+C$。因为 $(\\cos x)\'=-\\sin x$。' },
      { q:'$\\int \\dfrac1{1+x^2}\\,dx$ 是什么？', a:'$\\arctan x+C$。这是反正切函数的导数倒数。' }
    ]
  },

  /* ========== 4.2 换元积分法 ========== */
  {
    idx:'4.2', title:'换元积分法',
    why:'基本公式只能积 $x$、$\\ln x$ 这类简单函数，但题目常给 $f(3x+1)(3x+1)\'$ 这种"套了内层"的，或者带根号（$\\sqrt{a^2-x^2}$ 等）的。换元积分法分两招：**第一类换元（凑微分）**看出 $f(g(x))g\'(x)$ 的结构、把 $g\'(x)dx$ 并进 $dg$；**第二类换元（三角代换）**用 $x=a\\sin t$ 这类替换把根号开掉。这是积分最常用、也最考眼力的一节。',
    explain:[
      { analogy:'第一类换元像拼乐高：把 $g\'(x)dx$ 这块从右边"抠下来"塞进函数括号里，整块就变回一块基本公式。',
        points:'若 $\\int f(u)\\,du=F(u)+C$，则 $\\int f(g(x))g\'(x)\\,dx=F(g(x))+C$。**核心**：凑出 $dg$，把 $g\'(x)dx$ 与 $g(x)$ 组合写成 $dg$。常见凑法：$xdx=\\dfrac12 d(x^2)$，$\\dfrac1x dx=d\\ln x$，$e^x dx=d(e^x)$，$\\cos x dx=d(\\sin x)$，$\\dfrac1{1+x^2}dx=d(\\arctan x)$。',
        pitfall:'高频错：凑完微分后忘记把内层函数 $g(x)$ 代回去，导致结果变量错乱。比如 $\\int e^{2x}\\,dx$，凑成 $\\dfrac12\\int e^{2x}\\,d(2x)=\\dfrac12 e^{2x}+C$，别写成 $\\dfrac12 e^x$。' },
      { chain:'识别外层 $f$ → 看内层 $g$ → 凑 $g\'dx$ → 写成 $\\int f(g)\\,dg$ → 套基本公式 → 回代 $g(x)$。',
        text:'口诀："**见内层函数、凑它的导数**"。凑不出就提个常数系数凑进去。' },
      { analogy:'第二类换元：根号像一堵墙，凑微分绕不过去。三角代换像开了个侧门：$x=a\\sin t$ 让 $\\sqrt{a^2-x^2}=a\\cos t$，墙变成已知恒等式。',
        points:'三条固定套路：① $\\sqrt{a^2-x^2}$ → $x=a\\sin t$；② $\\sqrt{a^2+x^2}$ → $x=a\\tan t$；③ $\\sqrt{x^2-a^2}$ → $x=a\\sec t$。代换后必须**把 $dx$ 也换成 $dt$**，积完还要**画直角三角形回代 $x$**。',
        pitfall:'两大坑：① 换元后忘了 $dx=a\\cos t\\,dt$；② 积完只写 $F(t)$ 就交卷，没回代成 $x$。回代最稳的方法是**画一个直角三角形**，把 $t$ 表示成 $\\arcsin(x/a)$ 之类。' },
      { chain:'看根号类型 → 选对应代换 → 替换 $x$ 与 $dx$ → 根号开掉 → 积完 → 三角形回代 → 结果用 $x$ 写。',
        text:'**代换必须配套**：$x$、$dx$、根号表达式，三者一起换，少一个就乱。' }
    ],
    worked:[
      { stem:'求 $\\int \\dfrac{2x}{1+x^2}\\,dx$。',
        first:'分母 $1+x^2$ 像 $\\ln$ 或 $\\arctan$ 的"分母"。看到分子正好是分母导数的一半——**凑微分**：$d(1+x^2)=2x\\,dx$。',
        steps:['凑：分子 $2x\\,dx=d(1+x^2)$。',
               '原积分 $=\\int\\dfrac{d(1+x^2)}{1+x^2}$。',
               '令 $u=1+x^2$，得 $\\int\\dfrac{du}{u}=\\ln|u|+C$。',
               '回代：$\\ln|1+x^2|+C$（$1+x^2>0$，绝对值可去，写成 $\\ln(1+x^2)+C$）。'],
        take:'凑微分的判断标准就一句：**分子能不能凑成分母的导数（或差个常数倍）**。' },
      { stem:'求 $\\int \\sqrt{1-x^2}\\,dx$。',
        first:'看到 $\\sqrt{1-x^2}$（$a=1$），第一反应是**令 $x=\\sin t$**，根号开成 $\\cos t$。',
        steps:['代换：$x=\\sin t$，$dx=\\cos t\\,dt$，$\\sqrt{1-x^2}=\\sqrt{1-\\sin^2 t}=\\cos t$（$|\\cos t|\\ge0$）。',
               '原积分 $=\\int\\cos t\\cdot\\cos t\\,dt=\\int\\cos^2 t\\,dt=\\int\\dfrac{1+\\cos 2t}{2}\\,dt$。',
               '$=\\dfrac12 t+\\dfrac14\\sin 2t+C=\\dfrac12 t+\\dfrac12\\sin t\\cos t+C$。',
               '回代：$\\sin t=x$，$\\cos t=\\sqrt{1-x^2}$，$t=\\arcsin x$。',
               '结果 $=\\dfrac12\\arcsin x+\\dfrac12 x\\sqrt{1-x^2}+C$。'],
        take:'三角代换的**结果几乎总含 $\\arcsin/\\arctan/\\ln$ 加一项根号式**——记住这个模板，能省掉一半代数。' }
    ],
    checklist:[
      {id:'rule', knowledge:'**第一类换元**：若 $\\int f(u)du=F(u)+C$，则 $\\int f(g(x))g\'(x)dx=F(g(x))+C$。'},
      {id:'diffeq', knowledge:'**凑微分清单**：$xdx=\\frac12d(x^2)$，$\\frac1x dx=d\\ln|x|$，$e^x dx=d(e^x)$，$\\cos x dx=d(\\sin x)$，$\\sin x dx=-d(\\cos x)$，$\\frac1{1+x^2}dx=d(\\arctan x)$。'},
      {id:'factor', knowledge:'**凑系数**：若分子不是精确导数，提个常数把倍数配平，如 $\\int e^{2x}dx=\\frac12\\int e^{2x}d(2x)$。'},
      {id:'backsub', knowledge:'**回代**：换元后必须把 $u$ 换回 $g(x)$，否则变量名错乱。'},
      {id:'pattern', knowledge:'**识别模式**：被积式含 $f(g(x))\\cdot g\'(x)$ 结构时优先考虑凑微分。'},
      {id:'set', knowledge:'**三角代换三条**：$\\sqrt{a^2-x^2}\\to x=a\\sin t$；$\\sqrt{a^2+x^2}\\to x=a\\tan t$；$\\sqrt{x^2-a^2}\\to x=a\\sec t$。'},
      {id:'id', knowledge:'**三角恒等式**：$\\sin^2t+\\cos^2t=1$，$\\cos 2t=2\\cos^2t-1$，用来开根号与降次。'},
      {id:'limit', knowledge:'**区间假设**：$\\sqrt{a^2-x^2}$ 通常默认 $|x|<a$，$\\cos t\\ge0$ 直接开根号。'},
      {id:'pair', knowledge:'**代换必须配套**：$x$、$dx$、根号表达式一起换，少一个就乱。'}
    ],
    formulas:[
      { latex:'\\int f(g(x))\\,g\'(x)\\,dx=F(g(x))+C,\\quad F\'=f',
        from:'第一类换元法', uses:'被积式 = 某函数 × 它的导数（凑微分）',
        pit:'必须凑出 g\'(x)dx 与 g(x) 的组合；变量要回代。' },
      { latex:'\\int e^{kx}\\,dx=\\frac1k e^{kx}+C,\\qquad \\int \\sin(kx)\\,dx=-\\frac1k\\cos(kx)+C',
        from:'带系数的一次式', uses:'指数、三角带系数的情形',
        pit:'系数 k 要提到积分号外并除以 k。' },
      { latex:'\\int\\sqrt{a^2-x^2}\\,dx=\\frac x2\\sqrt{a^2-x^2}+\\frac{a^2}{2}\\arcsin\\frac xa+C',
        from:'圆公式', uses:'根号含 $a^2-x^2$ 时',
        pit:'结果两项都要写，漏 arcsin 项是常见错。' },
      { latex:'\\int\\dfrac1{\\sqrt{x^2-a^2}}\\,dx=\\ln|x+\\sqrt{x^2-a^2}|+C\\;(x>a)',
        from:'割线公式', uses:'根号含 $x^2-a^2$ 的分式',
        pit:'这是 $\\ln$ 型，别和 $\\arcsin$ 型混淆。' }
    ],
    problems:[
      { stem:'求 $\\int x\\sqrt{1+x^2}\\,dx$。', kpt:'凑微分（根号型）', lv:2,
        first:'看到"根号里 $x^2$"配"外面一个 $x$"，第一反应是**凑 $d(x^2)$**：$d(1+x^2)=2x\\,dx$，提 $\\frac12$ 凑齐。',
        sol:['凑：$x\\,dx=\\dfrac12 d(x^2)$。',
             '原式 $=\\dfrac12\\int\\sqrt{1+x^2}\\,d(x^2)$。',
             '令 $u=1+x^2$，$\\dfrac12\\int\\sqrt{u}\\,du=\\dfrac12\\cdot\\dfrac{u^{3/2}}{3/2}+C$。',
             '化简 $=\\dfrac13(1+x^2)^{3/2}+C$。'],
        tip:'形如 $\\int g(x)\\,g\'(x)$ 结构就是凑微分的典型——**外面函数 × 里面导数**。' },
      { stem:'求 $\\int \\dfrac{x}{1+x^4}\\,dx$。', kpt:'凑微分 + 有理化', lv:2,
        first:'分母 $1+x^4$ 里出现"$x^4$"，第一反应是**凑 $d(x^2)$**：$d(x^2)=2x\\,dx$，提 $\\frac12$。',
        sol:['凑：$x\\,dx=\\dfrac12 d(x^2)$。',
             '令 $u=x^2$，分母变 $1+u^2$，得 $\\dfrac12\\int\\dfrac{du}{1+u^2}$。',
             '$=\\dfrac12\\arctan u+C=\\dfrac12\\arctan(x^2)+C$。'],
        tip:'分母是 $1+x^{偶数}$ 时，先凑 $x^{偶数/2}$ 的导数，再套 $\\arctan$ 公式。' },
      { stem:'求 $\\int \\dfrac1{\\sqrt{4-x^2}}\\,dx$。', kpt:'直接套圆公式', lv:1,
        first:'$a=2$，直接套 $\\dfrac1a\\arcsin\\dfrac xa$ 形式——**别重新做一遍三角代换**。',
        sol:['套用：$\\int\\dfrac1{\\sqrt{a^2-x^2}}\\,dx=\\arcsin\\dfrac xa+C$（$a=1$）；$a=2$ 时先提 $\\frac12$。',
             '结果 $=\\arcsin\\dfrac x2+C$。'],
        tip:'带 $a\\neq1$ 时提 $\\frac1a$ 出去，再套基本式。' },
      { stem:'求 $\\int x\\sqrt{x^2-1}\\,dx\\ (x\\ge1)$。', kpt:'凑微分或代换', lv:2,
        first:'"根号 $x^2-1$" 配 "外面一个 $x$"，**第一类凑微分更快**：$d(x^2-1)=2x\\,dx$。',
        sol:['凑：$x\\,dx=\\dfrac12 d(x^2-1)$。',
             '令 $u=x^2-1$，$\\dfrac12\\int\\sqrt{u}\\,du=\\dfrac12\\cdot\\dfrac{u^{3/2}}{3/2}+C$。',
             '$=\\dfrac13(x^2-1)^{3/2}+C$。'],
        tip:'能凑就不代换——三角代换只用于"凑不出"的情形。' }
    ],
    quickCheck:[
      { q:'第一类换元的关键动作是什么？', a:'凑微分：把 $g\'(x)dx$ 与 $g(x)$ 组合成 $dg$。' },
      { q:'$\\int e^{2x}\\,dx$ 结果是？', a:'$\\frac12 e^{2x}+C$。系数 $2$ 要提到积分号外。' },
      { q:'$\\int \\dfrac{\\cos x}{\\sin^2 x}\\,dx$ 思路？', a:'凑 $d(\\sin x)=\\cos x\\,dx$，写成 $\\int u^{-2}du$，结果是 $-\\csc x+C$。' },
      { q:'$\\sqrt{a^2+x^2}$ 用哪个代换？', a:'$x=a\\tan t$。这样根号开成 $a\\sec t$。' },
      { q:'三角代换后一定要做什么？', a:'回代成 $x$，画直角三角形是最稳的方法。' },
      { q:'$\\sqrt{a^2-x^2}$ 的积分结果含哪两个函数？', a:'$x\\sqrt{a^2-x^2}$ 加 $\\arcsin\\dfrac xa$。' }
    ]
  },

  /* ========== 4.3 分部积分法 ========== */
  {
    idx:'4.3', title:'分部积分法',
    why:'有些被积函数是"一个初等函数 × 它导不出来/积不出来的另一函数"，比如 $x\\cdot e^x$、$\\ln x$。凑微分、换元都不够。分部积分用**乘法求导的逆**：$\\int u\\,dv=uv-\\int v\\,du$，把难积的 $u$ 换成好积的 $v$，把坏的被积函数"降一个阶"。',
    explain:[
      { analogy:'乘法求导是"前导后 + 前不导后导"。分部积分就是**倒着走**：$\\int u\\,dv=uv-\\int v\\,du$，相当于把乘法公式里的一项移到等号右边。',
        points:'选 $u$、$dv$ 的口诀——**"反对幂指三"（反、对、幂、指、三）**：按这个顺序优先级选 $u$。反三角 > 对数 > 幂函数 > 指数 > 三角。剩下给 $dv$。例如 $\\int x\\cdot e^x\\,dx$ 里，$x$（幂）优先于 $e^x$（指）作 $u$。',
        pitfall:'三大高频错：① 选错 $u/dv$，把"好积的"当 $dv$ 反而积不出来；② 忘记"$-\\int v\\,du$"的**负号**；③ 需要**重复用**分部（$\\int x^2 e^x$）时没做够次数。' },
      { chain:'选 $u$、$dv$（按"反对幂指三"）→ 求 $du$、$v$ → 套公式 $uv-\\int v\\,du$ → 若 $\\int v\\,du$ 还难，再分部一次。',
        text:'**判断什么时候该停**：$\\int v\\,du$ 比原积分更简单或已能套公式时停。' }
    ],
    worked:[
      { stem:'求 $\\int x\\,e^x\\,dx$。',
        first:'$x$（幂）× $e^x$（指），按"反对幂指三"，**幂优先作 $u$**：$u=x$，$dv=e^x dx$。',
        steps:['$u=x$，$dv=e^x\\,dx$ ⟹ $du=dx$，$v=e^x$。',
               '套公式：$\\int x\\,e^x\\,dx=x e^x-\\int e^x\\,dx$。',
               '$\\int e^x\\,dx=e^x$。',
               '结果 $=xe^x-e^x+C=e^x(x-1)+C$。'],
        take:'分部的全部诀窍就一句：**$u$ 选"求导能降阶"的，$dv$ 选"积得出"的**。' }
    ],
    checklist:[
      {id:'formula', knowledge:'**分部积分公式**：$\\int u\\,dv=uv-\\int v\\,du$。'},
      {id:'order', knowledge:'**"反对幂指三"选 $u$**：反三角 > 对数 > 幂 > 指数 > 三角。'},
      {id:'sign', knowledge:'**负号不能丢**：$uv-\\int v\\,du$，第二项前面是减号。'},
      {id:'repeat', knowledge:'**重复分部**：$\\int x^2 e^x$、$\\int x^3 e^x$ 等要分多次，每次 $u$ 降一次幂。'},
      {id:'cyclical', knowledge:'**循环出现**：$\\int e^x\\sin x\\,dx$ 这类会"自己回来"，列方程解出原积分。'}
    ],
    formulas:[
      { latex:'\\int u\\,dv=uv-\\int v\\,du',
        from:'分部积分法', uses:'初等函数相乘（幂×指、对数、三角×多项式）',
        pit:'按"反对幂指三"选 u；别忘了负号。' },
      { latex:'\\int x^n e^x\\,dx=x^n e^x-n!\\sum_{k=0}^{n-1}\\frac{x^k}{k!}\\,\\text{(展开)}+C',
        from:'重复分部（$x^n e^x$）', uses:'幂函数乘指数',
        pit:'次数 n 决定要分部几次；展开项系数有阶乘。' }
    ],
    problems:[
      { stem:'求 $\\int \\ln x\\,dx$。', kpt:'把对数当 u', lv:2,
        first:'$\\ln x$ 单独出现，按"反对幂指三"，**对数优先作 $u$**：$u=\\ln x$，$dv=dx$。',
        sol:['$u=\\ln x$，$dv=dx$ ⟹ $du=\\dfrac1x dx$，$v=x$。',
             '套公式：$\\int\\ln x\\,dx=x\\ln x-\\int x\\cdot\\dfrac1x\\,dx$。',
             '$=x\\ln x-\\int dx=x\\ln x-x+C$。'],
        tip:'对数单独积分是分部最经典的入门题。' },
      { stem:'求 $\\int e^x\\sin x\\,dx$。', kpt:'循环分部', lv:3,
        first:'指数×三角，两种函数"反对幂指三"排同级。第一反应是**先试一次分部，发现"自己回来"，就列方程解**。',
        sol:['令 $I=\\int e^x\\sin x\\,dx$。取 $u=\\sin x$，$dv=e^x dx$ ⟹ $du=\\cos x\\,dx$，$v=e^x$。',
             '$I=e^x\\sin x-\\int e^x\\cos x\\,dx$。',
             '对 $\\int e^x\\cos x\\,dx$ 再分部：取 $u=\\cos x$，$dv=e^x dx$，得 $e^x\\sin x-(e^x\\cos x+I)$。',
             '整理：$I=\\dfrac{e^x}{2}(\\sin x-\\cos x)+C$。'],
        tip:'循环分部最后要解 $I$，别在"回到 $I$"处停下来。' }
    ],
    quickCheck:[
      { q:'分部积分公式的负号为什么重要？', a:'因为它是 $uv-\\int v\\,du$，少负号结果全错。' },
      { q:'$\\int x\\sin x\\,dx$ 里 $u$ 选谁？', a:'$x$（幂）作 $u$，$\\sin x\\,dx$ 作 $dv$。按"反对幂指三"幂优先于三角。' },
      { q:'循环分部什么时候出现？', a:'指数×三角，或 $\\ln x$ 的二次积分；会出现"$I$ 自己"，列方程解出。' }
    ]
  },

  /* ========== 4.4 有理函数的积分 ========== */
  {
    idx:'4.4', title:'有理函数的积分',
    why:'前几节教的换元、分部，遇到"分子分母都是多项式"的**有理分式**时会力不从心。这一节给一个**通用算法**：先做多项式除法拆成"多项式 + 真分式"，再把真分式**部分分式分解**，每一项都能套基本公式。这是不定积分里最"程序化"的一节，考试大题几乎必考。',
    explain:[
      { analogy:'有理分式像一份"混合套餐"：先拆成主菜（多项式）和配料（真分式），配料再细分成小份（部分分式），每小份都能一口吃掉（套公式）。',
        points:'三步走：① **多项式除法**：分子次数 ≥ 分母次数时先除，写成"多项式 + 余项/分母"；② **部分分式分解**：分母因式分解，把真分式拆成 $\\dfrac{A}{x-a}+\\dfrac{B}{(x-a)^n}+\\cdots$ 之和；③ **逐项积分**：$\\dfrac1{x-a}\\to\\ln|x-a|$，$\\dfrac1{(x-a)^n}\\to$ 幂函数公式。',
        pitfall:'高频错：① 忘了先做多项式除法（假分式直接拆会漏项）；② 部分分式系数 $A,B$ 不会求；③ $\\dfrac1{x-a}$ 积分漏绝对值。' },
      { chain:'分母因式分解 → 假分式先除 → 部分分式设未知系数 → 待定系数法解 → 逐项积分。',
        text:'**待定系数法**是最稳的：拆完设 $A,B,C$，通分后让分子恒等，解方程组。' }
    ],
    worked:[
      { stem:'求 $\\int \\dfrac{x^2}{x^2-1}\\,dx$。',
        first:'分子次数 = 分母次数，**先做多项式除法**：$\\dfrac{x^2}{x^2-1}=1+\\dfrac{1}{x^2-1}$。',
        steps:['拆：$\\dfrac{x^2}{x^2-1}=\\dfrac{(x^2-1)+1}{x^2-1}=1+\\dfrac{1}{x^2-1}$。',
               '部分分式：$\\dfrac{1}{x^2-1}=\\dfrac12\\left(\\dfrac1{x-1}-\\dfrac1{x+1}\\right)$。',
               '逐项积分：$\\int1\\,dx=x$；$\\dfrac12\\int\\dfrac1{x-1}dx=\\dfrac12\\ln|x-1|$；$-\\dfrac12\\int\\dfrac1{x+1}dx=-\\dfrac12\\ln|x+1|$。',
               '合并：$x+\\dfrac12\\ln\\left|\\dfrac{x-1}{x+1}\\right|+C$。'],
        take:'有理函数积分 = **除 + 拆 + 积分**。拆完全是 $\\ln$ 和幂函数，没有意外。' }
    ],
    checklist:[
      {id:'division', knowledge:'**多项式除法**：分子次数 ≥ 分母次数时先除，拆成"多项式 + 真分式"。'},
      {id:'partial', knowledge:'**部分分式分解**：分母因式分解后，每个一次因式 $(x-a)$ 给 $\\dfrac{A}{x-a}$，重根 $\\dfrac{A}{(x-a)}+\\cdots+\\dfrac{B}{(x-a)^n}$。'},
      {id:'coeff', knowledge:'**待定系数法**：设未知系数通分，令分子恒等，解方程组求 $A,B,C$。'},
      {id:'integrate', knowledge:'**逐项积分**：$\\dfrac1{x-a}\\to\\ln|x-a|$；$\\dfrac1{(x-a)^n}\\to-\\dfrac{1}{(n-1)(x-a)^{n-1}}$。'},
      {id:'quad', knowledge:'**二次不可约因式**：分母含 $x^2+px+q$（判别式<0）时，配方法或用 $\\arctan$ 公式。'}
    ],
    formulas:[
      { latex:'\\frac{1}{x^2-a^2}=\\frac12\\left(\\frac1{x-a}-\\frac1{x+a}\\right)',
        from:'常见部分分式', uses:'分母能因式成 $x^2-a^2$ 时',
        pit:'系数 $\\frac12$ 别漏。' },
      { latex:'\\int\\frac{Ax+B}{x^2+px+q}\\,dx\\ (\\Delta<0)',
        from:'二次不可约因式', uses:'配方法拆成 $\\ln$ 项 + $\\arctan$ 项',
        pit:'分子需配成"分母导数的一半 + 常数"，常数项走 arctan。' }
    ],
    problems:[
      { stem:'求 $\\int \\dfrac{1}{x(x-1)}\\,dx$。', kpt:'部分分式', lv:2,
        first:'分母 $x(x-1)$ 已因式分解，**直接设 $\\dfrac A x+\\dfrac B{x-1}$**，待定系数求 $A,B$。',
        sol:['设 $\\dfrac1{x(x-1)}=\\dfrac Ax+\\dfrac B{x-1}$。',
             '通分：$1=A(x-1)+Bx$。令 $x=0$ 得 $A=-1$；令 $x=1$ 得 $B=1$。',
             '原积分 $=-\\int\\dfrac1x\\,dx+\\int\\dfrac1{x-1}\\,dx=-\\ln|x|+\\ln|x-1|+C=\\ln\\left|\\dfrac{x-1}{x}\\right|+C$。'],
        tip:'拆完系数后逐项套 $\\ln$ 公式，整理成一个 $\\ln$ 更干净。' },
      { stem:'求 $\\int \\dfrac{x+1}{x^2+x+1}\\,dx$。', kpt:'二次不可约因式', lv:3,
        first:'分母判别式 $\\Delta=1-4=-3<0$ 不可约。**把分子配成"分母导数一半 + 常数"**：分母导数 $2x+1$，提一半 $\\dfrac12(2x+1)$。',
        sol:['分子改写：$x+1=\\dfrac12(2x+1)+\\dfrac12$。',
             '第一项：$\\dfrac12\\int\\dfrac{2x+1}{x^2+x+1}dx=\\dfrac12\\ln(x^2+x+1)$。',
             '第二项：$\\dfrac12\\int\\dfrac1{x^2+x+1}dx=\\dfrac12\\int\\dfrac1{(x+\\frac12)^2+\\frac34}dx=\\dfrac1{\\sqrt3}\\arctan\\dfrac{2x+1}{\\sqrt3}$。',
             '合并：$\\dfrac12\\ln(x^2+x+1)+\\dfrac1{\\sqrt3}\\arctan\\dfrac{2x+1}{\\sqrt3}+C$。'],
        tip:'二次不可约 = **ln 项（分子配导数）+ arctan 项（配方）**，这是固定套路。' }
    ],
    quickCheck:[
      { q:'假分式（分子次数 ≥ 分母）先做什么？', a:'多项式除法，拆成多项式 + 真分式，再部分分式。' },
      { q:'部分分式系数怎么求？', a:'待定系数法：通分令分子恒等，代特殊值或解方程组。' },
      { q:'分母含不可约二次因式，积分结果含哪种新函数？', a:'$\\arctan$。ln 项 + arctan 项。' }
    ]
  },

  /* ========== 4.5 积分表的使用 ========== */
  {
    idx:'4.5', title:'积分表的使用',
    why:'前面几节把基本公式、换元、分部、有理分式都讲完了。实际做题时，**先查表再动手**能省一半时间。这一节教你怎么用积分表（教材书末附录），以及表里没有的情形怎么办。',
    explain:[
      { analogy:'积分表像"菜谱"：看到被积函数先翻"菜单"找现成公式；找不到的再按前面学的换元/分部"自己炒"。',
        points:'**查表流程**：① 看被积函数属于哪类（幂、指数、三角、双曲、对数、分式、含根号）；② 在表中找到最接近的条目；③ 若变量不匹配（如 $\\int f(2x)dx$），先做第一类换元 $u=2x$ 再查表；④ 若表中没有，则用换元或分部化为表中已有形式。',
        pitfall:'两个坑：① 查表前先做**第一类换元化简**（提系数、凑微分），让被积函数尽量接近表中条目；② 别忘了 $+C$，表中每行公式后面都要加。' },
      { chain:'识别被积函数类型 → 查表找最近条目 → 变量不匹配就换元对齐 → 套公式 → 加 $+C$。',
        text:'**表是全章的工具库**，考试时能查表就查表（考研不查表则需背熟高频条目）。不会背的靠换元/分部"现炒"。' }
    ],
    worked:[
      { stem:'用积分表求 $\\int x^2 \\sin x\\,dx$。',
        first:'被积函数是"幂×三角"，查表找 $\\int x^n \\sin x\\,dx$ 的递推公式：$\\int x^n \\sin x\\,dx=-x^n\\cos x+n\\int x^{n-1}\\cos x\\,dx$。',
        steps:['$n=2$：$\\int x^2\\sin x\\,dx=-x^2\\cos x+2\\int x\\cos x\\,dx$。',
               '查 $\\int x\\cos x\\,dx=x\\sin x-\\int \\sin x\\,dx=x\\sin x+\\cos x+C$。',
               '合并：$-x^2\\cos x+2(x\\sin x+\\cos x)+C$。',
               '整理：$=2\\cos x-x^2\\cos x+2x\\sin x+C$。'],
        take:'**先查表找递推关系，再逐步降阶**——比纯分部快很多。' }
    ],
    checklist:[
      {id:'flow', knowledge:'**查表流程**：分类 → 找条目 → 换元对齐变量 → 套公式 → 加 $+C$。'},
      {id:'rec', knowledge:'**递推公式**：表中常用递推（$\\int x^n \\sin x$、$\\int x^n e^x$）可逐步降阶。'},
      {id:'match', knowledge:'**变量不匹配时先做第一类换元**：$\\int f(kx)dx=\\frac1k\\int f(u)du$。'},
      {id:'fallback', knowledge:'**表中没有就用换元/分部**：化为表中已有条目再查。'},
      {id:'constant', knowledge:'**每行结果都要 $+C$**。'}
    ],
    formulas:[
      { latex:'\\int x^n\\sin x\\,dx=-x^n\\cos x+n\\int x^{n-1}\\cos x\\,dx',
        from:'积分表（递推）', uses:'幂×三角积分，逐步降阶',
        pit:'每次降阶后对 $\\cos$ 再用一次 $\\int x^{n-1}\\cos x$ 的递推。' }
    ],
    problems:[
      { stem:'用积分表求 $\\int \\dfrac{x}{\\sqrt{4-x^2}}\\,dx$。', kpt:'查表 + 第一类换元', lv:1,
        first:'$a=2$，表中条目 $\\int \\dfrac{x}{\\sqrt{a^2-x^2}}dx=-\\sqrt{a^2-x^2}+C$，直接套。',
        sol:['查表：$\\int \\dfrac{x}{\\sqrt{a^2-x^2}}dx=-\\sqrt{a^2-x^2}+C$（$a=2$）。',
             '结果：$-\\sqrt{4-x^2}+C$。'],
        tip:'**先识别类型再查表**，比从头做换元快得多。' },
      { stem:'用积分表求 $\\int e^{2x}\\cos 3x\\,dx$。', kpt:'递推公式 + 系数匹配', lv:3,
        first:'查表 $\\int e^{ax}\\cos bx\\,dx=\\dfrac{e^{ax}}{a^2+b^2}(a\\cos bx+b\\sin bx)+C$，这里 $a=2,b=3$。',
        sol:['直接代入：$\\dfrac{e^{2x}}{4+9}(2\\cos 3x+3\\sin 3x)+C$。',
             '$=\\dfrac{e^{2x}}{13}(2\\cos 3x+3\\sin 3x)+C$。'],
        tip:'**系数代入公式**是最快路径——比两遍分部快 3 倍。' }
    ],
    quickCheck:[
      { q:'查表前第一步做什么？', a:'识别被积函数类型，再找对应条目。' },
      { q:'表中公式有 $+C$ 吗？', a:'表里常省略，你写结果时必须自己加 $+C$。' },
      { q:'表里没有的被积函数怎么办？', a:'用换元或分部化为表中已有形式，再查。' }
    ]
  }
  ]
})
