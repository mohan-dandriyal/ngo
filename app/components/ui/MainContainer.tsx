import { ReactNode } from "react";

interface MainContainerProps {
  children: ReactNode;
  className?: string;
}

const MainContainer = ({ children, className = "" }: MainContainerProps) => {
  return (
    <div
      className={`relative mx-auto w-full max-w-360 px-6 sm:px-10 md:px-14 lg:px-20 ${className}`}
    >
      {children}
    </div>
  );
};

export default MainContainer;
