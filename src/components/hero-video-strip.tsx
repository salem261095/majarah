'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { EditorialVideo } from './editorial-video';
import { heroFilms } from '@/lib/home-media';
/** Two identical sets make a seamless loop; only the visible films play. */
export function HeroVideoStrip({paused}:{paused:boolean}){
 const root=useRef<HTMLDivElement>(null),track=useRef<HTMLDivElement>(null);
 const pausedState=useRef(paused),sync=useRef<()=>void>(()=>{});
 useEffect(()=>{
  const box=root.current,node=track.current;if(!box||!node)return;
  const media=gsap.matchMedia();let visible=false;
  media.add('(prefers-reduced-motion: no-preference)',()=>{
   const motion=gsap.to(node,{xPercent:-50,duration:66,repeat:-1,ease:'none',paused:true,onUpdate:()=>window.dispatchEvent(new Event('majarra:media-frame'))});
   const update=()=>{if(visible&&!pausedState.current&&!document.hidden)motion.play();else motion.pause()};sync.current=update;
   const observer=new IntersectionObserver(entries=>{visible=entries.some(entry=>entry.isIntersecting);update()});observer.observe(box);
   document.addEventListener('visibilitychange',update);
   return()=>{observer.disconnect();document.removeEventListener('visibilitychange',update);sync.current=()=>{}};
  });
  return()=>media.revert();
 },[]);
 useEffect(()=>{pausedState.current=paused;sync.current()},[paused]);
 return <div ref={root} className="rh-video-strip" dir="ltr" data-video-viewport aria-hidden="true"><div ref={track} className="rh-portrait-track">{[0,1].map(copy=><div className="rh-portrait-set" key={copy}>{heroFilms.map(name=><div className="rh-portrait-tile" key={name}><EditorialVideo mode="loop" name={name} group="hero-portraits" label="" paused={paused}/></div>)}</div>)}</div></div>;
}
