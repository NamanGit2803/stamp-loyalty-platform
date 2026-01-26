

const TermsContent = () => {
    return (
        <section className="bg-light-shade/80 py-15 sm:py-20">
            <div className="max-w-4xl mx-auto px-6 space-y-10 text-dark-text leading-relaxed">

                {/* Intro */}
                <p>
                    These Terms and Conditions (“Terms”) apply to your access and use of
                    <span className='logo-font text-primary'>{process.env.NEXT_PUBLIC_SITE_NAME ?? "Stampi"}</span>, including our website, dashboard, and
                    loyalty services (collectively, the “Services”). By using the
                    Services, you agree to be bound by these Terms.
                </p>

                {/* 1 */}
                <div>
                    <h2 className="text-xl font-semibold text-primary mb-2">
                        1. Eligibility
                    </h2>
                    <p>
                        You must be at least 18 years old and capable of entering into a
                        legally binding agreement to use <span className='logo-font text-primary'>{process.env.NEXT_PUBLIC_SITE_NAME ?? "Stampi"}</span>. By using the
                        Services, you confirm that you meet this requirement.
                    </p>
                </div>

                {/* 2 */}
                <div>
                    <h2 className="text-xl font-semibold text-primary mb-2">
                        2. Account Registration
                    </h2>
                    <p>
                        To access certain features, you must create an account. You agree
                        to provide accurate information and keep your account credentials
                        secure. You are responsible for all activity that occurs under
                        your account.
                    </p>
                </div>

                {/* 3 */}
                <div>
                    <h2 className="text-xl font-semibold text-primary mb-2">
                        3. Use of the Services
                    </h2>
                    <p>
                        <span className='logo-font text-primary'>{process.env.NEXT_PUBLIC_SITE_NAME ?? "Stampi"}</span> provides digital loyalty tools for businesses. You
                        agree to use the Services only for lawful business purposes and
                        not to misuse, copy, or attempt to disrupt the platform.
                    </p>
                </div>

                {/* 4 */}
                <div>
                    <h2 className="text-xl font-semibold text-primary mb-2">
                        4. Customer Data
                    </h2>
                    <p>
                        Businesses using <span className='logo-font text-primary'>{process.env.NEXT_PUBLIC_SITE_NAME ?? "Stampi"}</span> are responsible for any customer data
                        they collect through the platform. You confirm that you have the
                        right to collect and use such data for loyalty purposes.
                    </p>
                </div>

                {/* 5 */}
                <div>
                    <h2 className="text-xl font-semibold text-primary mb-2">
                        5. Payments & Subscriptions
                    </h2>
                    <p>
                        Some features of <span className='logo-font text-primary'>{process.env.NEXT_PUBLIC_SITE_NAME ?? "Stampi"}</span> may require payment. Pricing, billing
                        cycles, and subscription details are displayed at the time of
                        purchase. Fees are non-refundable unless otherwise stated.
                    </p>
                </div>

                {/* 6 */}
                <div>
                    <h2 className="text-xl font-semibold text-primary mb-2">
                        6. Service Availability
                    </h2>
                    <p>
                        We strive to keep <span className='logo-font text-primary'>{process.env.NEXT_PUBLIC_SITE_NAME ?? "Stampi"}</span> available at all times but do not
                        guarantee uninterrupted access. We may modify or suspend the
                        Services temporarily for maintenance or improvements.
                    </p>
                </div>

                {/* 7 */}
                <div>
                    <h2 className="text-xl font-semibold text-primary mb-2">
                        7. Intellectual Property
                    </h2>
                    <p>
                        All content, software, logos, and designs related to <span className='logo-font text-primary'>{process.env.NEXT_PUBLIC_SITE_NAME ?? "Stampi"}</span>
                        are owned by us or our licensors. You may not copy, modify, or
                        distribute any part of the Services without permission.
                    </p>
                </div>

                {/* 8 */}
                <div>
                    <h2 className="text-xl font-semibold text-primary mb-2">
                        8. Termination
                    </h2>
                    <p>
                        We may suspend or terminate your account if you violate these
                        Terms or misuse the Services. You may stop using the Services at
                        any time.
                    </p>
                </div>

                {/* 9 */}
                <div>
                    <h2 className="text-xl font-semibold text-primary mb-2">
                        9. Limitation of Liability
                    </h2>
                    <p>
                        To the extent permitted by law, <span className='logo-font text-primary'>{process.env.NEXT_PUBLIC_SITE_NAME ?? "Stampi"}</span> shall not be liable
                        for any indirect, incidental, or consequential damages arising
                        from your use of the Services.
                    </p>
                </div>

                {/* 10 */}
                <div>
                    <h2 className="text-xl font-semibold text-primary mb-2">
                        10. Changes to These Terms
                    </h2>
                    <p>
                        We may update these Terms from time to time. Continued use of the
                        Services after changes means you accept the updated Terms.
                    </p>
                </div>

                {/* 11 */}
                <div>
                    <h2 className="text-xl font-semibold text-primary mb-2">
                        11. Contact Us
                    </h2>
                    <p>
                        If you have any questions about these Terms, please contact us at:
                    </p>
                    <p className="mt-2 font-medium">
                        Email:  <a
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=support@stampi.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                        >
                            support@stampi.in
                        </a>
                    </p>
                    <p className="mt-2 font-medium">
                        Contact Number: <a
                            href="tel:+916350250055"
                            className="text-primary hover:underline"
                        >
                            +91 6350250055
                        </a>
                    </p>
                </div>

                {/* Footer note */}
                <p className="text-sm text-muted-foreground pt-6">
                    Effective Date: {new Date().getFullYear()}
                </p>

            </div>
        </section>
    )
}

export default TermsContent