import type { Metadata } from "next";
import ProjectLayout from "@/app/components/project/ProjectLayout";
import projectsData from "@/app/data/projects.json";

export const metadata: Metadata = {
  title: "Projects",
  description: projectsData.intro.description,
};

export default function ProjectsPage() {
  return <ProjectLayout />;
}
