"use client"

import React from "react"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import CountUp from "react-countup"
import MainContainer from "../ui/MainContainer"
import homeData from "@/app/data/home.json"

const stats = homeData.growthStats

// Smooth "expo-out" curve shared by all entrance animations
const EASE = [0.22, 1, 0.36, 1] as const

/** Same soft watercolor pattern as the cards in the other sections */
const cardBackground = `radial-gradient(60% 55% at 15% 20%, #e9f2d9 0%, transparent 70%),
   radial-gradient(55% 60% at 85% 75%, #bcd6dc 0%, transparent 70%),
   radial-gradient(40% 40% at 70% 15%, #e9f2d9 0%, transparent 75%),
   radial-gradient(40% 45% at 25% 95%, #cfe5da 0%, transparent 70%),
   #dcebdd`

function StatsSection() {
  const reduce = useReducedMotion()

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.18 } },
  }

  // Heading and column content float up and un-blur
  const floatIn: Variants = {
    hidden: {
      opacity: reduce ? 1 : 0,
      y: reduce ? 0 : 40,
      filter: reduce ? "blur(0px)" : "blur(8px)",
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: EASE },
    },
  }

  // Dotted dividers draw themselves from top to bottom
  const drawLine: Variants = {
    hidden: { scaleY: reduce ? 1 : 0 },
    show: { scaleY: 1, transition: { duration: 1.2, ease: EASE } },
  }

  return (
    <section className="overflow-hidden bg-white py-20 md:py-28" aria-labelledby="growth-heading">
      <MainContainer>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mx-6 rounded-2xl px-4 py-14 md:mx-0 md:px-10 md:py-20"
          style={{ background: cardBackground }}
        >
          <motion.h2
            variants={floatIn}
            id="growth-heading"
            className="text-center text-4xl font-medium tracking-tight text-[#0b1635] md:text-6xl"
          >
            Our Growth, Their Future
          </motion.h2>

          <dl className="mt-14 grid md:mt-20 md:grid-cols-3">
            {stats.map((st, i) => (
              <div
                key={st.label}
                className="relative flex flex-col items-center justify-center px-6 py-12 text-center md:min-h-72"
              >
                {/* Dotted divider: on the left edge from the second column on (top edge on mobile) */}
                {i > 0 && (
                  <>
                    <motion.span
                      variants={drawLine}
                      aria-hidden="true"
                      style={{ originY: 0 }}
                      className="absolute left-0 top-0 hidden h-full border-l-2 border-dotted border-[#0b1635]/40 md:block"
                    />
                    <motion.span
                      variants={drawLine}
                      aria-hidden="true"
                      className="absolute left-1/4 top-0 w-1/2 border-t-2 border-dotted border-[#0b1635]/40 md:hidden"
                    />
                  </>
                )}

                <motion.dd
                  variants={floatIn}
                  className="text-6xl font- tracking-tight text-[#0b1635] tabular-nums md:text-7xl lg:text-8xl"
                >
                  <CountUp
                    end={st.end}
                    suffix={st.suffix}
                    duration={reduce ? 0 : 2.5}
                    separator=","
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </motion.dd>
                <motion.dt
                  variants={floatIn}
                  className="mt-4 max-w-[10rem] text-lg font-semibold leading-snug text-[#0b1635]"
                >
                  {st.label}
                </motion.dt>
              </div>
            ))}
          </dl>
        </motion.div>
      </MainContainer>
    </section>
  )
}

export default StatsSection
