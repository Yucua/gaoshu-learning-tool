/* 渲染引擎 v4：入口=板块仪表盘 + 章节目录 + 节内四件套 + 7 个工具板块 */
(function () {
  var LS_CHECK = "gaoshu_check_v3";
  var LS_WRONG = "gaoshu_wrong_v3";
  var LS_VIEW  = "gaoshu_view_v4";

  var mem = {}, haveLS = false;
  try { localStorage.setItem("__t","1"); localStorage.removeItem("__t"); haveLS = true; } catch(e){}
  function sget(k){ if(haveLS){ try{ return localStorage.getItem(k); }catch(e){} } return (k in mem) ? mem[k] : null; }
  function sset(k,v){ if(haveLS){ try{ localStorage.setItem(k,v); return; }catch(e){} } mem[k]=v; }

  var checks = {}, wrong = {};
  try { checks = JSON.parse(sget(LS_CHECK) || "{}"); } catch(e){ checks = {}; }
  try { wrong  = JSON.parse(sget(LS_WRONG) || "{}"); } catch(e){ wrong  = {}; }
  function saveChecks(){ sset(LS_CHECK, JSON.stringify(checks)); }
  function saveWrong(){ sset(LS_WRONG, JSON.stringify(wrong)); }

  function esc(s){ return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
  function md(s){
    s = esc(s);
    s = s.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/\n/g,"<br>");
    return s;
  }
  function chaps(){ return window.CHAPOS || []; }
  function chap(no){ var cs=chaps(); for(var i=0;i<cs.length;i++){ if(cs[i].no===no) return cs[i]; } return null; }
  function secOf(no,si){ var c=chap(no); return (c&&c.sections)? c.sections[si] : null; }
  function ckKey(no,si,id){ return no+"_"+si+"_"+id; }
  function wKey(no,si,pi){ return no+"_"+si+"_"+pi; }

  function secStat(no,si){
    var s=secOf(no,si), r={all:0,good:0,half:0,bad:0};
    if(!s) return r;
    r.all=(s.checklist||[]).length;
    (s.checklist||[]).forEach(function(it){
      var v=checks[ckKey(no,si,it.id)];
      if(v===2) r.good++; else if(v===1) r.half++; else if(v===0) r.bad++;
    });
    return r;
  }
  function chapStat(no){
    var c=chap(no), r={all:0,good:0,half:0,bad:0,wrong:0,pr:0};
    if(!c) return r;
    (c.sections||[]).forEach(function(s,si){
      var st=secStat(no,si);
      r.all+=st.all; r.good+=st.good; r.half+=st.half; r.bad+=st.bad;
      r.pr += (s.problems||[]).length;
      (s.problems||[]).forEach(function(p,pi){ if(wrong[wKey(no,si,pi)]) r.wrong++; });
    });
    return r;
  }
  function allStat(){
    var r={all:0,good:0,half:0,bad:0,wrong:0,pr:0};
    chaps().forEach(function(c){
      var x=chapStat(c.no);
      r.all+=x.all; r.good+=x.good; r.half+=x.half; r.bad+=x.bad; r.wrong+=x.wrong; r.pr+=x.pr;
    });
    return r;
  }
  function wrongCountAll(){
    var n=0;
    chaps().forEach(function(c){
      (c.sections||[]).forEach(function(s,si){
        (s.problems||[]).forEach(function(p,pi){ if(wrong[wKey(c.no,si,pi)]) n++; });
      });
    });
    return n;
  }

  var main = document.getElementById("main");
  var sidebar = document.getElementById("sidebar");

  var view = { page:"home", ch:null, si:null, tool:null, tab:"learn" };
  try { var sv=JSON.parse(sget(LS_VIEW)||"null"); if(sv&&sv.page) view=sv; } catch(e){}
  function saveView(){ sset(LS_VIEW, JSON.stringify(view)); }

  /* 页面返回栈：记录每次跳转前的视图 */
  var navStack = [];
  function snap(){ return JSON.stringify({page:view.page,ch:view.ch,si:view.si,tool:view.tool,tab:view.tab}); }
  function pushNav(){ navStack.push(snap()); if(navStack.length>60) navStack.shift(); }
  function goBack(){
    if(!navStack.length) return false;
    view = JSON.parse(navStack.pop());
    saveView(); closePop(); render(); window.scrollTo(0,0); return true;
  }
  /* 没有历史时的兜底：回上一层 */
  function goParent(){
    if(view.page==="section"){ view.page="chapter"; view.si=null; }
    else if(view.page==="tool" && (view.tool==="test"||view.tool==="examples")){ view.page="chapter"; view.si=null; }
    else { view.page="home"; view.tool=null; }
    saveView(); closePop(); render(); window.scrollTo(0,0);
  }
  if(!view.ch && chaps().length) view.ch = chaps()[0].no;

  var quiz = { list:[], revealed:false, endAt:0, timer:null };

  /* ===================== 侧栏 ===================== */
  function renderSidebar(){
    var h = '<button class="side-toggle" data-side-toggle>☰ 目录</button>';
    h += '<div class="brand">同济高数 · 学习工具<small>学 · 练 · 测 · 复盘</small></div>';
    h += '<div style="margin-top:10px"><button class="sitem'+(view.page==="home"?" active":"")+'" data-dash="home"><span class="no">🏠</span><span class="t">板块首页</span></button></div>';
    h += '<div class="side-sub">章节目录</div><div class="side-chaps">';
    chaps().forEach(function(c){
      var st=chapStat(c.no);
      h += '<button class="sitem'+((view.page==="chapter"||view.page==="section")&&view.ch===c.no?" active":"")+'" data-ch="'+c.no+'">'+
           '<span class="no">第'+c.no+'</span><span class="t">'+esc(c.title)+'</span><span class="cnt">'+st.good+'/'+st.all+'</span></button>';
    });
    h += '</div>';
    var c = chap(view.ch);
    if(c){
      h += '<div class="side-sub">'+esc(c.title)+' · 共'+(c.sections||[]).length+'节</div><div class="side-chaps">';
      (c.sections||[]).forEach(function(s,si){
        var st=secStat(view.ch,si);
        var mark = st.bad ? '<span class="cnt" style="color:var(--red)">'+st.bad+'没懂</span>'
                 : st.half ? '<span class="cnt" style="color:var(--amber)">'+st.half+'半懂</span>'
                 : '<span class="cnt">'+st.good+'/'+st.all+'</span>';
        h += '<button class="sitem'+(view.page==="section"&&view.si===si?" active":"")+'" data-sec="'+si+'">'+
             '<span class="no">'+s.idx+'</span><span class="t">'+esc(s.title)+'</span>'+mark+'</button>';
      });
      h += '</div>';
    }
    var a = allStat();
    var pct = a.all ? Math.round(a.good*100/a.all) : 0;
    h += '<div class="ppill">总掌握 '+a.good+'/'+a.all+'（'+pct+'%）· 错题 '+a.wrong+'</div><div class="pbar"><i style="width:'+pct+'%"></i></div>';
    sidebar.innerHTML = h;
  }

  /* ===================== 入口：板块仪表盘 ===================== */
  function paneDash(){
    var a = allStat();
    var fnN = 0, secN = 0;
    chaps().forEach(function(c){
      (c.sections||[]).forEach(function(s){ fnN += (s.formulas||[]).length; });
      secN += (c.sections||[]).length;
    });

    function card(attrs, ic, nm, ds, badge, cls){
      return '<button class="dcard'+(cls?" "+cls:"")+'" '+attrs+'>'+
             (badge?'<span class="badge'+(badge[1]?" "+badge[1]:"")+'">'+badge[0]+'</span>':'')+
             '<span class="ic">'+ic+'</span><span class="nm">'+nm+'</span><span class="ds">'+ds+'</span></button>';
    }

    var h = '<div class="card" style="padding:18px 20px"><div class="ix" style="color:var(--accent);font-size:12px;font-weight:700">同济八版 · 上册</div>'+
      '<h1 style="font-size:24px;margin:2px 0 4px">学习面板</h1>'+
      '<div class="muted" style="font-size:13px">共 '+a.all+' 个知识点 · 已掌握 '+a.good+' · 错题 '+a.wrong+' · 待补 '+(a.bad+a.half)+'</div>'+
      '<div class="pbar" style="margin-top:10px"><i style="width:'+(a.all?Math.round(a.good*100/a.all):0)+'%"></i></div></div>';

    h += '<div class="dash-h"><h2>开始学</h2><span class="muted">按顺序推进</span></div>';
    h += '<div class="dash">';
    h += card('data-dash="chapters"', '📚', '章节目录', '按章 → 按节，进入讲解、例题与练习', [chaps().length+' 章 · '+secN+' 节', 'green'], 'primary');
    h += '</div>';

    h += '<div class="dash-h"><h2>复盘工具</h2><span class="muted">错题和不会的，都在这</span></div>';
    h += '<div class="dash">';
    h += card('data-tool="wrong"', '❌', '错题本', '全书汇总 · 做错的题自动收进来', [a.wrong+' 道', a.wrong?'red':'']);
    h += card('data-tool="weak"', '🎯', '不会清单', '全书汇总 · 半懂 + 没懂的知识点', [(a.bad+a.half)+' 个', (a.bad+a.half)?'amber':'']);
    h += card('data-tool="stats"', '📊', '学习统计', '全书各章掌握度与窟窿，一眼看穿', null);
    h += '</div>';

    h += '<div class="dash-h"><h2>考前</h2><span class="muted">全书 · 打印带走</span></div>';
    h += '<div class="dash">';
    h += card('data-tool="speed"', '⚡', '考前速记', '全书没掌握的知识点 + 错题 + 公式 + 易错，一页 A4', ['可打印']);
    h += card('data-tool="formula"', '📐', '公式手册', '全书公式，可复制、可打印', [fnN+' 张']);
    h += '</div>';

    h += '<div class="dash-h"><h2>数据</h2><span class="muted">进度只存在本机 · 换设备前先导出</span></div>';
    h += '<div class="card" style="padding:14px 16px"><div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">'+
         '<button class="btn primary" data-export>⬇ 导出进度</button>'+
         '<button class="btn" data-import>⬆ 导入进度</button>'+
         '<span class="muted" style="flex:1 1 100%;margin-top:2px">导出会下载一个 JSON 文件；换设备后用它「导入」即可恢复错题和掌握度。</span></div></div>';
    h += '<input type="file" id="importFile" accept=".json,application/json" style="display:none">';
    return h;
  }

  /* ===================== 章节目录 ===================== */
  function paneChapters(){
    var h = '<div class="crumb"><h1>章节目录</h1></div><div class="dash">';
    chaps().forEach(function(c){
      var st = chapStat(c.no);
      var pct = st.all ? Math.round(st.good*100/st.all) : 0;
      h += '<button class="dcard" data-ch="'+c.no+'">'+
           (st.bad? '<span class="badge red">'+st.bad+' 没懂</span>' : '<span class="badge green">'+pct+'%</span>')+
           '<span class="ic">📘</span><span class="nm">第'+c.no+'章 '+esc(c.title)+'</span>'+
           '<span class="ds">'+esc(c.sub||"")+'<br>'+(c.sections||[]).length+' 节 · '+st.all+' 知识点 · '+st.pr+' 道题</span></button>';
    });
    h += '</div>';
    return h;
  }

  /* ===================== 一章：节列表 ===================== */
  function paneChapter(){
    var c = chap(view.ch); if(!c) return '<div class="empty">没有该章。</div>';
    var st = chapStat(view.ch);
    var h = '<div class="card">'+
      '<div class="ix" style="color:var(--accent);font-size:12px;font-weight:700;margin-top:10px">第'+c.no+'章</div>'+
      '<h1 style="font-size:24px;margin:2px 0 4px">'+esc(c.title)+'</h1>'+
      '<div class="muted" style="font-size:13px">'+esc(c.sub||"")+'</div>'+
      '<div class="pbar" style="margin-top:10px"><i style="width:'+(st.all?Math.round(st.good*100/st.all):0)+'%"></i></div>'+
      '<div class="muted" style="margin-top:4px">已掌握 '+st.good+'/'+st.all+'</div></div>';

    /* 本章工具：自测 / 例题库（原本在面板上，现归到章内） */
    var prN = 0, exN = 0;
    (c.sections||[]).forEach(function(s){ prN += (s.problems||[]).length; exN += (s.worked||[]).length; });
    h += '<div class="dash-h"><h2>本章工具</h2><span class="muted">学完或考前用</span></div><div class="dash">';
    h += '<button class="dcard" data-tool="test"><span class="badge">'+prN+' 题库</span>'+
         '<span class="ic">📝</span><span class="nm">章末自测</span>'+
         '<span class="ds">从本章随机抽 6 题，15 分钟计时，交卷看答案</span></button>';
    h += '<button class="dcard" data-tool="examples"><span class="badge">'+exN+' 道</span>'+
         '<span class="ic">🧭</span><span class="nm">例题库</span>'+
         '<span class="ds">把本章"老师带做"的例题汇总，当范例题过一遍</span></button>';
    h += '</div>';

    h += '<div class="dash-h"><h2>小节</h2><span class="muted">共 '+(c.sections||[]).length+' 节</span></div><div class="dash">';
    (c.sections||[]).forEach(function(s,si){
      var sp = secStat(view.ch,si);
      var badge = sp.bad ? ['<span>'+sp.bad+' 没懂</span>'][0] : sp.half ? [sp.half+' 半懂','amber'] : [sp.good+'/'+sp.all,'green'];
      h += '<button class="dcard" data-sec="'+si+'">'+
           '<span class="badge '+(sp.bad?'red':(sp.half?'amber':'green'))+'">'+(sp.bad?sp.bad+' 没懂':(sp.half?sp.half+' 半懂':sp.good+'/'+sp.all))+'</span>'+
           '<span class="ic" style="width:3px;height:15px;border-radius:2px;background:var(--accent);display:inline-block;margin-bottom:2px"></span>'+
           '<span class="nm">'+s.idx+' '+esc(s.title)+'</span>'+
           '<span class="ds">'+(s.problems||[]).length+' 道题 · '+(s.formulas||[]).length+' 张公式'+
           ((s.worked||[]).length?' · 例题 '+(s.worked||[]).length:'')+'</span></button>';
    });
    h += '</div>';
    return h;
  }

  /* ===================== 一节：四件套 ===================== */
  function renderTabs(){
    var tabs=[["learn","学"],["worked","跟我做"],["practice","你自己做"],["check","30 秒自查"]];
    var h='<div class="tabbar"><div class="tabs">';
    tabs.forEach(function(x){
      h+='<button class="tab'+(view.tab===x[0]?" on":"")+'" data-tab="'+x[0]+'">'+x[1]+'</button>';
    });
    h+='</div></div>';
    return h;
  }
  function paneSection(){
    var s = secOf(view.ch, view.si); if(!s) return '<div class="empty">没有该节。</div>';
    var h = renderTabs();
    h += '<div class="crumb"><span class="ix">'+s.idx+'</span><h1>'+esc(s.title)+'</h1></div>';
    if(view.tab==="worked") h += paneWorked();
    else if(view.tab==="practice") h += panePractice();
    else if(view.tab==="check") h += paneCheck();
    else h += paneLearn();
    return h;
  }

  function paneLearn(){
    var s = secOf(view.ch, view.si);
    var h = "";
    if(s.why) h += '<div class="why">'+md(s.why)+'</div>';
    h += (s.explain||[]).map(function(b){
      var x="";
      if(b.analogy) x += '<div class="analogy">'+md(b.analogy)+'</div>';
      if(b.figures) x += b.figures.map(function(f){ return '<figure class="figure">'+(f.svg||"")+(f.cap?'<figcaption>'+esc(f.cap)+'</figcaption>':'')+'</figure>'; }).join("");
      if(b.chain) x += '<div class="step-chain">'+md(b.chain)+'</div>';
      if(b.points) x += '<div class="keypoint">'+md(b.points)+'</div>';
      if(b.pitfall) x += '<div class="pitfall">'+md(b.pitfall)+'</div>';
      if(b.text) x += '<p>'+md(b.text)+'</p>';
      return x;
    }).join("");
    if(s.checklist && s.checklist.length){
      h += '<div class="card"><div class="zone"><h2>本节知识清单 <span class="muted">点一下标记：未评 → 会 → 半懂 → 没懂</span></h2>'+renderChecklist(s,view.ch,view.si)+'</div></div>';
    }
    return h;
  }
  function renderChecklist(s,no,si){
    return '<ul class="checklist">'+(s.checklist||[]).map(function(it){
      var k=ckKey(no,si,it.id), v=checks[k];
      var st = v===2?"已掌握":v===1?"半懂 · 要回炉":v===0?"没懂 · 优先补":"未评 · 点一下标记";
      return '<li class="ck" tabindex="0" data-ck="'+k+'"'+(v==null?'':' data-s="'+v+'"')+' role="checkbox" aria-checked="'+(v===2)+'">'+
             '<span class="ct">'+md(it.knowledge||it.title)+'<span class="st">'+st+'</span></span></li>';
    }).join("")+'</ul>';
  }
  function paneWorked(){
    var s=secOf(view.ch,view.si), ws=s.worked||[];
    if(!ws.length) return '<div class="empty">这一节还没配"老师带做"的例题。</div>';
    return ws.map(function(w,i){
      return '<div class="worked"><div class="wt">例题 '+(i+1)+' · 老师带你做一遍</div><div class="stem">'+md(w.stem)+'</div>'+
        (w.first?'<div class="first">'+md(w.first)+'</div>':'')+
        (w.steps||[]).map(function(t){return '<div class="wstep">'+md(t)+'</div>';}).join("")+
        (w.take?'<div class="take">'+md(w.take)+'</div>':'')+'</div>';
    }).join("");
  }
  function panePractice(){
    var s=secOf(view.ch,view.si), ps=s.problems||[];
    if(!ps.length) return '<div class="empty">这一节还没配练习题。</div>';
    var lv={1:'<span class="tag lv1">基础</span>',2:'<span class="tag lv2">经典·易错</span>',3:'<span class="tag lv3">拔高</span>'};
    return '<div class="problems">'+ps.map(function(p,i){
      var k=wKey(view.ch,view.si,i);
      var sol=p.sol?'<details><summary>看详解</summary><div class="sol">'+p.sol.map(function(t){return '<div class="step">'+md(t)+'</div>';}).join("")+'</div></details>':"";
      return '<div class="prob"><div class="phead">'+(lv[p.lv]||"")+'<span class="tag kpt">'+esc(p.kpt||"")+'</span></div>'+
        '<div class="stem">'+md(p.stem)+'</div>'+(p.first?'<div class="first">'+md(p.first)+'</div>':'')+sol+
        (p.tip?'<div class="tip">'+md(p.tip)+'</div>':'')+
        '<div class="prow"><button class="mark'+(wrong[k]?" on":"")+'" data-wrong="'+k+'">'+(wrong[k]?"✓ 已记入错题本（点一下移除）":"✗ 这题我做错了")+'</button></div></div>';
    }).join("")+'</div>';
  }
  function paneCheck(){
    var s=secOf(view.ch,view.si), qs=s.quickCheck||[];
    if(!qs.length) return '<div class="empty">这一节还没配自查题。</div>';
    return '<div class="card"><div class="zone"><h2>30 秒自查 <span class="muted">先自己想，再点开对答案</span></h2></div>'+
      qs.map(function(q,i){ return '<div class="qc"><div class="qq"><b>'+(i+1)+'.</b> '+md(q.q)+'</div><span class="qbtn">点开看答案</span><div class="qa">'+md(q.a)+'</div></div>'; }).join("")+'</div>';
  }

  /* ===================== 工具：错题本（全书） ===================== */
  function toolWrong(){
    var h = '<div class="card">'+
      '<div class="zone" style="margin-top:12px"><h2>错题本 <span class="muted">全书汇总 · 按章分组</span></h2></div>';
    var any=false;
    chaps().forEach(function(c){
      var items=[];
      (c.sections||[]).forEach(function(s,si){
        (s.problems||[]).forEach(function(p,pi){ if(wrong[wKey(c.no,si,pi)]) items.push({s:s,si:si,p:p,pi:pi}); });
      });
      if(!items.length) return;
      any=true;
      h += '<div class="muted" style="margin:16px 0 6px"><b>第'+c.no+'章 '+esc(c.title)+'</b>（'+items.length+'）</div>';
      items.forEach(function(it){
        h += '<div class="note-item"><div class="ni-h">'+it.s.idx+' '+esc(it.s.title)+' · '+esc(it.p.kpt||"")+'</div>'+
             '<div class="ni-b">'+md(it.p.stem)+'</div>'+
             (it.p.first?'<div class="muted" style="margin-top:6px">🧭 '+md(it.p.first)+'</div>':'')+
             (it.p.tip?'<div class="muted" style="margin-top:4px">📌 '+md(it.p.tip)+'</div>':'')+
             '<div class="prow"><button class="mark on" data-wrong="'+wKey(c.no,it.si,it.pi)+'">✓ 移除</button>'+
             '<button class="mark" data-sec="'+it.si+'" data-goto-ch="'+c.no+'">回原题</button></div></div>';
      });
    });
    if(!any) h += '<div class="empty">错题本是空的。<br>在「你自己做」里点一下「这题我做错了」就收进来。</div>';
    h += '</div>';
    return h;
  }

  /* ===================== 工具：不会清单（全书） ===================== */
  function toolWeak(){
    var h='<div class="card">'+
      '<div class="zone" style="margin-top:12px"><h2>不会清单 <span class="muted">全书汇总 · 半懂 + 没懂</span></h2>'+
      '<div class="muted" style="margin-bottom:10px">考前只看这一页。标记方法：在「学」里点知识清单。</div></div>';
    var any=false;
    chaps().forEach(function(c){
      var groups=[];
      (c.sections||[]).forEach(function(s,si){
        var items=(s.checklist||[]).filter(function(it){ var v=checks[ckKey(c.no,si,it.id)]; return v===0||v===1; });
        if(items.length) groups.push({s:s,si:si,items:items});
      });
      if(!groups.length) return;
      any=true;
      h += '<div class="muted" style="margin:16px 0 6px"><b>第'+c.no+'章 '+esc(c.title)+'</b></div>';
      groups.forEach(function(g){
        h += '<div style="margin:10px 0 4px;font-size:13px"><b>'+g.s.idx+' '+esc(g.s.title)+'</b></div>';
        g.items.forEach(function(it){
          var v=checks[ckKey(c.no,g.si,it.id)];
          h += '<div class="note-item"><div class="ni-h">'+(v===0?'<span class="wrong-badge">没懂</span>':'<span class="tag lv3">半懂</span>')+'</div>'+
               '<div class="ni-b">'+md(it.knowledge||it.title)+'</div></div>';
        });
      });
    });
    if(!any) h += '<div class="empty">还没有"半懂/没懂"的知识点。<br>去「学」把清单过一遍。</div>';
    h += '</div>';
    return h;
  }

  /* ===================== 工具：考前速记 ===================== */
  function toolSpeed(){
    var h='<div class="card">'+
      '<div class="zone" style="margin-top:12px"><h2>考前速记 <span class="muted">全书 · 自动聚合</span></h2>'+
      '<div class="muted">= 全书没掌握的知识点 + 错题 + 全部公式 + 易错点，按章分段</div>'+
      '<div style="margin:12px 0"><button class="btn primary" data-print>打印这一页（A4）</button></div>';

    h += '<h3 style="font-size:14px;margin:16px 0 6px">① 还没掌握的知识点</h3>';
    var anyK=false;
    chaps().forEach(function(c){
      var first=true;
      (c.sections||[]).forEach(function(s,si){
        var items=(s.checklist||[]).filter(function(it){var v=checks[ckKey(c.no,si,it.id)];return v===0||v===1;});
        if(!items.length) return;
        if(first){ h+='<div style="margin:14px 0 4px;font-size:12px;color:var(--accent);font-weight:700">第'+c.no+'章 '+esc(c.title)+'</div>'; first=false; }
        anyK=true;
        h+='<div class="muted" style="margin:8px 0 4px"><b>'+s.idx+' '+esc(s.title)+'</b></div>';
        items.forEach(function(it){ h+='<div class="note-item"><div class="ni-b">'+md(it.knowledge||it.title)+'</div></div>'; });
      });
    });
    if(!anyK) h+='<div class="muted">（还没有标记"半懂 / 没懂"的知识点）</div>';

    h += '<h3 style="font-size:14px;margin:16px 0 6px">② 错题</h3>';
    var anyW=false;
    chaps().forEach(function(c){
      var first=true;
      (c.sections||[]).forEach(function(s,si){
        (s.problems||[]).forEach(function(p,pi){
          if(!wrong[wKey(c.no,si,pi)]) return;
          if(first){ h+='<div style="margin:14px 0 4px;font-size:12px;color:var(--accent);font-weight:700">第'+c.no+'章 '+esc(c.title)+'</div>'; first=false; }
          anyW=true;
          h+='<div class="note-item"><div class="ni-h">'+s.idx+' · '+esc(p.kpt||"")+'</div><div class="ni-b">'+md(p.stem)+'</div>'+
             (p.tip?'<div class="muted" style="margin-top:4px">'+md(p.tip)+'</div>':'')+'</div>';
        });
      });
    });
    if(!anyW) h+='<div class="muted">（还没有错题）</div>';

    h += '<h3 style="font-size:14px;margin:16px 0 6px">③ 全书公式</h3>';
    chaps().forEach(function(c){
      h+='<div style="margin:14px 0 4px;font-size:12px;color:var(--accent);font-weight:700">第'+c.no+'章 '+esc(c.title)+'</div>';
      (c.sections||[]).forEach(function(s){
        (s.formulas||[]).forEach(function(f){
          h+='<div class="note-item"><div class="ni-h">'+s.idx+' '+esc(s.title)+'</div><div class="latex">$$'+esc(f.latex||"")+'$$</div></div>';
        });
      });
    });

    h += '<h3 style="font-size:14px;margin:16px 0 6px">④ 全书易错点</h3>';
    chaps().forEach(function(c){
      h+='<div style="margin:14px 0 4px;font-size:12px;color:var(--accent);font-weight:700">第'+c.no+'章 '+esc(c.title)+'</div>';
      (c.sections||[]).forEach(function(s){
        (s.explain||[]).forEach(function(b){
          if(!b.pitfall) return;
          h+='<div class="note-item"><div class="ni-h">'+s.idx+' '+esc(s.title)+'</div><div class="ni-b">'+md(b.pitfall)+'</div></div>';
        });
      });
    });
    h += '</div>';
    return h;
  }

  /* ===================== 工具：公式手册 ===================== */
  function toolFormula(){
    var h='<div class="card">'+
      '<div class="zone" style="margin-top:12px"><h2>公式手册 <span class="muted">全书 · 可复制 / 可打印</span></h2>'+
      '<div style="margin:10px 0"><button class="btn" data-print>打印公式册</button></div>';
    chaps().forEach(function(c){
      h+='<div style="margin:20px 0 8px;font-size:13px;color:var(--accent);font-weight:700">第'+c.no+'章 '+esc(c.title)+'</div>';
      (c.sections||[]).forEach(function(s,si){
        h+='<div style="margin:12px 0 8px"><b>'+s.idx+' '+esc(s.title)+'</b></div><div class="formulas">';
        (s.formulas||[]).forEach(function(f,i){
          var det=(f.from||f.uses||f.pit)?'<details><summary>展开 · 来源 / 何时用 / 易错</summary><div class="fdetail">'+
            (f.from?'<p><span class="tag">来源</span>'+esc(f.from)+'</p>':'')+
            (f.uses?'<p><span class="tag">何时用</span>'+esc(f.uses)+'</p>':'')+
            (f.pit?'<p><span class="tag">易错</span>'+esc(f.pit)+'</p>':'')+'</div></details>':'';
          h+='<div class="fcard"><div class="fbody"><div class="latex">$$'+esc(f.latex||"")+'$$</div>'+
             '<button class="copy" data-copy="'+c.no+'-'+si+'-'+i+'">复制</button></div>'+det+'</div>';
        });
        h+='</div>';
      });
    });
    h += '</div>';
    return h;
  }

  /* ===================== 工具：例题库 ===================== */
  function toolExamples(){
    var c=chap(view.ch);
    var h='<div class="card">'+
      '<div class="zone" style="margin-top:12px"><h2>例题库 <span class="muted">第'+c.no+'章 · 老师带做的例题</span></h2></div>';
    var any=false;
    (c.sections||[]).forEach(function(s){
      (s.worked||[]).forEach(function(w){
        any=true;
        h+='<div class="worked"><div class="wt">'+s.idx+' '+esc(s.title)+'</div>'+
           '<div class="stem">'+md(w.stem)+'</div>'+
           (w.first?'<div class="first">'+md(w.first)+'</div>':'')+
           (w.steps||[]).map(function(t){return '<div class="wstep">'+md(t)+'</div>';}).join("")+
           (w.take?'<div class="take">'+md(w.take)+'</div>':'')+'</div>';
      });
    });
    if(!any) h+='<div class="empty">还没有例题。</div>';
    h += '</div>';
    return h;
  }

  /* ===================== 工具：学习统计 ===================== */
  function toolStats(){
    var a=allStat();
    var pctAll=a.all?Math.round(a.good*100/a.all):0;
    var h='<div class="card">'+
      '<div class="zone" style="margin-top:12px"><h2>学习统计 <span class="muted">全书</span></h2></div>'+
      '<div style="display:flex;gap:18px;flex-wrap:wrap;margin:12px 0;font-size:13px">'+
      '<div>知识点 <b>'+a.all+'</b></div><div>已掌握 <b style="color:var(--green)">'+a.good+'</b></div>'+
      '<div>半懂 <b style="color:var(--amber)">'+a.half+'</b></div><div>没懂 <b style="color:var(--red)">'+a.bad+'</b></div>'+
      '<div>错题 <b style="color:var(--red)">'+a.wrong+'</b></div>'+
      '<div>总掌握度 <b>'+pctAll+'%</b></div></div>'+
      '<div class="pbar"><i style="width:'+pctAll+'%"></i></div>';

    chaps().forEach(function(c){
      var st=chapStat(c.no);
      var pct=st.all?Math.round(st.good*100/st.all):0;
      h+='<div style="margin:22px 0 6px;display:flex;justify-content:space-between;align-items:baseline;font-size:13.5px">'+
         '<span><b>第'+c.no+'章 '+esc(c.title)+'</b></span>'+
         '<span class="muted">'+st.good+'/'+st.all+'（'+pct+'%）'+(st.wrong?' · 错题 '+st.wrong:'')+'</span></div>'+
         '<div class="pbar"><i style="width:'+pct+'%;background:'+(st.bad?'var(--red)':st.half?'var(--amber)':'var(--green)')+'"></i></div>';
      /* 该章的窟窿：半懂/没懂/有错题的节 */
      (c.sections||[]).forEach(function(s,si){
        var sp=secStat(c.no,si);
        var w=0; (s.problems||[]).forEach(function(p,pi){ if(wrong[wKey(c.no,si,pi)]) w++; });
        if(!sp.bad && !sp.half && !w) return;
        h+='<div style="display:flex;justify-content:space-between;font-size:12px;margin:7px 0 0;padding-left:4px;border-left:2px solid var(--line)">'+
           '<span>'+s.idx+' '+esc(s.title)+'</span>'+
           '<span class="muted">'+(sp.bad?'<span style="color:var(--red)">'+sp.bad+' 没懂</span> ':'')+
           (sp.half?'<span style="color:var(--amber)">'+sp.half+' 半懂</span> ':'')+
           (w?'<span style="color:var(--red)">错题 '+w+'</span>':'')+'</span></div>';
      });
    });
    h += '</div>';
    return h;
  }

  /* ===================== 工具：章末自测 ===================== */
  function buildQuiz(){
    var c=chap(view.ch), pool=[];
    (c.sections||[]).forEach(function(s,si){
      (s.problems||[]).forEach(function(p,pi){ pool.push({si:si,pi:pi}); });
    });
    for(var i=pool.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=pool[i]; pool[i]=pool[j]; pool[j]=t; }
    quiz.list = pool.slice(0, Math.min(6, pool.length));
    quiz.revealed = false;
    quiz.endAt = Date.now() + 15*60*1000;
  }
  function toolTest(){
    var c=chap(view.ch);
    if(!quiz.list.length || quiz.ch !== view.ch) { quiz.ch = view.ch; buildQuiz(); }
    var left = Math.max(0, Math.round((quiz.endAt - Date.now())/1000));
    var mm = String(Math.floor(left/60)).padStart(2,"0"), ss = String(left%60).padStart(2,"0");
    var h='<div class="card">'+
      '<div class="zone" style="margin-top:12px"><h2>章末自测 <span class="muted">第'+c.no+'章 · 随机 '+quiz.list.length+' 题 · 15 分钟</span></h2>'+
      '<div class="muted">先盖住答案自己做，做完点「交卷」统一看详解。计时：<span class="timer" id="qz-t">'+mm+':'+ss+'</span></div>'+
      '<div style="margin:10px 0"><button class="btn primary" data-submit>'+(quiz.revealed?"已交卷（点此重做）":"交卷看答案")+'</button></div></div>';
    quiz.list.forEach(function(q,idx){
      var s=c.sections[q.si], p=s.problems[q.pi];
      h+='<div class="qz"><div class="n">第 '+(idx+1)+' 题 · '+s.idx+' '+esc(s.title)+' · '+esc(p.kpt||"")+'</div>'+
         '<div class="stem" style="margin-top:4px">'+md(p.stem)+'</div>';
      if(quiz.revealed){
        if(p.first) h+='<div class="first">'+md(p.first)+'</div>';
        if(p.sol) h+='<div class="sol">'+p.sol.map(function(t){return '<div class="step">'+md(t)+'</div>';}).join("")+'</div>';
        if(p.tip) h+='<div class="tip">'+md(p.tip)+'</div>';
        h+='<div class="prow"><button class="mark'+(wrong[wKey(c.no,q.si,q.pi)]?" on":"")+'" data-wrong="'+wKey(c.no,q.si,q.pi)+'">'+(wrong[wKey(c.no,q.si,q.pi)]?"✓ 已进错题本":"✗ 这题我做错了")+'</button></div>';
      }
      h+='</div>';
    });
    return h;
  }

  /* ===================== 术语小卡 ===================== */
  var TERMS = null, pop = null, popOpenFor = null;

  function termList(){
    if(TERMS) return TERMS;
    var g = window.GLOSSARY || [];
    TERMS = g.slice().sort(function(a,b){ return b.name.length - a.name.length; });
    return TERMS;
  }
  function curCh(){ return parseInt(view.ch,10) || 1; }

  /* 把正文里的术语包成可点的 span（每个词每页只标第一次，避免满屏下划线） */
  function markTerms(root){
    var list = termList();
    if(!list.length || !root) return;
    var seen = {};
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function(node){
        var p = node.parentNode;
        if(!p) return NodeFilter.FILTER_REJECT;
        var tag = p.nodeName ? p.nodeName.toLowerCase() : "";
        if(tag==="script"||tag==="style"||tag==="textarea"||tag==="button") return NodeFilter.FILTER_REJECT;
        if(p.closest && (p.closest(".katex")||p.closest(".term")||p.closest("#pop")||p.closest(".tabbar")||p.closest(".sitem")||p.closest(".dcard")||p.closest(".prow")||p.closest("#sidebar"))) return NodeFilter.FILTER_REJECT;
        if(!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [], n;
    while((n = walker.nextNode())) nodes.push(n);

    nodes.forEach(function(node){
      var text = node.nodeValue, idx = 0, last = 0, frag = null;
      while(idx < text.length){
        var hit = null;
        for(var k=0;k<list.length;k++){
          var t = list[k];
          if(!seen[t.id] && text.substr(idx, t.name.length) === t.name){ hit = t; break; }
        }
        if(hit){
          if(!frag) frag = document.createDocumentFragment();
          if(idx > last) frag.appendChild(document.createTextNode(text.slice(last, idx)));
          var sp = document.createElement("span");
          sp.className = "term" + ((hit.intro||1) > curCh() ? " future" : "");
          sp.setAttribute("data-t", hit.id);
          sp.title = "点一下看讲解";
          sp.textContent = hit.name;
          frag.appendChild(sp);
          seen[hit.id] = 1;
          idx += hit.name.length; last = idx;
        } else idx++;
      }
      if(frag){
        if(last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
        node.parentNode.replaceChild(frag, node);
      }
    });
  }

  function typesetIn(el){
    if(window.renderMathInElement && el){
      try{ renderMathInElement(el,{delimiters:[{left:"$$",right:"$$",display:true},{left:"$",right:"$",display:false},{left:"\\(",right:"\\)",display:false}],throwOnError:false,output:"html"}); }catch(e){}
    }
  }

  function openPop(id, anchor){
    if(!pop) pop = document.getElementById("pop");
    var g = null, all = window.GLOSSARY || [];
    for(var i=0;i<all.length;i++){ if(all[i].id===id){ g=all[i]; break; } }
    if(!g || !pop) return;
    popOpenFor = id;
    var ch = curCh();
    var h = '<div class="pop-h"><b>'+esc(g.name)+'</b><button class="pop-x" data-popclose aria-label="关闭">×</button></div><div class="pop-b">';
    if((g.intro||1) > ch){
      h += '<div class="pop-warn">这个概念要学到 <b>第 '+g.intro+' 章</b> 才讲。现在先不用管它，把这一章练熟就够了。</div>';
      h += '<div class="pop-sec"><span class="k">先记一句</span><p>'+md(g.one)+'</p></div>';
    } else {
      h += '<div class="pop-sec"><span class="k">一句话</span><p>'+md(g.one)+'</p></div>';
      h += '<div class="pop-sec"><span class="k">打个比方</span><p>'+md(g.ana)+'</p></div>';
      if(g.ex){
        h += '<div class="pop-sec"><span class="k">最小例子</span><p>'+md(g.ex.stem)+'</p>';
        if(g.ex.steps && g.ex.steps.length) h += '<ol>'+g.ex.steps.map(function(s){return '<li>'+md(s)+'</li>';}).join("")+'</ol>';
        h += '</div>';
      }
      h += '<div class="pop-sec"><span class="k">卡住点</span><p>'+md(g.pit)+'</p></div>';
      if(g.sec) h += '<span class="pop-go" data-gosec="'+g.sec+'">去「'+g.sec+'」看完整讲解 →</span>';
    }
    h += '</div>';
    pop.innerHTML = h;
    pop.classList.add("on");
    positionPop(anchor);
    typesetIn(pop);
  }
  function positionPop(anchor){
    if(!pop) return;
    if(window.innerWidth <= 850){ pop.style.left=""; pop.style.top=""; return; }
    var r = anchor.getBoundingClientRect();
    var w = 340, left = r.left + window.scrollX;
    if(left + w > window.innerWidth - 12) left = window.innerWidth - w - 12;
    if(left < 8) left = 8;
    var top = r.bottom + window.scrollY + 8;
    pop.style.left = left + "px";
    pop.style.top = top + "px";
    var h = pop.offsetHeight || 280;
    if(r.bottom + h + 24 > window.innerHeight){
      var up = r.top + window.scrollY - h - 8;
      if(up > window.scrollY + 8) pop.style.top = up + "px";
    }
  }
  function closePop(){
    if(!pop) pop = document.getElementById("pop");
    if(pop){ pop.classList.remove("on"); pop.innerHTML=""; }
    popOpenFor = null;
  }
  function jumpSec(idx){
    var c = chap(view.ch); if(!c) return;
    for(var i=0;i<(c.sections||[]).length;i++){
      if(c.sections[i].idx === idx){
        view.page="section"; view.si=i; view.tab="learn"; view.tool=null;
        saveView(); closePop(); render(); window.scrollTo(0,0); return;
      }
    }
  }

  /* ===================== 移动端底部导航 ===================== */
  function renderMobnav(){
    var nav = document.getElementById("mobnav");
    if(!nav) return;
    var a = allStat();
    var wN = a.wrong, wkN = a.bad + a.half;
    var items = [
      { ic:'🏠', tx:'面板', on:(view.page==="home"), attrs:'data-dash="home"' },
      { ic:'📚', tx:'目录', on:(view.page==="chapters"||view.page==="chapter"||view.page==="section"), attrs:'data-dash="chapters"' },
      { ic:'❌', tx:'错题', on:(view.page==="tool"&&view.tool==="wrong"), attrs:'data-tool="wrong"', n:wN },
      { ic:'🎯', tx:'不会', on:(view.page==="tool"&&view.tool==="weak"), attrs:'data-tool="weak"', n:wkN },
      { ic:'⚡', tx:'速记', on:(view.page==="tool"&&view.tool==="speed"), attrs:'data-tool="speed"' }
    ];
    nav.innerHTML = items.map(function(x){
      return '<button class="'+(x.on?"on":"")+'" '+x.attrs+'>'+
             '<span class="mi">'+x.ic+(x.n?'<span class="mb">'+x.n+'</span>':'')+'</span>'+
             '<span>'+x.tx+'</span></button>';
    }).join("");
  }

  /* ===================== 主渲染 ===================== */
  function render(){
    var h = "";
    if(view.page!=="home"){
      h += '<div class="backrow"><button class="btn" data-back>‹ 返回上一页</button>'+
           '<span class="muted">'+(navStack.length?"回到刚才那一页":"回到上一级")+'</span></div>';
    }
    if(view.page==="home") h += paneDash();
    else if(view.page==="chapters") h += paneChapters();
    else if(view.page==="chapter") h += paneChapter();
    else if(view.page==="section") h += paneSection();
    else if(view.page==="tool"){
      if(view.tool==="wrong") h+=toolWrong();
      else if(view.tool==="weak") h+=toolWeak();
      else if(view.tool==="speed") h+=toolSpeed();
      else if(view.tool==="formula") h+=toolFormula();
      else if(view.tool==="examples") h+=toolExamples();
      else if(view.tool==="stats") h+=toolStats();
      else if(view.tool==="test") h+=toolTest();
      else h += paneDash();
    }
    else h += paneDash();
    main.innerHTML = h;
    renderSidebar();
    renderMobnav();
    typeset();
    closePop();
    markTerms(main);
    if(view.page==="tool" && view.tool==="test") startTimer();
  }

  function startTimer(){
    if(quiz.timer) clearInterval(quiz.timer);
    var el = document.getElementById("qz-t");
    if(!el || quiz.revealed) return;
    quiz.timer = setInterval(function(){
      var left = Math.max(0, Math.round((quiz.endAt - Date.now())/1000));
      var e2 = document.getElementById("qz-t");
      if(!e2){ clearInterval(quiz.timer); quiz.timer=null; return; }
      e2.textContent = String(Math.floor(left/60)).padStart(2,"0")+":"+String(left%60).padStart(2,"0");
      if(left<=0){ clearInterval(quiz.timer); quiz.timer=null; quiz.revealed=true; render(); }
    }, 1000);
  }

  /* ===================== KaTeX ===================== */
  function typeset(){
    if(window.renderMathInElement){
      try{
        renderMathInElement(document.body,{delimiters:[{left:"$$",right:"$$",display:true},{left:"$",right:"$",display:false},{left:"\\(",right:"\\)",display:false}],throwOnError:false,output:"html"});
        return;
      }catch(e){}
    }
    var ns=document.querySelectorAll(".latex");
    for(var i=0;i<ns.length;i++){
      var t=ns[i].textContent;
      if(t.slice(0,2)==="$$"&&t.slice(-2)==="$$"&&t.length>4) t=t.slice(2,-2);
      ns[i].style.fontFamily="Consolas,monospace"; ns[i].style.fontSize="13px"; ns[i].textContent=t;
    }
  }

  /* ===================== 事件 ===================== */
  document.addEventListener("click", function(ev){
    var t=ev.target; if(!t||!t.closest) return;

    if(t.closest("[data-side-toggle]")){ sidebar.classList.toggle("open"); return; }

    /* 术语小卡 */
    var termEl = t.closest(".term");
    if(termEl){ openPop(termEl.getAttribute("data-t"), termEl); return; }
    if(t.closest("[data-popclose]")){ closePop(); return; }
    var goSec = t.closest("[data-gosec]");
    if(goSec){ jumpSec(goSec.getAttribute("data-gosec")); return; }
    if(pop && pop.classList.contains("on") && !t.closest("#pop")){ closePop(); }

    if(t.closest("[data-back]")){ if(!goBack()) goParent(); return; }

    var dash=t.closest("[data-dash]");
    if(dash){
      var d=dash.dataset.dash;
      pushNav();
      if(d==="home"){ view.page="home"; view.tool=null; }
      else if(d==="chapters"){ view.page="chapters"; }
      else if(d==="chapter"){ view.page="chapter"; view.si=null; }
      saveView(); sidebar.classList.remove("open"); render(); window.scrollTo(0,0); return;
    }

    var tool=t.closest("[data-tool]");
    if(tool){ pushNav(); view.page="tool"; view.tool=tool.dataset.tool; if(view.tool==="test"){ quiz.ch=null; quiz.list=[]; } saveView(); sidebar.classList.remove("open"); render(); window.scrollTo(0,0); return; }

    var chBtn=t.closest("[data-ch]");
    if(chBtn){
      var needCh = chBtn.dataset.gotoCh;
      pushNav();
      view.ch = needCh || chBtn.dataset.ch;
      view.page = "chapter";
      view.si=null; view.tool=null;
      saveView(); sidebar.classList.remove("open"); render(); window.scrollTo(0,0); return;
    }

    var secBtn=t.closest("[data-sec]");
    if(secBtn){
      var sc = secBtn.dataset.gotoCh;
      pushNav();
      if(sc) view.ch = sc;
      view.si=parseInt(secBtn.dataset.sec,10); view.page="section"; view.tab="learn"; view.tool=null;
      saveView(); sidebar.classList.remove("open"); render(); window.scrollTo(0,0); return;
    }

    var tabBtn=t.closest("[data-tab]");
    if(tabBtn){ pushNav(); view.tab=tabBtn.dataset.tab; saveView(); render(); window.scrollTo(0,0); return; }

    var ck=t.closest("[data-ck]");
    if(ck){ var k=ck.dataset.ck, cur=checks[k];
      checks[k]=(cur===undefined||cur===null)?2:(cur===2?1:(cur===1?0:2));
      saveChecks(); render(); return; }

    var wb=t.closest("[data-wrong]");
    if(wb){ var wk=wb.dataset.wrong; wrong[wk]=!wrong[wk]; saveWrong(); render(); return; }

    var qb=t.closest(".qbtn");
    if(qb){ var qc=qb.closest(".qc"); if(qc) qc.classList.toggle("show"); return; }

    var sub=t.closest("[data-submit]");
    if(sub){ if(quiz.revealed){ buildQuiz(); } else { quiz.revealed=true; if(quiz.timer){clearInterval(quiz.timer);quiz.timer=null;} } render(); return; }

    var cp=t.closest(".copy");
    if(cp){
      var parts=cp.dataset.copy.split("-"), no2=parts[0], si2=parseInt(parts[1],10), fi=parseInt(parts[2],10);
      var sec2=secOf(no2,si2), f=(sec2&&sec2.formulas)?sec2.formulas[fi]:null, txt=f?(f.latex||""):"";
      var ok=function(){ cp.textContent="已复制"; setTimeout(function(){cp.textContent="复制";},1200); };
      if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(txt).then(ok,function(){prompt("复制公式",txt);}); }
      else prompt("复制公式",txt);
      return;
    }

    if(t.closest("[data-print]")){ window.print(); return; }
    if(t.closest("#toTop")){ window.scrollTo({top:0,behavior:"smooth"}); return; }

    /* 导出进度 */
    var exBtn = t.closest("[data-export]");
    if(exBtn){
      var data = { app:"gaoshu", version:1, exportedAt:new Date().toISOString(), check:sget(LS_CHECK), wrong:sget(LS_WRONG) };
      var blob = new Blob([JSON.stringify(data,null,2)], {type:"application/json"});
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "高数进度-" + (new Date().toISOString().slice(0,10)) + ".json";
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function(){ URL.revokeObjectURL(a.href); }, 1500);
      exBtn.textContent = "已导出"; setTimeout(function(){ exBtn.textContent = "⬇ 导出进度"; }, 1500);
      return;
    }

    /* 导入进度 */
    var imBtn = t.closest("[data-import]");
    if(imBtn){
      var fi = document.getElementById("importFile");
      if(!fi) return;
      fi.onchange = function(){
        var file = fi.files && fi.files[0];
        if(!file){ return; }
        var rd = new FileReader();
        rd.onload = function(){
          try {
            var d = JSON.parse(rd.result);
            if(!d || d.app !== "gaoshu"){ alert("这不是高数工具的进度文件，请确认选对了。"); return; }
            var n = 0;
            if(d.check != null){ sset(LS_CHECK, String(d.check)); checks = JSON.parse(d.check||"{}"); n++; }
            if(d.wrong != null){ sset(LS_WRONG, String(d.wrong)); wrong = JSON.parse(d.wrong||"{}"); n++; }
            alert("导入成功（恢复了 " + n + " 类数据）。"); render(); window.scrollTo(0,0);
          } catch(e){ alert("导入失败：文件格式不对。" + e.message); }
        };
        rd.readAsText(file);
        fi.value = "";
      };
      fi.click();
      return;
    }
  });

  document.addEventListener("keydown", function(ev){
    if(ev.key === "Escape"){ closePop(); }
    var el=ev.target; if(!el||!el.closest) return;
    var ck=el.closest(".ck");
    if(ck&&(ev.key===" "||ev.key==="Enter")){ ev.preventDefault(); ck.click(); }
  });

  var toTop=document.getElementById("toTop");
  window.addEventListener("scroll", function(){ toTop.classList.toggle("show", window.scrollY>400); });

  render();
  window.addEventListener("load", function(){ if(window.renderMathInElement) typeset(); });
})();
