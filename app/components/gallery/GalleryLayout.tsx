"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FiArrowUpRight, FiX } from "react-icons/fi";

import galleryData from "@/app/data/gallery.json";
import type { GalleryPageData } from "@/app/types/gallery";
import InnerPagesBanner from "@/app/components/layouts/InnerPageBanner";
import MainContainer from "@/app/components/ui/MainContainer";
import { PrimaryButton } from "@/app/components/ui/Button";

const data = galleryData as GalleryPageData;
const EASE = [0.22, 1, 0.36, 1] as const;

export default function GalleryLayout() {
    const reduce = useReducedMotion();
    const [activeCategory, setActiveCategory] = useState(data.allFilterLabel);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const categories = [data.allFilterLabel, ...Array.from(new Set(data.items.map((item) => item.category)))];
    const selected = data.items.find((item) => item.id === selectedId);
    const visibleItems = useMemo(() => activeCategory === data.allFilterLabel ? data.items : data.items.filter((item) => item.category === activeCategory), [activeCategory]);

    const reveal: Variants = {
        hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
    };

    return (
        <div className="bg-[#f5f7f2] text-[#0b1635]">
            <InnerPagesBanner image={data.hero.image}>{data.hero.title}</InnerPagesBanner>
            <main className="pb-20 pt-10 md:pb-32 md:pt-20">
                <MainContainer>
                    <section className="mx-6 md:mx-0" aria-labelledby="gallery-heading">
                        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={reveal} className="max-w-3xl">
                            <span className="inline-flex items-center gap-2 rounded-full border border-[#0b1635]/15 bg-white px-4 py-1.5 text-sm font-medium shadow-sm"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#71927b]" />{data.intro.badge}</span>
                            <h1 id="gallery-heading" className="mt-6 text-5xl font-black leading-[1.02] tracking-[-0.04em] md:text-7xl">{data.intro.title}</h1>
                            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#0b1635]/70">{data.intro.description}</p>
                        </motion.div>

                        <div className="mt-10 flex flex-wrap gap-2" aria-label="Filter gallery">
                            {categories.map((category) =>
                                 <button key={category} type="button" onClick={() => setActiveCategory(category)} aria-pressed={activeCategory === category} className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0b1635] ${activeCategory === category ? "bg-[#0b1635] text-white" : "bg-white text-[#0b1635] hover:bg-[#dcebdd]"}`}>{category}

                            </button>)}
                        </div>

                        <motion.div layout className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3">
                            {visibleItems.map((item, index) => <motion.article key={item.id} layout initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={reveal} className={`group relative mb-5 break-inside-avoid overflow-hidden rounded-[1.5rem] bg-[#dcebdd] ${index % 3 === 0 ? "min-h-[30rem]" : "min-h-[22rem]"}`}><button type="button" onClick={() => setSelectedId(item.id)} className="absolute inset-0 z-10 text-left focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white" aria-label={`Open ${item.title}`}>
                                <Image src={item.image} alt={item.imageAlt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                <span className="absolute inset-0 bg-linear-to-t from-[#0b1635]/90 via-[#0b1635]/15 to-transparent" />
                                <span className="absolute inset-x-0 bottom-0 p-6 text-white">
                                    <span className="block text-xs font-bold uppercase tracking-[0.18em] text-[#cfe4e0]">{item.category}</span>
                                    <span className="mt-2 block text-2xl font-extrabold leading-tight">{item.title}
                                    </span>
                                    <span className="mt-2 block max-w-xs text-sm leading-6 text-white/75">{item.description}
                                    </span>
                                </span>
                                <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0b1635] transition-transform duration-300 group-hover:rotate-45">
                                    <FiArrowUpRight />
                                </span>
                            </button>
                            </motion.article>)}
                        </motion.div>
                    </section>

                    <motion.section initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={reveal} className="mx-6 mt-16 rounded-[2rem] bg-[#0b1635] p-8 text-white md:mx-0 md:mt-24 md:flex md:items-center md:justify-between md:gap-10 md:p-12"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#cfe4e0]">{data.cta.eyebrow}</p><h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight md:text-4xl">{data.cta.title}</h2></div><div className="mt-8 md:mt-0"><PrimaryButton href={data.cta.buttonHref}><span className="flex items-center gap-2">{data.cta.buttonLabel}<FiArrowUpRight /></span></PrimaryButton></div></motion.section>
                </MainContainer>
            </main>

            {selected && <div role="dialog" aria-modal="true" aria-label={selected.title} className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0b1635]/85 p-5" onClick={() => setSelectedId(null)}><div className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}><div className="relative aspect-video"><Image src={selected.image} alt={selected.imageAlt} fill sizes="100vw" className="object-contain bg-[#0b1635]" /></div><div className="flex items-start justify-between gap-5 p-5 md:p-7"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#71927b]">{selected.category}</p><h2 className="mt-2 text-2xl font-extrabold">{selected.title}</h2></div><button type="button" onClick={() => setSelectedId(null)} aria-label="Close image preview" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e9f2e6] text-[#0b1635] hover:bg-[#dcebdd]"><FiX size={20} /></button></div></div></div>}
        </div>
    );
}
