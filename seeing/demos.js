/* Seeing: 20 experiment demos. Each shows only what the study's summary says. */
(function(){const G=window.Demo.G,P=G.P,A=P.a,B=P.b,HI=P.hi,WH='#ffffff';
const D={};
// 1 Weber: two points on skin, when do two feel like one
D[1]={dur:16,hint:'Tap to bring the points closer',hintAt:9,init:s=>s.gap=null,
 caps:[[0,'Two pin points touch the skin at once.'],[4,'Far apart, you feel two separate touches.'],[8.5,'Move them closer… at some point the two feel like one.'],[12.5,'Weber measured that exact distance. Feeling could be put in numbers.']],
 tap:(s,t)=>{s.gap=Math.max(8,(s.gap??G.lerp(220,14,G.ramp(t,5,12)))-30)},
 draw(g,t,s){const c=g.c;const gap=s.gap??G.lerp(220,14,G.ramp(t,5,12));
  c.fillStyle=G.rgba(HI,.10);c.beginPath();c.ellipse(400,330,330,70,0,0,7);c.fill();G.text('skin',110,330,{size:13,al:.5});
  const x1=400-gap/2,x2=400+gap/2,down=G.win(t%3,0.3,2.4,.3);
  for(const x of[x1,x2]){G.line(x,120,x,300-20*(1-down),HI,4,.9);G.glow(x,300,30,A,.6*down)}
  const two=gap>40;G.text(two?'feels like: two touches':'feels like: one touch',400,90,{serif:1,size:34,col:two?HI:A});
  G.line(x1,410,x2,410,A,2,.8);G.text(Math.round(gap/8)+' mm apart',400,438,{size:14,al:.8});
  if(!two)G.glow(400,300,60,A,.35*down)}};
// 2 Helmholtz: picture built from signals
D[2]={dur:17,caps:[[0,'Light from a scene enters the eye.'],[4.5,'The eye turns it into scattered signals, not a finished photo.'],[9,'The brain works out the picture from those signals, without you noticing.'],[13.5,'Helmholtz called this unconscious inference.']],
 draw(g,t){const c=g.c,r=G.rnd(7);
  // scene: a simple tree of light points
  const sc=[];for(let i=0;i<40;i++)sc.push([90+r()*120,150+r()*200]);
  sc.forEach(p=>G.dot(p[0],p[1],3,HI,.8));G.text('scene',150,390,{size:13,al:.6});
  G.ring(330,250,48,HI,3,.8);G.dot(368,250,9,'#000',1);G.ring(368,250,9,A,2,.9);G.text('eye',330,320,{size:13,al:.6});
  const k=G.ramp(t,1,4);sc.forEach((p,i)=>{if(i%3)return;G.line(p[0],p[1],G.lerp(p[0],330,k),G.lerp(p[1],250,k),A,1,.25*k)});
  // signals travel
  const sig=G.ramp(t,4.5,9);for(let i=0;i<24;i++){const y=210+r()*80,ph=(t*1.5+r())%1;if(sig>0)G.dot(G.lerp(380,560,ph),y+Math.sin(ph*6+i)*6,3,A,sig*.9)}
  G.text('signals',470,180,{size:13,al:.6*sig});
  // brain builds picture
  const b=G.ramp(t,9,13);c.fillStyle=G.rgba(B,.25);c.beginPath();c.ellipse(660,250,95,80,0,0,7);c.fill();
  sc.forEach((p,i)=>{const x=600+(p[0]-90)*.5,y=200+(p[1]-150)*.5;G.dot(x,y,2.5,HI,b*(i/40<b?1:0))});
  G.text('picture, worked out',660,355,{size:13,al:.7*b});
  if(t>13.5)G.text('“unconscious inference”',400,450,{serif:1,size:32,col:A,al:G.ramp(t,13.5,15)})}};
// 3 Wertheimer: two flashes, seen motion
D[3]={dur:18,hint:'Tap to flash the lights yourself',hintAt:10,init:s=>s.tapAt=-9,
 caps:[[0,'Two lights, side by side. Neither one moves.'],[4,'Flash the left one, then the right one, quickly.'],[8.5,'People see one light jump across the gap.'],[13,'That movement exists only in the mind.']],
 tap:(s,t)=>{s.tapAt=t},
 draw(g,t,s){const auto=t>4,T=(t-s.tapAt<1.2)?(t-s.tapAt):(auto?(t-4)%1.2:9);
  const L=T<.35,R=T>.45&&T<.8;
  for(const[x,on]of[[260,L],[540,R]]){G.ring(x,230,26,HI,2,.4);if(on){G.dot(x,230,22,HI,1);G.glow(x,230,90,A,.8)}}
  if(t>8.5&&T>.3&&T<.55){const k=(T-.3)/.25;G.glow(G.lerp(260,540,k),230,40,A,.35);G.dot(G.lerp(260,540,k),230,10,A,.5)}
  if(t>8.5){G.arrow(300,320,500,320,A,2,G.ramp(t,8.5,9.5));G.text('what people see',400,350,{size:14,al:G.ramp(t,8.5,9.5)})}
  G.text('light A',260,290,{size:13,al:.6});G.text('light B',540,290,{size:13,al:.6})}};
// 4 Hartline: on, off, on-off fibres
D[4]={dur:20,hint:'Tap to switch the light',hintAt:12,init:s=>{s.ev=[[1,1],[4,0],[7,1],[10,0]];s.sp={on:[],off:[],both:[]};s.last=0},
 caps:[[0,'One nerve fibre from the eye, listened to on its own.'],[4,'Some fibres fire a burst when the light turns on…'],[7.5,'…others when it turns off, and some fire for both.'],[12,'Vision travels as coded bursts, not a picture. Try the switch.']],
 tap:(s,t)=>{const on=s.ev.filter(e=>e[0]<=t).pop();s.ev.push([t,on&&on[1]?0:1]);s.ev.sort((a,b)=>a[0]-b[0])},
 draw(g,t,s){const evs=s.ev.filter(e=>e[0]<=t),on=evs.length?evs[evs.length-1][1]:0;
  // generate spikes for events newly passed
  for(const e of evs){if(e.done)continue;e.done=1;for(let i=0;i<7;i++){const d=e[0]+.05+i*.07+i*i*.01;(e[1]?s.sp.on:s.sp.off).push(d);s.sp.both.push(d+.01)}}
  G.dot(150,150,34,on?HI:'#444444',on?1:.6);if(on)G.glow(150,150,120,A,.7);G.text(on?'light ON':'light OFF',150,210,{size:14});
  G.trace(320,140,420,s.sp.on,t,4,A,'“on” fibre');G.trace(320,260,420,s.sp.off,t,4,A,'“off” fibre');G.trace(320,380,420,s.sp.both,t,4,A,'“on-off”');
  G.text('now',740,420,{size:12,al:.5})}};
// 5 Hubel & Wiesel 1959: cell tuned to one angle
D[5]={dur:18,hint:'Tap to turn the line',hintAt:11,init:s=>{s.ang=null;s.sp=[];s.nx=0},
 caps:[[0,'A cat watches a bar of light on a screen.'],[4,'The bar slowly turns. One brain cell is being recorded.'],[8,'The cell fires only when the line sits at one exact tilt.'],[13,'The brain builds shapes out of pieces like this.']],
 tap:(s,t)=>{s.ang=((s.ang??(t*20))+22)%180},
 draw(g,t,s){const c=g.c,ang=s.ang??(t>3?((t-3)*22)%180:0),pref=45,d=Math.abs(((ang-pref+90)%180)-90),rate=Math.exp(-(d*d)/(2*12*12));
  c.save();c.translate(230,240);c.rotate(-ang*Math.PI/180);G.rr(-90,-9,180,18,9,HI,null,.95);c.restore();G.glow(230,240,120,A,.15+.4*rate);
  G.ring(230,240,130,HI,1.5,.25);G.text('screen',230,395,{size:13,al:.6});
  if(t>=s.nx){s.nx=t+.05;if(Math.random()<rate*.9)s.sp.push(t)}
  G.trace(440,250,320,s.sp,t,3,A,'');G.text('brain cell',600,180,{size:14,al:.8});
  G.text(rate>.5?'firing!':'quiet',600,320,{serif:1,size:30,col:rate>.5?A:HI,al:.9});G.text(Math.round(ang)+'°',230,90,{size:14,al:.7})}};
// 6 1962: two eyes combine
D[6]={dur:15,caps:[[0,'Each eye sends its own signals into the brain.'],[5,'Hubel and Wiesel mapped where the two streams come together.'],[10,'Some cells listen to both eyes at once.']],
 draw(g,t){const k=G.ramp(t,1,5),m=G.ramp(t,5,9);
  for(const[y,l]of[[150,'left eye'],[350,'right eye']]){G.ring(120,y,34,HI,3,.8);G.dot(140,y,10,A,.9);G.text(l,120,y+56,{size:13,al:.6})}
  for(let i=0;i<6;i++){const ph=((t*.8+i/6)%1);for(const y of[150,350]){G.dot(G.lerp(170,560,ph*k),G.lerp(y,250,ph*m),5,y<250?HI:A,.9*k)}}
  G.dot(600,250,26,A,.4+.6*m);G.glow(600,250,90,A,.6*G.win(t,9,15));G.text('cell that hears both eyes',620,310,{size:14,al:m})}};
// 7 1968: columns
D[7]={dur:16,caps:[[0,'Look down on the seeing part of a monkey brain.'],[5,'It is stacked in columns, each sorted by line angle.'],[10,'Stripes show which eye is in charge in each patch.']],
 draw(g,t){const c=g.c,k=G.ramp(t,4,8),e=G.ramp(t,9,12);
  for(let i=0;i<14;i++)for(let j=0;j<7;j++){const x=110+i*42,y=110+j*42,ang=(i*30+j*12)%180;
   if(e>0){G.rr(x-20,y-20,40,40,4,(Math.floor(i/2)%2)?A:B,null,.25*e)}
   c.save();c.translate(x,y);c.rotate(ang*Math.PI/180*k);G.line(-13,0,13,0,HI,3,.35+.5*k);c.restore()}
  if(e>0){G.rr(250,420,16,16,3,A,null,e);G.text('left eye',300,428,{size:13,al:e});G.rr(400,420,16,16,3,B,null,e);G.text('right eye',455,428,{size:13,al:e})}}};
// 8 Treisman & Gelade: pop-out vs one-by-one
D[8]={dur:22,caps:[[0,'Find the odd one out: one item has a different colour.'],[4.5,'It pops out at once. Colour alone is easy.'],[9,'Now the odd one differs only in its mix of colour and shape.'],[14,'Attention has to check items one at a time to glue the features together.']],
 draw(g,t){const r=G.rnd(3),items=[];for(let i=0;i<24;i++)items.push([120+(i%8)*80+r()*20,140+Math.floor(i/8)*100+r()*20]);
  const phase2=t>=9;
  items.forEach((p,i)=>{let col,sq;
   if(!phase2){col=i===13?A:'#7f9bd1';sq=false}else{col=i%2?A:'#7f9bd1';sq=i%2?false:true;if(i===17){col=A;sq=true}}
   if(sq)G.rr(p[0]-15,p[1]-15,30,30,4,col,null,.95);else G.dot(p[0],p[1],16,col,.95)});
  if(!phase2&&t>4.5)G.ring(items[13][0],items[13][1],30,HI,3,G.ramp(t,4.5,5.2));
  if(phase2){const k=Math.min(17,Math.floor((t-10)*3));if(t>10){const p=items[Math.max(0,k)];G.ring(p[0],p[1],30,HI,3,.9);G.glow(p[0],p[1],60,HI,.15)}
   G.text(t>10?'checking item '+(Math.max(0,k)+1)+'…':'',400,470,{size:14,al:.8})}
  else G.text(t>4.5?'found instantly':'',400,470,{size:14,al:.8})}};
// 9 Face patch
D[9]={dur:18,caps:[[0,'People in a brain scanner look at pictures, one after another.'],[4,'Houses, hands, objects… and faces.'],[9,'One small patch lights up much more for faces.'],[14,'Your brain has a special place for faces.']],
 draw(g,t){const c=g.c,seq=['house','hand','face','object','face','house','face'],i=Math.floor(Math.max(0,t-2)/2)%seq.length,it=t<2?'':seq[i],face=it==='face';
  G.rr(90,140,220,220,18,'#000000',HI,.35,1.5);
  if(it==='face'){G.ring(200,250,70,HI,3,.9);G.dot(175,232,6,HI);G.dot(225,232,6,HI);c.strokeStyle=HI;c.lineWidth=3;c.beginPath();c.arc(200,262,28,.2*Math.PI,.8*Math.PI);c.stroke()}
  if(it==='house'){G.path([[140,300],[140,230],[200,180],[260,230],[260,300],[140,300]],HI,3,.9)}
  if(it==='hand'){for(let f=0;f<4;f++)G.rr(150+f*26,190,18,70,9,null,HI,.9,3);G.rr(150,250,100,60,16,null,HI,.9,3)}
  if(it==='object'){G.rr(160,200,80,100,10,null,HI,.9,3);G.line(240,230,265,230,HI,3)}
  G.text(it,200,390,{size:14,al:.6});
  c.fillStyle=G.rgba(B,.22);c.beginPath();c.ellipse(560,250,150,110,0,0,7);c.fill();G.text('brain',560,120,{size:13,al:.6});
  const lv=face?1:.18;G.glow(600,290,60*lv+20,A,.3+.7*lv);G.dot(600,290,12,A,.5+.5*lv);G.text('face patch',600,340,{size:13,al:.8});
  G.rr(720,160,22,200,6,null,HI,.4,1.5);G.rr(722,360-198*lv,18,198*lv,5,A,null,.9)}};
// 10 Rao & Ballard: predict, pass errors
D[10]={dur:20,caps:[[0,'The brain guesses what the eyes are about to see.'],[5,'It compares the guess with what really arrives.'],[10,'Only the mismatch gets passed on: the mistake.'],[15,'Seeing becomes guessing and correcting.']],
 draw(g,t){const real=[1,1,0,1,0,0,1,1,0,1],guess=[1,1,0,1,1,0,1,0,0,1];const gk=G.ramp(t,1,4),rk=G.ramp(t,5,8),ek=G.ramp(t,10,13);
  G.text('the guess',120,130,{size:14,align:'left',al:gk});G.text('what arrives',120,300,{size:14,align:'left',al:rk});
  for(let i=0;i<10;i++){const x=270+i*48;G.rr(x-17,112,34,34,6,guess[i]?A:null,A,gk*(guess[i]?.9:.4));G.rr(x-17,282,34,34,6,real[i]?HI:null,HI,rk*(real[i]?.9:.4));
   if(real[i]!==guess[i]&&ek>0){G.ring(x,215,22,A,3,ek);const up=((t-10)*.8)%1;G.arrow(x,250,x,G.lerp(250,170,up),A,3,ek);G.glow(x,215,50,A,.4*ek)}}
  if(ek>0)G.text('only these two differences are sent on',530,430,{size:14,al:ek})}};
// 11 Muckli: hidden part filled in
D[11]={dur:18,caps:[[0,'People look at a scene with one corner covered up.'],[5,'The eye sends nothing from the covered part.'],[10,'Yet the early seeing area still gets the scene\'s context there, sent down from higher up.']],
 draw(g,t){const k=G.ramp(t,1,4),f=G.ramp(t,10,14);
  for(let i=0;i<8;i++)for(let j=0;j<6;j++){const x=80+i*36,y=140+j*36,cov=i>=4&&j<3;G.rr(x,y,32,32,4,cov?'#000000':((i+j)%2?A:B),null,k*(cov?1:.7))}
  G.text('scene, top right covered',224,390,{size:13,al:.6});
  for(let i=0;i<8;i++)for(let j=0;j<6;j++){const x=480+i*30,y=150+j*30,cov=i>=4&&j<3;const al=cov?.06+.6*f:.7*G.ramp(t,3,6);G.rr(x,y,26,26,4,cov?HI:A,null,al)}
  G.text('early seeing area',600,350,{size:13,al:.6});if(f>0){G.arrow(660,110,660,140,HI,3,f);G.text('context from higher up',660,95,{size:13,al:f})}}};
// 12 Rubber hand: vision + touch + position sum to "mine"
D[12]={dur:18,caps:[[0,'Your real hand is hidden. A rubber hand sits in view.'],[5,'You see the fake hand touched, you feel touch, you sense where your arm is.'],[10.5,'Add those three up, and the brain\'s best guess can be: that hand is mine.']],
 draw(g,t){const k=G.ramp(t,5,9),m=G.ramp(t,10.5,15);
  const hand=(x,y,al)=>{for(let f=0;f<4;f++)G.rr(x+f*22,y-60,16,60,8,null,HI,al,3);G.rr(x,y-6,92,50,14,null,HI,al,3)};
  hand(150,280,.95);G.text('rubber hand',196,350,{size:13,al:.7});G.rr(320,210,22,150,4,'#000000',HI,.6,1);hand(390,280,.3);G.text('real hand, hidden',436,350,{size:13,al:.6});
  const brush=Math.sin(t*3)*20;G.line(210+brush,150,196+brush,220,A,6,k);G.line(450+brush,150,436+brush,220,A,6,k*.5);
  [['see',600,150],['feel',600,230],['position',600,310]].forEach(([l,x,y],i)=>{const a=G.ramp(t,5+i,6+i);G.rr(x-60,y-18,120,36,18,null,A,a);G.text(l,x,y,{size:14,al:a})});
  G.text('“mine”',720,230,{serif:1,size:38,col:A,al:m});if(m>0){G.arrow(662,230,690,230,A,3,m);G.glow(196,260,110,A,.35*m)}}};
// 13 Kilteni: many senses build ownership
D[13]={dur:15,caps:[[0,'Fake hands and even whole fake bodies became tools for science.'],[5,'Each test shows a different sense feeding the feeling of owning a body.'],[10,'Owning your body is built from many senses at once.']],
 draw(g,t){const c=g.c,k=G.ramp(t,5,10);
  c.strokeStyle=G.rgba(HI,.85);c.lineWidth=3;G.ring(400,150,34,HI,3,.85);G.path([[400,184],[400,320]],HI,3,.85);G.path([[340,230],[460,230]],HI,3,.85);G.path([[400,320],[360,420]],HI,3,.85);G.path([[400,320],[440,420]],HI,3,.85);
  G.glow(400,260,180,A,.45*G.ramp(t,9,13));
  ['seeing','touch','body position','balance','inner body'].forEach((l,i)=>{const a=-Math.PI*.9+i*Math.PI*.45,x=400+260*Math.cos(a),y=260+190*Math.sin(a)*.9;const al=G.ramp(t,4+i,5+i);G.text(l,x,y,{size:14,al});G.arrow(x+(400-x)*.25,y+(260-y)*.25,x+(400-x)*.55,y+(260-y)*.55,A,2,al*.8)})}};
// 14 Mice in a virtual corridor
D[14]={dur:22,init:s=>{s.sp=[];s.nx=0},caps:[[0,'A mouse runs along a virtual corridor with a pattern at one spot.'],[6,'Its seeing cells learn what should appear there.'],[12,'Now the pattern is taken away.'],[15,'At that spot, the cells fire hard: something expected is missing.']],
 draw(g,t,s){const c=g.c,lap=t<12?0:1,pos=((t*0.25)%1);
  for(let i=0;i<10;i++){const x=60+i*70;G.rr(x,170,64,120,6,null,HI,.25,1.5)}
  const spotX=60+6*70;if(!lap)for(let k=0;k<5;k++)G.line(spotX+8+k*12,180,spotX+8+k*12,280,A,5,.85);else G.rr(spotX,170,64,120,6,null,A,.6,2);
  const mx=60+pos*700;G.dot(mx,330,12,HI);G.text('mouse',mx,360,{size:12,al:.6});
  const atSpot=Math.abs(mx-(spotX+32))<35;if(t>=s.nx){s.nx=t+.05;if(Math.random()<(atSpot?(lap?.95:.35*G.ramp(t,6,10)):.04))s.sp.push(t)}
  G.trace(160,450,560,s.sp,t,4,A,'seeing cell');if(lap&&atSpot)G.text('expected, but missing!',400,120,{serif:1,size:30,col:A})}};
// 15 Heartbeat vs breath (what they found)
D[15]={dur:16,caps:[[0,'People were tested on sensing their heartbeat and their breathing.'],[5,'Three things were scored: how well they did, how well they thought they did, and how aware they were.'],[11,'For one person these can differ, and heart can differ from breath.']],
 draw(g,t){const k=G.ramp(t,5,9),beat=Math.max(0,Math.sin(t*7))**8,br=.5+.5*Math.sin(t*1.4);
  G.glow(200,180,40+30*beat,B,.8);G.text('heartbeat',200,250,{size:13,al:.7});G.ring(600,180,40+18*br,HI,3,.7);G.text('breathing',600,250,{size:13,al:.7});
  const H1=[.8,.5,.65],B1=[.35,.7,.45],L=['how well','how well they think','how aware'];
  for(let i=0;i<3;i++){const x=120+i*55,h=110*H1[i]*k;G.rr(x,430-h,38,h,6,A,null,.9);const x2=520+i*55,h2=110*B1[i]*k;G.rr(x2,430-h2,38,h2,6,HI,null,.8)}
  if(k>0)L.forEach((l,i)=>G.text(l,400,320+i*22,{size:12,al:k*.7}));
  G.text('illustration only, not real scores',400,470,{size:11,al:.45*k})}};
// 16 Tsakiris: self from outside and inside signals
D[16]={dur:15,caps:[[0,'Signals from outside the body: what you see, hear and feel.'],[5,'Signals from inside: heartbeat, breathing, gut.'],[10,'Tsakiris argued the self is built from both, as a kind of prediction.']],
 draw(g,t){const o=G.ramp(t,.5,4),i2=G.ramp(t,5,8.5),s=G.ramp(t,10,13);
  for(let i=0;i<8;i++){const a=i/8*7+t*.2,x=400+240*Math.cos(a),y=250+170*Math.sin(a);G.dot(x,y,6,HI,o);G.arrow(x,y,G.lerp(x,400,.4),G.lerp(y,250,.4),HI,2,o*.6)}
  for(let i=0;i<5;i++){const a=i/5*7-t*.4,x=400+70*Math.cos(a),y=250+55*Math.sin(a);G.dot(x,y,6,A,i2)}
  G.ring(400,250,120,A,3,s);G.glow(400,250,150,A,.35*s);G.text('self',400,250,{serif:1,size:40,col:'#ffffff',al:s})}};
// 17 Attention and heartbeat response (title only)
D[17]={dur:15,caps:[[0,'Every heartbeat sends a small echo into the brain.'],[5,'When attention moves to the heart, that echo changes.'],[10,'Where you put your attention changes how your brain hears your own heart.']],
 draw(g,t){const att=G.ramp(t,5,7),beat=(t%1)<.12;
  G.glow(200,260,beat?70:40,B,.9);G.text('heart',200,330,{size:13,al:.7});
  const amp=20+30*att,pts=[];for(let x=0;x<380;x+=4){const ph=((t-(380-x)/300)%1+1)%1;pts.push([360+x,250-amp*Math.exp(-((ph-.2)**2)/.004)])}G.path(pts,A,3,.9);
  G.text('brain\'s echo of each beat',550,330,{size:13,al:.7});G.ring(G.lerp(560,200,att),140,24,HI,3,.9);G.text('attention',G.lerp(560,200,att),100,{size:13,al:.8})}};
// 18 Teufel & Fletcher: both ways
D[18]={dur:14,caps:[[0,'It was often drawn as orders flowing down from "smart" brain areas.'],[5,'But predictions also travel up, from the senses.'],[9.5,'Guesses go both ways.']],
 draw(g,t){const u=G.ramp(t,5,7);['higher areas','middle','senses'].forEach((l,i)=>{G.rr(250,90+i*130,300,60,14,null,HI,.6,2);G.text(l,400,120+i*130,{size:14})});
  for(let i=0;i<4;i++){const ph=((t*.6+i/4)%1);G.dot(330,G.lerp(150,350,ph),6,HI,.9);if(u>0)G.dot(470,G.lerp(350,150,ph),6,A,u)}
  G.text('down',300,250,{size:13,al:.7,align:'right'});G.text('up',500,250,{size:13,al:u,align:'left',col:A})}};
// 19 Four theories
D[19]={dur:15,caps:[[0,'Four big ideas about what consciousness is.'],[5,'Each predicts something different about the brain.'],[10,'The review asks which experiments could finally tell them apart.']],
 draw(g,t){const k=G.ramp(t,5,8),e=G.ramp(t,10,12);['idea 1','idea 2','idea 3','idea 4'].forEach((l,i)=>{const x=130+i*180;G.rr(x-70,140,140,80,16,null,HI,G.ramp(t,i*.6,i*.6+1),2);G.text(l,x,180,{size:15});G.arrow(x,225,x,285,A,2,k);G.dot(x,310,10+i*4,A,k)});
  if(e>0){G.rr(160,370,480,60,16,null,A,e,2);G.text('the experiment that would tell them apart',400,400,{size:15,al:e})}}};
// 20 Interoception map
D[20]={dur:15,caps:[[0,'Signals leave the heart, lungs and gut.'],[5,'They travel along nerves up to the brain.'],[10,'The idea: map these paths first. It is a plan, not a test yet.']],
 draw(g,t){const k=G.ramp(t,5,10),c=g.c;c.fillStyle=G.rgba(B,.3);c.beginPath();c.ellipse(400,90,90,55,0,0,7);c.fill();G.text('brain',400,90,{size:14});
  [['heart',300,300],['lungs',400,230],['gut',500,380]].forEach(([l,x,y],i)=>{G.glow(x,y,40,A,.6+.3*Math.sin(t*3+i));G.text(l,x,y+40,{size:13,al:.8});
   G.line(x,y-20,400,150,HI,2,.25+.5*k,[6,6]);const ph=((t*.5+i/3)%1);if(k>0)G.dot(G.lerp(x,400,ph),G.lerp(y-20,150,ph),5,A,k)});
  if(t>10)G.text('a plan, not a test',620,450,{serif:1,size:28,col:A,al:G.ramp(t,10,11)})}};
window.DEMOS=D;})();
