"use client";

import { SectionDescription, SectionTitle, SectionBadge } from "../SectionHeader";
import MainContainer from "../ui/MainContainer";
import Image from "next/image";
import { WhereBeganSection } from "@/app/types/about";
import about from "@/app/data/about.json";

const coreValues = about[2]?.coreValues ?? [];

function WhereBegan({
  image_left,
  image_right,
  badge,
  title,
  description,
  image_left_alt,
  image_left_title,
  image_left_description,
  image_right_alt,
  image_right_title,
  image_right_description,
}: WhereBeganSection) {
  return (
    <section className="bg-[#f2efe9] py-18" aria-labelledby="where-began-heading">
      <MainContainer>
        <div>
          <SectionBadge>{badge}</SectionBadge>

          <div className="mt-2 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <SectionTitle id="where-began-heading">{title}</SectionTitle>
            </div>
            <div className="space-y-4 lg:col-span-6">
              {(Array.isArray(description) ? description : [description]).map(
                (dis, ind) => (
                  <SectionDescription key={ind}>{dis}</SectionDescription>
                )
              )}
            </div>
          </div>

          {/* Dual Image Feature Grid */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-12">
            {/* Left Wider Image */}
            <div className="group relative h-96 w-full overflow-hidden rounded-3xl border border-[#0f291e]/10 shadow-md md:col-span-7 md:h-[460px]">
              <Image
                src={image_left}
                fill
                sizes="(min-width: 768px) 58vw, 100vw"
                alt={image_left_alt}
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-[#0f291e]/95 via-[#0f291e]/60 to-transparent p-6 pt-20 text-white sm:p-8">
                <h3 className="font-display text-2xl font-semibold italic tracking-tight sm:text-3xl">
                  {image_left_title}
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/85 sm:text-base">
                  {image_left_description}
                </p>
              </div>
            </div>

            {/* Right Narrower Image */}
            <div className="group relative h-96 w-full overflow-hidden rounded-3xl border border-[#0f291e]/10 shadow-md md:col-span-5 md:h-[460px]">
              <Image
                src={image_right}
                fill
                sizes="(min-width: 768px) 42vw, 100vw"
                alt={image_right_alt}
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-[#0f291e]/95 via-[#0f291e]/60 to-transparent p-6 pt-20 text-white sm:p-8">
                <h3 className="font-display text-2xl font-semibold italic tracking-tight sm:text-3xl">
                  {image_right_title}
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/85 sm:text-base">
                  {image_right_description}
                </p>
              </div>
            </div>
          </div>

          {/* Core Values Row */}
          {coreValues.length > 0 && (
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {coreValues.map((val) => (
                <div
                  key={val.number}
                  className="rounded-3xl border border-[#0f291e]/10 bg-white p-7 shadow-xs transition-transform duration-300 hover:-translate-y-1"
                >
                  <span className="font-display text-3xl font-bold text-[#d96b43]">
                    {val.number}
                  </span>
                  <h4 className="font-display mt-4 text-2xl font-semibold text-[#0f291e]">
                    {val.title}
                  </h4>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#0f291e]/75 sm:text-base">
                    {val.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </MainContainer>
    </section>
  );
}

export default WhereBegan;
