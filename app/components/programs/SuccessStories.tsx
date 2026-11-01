"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { FiCheckCircle, FiMapPin } from "react-icons/fi";
import MainContainer from "../ui/MainContainer";
import programsData from "@/app/data/programs.json";
import { ProgramsData, SuccessStory } from "@/app/types/programs";
import { SectionBadge, SectionDescription, SectionTitle } from "../SectionHeader";

const data = programsData as ProgramsData;

interface SuccessStoriesProps {
  stories?: SuccessStory[];
  badge?: string;
  title?: string;
  description?: string;
}

function SuccessStories({
  stories = data.successStories.stories,
  badge = data.successStories.badge,
  title = data.successStories.title,
  description = data.successStories.description,
}: SuccessStoriesProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="success-stories-heading"
      className="bg-[#f2efe9] py-18"
    >
      <MainContainer>
        <motion.div
          initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75 }}
        >
          <div className="max-w-3xl">
            <SectionBadge>{badge}</SectionBadge>
            <SectionTitle id="success-stories-heading">{title}</SectionTitle>
            <SectionDescription>{description}</SectionDescription>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((story, index) => (
              <motion.article
                key={story.title}
                initial={{
                  opacity: reduceMotion ? 1 : 0,
                  y: reduceMotion ? 0 : 24,
                }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: reduceMotion ? 0 : (index % 3) * 0.1,
                }}
                whileHover={reduceMotion ? undefined : { y: -6 }}
                className="group flex flex-col overflow-hidden rounded-3xl border border-[#0f291e]/10 bg-white shadow-xs transition-shadow duration-300 hover:shadow-xl hover:shadow-[#0f291e]/10"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-[#0f291e]">
                  <Image
                    src={story.image}
                    alt={story.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#0f291e] shadow-xs">
                    {story.category}
                  </span>
                  {story.location && (
                    <span className="absolute bottom-3 left-4 inline-flex items-center gap-1 rounded-full bg-[#0f291e]/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      <FiMapPin size={11} className="text-[#f4a261]" />
                      {story.location}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#2d6a4f]">
                    <FiCheckCircle size={14} className="text-[#d96b43]" />
                    {story.result}
                  </div>

                  <h3 className="font-display mt-3 text-2xl font-semibold leading-snug tracking-tight text-[#0f291e]">
                    {story.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#0f291e]/75 sm:text-base">
                    {story.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </MainContainer>
    </section>
  );
}

export default SuccessStories;
