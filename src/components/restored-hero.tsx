'use client';
import { ArrowUpLeft, ArrowDown, Pause, RotateCcw } from 'lucide-react';
import { useRef } from 'react';
import { useNaturalWordmark } from './natural-wordmark';
import { HeroVideoStrip } from './hero-video-strip';
import { HeroOrbits } from './hero-orbits';
import { SiteHeader } from './site-header';
export function RestoredHero({paused,onToggleMotion,onMenu}:{paused:boolean;onToggleMotion:()=>void;onMenu:(event:React.MouseEvent<HTMLButtonElement>)=>void}){
 const wordmark=useRef<HTMLHeadingElement>(null);useNaturalWordmark(wordmark,true);
 return <>
  <SiteHeader onMenu={onMenu}/>
  <section className="rh-hero" aria-labelledby="rh-title"><HeroVideoStrip paused={paused}/><HeroOrbits paused={paused}/><div className="rh-overlay"/><div className="rh-grid" aria-hidden="true"/><div className="rh-kicker"><span>01. الإنتاج الإبداعي</span><span>02. الاستراتيجية والتسويق</span><span>03. حكايات لها أثر</span></div><div className="rh-content"><div className="rh-identity"><h1 ref={wordmark} id="rh-title" className="rh-wordmark">مجرة</h1><p className="rh-tagline" aria-label="نصنع الإبداع، ونوسّع مدار الأثر"><span aria-hidden="true">نصنع الإبداع،</span><span aria-hidden="true">ونوسّع مدار الأثر</span><svg viewBox="0 0 600 35" aria-hidden="true"><path d="M8 20Q240 0 588 14M140 31Q370 5 580 25"/></svg></p></div><div className="rh-support"><p>نصل الفكر بالحِرفة. لنمنح العلامات حكاية تشبهها، وحضورًا لا يشبه غيره.</p><div className="rh-actions"><a className="rh-primary" href="#hd-work">اكتشف أعمالنا<ArrowUpLeft size={18}/></a><a className="rh-secondary" href="#hd-contact">لنبدأ مشروعًا<ArrowUpLeft size={16}/></a></div></div></div><div className="rh-bottom"><a href="#hd-about">اكتشف مجرة<ArrowDown size={15}/></a><span>من السعودية، لآفاق أبعد</span><button onClick={onToggleMotion} aria-pressed={paused}>{paused?<RotateCcw size={14}/>:<Pause size={14}/>}<span>{paused?'تفعيل الحركة':'إيقاف الحركة'}</span></button></div></section>
 </>;
}
