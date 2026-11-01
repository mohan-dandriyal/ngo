"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import MainContainer from "../ui/MainContainer";
import { OutlineButton } from "@/app/components/ui/Button";
import { SectionTitle, SectionDescription, SectionBadge } from "../SectionHeader";
import BlogCard from "@/app/components/blog/BlogCard";
import blogData from "@/app/data/blog.json";
import homeData from "@/app/data/home.json";
import type { Blog } from "@/app/types/blog";

const posts = (blogData.blog as Blog[]).slice(0, 3);
const EASE = [0.22, 1, 0.36, 1] as const;

function BlogSection() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.1 } },
  };
  const fadeUp: Variants = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
  };

  return (
    <section className="overflow-hidden bg-[#f2efe9] py-18" aria-labelledby="blog-heading">
      <MainContainer>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Heading row */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
          >
            <div className="max-w-3xl">
              <SectionBadge>{homeData.blogSection.badge}</SectionBadge>
              <SectionTitle id="blog-heading">{homeData.blogSection.title}</SectionTitle>
              <SectionDescription>{homeData.blogSection.description}</SectionDescription>
            </div>

            {homeData.blogSection.buttonHref && (
              <OutlineButton href={homeData.blogSection.buttonHref}>
                <span>{homeData.blogSection.buttonLabel}</span>
                <FiArrowUpRight
                  aria-hidden="true"
                  className="text-lg transition-transform duration-200 group-hover:rotate-45"
                />
              </OutlineButton>
            )}
          </motion.div>

          {/* 3 Cards in One Row */}
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <BlogCard key={post.id} blog={post} index={index} />
            ))}
          </div>
        </motion.div>
      </MainContainer>
    </section>
  );
}

export default BlogSection;
