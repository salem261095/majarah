import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { SelectedProjectFilm } from '../src/components/selected-project-film';
import { selectedWork, selectedWorkSource } from '../src/lib/home-media';
import { getVideoAsset } from '../src/lib/assets';
function render(mobile:boolean|null){return renderToStaticMarkup(createElement(SelectedProjectFilm,{project:selectedWork[0],mobile,label:'فيلم مختار',group:'selected-project-0',paused:false}))}
describe('responsive selected project loading',()=>{
 it('serves responsive posters without mounting either video before viewport detection',()=>{
  const html=render(null);expect(html).toContain('<picture>');expect(html).toContain('media="(max-width:760px)"');expect(html).not.toContain('<video');expect(html).not.toContain('.mp4');
 });
 it('mounts just the selected orientation, with its matching poster',()=>{
  for(const mobile of [false,true]){
   const html=render(mobile),source=selectedWorkSource(selectedWork[0],mobile),other=selectedWorkSource(selectedWork[0],!mobile);
   expect(html.match(/<video/g)).toHaveLength(1);expect(html).toContain(getVideoAsset(source.media,source.directory).poster);expect(html).not.toContain(getVideoAsset(other.media,other.directory).poster);
  }
 });
});
