export const STAR_PATH='M32 12v40M12 32h40M18 18l28 28M18 46l28-28';
export const STAR_BURST_COLORS=['--color-brand-purple','--color-brand-blue','--color-brand-violet','--color-accent-light','--color-brand-deep'] as const;
export type CursorSpin={angle:number;velocity:number;target:number};
/** Speed is pixels/second; cap energy so a sudden pointer jump stays controlled. */
export function cursorSpinTarget(speed:number){return Math.min(18,Math.max(0,speed)*.012)}
export function stepCursorSpin(state:CursorSpin,seconds:number){
 const dt=Math.min(.04,Math.max(0,seconds));
 state.target*=Math.exp(-5*dt);
 state.velocity+=(state.target-state.velocity)*(1-Math.exp(-12*dt));
 state.angle=(state.angle+state.velocity*dt)%(Math.PI*2);
 if(state.target<.01&&state.velocity<.01){state.target=0;state.velocity=0}
 return state.velocity>0||state.target>0;
}
export function starBurst(count=10,random:()=>number=Math.random){
 return Array.from({length:count},(_,index)=>{
  const direction=index/count*Math.PI*2+(random()-.5)*.3;
  const distance=110+random()*100;
  return {x:Math.cos(direction)*distance,y:Math.sin(direction)*distance,rotation:(random()>.5?1:-1)*(360+random()*360),duration:.7+random()*.35,color:STAR_BURST_COLORS[index%STAR_BURST_COLORS.length],scale:1,opacity:1};
 });
}
