/* Reality Sourcing: self-running experiment demos. Canvas only, no network. Painted scenes live in demos/img. */
(function(){
const PAL=Object.assign({a:'#f6a640',b:'#b8461c',hi:'#ffe6b8',bg0:'#0a0604',bg1:'#2b1607'},window.DEMO_PAL||{});
const BASE=(document.currentScript&&document.currentScript.src||'').replace(/demo\.js.*$/,'');const PICS={};
function pic(n){let i=PICS[n];if(!i){i=new Image();i.decoding='async';i.onload=()=>{i.ok=1;if(window.__demoOpen&&!playing)frame(1)};i.src=BASE+'img/'+n+'.webp';PICS[n]=i}return i.ok?i:null}
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const IC={prev:'<svg viewBox="0 0 24 24"><path d="M15.5 5 8.5 12l7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',next:'<svg viewBox="0 0 24 24"><path d="m8.5 5 7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',play:'<svg viewBox="0 0 24 24"><path d="M8 5l11 7-11 7z"/></svg>',pause:'<svg viewBox="0 0 24 24"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/></svg>',
 replay:'<svg viewBox="0 0 24 24"><path d="M12 5V2L7 6.5 12 11V7.5a5.5 5.5 0 1 1-5.5 5.5H4a8 8 0 1 0 8-8z"/></svg>',
 son:'<svg viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
 soff:'<svg viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16.5 9.5l5 5M21.5 9.5l-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'};
const css=`#demo{position:fixed;inset:0;z-index:20;display:flex;align-items:center;justify-content:center;background:#000c;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);opacity:0;pointer-events:none;transition:opacity .3s;padding:8px;touch-action:manipulation}
#demo.on{opacity:1;pointer-events:auto}
#demo .dm-box{display:grid;grid-template-columns:100%;grid-template-areas:"top" "stage" "cap" "bar" "ctl";width:min(560px,100%);max-height:100%;background:linear-gradient(170deg,${PAL.bg1},${PAL.bg0});border:1px solid ${PAL.a}44;border-radius:22px;padding:10px 10px 12px;box-shadow:0 0 80px ${PAL.a}26,0 24px 70px #000d}
#demo .dm-top{grid-area:top;display:flex;justify-content:space-between;align-items:center;gap:10px;margin:0 2px 8px}
#demo .dm-k{font:600 12px/1 -apple-system,system-ui,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:${PAL.a}}
#demo .dm-t{font:20px/1.15 'Instrument Serif',Georgia,serif;color:${PAL.hi};margin-top:4px}
#demo button{font:15px -apple-system,system-ui,sans-serif;color:${PAL.hi};background:#ffffff10;border:1px solid ${PAL.a}66;border-radius:22px;height:44px;min-width:44px;padding:0 16px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:6px;flex:none}
#demo button svg{width:22px;height:22px;fill:currentColor}
#demo .dm-i{width:44px;padding:0}
#demo [hidden]{display:none!important}
#demo .dm-yr{display:inline-block;font:400 30px/1 'Instrument Serif',Georgia,serif;letter-spacing:0;text-transform:none;color:#c2410c;margin-right:10px;vertical-align:-6px}#demo .dm-yr:empty{display:none}
#demo .dm-tx{overflow-y:auto;min-height:0}@media(max-width:899px),(max-aspect-ratio:1/1){#demo .dm-cap.long{font-size:16px;line-height:1.34}#demo .dm-cap.xlong{font-size:15px;line-height:1.3}}
#demo .dm-poster{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;pointer-events:none;transition:opacity .7s;z-index:2}#demo .dm-poster.on{opacity:1;pointer-events:auto;cursor:pointer}
#demo .dm-stage{grid-area:stage;position:relative;width:min(100%,calc((100vh - 370px) * .75));width:min(100%,calc((100dvh - 370px) * .75));aspect-ratio:3/4;margin:0 auto;border-radius:16px;overflow:hidden;background:${PAL.bg0};box-shadow:inset 0 0 0 1px #ffffff14}
#demo canvas{position:absolute;inset:0;width:100%;height:100%;display:block}
#demo .dm-hint{position:absolute;left:0;right:0;top:12px;text-align:center;font:600 14px -apple-system,system-ui,sans-serif;color:#fff;opacity:0;transition:opacity .4s;pointer-events:none;text-shadow:0 1px 8px #000}
#demo .dm-hint.on{opacity:.92}
#demo .dm-cap{grid-area:cap;height:9.9em;margin:8px 2px 4px;font:18px/1.38 -apple-system,system-ui,sans-serif;color:#fff;text-align:left;cursor:pointer;overflow:hidden;display:flex;flex-direction:column;-webkit-tap-highlight-color:transparent}
#demo .dm-ck{display:flex;justify-content:space-between;align-items:baseline;gap:8px;font:700 14px/1.2 -apple-system,system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:${PAL.a};margin-bottom:5px}
#demo .dm-n{font-weight:500;letter-spacing:.02em;text-transform:none;color:#ffffffa0;white-space:nowrap}
#demo .dm-tx,#demo .dm-lab{transition:opacity .3s}#demo .dm-cap.fade .dm-tx,#demo .dm-cap.fade .dm-lab{opacity:0}
#demo .dm-cap[data-k="N"] .dm-lab{color:#9fd0ff}
#demo .dm-bar{grid-area:bar;height:3px;background:#ffffff1a;border-radius:2px;overflow:hidden}#demo .dm-bar i{display:block;height:100%;width:0;background:${PAL.a}}
#demo .dm-ctl{grid-area:ctl;display:flex;gap:8px;margin-top:10px;align-items:center}#demo .dm-done{margin-left:auto}
#demo .dm-s[aria-pressed="true"]{background:${PAL.a};color:${PAL.bg0};border-color:${PAL.a}}
@media(min-width:900px) and (min-aspect-ratio:1/1){#demo .dm-box{width:min(1060px,96vw);grid-template-columns:auto 1fr;grid-template-rows:auto 1fr auto auto;grid-template-areas:"stage top" "stage cap" "stage bar" "stage ctl";column-gap:28px;padding:16px}
#demo .dm-stage{width:auto;height:min(82vh,720px)}#demo .dm-cap{font-size:25px;height:auto;align-self:center;margin:0 4px}#demo .dm-ck{font-size:15px;margin-bottom:10px}#demo .dm-t{font-size:28px}}
`;
let labEl,numEl,txEl,si=0,sc=0,ST=[],sBtn,AC=null,MG=null,sound=false,el,cv,ctx,mctx,off,capEl,bar,hintEl,pBtn,D=null,S={},t=0,playing=false,last=0,capI=-1,raf=0,scale=.6,grain=null,seeking=false;const W=600,H=800;
function build(){
 const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
 el=document.createElement('div');el.id='demo';el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');
 el.innerHTML='<div class="dm-box"><div class="dm-top"><div><div class="dm-k"><span class="dm-yr"></span>Play the experiment</div><div class="dm-t"></div></div><button class="dm-x dm-i" aria-label="Close">✕</button></div><div class="dm-stage"><canvas></canvas><img class="dm-poster" alt=""><div class="dm-hint"></div></div><div class="dm-cap" aria-live="polite" title="Tap for the next line"><div class="dm-ck"><span class="dm-lab"></span><span class="dm-n"></span></div><div class="dm-tx"></div></div><div class="dm-bar"><i></i></div><div class="dm-ctl"><button class="dm-b dm-i" aria-label="Previous line">'+IC.prev+'</button><button class="dm-p dm-i" aria-label="Pause">'+IC.pause+'</button><button class="dm-f dm-i" aria-label="Next line">'+IC.next+'</button><button class="dm-r dm-i" aria-label="Replay">'+IC.replay+'</button><button class="dm-s dm-i" aria-label="Sound" aria-pressed="false" hidden>'+IC.soff+'</button><button class="dm-done">Done</button></div></div>';
 document.body.appendChild(el);cv=el.querySelector('canvas');mctx=cv.getContext('2d');off=document.createElement('canvas');ctx=off.getContext('2d');capEl=el.querySelector('.dm-cap');labEl=el.querySelector('.dm-lab');numEl=el.querySelector('.dm-n');txEl=el.querySelector('.dm-tx');bar=el.querySelector('.dm-bar i');hintEl=el.querySelector('.dm-hint');pBtn=el.querySelector('.dm-p');sBtn=el.querySelector('.dm-s');
 sBtn.onclick=()=>{if(!AC){try{AC=new (window.AudioContext||window.webkitAudioContext)();MG=AC.createGain();MG.gain.value=.5;MG.connect(AC.destination)}catch(e){AC=null}}if(!AC)return;sound=!sound;if(sound&&AC.state==='suspended')AC.resume();sBtn.innerHTML=sound?IC.son:IC.soff;sBtn.setAttribute('aria-pressed',sound);sBtn.setAttribute('aria-label',sound?'Sound on':'Sound off')};
 el.querySelector('.dm-x').onclick=close;el.querySelector('.dm-done').onclick=close;el.querySelector('.dm-r').onclick=()=>start();el.querySelector('.dm-f').onclick=()=>step(1);el.querySelector('.dm-b').onclick=()=>step(-1);capEl.onclick=()=>step(1);
 pBtn.onclick=()=>{if(done()){start();return}playing=!playing;setP();if(playing){last=performance.now();loop()}};
 el.addEventListener('click',e=>{if(e.target===el)close()});
 cv.addEventListener('pointerdown',e=>{if(!D||!D.tap)return;const r=cv.getBoundingClientRect();D.tap(S,t,(e.clientX-r.left)/r.width*W,(e.clientY-r.top)/r.height*H);if(!playing)frame(1)});
 addEventListener('keydown',e=>{if(!window.__demoOpen)return;if(e.key==='Escape')close();if(e.key===' '){pBtn.click();e.preventDefault()}if(e.key==='ArrowRight')step(1);if(e.key==='ArrowLeft')step(-1);e.stopImmediatePropagation()},true);
 addEventListener('resize',()=>{if(window.__demoOpen){size();frame(1)}});
}
function setP(){pBtn.innerHTML=playing?IC.pause:IC.play;pBtn.setAttribute('aria-label',playing?'Pause':(done()?'Play again':'Play'))}
/* Captions: steps [time, kind, text]. The animation runs up to the next step's time, then holds until the line has had time to be read. Tap the caption or › to move on. */
const LAB={Q:'The question',S:'The setup',D:'What they did',R:'What happened',W:'Why it matters',N:'Good to know'};
function story(){return D.story||D.caps.map(c=>[c[0],'D',c[1]])}
function readT(i){const w=(ST[i][2].match(/\S+/g)||[]).length;return Math.max(4.5,1.6+w/2.6)}
function gate(){return si+1<ST.length?Math.max(ST[si+1][0],ST[si][0]):D.dur}
function done(){return !!ST.length&&si>=ST.length-1&&t>=D.dur&&sc>=readT(si)}
function ff(T){if(T<=t)return;seeking=true;const dt=1/30;while(t<T){t=Math.min(T,t+dt);G.t=t;if(D.sim)D.sim(G,t,S)}seeking=false}
function step(d){if(!D)return;if(d>0&&si===ST.length-1){ff(D.dur);sc=99;playing=false;setP();el.dataset.ended='1';frame(1);return}
 const j=Math.max(0,Math.min(ST.length-1,si+d));if(d<0){S={};D.init&&D.init(S);t=0;ff(ST[j][0])}else ff(ST[j][0]);si=j;sc=0;el.dataset.ended='';frame(1);if(!playing){playing=true;setP();last=performance.now();cancelAnimationFrame(raf);loop()}}
function size(){const dpr=Math.min(devicePixelRatio||1,2),r=cv.getBoundingClientRect();cv.width=off.width=Math.max(1,Math.round(r.width*dpr));cv.height=off.height=Math.max(1,Math.round(r.height*dpr));scale=Math.max(.1,r.width/W);G.k=scale;
 grain=document.createElement('canvas');grain.width=grain.height=160;const gc=grain.getContext('2d'),id=gc.createImageData(160,160);for(let i=0;i<id.data.length;i+=4){const v=Math.random()*255;id.data[i]=id.data[i+1]=id.data[i+2]=v;id.data[i+3]=14}gc.putImageData(id,0,0)}
function start(){S={};D.init&&D.init(S);t=0;capI=-1;si=0;sc=0;ST=story();playing=true;setP();el.dataset.ended='';last=performance.now();cancelAnimationFrame(raf);frame(1);loop()}
function setCap(){if(!ST.length)ST=story();const i=si;if(i!==capI){capI=i;const c=ST[i];capEl.classList.add('fade');setTimeout(()=>{if(!D||capI!==i)return;labEl.textContent=LAB[c[1]]||'';capEl.dataset.k=c[1];txEl.textContent=c[2];capEl.classList.toggle('long',c[2].length>185);capEl.classList.toggle('xlong',c[2].length>235);numEl.textContent=(i+1)+' / '+ST.length+(i<ST.length-1?' · tap for next':'');capEl.classList.remove('fade')},180)}
 hintEl.textContent=D.hint||'';hintEl.classList.toggle("on",!!D.hint&&t>(D.hintAt||0)&&t<D.dur-.5&&!(D.audio&&sound&&/Sound/.test(D.hint)))}
function bg(){const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,G.mix(PAL.bg1,'#ffffff',.08));g.addColorStop(.55,PAL.bg1);g.addColorStop(1,PAL.bg0);ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
 G.glow(W*.28,H*.12,W*.95,PAL.a,.20);G.glow(W*.8,H*.95,W*.7,PAL.b,.16)}
function frame(hard){if(!D)return;ctx.setTransform(off.width/W,0,0,off.height/H,0,0);G.t=t;ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';bg();
 if(D.sim&&!seeking)D.sim(G,t,S);ctx.save();D.draw(G,t,S);ctx.restore();ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';ctx.setLineDash([]);ctx.shadowBlur=0;
 if(D.rv!=null&&t>D.rv){const k=(t-D.rv)/1.4;if(k<1){ctx.globalCompositeOperation='lighter';G.glow(D.rvx??W/2,D.rvy??H/2,W*(.4+.6*k),PAL.hi,.45*(1-k));ctx.globalCompositeOperation='source-over'}}
 const v=ctx.createRadialGradient(W/2,H*.48,H*.3,W/2,H*.5,H*.78);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,.55)');ctx.fillStyle=v;ctx.fillRect(0,0,W,H);
 mctx.setTransform(1,0,0,1,0,0);mctx.globalAlpha=(hard||RM||seeking)?1:.62;mctx.drawImage(off,0,0);mctx.globalAlpha=1;
 if(grain){mctx.fillStyle=mctx.createPattern(grain,'repeat');mctx.fillRect(0,0,cv.width,cv.height)}
 setCap();bar.style.width=(ST.length?Math.min(100,(si+Math.min(1,sc/readT(si)))/ST.length*100):0)+'%'}
