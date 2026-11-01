"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { SectionBadge, SectionDescription, SectionTitle } from "@/app/components/SectionHeader";
import MainContainer from "@/app/components/ui/MainContainer";
import programsData from "@/app/data/programs.json";
import type { ProgramsData } from "@/app/types/programs";

const data = programsData as ProgramsData;

function Faq() {
  const reduceMotion = useReducedMotion();
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section aria-labelledby="faq-heading" className="bg-[#faf8f5] py-18">
      <MainContainer>
        <motion.div
          className="grid gap-12 lg:grid-cols-12 lg:items-start"
          initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75 }}
        >
          <div className="lg:col-span-5">
            <SectionBadge>{data.faqSection.badge}</SectionBadge>
            <SectionTitle id="faq-heading">{data.faqSection.title}</SectionTitle>
            <SectionDescription>
              {data.faqSection.description}
            </SectionDescription>
          </div>

          <div className="space-y-4 lg:col-span-7">
            {data.faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              const answerId = `faq-answer-${index}`;

              return (
                <div
                  key={faq.question}
                  className={`rounded-2xl border transition-colors duration-300 ${
                    isOpen
                      ? "border-[#2d6a4f]/40 bg-white shadow-md shadow-[#0f291e]/5"
                      : "border-[#0f291e]/10 bg-white/80 hover:bg-white"
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="flex w-full cursor-pointer items-center justify-between gap-5 px-6 py-5 text-left text-base font-bold text-[#0f291e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f291e] sm:text-lg"
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                        isOpen
                          ? "bg-[#d96b43] text-white"
                          : "bg-[#e6efea] text-[#0f291e]"
                      }`}
                    >
                      <FiPlus
                        className={`text-lg transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </span>
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
                        <p className="px-6 pb-6 text-sm leading-relaxed text-[#0f291e]/75 sm:text-base">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </MainContainer>
    </section>
  );
}

export default Faq;
