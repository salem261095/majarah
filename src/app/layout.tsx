import type { Metadata } from 'next';
import './design-system.css';
import './globals.css';
import './majarrah.css';
import './editorial-motion.css';
import './premium-editorial.css';
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
export const metadata: Metadata = {
  title: 'مجرّة — أفكار تتجاوز المألوف',
  description: 'مجرّة: الإنتاج الإبداعي والتسويق في مدار واحد.',
  robots: { index: false, follow: false },
};
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="ar" dir="rtl"><body>{children}</body></html>;
}
