"use client"

import React from "react"
import Image from "next/image"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import { FiArrowUpRight } from "react-icons/fi"
import MainContainer from "../ui/MainContainer"
import { PrimaryButton } from '@/app/components/ui/Button'
import { SectionDescription, SectionBadge } from "../SectionHeader"


import { aboutSection } from "@/app/types/about"

// Play each animation once, when ~25% of the block is visible
const viewport = { once: true, amount: 0.25 }

// Smooth "expo-out" curve shared by all entrance animations
const EASE = [0.22, 1, 0.36, 1] as const

/** Soft watercolor wash built from layered radial gradients (same as the other sections) */
const watercolor = (base: string, a: string, b: string) =>
    `radial-gradient(60% 55% at 15% 20%, ${a} 0%, transparent 70%),
   radial-gradient(55% 60% at 85% 75%, ${b} 0%, transparent 70%),
   radial-gradient(40% 40% at 70% 15%, ${a} 0%, transparent 75%),
   ${base}`

const tealWash = watercolor("#cfe4e0", "#dcefe9", "#bcd6dc")

function AboutSection({
    image,
    badge,
    title,
    description,
    buttonText,
}: aboutSection) {
    const reduce = useReducedMotion()

    // With reduced motion, "hidden" equals "show", so nothing moves or fades
    const stagger = (gap: number, delay = 0): Variants => ({
        hidden: {},
        show: { transition: { staggerChildren: gap, delayChildren: delay } },
    })

    const fadeUp: Variants = {
        hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 36 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
    }

    // Main photo: wipes open from the top while its image zooms out
    const photoReveal: Variants = {
        hidden: {
            opacity: reduce ? 1 : 0,
            clipPath: reduce ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
        },
        show: {
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            transition: { duration: 1.1, ease: EASE },
        },
    }
    const photoZoom: Variants = {
        hidden: { scale: reduce ? 1 : 1.3 },
        show: { scale: 1, transition: { duration: 1.6, ease: EASE } },
    }

    // Pastel panel behind the photo slides into its offset position
    const panel: Variants = {
        hidden: { opacity: reduce ? 1 : 0, x: reduce ? 0 : -30, y: reduce ? 0 : -30 },
        show: { opacity: 1, x: 0, y: 0, transition: { duration: 1, ease: EASE } },
    }

    return (
        <section className="overflow-hidden bg-white py-20 md:py-28" aria-labelledby="about-heading">
            <MainContainer>
                <div className="grid items-center gap-14 px-6 md:px-0 lg:grid-cols-2 lg:gap-20">
                    {/* Photo collage */}
                    <motion.div
                        variants={stagger(0.2)}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewport}
                        className="relative mx-auto aspect-224/250 w-full max-w-lg scale-125"
                    >
                        {/* Offset watercolor panel behind the photo */}
                        <motion.div
                            variants={panel}
                            aria-hidden="true"
                            className="absolute inset-0 translate-x-3 translate-y-3 md:translate-x-5 md:translate-y-5"
                            style={{ background: tealWash }}
                        />

                        {/* Main photo */}
                        <motion.div
                            variants={photoReveal}
                            className="absolute h-full w-full overflow-hidden shadow-xl shadow-[#0b1635]/10"
                        >
                            <motion.div variants={photoZoom} className="absolute inset-0">
                                <Image
                                    src={image}
                                    alt="Volunteers packing food boxes for families"
                                    fill
                                    sizes="(min-width: 1024px) 25vw, 80vw"
                                    className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Content: sits on a pastel watercolor card */}
                    <motion.div
                        variants={stagger(0.12, 0.15)}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewport}
                        className="rounded-2xl  text-[#0b1635] md:p-12"

                    >
                        <motion.div variants={fadeUp}>
                            <SectionBadge>{badge}</SectionBadge>
                        </motion.div>

                        {/* Heading reveals word by word */}
                        <motion.div variants={fadeUp}>
                            <h2 className="mt-5 max-w-3xl text-5xl font-light leading-[1.02] tracking-[-0.04em] text-[#0b1635] md:text-7xl lg:text-8xl">
                                {title}
                            </h2>
                        </motion.div>

                        <motion.div variants={fadeUp}>
                            <SectionDescription>
                                {description}
                            </SectionDescription>
                        </motion.div>

                        {/* Button + founder */}
                        <motion.div
                            variants={fadeUp}
                            className="mt-8 flex flex-wrap items-center justify-between gap-6 border-t border-[#0b1635]/15 pt-8"
                        >
                            <motion.div
                                whileHover={reduce ? undefined : { scale: 1.05 }}
                                whileTap={reduce ? undefined : { scale: 0.96 }}
                                className="inline-block"
                            >

                                {
                                    buttonText &&
                                    <PrimaryButton href="/about">
                                        <div className="flex gap-2 items-center">
                                            {buttonText}

                                            <span>
                                                <FiArrowUpRight className="text-xl group-hover:rotate-45 duration-300" />
                                            </span>
                                        </div>
                                    </PrimaryButton>
                                }
                            </motion.div>

                           
                        </motion.div>
                    </motion.div>
                </div>
            </MainContainer>
        </section>
    )
}

export default AboutSection
