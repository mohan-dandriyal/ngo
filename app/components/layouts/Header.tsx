"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { FiHeart } from "react-icons/fi";
import Navbar from "../ui/Navbar";
import MainContainer from "../ui/MainContainer";
import siteData from "@/app/data/site.json";

const EASE = [0.22, 1, 0.36, 1] as const;

function Header() {
  const reduce = useReducedMotion();
  const [toggle, setToggle] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (!toggle) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setToggle(false);
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setToggle(false);

    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
      document.body.style.overflow = prevOverflow;
    };
  }, [toggle]);

  return (
    <motion.header
      initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : -60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "pt-2.5" : "pt-4"
      }`}
    >
      <MainContainer>
        <div
          className={`relative flex h-20 items-center justify-between gap-4 rounded-full border px-5 transition-all duration-500 sm:px-7 ${
            scrolled
              ? "border-[#0f291e]/12 bg-white/95 shadow-xl shadow-[#0f291e]/10 backdrop-blur-md"
              : "border-white/40 bg-white/95 shadow-lg shadow-[#0f291e]/8 backdrop-blur-md"
          }`}
        >
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0f291e]"
            onClick={() => setToggle(false)}
          >
            <Image
              src={siteData.brand.logoLight}
              alt={siteData.brand.name}
              width={195}
              height={50}
              priority
              className="h-11 w-auto transition-transform duration-300 hover:scale-[1.02] sm:h-12"
            />
          </Link>

          {/* Center Navigation */}
          <Navbar toggle={toggle} setToggle={setToggle} />

          {/* Separate Donate Now Button (links to #) */}
          <div className="hidden shrink-0 items-center lg:flex">
            <a
              href={siteData.header.donateCta.href}
              className="group relative inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap overflow-hidden rounded-full bg-[#d96b43] px-6 py-3 text-sm font-bold text-white shadow-md shadow-[#d96b43]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0f291e] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f291e]"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:scale-110">
                <FiHeart className="fill-current" size={13} />
              </span>
              <span>{siteData.header.donateCta.label}</span>
            </a>
          </div>
        </div>
      </MainContainer>
    </motion.header>
  );
}

export default Header;
