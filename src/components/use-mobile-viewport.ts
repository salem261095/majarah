'use client';
import { useSyncExternalStore } from 'react';
let query:MediaQueryList|undefined;
const viewport=()=>query??=(window.matchMedia('(max-width:760px)'));
const subscribe=(notify:()=>void)=>{const media=viewport();media.addEventListener('change',notify);return()=>media.removeEventListener('change',notify)};
/** Unknown during SSR/hydration: show responsive posters until the correct video is selected. */
export function useMobileViewport(){return useSyncExternalStore<boolean|null>(subscribe,()=>viewport().matches,()=>null)}
