'use client'

import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-40 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">

                {/* Logo */}
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

                {/* Desktop actions */}
                <div className="hidden sm:flex gap-4">
                    <Button asChild variant="ghost">
                        <Link href="/login">Sign In</Link>
                    </Button>

                    <Button asChild>
                        <Link href="/signup">Get Started</Link>
                    </Button>
                </div>

                {/* Mobile dropdown */}
                <div className="sm:hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                aria-label="Open menu"
                                className="p-2 rounded-md hover:bg-muted focus:outline-none"
                            >
                                <Menu size={22} />
                            </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuItem asChild>
                                <Link href="/login">
                                    Sign In
                                </Link>
                            </DropdownMenuItem>

                            <Separator />

                            <DropdownMenuItem asChild>
                                <Link href="/signup">
                                    Get Started
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

            </div>
        </nav>
    )
}

export default Navbar
