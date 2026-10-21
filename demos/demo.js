/* Reality Sourcing: small self-running experiment demos. Canvas only, no media files. */
(function(){
const PAL=Object.assign({a:'#f6a640',b:'#b8461c',hi:'#ffe6b8',bg0:'#0a0604',bg1:'#2b1607'},window.DEMO_PAL||{});
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const css=`#demo{position:fixed;inset:0;z-index:20;display:flex;align-items:center;justify-content:center;background:#000b;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);opacity:0;pointer-events:none;transition:opacity .3s;padding:12px;touch-action:manipulation}
#demo.on{opacity:1;pointer-events:auto}
#demo .dm-box{width:min(760px,100%);background:linear-gradient(170deg,${PAL.bg1}ee,${PAL.bg0}f5);border:1px solid ${PAL.a}55;border-radius:20px;padding:14px;box-shadow:0 0 60px ${PAL.a}22,0 20px 60px #000c}
#demo .dm-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
#demo .dm-k{font:600 11px/1 -apple-system,system-ui,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:${PAL.a}}
#demo .dm-t{font:17px/1.2 'Instrument Serif',Georgia,serif;color:${PAL.hi};margin-top:4px}
#demo button{font:14px -apple-system,system-ui,sans-serif;color:${PAL.hi};background:#0006;border:1px solid ${PAL.a}77;border-radius:20px;height:38px;padding:0 16px;cursor:pointer}
#demo .dm-x{width:38px;padding:0}
#demo .dm-stage{position:relative;width:100%;aspect-ratio:16/10;border-radius:14px;overflow:hidden;background:${PAL.bg0}}
#demo canvas{position:absolute;inset:0;width:100%;height:100%;display:block}
#demo .dm-hint{position:absolute;left:0;right:0;bottom:10px;text-align:center;font:600 12px -apple-system,system-ui,sans-serif;letter-spacing:.06em;color:${PAL.hi};opacity:0;transition:opacity .4s;pointer-events:none}
#demo .dm-hint.on{opacity:.85}
#demo .dm-cap{min-height:3.2em;margin:12px 4px 8px;font:21px/1.3 'Instrument Serif',Georgia,serif;color:#fff;transition:opacity .35s}
#demo .dm-cap.fade{opacity:0}
#demo .dm-bar{height:3px;background:#ffffff1a;border-radius:2px;overflow:hidden}#demo .dm-bar i{display:block;height:100%;width:0;background:${PAL.a}}
#demo .dm-ctl{display:flex;gap:8px;margin-top:12px;flex-wrap:wrap}#demo .dm-done{margin-left:auto}
@media(max-width:500px){#demo .dm-cap{font-size:19px}#demo button{height:36px;padding:0 13px;font-size:13px}}`;
let el,cv,ctx,capEl,bar,hintEl,pBtn,D=null,S={},t=0,playing=false,last=0,capI=-1,raf=0,dpr=1;const W=800,H=500;
function build(){
 const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
 el=document.createElement('div');el.id='demo';el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');
 el.innerHTML='<div class="dm-box"><div class="dm-top"><div><div class="dm-k">Play the experiment</div><div class="dm-t"></div></div><button class="dm-x" aria-label="Close">✕</button></div><div class="dm-stage"><canvas></canvas><div class="dm-hint"></div></div><div class="dm-cap" aria-live="polite"></div><div class="dm-bar"><i></i></div><div class="dm-ctl"><button class="dm-p">Pause</button><button class="dm-r">Replay</button><button class="dm-done">Back to the walk</button></div></div>';
 document.body.appendChild(el);cv=el.querySelector('canvas');ctx=cv.getContext('2d');capEl=el.querySelector('.dm-cap');bar=el.querySelector('.dm-bar i');hintEl=el.querySelector('.dm-hint');pBtn=el.querySelector('.dm-p');
 el.querySelector('.dm-x').onclick=close;el.querySelector('.dm-done').onclick=close;el.querySelector('.dm-r').onclick=()=>start();
 pBtn.onclick=()=>{if(t>=D.dur){start();return}playing=!playing;pBtn.textContent=playing?'Pause':'Play';if(playing){last=performance.now();loop()}};
 el.addEventListener('click',e=>{if(e.target===el)close()});
 cv.addEventListener('pointerdown',e=>{if(!D||!D.tap)return;const r=cv.getBoundingClientRect();D.tap(S,t,(e.clientX-r.left)/r.width*W,(e.clientY-r.top)/r.height*H);if(!playing)frame()});
 addEventListener('keydown',e=>{if(!window.__demoOpen)return;if(e.key==='Escape')close();if(e.key===' '){pBtn.click();e.preventDefault()}e.stopImmediatePropagation()},true);
 addEventListener('resize',()=>{if(window.__demoOpen){size();frame()}});
}
function size(){dpr=Math.min(devicePixelRatio||1,2);const r=cv.getBoundingClientRect();cv.width=Math.round(r.width*dpr);cv.height=Math.round(r.height*dpr);G.k=Math.min(1.8,Math.max(1,520/Math.max(1,r.width)))}
function start(){S={};D.init&&D.init(S);t=0;capI=-1;playing=true;pBtn.textContent='Pause';el.dataset.ended='';last=performance.now();cancelAnimationFrame(raf);loop()}
function setCap(){let i=-1;D.caps.forEach((c,j)=>{if(t>=c[0])i=j});if(i!==capI){capI=i;capEl.classList.add('fade');setTimeout(()=>{capEl.textContent=i>=0?D.caps[i][1]:'';capEl.classList.remove('fade')},180)}
 hintEl.textContent=D.hint||'';hintEl.classList.toggle('on',!!D.hint&&t>(D.hintAt||0))}
function frame(){ctx.setTransform(cv.width/W,0,0,cv.height/H,0,0);G.t=t;
 const g=ctx.createRadialGradient(W/2,H*.45,20,W/2,H/2,W*.7);g.addColorStop(0,PAL.bg1);g.addColorStop(1,PAL.bg0);ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
 D.draw(G,t,S);setCap();bar.style.width=Math.min(100,t/D.dur*100)+'%'}
let rmNext=0;
function loop(){if(!playing)return;const now=performance.now(),sp=window.__demoSpeed||1;
 if(RM){ // reduced motion: hold still frames, step every 3.5s
  if(now>=rmNext){const steps=D.caps.map(c=>c[0]+1.6).concat([D.dur]);t=steps.find(s=>s>t+.01)??D.dur;rmNext=now+3500/sp;frame()}
 }else{t=Math.min(D.dur,t+Math.min(.05,(now-last)/1000)*sp);frame()}
 last=now;
 if(t>=D.dur){playing=false;pBtn.textContent='Play again';el.dataset.ended='1';frame();return}
 raf=requestAnimationFrame(loop)}
function open(n,title){const all=window.DEMOS||{};D=all[n];if(!D)return;if(!el)build();el.querySelector('.dm-t').textContent=title||'';
 window.__demoOpen=true;el.classList.add('on');size();rmNext=0;start()}
function close(){playing=false;cancelAnimationFrame(raf);window.__demoOpen=false;el.classList.remove('on');D=null}
/* drawing helpers, logical canvas 800x500 */
const G={W,H,P:PAL,k:1,get c(){return ctx},
 clamp:(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),lerp:(a,b,x)=>a+(b-a)*x,
 ease:x=>{x=Math.max(0,Math.min(1,x));return x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2},
 win(t,a,b,f=.6){return G.clamp((t-a)/f)*G.clamp((b-t)/f)},
 ramp(t,a,b){return G.ease((t-a)/(b-a))},
 glow(x,y,r,col,al=1){const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,G.rgba(col,al));g.addColorStop(1,G.rgba(col,0));ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill()},
 dot(x,y,r,col,al=1){ctx.fillStyle=G.rgba(col,al);ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill()},
 ring(x,y,r,col,w=2,al=1){ctx.strokeStyle=G.rgba(col,al);ctx.lineWidth=w;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.stroke()},
 line(x1,y1,x2,y2,col,w=2,al=1,dash){ctx.strokeStyle=G.rgba(col,al);ctx.lineWidth=w;ctx.lineCap='round';ctx.setLineDash(dash||[]);ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();ctx.setLineDash([])},
 path(pts,col,w=2,al=1){ctx.strokeStyle=G.rgba(col,al);ctx.lineWidth=w;ctx.lineJoin=ctx.lineCap='round';ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.stroke()},
 rr(x,y,w,h,r,fill,stroke,al=1,lw=2){ctx.beginPath();ctx.roundRect?ctx.roundRect(x,y,w,h,r):ctx.rect(x,y,w,h);if(fill){ctx.fillStyle=G.rgba(fill,al);ctx.fill()}if(stroke){ctx.strokeStyle=G.rgba(stroke,al);ctx.lineWidth=lw;ctx.stroke()}},
 text(s,x,y,o={}){ctx.globalAlpha=o.al??1;ctx.fillStyle=o.col||PAL.hi;ctx.textAlign=o.align||'center';ctx.textBaseline='middle';const z=(o.size||(o.serif?30:15))*(o.serif?Math.min(G.k,1.3):G.k);ctx.font=o.serif?`${z}px 'Instrument Serif',Georgia,serif`:`${o.w||600} ${z}px -apple-system,system-ui,sans-serif`;ctx.fillText(s,x,y);ctx.globalAlpha=1},
 arrow(x1,y1,x2,y2,col,w=3,al=1){G.line(x1,y1,x2,y2,col,w,al);const a=Math.atan2(y2-y1,x2-x1),s=12;ctx.fillStyle=G.rgba(col,al);ctx.beginPath();ctx.moveTo(x2,y2);ctx.lineTo(x2-s*Math.cos(a-.45),y2-s*Math.sin(a-.45));ctx.lineTo(x2-s*Math.cos(a+.45),y2-s*Math.sin(a+.45));ctx.fill()},
 // spike trace: times = array of spike times (s), drawn across [x,x+w] showing window [t-span,t]
 trace(x,y,w,times,t,span,col,label){G.line(x,y,x+w,y,col,1.5,.35);for(const s of times){if(s>t||s<t-span)continue;const px=x+w*(1-(t-s)/span);G.line(px,y,px,y-34,col,2.5,1);G.glow(px,y-30,10,col,.5)}if(label)G.text(label,x-12,y-14,{align:'right',size:13,col:PAL.hi,al:.8})},
 rgba(hex,a){if(hex.startsWith('rgba'))return hex;const n=parseInt(hex.slice(1),16);return `rgba(${n>>16&255},${n>>8&255},${n&255},${a})`},
 rnd(seed){let s=seed;return()=>(s=(s*16807)%2147483647)/2147483647}
};
window.Demo={open,close,G};
})();
