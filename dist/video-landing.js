(() => {
const hero=document.querySelector('.surgery-landing');if(!hero)return;
const video=hero.querySelector('video'),button=hero.querySelector('button');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');let userPaused=reduced.matches,inView=true;
function label(){const paused=video.paused;button.setAttribute('aria-label',paused?'Fon videosunu oynat':'Fon videosunu dayandır');button.title=button.getAttribute('aria-label');button.innerHTML=paused?'<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="m8 5 11 7-11 7z"/></svg>':'<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M7 5h3v14H7zm7 0h3v14h-3z"/></svg>';}
function sync(){if(userPaused||document.hidden||!inView||document.querySelector('.intro-screen'))video.pause();else video.play().catch(label);label();}
video.muted=true;video.loop=true;video.addEventListener('play',label);video.addEventListener('pause',label);
button.addEventListener('click',()=>{userPaused=!video.paused;sync();});
new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;sync();},{threshold:.05}).observe(hero);
const introObserver=new MutationObserver(sync);introObserver.observe(document.body,{childList:true});
document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',()=>{userPaused=reduced.matches;sync();});sync();
})();