// Cinematic layer: hero art on stop cards, room banners, and a contact sheet of every room and stop on the intro.
// Every word shown comes from window.FIELD (the site's own Pixel Hound data). Images: ../art/cin/<walk>/NN.webp and rN.webp.
(function(){
const F=window.FIELD,M=F.meta,W=(M.title||F.field).toLowerCase(),BASE='../art/cin/'+W+'/',P=window.DEMO_PAL||{a:'#f6a640',hi:'#ffe6b8'};
const pad=n=>String(n).padStart(2,'0'),hero=n=>BASE+pad(n)+'.webp',banner=ri=>BASE+'r'+(ri+1)+'.webp';
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const stops=[];F.rooms.forEach((r,ri)=>r.cards.forEach(c=>stops.push({...c,ri})));
// names: the site's own name list; if Pixel Hound has no authors, show the record's title instead
const who=s=>(M.names||{})[s.n]||String(s.src||'').replace(/,\s*\d{4}$/,'');
const roomParts=r=>{const m=String(r.name).match(/^Room\s*(\d+)\s*·\s*(.*?)\s*\(([^)]*)\)\s*$/);return m?{num:m[1],name:m[2],yrs:m[3]}:{num:'',name:r.name,yrs:''}};
const css=`
:root{--ca:${P.a};--chi:${P.hi}}
.cin-hero{position:relative;margin:-14px -18px 12px;border-radius:15px 15px 0 0;overflow:hidden;aspect-ratio:4/3;max-height:30vh;width:calc(100% + 36px);background:#000}
.cin-hero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;transform:scale(1.04);animation:cinKen 14s ease-out forwards}
@keyframes cinKen{to{transform:scale(1.12) translate(-1.5%,-1%)}}
.cin-hero:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,#0000 35%,#000a 72%,#000e)}
.cin-ov{position:absolute;left:16px;right:16px;bottom:12px;z-index:1;display:flex;align-items:flex-end;gap:12px;color:#fff;text-shadow:0 2px 14px #000}
.cin-num{font:400 54px/0.8 'Instrument Serif',Georgia,serif;color:var(--chi);text-shadow:0 0 24px var(--ca)}
.cin-txt{display:flex;flex-direction:column;gap:1px;min-width:0}
.cin-yr{font:12px/1.2 -apple-system,system-ui,sans-serif;letter-spacing:.18em;color:var(--chi);opacity:.9}
.cin-nm{font:400 22px/1.05 'Instrument Serif',Georgia,serif}
.cin-sub{font:italic 15px/1.2 'Instrument Serif',Georgia,serif;opacity:.85}
#card.thin .cin-hero img{filter:saturate(.75) brightness(.9)}
.cin-thin{position:absolute;top:10px;right:12px;z-index:1;font:10.5px/1.5 -apple-system,system-ui,sans-serif;padding:1px 8px;border-radius:9px;border:1px dashed #fff8;color:#fff;background:#0006}
@media(min-width:900px){.cin-hero{max-height:none}}
@media(max-width:899px){#card{max-height:58vh}.cin-hero{max-height:26vh}}
#card .cin-hero:not(:first-child){margin-top:6px;border-radius:12px}#card .cin-hero~.hd{display:none}#card .cin-hero~.y{font-size:0;line-height:1;margin-top:-2px}#card .cin-hero~.y .tag:first-child{margin-left:0}
#cin-ban{position:fixed;left:50%;top:calc(env(safe-area-inset-top) + 10px);transform:translate(-50%,-12px);width:min(760px,calc(100% - 20px));aspect-ratio:16/7;border-radius:16px;overflow:hidden;z-index:6;opacity:0;pointer-events:none;transition:opacity .6s,transform .6s;box-shadow:0 20px 60px #000c,0 0 40px #0008;border:1px solid #ffffff22;cursor:pointer}
#cin-ban.on{opacity:1;transform:translate(-50%,0);pointer-events:auto}
#cin-ban img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
#cin-ban:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,#0005,#0000 30%,#0000 50%,#000d)}
.cin-bt{position:absolute;left:0;right:0;bottom:12px;z-index:1;text-align:center;color:#fff;text-shadow:0 2px 16px #000;padding:0 14px}
.cin-bt b{display:block;font:400 clamp(24px,5vw,40px)/1 'Instrument Serif',Georgia,serif}
.cin-bt i{display:block;font:12px/1.4 -apple-system,system-ui,sans-serif;letter-spacing:.2em;color:var(--chi);margin-top:4px;font-style:normal}
.cin-bt span{display:block;font:italic 15px/1.3 'Instrument Serif',Georgia,serif;opacity:.9;margin-top:3px}
#title.cin{justify-content:flex-start;overflow-y:auto;-webkit-overflow-scrolling:touch;touch-action:pan-y;padding-top:calc(env(safe-area-inset-top) + 8vh)}
#title.cin>*{flex-shrink:0}
.cin-sheet{width:min(1180px,100%);margin:34px auto 30px;text-align:left}
.cin-sheet h3{font:11px -apple-system,system-ui,sans-serif;letter-spacing:.3em;text-transform:uppercase;color:#c9a46a;text-align:center;margin:0 0 12px;font-weight:400}
.cin-rooms{display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin-bottom:6px}
.cin-tiles{display:grid;grid-template-columns:repeat(5,1fr);gap:6px}
.cin-t{position:relative;display:block;border:0;padding:0;margin:0;border-radius:8px;overflow:hidden;background:#000;cursor:pointer;color:#fff;text-align:left;font:inherit;box-shadow:0 0 0 1px #ffffff14}
.cin-t img{display:block;width:100%;aspect-ratio:4/3;object-fit:cover;transition:transform .5s}
.cin-rooms .cin-t img{aspect-ratio:16/10}
.cin-t:hover img,.cin-t:focus-visible img{transform:scale(1.06)}
.cin-t:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,#0006,#0000 40%,#0000 55%,#000c)}
.cin-t .tn{position:absolute;left:8px;top:6px;z-index:1;font:400 26px/1 'Instrument Serif',Georgia,serif;color:var(--chi);text-shadow:0 0 14px #000,0 0 18px var(--ca)}
.cin-t .ty{position:absolute;left:36px;top:9px;z-index:1;font:10px -apple-system,system-ui,sans-serif;letter-spacing:.14em;opacity:.85;text-shadow:0 1px 6px #000}
.cin-t .tb{position:absolute;left:8px;right:8px;bottom:6px;z-index:1;text-shadow:0 1px 8px #000}
.cin-t .tb b{display:block;font:400 15px/1.05 'Instrument Serif',Georgia,serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cin-t .tb s{display:block;text-decoration:none;font:italic 12.5px/1.15 'Instrument Serif',Georgia,serif;opacity:.85;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cin-t.thin img{filter:saturate(.7) brightness(.82)}
.cin-t.thin{box-shadow:0 0 0 1px #ffffff30 inset}
.cin-rooms .cin-t .tb{text-align:center}.cin-rooms .cin-t .tb b{font-size:17px;white-space:normal}.cin-rooms .cin-t .tn{display:none}
.cin-note{font:11.5px/1.4 -apple-system,system-ui,sans-serif;opacity:.6;text-align:center;margin-top:10px}
@media(max-width:700px){.cin-rooms{grid-template-columns:1fr 1fr}.cin-rooms .cin-t:last-child{grid-column:1/-1}.cin-rooms .cin-t:last-child img{aspect-ratio:16/7}.cin-tiles{grid-template-columns:1fr 1fr}.cin-sheet{margin-top:26px}}
`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
function heroHTML(s){const p=roomParts(F.rooms[s.ri]);return `<div class="cin-hero"><img src="${hero(s.n)}" alt="${esc(s.screen||s.head)}" decoding="async">${s.thin?'<span class="cin-thin">Only a little evidence so far</span>':''}<div class="cin-ov"><div class="cin-num">${s.n}</div><div class="cin-txt"><span class="cin-yr">${s.year}</span><span class="cin-nm">${esc(who(s))}</span><span class="cin-sub">${esc(s.head)}</span></div></div></div>`}
// room banner pops when you walk into a new room
let ban,banT,lastRoom=-1;
function room(ri){if(ri===lastRoom)return;lastRoom=ri;if(ri<0)return;if(!ban){ban=document.createElement('div');ban.id='cin-ban';ban.onclick=()=>ban.classList.remove('on');document.body.appendChild(ban)}
 const r=F.rooms[ri],p=roomParts(r);ban.innerHTML=`<img src="${banner(ri)}" alt=""><div class="cin-bt"><i>ROOM ${esc(p.num)} · ${esc(p.yrs)}</i><b>${esc(p.name)}</b><span>${esc(r.note)}</span></div>`;
 requestAnimationFrame(()=>ban.classList.add('on'));clearTimeout(banT);banT=setTimeout(()=>ban.classList.remove('on'),3400)}
function sheet(go){const t=document.getElementById('title');if(!t||t.querySelector('.cin-sheet'))return;t.classList.add('cin');
 const first=ri=>stops.findIndex(s=>s.ri===ri)+1;
 const rooms=F.rooms.map((r,ri)=>{const p=roomParts(r);return `<button class="cin-t" data-go="${first(ri)}" aria-label="Go to room ${esc(p.num)}: ${esc(p.name)}"><img src="${banner(ri)}" alt="" loading="lazy" decoding="async"><span class="ty">ROOM ${esc(p.num)} · ${esc(p.yrs)}</span><span class="tb"><b>${esc(p.name)}</b></span></button>`}).join('');
 const tiles=stops.map(s=>`<button class="cin-t${s.thin?' thin':''}" data-go="${s.n}" aria-label="Stop ${s.n}, ${s.year}, ${esc(who(s))}: ${esc(s.head)}"><img src="${hero(s.n)}" alt="" loading="lazy" decoding="async"><span class="tn">${s.n}</span><span class="ty">${s.year}</span><span class="tb"><b>${esc(who(s))}</b><s>${esc(s.head)}</s></span></button>`).join('');
 const d=document.createElement('div');d.className='cin-sheet';d.innerHTML=`<h3>Every room and every stop</h3><div class="cin-rooms">${rooms}</div><div class="cin-tiles">${tiles}</div><div class="cin-note">Tap any picture to jump straight there. Paler pictures have only a little evidence so far.</div>`;
 t.appendChild(d);d.addEventListener('click',e=>{const b=e.target.closest('[data-go]');if(b){e.stopPropagation();go(+b.dataset.go)}});
 ['touchstart','touchend','wheel'].forEach(ev=>t.addEventListener(ev,e=>e.stopPropagation(),{passive:true}))}
window.DEMO_HERO=hero;
window.Cin={hero,banner,heroHTML,room,sheet,who};
})();
