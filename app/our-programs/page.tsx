import ActiveCampaigns from "@/app/components/home/Activecampaigns"
import InnerPagesBanner from "@/app/components/layouts/InnerPageBanner"
import HowWeWork from "@/app/components/programs/HowWeWork"
import SuccessStories from "../components/programs/SuccessStories"
import Faq from "../components/programs/Faq"
import programsData from "@/app/data/programs.json"
import type { ProgramsData } from "@/app/types/programs"
import StatsSection from "../components/home/Statssection"
import FixedBackgroundSection from "../components/ui/Fixedbackgroundsection"



const data = programsData as ProgramsData

export default function OurProgramsPage() {
    return (
        <main className="overflow-hidden bg-white">
            <InnerPagesBanner image={data.hero.image}>
                {data.hero.title}
            </InnerPagesBanner>

            <div className="mt-8">
                <ActiveCampaigns isShow={false} campaignsData={data.campaigns} />
            </div>

            <div className="mt-10 mb-22">
                <HowWeWork />
            </div>

            <div className="mt-15">
                <Faq />
            </div>

            <div className="mx-auto max-w-360 border-t border-[#0b1635]/10">
                <FixedBackgroundSection image={programsData.hero.image ?? ""}>
                    <div className=" mx-auto">
                        <StatsSection />
                    </div>
                </FixedBackgroundSection>
            </div>

            <SuccessStories />

            
        </main>
    )
}
