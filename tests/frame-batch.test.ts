import { describe, expect, it, vi } from 'vitest';
import { createFrameBatch } from '../src/lib/frame-batch';
function harness(){
 let callback:()=>void=()=>{};
 const order:string[]=[];
 const requestFrame=vi.fn((next:()=>void)=>{callback=next;return 1}),cancelFrame=vi.fn();
 const batch=createFrameBatch<string>({requestFrame,cancelFrame,read:item=>order.push('read:'+item),write:()=>order.push('write')});
 return {batch,order,requestFrame,cancelFrame,flush:()=>callback()};
}
describe('shared animation-frame batching',()=>{
 it('coalesces repeated and overlapping player invalidations into one frame',()=>{
  const h=harness();h.batch.request(['hero-a','hero-b']);h.batch.request(['hero-a']);h.batch.request(['mosaic']);
  expect(h.requestFrame).toHaveBeenCalledTimes(1);h.flush();expect(h.order).toEqual(['read:hero-a','read:hero-b','read:mosaic','write']);
 });
 it('finishes every geometry read before the single playback write phase',()=>{
  const h=harness();h.batch.request(['one','two','three']);h.flush();expect(h.order.at(-1)).toBe('write');expect(h.order.filter(step=>step==='write')).toHaveLength(1);
 });
 it('does not measure unmounted players and cancels pending frames on disposal',()=>{
  const h=harness();h.batch.request(['one','two']);h.batch.remove('one');h.flush();expect(h.order).toEqual(['read:two','write']);h.batch.request(['two']);h.batch.dispose();expect(h.cancelFrame).toHaveBeenCalledWith(1);
 });
 it('does not schedule work for an empty or offscreen animation group',()=>{
  const h=harness();h.batch.request([]);expect(h.requestFrame).not.toHaveBeenCalled();
 });
});
