import type { Metadata } from "next";
import ProjectLayout from "@/app/components/project/ProjectLayout";
import projectsData from "@/app/data/projects.json";

export const metadata: Metadata = {
  title: "Our Programs",
  description: projectsData.intro.description,
};

export default function OurProgramsPage() {
  return <ProjectLayout />;
}
