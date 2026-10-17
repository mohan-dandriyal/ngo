import InnerPagesBanner from "@/app/components/layouts/InnerPageBanner"
import TestimonialsSection from "@/app/components/home/Testimonialssection"

export default function SuccessStoriesPage() {
    return (
        <>
            <InnerPagesBanner image="/bg-image.png">
                Success Stories
            </InnerPagesBanner>

            <TestimonialsSection />
        </>
    )
}
