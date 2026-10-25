(function(){
const G=window.Demo.G,lerp=G.lerp,ramp=(t,a,b)=>G.ramp(t,a,b),win=(t,a,b,f)=>G.win(t,a,b,f);
const INK='#2a1d10',TILE='#1d4f9e',SAFF='#e08a12',TEAL='#11806f',ROSE='#c0392f',CREAM='#fff8ea',SAGE='#4f8a2e',GOLD='#f2b84b';
const WALK=window.FIELD.meta.title,PN=n=>'../../art/cin/'+WALK+'/d'+String(n).padStart(2,'0');
const D={};
function back(n,t,o={}){const c=G.c,z=1.03+.06*G.clamp(t/22);c.save();c.translate(o.fx??300,o.fy??300);c.scale(z,z);c.translate(-(o.fx??300),-(o.fy??300));if(!G.pic(PN(n),0,0,600,800)){c.fillStyle=G.lg(0,0,0,800,[[0,'#fbefd6'],[1,'#e9d2a6']]);c.fillRect(0,0,600,800)}c.restore();
 if(o.wash){c.fillStyle=G.rgba(CREAM,o.wash);c.fillRect(0,0,600,800)}
 const g=G.lg(0,430,0,800,[[0,'rgba(255,248,234,0)'],[1,'rgba(255,244,222,.55)']]);c.fillStyle=g;c.fillRect(0,430,600,370)}
function panel(x,y,w,h,al=1){if(al<=0)return;const c=G.c;c.save();c.globalAlpha=al;c.shadowColor='rgba(70,40,10,.38)';c.shadowBlur=26;c.shadowOffsetY=8;G.rr(x,y,w,h,22,'#fff8ea');c.restore();c.globalAlpha=1;
 G.rr(x,y,w,h,22,null,TILE,.7*al,3);G.rr(x+7,y+7,w-14,h-14,16,null,SAFF,.45*al,1.4);
 const q=8;for(let i=0;i<q;i++){const px=x+30+i*(w-60)/(q-1);G.dot(px,y+1.5,3.2,i%2?SAFF:TILE,.8*al)}}
function T(s,x,y,o={}){G.text(s,x,y,Object.assign({col:INK,size:24,w:700},o))}
function S(s,x,y,size,col,al=1,it){G.text(s,x,y,{serif:1,size,col:col||INK,al,it})}
function chip(s,x,y,col=TILE,al=1,size=21){if(al<=0)return;const c=G.c;const z=Math.max(size,12/G.k);c.font=`700 ${z}px -apple-system,system-ui,sans-serif`;const w=Math.min(c.measureText(s).width+30,G.fitW(x,"center")+8);G.rr(x-w/2,y-z*.9,w,z*1.8,z*.9,G.rgba(col,.95*al));T(s,x,y+1,{col:"#ffffff",size,al,maxW:w-24})}
function hbar(x,y,w,h,v,col,lab,val,al=1){if(al<=0)return;G.rr(x,y,w,h,h/2,G.rgba(INK,.09*al));if(v>0.005)G.rr(x,y,Math.max(h,v*w),h,h/2,G.rgba(col,al));T(lab,x,y-17,{align:'left',size:20,al,w:600});if(val)T(val,x+w,y-17,{align:'right',size:21,al,col,w:800})}
function vbar(x,base,w,hmax,v,col,lab,val,al=1){if(al<=0)return;G.rr(x,base-hmax,w,hmax,10,G.rgba(INK,.07*al));const h=Math.max(0,v)*hmax;if(h>2)G.rr(x,base-h,w,h,10,G.rgba(col,al));T(lab,x+w/2,base+22,{size:19,al,w:600});if(val)T(val,x+w/2,base-h-18,{size:22,al,col,w:800})}
function badge(s,t0,t){G.stamp(s,300,90,t0,t,ROSE,30)}
function spark(x,y,col,k){if(k<=0)return;G.bloom(x,y,60,col,.7*k);G.ring(x,y,14+26*(1-k),col,3,k)}
function bubble(x,y,w,h,txt,al=1,col=INK,size=24,tail){if(al<=0)return;const c=G.c;c.save();c.globalAlpha=al;c.shadowColor='rgba(60,30,10,.3)';c.shadowBlur=14;G.rr(x,y,w,h,h/2>26?26:h/2,'#ffffff');c.restore();if(tail){c.globalAlpha=al;c.fillStyle='#ffffff';c.beginPath();c.moveTo(x+w*.3,y+h-2);c.lineTo(tail[0],tail[1]);c.lineTo(x+w*.45,y+h-2);c.fill();c.globalAlpha=1}T(txt,x+w/2,y+h/2+1,{size,col,al})}
function trace(x,y,w,fn,col,lw=3.5,al=1){G.wave(x,y,w,fn,col,lw,al)}
function brainAt(x,y,s,spots,al=1){G.brain(x,y,s,{spots,al,tint:'#eab3a5'})}
function standin(t){if(t<.2)return;const k=G.clamp(t/0.8);chip('Stand-in scene · not an experiment',300,38,'#7a5a2a',.92*k,19)}
function beyond(t){chip('Beyond our Pixel Hound records',300,38,TEAL,.92*G.clamp(t/0.8),19)}
// 1 Broca: understands, but can only say "tan"
D[1]={dur:16,pics:[PN(1)],rv:10,rvx:300,rvy:600,draw(g,t){back(1,t);
 const q=[['Point to the window?',1.2],['Is it morning?',3.4],['Your name?',5.6]];
 q.forEach(([s,a],i)=>{const k=win(t,a,a+2.1,.3);bubble(330,150,250,58,s,k,TILE,22,[400,250]);
  if(t>a+.9&&t<a+2.3){if(i<2)G.mark(160,330,true,win(t,a+.9,a+2.3,.2),.9);else bubble(60,300,170,58,'"tan… tan"',win(t,a+.9,a+2.3,.2),ROSE,24,[200,420])}});
 const p=ramp(t,8,9.2);panel(70,470,460,300,p);if(p>0){brainAt(300,640,.95,[[-110,-40,48,G.clamp((t-9.5)/1.2)*(.75+.2*Math.sin(t*4)),SAFF]],p);
  T('front',140,520,{size:19,al:p,col:'#7a5a2a',w:600});T('LEFT side of the brain',300,505,{size:22,al:p});if(t>10)T('damaged spot',190,740,{size:21,col:SAFF,al:ramp(t,10,11),w:800});G.curveArrow(200,720,160,690,180,610,SAFF,4,ramp(t,10,11))}}};
// 2 Shannon: guess the next letter
const SH='THE CAT SAT ON THE MAT',SG=[2,1,1,0,5,1,1,0,3,2,1,0,4,1,0,1,1,1,0,2,1,1];
D[2]={dur:17,pics:[PN(2)],draw(g,t){back(2,t);panel(30,440,540,330);
 const n=Math.floor(G.clamp((t-1.5)/9)*SH.length);T('Guess the next letter',300,480,{size:24,col:TILE});
 for(let i=0;i<SH.length;i++){const x=58+i*22.5,y=560;const ch=SH[i];if(ch===' ')continue;const shown=i<n;G.rr(x-10,y-22,21,40,5,shown?'#fff':G.rgba(INK,.06),TILE,.35,1);if(shown)T(ch,x,y,{size:22,col:INK});else if(i===n&&Math.sin(t*8)>0)G.line(x-6,y+12,x+6,y+12,SAFF,3);
  if(shown&&SG[i]){const v=SG[i];G.rr(x-8,640-v*14,16,v*14,4,v>2?ROSE:v>1?SAFF:SAGE)}}
 T('guesses needed for each letter',300,668,{size:19,w:600,col:'#6b5636'});
 const k=ramp(t,11.5,12.5);if(k>0){T('Most letters: right first time',300,712,{size:22,col:SAGE,al:k});T('Word starts: harder',300,746,{size:21,col:ROSE,al:k})}
 G.text('example numbers',540,770,{size:15,col:'#8a7350',align:'right',w:500,al:.9})}};
// 3 Collins & Quillian: a tree of facts, timed
const CQ=[['A canary can sing',2],['A canary can fly',1],['A canary has skin',0]];
D[3]={dur:17,pics:[PN(3)],draw(g,t){back(3,t);panel(30,420,540,355);
 const N=[[300,470,'ANIMAL','has skin'],[300,560,'BIRD','can fly'],[300,650,'CANARY','can sing']];
 if(t<11.8){G.line(300,490,300,540,TILE,4,.6);G.line(300,580,300,630,TILE,4,.6)}
 const ph=Math.floor(G.clamp((t-1)/3.6,0,2.99)),lt=((t-1)%3.6),act=t>1&&t<11.8;
 if(t<11.8)N.forEach(([x,y,a,b],i)=>{const hot=act&&CQ[ph][1]===i&&lt>1+(2-i)*.55;G.rr(x-95,y-24,190,48,24,hot?SAFF:'#fff',TILE,.8,2);T(a,x,y,{size:21,col:hot?'#fff':INK});T(b,x+170,y,{size:19,col:'#6b5636',w:600})});
 if(act){const [s,lev]=CQ[ph];chip(s,300,730,TILE,win(lt,0,3.5,.3),21);const steps=2-lev,u=G.clamp((lt-.6)/(.55*(steps+1)));const y=lerp(650,650-steps*90,u);G.ball(205,y,10,SAFF);
  hbar(70,770-0,460,10,G.clamp((lt-.4)/2.2)*((steps+1)/3),SAFF,'',null,.0001)}
 if(t>11.8){const k=ramp(t,11.8,12.6);CQ.forEach(([s,l],i)=>hbar(80,600+i*55,440,14,(3-l)/3,[SAGE,SAFF,ROSE][i],s,['fastest','slower','slowest'][i],k));G.rr(40,430,520,120,18,G.rgba('#fff8ea',k));T('Further up the tree',300,470,{size:24,al:k,col:TILE});T('= longer to answer',300,505,{size:24,al:k,col:TILE})}}};
// 4 Loftus & Palmer: one word changes the memory
const LV=[['smashed',40.8],['collided',39.3],['bumped',38.1],['hit',34.0],['contacted',31.8]];
D[4]={dur:18,pics:[PN(4)],draw(g,t){back(4,t);panel(30,430,540,345);
 if(t<9.5){const i=Math.min(4,Math.floor(G.clamp((t-1.2)/1.6)*1)+Math.floor(G.clamp(t-1.2,0,8)/1.6)),[v,s]=LV[Math.min(4,i)];
  T('"About how fast were the cars',300,475,{size:22});T('___ each other?"',300,505,{size:22});chip(v,300,550,ROSE,1,24);
  const a=Math.PI*(.85+.0225*s*1.05);G.at(300,690,1);G.ring(0,0,80,INK,5,.25);for(let k=0;k<=6;k++){const b=Math.PI*(.85)+k*Math.PI*1.3/6;G.line(Math.cos(b)*70,Math.sin(b)*70,Math.cos(b)*80,Math.sin(b)*80,INK,3,.5)}G.line(0,0,Math.cos(a)*70,Math.sin(a)*70,ROSE,6);G.dot(0,0,9,INK);G.end();T(s.toFixed(1)+' mph',300,755,{size:26,col:ROSE,w:800})}
 else{const k=ramp(t,9.5,10.4);T('One week later: "Did you see broken glass?"',300,470,{size:21,al:k});T('(there was none in the film)',300,500,{size:19,al:k,col:'#6b5636',w:600});
  [['heard "smashed"',16],['heard "hit"',7],['no speed question',6]].forEach(([l,n],i)=>hbar(80,570+i*65,440,18,(n/50)*ramp(t,10.4+i*.5,11.6+i*.5)*2.2,[ROSE,SAFF,TILE][i],l,n+' of 50 said yes',k))}}};
// 5 Vervet alarm calls
const VV=[['Leopard call',2,'run up into trees',SAFF],['Eagle call',6,'look up',TILE],['Snake call',10,'look down',SAGE]];
D[5]={dur:16,pics:[PN(5)],draw(g,t){back(5,t);panel(30,470,540,300);T('Recorded calls played back. No predator there.',300,505,{size:20,w:600});
 VV.forEach(([n,a,r,c],i)=>{const y=565+i*70,on=t>a,k=win(t,a,a+3.6,.3);G.rr(55,y-26,490,52,26,on?G.rgba(c,.15+.2*k):G.rgba(INK,.05));
  G.at(90,y,1);G.rr(-14,-10,12,20,3,INK);G.c.fillStyle=INK;G.c.beginPath();G.c.moveTo(-2,-10);G.c.lineTo(12,-20);G.c.lineTo(12,20);G.c.lineTo(-2,10);G.c.fill();if(k>0)for(let j=1;j<=3;j++)G.ring(14,0,8+j*9+((t*30)%9),c,2.5,k*(1-j/4));G.end();
  T(n,200,y,{size:21,align:'center'});if(on){G.arrow(275,y,315,y,c,4,ramp(t,a+.6,a+1.2));T(r,435,y,{size:21,col:c,al:ramp(t,a+.8,a+1.4),w:800})}});
 if(t>13)spark(300,630,SAFF,1-G.clamp((t-13)/1.2))}};
// 6 Werker & Tees: babies lose sounds they don't need
D[6]={dur:17,pics:[PN(6)],draw(g,t){back(6,t);panel(30,430,540,345);
 T('Two Hindi sounds: "ṭa" and "ta"',300,470,{size:22});T('English speakers hear them as the same',300,500,{size:19,w:600,col:'#6b5636'});
 const turn=t>2&&t<7?Math.sin(G.clamp((t-3)/1)*Math.PI/2):0;if(t>2&&t<7){T('switch the sound → head turns?',300,545,{size:20,col:TILE})}
 const base=735;vbar(110,base,90,150,ramp(t,7.5,9)*.9,SAGE,'6–8 months','most',ramp(t,7,7.6));vbar(255,base,90,150,ramp(t,9,10.5)*.5,SAFF,'8–10 months','fewer',ramp(t,8.6,9.2));vbar(400,base,90,150,ramp(t,10.5,12)*.18,ROSE,'10–12 months','few',ramp(t,10.1,10.7));
 if(t>2&&t<7){G.at(300,640,1);G.c.rotate(turn*.5);G.ball(0,0,34,'#e7b48e');G.dot(-10,-6,4,INK);G.dot(12,-6,4,INK);G.end();spark(420,640,SAFF,turn)}}};
// 7 Sally-Anne
D[7]={dur:19,pics:[PN(7)],draw(g,t){back(7,t);panel(30,430,540,345);
 const bx=[190,410];G.rr(bx[0]-50,650,100,60,10,'#c99a55',INK,.5,2);T('basket',bx[0],728,{size:18,w:600});G.rr(bx[1]-45,640,90,70,6,'#8a5a2c',INK,.5,2);T('box',bx[1],728,{size:18,w:600});
 const sally=t<4.5,anne=t>5&&t<9;let mx=bx[0],my=630;if(t<2){mx=lerp(120,bx[0],ramp(t,0.5,2));my=lerp(560,630,ramp(t,.5,2))}else if(t>6.5&&t<8)mx=lerp(bx[0],bx[1],ramp(t,6.5,8));if(t>=8)mx=bx[1];
 const mv=t<2||(t>6.5&&t<8.2)||t>14;if(mv)G.ball(mx,my,11,'#5aa0d8');
 if(sally||t>9.5){G.ball(90,560,22,'#e7b48e');G.rr(72,580,36,60,12,ROSE);T('Sally',90,520,{size:19})}if(anne){G.ball(510,560,22,'#d9a27e');G.rr(492,580,36,60,12,TILE);T('Anne',510,520,{size:19})}
 if(t>4.5&&t<9.5)T('Sally leaves the room…',300,480,{size:21,col:'#6b5636'});
 if(t>9.5&&t<13.5)bubble(110,455,380,56,'Where will Sally look?',ramp(t,9.5,10),TILE,23);
 if(t>13.5){const k=ramp(t,13.5,14.3);G.rr(40,440,520,180,16,G.rgba('#fff8ea',k));T('Right answer: the basket',300,470,{size:22,col:SAGE,al:k});
  hbar(70,520,460,16,.85*k,SAGE,'other children','about 85% right',k);hbar(70,585,460,16,.2*k,ROSE,'autistic children','16 of 20 said "box"',k)}}};
// 8 FOXP2
D[8]={dur:17,pics:[PN(8)],draw(g,t){back(8,t);panel(30,430,540,345);
 if(t<9){const k=ramp(t,.8,1.6);T('Family KE: three generations',300,470,{size:22,al:k});const gens=[[2,[1,0]],[5,[1,0,1,1,0]],[8,[1,1,0,1,0,0,1,0]]];
  gens.forEach(([n,a],gi)=>{const y=530+gi*80;for(let i=0;i<n;i++){const x=300+(i-(n-1)/2)*58,ap=ramp(t,1.6+gi*1.4+i*.1,2.2+gi*1.4+i*.1);if(gi)G.line(x,y-26,x,y-46,INK,2,.3*ap);const sq=i%2==0;const f=a[i]&&t>6;if(sq)G.rr(x-17,y-17,34,34,4,f?ROSE:'#fff',INK,ap,2);else{G.dot(x,y,18,f?ROSE:'#fff',ap);G.ring(x,y,18,INK,2,ap)}}});
  if(t>6)chip('filled = severe speech difficulty',300,765,ROSE,ramp(t,6,6.6),18)}
 else{const k=ramp(t,9,9.8);T('Chromosome 7 → gene FOXP2',300,470,{size:22,al:k});G.rr(80,510,440,40,20,G.lg(80,0,520,0,[[0,'#d8c7a8'],[1,'#c4ab82']]),INK,.4*k,2);for(let i=0;i<14;i++)G.line(100+i*30,512,100+i*30,548,INK,3,.18*k);
  const z=ramp(t,10,11);G.line(330,550,200,610,TILE,2,z);G.line(360,550,400,610,TILE,2,z);const bases='ACGTTCAGGCTAAC';for(let i=0;i<bases.length;i++){const x=110+i*28,hot=i===7&&t>11.6;G.rr(x-12,612,24,40,6,hot?ROSE:'#fff',TILE,.6*z,1.5);T(hot?'A':bases[i],x,632,{size:20,al:z,col:hot?'#fff':INK})}
  if(t>11.6){T('one letter changed in the affected members',300,690,{size:20,col:ROSE,al:ramp(t,11.6,12.3)});chip('one piece, not "the language gene"',300,745,TILE,ramp(t,13,13.6),19)}
  G.text('letters shown are illustrative',540,775,{size:15,col:'#8a7350',align:'right',w:500})}}};
// 9 Imai: sound symbolism
function spiky(x,y,r,col,al){const c=G.c;c.globalAlpha=al;c.fillStyle=col;c.beginPath();for(let i=0;i<16;i++){const a=i/16*6.283,rr=i%2?r*.45:r;c.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr)}c.fill();c.globalAlpha=1}
function blob(x,y,r,col,al){const c=G.c;c.globalAlpha=al;c.fillStyle=col;c.beginPath();for(let i=0;i<=40;i++){const a=i/40*6.283,rr=r*(.82+.14*Math.sin(a*3));c.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr)}c.fill();c.globalAlpha=1}
D[9]={dur:17,pics:[PN(9)],draw(g,t){back(9,t);panel(30,430,540,345);
 const p=t<4.5?0:t<8.5?1:2;
 if(p<2){spiky(190,590,62,GOLD,1);blob(410,590,62,'#5c8fd6',1);const fit=p===0;T(fit?'Word that FITS the shape':'Word that does NOT fit',300,475,{size:22,col:fit?SAGE:ROSE});
  const w=fit?'"spiky-sounding" name':'"round-sounding" name';bubble(130,665,340,52,w+' → spiky',ramp(t,p?5:1,p?5.5:1.5),INK,20);spark(190,590,fit?SAGE:ROSE,win(t%4,1.5,3.5,.3))}
 else{const k=ramp(t,8.5,9.3);T('Did the 14-month-olds learn the pairing?',300,475,{size:21,al:k});vbar(150,720,110,170,.8*ramp(t,9.3,10.5),SAGE,'sound fits','learned',k);vbar(340,720,110,170,.25*ramp(t,9.8,11),ROSE,'no fit','not clearly',k);G.text('bar heights illustrative',540,772,{size:15,col:'#8a7350',align:'right',w:500})}}};
