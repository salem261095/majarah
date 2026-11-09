import { getVideoAsset } from '../src/lib/assets';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { portfolioProjects, serviceCatalog, findProject, findService } from '../src/lib/public-content';
import { selectedWork } from '../src/lib/home-media';
import { emptyPortfolioFilters, filterPortfolio, normalizeArabic } from '../src/lib/portfolio-filters';
import { buildInquirySummary, inquiryMailto } from '../src/lib/inquiry-summary';
const asset=(path:string)=>fileURLToPath(new URL(`../public${path}`,import.meta.url));
describe('Arabic public page content and destinations',()=>{
 it('gives every project and service a unique, route-safe slug',()=>{
  for(const entries of [portfolioProjects,serviceCatalog]){expect(new Set(entries.map(item=>item.slug)).size).toBe(entries.length);entries.forEach(item=>expect(item.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/))}
 });
 it('connects each homepage project and portfolio service to a real detail page',()=>{
  selectedWork.forEach(project=>expect(findProject(project.slug)).toBeDefined());
  portfolioProjects.forEach(project=>expect(findService(project.serviceSlug)).toBeDefined());
 });
 it('provides every public project cover, gallery image, film and poster',()=>{
  portfolioProjects.forEach(project=>{expect(existsSync(asset(project.image)),project.image).toBe(true);project.gallery.forEach(image=>expect(existsSync(asset(image.src)),image.src).toBe(true));if(project.video){const film=getVideoAsset(project.video.name,project.video.directory);for(const path of [film.src,film.poster])expect(existsSync(asset(path)),path).toBe(true)}});
 });
 it('returns no record for unknown project and service URLs',()=>{expect(findProject('missing')).toBeUndefined();expect(findService('missing')).toBeUndefined()});
});
describe('portfolio discovery',()=>{
 it('returns all work before any filters are applied',()=>expect(filterPortfolio(portfolioProjects,emptyPortfolioFilters)).toHaveLength(portfolioProjects.length));
 it('finds Arabic titles without hamza, vowel marks or tatweel',()=>{
  expect(normalizeArabic('أَكْوَاب التّـوت')).toBe('اكواب التوت');
  expect(filterPortfolio(portfolioProjects,{...emptyPortfolioFilters,q:'اكواب التوت'}).map(item=>item.slug)).toEqual(['berry-cups']);
 });
 it('combines discipline, sector and media filters instead of matching either one',()=>{
  const result=filterPortfolio(portfolioProjects,{...emptyPortfolioFilters,category:'التصوير',sector:'الأغذية والضيافة',kind:'image'});
  expect(result.map(item=>item.slug)).toEqual(['berry-cups','food-photography']);
 });
 it('returns an empty result for incompatible filters',()=>expect(filterPortfolio(portfolioProjects,{...emptyPortfolioFilters,category:'التصوير',kind:'film'})).toHaveLength(0));
 it('sorts by Arabic title without changing the canonical order',()=>{
  const before=portfolioProjects.map(item=>item.slug);const result=filterPortfolio(portfolioProjects,{...emptyPortfolioFilters,sort:'title'});
  expect(result.map(item=>item.title)).toEqual([...portfolioProjects].map(item=>item.title).sort((a,b)=>a.localeCompare(b,'ar')));expect(portfolioProjects.map(item=>item.slug)).toEqual(before);
 });
});
describe('project inquiry handoff',()=>{
 it('includes supplied brief details and omits empty optional fields',()=>{
  const summary=buildInquirySummary({name:'  سالم  ',email:'hello@example.com',service:'التصوير',message:'تصوير منتجات جديدة',company:'',phone:'',budget:'نناقش معًا'});
  expect(summary).toContain('الاسم: سالم');expect(summary).toContain('الميزانية المقترحة: نناقش معًا');expect(summary).not.toContain('المنشأة:');expect(summary).not.toContain('الهاتف:');
 });
 it('encodes the Arabic summary and newlines in the mail handoff',()=>{
  const summary='فكرة مشروع\nتفاصيل & أسئلة';const link=inquiryMailto(summary);expect(link.startsWith('mailto:halla@majarrah.sa?')).toBe(true);const params=new URLSearchParams(link.split('?')[1]);expect(params.get('body')).toBe(summary);expect(params.get('subject')).toBe('طلب مشروع — مجرة');
 });
});
