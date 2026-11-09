'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { clientLogos } from '@/lib/assets';
export function ClientLogosSection({paused}:{paused:boolean}){
 const root=useRef<HTMLElement>(null),pausedState=useRef(paused),sync=useRef<()=>void>(()=>{});
 useEffect(()=>{
  const section=root.current;if(!section)return;
  const media=gsap.matchMedia();let visible=false,hovered=false;
  media.add('(prefers-reduced-motion: no-preference)',()=>{
   const tracks=Array.from(section.querySelectorAll<HTMLElement>('.ni-client-track'));
   const animations=tracks.map(track=>{
    const viewport=track.parentElement!,cells=Array.from(track.querySelectorAll<HTMLElement>('.ni-client-cell'));
    const focus=()=>{const box=viewport.getBoundingClientRect();const edgeWidth=Math.min(180,box.width*.22);cells.forEach(cell=>{const rect=cell.getBoundingClientRect();if(rect.right<box.left||rect.left>box.right)return;const center=rect.left+rect.width/2-box.left;const edgeDistance=Math.min(center,box.width-center);const sharp=Math.max(0,Math.min(1,edgeDistance/edgeWidth));cell.style.setProperty('--client-blur',`${(1-sharp)*2.8}px`);cell.style.setProperty('--client-opacity',String(.32+sharp*.46));cell.style.setProperty('--client-scale',String(.86+sharp*.14))})};
    const tween=gsap.fromTo(track,{xPercent:0},{xPercent:-50,duration:90,ease:'none',repeat:-1,paused:true,onUpdate:focus});focus();return tween;
   });
   const update=()=>animations.forEach(animation=>{if(visible&&!pausedState.current&&!hovered&&!document.hidden)animation.play();else animation.pause()});sync.current=update;
   const observer=new IntersectionObserver(entries=>{visible=entries.some(entry=>entry.isIntersecting);update()});observer.observe(section);
   const enter=()=>{hovered=true;update()},leave=()=>{hovered=false;update()};
   section.addEventListener('mouseenter',enter);section.addEventListener('mouseleave',leave);document.addEventListener('visibilitychange',update);
   return()=>{observer.disconnect();section.removeEventListener('mouseenter',enter);section.removeEventListener('mouseleave',leave);document.removeEventListener('visibilitychange',update);sync.current=()=>{}};
  },section);
  return()=>media.revert();
 },[]);
 useEffect(()=>{pausedState.current=paused;sync.current()},[paused]);
 return <section ref={root} className="ni-clients ni-grid ni-light" aria-labelledby="clients-title"><h2 id="clients-title" className="ni-sr-only">عملاؤنا</h2><div className="ni-client-window" dir="ltr"><div className="ni-client-track">{[0,1].map(copy=><div className="ni-client-set" key={copy} aria-hidden={copy===1?true:undefined}>{clientLogos.map(logo=><div className="ni-client-cell" key={logo.id}><img src={logo.src} alt={copy===0?logo.label:''} width={logo.width} height={logo.height} loading="lazy" decoding="async"/></div>)}</div>)}</div></div></section>;
}