// 10 Ding: words, phrases, sentences
const DW=['new','plans','gave','hope','dry','fur','rubs','skin'];
D[10]={dur:18,pics:[PN(10)],draw(g,t){back(10,t);panel(30,420,540,355);
 const tt=Math.max(0,t-1),wi=Math.floor(tt*2)%8;if(t<11)DW.forEach((w,i)=>{const on=i===wi&&t>1&&t<11;T(w,85+i*62,465,{size:21,col:on?SAFF:INK,al:on?1:.45})});
 const rows=[['words',4,SAFF],['phrases',2,TEAL],['sentences',1,TILE]];const sh=t>11?0:1;
 if(t<11)rows.forEach(([n,f,c],i)=>{const y=530+i*62,k=ramp(t,2+i*2,3+i*2);T(n,95,y,{size:19,al:k,w:600});trace(160,y,380,(u,px)=>-Math.max(0,Math.cos((u*4-tt*.5)*f*Math.PI*2*.5))*20*k,c,3.5,k)});
 const k2=ramp(t,11,12);if(k2>0){G.rr(40,430,520,340,18,G.rgba('#fff8ea',k2));T('Brain rhythms found at',300,470,{size:22,al:k2});[[1,'1 a second','sentences',TILE],[2,'2 a second','phrases',TEAL],[4,'4 a second','words',SAFF]].forEach(([f,a,b,c],i)=>vbar(90+i*150,700,100,170,[.55,.7,.9][i]*k2,c,b,a,k2));
  T("People who didn't know the language: only the word beat",300,752,{size:16,al:ramp(t,14,15),col:ROSE,w:700})}}};
