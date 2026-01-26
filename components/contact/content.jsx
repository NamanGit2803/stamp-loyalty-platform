import React from 'react'
import Image from "next/image"

const Content = () => {
    return (
        <section className="bg-light-shade/60 py-5">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10  sm:gap-16 items-center">

                {/* LEFT: INFO */}
                <div className="max-w-xl">
                    <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-primary">
                        Let’s Talk
                    </h2>

                    <p className="text-base text-muted-foreground mb-6 sm:mb-8 md:mb-10 leading-relaxed">
                        Whether you’re a shopkeeper exploring loyalty programs or
                        already using{" "}
                        <span className="logo-font text-primary">
                            {process.env.NEXT_PUBLIC_SITE_NAME ?? "Stampi"}
                        </span>
                        , feel free to reach out.
                        We usually respond within 24 hours.
                    </p>

                    <div className="space-y-5 text-sm">

                        <div>
                            <p className="font-medium text-gray-800">Email</p>
                            <a
                                href="https://mail.google.com/mail/?view=cm&fs=1&to=support@stampi.in"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-secondary hover:underline"
                            >
                                support@stampi.in
                            </a>
                        </div>

                        <div>
                            <p className="font-medium text-gray-800">Contact Number</p>
                            <a
                                href="tel:+916350250055"
                                className="text-secondary hover:underline"
                            >
                                +91 6350250055
                            </a>
                        </div>

                        <div>
                            <p className="font-medium text-gray-800">Business Hours</p>
                            <p className="text-gray-600">
                                Mon – Sat, 10:00 AM – 7:00 PM
                            </p>
                        </div>

                        <div>
                            <p className="font-medium text-gray-800">Location</p>
                            <p className="text-gray-600">
                                Jaipur, Rajasthan, India
                            </p>
                        </div>

                    </div>
                </div>

                {/* RIGHT: LARGE ILLUSTRATION */}
                <div className="relative w-full h-[360px] sm:h-[420px] md:h-[400px] lg:h-[550px]">
                    <Image
                        src="/contact2.png"
                        alt="Contact Stampi"
                        fill
                        priority
                        className="object-contain scale-110 md:scale-120"
                    />
                </div>

            </div>
        </section>
    )
}

export default Content
