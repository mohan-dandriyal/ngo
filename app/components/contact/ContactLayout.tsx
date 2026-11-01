"use client";

import { FormEvent, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  FiArrowUpRight,
  FiCheck,
  FiClock,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import InnerPagesBanner from "@/app/components/layouts/InnerPageBanner";
import MainContainer from "@/app/components/ui/MainContainer";
import { SectionBadge, SectionDescription, SectionTitle } from "../SectionHeader";
import contactData from "@/app/data/contact.json";
import type { ContactIcon, ContactPageData } from "@/app/types/contact";

const EASE = [0.22, 1, 0.36, 1] as const;
const data = contactData as ContactPageData;
const icons: Record<ContactIcon, typeof FiMail> = {
  mail: FiMail,
  phone: FiPhone,
  location: FiMapPin,
};

export default function ContactLayout() {
  const reduce = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);

  const reveal: Variants = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#faf8f5] text-[#0f291e]">
      <InnerPagesBanner
        image={data.hero.image}
        badge={data.hero.badge}
        description={data.hero.description}
        breadcrumbs={data.hero.breadcrumbs}
      >
        {data.hero.title}
      </InnerPagesBanner>

      <main className="py-18">
        <MainContainer>
          <section
            className="grid gap-12 lg:grid-cols-12 lg:gap-16"
            aria-labelledby="contact-heading"
          >
            {/* Left Column: Details + Office Hours */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={reveal}
              className="lg:col-span-5"
            >
              <SectionBadge>{data.intro.badge}</SectionBadge>
              <SectionTitle id="contact-heading">{data.intro.title}</SectionTitle>
              <SectionDescription>{data.intro.description}</SectionDescription>

              <div className="mt-8 space-y-4">
                {data.contactDetails.map(({ icon, label, value, subtext, href }, idx) => {
                  const Icon = icons[icon];

                  return (
                    <motion.a
                      key={label}
                      href={href}
                      initial={{ opacity: reduce ? 1 : 0, x: reduce ? 0 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.55, delay: idx * 0.1, ease: EASE }}
                      whileHover={reduce ? undefined : { y: -4, scale: 1.01 }}
                      className="group flex items-start gap-4 rounded-2xl border border-[#0f291e]/10 bg-white p-5 transition-colors duration-300 hover:border-[#d96b43]/50 hover:shadow-xl hover:shadow-[#0f291e]/8"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#e6efea] text-[#1b4332] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#d96b43] group-hover:text-white">
                        <Icon size={20} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-bold uppercase tracking-[0.16em] text-[#2d6a4f]">
                          {label}
                        </span>
                        <span className="mt-1 block font-bold text-[#0f291e]">
                          {value}
                        </span>
                        {subtext && (
                          <span className="mt-0.5 block text-xs text-[#0f291e]/65">
                            {subtext}
                          </span>
                        )}
                      </span>
                      <FiArrowUpRight className="mt-1 shrink-0 text-[#0f291e]/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#d96b43]" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Right Column: Interactive Form */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={reveal}
              className="rounded-3xl border border-[#0f291e]/10 bg-white p-7 shadow-xl shadow-[#0f291e]/6 sm:p-10 lg:col-span-7"
            >
              {submitted ? (
                <div className="flex min-h-[28rem] flex-col items-center justify-center text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e6efea] text-[#1b4332]">
                    <FiCheck size={28} />
                  </span>
                  <h2 className="font-display mt-6 text-3xl font-semibold tracking-tight text-[#0f291e]">
                    {data.form.successTitle}
                  </h2>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-[#0f291e]/75">
                    {data.form.successDescription}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-8 cursor-pointer rounded-full bg-[#0f291e] px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-[#d96b43]"
                  >
                    {data.form.resetLabel}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d96b43]">
                      {data.form.eyebrow}
                    </p>
                    <h2 className="font-display mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                      {data.form.title}
                    </h2>
                    {data.form.description && (
                      <p className="mt-2 text-sm text-[#0f291e]/70">
                        {data.form.description}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="text-sm font-bold text-[#0f291e]">
                      {data.form.nameLabel}
                      <input
                        required
                        name="name"
                        type="text"
                        placeholder={data.form.namePlaceholder}
                        className="mt-2 w-full rounded-xl border border-[#0f291e]/15 bg-[#faf8f5] px-4 py-3.5 text-sm font-normal outline-none transition focus:border-[#2d6a4f] focus:bg-white focus:ring-4 focus:ring-[#2d6a4f]/10"
                      />
                    </label>
                    <label className="text-sm font-bold text-[#0f291e]">
                      {data.form.emailLabel}
                      <input
                        required
                        name="email"
                        type="email"
                        placeholder={data.form.emailPlaceholder}
                        className="mt-2 w-full rounded-xl border border-[#0f291e]/15 bg-[#faf8f5] px-4 py-3.5 text-sm font-normal outline-none transition focus:border-[#2d6a4f] focus:bg-white focus:ring-4 focus:ring-[#2d6a4f]/10"
                      />
                    </label>
                  </div>

                  <label className="block text-sm font-bold text-[#0f291e]">
                    {data.form.reasonLabel}
                    <select
                      name="reason"
                      defaultValue={data.form.reasons[0]?.value}
                      className="mt-2 w-full rounded-xl border border-[#0f291e]/15 bg-[#faf8f5] px-4 py-3.5 text-sm font-normal outline-none transition focus:border-[#2d6a4f] focus:bg-white focus:ring-4 focus:ring-[#2d6a4f]/10"
                    >
                      {data.form.reasons.map((reason) => (
                        <option key={reason.value} value={reason.value}>
                          {reason.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block text-sm font-bold text-[#0f291e]">
                    {data.form.messageLabel}
                    <textarea
                      required
                      name="message"
                      rows={5}
                      placeholder={data.form.messagePlaceholder}
                      className="mt-2 w-full resize-y rounded-xl border border-[#0f291e]/15 bg-[#faf8f5] px-4 py-3.5 text-sm font-normal outline-none transition focus:border-[#2d6a4f] focus:bg-white focus:ring-4 focus:ring-[#2d6a4f]/10"
                    />
                  </label>

                  <button
                    type="submit"
                    className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#d96b43] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#d96b43]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0f291e]"
                  >
                    {data.form.submitLabel}
                    <FiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
                </form>
              )}
            </motion.div>
          </section>
        </MainContainer>
      </main>
    </div>
  );
}
