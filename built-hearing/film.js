(()=>{'use strict';
const W=900,H=640,TAU=Math.PI*2;
const cv=document.getElementById('stage'),cx=cv.getContext('2d');
const steps=[...document.querySelectorAll('.step')],keys=steps.map(s=>s.dataset.s);
const C={soft:"#6b5b49",cream:'#fbf4e4',wall:'#f4e7cc',wall2:'#ead7b0',blue:'#1f5f8b',tile:'#2e74a6',saff:'#e09a1f',terra:'#b8553a',ink:'#2a2118',sky1:'#a9d8ee',sky2:'#fdf1d6',water:'#6fb9d8',green:'#5e8f4e'};
const sm=(a,b,x)=>{x=Math.min(1,Math.max(0,(x-a)/(b-a)));return x*x*(3-2*x)};
const lerp=(a,b,t)=>a+(b-a)*t;
function mk(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return c}
function arch(c,x,base,w,h){const x0=x-w/2,x1=x+w/2,ap=base-h,sp=base-h+w*.62;
 c.moveTo(x0,base);c.lineTo(x0,sp);c.bezierCurveTo(x0,sp-w*.32,x-w*.12,ap+w*.12,x,ap);
 c.bezierCurveTo(x+w*.12,ap+w*.12,x1,sp-w*.32,x1,sp);c.lineTo(x1,base);c.closePath()}
const ARCH=[[180,470,150,300],[450,470,230,390],[720,470,150,300]];
const FACE={x:720,y:338,r:17};
function star(c,x,y,r){c.beginPath();for(let i=0;i<16;i++){const a=i*TAU/16,rr=i%2?r*.45:r;c.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr)}c.closePath();c.fill()}
function drawScene(c,o={}){
 const fountain=o.fountain!==false;
 let g=c.createLinearGradient(0,0,0,470);g.addColorStop(0,C.sky1);g.addColorStop(1,C.sky2);c.fillStyle=g;c.fillRect(0,0,W,H);
 // distant garden + dome
 c.fillStyle='#8fb878';for(let i=0;i<18;i++){c.beginPath();c.arc(30+i*50,430+((i*37)%20),40+((i*13)%18),0,TAU);c.fill()}
 c.fillStyle='#f7e3b5';c.fillRect(395,260,110,140);
 g=c.createRadialGradient(430,190,10,450,230,90);g.addColorStop(0,'#fff3cf');g.addColorStop(1,'#e8b04a');c.fillStyle=g;
 c.beginPath();c.moveTo(380,262);c.bezierCurveTo(380,190,430,170,450,140);c.bezierCurveTo(470,170,520,190,520,262);c.fill();
 c.fillStyle=C.saff;c.fillRect(447,118,6,24);c.beginPath();c.arc(450,116,6,0,TAU);c.fill();
 c.fillStyle='#f2dcae';c.fillRect(300,200,16,230);c.fillRect(584,200,16,230);
 c.beginPath();c.moveTo(296,202);c.lineTo(308,170);c.lineTo(320,202);c.fill();c.beginPath();c.moveTo(580,202);c.lineTo(592,170);c.lineTo(604,202);c.fill();
 c.fillStyle='#6a9a5a';for(let i=0;i<7;i++){c.beginPath();c.arc(370+i*27,440,22,0,TAU);c.fill()}
 // jali in left arch
 c.save();c.beginPath();arch(c,...ARCH[0]);c.clip();c.fillStyle='#f6e6c4';c.fillRect(100,160,160,320);
 c.strokeStyle='#c99a55';c.lineWidth=3;for(let d=-400;d<400;d+=18){c.beginPath();c.moveTo(105+d,160);c.lineTo(105+d+320,480);c.stroke();c.beginPath();c.moveTo(255-d,160);c.lineTo(255-d-320,480);c.stroke()}
 c.fillStyle='#fdf6e6';for(let y=170;y<480;y+=18)for(let x=105;x<260;x+=18){c.beginPath();c.arc(x+((y/18)%2?9:0),y,2.2,0,TAU);c.fill()}
 c.restore();
 // wall with arches cut out
 c.beginPath();c.rect(0,30,W,440);ARCH.forEach(a=>arch(c,...a));
 g=c.createLinearGradient(0,30,0,470);g.addColorStop(0,'#f7ecd4');g.addColorStop(1,C.wall2);c.fillStyle=g;c.fill('evenodd');
 // spandrel tiles
 c.fillStyle='#cfe1ec';[[315,150],[585,150],[45,170],[855,170]].forEach(([x,y])=>{c.beginPath();c.arc(x,y,24,0,TAU);c.fill()});
 c.fillStyle=C.tile;[[315,150],[585,150],[45,170],[855,170]].forEach(([x,y])=>star(c,x,y,17));
 // arch trims
 ARCH.forEach(a=>{c.beginPath();arch(c,...a);c.strokeStyle=C.blue;c.lineWidth=10;c.stroke();c.beginPath();arch(c,a[0],a[1],a[2]+22,a[3]+14);c.strokeStyle=C.saff;c.lineWidth=3;c.stroke()});
 // frieze
 c.fillStyle=C.blue;c.fillRect(0,30,W,42);c.fillStyle=C.saff;c.fillRect(0,72,W,5);c.fillRect(0,26,W,4);
 c.fillStyle='#f5e2b0';for(let x=15;x<W;x+=30)star(c,x,51,11);
 c.fillStyle='#eadbbb';c.fillRect(0,0,W,26);
 // floor in perspective
 const VY=260,VX=450,top=470;
 c.fillStyle='#f3e6c9';c.fillRect(0,top,W,H-top);
 for(let r=0;r<9;r++){const z0=1+r*.55,z1=1+(r+1)*.55;const y0=top+(H-top)*(1-1/z0)*2.2,y1=top+(H-top)*(1-1/z1)*2.2;if(y0>H)break;
  for(let k=-14;k<14;k++){if((k+r)%2)continue;const xa=u=>VX+(u-VX)*((Math.min(y1,H+40)-VY)/(top-VY));
   const xs=k*70+VX,xe=xs+70;const s0=(y0-VY)/(top-VY),s1=(y1-VY)/(top-VY);
   c.beginPath();c.moveTo(VX+(xs-VX)*s0,y0);c.lineTo(VX+(xe-VX)*s0,y0);c.lineTo(VX+(xe-VX)*s1,y1);c.lineTo(VX+(xs-VX)*s1,y1);c.fillStyle=r%3==1?'#d9e7ee':'#bcd5e3';c.fill()}}
 c.fillStyle='rgba(224,154,31,.5)';c.fillRect(0,top,W,4);
 // plants
 [[300,472],[600,472]].forEach(([x,y])=>{c.fillStyle=C.green;[[0,-48,26],[-18,-34,18],[18,-34,18]].forEach(([a,b,r])=>{c.beginPath();c.arc(x+a,y+b,r,0,TAU);c.fill()});
  c.fillStyle=C.terra;c.beginPath();c.moveTo(x-22,y-22);c.lineTo(x+22,y-22);c.lineTo(x+16,y+8);c.lineTo(x-16,y+8);c.fill()});
 // fountain
 if(fountain){c.fillStyle=C.saff;c.beginPath();c.ellipse(450,555,150,34,0,0,TAU);c.fill();c.fillStyle=C.water;c.beginPath();c.ellipse(450,553,136,27,0,0,TAU);c.fill();
  c.fillStyle='#e9f6fb';c.beginPath();c.ellipse(450,550,60,10,0,0,TAU);c.fill();
  c.fillStyle='#d9a441';c.fillRect(442,500,16,50);c.fillStyle='#cfeaf5';c.beginPath();c.moveTo(450,470);c.quadraticCurveTo(420,490,415,540);c.lineTo(420,540);c.quadraticCurveTo(428,495,450,478);c.quadraticCurveTo(472,495,480,540);c.lineTo(485,540);c.quadraticCurveTo(480,490,450,470);c.fill()}
 // lanterns
 [[405,205],[495,205]].forEach(([x,y])=>{c.strokeStyle='#7a5a2a';c.lineWidth=1.5;c.beginPath();c.moveTo(x,90);c.lineTo(x,y-12);c.stroke();c.fillStyle='#b9893f';c.beginPath();c.moveTo(x,y-14);c.lineTo(x+9,y);c.lineTo(x,y+14);c.lineTo(x-9,y);c.fill()});
 // person in right arch
 const fx=FACE.x;c.fillStyle='#2f7d7a';c.beginPath();c.moveTo(fx-30,470);c.quadraticCurveTo(fx-30,372,fx,360);c.quadraticCurveTo(fx+30,372,fx+30,470);c.fill();
 c.fillStyle=C.saff;c.beginPath();c.moveTo(fx-12,368);c.lineTo(fx+12,368);c.lineTo(fx+4,470);c.lineTo(fx-4,470);c.fill();
 c.fillStyle='#b97c50';c.beginPath();c.arc(fx,FACE.y,FACE.r,0,TAU);c.fill();
 c.fillStyle=C.blue;c.beginPath();c.arc(fx,FACE.y-2,FACE.r+4,Math.PI*1.05,Math.PI*1.95);c.lineTo(fx+FACE.r+3,FACE.y+16);c.lineTo(fx+FACE.r-1,FACE.y+4);c.arc(fx,FACE.y,FACE.r-1,-.15,Math.PI+.15,true);c.lineTo(fx-FACE.r-3,FACE.y+16);c.closePath();c.fill();
 c.fillStyle=C.ink;c.beginPath();c.arc(fx-6,FACE.y+1,2,0,TAU);c.arc(fx+6,FACE.y+1,2,0,TAU);c.fill();
 c.strokeStyle='#7a4a2a';c.lineWidth=1.6;c.beginPath();c.arc(fx,FACE.y+6,5,.3,Math.PI-.3);c.stroke();
}
function bird(c,x,y,t,col){const f=Math.sin(t*14)*7;c.strokeStyle=col||C.ink;c.lineWidth=3;c.lineCap='round';c.beginPath();c.moveTo(x-14,y-f);c.quadraticCurveTo(x-6,y-4,x,y);c.quadraticCurveTo(x+6,y-4,x+14,y-f);c.stroke()}
const birdPos=t=>{const u=(t*0.09)%1.2;return [lerp(-40,W+40,u/1.2),150+Math.sin(u*9)*18]};
const DPR=Math.min(2,window.devicePixelRatio||1);
const SC=mk(W*2,H*2);{const c=SC.getContext('2d');c.scale(2,2);drawScene(c)}
let vw=0,vh=0,S=1,OX=0,OY=0,phone=false;
function layout(){vw=innerWidth;vh=innerHeight;cv.width=Math.round(vw*DPR);cv.height=Math.round(vh*DPR);cv.style.height=vh+'px';phone=vw<900;
 let rx,ry,rw,rh;if(phone){rx=8;ry=46;rw=vw-16;rh=vh*.5-46}else{rx=vw*.4;ry=60;rw=vw*.58;rh=vh-90}
 S=Math.min(rw/W,rh/(H+70));if(phone)S=Math.min(rw/W*1.06,rh/(H+60));OX=rx+rw/2-W*S/2;OY=ry+rh-H*S}
addEventListener('resize',layout);layout();
const framePath=c=>{c.beginPath();arch(c,W/2,H,W,H+60)};
const FS=()=>phone?24:18;
function photo(c,a){c.globalAlpha=a;c.drawImage(SC,0,0,W,H);c.globalAlpha=1}
function veil(c,a,col){c.globalAlpha=a;c.fillStyle=col||C.cream;c.fillRect(-20,-80,W+40,H+100);c.globalAlpha=1}
function glow(c,x,y,r,col,a){const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,col);g.addColorStop(1,'rgba(255,240,200,0)');c.globalAlpha=a;c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2);c.globalAlpha=1}
function label(c,x,y,txt,col,a=1){c.font=`600 ${FS()}px ui-sans-serif,-apple-system,sans-serif`;c.textAlign='center';const w=c.measureText(txt).width+22;c.globalAlpha=a;c.fillStyle='rgba(255,250,239,.94)';c.beginPath();c.roundRect?c.roundRect(x-w/2,y-17,w,32,16):c.rect(x-w/2,y-17,w,32);c.fill();c.fillStyle=col||C.ink;c.fillText(txt,x,y+6);c.globalAlpha=1}
function wave(c,x,y,w,fn,col,lw,a){c.globalAlpha=a;c.strokeStyle=col;c.lineWidth=lw;c.lineJoin='round';c.beginPath();for(let i=0;i<=w;i+=3){const v=fn(i/w);i?c.lineTo(x+i,y+v):c.moveTo(x+i,y+v)}c.stroke();c.globalAlpha=1}
function rings(c,x,y,t,col,a,n=3,sp=.6,r0=10,r1=160){for(let i=0;i<n;i++){const f=(t*sp+i/n)%1;c.globalAlpha=a*(1-f);c.strokeStyle=col;c.lineWidth=3;c.beginPath();c.arc(x,y,lerp(r0,r1,f),0,TAU);c.stroke()}c.globalAlpha=1}
function panel(c,a,x=40,y=110,w=820,h=500){c.globalAlpha=a*.93;c.fillStyle='#fffaf0';c.beginPath();c.roundRect?c.roundRect(x,y,w,h,26):c.rect(x,y,w,h);c.fill();c.globalAlpha=a;c.strokeStyle='#ecdcbc';c.lineWidth=2;c.stroke();c.globalAlpha=1}
const dot=(c,x,y,r,col,a=1)=>{c.globalAlpha=a;c.fillStyle=col;c.beginPath();c.arc(x,y,r,0,TAU);c.fill();c.globalAlpha=1};
const rr=(c,x,y,w,h,r,col,a=1)=>{c.globalAlpha=a;c.fillStyle=col;c.beginPath();c.roundRect?c.roundRect(x,y,w,h,r):c.rect(x,y,w,h);c.fill();c.globalAlpha=1};
// ---- audio (nothing plays until a Play button is pressed)
let AC=null,MASTER=null;const demo={key:null,t0:0};
function ensureAC(){if(!AC){AC=new (window.AudioContext||window.webkitAudioContext)();MASTER=AC.createGain();MASTER.gain.value=.5;MASTER.connect(AC.destination)}if(AC.state==='suspended')AC.resume();return AC}
function tone(f,at,d,o={}){const t=AC.currentTime+at,os=AC.createOscillator(),g=AC.createGain();os.type=o.type||'sine';os.frequency.setValueAtTime(f,t);if(o.f2)os.frequency.exponentialRampToValueAtTime(o.f2,t+d);
 const v=o.vol==null?.25:o.vol;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.012);g.gain.setValueAtTime(v,t+Math.max(.013,d-.04));g.gain.linearRampToValueAtTime(0,t+d);
 let node=os.connect(g);if(o.pan!=null&&AC.createStereoPanner){const p=AC.createStereoPanner();p.pan.value=o.pan;g.connect(p);node=p}node.connect(MASTER);os.start(t);os.stop(t+d+.05)}
