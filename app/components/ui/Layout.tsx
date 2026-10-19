
import { ReactNode } from "react"


interface layoutProps {
    children: ReactNode
}

export const CardTitle = ({ children }: layoutProps) => {
    return (
        <h3 className="mt-3 text-lg lg:text-5xl font-normal leading-snug text-black transition-colors duration-200">
            {children}
        </h3>
    )
}

export const CardTitleLink = ({ children }: layoutProps) => {
    return (
        <h3 className="mt-3 text-lg md:text-2xl font-bold leading-snug text-black transition-colors duration-200 group-hover:text-red-500">
            {children}
        </h3>
    )
}

export const Paragraf = ({ children }: layoutProps) => {
    return (
        <p className="mt-2 line-clamp-2 text-lg sm:text-lg text-black/60">
            {children}
        </p>
    )
}