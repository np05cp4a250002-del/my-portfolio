import ScrollReveal from "./ScrollReveal";

interface TimelineItemProps {
    year: string;
    title: string;
    subtitle: string;
    description: string;
    index: number;
}

export default function TimelineItem({
    year,
    title,
    subtitle,
    description,
    index,
}: TimelineItemProps) {
    return (
        <ScrollReveal delay={index * 0.1}>
            <div className="relative pl-8 pb-12 last:pb-0 group">
                {/* Vertical line */}
                <div className="absolute left-0 top-2 bottom-0 w-[1px] bg-beige group-last:hidden" />
                {/* Dot */}
                <div className="absolute left-[-4px] top-2 w-[9px] h-[9px] rounded-full bg-gold border-2 border-offwhite ring-2 ring-gold/30" />

                <span className="text-xs tracking-widest uppercase text-gold font-sans font-medium">
                    {year}
                </span>
                <h3 className="font-serif text-xl mt-1 text-charcoal">{title}</h3>
                <p className="text-sm text-charcoal-light/60 mt-0.5 font-sans">
                    {subtitle}
                </p>
                <p className="text-sm text-charcoal-light/80 mt-3 leading-relaxed font-light font-sans">
                    {description}
                </p>
            </div>
        </ScrollReveal>
    );
}
