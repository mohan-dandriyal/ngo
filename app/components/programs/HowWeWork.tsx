"use client"

import { motion, useReducedMotion } from "framer-motion"
import { FiArrowUpRight } from "react-icons/fi"

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
                        className="grid gap-8 md:grid-cols-12 md:items-end"
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

                    <div className="mt-12 grid gap-5 md:grid-cols-3">
                        {data.howWeWork.steps.map((step, index) => (
                            <motion.article
                                key={step.number}
                                initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.65, delay: reduceMotion ? 0 : index * 0.12 }}
                                whileHover={reduceMotion ? undefined : { y: -8 }}
                                className="group rounded-3xl border border-[#0b1635]/10 bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-[#0b1635]/10 md:p-8"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold tracking-[0.18em] text-[#71927b]">{step.number}</span>
                                    <FiArrowUpRight aria-hidden="true" className="text-xl text-[#71927b] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                                </div>
                                <h3 className="mt-16 text-2xl font-bold tracking-tight text-[#0b1635]">{step.title}</h3>
                                <p className="mt-4 leading-relaxed text-[#0b1635]/65">{step.description}</p>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </MainContainer>
        </section>
        </>
    )
}
