"use client"

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { SectionBadge } from '../SectionHeader'
import type { MissionVisionSection as MissionVisionSectionData } from '@/app/types/about'
import MainContainer from '../ui/MainContainer'

interface MissionVisionSectionProps {
    data: MissionVisionSectionData
}

const asParagraphs = (content: string | string[]) =>
    Array.isArray(content) ? content : [content]

function MissionVisionSection({ data }: MissionVisionSectionProps) {
    const reduceMotion = useReducedMotion()

    return (
        <MainContainer>
            <motion.section
                aria-labelledby="mission-heading"
                className="mt-20 grid gap-10 md:grid-cols-2 md:items-center md:gap-16"
                initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
                <motion.div
                    className="relative h-[420px] overflow-hidden rounded-3xl md:h-[560px]"
                    initial={{ opacity: reduceMotion ? 1 : 0, x: reduceMotion ? 0 : -28, scale: reduceMotion ? 1 : 0.96 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    whileHover={reduceMotion ? undefined : { scale: 1.015 }}
                >
                    <Image
                        src={data.image}
                        fill
                        alt={data.imageAlt}
                        className="object-cover object-center"
                    />
                </motion.div>

                <motion.div
                    className="space-y-10"
                    initial={{ opacity: reduceMotion ? 1 : 0, x: reduceMotion ? 0 : 28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div>
                        <SectionBadge>{data.mission.badge}</SectionBadge>
                        <h2
                            id="mission-heading"
                            className="mt-5 text-4xl  leading-tight tracking-tight text-[#0b1635] md:text-5xl"
                        >
                            {data.mission.title}
                        </h2>
                        <div className="mt-6 space-y-4 text-xl leading-relaxed text-[#0b1635]/70">
                            {asParagraphs(data.mission.description).map((paragraph, index) => (
                                <p key={`${data.mission.title}-${index}`}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.section>

            <motion.section
                aria-labelledby="mission-heading"
                className="mt-24 mb-20 grid gap-10 md:grid-cols-2 md:items-center md:gap-16"
                initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
                <motion.div
                    className="space-y-10"
                    initial={{ opacity: reduceMotion ? 1 : 0, x: reduceMotion ? 0 : 28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >

                    <div>
                        <SectionBadge>{data.vision.badge}</SectionBadge>
                        <h2
                            id="mission-heading"
                            className="mt-5 text-4xl leading-tight tracking-tight text-[#0b1635] md:text-5xl"
                        >
                            {data.vision.title}
                        </h2>
                        <div className="mt-6 space-y-4 text-xl leading-relaxed text-[#0b1635]/70">
                            {asParagraphs(data.vision.description).map((paragraph, index) => (
                                <p key={`${data.vision.title}-${index}`}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="relative h-[420px] overflow-hidden rounded-3xl md:h-[560px]"
                    initial={{ opacity: reduceMotion ? 1 : 0, x: reduceMotion ? 0 : -28, scale: reduceMotion ? 1 : 0.96 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    whileHover={reduceMotion ? undefined : { scale: 1.015 }}
                >
                    <Image
                        src={data.image}
                        fill
                        alt={data.imageAlt}
                        className="object-cover object-center"
                    />
                </motion.div>
            </motion.section>
        </MainContainer>
    )
}

export default MissionVisionSection
