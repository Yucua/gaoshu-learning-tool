/* 第十章 重积分 —— 数据文件
 * 结构同前：window.CHAPOS.push({no,title,sub,sections:[...]})
 * 纪律：本章只能用第 1–9 章知识；本章引入二重积分、三重积分。
 * 注意：所有字符串值一律用单引号包裹，内部反斜杠需 \\ 转义。
 */
window.CHAPOS = window.CHAPOS || [];
window.CHAPOS.push({
  no:'10', title:'重积分', sub:'同济八版第十章 · 全 5 节',
  sections:[
  /* ========== 10.1 二重积分的概念与性质 ========== */
  {
    idx:'10.1', title:'二重积分的概念与性质',
    why:'定积分把"线"上的量累加，二重积分把**平面区域**上的量累加——最典型的是曲面 $z=f(x,y)$ 下方柱体的体积。它是定积分从一元到二元的推广，思想一样：分割、求和、取极限。',
    explain:[
      { analogy:'二重积分像"把一块平面切成无数小方格，每个小方格上立一根小柱体，所有小柱体体积加起来取极限"。',
        points:'**定义**：$\\iint_D f(x,y)\\,d\\sigma=\\lim_{\\lambda\\to0}\\sum f(\\xi_i,\\eta_i)\\Delta\\sigma_i$。**几何意义**：$f\\ge0$ 时是曲面下柱体的体积。**性质**：线性、区域可加、保号、估值（与定积分类似）。',
        pitfall:'高频错：① 二重积分结果是个**数**（体积），不是函数；② 区域 $D$ 的分割要与积分限对应，别把 $D$ 写错；③ $f$ 在 $D$ 上取负值时体积要加绝对值。' },
      { chain:'分割区域 → 求和 → 取极限 → 二重积分。性质类比定积分。',
        text:'**核心**：二重积分 = 平面区域上的"体积累加"，是定积分向二元推广。' }
    ],
    worked:[
      { stem:'说明 $\\iint_D 1\\,d\\sigma$（$D$ 是区域）的几何意义。',
        first:'$f\\equiv1$ 时，二重积分 = 底面积为区域 $D$、高为 1 的柱体体积。',
        steps:['$f=1$，柱体体积 = 底面积 × 高 = $S(D)\\times1$。',
               '所以 $\\iint_D 1\\,d\\sigma=S(D)$（区域 $D$ 的面积）。'],
        take:'$\\iint_D 1\\,d\\sigma$ = 区域 $D$ 的面积，这是常用结论。' }
    ],
    checklist:[
      {id:'def', knowledge:'**二重积分**：$\\iint_D f\\,d\\sigma=\\lim\\sum f\\Delta\\sigma$。'},
      {id:'geom', knowledge:'**几何意义**：$f\\ge0$ 时 = 曲面下柱体体积；$f=1$ 时 = 区域面积。'},
      {id:'linear', knowledge:'**线性**：$\\iint(af+bg)=a\\iint f+b\\iint g$。'},
      {id:'add', knowledge:'**区域可加**：$D=D_1\\cup D_2$（不重叠）时 $\\iint_D=\\iint_{D_1}+\\iint_{D_2}$。'},
      {id:'sign', knowledge:'**保号与估值**：$f\\ge0\\Rightarrow\\iint f\\ge0$；$mS\\le\\iint f\\le MS$。'}
    ],
    formulas:[
      { latex:'\\iint_D 1\\,d\\sigma=S(D)',
        from:'二重积分几何意义', uses:'求区域面积',
        pit:'f=1 时二重积分等于区域面积。' }
    ],
    problems:[
      { stem:'用二重积分表示圆盘 $D:x^2+y^2\\le1$ 的面积。', kpt:'面积表示', lv:1,
        first:'面积 = $\\iint_D 1\\,d\\sigma$。',
        sol:['$S=\\iint_D 1\\,d\\sigma=\\pi\\cdot1^2=\\pi$。'],
        tip:'f=1 的二重积分就是区域面积，圆盘面积为 π。' },
      { stem:'估计 $\\iint_D(x^2+y^2)\\,d\\sigma$ 的范围，$D:x^2+y^2\\le1$。', kpt:'估值', lv:2,
        first:'用估值不等式：$mS\\le\\iint f\\le MS$，找 $f$ 在 $D$ 上的最大最小值。',
        sol:['在 $D$ 上 $0\\le x^2+y^2\\le1$，即 $m=0,M=1$。',
             '$S=\\pi$，故 $0\\le\\iint_D(x^2+y^2)d\\sigma\\le\\pi$。'],
        tip:'估值 = 最值 × 面积夹出来。' }
    ],
    quickCheck:[
      { q:'二重积分 f=1 时等于什么？', a:'区域 D 的面积。' },
      { q:'二重积分的几何意义？', a:'曲面 z=f(x,y) 下柱体的体积（f≥0 时）。' },
      { q:'二重积分是数还是函数？', a:'数（体积或面积）。' }
    ]
  },

  /* ========== 10.2 二重积分的计算法 ========== */
  {
    idx:'10.2', title:'二重积分的计算法',
    why:'二重积分算起来要"化二次积分"：先对一个变量积分（另一个当常数），再对另一个积分。有**直角坐标**和**极坐标**两种算法，选择取决于区域和被积函数。这是重积分的核心计算。',
    explain:[
      { analogy:'二重积分像"先横着切、再竖着累"：先固定 $y$、对 $x$ 积（横切一条），再对 $y$ 积（把各条累起来），就是先 $x$ 后 $y$。',
        points:'**直角坐标**：$D=\\{(x,y):a\\le x\\le b,\\varphi_1(x)\\le y\\le\\varphi_2(x)\\}$ 时 $\\iint_D f\\,d\\sigma=\\int_a^b\\left[\\int_{\\varphi_1}^{\\varphi_2}f\\,dy\\right]dx$。**极坐标**：$\\iint_D f\\,d\\sigma=\\int_{\\alpha}^{\\beta}\\int_{r_1}^{r_2}f(r\\cos\\theta,r\\sin\\theta)r\\,dr\\,d\\theta$（**多乘一个 $r$**）。',
        pitfall:'高频错：① 极坐标换元**漏了雅可比因子 $r$**（$d\\sigma=r\\,dr\\,d\\theta$）；② 积分限写错（内层对应"先积的变量"）；③ 交换积分次序时要重新定限，别照抄。' },
      { chain:'画区域定限 → 化二次积分 → 先内后外逐层积。',
        text:'**核心**：化二次积分 + 定限；极坐标多乘 $r$。' }
    ],
    worked:[
      { stem:'求 $\\iint_D xy\\,d\\sigma$，$D:0\\le x\\le1,0\\le y\\le1$（正方形）。',
        first:'正方形区域，直接化二次积分，先对 $y$ 积。',
        steps:['$\\iint_D xy\\,d\\sigma=\\int_0^1\\int_0^1 xy\\,dy\\,dx$。',
               '先对 $y$：$\\int_0^1 xy\\,dy=\\dfrac{x}{2}$。',
               '再对 $x$：$\\int_0^1\\dfrac{x}{2}dx=\\dfrac14$。'],
        take:'化二次积分 = 定限 + 先内后外，每层把另一变量当常数。' },
      { stem:'用极坐标求 $\\iint_D(x^2+y^2)\\,d\\sigma$，$D:x^2+y^2\\le1$。',
        first:'圆盘区域，用极坐标，$x=r\\cos\\theta,y=r\\sin\\theta$，$x^2+y^2=r^2$，多乘 $r$。',
        steps:['$\\iint_D(x^2+y^2)d\\sigma=\\int_0^{2\\pi}\\int_0^1 r^2\\cdot r\\,dr\\,d\\theta$。',
               '先对 $r$：$\\int_0^1 r^3\\,dr=\\dfrac14$。',
               '再对 $\\theta$：$\\int_0^{2\\pi}\\dfrac14 d\\theta=\\dfrac{\\pi}{2}$。'],
        take:'极坐标 = 换元 + 多乘 $r$。圆盘区域首选极坐标。' }
    ],
    checklist:[
      {id:'rect', knowledge:'**直角坐标**：化二次积分，先内后外。'},
      {id:'polar', knowledge:'**极坐标**：$x=r\\cos\\theta,y=r\\sin\\theta$，$d\\sigma=r\\,dr\\,d\\theta$。'},
      {id:'jacobian', knowledge:'**雅可比因子**：极坐标多乘 $r$（别漏）。'},
      {id:'limits', knowledge:'**定限**：画区域，内层积分限对应先积的变量。'},
      {id:'swap', knowledge:'**交换次序**：重新定限，不能照抄。'}
    ],
    formulas:[
      { latex:'\\iint_D f\\,d\\sigma=\\int_a^b\\int_{\\varphi_1}^{\\varphi_2}f\\,dy\\,dx',
        from:'直角坐标二次积分', uses:'直角坐标区域',
        pit:'内层限对应先积的变量。' },
      { latex:'\\iint_D f\\,d\\sigma=\\int_{\\alpha}^{\\beta}\\int_{r_1}^{r_2}f(r\\cos\\theta,r\\sin\\theta)\\,r\\,dr\\,d\\theta',
        from:'极坐标二次积分', uses:'圆盘/扇形区域',
        pit:'多乘雅可比因子 r。' }
    ],
    problems:[
      { stem:'求 $\\iint_D x\\,d\\sigma$，$D:0\\le x\\le1,0\\le y\\le2$。', kpt:'直角坐标', lv:1,
        first:'矩形区域化二次积分。',
        sol:['$\\int_0^1\\int_0^2 x\\,dy\\,dx=\\int_0^1 2x\\,dx=[x^2]_0^1=1$。'],
        tip:'矩形区域直接拆成两个单积分相乘或逐层积。' },
      { stem:'求 $\\iint_D e^{-(x^2+y^2)}\\,d\\sigma$，$D:x^2+y^2\\le a^2$。', kpt:'极坐标', lv:3,
        first:'圆盘 + 指数含 $x^2+y^2$，用极坐标。',
        sol:['$=\\int_0^{2\\pi}\\int_0^a e^{-r^2}r\\,dr\\,d\\theta$。',
             '$\\int_0^a e^{-r^2}r\\,dr=-\\dfrac12 e^{-r^2}\\Big|_0^a=\\dfrac12(1-e^{-a^2})$。',
             '$=2\\pi\\cdot\\dfrac12(1-e^{-a^2})=\\pi(1-e^{-a^2})$。'],
        tip:'含 $x^2+y^2$ 的圆盘积分，极坐标 + 多乘 r 是标准套路。' }
    ],
    quickCheck:[
      { q:'极坐标换元要额外乘什么？', a:'r（雅可比因子），dσ=r·dr·dθ。' },
      { q:'二次积分先积哪个变量？', a:'先积内层的那个变量，外层最后积。' },
      { q:'什么区域适合极坐标？', a:'圆盘、扇形、环形区域。' }
    ]
  },

  /* ========== 10.3 三重积分 ========== */
  {
    idx:'10.3', title:'三重积分',
    why:'二重积分累加平面区域上的量，三重积分累加**空间区域**上的量——最典型是密度为 $\\rho(x,y,z)$ 的物体的质量。算法是化三次积分，坐标可选择直角、柱面、球面。',
    explain:[
      { analogy:'三重积分像"把一块立体切成无数小方块，每个小方块算个小质量，全部加起来取极限"。',
        points:'**定义**：$\\iiint_\\Omega f\\,dv=\\lim\\sum f\\Delta v$。**直角坐标**：化三次积分。**柱面坐标**：$x=r\\cos\\theta,y=r\\sin\\theta,z=z$，$dv=r\\,dr\\,d\\theta\\,dz$。**球面坐标**：$x=\\rho\\sin\\varphi\\cos\\theta,y=\\rho\\sin\\varphi\\sin\\theta,z=\\rho\\cos\\varphi$，$dv=\\rho^2\\sin\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta$。',
        pitfall:'高频错：① 柱面坐标漏 $r$、球面坐标漏 $\\rho^2\\sin\\varphi$（雅可比因子）；② 球面坐标里 $\\varphi$ 是**与 $z$ 轴的夹角**（范围 $0\\sim\\pi$），$\\theta$ 是 $xOy$ 面的极角（$0\\sim2\\pi$），别搞反；③ 化三次积分定限时先定最外层。' },
      { chain:'选坐标系 → 换元（乘雅可比）→ 化三次积分 → 逐层积。',
        text:'**核心**：柱面坐标多乘 $r$，球面坐标多乘 $\\rho^2\\sin\\varphi$。' }
    ],
    worked:[
      { stem:'用柱面坐标求 $\\iiint_\\Omega(x^2+y^2)\\,dv$，$\\Omega:x^2+y^2\\le1,0\\le z\\le1$（圆柱）。',
        first:'圆柱区域，用柱面坐标，$x^2+y^2=r^2$，多乘 $r$。',
        steps:['$=\\int_0^{2\\pi}\\int_0^1\\int_0^1 r^2\\cdot r\\,dz\\,dr\\,d\\theta$。',
               '对 $z$：$\\int_0^1 dz=1$。',
               '对 $r$：$\\int_0^1 r^3\\,dr=\\dfrac14$。',
               '对 $\\theta$：$\\int_0^{2\\pi}\\dfrac14 d\\theta=\\dfrac{\\pi}{2}$。'],
        take:'柱面坐标 = 换元多乘 $r$，圆柱区域首选。' }
    ],
    checklist:[
      {id:'def', knowledge:'**三重积分**：$\\iiint_\\Omega f\\,dv$，几何/物理意义（质量等）。'},
      {id:'rect', knowledge:'**直角坐标**：化三次积分。'},
      {id:'cyl', knowledge:'**柱面坐标**：$dv=r\\,dr\\,d\\theta\\,dz$。'},
      {id:'sph', knowledge:'**球面坐标**：$dv=\\rho^2\\sin\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta$。'},
      {id:'angle', knowledge:'**球面角**：$\\varphi$ 与 $z$ 轴夹角（$0\\sim\\pi$），$\\theta$ 极角（$0\\sim2\\pi$）。'}
    ],
    formulas:[
      { latex:'dv=r\\,dr\\,d\\theta\\,dz',
        from:'柱面坐标', uses:'圆柱、柱形区域',
        pit:'多乘雅可比因子 r。' },
      { latex:'dv=\\rho^2\\sin\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta',
        from:'球面坐标', uses:'球、球锥区域',
        pit:'多乘 ρ²sinφ；φ 是与 z 轴夹角。' }
    ],
    problems:[
      { stem:'求 $\\iiint_\\Omega z\\,dv$，$\\Omega:0\\le x\\le1,0\\le y\\le1,0\\le z\\le1$（立方体）。', kpt:'直角坐标', lv:1,
        first:'立方体化三次积分。',
        sol:['$=\\int_0^1\\int_0^1\\int_0^1 z\\,dz\\,dy\\,dx=\\int_0^1\\int_0^1\\dfrac12\\,dy\\,dx=\\dfrac12$。'],
        tip:'立方体区域直接逐层积。' },
      { stem:'用球面坐标求球的体积 $x^2+y^2+z^2\\le a^2$。', kpt:'球面坐标', lv:3,
        first:'球用球面坐标，$0\\le\\rho\\le a,0\\le\\varphi\\le\\pi,0\\le\\theta\\le2\\pi$，$dv=\\rho^2\\sin\\varphi$。',
        sol:['$V=\\int_0^{2\\pi}\\int_0^{\\pi}\\int_0^a\\rho^2\\sin\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta$。',
             '$=\\int_0^{2\\pi}d\\theta\\int_0^{\\pi}\\sin\\varphi\\,d\\varphi\\int_0^a\\rho^2 d\\rho=2\\pi\\cdot2\\cdot\\dfrac{a^3}{3}=\\dfrac43\\pi a^3$。'],
        tip:'球面坐标算球体积得 $\\frac43\\pi a^3$，验证公式。' }
    ],
    quickCheck:[
      { q:'柱面坐标的雅可比因子？', a:'r，dv=r·dr·dθ·dz。' },
      { q:'球面坐标的雅可比因子？', a:'ρ²sinφ，dv=ρ²sinφ·dρ·dφ·dθ。' },
      { q:'球面坐标里 φ 的范围？', a:'0 到 π（与 z 轴的夹角）。' }
    ]
  },

  /* ========== 10.4 重积分的应用 ========== */
  {
    idx:'10.4', title:'重积分的应用',
    why:'重积分能算面积、体积、质量、质心、转动惯量等。核心思想都一样：把总量拆成小元素的累加，$f=1$ 时是体积/面积，$f=\\rho$ 时是质量。',
    explain:[
      { analogy:'重积分应用像"配方"：$f=1$ 是体积，$f=\\rho$（密度）是质量，$f=x\\rho$ 是一阶矩（算质心），$f=(x^2+y^2)\\rho$ 是转动惯量。',
        points:'**面积**：$S=\\iint_D 1\\,d\\sigma$。**体积**：$V=\\iint_D f\\,d\\sigma$（柱体）或 $\\iiint_\\Omega 1\\,dv$。**质量**：$m=\\iiint_\\Omega\\rho\\,dv$。**质心**：$\\bar x=\\dfrac1m\\iiint x\\rho\\,dv$。**转动惯量**：$I_z=\\iiint(x^2+y^2)\\rho\\,dv$。',
        pitfall:'高频错：① 不同物理量被积函数不同，别套错；② 质心、转动惯量要**除以质量**（质心）或注意坐标选择；③ 对称性可简化（均匀物体质心在对称中心）。' },
      { chain:'识别要算的量 → 选对应被积函数 → 选坐标系 → 化二次/三次积分。',
        text:'**核心**：面积 f=1、质量 f=ρ、质心 f=xρ 等，被积函数对号入座。' }
    ],
    worked:[
      { stem:'求由 $z=x^2+y^2$ 与 $z=1$ 围成立体的体积。',
        first:'体积 = 顶部平面减底部曲面的"高"的二重积分，$D:x^2+y^2\\le1$。',
        steps:['$V=\\iint_D(1-x^2-y^2)\\,d\\sigma$。',
               '极坐标：$=\\int_0^{2\\pi}\\int_0^1(1-r^2)r\\,dr\\,d\\theta$。',
               '$=2\\pi\\left[\\dfrac{r^2}{2}-\\dfrac{r^4}{4}\\right]_0^1=2\\pi\\cdot\\dfrac14=\\dfrac{\\pi}{2}$。'],
        take:'体积 = 顶减底的高 × 面积元，圆盘区域用极坐标。' }
    ],
    checklist:[
      {id:'area', knowledge:'**面积**：$S=\\iint_D 1\\,d\\sigma$。'},
      {id:'volume', knowledge:'**体积**：$V=\\iint_D f\\,d\\sigma$ 或 $\\iiint_\\Omega 1\\,dv$。'},
      {id:'mass', knowledge:'**质量**：$m=\\iiint\\rho\\,dv$。'},
      {id:'centroid', knowledge:'**质心**：$\\bar x=\\dfrac1m\\iiint x\\rho\\,dv$（同理 y,z）。'},
      {id:'inertia', knowledge:'**转动惯量**：$I_z=\\iiint(x^2+y^2)\\rho\\,dv$。'}
    ],
    formulas:[
      { latex:'V=\\iint_D f(x,y)\\,d\\sigma',
        from:'柱体体积', uses:'曲面 z=f 下的体积',
        pit:'f 是"高"，区域 D 是底。' },
      { latex:'m=\\iiint_\\Omega\\rho\\,dv',
        from:'质量', uses:'密度为 ρ 的物体',
        pit:'ρ 可以是位置的函数。' }
    ],
    problems:[
      { stem:'求密度均匀的圆盘 $x^2+y^2\\le a^2$（面密度 $\\rho$ 常数）的质量。', kpt:'质量', lv:2,
        first:'$m=\\iint_D\\rho\\,d\\sigma=\\rho\\cdot S$。',
        sol:['$m=\\rho\\iint_D 1\\,d\\sigma=\\rho\\pi a^2$。'],
        tip:'均匀密度时质量 = 密度 × 面积。' },
      { stem:'求由 $z=x^2+y^2$、$z=0$、$x^2+y^2=1$ 围成的旋转抛物面下立体体积。', kpt:'体积', lv:3,
        first:'体积 = $\\iint_D(x^2+y^2)d\\sigma$，$D:x^2+y^2\\le1$，极坐标。',
        sol:['$V=\\int_0^{2\\pi}\\int_0^1 r^2\\cdot r\\,dr\\,d\\theta=2\\pi\\cdot\\dfrac14=\\dfrac{\\pi}{2}$。'],
        tip:'抛物面下体积 = ∫∫(x²+y²)，极坐标多乘 r。' }
    ],
    quickCheck:[
      { q:'重积分里 f=1 表示什么？', a:'体积（三重）或面积（二重）。' },
      { q:'质量怎么用重积分表示？', a:'m=∭ρ dv，ρ 是密度。' },
      { q:'均匀物体质心在哪？', a:'对称中心。' }
    ]
  },

  /* ========== 10.5 含参变量的积分（选学） ========== */
  {
    idx:'10.5', title:'含参变量的积分',
    why:'积分里除了积分变量，还可以含一个**参数**，如 $I(t)=\\int_a^b f(x,t)\\,dx$。这种"含参积分"定义了一个关于 $t$ 的函数，可以**在积分号下求导**，是解一些特殊积分和证明的强有力工具。',
    explain:[
      { analogy:'含参积分像"带旋钮的积分"：旋钮是参数 $t$，每调一个 $t$ 就得到一个新的积分值，于是积分变成 $t$ 的函数。',
        points:'**定义**：$I(t)=\\int_a^b f(x,t)\\,dx$。**莱布尼茨法则（积分号下求导）**：$I\'(t)=\\int_a^b \\dfrac{\\partial f}{\\partial t}(x,t)\\,dx$（$f$ 及其偏导连续时）。**更一般**（上下限也含 $t$）：$\\dfrac{d}{dt}\\int_{a(t)}^{b(t)}f(x,t)dx=\\int_{a}^{b}\\dfrac{\\partial f}{\\partial t}dx+f(b,t)b\'(t)-f(a,t)a\'(t)$。',
        pitfall:'高频错：① 上下限也含 $t$ 时，忘了加"边界项" $f(b,t)b\'-f(a,t)a\'$；② 积分号下求导要求 $f$ 与 $\\partial f/\\partial t$ 连续；③ 偏导是对参数 $t$ 求，不是对积分变量 $x$。' },
      { chain:'识别含参积分 → 对参数求偏导 → 积分号下求导（加边界项）。',
        text:'**核心**：含参积分 = 积分号下求导，上下限含参数时加边界项。' }
    ],
    worked:[
      { stem:'求 $I(t)=\\int_0^1 e^{tx}\\,dx$ 的 $I\'(t)$。',
        first:'直接积分也行，但用积分号下求导：$I\'(t)=\\int_0^1 x e^{tx}\\,dx$。',
        steps:['$I\'(t)=\\int_0^1 x e^{tx}\\,dx$。',
               '分部：$\\int_0^1 x e^{tx}dx=\\left[\\dfrac{x e^{tx}}{t}-\\dfrac{e^{tx}}{t^2}\\right]_0^1=\\dfrac{e^t}{t}-\\dfrac{e^t-1}{t^2}$。'],
        take:'积分号下求导 = 对被积函数对参数求偏导，再积分。' }
    ],
    checklist:[
      {id:'def', knowledge:'**含参积分**：$I(t)=\\int_a^b f(x,t)dx$，是 $t$ 的函数。'},
      {id:'leibniz', knowledge:'**积分号下求导**：$I\'(t)=\\int_a^b\\dfrac{\\partial f}{\\partial t}dx$（常数限）。'},
      {id:'general', knowledge:'**一般莱布尼茨**：上下限含 $t$ 时加边界项 $f(b,t)b\'-f(a,t)a\'$。'},
      {id:'condition', knowledge:'**条件**：$f$ 与 $\\partial f/\\partial t$ 连续。'}
    ],
    formulas:[
      { latex:'\\frac{d}{dt}\\int_{a(t)}^{b(t)}f(x,t)dx=\\int_a^b\\frac{\\partial f}{\\partial t}dx+f(b,t)b\'-f(a,t)a\'',
        from:'莱布尼茨法则', uses:'含参积分求导',
        pit:'上下限含 t 时要加边界项。' }
    ],
    problems:[
      { stem:'设 $I(t)=\\int_0^t \\sin(tx)\\,dx$，求 $I\'(t)$。', kpt:'莱布尼茨法则', lv:3,
        first:'上下限都含 $t$（上限 $t$、下限 0），用一般莱布尼茨。',
        sol:['$I\'(t)=\\int_0^t x\\cos(tx)\\,dx+\\sin(t^2)\\cdot1-0$。',
             '$\\int_0^t x\\cos(tx)dx=\\left[\\dfrac{x\\sin(tx)}{t}+\\dfrac{\\cos(tx)}{t^2}\\right]_0^t=\\dfrac{\\sin(t^2)}{t}+\\dfrac{\\cos(t^2)-1}{t^2}$。',
             '$I\'(t)=\\dfrac{\\sin(t^2)}{t}+\\dfrac{\\cos(t^2)-1}{t^2}+\\sin(t^2)$。'],
        tip:'上下限含 t 时，别忘加边界项 f(b,t)b′−f(a,t)a′。' }
    ],
    quickCheck:[
      { q:'积分号下求导对谁求导？', a:'对参数 t 求偏导，不是对积分变量 x。' },
      { q:'上下限含参数时要加什么？', a:'边界项 f(b,t)b′−f(a,t)a′。' },
      { q:'含参积分求导的条件？', a:'f 和 ∂f/∂t 连续。' }
    ]
  }
  ]
});
