import React, { ReactNode } from 'react'
import { motion, useReducedMotion, type Variants } from "framer-motion"

interface SectionTitleProps {
    children: ReactNode
    /** Optional id, so each section's aria-labelledby can point at its own heading */
    id?: string
}

interface SectionDescriptionProps {
    children: ReactNode
}

interface SectionBadgeProps {
    children: ReactNode
}

// Smooth "expo-out" curve shared by all entrance animations
const EASE = [0.22, 1, 0.36, 1] as const

// Floats up and un-blurs as it appears. With reduced motion, "hidden" equals "show".
const useFloatIn = (distance: number, duration: number): Variants => {
    const reduce = useReducedMotion()

    return {
        hidden: {
            opacity: reduce ? 1 : 0,
            y: reduce ? 0 : distance,
            filter: reduce ? "blur(0px)" : "blur(8px)",
        },
        show: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration, ease: EASE },
        },
    }
}

const stagger = (gap: number, delay = 0): Variants => ({
    hidden: {},
    show: { transition: { staggerChildren: gap, delayChildren: delay } },
})

export const SectionTitle = ({ children, id = "about-heading" }: SectionTitleProps) => {
    const floatIn = useFloatIn(40, 0.9)

    return (
        <motion.h2
            id={id}
            variants={stagger(0.07)}
            className="mt-5 max-w-5xl text-4xl font-light leading-[1.02] tracking-[-0.04em] text-[#0b1635] md:text-6xl lg:text-6xl"
        >
            <motion.span variants={floatIn} className="mr-[0.25em] inline-block">
                {children}
            </motion.span>
        </motion.h2>
    )
}

export const SectionDescription = ({ children }: SectionDescriptionProps) => {
    const floatIn = useFloatIn(28, 0.8)

    return (
        <motion.p
            variants={stagger(0.07)}
            className="mt-4 text-base leading-relaxed text-[#0b1635]/70 md:text-xl"
        >
            <motion.span variants={floatIn} className="mr-[0.25em] inline-block">
                {children}
            </motion.span>
        </motion.p>
    )
}

export const SectionBadge = ({ children }: SectionBadgeProps) => {
    const floatIn = useFloatIn(20, 0.7)

    return (
        <motion.span
            variants={floatIn}
            className="inline-flex items-center gap-2 rounded-full border border-[#0b1635]/15 bg-white px-4 py-1.5 text-sm font-medium text-[#0b1635] shadow-sm"
        >
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#0b1635]" />
            {children}
        </motion.span>
    )
}