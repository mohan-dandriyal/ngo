import React, { ReactNode } from "react"
import Link from "next/link"

// interface ButtonProps {
//     children: ReactNode
//     href: string
// }

// Shared by both buttons: pill shape, a fill that slides up on hover, and a small lift
const base =
    "group relative inline-block overflow-hidden border px-8 py-5 font-medium text-xl" +
    "transition-all duration-500 ease-out hover:-translate-y-0.5 active:scale-95 " +
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0b1635]"

// The fill layer: sits behind the text and slides up from the bottom on hover
const fill =
    "absolute inset-0 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0"

export const PrimaryButton = ({ children, href }) => {
    return (
        <Link
            href={href}
            className={`${base} border-[#0b1635] bg-[#0b1635] text-white shadow-lg shadow-[#0b1635]/15
                        hover:text-[#0b1635] hover:shadow-xl hover:shadow-[#0b1635]/25`}
        >
            <span aria-hidden="true" className={`${fill} bg-[#cfe4e0]`} />
            <div className="relative">{children}</div>
        </Link>
    )
}

export const OutlineButton = ({ children, href }) => {
    return (
        <Link
            href={href}
            className={`${base} border-[#0b1635] bg-transparent text-[#0b1635]
                        hover:text-white hover:shadow-lg hover:shadow-[#0b1635]/15`}
        >
            <span aria-hidden="true" className={`${fill} bg-[#0b1635]`} />
            <div className="relative">{children}</div>
        </Link>
    )
}