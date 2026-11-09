'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
export const INQUIRY_SUCCESS_MESSAGE='تم إرسال طلبك بنجاح. شكرًا لتواصلك معنا، سنتواصل معك قريبًا.';
/** Frontend submission simulation until the approved backend integration is connected. */
export function useInquirySubmission(){
 const form=useRef<HTMLFormElement>(null),timer=useRef<number|null>(null);
 const [status,setStatus]=useState<'idle'|'submitting'|'success'>('idle');
 function clear(){if(timer.current!==null){window.clearTimeout(timer.current);timer.current=null}}
 useEffect(()=>()=>clear(),[]);
 function onSubmit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();
  if(timer.current!==null||!form.current?.reportValidity())return;
  setStatus('submitting');
  timer.current=window.setTimeout(()=>{
   timer.current=null;form.current?.reset();setStatus('success');
  },650);
 }
 function onChange(){clear();setStatus('idle')}
 return {form,status,onSubmit,onChange};
}
