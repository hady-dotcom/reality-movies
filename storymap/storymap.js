// Story so far: a map that grows as you walk. Links come only from window.STORY (real Pixel Hound edges).
(function(){
const F=window.FIELD,S=window.STORY||{edges:[]},P=window.DEMO_PAL||{a:'#f6a640',b:'#b8461c',hi:'#ffe6b8',bg0:'#0a0604',bg1:'#2b1607'};
const stops=[];F.rooms.forEach(r=>r.cards.forEach(c=>stops.push(c)));const n=stops.length,E=S.edges;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const css=`
#sm{--a:${P.a};--b:${P.b};--hi:${P.hi};position:fixed;z-index:4;display:flex;flex-direction:column;color:var(--hi);font:13px/1.45 -apple-system,system-ui,'Segoe UI',sans-serif;
 background:linear-gradient(165deg,${P.bg1}e6,${P.bg0}f0);border:1px solid ${P.a}40;box-shadow:0 0 50px ${P.a}1f,0 18px 40px #000b;-webkit-backdrop-filter:blur(14px) saturate(1.3);backdrop-filter:blur(14px) saturate(1.3);transition:opacity .6s,transform .5s cubic-bezier(.2,.8,.2,1)}
#sm .smh{display:flex;align-items:baseline;justify-content:space-between;padding:14px 18px 6px}
#sm .smk{font-size:10.5px;letter-spacing:.24em;text-transform:uppercase;color:var(--a);font-weight:600}
#sm .smc{font-size:11px;opacity:.6}
#sm .smx{display:none;border:0;background:none;color:var(--hi);font-size:22px;line-height:1;padding:0 4px;cursor:pointer}
#sm .legend{display:flex;gap:14px;padding:0 18px 8px;font-size:10.5px;opacity:.7}
#sm .legend i{display:inline-block;width:18px;height:0;border-top:2px solid var(--a);vertical-align:middle;margin-right:5px;box-shadow:0 0 6px var(--a)}
#sm .legend i.c{border-top:1.5px dashed var(--hi);box-shadow:none;opacity:.7}
#sm .smb{position:relative;flex:1;min-height:0;overflow-y:auto;overflow-x:hidden;scrollbar-width:none}#sm .smb::-webkit-scrollbar{display:none}
#sm svg{position:absolute;left:0;top:0;overflow:visible;pointer-events:none}
#sm svg path{fill:none;transition:stroke-dashoffset 1.1s cubic-bezier(.3,.7,.2,1),opacity .5s}
#sm .row{position:absolute;left:0;right:0;transition:top .6s cubic-bezier(.2,.8,.2,1),opacity .5s,transform .5s;display:flex;align-items:center;gap:10px;padding-left:58px;padding-right:14px;cursor:pointer;white-space:nowrap}
#sm .row.hid{opacity:0;transform:translateX(-10px);pointer-events:none}
#sm .row .dot{position:absolute;left:48px;width:9px;height:9px;border-radius:50%;background:${P.bg0};border:1.5px solid var(--a);margin-left:-4.5px;transition:all .4s}
#sm .row.cur .dot{background:var(--a);box-shadow:0 0 0 4px ${P.a}33,0 0 14px var(--a)}
#sm .row.sep .dot{border-style:dotted;opacity:.7}
#sm .row .yr{font-family:'Instrument Serif',Georgia,serif;font-size:15px;color:var(--a);width:36px;flex:none}
#sm .row .hd{overflow:hidden;text-overflow:ellipsis;opacity:.72;font-size:12.5px}
#sm .row.cur .hd{opacity:1;font-weight:600}
#sm .row:hover .hd{opacity:1}
#sm .row.rel .hd{opacity:1;color:#fff}#sm .row.rel .dot{background:var(--a)}
#sm .ghost{position:absolute;left:58px;right:14px;font-size:11.5px;font-style:italic;opacity:.4;transition:top .5s}
#sm .tl{margin:8px 12px 12px;padding:12px 14px;border-radius:14px;background:${P.a}14;border:1px solid ${P.a}33;transition:opacity .35s}
#sm .tl.fade{opacity:0}
#sm .tl .k{font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:var(--a);font-weight:600;margin-bottom:4px}
#sm .tl .t{font-size:13.5px;line-height:1.5}
#sm .tl .t b{color:#fff;font-weight:600}
#sm .tl .m{font-size:11.5px;opacity:.65;margin-top:6px}
#smbtn{display:none}
.sm-tl{display:none}
@media (min-width:900px) and (min-height:600px){
 #sm{left:24px;top:118px;bottom:24px;width:340px;border-radius:20px}
 #sm.off{opacity:0;transform:translateX(-14px);pointer-events:none}
}
@media not all and (min-width:900px) and (min-height:600px){
 #sm{left:0;right:0;bottom:0;height:min(74vh,640px);border-radius:22px 22px 0 0;border-bottom:0;padding-bottom:env(safe-area-inset-bottom);transform:translateY(102%);z-index:8}
 #sm.open{transform:none}
 #sm::before{content:'';position:absolute;top:7px;left:50%;width:38px;height:4px;margin-left:-19px;border-radius:2px;background:var(--hi);opacity:.3}
 #sm .smh{padding-top:20px}#sm .smx{display:block}
 #smbtn{display:inline-flex;align-items:center;justify-content:center;gap:6px;min-width:64px!important}
 #smbtn b{font:600 11px -apple-system,system-ui,sans-serif;background:${P.a};color:${P.bg0};border-radius:8px;padding:1px 6px}
 .sm-tl{display:block;margin:-2px 0 8px;font:600 11.5px/1.35 -apple-system,system-ui,sans-serif;color:${P.a};cursor:pointer}
 #smshade{position:fixed;inset:0;background:#0008;z-index:7;opacity:0;pointer-events:none;transition:opacity .4s}#smshade.on{opacity:1;pointer-events:auto}
}`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
const el=document.createElement('div');el.id='sm';el.className='off';el.setAttribute('aria-label','The story so far');
el.innerHTML=`<div class="smh"><span class="smk">The story so far</span><span class="smc"></span><button class="smx" aria-label="Close map">×</button></div><div class="legend"><span><i></i>led to</span><span><i class="c"></i>added to (cited it)</span></div><div class="smb"><svg></svg></div><div class="tl"><div class="k"></div><div class="t"></div><div class="m"></div></div>`;
document.body.appendChild(el);
const shade=document.createElement('div');shade.id='smshade';document.body.appendChild(shade);
['wheel','touchstart','touchend','touchmove'].forEach(t=>{el.addEventListener(t,e=>e.stopPropagation(),{passive:true});shade.addEventListener(t,e=>e.stopPropagation(),{passive:true})});
el.addEventListener('keydown',e=>e.stopPropagation());
const body=el.querySelector('.smb'),svg=el.querySelector('svg'),tl=el.querySelector('.tl');
const rows=stops.map((s,i)=>{const r=document.createElement('div');r.className='row hid';r.innerHTML=`<span class="dot"></span><span class="yr">${s.year}</span><span class="hd">${esc(s.head)}</span>`;r.onclick=()=>{close();window.__go&&window.__go(i+1)};body.appendChild(r);return r});
const ghost=document.createElement('div');ghost.className='ghost';ghost.textContent='The next stops join here as you walk.';body.appendChild(ghost);
const linked=new Set();E.forEach(e=>{linked.add(e.a);linked.add(e.b)});
const NS='http://www.w3.org/2000/svg';
const paths=E.map(e=>{const p=document.createElementNS(NS,'path');svg.appendChild(p);return p});
let RH=30,cur=-2;
function layout(){const h=(el.clientHeight||600)-body.offsetTop-Math.max(150,tl.offsetHeight+24);RH=Math.max(19,Math.min(34,Math.floor((h-16)/n)));
 rows.forEach(r=>r.style.height=RH+'px');svg.setAttribute('width',60);place();
 E.forEach((e,k)=>{const y1=8+e.a*RH+RH/2,y2=8+e.b*RH+RH/2,d=e.b-e.a,bx=48-Math.min(42,10+9*Math.sqrt(d));
  const p=paths[k];p.setAttribute('d',`M48 ${y1} C${bx} ${y1} ${bx} ${y2} 48 ${y2}`);const L=p.getTotalLength?p.getTotalLength():400;p.dataset.len=L;
  if(e.kind==='led'){p.setAttribute('stroke',P.a);p.setAttribute('stroke-width','2.2');p.style.filter=`drop-shadow(0 0 4px ${P.a})`}else{p.setAttribute('stroke',P.hi);p.setAttribute('stroke-width','1.2')}});
 draw(true)}
function place(){const c=Math.min(cur,n-1);rows.forEach((r,j)=>r.style.top=(8+(j>c?Math.max(c,0):j)*RH)+'px');const H=16+(Math.max(c,0)+2)*RH;svg.setAttribute('height',H);svg.style.height=H+'px';ghost.style.top=(8+(c+1)*RH+6)+'px'}
function draw(now){E.forEach((e,k)=>{const p=paths[k],L=+p.dataset.len||400,on=e.b<=cur,hot=on&&(e.b===cur||e.a===cur);
 if(e.kind==='cite'){p.style.strokeDasharray=on?'3 4':L+' '+L;p.style.strokeDashoffset=on?0:L}else{p.style.strokeDasharray=L+' '+L;p.style.strokeDashoffset=on?0:L}
 p.style.opacity=on?(hot?1:(e.kind==='led'?.6:.28)):0;if(now)p.style.transition='none';else p.style.transition=''});
 if(now){svg.getBoundingClientRect();paths.forEach(p=>p.style.transition='')}}
function nm(i){return `stop ${i+1}, <b>${esc(stops[i].head)}</b>`}
function story(i){
 if(i<0)return{k:'How this map works',t:'Each stop you reach joins the map. Lines show real links recorded in Pixel Hound, so you can see what led to what.',m:''};
 if(i>=n){const L=E.filter(e=>e.kind==='led').length,C=E.length-L,sep=stops.filter((_,j)=>!linked.has(j)).length;
  return{k:'The whole picture',t:`${n} stops. <b>${L}</b> ${L===1?'is':'are'} a direct “led to” step and <b>${C}</b> ${C===1?'is':'are'} “added to” links, where a later paper cites an earlier one.`+(sep?` <b>${sep}</b> stops have no recorded link to the others here. They are separate threads, not missing pieces we made up.`:''),m:'Links: Pixel Hound curated climbs and citation records.'}}
 const back=E.filter(e=>e.b===i),fwd=E.filter(e=>e.a===i),led=back.filter(e=>e.kind==='led'),cite=back.filter(e=>e.kind==='cite');let k,t,m='';
 if(i===0){k='Where it starts';t='This is the first stop. Everything else on the map comes after it.'}
 else if(led.length){k=`Stop ${led[0].a+1} led to this`;t=`<b>${esc(stops[led[0].a].year)} · ${esc(stops[led[0].a].head)}</b> → <b>this stop</b>. `+esc(led[0].why);if(cite.length)m=`Also adds to ${cite.map(e=>'stop '+(e.a+1)).join(', ')}.`}
 else if(cite.length){k=cite.length>1?`Adds to ${cite.length} earlier stops`:`Adds to stop ${cite[0].a+1}`;
  t=`This paper cites ${cite.slice(0,2).map(e=>nm(e.a)).join(' and ')}${cite.length>2?` and ${cite.length-2} more`:''}. It builds on that earlier work.`}
 else{k='A separate thread';t=`Pixel Hound has no recorded link between this study and ${i===1?'the stop':'the stops'} before it. It starts a new line of questions.`}
 if(fwd.length)m+=(m?' ':'')+(fwd.some(e=>e.kind==='led')?'Keep walking: this one leads straight to a later stop.':'Keep walking: a later stop builds on this one.');
 return{k,t,m}}
function short(i){const back=E.filter(e=>e.b===i);if(i===0)return'↳ Where the story starts · see map';const l=back.find(e=>e.kind==='led');
 if(l)return`↳ Stop ${l.a+1} led to this · see map`;if(back.length)return`↳ Adds to stop ${back.map(e=>e.a+1).join(', ')} · see map`;return'↳ A separate thread · see map'}
let tlT;
function update(idx){const i=idx-1;if(i===cur)return;cur=i;const c=Math.min(i,n-1);
 el.classList.toggle('off',idx<=0&&!window.__smForce);
 rows.forEach((r,j)=>{r.classList.toggle('hid',j>c);r.classList.toggle('cur',j===i);r.classList.toggle('sep',!linked.has(j))});
 const shown=E.filter(e=>e.b<=c).length;el.querySelector('.smc').textContent=i<0?'':`${Math.min(c+1,n)} of ${n} stops · ${shown} link${shown===1?'':'s'}`;
 place();draw(false);
 const s=story(i);tl.classList.add('fade');clearTimeout(tlT);tlT=setTimeout(()=>{tl.querySelector('.k').textContent=s.k;tl.querySelector('.t').innerHTML=s.t;tl.querySelector('.m').textContent=s.m;tl.querySelector('.m').style.display=s.m?'':'none';tl.classList.remove('fade');layout()},200);
 if(body.scrollHeight<=body.clientHeight+2)body.scrollTop=0;else if(c>=0){const y=8+c*RH;if(y<body.scrollTop||y>body.scrollTop+body.clientHeight-RH*2)body.scrollTo({top:y-body.clientHeight/2,behavior:'smooth'})}
 const rel=new Set(E.filter(e=>e.b===i||(e.a===i&&e.b<=c)).flatMap(e=>[e.a,e.b]));rows.forEach((r,j)=>r.classList.toggle('rel',rel.has(j)&&j!==i));
 ghost.style.display=c>=0&&c<n-1?'':'none';
 const card=document.getElementById('card');if(card&&i>=0&&i<n&&!card.querySelector('.sm-tl')){const d=document.createElement('div');d.className='sm-tl';d.textContent=short(i);d.onclick=e=>{e.stopPropagation();open()};card.prepend(d)}
 const b=document.getElementById('smbtn');if(b)b.innerHTML=`Map <b>${Math.max(0,c+1)}</b>`}
function open(){el.classList.add('open');shade.classList.add('on');layout();if(body.scrollHeight<=body.clientHeight+2)body.scrollTop=0}
function close(){el.classList.remove('open');shade.classList.remove('on')}
el.querySelector('.smx').onclick=close;shade.onclick=close;
const nav=document.getElementById('nav');if(nav){const b=document.createElement('button');b.id='smbtn';b.type='button';b.setAttribute('aria-label','Open the story so far');b.innerHTML='Map <b>0</b>';b.onclick=open;nav.insertBefore(b,document.getElementById('next'))}
addEventListener('resize',layout);
window.StoryMap={update:i=>{update(i);if(window.__smFill)return},refill:i=>{cur=-2;update(i)},open,close};
requestAnimationFrame(()=>{layout()});
})();
