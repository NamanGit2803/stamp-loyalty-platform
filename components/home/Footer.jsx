'use client'

import React from 'react'
import Link from 'next/link'
import { Separator } from "@/components/ui/separator"

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Stampi"

const footerLinks = {
  product: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/plans" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
}

const Footer = () => {
  return (
    <footer className=" bg-light-shade/50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 pb-8">

        {/* Upper section */}
        <div className="grid md:grid-cols-4 gap-8 pb-16">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 select-none mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg leading-none logo-font">
                  S
                </span>
              </div>

              <span className="text-xl logo-font font-semibold text-secondary">
                {siteName}
              </span>
            </Link>

            <p className="text-sm text-muted-foreground max-w-xs">
              Helping businesses turn customers into regulars.
            </p>
          </div>

          {/* Columns */}
          <FooterColumn title="Product" links={footerLinks.product} />
          <FooterColumn title="Company" links={footerLinks.company} />
          <FooterColumn title="Legal" links={footerLinks.legal} />

        </div>

        <Separator className="my-10 bg-border/55" />

        {/* Bottom */}
        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()}{" "}
          <span className="logo-font text-primary">{siteName}</span>. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer

/* -------- Helper Component (JSX ONLY) -------- */

const FooterColumn = ({ title, links }) => {
  return (
    <div>
      <h4 className="font-semibold text-primary mb-4">{title}</h4>
      <ul className="space-y-2 text-sm">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
