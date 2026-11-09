'use client';
import type { FocusEvent, MouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpLeft } from 'lucide-react';
import { EditorialVideo } from './editorial-video';
import { getVideoAsset } from '@/lib/assets';
import { selectedWork } from '@/lib/home-media';
export function SelectedWorkStack({paused,onOpen}:{paused:boolean;onOpen:(index:number,event:MouseEvent<HTMLButtonElement>)=>void}){
 function revealFocusedProject(event:FocusEvent<HTMLElement>,index:number){
  if(!(event.target instanceof HTMLElement)||!event.target.matches(':focus-visible'))return;
  const card=event.currentTarget,stack=card.parentElement;if(!stack)return;
  const cards=Array.from(stack.children) as HTMLElement[];
  const precedingHeight=cards.slice(0,index).reduce((sum,node)=>sum+node.offsetHeight+parseFloat(getComputedStyle(node).marginBottom||'0'),0);
  const top=parseFloat(getComputedStyle(card).top);
  // A keyboard user must reach the actual project, rather than a button hidden under a later card.
  window.scrollTo({top:Math.max(0,stack.getBoundingClientRect().top+window.scrollY+precedingHeight-(Number.isFinite(top)?top:0)),behavior:'instant'});
 }
 return <div className="ni-projects ni-project-stack">{selectedWork.map((item,i)=><article className="ni-project" data-project-layer={i} key={item.media} style={{'--project-index':i} as React.CSSProperties} onFocusCapture={event=>revealFocusedProject(event,i)} aria-labelledby={`project-title-${i}`}>
  <div className="ni-project-ambient" aria-hidden="true"><Image src={getVideoAsset(item.media,item.directory).poster} alt="" fill sizes="100vw"/></div>
  <div className="ni-project-top"><span>0{i+1}.</span><span>السنة <b>—</b></span><span>القطاع <b>{item.sector}</b></span></div>
  <button className="ni-project-cover" onClick={event=>onOpen(i,event)} aria-label={`عرض المشهد: ${item.title}`} aria-haspopup="dialog"><EditorialVideo key={`${item.directory}/${item.media}`} directory={item.directory} name={item.media} label={item.title} paused={paused}/><span className="ni-project-open"><ArrowUpLeft/></span></button>
  <div className="ni-project-caption"><span/><h3 id={`project-title-${i}`}><Link href={`/work/${item.slug}`}>{item.title}</Link></h3><ul>{item.tags.map(tag=><li key={tag}>{tag}</li>)}</ul></div>
 </article>)}</div>;
}
