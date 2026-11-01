import type { Metadata } from "next";
import React from "react";
import BlogSections from "@/app/components/blog/BlogSections";
import blogData from "@/app/data/blog.json";

export const metadata: Metadata = {
  title: "Field Journal & Blog",
  description: blogData.hero.description,
};

function Blog() {
  return <BlogSections />;
}

export default Blog;
