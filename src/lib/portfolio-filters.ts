import type { PortfolioProject } from './public-content';
export type PortfolioFilters={q:string;category:string;sector:string;kind:string;sort:string};
export const emptyPortfolioFilters:PortfolioFilters={q:'',category:'all',sector:'all',kind:'all',sort:'featured'};
export function normalizeArabic(text:string){return text.normalize('NFKC').replace(/[\u064B-\u065F\u0670\u0640]/g,'').replace(/[أإآٱ]/g,'ا').replace(/ى/g,'ي').toLocaleLowerCase('ar').trim()}
export function filterPortfolio(projects:readonly PortfolioProject[],filters:PortfolioFilters){
 const query=normalizeArabic(filters.q);
 const result=projects.filter(project=>(filters.category==='all'||project.category===filters.category)&&(filters.sector==='all'||project.sector===filters.sector)&&(filters.kind==='all'||project.kind===filters.kind)&&(!query||normalizeArabic([project.title,project.client||'',project.label,project.description,...project.deliverables].join(' ')).includes(query)));
 return filters.sort==='title'?[...result].sort((a,b)=>a.title.localeCompare(b.title,'ar')):result;
}
