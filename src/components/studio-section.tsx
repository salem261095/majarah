'use client';
import { useEffect, useRef } from 'react';
import { ArrowUpLeft } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeading } from './section-heading';
import { ClientLogosSection } from './client-logos-section';
function ReadingLine({children}:{children:string}){
 return <span aria-label={children}>{children.split(/\s+/).map((word,i)=><span className="ni-studio-word" aria-hidden="true" key={i}>{word}{' '}</span>)}</span>;
}
export function StudioSection({paused}:{paused:boolean}){
 const root=useRef<HTMLElement>(null),pausedState=useRef(paused),sync=useRef<()=>void>(()=>{});
 useEffect(()=>{
  const section=root.current;if(!section)return;gsap.registerPlugin(ScrollTrigger);
  const media=gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)',()=>{
   const words=section.querySelectorAll('.ni-studio-word'),heading=section.querySelector('.ni-studio-title');
   const tokens=getComputedStyle(section);
   const reading=gsap.fromTo(words,{color:tokens.getPropertyValue('--color-text-reading').trim()},{color:tokens.getPropertyValue('--color-brand-midnight').trim(),stagger:{amount:1},ease:'none',scrollTrigger:{trigger:heading,start:'top 82%',end:'bottom 42%',scrub:.6}});
   const closing=gsap.fromTo(section.querySelector('.ni-studio-closing'),{opacity:.2,y:15},{opacity:1,y:0,ease:'none',scrollTrigger:{trigger:section.querySelector('.ni-studio-closing'),start:'top 94%',end:'top 76%',scrub:.4}});
   const update=()=>[reading,closing].forEach(animation=>{if(pausedState.current)animation.scrollTrigger?.disable(false);else animation.scrollTrigger?.enable(false)});
   sync.current=update;update();
   return()=>{sync.current=()=>{}};
  },section);
  return()=>media.revert();
 },[]);
 useEffect(()=>{pausedState.current=paused;sync.current()},[paused]);
 return <section id="hd-about" ref={root} className="ni-studio ni-grid ni-light" aria-labelledby="studio-title">
  <ClientLogosSection paused={paused}/>
  <SectionHeading number="01" label="من مجرّة" title={<span id="studio-title"><ReadingLine>فكرٌ يرى أبعد.</ReadingLine><br/><ReadingLine>وحِرفةٌ تصنع الأثر.</ReadingLine></span>} description="نحن مجرّة. نصل التفكير الاستراتيجي بالإنتاج الإبداعي، لنمنح العلامات حضورًا يشبهها." note="رؤية سعودية، وآفاق أبعد" animate={false} titleClassName="ni-studio-title"/>
  <div className="ni-studio-closing"><p>الفكر والحِرفة، <span>في مدار واحد.</span></p><a href="#hd-services">اكتشف ما نصنع<ArrowUpLeft size={20}/></a></div>
 </section>;
}
