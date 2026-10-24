(()=>{'use strict';
const W=900,H=640,TAU=Math.PI*2;
const cv=document.getElementById('stage'),cx=cv.getContext('2d');
const steps=[...document.querySelectorAll('.step')],keys=steps.map(s=>s.dataset.s);
const C={cream:'#fbf4e4',wall2:'#ecd2a4',blue:'#1f5f8b',tile:'#2e74a6',saff:'#e09a1f',terra:'#b8553a',ink:'#2a2118',green:'#5e8f4e',soft:'#6b5b49',red:'#c0392b',water:'#6fb9d8'};
const sm=(a,b,x)=>{x=Math.min(1,Math.max(0,(x-a)/(b-a)));return x*x*(3-2*x)};
const lerp=(a,b,t)=>a+(b-a)*t;
function mk(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return c}
function arch(c,x,base,w,h){const x0=x-w/2,x1=x+w/2,ap=base-h,sp=base-h+w*.62;
 c.moveTo(x0,base);c.lineTo(x0,sp);c.bezierCurveTo(x0,sp-w*.32,x-w*.12,ap+w*.12,x,ap);
 c.bezierCurveTo(x+w*.12,ap+w*.12,x1,sp-w*.32,x1,sp);c.lineTo(x1,base);c.closePath()}
const ARCH=[[180,470,150,300],[450,470,230,390],[720,470,150,300]];
function star(c,x,y,r){c.beginPath();for(let i=0;i<16;i++){const a=i*TAU/16,rr=i%2?r*.45:r;c.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr)}c.closePath();c.fill()}
const rr=(c,x,y,w,h,r)=>{c.beginPath();c.roundRect?c.roundRect(x,y,w,h,r):c.rect(x,y,w,h)};
// places in the courtyard
const P={sun:[470,330],jas:[95,455],tiles:[450,600],steps:[835,520],fount:[450,540],fruit:[615,598],chilli:[680,602],thorn:[128,430]};
function drawScene(c){
 let g=c.createLinearGradient(0,0,0,470);g.addColorStop(0,'#f3b878');g.addColorStop(.6,'#fbd9a0');g.addColorStop(1,'#fdecc8');c.fillStyle=g;c.fillRect(0,0,W,H);
 // low sun
 g=c.createRadialGradient(...P.sun,8,...P.sun,170);g.addColorStop(0,'rgba(255,248,214,1)');g.addColorStop(.25,'rgba(255,214,140,.7)');g.addColorStop(1,'rgba(255,200,120,0)');c.fillStyle=g;c.fillRect(0,0,W,H);
 c.fillStyle='#fff6d8';c.beginPath();c.arc(...P.sun,30,0,TAU);c.fill();
 c.fillStyle='#9bb874';for(let i=0;i<18;i++){c.beginPath();c.arc(30+i*50,432+((i*37)%20),40+((i*13)%18),0,TAU);c.fill()}
 c.fillStyle='#f5d9a6';c.fillRect(300,200,16,230);c.fillRect(584,200,16,230);
 c.beginPath();c.moveTo(296,202);c.lineTo(308,170);c.lineTo(320,202);c.fill();c.beginPath();c.moveTo(580,202);c.lineTo(592,170);c.lineTo(604,202);c.fill();
 c.fillStyle='#7aa262';for(let i=0;i<7;i++){c.beginPath();c.arc(370+i*27,442,22,0,TAU);c.fill()}
 // jali left arch
 c.save();c.beginPath();arch(c,...ARCH[0]);c.clip();c.fillStyle='#f6dfb6';c.fillRect(100,160,160,320);
 c.strokeStyle='#c99a55';c.lineWidth=3;for(let d=-400;d<400;d+=18){c.beginPath();c.moveTo(105+d,160);c.lineTo(105+d+320,480);c.stroke();c.beginPath();c.moveTo(255-d,160);c.lineTo(255-d-320,480);c.stroke()}
 c.fillStyle='#fff0cc';for(let y=170;y<480;y+=18)for(let x=105;x<260;x+=18){c.beginPath();c.arc(x+((y/18)%2?9:0),y,2.2,0,TAU);c.fill()}c.restore();
 // right arch: view to a stair tower
 c.save();c.beginPath();arch(c,...ARCH[2]);c.clip();c.fillStyle='#f7dcae';c.fillRect(640,160,160,320);c.restore();
 // wall
 c.beginPath();c.rect(0,30,W,440);ARCH.forEach(a=>arch(c,...a));
 g=c.createLinearGradient(0,30,0,470);g.addColorStop(0,'#f8e6c4');g.addColorStop(1,C.wall2);c.fillStyle=g;c.fill('evenodd');
 c.fillStyle='#cfe1ec';[[315,150],[585,150],[45,170],[855,170]].forEach(([x,y])=>{c.beginPath();c.arc(x,y,24,0,TAU);c.fill()});
 c.fillStyle=C.tile;[[315,150],[585,150],[45,170],[855,170]].forEach(([x,y])=>star(c,x,y,17));
 ARCH.forEach(a=>{c.beginPath();arch(c,...a);c.strokeStyle=C.blue;c.lineWidth=10;c.stroke();c.beginPath();arch(c,a[0],a[1],a[2]+22,a[3]+14);c.strokeStyle=C.saff;c.lineWidth=3;c.stroke()});
 c.fillStyle=C.blue;c.fillRect(0,30,W,42);c.fillStyle=C.saff;c.fillRect(0,72,W,5);c.fillRect(0,26,W,4);
 c.fillStyle='#f5e2b0';for(let x=15;x<W;x+=30)star(c,x,51,11);c.fillStyle='#eadbbb';c.fillRect(0,0,W,26);
 // floor
 const VY=260,VX=450,top=470;c.fillStyle='#f5e2c0';c.fillRect(0,top,W,H-top);
 for(let r=0;r<9;r++){const z0=1+r*.55,z1=1+(r+1)*.55;const y0=top+(H-top)*(1-1/z0)*2.2,y1=top+(H-top)*(1-1/z1)*2.2;if(y0>H)break;
  for(let k=-14;k<14;k++){if((k+r)%2)continue;const xs=k*70+VX,xe=xs+70;const s0=(y0-VY)/(top-VY),s1=(y1-VY)/(top-VY);
   c.beginPath();c.moveTo(VX+(xs-VX)*s0,y0);c.lineTo(VX+(xe-VX)*s0,y0);c.lineTo(VX+(xe-VX)*s1,y1);c.lineTo(VX+(xs-VX)*s1,y1);c.fillStyle=r%3==1?'#d9e7ee':'#bcd5e3';c.fill()}}
 c.fillStyle='rgba(224,154,31,.5)';c.fillRect(0,top,W,4);
 // steps (right)
 for(let s=0;s<4;s++){const y=640-s*34,x=770+s*22;c.fillStyle=s%2?'#e9cf9c':'#f1dcb0';c.fillRect(x,y-34,W-x,34);c.fillStyle='#c99a55';c.fillRect(x,y-34,W-x,4)}
 // jasmine bush
 c.fillStyle='#4f8445';[[95,470,52],[60,490,38],[135,492,40],[95,430,34],[40,450,26]].forEach(([x,y,r])=>{c.beginPath();c.arc(x,y,r,0,TAU);c.fill()});
 c.fillStyle='#fffdf4';for(let i=0;i<26;i++){const a=i*2.4,r=8+(i*13)%46;star(c,95+Math.cos(a)*r*1.1,465+Math.sin(a)*r*.8,5)}
 c.fillStyle=C.terra;c.beginPath();c.moveTo(50,520);c.lineTo(140,520);c.lineTo(130,560);c.lineTo(60,560);c.fill();
 // fountain
 c.fillStyle=C.saff;c.beginPath();c.ellipse(450,555,150,34,0,0,TAU);c.fill();c.fillStyle=C.water;c.beginPath();c.ellipse(450,553,136,27,0,0,TAU);c.fill();
 c.fillStyle='#e9f6fb';c.beginPath();c.ellipse(450,550,60,10,0,0,TAU);c.fill();
 c.fillStyle='#d9a441';c.fillRect(442,500,16,50);c.fillStyle='#cfeaf5';c.beginPath();c.moveTo(450,470);c.quadraticCurveTo(420,490,415,540);c.lineTo(420,540);c.quadraticCurveTo(428,495,450,478);c.quadraticCurveTo(472,495,480,540);c.lineTo(485,540);c.quadraticCurveTo(480,490,450,470);c.fill();
 // low table with pomegranate + chilli
 c.fillStyle='#9a6a3a';c.fillRect(580,610,140,10);c.fillRect(590,620,8,20);c.fillRect(702,620,8,20);
 c.fillStyle=C.blue;c.beginPath();c.ellipse(615,608,34,8,0,0,TAU);c.fill();
 c.fillStyle='#b5302a';c.beginPath();c.arc(608,592,15,0,TAU);c.fill();c.fillStyle='#8f1f1c';c.beginPath();c.moveTo(603,578);c.lineTo(608,572);c.lineTo(613,578);c.fill();
 c.fillStyle='#f3e6d0';c.beginPath();c.arc(630,598,10,0,TAU);c.fill();c.fillStyle='#c2273a';for(let i=0;i<9;i++){c.beginPath();c.arc(626+(i%3)*4,594+Math.floor(i/3)*4,1.8,0,TAU);c.fill()}
 c.fillStyle=C.saff;c.beginPath();c.ellipse(680,608,24,6,0,0,TAU);c.fill();
 c.fillStyle='#c62e1e';[[0,0],[10,-3],[-9,-2]].forEach(([a,b])=>{c.beginPath();c.ellipse(680+a,601+b,10,3,.4,0,TAU);c.fill()});
 // lanterns
 [[405,205],[495,205]].forEach(([x,y])=>{c.strokeStyle='#7a5a2a';c.lineWidth=1.5;c.beginPath();c.moveTo(x,90);c.lineTo(x,y-12);c.stroke();c.fillStyle='#b9893f';c.beginPath();c.moveTo(x,y-14);c.lineTo(x+9,y);c.lineTo(x,y+14);c.lineTo(x-9,y);c.fill()});
}
function bird(c,x,y,t,col){const f=Math.sin(t*14)*7;c.strokeStyle=col||C.ink;c.lineWidth=3;c.lineCap='round';c.beginPath();c.moveTo(x-14,y-f);c.quadraticCurveTo(x-6,y-4,x,y);c.quadraticCurveTo(x+6,y-4,x+14,y-f);c.stroke()}
const birdPos=t=>{const u=(t*0.09)%1.2;return [lerp(-40,W+40,u/1.2),150+Math.sin(u*9)*18]};
const DPR=Math.min(2,window.devicePixelRatio||1);
const SC=mk(W*2,H*2);{const c=SC.getContext('2d');c.scale(2,2);drawScene(c)}
// ---- layout
let vw=0,vh=0,S=1,OX=0,OY=0,phone=false;
function layout(){vw=innerWidth;vh=innerHeight;cv.width=Math.round(vw*DPR);cv.height=Math.round(vh*DPR);cv.style.height=vh+'px';phone=vw<900;
 let rx,ry,rw,rh;if(phone){rx=8;ry=46;rw=vw-16;rh=vh*.5-46}else{rx=vw*.4;ry=60;rw=vw*.58;rh=vh-90}
 S=Math.min(rw/W,rh/(H+70));if(phone)S=Math.min(rw/W*1.18,rh/(H+60));OX=rx+rw/2-W*S/2;OY=ry+rh-H*S}
addEventListener('resize',layout);layout();
const framePath=c=>{c.beginPath();arch(c,W/2,H,W,H+60)};
// ---- camera per stop (focus x,y, zoom)
const CAM={title:[450,330,1],light:[460,300,1.25],warm:[300,420,1.35],smell:[150,450,1.9],touch:[430,580,1.7],balance:[780,520,1.6],body:[740,480,1.5],hear:[450,520,1.6],taste:[630,585,2.3],chem:[665,590,2.3],pain:[150,450,2.1],inside:[450,380,1.05],time:[450,420,1],count:[450,330,1],end:[450,330,1]};
let Z=1;
function applyCam(c,cam,rot){const z=cam[2];let x=Math.min(W-W/2/z,Math.max(W/2/z,cam[0])),y=Math.min(H-H/2/z,Math.max(H/2/z,cam[1]));
 c.translate(W/2,H/2);if(rot)c.rotate(rot);c.scale(z,z);c.translate(-x,-y);Z=z}
// ---- helpers (world coords)
function photo(c,a){c.globalAlpha=a;c.drawImage(SC,0,0,W,H);c.globalAlpha=1}
function veil(c,a,col){c.globalAlpha=a;c.fillStyle=col||C.cream;c.fillRect(-200,-200,W+400,H+400);c.globalAlpha=1}
function glow(c,x,y,r,col,a){const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,col);g.addColorStop(1,'rgba(255,240,200,0)');c.globalAlpha=a;c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2);c.globalAlpha=1}
function label(c,x,y,txt,col,a){const z=Z,fs=(phone?22:17)/z;c.font=`600 ${fs}px ui-sans-serif,-apple-system,sans-serif`;c.textAlign='center';const w=c.measureText(txt).width+20/z,h=30/z;
 c.globalAlpha=a==null?1:a;c.fillStyle='rgba(255,250,239,.93)';rr(c,x-w/2,y-h/2,w,h,h/2);c.fill();c.fillStyle=col||C.ink;c.fillText(txt,x,y+fs*.33);c.globalAlpha=1}
