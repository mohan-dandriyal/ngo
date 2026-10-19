"use client"

import { FormEvent, useState } from "react"
import { FiArrowUpRight, FiCheck } from "react-icons/fi"
import { motion, useReducedMotion } from "framer-motion"

import MainContainer from "@/app/components/ui/MainContainer"
import { SectionBadge } from "@/app/components/SectionHeader"

const EASE = [0.22, 1, 0.36, 1] as const

export default function VolunteerSection() {
    const reduceMotion = useReducedMotion()
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setSubmitted(true)
    }

    return (
        <section className="bg-[#f5f7f2] py-16 text-[#0b1635] sm:py-20 md:py-28" aria-labelledby="volunteer-heading">
            <MainContainer>
                <div className="grid gap-12 px-5 sm:px-6 md:px-0 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
                    <motion.div
                        initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, ease: EASE }}
                        className="lg:pt-6"
                    >
                        <SectionBadge>Join the movement</SectionBadge>
                        <h1 id="volunteer-heading" className="mt-6 max-w-xl text-4xl font-light leading-[1.05] tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-7xl">
                            Your time can make a lasting difference.
                        </h1>
                        <p className="mt-6 max-w-md text-base leading-7 text-[#0b1635]/70 sm:text-lg sm:leading-8">
                            Bring your skills, energy, and perspective to the people and projects growing stronger together.
                        </p>
                        <p className="mt-5 max-w-md text-sm leading-6 text-[#0b1635]/60 sm:text-base sm:leading-7">
                            Tell us a little about yourself and how you would like to help. Our team will be in touch with the next steps.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 36 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
                        className="rounded-[2rem] border border-[#0b1635]/10 bg-white p-5 shadow-[0_24px_70px_rgba(11,22,53,0.08)] sm:p-7 md:p-10"
                    >
                        {submitted ? (
                            <div className="flex min-h-[28rem] flex-col items-center justify-center text-center">
                                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e9f2e6] text-[#476451]"><FiCheck size={28} /></span>
                                <h2 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">Thank you for stepping forward.</h2>
                                <p className="mt-3 max-w-sm text-sm leading-6 text-[#0b1635]/65 sm:text-base sm:leading-7">We have received your interest and will be in touch soon.</p>
                                <button type="button" onClick={() => setSubmitted(false)} className="mt-8 rounded-full border border-[#0b1635] px-6 py-2.5 text-sm font-semibold transition-colors hover:bg-[#0b1635] hover:text-white">Send another response</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#71927b]">Start here</p>
                                    <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">Tell us how you would like to help.</h2>
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                                    <label className="text-sm font-semibold">Your name<input required name="name" type="text" placeholder="Your name" className="mt-2 w-full rounded-xl border border-[#0b1635]/15 bg-[#f5f7f2] px-4 py-3.5 font-normal outline-none transition focus:border-[#71927b] focus:ring-4 focus:ring-[#71927b]/10" /></label>
                                    <label className="text-sm font-semibold">Email address<input required name="email" type="email" placeholder="you@example.com" className="mt-2 w-full rounded-xl border border-[#0b1635]/15 bg-[#f5f7f2] px-4 py-3.5 font-normal outline-none transition focus:border-[#71927b] focus:ring-4 focus:ring-[#71927b]/10" /></label>
                                </div>
                                <label className="block text-sm font-semibold">How would you like to contribute?<select name="interest" defaultValue="community" className="mt-2 w-full rounded-xl border border-[#0b1635]/15 bg-[#f5f7f2] px-4 py-3.5 font-normal outline-none transition focus:border-[#71927b] focus:ring-4 focus:ring-[#71927b]/10"><option value="community">Community support</option><option value="education">Education programs</option><option value="events">Events and campaigns</option><option value="skills">Share a professional skill</option></select></label>
                                <label className="block text-sm font-semibold">A little about you<textarea required name="message" rows={5} placeholder="Tell us about your interests, availability, or experience..." className="mt-2 w-full resize-y rounded-xl border border-[#0b1635]/15 bg-[#f5f7f2] px-4 py-3.5 font-normal outline-none transition focus:border-[#71927b] focus:ring-4 focus:ring-[#71927b]/10" /></label>
                                <button type="submit" className="group inline-flex items-center gap-3 rounded-full bg-[#0b1635] px-6 py-3.5 font-semibold text-white shadow-lg shadow-[#0b1635]/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#476451] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0b1635]">Become a volunteer <FiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" /></button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </MainContainer>
        </section>
    )
}
