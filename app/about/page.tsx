import type { Metadata } from "next";
import AboutPageSections from "../components/about/AboutPageSections";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn how KindredHope Foundation partners with local communities to build lasting education, nutrition, and healthcare programs.",
};

export default function AboutPage() {
  return <AboutPageSections />;
}
