(()=>{'use strict';
const W=900,H=640,TAU=Math.PI*2;
const cv=document.getElementById('stage'),cx=cv.getContext('2d');
const steps=[...document.querySelectorAll('.step')],keys=steps.map(s=>s.dataset.s);
const C={cream:'#fbf4e4',wall:'#f4e7cc',wall2:'#ead7b0',blue:'#1f5f8b',tile:'#2e74a6',saff:'#e09a1f',terra:'#b8553a',ink:'#2a2118',sky1:'#a9d8ee',sky2:'#fdf1d6',water:'#6fb9d8',green:'#5e8f4e'};
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
// ---- prerender
const DPR=Math.min(2,window.devicePixelRatio||1);
const SC=mk(W*2,H*2),SN=mk(W*2,H*2);{let c=SC.getContext('2d');c.scale(2,2);drawScene(c);c=SN.getContext('2d');c.scale(2,2);drawScene(c,{fountain:false})}
const LW=450,LH=320,LO=mk(LW,LH);const lc=LO.getContext('2d',{willReadFrequently:true});lc.drawImage(SC,0,0,LW,LH);
const px=lc.getImageData(0,0,LW,LH).data;
const lum=new Float32Array(LW*LH);for(let i=0;i<LW*LH;i++)lum[i]=.3*px[i*4]+.59*px[i*4+1]+.11*px[i*4+2];
const PAL=[[31,95,139],[46,138,140],[94,143,78],[224,154,31],[184,85,58],[132,72,120]];
const hue=a=>{const u=(a/Math.PI)*PAL.length,i=Math.floor(u)%PAL.length,f=u-Math.floor(u),A=PAL[i],B=PAL[(i+1)%PAL.length];const q=k=>Math.round((A[k]+(B[k]-A[k])*f)/16)*16;return `rgb(${q(0)},${q(1)},${q(2)})`};
const EDGES=[];
for(let y=3;y<LH-3;y+=4)for(let x=3;x<LW-3;x+=4){let gx=0,gy=0;
 for(let j=-1;j<=1;j++)for(let i=-1;i<=1;i++){const v=lum[(y+j)*LW+x+i];gx+=v*i*(j?1:2);gy+=v*j*(i?1:2)}
 const m=Math.hypot(gx,gy);if(m>38){let a=Math.atan2(gy,gx)+Math.PI/2;a=((a%Math.PI)+Math.PI)%Math.PI;EDGES.push({x:x*2,y:y*2,a,m:Math.min(1,m/260),col:hue(a)})}}
EDGES.sort((p,q)=>p.col<q.col?-1:1);
const DOTS=[];{let s=1;const rnd=()=>(s=(s*16807)%2147483647)/2147483647;
 for(let y=1;y<LH;y+=3)for(let x=1;x<LW;x+=3){const dx=(x*2-450)/450,dy=(y*2-320)/320,d=Math.exp(-(dx*dx+dy*dy)*2.2);if(rnd()>.18+.82*d)continue;
  const i=(y*LW+x)*4;const q=v=>Math.round(v/24)*24;DOTS.push({x:x*2,y:y*2,c:`rgb(${q(px[i])},${q(px[i+1])},${q(px[i+2])})`,s:2.4+3.4*(1-d)})}
 DOTS.sort((p,q)=>p.c<q.c?-1:1)}
// pinwheel orientation map
const PW=mk(120,86);{const c=PW.getContext('2d'),im=c.createImageData(120,86);const ks=[...Array(9)].map((_,j)=>{const a=j*Math.PI/9;return[Math.cos(a)*.42,Math.sin(a)*.42,j*2.1]});
 for(let y=0;y<86;y++)for(let x=0;x<120;x++){let re=0,imv=0;ks.forEach(([kx,ky,ph])=>{const v=kx*x+ky*y+ph;re+=Math.cos(v);imv+=Math.sin(v)});let a=Math.atan2(imv,re)/2;a=(a+Math.PI)%Math.PI;
  const m=hue(a).match(/\d+/g).map(Number);const [r,g,b]=m.map(v=>Math.round(v*.55+255*.45));const i=(y*120+x)*4;im.data[i]=r;im.data[i+1]=g;im.data[i+2]=b;im.data[i+3]=255}c.putImageData(im,0,0)}
function hsl2rgb(h,s,l){const f=n=>{const k=(n+h*12)%12,a=s*Math.min(l,1-l);return Math.round(255*(l-a*Math.max(-1,Math.min(k-3,9-k,1))))};return[f(0),f(8),f(4)]}
const TINY=mk(W,H),tc=TINY.getContext('2d');
// ---- layout
let vw=0,vh=0,S=1,OX=0,OY=0,phone=false,frame=null;
function layout(){vw=innerWidth;vh=innerHeight;cv.width=Math.round(vw*DPR);cv.height=Math.round(vh*DPR);cv.style.height=vh+'px';phone=vw<900;
 let rx,ry,rw,rh;if(phone){rx=8;ry=46;rw=vw-16;rh=vh*.5-46}else{rx=vw*.4;ry=60;rw=vw*.58;rh=vh-90}
 S=Math.min(rw/W,rh/(H+70));if(phone)S=Math.min(rw/W*1.18,rh/(H+60));OX=rx+rw/2-W*S/2;OY=ry+rh-H*S}
addEventListener('resize',layout);layout();
const framePath=c=>{c.beginPath();arch(c,W/2,H,W,H+60)};
// ---- helpers (world coords)
function photo(c,a,img){c.globalAlpha=a;c.drawImage(img||SC,0,0,W,H);c.globalAlpha=1}
function veil(c,a,col){c.globalAlpha=a;c.fillStyle=col||C.cream;c.fillRect(-20,-80,W+40,H+100);c.globalAlpha=1}
function dots(c,a,fn){if(a<=0)return;c.globalAlpha=a;let last='';for(const d of DOTS){if(d.c!==last){c.fillStyle=last=d.c}const k=fn?fn(d):1;if(k<=0)continue;const s=d.s*k;c.fillRect(d.x-s/2,d.y-s/2,s,s)}c.globalAlpha=1}
function edges(c,a,o={}){if(a<=0)return;c.lineWidth=o.lw||2.6;c.lineCap='round';let last='';c.globalAlpha=a;
 for(const e of EDGES){const col=o.col||e.col;if(col!==last){if(last)c.stroke();c.strokeStyle=last=col;c.beginPath()}const L=(o.len||10)*(.5+e.m*.6),dx=Math.cos(e.a)*L,dy=Math.sin(e.a)*L,ox=o.dx||0;c.moveTo(e.x-dx+ox,e.y-dy);c.lineTo(e.x+dx+ox,e.y+dy)}
 if(last)c.stroke();c.globalAlpha=1}
function glow(c,x,y,r,col,a){const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,col);g.addColorStop(1,'rgba(255,240,200,0)');c.globalAlpha=a;c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2);c.globalAlpha=1}
function sunbeam(c,a,t){c.globalAlpha=a*(.55+.08*Math.sin(t*.7));const g=c.createLinearGradient(80,-60,560,640);g.addColorStop(0,'rgba(255,236,170,.9)');g.addColorStop(1,'rgba(255,236,170,0)');c.fillStyle=g;c.beginPath();c.moveTo(40,-60);c.lineTo(240,-60);c.lineTo(640,640);c.lineTo(330,640);c.fill();c.globalAlpha=1}
function label(c,x,y,txt,col){c.font=`600 ${phone?22:17}px ui-sans-serif,-apple-system,sans-serif`;c.textAlign='center';const w=c.measureText(txt).width+20;c.fillStyle='rgba(255,250,239,.92)';c.beginPath();c.roundRect?c.roundRect(x-w/2,y-16,w,30,15):c.rect(x-w/2,y-16,w,30);c.fill();c.fillStyle=col||C.ink;c.fillText(txt,x,y+5)}
// ---- sound
let AC=null,soundOn=false;const btn=document.getElementById('snd');
btn.onclick=()=>{soundOn=!soundOn;if(soundOn&&!AC){AC=new (window.AudioContext||window.webkitAudioContext)()}if(AC&&AC.state==='suspended')AC.resume();btn.textContent=soundOn?'Sound on':'Sound off';btn.setAttribute('aria-pressed',soundOn)};
function click(v){if(!soundOn||!AC)return;const n=AC.createBuffer(1,220,AC.sampleRate),d=n.getChannelData(0);for(let i=0;i<220;i++)d[i]=(Math.random()*2-1)*Math.exp(-i/30);const s=AC.createBufferSource();s.buffer=n;const g=AC.createGain();g.gain.value=v||.25;s.connect(g).connect(AC.destination);s.start()}
function thump(){if(!soundOn||!AC)return;const o=AC.createOscillator(),g=AC.createGain();o.frequency.setValueAtTime(70,AC.currentTime);o.frequency.exponentialRampToValueAtTime(40,AC.currentTime+.15);g.gain.setValueAtTime(.35,AC.currentTime);g.gain.exponentialRampToValueAtTime(.001,AC.currentTime+.25);o.connect(g).connect(AC.destination);o.start();o.stop(AC.currentTime+.3)}
// pointer for spotlight
let ptr=null,ptrT=0;addEventListener('pointermove',e=>{if(e.pointerType==='mouse'){ptr=[(e.clientX-OX)/S,(e.clientY-OY)/S];ptrT=performance.now()}});
// ---- stops
let lastPhi=-1,lastBeat=-1,lastFire=0;
const R={
 title(c,p,t,a){photo(c,a);sunbeam(c,a,t);const[bx,by]=birdPos(t);c.globalAlpha=a;bird(c,bx,by,t);c.globalAlpha=1},
 weber(c,p,t,a){photo(c,a);veil(c,.62*a);const sep=150*(1-sm(.1,.85,p)),y=300;c.globalAlpha=a;
  if(sep>16){glow(c,450-sep/2,y,40,'rgba(224,154,31,.95)',a);glow(c,450+sep/2,y,40,'rgba(224,154,31,.95)',a);label(c,450,y+70,'feels like 2 points',C.terra)}
  else{glow(c,450,y,58,'rgba(31,95,139,.9)',a);label(c,450,y+70,'feels like 1 point',C.blue)}
  c.globalAlpha=a;c.strokeStyle=C.ink;c.lineWidth=2;c.setLineDash([4,6]);c.beginPath();c.moveTo(450-sep/2,y-60);c.lineTo(450-sep/2,y-16);c.moveTo(450+sep/2,y-60);c.lineTo(450+sep/2,y-16);c.stroke();c.setLineDash([]);c.globalAlpha=1},
 helm(c,p,t,a){const r=lerp(.012,1,Math.pow(sm(.05,.9,p),2.2));const w=Math.max(4,Math.round(W*r)),h=Math.max(3,Math.round(H*r));tc.clearRect(0,0,W,H);tc.imageSmoothingEnabled=true;tc.drawImage(SC,0,0,w,h);c.globalAlpha=a;c.imageSmoothingEnabled=true;c.drawImage(TINY,0,0,w,h,0,0,W,H);c.globalAlpha=1;
  if(p<.6)label(c,450,320,'clues…','#7a4a00')},
 phi(c,p,t,a){photo(c,a);veil(c,.35*a,'#2a2118');const u=(t%0.62)/0.62;const A=u<.38,B=u>.48&&u<.86;
  [[405,205,A],[495,205,B]].forEach(([x,y,on])=>{if(on){glow(c,x,y,70,'rgba(255,214,120,1)',a);c.globalAlpha=a;c.fillStyle='#fff4c8';c.beginPath();c.arc(x,y,11,0,TAU);c.fill();c.globalAlpha=1}});
  const ph=A?0:B?1:-1;if(ph!==lastPhi&&ph>=0&&a>.5)click(.12);lastPhi=ph},
 eye(c,p,t,a){const k=sm(.05,.5,p);photo(c,a*(1-k));c.globalAlpha=a*k;c.fillStyle=C.cream;c.fillRect(0,0,W,H);c.globalAlpha=1;dots(c,a*k);
  if(p>.35){c.globalAlpha=a*sm(.35,.6,p)*.9;c.strokeStyle=C.blue;c.lineWidth=2;c.setLineDash([5,7]);c.beginPath();c.arc(450,320,120,0,TAU);c.stroke();c.setLineDash([]);c.globalAlpha=1;label(c,450,470,'fovea: packed tight',C.blue)}},
 spike(c,p,t,a){c.globalAlpha=a;c.fillStyle=C.cream;c.fillRect(0,0,W,H);c.globalAlpha=1;dots(c,a*.16);const[bx,by]=birdPos(t),[px2,py2]=birdPos(t-.12);
  c.globalAlpha=a;c.fillStyle=C.saff;let n=0;for(const d of DOTS){const r1=Math.hypot(d.x-bx,d.y-by),r2=Math.hypot(d.x-px2,d.y-py2);if(r1<34||r2<34){n++;c.fillStyle=r1<34?C.saff:C.blue;c.fillRect(d.x-4,d.y-4,8,8)}}
  // spontaneous on/off
  const seed=Math.floor(t*10);for(let i=0;i<40;i++){const d=DOTS[(seed*7919+i*104729)%DOTS.length];c.fillStyle=i%2?C.saff:C.blue;c.fillRect(d.x-3,d.y-3,6,6)}c.globalAlpha=1;
  if(n&&t-lastFire>.05&&a>.5){click(.06);lastFire=t}label(c,450,600,'flashes = spikes, only where something changes',C.terra)},
 blind(c,p,t,a){c.globalAlpha=a;c.fillStyle=C.cream;c.fillRect(0,0,W,H);c.globalAlpha=1;const k=sm(.3,.85,p),bx=610,by=260,br=70;
  dots(c,a,d=>{const r=Math.hypot(d.x-bx,d.y-by);return r<br*(1-k)?0:1});
  if(k<1){c.globalAlpha=a*(1-k);c.strokeStyle=C.terra;c.lineWidth=2;c.setLineDash([4,5]);c.beginPath();c.arc(bx,by,br,0,TAU);c.stroke();c.setLineDash([]);c.globalAlpha=1;label(c,bx,by+br+28,'blind spot',C.terra)}
  else label(c,bx,by+br+28,'filled in by the brain',C.blue)},
 edges(c,p,t,a){const k=sm(0,.35,p);c.globalAlpha=a;c.fillStyle=C.cream;c.fillRect(0,0,W,H);c.globalAlpha=1;dots(c,a*(1-k)*.8);edges(c,a*k)},
 bino(c,p,t,a){c.globalAlpha=a;c.fillStyle=C.cream;c.fillRect(0,0,W,H);const d=46*(1-sm(.15,.8,p));if(d>1){edges(c,a*.55,{col:C.terra,dx:-d});edges(c,a*.55,{col:C.blue,dx:d});edges(c,a*sm(.6,.9,p))}else edges(c,a);
  if(d>1){label(c,200,600,'left eye',C.terra);label(c,700,600,'right eye',C.blue)}else label(c,450,600,'one view',C.ink)},
 cols(c,p,t,a){c.globalAlpha=a;c.fillStyle=C.cream;c.fillRect(0,0,W,H);const k=sm(.05,.4,p)*(1-sm(.75,1,p)*.5);c.globalAlpha=a*k*.75;c.imageSmoothingEnabled=true;c.drawImage(PW,0,0,W,H);c.globalAlpha=1;edges(c,a*(1-k*.55));
  if(k>.4)label(c,450,600,'each colour = one angle (illustration)',C.ink)},
 glue(c,p,t,a){c.globalAlpha=a;c.fillStyle=C.cream;c.fillRect(0,0,W,H);c.globalAlpha=1;
  c.save();c.globalAlpha=a*.42;c.drawImage(SC,26,18,W,H);c.restore();edges(c,a*.8,{col:'#5b4a38',lw:2});
  let sx,sy;if(ptr&&performance.now()-ptrT<4000){[sx,sy]=ptr}else{sx=450+Math.sin(t*.6)*270;sy=320+Math.sin(t*.9)*150}
  const r=phone?150:120;c.save();c.beginPath();c.arc(sx,sy,r,0,TAU);c.clip();photo(c,a);c.restore();
  c.globalAlpha=a;c.strokeStyle=C.saff;c.lineWidth=4;c.beginPath();c.arc(sx,sy,r,0,TAU);c.stroke();c.globalAlpha=1;label(c,sx,sy+r+26,'attention',C.terra)},
 face(c,p,t,a){photo(c,a);veil(c,a*.62*sm(0,.4,p));c.save();c.beginPath();c.arc(FACE.x,FACE.y+20,60,0,TAU);c.clip();photo(c,a);c.restore();
  const pulse=.5+.5*Math.sin(t*3);c.globalAlpha=a*sm(0,.4,p);c.strokeStyle=C.saff;c.lineWidth=3+pulse*3;c.beginPath();c.arc(FACE.x,FACE.y,FACE.r+16+pulse*6,0,TAU);c.stroke();c.globalAlpha=1;
  if(p>.2)label(c,FACE.x,FACE.y-62,'face!',C.terra)},
 predict(c,p,t,a){photo(c,a);const k=sm(.1,.55,p);veil(c,a*.86*k);edges(c,a*k*.18,{col:'#8b7a62',lw:1.5});
  const[bx,by]=birdPos(t);glow(c,bx,by,60,'rgba(224,154,31,.9)',a*(.3+.7*k));c.globalAlpha=a;bird(c,bx,by,t,k>.5?C.terra:C.ink);c.globalAlpha=1;
  if(k>.5){label(c,450,420,'predicted: nothing new to report',C.soft||'#6b5b49');label(c,Math.min(780,Math.max(120,bx)),by+50,'surprise!',C.terra)}},
 hidden(c,p,t,a){photo(c,a);const k=sm(.05,.3,p),g=sm(.35,.9,p);const x=600,y=290,w=280,h=290;
  c.globalAlpha=a*k;c.fillStyle='#d8ccb6';c.fillRect(x,y,w,h);c.globalAlpha=1;
  c.save();c.beginPath();c.rect(x,y,w,h);c.clip();edges(c,a*k*g*.7,{lw:2});c.restore();
  c.globalAlpha=a*k;c.strokeStyle='#8b7a62';c.lineWidth=2;c.strokeRect(x,y,w,h);c.globalAlpha=1;
  if(k>.5)label(c,x+w/2,y-26,g>.3?'filled in from context':'hidden',C.blue)},
 mice(c,p,t,a){const k=sm(.15,.5,p);photo(c,a*(1-k));photo(c,a*k,SN);
  if(k>.6){const pu=.5+.5*Math.sin(t*7);c.globalAlpha=a*(k-.6)*2.5;c.strokeStyle=C.terra;c.lineWidth=3;c.setLineDash([6,6]);c.beginPath();c.ellipse(450,540,150,40,0,0,TAU);c.stroke();c.setLineDash([]);c.globalAlpha=1;glow(c,450,530,120+pu*30,'rgba(184,85,58,.75)',a*(k-.5)*2);label(c,450,610,'expected it here: surprise!',C.terra)}},
 hand(c,p,t,a){photo(c,a);veil(c,a*.55);
  const handF=(x,col,al)=>{c.globalAlpha=a*al;c.fillStyle=col;c.beginPath();c.roundRect?c.roundRect(x-42,470,84,90,24):c.rect(x-42,470,84,90);c.fill();
   [-30,-10,10,30].forEach((o,i)=>{c.beginPath();c.roundRect?c.roundRect(x+o-8,400+(i==0||i==3?18:0),16,90,8):c.rect(x+o-8,400,16,90);c.fill()});
   c.beginPath();c.roundRect?c.roundRect(x+36,470,48,18,9):c.rect(x+36,470,48,18);c.fill();c.globalAlpha=1};
  const k=sm(.2,.85,p);handF(300,'#d9a77d',1);handF(600,'#b97c50',1-k*.6);
  c.globalAlpha=a;c.fillStyle='#e8dcc4';c.fillRect(436,360,28,240);c.globalAlpha=1;
  const s=(t*1.1)%1,by=410+s*120;[300,600].forEach(x=>{c.globalAlpha=a;c.strokeStyle=C.saff;c.lineWidth=7;c.lineCap='round';c.beginPath();c.moveTo(x-10,by-30);c.lineTo(x+4,by);c.stroke();c.globalAlpha=1});
  label(c,300,640-10,'rubber hand (seen)',C.ink);label(c,600,640-10,'your hidden hand',C.ink);
  if(k>.5){glow(c,300,470,110,'rgba(224,154,31,.7)',a*(k-.5)*1.6);label(c,300,370,'"mine?"',C.terra)}},
 heart(c,p,t,a){const bp=60/66,u=(t%bp)/bp,beat=Math.exp(-u*9)+.5*Math.exp(-Math.max(0,u-.18)*11)*(u>.18);photo(c,a);
  c.globalAlpha=a*(.12+.22*beat);const g=c.createRadialGradient(450,320,120,450,320,560);g.addColorStop(0,'rgba(184,85,58,0)');g.addColorStop(1,'rgba(184,85,58,1)');c.fillStyle=g;c.fillRect(0,0,W,H);c.globalAlpha=1;
  const bi=Math.floor(t/bp);if(bi!==lastBeat&&a>.5){thump();lastBeat=bi}
  c.globalAlpha=a;c.fillStyle='rgba(255,250,239,.88)';c.fillRect(60,560,780,60);c.strokeStyle=C.terra;c.lineWidth=2.5;c.beginPath();
  for(let x=0;x<=760;x+=4){const tt=t-(760-x)/320,v=(tt%bp)/bp;const y=v>.1&&v<.13?-24:v>.13&&v<.16?14:v>.3&&v<.4?-5*Math.sin((v-.3)*31):0;x?c.lineTo(70+x,590+y):c.moveTo(70+x,590+y)}c.stroke();c.globalAlpha=1},
 stack(c,p,t,a){c.globalAlpha=a;c.fillStyle=C.cream;c.fillRect(-60,-120,W+120,H+200);c.globalAlpha=1;
  const L=[['dots',cc=>dots(cc,1)],['edges',cc=>{cc.fillStyle='#fffaf0';cc.fillRect(0,0,W,H);edges(cc,1)}],['colour + things',cc=>photo(cc,1)],['guesses',cc=>{photo(cc,1);veil(cc,.7);const[bx,by]=birdPos(t);bird(cc,bx,by,t,C.terra)}]];
  const sp=lerp(0,105,sm(.05,.5,p));L.forEach(([name,fn],i)=>{c.save();const yy=H*.86-i*sp;c.translate(480,yy);c.transform(1,0,-.55,.45,0,0);c.scale(.52,.52);c.translate(-W/2,-H/2);
   c.globalAlpha=a;c.beginPath();c.rect(0,0,W,H);c.clip();fn(c);c.globalAlpha=a;c.strokeStyle=C.saff;c.lineWidth=5;c.strokeRect(0,0,W,H);c.restore();c.globalAlpha=1;
   if(sp>60){c.globalAlpha=a;label(c,phone?150:130,yy+8,name,C.ink)}});
  if(sp>60){for(let j=0;j<5;j++){const v=((t*.5+j/5)%1);c.globalAlpha=a*Math.sin(v*Math.PI);c.fillStyle=C.saff;c.beginPath();const y1=H*.86-v*sp*3;c.moveTo(770,y1-12);c.lineTo(782,y1+4);c.lineTo(758,y1+4);c.fill();
   c.fillStyle=C.blue;const y2=H*.86-sp*3+v*sp*3;c.beginPath();c.moveTo(810,y2+12);c.lineTo(822,y2-4);c.lineTo(798,y2-4);c.fill()}c.globalAlpha=1;label(c,700,H*.86+62,'signals ↑  guesses ↓',C.ink)}},
 end(c,p,t,a){R.title(c,p,t,a)}
};
// probe cell (screen coords)
function probe(t,a){const r=phone?40:58,x=Math.min(OX+W*S,vw)-r-14,y=OY+H*S-r-14;const ang=(t*0.9)%Math.PI,pref=Math.PI/2,d=Math.abs(ang-pref),rate=Math.exp(-(d*d)/(0.16*0.16));
 cx.globalAlpha=a;cx.fillStyle='rgba(255,250,239,.95)';cx.strokeStyle='#d9c7a3';cx.lineWidth=1.5;cx.beginPath();cx.arc(x,y,r,0,TAU);cx.fill();cx.stroke();
 cx.strokeStyle=rate>.5?C.saff:C.ink;cx.lineWidth=5;cx.lineCap='round';cx.beginPath();cx.moveTo(x-Math.cos(ang)*r*.6,y-Math.sin(ang)*r*.6);cx.lineTo(x+Math.cos(ang)*r*.6,y+Math.sin(ang)*r*.6);cx.stroke();
 if(Math.random()<rate*.9){cx.fillStyle=C.terra;cx.beginPath();cx.arc(x,y,r+4,0,TAU);cx.lineWidth=3;cx.strokeStyle=C.terra;cx.stroke();if(a>.5)click(.3)}
 cx.font=`600 ${phone?11:13}px ui-sans-serif,-apple-system,sans-serif`;cx.textAlign='center';cx.fillStyle=C.ink;cx.fillText(rate>.5?'cell firing!':'cell quiet',x,y-r-8);cx.globalAlpha=1}
