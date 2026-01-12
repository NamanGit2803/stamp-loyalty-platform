import Hero from "@/components/home/Hero"
import FeatureSection from "../../components/home/FeatureSection"
import CTASection from "../../components/home/CTASection"

export default function HomePage() {
  

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <Hero/>

      {/* Features Section */}
      <FeatureSection/>

      {/* CTA Section */}
      <CTASection/>

    </div>
  )
}
