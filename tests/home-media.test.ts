import { getVideoAsset } from '../src/lib/assets';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { selectedWork, creativeServiceMedia, heroFilms, reelTiles, type VideoDirectory } from '../src/lib/home-media';
const publicAsset=(path:string)=>fileURLToPath(new URL(`../public${path}`,import.meta.url));
function expectFilm(name:string,directory:VideoDirectory='editorial'){
 const film=getVideoAsset(name,directory);
 for(const path of [film.src,film.poster]){
  expect(existsSync(publicAsset(path)),`Missing homepage asset: ${path}`).toBe(true);
 }
}
describe('homepage media integrity',()=>{
 it('provides a playable file and poster for every selected-work cover and dialog',()=>{
  for(const project of selectedWork)expectFilm(project.media,project.directory);
 });
 it('provides both films and posters for every creative production panel',()=>{
  for(const service of creativeServiceMedia){expectFilm(service.name);expectFilm(service.landscape.name,service.landscape.directory)}
 });
 it('provides all six portrait-strip films and posters',()=>{
  for(const film of heroFilms)expectFilm(film);
 });
 it('provides all showreel mosaic films and posters',()=>{
  for(const tile of reelTiles)expectFilm(tile.name);
 });
});
