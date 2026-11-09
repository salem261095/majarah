import { describe, expect, it } from 'vitest';
import { fitMosaicScale } from '../src/lib/mosaic-fit';
describe('complete landscape showreel framing',()=>{
 it.each([[1440,900,40],[1920,1080,40],[375,800,20],[768,1024,20]])('keeps all nine landscape frames inside a %sx%s stage',(width,height,inset)=>{
  const gridWidth=3*Math.max(width,height*16/9),gridHeight=gridWidth*9/16;
  const scale=fitMosaicScale(gridWidth,gridHeight,width,height,inset);
  expect(gridWidth*scale).toBeLessThanOrEqual(width-2*inset+.001);
  expect(gridHeight*scale).toBeLessThanOrEqual(height-2*inset+.001);
  expect((gridWidth/3)/(gridHeight/3)).toBeCloseTo(16/9);
 });
 it('replaces the oversized fixed final zoom that clipped the outer columns',()=>{
  expect(fitMosaicScale(4320,2700,1440,900,40)).toBeLessThan(.43);
  expect(fitMosaicScale(1125,2400,375,800,20)).toBeLessThan(.52);
 });
 it('avoids an invalid scale before layout dimensions are available',()=>{
  expect(fitMosaicScale(0,0,0,0)).toBe(1);
 });
});
