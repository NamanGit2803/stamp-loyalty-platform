import {
    Store,
    Repeat,
    Smartphone,
    BarChart3,
    ShieldCheck
} from "lucide-react"

const benefits = [
    {
        title: "Increase Repeat Customers",
        description:
            "Turn one-time visitors into loyal customers with a simple digital stamp system that encourages repeat visits.",
        icon: Repeat,
    },
    {
        title: "No App for Customers",
        description:
            "Customers don’t need to install anything. They simply scan your QR and upload their payment screenshot.",
        icon: Smartphone,
    },
    {
        title: "Built for Every Kind of Shop",
        description:
            "From restaurants and cafés to salons, grocery stores, and retail shops, Stampi works seamlessly without hardware or complicated setup.",
        icon: Store,
    },
    {
        title: "Clear Business Insights",
        description:
            "Easily manage customers and rewards, track monthly sales numbers, and understand customer activity — all from one simple dashboard.",
        icon: BarChart3,
    },
    {
        title: "Secure & Reliable",
        description:
            "Payment verification and stamp tracking are handled securely, so you can focus on running your business.",
        icon: ShieldCheck,
    },
]

const BenefitsSection = () => {
    return (
        <section className="py-15 overflow-hidden bg-custom-gradient">

            <div className="max-w-5xl mx-auto px-6">

                {/* Section header */}
                <div className="text-center mb-16">
                    <div className="w-14 h-14 mx-auto mb-6 
                                    flex items-center justify-center 
                                    rounded-xl 
                                    bg-primary/10 
                                    text-primary 
                                    shadow-inner">
                        <Store size={28} strokeWidth={1.8} />
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
                        Built for Local Businesses
                    </h2>

                    <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
                        <span className='logo-font text-primary'>{process.env.NEXT_PUBLIC_SITE_NAME ?? "Site name"}</span> is designed to help local businesses build customer loyalty
                        in a simple, practical, and stress-free way.
                    </p>
                </div>

                {/* Benefits list */}
                <div className="space-y-12">
                    {benefits.map((benefit) => {
                        const Icon = benefit.icon
                        return (
                            <div
                                key={benefit.title}
                                className="grid gap-6 md:grid-cols-[80px_1fr] items-start"
                            >
                                {/* Left visual */}
                                <div className="w-16 h-16 
                                                flex items-center justify-center 
                                                rounded-2xl 
                                                bg-primary/10 
                                                text-primary 
                                                shadow-inner
                                                mx-auto md:mx-0">
                                    <Icon size={28} strokeWidth={1.8} />
                                </div>

                                {/* Right content */}
                                <div className="text-center md:text-left">
                                    <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </section>
    )
}

export default BenefitsSection
