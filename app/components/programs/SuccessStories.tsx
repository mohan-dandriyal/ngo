

"use client"
import MainContainer from '../ui/MainContainer'

import { motion, useReducedMotion } from "framer-motion"

import programsData from "@/app/data/programs.json"
import { ProgramsData } from '@/app/types/programs'
import { SectionBadge, SectionDescription, SectionTitle } from '../SectionHeader'
import Image from 'next/image'
const data = programsData as ProgramsData


function SuccessStories() {
    
    const reduceMotion = useReducedMotion()

  return (
    <div>
         {/* Success Stories */}
        <MainContainer>
            <div className="px-6 md:px-0">
                    <motion.section
                        aria-labelledby="success-stories-heading"
                        className="mt-0 border-t border-[#0b1635]/10 py-15 md:py-20"
                        initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                            <div className="max-w-2xl">
                                <SectionBadge>{data.successStories.badge}</SectionBadge>
                                <SectionTitle id="success-stories-heading">{data.successStories.title}</SectionTitle>
                            </div>
                            <SectionDescription>
                                {data.successStories.description}
                            </SectionDescription>
                        </div>

                        <div className="mt-12 grid gap-6 md:grid-cols-3">
                            {data.successStories.stories.map((story, index) => (
                                <motion.article
                                    key={story.title}
                                    initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 28 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.65, delay: reduceMotion ? 0 : index * 0.12 }}
                                    whileHover={reduceMotion ? undefined : { y: -8 }}
                                    className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-[#0b1635]/10"
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <Image
                                            src={story.image}
                                            alt={story.imageAlt}
                                            fill
                                            sizes="(min-width: 768px) 33vw, 100vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#0b1635] backdrop-blur-sm">
                                            {story.category}
                                        </span>
                                    </div>
                                    <div className="p-6 md:p-7">
                                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#71927b]">{story.result}</p>
                                        <h3 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-[#0b1635]">{story.title}</h3>
                                        <p className="mt-4 leading-relaxed text-[#0b1635]/65">{story.description}</p>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </motion.section>
            </div>
        </MainContainer>
    </div>
  )
}

export default SuccessStories
