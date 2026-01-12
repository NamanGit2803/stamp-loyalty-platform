

const WhoUse = () => {
    return (
        <section className="bg-light-shade/60 py-15 sm:py-20">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-2xl sm:text-4xl font-semibold mb-4 sm:mb-6 text-primary">
                    Who Uses <span className='logo-font'>{process.env.NEXT_PUBLIC_SITE_NAME ?? "site_name"}</span>?
                </h2>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                    From cafés and salons to retail stores and service providers,
                    <span className='logo-font'>{process.env.NEXT_PUBLIC_SITE_NAME ?? "site_name"}</span> is trusted by businesses that care about building lasting
                    customer relationships.
                </p>
            </div>
        </section>
    )
}

export default WhoUse