import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { clientLogos } from '../src/lib/assets';
const root=fileURLToPath(new URL('../',import.meta.url));
const extraction=JSON.parse(readFileSync(root+'docs/client-logo-extraction.json','utf8')) as {source:string;sourceWidth:number;sourceHeight:number;logos:{src:string;crop:{x:number;y:number;width:number;height:number}}[]};
describe('supplied client-logo extraction',()=>{
 it('provides eighteen distinct standalone logo files',()=>{
  expect(clientLogos).toHaveLength(18);expect(new Set(clientLogos.map(logo=>logo.src)).size).toBe(18);
  clientLogos.forEach(logo=>expect(existsSync(root+'public'+logo.src),logo.src).toBe(true));
 });
 it('preserves the original pixels rather than redrawing the brand marks',()=>{
  const original=readFileSync(root+extraction.source);
  for(const logo of clientLogos){const svg=readFileSync(root+'public'+logo.src,'utf8');const encoded=svg.match(/data:image\/png;base64,([^"\s]+)/)?.[1];expect(encoded,logo.src).toBeDefined();expect(Buffer.from(encoded!,'base64').equals(original),logo.src).toBe(true)}
 });
 it('isolates each logo without including adjacent marks or the sheet credit',()=>{
  extraction.logos.forEach((logo,i)=>{const a=logo.crop;expect(a.x).toBeGreaterThanOrEqual(0);expect(a.y).toBeGreaterThanOrEqual(0);expect(a.x+a.width).toBeLessThanOrEqual(extraction.sourceWidth);expect(a.y+a.height).toBeLessThan(445);for(const other of extraction.logos.slice(i+1)){const b=other.crop;const overlapX=Math.min(a.x+a.width,b.x+b.width)-Math.max(a.x,b.x);const overlapY=Math.min(a.y+a.height,b.y+b.height)-Math.max(a.y,b.y);expect(overlapX>0&&overlapY>0,logo.src+' / '+other.src).toBe(false)}});
 });
});
