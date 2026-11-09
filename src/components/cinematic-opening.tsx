'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { openingSession, openingStorage } from '@/lib/opening-session';
/** Opposing shutters reveal the hero; skip, reduced motion and a timeout release the page. */
export function CinematicOpening({paused}:{paused:boolean}){
 const root=useRef<HTMLDivElement>(null),finish=useRef<()=>void>(()=>{});
 const [done,setDone]=useState(false);
 useEffect(()=>{
  const node=root.current;if(!node)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let finished=false,timeline:gsap.core.Timeline|undefined;
  const old=document.body.style.overflow;
  const complete=()=>{
   if(finished)return;finished=true;timeline?.kill();
   openingSession.remember(openingStorage());
   document.documentElement.dataset.majarraOpening='done';document.body.style.overflow=old;
   setDone(true);window.dispatchEvent(new Event('majarra:opening-complete'));
  };
  finish.current=complete;
  if(openingSession.hasSeen(openingStorage())||paused||reduced.matches){complete();return}
  document.documentElement.dataset.majarraOpening='pending';
  document.body.style.overflow='hidden';node.style.animation='none';
  const context=gsap.context(()=>{
   timeline=gsap.timeline({onComplete:complete})
    .fromTo('.co-opening-mark',{opacity:0,filter:'blur(22px)'},{opacity:1,filter:'blur(0px)',duration:.85,ease:'power2.out'},.1)
    .fromTo('.co-opening-signature',{opacity:0},{opacity:1,duration:.4},.35)
    .to('.co-opening-seam',{opacity:1,duration:.3},.8)
    .to('.co-opening>button',{opacity:0,duration:.15},1.1)
    .call(()=>window.dispatchEvent(new Event('majarra:opening-reveal')),[],1.15)
    .to('.co-opening-left',{yPercent:-101,duration:1.2,ease:'power3.inOut'},1.15)
    .to('.co-opening-right',{yPercent:101,duration:1.2,ease:'power3.inOut'},1.15)
    .to('.co-opening-seam',{opacity:0,duration:.2},1.15);
  },node);
  const timeout=setTimeout(complete,3600);
  const escape=(event:KeyboardEvent)=>{if(event.key==='Escape')complete()};
  const preference=()=>{if(reduced.matches)complete()};
  window.addEventListener('keydown',escape);reduced.addEventListener('change',preference);
  return()=>{clearTimeout(timeout);context.revert();window.removeEventListener('keydown',escape);reduced.removeEventListener('change',preference);document.body.style.overflow=old};
 },[paused]);
 if(done)return null;
 return <div ref={root} className="co-opening">
  {(['left','right'] as const).map(side=><div key={side} className={`co-opening-panel co-opening-${side}`} aria-hidden="true"><div className="co-opening-panel-content"><span className="co-opening-mark">مجرّة</span><span className="co-opening-signature">مجرّة</span></div></div>)}
  <span className="co-opening-seam" aria-hidden="true"/>
  <button onClick={()=>finish.current()}>تخطّ المقدمة ↖</button>
 </div>;
}
