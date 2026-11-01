"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FiArrowUpRight, FiCheck, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import MainContainer from "../ui/MainContainer";
import blogData from "@/app/data/blog.json";
import siteData from "@/app/data/site.json";

const socialIcons = {
  facebook: FaFacebookF,
  x: FaXTwitter,
  instagram: FaInstagram,
  youtube: FaYoutube,
  linkedin: FaLinkedinIn,
} as const;

const recentStories = blogData.blog.slice(0, 2).map((post) => ({
  date: new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${post.publishedAt}T00:00:00`)),
  title: post.title,
  category: post.category,
  image: post.image,
  href: `/blog/${post.slug}`,
}));

const EASE = [0.22, 1, 0.36, 1] as const;

function Footer() {
  const reduce = useReducedMotion();
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.1 } },
  };

  const fadeUp: Variants = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
  };

  return (
    <footer className="relative isolate overflow-hidden bg-[#0f291e] pt-18 pb-12 text-[#faf8f5]">
      {/* Subtle ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-[#2d6a4f]/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-10 h-80 w-80 rounded-full bg-[#d96b43]/15 blur-3xl"
      />

      <MainContainer>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Main 4-Column Footer Grid */}
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
            {/* Col 1: Brand + Contact */}
            <motion.div variants={fadeUp} className="lg:col-span-4">
              <Link href="/" aria-label="Home" className="inline-block">
                <Image
                  src={siteData.brand.logoDark}
                  alt={siteData.brand.name}
                  width={210}
                  height={54}
                  className="h-13 w-auto"
                />
              </Link>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
                {siteData.brand.description}
              </p>

              <ul className="mt-6 space-y-3.5 text-sm text-white/85">
                <li className="flex items-start gap-3.5">
                  <FiMapPin aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-[#f4a261]" />
                  <address className="not-italic leading-relaxed">
                    {siteData.footer.contact.address}
                  </address>
                </li>
                <li className="flex items-center gap-3.5">
                  <FiMail aria-hidden="true" size={18} className="shrink-0 text-[#f4a261]" />
                  <a
                    href={`mailto:${siteData.footer.contact.email}`}
                    className="transition-colors hover:text-[#f4a261] hover:underline"
                  >
                    {siteData.footer.contact.email}
                  </a>
                </li>
                <li className="flex items-center gap-3.5">
                  <FiPhone aria-hidden="true" size={18} className="shrink-0 text-[#f4a261]" />
                  <a
                    href={`tel:${siteData.footer.contact.phone.replace(/\s+/g, "")}`}
                    className="transition-colors hover:text-[#f4a261] hover:underline"
                  >
                    {siteData.footer.contact.phone}
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Col 2: Organization */}
            <motion.nav
              variants={fadeUp}
              aria-label={siteData.footer.companyHeading}
              className="lg:col-span-2"
            >
              <h4 className="font-display text-lg font-semibold tracking-tight text-white">
                {siteData.footer.companyHeading}
              </h4>
              <ul className="mt-5 space-y-3 text-sm text-white/75">
                {siteData.footer.companyLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="inline-flex items-center gap-2 transition-all duration-200 hover:translate-x-1 hover:text-[#f4a261]"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#d96b43]" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>

            {/* Col 3: Programs */}
            <motion.nav
              variants={fadeUp}
              aria-label={siteData.footer.programsHeading}
              className="lg:col-span-2"
            >
              <h4 className="font-display text-lg font-semibold tracking-tight text-white">
                {siteData.footer.programsHeading}
              </h4>
              <ul className="mt-5 space-y-3 text-sm text-white/75">
                {siteData.footer.programLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="inline-flex items-center gap-2 transition-all duration-200 hover:translate-x-1 hover:text-[#f4a261]"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#52b788]" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>

            {/* Col 4: Recent Field Stories */}
            <motion.div variants={fadeUp} className="lg:col-span-4">
              <h4 className="font-display text-lg font-semibold tracking-tight text-white">
                {siteData.footer.causesHeading}
              </h4>
              <ul className="mt-5 space-y-4">
                {recentStories.map((story) => (
                  <li
                    key={story.href}
                    className="group relative flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-3 transition-colors hover:bg-white/10"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={story.image}
                        alt={story.title}
                        fill
                        sizes="80px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 text-xs text-[#f4a261]">
                        <span className="font-semibold">{story.category}</span>
                        <span>·</span>
                        <span className="text-white/60">{story.date}</span>
                      </div>
                      <h5 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-white group-hover:text-[#f4a261]">
                        <Link href={story.href} className="after:absolute after:inset-0">
                          {story.title}
                        </Link>
                      </h5>
                    </div>
                    <FiArrowUpRight
                      size={16}
                      className="shrink-0 text-white/50 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#f4a261]"
                    />
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            variants={fadeUp}
            className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-white/12 pt-8 text-sm text-white/65 md:flex-row"
          >
            <p>{siteData.footer.copyright}</p>

            <ul className="flex items-center gap-3">
              {siteData.footer.socials.map(({ label, href, platform }) => {
                const Icon = socialIcons[platform as keyof typeof socialIcons] ?? FaFacebookF;
                return (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-all duration-300 hover:-translate-y-1 hover:border-[#d96b43] hover:bg-[#d96b43]"
                    >
                      <Icon aria-hidden="true" size={15} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      </MainContainer>
    </footer>
  );
}

export default Footer;
