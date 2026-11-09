import { describe, expect, it } from 'vitest';
import { processTimings, processCanAnimate } from '../src/lib/process-timing';
describe('readable scroll timeline pacing',()=>{
 it('finishes every title before its description starts, with an explicit delay',()=>{
  for(const mobile of [false,true])for(const phase of processTimings(4,mobile))expect(phase.bodyStart).toBeGreaterThan(phase.titleStart+phase.titleDuration);
 });
 it('finishes each paragraph before the next mobile pan',()=>{
  const phases=processTimings(4,true);
  for(let i=0;i<phases.length-1;i++)expect(phases[i].bodyStart+phases[i].bodyDuration).toBeLessThan(phases[i+1].panStart);
 });
 it('fully resolves incoming mobile text before its stage reaches the centered position',()=>{
  for(const phase of processTimings(4,true).slice(1))expect(phase.bodyStart+phase.bodyDuration).toBeLessThanOrEqual(phase.panStart+phase.panDuration);
 });
 it('resolves the last stage before the end of the scroll story',()=>{
  for(const mobile of [false,true]){const phase=processTimings(4,mobile).at(-1)!;expect(phase.bodyStart+phase.bodyDuration).toBeLessThan(1)}
 });
 it('supports a single stage and rejects an empty timeline',()=>{
  expect(processTimings(1)[0].panDuration).toBe(0);expect(()=>processTimings(0)).toThrow();
 });
});

describe('process timeline responsive animation',()=>{
 it('keeps desktop animation enabled even below 600px viewport height',()=>{
  expect(processCanAnimate({mobile:false,reduced:false,short:true})).toBe(true);
  expect(processCanAnimate({mobile:false,reduced:false,short:false})).toBe(true);
 });
 it('uses the static fallback only for short mobile layouts',()=>{
  expect(processCanAnimate({mobile:true,reduced:false,short:true})).toBe(false);
  expect(processCanAnimate({mobile:true,reduced:false,short:false})).toBe(true);
 });
 it('always respects reduced motion',()=>{
  for(const mobile of [false,true])for(const short of [false,true])expect(processCanAnimate({mobile,reduced:true,short})).toBe(false);
 });
});
