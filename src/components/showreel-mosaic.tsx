'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EditorialVideo } from './editorial-video';
import { getVideoAsset } from '@/lib/assets';
import { reelTiles } from '@/lib/home-media';
/** The reel is the scroll experience itself: a full-screen film recedes into nine live tiles. */
export function ShowreelMosaic({paused}:{paused:boolean}){
 const story=useRef<HTMLElement>(null),grid=useRef<HTMLDivElement>(null),title=useRef<HTMLHeadingElement>(null);
 const pausedState=useRef(paused),sync=useRef<()=>void>(()=>{});
 useEffect(()=>{
  const section=story.current,mosaic=grid.current,heading=title.current;if(!section||!mosaic||!heading)return;
  gsap.registerPlugin(ScrollTrigger);
  const media=gsap.matchMedia();
  media.add({all:'(min-width:0px)',desktop:'(min-width:761px)',reduced:'(prefers-reduced-motion:reduce)'},context=>{
   if(context.conditions?.reduced)return;
   gsap.set(mosaic,{x:0,y:0,xPercent:-50,yPercent:-50,scale:1});
   const timeline=gsap.timeline({onUpdate:()=>window.dispatchEvent(new Event('majarra:media-frame')),scrollTrigger:{trigger:section,start:'top top',end:'bottom bottom',scrub:.65,invalidateOnRefresh:true}});
   timeline.to(mosaic,{scale:1,duration:.12,ease:'none'},0)
    .to(mosaic,{scale:context.conditions?.desktop?.43:.52,duration:.76,ease:'power2.inOut'},.12)
    .to(heading,{opacity:0,filter:'blur(8px)',duration:.25,ease:'none'},.2)
    .to(mosaic,{duration:.12},.88);
   const update=()=>{if(pausedState.current)timeline.scrollTrigger?.disable(false);else timeline.scrollTrigger?.enable(false)};
   sync.current=update;update();
   return()=>{sync.current=()=>{}};
  },section);
  return()=>media.revert();
 },[]);
 useEffect(()=>{pausedState.current=paused;sync.current()},[paused]);
 return <section ref={story} className="ni-reel-story" aria-label="نصنع الدهشة — مختارات مجرة"><div className="ni-reel-sticky" data-video-viewport><div ref={grid} className="ni-mosaic" dir="ltr">{reelTiles.map((item,i)=><div key={item.name} className={`ni-mosaic-tile ni-mosaic-${i} ${item.portrait?'ni-mosaic-portrait':''}`} style={{'--tile-poster':`url('${getVideoAsset(item.name).poster}')`} as React.CSSProperties}><EditorialVideo name={item.name} group="showreel-mosaic" label="مشهد من إنتاج مجرة" paused={paused}/>{i===4&&<h3 ref={title} className="ni-reel-title" dir="rtl">نصنعُ الدهشة.</h3>}</div>)}</div></div></section>;
}
