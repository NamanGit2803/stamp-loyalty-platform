
const Hero = () => {
    return (
        <section className="max-w-7xl mx-auto px-6 py-15 sm:py-20 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 sm:mb-6">
                About <span className='logo-font'>{process.env.NEXT_PUBLIC_SITE_NAME ?? "site_name"}</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
                <span className='logo-font text-primary'>{process.env.NEXT_PUBLIC_SITE_NAME ?? "site_name"}</span> is built to help local businesses turn everyday customers
                into loyal regulars — without complicated apps or systems.
            </p>
        </section>
    )
}

export default Hero