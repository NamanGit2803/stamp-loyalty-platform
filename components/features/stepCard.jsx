import { Card } from "@/components/ui/card"

const StepCard = ({ step, index }) => {
    const Icon = step.icon
    return (
        <Card
            className="
                p-8 
                text-center
                border border-border/50
                rounded-2xl
                bg-white/90
                backdrop-blur-sm
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
            "
        >
            {/* Icon */}
            <div
                className="
                    w-14 h-14
                    mx-auto mb-4
                    flex items-center justify-center
                    rounded-xl
                    bg-primary/10
                    text-primary
                    shadow-inner
                "
            >
                <Icon size={28} strokeWidth={1.8} />
            </div>

            {/* Step number */}
            <div className="text-sm font-medium text-muted-foreground mb-2">
                Step {index + 1}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-primary mb-2">
                {step.title}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
            </p>
        </Card>
    )
}

export default StepCard