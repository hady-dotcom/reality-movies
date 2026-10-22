/* Seeing: 20 experiment demos, v2. Painted scenes in demos/img. Only facts from each study's Pixel Hound record. */
(function(){const G=window.Demo.G,P=G.P,lerp=G.lerp,ramp=(t,a,b)=>G.ramp(t,a,b);const D={};
// 1 Weber: two points feel like one
const w1gap=(t,s)=>s.gap??lerp(170,12,ramp(t,3.5,11));
D[1]={dur:16,pics:['weber'],hint:'Tap to bring the points closer',hintAt:12,rv:11,rvx:300,rvy:150,init:s=>s.gap=null,
 caps:[[0,'Two points touch the skin'],[3.5,'Closer… closer…'],[11,'Now they feel like one']],
 tap:(s,t)=>{s.gap=Math.max(8,w1gap(t,s)-30)},
 draw(g,t,s){const c=g.c;G.pic('weber',0,0,600,800);const gap=w1gap(t,s),hx=328,hy=230,ty=502,down=G.win(t%2.2,.4,1.8,.25),lift=(1-down)*26;
  const tip=[[hx-gap/2,ty-lift],[hx+gap/2,ty-lift]];
  tip.forEach(([x,y])=>{c.strokeStyle=G.lg(hx,hy,x,y,[[0,'#f6d68a'],[.5,'#b8862e'],[1,'#e8c070']]);c.lineWidth=12;c.lineCap='round';c.beginPath();c.moveTo(hx,hy);c.lineTo(x,y-14);c.stroke();G.line(x,y-16,x,y,'#d8d8d8',4)});
  G.ball(hx,hy,18,'#e0b860');G.shadow(hx,ty+10,gap/2+40,10,.35*down);
  const one=gap<40,felt=down;if(!one)tip.forEach(([x])=>{G.bloom(x,ty,50,P.a,.9*felt);G.ring(x,ty,20+30*(1-felt),P.a,3,felt)});else{G.bloom(hx,ty,80,P.a,felt);G.ring(hx,ty,26+30*(1-felt),P.a,4,felt)}
  const sn=one?ramp(t,s.sw||0,(s.sw||0)+.4):1;if(one&&!s.sw)s.sw=t;if(!one)s.sw=0;
  G.big(one?'1':'2',300,150,170,one?P.a:'#ffffff',1,one?G.back(G.clamp((t-(s.sw||t))/.4)):1);
  G.at(hx,ty+60,1);G.line(-gap/2,0,gap/2,0,'#ffffff',3,.7);G.line(-gap/2,-8,-gap/2,8,'#ffffff',3,.7);G.line(gap/2,-8,gap/2,8,'#ffffff',3,.7);G.end()}};
// 3 Movement that isn't there
const L3=[199,470],R3=[405,470];
D[3]={dur:16,pics:['lamps'],hint:'Tap to flash them yourself',hintAt:9,rv:7.5,rvx:300,rvy:380,init:s=>s.tapAt=-9,
 caps:[[0,'Two lamps. Nothing moves.'],[2.5,'Left flashes, then right'],[7.5,'You see one light jump']],tap:(s,t)=>{s.tapAt=t},
 draw(g,t,s){const c=g.c;G.pic('lamps',0,0,600,800);const T=(t-s.tapAt<1.1)?(t-s.tapAt):(t>2.5?(t-2.5)%1.1:9),Lon=T<.3,Ron=T>.42&&T<.72;
  [[L3,Lon],[R3,Ron]].forEach(([p,on])=>{if(on){G.bloom(p[0],p[1],200,'#ffe2a0',.9);G.bloom(p[0],p[1],60,'#ffffff',1);G.ball(p[0],p[1],48,'#fff4d8',.85)}});
  if(t>7.5){const k=ramp(t,7.5,8.5);c.setLineDash([4,14]);c.strokeStyle=G.rgba('#ffffff',.7*k);c.lineWidth=5;c.lineCap='round';c.beginPath();c.moveTo(L3[0],L3[1]-70);c.quadraticCurveTo(302,300,R3[0],R3[1]-70);c.stroke();c.setLineDash([]);
   if(T>.22&&T<.5){const u=(T-.22)/.28,x=lerp(L3[0],R3[0],u),y=(1-u)*(1-u)*(L3[1]-70)+2*u*(1-u)*300+u*u*(R3[1]-70);for(let i=0;i<6;i++){const uu=u-i*.04;if(uu<0)break;const xx=lerp(L3[0],R3[0],uu),yy=(1-uu)*(1-uu)*(L3[1]-70)+2*uu*(1-uu)*300+uu*uu*(R3[1]-70);G.bloom(xx,yy,40-i*5,'#ffe2a0',.5-i*.07)}G.ball(x,y,18,'#fff4d8',.9)}
   G.at(302,180,1);c.globalAlpha=k;c.fillStyle=G.rg(0,0,4,0,0,70,[[0,'#ffe0b0'],[1,'rgba(255,200,140,0)']]);c.beginPath();c.ellipse(0,0,90,52,0,0,7);c.fill();c.globalAlpha=1;G.eye(0,0,46,{look:[0,.5],iris:'#5d86b0'});G.end();
   G.line(302,226,302,280,'#ffffff',2,.3*k,[4,6])}}};
// 4 Hartline: one nerve fibre from a frog's eye
const EV4=[[1,1],[5,0],[9,1],[13,0]];
const spk=(t0,n,dt)=>Array.from({length:n},(_,i)=>t0+.06+i*dt+i*i*.006);
D[4]={dur:17,pics:['frog-lab'],hint:'Tap to switch the light',hintAt:14,init:s=>{s.ev=EV4.map(e=>e.slice())},rv:9,rvx:300,rvy:160,
 caps:[[0,'One nerve fibre from a frog\'s eye'],[1,'Light on: a burst'],[5,'Light off: another fibre fires'],[9,'Some fire for both']],
 tap:(s,t)=>{const on=s.ev.filter(e=>e[0]<=t).pop();s.ev.push([t,on&&on[1]?0:1]);s.ev.sort((a,b)=>a[0]-b[0])},
 draw(g,t,s){const c=g.c;G.pic('frog-lab',0,0,600,800);const ev=s.ev.filter(e=>e[0]<=t),on=ev.length?ev[ev.length-1][1]:0;
  if(!on){c.fillStyle=G.rg(414,420,10,414,420,330,[[0,'rgba(4,8,8,.85)'],[1,'rgba(4,8,8,.35)']]);c.fillRect(0,250,600,550)}else G.bloom(414,383,120,'#ffe2a0',.5);
  const sp={on:[],off:[],both:[]};ev.forEach(e=>{const b=spk(e[0],8,.07);(e[1]?sp.on:sp.off).push(...b);sp.both.push(...b.map(x=>x+.01))});
  const rows=[['on',sp.on,1],['off',sp.off,0],['both',sp.both,2]];let hot=0;
  rows.forEach(([k,arr,ic],i)=>{const y=26+i*92;G.scope(110,y,470,80,arr,t,3.5,P.a);const last=arr.filter(x=>x<=t).pop()||-9;hot=Math.max(hot,Math.exp(-(t-last)*6));
   if(ic===2){G.bulb(42,y+48,.32,1);G.bulb(80,y+48,.32,0)}else G.bulb(60,y+48,.4,ic)});
  G.path([[236,398],[300,450],[380,520],[440,560]],P.a,3,.3+.7*hot);G.bloom(229,406,40,P.a,.4+.6*hot);G.bloom(462,566,50,'#ffd070',.2+.7*hot)}};
// 7 Columns
D[7]={dur:16,pics:['nebula','monkey'],rv:10.5,rvx:300,rvy:380,caps:[[0,'The seeing part of a monkey brain'],[5,'Columns sorted by line angle'],[10,'Stripes: left eye, right eye']],
 draw(g,t){const c=g.c;G.pic('nebula',0,0,600,800,.8);const z=ramp(t,1.5,5),f=ramp(t,4.4,6);
  if(f<1){c.globalAlpha=1-f;const sc=lerp(1,1.6,z);c.save();c.translate(115,255);c.scale(sc,sc);c.translate(-115,-255);G.pic("monkey",0,0,600,800);G.bloom(130,298,70,P.a,.5+.35*Math.sin(t*4));G.ring(130,298,24+10*Math.sin(t*3),P.a,3,.8);c.restore();c.globalAlpha=1}
  if(f>0){const e=ramp(t,10,12);c.globalAlpha=f;for(let i=0;i<9;i++)for(let j=0;j<11;j++){const x=48+i*63,y=60+j*52,ang=(i*22+j*4)%180,col=Math.floor(i/1.5)%2?'#ff6f61':P.a;
    G.rr(x-28,y-23,56,46,10,G.lg(x,y-23,x,y+23,[[0,G.rgba(G.mix('#3a2418',col,.35*e),.95)],[1,G.rgba(G.mix('#1a100a',col,.25*e),.95)]]),'#ffffff',.08);
    G.at(x,y,1,ang*Math.PI/180*ramp(t,5,8));c.shadowColor=P.hi;c.shadowBlur=8;G.line(-17,0,17,0,'#fff2d0',5,.9);c.shadowBlur=0;G.end()}c.globalAlpha=1;
   if(e>0){[[160,'#ffb347'],[440,'#ff6f61']].forEach(([x,col])=>{G.at(x,700,1);c.fillStyle=G.rg(0,0,6,0,0,90,[[0,'#d9a88a'],[1,'rgba(120,70,50,0)']]);c.beginPath();c.ellipse(0,0,100,56,0,0,7);c.fill();G.end();G.eye(x,700,44,{iris:'#6b4a2e',glow:.6*e,glowCol:col});G.bloom(x,700,90,col,.5*e)})}}}};
// 8 Attention glues features
const it8=(()=>{const q=G.rnd(4),a=[];for(let i=0;i<24;i++)a.push([280+(i%6)*44+q()*10,280+Math.floor(i/6)*48+q()*8]);return a})();
D[8]={dur:20,pics:['screen-person'],rv:16.5,rvx:300,rvy:150,caps:[[0,'Find the odd one out'],[2,'Colour alone: found at once'],[8,'A mix of features…'],[11,'…checked one by one']],
 draw(g,t){const c=g.c;G.pic('screen-person',0,0,600,800);c.save();G.rr(260,260,292,224,4);c.clip();c.fillStyle='#14161c';c.fillRect(258,258,296,230);
  const p2=t>=7.5,blue='#5f8ad8';it8.forEach((p,i)=>{let col,sq;if(!p2){col=i===13?P.a:blue;sq=false}else{col=i%2?P.a:blue;sq=i%2===1;if(i===18){col=P.a;sq=false}}if(t<.6)return;
   if(sq)G.rr(p[0]-13,p[1]-13,26,26,5,col);else G.ball(p[0],p[1],14,col)});
  let spot=null;if(!p2&&t>1.6)spot=it8[13];if(p2&&t>8.5){const k=Math.min(18,Math.floor((t-8.5)*2.6));spot=it8[k]}
  if(spot){G.ring(spot[0],spot[1],24,'#ffffff',4,.95);G.bloom(spot[0],spot[1],50,'#ffffff',.35)}c.restore();
  if(spot){G.line(240,330,spot[0],spot[1],'#ffffff',2,.25,[4,8])}
  // two timers: pop-out vs one-by-one
  const T1=Math.min(1.2,Math.max(0,t-1)),T2=p2?Math.min(8,Math.max(0,t-8)):0;
  [[150,T1,0],[450,T2,1]].forEach(([x,v,k])=>{G.glass(x-90,26,180,200,22);if(k){G.rr(x-36,58,24,24,5,P.a);G.ball(x+24,70,12,P.a)}else G.ball(x,70,14,P.a);
   const h=Math.min(1,v/8)*110;G.rr(x-26,206-h,52,h,12,G.lg(0,206,0,96,[[0,P.b],[1,P.a]]));if(h>2)G.bloom(x,206-h,40,P.a,.5);G.text(v.toFixed(1)+' s',x,104,{size:22,col:'#ffffff',al:.0})})
  if(t>16.5){const k=ramp(t,16.5,17.2);G.ring(450,150,70+8*Math.sin(t*5),P.a,5,k)}}};
// 11 Filling in a hidden corner
D[11]={dur:17,pics:['street'],rv:12.5,rvx:440,rvy:510,caps:[[0,'A scene, one corner hidden'],[4,'The eye sends the rest'],[9,'The brain fills the corner in']],
 draw(g,t){const c=g.c;G.pic('street',30,40,540,405);c.save();c.beginPath();c.rect(300,40,270,202);c.clip();c.fillStyle='rgba(18,14,22,.93)';c.fillRect(300,40,270,202);for(let i=-10;i<30;i++)G.line(300+i*18,40,300+i*18+202,242,'#ffffff',2,.06);c.restore();G.line(300,40,300,242,P.a,2,.6);G.line(300,242,570,242,P.a,2,.6);G.text('?',435,141,{serif:1,size:90,col:'#ffffff',al:.55,glow:P.a});G.rr(30,40,540,405,18,null,'#ffffff',.3,2);
  G.brain(150,640,.8,{spots:[[130,-20,60,.6*ramp(t,4,6),P.a],[-60,-80,70,.8*ramp(t,9,10.5),'#ffffff']]});
  const MX=330,MY=490,MW=240,MH=180;G.glass(MX-6,MY-6,MW+12,MH+12,16);const k=ramp(t,4,8);c.save();G.rr(MX,MY,MW,MH,12);c.clip();G.pic('street',MX,MY,MW,MH,k*.9);c.fillStyle='rgba(18,14,22,.93)';c.fillRect(MX+MW/2,MY,MW/2,MH/2);
  const f=ramp(t,9,13);if(f>0){c.globalAlpha=f*.75;c.filter='blur(3px)';c.drawImage(G.c.canvas,0,0,1,1,0,0,0,0);c.filter='none';G.pic('street',MX,MY,MW,MH,0);c.save();c.beginPath();c.rect(MX+MW/2,MY,MW/2,MH/2);c.clip();G.pic('street',MX,MY,MW,MH,f*.55);c.restore();c.globalAlpha=1;G.bloom(MX+MW*.75,MY+MH*.25,90,P.a,.6*f)}c.restore();
  if(k>0&&t<9){G.stream([[170,445],[260,470],[MX+40,MY+60]],t,6,P.a,5,k,.5)}
  if(f>0){G.curveArrow(110,560,200,470,MX+MW*.7,MY+20,'#ffffff',5,.8*Math.min(1,f*3));G.stream([[110,570],[220,460],[MX+MW*.75,MY+40]],t,5,'#ffffff',4,f,.6)}}};
// 12 Rubber hand
D[12]={dur:18,pics:['rubber-hand'],rv:10.5,rvx:156,rvy:400,caps:[[0,'Real hand hidden, fake in view'],[3,'Both brushed together'],[10,'The fake hand feels mine']],
 draw(g,t){const c=g.c;G.pic('rubber-hand',0,0,600,800);c.fillStyle=G.lg(320,0,600,0,[[0,'rgba(0,0,0,.55)'],[1,'rgba(0,0,0,.7)']]);c.fillRect(320,0,280,800);
  G.at(156,80,1);c.fillStyle=G.rg(0,0,6,0,0,90,[[0,'#d9a88a'],[1,'rgba(120,70,50,0)']]);c.beginPath();c.ellipse(0,0,100,56,0,0,7);c.fill();G.end();G.eye(156,80,44,{look:[0,.7],iris:'#5d86b0'});
  c.fillStyle=G.rgba('#fff0c8',.07);c.beginPath();c.moveTo(130,110);c.lineTo(182,110);c.lineTo(260,360);c.lineTo(60,360);c.fill();
  const on=ramp(t,3,3.6),y=Math.sin((t-3)*3.2)*40;if(on>0){G.brush(196,320+y,1.1,-.35);G.brush(500,330+y,1.1,-.35);G.bloom(185,330+y,40,P.a,.5*on);G.bloom(490,340+y,40,P.a,.5*on)}
  const m=G.clamp((t-3)/8);G.meter(20,420,26,260,m,P.a);const own=ramp(t,10,12);if(own>0){G.bloom(156,420,230,P.a,.6*own);G.heart(156,190,.0001,0);G.mark(156,560,true,own,1.2)}}};
// 14 Mice expect the view
const rate14=(tt)=>{const ph=tt%4,at=ph>2.2&&ph<2.9;if(tt<12)return at?.2+.2*ramp(tt,3,9):.03;return at?.95:.03};
D[14]={dur:20,pics:['mouse-rig'],rv:14.3,rvx:300,rvy:210,init:s=>{s.sp=[];s.k=0},caps:[[0,'A mouse runs a virtual corridor'],[4,'It learns what comes where'],[12,'The pattern goes missing…'],[14.2,'Cells fire hard']],
 sim(g,t,s){const k=Math.floor(t*30);while(s.k<k){s.k++;const tt=s.k/30;const h=Math.sin(s.k*127.1+311.7)*43758.5;if(h-Math.floor(h)<rate14(tt)*.8)s.sp.push(tt)}},
 draw(g,t,s){const c=g.c;G.pic('mouse-rig',0,0,600,800);const ph=t%4,show=ph>1&&ph<3,miss=t>=12;
  if(show){const k=(ph-1)/2,x=lerp(430,590,k),sz=lerp(30,110,k);c.save();c.beginPath();c.rect(234,109,360,211);c.clip();
   if(!miss){for(let i=0;i<4;i++)for(let j=0;j<4;j++)if((i+j)%2)G.rr(x+i*sz/4,215-sz/2+j*sz/4,sz/4,sz/4,2,'#ffd060',null,.95);G.bloom(x+sz/2,215,sz,P.a,.4)}
   else{G.rr(x,215-sz/2,sz,sz,6,null,'#ffffff',.8,3);c.setLineDash([]);G.big('?',x+sz/2,218,sz*.7,'#ffffff',.9)}c.restore()}
  const last=s.sp.filter(x=>x<=t).pop()||-9,hot=Math.exp(-(t-last)*7);
  G.at(100,120,1);G.rr(-82,-82,164,164,82,'#000000aa','#ffffff',.35,2);c.save();c.beginPath();c.arc(0,0,80,0,7);c.clip();G.neuron(0,0,.85,Math.min(1,hot*(miss?1.3:.5)));c.restore();G.end();G.line(150,170,318,340,'#ffffff',1.5,.3,[5,6]);
  G.scope(30,670,540,100,s.sp,t,4,P.a);if(miss&&ph>2.2&&ph<2.9)G.bloom(300,720,200,P.a,.4)}};
// 15 Heartbeat and breath
const ringv=(x,y,v,col,al)=>{G.ring(x,y,30,'#ffffff',6,.15*al);const c=G.c;c.strokeStyle=G.rgba(col,al);c.lineWidth=7;c.lineCap='round';c.beginPath();c.arc(x,y,30,-1.57,-1.57+6.283*v);c.stroke()};
D[15]={dur:16,pics:['two-people'],rv:5,rvx:180,rvy:390,caps:[[0,'Sense your heartbeat. Your breath.'],[5,'One person: heart strong, breath weak'],[10,'The other: the reverse'],[13.5,'Example people, not real scores']],
 draw(g,t){const c=g.c;G.pic('two-people',0,0,600,800);const beat=Math.pow(Math.max(0,Math.sin(t*7)),10),br=.5+.5*Math.sin(t*1.5);
  const P1=ramp(t,5,6.5),P2=ramp(t,10,11.5);
  [[180,380,148,P1,.9,.25],[449,380,414,P2,.25,.9]].forEach(([x,y,hx,k,hv,bv])=>{const a=.25+.75*k;
   G.bloom(x,y-10,60+80*hv*beat,'#ff4050',(.25+.6*hv)*a);G.heart(x,y-16,.22+.1*hv,beat*hv,'#e83a4a');G.bloom(x,y+40,70+40*bv*br,'#9fd0ff',(.15+.5*bv)*a);
   G.glass(hx-80,40,160,110,22,a);G.heart(hx-36,92,.22,beat,'#e83a4a');ringv(hx-36,92,hv*k,P.a,a);G.lungs(hx+36,96,.25,br);ringv(hx+36,94,bv*k,'#9fd0ff',a)})}};
// 16 A self made of senses
D[16]={dur:15,pics:['anatomy'],rv:10.5,rvx:300,rvy:330,caps:[[0,'Signals from outside: light, sound, touch'],[5,'Signals from inside: heart, breath, gut'],[10,'Together they build your sense of self']],
 draw(g,t){const c=g.c;G.pic('anatomy',0,0,600,800);const o=ramp(t,.5,3),i2=ramp(t,5,7),s=ramp(t,10,12);
  G.bloom(40,40,140,'#fff0b0',.6*o);G.stream([[40,40],[180,140],[290,90]],t,5,'#fff0b0',5,o,.4);G.text('light',70,110,{size:16,al:o});
  for(let k=0;k<3;k++){const kk=((t*.7+k/3)%1);c.strokeStyle=G.rgba(P.a,(1-kk)*o);c.lineWidth=5;c.beginPath();c.arc(600,300,40+kk*200,Math.PI*.8,Math.PI*1.2);c.stroke()}G.text('sound',540,230,{size:16,al:o});
  G.stream([[580,560],[470,520],[400,450]],t,5,'#ffffff',5,o,.4);G.brush(470,520,.8,-1.1);G.text('touch',520,600,{size:16,al:o});
  const beat=Math.pow(Math.max(0,Math.sin(t*6)),8);G.bloom(309,246,60+50*beat,'#ff5060',.8*i2);G.bloom(301,336,70,P.a,.6*i2*(.6+.4*Math.sin(t*2)));G.bloom(260,250,90,'#ff9fb0',.4*i2*(.5+.5*Math.sin(t*1.5)));
  G.text('heart',130,250,{size:16,col:'#ff8090',al:i2});G.line(165,250,290,246,'#ff8090',2,.6*i2);G.text('breath',130,200,{size:16,col:'#ffb0c0',al:i2});G.line(175,200,250,230,'#ffb0c0',2,.6*i2);G.text('gut',130,340,{size:16,col:P.a,al:i2});G.line(150,340,285,336,P.a,2,.6*i2);
  G.stream([[309,246],[300,170],[297,90]],t,4,'#ff8090',4,i2,.6);G.stream([[301,336],[296,200],[297,90]],t,4,P.a,4,i2,.5);
  if(s>0){G.bloom(297,80,120,P.hi,.8*s);for(let k=0;k<3;k++){const kk=((t*.5+k/3)%1);G.ring(300,400,lerp(60,330,kk),P.a,4,(1-kk)*s)}G.text('“me”',300,30+0*s,{serif:1,size:34,al:s})}}};
// 17 Attention hears your heart
D[17]={dur:16,pics:['screen-person'],rv:9,rvx:300,rvy:110,caps:[[0,'Attention on the screen'],[5.5,'Now on the heartbeat'],[9,'The brain\'s echo grows'],[13,'Still being tested']],
 draw(g,t){const c=g.c;G.pic('screen-person',0,0,600,800);const a=ramp(t,5.5,7.5),beat=(t%1);
  // spotlight moves from screen to chest
  const sx=lerp(405,180,a),sy=lerp(370,560,a),sr=lerp(150,90,a);c.fillStyle='rgba(0,0,0,.45)';c.beginPath();c.rect(0,0,600,800);c.arc(sx,sy,sr,0,7,true);c.fill('evenodd');G.ring(sx,sy,sr,'#ffffff',3,.6);
  G.heart(180,560,.25,Math.exp(-beat*8),'#e83a4a');G.bloom(180,560,80,'#ff4050',.3+.5*a*Math.exp(-beat*6));
  G.glass(24,24,552,170,22);const amp=lerp(18,60,ramp(t,7,10));G.wave(40,120,520,(u)=>{const tt=t-(1-u)*2.2,p=((tt%1)+1)%1;return -amp*Math.exp(-((p-.3)**2)/.003)},P.a,5,1,16);
  G.brain(520,150,.28,{spots:[[0,0,120,.4+.6*ramp(t,7,10),P.a]]})}};
// 20 Feelings start in the body: a map, still a plan
D[20]={dur:15,pics:['blueprint'],rv:10,rvx:300,rvy:640,caps:[[0,'Heart, lungs and gut send signals'],[4.5,'Researchers plan how to map their paths to the brain'],[10,'A plan, not a test yet']],
 draw(g,t){const c=g.c;G.pic('blueprint',0,0,600,800);const k=ramp(t,4.5,9.5),head=[238,200];
  const org=[[294,362,'#ff5060','heart'],[228,352,'#ff9fb0','lungs'],[322,435,P.a,'gut']];
  org.forEach(([x,y,col,l],i)=>{G.bloom(x,y,55,col,.55+.3*Math.sin(t*3+i));{const lx=x+(i==1?-100:100),a=G.clamp(t-i*.5);G.rr(lx-42,y-15,84,30,15,'rgba(20,10,6,.8)',null,a);G.text(l,lx,y,{size:16,col,al:a})}
   if(k>0){const p=[[x,y],[lerp(x,head[0],.4)+(i-1)*20,lerp(y,head[1],.5)],[head[0],head[1]+30]];const n=k;c.save();c.beginPath();c.rect(0,lerp(800,0,n),600,800);c.clip();G.path(p,col,7,.95,[10,8]);c.restore();G.stream(p,t,2,col,5,k,.5)}});
  G.ring(head[0],head[1],60,P.a,3,.4*k,[6,8]);G.rr(head[0]-90,head[1]-98,180,34,17,'rgba(20,10,6,.8)',null,k);G.text('brain: still to map',head[0],head[1]-81,{size:16,al:k});
  G.stamp('PLAN, NOT A TEST',300,700,10,t,P.a,44)}};
// helper: draw part of a painting through a clipped window
const picIn=(n,x,y,w,h,r=18,al=1)=>{const c=G.c;c.save();c.beginPath();c.roundRect?c.roundRect(x,y,w,h,r):c.rect(x,y,w,h);c.clip();const s=Math.max(w/600,h/800);G.pic(n,x+(w-600*s)/2,y+(h-800*s)/2,600*s,800*s,al);c.restore();G.rr(x,y,w,h,r,null,'#ffffff',.35*al,2)};
// 2 Helmholtz: the scene breaks into signals, the brain rebuilds it
D[2]={dur:16,pics:['landscape'],rv:11,rvx:300,rvy:380,
 caps:[[0,'Light from a whole scene enters the eye'],[3.5,'The eye sends only scattered signals'],[6,'Up to the brain'],[7.5,'The brain works out what made them'],[11,'You see a scene, not the signals']],
 draw(g,t){const c=g.c;const k1=ramp(t,3.5,6),k2=ramp(t,6,7.5),back=ramp(t,7.5,11),ex=300,ey=720,bx=300,by=150;
  const cols=8,rows=10,tw=75,th=80,q=G.rnd(7);c.fillStyle='#05040a';c.fillRect(0,0,600,800);
  const bAl=G.clamp(ramp(t,5,6.5)-ramp(t,11,12.5));if(bAl>0)G.brain(bx,by,.55,{al:bAl,spots:[[0,-20,110,(k2>0?.9:.3)*(1-back*.6),P.a]]});
  for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){const hx=i*tw,hy=j*th,r=q(),r2=q();
   const e=[ex+(r-.5)*140,ey-40+(r2-.5)*60],b=[bx+(r-.5)*150,by+(r2-.5)*90];
   let x,y,s;if(back>0){x=lerp(b[0],hx,back);y=lerp(b[1],hy,back);s=lerp(.14,1,back)}else if(k2>0){x=lerp(e[0],b[0],k2);y=lerp(e[1],b[1],k2);s=.14}else{x=lerp(hx,e[0],k1);y=lerp(hy,e[1],k1);s=lerp(1,.14,k1)}
   const spin=(1-back)*k1*(r-.5)*3;c.save();c.translate(x+tw/2,y+th/2);c.rotate(spin);c.scale(s,s);c.beginPath();c.rect(-tw/2,-th/2,tw,th);c.clip();G.pic('landscape',-hx-tw/2,-hy-th/2,600,800);c.restore();
   if(s<.5&&back<.5)G.bloom(x+tw/2,y+th/2,14,P.a,.8*(1-back*2))}
  if(k1>.05&&k2<1){c.globalCompositeOperation='lighter';for(let i=0;i<14;i++){const a=i/14;G.line(80+a*440,40,ex+(a-.5)*60,ey-50,P.hi,2,.18*k1*(1-k2))}c.globalCompositeOperation='source-over'}
  if(k1>.6&&back<.3)G.stream([[ex,ey-60],[ex-40,450],[bx,by+80]],t,6,P.a,5,G.clamp(k1*2-1)*(1-back*3),.6);
  const eo=G.clamp(ramp(t,.5,2)-back);if(eo>0)G.eye(ex,ey,78*eo,{look:[0,-.6],iris:'#5d86b0',glow:.4*k1});
  if(t>11)G.ring(300,400,lerp(120,420,ramp(t,11,13)),P.hi,3,.5*(1-ramp(t,11,13)))}};
// 5 Hubel & Wiesel 1959: a cat, an electrode in one cell, a crackling speaker
const ang5=(t,s)=>s.ang!=null?s.ang:(t<2?0:((t-2)*22)%180);
D[5]={dur:20,audio:1,pics:['cat-lab'],hint:'Tap to turn the bar · turn sound on to hear the cell',hintAt:13.5,rv:6.6,rvx:410,rvy:230,init:s=>{s.ang=null;s.cl=0},
 caps:[[0,'A cat watches a screen. A fine wire records one cell.'],[2,'A bar of light slowly turns'],[5.5,'At one tilt the cell crackles'],[10,'Turn it past, and the cell goes quiet'],[14,'Each cell has its favourite angle']],
 tap:(s,t)=>{s.ang=((ang5(t,s)+15)%180)},
 draw(g,t,s){const c=g.c;G.pic('cat-lab',0,0,600,800);const a=ang5(t,s),fav=60,d=Math.min(Math.abs(a-fav),180-Math.abs(a-fav)),fire=Math.exp(-(d*d)/180);
  // screen with bar
  G.rr(260,98,300,262,10,'rgba(4,8,14,.92)');G.at(410,229,1,a*Math.PI/180-Math.PI/2);G.bloom(0,0,140,'#cfe8ff',.35+.4*fire);c.fillStyle='#f4fbff';c.fillRect(-12,-95,24,190);G.end();
  G.text(Math.round(a)+'°',530,120,{size:18,col:'#cfe8ff',al:.8,align:'right'});
  // electrode into the cat's head
  G.path([[262,300],[236,318],[208,333]],'#cfd6de',3,.95);G.line(208,333,196,346,'#ffffff',2,.9);G.bloom(197,345,26+30*fire,P.a,.4+.6*fire);
  G.path([[262,300],[300,330],[360,420]],'#9aa4ae',2,.6);
  // spikes: rate depends on fire
  const rate=1+40*fire,ph=t*rate;if(Math.floor(ph)!==s.cl){s.cl=Math.floor(ph);if(Math.random()<.9&&t>.3){s.last=t;if(fire>.15)G.crackle(.04,.4+fire)}}
  const pop=G.clamp(1-(t-(s.last||-9))*10);
  if(fire>.15){for(let i=1;i<=3;i++)G.ring(546,470,30+i*22+pop*10,P.a,4,.6*fire*(1-(i-1)/3)*(.4+pop));G.sparks(546,470,70,8,Math.floor(t*30),P.hi,fire*pop)}
  G.bloom(546,470,90,P.a,.5*fire*pop);
  // trace
  G.glass(20,640,560,130,18);s.sp=s.sp||[];if(pop>.9&&fire>.15&&(!s.sp.length||s.sp[s.sp.length-1]!==s.last))s.sp.push(s.last);s.sp=s.sp.filter(x=>x>t-4);
  G.scope(36,652,528,106,s.sp,t,4,P.a);G.text('one cell',60,672,{size:14,align:'left',al:.7});
  G.meter(30,420,26,180,fire,P.a)}};
// 6 Two eyes, one cell
D[6]={dur:17,pics:['cat-lab'],rv:11,rvx:410,rvy:230,
 caps:[[0,'Show the left eye alone'],[4,'Now the right eye alone'],[8,'The same cell answers both'],[11,'Your two eyes meet in one cell'],[14,'Their map shows where it happens']],
 draw(g,t){const c=g.c;G.pic('cat-lab',0,0,600,800,.55);c.fillStyle='rgba(6,4,10,.35)';c.fillRect(0,0,600,800);
  const L=G.win(t,0,4.2,.4)+G.win(t,8,17,.6),R=G.win(t,4,8,.4)+G.win(t,8,17,.6),both=G.clamp(L+R-1);
  const el=[200,250],er=[400,250],cell=[300,560];
  G.eye(el[0],el[1],62,{look:[.3,.4],iris:'#7fb36a',open:.3+.7*L});G.eye(er[0],er[1],62,{look:[-.3,.4],iris:'#7fb36a',open:.3+.7*R});
  if(L<.3)G.text('covered',el[0],el[1]+80,{size:15,al:.6});if(R<.3)G.text('covered',er[0],er[1]+80,{size:15,al:.6});
  const pl=[[el[0],el[1]+60],[220,400],[cell[0]-20,cell[1]-50]],pr=[[er[0],er[1]+60],[380,400],[cell[0]+20,cell[1]-50]];
  G.path(pl,'#5aa0ff',6,.25+.5*L);G.path(pr,'#ff7a5a',6,.25+.5*R);G.stream(pl,t,4,'#8ec0ff',6,L,.6);G.stream(pr,t,4,'#ffa080',6,R,.6);
  const fire=G.clamp(.55*L+.55*R)*(.75+.25*Math.sin(t*20));G.neuron(cell[0],cell[1],.9,fire,both>.5?'#ffd070':(L>R?'#5aa0ff':'#ff7a5a'));
  if(t>11){const k=ramp(t,11,14);for(let i=0;i<10;i++){G.rr(70+i*47,700,40,60,6,i%2?'#ff7a5a':'#5aa0ff',null,.55*k)}G.text('left · right · left · right…',300,680,{size:15,al:.7*k})}}};
// 9 Kanwisher: a patch for faces
const IM9=['face','house','hand','cup','face','house','face'],SPAN9=2;
D[9]={dur:17,pics:['face','house','hand','cup'],rv:12.5,rvx:340,rvy:660,
 caps:[[0,'Pictures flash while a scanner watches'],[2,'A face: one small patch glows'],[4,'A house: dark'],[6,'Hands, objects: dark'],[12.5,'A patch that prefers faces']],
 draw(g,t){const c=g.c;const i=Math.min(IM9.length-1,Math.floor(t/SPAN9)),u=(t%SPAN9)/SPAN9,n=IM9[i],isF=n==='face',app=G.clamp(u*5)*G.clamp((1-u)*6);
  picIn(n,130,40,340,430,22,app);
  const glow=isF?G.clamp(G.clamp((u-.15)*4)*G.clamp((1-u)*4)):0;
  G.brain(310,640,.95,{spots:[[40,62,60,glow,'#ffcc55']]});G.ring(348,699,44,'#ffffff',2,.35);G.bloom(348,699,110,'#ffcc55',.7*glow);if(glow>.2)G.text('face patch',348,770,{size:16,col:'#ffcc55',al:glow});
  G.meter(536,520,26,220,glow,'#ffcc55');
  if(t>12.5){const k=ramp(t,12.5,13.5);G.at(300,250,1);G.text('face',0,0,{serif:1,size:44,col:'#ffcc55',al:k*isF})}}};
// 10 Rao & Ballard: send down a guess, send up only the surprise
D[10]={dur:16,pics:['street'],rv:10,rvx:410,rvy:520,
 caps:[[0,'The brain sends down a guess'],[4,'Most of the view matches. Nothing goes up.'],[7.5,'Only the surprise goes up'],[12,'The guess gets updated']],
 draw(g,t){const c=g.c;G.pic('street',0,0,600,800);const guess=ramp(t,0,3.5),match=ramp(t,4,6.5);
  c.fillStyle=G.rgba('#100818',.55*match);c.fillRect(0,0,600,800);
  G.brain(300,95,.38,{spots:[[0,-20,90,.5+.3*Math.sin(t*3),P.a]]});
  G.glass(380,30,200,74,18);G.text('guess',480,52,{serif:1,size:26});G.text(t>12?'“street + bird”':'“a quiet street”',480,84,{size:15,al:.85,col:t>12?P.a:P.hi});
  for(let i=0;i<5;i++){const x=90+i*105,y=lerp(170,430,((t*.5+i*.2)%1));G.arrow(x,y-30,x,y,P.hi,4,.55*guess*(1-match*.5))}
  [[120,560],[230,640],[470,640],[90,330],[520,330]].forEach(([x,y],i)=>{const k=ramp(t,4+i*.4,4.6+i*.4);if(k<=0)return;G.ball(x,y,22,'#3fbf6a',.9*k);G.text('✓',x,y+1,{size:24,col:'#ffffff',al:k});G.text('matches',x,y+36,{size:13,al:.75*k})});
  const bx=lerp(640,330,ramp(t,5,9)),by=480+Math.sin(t*3)*20;if(t>5){G.bloom(bx,by,90,'#ff6060',.65);G.at(bx,by,1);c.fillStyle='#ffffff';c.beginPath();const f=Math.sin(t*14)*16;c.moveTo(-34,-f);c.quadraticCurveTo(-12,-8,0,0);c.quadraticCurveTo(12,-8,34,-f);c.quadraticCurveTo(12,4,0,6);c.quadraticCurveTo(-12,4,-34,-f);c.fill();G.end()}
  if(t>7.5){const k=ramp(t,7.5,9);for(let j=0;j<3;j++){const y=lerp(by-50,150,((t*.7+j/3)%1));G.arrow(bx,y+26,bx,y,'#ff6060',7,k)}G.text('surprise!',bx,by+60,{size:20,col:'#ff9a9a',al:k})}
  if(t>12){const k=ramp(t,12,13);G.ring(480,67,60+30*k,P.a,3,1-k)}}};
// 13 Owning a fake body
D[13]={dur:17,pics:['vr-body'],rv:11,rvx:400,rvy:300,
 caps:[[0,'A headset shows a body standing ahead'],[3.5,'A stick strokes your back, and that body\'s back'],[8,'Where do you feel you are?'],[11,'The "me" drifts towards the virtual body'],[14,'Owning a body is built from many senses']],
 draw(g,t){const c=g.c;G.pic('vr-body',0,0,600,800);const k=ramp(t,8,12),on=t>3.5&&t<11.5,st=Math.sin(t*3.2);
  G.text('you',190,610,{size:18,al:G.clamp(t)});G.text('the body you see',405,610,{size:18,col:'#9fe4ff',al:G.clamp(t)});
  if(on){[[150,'#f6a640',0],[365,'#6fd8ff',1]].forEach(([x,col])=>{const y=300+st*40;c.save();c.shadowColor=col;c.shadowBlur=14;G.line(x-70,y-60,x-6,y,col,7,.95);c.restore();G.bloom(x,y,50,col,.7);G.ring(x,y,26,col,3,.6)});
   G.curveArrow(180,250,280,190,370,240,'#ffffff',3,.5,[6,6]);G.text('same moment',280,180,{size:14,al:.8})}
  if(t>8){const x=lerp(190,400,k),y=lerp(120,90,k);G.bloom(x,y+20,70,P.hi,.6);G.at(x,y,1);c.fillStyle=G.rgba(P.hi,.95);c.beginPath();c.moveTo(0,40);c.bezierCurveTo(-30,8,-24,-24,0,-26);c.bezierCurveTo(24,-24,30,8,0,40);c.fill();G.dot(0,-6,9,'#3a2018');G.end();G.text('“me”',x,y-48,{serif:1,size:30,al:G.clamp((t-8)*2)})}
  if(t>14){const kk=ramp(t,14,15);[['sight','#6fd8ff',140],['touch',P.a,300],['body sense','#ff9fb0',460]].forEach(([l,col,x])=>{G.ball(x,700,30,col,.9*kk);G.text(l,x,750,{size:17,al:kk});G.arrow(x,668,lerp(x,400,.7),150,col,3,.45*kk)})}}};
// 18 Guesses go both ways
D[18]={dur:16,pics:['review-wall'],rv:10,rvx:300,rvy:400,
 caps:[[0,'A review pulls many studies together'],[4,'Old picture: guesses only flow down from the top'],[8,'New picture: the senses guess too'],[11.5,'Guesses travel both ways']],
 draw(g,t){const c=g.c;G.pic('review-wall',0,0,600,800);const up=ramp(t,8,10),dn=ramp(t,4,5.5),q=G.rnd(3);
  for(let i=0;i<9;i++){const sx=q()<.5?-60:660,sy=q()*500,tx=260+q()*300,ty=200+q()*220,k=ramp(t,i*.35,i*.35+1.2);if(k<1){G.at(lerp(sx,tx,k),lerp(sy,ty,k),1,(1-k)*2);G.rr(-22,-28,44,56,4,'#efe2c4',null,.9*(1-k*.6));G.end()}}
  c.fillStyle=G.rgba('#0a0610',.45*dn);c.fillRect(0,0,600,800);
  const xs=[300,330,360],lv=[[300,70,'top'],[300,190,'middle'],[300,310,'lower'],[300,430,'senses']];
  if(dn>0)lv.forEach(([x,y,l])=>{G.rr(210,y-20,180,40,20,'rgba(10,6,20,.7)','#ffffff',.5*dn,1.5);G.text(l,300,y,{size:16,al:dn})});
  for(let i=0;i<3;i++){const y0=lv[i][1]+20,y1=lv[i+1][1]-20,f=((t*.8+i*.3)%1);if(dn>0){G.arrow(250,y0,250,y1,P.a,6,dn);G.bulb(250,lerp(y0,y1,f),.15,dn,P.a)}
   if(up>0){G.arrow(350,y1,350,y0,'#7fd0ff',6,up);G.bulb(350,lerp(y1,y0,f),.15,up,'#7fd0ff')}}
  if(dn>0){G.text('guess',170,250,{size:15,col:P.a,al:dn})}if(up>0)G.text('guess',430,250,{size:15,col:'#9fe0ff',al:up});
  if(t>11.5)G.stamp('BOTH WAYS',300,560,11.5,t,P.hi,38)}};
// 19 Four ideas about consciousness
D[19]={dur:15,pics:['four-cases'],rv:11,rvx:300,rvy:330,
 caps:[[0,'A review lines up four big ideas about consciousness'],[4,'Which experiment could tell them apart?'],[11,'No winner yet']],
 draw(g,t){const c=g.c;G.pic('four-cases',0,0,600,800);const xs=[93,232,375,516],scan=t>4&&t<11?((t-4)/1.75)%4:-1;
  xs.forEach((x,i)=>{const a=ramp(t,.5+i*.5,1.3+i*.5),hit=scan>=0&&Math.floor(scan)===i?Math.sin((scan%1)*Math.PI):0;
   G.bloom(x,300,90,P.a,(.2+.6*hit)*a);G.text('idea '+(i+1),x,200,{size:15,al:a*.9});G.text('?',x,320,{serif:1,size:80,col:'#ffffff',al:(.55+.45*hit)*a,glow:P.a})});
  if(scan>=0){const x=lerp(xs[0],xs[3],(scan%4)/3);c.fillStyle=G.rgba(P.hi,.18);c.beginPath();c.moveTo(x-8,640);c.lineTo(x-55,440);c.lineTo(x+55,440);c.lineTo(x+8,640);c.fill();G.bloom(x,640,50,P.hi,.6);G.text('test?',x,670,{size:17})}
  if(t>11)G.stamp('NOT DECIDED',300,720,11,t,P.a,40)}};
window.DEMOS=D;})();
