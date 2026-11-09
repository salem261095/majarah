/** Session storage keeps reloads consistent; memory covers blocked/unavailable storage. */
export const OPENING_SESSION_KEY='majarra:opening-seen:v1';
type SessionStore=Pick<Storage,'getItem'|'setItem'>;
export function createOpeningSession(){
 let seen=false;
 return {
  hasSeen(storage?:SessionStore){
   if(seen)return true;
   try{return storage?.getItem(OPENING_SESSION_KEY)==='1'}catch{return false}
  },
  remember(storage?:SessionStore){
   seen=true;
   try{storage?.setItem(OPENING_SESSION_KEY,'1')}catch{/* Navigation still uses the memory fallback. */}
  },
 };
}
export const openingSession=createOpeningSession();
export function openingStorage(){try{return window.sessionStorage}catch{return undefined}}
// Runs in the document head before the first paint, preventing a black flash on return visits.
export const OPENING_BOOTSTRAP_SCRIPT=`try{if(sessionStorage.getItem('${OPENING_SESSION_KEY}')==='1')document.documentElement.dataset.majarraOpening='done'}catch{}`;