// a family unfolding into its variants: chips fan out from a hub
function unfold(c,x,y,hub,list,k,a,col){const z=Z,R=(phone?150:128)/z*k,n=list.length;
 for(let i=0;i<n;i++){const ang=-Math.PI/2+(n>1?(i-(n-1)/2)*(n<=2?.75:(Math.PI*.95/(n-1))*(n>3?1.2:1)):0);const px=x+Math.cos(ang)*R*1.25,py=y+Math.sin(ang)*R;
  c.globalAlpha=a*k*.6;c.strokeStyle=col||C.saff;c.lineWidth=2/z;c.beginPath();c.moveTo(x,y);c.lineTo(px,py);c.stroke();c.globalAlpha=1;
  if(k>.25)label(c,px,py,list[i],col||C.blue,a*sm(.25,.8,k))}
 label(c,x,y,hub,C.terra,a)}
function sunbeam(c,a,t){c.globalAlpha=a*(.5+.08*Math.sin(t*.7));const g=c.createLinearGradient(470,330,200,640);g.addColorStop(0,'rgba(255,236,170,.95)');g.addColorStop(1,'rgba(255,236,170,0)');c.fillStyle=g;c.beginPath();c.moveTo(430,300);c.lineTo(510,300);c.lineTo(420,640);c.lineTo(80,640);c.fill();c.globalAlpha=1}
// ---- sound (off by default)
let AC=null,soundOn=false;const btn=document.getElementById('snd');
function setSound(on){soundOn=on;if(on&&!AC){AC=new (window.AudioContext||window.webkitAudioContext)()}if(AC&&AC.state==='suspended')AC.resume();btn.textContent=on?'Sound on':'Sound off';btn.setAttribute('aria-pressed',on)}
btn.onclick=()=>setSound(!soundOn);
function thump(){if(!soundOn||!AC)return;const o=AC.createOscillator(),g=AC.createGain();o.frequency.setValueAtTime(70,AC.currentTime);o.frequency.exponentialRampToValueAtTime(40,AC.currentTime+.15);g.gain.setValueAtTime(.35,AC.currentTime);g.gain.exponentialRampToValueAtTime(.001,AC.currentTime+.25);o.connect(g).connect(AC.destination);o.start();o.stop(AC.currentTime+.3)}
function tone(f){if(!AC)return;const o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(0,AC.currentTime);g.gain.linearRampToValueAtTime(.18,AC.currentTime+.03);g.gain.exponentialRampToValueAtTime(.001,AC.currentTime+1.1);o.connect(g).connect(AC.destination);o.start();o.stop(AC.currentTime+1.2)}
let splash=null;function splashLevel(v){if(!AC)return;if(!splash){const n=AC.createBuffer(1,AC.sampleRate*2,AC.sampleRate),d=n.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;const s=AC.createBufferSource();s.buffer=n;s.loop=true;const f=AC.createBiquadFilter();f.type='bandpass';f.frequency.value=2400;f.Q.value=.7;const g=AC.createGain();g.gain.value=0;s.connect(f).connect(g).connect(AC.destination);s.start();splash=g}
 splash.gain.setTargetAtTime(soundOn?v*.07:0,AC.currentTime,.2)}
