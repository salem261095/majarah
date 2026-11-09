'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EditorialVideo } from './editorial-video';
import type { VideoDirectory } from '@/lib/assets';
type Media={name:string;landscape:{name:string;directory:VideoDirectory}};
export function CreativeServiceVideos({media,label,index,paused}:{media:Media;label:string;index:number;paused:boolean}){
 const root=useRef<HTMLDivElement>(null),pausedState=useRef(paused),sync=useRef<()=>void>(()=>{});
 useEffect(()=>{
  const row=root.current;if(!row)return;gsap.registerPlugin(ScrollTrigger);const conditions=gsap.matchMedia();
  conditions.add({all:'(min-width:0px)',mobile:'(max-width:760px)',reduced:'(prefers-reduced-motion:reduce)'},context=>{
   if(context.conditions?.reduced)return;
   const frames=Array.from(row.children) as HTMLElement[];
   const entrance=gsap.fromTo(frames,{x:context.conditions?.mobile?-40:-100,opacity:.12},{x:0,opacity:1,duration:1,stagger:.14,ease:'power2.out',scrollTrigger:{trigger:row,start:'top 98%',end:'top 58%',scrub:.55}});
   const colors=frames.map(frame=>gsap.timeline({scrollTrigger:{trigger:frame,start:'top bottom',end:'bottom top',scrub:.4}})
    .fromTo(frame,{'--service-gray':1},{'--service-gray':0,duration:.22,ease:'none'},0)
    .to(frame,{'--service-gray':0,duration:.56,ease:'none'},.22)
    .to(frame,{'--service-gray':1,duration:.22,ease:'none'},.78));
   const update=()=>[entrance,...colors].forEach(animation=>{if(pausedState.current)animation.scrollTrigger?.disable(false);else animation.scrollTrigger?.enable(false)});
   sync.current=update;update();return()=>{sync.current=()=>{}};
  },row);
  return()=>conditions.revert();
 },[]);
 useEffect(()=>{pausedState.current=paused;sync.current()},[paused]);
 return <div ref={root} className="ni-service-visuals"><div className="ni-service-film"><EditorialVideo name={media.name} group={`creative-service-${index}`} label={label} paused={paused}/></div><div className="ni-service-landscape"><EditorialVideo name={media.landscape.name} directory={media.landscape.directory} group={`creative-service-${index}`} label={`مشهد بصري — ${label}`} paused={paused}/></div></div>;
}