// 11 Fedorenko: meaning builds word by word
const FS=['Ten','sad','students','of','Bill','Gates','should','often','sleep'];
D[11]={dur:18,pics:[PN(11)],draw(g,t){back(11,t);panel(30,420,540,355);
 const n=Math.floor(G.clamp((t-1)/6.5)*FS.length);T(FS.slice(0,n).join(' '),300,462,{size:20});
 const curves=[['real sentences',SAFF,1],['grammar, no meaning ("Jabberwocky")',TEAL,.55],['word lists',TILE,.45],['made-up non-words',ROSE,.08]];
 const x0=80,w=440,base=740,hm=230,shown=t<8?1:G.clamp(1+Math.floor((t-8)/1.4),1,4);G.line(x0,base,x0+w,base,INK,2,.4);G.line(x0,base,x0,base-hm,INK,2,.4);T('word 1 → word 8',300,760,{size:16,w:600,col:'#6b5636'});
 curves.slice(0,shown).forEach(([l,c,sl],i)=>{const u=i===0?G.clamp((t-1)/6.5):G.clamp((t-8-(i-1)*1.4)/1.2);G.path(Array.from({length:30},(_,j)=>{const x=j/29;return[x0+x*w*u,base-20-(hm-40)*x*u*sl]}),c,5);T(l,x0+12,base-hm+10+i*30,{size:17,align:'left',col:c,w:800})});
 T('brain signal (γ-power)',300,500,{size:17,col:'#6b5636',w:600})}};
