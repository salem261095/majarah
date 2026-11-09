import { describe, expect, it } from 'vitest';
import { chooseVisiblePlayer, chooseVisiblePlayers, type PlaybackCandidate } from '../src/lib/video-playback';
const loop=(score:number):PlaybackCandidate=>({score,mode:'loop',enabled:true,intent:true});
describe('silent video playback coordination',()=>{
 it('chooses only the most visible loop',()=>{const hero=loop(.4),feature=loop(.8);expect(chooseVisiblePlayer([hero,feature])).toBe(feature)});
 it('does not play paused or offscreen media',()=>{expect(chooseVisiblePlayer([{...loop(.9),enabled:false},loop(0)])).toBeUndefined()});
 it('never auto-starts a manual reel',()=>{const hero=loop(.5);expect(chooseVisiblePlayer([hero,{...loop(1),mode:'manual',intent:false}])).toBe(hero)});
 it('gives requested playback priority over loops and a nearby scrub stage',()=>{const reel={...loop(.3),mode:'manual' as const};expect(chooseVisiblePlayer([loop(.9),{...loop(.5),mode:'scrub'},reel])).toBe(reel)});
 it('pauses background loops during the visible scroll-controlled film',()=>{expect(chooseVisiblePlayer([loop(.8),{...loop(.1),mode:'scrub'}])).toBeUndefined()});
 it('does not let an offscreen scrub stage suppress a visible loop',()=>{const hero=loop(.9);expect(chooseVisiblePlayer([hero,{...loop(0),mode:'scrub'}])).toBe(hero)});
});

describe('showreel mosaic playback',()=>{
 it('plays all visible tiles of the winning group together',()=>{
  const a={...loop(.6),group:'mosaic'},b={...loop(.2),group:'mosaic'};
  expect(chooseVisiblePlayers([a,b,loop(.1)])).toEqual([a,b]);
 });
 it('excludes offscreen and paused tiles from the mosaic',()=>{
  const a={...loop(.6),group:'mosaic'};
  expect(chooseVisiblePlayers([a,{...loop(0),group:'mosaic'},{...loop(.4),group:'mosaic',enabled:false}])).toEqual([a]);
 });
 it('pauses every tile when the visitor opens a film',()=>{
  const manual={...loop(.1),mode:'manual' as const};
  expect(chooseVisiblePlayers([{...loop(.7),group:'mosaic'},{...loop(.2),group:'mosaic'},manual])).toEqual([manual]);
 });
 it('does not start a second visible mosaic group',()=>{
  const a={...loop(.6),group:'one'},b={...loop(.2),group:'two'};
  expect(chooseVisiblePlayers([a,b])).toEqual([a]);
 });
});
