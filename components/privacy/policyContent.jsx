

const PolicyContent = () => {
    return (
        <section className="bg-light-shade/80 py-15 sm:py-20">
            <div className="max-w-4xl mx-auto px-6 space-y-10 text-dark-text leading-relaxed">

                {/* Intro */}
                <p>
                    This Privacy Policy describes how <span className='logo-font text-primary'>{process.env.NEXT_PUBLIC_SITE_NAME ?? "Site name"}</span> (“we”,
                    “our”, or “us”) collects, uses, and shares information when you use
                    our website, dashboard, and loyalty services (collectively, the
                    “Services”).
                </p>

                {/* 1 */}
                <div>
                    <h2 className="text-xl font-semibold text-primary mb-2">
                        1. Information We Collect
                    </h2>
                    <p>
                        We collect information only when it is necessary to provide and
                        improve our Services.
                    </p>

                    <ul className="list-disc pl-6 mt-3 space-y-2">
                        <li>
                            <strong>Account Information:</strong> Name, email address,
                            business name, and contact details provided when you create an
                            account.
                        </li>
                        <li>
                            <strong>Usage Information:</strong> Information about how you
                            use the platform, such as features accessed and actions taken.
                        </li>
                        <li>
                            <strong>Transaction Data:</strong> Limited payment-related
                            information required to verify loyalty actions (such as UPI
                            transaction references or screenshots submitted by users).
                        </li>
                    </ul>
                </div>

                {/* 2 */}
                <div>
                    <h2 className="text-xl font-semibold text-primary mb-2">
                        2. Customer Data
                    </h2>
                    <p>
                        When businesses use <span className='logo-font text-primary'>{process.env.NEXT_PUBLIC_SITE_NAME ?? "Site name"}</span>, they may collect basic customer
                        information such as phone numbers or visit counts for loyalty
                        purposes.
                    </p>
                    <p className="mt-2">
                        This data is collected on behalf of the business. We do not use
                        customer data for advertising or sell it to third parties.
                    </p>
                </div>

                {/* 3 */}
                <div>
                    <h2 className="text-xl font-semibold text-primary mb-2">
                        3. How We Use Information
                    </h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>To provide and operate the Services</li>
                        <li>To improve product functionality and user experience</li>
                        <li>To communicate with you about updates or support</li>
                        <li>To maintain platform security and prevent misuse</li>
                    </ul>
                </div>

                {/* 4 */}
                <div>
                    <h2 className="text-xl font-semibold text-primary mb-2">
                        4. Data Sharing
                    </h2>
                    <p>
                        We do not sell or rent your personal data. We may share information
                        only in the following cases:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>With service providers who help operate our platform</li>
                        <li>If required by law or legal process</li>
                        <li>To protect the rights and safety of <span className='logo-font text-primary'>{process.env.NEXT_PUBLIC_SITE_NAME ?? "Site name"}</span> and its users</li>
                    </ul>
                </div>

                {/* 5 */}
                <div>
                    <h2 className="text-xl font-semibold text-primary mb-2">
                        5. Data Security
                    </h2>
                    <p>
                        We take reasonable measures to protect your information from
                        unauthorized access, loss, or misuse. However, no system is
                        completely secure, and we cannot guarantee absolute security.
                    </p>
                </div>

                {/* 6 */}
                <div>
                    <h2 className="text-xl font-semibold text-primary mb-2">
                        6. Data Retention
                    </h2>
                    <p>
                        We retain information only as long as necessary to provide our
                        Services and comply with legal obligations. You may request
                        deletion of your account data at any time.
                    </p>
                </div>

                {/* 7 */}
                <div>
                    <h2 className="text-xl font-semibold text-primary mb-2">
                        7. Your Rights
                    </h2>
                    <p>
                        You have the right to access, update, or delete your personal
                        information. You may also contact us if you have questions about
                        how your data is handled.
                    </p>
                </div>

                {/* 8 */}
                <div>
                    <h2 className="text-xl font-semibold text-primary mb-2">
                        8. Changes to This Policy
                    </h2>
                    <p>
                        We may update this Privacy Policy from time to time. Any changes
                        will be posted on this page with an updated effective date.
                    </p>
                </div>

                {/* 9 */}
                <div>
                    <h2 className="text-xl font-semibold text-primary mb-2">
                        9. Contact Us
                    </h2>
                    <p>
                        If you have any questions about this Privacy Policy or our data
                        practices, please contact us at:
                    </p>
                    <p className="mt-2 font-medium">
                        Email: <a
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

export default PolicyContent