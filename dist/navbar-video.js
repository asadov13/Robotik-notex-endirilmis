(() => {
 const video=document.querySelector('.navbar-logo-video'); if(!video)return;
 video.muted=true; video.loop=true;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const play=()=>{if(!reduced.matches)video.play().catch(()=>{});};
 // Start after the entry animation and repeat continuously.
 let timer;
 const observer=new MutationObserver(()=>{if(!document.querySelector('.intro-screen')){clearTimeout(timer);timer=setTimeout(()=>{observer.disconnect();play();},80);}});
 observer.observe(document.body,{childList:true});
 timer=setTimeout(()=>{if(!document.querySelector('.intro-screen')){observer.disconnect();play();}},150);
 reduced.addEventListener('change',()=>{if(reduced.matches){video.pause();video.currentTime=0;}else play();});
})();