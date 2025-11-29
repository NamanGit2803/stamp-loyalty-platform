'use client'

import React from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-40 bg-white border-b border-blue-100">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                <Link href={'/'} className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                        L
                    </div>
                    <span className="text-xl font-bold text-secondary">Loyalty Pro</span>
                </Link>
                <div className="flex gap-4">
                    <Button asChild variant="ghost">
                        <Link href="/login">Sign In</Link>
                    </Button>
                    <Button asChild >
                        <Link href="/signup">Get Started</Link>
                    </Button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar