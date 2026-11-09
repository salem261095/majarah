import type { Metadata } from 'next';
import { ServicesOverview } from '@/components/pages/services-overview';
export const metadata:Metadata={title:'الخدمات — مجرة',description:'خدمات مجرة في الإنتاج الإبداعي والاستراتيجية والتسويق.'};
export default function ServicesPage(){return <ServicesOverview/>}
