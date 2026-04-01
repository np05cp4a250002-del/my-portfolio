import ScrollReveal from "./ScrollReveal";

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    centered?: boolean;
    className?: string;
}

export default function SectionHeading({
    title,
    subtitle,
    centered = false,
    className = "",
}: SectionHeadingProps) {
    return (
        <ScrollReveal className={className}>
            <div className={centered ? "text-center" : ""}>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal font-semibold tracking-tight">
                    {title}
                </h2>
                <div
                    className={`w-16 h-[2px] bg-gold mt-4 mb-4 ${centered ? "mx-auto" : ""
                        }`}
                />
                {subtitle && (
                    <p className="text-charcoal-light/70 text-lg max-w-2xl leading-relaxed font-light">
                        {subtitle}
                    </p>
                )}
            </div>
        </ScrollReveal>
    );
}
