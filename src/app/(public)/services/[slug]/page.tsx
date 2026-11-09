import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ServiceDetail } from '@/components/pages/service-detail';
import { serviceCatalog, findService } from '@/lib/public-content';
export function generateStaticParams(){return serviceCatalog.map(service=>({slug:service.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const service=findService(slug);return {title:service?`${service.title} — مجرّة`:'الخدمة غير موجودة — مجرّة',description:service?.description}}
export default async function ServicePage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const service=findService(slug);if(!service)notFound();return <ServiceDetail service={service}/>}
