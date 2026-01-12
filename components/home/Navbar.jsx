'use client'

import React from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Stamp } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-40 bg-white border-b border-blue-100">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 select-none">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-lg leading-none logo-font">
                            S
                        </span>
                    </div>

                    <span className="text-xl logo-font font-semibold text-secondary">
                        {process.env.NEXT_PUBLIC_SITE_NAME ?? "Stampi"}
                    </span>
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