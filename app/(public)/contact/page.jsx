import ContactHero from "@/components/contact/hero"
import CTASection from "@/components/contact/CTASection"
import Content from "@/components/contact/content"


export default function ContactPage() {
    return (
        <main>

            {/* ---------- HERO ---------- */}
            <ContactHero />

            {/* ---------- CONTENT ---------- */}
            <Content />

            {/* ---------- CTA ---------- */}
            <CTASection />

        </main>
    )
}
