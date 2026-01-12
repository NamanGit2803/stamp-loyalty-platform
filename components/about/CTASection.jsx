import { Button } from "@/components/ui/button"
import Link from "next/link"

const CTASection = () => {
    return (
        <section className="py-10">
            <div className="max-w-4xl mx-auto px-6">
                <div className="bg-linear-to-r from-primary to-[#815AC0] rounded-2xl text-white text-center py-10 sm:py-14 px-6">
                    <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
                        Start Building Customer Loyalty
                    </h2>
                    <p className="mb-8 text-base sm:text-lg text-white/90">
                        Join shopkeepers using <span className='logo-font'>{process.env.NEXT_PUBLIC_SITE_NAME ?? "site_name"}</span> to grow repeat customers.
                    </p>
                    <Button asChild size="lg" className="bg-white text-primary hover:bg-light-shade">
                        <Link href="/signup">Start Free Trial</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default CTASection