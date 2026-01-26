

const Hero = () => {
    return (
        <section className="max-w-7xl mx-auto px-6 py-15 sm:py-20 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 sm:mb-6">
                Terms & Conditions
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mx-auto">
                These terms govern your use of <span className='logo-font text-primary'>{process.env.NEXT_PUBLIC_SITE_NAME ?? "Site name"}</span>. Please read them carefully.
            </p>
        </section>
    )
}

export default Hero