export type SurfaceColor=readonly [number,number,number,number];
export type CursorTone='dark'|'light';
/** Browser-computed colors: legacy rgb/rgba and modern color(srgb) from color-mix. */
export function parseSurfaceColor(value:string):SurfaceColor|null{
 if(value==='transparent')return [0,0,0,0];
 const srgb=value.match(/^color\(srgb\s+(.+)\)$/i);
 const rgb=value.match(/^rgba?\((.+)\)$/i);
 if(!srgb&&!rgb)return null;
 const parts=(srgb?.[1]||rgb![1]).trim().split(/[\s,/]+/);
 if(parts.length<3)return null;
 const component=(part:string)=>part.endsWith('%')?parseFloat(part)*2.55:parseFloat(part)*(srgb?255:1);
 const alpha=parts[3]?(parts[3].endsWith('%')?parseFloat(parts[3])/100:parseFloat(parts[3])):1;
 const result=[component(parts[0]),component(parts[1]),component(parts[2]),alpha];
 return result.every(Number.isFinite)?result as unknown as SurfaceColor:null;
}
/** Composite transparent ancestors front-to-back, then classify the resulting section surface. */
export function cursorToneForSurface(colors:readonly SurfaceColor[]):CursorTone{
 let alpha=0,r=0,g=0,b=0;
 for(const color of colors){const contribution=(1-alpha)*Math.max(0,Math.min(1,color[3]));r+=color[0]*contribution;g+=color[1]*contribution;b+=color[2]*contribution;alpha+=contribution;if(alpha>=.999)break}
 // An unspecified surface uses the site's dark canvas rather than an assumed white page.
 const linear=(channel:number)=>{const c=Math.max(0,Math.min(255,channel))/255;return c<=.04045?c/12.92:Math.pow((c+.055)/1.055,2.4)};
 const luminance=.2126*linear(r)+.7152*linear(g)+.0722*linear(b);
 return luminance<.35?'dark':'light';
}
export function resolveCursorTone(target:Element):CursorTone{
 const surface=target.closest('[data-cursor-theme],dialog,header,footer,section,.ni-light,.ip-light')||target;
 const explicit=target.closest('[data-cursor-theme]')?.getAttribute('data-cursor-theme');if(explicit==='dark'||explicit==='light')return explicit;
 const colors:SurfaceColor[]=[];
 for(let node:Element|null=surface;node;node=node.parentElement){const color=parseSurfaceColor(getComputedStyle(node).backgroundColor);if(color){colors.push(color);if(color[3]>=.999)break}}
 return cursorToneForSurface(colors);
}
