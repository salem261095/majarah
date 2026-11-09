import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { videoAssets, imageAssets, getVideoAsset } from '../src/lib/assets';
const root=fileURLToPath(new URL('../',import.meta.url));
const migrations=JSON.parse(readFileSync(root+'docs/asset-migration.json','utf8')) as {files:{from:string;to:string;sha256:string;bytes:number;role:string}[]};
describe('central asset library',()=>{
 it('resolves every registered video, poster and image in the new folder',()=>{
  const urls=[...Object.values(imageAssets),...Object.values(videoAssets).flatMap(group=>Object.values(group).flatMap(asset=>[asset.src,asset.poster]))];
  expect(new Set(urls).size).toBe(urls.length);
  for(const url of urls){expect(url.startsWith('/assets/'),url).toBe(true);expect(existsSync(root+'public'+url),url).toBe(true);expect(url.split('/').at(-1)).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*\.[a-z0-9]+$/)}
 });
 it('preserves every moved file byte for byte, including matching originals',()=>{
  expect(migrations.files).toHaveLength(60);
  for(const file of migrations.files){const bytes=readFileSync(root+file.to);expect(bytes.length,file.to).toBe(file.bytes);expect(createHash('sha256').update(bytes).digest('hex'),file.to).toBe(file.sha256);expect(existsSync(root+file.from),file.from).toBe(false)}
 });
 it('reports unknown logical media IDs rather than silently inventing a URL',()=>{
  expect(()=>getVideoAsset('missing-video')).toThrow('Unknown video asset');
 });
});
