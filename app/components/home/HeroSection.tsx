"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import CountUp from "react-countup";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { FiArrowUpRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import MainContainer from "../ui/MainContainer";
import homeData from "@/app/data/home.json";
import type { HomePageData } from "@/app/types/home";

const data = homeData as HomePageData;
const heroSlides = data.heroSlides;
const heroStats = data.heroStats;
const EASE = [0.22, 1, 0.36, 1] as const;

const reveal =
  "translate-y-8 opacity-0 transition-all duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] " +
  "motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none " +
  "group-[.swiper-slide-active]:translate-y-0 group-[.swiper-slide-active]:opacity-100";

function HeroSection() {
  const reduce = useReducedMotion();
  const swiperRef = React.useRef<SwiperType | null>(null);
  const [active, setActive] = React.useState(0);

  return (
    <section className="relative min-h-dvh w-full overflow-hidden bg-[#0f291e] text-white">
      <h1 className="sr-only">KindredHope Foundation — Lend a Helping Hand</h1>

      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        loop
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActive(swiper.realIndex)}
        className="h-dvh min-h-[50rem] w-full"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="group relative h-full w-full overflow-hidden">
            <motion.div
              className="absolute inset-0"
              initial={{ scale: reduce ? 1 : 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.4, ease: EASE }}
            >
              <Image
                src={slide.image}
                fill
                priority={index === 0}
                sizes="100vw"
                alt=""
                className="object-cover object-center opacity-65"
              />
            </motion.div>

            {/* Warm forest gradient overlays */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-r from-[#0f291e]/95 via-[#0f291e]/75 to-[#0f291e]/30"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-[#0f291e] via-[#0f291e]/70 to-transparent"
            />
            <div
              aria-hidden="true"
              className="absolute -left-24 top-1/4 h-96 w-96 rounded-full bg-[#d96b43]/20 blur-3xl"
            />

            <MainContainer className="relative z-10 flex h-full items-center pt-40 pb-36 sm:pt-44 lg:pt-48">
              <div className="w-full max-w-3xl">
                <div className={`inline-block ${reveal}`}>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#f4a261] backdrop-blur-md">
                    <span className="h-2 w-2 rounded-full bg-[#d96b43]" />
                    {slide.badge}
                  </span>
                </div>

                <h2 className="font-display mt-6 text-4xl font-medium leading-[1.06] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
                  <span className={`block ${reveal}`}>{slide.line1}</span>
                  <span className={`block delay-150 ${reveal}`}>
                    {slide.line2}{" "}
                    <span aria-hidden="true" className="text-[#f4a261]">
                      ✦
                    </span>
                  </span>
                  <span
                    className={`font-editorial block font-normal italic tracking-normal text-[#f4a261] delay-300 ${reveal}`}
                  >
                    {slide.line3}
                  </span>
                </h2>

                <p
                  className={`mt-6 max-w-xl text-base leading-relaxed text-white/85 delay-400 sm:text-lg md:text-lg ${reveal}`}
                >
                  {slide.description}
                </p>

                <div
                  className={`mt-8 flex flex-wrap items-center gap-4 delay-500 ${reveal}`}
                >
                  <Link
                    href={slide.primaryCta.href}
                    className="inline-flex items-center gap-2.5 rounded-full bg-[#d96b43] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-[#d96b43]/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f4a261] hover:text-[#0f291e] sm:text-base"
                  >
                    {slide.primaryCta.label}
                    <FiArrowUpRight size={18} />
                  </Link>
                  <Link
                    href={slide.secondaryCta.href}
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-[#0f291e] sm:text-base"
                  >
                    {slide.secondaryCta.label}
                  </Link>
                </div>
              </div>
            </MainContainer>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bottom Bar: Live Impact Stats + Slider Controls */}
      <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/12 bg-[#0f291e]/75 backdrop-blur-md">
        <MainContainer className="flex flex-col items-center justify-between gap-6 py-5 md:flex-row">
          {/* Hero Stats */}
          <dl className="hidden flex-wrap items-center gap-8 sm:flex md:gap-12 lg:gap-16">
            {heroStats.map((stat, idx) => (
              <React.Fragment key={stat.label}>
                <div className="flex items-baseline gap-3">
                  <dd className="font-display text-2xl font-bold tracking-tight text-[#f4a261] tabular-nums md:text-3xl">
                    <CountUp
                      end={stat.end}
                      suffix={stat.suffix}
                      duration={reduce ? 0 : 2.2}
                      separator=","
                    />
                  </dd>
                  <dt className="text-xs font-medium uppercase tracking-[0.12em] text-white/75">
                    {stat.label}
                  </dt>
                </div>
                {idx < heroStats.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden h-5 w-px bg-white/15 lg:inline-block"
                  />
                )}
              </React.Fragment>
            ))}
          </dl>

          {/* Controls */}
          <div className="xl:flex w-full items-center justify-between gap-5 sm:w-auto sm:justify-end">
            <span className="text-xs font-bold tracking-[0.18em] tabular-nums text-white/75 lg:block hidden">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(heroSlides.length).padStart(2, "0")}
            </span>

            {/* <div className="flex gap-2">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === active}
                  onClick={() => swiperRef.current?.slideToLoop(index)}
                  className={`h-1.5 cursor-pointer rounded-full transition-all duration-500 ${
                    index === active
                      ? "w-9 bg-[#f4a261]"
                      : "w-4 bg-white/35 hover:bg-white/65"
                  }`}
                />
              ))}
            </div> */}

            <div className="flex gap-2.5">
              <button
                type="button"
                aria-label="Previous slide"
                onClick={() => swiperRef.current?.slidePrev()}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:border-[#f4a261] hover:bg-[#f4a261] hover:text-[#0f291e] active:scale-95"
              >
                <FiChevronLeft size={18} />
              </button>
              <button
                type="button"
                aria-label="Next slide"
                onClick={() => swiperRef.current?.slideNext()}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#d96b43] text-white shadow-md transition hover:bg-[#f4a261] hover:text-[#0f291e] active:scale-95"
              >
                <FiChevronRight size={18} />
              </button>
            </div>
          </div>
        </MainContainer>
      </div>
    </section>
  );
}

export default HeroSection;
