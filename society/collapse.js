// Large title collapses into the glass bar on scroll.
(function(){const bar=document.querySelector('.bar'),big=document.querySelector('.large');if(!bar)return;
function on(){const y=window.scrollY||0;bar.classList.toggle('glass',y>8);document.body.classList.toggle('scrolled',y>8);if(big){const k=Math.min(1,y/60);big.style.opacity=String(1-k);big.style.transform='scale('+(1-.06*k)+')'}}
addEventListener('scroll',on,{passive:true});on()})();
