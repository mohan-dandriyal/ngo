import type { Metadata } from "next";
import InnerPagesBanner from "@/app/components/layouts/InnerPageBanner";
import VolunteerSection from "@/app/components/volunteer/VolunteerSection";
import volunteerData from "@/app/data/volunteer.json";

export const metadata: Metadata = {
  title: "Volunteer With Us",
  description: volunteerData.hero.description,
};

export default function VolunteerPage() {
  return (
    <main>
      <InnerPagesBanner
        image={volunteerData.hero.image}
        badge={volunteerData.hero.badge}
        description={volunteerData.hero.description}
        breadcrumbs={volunteerData.hero.breadcrumbs}
      >
        {volunteerData.hero.title}
      </InnerPagesBanner>
      <VolunteerSection />
    </main>
  );
}
