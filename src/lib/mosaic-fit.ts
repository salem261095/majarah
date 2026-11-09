/** Fit the complete mosaic, including both outer rows/columns, inside its clipping stage. */
export function fitMosaicScale(gridWidth:number,gridHeight:number,stageWidth:number,stageHeight:number,inset=0){
 if(gridWidth<=0||gridHeight<=0||stageWidth<=0||stageHeight<=0)return 1;
 return Math.max(.001,Math.min((stageWidth-2*inset)/gridWidth,(stageHeight-2*inset)/gridHeight,1));
}
