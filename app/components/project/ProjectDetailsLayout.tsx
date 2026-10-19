"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";

import MainContainer from "@/app/components/ui/MainContainer";
import type { ProjectItem } from "@/app/types/project";
import InnerPagesBanner from "../layouts/InnerPageBanner";

import projects from '@/app/data/projects.json'

interface ProjectDetailsLayoutProps {
    project: ProjectItem;
    related: ProjectItem[];
}

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ProjectDetailsLayout({ project, related }: ProjectDetailsLayoutProps) {
    const reduce = useReducedMotion();
    const reveal: Variants = {
        hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
    };

    return (
        <div>
            <InnerPagesBanner image={projects.projectDetailsHero?.image}>
                {projects.projectDetailsHero?.title}
            </InnerPagesBanner>

            <main className="bg-[#f5f7f2] pb-20  text-[#0b1635] md:pb-32 pt-18">


                <MainContainer>


                    <motion.div initial="hidden" animate="show" variants={reveal} className="mx-6 mb-10 md:mx-0">
                        <Link href="/projects" className="group inline-flex items-center gap-2 text-sm font-semibold text-[#476451] transition-colors hover:text-[#0b1635] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0b1635]"><FiArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />Back to projects</Link>
                    </motion.div>

                    <article className="mx-6 overflow-hidden rounded-[2rem] border border-[#0b1635]/10 bg-white shadow-[0_24px_70px_rgba(11,22,53,0.08)] md:mx-0">
                        <header className="grid lg:grid-cols-[0.85fr_1.15fr]">
                            <div className="flex flex-col justify-center p-7 md:p-12 lg:p-16" style={{ backgroundColor: project.tint }}>
                                <motion.p initial="hidden" animate="show" variants={reveal} className="text-xs font-bold uppercase tracking-[0.2em] text-[#476451]">{project.category} · {project.impact}</motion.p>
                                <motion.h1 initial="hidden" animate="show" variants={reveal} className="mt-5 text-5xl font- leading-[1.02] tracking-[-0.04em] md:text-5xl">{project.title}</motion.h1>
                                <motion.p initial="hidden" animate="show" variants={reveal} className="mt-7 text-lg leading-8 text-[#0b1635]/70">{project.detail.lead}</motion.p>
                            </div>
                            <div className="relative min-h-[23rem] lg:min-h-[36rem]"><Image src={project.image} alt={project.imageAlt} fill priority sizes="(min-width: 1024px) 65vw, 100vw" className="object-cover" /></div>
                        </header>

                        <div className="p-7 md:p-12 lg:p-16">
                            <div className="mx-auto max-w-4xl">
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div className="rounded-2xl bg-[#e9f2e6] p-6"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#71927b]">Project focus</p><p className="mt-3 text-2xl font-extrabold tracking-tight">{project.category}</p></div>
                                    <div className="rounded-2xl bg-[#cfe4e0] p-6"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#476451]">Community impact</p><p className="mt-3 text-2xl font-extrabold tracking-tight">{project.impact}</p></div>
                                </div>

                                <div className="mt-14 space-y-14">
                                    {project.detail.sections.map((section, index) => (
                                        <motion.section key={section.title} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} variants={reveal} className="grid gap-7 md:grid-cols-[0.9fr_1.1fr] md:items-center">
                                            <div className={`relative min-h-[18rem] overflow-hidden rounded-2xl ${index % 2 ? "md:order-2" : ""}`}><Image src={section.image} alt={section.title} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover transition-transform duration-700 hover:scale-105" /></div>
                                            <div className={index % 2 ? "md:order-1" : ""}><span className="text-xs font-bold uppercase tracking-[0.2em] text-[#71927b]">0{index + 1}</span><h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">{section.title}</h2><p className="mt-5 text-lg leading-8 text-[#0b1635]/70">{section.description}</p></div>
                                        </motion.section>
                                    ))}
                                </div>

                                <blockquote className="mt-14 border-l-4 border-[#71927b] bg-[#e9f2e6] px-6 py-6 text-xl font-semibold italic leading-9 text-[#385340] md:px-9">“{project.detail.quote}”</blockquote>
                            </div>
                        </div>
                    </article>

                    {related.length > 0 && <section className="mx-6 mt-16 md:mx-0 md:mt-24" aria-labelledby="related-projects-heading"><div className="flex items-end justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#71927b]">Keep exploring</p><h2 id="related-projects-heading" className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">More projects</h2></div><Link href="/projects" className="hidden items-center gap-2 text-sm font-bold underline underline-offset-4 sm:flex">View all<FiArrowUpRight /></Link></div><div className="mt-7 grid gap-5 sm:grid-cols-2">{related.map((item) => <Link key={item.slug} href={`/projects/${item.slug}`} className="group overflow-hidden rounded-2xl border border-[#0b1635]/10 bg-white shadow-sm transition-shadow hover:shadow-xl hover:shadow-[#0b1635]/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0b1635]"><div className="relative min-h-48 overflow-hidden"><Image src={item.image} alt={item.imageAlt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" /></div><div className="p-5" style={{ backgroundColor: item.tint }}><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#476451]">{item.category}</p><h3 className="mt-2 text-xl font-extrabold">{item.title}</h3></div></Link>)}</div></section>}
                </MainContainer>
            </main>
        </div>
    );
}
