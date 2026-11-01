"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { FiChevronRight, FiHome } from "react-icons/fi";
import { BreadcrumbItem, innerPagesBannerProps } from "@/app/types/innerPageBanner";
import MainContainer from "../ui/MainContainer";

const EASE = [0.22, 1, 0.36, 1] as const;

const SEGMENT_LABELS: Record<string, string> = {
  about: "About Us",
  "our-programs": "Programs",
  projects: "Programs",
  "our-causes": "Our Causes",
  volunteer: "Volunteer",
  gallery: "Gallery",
  blog: "Blog",
  contact: "Contact",
  "our-work": "Our Work",
  "success-stories": "Success Stories",
};

function formatSegment(segment: string): string {
  if (SEGMENT_LABELS[segment]) return SEGMENT_LABELS[segment];
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function InnerPagesBanner({
  children,
  image,
  badge = "KindredHope Foundation",
  description,
  breadcrumbs,
}: innerPagesBannerProps) {
  const reduce = useReducedMotion();
  const pathname = usePathname();

  const items: BreadcrumbItem[] = React.useMemo(() => {
    if (breadcrumbs && breadcrumbs.length > 0) return breadcrumbs;

    const segments = (pathname || "").split("/").filter(Boolean);
    const trail: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

    segments.forEach((seg, index) => {
      const isLast = index === segments.length - 1;
      const href = "/" + segments.slice(0, index + 1).join("/");
      const label =
        isLast && typeof children === "string" && children.trim().length > 0
          ? children
          : formatSegment(seg);

      trail.push({
        label,
        href: isLast ? undefined : href,
      });
    });

    return trail;
  }, [breadcrumbs, pathname, children]);

  return (
    <section className="relative flex min-h-[28rem] w-full items-center overflow-hidden bg-[#0f291e] pt-36 pb-18 text-white sm:min-h-[32rem] sm:pt-40 md:min-h-[34rem] lg:pt-44">
      {/* Background image with warm rich overlay */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: reduce ? 1 : 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: EASE }}
        >
          <Image
            src={image}
            fill
            priority
            sizes="100vw"
            alt=""
            className="object-cover object-center opacity-55"
          />
        </motion.div>
        <div className="absolute inset-0 bg-linear-to-r from-[#0f291e]/92 via-[#0f291e]/75 to-[#0f291e]/60" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-[#0f291e] via-[#0f291e]/50 to-transparent" />
        <div className="absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-[#d96b43]/20 blur-3xl" />
      </div>

      <MainContainer className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          {badge && (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#f4a261] backdrop-blur-md">
              <span className="animate-pulse-soft h-1.5 w-1.5 rounded-full bg-[#d96b43]" />
              {badge}
            </span>
          )}

          <h1 className="font-display mt-5 text-3xl font-medium leading-[1.06] tracking-[-0.035em] text-[#faf8f5] sm:text-5xl lg:text-6xl">
            {children}
          </h1>

          {description && (
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              {description}
            </p>
          )}

          {/* Breadcrumb Navigation */}
          {items.length > 1 && (
            <nav
              aria-label="Breadcrumb"
              className="mt-7 flex justify-center"
            >
              <ol className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs font-semibold tracking-wide text-white/80 backdrop-blur-md sm:text-sm">
                {items.map((item, idx) => {
                  const isLast = idx === items.length - 1;
                  return (
                    <li
                      key={`${item.label}-${idx}`}
                      className="inline-flex items-center gap-2"
                    >
                      {idx > 0 && (
                        <FiChevronRight
                          aria-hidden="true"
                          size={14}
                          className="text-white/45"
                        />
                      )}
                      {item.href && !isLast ? (
                        <Link
                          href={item.href}
                          className="inline-flex items-center gap-1.5 text-white/80 transition-colors hover:text-[#f4a261]"
                        >
                          {idx === 0 && (
                            <FiHome
                              aria-hidden="true"
                              size={13}
                              className="text-[#f4a261]"
                            />
                          )}
                          <span>{item.label}</span>
                        </Link>
                      ) : (
                        <span
                          aria-current="page"
                          className="max-w-[18rem] truncate font-bold text-[#f4a261] sm:max-w-xs"
                        >
                          {item.label}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          )}
        </motion.div>
      </MainContainer>
    </section>
  );
}
