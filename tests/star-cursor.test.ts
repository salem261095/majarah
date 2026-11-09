import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { StarCursor } from '../src/components/star-cursor';
import { STAR_PATH, STAR_BURST_COLORS, cursorSpinTarget, stepCursorSpin, starBurst } from '../src/lib/star-cursor';
describe('movement-responsive star cursor',()=>{
 it('responds to faster movement with faster spin while keeping sudden jumps bounded',()=>{
  expect(cursorSpinTarget(800)).toBeGreaterThan(cursorSpinTarget(80));expect(cursorSpinTarget(100000)).toBe(18);expect(cursorSpinTarget(0)).toBe(0);
 });
 it('continues spinning smoothly after a movement and then comes to rest',()=>{
  const spin={angle:0,velocity:8,target:8};stepCursorSpin(spin,1/60);expect(spin.angle).toBeGreaterThan(0);expect(spin.velocity).toBeGreaterThan(0);expect(spin.velocity).toBeLessThan(8);
  for(let i=0;i<600;i++)stepCursorSpin(spin,1/60);expect(spin.velocity).toBe(0);expect(spin.target).toBe(0);expect(stepCursorSpin(spin,1/60)).toBe(false);
 });
 it('uses the same transparent star silhouette for the main cursor and native fallback',()=>{
  const html=renderToStaticMarkup(createElement(StarCursor));const svg=readFileSync(fileURLToPath(new URL('../public/brand-cursor.svg',import.meta.url)),'utf8');
  expect(html).toContain(STAR_PATH);expect(svg).toContain(STAR_PATH);expect(svg).toContain('fill="none"');expect(svg).not.toContain('<rect');expect(html).not.toContain('<rect');expect(html).toContain('aria-hidden="true"');
 });
});
describe('star click burst',()=>{
 it('starts all particles at full cursor scale and opacity and uses multiple brand colors',()=>{
  const burst=starBurst(10,()=>.5);expect(burst).toHaveLength(10);
  expect(new Set(burst.map(p=>p.color))).toEqual(new Set(STAR_BURST_COLORS));
  for(const part of burst){expect(part.scale).toBe(1);expect(part.opacity).toBe(1);expect(Math.abs(part.rotation)).toBeGreaterThanOrEqual(360)}
 });
 it('spreads outward in different directions with a bounded lifetime',()=>{
  const burst=starBurst(10,()=>.5);expect(new Set(burst.map(p=>Math.atan2(p.y,p.x)))).toHaveProperty('size',10);
  expect(burst.some(p=>p.x>0)).toBe(true);expect(burst.some(p=>p.x<0)).toBe(true);expect(burst.some(p=>p.y>0)).toBe(true);expect(burst.some(p=>p.y<0)).toBe(true);
  for(const part of burst){expect(Math.hypot(part.x,part.y)).toBeGreaterThan(100);expect(part.duration).toBeGreaterThanOrEqual(.7);expect(part.duration).toBeLessThanOrEqual(1.05)}
 });
});
