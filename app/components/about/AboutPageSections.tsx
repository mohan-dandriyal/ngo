
import InnerPagesBanner from '../layouts/InnerPageBanner'
import AboutSection from '../home/Aboutsection'
import StatsSection from '../home/Statssection'
import WhereBegan from './WhereBegan'
import MissionVisionSection from '@/app/components/about/MissionVisionSection'
import TestimonialsSection from '../home/Testimonialssection'

import about from '@/app/data/about.json'
import FixedBackgroundSection from '../ui/Fixedbackgroundsection'


function AboutPageSections() {

    console.log(about)

    return (
        <div>
            <InnerPagesBanner
                image={about[0]?.aboutBannerImage ?? ""}>
                {about[0]?.aboutBannerTitle}
            </InnerPagesBanner>

            <div className='px-3 sm:px-0 sm: mt-10'>
                <AboutSection
                    image={about[1]?.image ?? ""}
                    badge={about[1]?.badge ?? "About Us"}
                    title={about[1]?.title ?? ""}
                    description={about[1]?.description ?? ""}
                    buttonText={""}
                    profileImage={about[1]?.profileImage ?? ""}
                    name={about[1]?.name ?? ""}
                    role={about[1]?.role ?? ""}
                />

                <div className='sm:mt-12'>
                    <WhereBegan
                        image_left={about[2]?.image_1 ?? ""}
                        image_right={about[2]?.image_2 ?? ""}
                        badge={about[2]?.badge ?? ""}
                        title={about[2]?.title ?? ""}
                        description={about[2]?.description ?? []}
                        image_left_alt={about[2]?.image_left_alt ?? "Children learning together in a classroom"}
                        image_left_title={about[2]?.image_left_title ?? "Learning through opportunity"}
                        image_left_description={about[2]?.image_left_description ?? "Creating safe spaces where young people can learn, build confidence, and imagine what is possible."}
                        image_right_alt={about[2]?.image_right_alt ?? "Children reading and learning outdoors together"}
                        image_right_title={about[2]?.image_right_title ?? "Growing together"}
                        image_right_description={about[2]?.image_right_description ?? "Working alongside communities to turn shared care into lasting change."}
                    />
                </div>


                <div className="mt-28">
                    <FixedBackgroundSection image={about[0]?.aboutBannerImage ?? ""}>
                        <div className=" mx-auto">
                            <StatsSection />
                        </div>
                    </FixedBackgroundSection>
                </div>


                <div className="mt-10">
                    <MissionVisionSection
                        data={about[2]?.missionVision ?? {
                            image: about[2]?.image_2 ?? "",
                            imageAlt: "Community members working together",
                            mission: {
                                badge: "Our mission",
                                title: "Turning care into lasting change.",
                                description: "We partner with communities to make support more accessible, practical, and rooted in dignity."
                            },

                            vision: {
                                badge: "Our vision",
                                title: "Stronger communities, together.",
                                description: "We imagine a future where every person has the support, opportunity, and confidence to shape a better life for themselves and their community."
                            }
                        }}
                    />
                </div>

            </div>

        </div>
    )
}

export default AboutPageSections