// 12 Tang & Chang: melody of speech
D[12]={dur:17,pics:[PN(12)],draw(g,t){back(12,t);panel(30,440,540,335);
 const p=Math.floor(G.clamp(t-1,0,11)/3.4)%3,cont=[[0,0,0,0],[1,0,0,0],[0,0,0,1]][p],lab=['"Movies demand…" (flat)','"MOVIES demand…" (stress)','"Movies demand…?" (question)'][p];
 T(lab,300,478,{size:20});const voice=(Math.floor(t/1.7)%2);T(voice?'low voice':'high voice',490,512,{size:16,col:'#6b5636',w:600});
 trace(70,560+(voice?24:-10),460,(u)=>-(cont[0]*Math.exp(-(((u-.15)/.08)**2))*55+cont[3]*Math.max(0,(u-.75)/.25)**2*60)+Math.sin(u*20)*3,SAFF,5);
 [['melody',SAFF,1],['speech sounds',TEAL,.6],['who is talking',TILE,voice]].forEach(([n,c,a],i)=>{const x=125+i*175,y=680;const fire=i===0?(p>0?.5+.5*Math.sin(t*9)**2:.2):i===1?.4+.4*Math.sin(t*7+i)**2:(voice?.9:.2);G.dot(x,y,26,c,.25+.6*fire);G.bloom(x,y,50,c,.5*fire);T(n,x,y+46,{size:18,col:c,w:800})});
 T('electrodes side by side, each with its own job',300,628,{size:17,w:600,col:'#6b5636'})}};
// 13 Nieuwland: big replication
D[13]={dur:17,pics:[PN(13)],draw(g,t){back(13,t);panel(30,430,540,345);
 bubble(60,450,480,52,'"…the boy went outside to fly ___"',ramp(t,.6,1.2),INK,20);
 const k=ramp(t,2,3);chip('a kite',200,550,SAGE,k);chip('an airplane',400,550,ROSE,k);T('expected',200,590,{size:16,al:k,col:'#6b5636',w:600});T('less expected',400,590,{size:16,al:k,col:'#6b5636',w:600});
 if(t>5){const k2=ramp(t,5,6);T('9 labs · 334 people · plan fixed in advance',300,630,{size:19,al:k2,col:TILE})}
 if(t>8){const a=ramp(t,8,9),b=ramp(t,10.5,11.5);G.rr(60,660,230,100,14,G.rgba(SAGE,.15*a));T('the noun',175,688,{size:20,al:a});G.mark(175,728,true,a,.7);G.rr(310,660,230,100,14,G.rgba(ROSE,.15*b));T('"a" vs "an"',425,688,{size:20,al:b});G.mark(425,728,false,b,.7)}}};
