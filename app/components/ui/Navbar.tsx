"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { FiHeart } from "react-icons/fi";
import siteData from "@/app/data/site.json";

interface NavbarProps {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const navLinks = siteData.header.navLinks;
const EASE = [0.22, 1, 0.36, 1] as const;

const Navbar = ({ toggle, setToggle }: NavbarProps) => {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [hovered, setHovered] = React.useState<string | null>(null);

  const list: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.05,
        delayChildren: reduce ? 0 : 0.15,
      },
    },
  };
  const drop: Variants = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : -10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  };

  const panel: Variants = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : -12, scale: reduce ? 1 : 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: EASE,
        when: "beforeChildren",
        staggerChildren: reduce ? 0 : 0.04,
      },
    },
  };
  const slideIn: Variants = {
    hidden: { opacity: reduce ? 1 : 0, x: reduce ? 0 : -14 },
    show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } },
  };

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav aria-label="Main Navigation" className="flex items-center">
      {/* Desktop links inside a sleek subtle pill track */}
      <motion.ul
        variants={list}
        initial="hidden"
        animate="show"
        onMouseLeave={() => setHovered(null)}
        className="hidden items-center gap-0.5 rounded-full border border-[#0f291e]/8 bg-[#f2efe9]/70 p-1.5 lg:flex"
      >
        {navLinks.map((link) => {
          const active = isLinkActive(link.href);
          const showHover = hovered === link.href && !active;

          return (
            <motion.li key={link.href} variants={drop}>
              <Link
                href={link.href}
                onMouseEnter={() => setHovered(link.href)}
                onFocus={() => setHovered(link.href)}
                onBlur={() => setHovered(null)}
                aria-current={active ? "page" : undefined}
                className={`relative block whitespace-nowrap rounded-full px-3.5 py-2 text-[13.5px] font-semibold transition-colors duration-300 xl:px-4 xl:text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f291e] ${
                  active ? "text-white" : "text-[#0f291e]/85 hover:text-[#0f291e]"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 380, damping: 32 }
                    }
                    className="absolute inset-0 rounded-full bg-[#0f291e] shadow-xs"
                  />
                )}
                {showHover && (
                  <motion.span
                    layoutId="nav-hover"
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 400, damping: 34 }
                    }
                    className="absolute inset-0 rounded-full bg-white shadow-2xs"
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            </motion.li>
          );
        })}
      </motion.ul>

      {/* Mobile hamburger */}
      <button
        type="button"
        onClick={() => setToggle((prev) => !prev)}
        aria-label="Toggle navigation menu"
        aria-expanded={toggle}
        aria-controls="mobile-menu"
        className="flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-full border border-[#0f291e]/12 bg-[#faf8f5] transition-colors duration-300 hover:bg-[#e6efea] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f291e] lg:hidden"
      >
        <span
          className={`h-0.5 w-5 bg-[#0f291e] transition-all duration-300 ${
            toggle ? "translate-y-2 rotate-45" : ""
          }`}
        />
        <span
          className={`h-0.5 w-5 bg-[#0f291e] transition-all duration-300 ${
            toggle ? "opacity-0" : ""
          }`}
        />
        <span
          className={`h-0.5 w-5 bg-[#0f291e] transition-all duration-300 ${
            toggle ? "-translate-y-2 -rotate-45" : ""
          }`}
        />
      </button>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {toggle && (
          <motion.div
            id="mobile-menu"
            variants={panel}
            initial="hidden"
            animate="show"
            exit={{
              opacity: reduce ? 1 : 0,
              y: reduce ? 0 : -12,
              transition: { duration: 0.2 },
            }}
            className="absolute left-0 top-full mt-2.5 w-full overflow-hidden rounded-3xl border border-[#0f291e]/12 bg-white p-4 shadow-2xl shadow-[#0f291e]/15 lg:hidden"
          >
            <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
              {navLinks.map((link) => {
                const active = isLinkActive(link.href);

                return (
                  <motion.li key={link.href} variants={slideIn}>
                    <Link
                      href={link.href}
                      onClick={() => setToggle(false)}
                      aria-current={active ? "page" : undefined}
                      className={`block rounded-2xl px-4 py-3 text-sm font-semibold transition-colors duration-200 ${
                        active
                          ? "bg-[#0f291e] text-white"
                          : "text-[#0f291e] hover:bg-[#e6efea]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                );
              })}
              <motion.li variants={slideIn} className="mt-2 sm:col-span-2">
                <a
                  href={siteData.header.donateCta.href}
                  onClick={() => setToggle(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-[#d96b43] px-6 py-3.5 text-center text-sm font-bold text-white shadow-md transition-colors duration-300 hover:bg-[#0f291e]"
                >
                  <FiHeart className="fill-current" size={15} />
                  {siteData.header.donateCta.label}
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