let pitchHit=null;document.querySelectorAll('.tap').forEach(b=>b.onclick=()=>{if(!soundOn)setSound(true);const f=+b.dataset.tone;tone(f);pitchHit={f,t:performance.now()}});
// ---- the count
const FAM=[['sight',4,'#1f5f8b'],['temperature',2,'#e09a1f'],['smell',1,'#5e8f4e'],['touch',5,'#2e74a6'],['balance',2,'#6b4a8a'],['body position',2,'#8a5a2a'],['hearing',1,'#2e8a8c'],['taste',5,'#b5302a'],['chemical sense',1,'#c62e1e'],['pain',1,'#7a2a2a'],['itch',1,'#a0522d'],['inner body',5,'#b8553a']];
const DEB=[['fat taste','#b5302a',1],['time','#6b5b49',0],['magnetic?','#6b5b49',0],['agency','#6b5b49',0],['body ownership','#6b5b49',0]];
const MODE={stim:{n:3,why:'Durie\u2019s first rule: count kinds of signal. Chemical (smell, taste, inner chemistry), mechanical (touch, hearing, balance) and light. Just 3.',groups:[['chemical','#5e8f4e'],['mechanical','#2e74a6'],['light','#1f5f8b']]},
 ari:{n:5,why:'Aristotle\u2019s five: sight, hearing, smell, taste, touch. It leaves out balance, body position, temperature, pain and all the inner senses.',groups:[['sight','#1f5f8b'],['hearing','#2e8a8c'],['smell','#5e8f4e'],['taste','#b5302a'],['touch','#2e74a6']]}};
