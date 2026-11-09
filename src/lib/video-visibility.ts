type Rect={top:number;right:number;bottom:number;left:number};
/** Opaque successor cards obscure everything below their upper edge in a project stack. */
export function visibleVideoScore(rect:Rect,viewport:{width:number;height:number},clip?:Rect,coveringTop=Infinity):number{
 if(viewport.width<=0||viewport.height<=0)return 0;
 const width=Math.max(0,Math.min(rect.right,viewport.width,clip?.right??viewport.width)-Math.max(0,rect.left,clip?.left??0));
 const height=Math.max(0,Math.min(rect.bottom,viewport.height,clip?.bottom??viewport.height,coveringTop)-Math.max(0,rect.top,clip?.top??0));
 return width*height/(viewport.width*viewport.height);
}
