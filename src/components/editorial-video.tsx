'use client';
import { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getVideoAsset, type VideoDirectory } from '@/lib/assets';
import { visibleVideoScore } from '@/lib/video-visibility';
import { chooseVisiblePlayers } from '@/lib/video-playback';
type Mode='loop'|'scrub'|'manual';
type Player={video:HTMLVideoElement;score:number;mode:Mode;enabled:boolean;intent:boolean;managedPause:boolean;group?:string};
const players=new Set<Player>();
function coordinate(){
 const winners=chooseVisiblePlayers([...players]);
 players.forEach(p=>{if(winners.includes(p)&&!document.hidden&&p.video.readyState>=2){if(p.video.paused)void p.video.play().catch(()=>{})}else if(!p.video.paused){p.managedPause=true;p.video.pause()}});
}
export function EditorialVideo({name,label,mode='loop',paused=false,priority=false,directory='editorial',group}:{name:string;label:string;mode?:Mode;paused?:boolean;priority?:boolean;directory?:VideoDirectory;group?:string}){
 const asset=getVideoAsset(name,directory);
 const video=useRef<HTMLVideoElement>(null),wrapper=useRef<HTMLDivElement>(null),entry=useRef<Player|null>(null);
 const [load,setLoad]=useState(false),[failed,setFailed]=useState(false),[progress,setProgress]=useState(0),[playing,setPlaying]=useState(false),[requested,setRequested]=useState(false),[ready,setReady]=useState(false);
 useEffect(()=>{setFailed(false)},[asset.src]);
 useEffect(()=>{
  const node=video.current,box=wrapper.current;if(!node||!box)return;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const connection=(navigator as Navigator&{connection?:{saveData?:boolean}}).connection;
  const player:Player={video:node,score:0,mode,enabled:false,intent:mode==='loop',managedPause:false,group};entry.current=player;players.add(player);
  node.muted=true;node.defaultMuted=true;node.volume=0;
  gsap.registerPlugin(ScrollTrigger);
  const motion=gsap.matchMedia();
  let frame=0,target=0;
  const anchor=mode==='scrub'?box.closest<HTMLElement>('.es-film-story')||box:box;
  function update(){frame=0;const rect=anchor.getBoundingClientRect();player.enabled=!paused&&!failed&&(mode==='manual'||(!reduce.matches&&!connection?.saveData));const clip=anchor.closest<HTMLElement>('[data-video-viewport]')?.getBoundingClientRect();const layer=anchor.closest<HTMLElement>('[data-project-layer]'),next=layer?.nextElementSibling;const coveringTop=next?.matches('[data-project-layer]')?next.getBoundingClientRect().top:Infinity;player.score=visibleVideoScore(rect,{width:innerWidth,height:innerHeight},clip,coveringTop);if(group&&player.score>0&&player.enabled)setLoad(true);if(mode==='scrub'&&player.enabled&&player.score>0)seek();coordinate()}
  if(mode==='scrub'&&!paused&&!connection?.saveData){motion.add('(prefers-reduced-motion: no-preference)',()=>{const playhead={value:0};gsap.to(playhead,{value:1,ease:'none',scrollTrigger:{trigger:anchor,start:'top top',end:'bottom bottom',scrub:.35,invalidateOnRefresh:true},onUpdate:()=>{target=playhead.value;setProgress(Math.round(target*100));if(player.enabled)seek()}})})}
  function seek(){if(!node||node.readyState<1||!Number.isFinite(node.duration)||node.seeking)return;const time=target*Math.max(0,node.duration-.05);if(Math.abs(node.currentTime-time)>.04)node.currentTime=time}
  function schedule(){if(!frame)frame=requestAnimationFrame(update)}
  function onPlay(){setPlaying(true);if(mode==='manual')player.intent=true;coordinate()}
  function onPause(){setPlaying(false);if(player.managedPause)player.managedPause=false;else if(mode==='manual')player.intent=false}
  function ended(){player.intent=false;setPlaying(false);coordinate()}
  const nearby=new IntersectionObserver(entries=>{if(mode!=='manual'&&entries.some(e=>e.isIntersecting)&&!reduce.matches&&!connection?.saveData)setLoad(true);schedule()},{rootMargin:priority?'0px':'300px'});nearby.observe(anchor);
  node.addEventListener('loadedmetadata',schedule);node.addEventListener('loadeddata',schedule);node.addEventListener('seeked',seek);node.addEventListener('play',onPlay);node.addEventListener('pause',onPause);node.addEventListener('ended',ended);window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);document.addEventListener('visibilitychange',schedule);window.addEventListener('majarra:media-frame',schedule);reduce.addEventListener('change',schedule);schedule();
  return()=>{motion.revert();cancelAnimationFrame(frame);nearby.disconnect();node.pause();players.delete(player);coordinate();entry.current=null;node.removeEventListener('loadedmetadata',schedule);node.removeEventListener('loadeddata',schedule);node.removeEventListener('seeked',seek);node.removeEventListener('play',onPlay);node.removeEventListener('pause',onPause);node.removeEventListener('ended',ended);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);document.removeEventListener('visibilitychange',schedule);window.removeEventListener('majarra:media-frame',schedule);reduce.removeEventListener('change',schedule)};
 },[name,directory,mode,paused,priority,failed,group,asset.src]);
 function requestPlayback(){const player=entry.current;if(!player||failed)return;if(playing){player.intent=false;player.video.pause();coordinate()}else{player.intent=true;setRequested(true);setLoad(true);if(player.video.readyState>=2)void player.video.play().catch(()=>{});coordinate()}}
 return <div ref={wrapper} className={`es-video es-video-${mode} ${playing?'is-playing':''}`}><video ref={video} src={load&&!failed?asset.src:undefined} poster={asset.poster} muted playsInline loop={mode==='loop'} controls={mode==='manual'&&requested} preload={load?'auto':'none'} aria-label={label} onLoadedData={()=>setReady(true)} onError={()=>setFailed(true)}/>{mode==='manual'&&!failed&&<><button className="pc-reel-control" onClick={requestPlayback} aria-label={playing?'إيقاف الفيلم مؤقتًا':'تشغيل الفيلم'}>{playing?<Pause size={21}/>:<Play size={23}/>}<span>{playing?'إيقاف مؤقت':'شاهد الفيلم'}</span></button><span className="pc-reel-status" role="status">{playing?'قيد التشغيل':requested&&!ready?'جارٍ تحميل الفيلم…':requested?'متوقف مؤقتًا':'شريط مختارات'}</span></>}{mode==='scrub'&&<><div className="es-film-progress" aria-hidden="true"><span style={{transform:`scaleX(${progress/100})`}}/></div><span className="es-film-time" aria-hidden="true">{String(progress).padStart(3,'0')} / 100</span></>}{failed&&<span className="es-video-fallback">تعذّر تحميل الفيديو</span>}</div>;
}
