/** Coalesces invalidations into one read phase and one write phase per frame. */
export function createFrameBatch<T>(options:{
 requestFrame:(callback:()=>void)=>number;
 cancelFrame:(id:number)=>void;
 read:(item:T)=>void;
 write:()=>void;
}){
 const pending=new Set<T>();
 let frame:number|undefined;
 function flush(){
  frame=undefined;
  const items=[...pending];pending.clear();
  for(const item of items)options.read(item);
  options.write();
 }
 return {
  request(items:Iterable<T>){
   for(const item of items)pending.add(item);
   if(frame===undefined&&pending.size)frame=options.requestFrame(flush);
  },
  remove(item:T){pending.delete(item)},
  dispose(){if(frame!==undefined)options.cancelFrame(frame);frame=undefined;pending.clear()},
 };
}
