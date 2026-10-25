(function(){
const G=window.Demo.G,lerp=G.lerp,ramp=(t,a,b)=>G.ramp(t,a,b),win=(t,a,b,f)=>G.win(t,a,b,f);
const INK='#2a1d10',TILE='#1d4f9e',SAFF='#e08a12',TEAL='#11806f',ROSE='#c0392f',CREAM='#fff8ea',SAGE='#4f8a2e',GOLD='#f2b84b';
const WALK=window.FIELD.meta.title,PN=n=>'../../art/cin/'+WALK+'/d'+String(n).padStart(2,'0');
const D={};
let PX=null;
function back(n,t,o={}){PX=null;const c=G.c,z=1.03+.06*G.clamp(t/22);c.save();c.translate(o.fx??300,o.fy??300);c.scale(z,z);c.translate(-(o.fx??300),-(o.fy??300));if(!G.pic(PN(n),0,0,600,800)){c.fillStyle=G.lg(0,0,0,800,[[0,'#fbefd6'],[1,'#e9d2a6']]);c.fillRect(0,0,600,800)}c.restore();
 if(o.wash){c.fillStyle=G.rgba(CREAM,o.wash);c.fillRect(0,0,600,800)}
 const g=G.lg(0,430,0,800,[[0,'rgba(255,248,234,0)'],[1,'rgba(255,244,222,.55)']]);c.fillStyle=g;c.fillRect(0,430,600,370)}
function panel(x,y,w,h,al=1){if(al<=0)return;PX=[x,w];const c=G.c;c.save();c.globalAlpha=al;c.shadowColor='rgba(70,40,10,.38)';c.shadowBlur=26;c.shadowOffsetY=8;G.rr(x,y,w,h,22,'#fff8ea');c.restore();c.globalAlpha=1;
 G.rr(x,y,w,h,22,null,TILE,.7*al,3);G.rr(x+7,y+7,w-14,h-14,16,null,SAFF,.45*al,1.4);
 const q=8;for(let i=0;i<q;i++){const px=x+30+i*(w-60)/(q-1);G.dot(px,y+1.5,3.2,i%2?SAFF:TILE,.8*al)}}
function T(s,x,y,o={}){o=Object.assign({col:INK,size:24,w:700},o);if(PX&&o.maxW==null&&x>PX[0]&&x<PX[0]+PX[1]){const a=o.align||'center',L=x-PX[0]-18,R=PX[0]+PX[1]-x-18;o.maxW=Math.max(40,a==='left'?R:a==='right'?L:2*Math.min(L,R));if(!o.nowrap&&o.wrap==null)o.wrap=1}G.text(s,x,y,o)}
function S(s,x,y,size,col,al=1,it){G.text(s,x,y,{serif:1,size,col:col||INK,al,it})}
function chip(s,x,y,col=TILE,al=1,size=21){if(al<=0)return;const c=G.c;const z=Math.max(size,12/G.k);c.font=`700 ${z}px -apple-system,system-ui,sans-serif`;const w=Math.min(c.measureText(s).width+30,G.fitW(x,"center")+8);G.rr(x-w/2,y-z*.9,w,z*1.8,z*.9,G.rgba(col,.95*al));T(s,x,y+1,{col:"#ffffff",size,al,maxW:w-24})}
function hbar(x,y,w,h,v,col,lab,val,al=1){if(al<=0)return;G.rr(x,y,w,h,h/2,G.rgba(INK,.09*al));if(v>0.005)G.rr(x,y,Math.max(h,v*w),h,h/2,G.rgba(col,al));let vw=0;if(val){const c=G.c;c.font=`800 ${Math.max(21,12/G.k)}px -apple-system,system-ui,sans-serif`;vw=c.measureText(val).width+14}T(lab,x,y-17,{align:'left',size:20,al,w:600,maxW:Math.max(60,w-vw),nowrap:1});if(val)T(val,x+w,y-17,{align:'right',size:21,al,col,w:800,nowrap:1})}
function vbar(x,base,w,hmax,v,col,lab,val,al=1){if(al<=0)return;G.rr(x,base-hmax,w,hmax,10,G.rgba(INK,.07*al));const h=Math.max(0,v)*hmax;if(h>2)G.rr(x,base-h,w,h,10,G.rgba(col,al));T(lab,x+w/2,base+22,{size:19,al,w:600,nowrap:1});if(val)T(val,x+w/2,base-h-18,{size:22,al,col,w:800})}
function badge(s,t0,t){G.stamp(s,300,90,t0,t,ROSE,30)}
function spark(x,y,col,k){if(k<=0)return;G.bloom(x,y,60,col,.7*k);G.ring(x,y,14+26*(1-k),col,3,k)}
function bubble(x,y,w,h,txt,al=1,col=INK,size=24,tail){if(al<=0)return;const c=G.c;c.save();c.globalAlpha=al;c.shadowColor='rgba(60,30,10,.3)';c.shadowBlur=14;G.rr(x,y,w,h,h/2>26?26:h/2,'#ffffff');c.restore();if(tail){c.globalAlpha=al;c.fillStyle='#ffffff';c.beginPath();c.moveTo(x+w*.3,y+h-2);c.lineTo(tail[0],tail[1]);c.lineTo(x+w*.45,y+h-2);c.fill();c.globalAlpha=1}T(txt,x+w/2,y+h/2+1,{size,col,al,maxW:w-22})}
function trace(x,y,w,fn,col,lw=3.5,al=1){G.wave(x,y,w,fn,col,lw,al)}
function brainAt(x,y,s,spots,al=1){G.brain(x,y,s,{spots,al,tint:'#eab3a5'})}
function standin(t){if(t<.2)return;const k=G.clamp(t/0.8);chip('Stand-in scene · not an experiment',300,38,'#7a5a2a',.92*k,19)}
function beyond(t){chip('Beyond our Pixel Hound records',300,38,TEAL,.92*G.clamp(t/0.8),19)}
// 1 Helmholtz: timing a nerve
D[1]={dur:17,pics:[PN(1)],draw(g,t){back(1,t);panel(30,440,540,335);
 if(t<12){T('Zap the nerve far from the muscle, then near it',300,476,{size:19,w:700});
 G.path([[70,560],[470,560]],'#e8d6b8',10);G.rr(470,535,70,50,22,'#d98c7c');T('muscle',505,610,{size:17,w:600});
 const ph=t<6?0:1,lt=(t-1.5)%4.5,x0=ph?400:90,u=G.clamp(lt/(ph?.6:2.4));if(t>1.5&&t<12){spark(x0,560,SAFF,1-G.clamp(lt/.4));G.ball(lerp(x0,470,u),560,9,SAFF);if(u>=1)spark(505,560,ROSE,1-G.clamp((lt-(ph?.6:2.4))/.6))}
 T(ph?'zap near → twitch comes sooner':'zap far → twitch comes later',300,640,{size:20,col:ph?SAGE:ROSE})}
 if(t>12){const k=ramp(t,12,13);G.rr(40,450,520,315,18,G.rgba('#fff8ea',k));T('The difference in delay = travel time',300,490,{size:20,al:k});S('≈ 27 metres a second',300,560,46,SAFF,k);T('about 100 km/h: fast, but not instant',300,620,{size:20,al:k,col:TILE});
  const r=G.clamp((t-13.5)/3);G.dot(80+420*r,700,10,SAFF,k);T('nerve signal',80+420*r,730,{size:15,al:k,w:600})}}};
// 2 Turing: imitation game (stand-in)
D[2]={dur:16,pics:[PN(2)],draw(g,t){back(2,t);standin(t);panel(30,450,540,325);
 T('The judge types questions to two hidden players',300,486,{size:19});
 const k1=ramp(t,2,3),k2=ramp(t,4,5);bubble(60,520,230,52,'A: "I love poetry"',k1,INK,20);bubble(310,520,230,52,'B: "Me too!"',k2,INK,20);
 if(t>6){const k=ramp(t,6,7);T('One is a person. One is a machine.',300,620,{size:21,al:k,col:TILE});T('Can the judge tell which?',300,660,{size:22,al:ramp(t,7.5,8.5),col:SAFF})}
 if(t>10)chip("If not, Turing said, that counts for something",300,730,TEAL,ramp(t,10,10.6),18)}};
// 3 Sperry: split brain
D[3]={dur:18,pics:[PN(3)],draw(g,t){back(3,t);panel(30,440,540,335);
 G.at(300,600,1);G.c.globalAlpha=1;G.dot(-60,0,70,'#f3cdb8');G.dot(60,0,70,'#f3cdb8');G.ring(-60,0,70,INK,2,.4);G.ring(60,0,70,INK,2,.4);const cut=ramp(t,1,2.5);G.line(0,-80,0,80,ROSE,5,cut,[8,8]);G.end();
 T('LEFT half: talks',170,690,{size:17,col:TILE,w:800});T('RIGHT half: no words',430,690,{size:17,col:SAFF,w:800});
 if(t>3.5&&t<5.5)chip('"spoon" flashed to the LEFT side of view',300,480,SAFF,1,18);
 const r=ramp(t,4.5,5.5);G.dot(360,600,30*r,SAFF,.6*r);
 if(t>6.5){bubble(80,730,200,46,'"I saw nothing"',ramp(t,6.5,7.2),TILE,19)}if(t>9){bubble(320,730,220,46,'left hand picks spoon',ramp(t,9,9.7),SAFF,18);G.mark(522,622,true,ramp(t,9.5,10),.5)}
 if(t>12.5){const k=ramp(t,12.5,13.3);G.rr(40,450,520,90,14,G.rgba('#fff8ea',k));T('Two halves can know different things',300,495,{size:21,al:k,col:INK})}}};
// 4 Searle: Chinese room (stand-in)
D[4]={dur:16,pics:[PN(4)],draw(g,t){back(4,t);standin(t);panel(30,450,540,325);
 const k=ramp(t,1,2);T('Symbols in → rulebook → symbols out',300,488,{size:20,al:k});
 const x=lerp(70,250,G.clamp((t-2)/2));if(t>2&&t<6)G.rr(x-30,520,60,40,6,'#fff',INK,.8,2);G.rr(250,515,100,60,8,'#c99a55',INK,.5,2);T('rules',300,545,{size:17,w:700});
 const x2=lerp(350,530,G.clamp((t-5)/2));if(t>5)G.rr(x2-30,520,60,40,6,'#fff',INK,.8,2);
 if(t>7.5){T('Outside: perfect answers.',300,620,{size:21,col:SAGE,al:ramp(t,7.5,8.2)});T('Inside: no understanding.',300,660,{size:21,col:ROSE,al:ramp(t,9,9.7)})}
 if(t>11)chip('Following rules ≠ understanding?',300,730,TILE,ramp(t,11,11.6),19)}};
// 5 Haggard: intentional binding
D[5]={dur:17,pics:[PN(5)],draw(g,t){back(5,t);panel(30,440,540,335);
 T('Real timing: key press, then a beep 250 ms later',300,476,{size:18});
 const x0=130,x1=470,y=560;G.line(80,y,520,y,INK,3,.4);const k=ramp(t,1,2);chip('press',x0,y-34,TILE,k,18);chip('beep',x1,y-34,SAFF,k,18);G.dot(x0,y,9,TILE,k);G.dot(x1,y,9,SAFF,k);
 const b=ramp(t,5,7);if(t<10){T('What people felt, when THEY chose to press:',300,620,{size:18,al:ramp(t,4.5,5)});const p1=lerp(x0,x0+70,b),p2=lerp(x1,x1-90,b);G.line(80,670,520,670,INK,3,.25*b);G.dot(p1,670,10,TILE,b);G.dot(p2,670,10,SAFF,b);if(b>.9)G.arrow(p1+14,690,p2-14,690,SAGE,3,ramp(t,7,7.5));T('pulled together',300,710,{size:17,col:SAGE,al:ramp(t,7,7.5),w:800})}
 if(t>10){const c=ramp(t,10,11);G.rr(40,600,520,165,14,G.rgba('#fff8ea',c));T('When a magnet made the finger twitch',300,630,{size:18,al:c});const q1=lerp(x0,x0-40,c),q2=lerp(x1,x1+40,c);G.line(60,690,540,690,INK,3,.25*c);G.dot(q1,690,10,TILE,c);G.dot(q2,690,10,SAFF,c);T('pushed apart',300,735,{size:18,col:ROSE,al:c,w:800})}}};
// 6 Tononi IIT (stand-in)
D[6]={dur:16,pics:[PN(6)],draw(g,t){back(6,t);standin(t);panel(30,450,540,325);
 const nodes=Array.from({length:8},(_,i)=>[300+Math.cos(i/8*6.283)*95,605+Math.sin(i/8*6.283)*95]),join=ramp(t,5,9);
 for(let i=0;i<8;i++)for(let j=i+1;j<8;j++){const near=(j-i===1||j-i===7);const a=near?.5:join*.5;if(a>0)G.line(nodes[i][0],nodes[i][1],nodes[j][0],nodes[j][1],SAFF,2,a)}
 nodes.forEach(([x,y],i)=>G.ball(x,y,13,[SAFF,TILE,TEAL,ROSE][i%4]));T(join<.5?'parts working separately':'parts woven into one whole',300,480,{size:20});
 G.meter(500,520,34,170,.15+.8*join,SAFF);T('Φ',517,710,{size:26,col:SAFF,serif:1});
 if(t>11)chip('more integration = more consciousness (theory)',300,745,TILE,ramp(t,11,11.6),17)}};
// 7 Owen 2006: tennis vs house
D[7]={dur:18,pics:[PN(7)],draw(g,t){back(7,t);beyond(t);panel(30,440,540,335);
 const ph=t<4.5?0:t<9?1:2;T(['"Imagine playing tennis"','"Imagine walking through your home"','Same pattern as healthy volunteers'][ph],300,480,{size:21,col:ph<2?TILE:SAGE});
 const sp=ph===0?[[20,-110,34,.8+.2*Math.sin(t*5),SAFF]]:ph===1?[[60,-30,32,.8+.2*Math.sin(t*5),TEAL],[100,-70,28,.7,TEAL]]:[[20,-110,30,.8,SAFF],[60,-30,30,.8,TEAL]];
 brainAt(ph===2?195:300,620,ph===2?.62:.8,sp);if(ph===2){brainAt(410,620,.62,sp);T('patient',195,720,{size:17,w:700});T('healthy volunteer',410,720,{size:17,w:700})}
 if(ph<2)T(ph?'navigation areas':'movement-planning area',300,740,{size:18,col:ph?TEAL:SAFF,w:800})}};
// 8 Soon 2008: decision before awareness
D[8]={dur:17,pics:[PN(8)],draw(g,t){back(8,t);panel(30,440,540,335);
 const L='QWTZMBKPRX';const li=Math.floor(t*2)%L.length;if(t<9)S(L[li],300,500,46,INK);
 T('Press left or right, whenever you like. Remember the letter.',300,550,{size:16,w:700});
 const x=G.clamp((t-1)/8);G.line(70,640,530,640,INK,3,.35);G.dot(70+460*x,640,8,INK,.8);
 const k=ramp(t,9,10);G.rr(70,625,460*.7*k,30,10,G.rgba(SAFF,.45*k));T('brain pattern hints at the choice',230,600,{size:16,col:SAFF,al:k,w:800});G.line(460,620,460,665,ROSE,4,k);T('"I decide!"',470,690,{size:18,col:ROSE,al:k});T('up to ~10 seconds earlier',220,690,{size:17,col:SAFF,al:k,w:800});
 if(t>12)chip('right only about 60% of the time (50% = guessing)',300,745,TILE,ramp(t,12,12.6),16)}};
// 9 Demertzi 2015: resting networks
D[9]={dur:17,pics:[PN(9)],draw(g,t){back(9,t);panel(30,440,540,335);
 T('Brain scan at rest: no task needed',300,476,{size:20});
 const pts=[[-100,-40],[-40,-90],[40,-80],[100,-30],[-60,30],[60,30]],strong=t<8;
 [[195,'minimally conscious',1],[410,'unresponsive',.25]].forEach(([x,l,s])=>{G.at(x,610,.62);G.brain(0,0,1,{tint:'#eab3a5'});pts.forEach((p,i)=>pts.slice(i+1).forEach(q=>G.line(p[0],p[1],q[0],q[1],TEAL,4,s*ramp(t,1.5,3)*(.6+.4*Math.sin(t*3+i)))));G.end();T(l,x,702,{size:17,w:800,col:s>.5?TEAL:'#8a7350'})});
 if(t>8){const k=ramp(t,8,9);chip('each network told the groups apart >80% of the time',300,736,TILE,k,15);T('best: the HEARING network',300,520,{size:19,col:SAFF,al:ramp(t,10,11)})}}};
// 10 Casarotto: zap and zip
D[10]={dur:18,pics:[PN(10)],draw(g,t){back(10,t);panel(30,440,540,335);
 if(t<9){T('A magnetic pulse "knocks" the brain; EEG listens to the echo',300,474,{size:16,w:700});
 const lt=(t-1)%3.2;[[180,'unconscious: short, simple echo',0],[420,'conscious: rich, spreading echo',1]].forEach(([x,l,c])=>{G.at(x,600,.55);G.brain(0,0,1,{tint:'#eab3a5'});G.end();
  if(t>1){if(c){for(let i=0;i<6;i++){const a=i*1.05,r=lt*60;G.dot(x+Math.cos(a)*r*(.6+.1*i),600+Math.sin(a)*r*.6,9,[SAFF,TEAL,TILE][i%3],G.clamp(1-lt/2.5))}}else G.ring(x,600,lt*40,SAFF,4,G.clamp(1-lt/1))}const ls=l.split(': ');T(ls[0]+':',x,682,{size:15,w:800,col:c?TEAL:'#8a7350'});T(ls[1],x,706,{size:15,w:800,col:c?TEAL:'#8a7350'})})}
 if(t>9){const k=ramp(t,9,10);G.rr(40,450,520,315,18,G.rgba('#fff8ea',k));T('Cut-off tested on 150 people who could report',300,488,{size:17,al:k});
  hbar(80,560,440,16,.947*k,TEAL,'minimally conscious: detected','94.7%',k);hbar(80,640,440,16,(9/43)*ramp(t,11,12),SAFF,'"vegetative": high score','9 of 43',ramp(t,11,12));T('maybe aware inside?',300,710,{size:20,col:SAFF,al:ramp(t,12.5,13.5)})}}};
// 11 Andrillon: learning in sleep
D[11]={dur:17,pics:[PN(11)],draw(g,t){back(11,t);panel(30,440,540,335);
 T('The same noise snippet, repeated, while asleep',300,476,{size:19});
 const st=[['REM (dreaming)',SAGE,.8,true],['light sleep',SAGE,.7,true],['deep sleep',ROSE,-.5,false]];
 st.forEach(([n,c,v,ok],i)=>{const y=545+i*70,k=ramp(t,2+i*2.5,3+i*2.5);T(n,150,y,{size:19,al:k,w:700});const w=v*160;G.line(330,y-24,330,y+24,INK,2,.4*k);G.rr(v>0?330:330+w,y-12,Math.abs(w)*k,24,8,G.rgba(c,.9));G.mark(540,y,ok,k,.55)});
 T('← worse            better →',330,762,{size:16,col:'#6b5636',w:600,al:ramp(t,9,10)})}};
// 12 Jellyfish sleep
D[12]={dur:17,pics:[PN(12)],draw(g,t){back(12,t);panel(30,440,540,335);
 const night=t>4&&t<9;T(night?'NIGHT: fewer pulses':'DAY: pulsing',300,476,{size:21,col:night?TILE:SAFF});
 const rate=night?1.2:3;const pul=Math.max(0,Math.sin(t*rate*Math.PI));G.at(300,580,1);G.c.globalAlpha=.9;G.c.fillStyle=G.rg(0,0,5,0,0,70,[[0,'#f4f0ff'],[1,'#8e7fc8']]);G.c.beginPath();G.c.ellipse(0,0,70*(1-.15*pul),26,0,0,7);G.c.fill();G.c.globalAlpha=1;G.end();
 if(t>9&&t<13){const k=ramp(t,9,9.5);T('Lift the platform: slower to react at night',300,670,{size:18,al:k,col:TILE})}
 if(t>13){const k=ramp(t,13,13.8);T('Kept awake at night → less active next day',300,670,{size:18,al:k,col:ROSE})}
 hbar(80,720,440,14,night?.35:.9,night?TILE:SAFF,'pulses per minute (illustrative)',null)}};
// 13 Pal 2018: waking a rat under anaesthesia
D[13]={dur:18,pics:[PN(13)],draw(g,t){back(13,t);panel(30,440,540,335);
 T('Rat breathing anaesthetic gas the whole time',300,476,{size:19});
 const ph=t<5?0:t<10?1:2;const lab=['No stimulation: stays out','Boost acetylcholine at the BACK (parietal)','Boost acetylcholine at the FRONT (prefrontal)'][ph];T(lab,300,520,{size:18,col:[INK,TILE,SAFF][ph],w:800});
 const wake=ph===2?ramp(t,11.5,13.5):0;G.at(300,630,1,wake*-.8);G.c.fillStyle='#f6f1ea';G.c.beginPath();G.c.ellipse(0,0,80,34,0,0,7);G.c.fill();G.dot(70,-10,22,'#f6f1ea');G.dot(84,-14,3,ph===2&&wake>.5?INK:'#b9a998');G.end();
 T(wake>.5?'wakes up and moves!':'asleep',300,730,{size:22,col:wake>.5?SAGE:'#8a7350'});
 if(t>15)chip('noradrenaline: brain waves changed, but no waking',300,766,TILE,ramp(t,15,15.6),15)}};
// 14 Demertzi 2019: brain patterns
D[14]={dur:17,pics:[PN(14)],draw(g,t){back(14,t);panel(30,440,540,335);
 T('Brain-wide patterns that come and go',300,476,{size:20});
 const rich=k=>{for(let i=0;i<10;i++)for(let j=i+1;j<10;j++)if((i*7+j*3)%4==0){const a=i/10*6.283,b=j/10*6.283;G.line(Math.cos(a)*55,Math.sin(a)*40,Math.cos(b)*55,Math.sin(b)*40,(i+j)%2?SAFF:TILE,3,k*(.5+.5*Math.sin(t*2+i)))}};
 const items=[[100,'healthy',1],[233,'minimally conscious',.85],[367,'unresponsive',.15],[494,'anaesthesia',.2]];
 items.forEach(([x,l,k],i)=>{const a=ramp(t,1+i*1.6,2+i*1.6);G.at(x,610,.8);G.c.globalAlpha=a;G.dot(0,0,62,'#fdeee0');rich(k*a);G.c.globalAlpha=1;G.end();l.split(' ').forEach((p,j,A)=>T(p,x,700+(j-(A.length-1)/2)*20,{size:14,w:800,al:a,col:k>.5?SAGE:'#8a7350',maxW:Math.min(124,2*(548-x))}))});
 if(t>9)chip('rich, changing pattern goes with consciousness',300,744,TEAL,ramp(t,9,9.6),16)}};
// 15 FND: a rule-in sign
D[15]={dur:17,pics:[PN(15)],draw(g,t){back(15,t);panel(30,440,540,335);
 T('Example sign: Hoover\'s sign',300,476,{size:20,col:TILE});
 const k1=ramp(t,1.5,2.5),k2=ramp(t,5,6);hbar(80,550,440,18,.2*k1,ROSE,'"Push the weak leg down"','weak',k1);hbar(80,620,440,18,.9*k2,SAGE,'Lift the OTHER leg instead','strong',k2);
 if(t>8){T('Strength is there, but hard to use on purpose',300,680,{size:18,al:ramp(t,8,9),col:INK})}
 if(t>11)chip('signs like this: 64–100% specific in studies',300,740,TEAL,ramp(t,11,11.6),17)}};
// 16 AWARE-II
D[16]={dur:18,pics:[PN(16)],draw(g,t){back(16,t);panel(30,440,540,335);
 const steps=[[567,'cardiac arrests in hospital'],[53,'survived'],[28,'interviewed'],[11,'had memories suggesting awareness']];
 steps.forEach(([n,l],i)=>{const y=490+i*55,k=ramp(t,1+i*1.8,2+i*1.8);hbar(170,y,360,14,Math.sqrt(n/567)*k,[TILE,TEAL,SAFF,ROSE][i],'',null,k);T(String(n),120,y+6,{size:24,al:k,col:[TILE,TEAL,SAFF,ROSE][i],w:800});T(l,350,y-14,{size:16,al:k,w:600})});
 if(t>9.5){const k=ramp(t,9.5,10.5);T('Hidden picture on a tablet: nobody named it',300,702,{size:17,al:k});T('Brain waves near normal up to 35–60 min into CPR (some)',300,740,{size:15,al:ramp(t,11.5,12.5),col:TILE,w:800})}}};
// 17 Physio4FMD
D[17]={dur:17,pics:[PN(17)],draw(g,t){back(17,t);panel(30,440,540,335);
 T('355 people · 11 hospitals · split at random',300,476,{size:19});
 const k=ramp(t,2,3);chip('specialist physio',190,530,SAFF,k,18);chip('usual care',420,530,TILE,k,18);
 const m=ramp(t,5,7);vbar(140,702,100,132,.55*m,SAFF,'specialist','',m);vbar(370,702,100,132,.5*m,TILE,'usual','',m);T('physical function at 12 months',300,560,{size:16,al:m,w:600,col:'#6b5636'});
 if(t>8){const c=ramp(t,8,9);chip('no clear difference',300,610,ROSE,c,20)}
 if(t>11)T('but more felt their symptoms improved',300,752,{size:17,col:SAGE,al:ramp(t,11,12)})}};
// 18 Bodien 2024: cognitive motor dissociation
D[18]={dur:17,pics:[PN(18)],draw(g,t){back(18,t);beyond(t);panel(30,440,540,335);
 T('241 patients who could not respond to commands',300,476,{size:18});T('"Imagine opening and closing your hand…"',300,508,{size:17,col:TILE,w:600});
 for(let i=0;i<40;i++){const x=95+(i%10)*45,y=560+Math.floor(i/10)*48,hid=i%4===0,k=ramp(t,3+i*.04,3.5+i*.04),lit=hid&&t>7;G.dot(x,y,15,lit?SAFF:'#cdbfa8',k);if(lit)G.bloom(x,y,26,SAFF,.4)}
 if(t>7)chip('1 in 4 responded on brain scans (60 of 241)',300,762,SAFF,ramp(t,7,7.6),16)}};
// 19 COGITATE
D[19]={dur:18,pics:[PN(19)],draw(g,t){back(19,t);beyond(t);panel(30,440,540,335);
 T('Two rival theories write predictions first',300,478,{size:19});
 const k=ramp(t,1.5,2.5);chip('IIT: back of brain',165,530,SAFF,k,17);chip('Workspace: front of brain',425,530,TILE,k,17);
 if(t>4){const a=ramp(t,4,5);T('256 people · fMRI + MEG + electrodes',300,585,{size:17,al:a,col:TEAL,w:800})}
 if(t>7){const a=ramp(t,7,8);T('Results: some predictions held…',300,640,{size:19,al:a,col:SAGE});T('…but key claims of BOTH were challenged',300,680,{size:19,al:ramp(t,9,10),col:ROSE});G.mark(165,728,false,ramp(t,10,10.6),.5);G.mark(425,728,false,ramp(t,10.4,11),.5)}}};
// 20 LLM Turing test 2025
D[20]={dur:18,pics:[PN(20)],draw(g,t){back(20,t);beyond(t);panel(30,440,540,335);
 T('5-minute chats with a person AND an AI at once',300,476,{size:17});T('Which one is the human?',300,504,{size:19,col:TILE});
 const r=[['GPT-4.5 (told to act human)',.73,SAFF],['LLaMa-3.1 (same prompt)',.56,TEAL],['ELIZA (1960s program)',.23,'#8a7350'],['GPT-4o (no persona)',.21,'#8a7350']];
 r.forEach(([l,v,c],i)=>{const k=ramp(t,2+i*1.4,3+i*1.4);hbar(80,560+i*52,440,14,v*k,c,l,Math.round(v*100)+'%',k)});
 r.forEach((_,i)=>G.line(80+440*.5,560+i*52-5,80+440*.5,560+i*52+19,ROSE,2.5,.6*ramp(t,8,9)));T('chance',308,754,{size:14,col:ROSE,al:ramp(t,8,9),align:'left'});
 G.text('chosen as "the human"',80,754,{size:13,col:'#8a7350',align:'left',w:500,maxW:212})}};
const STORY={
1:[[0,'Q',"When you stub your toe, do you feel it instantly? In 1850 most scientists thought nerve signals were far too fast to measure. Hermann von Helmholtz decided to time one anyway."],
 [0.5,'S',"He used a frog's leg muscle with its long nerve still attached, wired to a very precise timer. When the nerve is zapped with a little electricity, the muscle twitches."],
 [1.5,'D',"First he zapped the nerve far from the muscle and timed the twitch. Then he zapped it close to the muscle and timed it again."],
 [6,'R',"From close up, the twitch came sooner. The extra delay from far away was the time the signal took to travel along that extra bit of nerve."],
 [12,'R',"Dividing distance by delay gave a speed of about 27 metres per second in the frog nerve, roughly 100 km/h. Fast, but nowhere near instant."],
 [14,'W',"Feeling takes time. That made the mind something you could measure with clocks, and opened the way to timing thoughts and reactions."],
 [15.5,'N',"Thin evidence: our record of this report is short. The number is from his frog measurements; human nerves vary."]],
2:[[0,'Q',"Can a machine think? In 1950 the mathematician Alan Turing said that question was too vague. He suggested a game instead."],
 [1,'S',"Stand-in scene: this is a thought experiment, not a lab study. A judge chats by typing with two hidden players. One is a person, one is a machine."],
 [2,'D',"The judge can ask anything: poetry, maths, feelings. The players type back answers."],
 [6,'R',"If the judge can't reliably tell which one is the machine, Turing argued, we should take seriously the idea that it is thinking in some sense."],
 [10,'W',"It became known as the Turing test. It turned a fuzzy question into something you could actually try, and people did, as the last stop of this walk shows."]],
3:[[0,'Q',"Your brain has two halves joined by a thick bridge of fibres, the corpus callosum. What happens to your mind if that bridge is cut?"],
 [1,'S',"Some patients with severe epilepsy had the bridge cut to stop seizures spreading. Roger Sperry and his team tested what each half could do on its own."],
 [3.5,'D',"Patients stared at a dot. A picture was flashed briefly to one side, so only one half of the brain saw it. The left half usually controls speech. The right half controls the left hand."],
 [6.5,'R',"When a word or picture went only to the right half, the patient said they saw nothing, because the talking half really hadn't seen it. Yet the left hand could pick out the right object by touch."],
 [12.5,'W',"Each half could know things the other didn't, at the same time. Our feeling of being one single mind is put together by the brain, not guaranteed."],
 [14.5,'N',"Thin evidence: our record is a short summary of Sperry's 1968 article. The spoon is an example of the kind of test used."]],
4:[[0,'Q',"If a computer gives perfect answers, does it understand? In 1980 the philosopher John Searle argued: not necessarily."],
 [1,'S',"Stand-in scene: a thought experiment. A man who knows no Chinese sits in a room with a huge rulebook. Notes in Chinese come in through a slot."],
 [2,'D',"He looks up each symbol and copies out the reply the rules tell him to. He never learns what any of it means."],
 [7.5,'R',"To people outside, the answers look like they come from a fluent Chinese speaker. Inside, there is no understanding at all."],
 [11,'W',"Searle's point: a program that just follows rules for shuffling symbols isn't understanding them. The argument is still going on, especially now AI chat systems exist."]],
5:[[0,'Q',"Does doing something on purpose change how you feel time? In 2002 Patrick Haggard, Sam Clark and Jeri Kalogeras tested it."],
 [1,'S',"People watched a fast clock hand on a screen. They pressed a key whenever they chose. A beep followed 250 milliseconds (a quarter of a second) later. They reported where the clock hand was at each moment."],
 [4.5,'R',"When people pressed on purpose, they felt their press happened later, and the beep happened earlier, than it really did. The action and its effect seemed pulled together in time."],
 [10,'D',"In another condition, a magnetic pulse over the brain made the finger twitch without the person choosing to move."],
 [11,'R',"Then the effect flipped: the twitch and the beep seemed pushed apart."],
 [13,'W',"This \"intentional binding\" is linked to the feeling that you caused something. The brain shapes your sense of time around your own actions."]],
6:[[0,'Q',"What makes a brain conscious, but not, say, a camera with millions of pixels? In 2004 Giulio Tononi proposed an answer called integrated information theory."],
 [1,'S',"Stand-in scene: this is a theory paper, so there is no experiment to show. The picture is a way of seeing the idea."],
 [2,'D',"The idea: a system is conscious to the degree that its parts share information and act as one whole that can't be split into independent pieces. Tononi called the amount phi (Φ)."],
 [9,'R',"A camera's pixels don't affect each other, so phi is low. A waking brain is highly connected and highly varied, so phi should be high, and lower in deep sleep or anaesthesia."],
 [11,'W',"It is a leading, much-debated theory. It pushed scientists to try to measure consciousness, which leads to the brain-complexity test later in this walk."]],
7:[[0,'Q',"Some patients after severe brain injury are awake, with eyes open, but never respond. Doctors call this a vegetative state. Is anyone in there?"],
 [1,'S',"Adrian Owen and colleagues scanned one such patient, a young woman injured in a road accident, using fMRI."],
 [1.5,'D',"They asked her, through headphones, to imagine playing tennis. Then to imagine walking through the rooms of her home. Imagining each one lights up different brain areas in healthy people."],
 [9,'R',"Her brain lit up in the same areas, in the same way, as healthy volunteers. She seemed to be understanding and following the instructions, even though she couldn't move."],
 [12,'W',"It showed that bedside behaviour can miss awareness. It started the search for hidden awareness that runs through the rest of this walk."],
 [14,'N',"Beyond our Pixel Hound records: Owen et al., Science, 2006. One patient. Added because it is the founding experiment for the next stops."]],
8:[[0,'Q',"When you \"decide\" to do something, is that feeling the start of the decision? In 2008 Chun Siong Soon, John-Dylan Haynes and colleagues used a brain scanner to look."],
 [1,'S',"People lay in an fMRI scanner watching letters change every half second. Whenever they felt like it, they pressed a left or right button, and remembered which letter was showing when they decided."],
 [6,'D',"Afterwards a computer searched the earlier brain activity for patterns that predicted the choice."],
 [9,'R',"Activity at the front and top of the brain could predict left or right up to about 10 seconds before people felt they had decided."],
 [12,'R',"The prediction was only somewhat better than guessing: about 60% right, where pure chance is 50%."],
 [14,'W',"The feeling of deciding comes after earlier preparation in the brain. What that means for free will is still argued about."]],
9:[[0,'Q',"Can a brain scan, taken while a patient just lies there, tell \"minimally conscious\" (some signs of awareness) apart from \"unresponsive\"?"],
 [1,'S',"Athena Demertzi, Steven Laureys and colleagues scanned 73 patients at three hospitals while they rested. No task was needed."],
 [1.5,'D',"They measured how strongly brain areas within six networks rose and fell together, called connectivity, and trained a computer to sort the patients."],
 [5,'R',"Minimally conscious patients had stronger connections than unresponsive ones."],
 [8,'R',"Every network could separate the two groups more than 80% of the time. The best was the hearing (auditory) network."],
 [12,'W',"A simple resting scan could help doctors spot patients whose awareness is being missed at the bedside. It isn't perfect, so it adds to, not replaces, careful examination."]],
10:[[0,'Q',"Could there be a number for consciousness that doesn't depend on the patient answering? Silvia Casarotto, Marcello Massimini and colleagues tested one, called PCI."],
 [1,'S',"PCI works like knocking on a wall to hear what's behind it. A magnetic pulse (TMS) briefly stimulates the brain, and EEG sensors record the echo."],
 [1.5,'R',"In unconscious brains the echo is short and simple. In conscious brains it is rich and spreads in complex ways. PCI measures how complex the echo is."],
 [9,'D',"First they set a cut-off using 150 people who could report whether they had been conscious, awake, dreaming, or under anaesthesia. The cut-off sorted them perfectly."],
 [11,'R',"Then they tested patients. It detected 94.7% of minimally conscious patients. And 9 of 43 \"vegetative\" patients had high complexity, like conscious people."],
 [13.5,'W',"Those 9 may have a capacity for consciousness they can't show. It's a tool still being tested, but it doesn't need the patient to move or speak."]],
11:[[0,'Q',"Can you learn something new while asleep? Thomas Andrillon, Sid Kouider and colleagues tested it with sound."],
 [1,'S',"Sleepers heard samples of random noise. Hidden in them, one particular snippet repeated again and again. Awake people slowly learn to spot a repeated snippet like that."],
 [2,'R',"When the snippet played during dreaming (REM) sleep or light sleep, people were better at spotting it after they woke up."],
 [7,'R',"When it played during deep sleep, they were worse at spotting it afterwards, as if deep sleep had wiped it."],
 [10,'W',"Sleep isn't one state. Some stages help form memories, and deep sleep can suppress them. The brain stays active in very selective ways at the edge of awareness."]],
12:[[0,'Q',"Do you need a brain to sleep? Upside-down jellyfish (Cassiopea) have nerves but no brain. Ravi Nath, Claire Bedbrook and colleagues watched them day and night."],
 [1,'S',"These jellyfish sit on the sand and pulse their bell. A camera counted every pulse for days."],
 [4,'R',"At night they pulsed much less, and quickly woke up when disturbed."],
 [9,'D',"The team gently lifted the platform under them to test their reactions."],
 [9.5,'R',"At night they were slower to react, like a sleeping animal. And when kept from resting at night, they were less active the next day, as if catching up."],
 [13.5,'W',"Those are the signs scientists use to define sleep. Sleep may have evolved before brains did."],
 [15,'N',"Pulse bar is illustrative."]],
13:[[0,'Q',"Anaesthesia switches consciousness off. Which part of the brain can switch it back on? Dinesh Pal, George Mashour and colleagues tested this in rats."],
 [1,'S',"Rats breathed the anaesthetic sevoflurane the whole time. Being unable to turn over when placed on their back was the sign they were \"under\"."],
 [5,'D',"The team delivered a drug that boosts the brain chemical acetylcholine to one small area: either the back (parietal cortex) or the front (prefrontal cortex)."],
 [10,'R',"Boosting the back did not wake them. Boosting the front did: the rats woke up and moved, even while still breathing the anaesthetic."],
 [15,'R',"Boosting a different chemical, noradrenaline, changed the brain waves but didn't wake them."],
 [16,'W',"The front of the brain can help control the level of consciousness, not just the deep brain areas long known to matter."]],
14:[[0,'Q',"Is consciousness a single switch, or a way the whole brain moves? Athena Demertzi, Enzo Tagliazucchi and colleagues looked at patterns over time."],
 [1,'S',"They used fMRI scans of healthy people and patients, tracking which brain areas rose and fell together, moment to moment."],
 [2,'R',"Healthy people and minimally conscious patients often showed a rich pattern of coordination that kept changing."],
 [5.5,'R',"Unresponsive patients mostly showed a simpler, low-coordination pattern. Anaesthesia pushed healthy people toward that simple pattern too."],
 [9,'W',"Consciousness seems to rest on the brain's ability to keep rich, changing patterns going. That could become a fingerprint doctors can check."]],
15:[[0,'Q',"Functional neurological disorder (FND) causes real symptoms like weakness or seizures, without nerve damage. It used to be diagnosed only by ruling everything else out. Can doctors spot it directly?"],
 [1,'S',"This 2022 review collected studies of \"rule-in\" signs: things a doctor can see in an exam that point to FND."],
 [1.5,'D',"Example, Hoover's sign: when asked to push a weak leg down, it seems weak. But when the person lifts the other leg, the weak leg pushes down strongly without them trying."],
 [8,'R',"The strength is there; using it on purpose is what goes wrong. That is a positive sign of FND, not just an absence of other disease."],
 [11,'R',"Across 22 studies of movement symptoms and 27 of seizures, such signs were 64% to 100% specific, meaning they rarely showed up in other conditions."],
 [13.5,'W',"Diagnosis can now be made confidently, which reduces doubt and stigma. Physiotherapy and talking therapy can help, though not everyone responds."],
 [15.5,'N',"This is a review; the demo shows one sign as an example."]],
16:[[0,'Q',"When someone's heart stops, can they still be aware while doctors try to restart it? The AWARE-II study, led by Sam Parnia, tested this in 25 hospitals."],
 [1,'S',"During resuscitation (CPR), teams put a small brain-wave sensor and an oxygen sensor on the patient's forehead. A tablet showed a hidden picture, and headphones played sounds."],
 [1.5,'R',"Of 567 in-hospital cardiac arrests, 53 people survived. 28 were interviewed, and 11 of them reported memories or perceptions suggesting awareness."],
 [9.5,'R',"Nobody identified the hidden picture. One person identified the sound. In some patients, brain waves close to normal appeared even 35 to 60 minutes into CPR."],
 [13,'W',"Consciousness and thinking may continue, or return, during cardiac arrest. Studying this carefully helps doctors understand the very edge of life."],
 [15,'N',"Few survivors, so the numbers are small."]],
17:[[0,'Q',"Physiotherapy designed for FND seemed to help in small studies. Does it work in a big, fair test?"],
 [1,'S',"The Physio4FMD trial enrolled 355 people with functional movement problems at 11 hospitals in England and Scotland."],
 [2,'D',"A computer randomly put each person into specialist physiotherapy or usual care. Randomising makes the two groups alike, so any difference is due to the treatment."],
 [8,'R',"After 12 months, self-reported physical function was not clearly different between the groups."],
 [11,'R',"But more people in the specialist group said their movement symptoms had improved, and they scored better on mental health."],
 [13,'W',"An honest result: the big outcome didn't change. Science needs these too. Both kinds of physiotherapy were safe and valued."],
 [15,'N',"COVID-19 interrupted treatment for 89 people, who were left out of the main analysis."]],
18:[[0,'Q',"Owen's tennis study was one patient. How common is hidden awareness? Yelena Bodien, Nicholas Schiff and colleagues tested hundreds."],
 [1,'S',"At six centres, 353 adults with disorders of consciousness were tested. 241 showed no response to commands at the bedside."],
 [3,'D',"While fMRI or EEG recorded their brains, they were asked to imagine actions, such as opening and closing a hand, and then to stop."],
 [7,'R',"60 of the 241, about 1 in 4, showed brain activity following the commands, even though their bodies couldn't. This is called cognitive motor dissociation."],
 [11,'W',"Many patients who seem unaware may be understanding. That matters for how they are treated, talked to, and what decisions are made about their care."],
 [13.5,'N',"Beyond our Pixel Hound records: Bodien et al., New England Journal of Medicine, 2024."]],
19:[[0,'Q',"Two big theories of consciousness disagree. Integrated information theory points to the back of the brain. Global workspace theory says consciousness \"ignites\" across the front. Who's right?"],
 [1.5,'S',"In an \"adversarial collaboration\", supporters of both theories agreed in advance what each theory predicts and what results would count against it."],
 [4,'D',"The COGITATE team showed pictures to 256 people and measured their brains three ways: fMRI, MEG, and electrodes inside the brain."],
 [7,'R',"Some predictions of each theory held up. But key claims of both were challenged: the expected lasting synchrony at the back wasn't found, and the expected ignition at the front mostly wasn't either."],
 [11,'W',"Neither theory won. The bigger win is the method: rivals designing a fair test together before seeing the data."],
 [13.5,'N',"Beyond our Pixel Hound records: COGITATE Consortium, Nature, 2025."]],
20:[[0,'Q',"Turing's game from stop 2, tried for real with today's AI chatbots. Can people tell a large language model from a human?"],
 [1,'S',"Cameron Jones and Benjamin Bergen ran a pre-registered study. Each judge chatted for 5 minutes with a real person and an AI at the same time, then picked which was human."],
 [2,'R',"GPT-4.5, told to act like a certain kind of person, was picked as the human 73% of the time, more often than the real humans. LLaMa-3.1 with the same prompt: 56%."],
 [6.5,'R',"Older or unprompted systems did badly: ELIZA, a 1960s program, 23%; GPT-4o without the persona, 21%."],
 [9.5,'W',"By Turing's standard, a machine has now passed. But remember Searle's room: fooling a judge doesn't settle whether the machine understands or is aware."],
 [12.5,'N',"Thin evidence: this is a 2025 preprint, not yet peer-reviewed. Beyond our Pixel Hound records."]]
};
Object.keys(STORY).forEach(n=>{if(D[n])D[n].story=STORY[n]});
window.DEMOS=D;
})();
