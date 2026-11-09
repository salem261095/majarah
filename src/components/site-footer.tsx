'use client';
import Link from 'next/link';
import { useRef } from 'react';
import { ArrowUpLeft } from 'lucide-react';
import { useNaturalWordmark } from './natural-wordmark';
import { SectionStamp } from './section-heading';
import { siteNavigation } from '@/lib/public-content';
export function SiteFooter() {
    const wordmark = useRef<HTMLDivElement>(null); useNaturalWordmark(wordmark);
    return <footer className="ni-footer ni-grid"><div className="ni-footer-top"><div><SectionStamp number="08">مدار جديد</SectionStamp><p>لكل فكرةٍ بداية.<br />وهنا تبدأ حكايتك.</p><a className="ni-footer-email" href="mailto:halla@majarah.sa" dir="ltr">halla@majarah.sa<ArrowUpLeft size={20} /></a></div><nav aria-label="روابط التذييل"><span>اكتشف مجرّة</span>{siteNavigation.map(item => <Link href={item.href} key={item.href}>{item.label}</Link>)}</nav><div className="ni-footer-location"><span>من السعودية، لآفاق أبعد</span><p>إنتاج إبداعي.<br />فكر استراتيجي.<br />وحضور يشبهك.</p><a href="#main">إلى البداية<ArrowUpLeft size={18} /></a></div></div><div ref={wordmark} className="ni-footer-brand">مجرّة<span>أبعد من المألوف.</span></div><div className="ni-footer-bottom"><span>© {new Date().getFullYear()} مجرّة</span><span>الفكر والحِرفة، في مدار واحد.</span><span>استوديو مجرّة</span></div></footer>;
}
