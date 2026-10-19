"use client"

import React, { ReactNode } from "react"
import Image from "next/image"

interface FixedBackgroundProps {
    children: ReactNode,
    image: string
}


function FixedBackgroundSection({ children, image }: FixedBackgroundProps) {



    return (
        <section
            className="relative isolate flex min-h-[70vh] items-center overflow-hidden py-20 mt-15 text-white md:py-28"
            aria-labelledby="fixed-bg-heading"

            style={{ clipPath: "inset(0)" }}
        >
            <div aria-hidden="true" className="fixed inset-0 -z-20 h-screen w-full">
                <Image
                    src={image}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="100vw"
                    className="object-cover object-center"
                />
            </div>

            {/* Navy gradient keeps the text readable on any image */}
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-linear-to-b from-[#0b1635]/50 via-[#0b1635]/45 to-[#0b1635]/50"
            />

            {children}
        </section>
    )
}

export default FixedBackgroundSection
