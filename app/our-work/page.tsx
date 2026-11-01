import type { Metadata } from "next";
import OurWorkLayout from "@/app/components/our-work/OurWorkLayout";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Explore how KindredHope Foundation integrates education, nutrition, and mobile healthcare across partner communities.",
};

export default function OurWorkPage() {
  return <OurWorkLayout />;
}
