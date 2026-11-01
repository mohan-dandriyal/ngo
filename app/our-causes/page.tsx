import type { Metadata } from "next";
import CausesLayout from "@/app/components/causes/CausesLayout";
import causesData from "@/app/data/causes.json";

export const metadata: Metadata = {
  title: "Our Causes",
  description: causesData.intro.description,
};

export default function OurCausesPage() {
  return <CausesLayout />;
}
