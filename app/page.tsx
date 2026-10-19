import AboutSection from "./components/home/Aboutsection";
import ActiveCampaigns from "./components/home/Activecampaigns";
import BlogSection from "./components/home/BlogSection";
import HeroSection from "./components/home/HeroSection";
import OurWorks from "./components/home/Ourworks";
import StatsSection from "./components/home/Statssection";
import TestimonialsSection from "./components/home/Testimonialssection";
import Faq from "./components/programs/Faq";
import FixedBackgroundSection from "./components/ui/Fixedbackgroundsection";


import programsData from "@/app/data/programs.json"

import about from "@/app/data/about.json"

export default function Home() {
  return (
    <main className="overflow-hidden bg-white">
      <HeroSection />

      <AboutSection
        image={about[1]?.image ?? ""}
        badge={about[1]?.badge ?? ""}
        title={about[1]?.title ?? ""}
        description={about[1]?.description ?? ""}
        buttonText={about[1]?.buttonText ?? ""}
        profileImage={about[1]?.profileImage ?? ""}
        name={about[1]?.name ?? ""}
        role={about[1]?.role ?? ""}
      />



      <ActiveCampaigns isShow={true} campaignsData={programsData.campaigns?.slice(0, 3)} />

      <FixedBackgroundSection image={about[0]?.aboutBannerImage ?? ""}>
        <div className=" mx-auto">
          <StatsSection />
        </div>
      </FixedBackgroundSection>

      <div className="sm:mt-0 mt-20">
        <OurWorks />
      </div>

      <TestimonialsSection />

      <BlogSection />

      <Faq />

    </main>
  );
}
