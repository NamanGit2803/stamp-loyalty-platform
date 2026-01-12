

const Mission = () => {

    const data = [
        {
            title: 'Simple for Everyone',
            text: 'No learning curve, no complex setup. If you can use WhatsApp or UPI, you can use Stampi.',
        },
        {
            title: 'Built for Local Businesses',
            text: 'Designed specifically for cafés, salons, grocery stores, and small retailers.',
        },
        {
            title: 'Real Business Impact',
            text: 'Every feature is focused on increasing repeat customers and long-term growth.',
        },
    ]

    return (
        <section className="max-w-7xl mx-auto px-6 py-15">
            <h2 className="text-2xl sm:text-4xl font-semibold text-center text-secondary mb-10  sm:mb-14">
                What We Believe In
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
                {data.map((data, index) => (
                    <div key={index} className="border border-border/50 shadow-sm rounded-xl p-6  hover:shadow-xl bg-light-shade/50 backdrop-blur-sm transition">
                        <h3 className="font-semibold text-lg mb-3 text-primary">{data.title}</h3>
                        <p className="text-dark-text text-sm leading-relaxed">
                            {data.text}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Mission
