/* Hearing: 20 experiment demos, v2. Painted scenes in demos/img. Only facts from each study's Pixel Hound record. */
(function(){const G=window.Demo.G,P=G.P,lerp=G.lerp,ramp=(t,a,b)=>G.ramp(t,a,b);const D={};
const BL='#7fc8ff',RD='#ff7a6a',GO=P.a,WH='#ffffff';
const dim=(a)=>{const c=G.c;c.fillStyle=`rgba(8,4,12,${a})`;c.fillRect(0,0,600,800)};
const rings=(x,y,t,col,al=1,n=3,sp=1,r0=20,r1=90)=>{for(let i=0;i<n;i++){const f=((t*sp+i/n)%1);G.ring(x,y,lerp(r0,r1,f),col,4,al*(1-f))}};
const beep=(S,key,f,o)=>{if(G.cue(S,key))G.tone(f,o&&o.d||.18,o)};
// 1 Helmholtz 1863: one note is many tones; each brass sphere picks one out
const SP1=[[200,500,1],[320,520,2],[400,490,3],[470,520,4]];
D[1]={dur:16,audio:1,pics:['resonators'],hint:'Tap to play the note',hintAt:12,rv:9,rvx:330,rvy:300,init:s=>s.tap=-9,
 caps:[[0,'One musical note'],[3,'Inside it: a stack of simpler tones'],[6.5,'Each brass sphere rings for just one'],[11,'Hearing can be taken apart']],
 tap:(s,t)=>{s.tap=t;[1,2,3,4].forEach((h,i)=>G.tone(196*h,1.2,{vol:1/(h)}))},
 draw(g,t,s){G.pic('resonators',0,0,600,800);if(t>.2&&G.cue(s,'n0'))[1,2,3,4].forEach(h=>G.tone(196*h,1.4,{vol:1/h}));
  const split=ramp(t,3,6),glow=ramp(t,6.5,8.5),hit=Math.exp(-(t-s.tap)*1.5);
  G.glass(30,40,540,300,22);
  if(split<1)G.wave(50,180,500,u=>{let y=0;for(let h=1;h<=4;h++)y+=Math.sin(u*h*12.6-t*6*h)/h;return y*40*(1-split)},GO,5,1-split,14);
  SP1.forEach(([x,y,h],i)=>{const yy=lerp(180,80+i*62,split),col=G.mix(GO,'#ffffff',i*.2);
   if(split>0)G.wave(50,yy,500,u=>Math.sin(u*h*12.6-t*6*h)*24/Math.sqrt(h),col,4,split,10);
   if(glow>0){G.path([[550,yy],[575,yy],[x,y-40]],col,2,.35*glow,[4,8]);const pulse=.6+.4*Math.sin(t*h*5);G.bloom(x,y,60+30*hit,col,glow*(.5+.4*pulse+.4*hit));G.ring(x,y,34+8*pulse,col,3,glow*.7)}})}};
// 2 Cotton 1935: watching the face fixes the words
const W2='CAN YOU HEAR ME?';
D[2]={dur:16,pics:['face-talk'],rv:9,rvx:330,rvy:450,
 caps:[[0,'Speech in a noisy room'],[3,'Face hidden: the words break up'],[7,'Now watch the lips'],[9,'The same sound, and the words come back']],
 draw(g,t){const c=g.c;G.pic('face-talk',0,0,600,800);const see=ramp(t,7,8.5),q=G.rnd(Math.floor(t*10));
  c.fillStyle=`rgba(10,6,14,${.8*(1-see)})`;c.fillRect(0,0,600,800);
  if(see<1){for(let i=0;i<220;i++)G.dot(q()*600,q()*800,1+q()*2,'#ffffff',.25*(1-see))}
  if(see>0){G.ring(330,452,48+6*Math.sin(t*9),GO,3,see*.8);G.bloom(330,452,90,GO,.35*see)}
  rings(330,452,t,WH,.25+.3*see,3,.8,40,120);
  G.glass(60,600,480,140,22);const clear=ramp(t,8.5,10.5);
  [...W2].forEach((ch,i)=>{const x=110+i*27,lost=q()<.55*(1-clear)&&ch!==' ';G.text(lost?'·':ch,x,650,{size:32,col:lost?'#888888':WH,al:t>3?1:.0+t/3})});
  G.wave(80,710,440,u=>Math.sin(u*40+t*10)*14*(.4+.6*Math.sin(u*9))+(1-clear)*(q()-.5)*26,clear>.5?GO:'#aaaaaa',3,.8)}};
// 3 Cherry 1953: a different voice in each ear
D[3]={dur:16,audio:1,pics:['tape-man'],rv:9,rvx:220,rvy:370,
 caps:[[0,'A different voice in each ear'],[4,'He follows the left one'],[8,'The right one fades into the background'],[12,'Like picking out one voice at a party']],
 draw(g,t,s){G.pic('tape-man',0,0,600,800);const f=ramp(t,4,7),fade=ramp(t,8,11);
  const Lp=[[30,200],[120,280],[218,370]],Rp=[[570,200],[480,280],[367,370]];
  if(Math.floor(t*3)!==s.b){s.b=Math.floor(t*3);G.tone(220+(s.b%3)*40,.15,{pan:-1,vol:.9});G.tone(330+(s.b%4)*30,.15,{pan:1,vol:.9*(1-fade*.8)})}
  G.path(Lp,GO,5,.5+.4*f);G.stream(Lp,t,5,GO,6,1,.5);G.path(Rp,BL,5,.5*(1-fade*.8));G.stream(Rp,t,5,BL,6,1-fade*.8,.5);
  G.bloom(218,370,70,GO,.3+.5*f);G.bloom(367,370,70,BL,.5*(1-fade));
  G.glass(30,60,170,90,18);G.text('LEFT',115,90,{size:16,col:GO});G.wave(50,120,130,u=>Math.sin(u*30+t*8)*12,GO,3,1);
  G.glass(400,60,170,90,18,1-fade*.6);G.text('RIGHT',485,90,{size:16,col:BL,al:1-fade*.6});G.wave(420,120,130,u=>Math.sin(u*24-t*7)*12*(1-fade*.7),BL,3,1-fade*.6);
  if(f>0){G.bubble(160,190,150,54,250,330,GO,f);G.text('following',235,215,{size:16,col:'#1a0d06',al:f})}}};
// 4 Sounds snap into boxes (1957)
D[4]={dur:17,audio:1,pics:['boy-ear'],rv:9.5,rvx:300,rvy:200,
 caps:[[0,'A sound slides smoothly, step by step'],[3,'From one speech sound to another'],[7,'But you hear only one or the other'],[11,'Almost nothing in between']],
 draw(g,t,s){G.pic('boy-ear',0,0,600,800);const x=(Math.sin((t-2)*.55-1.57)+1)/2;const st=t<2?0:x;
  G.glass(40,60,520,230,22);const c=g.c;const gr=G.lg(70,0,530,0,[[0,'#ff9a5a'],[1,'#6ab8ff']]);G.rr(70,120,460,16,8,gr);
  for(let i=0;i<=8;i++)G.dot(70+i*57.5,128,4,WH,.6);G.ball(70+460*st,128,16,G.mix('#ff9a5a','#6ab8ff',st));
  G.text('sound',300,92,{size:15,al:.7});G.text('"ba"',90,170,{serif:1,size:30,col:'#ff9a5a'});G.text('"da"',510,170,{serif:1,size:30,col:'#6ab8ff'});
  const heard=st<.5?0:1,k=ramp(t,7,8);G.text('heard',300,215,{size:15,al:.7*k});
  G.rr(130,235,150,40,20,'#ff9a5a',null,(heard?0.15:.95)*k);G.rr(320,235,150,40,20,'#6ab8ff',null,(heard?.95:.15)*k);
  G.text('ba',205,255,{size:20,col:'#160a04',al:k});G.text('da',395,255,{size:20,col:'#160a04',al:k});
  if(Math.floor(t*1.6)!==s.b&&t>1){s.b=Math.floor(t*1.6);G.tone(heard?520:300,.12,{type:'triangle'})}
  rings(258,520,t,heard?'#6ab8ff':'#ff9a5a',.6,3,.9,20,80)}};
// 5 Treisman 1964: the other ear is turned down, not off
D[5]={dur:17,audio:1,pics:['shadowing'],rv:10.5,rvx:220,rvy:195,
 caps:[[0,'She repeats the voice in one ear'],[4,'The other ear gets turned down…'],[7,'…but not off'],[10.5,'Something meaningful slips through']],
 draw(g,t,s){G.pic('shadowing',0,0,600,800);const down=ramp(t,4,7)*.7,slip=ramp(t,10.5,12);
  G.glass(30,500,250,240,20);G.text('ignored ear',155,530,{size:15,al:.8});G.rr(70,550,40,170,20,'#00000066',WH,.4);G.rr(74,554+162*down,32,162*(1-down),16,BL);G.text(Math.round(100-down*100)+'%',155,640,{serif:1,size:46,col:BL});
  G.path([[160,140],[200,170],[220,195]],BL,4,.8-down*.5);G.stream([[40,100],[160,140],[220,195]],t,5,BL,5,1-down*.6,.5);
  rings(340,245,t,GO,.7,3,1,20,70);
  if(t>10.5){const x=lerp(40,215,slip),y=lerp(100,190,slip);G.bloom(x,y,60,'#ffe070',.9);G.ball(x,y,14,'#ffe070');G.text('!',x,y-34,{serif:1,size:44,col:'#ffe070',glow:'#ffe070'});if(G.cue(s,'slip'))G.tone(880,.3)}
  if(t>13)G.stamp('TURNED DOWN, NOT OFF',300,90,13,t,GO,30)}};
// 6 Eimas 1985: babies sort the flow of speech
D[6]={dur:16,pics:['baby'],rv:9,rvx:300,rvy:200,
 caps:[[0,'A stream of speech reaches a baby'],[4,'Long before talking…'],[7,'…the baby splits it into separate sounds'],[12,'Hearing language starts as sorting']],
 draw(g,t){G.pic('baby',0,0,600,800);const k=ramp(t,7,10);const cols=['#ff9a5a','#ffd060','#6ab8ff','#b48cff','#7fe0a0'];
  G.glass(30,60,540,200,22);
  for(let i=0;i<20;i++){const u=i/20,x=50+u*500,ci=Math.floor(i/4),col=cols[ci],gap=k*12*ci;
   G.rr(x+gap-k*24+8,150-30*Math.sin(u*9+t*3)*.5,20-k*4,60,8,G.mix('#bbbbbb',col,k),null,.9)}
  G.text(k>.5?'separate sounds':'one long stream',300,90,{size:16,al:.8});
  G.stream([[300,260],[260,400],[240,500]],t,4,k>.5?cols[Math.floor(t)%5]:'#cccccc',6,1,.5);G.bloom(232,520,70,GO,.3+.3*k)}};
// 7 Bregman 1990: the brain splits the mix into streams
D[7]={dur:16,audio:1,pics:['singer-drum'],rv:9,rvx:300,rvy:150,
 caps:[[0,'One mixed-up sound arrives at your ear'],[4,'Your brain pulls it apart'],[8,'One stream: the voice. One: the drum.'],[12,'Hearing builds a scene']],
 draw(g,t,s){G.pic('singer-drum',0,0,600,800);const sp=ramp(t,4,8);if(Math.floor(t*2)!==s.b){s.b=Math.floor(t*2);G.tone(120,.12,{type:'triangle',vol:1.2});G.tone(392+(s.b%4)*44,.4,{vol:.6})}
  G.glass(30,40,540,250,22);const v=u=>Math.sin(u*30+t*5)*22,d=u=>Math.exp(-(((u*6+t*2)%1)*10))*-50;
  if(sp<1)G.wave(50,165,500,u=>v(u)+d(u),'#dddddd',4,1-sp);
  if(sp>0){G.wave(50,lerp(165,105,sp),500,v,'#ff8fb0',4,sp,12);G.wave(50,lerp(165,240,sp),500,d,GO,4,sp,12);
   G.text('voice',70,lerp(165,75,sp),{size:15,col:'#ff8fb0',align:'left',al:sp});G.text('drum',70,lerp(165,270,sp),{size:15,col:GO,align:'left',al:sp})}
  if(t>8){const k=ramp(t,8,9.5);G.curveArrow(150,120,80,300,175,410,'#ff8fb0',4,k);G.curveArrow(520,250,570,420,530,560,GO,4,k);G.bloom(190,420,80,'#ff8fb0',.4*k);G.bloom(520,610,90,GO,.4*k)}}};
// 8 2005, awake macaques: one stream of beeps becomes two
D[8]={dur:18,audio:1,pics:['monkey'],rv:11,rvx:300,rvy:640,
 caps:[[0,'High, low, high… the same beeps over and over'],[4,'At first they sound like one tune'],[9,'Keep listening: it splits in two'],[13,'The monkey\'s hearing area showed the same change']],
 draw(g,t,s){G.pic('monkey',0,0,600,800);const sp=ramp(t,8,11),n=Math.floor(t*4);
  if(n!==s.b){s.b=n;const hi=n%4!==1&&n%4!==3?0:1;if(n%4!==3)G.tone(hi?440:660,.1,{vol:.8})}
  G.glass(30,560,540,200,22);const pts=[];for(let i=0;i<16;i++){const ph=i%4;if(ph===3)continue;const x=60+i*31,y=ph===1?720:600;pts.push([x,y]);
   const act=(i===n%16);G.ball(x,y,act?13:9,ph===1?BL:GO,act?1:.7);if(act)G.bloom(x,y,40,ph===1?BL:GO,.8)}
  const tri=[];for(let i=0;i<pts.length;i++)tri.push(pts[i]);G.path(tri,'#ffffff',3,.6*(1-sp));
  if(sp>0){G.path(pts.filter(p=>p[1]===600),GO,3,.8*sp);G.path(pts.filter(p=>p[1]===720),BL,3,.8*sp)}
  G.text(sp>.5?'two streams':'one tune',300,660,{serif:1,size:30,al:.9});rings(470,430,t,WH,.4,3,1,40,100)}};
// 9 Caras & Sanes 2015: early silence leaves a mark
D[9]={dur:16,pics:['sound-lab'],rv:11,rvx:420,rvy:640,
 caps:[[0,'Hearing grows up with sound'],[3,'Early on, a short spell of hearing loss'],[7,'Then hearing comes back'],[11,'But the problems last']],
 draw(g,t){const c=g.c;G.pic('sound-lab',0,0,600,800);const k=ramp(t,0,13),quiet=t>3&&t<7;
  if(!quiet)rings(164,300,t,GO,t>7?.6:.9,3,1,30,120);else{G.ball(164,300,34,'#222',.8);G.line(140,276,188,324,RD,6);G.text('quiet',164,360,{size:16,col:RD})}
  G.text('Lab and animal not named in the record',300,40,{size:14,al:.7});
  G.glass(30,470,540,300,22);G.text('early life',70,745,{size:14,align:'left',al:.75});G.text('later',540,745,{size:14,align:'right',al:.75});G.arrow(60,725,550,725,'#ffffff',2,.4);
  G.rr(150,490,80,220,10,'#000000',null,.55*ramp(t,3,4));if(t>3)G.text('short silence',190,505,{size:13,al:.85});
  const fx=u=>60+u*490,tip=G.clamp(k),pts=[];for(let i=0;i<=100*tip;i++){const u=i/100,x=fx(u);let y;if(x<150)y=600-Math.sin(u*60)*30;else if(x<230)y=600;else y=600-Math.sin(u*60)*30*.45+Math.sin(u*170)*8;pts.push([x,y])}
  if(pts.length>1){G.path(pts,GO,4,.95);const p=pts[pts.length-1];G.bloom(p[0],p[1],40,GO,.8)}
  if(t>11){const gh=[];for(let i=0;i<=100;i++){const u=i/100;if(fx(u)>230)gh.push([fx(u),600-Math.sin(u*60)*30])}G.path(gh,'#ffffff',2,.4*ramp(t,11,12),[5,7]);G.text('expected',470,535,{size:15,al:.8});G.text('what happened',470,680,{size:15,col:GO})}}};
// 10 2016: listeners spot a pattern almost like a perfect calculator
D[10]={dur:18,audio:1,pics:['booth'],rv:11,rvx:300,rvy:560,
 caps:[[0,'Fast random beeps'],[5,'Then a pattern starts repeating'],[7,'Listeners caught it almost as fast as a perfect calculator'],[12,'Their brains tracked how predictable each beep was']],
 draw(g,t,s){G.pic('booth',0,0,600,800);const n=Math.floor(t*6),pat=t>5,q=G.rnd(n*7+3);
  if(n!==s.b){s.b=n;const f=pat?[0,4,2,6][n%4]:Math.floor(q()*8);G.tone(400*Math.pow(2,f/8),.08,{vol:.7})}
  G.glass(30,40,540,230,22);G.text(pat?'pattern':'random',60,66,{size:15,align:'left',col:pat?GO:'#dddddd'});
  for(let i=0;i<24;i++){const m=n-23+i;if(m<0)continue;const qq=G.rnd(m*7+3),isP=m/6>5,f=isP?[0,4,2,6][m%4]:Math.floor(qq()*8);G.rr(50+i*21,240-f*20,16,16,4,isP?GO:'#cccccc',null,.4+.6*(i/24))}
  G.glass(30,560,540,200,22);const race=[['perfect calculator','#ffffff',5.1,.9],['listener',GO,5.1,1.3]];
  race.forEach(([l,col,t0,d],i)=>{const y=610+i*80,v=G.clamp((t-t0)/d);G.text(l,60,y-22,{size:16,align:'left',col});G.rr(60,y,440,18,9,'#00000088');G.rr(60,y,440*v,18,9,col);if(v>=1){G.ball(530,y+9,16,'#3fbf6a');G.text('✓',530,y+10,{size:18,col:'#fff'})}});
  G.line(60+440*0,585,60,750,'#ffffff',1,0);
  if(t>12)G.bloom(330,420,90,GO,.5*(.7+.3*Math.sin(t*6)))}};
// 11 Dürschmid 2016: a surprise raises two flags
const brainOverlay=(x,y,s,spots)=>G.brain(x,y,s,{spots});
D[11]={dur:16,audio:1,pics:['hospital'],rv:9,rvx:300,rvy:200,
 caps:[[0,'A steady pattern of sounds'],[5,'One sound breaks the pattern'],[6,'The hearing area flags it'],[7,'So does the front of the brain'],[11,'Surprise is checked at more than one level']],
 draw(g,t,s){G.pic('hospital',0,0,600,800);dim(.25);const n=Math.floor(t*2.5),odd=n%8===7&&t>5;
  if(n!==s.b){s.b=n;G.tone(odd?880:440,.12)}const f1=t>5?Math.exp(-((t*2.5)%8-7.05)*3)*(odd?1:0):0;
  G.glass(30,560,540,200,22);for(let i=0;i<16;i++){const m=n-15+i;if(m<0)continue;const o=m%8===7&&m/2.5>5;G.ball(55+i*33,o?620:680,o?12:8,o?RD:'#cccccc',.5+.5*i/16)}
  const tf=t>6?.95*ramp(t,6,6.4):0,ff=t>7?.95*ramp(t,7,7.4):0,pulse=.6+.4*Math.sin(t*6);
  G.brain(300,220,.95,{spots:[[30,40,50,tf*pulse,RD],[-120,-20,50,ff*pulse,RD]]});
  if(t>6)G.flag(330,240,.5,RD,t);if(t>7)G.flag(185,190,.5,RD,t)}};
// 12 Bizley, Maddox & Lee 2016: when do a sound and a sight become one thing?
D[12]={dur:16,pics:['duet'],rv:10,rvx:300,rvy:400,
 caps:[[0,'Two sounds, two people on stage'],[4,'Which sound belongs to which person?'],[8,'When sight and sound join, you hear one thing'],[12,'A review asking how to prove it']],
 draw(g,t){G.pic('duet',0,0,600,800);const k=ramp(t,8,10);
  rings(190,320,t,'#ff8fb0',.6,3,.8,20,90);rings(420,470,t,GO,.6,3,.7,20,90);
  if(t>4){const q=G.clamp((t-4)*2)*(1-k);G.text('?',190,200,{serif:1,size:60,al:q});G.text('?',430,220,{serif:1,size:60,al:q})}
  if(k>0){G.ring(190,330,lerp(140,70,k),'#ff8fb0',4,k);G.ring(420,450,lerp(160,90,k),GO,4,k);G.bloom(190,330,100,'#ff8fb0',.35*k);G.bloom(420,450,110,GO,.35*k)}
  if(t>12)G.stamp('STILL BEING ARGUED',300,720,12,t,GO,32)}};
// 13 2017: speech beats about 5 times a second, music about 2
D[13]={dur:16,audio:1,pics:['duet'],rv:9,rvx:300,rvy:330,
 caps:[[0,'25 hours of speech, nine languages'],[3,'39 hours of music'],[6,'Speech pulses about 5 times a second'],[9,'Music, closer to 2']],
 draw(g,t,s){G.pic('duet',0,0,600,800,.75);dim(.25);
  if(t>6&&t<9&&Math.floor(t*5)!==s.a){s.a=Math.floor(t*5);G.tone(300,.06)}if(t>9&&Math.floor(t*2)!==s.m){s.m=Math.floor(t*2);G.tone(200,.15,{type:'triangle'})}
  [['speech',5,150,'#ff8fb0',0,150],['music',2,560,GO,3,440]].forEach(([l,hz,y,col,t0,px])=>{const a=G.clamp((t-t0)*2);G.glass(30,y-110,540,200,22,a);
   G.text(l,60,y-80,{size:22,col,align:'left',al:a});G.wave(50,y+20,500,u=>{const tt=u*2.5-t;return -Math.abs(Math.sin(tt*Math.PI*hz))*60},col,4,a,14);
   const k=G.clamp(t-(t0+3)),ph=(t*hz)%1;for(let i=0;i<hz;i++){const lit=Math.floor((t*hz)%hz)===i;G.ball(200+i*36,y-80,lit?15:11,col,k*(lit?1:.45))}G.text('≈'+hz+' a second',550,y-80,{size:20,align:'right',al:k});
   G.ring(px,y<400?330:330,0,col,0,0)});
  G.line(50,762,250,762,'#ffffff',3,.6);G.text('1 second',150,780,{size:14,al:.7})}};
// 14 Parras 2017: surprise grows step by step on the way up
D[14]={dur:16,audio:1,pics:['sound-lab'],rv:10,rvx:430,rvy:160,
 caps:[[0,'An unexpected sound enters'],[3,'Brainstem: a small "huh?"'],[5.5,'Next relay: bigger'],[8,'Hearing area: biggest'],[11,'Surprise grows on the way up']],
 draw(g,t,s){G.pic('sound-lab',0,0,600,800);dim(.35);const st=[['brainstem',620,3],['relay',440,5.5],['hearing area',260,8]];
  if(t<3.5)rings(164,300,t,RD,1,3,1.2,30,120);
  G.glass(250,190,320,500,26);G.path([[430,680],[430,260]],'#ffffff',6,.15);
  if(t>.5&&G.cue(s,'b'))G.tone(990,.2);G.stream([[164,300],[260,700],[430,700],[430,620],[430,440],[430,260]],t,4,RD,5,G.clamp(t),.3);
  st.forEach(([l,y,t0],i)=>{const k=ramp(t,t0,t0+.8),sz=[.35,.65,1][i];G.bloom(430,y,50+90*sz,RD,k*sz);G.ball(430,y,24,G.mix('#5a4a5a',RD,k));
   G.text(l,400,y-40,{size:16,align:'right',al:.9});G.rr(462,y-10,90*sz*k,20,10,RD,null,.9);if(k>0&&G.cue(s,'s'+i))G.tone(440+i*220,.15,{vol:.4+.3*i})});
  G.text('Lab detail beyond this is not in the record',300,750,{size:14,al:.7})}};
// 15 Pavlovian 2017: a light, a faint tone… then the tone with no sound
D[15]={dur:18,audio:1,pics:['lamp-speaker'],hint:'Turn sound on: the last tone is never played',hintAt:1,rv:12,rvx:430,rvy:500,
 caps:[[0,'A light comes on with a faint tone'],[4,'Again and again'],[9,'Now only the light'],[11,'Some people still heard the tone']],
 draw(g,t,s){G.pic('lamp-speaker',0,0,600,800);const n=Math.floor(t/2.2),ph=(t/2.2)%1,on=ph<.35,real=t<9;
  if(on){G.bloom(120,440,220,'#fff0c0',.8);G.bloom(120,440,70,'#ffffff',.9);if(real&&G.cue(s,'t'+n))G.tone(660,.5,{vol:.35})}
  if(on&&real)rings(430,500,t,WH,.7,3,1.6,40,130);
  if(!real&&t>11&&(on||ph>.9||n>=8)){G.at(430,500,1);for(let i=0;i<3;i++)G.ring(0,0,50+i*35,'#c59cff',3,.6,[6,10]);G.end();G.bloom(430,500,120,'#c59cff',.5);G.text('heard',430,370,{serif:1,size:34,col:'#d9b8ff'})}
  G.glass(30,640,540,120,20);for(let i=0;i<8;i++){const x=70+i*65,isReal=i*2.2<9,past=i<=n;G.dot(x,680,10,'#fff0c0',past?.95:.25);G.dot(x,725,10,isReal?WH:'#c59cff',past?(isReal?.9:.0):.15);if(!isReal&&past&&t>11)G.ring(x,725,10,'#c59cff',3,.9)}
  G.text('light',40,680,{size:12,align:'left',al:.6});G.text('tone',40,725,{size:12,align:'left',al:.6})}};
// 16 Petro, Paton & Muckli 2017: sound reaches the first seeing area
D[16]={dur:16,pics:['mri-glow'],rv:9,rvx:440,rvy:220,
 caps:[[0,'Patterns of sound play in a scanner'],[4,'Watch the back of the brain, where seeing starts'],[7,'It changes with the sounds'],[11,'Hearing gives the eyes context']],
 draw(g,t){G.pic('mri-glow',0,0,600,800);const k=ramp(t,6,8),p=.6+.4*Math.sin(t*5);
  rings(300,600,t,BL,.6,4,.8,30,150);G.brain(300,220,.95,{spots:[[-20,40,60,.5,BL],[130,0,55,k*p,GO]]});
  if(t>4){G.at(300,220,.95);G.curveArrow(-10,50,70,110,120,15,GO,5,ramp(t,4,6));G.end();G.text('first seeing area',460,110,{size:15,col:GO,al:ramp(t,4,5)})}}};
// 17 Tong et al. 2020: the ventriloquist trick
D[17]={dur:16,pics:['ventriloquist'],rv:8,rvx:325,rvy:250,
 caps:[[0,'The sound comes from the man'],[4,'But your eyes see the puppet\'s mouth move'],[8,'So you hear it come from the puppet'],[12,'Learned pairs make that pull stronger or weaker']],
 draw(g,t){G.pic('ventriloquist',0,0,600,800);const pull=ramp(t,6,9);
  rings(205,240,t,GO,.7,3,1,10,60);G.text('real sound',205,330,{size:15,col:GO,al:G.clamp(t)});
  const jaw=Math.abs(Math.sin(t*9))*(t>4?1:0);if(t>4){G.bloom(325,268,40,'#ffffff',.4*jaw);G.line(312,268,338,268+jaw*8,'#ffffff',3,.9)}
  let px=lerp(205,325,pull);if(t>12){const sw=.5+.5*Math.sin((t-12)*2.4);px=lerp(240,325,sw)}
  G.at(px,140,1);G.bloom(0,0,70,'#ff8fb0',.7);G.ball(0,0,15,'#ff8fb0');G.end();G.text('heard from here',px,95,{size:16,col:'#ff8fb0'});G.line(px,166,px,225,'#ff8fb0',2,.6,[5,6]);
  if(pull>0)G.curveArrow(205,190,265,150,px-10,160,'#ffffff',3,.6*pull,[5,6]);
  if(t>12){const a=ramp(t,12,12.8);G.glass(60,660,480,90,20,a);G.text('weaker pull',150,705,{size:16,al:a});G.text('stronger pull',450,705,{size:16,al:a});G.arrow(240,705,360,705,'#ff8fb0',4,a)}}};
// 18 2023: a song rebuilt from brain recordings
D[18]={dur:17,audio:1,pics:['hospital'],rv:11,rvx:300,rvy:620,
 caps:[[0,'A patient listens to a song'],[3.5,'Sensors on the brain\'s surface record'],[7,'A computer turns the recording back into sound'],[11,'Close enough to recognise the music'],[14,'29 patients in epilepsy surgery']],
 draw(g,t,s){G.pic('hospital',0,0,600,800);const k=ramp(t,7,10);
  if(Math.floor(t*2.5)!==s.b){s.b=Math.floor(t*2.5);const m=[0,4,7,4,9,7,4,2][s.b%8];if(t<7)G.tone(262*Math.pow(2,m/12),.35);else G.tone(262*Math.pow(2,m/12),.35,{type:'triangle',vol:.6})}
  rings(190,450,t,GO,.5,3,.8,30,90);for(let i=0;i<9;i++){const x=150+(i%3)*30,y=400+Math.floor(i/3)*25;G.dot(x,y,4,P.hi,.6+.4*Math.sin(t*12+i))}
  G.glass(30,560,540,200,22);const mel=u=>{const m=[0,4,7,4,9,7,4,2][Math.floor(((u*4+t*.5)%1)*8)];return -m*6};
  G.text('song',60,590,{size:14,align:'left',col:GO});G.wave(110,625,440,u=>mel(u)+20,GO,4,1);
  G.text('rebuilt',60,690,{size:14,align:'left',col:P.hi,al:k});if(k>0)G.wave(110,725,440*k,u=>mel(u*k)*.9+Math.sin(u*200)*4+20,P.hi,4,k,10)}};
// 19 2023: predictions stacked like a ladder
D[19]={dur:17,pics:['mri'],rv:11,rvx:300,rvy:150,
 caps:[[0,'304 people listen to stories in a scanner'],[4,'Some brain areas guess the next sound'],[7,'Others guess further ahead'],[10,'Predictions stacked like a ladder']],
 draw(g,t){G.pic('mri',0,0,600,800);dim(.35);const lv=[['next sound',1,4],['next word',3,6],['further ahead',7,8]];
  G.glass(40,40,520,330,24);lv.forEach(([l,len,t0],i)=>{const y=310-i*95,k=ramp(t,t0,t0+1);G.text(l,70,y-30,{size:15,align:'left',al:.85*k});
   G.rr(70,y-10,460,16,8,'#ffffff',null,.08);G.rr(70,y-10,lerp(20,460,(len/7))*k,16,8,[GO,'#ffb070','#ffd8a0'][i],null,.9);G.bloom(70+lerp(20,460,len/7)*k,y-2,30,GO,k)});
  const x=(t*60)%520;G.text('· · the · story · went · on · ·',300+((-t*40)%120),430,{size:18,al:.6});
  rings(300,560,t,GO,.4,3,.7,30,120)}};
// 20 2025, mice: did that sound match my step?
D[20]={dur:17,audio:1,pics:['mouse-rig'],rv:10,rvx:330,rvy:300,
 caps:[[0,'A mouse runs; each step makes a click'],[5,'Then a click comes out of step'],[6,'Its hearing area flags it'],[10,'A surprise from the eyes feeds the same flag']],
 draw(g,t,s){G.pic('mouse-rig',0,0,600,800);const n=Math.floor(t*3),mis=n===17||n===25,vis=t>10&&n===34;
  if(n!==s.b){s.b=n;G.tone(mis?1200:500,.05,{type:'square',vol:.4})}
  G.glass(30,40,540,130,20);for(let i=0;i<20;i++){const m=n-19+i;if(m<0)continue;const mm=m===17||m===25;G.line(50+i*26,150,50+i*26,mm?60:110,mm?RD:WH,4,.4+.6*i/20)}
  const fl=Math.max(G.clamp(1-(t-(17/3))*1.5)*(t>17/3?1:0),G.clamp(1-(t-(25/3))*1.5)*(t>25/3?1:0),G.clamp(1-(t-(34/3))*1.5)*(t>34/3?1:0));
  if(vis||(t>34/3&&t<34/3+.6)){const c=g.c;c.fillStyle='rgba(120,200,255,.25)';c.fillRect(0,170,600,300)}
  G.brain(470,300,.42,{spots:[[30,40,60,fl,RD]]});if(fl>.2)G.flag(510,250,.45,RD,t);if(t>10)G.curveArrow(300,200,360,180,420,270,BL,4,ramp(t,10,11))}};
/* On-screen story for each demo: [time in the animation, kind, line]. Q question, S setup, D what they did, R what happened, W why it matters, N good to know. Facts only from each stop's Pixel Hound record. */
const STORY={
1:[[0,'Q',"Why do some notes sound good together, while others clash? In 1863 a scientist called Helmholtz wrote a big book explaining hearing and music with science."],
 [0,'S',"Pitch = how high or low a note sounds. Helmholtz studied pitch, and how notes fit together."],
 [3,'D',"His key idea: one musical note isn't one simple sound. Inside it is a stack of simpler tones, called harmonics."],
 [6.5,'D',"In this scene, each brass sphere rings for just one of those tones, picking it out of the note."],
 [11,'R',"So a note can be pulled apart into pieces. That helped explain pitch, and why some notes sound good together."],
 [12.5,'W',"Hearing became something you could take apart and study, like any other part of the body."],
 [14,'N',"Thin evidence: our record of this book is short. The scene is an example of the idea. Turn the sound on to hear it."]],
2:[[0,'Q',"Do we hear only with our ears? In 1935 a Scientific American article by Cotton asked: do we hear with our eyes?"],
 [0,'S',"It was about understanding speech when hearing is hard, like a voice through noise."],
 [1,'D',"Here someone speaks in a noisy room."],
 [3,'D',"With the face hidden, the words break up. You catch only bits."],
 [7,'D',"Now you can watch the speaker's lips."],
 [9,'R',"The sound is the same, but the words come back. The face fills in what the ears missed."],
 [11,'W',"Understanding speech uses your eyes as well as your ears."],
 [13,'N',"Thin evidence: a magazine article, with few details in our record. The noisy room is an example."]],
3:[[0,'Q',"At a loud party, how do you follow one friend's voice and tune out everyone else? In 1953 a scientist called Cherry tested this."],
 [0,'S',"People heard a different voice in each ear at the same time. Playing different sounds to each ear is called dichotic listening."],
 [4,'D',"They were asked to follow the voice in the left ear."],
 [8,'R',"They could. The voice in the right ear faded into the background."],
 [12,'W',"Your brain can pick out one stream of sound and filter out the rest. It's now called the cocktail party problem."],
 [14,'N',"Thin evidence: our record has few details of the tests."]],
4:[[0,'Q',"Speech sounds can blend smoothly into each other. So do we hear all the in-between sounds too? In 1957 researchers tested this."],
 [0,'S',"Phoneme = one of the small sounds words are built from, like the 'b' in 'bat'. The researchers made a row of sounds sliding from one phoneme to another."],
 [1,'D',"Each sound in the row is a tiny step on from the last. 'ba' and 'da' here are examples."],
 [3,'D',"Listeners heard sounds from the row and said whether they sounded the same or different."],
 [7,'R',"Small steps inside one phoneme were very hard to tell apart. A step of the same size across the border between two was easy."],
 [11,'R',"So people heard one sound or the other, with almost nothing in between."],
 [13,'W',"Your brain sorts speech into boxes, even when the sound itself slides smoothly."],
 [15,'N',"Thin evidence: our record has few details of the tests."]],
5:[[0,'Q',"Cherry found we can tune out one ear. But is the ignored voice really gone? In 1964 Treisman tested it."],
 [0,'S',"She played a different voice in each ear. People repeated aloud the voice in one ear as they heard it. That's called shadowing."],
 [4,'D',"The voice in the other ear was meant to be ignored."],
 [7,'R',"Treisman found it was turned down, not switched off."],
 [10.5,'R',"Meaningful words from the ignored ear could still slip through and get noticed."],
 [12.5,'W',"Attention works like a volume knob, not an on-off switch."],
 [14,'N',"Thin evidence: our record has few details of the tests."]],
6:[[0,'Q',"Babies can't talk yet. But can they already hear the difference between speech sounds?"],
 [0,'S',"In 1985 a scientist called Eimas wrote about tests with babies, long before they could talk."],
 [4,'D',"Speech reaches the baby as one flowing stream of sound."],
 [7,'R',"The babies already split that stream into separate speech sounds, sorting them into groups."],
 [12,'W',"Learning a language starts with sorting sounds, and babies arrive ready to sort."],
 [14,'N',"Thin evidence: a magazine article. Our record doesn't say how the babies were tested, so the scene shows the finding, not the method."]],
7:[[0,'Q',"When someone sings over a drum, both sounds reach your ear mixed together. So how do you hear a voice and a drum separately?"],
 [0,'S',"In 1990 a scientist called Bregman wrote a book on this. He called it auditory scene analysis. Auditory = to do with hearing."],
 [4,'D',"His idea: your brain pulls the mix apart into groups."],
 [8,'R',"Each group is a stream: one for the voice, one for the drum."],
 [12,'W',"Hearing builds a scene, the way seeing does: who's talking, which instrument is playing."],
 [14,'N',"Thin evidence: a book, not one experiment. The voice and drum are examples."]],
8:[[0,'Q',"Fast beeps going high, low, high, low can sound like one tune. Keep listening, and they can split into two. Where in the brain does that happen?"],
 [0,'S',"In 2005 researchers recorded brain cells in the hearing area of awake macaque monkeys while they heard beeps like these."],
 [1,'D',"The same high and low beeps play over and over."],
 [4,'D',"At first they sound like one tune, hopping up and down."],
 [9,'R',"Keep listening, and it splits: a high stream and a low stream."],
 [13,'R',"In the monkeys' hearing area, the cells' responses changed over time in the same way: one stream turned into two."],
 [15,'W',"The brain doesn't just record sound. Over a few seconds, it decides how to group it."]],
9:[[0,'Q',"Does it matter when you hear things? What if hearing is blocked for a while early in life?"],
 [0,'S',"In 2015 Caras and Sanes studied what happens after a short, temporary hearing loss while hearing is still growing up."],
 [3,'D',"Early in life, hearing is blocked for a short spell."],
 [7,'D',"Then hearing comes back to normal."],
 [11,'R',"But problems making sense of sound lasted, long after hearing returned."],
 [13,'W',"The senses need the right sounds at the right time while they develop. Miss that window, and hearing can stay changed."],
 [14.5,'N',"Our record doesn't give details of who was tested or how, so the scene shows the idea."]],
10:[[0,'Q',"Can your brain spot a pattern hidden in a fast jumble of beeps? And how quickly?"],
 [0,'S',"In 2016 researchers played people fast runs of beeps and recorded their brains with scanners."],
 [1,'D',"At first the beeps are random."],
 [5,'D',"Then, with no warning, a pattern starts repeating."],
 [7,'R',"Listeners caught it almost as fast as an 'ideal observer': a perfect calculator using every clue."],
 [12,'R',"Their brain activity tracked how predictable each beep was, in hearing areas, a memory area and the front of the brain."],
 [14,'W',"Your brain keeps very precise track of patterns in sound, without you trying."],
 [16,'N',"These were simple lab beeps, not speech."]],
11:[[0,'Q',"When a sound breaks a pattern you've been hearing, your brain notices. But which parts of the brain notice?"],
 [0,'S',"In 2016 Dürschmid and colleagues recorded people's brain activity while they heard patterns of sounds."],
 [1,'D',"A steady pattern of sounds plays."],
 [5,'D',"Then one sound breaks the pattern."],
 [6,'R',"The hearing area, at the side of the brain, reacts with a burst of activity, like raising a warning flag."],
 [7,'R',"So does the front of the brain, with a burst of fast electrical activity."],
 [11,'W',"Surprise is checked at more than one level. Prediction error = the brain's 'that wasn't expected' signal."]],
12:[[0,'Q',"At a concert, how do you know which sound comes from which person? When do a sound and a sight become one 'thing'?"],
 [0,'S',"In 2016 Bizley, Maddox and Lee wrote a review, gathering many studies on that question. Review = a paper that adds up earlier work."],
 [1,'D',"Example: two people on stage, two sounds."],
 [4,'D',"Your brain has to match each sound to a person."],
 [8,'R',"When a sight and a sound join, you experience one thing: that person, making that sound."],
 [12,'W',"The review set out tests scientists can use to prove the joining really happens in the brain."],
 [14,'N',"The stage is an example, not an experiment from the paper."]],
13:[[0,'Q',"Speech and music both have a beat. Is it the same beat?"],
 [0,'S',"In 2017 researchers measured 25 hours of speech in nine languages, and 39 hours of music."],
 [3,'D',"They measured how fast the loudness rises and falls, like a pulse running through the sound."],
 [6,'R',"Speech pulses about 5 times a second."],
 [9,'R',"Music pulses closer to 2 times a second."],
 [11,'W',"Speech and music have different steady beats. The authors suggest these may be rhythms our brains are built for."]],
14:[[0,'Q',"Is surprise noticed only at the top of the brain, or earlier, on the way up?"],
 [0,'S',"In 2017 Parras and colleagues recorded neurons (brain cells) along the hearing pathway: the chain of stations sound signals pass through from the ear to the brain's hearing area."],
 [1,'D',"They played a sound that broke a pattern."],
 [3,'R',"In the midbrain, an early station low down, neurons gave a small 'that wasn't expected' signal."],
 [5.5,'R',"At the next station, the thalamus, the signal was bigger."],
 [8,'R',"In the hearing area of the cortex (the brain's outer layer), it was biggest."],
 [11,'W',"Surprise grows step by step on the way up. It isn't only handled at the top."]],
15:[[0,'Q',"Can expecting a sound make you hear it, even when it isn't there?"],
 [0,'S',"In 2017 researchers trained people to link a light with a faint tone. Hallucination = sensing something that isn't really there."],
 [1,'D',"A light comes on together with a faint tone."],
 [4,'D',"Again and again, until people expect the tone whenever the light appears."],
 [9,'D',"Then only the light comes on. No tone."],
 [11,'R',"Some people still heard the tone. Their expectation made the sound."],
 [13,'W',"What we hear is partly what we expect. When expectation counts too much, the brain can hear things that aren't there."],
 [15,'N',"Small groups of people, and a lab task, not everyday life. The study also used brain scans and a computer model."]],
16:[[0,'Q',"Can what you hear change the part of the brain that sees?"],
 [0,'S',"In 2017 Petro, Paton and Muckli looked at how sounds affect V1: the first seeing area, at the back of the brain."],
 [1,'D',"Patterns of sound play while a scanner watches the brain."],
 [4,'D',"Watch the back of the brain, where seeing starts."],
 [7,'R',"Its activity changes with the sounds, even though they're sounds, not sights."],
 [11,'W',"Hearing gives your eyes context. Even the earliest seeing area uses information from the ears."]],
17:[[0,'Q',"Why does a ventriloquist's puppet seem to talk, when the voice really comes from the person?"],
 [0,'S',"In 2020 Tong, Li, Bruns and Röder tested how what we see pulls on where we hear a sound coming from."],
 [1,'D',"The sound really comes from the man."],
 [4,'D',"But your eyes see the puppet's mouth move."],
 [8,'R',"So you hear the voice coming from the puppet. Sight pulls the sound towards it."],
 [12,'R',"They found that sight-and-sound pairs people had learned changed how strong that pull was."],
 [14,'W',"Your brain blends where sounds and sights seem to be, and past experience sets how much."]],
18:[[0,'Q',"Could you rebuild a song from someone's brain activity alone?"],
 [0,'S',"In 2023 researchers used recordings from 29 patients having epilepsy surgery. Epilepsy = a condition that causes seizures."],
 [0,'S',"For the surgery, electrodes (thin sensors) were placed on the surface of each patient's brain."],
 [1,'D',"The patients listened to a piece of music."],
 [3.5,'D',"The electrodes recorded activity in the brain's hearing area."],
 [7,'D',"A computer program learned to turn those recordings back into sound."],
 [11,'R',"The rebuilt sound came close enough to recognise the music."],
 [13,'W',"The brain's hearing area holds enough detail to rebuild music from it."],
 [14,'N',"A small, special group: patients in surgery. The recordings were made from 2008 to 2015 and studied again later."]],
19:[[0,'Q',"When you listen to a story, does your brain guess what's coming next? And how far ahead?"],
 [0,'S',"In 2023 researchers scanned the brains of 304 people with fMRI while they listened to short stories. fMRI = a scanner that shows which brain areas are working hardest."],
 [4,'D',"Some brain areas guessed only what was coming very soon: the next sound."],
 [7,'D',"Other areas guessed much further ahead."],
 [10,'R',"The guesses were stacked like a ladder, from short-range to long-range."],
 [12.5,'W',"Listening is predicting, at several distances at once. It backs the guess-and-check idea seen on the Seeing walk."]],
20:[[0,'Q',"Your footsteps make sounds you expect. What does the brain do when a sound doesn't match your movement?"],
 [0,'S',"In 2025 researchers studied the hearing area of mice's brains as the mice moved. In this scene, each step makes a click."],
 [1,'D',"The mouse runs, and the clicks match its steps."],
 [5,'D',"Then a click comes out of step."],
 [6,'R',"The mouse's hearing area reacts strongly: a 'that doesn't match' signal."],
 [10,'R',"Surprises from the eyes, a sight that doesn't match the movement, fed into the same signal."],
 [12.5,'W',"The hearing brain checks sounds against what your body is doing, and the eyes join in the same check."]]
};
Object.keys(STORY).forEach(n=>{if(D[n])D[n].story=STORY[n]});
window.DEMOS=D;})();
