import { ReactNode } from "react";

interface LayoutTextProps {
  children: ReactNode;
}

export const CardTitle = ({ children }: LayoutTextProps) => {
  return (
    <h3 className="font-display mt-2 text-2xl font-medium leading-[1.18] tracking-[-0.025em] text-[#0f291e] transition-colors duration-200 lg:text-[1.75rem]">
      {children}
    </h3>
  );
};

export const CardTitleLink = ({ children }: LayoutTextProps) => {
  return (
    <h3 className="font-display mt-3 text-xl font-medium leading-[1.2] tracking-[-0.025em] text-[#0f291e] transition-colors duration-200 group-hover:text-[#d96b43] md:text-2xl">
      {children}
    </h3>
  );
};

export const Paragraf = ({ children }: LayoutTextProps) => {
  return (
    <p className="mt-2.5 line-clamp-3 text-base font-normal leading-[1.7] text-[#0f291e]/72">
      {children}
    </p>
  );
};
