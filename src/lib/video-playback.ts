export type PlaybackCandidate={score:number;mode:'loop'|'scrub'|'manual';enabled:boolean;intent:boolean;group?:string};
/** One linear selection per frame. Explicit playback wins; a visible mosaic plays together. */
export function chooseVisiblePlayers<T extends PlaybackCandidate>(players:readonly T[]):T[]{
 let manual:T|undefined,winner:T|undefined,hasScrub=false;
 for(const player of players){
  if(!player.enabled||player.score<=0)continue;
  if(player.mode==='manual'&&player.intent&&(!manual||player.score>manual.score))manual=player;
  if(player.mode==='scrub')hasScrub=true;
  if(player.mode==='loop'&&player.intent&&(!winner||player.score>winner.score))winner=player;
 }
 if(manual)return [manual];
 if(hasScrub||!winner)return [];
 return winner.group?[winner,...players.filter(player=>player!==winner&&player.enabled&&player.score>0&&player.mode==='loop'&&player.intent&&player.group===winner.group)]:[winner];
}
export function chooseVisiblePlayer<T extends PlaybackCandidate>(players:readonly T[]):T|undefined{
 return chooseVisiblePlayers(players)[0];
}
