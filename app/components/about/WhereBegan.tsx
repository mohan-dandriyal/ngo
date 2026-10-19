"use client"

import { SectionDescription, SectionTitle, SectionBadge } from '../SectionHeader'
import MainContainer from '../ui/MainContainer'
import Image from 'next/image'
import { WhereBeganSection } from '@/app/types/about'

function WhereBegan(
    {
        image_left,
        image_right,
        badge,
        title,
        description,
        image_left_alt,
        image_left_title,
        image_left_description,
        image_right_alt,
        image_right_title,
        image_right_description,
    }: WhereBeganSection
) {
    return (
        <MainContainer>
            <div className='md:px-0 px-5 mb-15 md:mb-0'>
                {/* Badge */}
                <div className="mb-6">
                    <SectionBadge>{badge}</SectionBadge>
                </div>

                {/* Top Text Section */}
                <div className="flex flex-col md:flex-row gap-12 justify-between items-start mb-16">
                    <div className="flex-1">
                        <SectionTitle>
                            {title}
                        </SectionTitle>

                        <div className="flex-1 space-y-6 mt-2">
                            {
                                (Array.isArray(description) ? description : [description]).map((dis, ind) => (
                                    <SectionDescription key={ind + 1}>
                                        {dis}
                                    </SectionDescription>
                                ))
                            }

                        </div>
                    </div>
                </div>

                {/* Images Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Left Wider Image */}
                    <div className="md:col-span-7 relative h-[420px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-sm">
                        <Image
                            src={image_left}
                            fill
                            alt={image_left_alt}
                            className="object-cover object-center"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-[#0b1635]/90 via-[#0b1635]/55 to-transparent px-6 pb-6 pt-20 text-white">
                            <h3 className="text-xl italic tracking-tight md:text-4xl">
                                {image_left_title}
                            </h3>
                            <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/80 md:text-lg">
                                {image_left_description}
                            </p>
                        </div>
                    </div>

                    {/* Right Narrower Image */}
                    <div className="md:col-span-5 relative h-[420px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-sm">
                        <Image
                            src={image_right}
                            fill
                            alt={image_right_alt}
                            className="object-cover object-center"
                        />

                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b1635]/90 via-[#0b1635]/55 to-transparent px-6 pb-6 pt-20 text-white">
                            <h3 className="text-xl italic tracking-tight md:text-4xl">
                                {image_right_title}
                            </h3>
                            <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/80 md:text-lg">
                                {image_right_description}
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </MainContainer>
    )
}

export default WhereBegan
