/* Drawing helpers for the bright courtyard demos (Things being shaped, Learning & holding). Canvas only; logical 600x800. */
(function(){const G=window.Demo.G,INK='#1f1a14',BLUE='#16507a',SAFF='#d9861c',TERRA='#c2410c',TEAL='#1d8a8a',CREAM='#fffaf0';
const c=()=>G.c;
const K={INK,BLUE,SAFF,TERRA,TEAL,CREAM,GREEN:'#2f8a4a',
 font(sz,w=700,serif){return serif?`${sz}px 'Instrument Serif',Georgia,serif`:`${w} ${sz}px -apple-system,system-ui,'Segoe UI',sans-serif`},
 /* frosted cream card */
 panel(x,y,w,h,al=1,o={}){if(al<=0)return;const C=c();C.save();C.globalAlpha=al;C.shadowColor='rgba(60,40,10,.25)';C.shadowBlur=18;C.shadowOffsetY=6;G.rr(x,y,w,h,o.r||18,o.bg||'rgba(255,250,240,.93)');C.restore();C.save();C.globalAlpha=al;G.rr(x,y,w,h,o.r||18,null,o.line||'#c9a86a',1,2);if(o.band){G.rr(x,y,w,8,4,o.band)}C.restore()},
 /* text with optional wrapping, dark ink by default */
 txt(s,x,y,o={}){const C=c();const sz=Math.max(o.size||24,12/G.k);C.save();C.globalAlpha=G.clamp(o.al??1);C.fillStyle=o.col||INK;C.font=K.font(sz,o.w||700,o.serif);C.textAlign=o.align||'center';C.textBaseline='middle';
  if(o.max){const words=String(s).split(' ');let line='',ly=y;const lh=sz*(o.lh||1.22);const lines=[];for(const w of words){const t=line?line+' '+w:w;if(C.measureText(t).width>o.max&&line){lines.push(line);line=w}else line=t}lines.push(line);ly=y-(lines.length-1)*lh/2;for(const L of lines){C.fillText(L,x,ly);ly+=lh}}else{const mw=G.fitW(x,C.textAlign);if(C.measureText(s).width>mw)C.fillText(s,x,y,mw);else C.fillText(s,x,y)}C.restore()},
 /* pill tag */
 tag(s,x,y,o={}){const al=o.al??1;if(al<=0)return;const C=c(),sz=Math.max(o.size||20,12/G.k);C.save();C.font=K.font(sz,o.w||800);const w=C.measureText(s).width+sz*1.3,h=sz*1.75;C.restore();const sc=o.pop!=null?G.back(o.pop):1;G.at(x,y,sc);c().globalAlpha=al;c().shadowColor='rgba(40,25,5,.3)';c().shadowBlur=10;c().shadowOffsetY=3;G.rr(-w/2,-h/2,w,h,h/2,o.bg||BLUE);c().shadowBlur=0;c().shadowOffsetY=0;c().globalAlpha=1;K.txt(s,0,1,{size:sz,col:o.col||'#ffffff',al,w:o.w||800});G.end()},
 /* big number/word in serif */
 big(s,x,y,sz,col,al=1,sc=1){if(al<=0)return;G.at(x,y,sc);const C=c();C.save();C.globalAlpha=al;C.font=K.font(sz,400,1);C.textAlign='center';C.textBaseline='middle';C.lineWidth=sz*.12;C.strokeStyle='rgba(255,250,240,.95)';C.lineJoin='round';C.strokeText(s,0,0);C.fillStyle=col||TERRA;C.fillText(s,0,0);C.restore();G.end()},
 /* labelled bar chart: items [{v:0..1,label,col,val}] */
 bars(x,y,w,h,items,k=1,o={}){const n=items.length,gap=o.gap||18,bw=(w-gap*(n-1))/n;G.line(x-6,y+h,x+w+6,y+h,INK,2,.5);items.forEach((it,i)=>{const bx=x+i*(bw+gap),v=G.clamp(it.v)*G.ease(G.clamp(k*1.15-i*.15)),bh=v*h;G.rr(bx,y+h-bh,bw,bh,8,G.lg(0,y+h,0,y,[[0,G.mix(it.col||BLUE,'#000000',.15)],[1,G.mix(it.col||BLUE,'#ffffff',.25)]]));if(it.val&&v>0)K.txt(it.val,bx+bw/2,y+h-bh-18,{size:o.vs||22,col:it.col||BLUE,al:G.clamp(k*2-i*.2)});if(it.label)K.txt(it.label,bx+bw/2,y+h+22,{size:o.ls||17,w:600,max:bw+gap})})},
 /* magnifier circle; fn draws inside (clipped) */
 lens(x,y,r,fn,al=1,o={}){if(al<=0)return;const C=c();C.save();C.globalAlpha=al;C.shadowColor='rgba(40,25,5,.35)';C.shadowBlur=24;G.dot(x,y,r+10,o.rim||SAFF);C.shadowBlur=0;C.beginPath();C.arc(x,y,r,0,7);C.clip();G.dot(x,y,r,o.bg||'#fbf6ea');fn&&fn(x,y,r);C.restore();C.save();C.globalAlpha=al;G.ring(x,y,r,'#ffffff',3,.7);if(o.handle!==false){G.at(x+r*.72,y+r*.72,1,.785);G.rr(0,-9,r*.55,18,9,'#6b4a22');G.end()}C.restore()},
 /* plastic fragments: irregular coloured bits */
 bits(x,y,r,n,seed,o={}){const q=G.rnd(seed||7),cols=o.cols||['#2f6fd0','#e0464a','#f2c230','#ffffff','#2fa36b','#8a5bd0'];for(let i=0;i<n;i++){const a=q()*6.283,d=Math.sqrt(q())*r,px=x+Math.cos(a)*d,py=y+Math.sin(a)*d*(o.sq||1),s=(o.s||5)*(.6+q()*.9),rot=q()*6+(o.spin||0)*(q()-.5);const col=cols[Math.floor(q()*cols.length)];G.at(px,py,1,rot);const C=c();C.globalAlpha=o.al??1;C.fillStyle=col;C.strokeStyle='rgba(0,0,0,.35)';C.lineWidth=1;C.beginPath();if(q()<.4){C.rect(-s*1.6,-s*.35,s*3.2,s*.7)}else{C.moveTo(-s,-s*.6);C.lineTo(s*.8,-s);C.lineTo(s,s*.5);C.lineTo(-s*.3,s);C.closePath()}C.fill();C.stroke();C.globalAlpha=1;G.end()}},
 /* simple fish, side view */
 fish(x,y,s,col,o={}){const fl=o.flip?-1:1,w=Math.sin((G.t||0)*8+(o.ph||0))*(o.wig??.18);G.at(x,y,s);c().scale(fl,1);const C=c();C.globalAlpha=o.al??1;
  C.fillStyle=G.mix(col,'#000000',.15);C.beginPath();C.moveTo(-34,0);C.lineTo(-58,-18+w*40);C.lineTo(-54,0);C.lineTo(-58,18+w*40);C.closePath();C.fill();
  C.fillStyle=G.lg(0,-22,0,22,[[0,G.mix(col,'#000000',.25)],[.5,col],[1,G.mix(col,'#ffffff',.55)]]);C.beginPath();C.ellipse(0,0,40,19,0,0,7);C.fill();
  C.fillStyle=G.mix(col,'#000000',.2);C.beginPath();C.moveTo(-6,-17);C.quadraticCurveTo(6,-32,16,-16);C.fill();
  G.dot(24,-4,5,'#ffffff');G.dot(25,-4,2.8,'#111111');if(o.mark)G.dot(-2,4,9,o.mark,.9);C.globalAlpha=1;G.end()},
 /* top-down rat */
 rat(x,y,ang,s=1,col='#f4efe6'){G.at(x,y,s,ang);const C=c();C.strokeStyle='#d9a0a0';C.lineWidth=3;C.lineCap='round';C.beginPath();C.moveTo(-24,0);C.quadraticCurveTo(-46,10,-60,-4);C.stroke();C.fillStyle=G.rg(0,-6,2,0,0,30,[[0,'#ffffff'],[1,G.mix(col,'#8a7a66',.35)]]);C.beginPath();C.ellipse(-4,0,24,13,0,0,7);C.fill();C.beginPath();C.ellipse(20,0,13,9,0,0,7);C.fill();G.dot(14,-9,5,'#f0b8b8');G.dot(14,9,5,'#f0b8b8');G.dot(31,0,2.5,'#d07070');G.dot(23,-4,2,'#b03030');G.dot(23,4,2,'#b03030');G.end()},
 /* side-view sea snail; imp 0..1 grows a penis-like male organ (imposex) */
 snail(x,y,s,imp=0,o={}){G.at(x,y,s);const C=c();C.fillStyle='#e9d9c2';C.beginPath();C.ellipse(0,18,46,12,0,0,7);C.fill();
  C.fillStyle=G.rg(-10,-20,4,0,0,60,[[0,'#fff3dc'],[.6,'#d9b98a'],[1,'#8a6a3a']]);C.beginPath();C.moveTo(-40,14);C.quadraticCurveTo(-46,-30,-6,-46);C.quadraticCurveTo(30,-52,36,-14);C.quadraticCurveTo(38,10,20,16);C.closePath();C.fill();
  C.strokeStyle='rgba(90,60,30,.55)';C.lineWidth=2.5;for(let i=0;i<4;i++){C.beginPath();C.arc(-2,-14,10+i*9,3.6,5.9);C.stroke()}
  G.line(30,14,52,-2,'#cdb59a',4);G.line(30,14,54,8,'#cdb59a',4);
  if(imp>0){C.strokeStyle=G.rgba(o.impCol||'#c2410c',.95);C.lineWidth=7;C.lineCap='round';C.beginPath();C.moveTo(14,20);C.quadraticCurveTo(26,30+imp*4,22+imp*30,26+imp*6);C.stroke();G.bloom(22+imp*30,26+imp*6,26,'#ff7a40',.5*imp)}G.end()},
 /* row of people icons; lit: number highlighted */
 people(x,y,n,per,sz,lit,col,litCol,al=1){for(let i=0;i<n;i++){const px=x+(i%per)*sz*1.1,py=y+Math.floor(i/per)*sz*1.45,on=i<lit;const cc=on?(litCol||TERRA):(col||'#b8a58a');c().globalAlpha=al;G.dot(px,py-sz*.32,sz*.22,cc);G.rr(px-sz*.3,py-sz*.06,sz*.6,sz*.62,sz*.28,cc);c().globalAlpha=1}},
 /* EEG/brain-wave trace */
 trace(x,y,w,fn,col,lw=3,al=1){G.wave(x,y,w,fn,col,lw,al)},
 /* sparkle burst */
 burst(x,y,r,k,col){if(k<=0||k>=1)return;G.ring(x,y,r*G.ease(k),col||SAFF,6*(1-k),1-k);G.bloom(x,y,r*.8,col||SAFF,.5*(1-k))},
 /* arrow with label */
 note(s,x,y,tx,ty,al=1,o={}){if(al<=0)return;G.curveArrow(x,y,(x+tx)/2+(o.bend||0),(y+ty)/2-(o.lift??30),tx,ty,o.col||INK,3,al*.8);K.tag(s,x,y,{al,bg:o.bg||CREAM,col:o.tc||INK,size:o.size||18})},
 /* soft wash over the painting to make overlays read */
 wash(al=.35,col='#fffaf0',y0=0,y1=800){c().fillStyle=G.rgba(col,al);c().fillRect(0,y0,600,y1-y0)},
 /* tiny neuron node for networks */
 node(x,y,r,on=0,col){G.dot(x,y,r+2,'#ffffff',.9);G.dot(x,y,r,G.mix('#d9c7ae',col||SAFF,on));if(on>.05)G.glow(x,y,r*3.2,col||SAFF,.5*on)},
 /* clock-style timer */
 timer(x,y,r,frac,label){G.dot(x,y,r+6,'#ffffff',.95);G.ring(x,y,r+6,INK,2,.3);const C=c();C.fillStyle=G.rgba(TERRA,.85);C.beginPath();C.moveTo(x,y);C.arc(x,y,r,-1.5708,-1.5708+6.283*G.clamp(frac));C.closePath();C.fill();if(label)K.txt(label,x,y+r+26,{size:18})}
};
window.K=K;})();
