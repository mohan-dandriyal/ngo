"use client"

import React from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import Navbar from "../ui/Navbar"
import MainContainer from "../ui/MainContainer"
import Image from "next/image"

// Smooth "expo-out" curve shared by all entrance animations
const EASE = [0.22, 1, 0.36, 1]

function Header() {
  const reduce = useReducedMotion()
  const [toggle, setToggle] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  // Detect scroll so the header can switch from "floating" to "stuck at top"
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll() // run once in case the page loads already scrolled
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close the mobile menu when the route changes
  // React.useEffect(() => {
  //   setToggle(false)
  // }, [pathname])

  // While the mobile menu is open: Esc closes it, and it closes if the
  // screen grows to desktop size. Page scroll is locked meanwhile.
  React.useEffect(() => {
    if (!toggle) return
    const onKey = (e) => e.key === "Escape" && setToggle(false)
    const mq = window.matchMedia("(min-width: 1024px)")
    const onChange = () => mq.matches && setToggle(false)

    document.addEventListener("keydown", onKey)
    mq.addEventListener("change", onChange)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", onKey)
      mq.removeEventListener("change", onChange)
      document.body.style.overflow = prevOverflow
    }
  }, [toggle])

  return (
    // fixed + top-0 keeps the header on screen. The bar slides down into place on load.
    <motion.header
      initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : -80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "pt-0" : ""
        }`}
    >
      <MainContainer>
        <div
          className={`relative flex h-22 items-center justify-between px-4 transition-all duration-500 md:px-6
            ${scrolled
              ? "rounded-b-2xl rounded-t-none bg-white/85 shadow-lg shadow-[#0b1635]/10 backdrop-blur-md"
              : "rounded-2xl bg-white shadow-md shadow-[#0b1635]/5"
            }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-[#0b1635] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0b1635]"
            onClick={() => setToggle(false)}
          >
            <Image
              src="/logo-1.png"
              alt="MyLogo"
              width={170}
              height={152}
              className="h-18 w-auto transition-transform duration-500 ease-out hover:scale-105"
            />
          </Link>

          {/* Nav (desktop links + mobile hamburger/menu) */}
          <Navbar toggle={toggle} setToggle={setToggle} />

          {/* CTA */}
          <Link
            href="/contact"
            className="hidden rounded-full border border-[#0b1635] bg-[#0b1635] px-6 py-2.5 font-medium texr-sm text-white
                       transition-all duration-300 hover:-translate-y-0.5 hover:border-[#cfe4e0] hover:bg-[#cfe4e0] hover:text-[#0b1635]
                       hover:shadow-lg hover:shadow-[#0b1635]/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b1635] lg:inline-block"
          >
            Contact Us
          </Link>
        </div>
      </MainContainer>
    </motion.header>
  )
}

export default Header
