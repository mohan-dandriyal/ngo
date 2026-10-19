"use client"

import { motion, useReducedMotion } from "framer-motion"

import { SectionBadge, SectionDescription, SectionTitle } from "@/app/components/SectionHeader"
import MainContainer from "@/app/components/ui/MainContainer"
import programsData from "@/app/data/programs.json"
import type { ProgramsData } from "@/app/types/programs"

const data = programsData as ProgramsData

export default function HowWeWork() {
    const reduceMotion = useReducedMotion()
    return (
        <>
            <section className="overflow-hidden bg-[#f5f7f2] py-15 md:py-20" aria-labelledby="how-we-work-heading">
                <MainContainer>
                    <div className="px-6 md:px-0">
                        <motion.div
                            initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{ duration: 0.8 }}
                            className="grid gap-6 md:grid-cols-12 md:items-end"
                        >
                            <div className="md:col-span-5">
                                <SectionBadge>{data.howWeWork.badge}</SectionBadge>
                                <SectionTitle id="how-we-work-heading">{data.howWeWork.title}</SectionTitle>
                            </div>
                            <div className="md:col-span-6 md:col-start-7">
                                <SectionDescription>
                                    {data.howWeWork.description}
                                </SectionDescription>
                            </div>
                        </motion.div>

                        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {data.howWeWork.steps.filter((step) => step.title).map((step, index) => (
                                <motion.article
                                    key={step.number}
                                    initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 28 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.65, delay: reduceMotion ? 0 : index * 0.12 }}
                                    whileHover={reduceMotion ? undefined : { y: -8 }}
                                    className="group rounded-3xl p-7 transition-shadow duration-300 hover:shadow-xl md:p-8"
                                >
                                    <span className="text-6xl font-medium tracking-[0.18em] text-[#71927b]/20 md:text-7xl">
                                        {step.number}
                                    </span>
                                    <h3 className="mt-8 text-2xl font-medium tracking-tight text-[#0b1635] lg:text-4xl">{step.title}</h3>
                                    <p className="mt-4 leading-relaxed text-[#0b1635]/65 lg:text-lg">{step.description}</p>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </MainContainer>
            </section>
        </>
    )
}