// ---- years bar
const yrs=document.getElementById('years');const yIdx=[];steps.forEach((s,i)=>{if(s.dataset.y){const el=document.createElement('i');el.title=s.dataset.y;yrs.appendChild(el);yIdx.push([i,el])}});
// ---- scroll position
let F=0,Ft=0;function measure(){const c=scrollY+vh*(phone?.62:.5);const mids=steps.map(s=>s.offsetTop+s.offsetHeight/2);
 if(c<=mids[0])return 0;for(let i=0;i<mids.length-1;i++)if(c<mids[i+1])return i+(c-mids[i])/(mids[i+1]-mids[i]);return mids.length-1}
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
let t0=performance.now(),fps=[];window.__perf=fps;
function frameFn(now){requestAnimationFrame(frameFn);const t=(now-t0)/1000;Ft=measure();F+= (Ft-F)*(reduce?1:.14);if(Math.abs(Ft-F)<.0005)F=Ft;
 fps.push(now);if(fps.length>240)fps.shift();
 cx.setTransform(DPR,0,0,DPR,0,0);cx.fillStyle=C.cream;cx.fillRect(0,0,vw,vh);
 const i=Math.floor(F),fr=F-i,j=Math.min(keys.length-1,i+1);
 // local progress: spans from previous mid to next mid; p in 0..1 across own section
 const p=Math.min(1,Math.max(0,.5+fr*.5)),blend=keys[j]!==keys[i]?sm(.55,1,fr):0;
 cx.save();cx.translate(OX,OY);cx.scale(S,S);
 // soft shadow + frame
 cx.save();cx.shadowColor='rgba(120,80,20,.18)';cx.shadowBlur=40*S;cx.shadowOffsetY=12*S;framePath(cx);cx.fillStyle=C.cream;cx.fill();cx.restore();
 cx.save();framePath(cx);cx.clip();
 R[keys[i]](cx,p,t,1);if(blend>0)R[keys[j]](cx,blend*.5,t,blend);
 cx.restore();framePath(cx);cx.strokeStyle=C.saff;cx.lineWidth=3/S*1.2;cx.stroke();cx.restore();
 const ei=keys.indexOf('edges');const pa=(keys[i]==='edges'?(1-blend):0)+(keys[j]==='edges'?blend:0);if(pa>.02)probe(t,pa);
 yIdx.forEach(([k,el])=>{el.classList.toggle('on',k<=Math.round(F));el.classList.toggle('now',k===Math.round(F))});
}
requestAnimationFrame(frameFn);
})();
