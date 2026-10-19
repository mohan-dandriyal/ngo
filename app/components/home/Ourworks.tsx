"use client"

import React from "react"
import Image from "next/image"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import { FiArrowUpRight } from "react-icons/fi"
import MainContainer from "../ui/MainContainer"

import { SectionBadge, SectionDescription, SectionTitle } from '@/app/components/SectionHeader'
import { OutlineButton } from "../ui/Button"
import projectsData from "@/app/data/projects.json"
import homeData from "@/app/data/home.json"
import type { ProjectPageData } from "@/app/types/project"

const data = projectsData as ProjectPageData
const works = data.projects.slice(0, 3)

function OurWorks() {
  const reduce = useReducedMotion()

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  }
  const fadeUp: Variants = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  return (
    <section className="overflow-hidden bg-white" aria-labelledby="works-heading">
      <MainContainer>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="px-6 md:px-0"
        >
          {/* Heading row */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col  items-start justify-between gap-6 md:flex-row md:items-end"
          >
            <div className="max-w-4xl">
              <SectionBadge>{homeData.worksSection.badge}</SectionBadge>

              <SectionTitle>{homeData.worksSection.title}</SectionTitle>

              <SectionDescription>{homeData.worksSection.description}</SectionDescription>
            </div>

            <OutlineButton href={homeData.worksSection.buttonHref}>
              <div className="flex items-center gap-4">
                {homeData.worksSection.buttonLabel}
                <FiArrowUpRight
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:rotate-45"
                />
              </div>
            </OutlineButton>
          </motion.div>

          {/* Checkerboard grid: image / text, then text / image */}
          <div className="mt-12 flex flex-col gap-6 md:gap-6">
            {works.map((w, i) => {
              const imageFirst = i % 2 === 0

              return (
                <div key={w.slug} className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                  {/* Image card */}
                  <motion.div
                    variants={fadeUp}
                    className={`relative min-h-[280px] overflow-hidden rounded-2xl bg-neutral-200 md:min-h-[360px] lg:min-h-[420px] ${
                      imageFirst ? "md:order-1" : "md:order-2"
                    }`}
                  >
                    <Image
                      src={w.image}
                      alt={w.imageAlt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </motion.div>

                  {/* Text card */}
                  <motion.article
                    variants={fadeUp}
                    className={`flex min-h-[280px] flex-col justify-start rounded-2xl p-8 md:min-h-[360px] md:p-12 lg:min-h-[420px] lg:p-14 ${
                      imageFirst ? "md:order-2" : "md:order-1"
                    }`}
                    style={{ background: w.tint }}
                  >
                    <h3 className="max-w-[12ch] text-4xl font-medium leading-[0.95] tracking-tight text-[#0b1635] md:text-5xl lg:text-5xl">
                      {w.title}
                    </h3>

                    <p className="mt-8 max-w-md text-base leading-relaxed text-[#0b1635] md:text-lg">
                      {w.description}
                    </p>

                  </motion.article>
                </div>
              )
            })}
          </div>
        </motion.div>
      </MainContainer>
    </section>
  )
}

export default OurWorks
