import { describe, expect, it } from 'vitest';
import { createOpeningSession, OPENING_BOOTSTRAP_SCRIPT, OPENING_SESSION_KEY } from '../src/lib/opening-session';
function storage(){const values=new Map<string,string>();return {getItem:(key:string)=>values.get(key)??null,setItem:(key:string,value:string)=>{values.set(key,value)}}}
describe('cinematic opening session',()=>{
 it('plays on a fresh session and skips after completion or explicit skipping',()=>{
  const state=createOpeningSession(),store=storage();expect(state.hasSeen(store)).toBe(false);state.remember(store);expect(state.hasSeen(store)).toBe(true);expect(store.getItem(OPENING_SESSION_KEY)).toBe('1');
 });
 it('remembers a reload through session storage but allows a fresh browser session',()=>{
  const store=storage();createOpeningSession().remember(store);expect(createOpeningSession().hasSeen(store)).toBe(true);expect(createOpeningSession().hasSeen(storage())).toBe(false);
 });
 it('keeps in-memory navigation working when session storage is blocked',()=>{
  const blocked={getItem:()=>{throw Error('blocked')},setItem:()=>{throw Error('blocked')}};
  const state=createOpeningSession();expect(state.hasSeen(blocked)).toBe(false);expect(()=>state.remember(blocked)).not.toThrow();expect(state.hasSeen(blocked)).toBe(true);
 });
 it('hides the returning-session overlay before hydration and tolerates blocked storage',()=>{
  const doc={documentElement:{dataset:{} as Record<string,string>}},store=storage();store.setItem(OPENING_SESSION_KEY,'1');
  const run=new Function('sessionStorage','document',OPENING_BOOTSTRAP_SCRIPT);run(store,doc);expect(doc.documentElement.dataset.majarraOpening).toBe('done');
  expect(()=>run({getItem:()=>{throw Error('blocked')}},doc)).not.toThrow();
 });
});
