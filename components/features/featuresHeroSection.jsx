import { Sparkles } from 'lucide-react'

const FeaturesHeroSection = () => {
    return (
        <section className="bg-background-secondary">

            <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 text-center">

                {/* Icon badge */}
                <div className="inline-flex items-center justify-center w-12 h-12 mb-6 
                                rounded-full bg-primary/10 text-primary">
                    <Sparkles className="w-6 h-6" />
                </div>

                {/* Heading */}
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold 
                               text-primary leading-tight mb-6">
                    Everything You Need to Build
                    <span className="block text-secondary">
                        Customer Loyalty
                    </span>
                </h1>

                {/* Description */}
                <p className="text-base sm:text-lg text-dark-text 
                              max-w-3xl mx-auto leading-relaxed">
                    <span className='logo-font text-primary'>{process.env.NEXT_PUBLIC_SITE_NAME ?? "Site name"}</span> helps local businesses reward customers, increase repeat visits,
                    and grow — without complicated apps or hardware.
                </p>

            </div>
        </section>
    )
}

export default FeaturesHeroSection
