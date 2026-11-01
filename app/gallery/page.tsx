import type { Metadata } from "next";
import GalleryLayout from "@/app/components/gallery/GalleryLayout";
import galleryData from "@/app/data/gallery.json";

export const metadata: Metadata = {
  title: "Impact Gallery",
  description: galleryData.hero.description,
};

export default function GalleryPage() {
  return <GalleryLayout />;
}
