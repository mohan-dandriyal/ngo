import InnerPagesBanner from "@/app/components/layouts/InnerPageBanner"
import VolunteerSection from "@/app/components/volunteer/VolunteerSection"

export default function VolunteerPage() {
    return (
        <div>
            <InnerPagesBanner image="/bg-image.png">Volunteer</InnerPagesBanner>
            <VolunteerSection />
        </div>
    )
}
