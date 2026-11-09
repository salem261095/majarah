import Link from 'next/link';
import { ArrowUpLeft } from 'lucide-react';
import { PageHero } from './page-elements';
export function NotFoundContent(){return <><PageHero number="404" label="خارج المدار" title={<>لنعد إلى<br/>الطريق.</>} description="لم نجد الصفحة التي تبحث عنها. يمكنك العودة للرئيسية أو اكتشاف أعمال مجرّة."/><div className="ip-not-found-actions"><Link href="/" className="ip-primary">إلى الرئيسية<ArrowUpLeft size={20}/></Link><Link href="/work" className="ip-outline">استكشف الأعمال</Link></div></>}
