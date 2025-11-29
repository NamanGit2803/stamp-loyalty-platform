"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navbar from "@/components/home/Navbar"
import Hero from "@/components/home/Hero"
import FeatureSection from "../components/home/FeatureSection"
import Footer from "../components/home/Footer"
import CTASection from "../components/home/CTASection"

export default function HomePage() {
  

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar/>

      {/* Hero Section */}
      <Hero/>

      {/* Features Section */}
      <FeatureSection/>

      {/* CTA Section */}
      <CTASection/>

      {/* footer  */}
      <Footer/>

      
    </div>
  )
}
