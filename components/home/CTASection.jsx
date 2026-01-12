'use client'

import React from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const CTASection = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">
            <Card className="bg-linear-to-r from-primary to-[#815AC0] p-12 text-center border-0 gap-2">
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">Ready to Grow Your Business?</h2>
                <p className="text-white mb-8 max-w-2xl mx-auto">
                    Join hundreds of shopkeepers using <span className='logo-font '>{process.env.NEXT_PUBLIC_SITE_NAME ?? "site_name"}</span> to reward customers and increase repeat visits.
                </p>
                <Button asChild size="lg" className="h-10 sm:h-12 bg-white text-primary hover:bg-light-shade">
                    <Link href="/signup">Start Free Trial</Link>
                </Button>
            </Card>
        </section>
    )
}

export default CTASection