/* 第九章 多元函数微分法及其应用 —— 数据文件
 * 结构同前：window.CHAPOS.push({no,title,sub,sections:[...]})
 * 纪律：本章只能用第 1–8 章知识；本章引入偏导、全微分、多元极值等。
 * 注意：所有字符串值一律用单引号包裹，内部反斜杠需 \\ 转义。
 */
window.CHAPOS = window.CHAPOS || [];
window.CHAPOS.push({
  no:'9', title:'多元函数微分法及其应用', sub:'同济八版第九章 · 全 10 节',
  sections:[
  /* ========== 9.1 多元函数的基本概念 ========== */
  {
    idx:'9.1', title:'多元函数的基本概念',
    why:'前面都是一元函数 $y=f(x)$，但真实世界里一个量往往由多个量决定（温度由经纬度、面积由长和宽）。从这章起研究**多元函数** $z=f(x,y)$，它是一元函数的自然推广，但极限、连续的概念会复杂很多。',
    explain:[
      { analogy:'一元函数是"一条线上的对应"，多元函数是"一张曲面上的对应"——每个点 $(x,y)$ 给一个高度 $z$。',
        points:'**二元函数**：$z=f(x,y)$，定义域是平面点集。**极限**：$(x,y)\\to(x_0,y_0)$ 时 $f(x,y)\\to A$，要**沿任意路径**都趋于 $A$。**连续**：$\\lim_{(x,y)\\to(x_0,y_0)}f(x,y)=f(x_0,y_0)$。',
        pitfall:'高频错：① 二元极限要**所有路径**都趋同，只验几条直线路径不能证明存在（但找出一条路径极限不同即可**证否**）；② 把二元函数当成"两个一元函数"分别处理（漏了 $x,y$ 的耦合）；③ 定义域常是区域，忘画图判断。' },
      { chain:'二元函数 → 平面点集定义域 → 极限（多路径）→ 连续。',
        text:'**核心区别**：一元极限只需左右两侧，二元极限要"四面八方"都一致。' }
    ],
    worked:[
      { stem:'求 $\\lim_{(x,y)\\to(0,0)}\\dfrac{xy}{x^2+y^2}$。',
        first:'二元极限先试**不同路径**：沿 $y=kx$ 逼近看是否与 $k$ 有关。',
        steps:['沿 $y=kx$：$\\dfrac{x\\cdot kx}{x^2+k^2x^2}=\\dfrac{k}{1+k^2}$。',
               '结果随 $k$ 变（$k=0$ 得 0，$k=1$ 得 $\\dfrac12$）。',
               '路径不同极限不同，故**极限不存在**。'],
        take:'证二元极限不存在 = 找两条路径极限不同。沿 $y=kx$ 是首选。' }
    ],
    checklist:[
      {id:'def', knowledge:'**二元函数**：$z=f(x,y)$，$x,y$ 独立变化，$z$ 随之确定。'},
      {id:'domain', knowledge:'**定义域**：使 $f$ 有意义的平面点集（区域）。'},
      {id:'limit', knowledge:'**极限**：$(x,y)\\to(x_0,y_0)$ 时 $f\\to A$，须**任意路径**都趋同。'},
      {id:'continuous', knowledge:'**连续**：$\\lim f(x,y)=f(x_0,y_0)$。'},
      {id:'path', knowledge:'**路径法**：证极限不存在只需两条路径极限不同；证存在须一般方法。'}
    ],
    formulas:[
      { latex:'\\lim_{(x,y)\\to(0,0)}\\frac{xy}{x^2+y^2}\\ \\text{不存在}',
        from:'二元极限不存在例', uses:'演示多路径法',
        pit:'沿 y=kx 得 k/(1+k²) 随 k 变，故不存在。' }
    ],
    problems:[
      { stem:'求 $z=\\ln(x^2+y^2-1)$ 的定义域。', kpt:'定义域', lv:1,
        first:'对数真数要 $>0$，即 $x^2+y^2-1>0$。',
        sol:['$x^2+y^2-1>0\\Rightarrow x^2+y^2>1$。',
             '定义域是圆 $x^2+y^2=1$ 的外部（不含圆周）。'],
        tip:'多元函数定义域是平面区域，常用不等式表示。' },
      { stem:'判断 $\\lim_{(x,y)\\to(0,0)}\\dfrac{x^2y}{x^4+y^2}$ 是否存在。', kpt:'多路径法', lv:2,
        first:'试路径 $y=kx^2$ 或 $y=kx$。',
        sol:['沿 $y=kx^2$：$\\dfrac{x^2\\cdot kx^2}{x^4+k^2x^4}=\\dfrac{k}{1+k^2}$，随 $k$ 变。',
             '故极限不存在。'],
        tip:'看到 $x^4+y^2$ 分母，试 $y=kx^2$ 往往能暴露路径依赖。' }
    ],
    quickCheck:[
      { q:'二元函数极限和一元最本质区别？', a:'二元要沿任意路径都趋同，一元只需左右两侧。' },
      { q:'怎么快速证明二元极限不存在？', a:'找两条路径（如 y=kx、y=kx²）极限不同。' },
      { q:'二元函数连续的定义？', a:'极限值 = 函数值，即 lim f(x,y)=f(x₀,y₀)。' }
    ]
  },

  /* ========== 9.2 偏导数 ========== */
  {
    idx:'9.2', title:'偏导数',
    why:'多元函数有两个变量，求导时**固定其它变量、只对一个变量求导**，得到的就是**偏导数**。$\\dfrac{\\partial z}{\\partial x}$ 表示"$y$ 固定时 $z$ 随 $x$ 的变化率"，几何上就是曲面沿 $x$ 方向的切线斜率。',
    explain:[
      { analogy:'偏导数像"只沿一条坐标轴切一刀"看斜率：$\\dfrac{\\partial f}{\\partial x}$ 是固定 $y$、只看 $x$ 方向的变化，另一方向完全不动。',
        points:'**定义**：$\\dfrac{\\partial f}{\\partial x}=\\lim_{\\Delta x\\to0}\\dfrac{f(x+\\Delta x,y)-f(x,y)}{\\Delta x}$。**求法**：对 $x$ 求导时把 $y$ 当常数，反之亦然。**高阶偏导**：$\\dfrac{\\partial^2 f}{\\partial x^2}$、$\\dfrac{\\partial^2 f}{\\partial x\\partial y}$ 等。',
        pitfall:'高频错：① 对 $x$ 求导时把 $y$ 当**常数**（不是 0），$y^2$ 这类项求导得 0 但对 $x$ 的项要正常求；② 混合偏导 $f_{xy}$ 与 $f_{yx}$ 一般相等（连续时），但别想当然；③ 偏导存在**不保证连续**（与一元不同）。' },
      { chain:'固定其它变量 → 对目标变量求导 → 其余当常数 → 得偏导。',
        text:'**核心**：偏导 = "其它变量当常数"的单变量求导。' }
    ],
    worked:[
      { stem:'求 $z=x^2y+\\sin y$ 的 $\\dfrac{\\partial z}{\\partial x}$ 和 $\\dfrac{\\partial z}{\\partial y}$。',
        first:'对 $x$ 求导把 $y$ 当常数，对 $y$ 求导把 $x$ 当常数。',
        steps:['$\\dfrac{\\partial z}{\\partial x}=2xy+0=2xy$（$\\sin y$ 与 $x$ 无关，导 0）。',
               '$\\dfrac{\\partial z}{\\partial y}=x^2\\cdot1+\\cos y=x^2+\\cos y$。'],
        take:'对谁求导，就把其它变量当常数；与目标变量无关的项导数为 0。' }
    ],
    checklist:[
      {id:'def', knowledge:'**偏导定义**：$\\dfrac{\\partial f}{\\partial x}$ = 固定 $y$、对 $x$ 求导。'},
      {id:'method', knowledge:'**求法**：对 $x$ 求导时 $y$ 当常数，反之亦然。'},
      {id:'high', knowledge:'**高阶偏导**：$\\dfrac{\\partial^2 f}{\\partial x^2}$、$\\dfrac{\\partial^2 f}{\\partial y^2}$、混合 $\\dfrac{\\partial^2 f}{\\partial x\\partial y}$。'},
      {id:'mixed', knowledge:'**混合偏导**：连续时 $f_{xy}=f_{yx}$。'},
      {id:'notcont', knowledge:'**偏导存在 ≠ 连续**：偏导存在不保证函数连续（与一元不同）。'}
    ],
    formulas:[
      { latex:'\\frac{\\partial f}{\\partial x}=\\lim_{\\Delta x\\to0}\\frac{f(x+\\Delta x,y)-f(x,y)}{\\Delta x}',
        from:'偏导数定义', uses:'固定 y 对 x 求导',
        pit:'对 x 求导时 y 是常数。' },
      { latex:'f_{xy}=\\frac{\\partial^2 f}{\\partial y\\partial x}',
        from:'二阶混合偏导', uses:'先对 x 再对 y（或反序）',
        pit:'连续时 f_{xy}=f_{yx}。' }
    ],
    problems:[
      { stem:'求 $z=x^3y^2+e^x$ 的 $\\dfrac{\\partial z}{\\partial x}$。', kpt:'对 x 偏导', lv:1,
        first:'$y^2$ 当常数，$e^x$ 对 $x$ 求导是 $e^x$。',
        sol:['$\\dfrac{\\partial z}{\\partial x}=3x^2y^2+e^x$。'],
        tip:'对 $x$ 求导，$y^2$ 是常数系数，$e^x$ 照常求。' },
      { stem:'求 $z=x\\ln y$ 的二阶偏导 $\\dfrac{\\partial^2 z}{\\partial x\\partial y}$。', kpt:'混合偏导', lv:2,
        first:'先对 $x$ 求导（$\\ln y$ 当常数），再对 $y$ 求导。',
        sol:['$\\dfrac{\\partial z}{\\partial x}=\\ln y$。',
             '$\\dfrac{\\partial^2 z}{\\partial x\\partial y}=\\dfrac{\\partial}{\\partial y}(\\ln y)=\\dfrac1y$。'],
        tip:'混合偏导按顺序求：先 x 后 y，每步把另一变量当常数。' }
    ],
    quickCheck:[
      { q:'对 x 求偏导时 y 怎么处理？', a:'当常数（不是 0），含 y 的项按常数处理。' },
      { q:'偏导存在能推出连续吗？', a:'不能。偏导存在不保证函数连续（与一元不同）。' },
      { q:'f_xy 和 f_yx 什么关系？', a:'连续时相等，即 f_xy=f_yx。' }
    ]
  },

  /* ========== 9.3 全微分 ========== */
  {
    idx:'9.3', title:'全微分',
    why:'一元函数有微分 $dy=f\'(x)dx$，多元函数对应的是**全微分** $dz=f_x\\,dx+f_y\\,dy$——它把两个方向的微小变化累加起来，给出 $z$ 的近似增量。全微分是多元函数"可微"的核心概念，也是近似计算的工具。',
    explain:[
      { analogy:'全微分像"两个方向各走一小步的叠加"：$x$ 方向走 $dx$ 引起 $f_x\\,dx$，$y$ 方向走 $dy$ 引起 $f_y\\,dy$，加在一起就是总变化 $dz$。',
        points:'**全微分**：$dz=f_x(x,y)\\,dx+f_y(x,y)\\,dy$。**可微**：$\\Delta z=f_x\\Delta x+f_y\\Delta y+o(\\rho)$，其中 $\\rho=\\sqrt{(\\Delta x)^2+(\\Delta y)^2}$。**可微的必要条件**：偏导存在；**充分条件**：偏导连续。',
        pitfall:'高频错：① 全微分写成 $dz=f_x+f_y$ 漏了 $dx,dy$；② 可微、偏导存在、连续三者关系搞混（可微 ⟹ 连续且偏导存在，但反推不成立）；③ 近似计算 $\\Delta z\\approx dz$ 时漏了 $dx=\\Delta x,\\ dy=\\Delta y$ 的具体值。' },
      { chain:'求 $f_x,f_y$ → 全微分 $dz=f_x\\,dx+f_y\\,dy$ → 近似 $\\Delta z\\approx dz$。',
        text:'**核心**：全微分 = 两偏导分别乘各自微分的和。' }
    ],
    worked:[
      { stem:'求 $z=x^2y$ 在 $(1,2)$ 处的全微分。',
        first:'先求两个偏导，再代入点 $(1,2)$。',
        steps:['$f_x=2xy$，$f_y=x^2$。',
               '在 $(1,2)$：$f_x(1,2)=4$，$f_y(1,2)=1$。',
               '$dz=4\\,dx+1\\,dy$。'],
        take:'全微分 = $f_x\\,dx+f_y\\,dy$，偏导在给定点取值。' }
    ],
    checklist:[
      {id:'def', knowledge:'**全微分**：$dz=f_x\\,dx+f_y\\,dy$。'},
      {id:'diff', knowledge:'**可微**：$\\Delta z=f_x\\Delta x+f_y\\Delta y+o(\\rho)$，$\\rho=\\sqrt{\\Delta x^2+\\Delta y^2}$。'},
      {id:'necessary', knowledge:'**可微 ⟹ 偏导存在**（必要条件）；偏导连续 ⟹ 可微（充分条件）。'},
      {id:'approx', knowledge:'**近似计算**：$\\Delta z\\approx dz=f_x\\Delta x+f_y\\Delta y$。'},
      {id:'relation', knowledge:'**关系链**：偏导连续 ⟹ 可微 ⟹ 连续 且 偏导存在。'}
    ],
    formulas:[
      { latex:'dz=\\frac{\\partial z}{\\partial x}dx+\\frac{\\partial z}{\\partial y}dy',
        from:'全微分', uses:'求多元函数的全微分',
        pit:'两个偏导都要乘各自微分 dx、dy。' },
      { latex:'\\Delta z\\approx f_x\\Delta x+f_y\\Delta y',
        from:'近似公式', uses:'求函数增量近似值',
        pit:'dx=Δx、dy=Δy，偏导在起点取值。' }
    ],
    problems:[
      { stem:'求 $z=e^{xy}$ 的全微分。', kpt:'全微分', lv:1,
        first:'求 $f_x,f_y$ 再套 $dz=f_x\\,dx+f_y\\,dy$。',
        sol:['$f_x=y e^{xy}$，$f_y=x e^{xy}$。',
             '$dz=y e^{xy}\\,dx+x e^{xy}\\,dy$。'],
        tip:'全微分 = f_x·dx + f_y·dy，指数函数偏导带原函数。' },
      { stem:'用全微分近似 $\\sqrt{4.01^2+2.98^2}$。', kpt:'近似计算', lv:3,
        first:'取 $f=\\sqrt{x^2+y^2}$，点 $(4,3)$，$\\Delta x=0.01,\\Delta y=-0.02$。',
        sol:['$f_x=\\dfrac{x}{\\sqrt{x^2+y^2}}$，$f_y=\\dfrac{y}{\\sqrt{x^2+y^2}}$，在 $(4,3)$：$f_x=\\dfrac45,f_y=\\dfrac35$。',
             '$f(4,3)=5$，$\\Delta z\\approx\\dfrac45\\cdot0.01+\\dfrac35\\cdot(-0.02)=0.008-0.012=-0.004$。',
             '近似值 $5-0.004=4.996$。'],
        tip:'近似 = f(起点) + f_x·Δx + f_y·Δy，起点选好算的点。' }
    ],
    quickCheck:[
      { q:'全微分公式？', a:'dz = f_x·dx + f_y·dy。' },
      { q:'可微和偏导存在什么关系？', a:'可微 ⟹ 偏导存在；但偏导存在不一定可微。' },
      { q:'全微分近似计算的思路？', a:'Δz ≈ f_x·Δx + f_y·Δy，选好算的起点。' }
    ]
  },

  /* ========== 9.4 多元复合函数的求导法则 ========== */
  {
    idx:'9.4', title:'多元复合函数的求导法则',
    why:'多元函数也常"套娃"：$z=f(u,v)$，而 $u=u(x,y)$、$v=v(x,y)$。求 $z$ 对 $x$ 的偏导要用**链式法则**：$z$ 通过每个中间变量传到 $x$，各条路径相加。这是多元微分最常考的计算。',
    explain:[
      { analogy:'像"多路传输"：$z$ 依赖 $u,v$，$u,v$ 又依赖 $x$。$x$ 的变化沿 $u$ 和 $v$ 两条路传到 $z$，总变化 = 两条路的贡献相加。',
        points:'**链式法则**：$z=f(u,v),u=u(x,y),v=v(x,y)$，则 $\\dfrac{\\partial z}{\\partial x}=\\dfrac{\\partial z}{\\partial u}\\dfrac{\\partial u}{\\partial x}+\\dfrac{\\partial z}{\\partial v}\\dfrac{\\partial v}{\\partial x}$（对 $y$ 同理）。**口诀**：几个中间变量，就加几项；每项是"对中间变量偏导 × 中间变量对自变量偏导"。',
        pitfall:'高频错：① 漏了某条路径（有几个中间变量就加几项）；② 全导数 $\\dfrac{dz}{dt}$（中间变量都是一元 $t$ 的函数）与偏导 $\\dfrac{\\partial z}{\\partial x}$ 记混；③ 复合层次深时漏乘。' },
      { chain:'画路径图 → 每条路径一项 → 各项相加。',
        text:'**核心**：链式法则 = "路径数 = 项数"，沿每个中间变量各走一条路。' }
    ],
    worked:[
      { stem:'设 $z=uv$，$u=x^2$，$v=e^y$，求 $\\dfrac{\\partial z}{\\partial x}$。',
        first:'$z$ 依赖 $u,v$，$u$ 依赖 $x$、$v$ 不依赖 $x$，只有 $u$ 一条路。',
        steps:['$\\dfrac{\\partial z}{\\partial u}=v$，$\\dfrac{\\partial z}{\\partial v}=u$，$\\dfrac{\\partial u}{\\partial x}=2x$，$\\dfrac{\\partial v}{\\partial x}=0$。',
               '$\\dfrac{\\partial z}{\\partial x}=v\\cdot2x+u\\cdot0=2xv=2x e^y$。'],
        take:'链式法则按路径相加；某中间变量不依赖自变量时该项为 0。' }
    ],
    checklist:[
      {id:'chain', knowledge:'**链式法则**：$\\dfrac{\\partial z}{\\partial x}=\\sum\\dfrac{\\partial z}{\\partial u_i}\\dfrac{\\partial u_i}{\\partial x}$（所有中间变量求和）。'},
      {id:'count', knowledge:'**项数 = 路径数**：几个中间变量就加几项。'},
      {id:'total', knowledge:'**全导数**：中间变量都是一元函数 $t$ 时，$\\dfrac{dz}{dt}=\\dfrac{\\partial z}{\\partial u}\\dfrac{du}{dt}+\\dfrac{\\partial z}{\\partial v}\\dfrac{dv}{dt}$。'},
      {id:'deep', knowledge:'**多层复合**：逐层套链式，每层乘对应导数。'}
    ],
    formulas:[
      { latex:'\\frac{\\partial z}{\\partial x}=\\frac{\\partial z}{\\partial u}\\frac{\\partial u}{\\partial x}+\\frac{\\partial z}{\\partial v}\\frac{\\partial v}{\\partial x}',
        from:'多元链式法则', uses:'z=f(u,v), u,v 依赖 x,y',
        pit:'几个中间变量加几项，别漏路径。' }
    ],
    problems:[
      { stem:'设 $z=f(u,v)$，$u=x+y$，$v=x-y$，求 $\\dfrac{\\partial z}{\\partial x}$。', kpt:'链式法则', lv:2,
        first:'两条路：经 $u$ 和经 $v$，各自偏导相加。',
        sol:['$\\dfrac{\\partial z}{\\partial x}=f_u\\cdot1+f_v\\cdot1=f_u+f_v$。'],
        tip:'$u=x+y$、$v=x-y$ 时 $u_x=v_x=1$，结果就是 $f_u+f_v$。' },
      { stem:'设 $z=x^2+y^2$，$x=\\cos t$，$y=\\sin t$，求 $\\dfrac{dz}{dt}$。', kpt:'全导数', lv:2,
        first:'$x,y$ 都是一元 $t$ 的函数，用全导数公式。',
        sol:['$\\dfrac{\\partial z}{\\partial x}=2x$，$\\dfrac{\\partial z}{\\partial y}=2y$，$\\dfrac{dx}{dt}=-\\sin t$，$\\dfrac{dy}{dt}=\\cos t$。',
             '$\\dfrac{dz}{dt}=2x(-\\sin t)+2y(\\cos t)=-2\\cos t\\sin t+2\\sin t\\cos t=0$。'],
        tip:'$x^2+y^2$ 在圆上恒为 1，导数自然是 0，验证了链式法则。' }
    ],
    quickCheck:[
      { q:'链式法则的项数由什么决定？', a:'中间变量的个数（路径数），几个中间变量加几项。' },
      { q:'什么时候用全导数 dz/dt 而不是偏导？', a:'中间变量都是一元函数 t 时，用全导数。' },
      { q:'某中间变量不依赖自变量，对应项怎么办？', a:'该项为 0（该中间变量对自变量的偏导为 0）。' }
    ]
  },

  /* ========== 9.5 隐函数的求导公式 ========== */
  {
    idx:'9.5', title:'隐函数的求导公式',
    why:'$F(x,y)=0$ 可能确定一个隐函数 $y=y(x)$ 或 $x=x(y)$。多元情形下 $F(x,y,z)=0$ 确定 $z=z(x,y)$。隐函数求导不用先把 $y$ 解出来，直接用公式：$\\dfrac{dy}{dx}=-\\dfrac{F_x}{F_y}$。',
    explain:[
      { analogy:'隐函数像"被方程绑住的关系"，求导时不动方程本身，只对两边求导（把 $y$ 当 $x$ 的函数），再解出 $y\'$。',
        points:'**一元隐函数**：$F(x,y)=0$，$F_y\\ne0$ 时 $\\dfrac{dy}{dx}=-\\dfrac{F_x}{F_y}$。**二元隐函数**：$F(x,y,z)=0$，$F_z\\ne0$ 时 $\\dfrac{\\partial z}{\\partial x}=-\\dfrac{F_x}{F_z}$，$\\dfrac{\\partial z}{\\partial y}=-\\dfrac{F_y}{F_z}$。',
        pitfall:'高频错：① 忘记负号（公式是 $-F_x/F_y$）；② 求 $F_x$ 时把 $y$ 当**独立变量**（在 $F$ 的表达式里求偏导，不代入隐函数关系）；③ 分母是 $F_y$（对"因变量"的偏导），分子分母别搞反。' },
      { chain:'写 $F=0$ → 求 $F_x,F_y$ → 套 $-F_x/F_y$。',
        text:'**核心**：隐函数求导 = $-\\dfrac{对自变量偏导}{对因变量偏导}$，负号别丢。' }
    ],
    worked:[
      { stem:'由 $x^2+y^2=1$ 求 $\\dfrac{dy}{dx}$。',
        first:'令 $F=x^2+y^2-1=0$，$F_x=2x$，$F_y=2y$。',
        steps:['$\\dfrac{dy}{dx}=-\\dfrac{F_x}{F_y}=-\\dfrac{2x}{2y}=-\\dfrac{x}{y}$。'],
        take:'隐函数求导 = $-F_x/F_y$，负号是固定格式。' }
    ],
    checklist:[
      {id:'one', knowledge:'**一元隐函数**：$F(x,y)=0$，$\\dfrac{dy}{dx}=-\\dfrac{F_x}{F_y}$。'},
      {id:'two', knowledge:'**二元隐函数**：$F(x,y,z)=0$，$\\dfrac{\\partial z}{\\partial x}=-\\dfrac{F_x}{F_z}$。'},
      {id:'sign', knowledge:'**负号**：公式自带负号，别丢。'},
      {id:'denominator', knowledge:'**分母**：对"因变量"的偏导（$F_y$ 或 $F_z$）。'}
    ],
    formulas:[
      { latex:'\\frac{dy}{dx}=-\\frac{F_x}{F_y}',
        from:'一元隐函数求导', uses:'F(x,y)=0 求 dy/dx',
        pit:'负号别丢；分母是对 y 的偏导。' },
      { latex:'\\frac{\\partial z}{\\partial x}=-\\frac{F_x}{F_z}',
        from:'二元隐函数求导', uses:'F(x,y,z)=0 求 z 对 x 的偏导',
        pit:'分母是对 z（因变量）的偏导。' }
    ],
    problems:[
      { stem:'由 $e^y+xy=e$ 求 $\\dfrac{dy}{dx}$。', kpt:'隐函数求导', lv:2,
        first:'令 $F=e^y+xy-e$，求 $F_x,F_y$。',
        sol:['$F_x=y$，$F_y=e^y+x$。',
             '$\\dfrac{dy}{dx}=-\\dfrac{y}{e^y+x}$。'],
        tip:'$F_x$ 里 $y$ 当常数（是 y），$F_y$ 里 $x$ 当常数。' },
      { stem:'由 $x^2+y^2+z^2=1$ 求 $\\dfrac{\\partial z}{\\partial x}$。', kpt:'二元隐函数', lv:2,
        first:'令 $F=x^2+y^2+z^2-1$，$F_x=2x$，$F_z=2z$。',
        sol:['$\\dfrac{\\partial z}{\\partial x}=-\\dfrac{2x}{2z}=-\\dfrac{x}{z}$。'],
        tip:'球面隐函数求偏导，分母是对 z 的偏导。' }
    ],
    quickCheck:[
      { q:'隐函数求导公式的负号？', a:'有负号：dy/dx = −F_x/F_y。' },
      { q:'求 F_x 时 y 怎么处理？', a:'当独立变量（在 F 表达式里求偏导，不代入隐函数关系）。' },
      { q:'二元隐函数 z=z(x,y) 的分母是谁？', a:'F_z，即对因变量 z 的偏导。' }
    ]
  },

  /* ========== 9.6 多元函数微分学的几何应用 ========== */
  {
    idx:'9.6', title:'多元函数微分学的几何应用',
    why:'偏导的几何意义是切线的斜率。这一节把微分学用在几何上：求**空间曲线的切线与法平面**、**曲面的切平面与法线**。核心工具都是"方向向量 / 法向量"。',
    explain:[
      { analogy:'曲线在一点的切线方向由"速度向量"（各坐标对参数的导数）给出；曲面在一点的法线方向由"梯度"（各偏导）给出。',
        points:'**空间曲线切线**：$\\vec r(t)=(x(t),y(t),z(t))$ 在 $t_0$ 的切向量 $\\vec r\'(t_0)=(x\'(t_0),y\'(t_0),z\'(t_0))$。**曲面切平面**：$F(x,y,z)=0$ 在点 $M_0$ 的法向量 $\\vec n=(F_x,F_y,F_z)|_{M_0}$，切平面 $F_x(x-x_0)+F_y(y-y_0)+F_z(z-z_0)=0$。',
        pitfall:'高频错：① 曲线切向量用**参数导数**，曲面法向量用**偏导**，两者别混；② 曲面 $z=f(x,y)$ 可化为 $F=z-f(x,y)=0$，法向量 $(-f_x,-f_y,1)$；③ 切平面方程用点法式，忘了乘 $(x-x_0)$ 等。' },
      { chain:'曲线 → 切向量（参数导数）；曲面 → 法向量（偏导）→ 切平面/法线。',
        text:'**核心**：切线方向 = 参数导数，法线方向 = 梯度。' }
    ],
    worked:[
      { stem:'求曲线 $x=t,y=t^2,z=t^3$ 在 $t=1$ 处的切向量。',
        first:'切向量 = 各坐标对 $t$ 求导在 $t=1$ 的值。',
        steps:['$\\vec r\'(t)=(1,2t,3t^2)$。',
               '在 $t=1$：$\\vec r\'(1)=(1,2,3)$。'],
        take:'曲线切向量 = 各坐标对参数的导数。' },
      { stem:'求曲面 $z=x^2+y^2$ 在点 $(1,1,2)$ 处的切平面。',
        first:'化 $F=z-x^2-y^2=0$，法向量 $\\vec n=(F_x,F_y,F_z)=(-2x,-2y,1)$。',
        steps:['在 $(1,1,2)$：$\\vec n=(-2,-2,1)$。',
               '切平面：$-2(x-1)-2(y-1)+1(z-2)=0$。',
               '即 $2x+2y-z-2=0$。'],
        take:'曲面切平面 = 先求法向量（偏导），再套点法式。' }
    ],
    checklist:[
      {id:'curve', knowledge:'**曲线切向量**：$\\vec r\'(t)=(x\',y\',z\')$。'},
      {id:'surface', knowledge:'**曲面法向量**：$F(x,y,z)=0$ 的 $\\vec n=(F_x,F_y,F_z)$。'},
      {id:'tangentplane', knowledge:'**切平面**：$F_x(x-x_0)+F_y(y-y_0)+F_z(z-z_0)=0$。'},
      {id:'zform', knowledge:'**z=f(x,y) 的法向量**：$(-f_x,-f_y,1)$。'},
      {id:'normal', knowledge:'**法线**：过 $M_0$、方向为 $\\vec n$ 的直线。'}
    ],
    formulas:[
      { latex:'\\vec r\'(t)=(x\'(t),y\'(t),z\'(t))',
        from:'曲线切向量', uses:'求空间曲线切线方向',
        pit:'各坐标对参数 t 求导。' },
      { latex:'\\vec n=(F_x,F_y,F_z)',
        from:'曲面法向量', uses:'求曲面切平面与法线',
        pit:'z=f(x,y) 时化为 F=z−f，法向量 (−f_x,−f_y,1)。' }
    ],
    problems:[
      { stem:'求曲面 $z=x^2+y^2$ 在 $(0,0,0)$ 的法向量。', kpt:'曲面法向量', lv:2,
        first:'$F=z-x^2-y^2$，$\\vec n=(-2x,-2y,1)$。',
        sol:['在 $(0,0,0)$：$\\vec n=(0,0,1)$。'],
        tip:'旋转抛物面在顶点处法向量沿 z 轴方向。' },
      { stem:'求曲线 $x=\\cos t,y=\\sin t,z=t$ 在 $t=0$ 的切线方向。', kpt:'曲线切向量', lv:1,
        first:'各坐标对 $t$ 求导，代入 $t=0$。',
        sol:['$\\vec r\'(t)=(-\\sin t,\\cos t,1)$。',
             '在 $t=0$：$(0,1,1)$。'],
        tip:'螺线在 t=0 处切向量 (0,1,1)。' }
    ],
    quickCheck:[
      { q:'空间曲线切向量怎么求？', a:'各坐标对参数 t 求导：r′(t)=(x′,y′,z′)。' },
      { q:'曲面法向量怎么求？', a:'F(x,y,z)=0 的法向量 (F_x,F_y,F_z)；z=f 时 (−f_x,−f_y,1)。' },
      { q:'切平面方程用什么形式？', a:'点法式：F_x(x−x₀)+F_y(y−y₀)+F_z(z−z₀)=0。' }
    ]
  },

  /* ========== 9.7 方向导数与梯度 ========== */
  {
    idx:'9.7', title:'方向导数与梯度',
    why:'偏导只描述沿坐标轴方向的变化，但函数在一点可以沿**任意方向**变化。方向导数 $\\dfrac{\\partial f}{\\partial l}$ 给出沿方向 $\\vec l$ 的变化率，而**梯度** $\\nabla f=(f_x,f_y)$ 是一个向量，指向函数增长最快的方向。',
    explain:[
      { analogy:'想象站在山坡上：沿不同方向走，高度变化快慢不同。梯度像"最陡上坡"的方向，方向导数就是"沿某个方向走的坡度"。',
        points:'**方向导数**：$\\dfrac{\\partial f}{\\partial l}=f_x\\cos\\alpha+f_y\\cos\\beta$（$\\cos\\alpha,\\cos\\beta$ 是方向 $\\vec l$ 的方向余弦）。**梯度**：$\\nabla f=(f_x,f_y)$。**关系**：$\\dfrac{\\partial f}{\\partial l}=\\nabla f\\cdot\\vec e_l$，方向导数最大（沿梯度方向）等于 $|\\nabla f|$。',
        pitfall:'高频错：① 方向导数里的 $\\cos\\alpha,\\cos\\beta$ 要**单位向量**的方向余弦，不是任意向量分量；② 梯度是**向量**（不是数），记 $(f_x,f_y)$；③ 方向导数最大值 = 梯度的模 $|\\nabla f|$，方向沿梯度。' },
      { chain:'求偏导 $f_x,f_y$ → 梯度 $\\nabla f$ → 方向导数 = 梯度 · 单位方向向量。',
        text:'**核心**：梯度指向增长最快方向，方向导数 = 梯度与单位方向的点积。' }
    ],
    worked:[
      { stem:'求 $f=x^2+y^2$ 在 $(1,1)$ 处沿方向 $\\vec l=(1,1)$ 的方向导数。',
        first:'先求梯度，再把 $\\vec l$ 单位化，方向导数 = 梯度 · 单位方向。',
        steps:['$f_x=2x,f_y=2y$，在 $(1,1)$：$\\nabla f=(2,2)$。',
               '单位方向 $\\vec e_l=\\dfrac{(1,1)}{\\sqrt2}=\\left(\\dfrac1{\\sqrt2},\\dfrac1{\\sqrt2}\\right)$。',
               '$\\dfrac{\\partial f}{\\partial l}=(2,2)\\cdot\\left(\\dfrac1{\\sqrt2},\\dfrac1{\\sqrt2}\\right)=2\\sqrt2$。'],
        take:'方向导数 = 梯度 · 单位方向向量，方向要先单位化。' }
    ],
    checklist:[
      {id:'dir', knowledge:'**方向导数**：$\\dfrac{\\partial f}{\\partial l}=f_x\\cos\\alpha+f_y\\cos\\beta$。'},
      {id:'grad', knowledge:'**梯度**：$\\nabla f=(f_x,f_y)$，是向量。'},
      {id:'rel', knowledge:'**关系**：方向导数 = $\\nabla f\\cdot\\vec e_l$（单位方向点积）。'},
      {id:'max', knowledge:'**最大方向导数**：沿梯度方向，值 = $|\\nabla f|$。'},
      {id:'unit', knowledge:'**方向要单位化**：$\\cos\\alpha,\\cos\\beta$ 是单位向量的方向余弦。'}
    ],
    formulas:[
      { latex:'\\frac{\\partial f}{\\partial l}=f_x\\cos\\alpha+f_y\\cos\\beta',
        from:'方向导数', uses:'求沿方向 l 的变化率',
        pit:'cosα,cosβ 是单位方向的方向余弦。' },
      { latex:'\\nabla f=(f_x,f_y)',
        from:'梯度', uses:'求增长最快方向',
        pit:'梯度是向量；最大方向导数 = |∇f|。' }
    ],
    problems:[
      { stem:'求 $f=xy$ 在 $(1,2)$ 的梯度。', kpt:'梯度', lv:1,
        first:'$\\nabla f=(f_x,f_y)=(y,x)$，代入点。',
        sol:['$\\nabla f=(y,x)$，在 $(1,2)$：$(2,1)$。'],
        tip:'梯度 = (对 x 偏导, 对 y 偏导)。' },
      { stem:'求 $f=x^2+y^2$ 在 $(1,1)$ 的最大方向导数。', kpt:'最大方向导数', lv:2,
        first:'最大方向导数 = 梯度的模 $|\\nabla f|$。',
        sol:['$\\nabla f=(2x,2y)$，在 $(1,1)$：$(2,2)$。',
             '$|\\nabla f|=\\sqrt{2^2+2^2}=2\\sqrt2$。'],
        tip:'最大方向导数沿梯度方向，值等于 |∇f|。' }
    ],
    quickCheck:[
      { q:'梯度是数还是向量？', a:'向量，∇f=(f_x,f_y)。' },
      { q:'方向导数最大值是多少？', a:'|∇f|（梯度的模），沿梯度方向。' },
      { q:'方向导数计算前方向要做什么？', a:'单位化，用方向余弦（单位向量分量）。' }
    ]
  },

  /* ========== 9.8 多元函数的极值及其求法 ========== */
  {
    idx:'9.8', title:'多元函数的极值及其求法',
    why:'一元函数用导数找极值，多元函数用**偏导**：极值点处偏导同时为 0（驻点），再用二阶偏导的判别式判断极值类型。还有一类**条件极值**（在约束下求极值），用拉格朗日乘数法。',
    explain:[
      { analogy:'极值点像"山顶"或"谷底"，曲面在这里"变平"（两偏导都为 0）。判别式像"看曲率"：往上弯是极小，往下弯是极大，马鞍形则是鞍点。',
        points:'**极值必要条件**：极值点处 $f_x=0,f_y=0$（驻点）。**判别**：$A=f_{xx},B=f_{xy},C=f_{yy}$，判别式 $AC-B^2$：$>0$ 且 $A>0$ 极小、$A<0$ 极大；$<0$ 是鞍点（非极值）；$=0$ 失效。**条件极值**：拉格朗日乘数法，$L=f+\\lambda\\varphi$，解 $L_x=L_y=L_\\lambda=0$。',
        pitfall:'高频错：① 驻点不一定是极值点（还要用判别式）；② 判别式 $AC-B^2$ 的符号与 $A$ 的符号要配合判断；③ 条件极值忘写约束方程（拉格朗日函数要含 $\\lambda\\varphi$）。' },
      { chain:'求驻点（偏导=0）→ 算 A,B,C → 判别式定极值；有约束则拉格朗日乘数法。',
        text:'**核心**：驻点 + 判别式 = 无条件极值；拉格朗日 = 条件极值。' }
    ],
    worked:[
      { stem:'求 $f=x^2+y^2$ 的极值。',
        first:'求驻点 $f_x=2x=0,f_y=2y=0$，得 $(0,0)$，再判别。',
        steps:['$f_x=2x,f_y=2y$，驻点 $(0,0)$。',
               '$A=f_{xx}=2,B=f_{xy}=0,C=f_{yy}=2$。',
               '$AC-B^2=4>0$ 且 $A=2>0$，故 $(0,0)$ 是**极小值点**，极小值 $f(0,0)=0$。'],
        take:'极值 = 驻点 + 判别式 AC−B²。A>0 极小、A<0 极大。' }
    ],
    checklist:[
      {id:'stationary', knowledge:'**驻点**：$f_x=0,f_y=0$ 的点（极值必要条件）。'},
      {id:'disc', knowledge:'**判别式**：$AC-B^2$，$A=f_{xx},B=f_{xy},C=f_{yy}$。'},
      {id:'judge', knowledge:'**判别**：$AC-B^2>0$ 且 $A>0$ 极小、$A<0$ 极大；$<0$ 鞍点；$=0$ 失效。'},
      {id:'lagrange', knowledge:'**拉格朗日乘数法**：$L=f+\\lambda\\varphi$，解 $L_x=L_y=L_\\lambda=0$。'},
      {id:'constraint', knowledge:'**条件极值**：在约束 $\\varphi=0$ 下求 $f$ 的极值。'}
    ],
    formulas:[
      { latex:'AC-B^2\\begin{cases}>0,\\ A>0:\\text{极小}\\\\>0,\\ A<0:\\text{极大}\\\\<0:\\text{鞍点}\\end{cases}',
        from:'极值判别式', uses:'判断驻点是否为极值',
        pit:'A=f_xx、B=f_xy、C=f_yy；=0 时判别失效。' },
      { latex:'L=f+\\lambda\\varphi,\\quad L_x=L_y=L_\\lambda=0',
        from:'拉格朗日乘数法', uses:'条件极值（约束 φ=0）',
        pit:'拉格朗日函数要含 λφ 项。' }
    ],
    problems:[
      { stem:'求 $f=x^2-y^2$ 的极值。', kpt:'鞍点判别', lv:2,
        first:'驻点 $(0,0)$，$A=2,B=0,C=-2$。',
        sol:['$AC-B^2=2\\cdot(-2)-0=-4<0$。',
             '是**鞍点**，无极值。'],
        tip:'$AC-B^2<0$ 是鞍点（马鞍面），不是极值。' },
      { stem:'求 $f=x^2+y^2$ 在约束 $x+y=1$ 下的条件极值。', kpt:'拉格朗日', lv:3,
        first:'$L=x^2+y^2+\\lambda(x+y-1)$，解三个方程。',
        sol:['$L_x=2x+\\lambda=0$，$L_y=2y+\\lambda=0$，$L_\\lambda=x+y-1=0$。',
             '前两式 $2x=2y$，$x=y$，代入 $x+y=1$ 得 $x=y=\\dfrac12$。',
             '极值 $f=\\dfrac14+\\dfrac14=\\dfrac12$。'],
        tip:'拉格朗日：三个偏导为零，消 λ 得极值点。' }
    ],
    quickCheck:[
      { q:'驻点一定是极值点吗？', a:'不一定，还要用判别式 AC−B² 判断。' },
      { q:'AC−B²<0 是什么点？', a:'鞍点，不是极值。' },
      { q:'条件极值用什么方法？', a:'拉格朗日乘数法：L=f+λφ。' }
    ]
  },

  /* ========== 9.9 二元函数的泰勒公式（选学） ========== */
  {
    idx:'9.9', title:'二元函数的泰勒公式',
    why:'一元函数有泰勒公式把函数展开成多项式，二元函数也有：$f(x,y)$ 在 $(x_0,y_0)$ 附近展开成各阶偏导的多项式。它是近似计算和极值判别理论的基石（极值充分条件就是靠二阶泰勒项证明的）。',
    explain:[
      { analogy:'二元泰勒像"用一张抛物面（二阶）去逼近曲面"：零阶是值，一阶是切平面（梯度），二阶是曲率（海森矩阵）。',
        points:'**二阶泰勒**：$f(x_0+h,y_0+k)=f(x_0,y_0)+(hf_x+kf_y)+\\dfrac12(h^2f_{xx}+2hkf_{xy}+k^2f_{yy})+o(\\rho^2)$，其中偏导在 $(x_0,y_0)$ 取值，$\\rho=\\sqrt{h^2+k^2}$。',
        pitfall:'高频错：① 交叉项 $2hk f_{xy}$ 的系数 2 容易漏；② 偏导都要在展开点 $(x_0,y_0)$ 取值；③ 余项是 $o(\\rho^2)$（$\\rho\\to0$）。' },
      { chain:'求各阶偏导 → 在展开点取值 → 代入泰勒公式。',
        text:'**核心**：二阶泰勒 = 值 + 一阶（梯度项）+ 二阶（海森项）。' }
    ],
    worked:[
      { stem:'求 $f(x,y)=x^2+xy$ 在 $(1,1)$ 处的二阶泰勒展开。',
        first:'求 $f$ 及各阶偏导在 $(1,1)$ 的值，代入公式。',
        steps:['$f(1,1)=2$；$f_x=2x+y|_{(1,1)}=3$，$f_y=x|_{(1,1)}=1$。',
               '$f_{xx}=2,f_{xy}=1,f_{yy}=0$。',
               '$f(1+h,1+k)=2+(3h+k)+\\dfrac12(2h^2+2hk+0)+o(\\rho^2)$。'],
        take:'二元泰勒 = f + (h f_x + k f_y) + ½(h²f_xx + 2hk f_xy + k² f_yy)。' }
    ],
    checklist:[
      {id:'taylor', knowledge:'**二阶泰勒**：$f=f_0+(hf_x+kf_y)+\\frac12(h^2f_{xx}+2hkf_{xy}+k^2f_{yy})+o(\\rho^2)$。'},
      {id:'cross', knowledge:'**交叉项**：$2hk f_{xy}$ 系数是 2。'},
      {id:'atpoint', knowledge:'**取值**：各偏导在展开点 $(x_0,y_0)$ 取值。'},
      {id:'remainder', knowledge:'**余项**：$o(\\rho^2)$，$\\rho=\\sqrt{h^2+k^2}$。'}
    ],
    formulas:[
      { latex:'f(x_0+h,y_0+k)=f_0+(hf_x+kf_y)+\\frac12(h^2f_{xx}+2hkf_{xy}+k^2f_{yy})+o(\\rho^2)',
        from:'二元二阶泰勒', uses:'多元函数近似、极值判别',
        pit:'交叉项系数 2；偏导在展开点取值。' }
    ],
    problems:[
      { stem:'求 $f(x,y)=e^{x+y}$ 在 $(0,0)$ 的二阶泰勒展开（到二阶）。', kpt:'二元泰勒', lv:3,
        first:'$f=e^{x+y}$，各阶偏导都是 $e^{x+y}$，在 $(0,0)$ 都为 1。',
        sol:['$f(0,0)=1$，$f_x=f_y=f_{xx}=f_{xy}=f_{yy}=1$。',
             '$f(h,k)=1+(h+k)+\\dfrac12(h^2+2hk+k^2)+o(\\rho^2)$。',
             '即 $1+(h+k)+\\dfrac{(h+k)^2}{2}+o(\\rho^2)$。'],
        tip:'$e^{x+y}$ 的泰勒就是 $e^t$ 的泰勒把 $t=h+k$ 代入。' }
    ],
    quickCheck:[
      { q:'二元二阶泰勒的交叉项是什么？', a:'2hk·f_xy，系数是 2。' },
      { q:'泰勒公式里的偏导在哪取值？', a:'展开点 (x₀,y₀)。' },
      { q:'二阶泰勒的余项是？', a:'o(ρ²)，ρ=√(h²+k²)。' }
    ]
  },

  /* ========== 9.10 最小二乘法（选学） ========== */
  {
    idx:'9.10', title:'最小二乘法',
    why:'给一堆实测数据点 $(x_i,y_i)$，要找一条"最贴近"的直线 $y=a+bx$。**最小二乘法**让各点偏差的平方和最小，从而定出 $a,b$。这是数据拟合、统计回归的数学基础，本质是多元函数的极值问题。',
    explain:[
      { analogy:'像"找一条让所有点都尽量靠近的直线"：每个点到直线的竖直偏差平方，把这些平方加起来，让总和最小。',
        points:'**目标**：最小化 $S(a,b)=\\sum_{i=1}^n(y_i-a-bx_i)^2$。**求解**：令 $\\dfrac{\\partial S}{\\partial a}=0,\\dfrac{\\partial S}{\\partial b}=0$，解出 $a,b$（正规方程）。',
        pitfall:'高频错：① 是对**偏差平方和**求最小，不是绝对值或直接和；② 求偏导时把 $y_i,x_i$ 当**已知数据**（常数），对 $a,b$ 求导；③ 正规方程是线性方程组，解错系数。' },
      { chain:'写偏差平方和 S → 对 a,b 求偏导=0 → 解正规方程。',
        text:'**核心**：最小二乘 = 偏差平方和最小，偏导为零解出参数。' }
    ],
    worked:[
      { stem:'用最小二乘法求拟合数据 $(0,1),(1,2),(2,3)$ 的直线 $y=a+bx$。',
        first:'写 $S=\\sum(y_i-a-bx_i)^2$，对 $a,b$ 求偏导为零。',
        steps:['$S=(1-a)^2+(2-a-b)^2+(3-a-2b)^2$。',
               '$\\dfrac{\\partial S}{\\partial a}=-2[(1-a)+(2-a-b)+(3-a-2b)]=0$，得 $3a+3b=6$。',
               '$\\dfrac{\\partial S}{\\partial b}=-2[(2-a-b)+2(3-a-2b)]=0$，得 $3a+5b=8$。',
               '解：$a=1,b=1$，直线 $y=1+x$。'],
        take:'最小二乘 = 偏差平方和对参数求偏导为零，解方程组。' }
    ],
    checklist:[
      {id:'objective', knowledge:'**目标**：$S=\\sum(y_i-a-bx_i)^2$ 最小。'},
      {id:'partial', knowledge:'**求偏导**：$\\dfrac{\\partial S}{\\partial a}=0,\\dfrac{\\partial S}{\\partial b}=0$。'},
      {id:'normal', knowledge:'**正规方程**：解出的线性方程组。'},
      {id:'data', knowledge:'**数据当常数**：$x_i,y_i$ 是已知数据，对 $a,b$ 求导。'}
    ],
    formulas:[
      { latex:'S(a,b)=\\sum_{i=1}^n(y_i-a-bx_i)^2\\to\\min',
        from:'最小二乘目标', uses:'直线拟合数据',
        pit:'是偏差平方和最小。' },
      { latex:'\\frac{\\partial S}{\\partial a}=0,\\quad \\frac{\\partial S}{\\partial b}=0',
        from:'正规方程', uses:'解出拟合参数 a,b',
        pit:'对 a,b 求偏导，数据当常数。' }
    ],
    problems:[
      { stem:'用最小二乘法拟合 $(1,2),(2,4),(3,5)$ 的直线。', kpt:'最小二乘', lv:3,
        first:'写 S 对 a,b 求偏导为零，解正规方程。',
        sol:['$S=(2-a-b)^2+(4-a-2b)^2+(5-a-3b)^2$。',
             '正规方程：$3a+6b=11$，$6a+14b=26$。',
             '解得 $a=\\dfrac76,\\ b=\\dfrac32$，直线 $y=\\dfrac76+\\dfrac32 x$。'],
        tip:'最小二乘解正规方程即可，无需画图。' }
    ],
    quickCheck:[
      { q:'最小二乘法最小化的是什么？', a:'偏差的平方和 S=Σ(y_i−a−bx_i)²。' },
      { q:'求偏导时数据 x_i、y_i 怎么处理？', a:'当已知常数，对参数 a、b 求导。' },
      { q:'最小二乘的数学本质？', a:'多元函数（平方和）的无条件极值。' }
    ]
  }
  ]
});
