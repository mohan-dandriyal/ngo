"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FiArrowUpRight, FiMapPin, FiX } from "react-icons/fi";
import galleryData from "@/app/data/gallery.json";
import type { GalleryPageData } from "@/app/types/gallery";
import InnerPagesBanner from "@/app/components/layouts/InnerPageBanner";
import MainContainer from "@/app/components/ui/MainContainer";
import { PrimaryButton } from "@/app/components/ui/Button";
import { SectionBadge, SectionDescription, SectionTitle } from "../SectionHeader";

const data = galleryData as GalleryPageData;
const EASE = [0.22, 1, 0.36, 1] as const;

export default function GalleryLayout() {
  const reduce = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState(data.allFilterLabel);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const categories = [
    data.allFilterLabel,
    ...Array.from(new Set(data.items.map((item) => item.category))),
  ];
  const selected = data.items.find((item) => item.id === selectedId);
  const visibleItems = useMemo(
    () =>
      activeCategory === data.allFilterLabel
        ? data.items
        : data.items.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  const reveal: Variants = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  return (
    <div className="bg-[#faf8f5] text-[#0f291e]">
      <InnerPagesBanner
        image={data.hero.image}
        badge={data.hero.badge}
        description={data.hero.description}
        breadcrumbs={data.hero.breadcrumbs}
      >
        {data.hero.title}
      </InnerPagesBanner>

      <section className="py-18" aria-labelledby="gallery-heading">
        <MainContainer>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={reveal}
            className="max-w-3xl"
          >
            <SectionBadge>{data.intro.badge}</SectionBadge>
            <SectionTitle id="gallery-heading">{data.intro.title}</SectionTitle>
            <SectionDescription>{data.intro.description}</SectionDescription>
          </motion.div>

          {/* Filter pills */}
          <div className="mt-8 flex flex-wrap gap-2.5" aria-label="Filter gallery">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
                className={`cursor-pointer rounded-full px-5 py-2.5 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0f291e] ${
                  activeCategory === category
                    ? "bg-[#0f291e] text-white shadow-sm"
                    : "border border-[#0f291e]/12 bg-white text-[#0f291e] hover:bg-[#e6efea]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Masonry-style Grid */}
          <motion.div
            layout
            className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3"
          >
            {visibleItems.map((item, index) => (
              <motion.article
                key={item.id}
                layout
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                variants={reveal}
                className={`group relative mb-6 break-inside-avoid overflow-hidden rounded-3xl border border-[#0f291e]/10 bg-[#0f291e] shadow-sm ${
                  index % 3 === 0 ? "min-h-[26rem]" : "min-h-[21rem]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className="absolute inset-0 z-10 cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
                  aria-label={`Open ${item.title}`}
                >
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-linear-to-t from-[#0f291e]/92 via-[#0f291e]/30 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#f4a261]">
                      <span>{item.category}</span>
                      {item.location && (
                        <>
                          <span>·</span>
                          <span className="inline-flex items-center gap-1 text-white/80">
                            <FiMapPin size={11} />
                            {item.location}
                          </span>
                        </>
                      )}
                    </span>
                    <span className="font-display mt-2 block text-2xl font-semibold leading-tight">
                      {item.title}
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-white/80">
                      {item.description}
                    </span>
                  </span>
                  <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0f291e] transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#d96b43] group-hover:text-white">
                    <FiArrowUpRight size={18} />
                  </span>
                </button>
              </motion.article>
            ))}
          </motion.div>
        </MainContainer>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#f2efe9] py-18">
        <MainContainer>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={reveal}
            className="flex flex-col items-start justify-between gap-8 rounded-3xl bg-[#0f291e] p-8 text-white md:flex-row md:items-center md:p-12"
          >
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f4a261]">
                {data.cta.eyebrow}
              </p>
              <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                {data.cta.title}
              </h2>
              {data.cta.description && (
                <p className="mt-2 text-base text-white/75">
                  {data.cta.description}
                </p>
              )}
            </div>
            <PrimaryButton href={data.cta.buttonHref}>
              <span>{data.cta.buttonLabel}</span>
              <FiArrowUpRight size={18} />
            </PrimaryButton>
          </motion.div>
        </MainContainer>
      </section>

      {/* Lightbox Modal */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
          className="fixed inset-0 z-60 flex items-center justify-center bg-[#0f291e]/88 p-5 backdrop-blur-sm"
          onClick={() => setSelectedId(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-16/10 bg-[#0f291e]">
              <Image
                src={selected.image}
                alt={selected.imageAlt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <div className="flex items-start justify-between gap-5 p-6 md:p-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d96b43]">
                  {selected.category}
                  {selected.location ? ` · ${selected.location}` : ""}
                </p>
                <h2 className="font-display mt-1 text-2xl font-semibold text-[#0f291e] sm:text-3xl">
                  {selected.title}
                </h2>
                <p className="mt-2 text-sm text-[#0f291e]/75 sm:text-base">
                  {selected.description}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                aria-label="Close image preview"
                className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#e6efea] text-[#0f291e] transition-colors hover:bg-[#0f291e] hover:text-white"
              >
                <FiX size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