let NB=null;function noise(at,d,o={}){if(!NB){NB=AC.createBuffer(1,AC.sampleRate*2,AC.sampleRate);const x=NB.getChannelData(0);let b=0;for(let i=0;i<x.length;i++){b=.97*b+.03*(Math.random()*2-1);x[i]=b*6}}
 const t=AC.currentTime+at,s=AC.createBufferSource();s.buffer=NB;s.loop=true;const f=AC.createBiquadFilter();f.type='bandpass';f.frequency.value=o.f||1200;f.Q.value=o.q||.7;const g=AC.createGain();const v=o.vol||.3;
 g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.3);g.gain.setValueAtTime(v,t+d-.4);g.gain.linearRampToValueAtTime(0,t+d);
 if(o.am){const l=AC.createOscillator(),lg=AC.createGain();l.frequency.value=o.am;lg.gain.value=v*.9;l.connect(lg).connect(g.gain);g.gain.setValueAtTime(v*.5,t+.3);l.start(t);l.stop(t+d)}
 s.connect(f).connect(g).connect(MASTER);s.start(t);s.stop(t+d+.1)}
const DEMOS={
 courtyard(){noise(0,4,{f:1800,q:.5,vol:.25});[0,.5,1.1,1.5,2.2].forEach((a,i)=>tone([220,247,262,247,220][i],a+.4,.38,{type:'triangle',vol:.08}));return 4},
 helm(){const h=[1,2,3,4,5,6];h.forEach(k=>tone(196*k,0,1.4,{vol:.22/k}));h.forEach((k,i)=>tone(196*k,1.8+i*.55,.5,{vol:.18/Math.sqrt(k)}));h.forEach(k=>tone(196*k,5.4,1.4,{vol:.22/k}));return 7},
 sweep(){tone(80,0,4,{f2:8000,vol:.12});return 4},
 cochlea(){[131,262,523,1047,2093].forEach((f,i)=>tone(f,i*.6,.5,{vol:.18,type:'triangle'}));return 3.2},
 cherry(){const A=[392,440,494,523,494,440,392,330],B=[262,247,220,196,220,247,262,294];for(let r=0;r<2;r++)A.forEach((f,i)=>{tone(f,r*3.2+i*.4,.34,{pan:-.9,vol:.16,type:'triangle'});tone(B[i]*1.5,r*3.2+i*.4+.2,.3,{pan:.9,vol:.1,type:'square'})});return 6.4},
 stream(){let t=0,i=0;while(t<9){const gap=lerp(.22,.075,Math.min(1,t/6));const ph=i%4;if(ph===0||ph===2)tone(500,t,gap*.8,{vol:.18});if(ph===1)tone(800,t,gap*.8,{vol:.15});t+=gap;i++}return 9},
 pattern(){let s=7;const r=()=>(s=(s*16807)%2147483647)/2147483647;const cyc=[...Array(8)].map(()=>300+Math.floor(r()*12)*80);let t=0;for(let i=0;i<40;i++){tone(300+Math.floor(r()*12)*80,t,.045,{vol:.15});t+=.06}for(let k=0;k<6;k++)cyc.forEach(f=>{tone(f,t,.045,{vol:.15});t+=.06});return t},
 odd(){for(let r=0;r<3;r++)for(let i=0;i<6;i++)tone(i===4&&r!==0?1320:880,r*2.1+i*.33,.1,{vol:.18});return 6.3},
 rhythm(){noise(0,3.5,{f:900,q:.6,vol:.3,am:5});noise(4,3.5,{f:500,q:.6,vol:.3,am:2});return 7.6},
 pavlov(){[0,1.6,3.2].forEach(a=>tone(1000,a+.15,.5,{vol:.05}));return 8},
 steps(){for(let i=0;i<12;i++){const off=i===7?.21:0;tone(i===7?260:180,i*.45+off,.05,{type:'square',vol:.12})}return 5.6}
};
document.querySelectorAll('button[data-demo]').forEach(b=>b.addEventListener('click',()=>{ensureAC();const k=b.dataset.demo;const d=DEMOS[k]();demo.key=k;demo.t0=performance.now()/1000;demo.d=d;b.classList.add('on');b.textContent='Playing…';setTimeout(()=>{b.classList.remove('on');b.textContent=b.dataset.label},d*1000)}));
document.querySelectorAll('button[data-demo]').forEach(b=>b.dataset.label=b.textContent);
const playing=k=>demo.key===k&&performance.now()/1000-demo.t0<demo.d;
const dt=()=>performance.now()/1000-demo.t0;
// tap the cochlea strip to hear a place
const STRIP={x0:110,x1:790,y:330};const posOf=f=>Math.log(20000/f)/Math.log(1000),fOf=u=>20000/Math.pow(1000,u);
let tapF=null,tapT=-9,curKey='';
cv.addEventListener('pointerdown',e=>{if(curKey!=='cochlea')return;const x=(e.clientX-OX)/S,y=(e.clientY-OY)/S;if(x>STRIP.x0&&x<STRIP.x1&&Math.abs(y-STRIP.y)<90){const u=(x-STRIP.x0)/(STRIP.x1-STRIP.x0);tapF=fOf(u);tapT=performance.now()/1000;ensureAC();tone(Math.min(12000,Math.max(40,tapF)),0,.6,{vol:.15})}});
// ---- shared visuals
const LAD=[['ear',C.saff],['brainstem',C.terra],['midbrain',C.blue],['thalamus','#2e8a8c'],['hearing area','#84487a']];
function ladder(c,a,t,o={}){const x=o.x||450,y0=550,gap=100;c.globalAlpha=a;c.strokeStyle='#d9c7a3';c.lineWidth=6;c.lineCap='round';c.beginPath();c.moveTo(x,y0);c.lineTo(x,y0-gap*4);c.stroke();c.globalAlpha=1;
 for(let k=0;k<4;k++){const f=(t*.7+k/4)%1;dot(c,x,y0-f*gap*4,7,C.saff,a*Math.sin(f*Math.PI))}
 LAD.forEach(([n,col],i)=>{const y=y0-i*gap,s=o.flag?o.flag(i):0;if(s>0){glow(c,x,y,40+s*70,'rgba(184,85,58,.8)',a*Math.min(1,s));}
  dot(c,x,y,18+(s||0)*10,col,a);dot(c,x,y,8,'#fffaf0',a);label(c,x+(i%2?-125:125),y,n,col,a)})}