let rmNext=0;
function loop(){if(!playing)return;const now=performance.now(),sp=window.__demoSpeed||1;
 const dt=Math.min(.05,(now-last)/1000)*sp,g=gate();sc+=dt;
 if(RM){if(t<g){ff(g);frame(1)}}
 else{t=Math.min(g,t+dt);frame()}
 last=now;
 if(t>=g&&sc>=readT(si)){if(si<ST.length-1){si++;sc=0}else if(t>=D.dur){playing=false;setP();el.dataset.ended='1';frame(1);return}}
 raf=requestAnimationFrame(loop)}
function open(n,title){const all=window.DEMOS||{};D=all[n];if(!D)return;(D.pics||[]).forEach(pic);if(!el)build();sBtn.hidden=!D.audio||!(window.AudioContext||window.webkitAudioContext);el.querySelector('.dm-t').textContent=title||'';el.querySelector('.dm-yr').textContent=yearOf(n);
 capI=-1;txEl.textContent='';labEl.textContent='';numEl.textContent='';hintEl.textContent='';hintEl.classList.remove('on');bar.style.width='0%';window.__demoOpen=true;el.classList.add('on');size();rmNext=0;
 /* open on the stop's hero picture for a beat, then play */
 const po=el.querySelector('.dm-poster');clearTimeout(posterT);if(window.DEMO_HERO&&!window.__noPoster){po.src=DEMO_HERO(n);po.classList.add('on');S={};D.init&&D.init(S);t=0;capI=-1;si=0;sc=0;ST=story();playing=false;setP();frame(1);const go=()=>{clearTimeout(posterT);po.onclick=null;po.classList.remove('on');if(D&&!playing&&t===0)start()};po.onclick=go;posterT=setTimeout(go,1600)}else{po.classList.remove('on');start()}}
