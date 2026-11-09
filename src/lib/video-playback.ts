export type PlaybackCandidate={score:number;mode:'loop'|'scrub'|'manual';enabled:boolean;intent:boolean;group?:string};
/** Explicit playback wins. Loops in a visible mosaic may play together. */
export function chooseVisiblePlayers<T extends PlaybackCandidate>(players:readonly T[]):T[]{
 const visible=players.filter(player=>player.enabled&&player.score>0);
 const manual=visible.filter(player=>player.mode==='manual'&&player.intent).sort((a,b)=>b.score-a.score)[0];
 if(manual)return [manual];
 if(visible.some(player=>player.mode==='scrub'))return [];
 const loops=visible.filter(player=>player.mode==='loop'&&player.intent).sort((a,b)=>b.score-a.score);
 const winner=loops[0];
 if(!winner)return [];
 return winner.group?loops.filter(player=>player.group===winner.group):[winner];
}
export function chooseVisiblePlayer<T extends PlaybackCandidate>(players:readonly T[]):T|undefined{
 return chooseVisiblePlayers(players)[0];
}