function earDiagram(c,a,t,p){panel(c,a);const k=p;
 // canal
 rr(c,90,300,230,70,30,'#f1dcc0',a);label(c,190,265,'ear canal',C.ink,a);
 // sound waves in canal
 for(let i=0;i<4;i++){const f=(t*.8+i/4)%1;c.globalAlpha=a*(1-f);c.strokeStyle=C.blue;c.lineWidth=3;c.beginPath();c.arc(60+f*270,335,30,-.8,.8);c.stroke()}c.globalAlpha=1;
 const v=Math.sin(t*14)*4;
 c.globalAlpha=a;c.fillStyle=C.saff;c.beginPath();c.ellipse(330+v,335,10,62,0,0,TAU);c.fill();c.globalAlpha=1;label(c,330,230,'eardrum',C.terra,a);
 // ossicles
 const bones=[[380,320,22,C.terra],[440,300,18,'#c27a3a'],[500,330,14,C.blue]];c.globalAlpha=a;c.strokeStyle='#8b6a44';c.lineWidth=8;c.beginPath();c.moveTo(338+v,325);bones.forEach(([x,y])=>c.lineTo(x+v*.7,y));c.lineTo(530+v*.4,340);c.stroke();c.globalAlpha=1;
 bones.forEach(([x,y,r,col])=>dot(c,x+v*.7,y,r,col,a));label(c,440,420,'three tiny bones',C.ink,a);
 // cochlea spiral
 c.globalAlpha=a;c.strokeStyle='#2e8a8c';c.lineWidth=14;c.lineCap='round';c.beginPath();for(let i=0;i<=200;i++){const th=i/200*TAU*2.4,r=80-i*.33;const x=650+Math.cos(th+Math.PI)*r,y=330+Math.sin(th+Math.PI)*r;i?c.lineTo(x,y):c.moveTo(x,y)}c.stroke();c.globalAlpha=1;
 label(c,650,450,'cochlea (fluid-filled snail)',C.blue,a);
 if(k>.4)label(c,450,560,'pressure boosted almost 200×',C.terra,a*sm(.4,.6,k))}
