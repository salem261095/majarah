import type { Metadata } from 'next';
import { PageHero, PageCta } from '@/components/pages/page-elements';
import { WorkGallery } from '@/components/pages/work-gallery';
export const metadata:Metadata={title:'الأعمال — مجرة',description:'استكشف مكتبة مجرة البصرية: أفلام، تصوير، مونتاج ومحتوى مرئي قصير.'};
export default function WorkPage(){return <><PageHero number="01" label="الأعمال" title={<>حكايات تُرى.<br/>وتفاصيل تبقى.</>} description="أعمال ومشاهد من مكتبتنا البصرية. زوايا مختلفة يجمعها الاهتمام بالفكرة والصورة والحِرفة." note="استكشف حسب التخصّص أو القطاع."/><WorkGallery/><PageCta title="ما حكايتك القادمة؟"/></>}
