"use client";

import React, { ReactNode } from "react";
import Image from "next/image";

interface FixedBackgroundProps {
  children: ReactNode;
  image: string;
}

function FixedBackgroundSection({ children, image }: FixedBackgroundProps) {
  return (
    <section
      className="relative isolate flex min-h-[60vh] items-center overflow-hidden py-18 text-white"
      aria-labelledby="fixed-bg-heading"
      style={{ clipPath: "inset(0)" }}
    >
      <div aria-hidden="true" className="fixed inset-0 -z-20 h-screen w-full">
        <Image
          src={image}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Deep forest emerald overlay keeps text crisp on any background photo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-br from-[#0f291e]/92 via-[#0f291e]/82 to-[#1b4332]/88"
      />

      <div className="w-full">{children}</div>
    </section>
  );
}

export default FixedBackgroundSection;