function strip(c,a,t,f){panel(c,a);const {x0,x1,y}=STRIP;
 for(let i=0;i<34;i++){const u=i/34,x=lerp(x0,x1,u),w=(x1-x0)/34,h=lerp(24,70,u);rr(c,x+1,y-h/2,w-2,h,4,i%2?'#f3e2bf':'#fbefd6',a);}
 const pk=f?posOf(f):null;if(pk!=null){const px=lerp(x0,x1,pk);c.globalAlpha=a;c.fillStyle='rgba(224,154,31,.55)';c.beginPath();for(let i=0;i<=200;i++){const u=i/200,x=lerp(x0,x1,u);const env=u<pk?Math.exp(-(pk-u)*6)*(u/Math.max(pk,.01)):Math.exp(-(u-pk)*60);const yy=y-90*env*Math.abs(Math.sin(u*80-t*12))-4;i?c.lineTo(x,yy):c.moveTo(x,yy)}c.lineTo(x1,y);c.lineTo(x0,y);c.fill();c.globalAlpha=1;glow(c,px,y,60,'rgba(224,154,31,.9)',a);label(c,px,y+80,Math.round(f)+' Hz',C.terra,a)}
 label(c,x0+105,y-90,'base: high notes',C.blue,a);label(c,x1-95,y-90,'tip: low notes',C.terra,a);
 label(c,450,180,'the cochlea, unrolled',C.ink,a);if(!phone)label(c,450,560,'tap or click the strip to play that spot',C.soft||'#6b5b49',a)}
