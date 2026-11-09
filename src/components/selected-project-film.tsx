'use client';
import { EditorialVideo } from './editorial-video';
import { getVideoAsset } from '@/lib/assets';
import { selectedWorkSource, type SelectedWorkProject } from '@/lib/home-media';
export function SelectedProjectFilm({project,mobile,label,group,paused}:{project:SelectedWorkProject;mobile:boolean|null;label:string;group:string;paused:boolean}){
 if(mobile===null){
  const desktop=selectedWorkSource(project,false),portrait=selectedWorkSource(project,true);
  const desktopPoster=getVideoAsset(desktop.media,desktop.directory).poster,mobilePoster=getVideoAsset(portrait.media,portrait.directory).poster;
  return <div className="es-video es-video-poster"><picture><source media="(max-width:760px)" srcSet={mobilePoster}/><img src={desktopPoster} alt={label} loading="lazy" decoding="async"/></picture></div>;
 }
 const source=selectedWorkSource(project,mobile);
 return <EditorialVideo key={`${source.directory}/${source.media}`} name={source.media} directory={source.directory} label={label} group={group} paused={paused}/>;
}
