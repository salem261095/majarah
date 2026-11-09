'use client';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, ArrowUpLeft } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SiteHeader } from '../site-header';
import { SiteFooter } from '../site-footer';
import { siteNavigation } from '@/lib/public-content';
const MotionContext=createContext(false);
export const useSiteMotion=()=>useContext(MotionContext);
export function PageShell({children}:{children:ReactNode}){
 const root=useRef<HTMLDivElement>(null),dialog=useRef<HTMLDialogElement>(null),opener=useRef<HTMLElement|null>(null),sync=useRef<()=>void>(()=>{}),pausedState=useRef(false);
 const [paused,setPaused]=useState(false),[menu,setMenu]=useState(false);const pathname=usePathname();
 useEffect(()=>{if(!menu)return;const node=dialog.current;if(!node)return;node.showModal();const old=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{node.close();document.body.style.overflow=old;opener.current?.focus()}},[menu]);
 useEffect(()=>{setMenu(false)},[pathname]);
 useEffect(()=>{
  const element=root.current;if(!element)return;gsap.registerPlugin(ScrollTrigger);const media=gsap.matchMedia();let alive=true;
  media.add('(prefers-reduced-motion: no-preference)',()=>{
   const animations=Array.from(element.querySelectorAll<HTMLElement>('[data-page-reveal]')).map(node=>gsap.fromTo(node,{opacity:.12,filter:'blur(7px)',y:24},{opacity:1,filter:'blur(0px)',y:0,duration:.85,ease:'power2.out',scrollTrigger:{trigger:node,start:'top 92%',toggleActions:'play none none none'}}));
   const update=()=>animations.forEach(animation=>{if(pausedState.current){animation.scrollTrigger?.disable(false);animation.progress(1).pause()}else{animation.scrollTrigger?.enable(false);if(animation.scrollTrigger?.isActive)animation.resume()}});sync.current=update;update();return()=>{sync.current=()=>{}};
  },element);
  void document.fonts.ready.then(()=>{if(alive)ScrollTrigger.refresh()});const refresh=()=>ScrollTrigger.refresh();element.addEventListener('load',refresh,true);element.addEventListener('toggle',refresh,true);
  return()=>{alive=false;element.removeEventListener('load',refresh,true);element.removeEventListener('toggle',refresh,true);media.revert()};
 },[pathname]);
 useEffect(()=>{pausedState.current=paused;sync.current()},[paused]);
 return <MotionContext.Provider value={paused||menu}><div ref={root} className="ni-home inner-site" data-motion={paused?'off':'on'}><a className="ip-skip" href="#main">انتقل إلى المحتوى</a><SiteHeader onMenu={event=>{opener.current=event.currentTarget;setMenu(true)}}/><main id="main">{children}</main><SiteFooter paused={paused} onToggleMotion={()=>setPaused(!paused)}/>{menu&&<dialog ref={dialog} className="ni-dialog ni-menu-dialog" aria-labelledby="page-menu-title" onCancel={()=>setMenu(false)}><button className="ni-dialog-close" onClick={()=>setMenu(false)} aria-label="إغلاق القائمة"><X/></button><div className="ni-menu-content"><h2 id="page-menu-title">مجرة</h2><nav><Link href="/" onClick={()=>setMenu(false)}><span>00</span>الرئيسية<ArrowUpLeft/></Link>{siteNavigation.map((item,i)=><Link href={item.href} key={item.href} onClick={()=>setMenu(false)}><span>0{i+1}</span>{item.label}<ArrowUpLeft/></Link>)}</nav><a href="mailto:halla@majarrah.sa" dir="ltr">halla@majarrah.sa</a></div></dialog>}</div></MotionContext.Provider>;
}
