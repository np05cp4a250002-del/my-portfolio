import { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TimelineItem from "@/components/ui/TimelineItem";
import Button from "@/components/ui/Button";
import { FiDownload } from "react-icons/fi";

type TimelineEntry = { year: string; title: string; subtitle: string; description: string; };
type SkillGroup = { category: string; items: string; };

export default function ResumeContent({ 
    education, 
    experience, 
    skills,
    resumePdfUrl
}: { 
    education: TimelineEntry[], 
    experience: TimelineEntry[], 
    skills: SkillGroup[],
    resumePdfUrl: string
}) {
    return (
        <div className="page-transition pt-28">
            <section className="container-custom py-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <SectionHeading
                        title="Resume"
                        subtitle="A structured view of my education, experience, and competencies."
                    />
                    <ScrollReveal>
                        <Button href={resumePdfUrl || "/resume.pdf"} variant="primary" size="md">
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
                                    {(group.items || "").split(",").map((skill) => (
                                        <li
                                            key={skill.trim()}
                                            className="text-sm text-charcoal-light/70 font-light flex items-center gap-2"
                                        >
                                            <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                                            {skill.trim()}
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
