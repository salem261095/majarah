import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
vi.mock('next/navigation',()=>({usePathname:()=>'/'}));
import HomePage from '../src/app/page';
import { SiteFooter } from '../src/components/site-footer';
describe('homepage rename and playback controls',()=>{
 it('renders the actual homepage after the Majarah component rename',()=>{
  const html=renderToStaticMarkup(createElement(HomePage));expect(html).toContain('id="rh-title"');expect(html).toContain('id="hd-work"');expect(html).not.toContain('<majarrahHome');expect(html).not.toContain('إيقاف الحركة');expect(html).not.toContain('ni-footer-motion');
 });
 it('renders the footer without a pause control',()=>{
  const html=renderToStaticMarkup(createElement(SiteFooter));expect(html).not.toContain('<button');expect(html).toContain('halla@majarah.sa');
 });
 it('includes live ambient project films coordinated with the corresponding cover',()=>{
  const html=renderToStaticMarkup(createElement(HomePage));expect(html).toMatch(/class="ni-project-ambient" aria-hidden="true"><div class="es-video/);expect(html.match(/data-project-layer="\d" data-video-viewport="true"/g)).toHaveLength(4);
 });
});
