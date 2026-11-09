import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowUpLeft } from 'lucide-react';
import { SectionStamp } from '../section-heading';
export function PageHero({number,label,title,description,note,tone='dark',parent}:{number:string;label:string;title:ReactNode;description:string;note?:string;tone?:'dark'|'light'|'violet';parent?:{href:string;label:string}}){
 return <section className={`ip-hero ni-grid ip-${tone}`}><div className="ip-breadcrumb"><Link href="/">الرئيسية</Link><span>/</span>{parent&&<><Link href={parent.href}>{parent.label}</Link><span>/</span></>}<span aria-current="page">{label}</span></div><div className="ip-hero-layout"><div><SectionStamp number={number}>{label}</SectionStamp><h1 data-page-reveal>{title}</h1></div><div className="ip-hero-copy" data-page-reveal><p>{description}</p>{note&&<span>{note}</span>}</div></div></section>;
}
export function PageCta({title='حكايتك القادمة، تبدأ هنا.',description='لنفهم فكرتك، ونكتشف ما يمكن أن نصنعه معًا.',service,project}:{title?:string;description?:string;service?:string;project?:string}){
 const query=new URLSearchParams();if(service)query.set('service',service);if(project)query.set('project',project);
 return <section className="ip-cta ni-grid"><SectionStamp number="✳">لنتحدث</SectionStamp><div data-page-reveal><h2>{title}</h2><p>{description}</p><Link className="ip-primary" href={`/contact${query.size?'?'+query.toString():''}`}>لنبدأ مشروعًا<ArrowUpLeft size={20}/></Link></div></section>;
}
