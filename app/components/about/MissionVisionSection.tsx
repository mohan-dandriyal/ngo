"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import { SectionBadge } from "../SectionHeader";
import type { MissionVisionSection as MissionVisionSectionData } from "@/app/types/about";
import MainContainer from "../ui/MainContainer";

interface MissionVisionSectionProps {
  data: MissionVisionSectionData;
}

const asParagraphs = (content: string | string[]) =>
  Array.isArray(content) ? content : [content];

function MissionVisionSection({ data }: MissionVisionSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="py-18" aria-labelledby="mission-heading">
      <MainContainer>
        <div className="space-y-18">
          {/* Mission Row */}
          <motion.div
            className="grid gap-10 md:grid-cols-2 md:items-center lg:gap-16"
            initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative h-96 overflow-hidden rounded-3xl border border-[#0f291e]/10 shadow-lg md:h-[460px]">
              <Image
                src={data.image}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                alt={data.imageAlt}
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
            </div>

            <div>
              <SectionBadge>{data.mission.badge}</SectionBadge>
              <h2
                id="mission-heading"
                className="font-display mt-4 text-3xl font-semibold leading-tight tracking-tight text-[#0f291e] sm:text-4xl md:text-5xl"
              >
                {data.mission.title}
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-[#0f291e]/75 sm:text-lg">
                {asParagraphs(data.mission.description).map((paragraph, index) => (
                  <p key={`mission-${index}`}>{paragraph}</p>
                ))}
              </div>

              {data.mission.points && data.mission.points.length > 0 && (
                <ul className="mt-6 space-y-3 border-t border-[#0f291e]/10 pt-6">
                  {data.mission.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex items-start gap-3 text-sm font-semibold text-[#0f291e] sm:text-base"
                    >
                      <FiCheckCircle
                        className="mt-0.5 shrink-0 text-[#d96b43]"
                        size={18}
                      />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>

          {/* Vision Row */}
          <motion.div
            className="grid gap-10 md:grid-cols-2 md:items-center lg:gap-16"
            initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="order-2 md:order-1">
              <SectionBadge>{data.vision.badge}</SectionBadge>
              <h2
                id="vision-heading"
                className="font-display mt-4 text-3xl font-semibold leading-tight tracking-tight text-[#0f291e] sm:text-4xl md:text-5xl"
              >
                {data.vision.title}
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-[#0f291e]/75 sm:text-lg">
                {asParagraphs(data.vision.description).map((paragraph, index) => (
                  <p key={`vision-${index}`}>{paragraph}</p>
                ))}
              </div>

              {data.vision.points && data.vision.points.length > 0 && (
                <ul className="mt-6 space-y-3 border-t border-[#0f291e]/10 pt-6">
                  {data.vision.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex items-start gap-3 text-sm font-semibold text-[#0f291e] sm:text-base"
                    >
                      <FiCheckCircle
                        className="mt-0.5 shrink-0 text-[#2d6a4f]"
                        size={18}
                      />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="relative order-1 h-96 overflow-hidden rounded-3xl border border-[#0f291e]/10 shadow-lg md:order-2 md:h-[460px]">
              <Image
                src={data.visionImage || data.image}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                alt={data.visionImageAlt || data.imageAlt}
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </MainContainer>
    </section>
  );
}

export default MissionVisionSection;
