import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';
import { describe, expect, it } from 'vitest';
const app=fileURLToPath(new URL('../src/app/',import.meta.url));
const tokens=postcss.parse(readFileSync(app+'design-system.css','utf8'));
const sheets=readdirSync(app).filter(name=>name.endsWith('.css')&&name!=='design-system.css');
const declarations=sheets.flatMap(file=>{const result:{file:string;prop:string;value:string}[]=[];postcss.parse(readFileSync(app+file,'utf8')).walkDecls(decl=>{result.push({file,prop:decl.prop,value:decl.value})});return result});
const withoutVariables=(value:string)=>value.replace(/var\([^)]*\)/g,'');
describe('central design tokens',()=>{
 it('keeps the five approved brand colors in the shared theme',()=>{
  const values=new Map<string,string>();tokens.walkDecls(decl=>{values.set(decl.prop,decl.value)});
  expect(['violet','deep','midnight','blue','purple'].map(name=>values.get('--color-brand-'+name))).toEqual(['#190c89','#15076e','#0b0915','#14299f','#7d41af']);
 });
 it('prevents component styles from introducing literal colors or local design-token definitions',()=>{
  for(const {file,prop,value} of declarations){expect(withoutVariables(value),`${file}: ${prop}`).not.toMatch(/#[\da-f]{3,8}\b|\brgba?\(|\bhsla?\(|\b(?:white|black)\b/i);if(prop.startsWith('--'))expect(prop,`${file}: ${prop}`).toBe('--service-gray')}
 });
 it('keeps typography, spacing, offsets and radii on shared scales',()=>{
  for(const {file,prop,value} of declarations){const literal=withoutVariables(value);const context=`${file}: ${prop}: ${value}`;
   if(/^(?:padding|margin|inset|scroll-padding|scroll-margin)(?:-|$)|^(?:top|right|bottom|left|outline-offset|(?:row-|column-)?gap)$/.test(prop))expect(literal,context).not.toMatch(/\d(?:px|em|rem|vw|vh|svh|dvh|%)/);
   if(/^(?:font(?:-size|-weight|-family)?|line-height|letter-spacing|border(?:-(?:top|bottom)-(?:left|right))?-radius)$/.test(prop))expect(literal.replace(/\b(?:clamp|min|max|calc)\b/g,'').trim(),context).toMatch(/^(?:inherit|normal|initial|unset|0|none|[\s/,()]*)$/);
  }
 });
 it('defines every primitive token referenced by components and avoids malformed nested names',()=>{
  const names=new Set<string>();tokens.walkDecls(decl=>{names.add(decl.prop)});
  for(const {file,value} of [...declarations,{file:'design-system.css',value:tokens.toString()}]){
   expect(value,file).not.toMatch(/var\(--[^(),\s]*var\(/);
   for(const match of value.matchAll(/var\((--(?:color-|space-|text-|weight-|leading-|tracking-|radius-|font-(?:arabic|handwritten|latin|label|mono)\b|client-(?:row-height|cell-width|logo-width|logo-height|static-cell-height)\b)[\w-]*)/g))expect(names.has(match[1]),`${file}: ${match[1]}`).toBe(true);
  }
 });
});
