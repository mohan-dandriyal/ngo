"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi"
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import MainContainer from "../ui/MainContainer"
import blogData from "@/app/data/blog.json"

const companyLinks = [
  { label: "About us", href: "/about" },
  { label: "Appointment", href: "/appointment" },
  { label: "Volunteers", href: "/volunteer" },
  { label: "Careers", href: "/careers" },
  { label: "Contact us", href: "/contact" },
]

const causes = [
  ...blogData.blog.slice(0, 2).map((post) => ({
    date: new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(`${post.publishedAt}T00:00:00`)),
    title: post.title,
    image: post.image,
    href: `/blog/${post.slug}`,
  })),
]

const socials = [
  { label: "Facebook", href: "https://facebook.com", icon: FaFacebookF },
  { label: "X", href: "https://x.com", icon: FaXTwitter },
  { label: "Instagram", href: "https://instagram.com", icon: FaInstagram },
  { label: "YouTube", href: "https://youtube.com", icon: FaYoutube },
  { label: "LinkedIn", href: "https://linkedin.com", icon: FaLinkedinIn },
]

// Smooth "expo-out" curve shared by all entrance animations
const EASE = [0.22, 1, 0.36, 1]

/** Same soft watercolor pattern as the cards in the other sections, stretched across the footer */
const footerBackground = `radial-gradient(45% 55% at 10% 15%, #e9f2d9 0%, transparent 70%),
   radial-gradient(40% 50% at 90% 85%, #bcd6dc 0%, transparent 70%),
   radial-gradient(35% 45% at 60% 10%, #e9f2d9 0%, transparent 75%),
   radial-gradient(40% 50% at 30% 95%, #cfe5da 0%, transparent 70%),
   #dcebdd`

const linkClass =
  "underline-offset-4 transition-colors duration-300 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0b1635]"

function Footer() {
  const reduce = useReducedMotion()
  const [email, setEmail] = React.useState("")
  const [subscribed, setSubscribed] = React.useState(false)
  const [showTop, setShowTop] = React.useState(false)

  // Show the back-to-top button after scrolling down a bit
  React.useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    // TODO: send `email` to your newsletter API here
    setSubscribed(true)
    setEmail("")
  }

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12 } },
  }
  const fadeUp = {
    hidden: {
      opacity: reduce ? 1 : 0,
      y: reduce ? 0 : 40,
      filter: reduce ? "blur(0px)" : "blur(8px)",
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: EASE, when: "beforeChildren", staggerChildren: reduce ? 0 : 0.08 },
    },
  }

  // List items (contact rows, links, causes, socials) pop in one after another
  const item = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 20, scale: reduce ? 1 : 0.9 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE } },
  }

  const headingClass = "text-2xl font-extrabold tracking-tight text-[#0b1635]"

  return (
    <footer
      className="relative isolate overflow-hidden rounded-t-3xl pb-2 pt-16 text-[#0b1635] md:pt-20"
      style={{ background: footerBackground }}
    >
      <MainContainer>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="px-6 md:px-0"
        >
          {/* Four columns */}
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
            {/* Logo + contact */}
            <motion.div variants={fadeUp} className="lg:col-span-3">
              <Link href="/" aria-label="Home" className="inline-block">
                {/* The footer is now light: use your regular dark-on-light logo here */}
                <Image src="/dark-logo-1.png" alt="MyLogo" width={170} height={152} className="h-28 w-auto" />
              </Link>

              <ul className="mt-5 space-y-5">
                <motion.li variants={item} className="flex items-start gap-4">
                  <FiMapPin aria-hidden="true" size={20} className="mt-1 shrink-0" />
                  <address className="not-italic leading-relaxed">
                    575 Main Street, D-block,
                    <br />
                    2nd floor, New Delhi, India
                  </address>
                </motion.li>
                <motion.li variants={item} className="flex items-center gap-4">
                  <FiMail aria-hidden="true" size={20} className="shrink-0" />
                  <a href="mailto:hello@example.org" className={linkClass}>
                    hello@example.org
                  </a>
                </motion.li>
                <motion.li variants={item} className="flex items-center gap-4">
                  <FiPhone aria-hidden="true" size={20} className="shrink-0" />
                  <a href="tel:+911234567890" className={linkClass}>
                    +91 12345 67890
                  </a>
                </motion.li>
              </ul>
            </motion.div>

            {/* Company */}
            <motion.nav variants={fadeUp} aria-label="Company" className="lg:col-span-2">
              <h3 className={headingClass}>Company</h3>
              <ul className="mt-9 space-y-6">
                {companyLinks.map((l) => (
                  <motion.li key={l.href} variants={item} className="group/link flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-[#0b1635]/30 transition-colors duration-300 group-hover/link:bg-[#0b1635]"
                    />
                    <Link
                      href={l.href}
                      className={`inline-block transition-transform duration-300 hover:translate-x-1 ${linkClass}`}
                    >
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>


            {/* Causes */}
            <motion.div variants={fadeUp} className="lg:col-span-7">
              <h3 className={headingClass}>Causes</h3>
              <ul className="mt-9 space-y-6">
                {causes.map((c) => (
                  <motion.li key={c.title} variants={item} className="group relative flex items-center gap-5">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={c.image}
                        alt=""
                        fill
                        sizes="96px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium italic text-[#0b1635]/70">{c.date}</p>
                      <h4 className="mt-1 line-clamp-2 font-semibold leading-snug">
                        <Link
                          href={c.href}
                          className={`after:absolute after:inset-0 ${linkClass}`}
                        >
                          {c.title}
                        </Link>
                      </h4>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

          </div>

          {/* Newsletter box */}
          {/* <motion.div
            variants={fadeUp}
            className="mt-16 grid items-center gap-8 border border-white/20 p-8 md:grid-cols-2 md:p-12"
          >
            <h3 className="text-2xl font-bold leading-snug md:border-r md:border-white/20 md:py-4 md:text-3xl">
              Get every single updates
              <br />
              join our newsletters
            </h3>

            <div className="md:pl-6">
              {subscribed ? (
                <p role="status" className="font-semibold text-red-500">
                  Thank you! You are subscribed.
                </p>
              ) : (
                <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
                  <label htmlFor="charity-footer-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="charity-footer-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full border border-white/20 bg-transparent px-5 py-3.5 text-white placeholder:text-white/50 focus-visible:border-red-500 focus-visible:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-red-500 px-8 py-3.5 font-semibold text-white transition-colors duration-200 hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </motion.div> */}

          {/* Bottom bar */}
          <motion.div
            variants={fadeUp}
            className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-[#0b1635]/15 pt-10 md:flex-row"
          >
            <p>
              Copyright &copy; {new Date().getFullYear()} MyLogo. All rights reserved.
            </p>

            <ul className="flex gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <motion.li key={label} variants={item}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0b1635] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#1c2b57] hover:shadow-lg hover:shadow-[#0b1635]/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b1635]"
                  >
                    <Icon aria-hidden="true" size={17} />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </MainContainer>

      {/* Floating back-to-top button */}
      {/* <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            aria-label="Back to top"
            initial={{ opacity: 0, scale: reduce ? 1 : 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: reduce ? 1 : 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
            className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border-2 border-red-500 bg-neutral-950/80 text-red-500 backdrop-blur transition-colors duration-200 hover:bg-red-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <FiChevronUp aria-hidden="true" size={22} />
          </motion.button>
        )}
      </AnimatePresence> */}
    </footer>
  )
}

export default Footer
