'use client';
import { ArrowUpLeft, Check, LoaderCircle } from 'lucide-react';
import { useInquirySubmission, INQUIRY_SUCCESS_MESSAGE } from './use-inquiry-submission';
export function EditorialInquiry(){
 const {form,status,onSubmit,onChange}=useInquirySubmission();
 return <form ref={form} className="pc-inquiry min-w-0" onChange={onChange} onSubmit={onSubmit} aria-busy={status==='submitting'}>
  <div className="pc-form-row grid gap-6 sm:grid-cols-2"><label>الاسم<input name="name" autoComplete="name" required minLength={2} maxLength={100}/></label><label>البريد الإلكتروني<input name="email" autoComplete="email" type="email" required maxLength={254} dir="ltr"/></label></div>
  <label>ما الذي تحتاجه؟<select name="service"><option>الإنتاج الإبداعي</option><option>الاستراتيجية والتسويق</option><option>كلاهما</option><option>لنستكشف معًا</option></select></label>
  <label>حدّثنا عن فكرتك<textarea name="message" rows={3} required minLength={10} maxLength={3000}/></label>
  <button type="submit" className="pc-primary" disabled={status==='submitting'}>{status==='submitting'?'جارٍ الإرسال…':status==='success'?'تم الإرسال':'إرسال الطلب'}{status==='submitting'?<LoaderCircle size={18} className="motion-safe:animate-spin"/>:status==='success'?<Check size={18}/>:<ArrowUpLeft size={18}/>}</button>
  <div className="pc-form-status" role="status" aria-live="polite">{status==='success'&&<p>{INQUIRY_SUCCESS_MESSAGE}</p>}</div>
 </form>;
}
