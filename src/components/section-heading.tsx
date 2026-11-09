import type { ReactNode } from 'react';
export function SectionStamp({children,number}:{children:ReactNode;number:string}){
 return <div className="ni-stamp"><small dir="ltr">{number}</small><span aria-hidden="true"/><b>{children}</b></div>;
}
export function SectionHeading({number,label,title,description,note,animate=true,titleClassName=''}:{number:string;label:string;title:ReactNode;description:string;note?:string;animate?:boolean;titleClassName?:string}){
 return <header className="ni-section-heading"><div className="ni-section-index"><SectionStamp number={number}>{label}</SectionStamp><p>{description}</p></div><div className="ni-section-title-block"><h2 className={`ni-section-title ${titleClassName}`} {...(animate?{'data-ni-reveal':true}:{})}>{title}</h2>{note&&<span className="ni-section-note">{note}</span>}</div></header>;
}
