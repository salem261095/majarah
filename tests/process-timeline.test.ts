import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ProcessTimeline } from '../src/components/process-timeline';
import { homeSteps } from '../src/lib/home-content';
function render(paused=false){return renderToStaticMarkup(createElement(ProcessTimeline,{paused}))}
describe('Arabic process timeline',()=>{
 it('retains all four original stage titles and descriptions in the original order',()=>{
  const html=render();expect(homeSteps).toHaveLength(4);
  let position=-1;
  for(const step of homeSteps){const next=html.indexOf(`<h3>${step.title}</h3>`);expect(next).toBeGreaterThan(position);expect(html).toContain(`<p>${step.body}</p>`);position=next}
 });
 it('provides an ordered timeline and a labelled, keyboard-reachable RTL scroll region',()=>{
  const html=render();expect(html).toContain('<ol class="ni-timeline-steps">');expect(html.match(/<li class="ni-timeline-step"/g)).toHaveLength(4);expect(html).toContain('tabindex="0" role="region"');expect(html).toContain('dir="rtl"');expect(html).toContain('aria-labelledby="process-title"');
 });
 it('serves fully readable content before animation and with motion paused',()=>{
  for(const html of [render(),render(true)]){expect(html).not.toContain('style="opacity:0');expect(html).not.toContain('data-timeline-animated="true"');for(const step of homeSteps)expect(html).toContain(step.body)}
 });
 it('keeps the heading and timeline in the same moving dark panel',()=>{
  const html=render();expect(html).not.toContain('ni-grid ni-light');
  const panel=html.indexOf('class="ni-timeline-sticky"'),heading=html.indexOf('class="ni-section-heading"'),timeline=html.indexOf('class="ni-timeline-window"');
  expect(panel).toBeGreaterThan(0);expect(heading).toBeGreaterThan(panel);expect(timeline).toBeGreaterThan(heading);
 });
});
