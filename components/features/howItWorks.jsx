import { QrCode, Stamp, Gift } from "lucide-react"
import StepCard from "./stepCard"

const steps = [
    {
        title: "Customer Pays",
        description: "Customer pays via UPI, scans your QR code, and uploads the payment screenshot.",
        icon: QrCode,
    },
    {
        title: "Stamp Added",
        description: "Stampi verifies the payment screenshot and adds a digital stamp automatically.",
        icon: Stamp,
    },
    {
        title: "Reward Earned",
        description: "Customer redeems rewards and happily comes back again.",
        icon: Gift,
    },
]

const HowItWorks = () => {
    return (
        <section className="py-15 bg-light-shade">
            <div className="max-w-7xl mx-auto px-6">

                {/* Heading */}
                <div className="text-center max-w-2xl mx-auto mb-11 sm:mb-16">
                    <h2 className="text-2xl sm:text-4xl font-bold text-primary mb-4">
                        How <span className="logo-font">Stampi</span> Works
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-lg">
                        A simple 3-step flow that turns payments into repeat customers.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
                    {steps.map((step, index) => (
                        <StepCard key={step.title} step={step} index={index} />
                    ))}
                </div>

            </div>
        </section>
    )
}

export default HowItWorks
