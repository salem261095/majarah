import { describe, expect, it } from 'vitest';
import { parseSurfaceColor, cursorToneForSurface } from '../src/lib/cursor-contrast';
describe('adaptive cursor section contrast',()=>{
 it('uses white over the dark brand canvas, deep violet and brand purple surfaces',()=>{
  for(const color of ['rgb(11, 9, 21)','rgb(21, 7, 110)','rgb(125, 65, 175)'])expect(cursorToneForSurface([parseSurfaceColor(color)!])).toBe('dark');
 });
 it('uses purple over white and off-white studio/contact surfaces',()=>{
  for(const color of ['rgb(255, 255, 255)','rgb(244, 240, 233)'])expect(cursorToneForSurface([parseSurfaceColor(color)!])).toBe('light');
 });
 it('ignores transparent child backgrounds when determining the section beneath them',()=>{
  expect(cursorToneForSurface([[0,0,0,0],[244,240,233,1]])).toBe('light');expect(cursorToneForSurface([[0,0,0,0],[21,7,110,1]])).toBe('dark');
 });
 it('composites translucent dark surfaces against light ancestors',()=>{
  expect(cursorToneForSurface([[0,0,0,.8],[255,255,255,1]])).toBe('dark');expect(cursorToneForSurface([[0,0,0,.1],[255,255,255,1]])).toBe('light');
 });
 it('handles modern computed srgb colors and percentage rgb channels',()=>{
  expect(parseSurfaceColor('color(srgb 1 1 1 / 0.5)')).toEqual([255,255,255,.5]);expect(parseSurfaceColor('rgb(100% 100% 100% / 50%)')![0]).toBeCloseTo(255);expect(parseSurfaceColor('rgba(11, 9, 21, 0.8)')).toEqual([11,9,21,.8]);
 });
 it('tolerates unknown color formats and defaults an unspecified surface to the dark site canvas',()=>{
  expect(parseSurfaceColor('not-a-color')).toBeNull();expect(parseSurfaceColor('transparent')).toEqual([0,0,0,0]);expect(cursorToneForSurface([])).toBe('dark');
 });
});
