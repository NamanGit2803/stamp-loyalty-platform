import { Button } from "@/components/ui/button"
import Link from "next/link"

const CTASection = () => {
    return (
        <section className="py-10 sm:py-20">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-2 sm:mb-4 text-primary">
                    Want to Get Started Faster?
                </h2>
                <p className="text-muted-foreground mb-5 sm:mb-8">
                    Create your free account and start rewarding customers today.
                </p>
                <Button asChild size="lg">
                    <Link href="/signup">Start Free Trial</Link>
                </Button>
            </div>
        </section>
    )
}

export default CTASection