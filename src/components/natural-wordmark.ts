'use client';
import { useEffect, type RefObject } from 'react';
/** Fit with font size only: Arabic joining and glyph proportions stay untouched. */
export function useNaturalWordmark(ref:RefObject<HTMLElement|null>,fitHeight=false){
 useEffect(()=>{
  const node=ref.current;if(!node)return;
  let alive=true;
  const canvas=document.createElement('canvas'),context=canvas.getContext('2d');
  function fit(){
   if(!alive||!node||!context)return;
   const style=getComputedStyle(node);
   context.font=`${style.fontWeight} 100px ${style.fontFamily}`;
   const width=context.measureText('مجرة').width;
   if(width>0){const widthSize=node.clientWidth*.97/width*100;const heightSize=fitHeight&&node.parentElement?node.parentElement.clientHeight/1.12:Infinity;node.style.setProperty('--wordmark-size',`${Math.min(widthSize,heightSize)}px`)}
  }
  const observer=new ResizeObserver(fit);observer.observe(node);if(fitHeight&&node.parentElement)observer.observe(node.parentElement);fit();
  void document.fonts.ready.then(fit);
  return()=>{alive=false;observer.disconnect()};
 },[ref,fitHeight]);
}
