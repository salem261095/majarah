type ScrollEnvironment={
 hash:string;
 findAnchor:(id:string)=>Pick<HTMLElement,'scrollIntoView'>|null;
 scrollTo:(options:ScrollToOptions)=>void;
};
/** New pages start at their heading; explicit section links keep their intended destination. */
export function scrollToRouteStart({hash,findAnchor,scrollTo}:ScrollEnvironment){
 let id=hash.replace(/^#/,'');
 try{id=decodeURIComponent(id)}catch{/* Preserve a malformed fragment rather than interrupting navigation. */}
 const anchor=id?findAnchor(id):null;
 if(anchor)anchor.scrollIntoView({block:'start',behavior:'instant'});
 else scrollTo({top:0,left:0,behavior:'instant'});
}
