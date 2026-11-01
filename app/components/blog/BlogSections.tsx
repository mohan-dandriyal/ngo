import React from "react";
import InnerPagesBanner from "../layouts/InnerPageBanner";
import blog from "@/app/data/blog.json";
import BlogSection from "./BlogSection";

function BlogSections() {
  return (
    <div>
      <InnerPagesBanner
        image={blog.hero.image}
        badge={blog.hero.badge}
        description={blog.hero.description}
        breadcrumbs={blog.hero.breadcrumbs}
      >
        {blog.hero.heroTitle}
      </InnerPagesBanner>

      <BlogSection />
    </div>
  );
}

export default BlogSections;
