"use client"

import React from "react"
import Image from "next/image"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"


import { FaArrowDown } from "react-icons/fa6";

import Header from "../layouts/Header"

import { innerPagesBannerProps } from "@/app/types/innerPageBanner";

// Smooth "expo-out" curve shared by all entrance animations
const EASE = [0.22, 1, 0.36, 1] as const


export default function InnerPagesBanner({children, image}:innerPagesBannerProps) {
    const reduce = useReducedMotion()
    const [active] = React.useState(0)

    const handleScrollDown = () => {
        window.scrollBy({
            top: window.innerHeight,
            behavior: "smooth",
        })
    }

    return (
        <section className="relative h-160 w-full overflow-hidden bg-[#0b1635] text-white">
            {/* Header stays in the hero (it is fixed, so it still sticks on scroll) */}
            <Header />


            {/* Background: slowly zooms out on load */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    className="absolute inset-0"
                    initial={{ scale: reduce ? 1 : 1.15 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2.4, ease: EASE }}
                >
                    <Image
                        src={image}
                        fill
                        priority
                        sizes="100vw"
                        alt=""
                        className="object-cover object-center opacity-60 grayscale"
                    />
                </motion.div>
                {/* Darkens the right (text side) */}
                <div className="absolute inset-0 bg-linear-to-l from-[#0b1635]/90 via-[#0b1635]/50 to-transparent" />
                {/* Darkens the bottom so stats and controls stay readable */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-[#0b1635]/85 to-transparent" />
                {/* Soft mint glow behind the headline */}
                <div className="absolute -right-32 top-1/4 h-112 w-md rounded-full bg-[#cfe4e0]/15 blur-3xl" />
            </div>

            <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center justify-end px-6 pb-28 pt-28 md:px-20">
                <div className="w-full">
                    <div className="space-y-6 mt-40 py-4 text-center w-full text">
                        {/* Framer Motion Animated Text Container */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                initial={{ opacity: 0, y: reduce ? 0 : 25, filter: "blur(8px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: reduce ? 0 : -25, filter: "blur(8px)" }}
                                transition={{ duration: 0.8, ease: EASE }}
                            >
                                <h2 className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
                                    <span className="block">
                                        {children}
                                    </span>
                                </h2>

                                <div>
                                    <div>
                                        <div className="w-9 border rounded-3xl mx-auto mt-10 flex justify-center py-5 overflow-hidden">
                                            <button onClick={handleScrollDown} className="cursor-pointer focus:outline-none">
                                                <motion.div
                                                    animate={{ y: [0, 10, 0] }}
                                                    transition={{
                                                        duration: 1.5,
                                                        repeat: Infinity,
                                                        ease: "easeInOut",
                                                    }}
                                                >
                                                    <FaArrowDown size={18} />
                                                </motion.div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    )
}