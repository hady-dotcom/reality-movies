/* Truth showing up: 22 experiment demos. Drawn in code (no photos). Stops 1-15: facts only from each stop's Pixel Hound record and cited paper. Stops 16-22: new, beyond our records, facts only from the linked published papers. */
(function(){const G=window.Demo.G,P=G.P,lerp=G.lerp,ramp=(t,a,b)=>G.ramp(t,a,b);const D={};
const SAF='#f3b65a',TER='#e0795a',CRM='#f4ead8',GRN='#7fc49a',RED='#ef6b5b';
const label=(s,x,y,col,al=1,size=19)=>{if(al<=0)return;const c=G.c;const z=Math.max(size,12/G.k);c.font=`600 ${z}px -apple-system,system-ui,sans-serif`;const w=c.measureText(s).width+z*1.3;G.rr(x-w/2,y-z*.95,w,z*1.9,z*.95,'#0f2f4a',null,.78*al);G.text(s,x,y,{size,col:col||CRM,al,w:600})};
const panel=(x,y,w,h,al=1)=>G.glass(x,y,w,h,18,al);
const tick=(x,y,s,ok,al=1)=>{const c=G.c;c.globalAlpha=al;c.lineWidth=s*.2;c.lineCap='round';c.strokeStyle=ok?GRN:RED;c.beginPath();if(ok){c.moveTo(x-s*.5,y);c.lineTo(x-s*.12,y+s*.4);c.lineTo(x+s*.55,y-s*.45)}else{c.moveTo(x-s*.4,y-s*.4);c.lineTo(x+s*.4,y+s*.4);c.moveTo(x+s*.4,y-s*.4);c.lineTo(x-s*.4,y+s*.4)}c.stroke();c.globalAlpha=1};
const floor=()=>{return;const c=G.c;c.fillStyle=G.lg(0,560,0,800,[[0,'#1a2a38'],[1,'#0a1118']]);c.fillRect(0,560,600,240);for(let i=-8;i<9;i++)G.line(300+i*30,560,300+i*120,800,'#ffffff',1,.06);for(let j=0;j<5;j++){const y=560+Math.pow(j/5,1.6)*240;G.line(0,y,600,y,'#ffffff',1,.06)}};
const person=(x,y,s,col,al=1)=>{G.at(x,y,s);G.c.globalAlpha=al;G.dot(0,-110,26,'#d9a88a');G.rr(-34,-80,68,110,30,col||'#3f6f99');G.c.globalAlpha=1;G.end()};
const brain=(x,y,s,al=1,glow)=>{G.at(x,y,s);const c=G.c;c.globalAlpha=al;c.fillStyle=G.rg(-20,-20,10,0,0,110,[[0,'#f2c9c0'],[1,'#b9837a']]);c.beginPath();c.ellipse(0,0,110,82,0,0,7);c.fill();c.strokeStyle='rgba(110,60,55,.55)';c.lineWidth=4;for(let i=0;i<7;i++){c.beginPath();c.arc(-70+i*24,-10+(i%2)*14,26,.4,2.6);c.stroke()}c.globalAlpha=1;if(glow)G.bloom(glow[0],glow[1],60,P.a,glow[2]);G.end()};

// 1 Helmholtz 1868: a rigid rod measures the same everywhere
D[1]={dur:16,hint:'Tap to move the ruler',hintAt:11,init:s=>s.off=0,tap:s=>{s.off+=1.3},
 caps:[[0,'A wooden ruler'],[3,'Moved, turned, carried'],[9,'Same length everywhere']],
 draw(g,t,s){const c=G.c;floor();const L=200,u=t*.35+s.off,x=300+Math.cos(u)*150,y=360+Math.sin(u*1.3)*150,a=ramp(t,3,5)*Math.sin(u*.8)*1.2;
  for(let k=1;k<5;k++){const uu=u-k*.5,xx=300+Math.cos(uu)*150,yy=360+Math.sin(uu*1.3)*150,aa=ramp(t,3,5)*Math.sin(uu*.8)*1.2;G.at(xx,yy,1,aa);G.rr(-L/2,-10,L,20,4,SAF,null,.12);G.end()}
  G.at(x,y,1,a);G.rr(-L/2,-12,L,24,5,G.lg(0,-12,0,12,[[0,'#f6cf86'],[1,'#c08a3a']]));for(let i=1;i<10;i++)G.line(-L/2+i*L/10,-12,-L/2+i*L/10,i%5?-3:4,'#5a3a10',2);G.end();
  if(t>9){G.at(300,690,1);G.line(-100,0,100,0,P.a,4);G.line(-100,-12,-100,12,P.a,4);G.line(100,-12,100,12,P.a,4);G.end();label('always 10 marks',300,730,P.hi,ramp(t,9,10),22)}}};
// 2 Peirce 1878: practical difference test
D[2]={dur:17,caps:[[0,'Two ideas about a fountain'],[4,'Idea A: test it'],[9,'Idea B: nothing to test']],
 draw(g,t,s){floor();const off=t>6&&t<12;const c=G.c;
  G.rr(240,470,120,30,10,'#3f6f99');if(!off){for(let i=0;i<14;i++){const u=((t*1.2+i/14)%1);G.dot(300+Math.sin(i*2.3)*u*60,330+u*u*160-Math.sin(u*3.14)*120,5,'#9fd0ff',1-u)}}
  G.line(300,500,300,600,'#88a',8);G.rr(270,590,60,26,8,off?RED:'#556');label(off?'valve closed':'valve',300,640,CRM,.8,16);
  panel(30,70,250,120,ramp(t,1,2));label('Idea A',155,105,P.a,ramp(t,1,2),22);label('hidden pipe',155,140,CRM,ramp(t,1,2),18);
  panel(320,70,250,120,ramp(t,1,2));label('Idea B',445,105,'#aaa',ramp(t,1,2),22);label('invisible spirit',445,140,CRM,ramp(t,1,2),18);
  if(t>6){label('close the valve…',155,230,CRM,ramp(t,6,7));if(t>7.5){label('water stops',155,265,GRN,ramp(t,7.5,8));tick(155,310,40,true,ramp(t,7.5,8))}}
  if(t>9){label('what would change?',445,230,CRM,ramp(t,9,10));label('nothing',445,265,RED,ramp(t,10,11));if(t>11)G.stamp('NOT CLEAR YET',445,330,11,t,RED,26)}}};
// 3 Bridgman 1927: operational definition
D[3]={dur:16,caps:[[0,'What does "height" mean?'],[3,'The steps you measure with'],[10,'Height = 12 marks']],
 draw(g,t){const c=G.c;floor();c.fillStyle='#22384c';c.beginPath();c.moveTo(150,560);c.lineTo(150,300);c.quadraticCurveTo(150,140,300,110);c.quadraticCurveTo(450,140,450,300);c.lineTo(450,560);c.lineTo(400,560);c.lineTo(400,310);c.quadraticCurveTo(400,190,300,170);c.quadraticCurveTo(200,190,200,310);c.lineTo(200,560);c.fill();
  const n=Math.min(12,Math.floor(ramp(t,3,10)*12.99));for(let i=0;i<=n;i++){const y=560-i*(390/12);G.line(282,y,318,y,SAF,i%4?2:4);if(i===n&&i)label(String(i),345,y,SAF,1,20)}
  G.line(300,560,300,560-n*(390/12),SAF,3);if(t>10)label('height = 12 marks of this ruler',300,650,P.hi,ramp(t,10,11),22);if(t>12)label('(our numbers, not Bridgman\'s)',300,690,CRM,.6,15)}};
// 4 Shannon 1948: bits
D[4]={dur:17,hint:'Tap to flip a coin',hintAt:12,init:s=>s.flips=[],tap:(s,t)=>s.flips.push(Math.random()<.5?1:0),
 caps:[[0,'One yes-or-no answer = 1 bit'],[4,'Two answers: 4 choices'],[8,'Three answers: 8 choices']],
 draw(g,t,s){const n=t<4?1:t<8?2:3,cnt=1<<n;label(`${n} bit${n>1?'s':''} → ${cnt} possible messages`,300,90,P.a,1,24);
  for(let i=0;i<cnt;i++){const b=i.toString(2).padStart(n,'0');const x=300+(i-(cnt-1)/2)*(cnt>4?66:110),y=330;G.rr(x-30,y-50,60,100,10,'#ffffff10',P.a,.9);label(b,x,y,CRM,1,cnt>4?20:28)}
  label('message: "meet at noon" or "meet at dawn"?',300,520,CRM,ramp(t,1,2),17);label('one bit is enough to tell them apart',300,555,P.hi,ramp(t,2,3),17);
  const f=s.flips.slice(-8).join('');if(f)label('your flips: '+f,300,680,SAF,1,22)}};
// 5 Attneave 1954: information sits where the outline changes direction
const P5=[[248,332],[248,551],[467,551],[467,332],[355,234]];
const ptAt=u=>{const L=[];let T=0;for(let i=0;i<5;i++){const a=P5[i],b=P5[(i+1)%5],d=Math.hypot(b[0]-a[0],b[1]-a[1]);L.push([a,b,d]);T+=d}let d=(u%1)*T;for(const[a,b,l]of L){if(d<=l)return[lerp(a[0],b[0],d/l),lerp(a[1],b[1],d/l),d<14||l-d<14];d-=l}return[P5[0][0],P5[0][1],true]};
D[5]={dur:20,caps:[[0,'A shape on the wall'],[4,'Trace the outline'],[10,'Surprise only at corners'],[15,'Keep just the corners']],
 draw(g,t){const tr=ramp(t,4,5);const u=(t-4)/5;
  if(t>4&&t<15){for(let k=0;k<60;k++){const[x,y]=ptAt(Math.min(u,1)*k/60);if(k/60<=Math.min(u,1))G.dot(x,y,4,CRM,.6)}const[x,y,corner]=ptAt(Math.min(u,.999));G.ball(x,y,12,corner?SAF:'#9fd0ff');if(corner)G.bloom(x,y,60,SAF,.9)}
  // surprise meter
  if(t>4){const hist=[];for(let k=0;k<=100;k++){const uu=Math.min(u,1)*k/100;const[, ,c2]=ptAt(uu);hist.push(c2?1:.06)}G.rr(60,640,480,110,16,'#0f2f4a',null,.8*tr);label('surprise as you trace',300,665,CRM,tr,15);
   G.path(hist.map((v,i)=>[80+i*4.4,735-v*55]),SAF,3,tr)}
  if(t>10)P5.forEach(([x,y],i)=>{const k=ramp(t,10+i*.4,10.6+i*.4);G.bloom(x,y,50,SAF,k);G.ring(x,y,16,SAF,4,k)});
  if(t>15){const k=ramp(t,15,16.5);G.path([...P5,P5[0]],SAF,5,k);label('5 points redraw the whole shape',300,150,P.hi,k,21)}}};
// 6 Marr & Hildreth 1980: blur then find fastest brightness change
D[6]={dur:17,caps:[[0,'A row of brightness values'],[4,'Step 1: blur slightly'],[8,'Step 2: find the fastest change']],
 draw(g,t){const st=x=>x<.5?.2:.85,bl=x=>.2+.65/(1+Math.exp(-(x-.5)*40)),k=ramp(t,4,7),f=x=>lerp(st(x),bl(x),k);
  for(let i=0;i<20;i++){const v=f(i/19);G.rr(60+i*24,120,22,90,4,G.mix('#101418','#f4ead8',v))}
  G.wave(60,520,480,u=>-f(u)*220,P.a,5,1,12);label('brightness',300,560,CRM,.8,16);
  if(t>8){const k2=ramp(t,8,10);G.wave(60,680,480,u=>{const d=(f(u+.01)-f(u-.01))/.02;return -d*25*k2},SAF,4,1,10);label('how fast it changes',300,740,CRM,.8,16);G.bloom(300,580,60,SAF,k2);if(t>10)G.stamp('EDGE',300,620,10,t,SAF,30)}}};
// 7 Tononi, Sporns & Edelman 1994: segregation + integration
D[7]={dur:18,caps:[[0,'Three ways to wire a network'],[4,'All separate: no teamwork'],[8,'All the same: no specialists'],[12,'Groups, lightly joined: high score']],
 draw(g,t){const mode=t<4?0:t<8?1:t<12?2:3;const N=[];for(let g2=0;g2<3;g2++)for(let i=0;i<5;i++){const a=i/5*6.28+g2;N.push([150+g2*150+Math.cos(a)*48,360+Math.sin(a)*48,g2])}
  const link=(i,j)=>{const A=N[i],B=N[j];if(mode===1)return false;if(mode===2)return true;return A[2]===B[2]||(mode===3&&[[2,7],[9,12],[0,14]].some(([p,q])=>(p===i&&q===j)))};
  for(let i=0;i<15;i++)for(let j=i+1;j<15;j++)if(mode&&link(i,j))G.line(N[i][0],N[i][1],N[j][0],N[j][1],mode===3&&N[i][2]!==N[j][2]?SAF:P.a,mode===3&&N[i][2]!==N[j][2]?4:1.5,.6);
  N.forEach(([x,y,g2],i)=>{const on=mode===2?.5+.5*Math.sin(t*3):.5+.5*Math.sin(t*3+i*1.7+g2);G.ball(x,y,12,[P.a,SAF,GRN][g2]);G.bloom(x,y,24,'#ffffff',.3*on)});
  const lab=['','all separate','all the same','groups, lightly joined'][mode];label(lab,300,520,CRM,1,22);
  if(mode){const sc=[0,.2,.25,.9][mode];G.rr(150,600,300,26,13,'#ffffff12');G.rr(150,600,300*sc,26,13,mode===3?GRN:TER);label('complexity score (illustration)',300,660,CRM,.8,16)}}};
// 8 Haynes & Rees 2006: decoding from voxel patterns
D[8]={dur:18,caps:[[0,'A brain scanner splits the brain into tiny cubes'],[5,'Each picture gives its own pattern'],[10,'A computer learns to tell them apart']],
 draw(g,t){const q=G.rnd(3),pat=[[],[]];for(let i=0;i<64;i++){pat[0].push(q());pat[1].push(q())}const which=Math.floor(t/2.5)%2;
  G.rr(70,90,180,130,14,'#ffffff10',P.a,.6);G.rr(350,90,180,130,14,'#ffffff10',P.a,.6);
  const c=G.c;c.fillStyle=SAF;c.beginPath();c.moveTo(160,190);c.lineTo(110,120);c.lineTo(210,120);c.fill();G.ring(440,155,40,'#9fd0ff',8);
  G.ring(which?440:160,155,95,P.a,4,ramp(t,5,6));
  for(let i=0;i<64;i++){const v=pat[which][i];G.rr(180+(i%8)*30,300+Math.floor(i/8)*30,27,27,3,G.mix('#14324a','#f3b65a',v),null,ramp(t,1,3))}
  if(t>10){const k=ramp(t,10,12);G.rr(150,580,300,90,16,'#ffffff12',P.a,k);label('computer\'s guess:',300,605,CRM,k,17);label(which?'circle':'triangle',300,642,P.hi,k,28);if(t>13)tick(470,620,40,true,k)}
  label('voxel = one tiny cube of brain',300,730,CRM,.7,15)}};
// 9 Friston 2010: minimise surprise
D[9]={dur:18,caps:[[0,'A calm courtyard: all predicted'],[4,'A swallow: not predicted'],[8,'Only the difference is sent on'],[12,'Update, and the gap shrinks']],
 draw(g,t){const c=G.c;const k=Math.max(0,Math.floor((t-12)/1.2));const err=t<12?1:Math.pow(.55,k+1);
  if(t>4){const a=ramp(t,4,5);c.fillStyle=G.rgba('#0f2f4a',.35*a);c.fillRect(0,0,600,800);G.bloom(336,104,90,SAF,a*err);G.ring(336,104,48,SAF,4,a);label('surprise!',336,175,SAF,a,18);label('predicted: nothing new to report',300,420,CRM,a,16)}
  if(t>8){const a=ramp(t,8,9);G.rr(40,560,520,200,18,'#0f2f4a',null,.85*a);G.wave(70,640,460,u=>-40*Math.sin(u*9),'#9fd0ff',4,a);G.wave(70,640,460,u=>-40*Math.sin(u*9)-err*30*Math.sin(u*23),SAF,4,a);
   label('blue: prediction · gold: what the senses report',300,585,CRM,a,14);G.rr(120,700,360,22,11,'#ffffff22',null,a);G.rr(120,700,360*err,22,11,TER,null,a);label('surprise (prediction error)',300,740,CRM,a,14)}}};
// 10 Teufel et al. 2015: prior knowledge helps see blurry two-tone pictures
D[10]={dur:20,caps:[[0,'A blurry two-tone picture'],[5,'Now the clear version'],[10,'The blurry one again: now you see it'],[15,'Early psychosis: an even bigger boost']],
 draw(g,t){const c=G.c;const ph=t<5?0:t<10?1:2;const X=278,Y=195,Wd=184,Hd=250;
  if(ph===1){const k=G.win(t,5,10,.5);G.rr(X,Y,Wd,Hd,4,'#f4f0e6',null,k);c.globalAlpha=k;c.fillStyle='#1a1a1a';c.beginPath();c.ellipse(X+Wd/2,Y+105,52,64,0,0,7);c.fill();c.fillStyle='#f4f0e6';c.beginPath();c.ellipse(X+Wd/2-20,Y+95,10,7,0,0,7);c.ellipse(X+Wd/2+20,Y+95,10,7,0,0,7);c.fill();c.lineWidth=5;c.strokeStyle='#f4f0e6';c.beginPath();c.arc(X+Wd/2,Y+125,18,.3,2.8);c.stroke();c.fillStyle='#1a1a1a';c.fillRect(X+Wd/2-60,Y+175,120,60);c.globalAlpha=1}
  if(ph===2){const k=ramp(t,10,12);c.save();c.setLineDash([6,8]);G.ring(X+Wd/2,Y+105,66,SAF,3,k);c.restore();label('a face!',X+Wd/2,Y+Hd+30,GRN,k,22)}
  else label(ph?'the clear version':'what is it?',X+Wd/2,Y+Hd+30,CRM,1,20);
  if(t>15){const k=ramp(t,15,16);G.rr(40,580,520,180,18,'#0f2f4a',null,.85*k);[['most people',.5],['early psychosis',.8]].forEach(([n,v],i)=>{label(n,150,630+i*50,CRM,k,15);G.rr(250,618+i*50,280,24,12,'#ffffff22',null,k);G.rr(250,618+i*50,280*v,24,12,i?SAF:'#9fd0ff',null,k)});label('boost from knowing (sketch, not their numbers)',300,735,CRM,.8*k,13)}}};
// 11 Seth & Friston 2016: interoceptive inference
D[11]={dur:18,caps:[[0,'Your heart beats'],[4,'Your brain predicts the beat'],[9,'Feelings: guesses about the body']],
 draw(g,t,s){const bp=.85,u=(t%bp)/bp,beat=Math.exp(-u*10);const bi=Math.floor(t/bp);if(G.cue(s,'b'+bi)&&window.Demo.beep)window.Demo.beep(70,.12);
  person(300,520,1.4,'#3f6f99');G.bloom(300,420,60+beat*50,RED,.5+beat*.5);G.dot(300,420,16+beat*8,RED);
  brain(300,140,.6,1,[0,0,ramp(t,4,5)*(.3+.6*Math.exp(-(((t+bp*.1)%bp)/bp)*10))]);
  if(t>4)G.arrow(300,190,300,380,P.a,3,.5*ramp(t,4,5),);
  G.c.globalAlpha=1;G.wave(80,650,440,(v,i)=>{const tt=t-(440-i)/300,w=(tt%bp)/bp;return w<.05?-50*Math.sin(w*62):0},RED,3,1);
  if(t>9){const ff=['calm','nervous','excited'][Math.floor(t/2)%3];label('"I feel '+ff+'" = the brain\'s best guess',300,740,P.hi,ramp(t,9,10),20)}}};
// 12 Barrett et al. 2016: stuck predictions in depression
D[12]={dur:18,caps:[[0,'The good news arrives'],[5,'But the old prediction wins'],[11,'A theory, not a proven cause']],
 draw(g,t){brain(300,170,.8,1);const sig=ramp(t,1,5);G.stream([[300,700],[300,450],[300,260]],t,5,GRN,7,sig);label('senses: "things are OK"',300,740,GRN,1,18);
  const k=ramp(t,5,8);G.rr(100,330,400,90,16,'#ffffff10',TER,k);label('old prediction: "things are bad"',300,375,TER,k,19);
  if(t>6)G.bloom(300,420,80,TER,.4*k);if(t>8)label('the signal barely gets through',300,470,CRM,ramp(t,8,9),17);
  G.rr(150,560,300,24,12,'#ffffff12');G.rr(150,560,300*lerp(.5,.12,k),24,12,GRN);label('weight given to the senses',300,605,CRM,.8,15)}};
// 13 de Lange, Heilbron & Kok 2018: a cue sets up an expectation; matching pictures get a sharper brain response
const MX=415,MY=492,MR=58;
D[13]={dur:22,caps:[[0,'A tone, then a striped picture'],[4,'Low tone: stripes usually tilt left'],[9,'Expected: a sharper response'],[14,'Surprise: a different response']],
 draw(g,t,s){const c=G.c;const exp=t<14;const trial=t>4?(t-4)%5:0;const show=trial>1.2&&trial<4.5;const tilt=exp?-.6:.6;
  if(t>3&&trial<1.2){const k=G.win(trial,0,1.2,.2);for(let i=0;i<3;i++)G.ring(250,300,20+i*18+trial*20,SAF,3,k*(1-i*.3));label('♪ low tone',250,250,SAF,k,17)}
  if(show){c.save();c.beginPath();c.arc(MX,MY,MR,0,7);c.clip();c.fillStyle='#555';c.fillRect(MX-MR,MY-MR,MR*2,MR*2);G.at(MX,MY,1,tilt);for(let i=-6;i<=6;i+=2){c.fillStyle='#f4f0e6';c.fillRect(i*9,-90,9,180)}G.end();c.restore()}
  if(t>4)label(exp?'shown: tilted left (expected)':'shown: tilted right (unexpected)',MX,MY-MR-26,exp?GRN:TER,show?1:.4,16);
  // brain-response panel
  if(t>9){const k=ramp(t,9,10);G.rr(40,600,520,170,18,'#0f2f4a',null,.85*k);label('brain response in the seeing area (sketch)',300,625,CRM,k,15);
   const amp=exp?.55:1,sh=exp?1:.35;G.wave(70,720,460,u=>{const x=(u-.5)*8;return -amp*70*Math.exp(-x*x*(sh*3+.4))},exp?GRN:TER,5,k,10);
   label(exp?'smaller but sharper':'larger, less sharp',300,755,exp?GRN:TER,k,16)}
  label('our sketch of a typical test, not one study\'s data',300,110,CRM,.8,14)}};
// 14 Walsh et al. 2020: stress test of predictive processing
D[14]={dur:18,caps:[[0,'A famous idea'],[4,'Put each claim on the scales'],[11,'Some fits. Some is mixed.']],
 draw(g,t){label('"The brain predicts and corrects"',300,90,P.hi,1,20);const m=Math.min(3,Math.floor(ramp(t,4,11)*3.99));
  for(let i=0;i<m;i++){G.rr(140+i*26,420-i*6,24,30,5,GRN,'#ffffff',1,2);G.rr(410+i*26,440-i*6,24,30,5,TER,'#ffffff',1,2)}
  label('evidence that fits',176,560,GRN,ramp(t,4,5),16);label('mixed / other explanations',457,580,TER,ramp(t,4,5),15);
  if(t>11)label('popular is not the same as proven',300,680,P.hi,ramp(t,11,12),20);label('our sketch; the review gives no single score',300,740,CRM,.8,13)}};
// 15 Hohwy & Seth 2020: a plan for finding consciousness
D[15]={dur:17,caps:[[0,'The big question: where is experience?'],[5,'A proposal: use prediction as a map'],[11,'A plan, not a test yet']],
 draw(g,t){const P5=[[190,560],[240,470],[300,400],[330,330],[380,290],[437,203]];const k=ramp(t,5,11);
  const n=k*(P5.length-1),i=Math.floor(n),f=n-i,pts=P5.slice(0,i+1);if(i<P5.length-1)pts.push([lerp(P5[i][0],P5[i+1][0],f),lerp(P5[i][1],P5[i+1][1],f)]);G.path(pts,SAF,5,1,[12,10]);
  G.big('?',437,200,90,SAF,ramp(t,1,2));if(t>11)G.stamp('PLAN',300,700,11,t,P.a,40);label('our Pixel Hound records stop in 2020',300,110,CRM,ramp(t,13,14),17)}};
// 16 Stokes et al. 2020: halicin
D[16]={dur:20,caps:[[0,'An AI learns what kills bacteria'],[5,'It scores more than 107 million molecules'],[10,'People test 23 of its picks'],[14,'8 work. Then halicin is tested in mice']],
 draw(g,t){const c=G.c;c.strokeStyle=G.rgba(SAF,.8);c.lineWidth=4;c.beginPath();c.moveTo(80,170);c.lineTo(260,430);c.lineTo(260,560);c.moveTo(520,170);c.lineTo(340,430);c.lineTo(340,560);c.stroke();
  const q=G.rnd(9);for(let i=0;i<260;i++){const x0=90+q()*420,sp=.1+q()*.05,u=((t*sp+q())%1);const y=lerp(150,600,u);if(u>.6&&i%11)continue;if(u>.82&&i%33)continue;const x=lerp(x0,300+(x0-300)*.12,G.clamp(u/.6));G.dot(x,y,u>.6?7:3,u>.82?GRN:u>.6?SAF:'#9fb3c4',ramp(t,5,7))}
  label('neural network = AI that learns from examples',300,90,CRM,ramp(t,0,1),16);label('>107 million scored',300,135,P.hi,ramp(t,5,6),20);
  label('23 tested in the lab',470,480,SAF,ramp(t,10,11),18);label('8 worked',300,640,GRN,ramp(t,14,15),24);
  if(t>16)label('dishes and mice, not yet a medicine',300,700,TER,ramp(t,16,17),18)}};
// 17 AlphaFold 2021
D[17]={dur:20,caps:[[0,'A protein: a chain of building blocks'],[5,'It folds into one 3D shape'],[10,'AlphaFold predicts the shape from the chain'],[15,'Then lab results check it']],
 draw(g,t){const c=G.c;const k=ramp(t,5,12),ry=t*.5;const q=G.rnd(5);const pts=[];for(let i=0;i<34;i++){const a=i*.62,r=70+40*Math.sin(i*.37);const fx=Math.cos(a)*r+q()*14,fy=(i/34-.5)*160+Math.sin(a*1.3)*30,fz=Math.sin(a)*r;const sx=lerp(-250+i*15,fx,k),sy=lerp(Math.sin(i*.9)*14,fy,k),sz=lerp(0,fz,k);pts.push([300+sx*Math.cos(ry*k)-sz*Math.sin(ry*k),330+sy,sx*Math.sin(ry*k)+sz*Math.cos(ry*k),i])}
  G.path(pts.map(p=>[p[0],p[1]]),'#8fa3b5',3);[...pts].sort((a,b)=>a[2]-b[2]).forEach(([x,y,z,i])=>G.ball(x,y,11+z*.03,G.mix('#3f6f99',SAF,i/33)));
  if(t>10){G.rr(100,560,180,60,14,'#ffffff10',P.a);label('AI prediction',190,590,P.a,1,17);G.rr(320,560,180,60,14,'#ffffff10',GRN,ramp(t,15,16));label('lab result',410,590,GRN,ramp(t,15,16),17);if(t>16)label('match in most cases (CASP14 contest, 2020)',300,670,P.hi,ramp(t,16,17),17)}
  if(t>18)label('Nobel Prize in Chemistry 2024',300,730,SAF,ramp(t,18,19),19)}};
// 18 Errington et al. 2021: replication
D[18]={dur:20,caps:[[0,'Famous experiments, done again'],[5,'Original results'],[10,'Repeated by new teams'],[15,'Typical effect: 85% smaller']],
 draw(g,t){const O=[.9,.7,1,.6,.8],R=[.12,.25,.05,.3,.1],k=ramp(t,10,14);
  O.forEach((o,i)=>{const x=80+i*92,h=380;G.rr(x,560-h*o*ramp(t,5,7),36,h*o*ramp(t,5,7),5,SAF);const rh=h*lerp(0,R[i],k);if(t>10)G.rr(x+40,560-rh,36,Math.max(2,rh),5,P.a)});
  G.line(60,560,540,560,CRM,2);label('original',180,600,SAF,ramp(t,5,6),18);label('repeated',420,600,P.a,ramp(t,10,11),18);
  label('50 experiments from 23 cancer papers',300,90,CRM,1,18);if(t>15){label('typical positive effect: 85% smaller',300,660,P.hi,ramp(t,15,16),21);label('bar heights are a sketch',300,730,CRM,.6,14)}}};
// 19 GraphCast 2023
D[19]={dur:19,caps:[[0,'Decades of past weather'],[5,'GraphCast learns the patterns'],[10,'Forecast: 10 days, under a minute'],[14,'Checked against what really happened']],
 draw(g,t){const c=G.c;c.fillStyle=G.rg(300,380,20,300,380,200,[[0,'#3f7fb0'],[1,'#173248']]);c.beginPath();c.arc(300,380,180,0,7);c.fill();c.save();c.beginPath();c.arc(300,380,180,0,7);c.clip();
  c.fillStyle='#4f8a5e';for(let i=0;i<5;i++){c.beginPath();c.ellipse(200+i*60+Math.sin(i)*30,330+((i*53)%120),50,30,i,0,7);c.fill()}
  for(let i=0;i<6;i++){const x=((t*20+i*110)%560)+20,y=260+i*40;G.dot(x,y,28,'#ffffff',.8);G.dot(x+24,y-10,22,'#ffffff',.8);if(t>10)G.ring(x+70,y,26,SAF,3,.8*ramp(t,10,11))}c.restore();
  if(t<5){for(let i=0;i<39;i++)G.text(String(1979+i),60+(i%8)*68,640+Math.floor(i/8)*28,{size:14,col:CRM,al:.5})}
  label('dashed rings = forecast',300,620,SAF,ramp(t,10,11),18);if(t>14){label('beat the leading forecast on 90% of 1,380 checks',300,680,P.hi,ramp(t,14,15),17);label('still needs physics models for its starting data',300,730,TER,ramp(t,16,17),16)}}};
// 20 FunSearch 2023
D[20]={dur:20,caps:[[0,'AI can make things up'],[4,'So: AI writes, a checker tests'],[10,'Wrong ideas thrown out'],[15,'Best survivors beat known answers']],
 draw(g,t,s){G.rr(220,280,160,170,20,'#ffffff12',P.a,1,4);
  const per=.9;for(let i=0;i<6;i++){const gidx=Math.floor(t/per)-i,u=(t/per)%1+i;if(gidx<0||t<4)continue;const ok=(gidx*7919)%10<2;let x=lerp(60,300,Math.min(1,u)),y=365;if(u>1){x=300+(u-1)*70;y=ok?365-(u-1)*55:365+(u-1)*65}if(u>4.2)continue;const al=u>1?Math.max(0,1-(u-1)/3.2):1;
   G.rr(x-34,y-24,68,48,8,'#e8eef4',null,al);for(let l=0;l<3;l++)G.rr(x-24,y-12+l*10,30+((gidx*7+l*13)%18),4,2,'#5b6f80',null,al);if(u>1)tick(x+32,y-24,22,ok,al)}
  G.rr(235,340,130,50,14,'#0d1a26',P.a,1,2);label('checker',300,365,P.a,1,22);label('AI writes small programs',150,230,CRM,1,17);label('kept',520,180,GRN,1,18);label('thrown out',520,560,RED,1,18);
  if(t>15){label('bigger "cap sets" than anyone had found',300,660,P.hi,ramp(t,15,16),19);label('the trust comes from the checker',300,710,SAF,ramp(t,16,17),18)}}};
// 21 Tang et al. 2023
D[21]={dur:20,caps:[[0,'A volunteer listens to stories for hours'],[6,'A decoder learns their brain patterns'],[11,'New story: it writes the gist'],[16,'Only if the person cooperates']],
 draw(g,t){person(150,560,1.1,'#3f6f99');const c=G.c;c.strokeStyle='#cfd8e0';c.lineWidth=8;c.beginPath();c.arc(150,440,70,Math.PI*1.1,Math.PI*1.9);c.stroke();
  for(let i=0;i<4;i++){const u=(t*.6+i/4)%1;G.ring(60-u*30,430,10+u*30,P.a,2,1-u)}
  const q=G.rnd(2);for(let i=0;i<48;i++){const v=.5+.5*Math.sin(t*2+q()*9);G.rr(300+(i%8)*30,150+Math.floor(i/8)*30,27,27,3,G.mix('#14324a',SAF,v),null,ramp(t,3,5))}label('brain scan',420,120,CRM,ramp(t,3,4),16);
  const W1=['someone','walks','home…','the','door','is','locked'];const n=Math.floor(ramp(t,11,15)*W1.length+.01);if(t>11){G.rr(60,620,480,80,18,'#ffffff12',SAF);G.text(W1.slice(0,n).join(' ')||'…',300,660,{serif:1,it:1,size:32,col:P.hi})}
  label('the gist, not exact words (our example)',300,730,CRM,.7,14);if(t>16)G.stamp('NEEDS CONSENT',300,90,16,t,TER,28)}};
// 22 Cogitate 2025
D[22]={dur:21,caps:[[0,'Two rival theories of consciousness'],[5,'Before any data: agree what would count'],[10,'256 people, three kinds of brain recording'],[15,'Both theories challenged']],
 draw(g,t){const box=(x,name,col)=>{G.rr(x-130,120,260,260,22,'#ffffff10',col,1,3);label(name,x,160,col,1,22);['prediction 1','prediction 2'].forEach((p,i)=>{label(p,x-25,230+i*70,CRM,1,17);if(t>15+i*1.5)tick(x+90,226+i*70,30,i===0,ramp(t,15+i*1.5,16+i*1.5))})};
  box(160,'IIT',P.a);box(440,'GNWT',SAF);
  if(t>5){G.rr(150,420,300,70,16,'#ffffff12',GRN,ramp(t,5,6));label('rules written down first',300,455,GRN,ramp(t,5,6),18)}
  if(t>10){for(let i=0;i<64;i++)G.dot(130+(i%16)*22,540+Math.floor(i/16)*22,6,CRM,ramp(t,10+i*.02,10.5+i*.02)*.8);label('each dot = 4 people',300,640,CRM,.7*ramp(t,10,11),15)}
  if(t>18)label('no winner: rivals agreed the test first',300,700,P.hi,ramp(t,18,19),20)}};

/* On-screen story: [time, kind, line]. Q question, S setup, D what they did, R what happened, W why it matters, N good to know. */
const STORY={
1:[[0,'Q',"Is space just there, or do we find out what it is like by measuring? In 1868 the scientist Hermann von Helmholtz asked what geometry really rests on."],
 [0,'S',"Geometry = the maths of shapes and distances. To measure, you need something like a ruler."],
 [3,'D',"Watch the ruler get carried, turned and moved around the room. Helmholtz pointed out that solid things can move like this without stretching or shrinking."],
 [9,'R',"Because the ruler stays the same length wherever it goes, a length here can be compared with a length over there."],
 [11,'W',"His point: geometry rests on a fact about real objects, not on pure thought. Truth about space shows up through measuring."],
 [13,'N',"Thin evidence: our record of this essay is short. This is an idea, not a lab experiment, so the scene shows the idea."]],
2:[[0,'Q',"How can you tell if an idea actually means something? In 1878 the thinker Charles Sanders Peirce offered a test."],
 [0,'S',"Ask: what practical difference would it make if the idea were true? What would you see, do or measure differently?"],
 [4,'D',"Idea A says a hidden pipe feeds the fountain. Then closing the valve should stop the water. You can check that."],
 [9,'D',"Idea B says an invisible spirit makes the water flow, but it changes nothing you could ever notice."],
 [11,'R',"By Peirce's test, Idea A is clear and Idea B isn't clear yet. If no difference can show up, the idea is just words so far."],
 [13,'W',"This test still guides science: a good claim says what you should expect to see."],
 [14.5,'N',"Thin evidence in our records. The fountain example is ours, not Peirce's."]],
3:[[0,'Q',"In the early 1900s, Einstein showed that even 'length' and 'time' were trickier than people thought. So what should a science word mean?"],
 [0,'S',"In 1927 the physicist Percy Bridgman gave an answer."],
 [3,'D',"A word in physics should mean the exact steps you use to measure it. 'Height of the arch' means: lay a ruler from the floor to the top and count the marks."],
 [10,'R',"This is called an operational definition. Operation = the steps you carry out."],
 [12,'W',"If no measurement can ever touch a claim, Bridgman said, it doesn't belong in physics. Truth has to show up on an instrument."],
 [13.5,'N',"Thin evidence in our records. The arch and its 12 marks are our example."]],
4:[[0,'Q',"Can you measure information, the way you measure length? In 1948 the engineer Claude Shannon showed how."],
 [0,'S',"His unit is the bit: the answer to one yes-or-no question. Yes or no, 1 or 0."],
 [4,'D',"Watch: one bit gives two possible messages. Two bits give four. Three bits give eight. Each extra bit doubles the choices."],
 [8,'R',"So you can count how much information a message holds, without knowing what it means."],
 [11,'W',"Every photo, song and text on every screen is stored in bits. Information became something you can measure."],
 [13,'N',"Thin evidence in our records. Tap the screen to flip coins: each flip is one bit."]],
5:[[0,'Q',"Your eyes take in a huge amount. Does the brain need to keep all of it? In 1954 the psychologist Fred Attneave used Shannon's idea of information to ask."],
 [0,'S',"Look at the shape on the wall. Trace its outline with your eye. On a straight side, each next point is easy to guess."],
 [4,'D',"Watch the ball travel along the outline. The meter below shows how surprising each next point is."],
 [10,'R',"Surprise only jumps at the corners, where the outline changes direction. That's where most of the information sits."],
 [15,'R',"So you can keep just the corners and still redraw the whole shape."],
 [17,'W',"The eye and brain can store a scene in a compressed way, like a zipped file. Compressed = squeezed into less space."],
 [18.5,'N',"Thin evidence in our records. The shape and meter are our example of his idea."]],
6:[[0,'Q',"If information lives in edges, how do you find edges exactly? In 1980 David Marr and Ellen Hildreth wrote a precise method."],
 [0,'S',"A picture is just rows of brightness numbers. The top strip shows one row: dark on the left, bright on the right."],
 [4,'D',"Step 1: blur the picture slightly. This smooths away tiny specks of noise."],
 [8,'D',"Step 2: work out how fast brightness changes from point to point. Look for the place where it changes fastest."],
 [10,'R',"That spot is the edge. Anyone, or any computer, following the same steps finds the same edge."],
 [12,'W',"A method that gives the same answer for everyone is how a hunch becomes something you can trust."]],
7:[[0,'Q',"Your brain has parts with different jobs, yet it acts as one. Can you put a number on that? In 1994 Giulio Tononi, Olaf Sporns and Gerald Edelman tried."],
 [0,'S',"Segregation = parts doing separate jobs. Integration = parts working together."],
 [4,'D',"If every part is cut off, there's no teamwork. If every part is joined to every other, they all do the same thing and there are no specialists."],
 [12,'R',"They proposed a score that is highest in between: busy groups that are lightly joined to each other."],
 [14,'W',"A hidden property of a brain became something you could calculate. That makes it testable."],
 [15.5,'N',"The networks and score bar are our illustration, not their model."]],
8:[[0,'Q',"Can you tell what someone is seeing just by measuring their brain? In 2006 John-Dylan Haynes and Geraint Rees reviewed the evidence."],
 [0,'S',"An fMRI scanner measures blood flow in thousands of tiny cubes of brain, called voxels. Each voxel is like one pixel of brain activity."],
 [5,'D',"A person looks at different pictures. Each picture produces its own pattern across the voxels."],
 [10,'D',"A computer learns which pattern goes with which picture. Then it's shown a new pattern and has to guess."],
 [13,'R',"It could often guess what the person was looking at. It even worked for some things people didn't consciously notice."],
 [15,'W',"Inner experience left traces you could read from outside. That reopened old questions about privacy and the mind."],
 [16.5,'N',"The pictures and patterns here are our illustration, not real scan data."]],
9:[[0,'Q',"Is there one big rule behind much of what brains do? In 2010 Karl Friston proposed one."],
 [0,'S',"His idea: brains work to keep surprise low. Surprise = the gap between what the brain predicted and what the senses report."],
 [4,'D',"The blue wave is the brain's prediction. The gold wave is what the senses actually report."],
 [8,'D',"Only the difference, the prediction error, needs to be passed on."],
 [12,'R',"Each update makes the prediction better, and the error bar shrinks."],
 [14,'W',"On this view, seeing, moving and learning are all one job: predict well. Much of the rest of this walk tests that idea."],
 [16,'N',"This is a theory paper, not an experiment. The waves are our illustration."]],
10:[[0,'Q',"Can knowing what to expect help you see? In 2015 Christoph Teufel and colleagues tested it."],
 [0,'S',"People saw blurry two-tone pictures that are hard to make out."],
 [5,'D',"Then they saw the clear version of the same picture."],
 [10,'R',"Shown the blurry one again, people could now recognise it. Knowing helped them see."],
 [15,'R',"People in the early stages of psychosis, and healthy people prone to it, got a bigger boost. Psychosis = when it gets hard to tell what's real from what isn't."],
 [17,'W',"What you already know changes what you see. Leaning on it too much may play a part in seeing things that aren't there."],
 [18.5,'N',"The face picture and bars are our sketch, not their images or numbers."]],
11:[[0,'Q',"Where do feelings come from? In 2016 Anil Seth and Karl Friston proposed an answer."],
 [0,'S',"Interoception = sensing what's going on inside your body: heartbeat, breathing, hunger."],
 [4,'D',"Their idea: the brain predicts these inside signals, just as it predicts what you see."],
 [9,'R',"They argued that emotions, and even your sense of being yourself, may be the brain's best guesses about the body."],
 [12,'W',"Prediction isn't only about the outside world. It may shape how you feel inside."],
 [14,'N',"A theory paper, not an experiment. The heartbeat is a typical resting rate."]],
12:[[0,'Q',"If feelings are predictions, what happens when the predictions get stuck? In 2016 Lisa Feldman Barrett and colleagues proposed a theory of depression."],
 [0,'S',"Depression = a long-lasting low mood that's hard to shake off."],
 [1,'D',"The green signal is the senses reporting that things are OK."],
 [5,'R',"In their theory, an old, heavy prediction wins. The brain gives too little weight to what the senses actually report."],
 [8,'W',"It could help explain why good news can struggle to get in."],
 [11,'N',"This is a theory, not a proven cause of depression. The scene is our illustration."]],
13:[[0,'Q',"Does expecting something change what you actually see, or only what you decide afterwards? In 2018 Floris de Lange, Micha Heilbron and Peter Kok reviewed the evidence."],
 [0,'S',"In many experiments, a tone tells people what kind of picture usually comes next, like stripes tilted to the left."],
 [4,'D',"Here the low tone plays, then the stripes appear on the screen. Most times they tilt the way the tone predicts."],
 [9,'R',"When the picture matches the expectation, the brain's response in the seeing area can be smaller but sharper: clearer about what's there."],
 [14,'R',"When the picture breaks the expectation, the response is different: often bigger, like a surprise signal."],
 [16,'W',"Their conclusion: expectation can change the seeing itself, not just the decision afterwards."],
 [18,'N',"A review that's still being argued over. The response curves are our sketch, not data from one study."]],
14:[[0,'Q',"By 2020 the 'predict and correct' idea was famous. Does the evidence really back it? Kevin Walsh and colleagues checked."],
 [0,'S',"A stress test: take each specific claim and look at brain recordings that could support or undercut it."],
 [4,'D',"Evidence goes on the scales: what fits on one side, what's mixed or explainable another way on the other."],
 [11,'R',"Some evidence fits. Some is mixed, or could be explained in other ways."],
 [13,'W',"Good science tests even its favourite ideas. A popular idea isn't the same as a proven one."],
 [15,'N',"The scales are our illustration. The review gives no single score."]],
15:[[0,'Q',"Which brain activity goes with actually experiencing something? Scientists call this the search for the neural correlates of consciousness."],
 [0,'S',"In 2020 Jakob Hohwy and Anil Seth looked at how to search more systematically."],
 [5,'D',"They proposed using the prediction idea as a map: a guide to where, and what, to look for."],
 [11,'R',"It's a plan, not a test yet."],
 [13,'W',"Our Pixel Hound records end here, in 2020. The next room is new: what happened since, especially with AI."]],
16:[[0,'Q',"Bacteria are learning to beat our medicines. Could an AI help find new antibiotics? In 2020 Jonathan Stokes and colleagues tried."],
 [0,'S',"They trained a neural network, a kind of AI that learns from examples, on molecules known to stop bacteria or not."],
 [5,'D',"The AI then scored huge libraries of molecules, more than 107 million in one of them."],
 [10,'D',"People tested the AI's top picks in the lab. That's the check."],
 [14,'R',"From that big library, 23 picks were tested and 8 worked. Another pick, halicin, looks unlike existing antibiotics and killed many bacteria in dishes and treated infections in mice."],
 [16,'W',"The AI pointed. The lab confirmed. In 2023 a similar method found abaucin, aimed at one hospital superbug."],
 [17.5,'N',"New: beyond our Pixel Hound records. Neither drug is an approved medicine yet. Sources: Stokes et al., Cell 2020; Liu et al., Nature Chemical Biology 2023."]],
17:[[0,'Q',"Proteins are the tiny machines in every cell. Their shape decides what they do. Can you predict the shape from the recipe?"],
 [0,'S',"A protein is a chain of building blocks that folds into a 3D shape. Finding one shape in a lab can take months or years. About 100,000 had been solved."],
 [5,'D',"AlphaFold, an AI from DeepMind, learned from shapes already solved, then predicted new ones from the chain alone."],
 [10,'D',"In a 2020 blind contest called CASP14, its predictions were compared with lab results no one had seen yet."],
 [15,'R',"In most cases they were about as accurate as the lab results. In 2024 Demis Hassabis and John Jumper shared the Nobel Prize in Chemistry for it, with David Baker."],
 [17,'W',"A 50-year puzzle cracked open. The blind contest is why people trust it: the answers were checked."],
 [18.5,'N',"New: beyond our Pixel Hound records. Predictions are still predictions; floppy parts are less reliable. Source: Jumper et al., Nature 2021; nobelprize.org."]],
18:[[0,'Q',"If a famous experiment is done again by someone else, do you get the same result? This is called replication."],
 [0,'S',"The Reproducibility Project: Cancer Biology tried to repeat 50 experiments from 23 well-known cancer papers."],
 [5,'D',"Gold bars: the original results."],
 [10,'D',"Blue bars: the same experiments, repeated by new teams."],
 [15,'R',"For positive results, the typical effect was 85% smaller the second time. Only about 4 in 10 passed most of the success tests used."],
 [17,'W',"Not a scandal: science checking itself. One study is a clue, not a fact."],
 [18.5,'N',"New: beyond our Pixel Hound records. Bar heights are a sketch. Source: Errington et al., eLife 2021."]],
19:[[0,'Q',"Can an AI forecast the weather? In 2023 a DeepMind team tested GraphCast."],
 [0,'S',"Normal forecasts run huge physics simulations on supercomputers for hours."],
 [5,'D',"GraphCast learned instead from 39 years (1979 to 2017) of past weather records."],
 [10,'R',"It forecasts hundreds of weather measurements 10 days ahead, for the whole planet, in under a minute."],
 [14,'R',"Checked against what really happened, it beat the leading traditional forecast on 90% of 1,380 checks, and it tracked hurricanes better."],
 [16,'W',"The weather itself is the judge: every forecast gets checked a few days later."],
 [17.5,'N',"New: beyond our Pixel Hound records. It learned from records built with physics models and still needs them for today's starting data. Source: Lam et al., Science 2023."]],
20:[[0,'Q',"Chatbots sometimes make things up. That's called hallucination. Can AI still help find new maths?"],
 [0,'S',"In 2023 a DeepMind team built FunSearch: a language AI paired with a strict automatic checker."],
 [4,'D',"The AI writes thousands of small programs. The checker runs each one."],
 [10,'D',"Anything wrong or weak is thrown out. The best survivors are used to write the next round."],
 [15,'R',"It found bigger 'cap sets' than anyone had known. Think of the card game SET: a cap set is a collection of cards with no SET in it. How big can one get? A famous open question."],
 [17,'W',"The trust comes from the checker, not the AI."],
 [18.5,'N',"New: beyond our Pixel Hound records. Only works when a computer can check the answer. Source: Romera-Paredes et al., Nature 2023."]],
21:[[0,'Q',"Remember stop 8, where computers guessed pictures from brain scans? Can they now recover whole sentences?"],
 [0,'S',"In 2023 Jerry Tang and colleagues in Texas had volunteers listen to stories in an fMRI scanner for many hours."],
 [6,'D',"A decoder, helped by a language AI, learned how each person's brain responds to meaning."],
 [11,'R',"With new stories, it wrote word sequences that caught the gist, even of imagined stories and silent films."],
 [16,'R',"It only worked when the person cooperated, both to train it and to use it. The team tested this on purpose."],
 [18,'N',"New: beyond our Pixel Hound records. The gist, not word for word; our example words. Source: Tang et al., Nature Neuroscience 2023."]],
22:[[0,'Q',"Back to stop 15's big question. Two leading theories of consciousness, IIT and GNWT, predict different things. Which is right?"],
 [0,'S',"Usually each camp tests its own idea and finds support. So rivals teamed up: an adversarial collaboration."],
 [5,'D',"Before any data, both sides wrote down publicly what result would count against them. That's called preregistration."],
 [10,'D',"256 people were tested with three kinds of brain recording."],
 [15,'R',"Results matched some predictions of each theory, and seriously challenged key claims of both."],
 [18,'W',"No winner. But this is truth showing up the honest way: rivals agree the test first."],
 [19.5,'N',"New: beyond our Pixel Hound records. Ticks and crosses are a simplified sketch. Source: Cogitate Consortium, Nature 2025."]]
};
Object.keys(STORY).forEach(n=>{if(D[n])D[n].story=STORY[n]});
Object.keys(D).forEach(n=>{const d=D[n],pn='../../truth/img/demo/s'+String(n).padStart(2,'0'),dr=d.draw;d.pics=[pn];
 d.draw=function(g,t,s){G.pic(pn,0,0,600,800);const v=ramp(t,2,4)*.5;if(v>0){const c=G.c;c.fillStyle=G.lg(0,0,0,800,[[0,G.rgba('#0f2f4a',v*.9)],[1,G.rgba('#0f2f4a',v)]]);c.fillRect(0,0,600,800)}dr.call(this,g,t,s)}});
window.DEMOS=D;})();
