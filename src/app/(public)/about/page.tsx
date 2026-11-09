import type { Metadata } from 'next';
import { AboutContent } from '@/components/pages/about-content';
export const metadata:Metadata={title:'من مجرّة',description:'تعرّف على مجرّة: التفكير الاستراتيجي والإنتاج الإبداعي في مدار واحد.'};
export default function AboutPage(){return <AboutContent/>}
