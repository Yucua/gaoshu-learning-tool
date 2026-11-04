/* 第八章 向量代数与空间解析几何 —— 数据文件
 * 结构同前：window.CHAPOS.push({no,title,sub,sections:[...]})
 * 纪律：本章只能用第 1–7 章知识；本章引入向量、平面、直线、曲面等空间几何新概念。
 * 注意：所有字符串值一律用单引号包裹，内部反斜杠需 \\ 转义。
 */
window.CHAPOS = window.CHAPOS || [];
window.CHAPOS.push({
  no:'8', title:'向量代数与空间解析几何', sub:'同济八版第八章 · 全 6 节',
  sections:[
  /* ========== 8.1 向量及其线性运算 ========== */
  {
    idx:'8.1', title:'向量及其线性运算',
    why:'前面都在一元函数的"线"上打转，但从这一章起进入**三维空间**。空间里的方向、位置、运动都需要一个新的量——**向量**（有大小又有方向的量）。它是整个空间解析几何的语言，后面的平面、直线、曲面方程全建立在它上面。',
    explain:[
      { analogy:'向量像"从 A 到 B 的一支箭"：既有长度（模），又有指向。两个向量相等只要求**同方向、同长度**，起点在哪无所谓。',
        points:'**向量**：既有大小又有方向的量，记 $\\vec a$，模记 $|\\vec a|$。**线性运算**：加法（三角形/平行四边形法则）、数乘 $\\lambda\\vec a$（伸缩+反向）。**坐标表示**：空间直角坐标系下 $\\vec a=(a_x,a_y,a_z)=a_x\\vec i+a_y\\vec j+a_z\\vec k$。',
        pitfall:'高频错：① 把向量当成"可以随便比较大小"的数（只有模才能比大小，向量本身不能）；② 模 $|\\vec a|=\\sqrt{a_x^2+a_y^2+a_z^2}$ 忘开方；③ 单位向量 $\\dfrac{\\vec a}{|\\vec a|}$ 忘了除模。' },
      { chain:'向量 = 大小 + 方向 → 用坐标三元组表示 → 模/方向角/投影。',
        text:'记牢：$|\\vec a|=\\sqrt{a_x^2+a_y^2+a_z^2}$，方向余弦 $\\cos\\alpha=\\dfrac{a_x}{|\\vec a|}$（同理 $\\beta,\\gamma$）。' }
    ],
    worked:[
      { stem:'已知 $\\vec a=(3,0,-4)$，求 $|\\vec a|$ 及与它同方向的单位向量。',
        first:'模用勾股，单位向量 = 原向量除以模，第一反应是**先算模**。',
        steps:['$|\\vec a|=\\sqrt{3^2+0^2+(-4)^2}=\\sqrt{25}=5$。',
               '单位向量 $\\vec a^0=\\dfrac{\\vec a}{|\\vec a|}=\\dfrac{(3,0,-4)}{5}=\\left(\\dfrac35,0,-\\dfrac45\\right)$。'],
        take:'单位向量 = 向量 ÷ 模。模是三个坐标的平方和再开方。' }
    ],
    checklist:[
      {id:'def', knowledge:'**向量**：有大小（模）又有方向的量，坐标表示 $(a_x,a_y,a_z)$。'},
      {id:'mod', knowledge:'**模**：$|\\vec a|=\\sqrt{a_x^2+a_y^2+a_z^2}$。'},
      {id:'unit', knowledge:'**单位向量**：$\\vec a^0=\\dfrac{\\vec a}{|\\vec a|}$，模为 1、方向同 $\\vec a$。'},
      {id:'dircos', knowledge:'**方向余弦**：$\\cos\\alpha=\\dfrac{a_x}{|\\vec a|}$，且 $\\cos^2\\alpha+\\cos^2\\beta+\\cos^2\\gamma=1$。'},
      {id:'linear', knowledge:'**线性运算**：加法（对应坐标相加）、数乘（各坐标乘 $\\lambda$）。'}
    ],
    formulas:[
      { latex:'|\\vec a|=\\sqrt{a_x^2+a_y^2+a_z^2}',
        from:'向量的模', uses:'求向量长度',
        pit:'三个坐标平方和再开方，别漏开方。' },
      { latex:'\\vec a^0=\\frac{\\vec a}{|\\vec a|}',
        from:'单位向量', uses:'求与某向量同方向的单位向量',
        pit:'除以的是模（一个数），不是向量。' }
    ],
    problems:[
      { stem:'已知 $\\vec a=(1,-2,2)$，求 $|\\vec a|$。', kpt:'向量的模', lv:1,
        first:'模 = 三坐标平方和开方。',
        sol:['$|\\vec a|=\\sqrt{1^2+(-2)^2+2^2}=\\sqrt{1+4+4}=\\sqrt9=3$。'],
        tip:'模永远是正数或 0，等于三个分量平方和的算术平方根。' },
      { stem:'已知 $A(1,2,3)$、$B(3,2,1)$，求 $\\overrightarrow{AB}$ 及其模。', kpt:'两点定向量', lv:1,
        first:'$\\overrightarrow{AB}=\\vec{OB}-\\vec{OA}$，终点坐标减起点坐标。',
        sol:['$\\overrightarrow{AB}=(3-1,2-2,1-3)=(2,0,-2)$。',
             '$|\\overrightarrow{AB}|=\\sqrt{2^2+0^2+(-2)^2}=2\\sqrt2$。'],
        tip:'向量 $\\overrightarrow{AB}$ = 终点坐标 − 起点坐标。' }
    ],
    quickCheck:[
      { q:'向量和标量最本质的区别？', a:'向量有方向，标量没有。只有模（长度）才能比较大小。' },
      { q:'单位向量怎么求？', a:'原向量除以它的模：$\\vec a/|\\vec a|$。' },
      { q:'方向余弦满足什么关系？', a:'$\\cos^2\\alpha+\\cos^2\\beta+\\cos^2\\gamma=1$。' }
    ]
  },

  /* ========== 8.2 数量积 向量积 *混合积 ========== */
  {
    idx:'8.2', title:'数量积 向量积 *混合积',
    why:'向量之间除了加减，还有两种"乘法"：**数量积**（点乘，结果是数，用来算夹角、判断垂直）、**向量积**（叉乘，结果是向量，用来算面积、判断平行）。它们是空间几何几乎所有计算的核心工具。',
    explain:[
      { analogy:'数量积像"投影再乘"：$\\vec a\\cdot\\vec b=|\\vec a||\\vec b|\\cos\\theta$，看两个向量"方向有多一致"；向量积像"张开的平行四边形"：$|\\vec a\\times\\vec b|=|\\vec a||\\vec b|\\sin\\theta$，看它们"张得多开"。',
        points:'**数量积**：$\\vec a\\cdot\\vec b=|\\vec a||\\vec b|\\cos\\theta=a_xb_x+a_yb_y+a_zb_z$（坐标式）。$\\vec a\\perp\\vec b\\iff\\vec a\\cdot\\vec b=0$。**向量积**：$\\vec a\\times\\vec b$ 方向用右手定则，$|\\vec a\\times\\vec b|=|\\vec a||\\vec b|\\sin\\theta$，坐标式 $=\\begin{vmatrix}\\vec i&\\vec j&\\vec k\\\\a_x&a_y&a_z\\\\b_x&b_y&b_z\\end{vmatrix}$。$\\vec a\\parallel\\vec b\\iff\\vec a\\times\\vec b=\\vec0$。',
        pitfall:'高频错：① 数量积结果忘写**数**（不是向量），向量积结果忘写**向量**（含方向）；② 数量积坐标式丢某一项（三项都要乘加）；③ 向量积的**反交换律** $\\vec a\\times\\vec b=-(\\vec b\\times\\vec a)$ 记反。' },
      { chain:'数量积 → 夹角/垂直；向量积 → 面积/平行；混合积 → 体积/共面。',
        text:'**三招对应**：点乘判垂直，叉乘判平行，混合积 $[\\vec a\\vec b\\vec c]=(\\vec a\\times\\vec b)\\cdot\\vec c$ 判共面（=0 共面）。' }
    ],
    worked:[
      { stem:'已知 $\\vec a=(1,2,2)$，$\\vec b=(2,1,-2)$，求 $\\vec a\\cdot\\vec b$ 并判断是否垂直。',
        first:'数量积用坐标式逐项相乘相加，若为 0 则垂直。',
        steps:['$\\vec a\\cdot\\vec b=1\\cdot2+2\\cdot1+2\\cdot(-2)=2+2-4=0$。',
               '数量积为 0，故 $\\vec a\\perp\\vec b$。'],
        take:'数量积 = 对应坐标相乘再相加；等于 0 ⟺ 垂直。' },
      { stem:'求 $\\vec a=(1,0,0)$、$\\vec b=(0,1,0)$ 的向量积。',
        first:'向量积用行列式展开，方向用右手定则（$\\vec i\\times\\vec j=\\vec k$）。',
        steps:['$\\vec a\\times\\vec b=\\begin{vmatrix}\\vec i&\\vec j&\\vec k\\\\1&0&0\\\\0&1&0\\end{vmatrix}=\\vec i\\cdot0-\\vec j\\cdot0+\\vec k\\cdot1=\\vec k=(0,0,1)$。',
               '即 $\\vec i\\times\\vec j=\\vec k$。'],
        take:'单位坐标向量叉乘：$\\vec i\\times\\vec j=\\vec k$、$\\vec j\\times\\vec k=\\vec i$、$\\vec k\\times\\vec i=\\vec j$，反序变号。' }
    ],
    checklist:[
      {id:'dot', knowledge:'**数量积**：$\\vec a\\cdot\\vec b=|\\vec a||\\vec b|\\cos\\theta=a_xb_x+a_yb_y+a_zb_z$，结果是数。'},
      {id:'perp', knowledge:'**垂直判据**：$\\vec a\\perp\\vec b\\iff\\vec a\\cdot\\vec b=0$。'},
      {id:'cross', knowledge:'**向量积**：$|\\vec a\\times\\vec b|=|\\vec a||\\vec b|\\sin\\theta$，方向右手定则，结果是向量。'},
      {id:'parallel', knowledge:'**平行判据**：$\\vec a\\parallel\\vec b\\iff\\vec a\\times\\vec b=\\vec0$。'},
      {id:'mixed', knowledge:'**混合积**：$[\\vec a\\vec b\\vec c]=(\\vec a\\times\\vec b)\\cdot\\vec c$，其绝对值是平行六面体体积；=0 ⟺ 三向量共面。'}
    ],
    formulas:[
      { latex:'\\vec a\\cdot\\vec b=|\\vec a||\\vec b|\\cos\\theta=a_xb_x+a_yb_y+a_zb_z',
        from:'数量积', uses:'求夹角、判垂直',
        pit:'结果是数不是向量；垂直 ⟺ 点积为 0。' },
      { latex:'\\vec a\\times\\vec b=\\begin{vmatrix}\\vec i&\\vec j&\\vec k\\\\a_x&a_y&a_z\\\\b_x&b_y&b_z\\end{vmatrix}',
        from:'向量积', uses:'求面积、判平行、求法向量',
        pit:'结果是向量，方向右手定则；反交换律 $\\vec a\\times\\vec b=-(\\vec b\\times\\vec a)$。' }
    ],
    problems:[
      { stem:'求 $\\vec a=(1,1,1)$ 与 $\\vec b=(1,-1,1)$ 的夹角余弦。', kpt:'夹角公式', lv:2,
        first:'用 $\\cos\\theta=\\dfrac{\\vec a\\cdot\\vec b}{|\\vec a||\\vec b|}$。',
        sol:['$\\vec a\\cdot\\vec b=1-1+1=1$。',
             '$|\\vec a|=\\sqrt3$，$|\\vec b|=\\sqrt3$。',
             '$\\cos\\theta=\\dfrac{1}{\\sqrt3\\cdot\\sqrt3}=\\dfrac13$。'],
        tip:'夹角余弦 = 数量积 ÷ (模 × 模)。' },
      { stem:'求以 $\\vec a=(2,1,0)$、$\\vec b=(0,3,1)$ 为邻边的平行四边形面积。', kpt:'向量积面积', lv:2,
        first:'面积 = 向量积的模 $|\\vec a\\times\\vec b|$。',
        sol:['$\\vec a\\times\\vec b=(1\\cdot1-0\\cdot3,\\ 0\\cdot0-2\\cdot1,\\ 2\\cdot3-1\\cdot0)=(1,-2,6)$。',
             '面积 $=|\\vec a\\times\\vec b|=\\sqrt{1^2+(-2)^2+6^2}=\\sqrt{41}$。'],
        tip:'平行四边形面积 = 两邻边向量积的模。' }
    ],
    quickCheck:[
      { q:'数量积为零说明什么？', a:'两向量垂直（$\\vec a\\cdot\\vec b=0\\iff\\vec a\\perp\\vec b$）。' },
      { q:'向量积为零说明什么？', a:'两向量平行（共线）。' },
      { q:'向量积的结果是数还是向量？', a:'向量，方向用右手定则；数量积的结果才是数。' }
    ]
  },

  /* ========== 8.3 平面及其方程 ========== */
  {
    idx:'8.3', title:'平面及其方程',
    why:'空间里一张平面，可以由"一个点 + 一个法向量"唯一确定。就像直线由"点斜式"确定一样，平面由**点法式**确定：过点 $M_0$、法向量 $\\vec n=(A,B,C)$ 的平面，是"所有与 $\\vec n$ 垂直的向量"构成的。这是空间几何的第一个核心方程。',
    explain:[
      { analogy:'平面像"垂直于一支箭的桌面"：给出法向量 $\\vec n$（箭）和过一点 $M_0$，桌面上任一点 $M$ 满足 $\\overrightarrow{M_0M}\\perp\\vec n$，即点积为 0。',
        points:'**点法式**：$A(x-x_0)+B(y-y_0)+C(z-z_0)=0$。**一般式**：$Ax+By+Cz+D=0$（$\\vec n=(A,B,C)$ 是法向量）。**两平面夹角**：由法向量夹角定 $\\cos\\theta=\\dfrac{|\\vec n_1\\cdot\\vec n_2|}{|\\vec n_1||\\vec n_2|}$。',
        pitfall:'高频错：① 一般式里 $(A,B,C)$ 就是法向量，别漏；② 点到平面距离 $d=\\dfrac{|Ax_0+By_0+Cz_0+D|}{\\sqrt{A^2+B^2+C^2}}$，分子是**代值取绝对值**，分母是法向量模；③ 两平面平行 ⟺ 法向量平行（成比例），垂直 ⟺ 法向量垂直（点积 0）。' },
      { chain:'找点 + 法向量 → 点法式 → 展开得一般式 → 距离/夹角。',
        text:'**核心**：平面的"身份证"是法向量 $\\vec n=(A,B,C)$，一切性质都由它决定。' }
    ],
    worked:[
      { stem:'求过点 $M_0(1,2,3)$、法向量 $\\vec n=(2,-1,1)$ 的平面方程。',
        first:'**点法式**：$A(x-x_0)+B(y-y_0)+C(z-z_0)=0$，直接代。',
        steps:['$2(x-1)-1(y-2)+1(z-3)=0$。',
               '展开：$2x-2-y+2+z-3=0$，即 $2x-y+z-3=0$。'],
        take:'点法式 = 法向量分量 × (坐标 − 点坐标) 相加 = 0。' },
      { stem:'求点 $P(1,1,1)$ 到平面 $x+2y+2z=3$ 的距离。',
        first:'**距离公式**：$d=\\dfrac{|Ax_0+By_0+Cz_0+D|}{\\sqrt{A^2+B^2+C^2}}$，先化一般式。',
        steps:['一般式 $x+2y+2z-3=0$，$A=1,B=2,C=2,D=-3$。',
               '分子 $|1\\cdot1+2\\cdot1+2\\cdot1-3|=|1+2+2-3|=2$。',
               '分母 $\\sqrt{1^2+2^2+2^2}=\\sqrt9=3$。',
               '$d=\\dfrac23$。'],
        take:'点到平面距离 = 代值取绝对值 ÷ 法向量模。' }
    ],
    checklist:[
      {id:'pointnormal', knowledge:'**点法式**：过 $M_0$、法向量 $\\vec n=(A,B,C)$：$A(x-x_0)+B(y-y_0)+C(z-z_0)=0$。'},
      {id:'general', knowledge:'**一般式**：$Ax+By+Cz+D=0$，法向量 $\\vec n=(A,B,C)$。'},
      {id:'dist', knowledge:'**点到平面距离**：$d=\\dfrac{|Ax_0+By_0+Cz_0+D|}{\\sqrt{A^2+B^2+C^2}}$。'},
      {id:'angle', knowledge:'**两平面夹角**：$\\cos\\theta=\\dfrac{|\\vec n_1\\cdot\\vec n_2|}{|\\vec n_1||\\vec n_2|}$（法向量夹角）。'},
      {id:'parallel', knowledge:'**两平面关系**：平行 ⟺ 法向量成比例；垂直 ⟺ 法向量点积为 0。'}
    ],
    formulas:[
      { latex:'A(x-x_0)+B(y-y_0)+C(z-z_0)=0',
        from:'平面点法式', uses:'已知一点和法向量求平面',
        pit:'$(A,B,C)$ 是法向量；展开得一般式。' },
      { latex:'d=\\frac{|Ax_0+By_0+Cz_0+D|}{\\sqrt{A^2+B^2+C^2}}',
        from:'点到平面距离', uses:'求点到平面的距离',
        pit:'分子是代值取绝对值，分母是法向量模。' }
    ],
    problems:[
      { stem:'求过三点 $A(1,0,0)$、$B(0,1,0)$、$C(0,0,1)$ 的平面方程。', kpt:'三点定平面', lv:2,
        first:'法向量 = 两向量叉乘：$\\vec n=\\overrightarrow{AB}\\times\\overrightarrow{AC}$。',
        sol:['$\\overrightarrow{AB}=(-1,1,0)$，$\\overrightarrow{AC}=(-1,0,1)$。',
             '$\\vec n=\\overrightarrow{AB}\\times\\overrightarrow{AC}=(1,1,1)$。',
             '过 $A(1,0,0)$：$1(x-1)+1(y-0)+1(z-0)=0$，即 $x+y+z=1$。'],
        tip:'三点定平面：法向量 = 两条边向量的叉乘，再套点法式。' },
      { stem:'判断平面 $2x-y+3z+1=0$ 与 $x+2y+z-2=0$ 是否垂直。', kpt:'平面关系', lv:1,
        first:'看法向量点积是否为 0。',
        sol:['法向量 $\\vec n_1=(2,-1,3)$，$\\vec n_2=(1,2,1)$。',
             '$\\vec n_1\\cdot\\vec n_2=2-2+3=3\\ne0$。',
             '不垂直。'],
        tip:'两平面垂直 ⟺ 法向量点积为 0。' }
    ],
    quickCheck:[
      { q:'平面一般式里法向量是谁？', a:'$(A,B,C)$，即 $x,y,z$ 的系数。' },
      { q:'点到平面距离的分母是什么？', a:'法向量的模 $\\sqrt{A^2+B^2+C^2}$。' },
      { q:'两平面平行的充要条件？', a:'法向量成比例（$\\vec n_1\\parallel\\vec n_2$）。' }
    ]
  },

  /* ========== 8.4 空间直线及其方程 ========== */
  {
    idx:'8.4', title:'空间直线及其方程',
    why:'空间直线可以由"一个点 + 一个方向向量"确定，也可看成"两平面的交线"。它有三种方程：一般方程（两平面联立）、对称式（点向式）、参数方程。三种形式各有用途，考试常要求互化。',
    explain:[
      { analogy:'直线像"过一点、沿一支箭的方向延伸"：给点 $M_0$ 和方向向量 $\\vec s=(m,n,p)$，直线上任一点 $M$ 满足 $\\overrightarrow{M_0M}\\parallel\\vec s$。',
        points:'**对称式（点向式）**：$\\dfrac{x-x_0}{m}=\\dfrac{y-y_0}{n}=\\dfrac{z-z_0}{p}$。**参数式**：$x=x_0+mt,\\ y=y_0+nt,\\ z=z_0+pt$。**一般式**：两平面 $\\begin{cases}A_1x+B_1y+C_1z+D_1=0\\\\A_2x+B_2y+C_2z+D_2=0\\end{cases}$，方向向量 $\\vec s=\\vec n_1\\times\\vec n_2$。',
        pitfall:'高频错：① 方向向量是 $(m,n,p)$，别和法向量 $(A,B,C)$ 混淆；② 一般式化对称式要先求方向向量（两法向量叉乘），还要**找直线上一点**；③ 两直线夹角 $\\cos\\theta=\\dfrac{|\\vec s_1\\cdot\\vec s_2|}{|\\vec s_1||\\vec s_2|}$，用方向向量。' },
      { chain:'点 + 方向向量 → 对称式 → 参数式；两平面 → 一般式 → 方向向量 = 法向量叉乘。',
        text:'**核心**：直线的"身份证"是方向向量 $\\vec s$。' }
    ],
    worked:[
      { stem:'求过点 $M_0(1,2,3)$、方向向量 $\\vec s=(2,-1,4)$ 的直线对称式与参数式。',
        first:'对称式 = 各坐标减点坐标除以方向分量，参数式令公共比值为 $t$。',
        steps:['对称式：$\\dfrac{x-1}{2}=\\dfrac{y-2}{-1}=\\dfrac{z-3}{4}$。',
               '参数式：令 $\\dfrac{x-1}{2}=t$，得 $x=1+2t,\\ y=2-t,\\ z=3+4t$。'],
        take:'对称式 ↔ 参数式，只差"令比值为 $t$"这一步。' }
    ],
    checklist:[
      {id:'sym', knowledge:'**对称式**：$\\dfrac{x-x_0}{m}=\\dfrac{y-y_0}{n}=\\dfrac{z-z_0}{p}$，方向向量 $(m,n,p)$。'},
      {id:'param', knowledge:'**参数式**：$x=x_0+mt,\\ y=y_0+nt,\\ z=z_0+pt$。'},
      {id:'general', knowledge:'**一般式**：两平面联立，方向向量 $\\vec s=\\vec n_1\\times\\vec n_2$。'},
      {id:'angle', knowledge:'**两直线夹角**：$\\cos\\theta=\\dfrac{|\\vec s_1\\cdot\\vec s_2|}{|\\vec s_1||\\vec s_2|}$。'},
      {id:'lineplane', knowledge:'**直线与平面夹角**：用方向向量与法向量，$\\sin\\varphi=\\dfrac{|\\vec s\\cdot\\vec n|}{|\\vec s||\\vec n|}$。'}
    ],
    formulas:[
      { latex:'\\frac{x-x_0}{m}=\\frac{y-y_0}{n}=\\frac{z-z_0}{p}',
        from:'直线对称式', uses:'已知点和方向向量求直线',
        pit:'方向向量是 $(m,n,p)$；某分量为 0 时该坐标固定。' },
      { latex:'\\vec s=\\vec n_1\\times\\vec n_2',
        from:'一般式方向向量', uses:'直线给成两平面交线时',
        pit:'方向向量 = 两法向量的叉乘。' }
    ],
    problems:[
      { stem:'把直线 $\\begin{cases}x+y+z=1\\\\2x-y+3z=2\\end{cases}$ 化为对称式。', kpt:'一般式化对称式', lv:3,
        first:'先求方向向量 $\\vec s=\\vec n_1\\times\\vec n_2$，再找直线上一点。',
        sol:['$\\vec n_1=(1,1,1)$，$\\vec n_2=(2,-1,3)$，$\\vec s=\\vec n_1\\times\\vec n_2=(4,-1,-3)$。',
             '令 $z=0$，解 $\\begin{cases}x+y=1\\\\2x-y=2\\end{cases}$ 得 $x=1,y=0$，点 $(1,0,0)$。',
             '对称式：$\\dfrac{x-1}{4}=\\dfrac{y}{-1}=\\dfrac{z}{-3}$。'],
        tip:'一般式化对称式两步：方向向量=法向量叉乘，再令某坐标=0 解出一点。' },
      { stem:'求直线 $\\dfrac{x-1}{1}=\\dfrac{y+1}{2}=\\dfrac{z}{2}$ 与平面 $x-y+z=0$ 的夹角。', kpt:'线面夹角', lv:2,
        first:'用 $\\sin\\varphi=\\dfrac{|\\vec s\\cdot\\vec n|}{|\\vec s||\\vec n|}$。',
        sol:['$\\vec s=(1,2,2)$，$\\vec n=(1,-1,1)$。',
             '$\\vec s\\cdot\\vec n=1-2+2=1$，$|\\vec s|=3$，$|\\vec n|=\\sqrt3$。',
             '$\\sin\\varphi=\\dfrac{1}{3\\sqrt3}=\\dfrac{\\sqrt3}{9}$。'],
        tip:'线面夹角用正弦（方向向量与法向量的"余角"）。' }
    ],
    quickCheck:[
      { q:'直线对称式里的 $(m,n,p)$ 是什么？', a:'方向向量，不是法向量。' },
      { q:'一般式直线的方向向量怎么求？', a:'两平面法向量叉乘 $\\vec s=\\vec n_1\\times\\vec n_2$。' },
      { q:'直线与平面夹角用正弦还是余弦？', a:'正弦，$\\sin\\varphi=\\dfrac{|\\vec s\\cdot\\vec n|}{|\\vec s||\\vec n|}$。' }
    ]
  },

  /* ========== 8.5 曲面及其方程 ========== */
  {
    idx:'8.5', title:'曲面及其方程',
    why:'平面是最简单的曲面，这一节推广到一般**曲面**：柱面、旋转曲面、二次曲面。掌握"曲面 = 满足某方程的空间点的集合"这个观点，再记住几类标准方程的形状，就能读懂和写出空间图形。',
    explain:[
      { analogy:'曲面像"空间里满足同一条件的点的集合"——比如"到原点距离等于 R 的点"就是球面 $x^2+y^2+z^2=R^2$。方程就是这张"点集"的清单。',
        points:'**旋转曲面**：曲线绕坐标轴旋转，$f(y,z)=0$ 绕 $z$ 轴 ⟹ $f(\\pm\\sqrt{x^2+y^2},z)=0$。**柱面**：方程缺一个变量（如 $x^2+y^2=R^2$ 是圆柱面，$z$ 任意）。**二次曲面**：椭球面、抛物面、双曲面、锥面等，记住标准式与名称对应。',
        pitfall:'高频错：① 旋转曲面绕哪个轴，就"哪个变量不动、另一个换成 $\\pm\\sqrt{另两变量平方和}$"，轴别搞反；② 柱面方程**缺一个变量**是关键特征，别当成平面；③ 二次曲面配方法后与标准式对照，符号决定形状（单叶/双叶双曲面等）。' },
      { chain:'识别曲面类型 → 找对称轴/母曲线 → 写方程或配方法化标准式。',
        text:'**核心**：旋转曲面"绕轴"，柱面"缺变量"，二次曲面"看标准式"。' }
    ],
    worked:[
      { stem:'求 $z=y^2$ 绕 $z$ 轴旋转所得曲面方程。',
        first:'绕 $z$ 轴 ⟹ $z$ 不变，$y$ 换成 $\\pm\\sqrt{x^2+y^2}$。',
        steps:['母曲线 $z=y^2$，绕 $z$ 轴，$y\\to\\pm\\sqrt{x^2+y^2}$。',
               '得 $z=(\\pm\\sqrt{x^2+y^2})^2=x^2+y^2$。',
               '即旋转抛物面 $z=x^2+y^2$。'],
        take:'绕 $z$ 轴：$z$ 不动，另一个变量换成 $\\sqrt{x^2+y^2}$（取平方后符号无所谓）。' }
    ],
    checklist:[
      {id:'rev', knowledge:'**旋转曲面**：绕 $z$ 轴，$y\\to\\pm\\sqrt{x^2+y^2}$；绕 $x$ 轴，$z\\to\\pm\\sqrt{y^2+z^2}$。'},
      {id:'cyl', knowledge:'**柱面**：方程缺一个变量（如 $x^2+y^2=R^2$），母线平行于所缺变量的轴。'},
      {id:'quadric', knowledge:'**二次曲面**：椭球面 $\\dfrac{x^2}{a^2}+\\dfrac{y^2}{b^2}+\\dfrac{z^2}{c^2}=1$、抛物面、双曲面、锥面。'},
      {id:'sphere', knowledge:'**球面**：$(x-a)^2+(y-b)^2+(z-c)^2=R^2$，球心 $(a,b,c)$、半径 $R$。'}
    ],
    formulas:[
      { latex:'x^2+y^2+z^2=R^2',
        from:'球面方程', uses:'以原点为球心、半径 R',
        pit:'球心不在原点时用 $(x-a)^2+(y-b)^2+(z-c)^2=R^2$。' },
      { latex:'z=x^2+y^2',
        from:'旋转抛物面', uses:'$z=y^2$ 绕 $z$ 轴旋转',
        pit:'绕 $z$ 轴时 $z$ 不变、$y$ 换 $\\sqrt{x^2+y^2}$。' }
    ],
    problems:[
      { stem:'指出方程 $x^2+y^2=4$ 表示的曲面。', kpt:'柱面识别', lv:1,
        first:'方程**缺 $z$**，是柱面；母线是圆，沿 $z$ 轴方向。',
        sol:['$x^2+y^2=4$ 缺 $z$，是**圆柱面**（母线平行于 $z$ 轴）。',
             '底面是半径 2 的圆。'],
        tip:'缺哪个变量，母线就平行于哪个坐标轴。' },
      { stem:'求 $x^2+y^2=z^2$ 绕 $z$ 轴旋转前的母曲线，并识别曲面。', kpt:'旋转曲面识别', lv:2,
        first:'$x^2+y^2=z^2$ 即 $\\sqrt{x^2+y^2}=|z|$，是**圆锥面**，母曲线是直线。',
        sol:['$x^2+y^2=z^2\\Rightarrow\\sqrt{x^2+y^2}=|z|$。',
             '是圆锥面（顶点在原点，轴为 $z$ 轴），半顶角 45°。'],
        tip:'$x^2+y^2=z^2$ 是标准圆锥面，$x^2+y^2=az^2$ 是更一般的锥面。' }
    ],
    quickCheck:[
      { q:'柱面方程的特征？', a:'缺一个变量，母线平行于所缺变量的坐标轴。' },
      { q:'旋转曲面绕 z 轴怎么代换？', a:'z 不变，另一个变量换成 ±√(x²+y²)。' },
      { q:'球面方程的一般形式？', a:'(x−a)²+(y−b)²+(z−c)²=R²。' }
    ]
  },

  /* ========== 8.6 空间曲线及其方程 ========== */
  {
    idx:'8.6', title:'空间曲线及其方程',
    why:'空间曲线可以看成**两曲面的交线**（一般方程），也可以用**参数方程**表示（像用 $t$ 描述一个动点在空间划出的轨迹）。这一节还要掌握曲线在坐标面上的**投影**，它是后面重积分、曲面积分确定积分区域的基础。',
    explain:[
      { analogy:'空间曲线像"两堵墙的交线"：两个曲面方程联立，同时满足两者的点就是交线。投影则像"把曲线压扁到坐标面上"。',
        points:'**一般方程**：$\\begin{cases}F(x,y,z)=0\\\\G(x,y,z)=0\\end{cases}$。**参数方程**：$x=x(t),y=y(t),z=z(t)$。**投影**：消去 $z$ 得 $\\begin{cases}H(x,y)=0\\\\z=0\\end{cases}$ 即曲线在 $xOy$ 面的投影柱面与投影。',
        pitfall:'高频错：① 投影要**消去被投影的那个变量**（投到 $xOy$ 面就消 $z$）；② 投影结果要配"$z=0$"（或对应坐标面方程），否则只是柱面不是投影曲线；③ 参数方程与一般方程互化时，先设参数再代入消元。' },
      { chain:'两曲面联立 → 一般方程；设参数 → 参数方程；消变量 → 投影。',
        text:'**核心**：投影 = 消去一个变量 + 限制在坐标面上。' }
    ],
    worked:[
      { stem:'求曲线 $\\begin{cases}z=\\sqrt{4-x^2-y^2}\\\\z=\\sqrt{3}\\end{cases}$ 在 $xOy$ 面的投影。',
        first:'消去 $z$，把 $z=\\sqrt3$ 代入第一式。',
        steps:['$\\sqrt3=\\sqrt{4-x^2-y^2}$，平方得 $3=4-x^2-y^2$。',
               '即 $x^2+y^2=1$。',
               '投影：$\\begin{cases}x^2+y^2=1\\\\z=0\\end{cases}$。'],
        take:'投影到 $xOy$ 面 = 消去 $z$ 得 $x,y$ 方程，再配 $z=0$。' }
    ],
    checklist:[
      {id:'general', knowledge:'**一般方程**：两曲面联立 $\\begin{cases}F=0\\\\G=0\\end{cases}$。'},
      {id:'param', knowledge:'**参数方程**：$x=x(t),y=y(t),z=z(t)$。'},
      {id:'projxy', knowledge:'**投影到 $xOy$**：消去 $z$ 得 $H(x,y)=0$，投影为 $\\begin{cases}H=0\\\\z=0\\end{cases}$。'},
      {id:'cylproj', knowledge:'**投影柱面**：消去变量后得到的 $H(x,y)=0$ 本身是柱面，配 $z=0$ 才是投影曲线。'}
    ],
    formulas:[
      { latex:'\\begin{cases}x=x(t)\\\\y=y(t)\\\\z=z(t)\\end{cases}',
        from:'空间曲线参数方程', uses:'描述空间曲线（如螺旋线）',
        pit:'一个参数 $t$ 同时给三个坐标。' },
      { latex:'\\text{投影到 }xOy:\\;\\begin{cases}H(x,y)=0\\\\z=0\\end{cases}',
        from:'空间曲线投影', uses:'求曲线在坐标面上的投影',
        pit:'消去 $z$；投影曲线要配 $z=0$。' }
    ],
    problems:[
      { stem:'求曲线 $\\begin{cases}x^2+y^2+z^2=1\\\\z=\\dfrac12\\end{cases}$ 在 $xOy$ 面的投影。', kpt:'投影', lv:2,
        first:'消去 $z$：把 $z=\\dfrac12$ 代入球面。',
        sol:['$x^2+y^2+\\dfrac14=1$，即 $x^2+y^2=\\dfrac34$。',
             '投影：$\\begin{cases}x^2+y^2=\\dfrac34\\\\z=0\\end{cases}$。'],
        tip:'球面被水平面截，投影是圆。' },
      { stem:'写出以 $x=\\cos t,\\ y=\\sin t,\\ z=t$ 的参数方程所表示的曲线（螺线）在 $xOy$ 面的投影。', kpt:'参数曲线投影', lv:2,
        first:'消去参数 $t$ 得 $x,y$ 关系，配 $z=0$。',
        sol:['$x^2+y^2=\\cos^2t+\\sin^2t=1$。',
             '投影：$\\begin{cases}x^2+y^2=1\\\\z=0\\end{cases}$。'],
        tip:'参数曲线投影 = 消去参数得 $x,y$ 方程，再配坐标面。' }
    ],
    quickCheck:[
      { q:'空间曲线的一般方程是什么形式？', a:'两曲面方程联立（交线）。' },
      { q:'投影到 xOy 面要消去哪个变量？', a:'消去 $z$，得 $x,y$ 的方程。' },
      { q:'投影结果为什么要配 z=0？', a:'否则只是投影柱面，配 z=0 才是坐标面上的投影曲线。' }
    ]
  }
  ]
});
