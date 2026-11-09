'use client';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, ArrowUpLeft } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SiteHeader } from '../site-header';
import { SiteFooter } from '../site-footer';
import { siteNavigation } from '@/lib/public-content';
const MotionContext = createContext(false);
export const useSiteMotion = () => useContext(MotionContext);
export function PageShell({ children }: { children: ReactNode }) {
    const root = useRef<HTMLDivElement>(null), dialog = useRef<HTMLDialogElement>(null), opener = useRef<HTMLElement | null>(null);
    const [menu, setMenu] = useState(false); const pathname = usePathname();
    useEffect(() => { if (!menu) return; const node = dialog.current; if (!node) return; node.showModal(); const old = document.body.style.overflow; document.body.style.overflow = 'hidden'; return () => { node.close(); document.body.style.overflow = old; opener.current?.focus({preventScroll:true}) } }, [menu]);
    useEffect(() => { setMenu(false) }, [pathname]);
    useEffect(() => {
        const element = root.current; if (!element) return; gsap.registerPlugin(ScrollTrigger); const media = gsap.matchMedia(); let alive = true;
        media.add('(prefers-reduced-motion: no-preference)', () => {
            Array.from(element.querySelectorAll<HTMLElement>('[data-page-reveal]')).forEach(node => gsap.fromTo(node, { opacity: .12, filter: 'blur(7px)', y: 24 }, { opacity: 1, filter: 'blur(0px)', y: 0, duration: .85, ease: 'power2.out', scrollTrigger: { trigger: node, start: 'top 92%', toggleActions: 'play none none none' } }));

        }, element);
        void document.fonts.ready.then(() => { if (alive) ScrollTrigger.refresh() }); const refresh = () => ScrollTrigger.refresh(); element.addEventListener('load', refresh, true); element.addEventListener('toggle', refresh, true);
        return () => { alive = false; element.removeEventListener('load', refresh, true); element.removeEventListener('toggle', refresh, true); media.revert() };
    }, [pathname]);
    return <MotionContext.Provider value={menu}><div ref={root} className="ni-home inner-site" data-motion="on"><a className="ip-skip" href="#main">انتقل إلى المحتوى</a><SiteHeader onMenu={event => { opener.current = event.currentTarget; setMenu(true) }} /><main id="main">{children}</main><SiteFooter/>{menu && <dialog ref={dialog} className="ni-dialog ni-menu-dialog" aria-labelledby="page-menu-title" onCancel={() => setMenu(false)}><button className="ni-dialog-close" onClick={() => setMenu(false)} aria-label="إغلاق القائمة"><X /></button><div className="ni-menu-content"><h2 id="page-menu-title">مجرّة</h2><nav><Link href="/" onClick={() => setMenu(false)}><span>00</span>الرئيسية<ArrowUpLeft /></Link>{siteNavigation.map((item, i) => <Link href={item.href} key={item.href} onClick={() => setMenu(false)}><span>0{i + 1}</span>{item.label}<ArrowUpLeft /></Link>)}</nav><a href="mailto:halla@majarah.sa" dir="ltr">halla@majarah.sa</a></div></dialog>}</div></MotionContext.Provider>;
}
