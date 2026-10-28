// Word time machine: a static flip deck. Data comes from window.CARDS (cards.js).
(function(){
const ALL=window.CARDS,$=s=>document.querySelector(s),esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const MD={narrowing:'Narrowing: the meaning got smaller.',broadening:'Broadening: the meaning got bigger.',pejoration:'Pejoration: the meaning got worse.',amelioration:'Amelioration: the meaning got better.',weakening:'Weakening: a strong word wore out.',shift:'Shift: the meaning jumped sideways, often by comparison.'};
const ERAS=['Old English','Middle English','1500–1699','1700–1899','1900 on'];
const fm=$('#fm'),fe=$('#fe');
fm.innerHTML='<option value="">All kinds</option>'+Object.keys(MD).map(k=>`<option value="${k}">${k[0].toUpperCase()+k.slice(1)} (${ALL.filter(c=>c.m===k).length})</option>`).join('');
fe.innerHTML='<option value="">All eras</option>'+ERAS.map(e=>`<option value="${e}">${e} (${ALL.filter(c=>c.era===e).length})</option>`).join('');
let order=ALL.map((_,j)=>j),list=[],i=0,flip=false;const ans={};let rng=Math.random;
// choices are fixed per card per session so they don't reshuffle on revisit
const opts={};function choices(ci){if(opts[ci])return opts[ci];const c=ALL[ci];const pool=ALL.map((_,j)=>j).filter(j=>j!==ci&&ALL[j].then!==c.then);const a=[ci];while(a.length<3){const r=pool[Math.floor(rng()*pool.length)];if(!a.includes(r))a.push(r)}for(let k=a.length-1;k>0;k--){const r=Math.floor(rng()*(k+1));[a[k],a[r]]=[a[r],a[k]]}return opts[ci]=a}
function apply(){const m=fm.value,e=fe.value;list=order.filter(j=>(!m||ALL[j].m===m)&&(!e||ALL[j].era===e));i=0;flip=false;render()}
function score(){const k=Object.keys(ans);$('#score').textContent=`Score ${k.filter(x=>ans[x].ok).length} / ${k.length}`}
function render(){const sc=$('#scene');score();
 if(!list.length){sc.innerHTML='<div class="empty">No cards match. Try another filter.</div>';$('#cnt').textContent='0 / 0';$('#pos').textContent='';$('#pbar').style.width='0';return}
 const ci=list[i],c=ALL[ci],a=ans[ci],ch=choices(ci);
 $('#cnt').textContent=`${i+1} / ${list.length}`;$('#pos').textContent=`${i+1} / ${list.length}`;$('#pbar').style.width=((i+1)/list.length*100)+'%';
 $('#prev').disabled=i===0;$('#next').disabled=i===list.length-1;
 sc.innerHTML=`<div class="fc${flip?' flip':''}" id="fc" role="group" aria-label="Card ${i+1} of ${list.length}: ${esc(c.w)}">
 <section class="face front" aria-hidden="${flip}">
  <div class="eb"><span class="chip">${esc(c.era)}</span></div>
  <h2 class="word">${esc(c.w)}</h2><div class="dyr">${esc(c.y)}</div>
  <p class="ex">“${esc(c.ex)}”</p><p class="exl">Made-up example of the old sense</p>
  <p class="q">What did they mean?</p>
  <div class="ch">${ch.map((j,n)=>`<button type="button" data-j="${j}" ${a?'disabled':''} class="${a?(j===ci?'ok':(a.pick===j?'no':'')):''}">${n+1}. ${esc(ALL[j].then)}</button>`).join('')}</div>
  <div class="hint">Tap a choice, or tap the card to flip.</div>
 </section>
 <section class="face back" aria-hidden="${!flip}">
  <div class="eb"><span class="chip">${esc(c.era)}</span>${a?`<span class="res ${a.ok?'ok':'no'}">${a.ok?'You got it':'Not this time'}</span>`:''}</div>
  <h2 class="word">${esc(c.w)}</h2>
  <div><p class="dtn">Then · ${esc(c.y)}</p><p class="dtv">${esc(c.then)}</p></div>
  <div><p class="dtn">Now</p><p class="dtv">${esc(c.now)}</p></div>
  <span class="mtag">${esc(c.m)}</span><p class="md">${esc(MD[c.m])}</p>
  <div class="srcl">Source · <a href="${esc(c.url)}" target="_blank" rel="noopener">Etymonline: ${esc(c.w)} ›</a>${c.url2?` · <a href="${esc(c.url2)}" target="_blank" rel="noopener">Cambridge Dictionary ›</a>`:''}</div>
  <div class="hint">Tap to flip back.</div>
 </section></div>`;
 const fc=$('#fc');
 fc.onclick=e=>{if(e.target.closest('a'))return;const b=e.target.closest('button[data-j]');if(b){pick(+b.dataset.j);return}toggle()};
 window.__state={i,n:list.length,flip,word:c.w}}
function pick(j){const ci=list[i];if(ans[ci])return;ans[ci]={pick:j,ok:j===ci};flip=true;render()}
function toggle(){flip=!flip;const fc=$('#fc');if(fc){fc.classList.toggle('flip',flip);fc.querySelector('.front').setAttribute('aria-hidden',flip);fc.querySelector('.back').setAttribute('aria-hidden',!flip)}window.__state&&(window.__state.flip=flip)}
let busy=0;function go(d){const n=i+d;if(n<0||n>=list.length||busy)return;busy=1;const fc=$('#fc');fc&&fc.classList.add('out');setTimeout(()=>{i=n;flip=false;render();busy=0;window.scrollTo({top:0})},160)}
$('#prev').onclick=()=>go(-1);$('#next').onclick=()=>go(1);
fm.onchange=fe.onchange=apply;
$('#shuf').onclick=()=>{for(let k=order.length-1;k>0;k--){const r=Math.floor(Math.random()*(k+1));[order[k],order[r]]=[order[r],order[k]]}apply()};
addEventListener('keydown',e=>{if(e.target.tagName==='SELECT')return;if(e.key==='ArrowRight')go(1);else if(e.key==='ArrowLeft')go(-1);else if(e.key===' '||e.key==='Enter'){if(e.target.tagName==='BUTTON'&&e.target.id)return;e.preventDefault();toggle()}else if(/^[1-3]$/.test(e.key)&&!flip&&list.length){pick(choices(list[i])[+e.key-1])}});
let sx=0,sy=0;const sc=$('#scene');sc.addEventListener('touchstart',e=>{sx=e.touches[0].clientX;sy=e.touches[0].clientY},{passive:true});
sc.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.5)go(dx<0?1:-1)},{passive:true});
apply();
})();
