/* ============================================================
   enterit-fx.js — vlastní vizuální engine pro enterit.cz
   (nezávislý na enterai app.js). Síťové pozadí + kurzor glow +
   count-up čísel + hover na hero flow. Respektuje reduced-motion.
   ============================================================ */
(function(){
  'use strict';
  var RM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1) Síťové pozadí na #vibeCanvas ---------- */
  (function network(){
    var cv = document.getElementById('vibeCanvas');
    if(!cv) return;
    var ctx = cv.getContext('2d');
    var W=0,H=0,DPR=Math.min(window.devicePixelRatio||1,2);
    var nodes=[], mouse={x:-9999,y:-9999,active:false};
    var AZURE='61,198,242', VIOLET='155,124,255', INDIGO='124,139,255';
    function palette(i){ return [AZURE,VIOLET,INDIGO][i%3]; }
    function resize(){
      // .vibe-canvas je position:fixed inset:0 → clientWidth je spolehlivá šířka viewportu
      // i když window.innerWidth v některých prostředích glitchne na 0
      W=cv.clientWidth||window.innerWidth||document.documentElement.clientWidth||1280;
      H=cv.clientHeight||window.innerHeight||document.documentElement.clientHeight||800;
      cv.width=Math.round(W*DPR); cv.height=Math.round(H*DPR); ctx.setTransform(DPR,0,0,DPR,0,0);
      var target=Math.min(72, Math.round(W*H/26000));
      nodes=[];
      for(var i=0;i<target;i++){
        nodes.push({x:Math.random()*W,y:Math.random()*H,
          vx:(Math.random()-.5)*0.22,vy:(Math.random()-.5)*0.22,
          r:Math.random()*1.6+0.8,c:palette(i)});
      }
    }
    var DIST=148, DIST2=DIST*DIST, MDIST=190, MDIST2=MDIST*MDIST;
    function frame(){
      ctx.clearRect(0,0,W,H);
      for(var i=0;i<nodes.length;i++){
        var n=nodes[i];
        if(!RM){ n.x+=n.vx; n.y+=n.vy; }
        if(n.x< -20)n.x=W+20; if(n.x>W+20)n.x=-20;
        if(n.y< -20)n.y=H+20; if(n.y>H+20)n.y=-20;
        // spoje k sousedům
        for(var j=i+1;j<nodes.length;j++){
          var m=nodes[j], dx=n.x-m.x, dy=n.y-m.y, d2=dx*dx+dy*dy;
          if(d2<DIST2){
            var a=(1-d2/DIST2)*0.16;
            ctx.strokeStyle='rgba('+n.c+','+a+')';
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();
          }
        }
        // spoj ke kurzoru (hratelnost)
        if(mouse.active){
          var mx=n.x-mouse.x, my=n.y-mouse.y, md2=mx*mx+my*my;
          if(md2<MDIST2){
            var ma=(1-md2/MDIST2)*0.5;
            ctx.strokeStyle='rgba('+n.c+','+ma+')';
            ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(mouse.x,mouse.y);ctx.stroke();
          }
        }
        // uzel
        ctx.fillStyle='rgba('+n.c+',0.85)';
        ctx.beginPath();ctx.arc(n.x,n.y,n.r,0,6.2832);ctx.fill();
      }
      raf=requestAnimationFrame(frame);
    }
    var raf=null;
    window.addEventListener('resize',resize);
    window.addEventListener('load',resize);
    window.addEventListener('mousemove',function(e){mouse.x=e.clientX;mouse.y=e.clientY;mouse.active=true;});
    window.addEventListener('mouseout',function(){mouse.active=false;});
    resize();
    if(!W||!H){ var tries=0,iv=setInterval(function(){resize();if((W&&H)||++tries>20)clearInterval(iv);},80); }
    if(RM){ frame=function(){ctx.clearRect(0,0,W,H);for(var i=0;i<nodes.length;i++){var n=nodes[i];ctx.fillStyle='rgba('+n.c+',0.7)';ctx.beginPath();ctx.arc(n.x,n.y,n.r,0,6.2832);ctx.fill();}}; frame(); return; }
    raf=requestAnimationFrame(frame);
  })();

  /* ---------- 2) Kurzor glow ---------- */
  (function cursor(){
    var g=document.getElementById('cursorGlow');
    if(!g||RM||!matchMedia('(pointer:fine)').matches) return;
    var x=window.innerWidth/2,y=window.innerHeight/2,tx=x,ty=y;
    window.addEventListener('mousemove',function(e){tx=e.clientX;ty=e.clientY;});
    (function loop(){ x+=(tx-x)*0.12; y+=(ty-y)*0.12; g.style.transform='translate('+x+'px,'+y+'px)'; requestAnimationFrame(loop); })();
  })();

  /* ---------- 3) Count-up čísel (data-count) ---------- */
  function countUp(el){
    if(el.dataset.done) return; el.dataset.done='1';
    var raw=el.getAttribute('data-count'), target=parseFloat(raw.replace(/[^0-9.\-]/g,'')),
        pre=el.getAttribute('data-pre')||'', suf=el.getAttribute('data-suf')||'', dur=1100, start=null;
    if(RM){ el.textContent=pre+raw+suf; return; }
    function fmt(n){var s=Math.round(n).toString();return s.replace(/\B(?=(\d{3})+(?!\d))/g,' ');}
    function step(ts){ if(!start)start=ts; var p=Math.min((ts-start)/dur,1),e=1-Math.pow(1-p,3);
      el.textContent=pre+fmt(target*e)+suf; if(p<1)requestAnimationFrame(step); else el.textContent=pre+raw+suf; }
    requestAnimationFrame(step);
  }
  function scanCounts(root){
    var els=(root||document).querySelectorAll('[data-count]:not([data-done])'), vh=window.innerHeight||800;
    els.forEach(function(el){ var r=el.getBoundingClientRect(); if(r.top<vh*0.92&&r.bottom>0) countUp(el); });
  }
  window.addEventListener('scroll',function(){scanCounts(document.querySelector('.view.active'));},{passive:true});
  window.addEventListener('hashchange',function(){setTimeout(function(){scanCounts(document.querySelector('.view.active'));},120);});
  window.addEventListener('load',function(){setTimeout(function(){scanCounts(document.querySelector('.view.active'));},300);});
  setTimeout(function(){scanCounts(document.querySelector('.view.active'));},500);

  /* ---------- 4) Hero flow — hover na uzel rozsvítí cestu ---------- */
  (function flow(){
    var svg=document.getElementById('eitFlow');
    if(!svg) return;
    svg.querySelectorAll('[data-node]').forEach(function(node){
      node.addEventListener('mouseenter',function(){
        var id=node.getAttribute('data-node');
        svg.querySelectorAll('[data-edge]').forEach(function(p){
          if(p.getAttribute('data-edge').indexOf(id)>-1) p.classList.add('lit');
        });
        node.classList.add('lit');
      });
      node.addEventListener('mouseleave',function(){
        svg.querySelectorAll('.lit').forEach(function(p){p.classList.remove('lit');});
      });
    });
  })();
})();
