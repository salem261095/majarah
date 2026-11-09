'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
/** Restore the original nineteen-line orbital field over the hero films. */
export function HeroOrbits({paused}:{paused:boolean}){
 const root=useRef<HTMLDivElement>(null),field=useRef<SVGGElement>(null);
 const pausedState=useRef(paused),sync=useRef<()=>void>(()=>{});
 useEffect(()=>{
  const box=root.current,rings=field.current;if(!box||!rings)return;
  const media=gsap.matchMedia();let visible=false;
  media.add('(prefers-reduced-motion: no-preference)',()=>{
   const motion=gsap.to(rings,{rotation:9,scale:1.1,xPercent:3,transformOrigin:'50% 50%',duration:16,repeat:-1,yoyo:true,ease:'sine.inOut',paused:true});
   const update=()=>{if(visible&&!pausedState.current&&!document.hidden)motion.play();else motion.pause()};sync.current=update;
   const observer=new IntersectionObserver(entries=>{visible=entries.some(entry=>entry.isIntersecting);update()});observer.observe(box);
   document.addEventListener('visibilitychange',update);
   return()=>{observer.disconnect();document.removeEventListener('visibilitychange',update);sync.current=()=>{}};
  });
  return()=>media.revert();
 },[]);
 useEffect(()=>{pausedState.current=paused;sync.current()},[paused]);
 return <div ref={root} className="rh-abstract" aria-hidden="true"><svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice"><g ref={field} className="rh-field" fill="none" stroke="currentColor">{Array.from({length:19},(_,i)=><ellipse key={i} cx="800" cy="500" rx={120+i*42} ry={70+i*28} transform={`rotate(${i*5} 800 500)`}/>)}</g></svg></div>;
}
