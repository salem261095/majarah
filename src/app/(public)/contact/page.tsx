import type { Metadata } from 'next';
import { ContactContent } from '@/components/pages/contact-content';
import { findProject,findService } from '@/lib/public-content';
export const metadata:Metadata={title:'لنتحدث — مجرة',description:'ابدأ حوارًا مع مجرة حول مشروعك في الإنتاج الإبداعي أو التسويق.'};
export default async function ContactPage({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}){const params=await searchParams;const service=typeof params.service==='string'&&findService(params.service)?params.service:undefined;const project=typeof params.project==='string'&&findProject(params.project)?params.project:undefined;return <ContactContent service={service} project={project}/>}
