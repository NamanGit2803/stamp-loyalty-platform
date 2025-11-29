'use client'

import React from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const CTASection = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
            <Card className="bg-linear-to-r from-blue-600 to-indigo-600 p-12 text-center border-0">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Business?</h2>
                <p className="text-white mb-8 max-w-2xl mx-auto">
                    Join hundreds of shopkeepers who are already growing their customer base with Loyalty Pro
                </p>
                <Button asChild size="lg" className="h-12 bg-white text-blue-600 hover:bg-blue-50">
                    <Link href="/signup">Start Your Free Trial Today</Link>
                </Button>
            </Card>
        </section>
    )
}

export default CTASection