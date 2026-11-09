export type InquiryData = { name: string; email: string; company?: string; phone?: string; service: string; message: string; budget?: string; timeline?: string };
export function buildInquirySummary(data: InquiryData) {
    const fields: [string, string | undefined][] = [['الاسم', data.name], ['البريد الإلكتروني', data.email], ['المنشأة', data.company], ['الهاتف', data.phone], ['الخدمة', data.service], ['الميزانية المقترحة', data.budget], ['الموعد المقترح', data.timeline], ['الفكرة', data.message]];
    return 'طلب مشروع — مجرّة\n' + fields.filter(([, value]) => value?.trim()).map(([label, value]) => `${label}: ${value!.trim()}`).join('\n');
}
export function inquiryMailto(summary: string) { return `mailto:halla@majarah.sa?subject=${encodeURIComponent('طلب مشروع — مجرّة')}&body=${encodeURIComponent(summary)}` }
