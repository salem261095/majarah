'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { resolveCursorTone, type CursorTone } from '@/lib/cursor-contrast';
import { STAR_PATH, cursorSpinTarget, stepCursorSpin, starBurst, type CursorSpin } from '@/lib/star-cursor';
/** Pointer-only progressive enhancement; the native transparent star remains the fallback. */
export function StarCursor(){
 const layer=useRef<HTMLDivElement>(null),main=useRef<HTMLSpanElement>(null);
 useEffect(()=>{
  const overlayNode=layer.current,starNode=main.current;if(!overlayNode||!starNode)return;
  const overlay=overlayNode,star=starNode;
  const media=gsap.matchMedia();
  media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',()=>{
   const html=document.documentElement,particles=new Set<HTMLSpanElement>();
   const spin:CursorSpin={angle:0,velocity:0,target:0};
   const setX=gsap.quickSetter(star,'x','px'),setY=gsap.quickSetter(star,'y','px'),rotate=gsap.quickSetter(star,'rotation','deg'),setOpacity=gsap.quickSetter(star,'opacity');
   const supportsTopLayer=typeof overlay.showPopover==='function';
   let surfaceFrame:number|undefined;
   let pendingSurface:Element|null=null,surfaceCache=new WeakMap<Element,CursorTone>();
   let ticking=false,paused=false,last:{x:number;y:number;time:number}|undefined;
   let size=parseFloat(getComputedStyle(overlay).getPropertyValue('--cursor-star-size'))||32;
   function refreshSurface(target?:Element){
    if(!last)return;
    pendingSurface=target||null;
    if(surfaceFrame!==undefined)return;
    surfaceFrame=requestAnimationFrame(()=>{
     surfaceFrame=undefined;if(!last)return;
     const hit=pendingSurface?.isConnected?pendingSurface:document.elementFromPoint(last.x,last.y);pendingSurface=null;
     if(!hit)return;
     const surface=hit.closest('[data-cursor-theme],dialog,header,footer,section,.ni-light,.ip-light')||hit;
     let tone=surfaceCache.get(surface);
     if(!tone){tone=resolveCursorTone(surface);surfaceCache.set(surface,tone)}
     if(overlay.dataset.tone!==tone)overlay.dataset.tone=tone;
    });
   }
   function scroll(){refreshSurface()}
   function bringToFront(){
    if(!supportsTopLayer){overlay.removeAttribute('popover');return}
    if(overlay.matches(':popover-open'))overlay.hidePopover();
    overlay.showPopover();
   }
   function tick(_time:number,delta:number){
    const moving=stepCursorSpin(spin,delta/1000);rotate(spin.angle*180/Math.PI);
    if(!moving||paused){gsap.ticker.remove(tick);ticking=false}
   }
   function wake(){if(!ticking&&!paused){ticking=true;gsap.ticker.add(tick)}}
   function clearParticles(){for(const particle of particles){gsap.killTweensOf(particle);particle.remove()}particles.clear()}
   function hide(){
    delete html.dataset.starCursor;setOpacity(0);last=undefined;
    gsap.ticker.remove(tick);ticking=false;spin.target=0;spin.velocity=0;
    if(surfaceFrame!==undefined){cancelAnimationFrame(surfaceFrame);surfaceFrame=undefined}pendingSurface=null;
   }
   function eligible(target:EventTarget|null,burst=false){
    if(!(target instanceof Element)||!target.closest('.ni-home'))return false;
    if(target.closest('button:disabled,select:disabled,input:disabled'))return false;
    if(!burst&&target.closest('input,textarea,[contenteditable]:not([contenteditable=false])'))return false;
    // Older browsers keep the native star inside modal dialogs.
    return supportsTopLayer||!target.closest('dialog[open]');
   }
   function setPaused(value:boolean){paused=value;if(value){clearParticles();spin.target=0;spin.velocity=0;gsap.ticker.remove(tick);ticking=false}}
   function move(event:PointerEvent){
    if(event.pointerType!=='mouse'||!eligible(event.target)){hide();return}
    const target=event.target as Element;setPaused(target.closest<HTMLElement>('.ni-home')?.dataset.motion==='off');
    html.dataset.starCursor='active';
    setX(event.clientX-size/2);setY(event.clientY-size/2);setOpacity(1);
    const now=performance.now();
    if(last&&!paused){const speed=Math.hypot(event.clientX-last.x,event.clientY-last.y)/Math.max(.008,(now-last.time)/1000);spin.target=cursorSpinTarget(speed);wake()}
    last={x:event.clientX,y:event.clientY,time:now};refreshSurface(target);
   }
   function click(event:MouseEvent){
    if(event.button!==0||event.detail===0||!eligible(event.target,true))return;
    if('pointerType' in event&&event.pointerType&&event.pointerType!=='mouse')return;
    const target=event.target as Element;
    if(paused||target.closest<HTMLElement>('.ni-home')?.dataset.motion==='off')return;
    const origin={x:event.clientX-size/2,y:event.clientY-size/2},rotation=spin.angle*180/Math.PI;
    for(const part of starBurst()){
     while(particles.size>=60){const oldest=particles.values().next().value!;gsap.killTweensOf(oldest);oldest.remove();particles.delete(oldest)}
     const particle=star.cloneNode(true) as HTMLSpanElement;particle.setAttribute('class','brand-star-particle');particle.style.color=`var(${part.color})`;
     overlay.appendChild(particle);particles.add(particle);
     gsap.fromTo(particle,{...origin,rotation,scale:part.scale,opacity:part.opacity},{x:origin.x+part.x,y:origin.y+part.y,rotation:rotation+part.rotation,scale:0,opacity:0,duration:part.duration,ease:'power2.out',onComplete:()=>{particles.delete(particle);particle.remove()}});
    }
    spin.target=Math.max(spin.target,8);wake();
   }
   function leave(event:PointerEvent){if(!event.relatedTarget)hide()}
   function suspend(){hide();clearParticles()}
   function visibility(){if(document.hidden)suspend()}
   function resize(){size=parseFloat(getComputedStyle(overlay).getPropertyValue('--cursor-star-size'))||32;surfaceCache=new WeakMap();refreshSurface()}
   const observer=new MutationObserver(records=>{
    for(const record of records){
     if(record.attributeName==='open'&&record.target instanceof HTMLDialogElement&&record.target.open){bringToFront();refreshSurface()}
     if(record.attributeName==='data-cursor-theme'){surfaceCache=new WeakMap();refreshSurface()}
     if(record.attributeName==='data-motion'&&record.target instanceof HTMLElement)setPaused(record.target.dataset.motion==='off');
    }
   });
   bringToFront();setOpacity(0);
   observer.observe(document.body,{subtree:true,attributes:true,attributeFilter:['open','data-motion','data-cursor-theme']});
   window.addEventListener('pointermove',move,{passive:true});window.addEventListener('click',click,{passive:true});window.addEventListener('pointerout',leave,{passive:true});
   window.addEventListener('scroll',scroll,{passive:true,capture:true});
   window.addEventListener('blur',suspend);window.addEventListener('resize',resize);document.addEventListener('visibilitychange',visibility);
   return()=>{
    suspend();observer.disconnect();window.removeEventListener('pointermove',move);window.removeEventListener('click',click);window.removeEventListener('pointerout',leave);
    window.removeEventListener('scroll',scroll,true);
    window.removeEventListener('blur',suspend);window.removeEventListener('resize',resize);document.removeEventListener('visibilitychange',visibility);
    if(supportsTopLayer&&overlay.matches(':popover-open'))overlay.hidePopover();
    if(!supportsTopLayer)overlay.setAttribute('popover','manual');
   };
  },overlay);
  return()=>media.revert();
 },[]);
 return <div ref={layer} className="brand-star-layer" popover="manual" aria-hidden="true"><span ref={main} className="brand-star-main"><svg width="32" height="32" viewBox="8 8 48 48" fill="none"><path d={STAR_PATH} stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg></span></div>;
}
