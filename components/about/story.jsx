import { Card } from "@/components/ui/card"
import { FileX, Repeat, Zap } from "lucide-react"

const OurStory = () => {
    return (
        <section className="bg-light-shade/60 py-15">
            <div className="max-w-5xl mx-auto px-6">
                <Card className="border-0 shadow-sm p-8 md:p-12 rounded-2xl">

                    {/* Illustration */}
                    <div className="flex justify-center mb-6">
                        <img
                            src="/story.svg"
                            alt="Digital loyalty illustration"
                            className="w-44 md:w-56"
                        />
                    </div>

                    <h2 className="text-2xl font-semibold mb-2 sm:mb-6 text-primary text-center">
                        Our Story
                    </h2>

                    <div className="space-y-6 text-dark-text leading-relaxed">

                        {/* Problem */}
                        <div className="flex gap-4 items-start">
                            <FileX className="text-primary mt-1 shrink-0" />
                            <p>
                                We started {" "}
                                after seeing how difficult it was for small shopkeepers
                                to retain customers in a fast-moving, digital world.
                                Traditional paper stamp cards are easy to lose,
                                require constant physical effort, and become messy
                                and hard to manage over time.
                            </p>
                        </div>

                        {/* Engagement */}
                        <div className="flex gap-4 items-start">
                            <Repeat className="text-primary mt-1 shrink-0" />
                            <p>
                                A well-designed stamp system encourages customers
                                to come back again and again. It builds a simple
                                reward habit, creates trust, and turns one-time
                                visitors into loyal regulars.
                            </p>
                        </div>

                        {/* Solution */}
                        <div className="flex gap-4 items-start">
                            <Zap className="text-primary mt-1 shrink-0" />
                            <p>
                                That’s why we built a smarter, digital stamp solution —
                                easy for shopkeepers to manage and effortless for
                                customers to use. Our goal is to reduce manual work,
                                remove complexity, and help small businesses grow
                                without expensive hardware or complicated technology.
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}

export default OurStory
