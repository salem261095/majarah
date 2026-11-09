'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpLeft } from 'lucide-react';
import { siteNavigation } from '@/lib/public-content';
export function SiteHeader({onMenu}:{onMenu:(event:React.MouseEvent<HTMLButtonElement>)=>void}){
 const pathname=usePathname();
 return <header className="rh-header"><Link href="/" className="rh-brand" aria-label="مجرّة — الرئيسية"><span aria-hidden="true">✳</span><strong>مجرّة<small>MAJARRA</small></strong></Link><nav aria-label="التنقل الرئيسي">{siteNavigation.map(item=><Link key={item.href} href={item.href} aria-current={pathname===item.href||pathname.startsWith(item.href+'/')?'page':undefined}>{item.label}</Link>)}</nav><div className="rh-header-actions"><Link href="/contact" className="rh-header-cta">لنبدأ حكاية<ArrowUpLeft size={16}/></Link><button className="rh-menu" onClick={onMenu} aria-label="فتح القائمة"><span/><span/></button></div></header>;
}
