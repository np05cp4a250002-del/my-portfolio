import { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TimelineItem from "@/components/ui/TimelineItem";
import Button from "@/components/ui/Button";
import { FiDownload } from "react-icons/fi";

export const metadata: Metadata = {
    title: "Resume",
    description:
        "Pramesh Bhandari's professional resume — education, experience, certifications, and skills in a structured timeline format.",
};

const education = [
    {
        year: "2024 – Present",
        title: "BSc (Hons) Computing",
        subtitle: "Itahari International College",
        description:
            "Pursuing a comprehensive degree in information technology, covering software development, database management, networking, and modern computing paradigms.",
    },
    {
        year: "2020 – 2022",
        title: "+2 in Management",
        subtitle: "Damak Multiple Campus",
        description:
            "Completed higher secondary education with a focus on business administration, economics, and management principles. Built the foundation for strategic and financial thinking.",
    },
];

const experience = [
    {
        year: "2023 – Present",
        title: "Leo Club — Treasurer",
        subtitle: "Lions International Youth Organization",
        description:
            "Managing club finances, budgeting for events and initiatives, and ensuring fiscal transparency. Leading community service projects including plantation drives and orphanage visits.",
    },
    {
        year: "2022 – Present",
        title: "Nutrition Coach",
        subtitle: "Precision Nutrition Certified",
        description:
            "Providing evidence-based dietary guidance and fitness coaching. Combining 3+ years of personal training experience with certified nutrition science methodologies.",
    },
    {
        year: "2023 – Present",
        title: "आयुरक्षा Hospital Project",
        subtitle: "Founder & Lead Planner",
        description:
            "Developing the business plan and conceptual framework for a hospital startup in Damak, Nepal guided by the motto 'Simplicity, Peace, and Care.'",
    },
];

const skills = [
    { category: "Business & Finance", items: ["Financial Analysis", "Investment Research", "Business Strategy", "Budget Management"] },
    { category: "Technology", items: ["Web Development", "Database (PostgreSQL)", "JavaScript / TypeScript", "HTML / CSS"] },
    { category: "Health & Wellness", items: ["Precision Nutrition (Certified)", "Fitness Training (3+ yrs)", "Diet Planning", "Wellness Coaching"] },
    { category: "Leadership", items: ["Team Management", "Event Organization", "Public Speaking", "Community Service"] },
];

export default function ResumePage() {
    return (
        <div className="page-transition pt-28">
            <section className="container-custom py-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <SectionHeading
                        title="Resume"
                        subtitle="A structured view of my education, experience, and competencies."
                    />
                    <ScrollReveal>
                        <Button href="/resume.pdf" variant="primary" size="md">
                            <FiDownload className="mr-2" /> Download PDF
                        </Button>
                    </ScrollReveal>
                </div>
            </section>

            {/* Education Timeline */}
            <section className="container-custom pb-16">
                <ScrollReveal>
                    <span className="text-xs tracking-[0.3em] uppercase text-gold font-sans font-medium">
                        Academic Background
                    </span>
                    <h3 className="font-serif text-2xl mt-2 mb-8 text-charcoal">
                        Education
                    </h3>
                </ScrollReveal>

                <div className="max-w-2xl">
                    {education.map((item, i) => (
                        <TimelineItem key={i} {...item} index={i} />
                    ))}
                </div>
            </section>

            {/* Experience Timeline */}
            <section className="py-16 bg-cream/50">
                <div className="container-custom">
                    <ScrollReveal>
                        <span className="text-xs tracking-[0.3em] uppercase text-gold font-sans font-medium">
                            Professional Journey
                        </span>
                        <h3 className="font-serif text-2xl mt-2 mb-8 text-charcoal">
                            Experience & Ventures
                        </h3>
                    </ScrollReveal>

                    <div className="max-w-2xl">
                        {experience.map((item, i) => (
                            <TimelineItem key={i} {...item} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills */}
            <section className="container-custom py-16">
                <ScrollReveal>
                    <span className="text-xs tracking-[0.3em] uppercase text-gold font-sans font-medium">
                        Competencies
                    </span>
                    <h3 className="font-serif text-2xl mt-2 mb-10 text-charcoal">
                        Skills & Expertise
                    </h3>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {skills.map((group, i) => (
                        <ScrollReveal key={i} delay={i * 0.1}>
                            <div className="border border-beige/30 p-6">
                                <h4 className="font-serif text-sm text-gold mb-4 tracking-wide">
                                    {group.category}
                                </h4>
                                <ul className="space-y-2.5">
                                    {group.items.map((skill) => (
                                        <li
                                            key={skill}
                                            className="text-sm text-charcoal-light/70 font-light flex items-center gap-2"
                                        >
                                            <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* Certifications */}
            <section className="py-16 bg-charcoal">
                <div className="container-custom">
                    <ScrollReveal>
                        <span className="text-xs tracking-[0.3em] uppercase text-gold font-sans font-medium">
                            Credentials
                        </span>
                        <h3 className="font-serif text-2xl mt-2 mb-8 text-offwhite">
                            Certifications & Interests
                        </h3>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Precision Nutrition — Level 1",
                                desc: "Certified nutrition coach with expertise in evidence-based dietary guidance.",
                            },
                            {
                                title: "Aviation & Cabin Crew",
                                desc: "Active interest in aviation careers and cabin crew training programs.",
                            },
                            {
                                title: "Sports Management",
                                desc: "Exploring the business side of sports — from event management to athlete development.",
                            },
                        ].map((cert, i) => (
                            <ScrollReveal key={i} delay={i * 0.1}>
                                <div className="border border-offwhite/10 p-6 hover:border-gold/40 transition-colors duration-500">
                                    <h4 className="font-serif text-lg text-offwhite mb-2">
                                        {cert.title}
                                    </h4>
                                    <p className="text-sm text-offwhite/50 font-light leading-relaxed">
                                        {cert.desc}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
