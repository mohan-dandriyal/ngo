"use client"

import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { FiPlus } from "react-icons/fi"

import { SectionBadge, SectionDescription, SectionTitle } from "@/app/components/SectionHeader"
import MainContainer from "@/app/components/ui/MainContainer"
import programsData from "@/app/data/programs.json"
import type { ProgramsData } from "@/app/types/programs"

const data = programsData as ProgramsData

function Faq() {


    const reduceMotion = useReducedMotion()
    const [openFaq, setOpenFaq] = useState(0)


    return (
        <section aria-labelledby="faq-heading" className="pb-20 md:pb-28 mt-8">
            <MainContainer>
                <div className="px-6 md:px-0">
                    <motion.section
                        className="grid gap-10 md:grid-cols-12 md:items-start md:gap-16"
                        initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="md:col-span-5">
                            <SectionBadge>{data.faqSection.badge}</SectionBadge>
                            <SectionTitle id="faq-heading">{data.faqSection.title}</SectionTitle>
                            <SectionDescription>{data.faqSection.description}</SectionDescription>
                        </div>

                        <div className="space-y-5 md:col-span-7 md:mt-0">
                            {data.faqs.map((faq, index) => {
                                const isOpen = openFaq === index
                                const answerId = `faq-answer-${index}`

                                return (
                                    <div key={faq.question} className="rounded-2xl border border-[#0b1635]/10 bg-white px-5">
                                        <button
                                            type="button"
                                            aria-expanded={isOpen}
                                            aria-controls={answerId}
                                            onClick={() => setOpenFaq(isOpen ? -1 : index)}
                                            className="flex w-full items-center justify-between gap-5 py-5 text-left font-semibold text-[#0b1635] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b1635] lg:text-xl sm:text-xl text-lg"
                                        >
                                            <span>{faq.question}</span>
                                            <FiPlus className={`shrink-0 text-xl text-[#71927b] transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} aria-hidden="true" />
                                        </button>

                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    id={answerId}
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: reduceMotion ? 0 : 0.25 }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="pb-5 pr-8 text-base leading-7 text-[#0b1635]/65">{faq.answer}</p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )
                            })}
                        </div>
                    </motion.section>
                </div>
            </MainContainer>
        </section>
    )
}

export default Faq
