'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpLeft, ArrowDown, Plus, X } from 'lucide-react';
import { gsap } from 'gsap';
import { requestVideoFrame } from '@/lib/media-coordinator';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CinematicOpening } from './cinematic-opening';
import { RestoredHero } from './restored-hero';
import { EditorialVideo } from './editorial-video';
import { EditorialInquiry } from './editorial-inquiry';
import { ShowreelMosaic } from './showreel-mosaic';
import { StudioSection } from './studio-section';
import { ProcessTimeline } from './process-timeline';
import { SelectedWorkStack } from './selected-work-stack';
import { CreativeServiceVideos } from './creative-service-videos';
import { SectionHeading } from './section-heading';
import { SiteFooter } from './site-footer';
import Link from 'next/link';
import { siteNavigation, serviceCatalog } from '@/lib/public-content';
import { creativeServices, marketingServices } from '@/lib/home-content';
import { selectedWork as projects, creativeServiceMedia } from '@/lib/home-media';
export function MajarrahHome(){
 const root=useRef<HTMLDivElement>(null),dialog=useRef<HTMLDialogElement>(null),opener=useRef<HTMLElement|null>(null);
 const [paused,setPaused]=useState(false),[menu,setMenu]=useState(false),[project,setProject]=useState<number|null>(null);
 const active=menu||project!==null;
 useEffect(()=>{if(!active)return;const node=dialog.current;if(!node)return;node.showModal();const old=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{node.close();document.body.style.overflow=old;opener.current?.focus()}},[active]);
 function close(){setMenu(false);setProject(null)}
 function open(kind:'menu'|number,event:React.MouseEvent<HTMLElement>){opener.current=event.currentTarget;if(kind==='menu')setMenu(true);else setProject(kind)}
 useEffect(()=>{
  const element=root.current;if(!element||paused)return;gsap.registerPlugin(ScrollTrigger);const media=gsap.matchMedia();let disposed=false;
  const context=gsap.context(()=>{media.add({all:'(min-width:0px)',desktop:'(min-width:761px)',reduced:'(prefers-reduced-motion:reduce)'},match=>{
   if(match.conditions?.reduced)return;
   const opening=gsap.timeline({paused:true,defaults:{ease:'power3.out'}})
    .fromTo('.rh-wordmark',{opacity:.05,filter:'blur(20px)',y:25},{opacity:1,filter:'blur(0px)',y:0,duration:1.05},0)
    .fromTo('.rh-tagline>span',{opacity:0,filter:'blur(12px)',clipPath:'inset(0 0 0 100%)'},{opacity:1,filter:'blur(0px)',clipPath:'inset(0 0 0 0)',stagger:.18,duration:1.1},.45)
    .fromTo('.rh-support>p,.rh-actions',{opacity:0,filter:'blur(5px)',y:15},{opacity:1,filter:'blur(0px)',y:0,stagger:.13,duration:.8},.8);
   let started=false;const start=()=>{if(started)return;started=true;opening.play()};if(document.documentElement.dataset.majarraOpening==='pending'){window.addEventListener('majarra:opening-reveal',start,{once:true});window.addEventListener('majarra:opening-complete',start,{once:true})}else start();
   gsap.to('.rh-content',{yPercent:-8,opacity:.1,filter:'blur(6px)',ease:'none',scrollTrigger:{trigger:'.rh-hero',start:'top top',end:'bottom top',scrub:.7}});
   element.querySelectorAll<HTMLElement>('[data-ni-reveal]').forEach(node=>gsap.fromTo(node,{opacity:.08,filter:'blur(10px)',y:30},{opacity:1,filter:'blur(0px)',y:0,duration:1.1,ease:'power2.out',scrollTrigger:{trigger:node,start:'top 86%',toggleActions:'play none none reverse'}}));
   element.querySelectorAll<HTMLElement>('.ni-service-panel').forEach(panel=>{gsap.timeline({scrollTrigger:{trigger:panel,start:'top 82%',toggleActions:'play none none reverse'}}).fromTo(panel.querySelector('h3'),{opacity:.1,filter:'blur(8px)',y:20},{opacity:1,filter:'blur(0px)',y:0,duration:.7}).fromTo(panel.querySelectorAll('.ni-service-details'),{opacity:.1,filter:'blur(8px)',y:20},{opacity:1,filter:'blur(0px)',y:0,stagger:.16,duration:.9},.2)});
   return()=>{window.removeEventListener('majarra:opening-reveal',start);window.removeEventListener('majarra:opening-complete',start)};
  })},element);
  void document.fonts.ready.then(()=>{if(!disposed)ScrollTrigger.refresh()});let frame=0;const refresh=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{if(!disposed)ScrollTrigger.refresh()})};element.addEventListener('load',refresh,true);
  return()=>{disposed=true;cancelAnimationFrame(frame);element.removeEventListener('load',refresh,true);media.revert();context.revert()};
 },[paused]);
 return <div id="main" ref={root} className="ni-home" data-motion={paused?'off':'on'}><CinematicOpening paused={paused}/>
  <RestoredHero paused={paused||active} onToggleMotion={()=>setPaused(!paused)} onMenu={event=>open('menu',event)}/>
  <StudioSection paused={paused||active}/>
  <section id="hd-services" className="ni-services ni-grid"><SectionHeading number="02" label="الإنتاج الإبداعي" title={<>فكرةٌ تُصوَّر.<br/>وحكايةٌ تُروى.</>} description="أفلام، تصوير، مونتاج ومحتوى مرئي. نعتني بالمشهد من أول معالجة إلى آخر نسخة." note="من أول فكرة إلى آخر مشهد"/><div className="ni-services-layout"><aside className="ni-service-heading"><span className="ni-rail-label">مجالات العمل</span><nav aria-label="مجالات خدمات مجرة">{creativeServices.map((service,i)=><a href={`#service-${i+1}`} key={service.title}><span dir="ltr">0{i+1}</span><span>{service.title}</span><ArrowUpLeft size={18}/></a>)}</nav><a className="ni-service-inquiry" href="#hd-contact">ناقشنا في مشروعك<Plus size={18}/></a></aside><div className="ni-service-panels">{creativeServices.map((service,i)=><article id={`service-${i+1}`} className="ni-service-panel" key={service.title}><div className="ni-service-panel-top"><span className="ni-service-number" dir="ltr">0{i+1}</span><span>{service.category}</span><ArrowUpLeft size={24}/></div><h3><Link href={`/services/${serviceCatalog[i].slug}`}>{service.title}</Link></h3><CreativeServiceVideos media={creativeServiceMedia[i]} label={service.title} index={i} paused={paused||active}/><div className="ni-service-details"><p>{service.description}</p><ul>{service.items.map(item=><li key={item}>{item}</li>)}</ul></div></article>)}</div></div></section>
  <section id="hd-work" className="ni-portfolio ni-grid"><SectionHeading number="03" label="أعمال مختارة" title="حكايات تُرى." description="رؤى ومشاهد تستكشف العلامات والناس، والتفاصيل التي تصنع الحكاية." note="إنتاج / محتوى / رؤى بصرية"/><SelectedWorkStack paused={paused||active} onOpen={(index,event)=>open(index,event)}/><div className="ip-home-more"><Link href="/work" className="ip-outline">استكشف جميع الأعمال<ArrowUpLeft size={20}/></Link></div></section><section id="hd-marketing" className="ni-marketing ni-grid" aria-labelledby="marketing-title"><SectionHeading number="04" label="الخدمات التسويقية" title={<span id="marketing-title">حضورٌ أذكى.<br/>وأثرٌ يمتد.</span>} description="نصل إبداع العلامة بخطّة تسويقية متكاملة، من فهم السوق إلى القنوات والتقنية وتطوير الفريق." note="استراتيجية / حملات / تقنية / تطوير"/><div className="ni-marketing-list">{marketingServices.map((service,i)=><details className="ni-marketing-row" key={service.title} data-ni-reveal onToggle={()=>requestAnimationFrame(()=>{ScrollTrigger.refresh();requestVideoFrame()})}><summary aria-labelledby={`marketing-service-${i}`} aria-describedby={`marketing-description-${i}`}><span className="ni-marketing-number" dir="ltr">0{i+1}</span><h3 id={`marketing-service-${i}`}>{service.title}</h3><p id={`marketing-description-${i}`}>{service.description}</p><span className="ni-marketing-toggle" aria-hidden="true"><Plus size={20}/></span></summary><div className="ni-marketing-detail"><span>يشمل هذا المجال</span><ul>{service.items.map(item=><li key={item}>{item}</li>)}</ul><Link className="ip-text-link" href={`/services/${serviceCatalog[i+creativeServices.length].slug}`}>تعرّف على الخدمة<ArrowUpLeft size={18}/></Link></div></details>)}</div><div className="ni-marketing-bottom"><p>من الفكرة إلى حضورٍ متّصل، نختار ما يخدم علامتك.</p><a href="#hd-contact">لنبنِ خطّة علامتك<ArrowUpLeft size={20}/></a></div></section>

  <section className="ni-showreel ni-portfolio ni-grid" aria-label="مختارات مجرة"><div className="ni-highlights-heading"><SectionHeading number="05" label="في حركة" title="الفكرة، حيّة." description="فكرة وإحساس وحركة. مختارات من مكتبتنا البصرية، من كواليسنا إلى الشاشة."/></div>
  <ShowreelMosaic paused={paused||active}/></section>

  <ProcessTimeline paused={paused}/>
  <section id="hd-contact" className="ni-contact ni-grid ni-light"><SectionHeading number="07" label="لنتحدث" title={<>حكايتك القادمة،<br/>تبدأ هنا.</>} description="فكرة جديدة أو مشروع ينتظر البداية. لنكتشف ما يمكن أن نصنعه معًا."/><div className="ni-contact-layout"><div><span>التواصل المباشر</span><a href="mailto:halla@majarrah.sa" dir="ltr">halla@majarrah.sa</a><p>المملكة العربية السعودية</p><span className="ni-contact-word">مجرة</span></div><EditorialInquiry/></div></section>
  <SiteFooter paused={paused} onToggleMotion={()=>setPaused(!paused)}/>


  {active&&<dialog ref={dialog} className={`ni-dialog ${menu?'ni-menu-dialog':''}`} aria-labelledby="ni-dialog-title" onCancel={close} onClick={e=>{if(e.target===e.currentTarget){const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close()}}}><button className="ni-dialog-close" aria-label="إغلاق" onClick={close}><X/></button>{menu?<div className="ni-menu-content"><h2 id="ni-dialog-title">مجرة</h2><nav>{[{href:'/',label:'الرئيسية'},...siteNavigation].map((item,i)=><Link href={item.href} key={item.href} onClick={close}><span>0{i}</span>{item.label}<ArrowUpLeft/></Link>)}</nav><a href="mailto:halla@majarrah.sa">halla@majarrah.sa</a></div>:project!==null?<><h2 id="ni-dialog-title">{projects[project].title}</h2><div className="ni-dialog-video"><EditorialVideo key={`${projects[project].directory}/${projects[project].media}`} directory={projects[project].directory} name={projects[project].media} mode="manual" label={projects[project].title}/></div><p>{projects[project].description}</p><Link className="ip-text-link" href={`/work/${projects[project].slug}`}>تفاصيل العمل<ArrowUpLeft size={18}/></Link><small>مشهد من المكتبة البصرية / {projects[project].sector}</small></>:null}</dialog>}
 </div>;
}

