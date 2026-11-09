'use client';
import { useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';
import { scrollToRouteStart } from '@/lib/route-scroll';
export function RouteScrollReset(){
 const pathname=usePathname();
 useLayoutEffect(()=>{
  const previous=window.history.scrollRestoration;window.history.scrollRestoration='manual';
  return()=>{window.history.scrollRestoration=previous};
 },[]);
 useLayoutEffect(()=>{
  const reset=()=>scrollToRouteStart({hash:window.location.hash,findAnchor:id=>document.getElementById(id),scrollTo:options=>window.scrollTo(options)});
  reset();
  // Run once after Next's navigation/layout work, so a shared footer cannot retain the old offset.
  const frame=requestAnimationFrame(reset);
  return()=>cancelAnimationFrame(frame);
 },[pathname]);
 return null;
}
