import type { Metadata } from 'next';
import { StarCursor } from '@/components/star-cursor';
import { OPENING_BOOTSTRAP_SCRIPT } from '@/lib/opening-session';
import './design-system.css';
import './globals.css';
import './site-base.css';
import './cinematic-sequence.css';
import './restored-hero.css';
import './editorial-refinements.css';
import './typography.css';
import './hero-screen.css';
import './brand-cursor.css';
import './marketing-services.css';
import './creative-services.css';
import './showreel-mosaic.css';
import './studio-section.css';
import './selected-work-stack.css';
import './inner-pages.css';
import './client-logos.css';
import './process-timeline.css';
export const metadata: Metadata = {
  title: 'مجرّة — أفكار تتجاوز المألوف',
  description: 'مجرّة: الإنتاج الإبداعي والتسويق في مدار واحد.',
  robots: { index: false, follow: false },
};
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="ar" dir="rtl" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:OPENING_BOOTSTRAP_SCRIPT}}/></head><body>{children}<StarCursor/></body></html>;
}