// 14 Diachek: language network vs problem-solving network
D[14]={dur:17,pics:[PN(14)],draw(g,t){back(14,t);panel(30,430,540,345);
 const ph=t<5.5?0:t<10?1:2,L=[[1,.1],[.75,.45],[.8,.9]][ph],tx=['Just listening to sentences','Reading lists of unconnected words','Doing a set task about the words'][ph];
 T(tx,300,470,{size:21});brainAt(300,595,.72,[[-90,-10,44,L[0]*.9,SAFF],[30,-20,40,L[0]*.7,SAFF],[-40,-90,36,L[1],TILE],[90,-70,34,L[1],TILE]]);
 hbar(80,705,440,16,L[0],SAFF,'language network',null,1);hbar(80,752,440,16,L[1],TILE,'problem-solving network',null,1);
 if(t>13)chip('30 experiments · 481 people',300,520,TEAL,ramp(t,13,13.6),18)}};
// 15 Goldstein: brain and AI both guess the next word
const GW=[['so','so'],['I','I'],['went','went'],['to','to'],['the','the'],['shop','beach']];
D[15]={dur:18,pics:[PN(15)],draw(g,t){back(15,t);panel(30,430,540,345);
 const i=Math.min(5,Math.floor(G.clamp(t-1,0,11)/1.9)),lt=(G.clamp(t-1,0,11.4))%1.9;T('Podcast: "'+GW.slice(0,i).map(w=>w[0]).join(' ')+' …"',300,470,{size:20});
 const pre=G.clamp(lt/1.1);T('before the word',170,520,{size:17,col:'#6b5636',w:600});T('after',440,520,{size:17,col:'#6b5636',w:600});
 hbar(70,570,250,16,pre,TEAL,'brain is guessing',null);hbar(70,630,250,16,pre*.95,SAFF,'AI model guess: "'+GW[i][1]+'"',null);
 const miss=GW[i][0]!==GW[i][1],arr=lt>1.15;if(arr){chip(GW[i][0],440,580,miss?ROSE:SAGE,1,24);const s=miss?1:.2;G.meter(420,615,40,120,s*G.clamp((lt-1.15)/.3),miss?ROSE:SAGE);T(miss?'surprise!':'no surprise',440,760,{size:18,col:miss?ROSE:SAGE})}
 G.text('example words',540,775,{size:15,col:'#8a7350',align:'right',w:500})}};
// 16 Tang 2023: decoding meaning from fMRI
D[16]={dur:18,pics:[PN(16)],draw(g,t){back(16,t);panel(30,430,540,345);
 const a=ramp(t,1,2),b=ramp(t,4,8.5);T('They heard:',300,470,{size:19,col:'#6b5636',al:a,w:600});T('"I don\'t have my driver\'s license yet"',300,505,{size:20,al:a});
 T('The decoder wrote:',300,570,{size:19,col:'#6b5636',al:ramp(t,3.5,4),w:600});const out='"She has not even started to learn to drive yet"',n=Math.floor(b*out.length);T(out.slice(0,n),300,605,{size:19,col:TEAL});
 if(t>10){const k=ramp(t,10,11);G.rr(50,640,500,120,14,G.rgba('#fff8ea',k));T('Same meaning, different words',300,668,{size:20,col:SAGE,al:k});T('When the person resisted, it failed',300,712,{size:20,col:ROSE,al:ramp(t,12,13)});G.mark(120,740,false,ramp(t,12,13),.5)}}};
// 17 Willett: 62 words a minute
D[17]={dur:17,pics:[PN(17)],draw(g,t){back(17,t);panel(30,430,540,345);
 const s=ramp(t,1,6)*62;T('Words per minute',300,470,{size:21});
 hbar(70,535,460,20,s/160,SAFF,'her brain-implant speech',Math.round(s)+'',1);hbar(70,600,460,20,18/160*ramp(t,3,4),TILE,'previous record','18',ramp(t,3,4));hbar(70,665,460,20,ramp(t,5,6),'#8a7350','normal conversation','160',ramp(t,5,6));
 if(t>8.5){const k=ramp(t,8.5,9.5);G.rr(50,690,500,80,14,G.rgba('#fff8ea',k));T('Errors: 9 in 100 words (50-word list)',300,712,{size:18,al:k});T('24 in 100 words (125,000-word list)',300,745,{size:18,al:ramp(t,10,11)})}}};
// 18 Regev: 1, 4 and 6 word windows
const RW='the chef who the critic praised opened a new café'.split(' ');
D[18]={dur:17,pics:[PN(18)],draw(g,t){back(18,t);panel(30,430,540,345);
 const n=Math.min(RW.length,1+Math.floor(G.clamp(t-1,0,10)*1));const vis=RW.slice(0,n);const x0=300-((vis.length-1)*52)/2;vis.forEach((w,i)=>T(w,x0+i*52,480,{size:15,w:700,col:INK,maxW:49}));
 [[1,SAFF,'about 1 word'],[4,TILE,'about 4 words'],[6,TEAL,'about 6 words']].forEach(([k,c,l],j)=>{const y=545+j*72,a=ramp(t,1.5+j*1.5,2.5+j*1.5),m=Math.min(k,n),xe=x0+(n-1)*52+24,xs=x0+(n-m)*52-24;G.rr(xs,y-18,xe-xs,36,18,G.rgba(c,.25*a),c,a,2.5);T(l,300,y+32,{size:17,col:c,al:a,w:800})});
 if(t>12)chip('22 people · 3 kinds, mixed together',300,765,INK,ramp(t,12,12.6),17)}};
