import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { registerVideo, requestVideoFrame, refreshVideo, type ManagedVideo } from '../src/lib/media-coordinator';
let frames:Map<number,()=>void>,sequence:number,callback:IntersectionObserverCallback;
let windowTarget:EventTarget,documentTarget:EventTarget&{hidden:boolean};
let dispose:(()=>void)[];
const viewport={top:0,left:0,right:1000,bottom:800,width:1000,height:800} as DOMRect;
function element(rect=viewport){return {getBoundingClientRect:vi.fn(()=>rect),closest:()=>null} as unknown as HTMLElement}
function player(group='hero',anchor=element()):ManagedVideo{
 const video={paused:true,readyState:2,play:vi.fn(function(this:{paused:boolean}){this.paused=false;return Promise.resolve()}),pause:vi.fn(function(this:{paused:boolean}){this.paused=true})} as unknown as HTMLVideoElement;
 return {video,anchor,group,score:0,mode:'loop',enabled:false,intent:true,managedPause:false,enabledNow:()=>true,load:vi.fn(),seek:vi.fn()};
}
function nearby(...players:ManagedVideo[]){callback(players.map(p=>({target:p.anchor,isIntersecting:true,intersectionRatio:1,boundingClientRect:viewport,intersectionRect:viewport,rootBounds:viewport,time:0})),{} as IntersectionObserver)}
function flush(){const pending=[...frames.values()];frames.clear();pending.forEach(fn=>fn())}
beforeEach(()=>{
 frames=new Map();sequence=0;dispose=[];windowTarget=new EventTarget();documentTarget=Object.assign(new EventTarget(),{hidden:false});
 vi.stubGlobal('window',windowTarget);vi.stubGlobal('document',documentTarget);vi.stubGlobal('navigator',{});vi.stubGlobal('innerWidth',1000);vi.stubGlobal('innerHeight',800);
 vi.stubGlobal('requestAnimationFrame',(fn:()=>void)=>{frames.set(++sequence,fn);return sequence});vi.stubGlobal('cancelAnimationFrame',(id:number)=>frames.delete(id));
 vi.stubGlobal('matchMedia',()=>Object.assign(new EventTarget(),{matches:false}));
 vi.stubGlobal('IntersectionObserver',class{constructor(cb:IntersectionObserverCallback){callback=cb}observe(){}unobserve(){}disconnect(){}});
});
afterEach(()=>{dispose.forEach(stop=>stop());vi.unstubAllGlobals();vi.restoreAllMocks()});
describe('page-wide media coordination',()=>{
 it('installs one scroll listener and coalesces many moving-film requests',()=>{
  const add=vi.spyOn(windowTarget,'addEventListener'),a=player(),b=player();dispose.push(registerVideo(a),registerVideo(b));nearby(a,b);requestVideoFrame('hero');requestVideoFrame('hero');
  expect(add.mock.calls.filter(([name])=>name==='scroll')).toHaveLength(1);expect(frames.size).toBe(1);flush();
  expect(a.anchor.getBoundingClientRect).toHaveBeenCalledTimes(1);expect(b.anchor.getBoundingClientRect).toHaveBeenCalledTimes(1);expect(a.video.play).toHaveBeenCalledTimes(1);expect(b.video.play).toHaveBeenCalledTimes(1);
 });
 it('caches shared clipping geometry and does not measure other groups during a hero tick',()=>{
  const clip=element(),a=player(),b=player(),mosaic=player('mosaic');
  a.anchor.closest=vi.fn(()=>clip);b.anchor.closest=vi.fn(()=>clip);
  dispose.push(registerVideo(a),registerVideo(b),registerVideo(mosaic));nearby(a,b,mosaic);flush();
  expect(clip.getBoundingClientRect).toHaveBeenCalledTimes(1);
  vi.mocked(a.anchor.getBoundingClientRect).mockClear();vi.mocked(mosaic.anchor.getBoundingClientRect).mockClear();requestVideoFrame('hero');flush();
  expect(a.anchor.getBoundingClientRect).toHaveBeenCalledTimes(1);expect(mosaic.anchor.getBoundingClientRect).not.toHaveBeenCalled();
 });
 it('keeps distant videos unloaded and pauses immediately when the tab is hidden',()=>{
  const visible=player(),distant=player();dispose.push(registerVideo(visible),registerVideo(distant));nearby(visible);flush();
  expect(distant.anchor.getBoundingClientRect).not.toHaveBeenCalled();expect(distant.load).not.toHaveBeenCalled();expect(visible.video.paused).toBe(false);
  documentTarget.hidden=true;documentTarget.dispatchEvent(new Event('visibilitychange'));expect(visible.video.pause).toHaveBeenCalledTimes(1);
 });
 it('removes the shared listeners and pending frame when the last video unmounts',()=>{
  const remove=vi.spyOn(windowTarget,'removeEventListener'),a=player(),stop=registerVideo(a);stop();expect(frames.size).toBe(0);expect(remove.mock.calls.filter(([name])=>name==='scroll')).toHaveLength(1);
 });
 it('inherits visibility when a second player shares an already-observed anchor',()=>{
  const first=player();dispose.push(registerVideo(first));nearby(first);flush();
  const second=player('hero',first.anchor);dispose.push(registerVideo(second));flush();
  expect(second.video.play).toHaveBeenCalledTimes(1);
 });
 it('respects reduced motion for loops while allowing explicitly requested manual playback',()=>{
  vi.stubGlobal('matchMedia',()=>Object.assign(new EventTarget(),{matches:true}));
  const loop=player(),manual={...player('manual'),mode:'manual' as const,intent:false};
  dispose.push(registerVideo(loop),registerVideo(manual));nearby(loop,manual);flush();
  expect(loop.load).not.toHaveBeenCalled();expect(loop.video.play).not.toHaveBeenCalled();expect(manual.video.play).not.toHaveBeenCalled();
  manual.intent=true;refreshVideo(manual);flush();expect(manual.video.play).toHaveBeenCalledTimes(1);
 });
});
