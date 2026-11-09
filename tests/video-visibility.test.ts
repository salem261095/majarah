import { describe, expect, it } from 'vitest';
import { visibleVideoScore } from '../src/lib/video-visibility';
const viewport={width:1000,height:800};
const film={top:100,bottom:700,left:0,right:1000};
describe('visibility of stacked project videos',()=>{
 it('counts the exposed area before the next project enters',()=>expect(visibleVideoScore(film,viewport)).toBe(.75));
 it('subtracts the area covered by the incoming project',()=>expect(visibleVideoScore(film,viewport,undefined,400)).toBe(.375));
 it('does not keep a completely covered project playing',()=>expect(visibleVideoScore(film,viewport,undefined,100)).toBe(0));
 it('does not clip a film when the following project is still below it',()=>expect(visibleVideoScore(film,viewport,undefined,750)).toBe(.75));
 it('respects both axes and the clipping stage used by the hero and mosaic',()=>expect(visibleVideoScore(film,viewport,{left:250,right:750,top:200,bottom:600})).toBe(.25));
 it('excludes horizontally offscreen films',()=>expect(visibleVideoScore({...film,left:1200,right:2200},viewport)).toBe(0));
});
