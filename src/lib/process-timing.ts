/** Title first, then copy. Mobile stages resolve before reaching their centered resting position. */
export function processTimings(count:number,mobile=false){
 if(!Number.isInteger(count)||count<1)throw new Error('A process timeline needs at least one stage');
 const interval=1/count;
 return Array.from({length:count},(_,index)=>{
  const start=index*interval;
  return {
   index,start,dotDuration:interval*.16,
   titleStart:mobile?(index===0?0:start-interval*.24):start+interval*.06,
   titleDuration:interval*(mobile?.08:.24),
   bodyStart:mobile?(index===0?interval*.14:start-interval*.10):start+interval*.4,
   bodyDuration:interval*(mobile?.14:.24),
   panStart:index===0?0:start-interval*.24,panDuration:index===0?0:interval*.32,
  };
 });
}

/** Short desktop windows retain animation; only cramped mobile layouts use the static fallback. */
export function processCanAnimate({mobile,reduced,short}:{mobile:boolean;reduced:boolean;short:boolean}){
 return !reduced&&!(mobile&&short);
}
