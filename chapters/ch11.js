/* 第十一章 曲线积分与曲面积分 —— 数据文件
 * 结构同前：window.CHAPOS.push({no,title,sub,sections:[...]})
 * 纪律：本章只能用第 1–10 章知识；本章引入曲线积分、曲面积分、格林/高斯/斯托克斯公式。
 * 注意：所有字符串值一律用单引号包裹，内部反斜杠需 \\ 转义。
 */
window.CHAPOS = window.CHAPOS || [];
window.CHAPOS.push({
  no:'11', title:'曲线积分与曲面积分', sub:'同济八版第十一章 · 全 7 节',
  sections:[
  /* ========== 11.1 对弧长的曲线积分 ========== */
  {
    idx:'11.1', title:'对弧长的曲线积分',
    why:'二重积分在平面区域上累加，曲线积分在**一条曲线**上累加。对弧长的曲线积分（第一类）把曲线上的量（如线密度）沿弧长累加，结果与**曲线方向无关**，是最基本的曲线积分。',
    explain:[
      { analogy:'对弧长的曲线积分像"沿一根弯铁丝累加质量"：铁丝每点有线密度 $f$，把它切成小段，每段质量 $f\\,ds$，加起来就是总质量。',
        points:'**定义**：$\\int_L f(x,y)\\,ds=\\lim\\sum f(\\xi_i,\\eta_i)\\Delta s_i$。**计算**：参数化 $L:x=x(t),y=y(t)$，则 $ds=\\sqrt{[x\'(t)]^2+[y\'(t)]^2}\\,dt$，$\\int_L f\\,ds=\\int_\\alpha^\\beta f(x(t),y(t))\\sqrt{x\'^2+y\'^2}\\,dt$。',
        pitfall:'高频错：① $ds$ 要写成 $\\sqrt{x\'^2+y\'^2}\\,dt$（弧长微元），不是 $dt$；② 结果与方向无关，但参数要覆盖整条曲线；③ 空间曲线 $ds=\\sqrt{x\'^2+y\'^2+z\'^2}\\,dt$。' },
      { chain:'参数化曲线 → 求 ds → 代入 f → 定积分。',
        text:'**核心**：对弧长积分 = 沿曲线累加，ds 是弧长微元。' }
    ],
    worked:[
      { stem:'求 $\\int_L(x^2+y^2)\\,ds$，$L$ 是单位圆 $x^2+y^2=1$。',
        first:'参数化 $x=\\cos t,y=\\sin t$，$ds=dt$（单位圆）。',
        steps:['$x=\\cos t,y=\\sin t$，$ds=\\sqrt{(-\\sin t)^2+(\\cos t)^2}dt=dt$。',
               '$x^2+y^2=1$。',
               '$\\int_L(x^2+y^2)ds=\\int_0^{2\\pi}1\\,dt=2\\pi$。'],
        take:'对弧长积分先参数化，ds=√(x′²+y′²)dt。' }
    ],
    checklist:[
      {id:'def', knowledge:'**对弧长积分**：$\\int_L f\\,ds$，与方向无关。'},
      {id:'ds', knowledge:'**弧长微元**：$ds=\\sqrt{x\'^2+y\'^2}\\,dt$（平面），空间加 $z\'^2$。'},
      {id:'param', knowledge:'**计算**：参数化后化为定积分。'},
      {id:'mass', knowledge:'**物理意义**：线密度 $f$ 的曲线质量 $m=\\int_L f\\,ds$。'}
    ],
    formulas:[
      { latex:'\\int_L f\\,ds=\\int_\\alpha^\\beta f(x(t),y(t))\\sqrt{x\'^2+y\'^2}\\,dt',
        from:'对弧长积分计算', uses:'曲线参数化后',
        pit:'ds 是弧长微元，别写成 dt。' }
    ],
    problems:[
      { stem:'求 $\\int_L y\\,ds$，$L$ 是 $y=x^2$ 从 $(0,0)$ 到 $(1,1)$。', kpt:'对弧长积分', lv:2,
        first:'参数化 $x=t,y=t^2$，$ds=\\sqrt{1+4t^2}dt$。',
        sol:['$x=t,y=t^2$，$ds=\\sqrt{1+(2t)^2}dt=\\sqrt{1+4t^2}dt$。',
             '$\\int_L y\\,ds=\\int_0^1 t^2\\sqrt{1+4t^2}\\,dt$（可换元 $u=1+4t^2$）。'],
        tip:'对弧长积分先参数化求 ds，再代入被积函数。' },
      { stem:'求线密度 $\\rho=1$ 的单位圆周长（用对弧长积分）。', kpt:'弧长', lv:1,
        first:'$\\int_L 1\\,ds$ = 曲线长度。',
        sol:['$\\int_L 1\\,ds=\\int_0^{2\\pi}1\\,dt=2\\pi$。'],
        tip:'$\\int_L 1\\,ds$ 就是曲线弧长。' }
    ],
    quickCheck:[
      { q:'对弧长积分与方向有关吗？', a:'无关，只与曲线本身和被积函数有关。' },
      { q:'ds 微元等于什么？', a:'√(x′²+y′²)dt（平面），空间加 z′²。' },
      { q:'∫_L 1 ds 表示什么？', a:'曲线 L 的弧长。' }
    ]
  },

  /* ========== 11.2 对坐标的曲线积分 ========== */
  {
    idx:'11.2', title:'对坐标的曲线积分',
    why:'对坐标的曲线积分（第二类）形如 $\\int_L P\\,dx+Q\\,dy$，表示**变力沿曲线做功**。它**与方向有关**（反向变号），是物理（做功、环流）的核心工具，也是后面格林公式的基础。',
    explain:[
      { analogy:'对坐标的曲线积分像"力沿路径做的功"：力 $\\vec F=(P,Q)$ 沿曲线每小段位移 $d\\vec r=(dx,dy)$ 做功 $P\\,dx+Q\\,dy$，累加起来。',
        points:'**定义**：$\\int_L P\\,dx+Q\\,dy=\\lim\\sum[P\\Delta x+Q\\Delta y]$。**计算**：参数化 $x=x(t),y=y(t)$，$\\int_L P\\,dx+Q\\,dy=\\int_\\alpha^\\beta[P(x,y)x\'(t)+Q(x,y)y\'(t)]\\,dt$。**方向性**：反向积分变号。',
        pitfall:'高频错：① $dx=x\'(t)dt,\\ dy=y\'(t)dt$ 都要代，漏一个；② 方向反向要变号；③ 与对弧长积分混淆（对坐标积分含 $dx,dy$，方向有关）。' },
      { chain:'参数化 → 代入 $dx=x\'dt,dy=y\'dt$ → 化为定积分。',
        text:'**核心**：对坐标积分 = 方向有关，$dx,dy$ 都要参数化。' }
    ],
    worked:[
      { stem:'求 $\\int_L y\\,dx+x\\,dy$，$L$ 是从 $(0,0)$ 到 $(1,1)$ 的直线 $y=x$。',
        first:'参数化 $x=t,y=t$（$t$ 从 0 到 1），$dx=dt,dy=dt$。',
        steps:['$\\int_L y\\,dx+x\\,dy=\\int_0^1(t\\cdot1+t\\cdot1)dt=\\int_0^1 2t\\,dt=1$。'],
        take:'对坐标积分 = 参数化后 $dx=x\'dt,dy=y\'dt$ 代入。' }
    ],
    checklist:[
      {id:'def', knowledge:'**对坐标积分**：$\\int_L P\\,dx+Q\\,dy$，与方向有关（反向变号）。'},
      {id:'calc', knowledge:'**计算**：$dx=x\'dt,dy=y\'dt$ 代入化为定积分。'},
      {id:'work', knowledge:'**物理意义**：变力 $(P,Q)$ 沿 $L$ 做功。'},
      {id:'vsarc', knowledge:'**区别**：对弧长（第一类）与方向无关，对坐标（第二类）与方向有关。'}
    ],
    formulas:[
      { latex:'\\int_L P\\,dx+Q\\,dy=\\int_\\alpha^\\beta[P x\'(t)+Q y\'(t)]\\,dt',
        from:'对坐标积分计算', uses:'参数化后',
        pit:'dx=x′dt、dy=y′dt 都要代。' }
    ],
    problems:[
      { stem:'求 $\\int_L x\\,dy$，$L$ 是 $x=1$ 从 $(1,0)$ 到 $(1,1)$。', kpt:'对坐标积分', lv:2,
        first:'参数化 $x=1,y=t$（$t$ 从 0 到 1），$dx=0,dy=dt$。',
        sol:['$\\int_L x\\,dy=\\int_0^1 1\\cdot dt=1$。'],
        tip:'$dx=0$ 时含 $dx$ 的项消失，只剩 $dy$ 项。' },
      { stem:'求 $\\int_L y\\,dx$，$L$ 是 $x$ 轴从 $(0,0)$ 到 $(1,0)$。', kpt:'坐标轴上积分', lv:1,
        first:'$y=0$，被积函数为 0。',
        sol:['$\\int_L y\\,dx=\\int_0^1 0\\,dx=0$。'],
        tip:'在 x 轴上 y=0，被积函数 y 恒为 0。' }
    ],
    quickCheck:[
      { q:'对坐标积分与方向有关吗？', a:'有关，反向变号。' },
      { q:'dx、dy 参数化怎么代？', a:'dx=x′(t)dt，dy=y′(t)dt。' },
      { q:'对坐标积分的物理意义？', a:'变力沿曲线做功。' }
    ]
  },

  /* ========== 11.3 格林公式及其应用 ========== */
  {
    idx:'11.3', title:'格林公式及其应用',
    why:'格林公式把**平面闭曲线**上的对坐标曲线积分，转化为曲线所围**区域**上的二重积分：$\\oint_L P\\,dx+Q\\,dy=\\iint_D\\left(\\dfrac{\\partial Q}{\\partial x}-\\dfrac{\\partial P}{\\partial y}\\right)dxdy$。它是平面情形的"牛莱公式"，也是连通曲线积分与二重积分的桥梁。',
    explain:[
      { analogy:'格林公式像"把沿边界的环流，换成区域内部的涡旋之和"：边界上绕一圈的累积量，等于内部每一点"旋转"的积分。',
        points:'**格林公式**：$\\oint_L P\\,dx+Q\\,dy=\\iint_D\\left(\\dfrac{\\partial Q}{\\partial x}-\\dfrac{\\partial P}{\\partial y}\\right)d\\sigma$（$L$ 是 $D$ 的**正向**边界，$P,Q$ 有一阶连续偏导）。**应用**：算面积 $S=\\oint_L x\\,dy=-\\oint_L y\\,dx=\\dfrac12\\oint(x\\,dy-y\\,dx)$；判断曲线积分与路径无关。',
        pitfall:'高频错：① 格林公式要求**闭曲线 + 正向**（逆时针），不闭合要补线；② 被积式是 $Q_x-P_y$（顺序别反）；③ 区域内有奇点时不能直接用，要挖去奇点。' },
      { chain:'闭曲线？→ 是则用格林公式化二重积分 → 否先补成闭曲线。',
        text:'**核心**：格林公式 = 边界积分 ↔ 区域二重积分，正向闭曲线。' }
    ],
    worked:[
      { stem:'用格林公式求 $\\oint_L -y\\,dx+x\\,dy$，$L$ 是单位圆（正向）。',
        first:'$P=-y,Q=x$，$Q_x-P_y=1-(-1)=2$。',
        steps:['$\\oint_L -y\\,dx+x\\,dy=\\iint_D(1+1)d\\sigma=2\\iint_D 1\\,d\\sigma$。',
               '$=2\\cdot\\pi=2\\pi$。'],
        take:'格林公式：算 $Q_x-P_y$，再对区域做二重积分。' }
    ],
    checklist:[
      {id:'green', knowledge:'**格林公式**：$\\oint_L P\\,dx+Q\\,dy=\\iint_D(Q_x-P_y)d\\sigma$。'},
      {id:'positive', knowledge:'**正向边界**：逆时针（区域在左侧）。'},
      {id:'area', knowledge:'**面积应用**：$S=\\dfrac12\\oint(x\\,dy-y\\,dx)$。'},
      {id:'indep', knowledge:'**路径无关**：$P_y=Q_x$ 时曲线积分与路径无关。'},
      {id:'hole', knowledge:'**有奇点**：区域内含奇点要挖去后再用。'}
    ],
    formulas:[
      { latex:'\\oint_L P\\,dx+Q\\,dy=\\iint_D\\left(\\frac{\\partial Q}{\\partial x}-\\frac{\\partial P}{\\partial y}\\right)d\\sigma',
        from:'格林公式', uses:'闭曲线积分化二重积分',
        pit:'Q_x−P_y 顺序；正向闭曲线。' },
      { latex:'S=\\frac12\\oint_L(x\\,dy-y\\,dx)',
        from:'格林公式求面积', uses:'用线积分算面积',
        pit:'系数 1/2。' }
    ],
    problems:[
      { stem:'用格林公式求 $\\oint_L x\\,dy$，$L$ 是正方形边界（正向）。', kpt:'格林公式', lv:2,
        first:'$P=0,Q=x$，$Q_x-P_y=1$。',
        sol:['$\\oint_L x\\,dy=\\iint_D 1\\,d\\sigma=S(D)$。',
             '若正方形边长 1，则 $=1$。'],
        tip:'$Q_x−P_y=1$ 时线积分等于区域面积。' },
      { stem:'判断 $P=y,Q=x$ 时 $\\int_L y\\,dx+x\\,dy$ 是否与路径无关。', kpt:'路径无关', lv:2,
        first:'检查 $P_y=Q_x$：$P_y=1,Q_x=1$，相等。',
        sol:['$P_y=1=Q_x$，故与路径无关。',
             '且 $y\\,dx+x\\,dy=d(xy)$，是 $xy$ 的全微分。'],
        tip:'$P_y=Q_x$ ⟺ 曲线积分与路径无关（区域内）。' }
    ],
    quickCheck:[
      { q:'格林公式的被积式是什么？', a:'Q_x − P_y（Q 对 x 偏导减 P 对 y 偏导）。' },
      { q:'格林公式要求曲线什么条件？', a:'正向（逆时针）闭曲线。' },
      { q:'P_y=Q_x 说明什么？', a:'曲线积分与路径无关。' }
    ]
  },

  /* ========== 11.4 对面积的曲面积分 ========== */
  {
    idx:'11.4', title:'对面积的曲面积分',
    why:'对面积的曲面积分（第一类）把曲面上的量（如面密度）沿面积累加，形如 $\\iint_\\Sigma f\\,dS$，**与曲面方向无关**。它是曲面"质量"、曲面面积的基础。',
    explain:[
      { analogy:'对面积的曲面积分像"给曲面贴纸"：每点有面密度 $f$，把曲面切成小片，每片质量 $f\\,dS$，加起来是总质量。',
        points:'**定义**：$\\iint_\\Sigma f\\,dS$。**计算**：曲面 $z=z(x,y)$ 时 $dS=\\sqrt{1+z_x^2+z_y^2}\\,dx\\,dy$，化为二重积分。',
        pitfall:'高频错：① $dS$ 要乘 $\\sqrt{1+z_x^2+z_y^2}$（面积微元），不是 $dx\\,dy$；② 投影区域 $D$ 要选对（投到 $xOy$ 面）；③ 曲面方向无关，但参数化要覆盖整张曲面。' },
      { chain:'写 z=z(x,y) → 求 dS → 投影到区域 D → 化二重积分。',
        text:'**核心**：对面积积分 = 曲面累加，dS = 面积微元。' }
    ],
    worked:[
      { stem:'求 $\\iint_\\Sigma z\\,dS$，$\\Sigma$ 是上半球面 $z=\\sqrt{a^2-x^2-y^2}$。',
        first:'$dS=\\sqrt{1+z_x^2+z_y^2}dxdy=\\dfrac{a}{z}dxdy$，投影 $D:x^2+y^2\\le a^2$。',
        steps:['$z_x=\\dfrac{-x}{z},z_y=\\dfrac{-y}{z}$，$\\sqrt{1+z_x^2+z_y^2}=\\sqrt{1+\\dfrac{x^2+y^2}{z^2}}=\\dfrac{a}{z}$。',
               '$\\iint_\\Sigma z\\,dS=\\iint_D z\\cdot\\dfrac{a}{z}dxdy=a\\iint_D 1\\,dxdy=a\\pi a^2=\\pi a^3$。'],
        take:'对面积积分 = 投影 + dS（面积微元），半球面 z dS 简化后好算。' }
    ],
    checklist:[
      {id:'def', knowledge:'**对面积积分**：$\\iint_\\Sigma f\\,dS$，与方向无关。'},
      {id:'dS', knowledge:'**面积微元**：$dS=\\sqrt{1+z_x^2+z_y^2}\\,dx\\,dy$。'},
      {id:'proj', knowledge:'**投影**：投到坐标面，化二重积分。'},
      {id:'mass', knowledge:'**物理意义**：面密度 $f$ 的曲面质量。'}
    ],
    formulas:[
      { latex:'\\iint_\\Sigma f\\,dS=\\iint_D f(x,y,z(x,y))\\sqrt{1+z_x^2+z_y^2}\\,dx\\,dy',
        from:'对面积积分计算', uses:'曲面 z=z(x,y)',
        pit:'dS 要乘 √(1+z_x²+z_y²)。' }
    ],
    problems:[
      { stem:'求 $\\iint_\\Sigma 1\\,dS$，$\\Sigma$ 是平面 $z=0$ 上的圆盘 $x^2+y^2\\le1$。', kpt:'曲面面积', lv:1,
        first:'$\\iint_\\Sigma 1\\,dS$ = 曲面面积；平面 $z=0$ 时 $dS=dxdy$。',
        sol:['$z=0$，$z_x=z_y=0$，$dS=dxdy$。',
             '$\\iint_\\Sigma 1\\,dS=\\iint_D 1\\,dxdy=\\pi$。'],
        tip:'∫∫ 1 dS 就是曲面面积，平面退化为区域面积。' },
      { stem:'求 $\\iint_\\Sigma(x^2+y^2)\\,dS$，$\\Sigma$ 是 $z=1$、$x^2+y^2\\le1$。', kpt:'对面积积分', lv:2,
        first:'$z=1$，$dS=dxdy$，极坐标。',
        sol:['$dS=dxdy$，$=\\iint_D(x^2+y^2)dxdy=\\int_0^{2\\pi}\\int_0^1 r^2\\cdot r\\,dr\\,d\\theta=\\dfrac{\\pi}{2}$。'],
        tip:'平面 z=常数时 dS=dxdy，直接化二重积分。' }
    ],
    quickCheck:[
      { q:'对面积积分与方向有关吗？', a:'无关（第一类曲面积分）。' },
      { q:'dS 面积微元等于？', a:'√(1+z_x²+z_y²)dxdy。' },
      { q:'∫∫ 1 dS 表示什么？', a:'曲面面积。' }
    ]
  },

  /* ========== 11.5 对坐标的曲面积分 ========== */
  {
    idx:'11.5', title:'对坐标的曲面积分',
    why:'对坐标的曲面积分（第二类）形如 $\\iint_\\Sigma P\\,dy\\,dz+Q\\,dz\\,dx+R\\,dx\\,dy$，表示**流量**（流体穿过曲面的通量），**与曲面方向（侧）有关**。它是高斯公式的基础。',
    explain:[
      { analogy:'对坐标的曲面积分像"流体穿过曲面的流量"：流速 $\\vec F=(P,Q,R)$ 沿曲面法向穿过，每小片流量累加，方向（哪一侧）决定了正负。',
        points:'**定义**：$\\iint_\\Sigma P\\,dy\\,dz+Q\\,dz\\,dx+R\\,dx\\,dy$。**计算**：投到坐标面，如 $\\iint_\\Sigma R\\,dx\\,dy=\\pm\\iint_D R(x,y,z(x,y))\\,dx\\,dy$（上侧取正、下侧取负）。',
        pitfall:'高频错：① 忘判曲面方向（上/下侧决定正负号）；② $dy\\,dz,dz\\,dx,dx\\,dy$ 三部分分别投影，别混；③ 与对面积积分混淆（对坐标有方向、结果是通量）。' },
      { chain:'判曲面侧 → 投影 → 加正负号 → 化二重积分。',
        text:'**核心**：对坐标积分 = 方向有关，投影时上/下侧定正负。' }
    ],
    worked:[
      { stem:'求 $\\iint_\\Sigma R\\,dx\\,dy$，$\\Sigma$ 是 $z=1$ 的上侧，$R=1$，投影 $x^2+y^2\\le1$。',
        first:'上侧取正，$\\iint_\\Sigma R\\,dx\\,dy=+\\iint_D 1\\,dx\\,dy$。',
        steps:['$=\\iint_D 1\\,dx\\,dy=\\pi$。'],
        take:'对坐标积分投影后，上侧正、下侧负。' }
    ],
    checklist:[
      {id:'def', knowledge:'**对坐标积分**：$\\iint_\\Sigma P\\,dy\\,dz+Q\\,dz\\,dx+R\\,dx\\,dy$，与方向有关。'},
      {id:'sign', knowledge:'**正负**：投影时上侧正、下侧负（对 dxdy 而言）。'},
      {id:'proj', knowledge:'**投影**：三部分分别投到对应坐标面。'},
      {id:'flux', knowledge:'**物理意义**：流量（通量）。'}
    ],
    formulas:[
      { latex:'\\iint_\\Sigma R\\,dx\\,dy=\\pm\\iint_D R(x,y,z(x,y))\\,dx\\,dy',
        from:'对坐标积分投影', uses:'投影到 xOy 面',
        pit:'上侧取 +、下侧取 −。' }
    ],
    problems:[
      { stem:'求 $\\iint_\\Sigma z\\,dx\\,dy$，$\\Sigma$ 是 $z=1$ 上侧、$x^2+y^2\\le1$。', kpt:'对坐标积分', lv:2,
        first:'上侧取正，$z=1$。',
        sol:['$=+\\iint_D 1\\,dx\\,dy=\\pi$。'],
        tip:'上侧正号，z=常数时代入被积函数。' },
      { stem:'求 $\\iint_\\Sigma z\\,dx\\,dy$，$\\Sigma$ 是 $z=0$ 下侧、$x^2+y^2\\le1$。', kpt:'方向负号', lv:2,
        first:'下侧取负，$z=0$。',
        sol:['$=-\\iint_D 0\\,dx\\,dy=0$。'],
        tip:'下侧负号；z=0 时被积函数为 0。' }
    ],
    quickCheck:[
      { q:'对坐标曲面积分与方向有关吗？', a:'有关（第二类），上侧正、下侧负。' },
      { q:'它的物理意义？', a:'流量（通量）。' },
      { q:'投影到 xOy 面时上侧取什么号？', a:'正号，下侧负号。' }
    ]
  },

  /* ========== 11.6 高斯公式 通量与散度 ========== */
  {
    idx:'11.6', title:'高斯公式 通量与散度',
    why:'高斯公式把**闭曲面**上的对坐标曲面积分，转化为曲面所围**空间区域**上的三重积分：$\\oiint_\\Sigma P\\,dy\\,dz+Q\\,dz\\,dx+R\\,dx\\,dy=\\iiint_\\Omega\\left(\\dfrac{\\partial P}{\\partial x}+\\dfrac{\\partial Q}{\\partial y}+\\dfrac{\\partial R}{\\partial z}\\right)dv$。它是格林公式在三维的推广。',
    explain:[
      { analogy:'高斯公式像"把穿出闭曲面的总通量，换成内部每一点的发散量的积分"：边界上的净流出 = 内部散度的总和。',
        points:'**高斯公式**：$\\oiint_\\Sigma\\vec F\\cdot d\\vec S=\\iiint_\\Omega\\operatorname{div}\\vec F\\,dv$，其中 $\\operatorname{div}\\vec F=\\dfrac{\\partial P}{\\partial x}+\\dfrac{\\partial Q}{\\partial y}+\\dfrac{\\partial R}{\\partial z}$。**散度**：$\\operatorname{div}\\vec F$ 描述某点"发散"的强弱。',
        pitfall:'高频错：① 高斯公式要求**闭曲面 + 外侧**，不闭合要补面；② 散度是三项偏导**相加**（$P_x+Q_y+R_z$），不是减法；③ 区域内有奇点要挖去。' },
      { chain:'闭曲面？→ 是则算散度化三重积分 → 否先补成闭曲面。',
        text:'**核心**：高斯公式 = 曲面积分 ↔ 三重积分，散度 $P_x+Q_y+R_z$。' }
    ],
    worked:[
      { stem:'用高斯公式求 $\\oiint_\\Sigma x\\,dy\\,dz+y\\,dz\\,dx+z\\,dx\\,dy$，$\\Sigma$ 是单位球面（外侧）。',
        first:'$P=x,Q=y,R=z$，散度 $P_x+Q_y+R_z=1+1+1=3$。',
        steps:['$=\\iiint_\\Omega 3\\,dv=3\\cdot\\dfrac43\\pi=4\\pi$。'],
        take:'高斯公式：散度 = 三项偏导相加，再对区域三重积分。' }
    ],
    checklist:[
      {id:'gauss', knowledge:'**高斯公式**：$\\oiint\\vec F\\cdot d\\vec S=\\iiint\\operatorname{div}\\vec F\\,dv$。'},
      {id:'div', knowledge:'**散度**：$\\operatorname{div}\\vec F=P_x+Q_y+R_z$。'},
      {id:'closed', knowledge:'**闭曲面 + 外侧**：不闭合要补面。'},
      {id:'flux', knowledge:'**通量**：$\\oiint\\vec F\\cdot d\\vec S$，流量穿过闭曲面。'},
      {id:'hole', knowledge:'**有奇点**：区域内含奇点要挖去。'}
    ],
    formulas:[
      { latex:'\\oiint_\\Sigma\\vec F\\cdot d\\vec S=\\iiint_\\Omega\\operatorname{div}\\vec F\\,dv',
        from:'高斯公式', uses:'闭曲面积分化三重积分',
        pit:'散度是 P_x+Q_y+R_z（相加）。' },
      { latex:'\\operatorname{div}\\vec F=\\frac{\\partial P}{\\partial x}+\\frac{\\partial Q}{\\partial y}+\\frac{\\partial R}{\\partial z}',
        from:'散度', uses:'求向量场散度',
        pit:'三项偏导相加。' }
    ],
    problems:[
      { stem:'求 $\\vec F=(x,y,z)$ 的散度。', kpt:'散度', lv:1,
        first:'$\\operatorname{div}\\vec F=P_x+Q_y+R_z$。',
        sol:['$P_x=1,Q_y=1,R_z=1$，散度 $=3$。'],
        tip:'散度 = 三项偏导相加。' },
      { stem:'用高斯公式求 $\\oiint\\vec F\\cdot d\\vec S$，$\\vec F=(x^2,y^2,z^2)$，$\\Sigma$ 是单位球面。', kpt:'高斯公式', lv:3,
        first:'散度 $=2x+2y+2z$，三重积分。',
        sol:['$\\operatorname{div}\\vec F=2x+2y+2z$。',
             '$\\iiint_\\Omega(2x+2y+2z)dv=0$（球对称，奇函数积分抵消）。'],
        tip:'球对称区域上 $x,y,z$ 的积分为 0（奇函数）。' }
    ],
    quickCheck:[
      { q:'散度公式？', a:'div F = P_x + Q_y + R_z（相加）。' },
      { q:'高斯公式把什么化什么？', a:'闭曲面积分化成三重积分。' },
      { q:'高斯公式要求曲面什么条件？', a:'闭曲面 + 外侧。' }
    ]
  },

  /* ========== 11.7 斯托克斯公式 环流量与旋度 ========== */
  {
    idx:'11.7', title:'斯托克斯公式 环流量与旋度',
    why:'斯托克斯公式把**空间闭曲线**上的曲线积分，转化为以该曲线为边界的**曲面**上的曲面积分：$\\oint_L\\vec F\\cdot d\\vec r=\\iint_\\Sigma\\operatorname{rot}\\vec F\\cdot d\\vec S$。它推广格林公式到空间，联系了旋度与环流量。',
    explain:[
      { analogy:'斯托克斯公式像"把沿空间闭环的环流，换成穿过环内部曲面的旋度通量"：边界上的环流 = 内部旋度的总和。',
        points:'**斯托克斯公式**：$\\oint_L P\\,dx+Q\\,dy+R\\,dz=\\iint_\\Sigma\\operatorname{rot}\\vec F\\cdot d\\vec S$。**旋度**：$\\operatorname{rot}\\vec F=\\left(\\dfrac{\\partial R}{\\partial y}-\\dfrac{\\partial Q}{\\partial z},\\dfrac{\\partial P}{\\partial z}-\\dfrac{\\partial R}{\\partial x},\\dfrac{\\partial Q}{\\partial x}-\\dfrac{\\partial P}{\\partial y}\\right)$，可用行列式 $\\begin{vmatrix}\\vec i&\\vec j&\\vec k\\\\\\partial_x&\\partial_y&\\partial_z\\\\P&Q&R\\end{vmatrix}$ 记。',
        pitfall:'高频错：① 旋度三个分量的顺序与正负（$R_y-Q_z$ 等）易错；② 曲面 $\\Sigma$ 的方向要与曲线 $L$ 的正向满足**右手法则**；③ 格林公式是斯托克斯公式在平面（$z$ 分量）的特例。' },
      { chain:'写旋度 → 选曲面 → 化曲面积分。',
        text:'**核心**：斯托克斯 = 曲线积分 ↔ 曲面积分，旋度用行列式记。' }
    ],
    worked:[
      { stem:'求 $\\vec F=(y,-x,0)$ 的旋度。',
        first:'旋度 $=\\left(R_y-Q_z,\\ P_z-R_x,\\ Q_x-P_y\\right)$。',
        steps:['$P=y,Q=-x,R=0$。',
               '旋度 $=(0-0,0-0,-1-1)=(0,0,-2)$。'],
        take:'旋度分量：$R_y-Q_z,P_z-R_x,Q_x-P_y$。' }
    ],
    checklist:[
      {id:'stokes', knowledge:'**斯托克斯公式**：$\\oint_L\\vec F\\cdot d\\vec r=\\iint_\\Sigma\\operatorname{rot}\\vec F\\cdot d\\vec S$。'},
      {id:'rot', knowledge:'**旋度**：$\\operatorname{rot}\\vec F=(R_y-Q_z,P_z-R_x,Q_x-P_y)$。'},
      {id:'right', knowledge:'**右手法则**：曲面方向与曲线正向满足右手定则。'},
      {id:'special', knowledge:'**格林是特例**：斯托克斯在平面情形的特例。'}
    ],
    formulas:[
      { latex:'\\operatorname{rot}\\vec F=\\begin{vmatrix}\\vec i&\\vec j&\\vec k\\\\\\frac{\\partial}{\\partial x}&\\frac{\\partial}{\\partial y}&\\frac{\\partial}{\\partial z}\\\\P&Q&R\\end{vmatrix}',
        from:'旋度', uses:'求向量场旋度',
        pit:'分量 R_y−Q_z、P_z−R_x、Q_x−P_y。' },
      { latex:'\\oint_L\\vec F\\cdot d\\vec r=\\iint_\\Sigma\\operatorname{rot}\\vec F\\cdot d\\vec S',
        from:'斯托克斯公式', uses:'空间闭曲线积分',
        pit:'曲面方向与曲线正向满足右手法则。' }
    ],
    problems:[
      { stem:'求 $\\vec F=(0,0,x)$ 的旋度。', kpt:'旋度', lv:2,
        first:'$P=0,Q=0,R=x$。',
        sol:['旋度 $=(R_y-Q_z,P_z-R_x,Q_x-P_y)=(0-0,0-1,0-0)=(0,-1,0)$。'],
        tip:'旋度分量按 R_y−Q_z、P_z−R_x、Q_x−P_y 算。' },
      { stem:'用斯托克斯公式求 $\\oint_L z\\,dx+x\\,dy+y\\,dz$（$L$ 是单位圆边界）。', kpt:'斯托克斯', lv:3,
        first:'$\\vec F=(z,x,y)$，旋度 $=(1,1,1)$，曲面积分。',
        sol:['$\\operatorname{rot}\\vec F=(R_y-Q_z,P_z-R_x,Q_x-P_y)=(1,1,1)$。',
             '选 $z=0$ 上圆盘，法向 $(0,0,1)$：$=\\iint_\\Sigma(1,1,1)\\cdot(0,0,1)dS=\\iint 1\\,dS=\\pi$。'],
        tip:'旋度点乘曲面法向量，选好算的曲面。' }
    ],
    quickCheck:[
      { q:'旋度怎么记？', a:'行列式 |i j k; ∂x ∂y ∂z; P Q R|。' },
      { q:'斯托克斯公式把什么化什么？', a:'空间闭曲线积分 → 曲面积分。' },
      { q:'格林公式与斯托克斯公式什么关系？', a:'格林是斯托克斯在平面情形的特例。' }
    ]
  }
  ]
});
