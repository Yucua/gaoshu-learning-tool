/* 第十二章 无穷级数 —— 数据文件
 * 结构同前：window.CHAPOS.push({no,title,sub,sections:[...]})
 * 纪律：本章是下册终点，可用第 1–11 章全部知识。
 * 注意：所有字符串值一律用单引号包裹，内部反斜杠需 \\ 转义。
 */
window.CHAPOS = window.CHAPOS || [];
window.CHAPOS.push({
  no:'12', title:'无穷级数', sub:'同济八版第十二章 · 全 8 节',
  sections:[
  /* ========== 12.1 常数项级数的概念和性质 ========== */
  {
    idx:'12.1', title:'常数项级数的概念和性质',
    why:'无穷级数 = 无穷多项相加，$\\sum_{n=1}^{\\infty}u_n$。它的"和"由**部分和数列**的极限定义：部分和 $S_n=u_1+\\cdots+u_n$，若 $S_n$ 收敛则级数收敛。级数是表示函数、逼近函数的重要工具。',
    explain:[
      { analogy:'级数像"无限累加"：一次次往后加，看部分和是否稳定趋近某个数。趋近就收敛，否则发散。',
        points:'**定义**：$\\sum u_n$ 收敛 ⟺ 部分和 $S_n$ 收敛。**必要条件**：$\\sum u_n$ 收敛 ⟹ $u_n\\to0$（逆不真）。**几何级数**：$\\sum ar^{n-1}$，$|r|<1$ 时收敛于 $\\dfrac{a}{1-r}$。**$p$ 级数**：$\\sum\\dfrac1{n^p}$，$p>1$ 收敛，$p\\le1$ 发散。',
        pitfall:'高频错：① 通项 $u_n\\to0$ **只是必要条件**，不保证收敛（调和级数 $\\sum\\dfrac1n$ 通项趋 0 但发散）；② 几何级数要 $|r|<1$，$r=1$ 时发散；③ 部分和不会求时不会用定义判敛。' },
      { chain:'写部分和 S_n → 求极限 → 收敛则求和。',
        text:'**核心**：级数收敛 = 部分和数列收敛；$u_n\\to0$ 是必要非充分条件。' }
    ],
    worked:[
      { stem:'判断几何级数 $\\sum_{n=1}^{\\infty}\\left(\\dfrac12\\right)^{n-1}$ 的敛散并求和。',
        first:'$r=\\dfrac12$，$|r|<1$，收敛，和 $=\\dfrac{1}{1-r}$。',
        steps:['$r=\\dfrac12$，$|r|<1$ 收敛。',
               '和 $=\\dfrac{1}{1-\\frac12}=2$。'],
        take:'几何级数 $|r|<1$ 收敛，和 = 首项/(1−r)。' }
    ],
    checklist:[
      {id:'def', knowledge:'**级数收敛**：部分和 $S_n$ 收敛，和 = $\\lim S_n$。'},
      {id:'necessary', knowledge:'**必要条件**：$\\sum u_n$ 收敛 ⟹ $u_n\\to0$（逆不真）。'},
      {id:'geo', knowledge:'**几何级数**：$\\sum ar^{n-1}$，$|r|<1$ 收敛于 $\\dfrac{a}{1-r}$。'},
      {id:'p', knowledge:'**$p$ 级数**：$\\sum\\dfrac1{n^p}$，$p>1$ 收敛，$p\\le1$ 发散。'},
      {id:'linear', knowledge:'**线性**：收敛级数可逐项加减、提常数。'}
    ],
    formulas:[
      { latex:'\\sum_{n=1}^{\\infty}ar^{n-1}=\\frac{a}{1-r}\\;(|r|<1)',
        from:'几何级数', uses:'等比数列求和',
        pit:'|r|<1 才收敛；r=1 发散。' },
      { latex:'\\sum_{n=1}^{\\infty}\\frac1{n^p}\\ \\text{收敛}\\iff p>1',
        from:'p 级数', uses:'判断 p 级数敛散',
        pit:'p=1 调和级数发散。' }
    ],
    problems:[
      { stem:'判断 $\\sum_{n=1}^{\\infty}\\dfrac{1}{n}$ 的敛散性。', kpt:'调和级数', lv:1,
        first:'调和级数是 $p=1$ 的 p 级数，发散。',
        sol:['$p=1\\le1$，$p$ 级数发散。',
             '虽然通项 $\\dfrac1n\\to0$，但级数发散（说明必要条件不充分）。'],
        tip:'调和级数通项趋 0 但发散，是"必要非充分"的经典例子。' },
      { stem:'求 $\\sum_{n=1}^{\\infty}\\dfrac{2}{3^n}$ 的和。', kpt:'几何级数求和', lv:2,
        first:'首项 $a=\\dfrac23$，公比 $r=\\dfrac13$。',
        sol:['$=\\dfrac{2/3}{1-1/3}=\\dfrac{2/3}{2/3}=1$。'],
        tip:'几何级数和 = 首项/(1−r)。' }
    ],
    quickCheck:[
      { q:'通项趋 0 能推出级数收敛吗？', a:'不能，只是必要条件（调和级数反例）。' },
      { q:'几何级数收敛条件？', a:'|r|<1，和为 a/(1−r)。' },
      { q:'p 级数 ∑1/n^p 收敛条件？', a:'p>1 收敛，p≤1 发散。' }
    ]
  },

  /* ========== 12.2 常数项级数的审敛法 ========== */
  {
    idx:'12.2', title:'常数项级数的审敛法',
    why:'大多数级数求不出部分和的极限，需要**审敛法**判断敛散。正项级数有比较判别法、比值（达朗贝尔）、根值（柯西）判别法；交错级数有莱布尼茨判别法；一般级数看绝对收敛。',
    explain:[
      { analogy:'审敛法像"不求和、只看趋势"：比通项衰减快慢（比较法）、看相邻比值的极限（比值法）、看通项开 n 次方的极限（根值法）。',
        points:'**正项级数**：① 比较判别法（与 p 级数/几何级数比）；② 比值法 $\\lim\\dfrac{u_{n+1}}{u_n}=\\rho$：$\\rho<1$ 收敛、$>1$ 发散、$=1$ 失效；③ 根值法 $\\lim\\sqrt[n]{u_n}=\\rho$ 同判。**交错级数**：莱布尼茨（通项单调递减趋 0 则收敛）。**绝对收敛**：$\\sum|u_n|$ 收敛 ⟹ $\\sum u_n$ 收敛。',
        pitfall:'高频错：① 比值法 $\\rho=1$ 时**失效**，不能下结论，要换方法；② 比较法选错参照级数；③ 交错级数忘了验"单调递减"。' },
      { chain:'正项 → 比值/根值/比较；交错 → 莱布尼茨；一般 → 看绝对收敛。',
        text:'**核心**：比值法最常用，$\\rho=1$ 失效时换比较法。' }
    ],
    worked:[
      { stem:'判断 $\\sum_{n=1}^{\\infty}\\dfrac{n}{2^n}$ 的敛散性。',
        first:'正项级数，用比值法：$\\rho=\\lim\\dfrac{u_{n+1}}{u_n}$。',
        steps:['$\\rho=\\lim_{n\\to\\infty}\\dfrac{(n+1)/2^{n+1}}{n/2^n}=\\lim\\dfrac{n+1}{2n}=\\dfrac12$。',
               '$\\rho=\\dfrac12<1$，收敛。'],
        take:'比值法：算 ρ，<1 收敛、>1 发散、=1 失效。' }
    ],
    checklist:[
      {id:'ratio', knowledge:'**比值法**：$\\rho=\\lim\\dfrac{u_{n+1}}{u_n}$，$<1$ 收敛、$>1$ 发散、$=1$ 失效。'},
      {id:'root', knowledge:'**根值法**：$\\rho=\\lim\\sqrt[n]{u_n}$，判法同比值。'},
      {id:'compare', knowledge:'**比较法**：与 p 级数、几何级数比较。'},
      {id:'leibniz', knowledge:'**莱布尼茨**：交错级数通项单调递减趋 0 则收敛。'},
      {id:'absolute', knowledge:'**绝对收敛**：$\\sum|u_n|$ 收敛 ⟹ $\\sum u_n$ 收敛。'}
    ],
    formulas:[
      { latex:'\\rho=\\lim_{n\\to\\infty}\\frac{u_{n+1}}{u_n}\\begin{cases}<1:\\text{收敛}\\\\>1:\\text{发散}\\\\=1:\\text{失效}\\end{cases}',
        from:'比值判别法', uses:'正项级数',
        pit:'ρ=1 时失效，需换方法。' }
    ],
    problems:[
      { stem:'判断 $\\sum_{n=1}^{\\infty}\\dfrac{1}{n^2}$ 的敛散性。', kpt:'p 级数', lv:1,
        first:'这是 $p=2$ 的 p 级数。',
        sol:['$p=2>1$，收敛。'],
        tip:'p 级数直接判，p>1 收敛。' },
      { stem:'判断 $\\sum_{n=1}^{\\infty}\\dfrac{n!}{n^n}$ 的敛散性。', kpt:'比值法', lv:2,
        first:'比值法：$\\rho=\\lim\\dfrac{(n+1)!/(n+1)^{n+1}}{n!/n^n}$。',
        sol:['$=\\lim\\dfrac{(n+1)n^n}{(n+1)^{n+1}}=\\lim\\left(\\dfrac{n}{n+1}\\right)^n=\\dfrac1e$。',
             '$\\rho=\\dfrac1e<1$，收敛。'],
        tip:'含阶乘的级数常用比值法。' }
    ],
    quickCheck:[
      { q:'比值法 ρ=1 怎么办？', a:'失效，换比较法或其它方法。' },
      { q:'交错级数审敛用什么？', a:'莱布尼茨判别法（单调递减趋 0）。' },
      { q:'绝对收敛和收敛什么关系？', a:'绝对收敛 ⟹ 收敛。' }
    ]
  },

  /* ========== 12.3 幂级数 ========== */
  {
    idx:'12.3', title:'幂级数',
    why:'幂级数 $\\sum a_n x^n$ 是"多项式推广到无穷"：每项是 $x$ 的幂。它有一块**收敛半径** $R$，在 $(-R,R)$ 内收敛。幂级数是把函数展开成多项式级数的载体。',
    explain:[
      { analogy:'幂级数像"无穷次多项式"，在收敛半径内就像一根收敛的"函数列"，半径外就发散。',
        points:'**收敛半径**：$\\rho=\\lim\\left|\\dfrac{a_{n+1}}{a_n}\\right|$，则 $R=\\dfrac1\\rho$（$\\rho=0$ 时 $R=\\infty$，$\\rho=\\infty$ 时 $R=0$）。**收敛区间**：$(-R,R)$，端点需单独判。',
        pitfall:'高频错：① 收敛半径 $R=\\dfrac1\\rho$，别忘取倒数；② 端点 $x=\\pm R$ 要**单独判**敛散；③ 幂级数逐项求导/积分收敛半径不变，但端点可能变。' },
      { chain:'求 ρ → R=1/ρ → 判端点 → 得收敛区间。',
        text:'**核心**：收敛半径 R=1/ρ，端点单独判。' }
    ],
    worked:[
      { stem:'求 $\\sum_{n=1}^{\\infty}\\dfrac{x^n}{n}$ 的收敛半径与收敛区间。',
        first:'$a_n=\\dfrac1n$，$\\rho=\\lim\\dfrac{1/(n+1)}{1/n}=\\lim\\dfrac{n}{n+1}=1$，$R=1$。',
        steps:['$R=1$，收敛区间 $(-1,1)$ 内部。',
               '端点 $x=1$：$\\sum\\dfrac1n$ 发散；$x=-1$：$\\sum\\dfrac{(-1)^n}{n}$ 收敛（交错）。',
               '收敛区间 $[-1,1)$。'],
        take:'收敛半径 R=1/ρ，端点 x=±R 单独判。' }
    ],
    checklist:[
      {id:'radius', knowledge:'**收敛半径**：$R=\\dfrac1\\rho$，$\\rho=\\lim|a_{n+1}/a_n|$。'},
      {id:'interval', knowledge:'**收敛区间**：$(-R,R)$ 内必收敛，端点单独判。'},
      {id:'endpoint', knowledge:'**端点**：$x=\\pm R$ 代入分别判敛散。'},
      {id:'diff', knowledge:'**逐项求导/积分**：收敛半径不变，端点可能变。'}
    ],
    formulas:[
      { latex:'R=\\frac1{\\rho},\\quad \\rho=\\lim_{n\\to\\infty}\\left|\\frac{a_{n+1}}{a_n}\\right|',
        from:'收敛半径', uses:'求幂级数收敛半径',
        pit:'R 是 ρ 的倒数；ρ=0 时 R=∞。' }
    ],
    problems:[
      { stem:'求 $\\sum_{n=0}^{\\infty}x^n$ 的收敛半径。', kpt:'收敛半径', lv:1,
        first:'$a_n=1$，$\\rho=1$，$R=1$。',
        sol:['$R=1$，收敛区间 $(-1,1)$（几何级数）。'],
        tip:'几何级数收敛半径 1。' },
      { stem:'求 $\\sum_{n=1}^{\\infty}\\dfrac{x^n}{n^2}$ 的收敛区间。', kpt:'收敛区间', lv:2,
        first:'$R=1$，判端点 $x=\\pm1$。',
        sol:['$x=1$：$\\sum\\dfrac1{n^2}$ 收敛；$x=-1$：$\\sum\\dfrac{(-1)^n}{n^2}$ 绝对收敛。',
             '收敛区间 $[-1,1]$。'],
        tip:'端点代入后是 p 级数（p=2）收敛。' }
    ],
    quickCheck:[
      { q:'收敛半径怎么算？', a:'R=1/ρ，ρ=lim|a_{n+1}/a_n|。' },
      { q:'端点要单独判吗？', a:'要，x=±R 分别代入判敛散。' },
      { q:'ρ=0 时收敛半径多少？', a:'R=∞，处处收敛。' }
    ]
  },

  /* ========== 12.4 函数展开成幂级数 ========== */
  {
    idx:'12.4', title:'函数展开成幂级数',
    why:'把函数 $f(x)$ 展开成幂级数（泰勒级数/麦克劳林级数），就能用多项式近似函数。核心是记住几个基本展开式，再通过代换、求导、积分得到更多。',
    explain:[
      { analogy:'函数展开成幂级数像"把任意函数翻译成多项式语言"，越多项越精确。',
        points:'**麦克劳林展开**（在 0 处）：$f(x)=\\sum_{n=0}^{\\infty}\\dfrac{f^{(n)}(0)}{n!}x^n$。**常见展开**：$e^x=\\sum\\dfrac{x^n}{n!}$；$\\sin x=\\sum(-1)^n\\dfrac{x^{2n+1}}{(2n+1)!}$；$\\cos x=\\sum(-1)^n\\dfrac{x^{2n}}{(2n)!}$；$\\dfrac1{1-x}=\\sum x^n$（$|x|<1$）；$\\ln(1+x)=\\sum(-1)^{n+1}\\dfrac{x^n}{n}$。',
        pitfall:'高频错：① 展开式要标**收敛范围**（如 $\\ln(1+x)$ 只在 $-1<x\\le1$）；② 展开点不是 0 时用 $x-x_0$ 的幂；③ 记忆时正负号、阶乘别错。' },
      { chain:'选基本展开式 → 代换/求导/积分 → 写展开 + 收敛范围。',
        text:'**核心**：背熟 5 个基本展开式，其余靠代换求导积分。' }
    ],
    worked:[
      { stem:'把 $e^{-x}$ 展开成麦克劳林级数。',
        first:'用 $e^x=\\sum\\dfrac{x^n}{n!}$，把 $x$ 换成 $-x$。',
        steps:['$e^{-x}=\\sum_{n=0}^{\\infty}\\dfrac{(-x)^n}{n!}=\\sum\\dfrac{(-1)^n x^n}{n!}$。'],
        take:'代换法：基本展开式里把 x 换成 -x。' }
    ],
    checklist:[
      {id:'maclaurin', knowledge:'**麦克劳林**：$f(x)=\\sum\\dfrac{f^{(n)}(0)}{n!}x^n$。'},
      {id:'exp', knowledge:'**e^x**：$\\sum\\dfrac{x^n}{n!}$。'},
      {id:'sin', knowledge:'**sin x**：$\\sum(-1)^n\\dfrac{x^{2n+1}}{(2n+1)!}$。'},
      {id:'cos', knowledge:'**cos x**：$\\sum(-1)^n\\dfrac{x^{2n}}{(2n)!}$。'},
      {id:'geo', knowledge:'**1/(1−x)**：$\\sum x^n$（$|x|<1$）。'}
    ],
    formulas:[
      { latex:'e^x=\\sum_{n=0}^{\\infty}\\frac{x^n}{n!}',
        from:'指数展开', uses:'展开 e^x、e^{kx}',
        pit:'分母是 n!。' },
      { latex:'\\frac1{1-x}=\\sum_{n=0}^{\\infty}x^n\\;(|x|<1)',
        from:'几何级数展开', uses:'展开分式',
        pit:'|x|<1。' }
    ],
    problems:[
      { stem:'把 $\\sin x$ 展开成麦克劳林级数。', kpt:'正弦展开', lv:1,
        first:'$\\sin x=\\sum(-1)^n\\dfrac{x^{2n+1}}{(2n+1)!}$。',
        sol:['$=x-\\dfrac{x^3}{3!}+\\dfrac{x^5}{5!}-\\cdots$。'],
        tip:'sin 是奇函数，只有奇次幂。' },
      { stem:'把 $\\dfrac{1}{1+x}$ 展开成麦克劳林级数。', kpt:'代换展开', lv:2,
        first:'$\\dfrac1{1+x}=\\dfrac1{1-(-x)}=\\sum(-x)^n$。',
        sol:['$=\\sum(-1)^n x^n$（$|x|<1$）。'],
        tip:'1/(1−x) 展开里 x 换成 −x。' }
    ],
    quickCheck:[
      { q:'e^x 的麦克劳林展开？', a:'Σ xⁿ/n!。' },
      { q:'1/(1−x) 展开的收敛范围？', a:'|x|<1。' },
      { q:'展开点不是 0 用什么幂？', a:'(x−x₀) 的幂（泰勒级数）。' }
    ]
  },

  /* ========== 12.5 函数的幂级数展开式的应用 ========== */
  {
    idx:'12.5', title:'函数的幂级数展开式的应用',
    why:'幂级数展开能用来做**近似计算**（算 $\\sqrt{e}$、$\\sin 1$ 等）、**求某些级数的和**、**计算积分**（有些积分没有初等原函数，但能展成级数逐项积）。',
    explain:[
      { analogy:'幂级数应用像"用多项式代替原函数干活"：算值、求和、积积分，都能借助展开式逐项处理。',
        points:'**近似计算**：取展开式前几项近似函数值，误差由余项估计。**求级数和**：构造幂级数求和函数再代入。**逐项积分**：$\\int f\\,dx$ 无初等原函数时，展成级数逐项积。',
        pitfall:'高频错：① 近似时忽略余项（截断误差）；② 逐项积分/求和要保证收敛范围内；③ 求级数和时代入的点要在收敛区间内。' },
      { chain:'展开 → 截断/逐项处理 → 估计误差。',
        text:'**核心**：幂级数三用——近似、求和、逐项积分。' }
    ],
    worked:[
      { stem:'用 $e^x$ 展开近似 $e^{0.1}$（取前 3 项）。',
        first:'$e^x=1+x+\\dfrac{x^2}{2}+\\cdots$，$x=0.1$。',
        steps:['$e^{0.1}\\approx1+0.1+\\dfrac{0.01}{2}=1.105$。'],
        take:'近似 = 取展开式前几项，截断误差由余项估计。' }
    ],
    checklist:[
      {id:'approx', knowledge:'**近似计算**：取前几项，误差由余项估计。'},
      {id:'sum', knowledge:'**求级数和**：构造幂级数求和函数代入。'},
      {id:'integrate', knowledge:'**逐项积分**：无初等原函数时展级数逐项积。'},
      {id:'range', knowledge:'**收敛范围**：代入点要在收敛区间内。'}
    ],
    formulas:[
      { latex:'e^x=1+x+\\frac{x^2}{2!}+\\cdots',
        from:'e^x 展开', uses:'近似计算 e^x',
        pit:'截断误差看余项。' }
    ],
    problems:[
      { stem:'用 $\\sin x$ 展开近似 $\\sin 0.1$（取前 2 项）。', kpt:'近似', lv:1,
        first:'$\\sin x=x-\\dfrac{x^3}{6}+\\cdots$。',
        sol:['$\\sin0.1\\approx0.1-\\dfrac{0.001}{6}\\approx0.09983$。'],
        tip:'sin 展开取奇次幂前两项。' },
      { stem:'求 $\\sum_{n=1}^{\\infty}\\dfrac{1}{n\\,2^n}$ 的和（提示：用 $\\ln$ 展开）。', kpt:'级数求和', lv:3,
        first:'$\\ln(1-x)=-\\sum\\dfrac{x^n}{n}$，取 $x=\\dfrac12$。',
        sol:['$-\\ln\\left(1-\\dfrac12\\right)=\\sum\\dfrac{(1/2)^n}{n}=\\sum\\dfrac1{n\\,2^n}$。',
             '$=\\ln2$。'],
        tip:'级数求和构造 ln 展开代入 x=1/2。' }
    ],
    quickCheck:[
      { q:'幂级数展开的三个应用？', a:'近似计算、求级数和、逐项积分。' },
      { q:'近似计算的误差怎么控制？', a:'由余项（截断误差）估计。' },
      { q:'求级数和时代入点要注意什么？', a:'在收敛区间内。' }
    ]
  },

  /* ========== 12.6 函数项级数的一致收敛性（选学） ========== */
  {
    idx:'12.6', title:'函数项级数的一致收敛性',
    why:'函数项级数 $\\sum u_n(x)$ 逐点收敛还不够，**一致收敛**保证"极限与积分、求导可交换"。它是严格处理函数项级数性质的理论基础，也是傅里叶级数理论的前提。',
    explain:[
      { analogy:'一致收敛像"整个区间一起收敛"：不只是每个点各收敛各的，而是对区间上所有 x 同时收敛（误差余项 $\\sup|S_n-f|$ 一致趋 0）。',
        points:'**一致收敛**：$S_n(x)\\rightrightarrows f(x)$ 表示 $\\sup_{x\\in I}|S_n(x)-f(x)|\\to0$。**魏尔斯特拉斯判别法（M 判别）**：若 $|u_n(x)|\\le M_n$ 且 $\\sum M_n$ 收敛，则 $\\sum u_n(x)$ 一致收敛。',
        pitfall:'高频错：① 逐点收敛 ≠ 一致收敛；② M 判别要求 $M_n$ 与 $x$ 无关且 $\\sum M_n$ 收敛；③ 一致收敛才能交换极限与积分/求导。' },
      { chain:'找控制级数 $M_n$ → 证 $\\sum M_n$ 收敛 → 得一致收敛。',
        text:'**核心**：M 判别法找与 x 无关的控制级数。' }
    ],
    worked:[
      { stem:'判断 $\\sum\\dfrac{\\sin nx}{n^2}$ 是否一致收敛。',
        first:'用 M 判别：$|\\dfrac{\\sin nx}{n^2}|\\le\\dfrac1{n^2}=M_n$，$\\sum M_n$ 收敛。',
        steps:['$M_n=\\dfrac1{n^2}$，$\\sum\\dfrac1{n^2}$ 收敛。',
               '故 $\\sum\\dfrac{\\sin nx}{n^2}$ 一致收敛。'],
        take:'M 判别：|u_n(x)|≤M_n 且 ΣM_n 收敛则一致收敛。' }
    ],
    checklist:[
      {id:'uniform', knowledge:'**一致收敛**：$\\sup|S_n-f|\\to0$，比逐点收敛强。'},
      {id:'weier', knowledge:'**M 判别法**：$|u_n(x)|\\le M_n$ 且 $\\sum M_n$ 收敛 ⟹ 一致收敛。'},
      {id:'exchange', knowledge:'**可交换**：一致收敛才可交换极限与积分/求导。'},
      {id:'vs', knowledge:'**逐点 ≠ 一致**：逐点收敛不一定一致收敛。'}
    ],
    formulas:[
      { latex:'|u_n(x)|\\le M_n,\\ \\sum M_n\\ \\text{收敛}\\Rightarrow\\sum u_n(x)\\ \\text{一致收敛}',
        from:'魏尔斯特拉斯 M 判别', uses:'证函数项级数一致收敛',
        pit:'M_n 与 x 无关。' }
    ],
    problems:[
      { stem:'判断 $\\sum\\dfrac{\\cos nx}{n^3}$ 是否一致收敛。', kpt:'M 判别', lv:2,
        first:'$|\\cos nx|\\le1$，$|u_n|\\le\\dfrac1{n^3}=M_n$。',
        sol:['$\\sum\\dfrac1{n^3}$ 收敛（$p=3>1$）。',
             '故一致收敛。'],
        tip:'三角函数的级数常配 M_n=1/n^p。' }
    ],
    quickCheck:[
      { q:'一致收敛和逐点收敛谁强？', a:'一致收敛更强（逐点收敛不一定一致）。' },
      { q:'M 判别法的条件？', a:'|u_n(x)|≤M_n（M_n 与 x 无关）且 ΣM_n 收敛。' },
      { q:'一致收敛能保证什么？', a:'极限与积分/求导可交换。' }
    ]
  },

  /* ========== 12.7 傅里叶级数 ========== */
  {
    idx:'12.7', title:'傅里叶级数',
    why:'傅里叶级数把周期函数展开成**三角级数**：$f(x)=\\dfrac{a_0}{2}+\\sum(a_n\\cos nx+b_n\\sin nx)$。它是信号分析、振动、热传导的基础，与幂级数（多项式逼近）不同，傅里叶用三角函数逼近。',
    explain:[
      { analogy:'傅里叶级数像"把波形分解成各种频率的正弦波叠加"：每个 $\\cos nx,\\sin nx$ 是一个频率分量，系数 $a_n,b_n$ 是它的"音量"。',
        points:'**傅里叶系数**：$a_n=\\dfrac1\\pi\\int_{-\\pi}^{\\pi}f(x)\\cos nx\\,dx$（$n=0,1,2,\\ldots$），$b_n=\\dfrac1\\pi\\int_{-\\pi}^{\\pi}f(x)\\sin nx\\,dx$（$n=1,2,\\ldots$）。**展开**：$f\\sim\\dfrac{a_0}{2}+\\sum(a_n\\cos nx+b_n\\sin nx)$。',
        pitfall:'高频错：① $a_0$ 单独定义（分母是 $2\\pi$ 或统一式），展开里常数项是 $\\dfrac{a_0}{2}$；② 奇函数 $a_n=0$（只有正弦项）、偶函数 $b_n=0$（只有余弦项）；③ 间断点处傅里叶级数收敛到左右极限的平均值。' },
      { chain:'求 a_n,b_n（积分）→ 写三角级数 → 讨论收敛。',
        text:'**核心**：傅里叶系数靠积分算，奇偶性可简化。' }
    ],
    worked:[
      { stem:'求 $f(x)=x$（$[-\\pi,\\pi]$）的傅里叶级数。',
        first:'$f$ 是奇函数，$a_n=0$，只需算 $b_n$。',
        steps:['$a_n=0$（奇函数）。',
               '$b_n=\\dfrac1\\pi\\int_{-\\pi}^{\\pi}x\\sin nx\\,dx=\\dfrac{2}{n}(-1)^{n+1}$。',
               '$f\\sim\\sum_{n=1}^{\\infty}\\dfrac{2}{n}(-1)^{n+1}\\sin nx=2\\left(\\sin x-\\dfrac{\\sin2x}{2}+\\dfrac{\\sin3x}{3}-\\cdots\\right)$。'],
        take:'奇函数只含正弦项（b_n），偶函数只含余弦项（a_n）。' }
    ],
    checklist:[
      {id:'coef', knowledge:'**傅里叶系数**：$a_n=\\dfrac1\\pi\\int f\\cos nx\\,dx$，$b_n=\\dfrac1\\pi\\int f\\sin nx\\,dx$。'},
      {id:'odd', knowledge:'**奇函数**：$a_n=0$，只含正弦项。'},
      {id:'even', knowledge:'**偶函数**：$b_n=0$，只含余弦项。'},
      {id:'constant', knowledge:'**常数项**：$\\dfrac{a_0}{2}$。'},
      {id:'discont', knowledge:'**间断点**：级数收敛到左右极限的平均值。'}
    ],
    formulas:[
      { latex:'a_n=\\frac1\\pi\\int_{-\\pi}^{\\pi}f(x)\\cos nx\\,dx',
        from:'傅里叶余弦系数', uses:'求 a_n',
        pit:'n=0 时 a_0 单独算。' },
      { latex:'b_n=\\frac1\\pi\\int_{-\\pi}^{\\pi}f(x)\\sin nx\\,dx',
        from:'傅里叶正弦系数', uses:'求 b_n',
        pit:'偶函数 b_n=0。' }
    ],
    problems:[
      { stem:'求 $f(x)=x^2$（$[-\\pi,\\pi]$）的傅里叶级数是否只含余弦项。', kpt:'偶函数', lv:1,
        first:'$x^2$ 是偶函数，$b_n=0$，只含余弦项。',
        sol:['是，偶函数 $b_n=0$，展开只含 $a_n\\cos nx$ 项。'],
        tip:'偶函数傅里叶级数只有余弦项。' },
      { stem:'求 $f(x)=x$ 在 $[-\\pi,\\pi]$ 的 $b_1$。', kpt:'傅里叶系数', lv:2,
        first:'$b_1=\\dfrac1\\pi\\int_{-\\pi}^{\\pi}x\\sin x\\,dx$。',
        sol:['分部积分：$\\int x\\sin x\\,dx=-x\\cos x+\\sin x$。',
             '$b_1=\\dfrac1\\pi[-x\\cos x+\\sin x]_{-\\pi}^{\\pi}=\\dfrac1\\pi(\\pi+\\pi)=2$。'],
        tip:'奇函数乘 sin 是偶函数，积分翻倍。' }
    ],
    quickCheck:[
      { q:'奇函数的傅里叶级数含哪些项？', a:'只有正弦项（b_n），a_n=0。' },
      { q:'傅里叶常数项是？', a:'a₀/2。' },
      { q:'间断点处傅里叶级数收敛到？', a:'左右极限的平均值。' }
    ]
  },

  /* ========== 12.8 一般周期函数的傅里叶级数 ========== */
  {
    idx:'12.8', title:'一般周期函数的傅里叶级数',
    why:'前面针对周期 $2\\pi$ 的函数，这一节推广到**任意周期 $2l$** 的函数：把区间 $[-l,l]$ 通过变量代换缩放到 $[-\\pi,\\pi]$，再套傅里叶展开。',
    explain:[
      { analogy:'一般周期像"把不同长度的周期函数，先缩放到标准 2π 周期，再套傅里叶公式"。',
        points:'**周期 $2l$**：作代换 $x=\\dfrac{l}{\\pi}t$，则 $f$ 化为周期 $2\\pi$ 的函数。**展开**：$f\\sim\\dfrac{a_0}{2}+\\sum\\left(a_n\\cos\\dfrac{n\\pi x}{l}+b_n\\sin\\dfrac{n\\pi x}{l}\\right)$，系数 $a_n=\\dfrac1l\\int_{-l}^{l}f(x)\\cos\\dfrac{n\\pi x}{l}\\,dx$，$b_n=\\dfrac1l\\int_{-l}^{l}f(x)\\sin\\dfrac{n\\pi x}{l}\\,dx$。',
        pitfall:'高频错：① 系数分母是 $\\dfrac1l$（不是 $\\dfrac1\\pi$）；② 三角函数里是 $\\dfrac{n\\pi x}{l}$（要缩放）；③ 区间是 $[-l,l]$ 不是 $[-\\pi,\\pi]$。' },
      { chain:'确定周期 2l → 写系数（1/l）→ 三角函数用 nπx/l → 展开。',
        text:'**核心**：周期 2l 的系数分母 1/l、三角用 nπx/l。' }
    ],
    worked:[
      { stem:'求 $f(x)=x$（$[-1,1]$，周期 2）的傅里叶级数。',
        first:'$l=1$，奇函数 $a_n=0$，$b_n=\\dfrac1l\\int_{-l}^{l}x\\sin(n\\pi x)\\,dx$。',
        steps:['$b_n=\\int_{-1}^{1}x\\sin(n\\pi x)dx=\\dfrac{2}{n\\pi}(-1)^{n+1}$。',
               '$f\\sim\\sum\\dfrac{2}{n\\pi}(-1)^{n+1}\\sin(n\\pi x)$。'],
        take:'周期 2l 系数分母 1/l，三角里 nπx/l。' }
    ],
    checklist:[
      {id:'period', knowledge:'**周期 $2l$**：代换缩放到 $2\\pi$。'},
      {id:'coef', knowledge:'**系数**：$a_n=\\dfrac1l\\int_{-l}^{l}f\\cos\\dfrac{n\\pi x}{l}dx$。'},
      {id:'arg', knowledge:'**三角函数**：用 $\\dfrac{n\\pi x}{l}$。'},
      {id:'odd', knowledge:'**奇偶**：奇函数 $a_n=0$，偶函数 $b_n=0$（仍适用）。'}
    ],
    formulas:[
      { latex:'a_n=\\frac1l\\int_{-l}^{l}f(x)\\cos\\frac{n\\pi x}{l}\\,dx',
        from:'周期 2l 余弦系数', uses:'一般周期函数',
        pit:'分母 1/l，三角里 nπx/l。' }
    ],
    problems:[
      { stem:'求周期为 4 的函数 $f(x)=x$（$[-2,2]$）的 $b_n$。', kpt:'一般周期系数', lv:2,
        first:'$l=2$，$b_n=\\dfrac12\\int_{-2}^{2}x\\sin\\dfrac{n\\pi x}{2}dx$。',
        sol:['奇函数乘 sin 是偶函数，积分翻倍。',
             '$b_n=\\int_0^{2}x\\sin\\dfrac{n\\pi x}{2}dx=\\dfrac{4}{n\\pi}(-1)^{n+1}$。'],
        tip:'周期 2l 的 b_n 分母 1/l，三角里 nπx/l。' }
    ],
    quickCheck:[
      { q:'周期 2l 的系数分母？', a:'1/l（不是 1/π）。' },
      { q:'周期 2l 展开里三角函数？', a:'cos(nπx/l) 和 sin(nπx/l)。' },
      { q:'一般周期函数怎么处理？', a:'代换缩放到 2π 再套公式。' }
    ]
  }
  ]
});
