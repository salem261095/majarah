'use client';
import { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getVideoAsset, type VideoDirectory } from '@/lib/assets';
import { registerVideo, refreshVideo, playManagedVideo, type ManagedVideo } from '@/lib/media-coordinator';
type Mode='loop'|'scrub'|'manual';
export function EditorialVideo({name,label,mode='loop',paused=false,directory='editorial',group}:{name:string;label:string;mode?:Mode;paused?:boolean;directory?:VideoDirectory;group?:string}){
 const asset=getVideoAsset(name,directory);
 const video=useRef<HTMLVideoElement>(null),wrapper=useRef<HTMLDivElement>(null),entry=useRef<ManagedVideo|null>(null);
 const [load,setLoad]=useState(false),[failed,setFailed]=useState(false),[progress,setProgress]=useState(0),[playing,setPlaying]=useState(false),[requested,setRequested]=useState(false),[ready,setReady]=useState(false);
 const state=useRef({paused,failed});state.current={paused,failed};
 useEffect(()=>{setFailed(false);setLoad(false);setReady(false);setRequested(false)},[asset.src]);
 useEffect(()=>{
  const node=video.current,box=wrapper.current;if(!node||!box)return;
  let target=0,loading=false;
  const anchor=mode==='scrub'?box.closest<HTMLElement>('.es-film-story')||box:box;
  const player:ManagedVideo={video:node,anchor,score:0,mode,enabled:false,intent:mode==='loop',managedPause:false,group,
   enabledNow:()=>!state.current.paused&&!state.current.failed,
   load:()=>{if(!loading){loading=true;setLoad(true)}},seek};
  entry.current=player;
  node.muted=true;node.defaultMuted=true;node.volume=0;
  const unregister=registerVideo(player);
  gsap.registerPlugin(ScrollTrigger);
  const motion=gsap.matchMedia();
  if(mode==='scrub')motion.add('(prefers-reduced-motion: no-preference)',()=>{
   const playhead={value:0};
   gsap.to(playhead,{value:1,ease:'none',scrollTrigger:{trigger:anchor,start:'top top',end:'bottom bottom',scrub:.35,invalidateOnRefresh:true},onUpdate:()=>{target=playhead.value;setProgress(Math.round(target*100));refreshVideo(player)}});
  });
  function seek(){if(!node||node.readyState<1||!Number.isFinite(node.duration)||node.seeking)return;const time=target*Math.max(0,node.duration-.05);if(Math.abs(node.currentTime-time)>.04)node.currentTime=time}
  const schedule=()=>refreshVideo(player);
  function onPlay(){setPlaying(true);if(mode==='manual')player.intent=true;schedule()}
  function onPause(){setPlaying(false);if(player.managedPause)player.managedPause=false;else if(mode==='manual')player.intent=false;schedule()}
  function ended(){player.intent=false;setPlaying(false);schedule()}
  node.addEventListener('loadedmetadata',schedule);node.addEventListener('loadeddata',schedule);node.addEventListener('seeked',schedule);node.addEventListener('play',onPlay);node.addEventListener('pause',onPause);node.addEventListener('ended',ended);
  return()=>{motion.revert();node.removeEventListener('loadedmetadata',schedule);node.removeEventListener('loadeddata',schedule);node.removeEventListener('seeked',schedule);node.removeEventListener('play',onPlay);node.removeEventListener('pause',onPause);node.removeEventListener('ended',ended);unregister();node.pause();entry.current=null};
 },[asset.src,name,directory,mode,group]);
 useEffect(()=>{if(entry.current)refreshVideo(entry.current)},[paused,failed]);
 function requestPlayback(){const player=entry.current;if(!player||failed)return;if(playing){player.intent=false;player.video.pause()}else{player.intent=true;setRequested(true);setLoad(true);playManagedVideo(player)}refreshVideo(player)}
 return <div ref={wrapper} className={`es-video es-video-${mode} ${playing?'is-playing':''}`}><video ref={video} src={load&&!failed?asset.src:undefined} poster={asset.poster} muted playsInline loop={mode==='loop'} controls={mode==='manual'&&requested} preload={load?'auto':'none'} aria-label={label} onLoadedData={()=>setReady(true)} onError={()=>setFailed(true)}/>{mode==='manual'&&!failed&&<><button className="pc-reel-control" onClick={requestPlayback} aria-label={playing?'إيقاف الفيلم مؤقتًا':'تشغيل الفيلم'}>{playing?<Pause size={21}/>:<Play size={23}/>}<span>{playing?'إيقاف مؤقت':'شاهد الفيلم'}</span></button><span className="pc-reel-status" role="status">{playing?'قيد التشغيل':requested&&!ready?'جارٍ تحميل الفيلم…':requested?'متوقف مؤقتًا':'شريط مختارات'}</span></>}{mode==='scrub'&&<><div className="es-film-progress" aria-hidden="true"><span style={{transform:`scaleX(${progress/100})`}}/></div><span className="es-film-time" aria-hidden="true">{String(progress).padStart(3,'0')} / 100</span></>}{failed&&<span className="es-video-fallback">تعذّر تحميل الفيديو</span>}</div>;
}
