import { describe, expect, it, vi } from 'vitest';
import { scrollToRouteStart } from '../src/lib/route-scroll';
describe('new-page scroll position',()=>{
 it('opens a normal page at the top even after leaving a footer',()=>{
  const scrollTo=vi.fn();scrollToRouteStart({hash:'',findAnchor:()=>null,scrollTo});expect(scrollTo).toHaveBeenCalledWith({top:0,left:0,behavior:'instant'});
 });
 it('preserves explicit section destinations rather than forcing every navigation to zero',()=>{
  const scrollTo=vi.fn(),scrollIntoView=vi.fn();scrollToRouteStart({hash:'#hd-work',findAnchor:id=>id==='hd-work'?{scrollIntoView}:null,scrollTo});expect(scrollIntoView).toHaveBeenCalledWith({block:'start',behavior:'instant'});expect(scrollTo).not.toHaveBeenCalled();
 });
 it('handles encoded Arabic fragment IDs and unknown fragments safely',()=>{
  const findAnchor=vi.fn(()=>null),scrollTo=vi.fn();scrollToRouteStart({hash:'#'+encodeURIComponent('الأعمال'),findAnchor,scrollTo});expect(findAnchor).toHaveBeenCalledWith('الأعمال');expect(scrollTo).toHaveBeenCalledTimes(1);
  expect(()=>scrollToRouteStart({hash:'#%bad%',findAnchor,scrollTo})).not.toThrow();
 });
});
