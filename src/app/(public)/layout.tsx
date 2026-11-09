import type { ReactNode } from 'react';
import { PageShell } from '@/components/pages/page-shell';
export default function PublicLayout({children}:{children:ReactNode}){return <PageShell>{children}</PageShell>}
