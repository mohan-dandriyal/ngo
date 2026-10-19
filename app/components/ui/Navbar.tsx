"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion"

interface NavbarProps {
  toggle: boolean
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Our Programs", href: "/our-programs" },
  // { label: "Success Stories", href: "/success-stories" },
  { label: "Volunteer", href: "/volunteer" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Gallery", href: "/gallery" },
]

const workLinks = [
  { label: "Our Programs", href: "/our-programs" },
]

// Smooth "expo-out" curve shared by all entrance animations
const EASE = [0.22, 1, 0.36, 1] as const

/** Same soft watercolor wash as the cards in the other sections */
const menuBackground = `radial-gradient(60% 55% at 15% 20%, #e9f2d9 0%, transparent 70%),
   radial-gradient(55% 60% at 85% 75%, #cfe5da 0%, transparent 70%),
   #f4f8f2`

const Navbar = ({ toggle, setToggle }: NavbarProps) => {
  const pathname = usePathname()
  const reduce = useReducedMotion()
  const [hovered, setHovered] = React.useState<string | null>(null)

  // Desktop links drop in one after another after the header lands
  const list: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: reduce ? 0 : 0.35 } },
  }
  const drop: Variants = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : -14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  }

  // Mobile menu: panel eases down, items slide in one after another
  const panel: Variants = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : -12, scale: reduce ? 1 : 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: EASE, when: "beforeChildren", staggerChildren: reduce ? 0 : 0.06 },
    },
  }
  const slideIn: Variants = {
    hidden: { opacity: reduce ? 1 : 0, x: reduce ? 0 : -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
  }

  return (
    <nav aria-label="Main">
      {/* Desktop links */}
      <motion.ul
        variants={list}
        initial="hidden"
        animate="show"
        onMouseLeave={() => setHovered(null)}
        className="hidden gap-2 lg:flex"
      >
        {/* <motion.li variants={drop} className="relative" onMouseEnter={() => setWorkOpen(true)} onMouseLeave={() => setWorkOpen(false)}>
          <button type="button" aria-expanded={workOpen} aria-haspopup="menu" onFocus={() => setWorkOpen(true)} className={`relative block rounded-full px-5 py-2 font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b1635] ${workActive ? "text-white" : "text-[#0b1635]"}`}>
            {workActive && <motion.span layoutId="nav-work-active" className="absolute inset-0 rounded-full bg-[#0b1635]" />}
            <span className="relative">Our work</span>
            <span aria-hidden="true" className="relative ml-2 text-xs">⌄</span>
          </button>
          <AnimatePresence>
            {workOpen && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="absolute left-1/2 top-full z-50 mt-3 w-48 -translate-x-1/2 rounded-2xl bg-white p-2 shadow-xl shadow-[#0b1635]/10" role="menu">
              {workLinks.map((link) => <Link key={link.href} href={link.href} role="menuitem" onClick={() => setWorkOpen(false)} className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-[#dcebdd] ${pathname === link.href || (link.href !== "/our-work" && pathname.startsWith(link.href)) ? "bg-[#e9f2e6] text-[#476451]" : "text-[#0b1635]"}`}>{link.label}</Link>)}
            </motion.div>}
          </AnimatePresence>
        </motion.li> */}

        {navLinks.map((link) => {
          const active = pathname === link.href
          const showHover = hovered === link.href && !active

          return (
            <motion.li key={link.href} variants={drop}>
              <Link
                href={link.href}
                onMouseEnter={() => setHovered(link.href)}
                onFocus={() => setHovered(link.href)}
                onBlur={() => setHovered(null)}
                aria-current={active ? "page" : undefined}
                className={`relative block rounded-full px-5 py-2 text-sm font-medium transition-colors duration-300
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b1635]
                  ${active ? "text-white" : "text-[#0b1635]"}`}
              >
                {/* Navy pill marks the current page and glides between pages */}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-[#0b1635]"
                  />
                )}
                {/* Pale green pill follows the pointer across the links */}
                {showHover && (
                  <motion.span
                    layoutId="nav-hover"
                    transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 34 }}
                    className="absolute inset-0 rounded-full text-sm bg-[#dcebdd]"
                  />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            </motion.li>
          )
        })}
      </motion.ul>

      {/* Mobile hamburger */}
      <button
        type="button"
        onClick={() => setToggle((prev) => !prev)}
        aria-label="Toggle menu"
        aria-expanded={toggle}
        aria-controls="mobile-menu"
        className="flex h-10 w-10 flex-col items-center  justify-center gap-1.5 rounded-full transition-colors duration-300 hover:bg-[#dcebdd] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b1635] lg:hidden"
      >
        <span className={`h-0.5 w-6 bg-[#0b1635] transition-all duration-300 ${toggle ? "translate-y-2 rotate-45" : ""}`} />
        <span className={`h-0.5 w-6 bg-[#0b1635] transition-all duration-300 ${toggle ? "opacity-0" : ""}`} />
        <span className={`h-0.5 w-6 bg-[#0b1635] transition-all duration-300 ${toggle ? "-translate-y-2 -rotate-45" : ""}`} />
      </button>

      {/* Mobile dropdown (positions itself under the header bar) */}
      <AnimatePresence>
        {toggle && (
          <motion.div
            id="mobile-menu"
            variants={panel}
            initial="hidden"
            animate="show"
            exit={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : -12, transition: { duration: 0.2 } }}
            className="absolute left-0 top-full mt-2 w-full overflow-hidden rounded-2xl shadow-lg shadow-[#0b1635]/10 lg:hidden"
            style={{ background: menuBackground }}
          >
            <ul className="flex flex-col p-4">
              {navLinks.map((link) => {
                const active = pathname === link.href

                return (
                  <motion.li key={link.href} variants={slideIn}>
                    <Link
                      href={link.href}
                      onClick={() => setToggle(false)}
                      aria-current={active ? "page" : undefined}
                      className={`block rounded-xl px-4 py-3 font-medium text-sm transition-colors duration-300
                        ${active ? "bg-[#0b1635] text-white" : "text-[#0b1635] hover:bg-white/70"}`}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                )
              })}
              <motion.li variants={slideIn} className="rounded-xl bg-white/60 p-2">
                <p className="px-2 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#71927b]">Our work</p>
                {workLinks.map((link) => <Link key={link.href} href={link.href} onClick={() => setToggle(false)} aria-current={pathname === link.href ? "page" : undefined} className={`block rounded-lg px-3 py-2 font-medium transition-colors ${pathname === link.href || (link.href !== "/our-work" && pathname.startsWith(link.href)) ? "bg-[#0b1635] text-white" : "text-[#0b1635] hover:bg-white/70"}`}>{link.label}</Link>)}
              </motion.li>
              <motion.li variants={slideIn} className="mt-2">
                <Link
                  href="/contact"
                  onClick={() => setToggle(false)}
                  className="block rounded-full  bg-[#0b1635] px-4 py-3 text-center font-medium text-white transition-colors duration-300 hover:bg-[#1c2b57]"
                >
                  Contact Us
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
