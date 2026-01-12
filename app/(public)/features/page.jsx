import CoreFeature from "@/components/features/coreFeature"
import HowItWorks from "@/components/features/howItWorks"
import CTASection from "@/components/home/CTASection"
import FeaturesHeroSection from "@/components/features/featuresHeroSection"
import BenefitsSection from "@/components/features/benefitsSection"

export default function FeaturesPage() {
    return (
        <main>

            {/* ---------- HERO ---------- */}
            <FeaturesHeroSection/>

            {/* ---------- CORE FEATURES ---------- */}
            <CoreFeature />

            {/* ---------- HOW IT WORKS ---------- */}
            <HowItWorks />

            {/* ---------- BENEFITS ---------- */}
            <BenefitsSection/>

            {/* ---------- CTA ---------- */}
            <CTASection />

        </main>
    )
}



