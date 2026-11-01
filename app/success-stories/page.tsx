import type { Metadata } from "next";
import SuccessStoriesLayout from "@/app/components/success-stories/SuccessStoriesLayout";
import storiesData from "@/app/data/success-stories.json";

export const metadata: Metadata = {
  title: "Success Stories",
  description: storiesData.hero.description,
};

export default function SuccessStoriesPage() {
  return <SuccessStoriesLayout />;
}
