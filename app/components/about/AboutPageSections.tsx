import InnerPagesBanner from "../layouts/InnerPageBanner";
import AboutSection from "../home/Aboutsection";
import StatsSection from "../home/Statssection";
import WhereBegan from "./WhereBegan";
import MissionVisionSection from "@/app/components/about/MissionVisionSection";
import TestimonialsSection from "../home/Testimonialssection";
import about from "@/app/data/about.json";
import FixedBackgroundSection from "../ui/Fixedbackgroundsection";

function AboutPageSections() {
  return (
    <div className="overflow-hidden bg-[#faf8f5]">
      <InnerPagesBanner
        image={about[0]?.aboutBannerImage ?? ""}
        badge="Our Story & Purpose"
        description={about[0]?.aboutBannerSubtitle}
        breadcrumbs={about[0]?.breadcrumbs}
      >
        {about[0]?.aboutBannerTitle}
      </InnerPagesBanner>

      <AboutSection
        image={about[1]?.image ?? ""}
        badge={about[1]?.badge ?? "About Us"}
        title={about[1]?.title ?? ""}
        description={about[1]?.description ?? ""}
        highlights={about[1]?.highlights ?? []}
        buttonText=""
        profileImage={about[1]?.profileImage ?? ""}
        name={about[1]?.name ?? ""}
        role={about[1]?.role ?? ""}
        experienceYears={about[1]?.experienceYears}
        experienceLabel={about[1]?.experienceLabel}
      />

      <WhereBegan
        image_left={about[2]?.image_1 ?? ""}
        image_right={about[2]?.image_2 ?? ""}
        badge={about[2]?.badge ?? ""}
        title={about[2]?.title ?? ""}
        description={about[2]?.description ?? []}
        image_left_alt={about[2]?.image_left_alt ?? ""}
        image_left_title={about[2]?.image_left_title ?? ""}
        image_left_description={about[2]?.image_left_description ?? ""}
        image_right_alt={about[2]?.image_right_alt ?? ""}
        image_right_title={about[2]?.image_right_title ?? ""}
        image_right_description={about[2]?.image_right_description ?? ""}
      />

      <FixedBackgroundSection image={about[0]?.aboutBannerImage ?? ""}>
        <StatsSection />
      </FixedBackgroundSection>

      {about[2]?.missionVision && (
        <MissionVisionSection data={about[2].missionVision} />
      )}

      <TestimonialsSection />
    </div>
  );
}

export default AboutPageSections;
