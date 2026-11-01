import AboutSection from "./components/home/Aboutsection";
import BlogSection from "./components/home/BlogSection";
import HeroSection from "./components/home/HeroSection";
import OurCausesSection from "./components/home/OurCausesSection";
import OurWorks from "./components/home/Ourworks";
import StatsSection from "./components/home/Statssection";
import TestimonialsSection from "./components/home/Testimonialssection";
import Faq from "./components/programs/Faq";
import FixedBackgroundSection from "./components/ui/Fixedbackgroundsection";

import about from "@/app/data/about.json";

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#faf8f5]">
      <HeroSection />

      <AboutSection
        image={about[1]?.image ?? ""}
        badge={about[1]?.badge ?? ""}
        title={about[1]?.title ?? ""}
        description={about[1]?.description ?? ""}
        highlights={about[1]?.highlights ?? []}
        buttonText={about[1]?.buttonText ?? ""}
        profileImage={about[1]?.profileImage ?? ""}
        name={about[1]?.name ?? ""}
        role={about[1]?.role ?? ""}
        experienceYears={about[1]?.experienceYears}
        experienceLabel={about[1]?.experienceLabel}
      />

      <OurCausesSection />

      <FixedBackgroundSection image={about[0]?.aboutBannerImage ?? ""}>
        <StatsSection />
      </FixedBackgroundSection>

      <OurWorks />

      <TestimonialsSection />

      <BlogSection />

      <Faq />
    </main>
  );
}
