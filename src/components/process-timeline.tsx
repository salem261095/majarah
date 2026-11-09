'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { homeSteps } from '@/lib/home-content';
import { processTimings, processCanAnimate } from '@/lib/process-timing';
import { SectionHeading } from './section-heading';
/** A right-to-left timeline: normal document content until scroll enhancement is ready. */
export function ProcessTimeline({paused}:{paused:boolean}){
 const root=useRef<HTMLElement>(null);
 useEffect(()=>{
  const section=root.current;if(!section||paused)return;
  const story=section.querySelector<HTMLElement>('.ni-timeline-story');
  const panel=section.querySelector<HTMLElement>('.ni-timeline-sticky');
  const viewport=section.querySelector<HTMLElement>('.ni-timeline-window');
  const track=section.querySelector<HTMLElement>('.ni-timeline-track');
  const fill=section.querySelector<HTMLElement>('.ni-timeline-fill');
  const steps=Array.from(section.querySelectorAll<HTMLElement>('.ni-timeline-step'));
  if(!story||!panel||!viewport||!track||!fill||!steps.length)return;
  gsap.registerPlugin(ScrollTrigger);
  const media=gsap.matchMedia();
  media.add({desktop:'(min-width:761px)',mobile:'(max-width:760px)',reduced:'(prefers-reduced-motion:reduce)',short:'(max-height:600px)'},context=>{
   if(!processCanAnimate({mobile:Boolean(context.conditions?.mobile),reduced:Boolean(context.conditions?.reduced),short:Boolean(context.conditions?.short)}))return;
   section.dataset.timelineAnimated='true';viewport.scrollLeft=0;
   let current=-1;
   const update=(progress:number)=>{
    const next=Math.min(steps.length-1,Math.floor(progress*steps.length));
    if(next===current)return;current=next;
    steps.forEach((step,index)=>{
     step.classList.toggle('is-current',index===next);
     step.classList.toggle('is-reached',index<=next);
     if(index===next)step.setAttribute('aria-current','step');else step.removeAttribute('aria-current');
    });
   };
   const timeline=gsap.timeline({scrollTrigger:{trigger:story,start:()=>`top top+=${parseFloat(getComputedStyle(panel).top)||0}`,end:()=>`+=${Math.max(1,story.offsetHeight-panel.offsetHeight)}`,scrub:.25,invalidateOnRefresh:true,onUpdate:self=>update(self.progress)}});
   timeline.fromTo(fill,{scaleX:0},{scaleX:1,duration:1,ease:'none'},0);
   const phases=processTimings(steps.length,Boolean(context.conditions?.mobile));
   if(context.conditions?.mobile)gsap.set(track,{x:0});
   for(const phase of phases){
    const step=steps[phase.index];
    timeline.fromTo(step.querySelector('.ni-timeline-dot'),{scale:.3,opacity:.15},{scale:1,opacity:1,duration:phase.dotDuration,ease:'power2.out'},phase.start)
     .fromTo(step.querySelectorAll('.ni-timeline-number,h3'),{opacity:.28,filter:context.conditions?.mobile?'blur(0px)':'blur(6px)',y:12},{opacity:1,filter:'blur(0px)',y:0,duration:phase.titleDuration,ease:'power2.out'},phase.titleStart)
     .fromTo(step.querySelector('p'),{opacity:.28,filter:context.conditions?.mobile?'blur(0px)':'blur(4px)',y:12},{opacity:1,filter:'blur(0px)',y:0,duration:phase.bodyDuration,ease:'power2.out'},phase.bodyStart);
    // Hold each paragraph in view before panning to the next stage on mobile.
    if(context.conditions?.mobile&&phase.index>0){
     const travel=()=>Math.max(0,track.scrollWidth-viewport.clientWidth);
     timeline.fromTo(track,{x:()=>travel()*(phase.index-1)/Math.max(1,steps.length-1)},{x:()=>travel()*phase.index/Math.max(1,steps.length-1),duration:phase.panDuration,ease:'power2.inOut',immediateRender:false},phase.panStart);
    }
   }
   update(timeline.scrollTrigger?.progress||0);
   return()=>{
    delete section.dataset.timelineAnimated;
    steps.forEach(step=>{step.classList.remove('is-current','is-reached');step.removeAttribute('aria-current')});
   };
  },section);
  return()=>media.revert();
 },[paused]);
 return <section id="hd-process" ref={root} className="ni-process ni-process-timeline ni-grid" aria-labelledby="process-title">
  <div className="ni-timeline-story"><div className="ni-timeline-sticky">
   <SectionHeading number="06" label="المنهج" title={<span id="process-title">من أول سؤال،<br/>إلى أثرٍ يبقى.</span>} description="نصغي، نفهم، ونصنع. أربع مراحل مترابطة، تبني كلٌّ منها على ما قبلها." note="كل خطوة لها غاية"/>
   <div className="ni-timeline-window" tabIndex={0} role="region" aria-label="مراحل العمل، من الاكتشاف إلى التطوير" dir="rtl">
    <div className="ni-timeline-track">
     <div className="ni-timeline-line" aria-hidden="true"><span className="ni-timeline-fill"/></div>
     <ol className="ni-timeline-steps">{homeSteps.map((step,index)=><li className="ni-timeline-step" key={step.title}>
      <span className="ni-timeline-number" dir="ltr" aria-hidden="true">0{index+1}</span>
      <span className="ni-timeline-dot" aria-hidden="true"/>
      <h3>{step.title}</h3><p>{step.body}</p>
     </li>)}</ol>
    </div>
   </div>
  </div></div>
 </section>;
}
