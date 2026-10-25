// Reality Society walk engine. Data comes from window.WALK (data.js). Every stop is rebuilt from scratch, so no text is left over.
(function(){
const W=window.WALK,S=W.stops,N=S.length,$=s=>document.querySelector(s),st=$('#stage');
const KL={principle:'Principle',shift:'Shift',clash:'Clash'},KD={principle:'what the teaching says',shift:'how practice changed',clash:'where it collided with society'};
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let i=Math.max(0,Math.min(N+1,parseInt(new URLSearchParams(location.search).get('stop')||'0')||0));
const tl=cur=>`<div class="tl" aria-hidden="true">${S.map((s,j)=>`<b class="${s.k}${j<cur-1?' done':''}${j===cur-1?' now':''}"></b>`).join('')}</div>`;
const legend=()=>`<div class="legend">${Object.keys(KL).map(k=>`<span class="chip k k-${k}"><i></i>${KL[k]}: ${KD[k]}</span>`).join('')}</div>`;
function view(){
 if(i===0)return `<div class="eyebrow">Reality Society · a walk</div><h1 class="large">${esc(W.title)}</h1><p class="lede">${esc(W.intro)}</p>${legend()}${tl(0)}<p class="sec"><button class="pill" id="start">Start the walk</button></p><p class="foot">${esc(W.note)}</p>`;
 if(i===N+1)return `<div class="eyebrow">End of the walk</div><h1 class="large">${esc(W.endTitle)}</h1>${tl(N+1)}<div class="sec oh k-principle"><p>${esc(W.endOh)}</p></div><div class="sec"><h3>Still missing from this walk</h3>${W.gaps.map(g=>`<p style="margin-bottom:8px">• ${esc(g)}</p>`).join('')}</div><div class="sec list"><a href="../">More walks on Reality Society <span>›</span></a><a href="../../">Reality Sourcing <span>›</span></a></div>`;
 const s=S[i-1];
 return `<article class="stop k-${s.k}"><div class="hero"><img src="img/${String(i).padStart(2,'0')}.webp?v=s1" alt="${esc(s.alt||s.head)}"><div class="yr">${esc(s.y)}</div></div>
 <div class="txt"><div class="meta"><span class="chip k k-${s.k}"><i></i>${KL[s.k]}</span><span class="chip">${i} of ${N}</span>${s.thin?'<span class="chip">Thin evidence</span>':''}</div>
 <h2>${esc(s.head)}</h2><p class="who">${esc(s.place)} · ${esc(s.who)}</p>${tl(i)}
 <section class="sec"><h3>What happened</h3><p>${esc(s.cap)}</p></section>
 <section class="sec"><h3>How it spread</h3><p>${esc(s.spread)}</p></section>
 <section class="sec oh"><h3>Oh</h3><p>${esc(s.oh)}</p></section>
 <section class="sec"><h3>Words to know</h3><dl class="terms">${s.terms.map(t=>`<div><dt>${esc(t[0])}:</dt> <dd>${esc(t[1])}</dd></div>`).join('')}</dl></section>
 ${s.thin?`<section class="sec thin">Thin evidence: ${esc(s.thin)}</section>`:''}
 <section class="sec src">Source · ${esc(s.src)} · <a href="${esc(s.url)}" target="_blank" rel="noopener">see the original</a>${s.url2?` · <a href="${esc(s.url2)}" target="_blank" rel="noopener">see the other source</a>`:''}</section></div></article>`}
function render(dir){st.innerHTML=view();window.scrollTo(0,0);
 $('#prev').disabled=i===0;$('#next').textContent=i===0?'Start':i===N+1?'Done':'Next';$('#next').classList.toggle('go',i===0);
 $('#pos').textContent=i===0?'Introduction':i===N+1?'The end':`${S[i-1].y} · ${i}/${N}`;
 history.replaceState(null,'','?stop='+i);window.__state={i,N};const b=$('#start');if(b)b.onclick=()=>go(1);
 document.dispatchEvent(new Event('scroll'))}
let busy=0;function go(d){if(i===N+1&&d>0){location.href='../';return}const n=Math.max(0,Math.min(N+1,i+d));if(n===i||busy)return;busy=1;st.style.setProperty('--dx',(d>0?-24:24)+'px');st.classList.add('out');
 setTimeout(()=>{i=n;render(d);st.style.setProperty('--dx',(d>0?24:-24)+'px');void st.offsetWidth;st.style.setProperty('--dx','0px');st.classList.remove('out');busy=0},200)}
window.__go=n=>{i=n;render(0)};
$('#prev').onclick=()=>go(-1);$('#next').onclick=()=>go(1);
addEventListener('keydown',e=>{if(e.key==='ArrowRight')go(1);if(e.key==='ArrowLeft')go(-1)});
let sx=0,sy=0;addEventListener('touchstart',e=>{sx=e.touches[0].clientX;sy=e.touches[0].clientY},{passive:true});
addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5)go(dx<0?1:-1)},{passive:true});
render(0);
})();
