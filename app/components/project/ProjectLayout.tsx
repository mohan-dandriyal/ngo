"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

import projectsData from "@/app/data/projects.json";
import type { ProjectPageData } from "@/app/types/project";
import InnerPagesBanner from "@/app/components/layouts/InnerPageBanner";
import MainContainer from "@/app/components/ui/MainContainer";
import { PrimaryButton } from "@/app/components/ui/Button";

const data = projectsData as ProjectPageData;
const EASE = [0.22, 1, 0.36, 1] as const;

export default function ProjectLayout() {
    const reduce = useReducedMotion();
    const featured = data.projects.find((project) => project.featured) ?? data.projects[0];
    const remaining = data.projects.filter((project) => project.slug !== featured?.slug);

    const reveal: Variants = {
        hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
    };

    return (
        <div className="bg-[#f5f7f2] text-[#0b1635]">
            <InnerPagesBanner image={data.hero.image}>{data.hero.title}</InnerPagesBanner>


            <main className="pb-20 pt-10 md:pb-32 md:pt-20">
                <MainContainer>
                    <section className="mx-6 md:mx-0" aria-labelledby="projects-heading">
                        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={reveal} className="max-w-3xl">
                            <span className="inline-flex items-center gap-2 rounded-full border border-[#0b1635]/15 bg-white px-4 py-1.5 text-sm font-medium shadow-sm"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#71927b]" />{data.intro.badge}</span>
                            <h1 id="projects-heading" className="mt-6 text-5xl font-black leading-[1.02] tracking-[-0.04em] md:text-7xl">{data.intro.title}</h1>
                            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#0b1635]/70">{data.intro.description}</p>
                        </motion.div>

                        {featured &&
                            <motion.article initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={reveal} className="mt-12 grid overflow-hidden rounded-[2rem] border border-[#0b1635]/10 bg-white shadow-[0_24px_70px_rgba(11,22,53,0.08)] lg:grid-cols-[1.15fr_0.85fr]">
                                <div className="relative min-h-[22rem] lg:min-h-[34rem]">
                                    <Image src={featured.image} alt={featured.imageAlt} fill priority sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover transition-transform duration-700 hover:scale-105" />
                                </div>
                                <div className="flex flex-col justify-center p-7 md:p-12 lg:p-16" style={{ backgroundColor: featured.tint }}>
                                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#476451]">{data.featuredLabel} · {featured.category}
                                    </span>
                                    <h2 className="mt-5 text-4xl font-black leading-[1.04] tracking-[-0.03em] md:text-5xl">{featured.title}

                                    </h2>
                                    <p className="mt-6 max-w-md text-lg leading-8 text-[#0b1635]/70">{featured.description}
                                    </p>
                                    <div className="mt-8 flex flex-wrap items-center gap-5">
                                        <span className="rounded-full bg-white/70 px-4 py-2 text-sm font-semibold">{featured.impact}
                                        </span>
                                        <Link href={`/projects/${featured.slug}`} className="group inline-flex items-center gap-2 font-bold underline underline-offset-4">
                                            {data.cardLinkLabel}
                                            <FiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.article>}

                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            {remaining.map((project) => <motion.article key={project.slug} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={reveal} className="group overflow-hidden rounded-[2rem] border border-[#0b1635]/10 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-[#0b1635]/10"><Link href={`/projects/${project.slug}`} className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0b1635]"><div className="relative min-h-[18rem] overflow-hidden"><Image src={project.image} alt={project.imageAlt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" /><span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-[#476451]">{project.category}</span></div><div className="p-7 md:p-9" style={{ backgroundColor: project.tint }}><div className="flex items-start justify-between gap-5"><h2 className="max-w-sm text-3xl font-extrabold leading-tight tracking-tight">{project.title}</h2><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#0b1635] transition-transform duration-300 group-hover:rotate-45"><FiArrowUpRight /></span></div><p className="mt-4 max-w-md leading-7 text-[#0b1635]/70">{project.description}</p><p className="mt-6 text-sm font-bold text-[#476451]">{project.impact}</p></div></Link></motion.article>)}
                        </div>
                    </section>

                    <motion.section initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={reveal} className="mx-6 mt-16 rounded-[2rem] bg-[#0b1635] p-8 text-white md:mx-0 md:mt-24 md:flex md:items-center md:justify-between md:gap-10 md:p-12"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#cfe4e0]">{data.cta.eyebrow}</p><h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight md:text-4xl">{data.cta.title}</h2><p className="mt-4 max-w-xl leading-7 text-white/70">{data.cta.description}</p></div><div className="mt-8 shrink-0 md:mt-0"><PrimaryButton href={data.cta.buttonHref}><span className="flex items-center gap-2">{data.cta.buttonLabel}<FiArrowUpRight className="transition-transform duration-300 group-hover:rotate-45" /></span></PrimaryButton></div></motion.section>
                </MainContainer>
            </main>
        </div>
    );
}
