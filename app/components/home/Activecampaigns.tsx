"use client"

import React from "react"
import Image from "next/image"
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion"
import { FiArrowUpRight, FiClock } from "react-icons/fi"
import MainContainer from "../ui/MainContainer"

import { CardTitle, Paragraf } from '@/app/components/ui/Layout'
import { SectionTitle, SectionDescription, SectionBadge } from '@/app/components/SectionHeader'
import { OutlineButton } from "../ui/Button"
import programsData from "@/app/data/programs.json"
import type { ProgramCategory, ProgramsData } from "@/app/types/programs"

const data = programsData as ProgramsData
const campaigns = data.campaigns
const filters: ("All" | ProgramCategory)[] = ["All", "Education", "Food", "Health"]

// Smooth "expo-out" curve for the entrance animations
const EASE = [0.22, 1, 0.36, 1] as const

interface activeCampaigns {
  isShow: boolean
}

function ActiveCampaigns({ isShow }: activeCampaigns) {
  const reduce = useReducedMotion()
  const [filter, setFilter] = React.useState<"All" | ProgramCategory>("All")

  const visible = filter === "All" ? campaigns : campaigns.filter((c) => c.category === filter)

  // Card: floats up, then its parts reveal one after another
  const card: Variants = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 50 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: EASE,
        delay: reduce ? 0 : i * 0.12,
        when: "beforeChildren",
        staggerChildren: reduce ? 0 : 0.1,
      },
    }),
  }

  // Image: zooms out slowly as it reveals
  const imageReveal: Variants = {
    hidden: { scale: reduce ? 1 : 1.25 },
    show: { scale: 1, transition: { duration: 1.4, ease: EASE } },
  }

  // Chips: drop in from above
  const chip: Variants = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : -14, scale: reduce ? 1 : 0.9 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
  }

  // Text: slides up
  const textRise: Variants = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  }

  return (
    <section className="overflow-hidden bg-white py-20 md:py-28" aria-labelledby="campaigns-heading">
      <MainContainer>
        <div className="px-6 md:px-0">
          {/* Heading row */}
          <motion.div
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
          >
            <div className="max-w-4xl">
              <SectionBadge>
                {data.campaignsSection.badge}
              </SectionBadge>

              <SectionTitle>{data.campaignsSection.title}</SectionTitle>

              <SectionDescription>
                {data.campaignsSection.description}
              </SectionDescription>
            </div>

            {
              isShow &&
              <OutlineButton
                href={data.campaignsSection.buttonHref}
              >
                <div className="flex gap-4 items-center">
                  {data.campaignsSection.buttonLabel}
                  <FiArrowUpRight aria-hidden="true" className="text-xl transition-transform duration-300 group-hover:rotate-45" />
                </div>
              </OutlineButton>
            }

          </motion.div>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: EASE, delay: reduce ? 0 : 0.15 }}
            role="tablist"
            aria-label="Filter campaigns"
            className="mt-10 flex flex-wrap gap-6"
          >
            {filters.map((f) => {
              const selected = filter === f
              return (
                <motion.button
                  key={f}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setFilter(f)}
                  whileTap={reduce ? undefined : { scale: 0.95 }}
                  className={`relative px-8 py-4 text-lg font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b1635] ${selected ? "text-white" : "bg-[#e9f2e6] text-[#0b1635] hover:bg-[#d6e8dc]"
                    }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="campaign-tab"
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[#0b1635]"
                    />
                  )}
                  <span className="relative">{f}</span>
                </motion.button>
              )
            })}
          </motion.div>

          {/* Cards */}
          <motion.div layout className="mt-8">
            <AnimatePresence mode="popLayout">
              {visible.map((c, i) => (
                <div key={c.id} className={`flex justify-center py-15 ${i !== 0 ? 'border-t border-black/10' : ''}`}>
                  <motion.article
                    custom={i}
                    layout={!reduce}
                    variants={card}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    exit={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.92, transition: { duration: 0.3 } }}
                    whileHover={reduce ? undefined : { y: -8, transition: { type: "spring", stiffness: 300, damping: 22 } }}
                    className="group grid w-full max-w-4xl grid-cols-1 overflow-hidden transition-shadow duration-500 md:grid-cols-2"
                  >
                    {/* Image */}
                    <div className="relative aspect-4/3 overflow-hidden">
                      <motion.div variants={imageReveal} className="absolute inset-0">
                        <Image
                          src={c.image}
                          alt={c.imageAlt}
                          fill
                          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                      </motion.div>

                      <motion.span
                        variants={chip}
                        className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#0b1635] shadow-sm"
                      >
                        {c.category}
                      </motion.span>
                      <motion.span
                        variants={chip}
                        className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-[#0b1635]/80 px-3 py-1 text-xs font-medium text-white backdrop-blur"
                      >
                        <FiClock aria-hidden="true" size={12} />
                        {c.daysLeft} days left
                      </motion.span>
                    </div>

                    {/* Body */}
                    <div className="flex flex-1 flex-col p-6 text-[#0b1635] md:p-8">
                      <motion.div variants={textRise}>
                        <CardTitle>
                          <span className="font-medium tracking-tight text-[#0b1635]">{c.title}</span>
                        </CardTitle>
                      </motion.div>
                      <motion.div variants={textRise}>
                        <Paragraf>
                          <span className="text-[#0b1635]">{c.description}</span>
                        </Paragraf>
                      </motion.div>
                    </div>
                  </motion.article>
                </div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </MainContainer>
    </section>
  )
}

export default ActiveCampaigns