let mode='fam',xs={debated:false,smell:false},STARS=[],shown=0;
function buildStars(){STARS=[];let why='';
 if(MODE[mode]){MODE[mode].groups.forEach(([n,c])=>STARS.push(c));why=MODE[mode].why}
 else{FAM.forEach(([n,v,c])=>{let k=mode==='rec'?v:1;if(n==='smell'&&xs.smell)k=mode==='rec'?400:1;for(let i=0;i<k;i++)STARS.push(c)});
  why=mode==='rec'?'One per receptor type named in this film: 4 for sight, 5 for touch, 5 tastes, 2 for balance and so on.':'One per family of sense met in this film. Sight, touch and taste each count once.';
  if(xs.smell&&mode==='rec')why+=' Smell split into its ~400 receptor types swamps everything else.';
  if(xs.smell&&mode==='fam')why+=' (Splitting smell only changes the receptor count.)'}
 if(xs.debated){DEB.forEach(([n,c,recOnly])=>{if(MODE[mode])return;if(recOnly&&mode!=='rec')return;STARS.push(c)});if(!MODE[mode])why+=' Debated extras: '+(mode==='rec'?'fat taste, ':'')+'time, a magnetic sense, agency (feeling you caused a movement) and body ownership.'}
 document.getElementById('num').textContent=STARS.length;document.getElementById('why').textContent=why}
