"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import { FiArrowUpRight } from "react-icons/fi"
import MainContainer from "../ui/MainContainer"

import { SectionBadge, SectionDescription, SectionTitle } from '@/app/components/SectionHeader'
import { OutlineButton } from "../ui/Button"

interface Work {
  slug: string
  title: string
  description: string
  image: string
  imageAlt: string
  /** Soft watercolor wash behind the text card */
  tint: string
}

/**
 * Builds a soft, watercolor-like background from layered radial gradients.
 * base = main pastel color, a / b = lighter and deeper blotches.
 */
const watercolor = (base: string, a: string, b: string) =>
  `radial-gradient(60% 55% at 15% 20%, ${a} 0%, transparent 70%),
   radial-gradient(55% 60% at 85% 75%, ${b} 0%, transparent 70%),
   radial-gradient(40% 40% at 70% 15%, ${a} 0%, transparent 75%),
   ${base}`

// Placeholder projects and images: replace with your real work
const works: Work[] = [
  {
    slug: "village-learning-center",
    title: "Village learning center",
    description: "A safe space with teachers, computers and a small library for 200 children.",
    image: "/img-2.jpg",
    imageAlt: "Children studying at the village learning center",
    tint: watercolor("#dcebdd", "#e9f2d9", "#cfe5da"),
  },
  {
    slug: "community-kitchen",
    title: "Community kitchen",
    description: "Hot meals served daily to 300 families.",
    image: "/img-1.jpg",
    imageAlt: "Volunteers serving meals at the community kitchen",
    tint: watercolor("#cfe4e0", "#dcefe9", "#bcd6dc"),
  },
  {
    slug: "mobile-health-clinic",
    title: "Mobile health clinic",
    description: "Check-ups and medicine delivered to remote villages.",
    image: "/img-2.jpg",
    imageAlt: "A health worker examining a patient in a village",
    tint: watercolor("#dcebdd", "#e9f2d9", "#cfe5da"),
  },

]

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
    <section className="overflow-hidden bg-white " aria-labelledby="works-heading">
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
            className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
          >
            <div className="max-w-2xl">
              <SectionBadge>Our works</SectionBadge>

              <SectionTitle>Projects that turned donations into change</SectionTitle>

              <SectionDescription>
                A closer look at what your support has built, served and delivered.
              </SectionDescription>
            </div>

            <OutlineButton href="/projects">
              <div className="flex items-center gap-4">
                See all works
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
                    <h3 className="max-w-[12ch] text-4xl font-extrabold leading-[0.95] tracking-tight text-[#0b1635] md:text-5xl lg:text-6xl">
                      {w.title}
                    </h3>

                    <p className="mt-8 max-w-md text-base leading-relaxed text-[#0b1635] md:text-lg">
                      {w.description}
                    </p>

                    <Link
                      href={`/projects/${w.slug}`}
                      className="mt-8 w-fit text-base font-medium text-[#0b1635] underline underline-offset-4 transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0b1635]"
                    >
                      Learn More
                      <span className="sr-only">: {w.title}</span>
                    </Link>
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
