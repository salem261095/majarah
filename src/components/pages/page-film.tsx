'use client';
import { EditorialVideo } from '../editorial-video';
import { useSiteMotion } from './page-shell';
import type { VideoDirectory } from '@/lib/home-media';
export function PageFilm({name,label,directory='editorial',manual=false,group}:{name:string;label:string;directory?:VideoDirectory;manual?:boolean;group?:string}){
 const paused=useSiteMotion();return <EditorialVideo name={name} label={label} directory={directory} group={group} mode={manual?'manual':'loop'} paused={paused}/>;
}