document.querySelectorAll('#modes button').forEach(b=>b.onclick=()=>{mode=b.dataset.m;document.querySelectorAll('#modes button').forEach(o=>o.setAttribute('aria-pressed',o===b));buildStars()});
document.querySelectorAll('#extras button').forEach(b=>{b.setAttribute('aria-pressed','false');b.onclick=()=>{xs[b.dataset.x]=!xs[b.dataset.x];b.setAttribute('aria-pressed',xs[b.dataset.x]);buildStars()}});
buildStars();
// ---- stops
let lastBeat=-1;
const R={
 title(c,p,t,a){photo(c,a);sunbeam(c,a,t);const[bx,by]=birdPos(t);c.globalAlpha=a;bird(c,bx,by,t);c.globalAlpha=1;if(p>.3)label(c,450,600,'five senses? keep counting',C.terra,a*sm(.3,.6,p))},
 light(c,p,t,a){photo(c,a);const k=sm(.05,.6,p);
  c.globalAlpha=a*k*.55;for(let i=0;i<9;i++){const ang=-.2+i*.32+Math.sin(t*.5+i)*.03;c.strokeStyle='rgba(255,226,140,.9)';c.lineWidth=6;c.beginPath();c.moveTo(...P.sun);c.lineTo(470+Math.cos(ang+1.4)*420,330+Math.sin(ang+1.4)*420);c.stroke()}c.globalAlpha=1;
  const cols=[['rods','#7d7d7d'],['short','#3a6fd8'],['medium','#3aa05a'],['long','#d8463a']];
  cols.forEach(([n,cl],i)=>{const x=350+i*66,y=400;c.globalAlpha=a*k;c.fillStyle=cl;c.beginPath();if(i==0)c.rect(x-5,y-22,10,44);else{c.moveTo(x,y-22);c.lineTo(x+9,y+22);c.lineTo(x-9,y+22)}c.fill();c.globalAlpha=1});
  unfold(c,460,290,'sight',['rods','short cones','medium cones','long cones'],sm(.08,.55,p),a)},
 warm(c,p,t,a){photo(c,a);sunbeam(c,a*1.6,t);const k=sm(.1,.6,p);
  for(let i=0;i<10;i++){const x=180+i*26,ph=t*2+i;c.globalAlpha=a*k*.6;c.strokeStyle='#e8892a';c.lineWidth=2.5;c.beginPath();for(let y=0;y<70;y+=4){c.lineTo(x+Math.sin(ph+y*.15)*5,520-y-((t*30+i*9)%30))}c.stroke()}c.globalAlpha=1;
  glow(c,300,500,140,'rgba(255,160,60,.6)',a*k);unfold(c,300,420,'temperature',['warm','cold'],sm(.08,.55,p),a,C.terra)},
 smell(c,p,t,a){photo(c,a);const k=sm(.05,.5,p);
  for(let i=0;i<34;i++){const u=((t*.12+i/34)%1),x=P.jas[0]+u*360,y=P.jas[1]-10-u*90+Math.sin(u*10+i)*16;c.globalAlpha=a*k*Math.sin(u*Math.PI)*.85;c.fillStyle=i%3?'#fff8e0':'#e9d8ff';c.beginPath();c.arc(x,y,3+((i*7)%4),0,TAU);c.fill()}c.globalAlpha=1;
  glow(c,...P.jas,90,'rgba(255,255,230,.9)',a*k*.6);
  const kk=sm(.12,.6,p);if(kk>0){for(let i=0;i<12;i++){const x=170+i*14,y=380,on=[1,4,5,9].includes(i);c.globalAlpha=a*kk;c.fillStyle=on?C.saff:'#d6c6a8';rr(c,x,y,10,18,3);c.fill()}c.globalAlpha=1;label(c,247,350,'a few locks open = "jasmine"',C.green,a*kk)}
  label(c,P.jas[0]+10,515,'smell',C.terra,a*k)},
 touch(c,p,t,a){photo(c,a);const k=sm(.05,.4,p),n=6;
  for(let i=0;i<n;i++){const u=Math.min(1,Math.max(0,(t*.8-i*.5)%(n*.5+1)/1));const x=300+i*48,y=615-(i%2)*18;const on=(t*.8)%(n*.5+1)>i*.5;
   if(on){c.globalAlpha=a*k*.8;c.fillStyle='#8a6a4a';c.beginPath();c.ellipse(x,y,9,15,.2,0,TAU);c.fill();for(let q=0;q<5;q++){c.beginPath();c.arc(x-6+q*3.6,y-19-Math.abs(q-1)*1.2,2.4,0,TAU);c.fill()}c.globalAlpha=a*k*(1-u);c.strokeStyle=C.blue;c.lineWidth=2;c.beginPath();c.ellipse(x,y,9+u*30,15+u*20,.2,0,TAU);c.stroke()}}c.globalAlpha=1;
  unfold(c,430,560,'touch',['light touch','pressure','vibration','stretch','gentle stroke'],sm(.08,.55,p),a)},
 balance(c,p,t,a){photo(c,a);const k=sm(.1,.6,p);
  // little inner-ear icon: 3 loops + sac with crystals
  const x=630,y=310,s=1/Z*(phone?1.3:1);c.save();c.translate(x,y);c.scale(s,s);c.globalAlpha=a*k;c.fillStyle='rgba(255,250,239,.93)';c.beginPath();c.arc(0,0,62,0,TAU);c.fill();
  c.lineWidth=5;[[0,-22,C.blue],[-22,4,'#6b4a8a'],[20,6,C.saff]].forEach(([dx,dy,col],i)=>{c.strokeStyle=col;c.beginPath();c.ellipse(dx,dy,18,24,i*1.05+Math.sin(t*2)*.1,0,TAU);c.stroke()});
  c.fillStyle='#d9c7a3';c.beginPath();c.ellipse(0,34,18,10,0,0,TAU);c.fill();c.fillStyle='#fff';for(let i=0;i<5;i++){c.beginPath();c.arc(-10+i*5+Math.sin(t*2)*4,32,2,0,TAU);c.fill()}c.restore();c.globalAlpha=1;
  unfold(c,720,490,'balance',['turning','tilt & sliding'],sm(.08,.55,p),a,'#6b4a8a')},
 body(c,p,t,a){photo(c,a);veil(c,a*.35*sm(0,.4,p));const k=sm(.05,.5,p),x=815,y=516,u=.5+.5*Math.sin(t*1.2);
  c.globalAlpha=a*k;c.strokeStyle=C.ink;c.lineWidth=5;c.lineCap='round';c.beginPath();c.arc(x,y-60,13,0,TAU);c.stroke();
  c.beginPath();c.moveTo(x,y-46);c.lineTo(x,y+10);c.lineTo(x-14,y+56);c.moveTo(x,y+10);c.lineTo(x+14,y+56);c.stroke();
  const hx=lerp(x-40,x-6,u),hy=lerp(y-10,y-58,u);c.strokeStyle=C.saff;c.beginPath();c.moveTo(x,y-34);c.lineTo(lerp(x-30,x-26,u),lerp(y-14,y-36,u));c.lineTo(hx,hy);c.stroke();
  c.strokeStyle=C.ink;c.beginPath();c.moveTo(x,y-34);c.lineTo(x+24,y-6);c.stroke();c.lineWidth=2;c.beginPath();c.moveTo(x-6,y-62);c.lineTo(x-1,y-62);c.moveTo(x+3,y-62);c.lineTo(x+8,y-62);c.stroke();
  glow(c,lerp(x-30,x-26,u),lerp(y-14,y-36,u),30,'rgba(224,154,31,.8)',a*k);c.globalAlpha=1;
  label(c,x-70,y+100,'eyes shut, finger finds nose',C.ink,a*k);
  unfold(c,690,400,'body position',['position (spindles)','force (tendons)'],sm(.08,.55,p),a,'#8a5a2a')},
 hear(c,p,t,a){photo(c,a);const k=sm(.05,.4,p);splashLevel(a*k);
  for(let i=0;i<5;i++){const u=((t*.45+i/5)%1);c.globalAlpha=a*k*(1-u)*.8;c.strokeStyle=C.blue;c.lineWidth=2.5;c.beginPath();c.ellipse(450,505,40+u*260,14+u*120,0,Math.PI*1.05,Math.PI*1.95);c.stroke()}c.globalAlpha=1;
  // cochlea spiral with pitch colours
  const s=1/Z*(phone?1.3:1),ox=560,oy=440;c.save();c.translate(ox,oy);c.scale(s,s);c.globalAlpha=a*sm(.2,.6,p);c.fillStyle='rgba(255,250,239,.94)';c.beginPath();c.arc(0,0,66,0,TAU);c.fill();
  const hot=pitchHit&&performance.now()-pitchHit.t<1200?(pitchHit.f>800?.1:.85):((t*.25)%1);
  for(let i=0;i<60;i++){const v=i/60,ang=v*TAU*2.4,r=54*(1-v*.8);const near=Math.abs(v-hot)<.07;c.fillStyle=near?C.saff:`hsl(${200-v*160},45%,${55+v*10}%)`;c.beginPath();c.arc(Math.cos(ang)*r,Math.sin(ang)*r,near?6:4*(1-v*.5)+1,0,TAU);c.fill()}
  c.fillStyle=C.ink;c.font='600 11px ui-sans-serif,sans-serif';c.textAlign='center';c.fillText('high',44,-36);c.fillText('low',0,6);c.restore();c.globalAlpha=1;
  label(c,450,612,'hearing: hair cells along the cochlea',C.terra,a*k)},
 taste(c,p,t,a){photo(c,a);const k=sm(.05,.4,p);
  for(let i=0;i<14;i++){const ang=i*TAU/14+t*.3,r=10+sm(.05,.5,p)*28;c.globalAlpha=a*k;c.fillStyle='#c2273a';c.beginPath();c.arc(630+Math.cos(ang)*r,592+Math.sin(ang)*r*.6,2.4,0,TAU);c.fill()}c.globalAlpha=1;
  glow(c,630,595,50,'rgba(194,39,58,.5)',a*k);unfold(c,620,598,'taste',['sweet','sour','salty','bitter','umami','fat?'],sm(.08,.55,p),a,C.red)},
 chem(c,p,t,a){photo(c,a);const k=sm(.05,.4,p);
  for(let i=0;i<6;i++){c.globalAlpha=a*k*.8;c.strokeStyle='#d8462a';c.lineWidth=2;c.beginPath();for(let y=0;y<34;y+=2)c.lineTo(668+i*5+Math.sin(t*5+y*.3+i)*2.5,598-y-((t*20+i*5)%10));c.stroke()}c.globalAlpha=1;
  glow(c,680,600,46,'rgba(216,70,42,.55)',a*k);unfold(c,680,604,'chemical sense',['chilli burn','mint cool'],sm(.08,.55,p),a,'#c62e1e')},
 pain(c,p,t,a){photo(c,a);const k=sm(.05,.35,p),fl=Math.max(0,Math.sin(t*3))**8;
  c.globalAlpha=a*k;c.strokeStyle='#5a3a1a';c.lineWidth=2;c.beginPath();c.moveTo(P.thorn[0]-20,P.thorn[1]+10);c.lineTo(...P.thorn);c.stroke();c.fillStyle='#5a3a1a';c.beginPath();c.moveTo(P.thorn[0]-3,P.thorn[1]+2);c.lineTo(P.thorn[0]+6,P.thorn[1]-6);c.lineTo(P.thorn[0]+2,P.thorn[1]+4);c.fill();c.globalAlpha=1;
  glow(c,...P.thorn,40+fl*30,'rgba(200,40,40,.9)',a*k*(.3+.7*fl));
  const mx=190+Math.sin(t*2.3)*30+Math.sin(t*7)*6,my=400+Math.cos(t*1.7)*20;c.globalAlpha=a*k;c.fillStyle=C.ink;c.beginPath();c.arc(mx,my,2.5,0,TAU);c.fill();c.strokeStyle='rgba(42,33,24,.5)';c.lineWidth=1;c.beginPath();c.moveTo(mx-6,my-3+Math.sin(t*40)*2);c.lineTo(mx,my);c.lineTo(mx+6,my-3-Math.sin(t*40)*2);c.stroke();c.globalAlpha=1;
  unfold(c,150,470,'alarms',['pain','itch'],sm(.08,.55,p),a,'#7a2a2a')},
 inside(c,p,t,a){photo(c,a);const k=sm(.05,.5,p);veil(c,a*.8*k);const bp=60/66,u=(t%bp)/bp,beat=Math.exp(-u*9);
  const bi=Math.floor(t/bp);if(bi!==lastBeat&&a>.5&&k>.5){thump();lastBeat=bi}
  const x=450,y=330,br=.5+.5*Math.sin(t*TAU/4.5);c.globalAlpha=a*k;c.fillStyle='#f1dcc0';c.beginPath();c.arc(x,y-150,34,0,TAU);c.fill();rr(c,x-62,y-110,124,250,40);c.fill();
  c.fillStyle='#e7b6a8';[-1,1].forEach(sd=>{c.beginPath();c.ellipse(x+sd*26,y-50,20+br*5,42+br*6,0,0,TAU);c.fill()});
  c.fillStyle=C.red;c.save();c.translate(x+6,y-38);c.scale(1+beat*.25,1+beat*.25);c.beginPath();c.moveTo(0,10);c.bezierCurveTo(-18,-4,-10,-18,0,-8);c.bezierCurveTo(10,-18,18,-4,0,10);c.fill();c.restore();
  c.fillStyle='#e0a35a';c.beginPath();c.ellipse(x-8,y+30,26,16,-.2,0,TAU);c.fill();c.fillStyle='#e9d36a';c.beginPath();c.ellipse(x,y+100,16,12+6*sm(.3,1,p),0,0,TAU);c.fill();c.globalAlpha=1;
  const L=[['heartbeat',x+6,y-38,610,190],['breathing',x-26,y-60,290,170],['hunger',x-8,y+30,280,330],['thirst',x,y-128,640,250],['full bladder',x,y+100,620,450]];
  const kk=sm(.08,.55,p);L.forEach(([n,ax,ay,lx,ly])=>{c.globalAlpha=a*kk*.6;c.strokeStyle=C.terra;c.lineWidth=1.5;c.beginPath();c.moveTo(ax,ay);c.lineTo(lx,ly);c.stroke();c.globalAlpha=1;label(c,lx,ly,n,C.terra,a*kk)})},
 time(c,p,t,a){photo(c,a);const k=sm(0,1,p);
  c.globalAlpha=a*(.15+.3*k);c.fillStyle='#5a3a6a';c.fillRect(0,0,W,470);c.globalAlpha=1;
  c.globalAlpha=a*.32;c.fillStyle='#4a3a5a';ARCH.forEach(([ax])=>{const sx=lerp(-60,-260,k);c.beginPath();c.moveTo(ax-90,474);c.lineTo(ax+90,474);c.lineTo(ax+90+sx,640);c.lineTo(ax-90+sx,640);c.fill()});c.globalAlpha=1;
  const cx0=450,cy0=250,r=phone?70:58;c.globalAlpha=a;c.fillStyle='rgba(255,250,239,.9)';c.beginPath();c.arc(cx0,cy0,r,0,TAU);c.fill();c.strokeStyle=C.soft;c.setLineDash([4,5]);c.lineWidth=2;c.beginPath();c.arc(cx0,cy0,r-8,0,TAU);c.stroke();c.setLineDash([]);
  c.fillStyle=C.saff;c.beginPath();c.moveTo(cx0,cy0);c.arc(cx0,cy0,r-8,-Math.PI/2,-Math.PI/2+TAU*((t*.08)%1));c.fill();c.globalAlpha=1;
  label(c,cx0,cy0+r+26,'how long? no organ, just brain timing',C.soft,a)},
 count(c,p,t,a){photo(c,a);veil(c,a*.82);const n=STARS.length;shown+=(n-shown)*.12;const m=Math.round(shown);
  const big=m>60,cols=big?24:Math.min(8,Math.max(3,Math.ceil(Math.sqrt(m*1.6)))),sz=big?14:Math.min(70,520/cols);
  const rows=Math.ceil(m/cols),x0=450-(cols-1)*sz/2,y0=Math.max(150,340-(rows-1)*sz/2);
  for(let i=0;i<m;i++){const col=STARS[Math.min(i,n-1)]||C.saff,x=x0+(i%cols)*sz,y=y0+Math.floor(i/cols)*sz;if(y>520)break;c.globalAlpha=a;c.fillStyle=col;star(c,x,y,sz*.42*(1+.05*Math.sin(t*3+i)))}c.globalAlpha=1;
  label(c,450,110,m+(m===1?' sense':' senses'),C.terra,a);
  const leg=MODE[mode]?MODE[mode].groups:FAM.map(f=>[f[0],f[2]]).concat(xs.debated?[['debated','#6b5b49']]:[]);const fs=phone?15:12;c.font=`600 ${fs}px ui-sans-serif,-apple-system,sans-serif`;c.textAlign='left';
  let lx=60,ly=phone?560:575;c.globalAlpha=a;for(const [nm,cl] of leg){const w=c.measureText(nm).width+fs*2;if(lx+w>840){lx=60;ly+=fs*1.7}c.fillStyle='rgba(255,250,239,.9)';rr(c,lx-4,ly-fs,w,fs*1.5,6);c.fill();c.fillStyle=cl;c.beginPath();c.arc(lx+fs*.4,ly-fs*.25,fs*.4,0,TAU);c.fill();c.fillStyle=C.ink;c.fillText(nm,lx+fs,ly);lx+=w+6}c.globalAlpha=1},
 end(c,p,t,a){photo(c,a);sunbeam(c,a,t);const spots=[[P.sun,'#fff2c0'],[P.jas,'#ffffff'],[P.tiles,'#cfe6f5'],[P.steps,'#e6d4ff'],[P.fount,'#bfe8f8'],[P.fruit,'#ffb0b0'],[P.thorn,'#ffc0a0'],[[450,330],'#ffd2c0']];
  spots.forEach(([pt,col],i)=>glow(c,pt[0],pt[1],60+12*Math.sin(t*1.5+i),col,a*.7*sm(.05,.5,p)));const[bx,by]=birdPos(t);c.globalAlpha=a;bird(c,bx,by,t);c.globalAlpha=1}
};
// ---- top bar: progress pips + lit counter
const LIT={light:4,warm:2,smell:1,touch:5,balance:2,body:2,hear:1,taste:5,chem:1,pain:2,inside:5};
const yrs=document.getElementById('years'),pips=[];steps.forEach((s,i)=>{if(i===0)return;const el=document.createElement('i');yrs.appendChild(el);pips.push([i,el])});
const cnt=document.getElementById('count');let lastCnt='';
// ---- scroll position
let F=0;function measure(){const c=scrollY+vh*(phone?.62:.5);const mids=steps.map(s=>s.offsetTop+s.offsetHeight/2);
 if(c<=mids[0])return 0;for(let i=0;i<mids.length-1;i++)if(c<mids[i+1])return i+(c-mids[i])/(mids[i+1]-mids[i]);return mids.length-1}
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
let t0=performance.now(),fps=[];window.__perf=fps;
function frameFn(now){requestAnimationFrame(frameFn);const t=(now-t0)/1000,Ft=measure();F+=(Ft-F)*(reduce?1:.14);if(Math.abs(Ft-F)<.0005)F=Ft;
 fps.push(now);if(fps.length>240)fps.shift();
 cx.setTransform(DPR,0,0,DPR,0,0);cx.fillStyle=C.cream;cx.fillRect(0,0,vw,vh);
 const i=Math.floor(F),fr=F-i,j=Math.min(keys.length-1,i+1);
 const p=Math.min(1,Math.max(0,.5+fr*.5)),blend=keys[j]!==keys[i]?sm(.55,1,fr):0;
 const ca=CAM[keys[i]],cb=CAM[keys[j]],mv=sm(.35,1,fr),cam=[lerp(ca[0],cb[0],mv),lerp(ca[1],cb[1],mv),lerp(ca[2],cb[2],mv)];
 const tilt=(k=>keys[i]===k?(1-blend):keys[j]===k?blend:0)('balance')*Math.sin(t*1.1)*.05;
 if(keys[i]!=='hear'&&keys[j]!=='hear')splashLevel(0);
 cx.save();cx.translate(OX,OY);cx.scale(S,S);
 cx.save();cx.shadowColor='rgba(120,80,20,.18)';cx.shadowBlur=40*S;cx.shadowOffsetY=12*S;framePath(cx);cx.fillStyle=C.cream;cx.fill();cx.restore();
 cx.save();framePath(cx);cx.clip();cx.save();applyCam(cx,cam,tilt);
 R[keys[i]](cx,p,t,1);if(blend>0)R[keys[j]](cx,blend*.5,t,blend);
 cx.restore();cx.restore();framePath(cx);cx.strokeStyle=C.saff;cx.lineWidth=3/S*1.2;cx.stroke();cx.restore();
 const rF=Math.round(F);pips.forEach(([k,el])=>{el.classList.toggle('on',k<=rF);el.classList.toggle('now',k===rF)});
 let n=0;for(let k=0;k<=rF&&k<keys.length;k++)n+=LIT[keys[k]]||0;const s=n+' lit'+(rF>=keys.indexOf('time')?' + 1 debated':'');if(s!==lastCnt){cnt.textContent=s;lastCnt=s}
}
requestAnimationFrame(frameFn);
})();