// 19 Wairagkar: instant voice
D[19]={dur:17,audio:true,hint:'Tap 🔈 to hear the melody',hintAt:9,pics:[PN(19)],draw(g,t,s){back(19,t);panel(30,440,540,335);
 T('brain signal → voice in a fraction of a second',300,478,{size:18,w:700,col:TILE});
 const p=t<4.5?0:t<8.5?1:2;T(['Speaking a word','Asking a question ↗','Singing a short tune ♪'][p],300,520,{size:22,col:SAFF});
 for(let i=0;i<40;i++){const x=70+i*11.5,h=10+Math.abs(Math.sin(i*.7+t*6))*28*(.5+.5*Math.sin(i*.3));G.line(x,600-h,x,600+h,TEAL,4,.65)}
 const notes=[0,2,4,5,7];if(p===2)notes.forEach((n,i)=>{const x=150+i*75,y=715-n*9,on=Math.floor((t-8.5)/.6)%5===i;G.dot(x,y,12,on?SAFF:INK,on?1:.4);G.line(x+11,y,x+11,y-40,INK,3,.4);if(on&&G.cue(s,'n'+Math.floor((t-8.5)/.6)))G.tone(262*Math.pow(2,n/12),.5,{type:'triangle'})});
 if(p===1)trace(80,700,440,u=>-(Math.max(0,(u-.6)/.4)**2)*60,SAFF,5)}};
// 20 Kunz: inner speech
D[20]={dur:17,pics:[PN(20)],draw(g,t){back(20,t);panel(30,440,540,335);
 T('Movement area of the brain',300,476,{size:20});
 const a=ramp(t,1,2),b=ramp(t,4.5,5.5);hbar(70,540,460,20,.95*a,SAFF,'trying to say it out loud','strong',a);hbar(70,605,460,20,.5*b,TEAL,'saying it only in your head','weaker copy',b);
 if(t>8){const k=ramp(t,8,9);T('Imagined sentences could be decoded',300,665,{size:19,al:k,col:TILE})}
 if(t>11){const k=ramp(t,11,12);G.at(300,725,1);G.rr(-22,-6,44,36,7,GOLD);G.c.strokeStyle=G.rgba(INK,k);G.c.lineWidth=5;G.c.beginPath();G.c.arc(0,-6,14,Math.PI,0);G.c.stroke();G.end();T('so they built privacy locks',300,770,{size:18,al:k,col:INK})}}};
