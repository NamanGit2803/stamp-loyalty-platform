import { Card } from "@/components/ui/card"
import {
    Stamp,
    ScanLine,
    Gift,
    BarChart3,
    Smartphone,
    Rocket
} from "lucide-react"

const features = [
    {
        title: "Digital Stamp Cards",
        description: "Replace paper stamp cards with a simple digital system customers love.",
        icon: Stamp,
    },
    {
        title: "UPI Payment Verification",
        description: "Automatically verify payments via UPI screenshots or transaction data.",
        icon: ScanLine,
    },
    {
        title: "Rewards & Redemptions",
        description: "Create rewards that motivate customers to come back again and again.",
        icon: Gift,
    },
    {
        title: "Customer Insights",
        description: "See repeat visits, rewards redeemed, and customer engagement in one dashboard.",
        icon: BarChart3,
    },
    {
        title: "No App for Customers",
        description: "Customers don’t need to install anything — works directly with QR & web.",
        icon: Smartphone,
    },
    {
        title: "Easy Setup",
        description: "Get started in minutes. No hardware, no training, no complexity.",
        icon: Rocket,
    },
]

const CoreFeature = () => {
    return (
        <section className="py-15 bg-background">
            <div className="max-w-7xl mx-auto px-6">

                {/* Section Heading */}
                <div className="text-center max-w-3xl mx-auto mb-11  sm:mb-16">
                    <h2 className="text-2xl sm:text-4xl font-bold text-primary mb-4">
                        Core Features That Drive Loyalty
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-lg">
                        Everything you need to turn first-time customers into regulars —
                        without complexity.
                    </p>
                </div>

                {/* Feature Grid */}
                <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
                    {features.map((feature, index) => (
                        <Card key={index}
                            className="
                p-6 sm:p-8 
                border border-border/50 
                rounded-2xl 
                bg-white/90 
                backdrop-blur-sm
                shadow-sm 
                hover:shadow-xl 
                hover:-translate-y-1
                transition-all
            "
                        >
                            {/* Icon */}
                            <div
                                className="
                    w-14 h-14 
                    flex items-center justify-center 
                    rounded-xl 
                    bg-secondary/10
                    text-primary 
                    mb-4
                    shadow-inner
                "
                            >
                                <feature.icon size={28} strokeWidth={1.8} />
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-semibold text-primary mb-2">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </Card>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default CoreFeature
