import { createFrameBatch } from './frame-batch';
import { chooseVisiblePlayers, type PlaybackCandidate } from './video-playback';
import { visibleVideoScore } from './video-visibility';
export type ManagedVideo=PlaybackCandidate&{
 video:HTMLVideoElement;
 anchor:HTMLElement;
 managedPause:boolean;
 enabledNow:()=>boolean;
 load:()=>void;
 seek:()=>void;
};
type Registration={player:ManagedVideo;nearby:boolean;clip:HTMLElement|null;cover:Element|null};
const registrations=new Map<ManagedVideo,Registration>();
const byAnchor=new Map<Element,Set<ManagedVideo>>();
const pendingPlay=new WeakSet<HTMLVideoElement>();
let observer:IntersectionObserver|undefined;
let reduced:MediaQueryList|undefined;
let connection:(EventTarget&{saveData?:boolean})|undefined;
let rectangles=new Map<Element,DOMRect>();
function rect(element:Element){let value=rectangles.get(element);if(!value){value=element.getBoundingClientRect();rectangles.set(element,value)}return value}
export function playManagedVideo(player:ManagedVideo){
 const video=player.video;
 if(!video.paused||pendingPlay.has(video)||video.readyState<2)return;
 pendingPlay.add(video);
 void video.play().catch(()=>{}).finally(()=>pendingPlay.delete(video));
}
const batch=createFrameBatch<ManagedVideo>({
 requestFrame:callback=>requestAnimationFrame(callback),
 cancelFrame:id=>cancelAnimationFrame(id),
 read(player){
  const item=registrations.get(player);if(!item)return;
  player.enabled=!document.hidden&&player.enabledNow()&&(player.mode==='manual'||(!reduced?.matches&&!connection?.saveData));
  if(!item.nearby||!player.enabled){player.score=0;return}
  player.score=visibleVideoScore(rect(player.anchor),{width:innerWidth,height:innerHeight},item.clip?rect(item.clip):undefined,item.cover?rect(item.cover).top:Infinity);
 },
 write(){
  // All geometry has been read before loading, seeking or changing playback.
  rectangles=new Map();
  const players=[...registrations.keys()];
  const winners=new Set(chooseVisiblePlayers(players));
  for(const player of players){
   const item=registrations.get(player)!;
   if(item.nearby&&player.enabled&&player.mode!=='manual'&&(!player.group||player.score>0))player.load();
   if(player.mode==='scrub'&&player.enabled&&player.score>0)player.seek();
   if(winners.has(player)&&!document.hidden)playManagedVideo(player);
   else if(!player.video.paused){player.managedPause=true;player.video.pause()}
  }
 },
});
/** Animated groups invalidate only their own nearby films, rather than the entire page. */
export function requestVideoFrame(group?:string){
 batch.request([...registrations.values()].filter(item=>item.nearby&&(!group||item.player.group===group)).map(item=>item.player));
}
function updateAll(){batch.request(registrations.keys())}
function onVisibility(){
 // Pause immediately in background tabs, including when requestAnimationFrame is suspended.
 if(document.hidden)for(const player of registrations.keys())if(!player.video.paused){player.managedPause=true;player.video.pause()}
 updateAll();
}
function start(){
 reduced=matchMedia('(prefers-reduced-motion: reduce)');
 connection=(navigator as Navigator&{connection?:EventTarget&{saveData?:boolean}}).connection;
 observer=new IntersectionObserver(entries=>{
  const changed:ManagedVideo[]=[];
  for(const entry of entries)for(const player of byAnchor.get(entry.target)||[]){const item=registrations.get(player);if(item){item.nearby=entry.isIntersecting;changed.push(player)}}
  batch.request(changed);
 },{rootMargin:'300px'});
 window.addEventListener('scroll',requestScroll,{passive:true});
 window.addEventListener('resize',updateAll);
 document.addEventListener('visibilitychange',onVisibility);
 reduced.addEventListener('change',updateAll);
 connection?.addEventListener('change',updateAll);
}
function requestScroll(){requestVideoFrame()}
function stop(){
 observer?.disconnect();observer=undefined;
 window.removeEventListener('scroll',requestScroll);window.removeEventListener('resize',updateAll);
 document.removeEventListener('visibilitychange',onVisibility);reduced?.removeEventListener('change',updateAll);connection?.removeEventListener('change',updateAll);
 reduced=undefined;connection=undefined;batch.dispose();rectangles.clear();
}
export function registerVideo(player:ManagedVideo){
 if(!registrations.size)start();
 const layer=player.anchor.closest('[data-project-layer]');
 const next=layer?.nextElementSibling;
 const anchored=byAnchor.get(player.anchor)||new Set<ManagedVideo>();
 const shared=[...anchored][0];
 const item:Registration={player,nearby:shared?registrations.get(shared)!.nearby:false,clip:player.anchor.closest<HTMLElement>('[data-video-viewport]'),cover:next?.matches('[data-project-layer]')?next:null};
 registrations.set(player,item);
 if(!anchored.size)observer!.observe(player.anchor);anchored.add(player);byAnchor.set(player.anchor,anchored);
 batch.request([player]);
 return ()=>{
  registrations.delete(player);batch.remove(player);
  // Another registration can share an anchor (for example, a scrub stage).
  anchored.delete(player);
  if(!anchored.size){observer?.unobserve(player.anchor);byAnchor.delete(player.anchor)}
  if(!registrations.size)stop();else updateAll();
 };
}
export function refreshVideo(player:ManagedVideo){batch.request([player])}
