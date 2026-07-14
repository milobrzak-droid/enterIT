/* ===== Vibe layer — živá konstelace částic + glow za kurzorem =====
   Dává webu pohyb a „život". Respektuje prefers-reduced-motion. */
(function(){
  var RM = window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var touch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  /* --- glow za kurzorem --- */
  var glow = document.getElementById('cursorGlow');
  if (glow && !touch) {
    var gx = window.innerWidth/2, gy = window.innerHeight/2, cx = gx, cy = gy;
    window.addEventListener('pointermove', function(e){ gx = e.clientX; gy = e.clientY; glow.style.opacity = '1'; }, {passive:true});
    (function follow(){ cx += (gx-cx)*0.12; cy += (gy-cy)*0.12; glow.style.transform = 'translate('+cx+'px,'+cy+'px)'; requestAnimationFrame(follow); })();
  }

  /* --- konstelace částic --- */
  var c = document.getElementById('vibeCanvas');
  if (!c || RM) return;
  var ctx = c.getContext('2d');
  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var COL = [[65,227,158],[110,206,255],[183,144,255],[227,153,255]];
  var W, H, N, pts = [], mx = -9999, my = -9999;

  function resize(){
    W = c.width = Math.floor(window.innerWidth * DPR);
    H = c.height = Math.floor(window.innerHeight * DPR);
    c.style.width = window.innerWidth + 'px';
    c.style.height = window.innerHeight + 'px';
    N = Math.max(18, Math.min(56, Math.floor(window.innerWidth * window.innerHeight / 28000)));
    build();
  }
  function build(){
    pts = [];
    for (var i=0;i<N;i++){
      pts.push({ x:Math.random()*W, y:Math.random()*H,
        vx:(Math.random()-.5)*0.28*DPR, vy:(Math.random()-.5)*0.28*DPR,
        r:(Math.random()*1.7+0.6)*DPR, c:COL[i % COL.length] });
    }
  }
  if (!touch) window.addEventListener('pointermove', function(e){ mx = e.clientX*DPR; my = e.clientY*DPR; }, {passive:true});

  var MAXD = 118*DPR, MAXD2 = MAXD*MAXD, MOUSE2 = (150*DPR)*(150*DPR);
  function frame(){
    if (document.hidden){ requestAnimationFrame(frame); return; }
    ctx.clearRect(0,0,W,H);
    var i,j,p,a,b,dx,dy,d,o;
    for (i=0;i<pts.length;i++){
      p = pts[i];
      // jemné přitahování ke kurzoru
      dx = mx - p.x; dy = my - p.y; d = dx*dx + dy*dy;
      if (d < MOUSE2 && d > 1){ var f = (1 - d/MOUSE2)*0.014; p.vx += dx/Math.sqrt(d)*f; p.vy += dy/Math.sqrt(d)*f; }
      p.vx *= 0.985; p.vy *= 0.985;
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; else if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; else if (p.y > H) p.y = 0;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832);
      ctx.fillStyle = 'rgba('+p.c[0]+','+p.c[1]+','+p.c[2]+',.38)'; ctx.fill();
    }
    for (i=0;i<pts.length;i++){
      for (j=i+1;j<pts.length;j++){
        a = pts[i]; b = pts[j]; dx = a.x-b.x; dy = a.y-b.y; d = dx*dx + dy*dy;
        if (d < MAXD2){
          o = (1 - d/MAXD2) * 0.09;
          ctx.strokeStyle = 'rgba('+a.c[0]+','+a.c[1]+','+a.c[2]+','+o.toFixed(3)+')';
          ctx.lineWidth = DPR*0.6;
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
        }
      }
    }
    requestAnimationFrame(frame);
  }
  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(frame);
})();
