import ActiveCampaigns from "@/app/components/home/Activecampaigns"
import InnerPagesBanner from "@/app/components/layouts/InnerPageBanner"
import HowWeWork from "@/app/components/programs/HowWeWork"
import SuccessStories from "../components/programs/SuccessStories"
import Faq from "../components/programs/Faq"
import programsData from "@/app/data/programs.json"
import type { ProgramsData } from "@/app/types/programs"
import StatsSection from "../components/home/Statssection"

const data = programsData as ProgramsData

export default function OurProgramsPage() {
    return (
        <main className="overflow-hidden bg-white">
            <InnerPagesBanner image={data.hero.image}>
                {data.hero.title}
            </InnerPagesBanner>

            <ActiveCampaigns isShow={false} />


            <HowWeWork />

            <Faq />

            <SuccessStories />

            <div className="mx-auto max-w-360 border-t border-[#0b1635]/10">
                <StatsSection />
            </div>
        </main>
    )
}
