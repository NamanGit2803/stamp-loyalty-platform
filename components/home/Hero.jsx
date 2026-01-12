'use client'

import React from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"

const Hero = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 text-center bg-background-secondary rounded-sm">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 leading-tight text-balance">
                Grow Your Business with <span className="text-secondary">Customer Loyalty</span>
            </h1>
            <p className="text-lg text-dark-text mb-8 max-w-2xl mx-auto text-pretty">
                <span className='logo-font text-primary'>{process.env.NEXT_PUBLIC_SITE_NAME ?? "Site name"}</span> helps small shopkeepers build lasting customer relationships through intelligent loyalty programs
                and rewards
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center mb-16">
                <Button asChild size="lg" className="h-12">
                    <Link href="/signup">Start Free Trial</Link>
                </Button>
                <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-12"
                >
                    <Link href="/plans">View Pricing</Link>
                </Button>
            </div>
        </section>
    )
}

export default Hero