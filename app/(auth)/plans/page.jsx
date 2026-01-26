import Illustration from "@/components/Illustration"
import PlanCard from "@/components/plans/PlanCard"

export default function PlansPage() {
  return (
    <div className="min-h-screen w-full flex bg-custom-gradient">

      {/* LEFT ILLUSTRATION SECTION */}
      <Illustration imageSrc={'/plan1.png'} title={'Simple Pricing. Powerful Features.'} />

      {/* RIGHT SIGNUP CARD */}
      <PlanCard />

    </div>
  )
}