const STORY={
1:[[0,'Q',"Where in your head do words come from? In 1861 most doctors thought the whole brain did everything together. A French doctor called Paul Broca met a patient who made him doubt that."],
 [1.2,'S',"The patient, Monsieur Leborgne, could understand what people said to him. He could answer yes-or-no questions with nods and gestures. But when he tried to speak, only one word came out: \"tan\"."],
 [5.6,'D',"Broca examined him carefully while he was alive. When the patient died, Broca looked at his brain. That was the only way to see inside a brain back then."],
 [9.5,'R',"There was damaged tissue on the LEFT side, near the front. Today that spot is called Broca's area. Understanding was mostly fine; producing speech was what had broken."],
 [11.5,'W',"It was one of the first strong clues that a skill like speaking depends on a particular place in the brain. Scientists call this idea localisation."],
 [13.5,'N',"Thin evidence: our record of this paper is short. Modern scans of Leborgne's preserved brain show the damage reached deeper than Broca could see, so speech is not housed in one small spot alone."]],
2:[[0,'Q',"How predictable is English? If you saw the start of a sentence, how often could you guess the next letter? In 1951 Claude Shannon, the inventor of information theory, turned that into an experiment."],
 [1.5,'S',"A volunteer sees a line of text one letter at a time, but never the next letter. They have to guess it. If they're wrong, they guess again until they get it."],
 [4,'D',"Shannon counted how many guesses each letter needed. The little bars show this: green means right first time, red means it took several tries. (The numbers here are an example.)"],
 [11.5,'R',"Most letters were guessed first time, especially in the middle and end of words. The hard ones were the first letters of new words. English turned out to be highly predictable, full of what Shannon called redundancy."],
 [13.5,'W',"Redundancy means you can lose some letters and still understand. Today's AI language models are trained on exactly this game: guess the next piece of text. Shannon measured how well humans play it 70 years earlier."]],
3:[[0,'Q',"How does your brain store what words mean? Is every fact kept separately, or are facts linked like a family tree? In 1969 Allan Collins and Ross Quillian tested this with a stopwatch."],
 [1,'S',"People saw simple sentences such as \"A canary can sing\" or \"A canary has skin\" and pressed one button for TRUE and another for FALSE, as fast as they could."],
 [1.5,'D',"The idea: \"can sing\" is stored right next to CANARY. \"Can fly\" is stored one step up, with BIRD. \"Has skin\" is stored two steps up, with ANIMAL. If you have to travel up the tree, it should take longer."],
 [11.8,'R',"That is what they found. Facts stored higher up the tree took longer to confirm. It was as if the mind was walking along links between ideas."],
 [13.5,'W',"It was one of the first testable pictures of a \"semantic network\": meaning stored as connected ideas. Later studies found the picture is too neat, but the idea of linked meanings is still used in memory research and in computer science."]],
4:[[0,'Q',"Can a single word in a question change what you remember? In 1974 Elizabeth Loftus and John Palmer showed students films of car crashes to find out."],
 [1.2,'S',"After each film, students were asked: \"About how fast were the cars going when they ___ each other?\" Different groups heard different verbs: smashed, collided, bumped, hit or contacted."],
 [2,'R',"Same film, different word, different answer. \"Smashed\" got an average guess of 40.8 miles per hour. \"Contacted\" got only 31.8."],
 [9.5,'D',"In a second experiment, students came back a week later and were asked: \"Did you see any broken glass?\" There was no broken glass in the film."],
 [10.5,'R',"Of 50 people who had heard \"smashed\", 16 said yes. With \"hit\", 7 said yes. With no speed question, 6 said yes. The word had changed their memory of the scene itself."],
 [13.5,'W',"Memory is not a video recording. It gets rebuilt each time you recall it, and words can reshape it. That is why police and lawyers now worry about leading questions to eyewitnesses."]],
5:[[0,'Q',"Do animals have \"words\" that stand for things? Vervet monkeys in Kenya make different alarm calls when they see different predators. In 1980 Robert Seyfarth, Dorothy Cheney and Peter Marler tested what the calls mean."],
 [1,'S',"The team recorded real alarm calls. Then they hid a loudspeaker and played the calls back when no predator was around. That way, the monkeys could only react to the sound itself."],
 [2,'R',"Leopard alarm: the monkeys ran up into trees, where leopards can't easily catch them."],
 [6,'R',"Eagle alarm: they looked up at the sky. Snake alarm: they looked down at the ground around them."],
 [12,'W',"Each call works like a label for a kind of danger. It carries meaning on its own. Infants made mistakes, giving eagle alarms for harmless birds, and got better with age and experience."],
 [14,'N',"Human language is far more open-ended: we can combine words into new sentences without limit. But this showed meaningful signals are not only human."]],
6:[[0,'Q',"Can babies hear sound differences that their parents can't? In Hindi, \"ṭa\" (tongue curled back) and \"ta\" (tongue on the teeth) are different sounds. English speakers usually hear them as the same."],
 [2,'S',"Janet Werker and Richard Tees tested babies from English-speaking homes. A baby sits on a parent's lap and hears one sound repeated. When the sound switches, a toy lights up to the side."],
 [3,'D',"Babies learn to turn their head when they notice the switch. So a head turn at the right moment means: I heard that change."],
 [7.5,'R',"At 6 to 8 months, most babies noticed the Hindi difference, and another from a Native American language (Nthlakapmx). By 10 to 12 months, very few did."],
 [12,'W',"Babies start out able to hear the sound differences of any language. During the first year, their hearing tunes in to the language around them and drops the differences they don't need."],
 [14,'N',"Bar heights show \"most\" vs \"few\", not exact percentages."]],
7:[[0,'Q',"Can you work out what someone else wrongly believes? Scientists call that skill a \"theory of mind\". In 1985 Simon Baron-Cohen, Alan Leslie and Uta Frith tested it with a puppet story."],
 [0.5,'S',"Sally puts a marble in her basket and leaves the room. While she's gone, Anne moves the marble into the box."],
 [9.5,'D',"Then the child is asked: when Sally comes back, where will she look for her marble? To get it right, you have to think about what Sally believes, not where the marble really is."],
 [13.5,'R',"Most typical children and most children with Down syndrome (about 85%) said the basket. But 16 of the 20 autistic children said the box, where the marble actually was."],
 [15,'W',"It suggested that understanding other people's beliefs is a separate skill that can develop differently. It shaped autism research, and language research too, because talking well depends on knowing what your listener knows."],
 [16.5,'N',"It was a small study. Later work found the picture is more varied: many autistic people pass such tests, especially as they grow older."]],
8:[[0,'Q',"Can a single gene affect speech? A British family, known as the KE family, had a severe speech and language difficulty that ran through three generations."],
 [1,'S',"About half the family members had trouble making the mouth movements of speech and with grammar. The pattern of who was affected suggested one gene was involved."],
 [6,'D',"In 2001, Cecilia Lai, Simon Fisher and colleagues searched a small region of chromosome 7. They also studied an unrelated child with similar problems whose chromosome was broken in the same region."],
 [11.6,'R',"They found it: a gene called FOXP2. In affected KE family members, a single letter of its DNA code was changed. In the other child, the break went right through the same gene."],
 [13,'W',"It was the first gene directly linked to a speech and language disorder. FOXP2 works like a switch that controls other genes while the brain develops."],
 [14.5,'N',"It is not \"the language gene\". Language depends on many genes plus experience. FOXP2 is one important piece."]],
9:[[0,'Q',"Why do some made-up words just sound spiky or round? In 1947 Wolfgang Köhler found people match \"takete\" to a spiky shape and \"maluma\" to a round one. This is called sound symbolism. Does it help babies learn words?"],
 [1,'S',"Mutsumi Imai and colleagues tested 14-month-old babies. A new word was played while a shape was shown, again and again, so the babies could learn the pairing."],
 [1.5,'D',"For some babies the word fitted the shape, like a spiky-sounding word for a spiky shape. For others it did not fit."],
 [8.5,'R',"Babies learned the word-shape link when the sound fitted the shape. When it didn't fit, there was no clear sign they had learned it."],
 [11.5,'W',"Even before they can talk much, babies use the feel of a sound as a clue to its meaning. That may help them get started with their first words."],
 [13.5,'N',"The scene shows the idea, not the exact screens or words used. Bar heights are illustrative."]],
10:[[0,'Q',"When you hear a sentence, do you only hear sounds, or does your brain build its structure too? Speech has no gaps between phrases, so any structure has to be built in your head."],
 [1,'S',"In 2016 Nai Ding, David Poeppel and colleagues played sentences made of four one-syllable words, like \"new plans gave hope\", at an exact beat of four words a second. They recorded brain activity with MEG, a scanner that picks up tiny magnetic signals."],
 [2,'D',"Because every sentence had the same shape, a word came 4 times a second, a two-word phrase 2 times a second, and a whole sentence once a second. But the sound itself only had the 4-a-second beat."],
 [11,'R',"The brain showed rhythms at all three speeds: words, phrases and sentences. People who didn't know the language only showed the word beat."],
 [14,'W',"The brain builds grammar-based structure while you listen, and it keeps time with it. Nothing in the sound tells it where phrases end; knowing the language does."]],
11:[[0,'Q',"How does the meaning of a sentence come together as you read it, word by word? To watch that, you need recordings that are both very precise in place and very fast."],
 [1,'S',"Evelina Fedorenko and colleagues worked with epilepsy patients who already had electrodes on the surface of their brain for medical reasons. The patients read sentences one word at a time."],
 [1.5,'D',"The team measured a fast brain signal called gamma power over the left-side language areas. They compared real sentences with three kinds of fakes."],
 [8,'R',"For real sentences, the signal climbed steadily with every word. It rose less for word lists (meaning, no grammar) and for \"Jabberwocky\" (grammar, made-up words). For non-word lists it stayed flat, even though remembering them is harder."],
 [13.5,'W',"The climb only happens when words combine into a meaning. It looks like a trace of the brain building a sentence's meaning as each word arrives."],
 [15.5,'N',"Example sentence shown. The curves are drawn to show the pattern, not real data."]],
12:[[0,'Q',"\"Movies demand…\" can be a statement, can stress a word, or can be a question, just by changing the melody of your voice. That melody is called intonation. Where does the brain track it?"],
 [1,'S',"Claire Tang, Liberty Hamilton and Edward Chang recorded from electrodes placed on the hearing area of the brain (the superior temporal gyrus) in patients during surgery planning."],
 [1.5,'D',"Patients heard sentences that changed in three ways: the melody, the speech sounds, and the speaker, with high and low voices."],
 [7,'R',"Some electrodes tracked only the melody. Others, right next to them, tracked the speech sounds, or who was talking. The melody sites cared about the shape of the pitch, not whether the voice was high or low."],
 [12,'W',"Your brain splits speech into separate streams, all in the same small area. That's how you can hear a question in a deep voice and a squeaky voice alike."]],
13:[[0,'Q',"Do readers predict the exact next word before they see it? A famous 2005 study said yes: brain signals even changed at \"a\" or \"an\", before the noun appeared."],
 [2,'S',"If you expect \"kite\", then \"an\" is surprising, because it can't come before \"kite\". A brain signal called the N400 seemed to show that surprise."],
 [5,'D',"In 2018 Mante Nieuwland and colleagues repeated the study across 9 labs with 334 people. They wrote down their analysis plan in advance, so they couldn't fish for a result."],
 [8,'R',"The effect on the noun itself came back clearly. The effect on \"a\" vs \"an\" did not. If it exists, it is far smaller than first reported."],
 [12,'W',"Prediction in reading is real, but people may not predict the exact sound of the next word. It's also a model of good science: check big claims with big, careful repeats."]],
14:[[0,'Q',"When you understand a sentence, does your brain's general problem-solving system help? That system, called the multiple-demand network, works hard on puzzles and maths."],
 [1,'S',"Ivan Diachek, Evelina Fedorenko and colleagues pooled 30 brain-scan experiments with 481 people. They looked at both the language network (mostly left side) and the problem-solving network (both sides)."],
 [1.5,'R',"Just listening to sentences: the language network was strongly active. The problem-solving network often did not rise above rest."],
 [5.5,'R',"Lists of unconnected words: the problem-solving network responded more than to sentences."],
 [10,'R',"When people had to do an explicit task, like answering questions about the words, the problem-solving network joined in."],
 [13,'W',"Understanding language seems to rely on its own network. The general network helps with the extra effort of tasks, not with understanding itself."]],
15:[[0,'Q',"AI language models are trained to guess the next word. Does the human brain do the same thing while listening?"],
 [1,'S',"Ariel Goldstein, Uri Hasson and colleagues recorded from electrodes on the brains of nine epilepsy patients while they listened to a 30-minute podcast."],
 [1.5,'D',"They compared the brain signals with an AI language model listening to the same story, word by word."],
 [4,'R',"Like the AI, the brain showed signs of predicting each word before it was heard. After the word arrived, the brain showed a \"surprise\" signal when the guess was wrong."],
 [11,'R',"Both also represented each word in light of the words around it, called a contextual embedding."],
 [13.5,'W',"Brains and AI models are built very differently, but they share some of the same tricks for language. That makes AI models a useful new tool for studying the brain."],
 [15.5,'N',"Example words shown."]],
16:[[0,'Q',"Could a computer read the gist of what you're hearing, just from a brain scan, without surgery?"],
 [1,'S',"Jerry Tang, Alexander Huth and colleagues scanned three people with fMRI for many hours (up to about 16 each) while they listened to stories. fMRI measures blood flow, which rises where the brain is working."],
 [3.5,'D',"A decoder learned which brain patterns go with which meanings. Then the people heard new stories, and the decoder tried to write down what they heard."],
 [5,'R',"It got the gist, not the exact words. Hearing \"I don't have my driver's license yet\" was decoded as \"She has not even started to learn to drive yet\". It also worked on imagined stories and silent films."],
 [12,'R',"It only worked with the person's cooperation. When they deliberately thought about other things, decoding failed. A decoder trained on one person did not work on another."],
 [14,'W',"It shows meaning, not just sound, can be read from the brain without surgery. The team tested privacy themselves and argued for protections."]],
17:[[0,'Q',"ALS is a disease that slowly paralyses muscles, including the ones used for speaking. Could a brain implant give someone their speech back, fast?"],
 [1,'S',"Francis Willett and colleagues placed tiny electrode arrays in the speech-movement area of one woman's brain. She could no longer speak clearly."],
 [1.5,'D',"She tried to say sentences. A computer program learned to turn her brain activity into speech sounds, and then into words on a screen."],
 [3,'R',"It decoded 62 words per minute, 3.4 times faster than the previous record. Normal conversation is about 160."],
 [8.5,'R',"Errors: about 9 in 100 words with a 50-word vocabulary, and about 24 in 100 with a 125,000-word vocabulary. That was the first big-vocabulary decoding."],
 [12,'W',"It's one person, so it's an early step. But it showed the brain keeps a detailed plan of mouth movements for years after paralysis."]],
18:[[0,'Q',"When you read, how far back does your brain keep track? One word? A whole phrase?"],
 [1,'S',"Tamar Regev, Evelina Fedorenko and colleagues used recordings from inside the brains of 22 epilepsy patients while they read sentences and scrambled versions."],
 [1.5,'D',"They looked at how each group of neurons responded over time as words arrived."],
 [3,'R',"They found three kinds. One kind follows about 1 word at a time, one about 4 words, and one about 6."],
 [9,'R',"The three kinds are mixed together across the whole language network, not in separate areas."],
 [12,'W',"Every language area gets information at several sizes at once: the word, the phrase and the bigger chunk. That may be what makes language fast and robust."],
 [14,'N',"The sentence is an example."]],
19:[[0,'Q',"Text on a screen is slow and flat. Could a brain implant give back a real voice, with tone and feeling, instantly?"],
 [1,'S',"Maitreyee Wairagkar, Sergey Stavisky and colleagues placed 256 tiny electrodes in the speech-movement area of a man with ALS who could not speak clearly."],
 [2,'D',"As he tried to speak, a computer turned his brain signals into voice sounds almost instantly, so he could hear himself as he talked, like normal speech."],
 [4.5,'R',"He could change his intonation, for example making his voice rise at the end of a question."],
 [8.5,'R',"He could even sing short, simple melodies through the system."],
 [12,'W',"It brings back more than words: the music of speech that tells people how you mean it. It is one person so far."],
 [14,'N',"Tap the speaker button for a simple tune. It's a stand-in, not his voice."]],
20:[[0,'Q',"Speech implants usually need the person to try to speak, which is tiring. Could they read inner speech, the words you say only in your head? And if they can, what about privacy?"],
 [1,'S',"Erin Kunz, Francis Willett and colleagues worked with four people with paralysis who had implants in the brain's movement area."],
 [1.5,'R',"Inner speech showed up clearly, as a weaker version of the pattern for trying to speak out loud. There was also a signal that told the two apart."],
 [8,'R',"Imagined sentences could be decoded in real time. Some private inner speech, like counting in your head, could also be partly picked up."],
 [11,'W',"So the team built and tested safeguards that stop the implant from decoding inner speech the person didn't mean to share."],
 [13.5,'N',"Too new to know its full impact. It's a good example of scientists testing the risks of their own technology."]]
};
Object.keys(STORY).forEach(n=>{if(D[n])D[n].story=STORY[n]});
window.DEMOS=D;
})();
