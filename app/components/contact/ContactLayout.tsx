"use client";

import { FormEvent, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FiArrowUpRight, FiCheck, FiMail, FiMapPin, FiPhone } from "react-icons/fi";

import InnerPagesBanner from "@/app/components/layouts/InnerPageBanner";
import MainContainer from "@/app/components/ui/MainContainer";
import contactData from "@/app/data/contact.json";
import type { ContactIcon, ContactPageData } from "@/app/types/contact";

const EASE = [0.22, 1, 0.36, 1] as const;

const data = contactData as ContactPageData;
const icons: Record<ContactIcon, typeof FiMail> = { mail: FiMail, phone: FiPhone, location: FiMapPin };

export default function ContactLayout() {
    const reduce = useReducedMotion();
    const [submitted, setSubmitted] = useState(false);

    const reveal: Variants = {
        hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="bg-[#f5f7f2] text-[#0b1635]">
            <InnerPagesBanner image={data.hero.image}>{data.hero.title}</InnerPagesBanner>

            <main className="pb-20 pt-10 md:pb-10 md:pt-20">
                <MainContainer>
                    <section className="mx-6 grid gap-10 md:mx-0 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20" aria-labelledby="contact-heading">
                        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={reveal} className="lg:pt-8">
                            <span className="inline-flex items-center gap-2 rounded-full border border-[#0b1635]/15 bg-white px-4 py-1.5 text-sm font-medium shadow-sm"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#71927b]" />{data.intro.badge}</span>
                            <h1 id="contact-heading" className="mt-6 max-w-xl text-5xl font-black leading-[1.02] tracking-[-0.04em] md:text-7xl">{data.intro.title}</h1>
                            <p className="mt-6 max-w-md text-lg leading-8 text-[#0b1635]/70">{data.intro.description}</p>
                            <div className="mt-10 space-y-3">
                                {data.contactDetails.map(({ icon, label, value, href }) => {
                                    const Icon = icons[icon];

                                    return (
                                        <a key={label} href={href} className="group flex items-center gap-4 rounded-2xl border border-[#0b1635]/10 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#71927b]/50 hover:shadow-lg hover:shadow-[#0b1635]/5">
                                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e9f2e6] text-[#476451]"><Icon size={18} /></span><span className="min-w-0"><span className="block text-xs font-bold uppercase tracking-[0.16em] text-[#71927b]">{label}</span><span className="mt-1 block truncate font-semibold">{value}</span></span><FiArrowUpRight className="ml-auto shrink-0 text-[#71927b] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                        </a>
                                    );
                                })}
                            </div>
                        </motion.div>

                        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={reveal} className="rounded-[2rem] border border-[#0b1635]/10 bg-white p-6 shadow-[0_24px_70px_rgba(11,22,53,0.08)] md:p-10">
                            {submitted ? (
                                <div className="flex min-h-[31rem] flex-col items-center justify-center text-center"><span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e9f2e6] text-[#476451]"><FiCheck size={28} /></span><h2 className="mt-6 text-3xl font-extrabold tracking-tight">{data.form.successTitle}</h2><p className="mt-3 max-w-sm leading-7 text-[#0b1635]/65">{data.form.successDescription}</p><button type="button" onClick={() => setSubmitted(false)} className="mt-8 rounded-full border border-[#0b1635] px-6 py-2.5 text-sm font-semibold transition-colors hover:bg-[#0b1635] hover:text-white">{data.form.resetLabel}</button></div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#71927b]">{data.form.eyebrow}</p><h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">{data.form.title}</h2></div>
                                    <div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-semibold">{data.form.nameLabel}<input required name="name" type="text" placeholder={data.form.namePlaceholder} className="mt-2 w-full rounded-xl border border-[#0b1635]/15 bg-[#f5f7f2] px-4 py-3.5 font-normal outline-none transition focus:border-[#71927b] focus:ring-4 focus:ring-[#71927b]/10" /></label><label className="text-sm font-semibold">{data.form.emailLabel}<input required name="email" type="email" placeholder={data.form.emailPlaceholder} className="mt-2 w-full rounded-xl border border-[#0b1635]/15 bg-[#f5f7f2] px-4 py-3.5 font-normal outline-none transition focus:border-[#71927b] focus:ring-4 focus:ring-[#71927b]/10" /></label></div>
                                    <label className="block text-sm font-semibold">{data.form.reasonLabel}<select name="reason" defaultValue={data.form.reasons[0]?.value} className="mt-2 w-full rounded-xl border border-[#0b1635]/15 bg-[#f5f7f2] px-4 py-3.5 font-normal outline-none transition focus:border-[#71927b] focus:ring-4 focus:ring-[#71927b]/10">{data.form.reasons.map((reason) => <option key={reason.value} value={reason.value}>{reason.label}</option>)}</select></label>
                                    <label className="block text-sm font-semibold">{data.form.messageLabel}<textarea required name="message" rows={5} placeholder={data.form.messagePlaceholder} className="mt-2 w-full resize-y rounded-xl border border-[#0b1635]/15 bg-[#f5f7f2] px-4 py-3.5 font-normal outline-none transition focus:border-[#71927b] focus:ring-4 focus:ring-[#71927b]/10" /></label>
                                    <button type="submit" className="group inline-flex items-center gap-3 rounded-full bg-[#0b1635] px-6 py-3.5 font-semibold text-white shadow-lg shadow-[#0b1635]/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#476451] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0b1635]">{data.form.submitLabel} <FiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" /></button>
                                </form>
                            )}
                        </motion.div>
                    </section>

                </MainContainer>
            </main>
        </div>
    );
}
