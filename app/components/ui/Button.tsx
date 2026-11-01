import React, { ReactNode } from "react";
import Link from "next/link";

interface ButtonProps {
  children: ReactNode;
  href: string;
  className?: string;
}

const base =
  "group relative inline-flex items-center justify-center overflow-hidden rounded-full border px-7 py-4 text-sm sm:text-base font-semibold tracking-tight " +
  "transition-all duration-500 ease-out hover:-translate-y-0.5 active:scale-95 " +
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0f291e]";

const fill =
  "absolute inset-0 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0";

export const PrimaryButton = ({ children, href, className = "" }: ButtonProps) => {
  return (
    <Link
      href={href}
      className={`${base} border-[#d96b43] bg-[#d96b43] text-white shadow-lg shadow-[#d96b43]/25 hover:border-[#0f291e] hover:text-white hover:shadow-xl hover:shadow-[#0f291e]/20 ${className}`}
    >
      <span aria-hidden="true" className={`${fill} bg-[#0f291e]`} />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Link>
  );
};

export const OutlineButton = ({ children, href, className = "" }: ButtonProps) => {
  return (
    <Link
      href={href}
      className={`${base} border-[#0f291e]/25 bg-white text-[#0f291e] shadow-xs hover:border-[#0f291e] hover:text-white hover:shadow-lg hover:shadow-[#0f291e]/15 ${className}`}
    >
      <span aria-hidden="true" className={`${fill} bg-[#0f291e]`} />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Link>
  );
};