let posterT;
/* the stop's year, from the walk's data (window.FIELD) or window.DEMO_YEARS; blank if unknown */
function yearOf(n){if(window.DEMO_YEARS&&DEMO_YEARS[n])return String(DEMO_YEARS[n]);const F=window.FIELD;if(!F||!F.rooms)return '';for(const r of F.rooms)for(const c of r.cards)if(c.n==n&&c.year!=null)return String(c.year);return ''}
function close(){clearTimeout(posterT);playing=false;cancelAnimationFrame(raf);window.__demoOpen=false;el.classList.remove('on');D=null}
/* preview/test helper: jump to time T and hold */
function seek(T,k){if(!D)return;ST=story();si=k!=null?k:Math.max(0,ST.reduce((a,c,j)=>c[0]<=T?j:a,0));sc=0;playing=false;cancelAnimationFrame(raf);S={};D.init&&D.init(S);seeking=true;t=0;const step=1/30;while(t<T){t=Math.min(T,t+step);G.t=t;if(D.sim)D.sim(G,t,S)}t=T;frame(1);seeking=false;setP()}
/* ===== drawing kit, logical canvas 600x800 ===== */
const hx=h=>{const n=parseInt(h.slice(1,7),16);return[n>>16&255,n>>8&255,n&255]};
const cache={};
const G={W,H,P:PAL,k:.6,get c(){return ctx},
 clamp:(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),lerp:(a,b,x)=>a+(b-a)*x,
 ease:x=>{x=Math.max(0,Math.min(1,x));return x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2},
 back:x=>{x=Math.max(0,Math.min(1,x));const c=1.9;return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2)},
 win(t,a,b,f=.6){return G.clamp((t-a)/f)*G.clamp((b-t)/f)},
 ramp(t,a,b){return G.ease((t-a)/(b-a))},
 rgba(h,a){if(typeof h==='string'&&h.startsWith('rgba'))return h;if(h.length===9){a*=parseInt(h.slice(7),16)/255}const c=hx(h);return `rgba(${c[0]},${c[1]},${c[2]},${a})`},
 mix(a,b,k){const x=hx(a),y=hx(b);return '#'+x.map((v,i)=>Math.round(v+(y[i]-v)*k).toString(16).padStart(2,'0')).join('')},
 lg(x0,y0,x1,y1,st){const g=ctx.createLinearGradient(x0,y0,x1,y1);st.forEach(s=>g.addColorStop(s[0],s[1]));return g},
 rg(x,y,r0,x1,y1,r1,st){const g=ctx.createRadialGradient(x,y,r0,x1,y1,r1);st.forEach(s=>g.addColorStop(s[0],s[1]));return g},
 at(x,y,s=1,r=0){ctx.save();ctx.translate(x,y);if(r)ctx.rotate(r);ctx.scale(s,s)},end(){ctx.restore()},
 glow(x,y,r,col,al=1){if(al<=0||r<=0)return;const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,G.rgba(col,al));g.addColorStop(.4,G.rgba(col,al*.45));g.addColorStop(1,G.rgba(col,0));ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill()},
 bloom(x,y,r,col,al=1){const o=ctx.globalCompositeOperation;ctx.globalCompositeOperation='lighter';G.glow(x,y,r,col,al);ctx.globalCompositeOperation=o},
 dot(x,y,r,col,al=1){if(r<=0)return;ctx.fillStyle=G.rgba(col,al);ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill()},
 ring(x,y,r,col,w=2,al=1){ctx.strokeStyle=G.rgba(col,al);ctx.lineWidth=w;ctx.beginPath();ctx.arc(x,y,Math.max(0,r),0,7);ctx.stroke()},
 line(x1,y1,x2,y2,col,w=2,al=1,dash){ctx.strokeStyle=G.rgba(col,al);ctx.lineWidth=w;ctx.lineCap='round';ctx.setLineDash(dash||[]);ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();ctx.setLineDash([])},
 path(pts,col,w=2,al=1,dash){ctx.strokeStyle=G.rgba(col,al);ctx.lineWidth=w;ctx.lineJoin=ctx.lineCap='round';ctx.setLineDash(dash||[]);ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.stroke();ctx.setLineDash([])},
 rr(x,y,w,h,r,fill,stroke,al=1,lw=2){ctx.beginPath();ctx.roundRect?ctx.roundRect(x,y,w,h,Math.min(r,Math.abs(w)/2,Math.abs(h)/2)):ctx.rect(x,y,w,h);if(fill){ctx.fillStyle=typeof fill==='string'?G.rgba(fill,al):fill;ctx.fill()}if(stroke){ctx.strokeStyle=G.rgba(stroke,al);ctx.lineWidth=lw;ctx.stroke()}},
 shadow(x,y,rx,ry,al=.45){ctx.save();ctx.translate(x,y);ctx.scale(1,ry/rx);G.glow(0,0,rx,'#000000',al);ctx.restore()},
 text(s,x,y,o={}){const min=12/G.k;let z=o.size||(o.serif?40:22);z=Math.max(z,min);ctx.globalAlpha=G.clamp(o.al??1);ctx.fillStyle=o.col||PAL.hi;ctx.textAlign=o.align||'center';ctx.textBaseline='middle';ctx.font=o.serif?`${o.it?'italic ':''}${z}px 'Instrument Serif',Georgia,serif`:`${o.w||700} ${z}px -apple-system,system-ui,sans-serif`;if(o.glow){ctx.shadowColor=G.rgba(o.glow,.9);ctx.shadowBlur=o.gb||24}const mw=G.fitW(x,ctx.textAlign,o.maxW);if(ctx.measureText(s).width>mw)ctx.fillText(s,x,y,mw);else ctx.fillText(s,x,y);ctx.shadowBlur=0;ctx.globalAlpha=1},
 big(s,x,y,size,col,al=1,sc=1){if(al<=0)return;G.at(x,y,sc);G.text(s,0,0,{serif:1,size,col:col||'#ffffff',al,glow:col||PAL.a,gb:30});G.end()},
 arrow(x1,y1,x2,y2,col,w=4,al=1,hs){G.line(x1,y1,x2,y2,col,w,al);const a=Math.atan2(y2-y1,x2-x1),s=hs||w*3.5;ctx.fillStyle=G.rgba(col,al);ctx.beginPath();ctx.moveTo(x2+Math.cos(a)*s*.3,y2+Math.sin(a)*s*.3);ctx.lineTo(x2-s*Math.cos(a-.5),y2-s*Math.sin(a-.5));ctx.lineTo(x2-s*Math.cos(a+.5),y2-s*Math.sin(a+.5));ctx.fill()},
 curveArrow(x1,y1,cx,cy,x2,y2,col,w=5,al=1,dash){ctx.strokeStyle=G.rgba(col,al);ctx.lineWidth=w;ctx.lineCap='round';ctx.setLineDash(dash||[]);ctx.beginPath();ctx.moveTo(x1,y1);ctx.quadraticCurveTo(cx,cy,x2,y2);ctx.stroke();ctx.setLineDash([]);const a=Math.atan2(y2-cy,x2-cx),s=w*3.4;ctx.fillStyle=G.rgba(col,al);ctx.beginPath();ctx.moveTo(x2+Math.cos(a)*s*.3,y2+Math.sin(a)*s*.3);ctx.lineTo(x2-s*Math.cos(a-.5),y2-s*Math.sin(a-.5));ctx.lineTo(x2-s*Math.cos(a+.5),y2-s*Math.sin(a+.5));ctx.fill()},
 /* widest a line can be at x without leaving the 600px canvas (8px margin) */
 fitW(x,al,mx){const L=x-8,R=W-8-x;let w=al==='center'?2*Math.min(L,R):(al==='right'||al==='end')?L:R;w=Math.max(40,w);return mx?Math.min(mx,w):w},
 rnd(seed){let s=seed;return()=>(s=(s*16807)%2147483647)/2147483647},
 cue(S,key){S._c=S._c||{};if(S._c[key])return false;S._c[key]=1;return true},
 cached(key,w,h,fn){let c=cache[key];if(!c){c=document.createElement('canvas');c.width=w*2;c.height=h*2;const sv=ctx;ctx=c.getContext('2d');ctx.scale(2,2);try{fn()}finally{ctx=sv}cache[key]=c}return c},
 ball(x,y,r,col,al=1){ctx.globalAlpha=al;ctx.fillStyle=G.rg(x-r*.35,y-r*.4,r*.05,x,y,r,[[0,G.mix(col,'#ffffff',.75)],[.35,col],[1,G.mix(col,'#000000',.55)]]);ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill();G.dot(x-r*.38,y-r*.42,r*.16,'#ffffff',.7*al);ctx.globalAlpha=1},
 sparks(x,y,r,n,seed,col,al=1){const q=G.rnd(seed+1);ctx.lineCap='round';for(let i=0;i<n;i++){const a=q()*7,r0=r*(.4+q()*.3),r1=r*(.8+q()*.6);ctx.strokeStyle=G.rgba(col||'#ffffff',al*(.5+q()*.5));ctx.lineWidth=2+q()*3;ctx.beginPath();ctx.moveTo(x+Math.cos(a)*r0,y+Math.sin(a)*r0);const m=(r0+r1)/2,j=(q()-.5)*.5;ctx.lineTo(x+Math.cos(a+j)*m,y+Math.sin(a+j)*m);ctx.lineTo(x+Math.cos(a)*r1,y+Math.sin(a)*r1);ctx.stroke()}},
 wave(x,y,w,fn,col,lw=4,al=1,glow=0){ctx.save();if(glow){ctx.shadowColor=G.rgba(col,.9);ctx.shadowBlur=glow}ctx.strokeStyle=G.rgba(col,al);ctx.lineWidth=lw;ctx.lineJoin=ctx.lineCap='round';ctx.beginPath();for(let i=0;i<=w;i+=3){const yy=y+fn(i/w,i);i?ctx.lineTo(x+i,yy):ctx.moveTo(x+i,yy)}ctx.stroke();ctx.restore()},
 stream(pts,t,n,col,r=6,al=1,speed=.5){if(al<=0)return;const L=[0];for(let i=1;i<pts.length;i++)L.push(L[i-1]+Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]));const T=L[L.length-1];
  for(let k=0;k<n;k++){const d=((t*speed+k/n)%1)*T;let i=1;while(i<L.length-1&&L[i]<d)i++;const f=(d-L[i-1])/(L[i]-L[i-1]||1),x=G.lerp(pts[i-1][0],pts[i][0],f),y=G.lerp(pts[i-1][1],pts[i][1],f);G.glow(x,y,r*3,col,.35*al);G.ball(x,y,r,col,al)}},
 glass(x,y,w,h,r=18,al=1){G.rr(x,y,w,h,r,G.lg(x,y,x,y+h,[[0,'rgba(20,12,10,.55)'],[1,'rgba(20,12,10,.35)']]),null,al);G.rr(x,y,w,h,r,null,'#ffffff',.22*al,1.5)},
 bulb(x,y,s,on,col){col=col||PAL.a;G.at(x,y,s);if(on>0){G.bloom(0,-10,200,col,.75*on);G.bloom(0,-10,70,'#ffffff',.6*on)}
  ctx.fillStyle=G.rg(-20,-40,4,0,-14,60,[[0,G.mix('#fff6df','#ffffff',on)],[.5,on>0?G.mix('#8a7a66',G.mix(col,'#ffffff',.5),on):'#8a7a66'],[1,on>0?G.mix('#3a3028',col,on*.8):'#3a3028']]);ctx.globalAlpha=.95;ctx.beginPath();ctx.arc(0,-20,50,Math.PI*.78,Math.PI*2.22);ctx.lineTo(18,40);ctx.lineTo(-18,40);ctx.closePath();ctx.fill();ctx.globalAlpha=1;
  G.path([[-10,30],[-10,0],[-4,-14],[4,-14],[10,0],[10,30]],on>0?'#ffffff':'#cbb79a',on>0?4:2.5,.9);if(on>0)G.bloom(0,-12,30,'#ffffff',on);
  G.dot(-18,-38,9,'#ffffff',.5);for(let i=0;i<3;i++)G.rr(-20,40+i*11,40,10,4,G.lg(-20,0,20,0,[[0,'#6d6d6d'],[.4,'#e6e6e6'],[1,'#5a5a5a']]));G.rr(-11,73,22,9,4,'#2a2a2a');G.end()},
 eye(x,y,r,o={}){const op=o.open??1,lk=o.look||[0,0],ir=o.iris||'#6a8fb5';G.at(x,y,1);
  ctx.beginPath();ctx.moveTo(-r,0);ctx.quadraticCurveTo(0,-r*1.15*op,r,0);ctx.quadraticCurveTo(0,r*1.05*op,-r,0);ctx.closePath();ctx.save();ctx.clip();
  ctx.fillStyle=G.rg(0,-r*.2,r*.1,0,0,r*1.1,[[0,'#ffffff'],[.7,'#f1e8e2'],[1,'#b9a49a']]);ctx.fillRect(-r,-r,2*r,2*r);
  const ix=lk[0]*r*.38,iy=lk[1]*r*.2,R=r*.46;ctx.fillStyle=G.rg(ix,iy,R*.2,ix,iy,R,[[0,G.mix(ir,'#ffffff',.25)],[.75,ir],[1,G.mix(ir,'#000000',.6)]]);ctx.beginPath();ctx.arc(ix,iy,R,0,7);ctx.fill();
  ctx.strokeStyle=G.rgba(G.mix(ir,'#ffffff',.4),.35);ctx.lineWidth=1;for(let i=0;i<18;i++){const a=i/18*6.283;ctx.beginPath();ctx.moveTo(ix+Math.cos(a)*R*.4,iy+Math.sin(a)*R*.4);ctx.lineTo(ix+Math.cos(a)*R*.9,iy+Math.sin(a)*R*.9);ctx.stroke()}
  G.dot(ix,iy,R*(o.pupil||.42),'#080606');G.dot(ix-R*.35,iy-R*.38,R*.2,'#ffffff',.9);G.dot(ix+R*.3,iy+R*.3,R*.08,'#ffffff',.6);
  ctx.fillStyle=G.lg(0,-r,0,-r*.3,[[0,'rgba(60,30,20,.45)'],[1,'rgba(60,30,20,0)']]);ctx.fillRect(-r,-r,2*r,r);ctx.restore();
  ctx.strokeStyle='#3a2018';ctx.lineWidth=Math.max(2,r*.09);ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-r,0);ctx.quadraticCurveTo(0,-r*1.15*op,r,0);ctx.stroke();
  ctx.strokeStyle=G.rgba('#3a2018',.5);ctx.lineWidth=Math.max(1,r*.04);ctx.beginPath();ctx.moveTo(-r,0);ctx.quadraticCurveTo(0,r*1.05*op,r,0);ctx.stroke();
  if(o.glow)G.bloom(ix,iy,r*1.6,o.glowCol||PAL.a,o.glow);G.end()},
 eyePatch(x,y,r,o={}){G.at(x,y,1);ctx.fillStyle=G.rg(0,0,r*.1,0,0,r*2.2,[[0,'#d9a88a'],[1,'rgba(120,70,50,0)']]);ctx.beginPath();ctx.ellipse(0,0,r*2.2,r*1.25,0,0,7);ctx.fill();G.end();G.eye(x,y,r,o)},
 hand(x,y,s,o={}){const sk=o.skin||'#e9b996';G.at(x,y,s,o.rot||0);ctx.globalAlpha=o.al??1;
  const F=[[-54,-6,30,118,-.12],[-20,-10,32,142,-.03],[16,-10,32,136,.04],[50,-2,28,106,.14]];
  const sh=G.lg(-90,0,90,0,[[0,G.mix(sk,'#000000',.32)],[.45,sk],[.7,G.mix(sk,'#ffffff',.15)],[1,G.mix(sk,'#000000',.35)]]);
  ctx.fillStyle=sh;F.forEach(f=>{ctx.save();ctx.translate(f[0],f[1]);ctx.rotate(f[4]);ctx.beginPath();ctx.roundRect?ctx.roundRect(-f[2]/2,-f[3],f[2],f[3]+30,f[2]/2):ctx.rect(-f[2]/2,-f[3],f[2],f[3]+30);ctx.fill();ctx.restore()});
  ctx.save();ctx.translate(-70,70);ctx.rotate(-.9);ctx.beginPath();ctx.roundRect?ctx.roundRect(-17,-92,34,110,17):ctx.rect(-17,-92,34,110);ctx.fill();ctx.restore();
  ctx.beginPath();ctx.moveTo(-72,0);ctx.bezierCurveTo(-80,60,-70,130,-40,160);ctx.lineTo(50,160);ctx.bezierCurveTo(74,120,76,50,66,0);ctx.closePath();ctx.fill();ctx.fillRect(-42,150,90,70);
  ctx.globalAlpha=1;G.end()},
 neuron(x,y,s,fire=0,col){col=col||PAL.a;G.at(x,y,s);const q=G.rnd(11);ctx.lineCap='round';for(let i=0;i<7;i++){const a=i/7*6.283+q()*.4;let px=Math.cos(a)*30,py=Math.sin(a)*30;ctx.strokeStyle=G.rgba(G.mix('#e8c0a8',col,fire),.85);ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(px,py);for(let j=0;j<3;j++){px+=Math.cos(a+(q()-.5))*34;py+=Math.sin(a+(q()-.5))*34;ctx.lineTo(px,py)}ctx.stroke()}
  if(fire>0)G.bloom(0,0,150,col,fire*.9);G.ball(0,0,38,G.mix('#d8a890',col,fire));if(fire>.3)G.sparks(0,0,120,10,Math.floor(G.t*20),'#ffffff',fire);G.end()},
 scope(x,y,w,h,spikes,t,span,col){col=col||PAL.a;G.rr(x,y,w,h,14,'#000000aa','#ffffff',.25,1.5);for(let i=1;i<4;i++)G.line(x+8,y+h*i/4,x+w-8,y+h*i/4,'#ffffff',1,.08);G.line(x+10,y+h*.7,x+w-10,y+h*.7,col,2,.35);
  for(const s of spikes){if(s>t||s<t-span)continue;const px=x+10+(w-20)*(1-(t-s)/span),a=1-(t-s)/span*.5;G.line(px,y+h*.7,px,y+h*.12,col,4,a);G.bloom(px,y+h*.2,22,col,.6*a)}},
 brainShape(){ctx.beginPath();ctx.moveTo(-150,30);ctx.bezierCurveTo(-175,-60,-110,-130,-20,-128);ctx.bezierCurveTo(70,-140,160,-90,162,-10);ctx.bezierCurveTo(168,40,140,70,100,72);ctx.bezierCurveTo(60,80,30,64,0,72);ctx.bezierCurveTo(-40,90,-70,92,-100,78);ctx.bezierCurveTo(-130,70,-148,58,-150,30);ctx.closePath()},
 /* brain, side view, front faces left; spots [[x,y,r,amount,col]] in brain coords (-160..160,-130..90) */
 brain(x,y,s,o={}){const tint=o.tint||'#e89aa8';const c=G.cached('brain'+tint,360,300,()=>{ctx.translate(180,150);
   ctx.fillStyle=G.rg(40,80,6,40,90,70,[[0,'#d58a98'],[1,'#8a4656']]);ctx.beginPath();ctx.ellipse(70,90,64,36,-.15,0,7);ctx.fill();ctx.strokeStyle='rgba(90,30,40,.4)';ctx.lineWidth=2;for(let i=0;i<6;i++){ctx.beginPath();ctx.ellipse(70,90,60-i*9,32-i*5,-.15,.2,2.9);ctx.stroke()}
   ctx.fillStyle=G.lg(0,70,0,140,[[0,'#c27a86'],[1,'#7a3a48']]);ctx.beginPath();ctx.moveTo(10,70);ctx.lineTo(40,70);ctx.lineTo(36,140);ctx.lineTo(18,140);ctx.fill();
   ctx.fillStyle=G.rg(-50,-70,10,0,-20,190,[[0,G.mix(tint,'#ffffff',.45)],[.55,tint],[1,G.mix(tint,'#3a0a1a',.6)]]);G.brainShape();ctx.fill();
   ctx.save();G.brainShape();ctx.clip();const q=G.rnd(42);ctx.lineCap='round';
   for(let i=0;i<46;i++){let px=-160+q()*320,py=-130+q()*210,a=q()*6.28;ctx.strokeStyle='rgba(120,40,60,.38)';ctx.lineWidth=3.2;ctx.beginPath();ctx.moveTo(px,py);for(let j=0;j<6;j++){a+=(q()-.5)*2.2;px+=Math.cos(a)*16;py+=Math.sin(a)*16;ctx.lineTo(px,py)}ctx.stroke();ctx.strokeStyle='rgba(255,230,235,.22)';ctx.lineWidth=2;ctx.stroke()}
   ctx.strokeStyle='rgba(110,30,50,.55)';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(-90,30);ctx.bezierCurveTo(-30,0,40,10,80,40);ctx.stroke();ctx.beginPath();ctx.moveTo(10,-128);ctx.bezierCurveTo(0,-80,20,-40,10,0);ctx.stroke();
   ctx.fillStyle=G.rg(-40,-90,0,-40,-90,170,[[0,'rgba(255,255,255,.25)'],[1,'rgba(255,255,255,0)']]);ctx.fillRect(-180,-150,360,300);ctx.restore()});
  G.at(x,y,s);ctx.globalAlpha=o.al??1;ctx.drawImage(c,-180,-150,360,300);ctx.globalAlpha=1;
  if(o.spots){ctx.save();G.brainShape();ctx.clip();for(const p of o.spots){if(p[3]>0){G.glow(p[0],p[1],p[2]*1.2,p[4]||PAL.a,p[3]);G.bloom(p[0],p[1],p[2]*.6,'#ffffff',p[3]*.5)}}ctx.restore();for(const p of o.spots)if(p[3]>.6)G.bloom(p[0],p[1],p[2]*1.6,p[4]||PAL.a,(p[3]-.6)*1.2)}
  G.end()},
 heart(x,y,s,beat=0,col){col=col||'#d83040';const k=1+beat*.14;G.at(x,y,s*k);G.bloom(0,0,110,col,.35+beat*.5);
  ctx.fillStyle=G.rg(-26,-30,4,0,0,90,[[0,G.mix(col,'#ffffff',.55)],[.5,col],[1,G.mix(col,'#000000',.55)]]);ctx.beginPath();ctx.moveTo(0,70);ctx.bezierCurveTo(-110,0,-70,-90,0,-40);ctx.bezierCurveTo(70,-90,110,0,0,70);ctx.fill();G.dot(-34,-34,10,'#ffffff',.5);G.end()},
 lungs(x,y,s,br=0,col){col=col||'#f08a9a';G.at(x,y,s);const k=1+br*.12;
  for(const sx of[-1,1]){G.at(sx*44,10,1);ctx.scale(k,k);ctx.fillStyle=G.rg(sx*-10,-20,6,0,0,90,[[0,G.mix(col,'#ffffff',.5)],[.6,col],[1,G.mix(col,'#000000',.45)]]);ctx.beginPath();ctx.moveTo(sx*-8,-70);ctx.bezierCurveTo(sx*60,-90,sx*70,40,sx*50,70);ctx.bezierCurveTo(sx*20,80,sx*-12,70,sx*-14,40);ctx.closePath();ctx.fill();G.end()}
  G.path([[0,-110],[0,-40]],'#f6d0d0',10,.9);G.path([[0,-40],[-30,-10],[-50,20]],'#f6d0d0',6,.8);G.path([[0,-40],[30,-10],[50,20]],'#f6d0d0',6,.8);G.end()},
 brush(x,y,s,rot=0){G.at(x,y,s,rot);G.rr(-7,-140,14,110,7,G.lg(-7,0,7,0,[[0,'#c0702a'],[.5,'#f0a050'],[1,'#8a4a1a']]));G.rr(-9,-36,18,26,3,G.lg(-9,0,9,0,[[0,'#888888'],[.5,'#eeeeee'],[1,'#777777']]));ctx.fillStyle=G.lg(0,-10,0,30,[[0,'#3a2a1a'],[1,'#e8d8b8']]);ctx.beginPath();ctx.moveTo(-9,-10);ctx.quadraticCurveTo(-12,20,0,34);ctx.quadraticCurveTo(12,20,9,-10);ctx.fill();G.end()},
 clock(x,y,r,t){G.at(x,y,1);G.shadow(0,r+14,r,10,.4);ctx.fillStyle=G.rg(-r*.3,-r*.3,4,0,0,r,[[0,'#ffffff'],[1,'#d8d0c4']]);ctx.beginPath();ctx.arc(0,0,r,0,7);ctx.fill();G.ring(0,0,r,'#3a2a20',r*.09);
  for(let i=0;i<12;i++){const a=i/12*6.283;G.line(Math.cos(a)*r*.78,Math.sin(a)*r*.78,Math.cos(a)*r*.9,Math.sin(a)*r*.9,'#3a2a20',i%3?2:4)}
  const m=t*.9;G.line(0,0,Math.cos(m-1.57)*r*.75,Math.sin(m-1.57)*r*.75,'#2a1a14',4);G.line(0,0,Math.cos(m/12-1.57)*r*.5,Math.sin(m/12-1.57)*r*.5,'#2a1a14',6);G.dot(0,0,5,PAL.b);G.end()},
 stamp(s,x,y,t0,t,col,size=44){if(t<t0)return;const k=G.clamp((t-t0)/.35),sc=G.lerp(2.6,1,G.ease(k));G.at(x,y,sc,-.12);ctx.globalAlpha=k;ctx.font=`800 ${Math.max(size,12/G.k)}px -apple-system,system-ui,sans-serif`;const w=ctx.measureText(s).width+40;G.rr(-w/2,-size*.85,w,size*1.7,12,G.rgba('#000000',.35),col||'#ff6a5a',1,6);ctx.globalAlpha=k;G.text(s,0,2,{size,col:col||'#ff6a5a',w:800,al:k});ctx.globalAlpha=1;G.end()},
 flag(x,y,s,col,t){col=col||'#ff5a4a';G.at(x,y,s);G.rr(-3,-120,6,140,3,'#dddddd');ctx.fillStyle=G.lg(0,-120,90,-70,[[0,col],[1,G.mix(col,'#000000',.35)]]);ctx.beginPath();ctx.moveTo(3,-120);for(let i=0;i<=10;i++){ctx.lineTo(3+i*9,-120+Math.sin(i*.8+t*8)*5+i*2)}for(let i=10;i>=0;i--){ctx.lineTo(3+i*9,-70+Math.sin(i*.8+t*8)*5-i*2)}ctx.fill();G.bloom(40,-96,90,col,.4);G.end()},
 meter(x,y,w,h,v,col){col=col||PAL.a;G.rr(x,y,w,h,w/2,'#00000066','#ffffff',.5,2);const f=G.clamp(v)*(h-8);G.rr(x+4,y+h-4-f,w-8,f,(w-8)/2,G.lg(0,y+h,0,y,[[0,G.mix(col,'#000000',.2)],[1,G.mix(col,'#ffffff',.4)]]));if(v>.05)G.bloom(x+w/2,y+h-4-f,w*1.6,col,.6*v)},
 mark(x,y,ok,al=1,s=1){if(al<=0)return;G.at(x,y,s);G.ball(0,0,30,ok?'#3fbf6a':'#e0464a',al);ctx.strokeStyle=G.rgba('#ffffff',al);ctx.lineWidth=7;ctx.lineCap='round';ctx.beginPath();if(ok){ctx.moveTo(-13,0);ctx.lineTo(-3,11);ctx.lineTo(15,-11)}else{ctx.moveTo(-11,-11);ctx.lineTo(11,11);ctx.moveTo(11,-11);ctx.lineTo(-11,11)}ctx.stroke();G.end()},
 bubble(x,y,w,h,tx,ty,col,al=1){if(al<=0)return;ctx.globalAlpha=al;ctx.fillStyle=G.lg(x,y,x,y+h,[[0,G.mix(col,'#ffffff',.35)],[1,col]]);ctx.beginPath();ctx.roundRect?ctx.roundRect(x,y,w,h,h/2):ctx.rect(x,y,w,h);ctx.fill();ctx.beginPath();ctx.moveTo(x+w*.4,y+h*.85);ctx.lineTo(tx,ty);ctx.lineTo(x+w*.6,y+h*.85);ctx.fill();ctx.globalAlpha=1},
 pic(n,x=0,y=0,w=W,h=H,al=1){const i=pic(n);if(!i)return false;ctx.globalAlpha=al;ctx.drawImage(i,x,y,w,h);ctx.globalAlpha=1;return true},
 get sound(){return sound},
 tone(f,d=.22,o={}){if(!sound||!AC)return;const t0=AC.currentTime+(o.at||0),g=AC.createGain(),v=(o.vol??1)*.12;g.gain.setValueAtTime(0,t0);g.gain.linearRampToValueAtTime(v,t0+.015);g.gain.exponentialRampToValueAtTime(.0005,t0+d);if(o.pan!=null&&AC.createStereoPanner){const pn=AC.createStereoPanner();pn.pan.value=o.pan;g.connect(pn);pn.connect(MG)}else g.connect(MG);(o.harm||[1]).forEach((h,i)=>{const os=AC.createOscillator(),hg=AC.createGain();os.type=o.type||'sine';os.frequency.value=f*(i+1);hg.gain.value=h;os.connect(hg);hg.connect(g);os.start(t0);os.stop(t0+d+.05)})},
 crackle(d=.12,vol=1){if(!sound||!AC)return;const n=Math.floor(AC.sampleRate*d),b=AC.createBuffer(1,n,AC.sampleRate),a=b.getChannelData(0);for(let i=0;i<n;i++)a[i]=(Math.random()<.08?(Math.random()*2-1):0)*(1-i/n);const s=AC.createBufferSource(),g=AC.createGain();s.buffer=b;g.gain.value=.5*vol;s.connect(g);g.connect(MG);s.start()}
};
window.Demo={open,close,seek,G};
})();