const LAMP=[450,200];
// ---- stops
const R={
 title(c,p,t,a){photo(c,a);rings(c,450,520,t,'#ffffff',a*.9,3,.5,20,200);rings(c,FACE.x,FACE.y+8,t+.3,C.saff,a*.8,3,.6,20,120);label(c,450,610,'every sound here starts as a wobble in the air',C.ink,a*sm(.3,.6,p))},
 helm(c,p,t,a){photo(c,a);veil(c,a*.85);const sp=sm(.15,.7,p);
  if(sp<1)wave(c,100,330,700,u=>{let y=0;for(let h=1;h<=4;h++)y+=Math.sin(u*h*TAU*3-t*4*h)/h;return y*55*(1-sp)},C.ink,4,a*(1-sp));
  [1,2,3,4].forEach((h,i)=>{const yy=lerp(330,200+i*95,sp),cols=[C.blue,'#2e8a8c',C.saff,C.terra];if(sp>0){wave(c,100,yy,700,u=>Math.sin(u*h*TAU*3-t*4*h)*30/Math.sqrt(h),cols[i],3.5,a*sp);if(sp>.7)label(c,90,yy-28,['1×','2×','3×','4×'][i],cols[i],a*sp)}});
  label(c,450,140,sp<.5?'one note…':'…is a stack of simple tones',C.ink,a)},
 ear(c,p,t,a){photo(c,a);earDiagram(c,a*sm(0,.25,p+.2),t,p)},
 cochlea(c,p,t,a){photo(c,a);const pl=playing('cochlea');let f=null;if(performance.now()/1000-tapT<1.5)f=tapF;else if(pl){const i=Math.min(4,Math.floor(dt()/.6));f=[131,262,523,1047,2093][i]}else f=fOf((Math.sin(t*.5)*.5+.5)*.9+.05);strip(c,a,t,f);
  label(c,450,470,'tiny hair cells along the strip turn shaking into signals',C.ink,a*sm(.3,.6,p))},
 path(c,p,t,a){photo(c,a);veil(c,a*.9);ladder(c,a,t,{x:450})},
 cotton(c,p,t,a){photo(c,a);const see=sm(.25,.75,p);veil(c,a*.55*(1-see),'#2a2118');c.save();c.beginPath();c.arc(FACE.x,FACE.y+10,70,0,TAU);c.clip();photo(c,a*see);c.restore();
  if(see>0){c.globalAlpha=a*see;c.strokeStyle=C.saff;c.lineWidth=4;c.beginPath();c.arc(FACE.x,FACE.y,40+3*Math.sin(t*8),0,TAU);c.stroke();c.globalAlpha=1}
  const W2='CAN YOU HEAR ME?';c.font=`700 ${phone?40:32}px ui-sans-serif,-apple-system,sans-serif`;c.textAlign='center';let s=Math.floor(t*8);rr(c,180,540,540,70,20,'#fffaf0',a*.94);
  [...W2].forEach((ch,i)=>{s=(s*16807+i*31)%2147483647;const lost=ch!==' '&&(s%100)/100<.6*(1-see);c.globalAlpha=a;c.fillStyle=lost?'#bba98c':C.ink;c.fillText(lost?'·':ch,210+i*32.5,588)});c.globalAlpha=1;
  label(c,FACE.x,FACE.y-70,see<.5?'face hidden':'watching the lips',see<.5?C.ink:C.terra,a)},
 cherry(c,p,t,a){photo(c,a);veil(c,a*.82);const pl=playing('cherry');
  const head=(x,y)=>{dot(c,x,y,70,'#e8c9a4',a);dot(c,x-72,y,16,'#d8b48c',a);dot(c,x+72,y,16,'#d8b48c',a)};head(450,330);
  for(let i=0;i<5;i++){const f=(t*.9+i/5)%1;c.globalAlpha=a*(1-f);c.strokeStyle=C.blue;c.lineWidth=4;c.beginPath();c.arc(378-f*240,330,20+f*30,Math.PI*.7,Math.PI*1.3);c.stroke();c.globalAlpha=a*(1-f)*.35;c.strokeStyle=C.terra;c.beginPath();c.arc(522+f*240,330,20+f*30,-Math.PI*.3,Math.PI*.3);c.stroke()}c.globalAlpha=1;
  label(c,170,220,'voice 1: followed',C.blue,a);label(c,730,220,'voice 2: tuned out',C.terra,a*.7);glow(c,300,330,90,'rgba(31,95,139,.35)',a);
  if(pl)label(c,450,560,'tune in the left ear, a buzzier one in the right',C.ink,a)},
 cat(c,p,t,a){photo(c,a);panel(c,a);const u=(Math.sin(t*.6)*.5+.5);const x=lerp(150,750,u);rr(c,150,320,600,14,7,'#e7d6b4',a);
  c.globalAlpha=a;const g=c.createLinearGradient(150,0,750,0);g.addColorStop(0,C.blue);g.addColorStop(1,C.terra);c.fillStyle=g;c.fillRect(150,322,600,10);c.globalAlpha=1;dot(c,x,327,20,C.ink,a);
  label(c,450,250,'the sound slides smoothly…',C.ink,a);const B=u<.5;rr(c,230,400,170,110,20,B?C.blue:'#efe3cb',a);rr(c,500,400,170,110,20,!B?C.terra:'#efe3cb',a);
  c.font=`700 ${phone?48:42}px ui-sans-serif,-apple-system,sans-serif`;c.textAlign='center';c.globalAlpha=a;c.fillStyle=B?'#fff':'#a8977a';c.fillText('"ba"',315,470);c.fillStyle=!B?'#fff':'#a8977a';c.fillText('"da"',585,470);c.globalAlpha=1;
  label(c,450,570,'…but you hear one box or the other',C.terra,a)},
 treis(c,p,t,a){photo(c,a);veil(c,a*.82);const words=['the','fox','ran','over','the','hill'],side=['sun','dog','FOX','pen','map','cup'];const i=Math.floor(t*1.2)%6;
  label(c,250,180,'attended ear',C.blue,a);label(c,650,180,'other ear',C.terra,a);
  words.forEach((w,k)=>label(c,250,240+k*55,w,k===i?C.blue:'#9a8a70',a*(k===i?1:.5)));
  side.forEach((w,k)=>{const name=w==='FOX';label(c,650,240+k*55,name?'fox (fits the story)':w,name?C.terra:'#b8a88c',a*(name?1:.28))});
  label(c,450,600,'turned down, not off (example words)',C.ink,a)},
 baby(c,p,t,a){photo(c,a);panel(c,a);const sp=sm(.2,.7,p);wave(c,120,260,660,u=>Math.sin(u*60-t*3)*30*Math.sin(u*Math.PI*6+.3)**2,C.ink,3,a);
  ['ba','da','ma','pa','ga','na'].forEach((s,i)=>{const x=lerp(175,725,i/5);rr(c,x-45,400,90,70,16,[C.blue,'#2e8a8c',C.saff,C.terra,'#84487a',C.blue][i],a*sp);c.font=`700 ${phone?34:28}px ui-sans-serif,sans-serif`;c.textAlign='center';c.globalAlpha=a*sp;c.fillStyle='#fff';c.fillText(s,x,445);c.globalAlpha=1});
  label(c,450,190,'a flow of speech',C.ink,a);label(c,450,540,'sorted into separate sounds (example syllables)',C.terra,a*sp)},
 stream(c,p,t,a){photo(c,a);panel(c,a);const sp=sm(.3,.8,p),pl=playing('stream');const step=.2;const n=24;
  for(let i=0;i<n;i++){const ph=i%4;if(ph===3)continue;const x=120+i*28,hi=ph===1,y=hi?lerp(300,260,sp):lerp(360,420,sp);const lit=Math.floor(t/step)%n===i;rr(c,x,y-9,22,18,6,hi?C.terra:C.blue,a*(lit?1:.6))}
  if(sp<.5){c.globalAlpha=a*(1-sp*2);c.strokeStyle='#9a8a70';c.lineWidth=2;c.beginPath();for(let i=0;i<n;i++){const ph=i%4;if(ph===3)continue;const x=131+i*28,y=ph===1?300:360;i?c.lineTo(x,y):c.moveTo(x,y)}c.stroke();c.globalAlpha=1}
  label(c,450,190,sp<.5?'one galloping stream':'two separate streams',C.ink,a);label(c,450,540,'the brain groups sounds that belong together',C.terra,a*sp)},
 grow(c,p,t,a){photo(c,a);panel(c,a);rr(c,120,330,660,24,12,'#e9dcc2',a);const gap=[260,380];
  rr(c,120,330,gap[0]-120,24,12,C.blue,a);rr(c,gap[1],330,780-gap[1],24,12,C.blue,a);c.globalAlpha=a;c.setLineDash([6,6]);c.strokeStyle=C.terra;c.lineWidth=3;c.strokeRect(gap[0],325,gap[1]-gap[0],34);c.setLineDash([]);c.globalAlpha=1;
  label(c,320,280,'short hearing loss',C.terra,a);label(c,150,400,'young',C.ink,a);label(c,750,400,'grown up',C.ink,a);
  for(let i=0;i<5;i++)dot(c,430+i*75,450,9,C.terra,a*sm(.2+i*.1,.4+i*.1,p));label(c,580,500,'hearing back, but the problems last',C.terra,a*sm(.4,.7,p))},
 pattern(c,p,t,a){photo(c,a);panel(c,a);const pl=playing('pattern');const sw=pl?dt()>2.4:(t%6)>3;let s=Math.floor(t*16);
  for(let i=0;i<28;i++){let y;if(sw){y=[0,5,2,9,4,7,1,6][i%8]}else{s=(s*16807+i)%2147483647;y=s%10}rr(c,120+i*24,440-y*24,18,14,5,sw?C.blue:'#b8a88c',a)}
  label(c,450,190,sw?'a hidden pattern repeats':'random beeps',sw?C.blue:C.ink,a);label(c,450,540,'brains tracked how predictable each beep was',C.terra,a*sm(.3,.6,p))},
 surprise(c,p,t,a){photo(c,a);veil(c,a*.9);const odd=(t%2.1)>1.32&&(t%2.1)<1.7;const g=sm(.35,.8,p);
  for(let i=0;i<6;i++){const on=Math.floor((t%2.1)/.33)===i;rr(c,350+i*34,598,24,24,6,i===4?C.terra:C.blue,a*(on?1:.35))}
  ladder(c,a,t,{x:450,flag:i=>i===0?0:odd?(g>0?(i/4)*(.4+g*.8):(i===4?1:0)):0});
  },
 rhythm(c,p,t,a){photo(c,a);panel(c,a);const s5=.5+.5*Math.sin(t*TAU*5),s2=.5+.5*Math.sin(t*TAU*2);
  dot(c,280,340,40+30*s5,C.blue,a*.9);dot(c,620,340,40+30*s2,C.saff,a*.9);label(c,280,460,'speech: about 5 beats a second',C.blue,a);label(c,620,460,'music: about 2',C.terra,a);label(c,450,190,'the pulse of sound',C.ink,a)},
 pavlov(c,p,t,a){photo(c,a);veil(c,a*.45,'#2a2118');const cyc=t%1.6,on=cyc<.8,learn=p<.55;const[lx,ly]=LAMP;
  if(on){glow(c,lx,ly,110,'rgba(255,214,120,1)',a);dot(c,lx,ly,16,'#fff4c8',a)}else dot(c,lx,ly,12,'#8a6a3a',a);
  if(on){c.globalAlpha=a;c.setLineDash(learn?[]:[6,8]);c.strokeStyle=learn?C.saff:'#fff4c8';c.lineWidth=3;for(let k=1;k<4;k++){c.beginPath();c.arc(lx,ly,30+k*28+cyc*40,0,TAU);c.stroke()}c.setLineDash([]);c.globalAlpha=1}
  label(c,450,560,learn?'light + faint tone, again and again':'light alone… some still heard the tone',learn?C.ink:C.terra,a)},
 meet(c,p,t,a){photo(c,a);const pull=sm(.2,.7,p);const sx=lerp(450,FACE.x,pull),sy=lerp(520,FACE.y+10,pull);rings(c,sx,sy,t,C.saff,a,3,.7,10,110);
  label(c,sx,sy+110,pull<.5?'where the sound really is':'where you hear it: pulled by what you see',C.terra,a);
  label(c,FACE.x,FACE.y-70,'moving lips',C.ink,a*pull)},
 music(c,p,t,a){photo(c,a);panel(c,a);const sp=sm(.25,.8,p);for(let i=0;i<8;i++)for(let j=0;j<5;j++){const x=150+i*30,y=240+j*30,v=.5+.5*Math.sin(t*3+i*.7+j);dot(c,x,y,7,C.blue,a*(.3+.7*v))}
  label(c,255,420,'sensors on the brain',C.blue,a);c.globalAlpha=a;c.strokeStyle=C.saff;c.lineWidth=3;c.beginPath();c.moveTo(380,300);c.lineTo(470,300);c.stroke();c.globalAlpha=1;
  wave(c,500,300,320,u=>Math.sin(u*30-t*4)*30*Math.sin(u*Math.PI)*(sp)+Math.sin(u*90+t*9)*12*(1-sp),C.terra,3,a);label(c,660,420,sp>.5?'music rebuilt':'noisy at first',C.terra,a)},
 ladder2(c,p,t,a){photo(c,a);panel(c,a);const rows=[['next sound','"…ca"',C.blue],['next word','"…cat"','#2e8a8c'],['next phrase','"…sat on the mat"',C.saff],['where the story goes','"…and fell asleep"',C.terra]];
  rows.forEach(([n,g,col],i)=>{const y=520-i*95,on=sm(.02+i*.1,.15+i*.1,p);rr(c,140,y-28,lerp(120,620,(i+1)/4),56,18,col,a*(.25+.75*on));label(c,140+lerp(120,620,(i+1)/4)/2,y,n+' '+g,'#2a2118',a*on)});
  label(c,450,140,'predictions stacked like a ladder (example guesses)',C.ink,a)},
 steps(c,p,t,a){photo(c,a);panel(c,a);const per=.45;for(let i=0;i<12;i++){const x=120+i*55,odd=i===7;rr(c,x,odd?385:400,30,16,8,'#b8a88c',a);
   dot(c,x+15+(odd?22:0),340,odd?13:9,odd?C.terra:C.blue,a)}
  label(c,450,260,'clicks (dots) vs steps (feet)',C.ink,a);const flag=(t%5.4)/per|0;glow(c,120+7*55+37,340,70,'rgba(184,85,58,.8)',a*(.5+.5*Math.sin(t*6)));label(c,527,470,'out of step: flagged!',C.terra,a)},
 end(c,p,t,a){R.title(c,p,t,a)}
};
// ---- years bar
const yrs=document.getElementById('years');const yIdx=[];steps.forEach((s,i)=>{if(s.dataset.y){const el=document.createElement('i');el.title=s.dataset.y;yrs.appendChild(el);yIdx.push([i,el])}});
let F=0;function measure(){const c=scrollY+vh*(phone?.62:.5);const mids=steps.map(s=>s.offsetTop+s.offsetHeight/2);
 if(c<=mids[0])return 0;for(let i=0;i<mids.length-1;i++)if(c<mids[i+1])return i+(c-mids[i])/(mids[i+1]-mids[i]);return mids.length-1}
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;const t0=performance.now(),fps=[];window.__perf=fps;
function frameFn(now){requestAnimationFrame(frameFn);const t=(now-t0)/1000,Ft=measure();F+=(Ft-F)*(reduce?1:.14);if(Math.abs(Ft-F)<.0005)F=Ft;fps.push(now);if(fps.length>240)fps.shift();
 cx.setTransform(DPR,0,0,DPR,0,0);cx.fillStyle=C.cream;cx.fillRect(0,0,vw,vh);
 const i=Math.floor(F),fr=F-i,j=Math.min(keys.length-1,i+1);const p=Math.min(1,Math.max(0,.5+fr*.5)),blend=keys[j]!==keys[i]?sm(.55,1,fr):0;curKey=keys[blend>.5?j:i];
 cx.save();cx.translate(OX,OY);cx.scale(S,S);cx.save();cx.shadowColor='rgba(120,80,20,.18)';cx.shadowBlur=40*S;cx.shadowOffsetY=12*S;framePath(cx);cx.fillStyle=C.cream;cx.fill();cx.restore();
 cx.save();framePath(cx);cx.clip();R[keys[i]](cx,p,t,1);if(blend>0)R[keys[j]](cx,blend*.5,t,blend);cx.restore();framePath(cx);cx.strokeStyle=C.saff;cx.lineWidth=3.6/S;cx.stroke();cx.restore();
 yIdx.forEach(([k,el])=>{el.classList.toggle('on',k<=Math.round(F));el.classList.toggle('now',k===Math.round(F))})}
requestAnimationFrame(frameFn);
})();
