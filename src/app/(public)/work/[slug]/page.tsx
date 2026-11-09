import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectDetail } from '@/components/pages/project-detail';
import { portfolioProjects, findProject } from '@/lib/public-content';
export function generateStaticParams(){return portfolioProjects.map(project=>({slug:project.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const project=findProject(slug);return {title:project?`${project.title} — مجرة`:'العمل غير موجود — مجرة',description:project?.description}}
export default async function ProjectPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const project=findProject(slug);if(!project)notFound();return <ProjectDetail project={project}/>}
