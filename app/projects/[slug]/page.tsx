import { Suspense } from "react";
import { notFound } from "next/navigation";

import projectsData from "@/app/data/projects.json";
import ProjectDetailsLayout from "@/app/components/project/ProjectDetailsLayout";
import type { ProjectItem } from "@/app/types/project";
import Loading from "@/app/components/ui/Loading";

const projects = projectsData.projects as ProjectItem[];
type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return projects.map((project) => ({ slug: project.slug }));
}

async function ProjectDetailsContent({ params }: PageProps) {
    const { slug } = await params;
    const project = projects.find((item) => item.slug === slug);

    if (!project) notFound();

    return <ProjectDetailsLayout project={project} related={projects.filter((item) => item.slug !== slug).slice(0, 2)} />;
}

export default function ProjectDetailsPage({ params }: PageProps) {
    return <Suspense fallback={<Loading />}><ProjectDetailsContent params={params} /></Suspense>;
}
