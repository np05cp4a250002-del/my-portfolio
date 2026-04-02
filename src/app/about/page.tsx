import { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
    FiTarget,
    FiHeart,
    FiBookOpen,
    FiActivity,
    FiUsers,
    FiStar,
} from "react-icons/fi";

export const metadata: Metadata = {
    title: "About",
    description:
        "Learn about Pramesh Bhandari — a young finance professional, leader, and entrepreneur from Eastern Nepal.",
};

const values = [
    {
        icon: FiTarget,
        title: "Strategic Vision",
        desc: "Every decision is guided by long-term thinking, from business ventures to personal development.",
    },
    {
        icon: FiHeart,
        title: "Compassionate Leadership",
        desc: "Serving communities through Leo Club, orphanage visits, plantation drives, and healthcare initiatives.",
    },
    {
        icon: FiBookOpen,
        title: "Continuous Learning",
        desc: "Pursuing BSc (Hons) Computing while exploring finance, nutrition science, and spiritual philosophy.",
    },
    {
        icon: FiActivity,
        title: "Discipline & Fitness",
        desc: "3+ years of dedicated gym training with Precision Nutrition certification. The body mirrors the mind.",
    },
    {
        icon: FiUsers,
        title: "Community Impact",
        desc: "Treasurer and active member of Leo Club — driving social initiatives across Eastern Nepal.",
    },
    {
        icon: FiStar,
        title: "Spiritual Grounding",
        desc: "Rooted in Hindu philosophy — finding balance between ambition and inner peace.",
    },
];

export default function AboutPage() {
    return (
        <div className="page-transition pt-28">
            {/* Header */}
            <section className="container-custom py-16">
                <SectionHeading
                    title="About Me"
                    subtitle="A multidimensional journey driven by purpose, discipline, and the relentless pursuit of meaningful impact."
                />
            </section>

            {/* Biography */}
            <section className="container-custom pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
                    {/* Portrait */}
                    <ScrollReveal className="lg:col-span-2">
                        <div className="relative">
                            <div className="aspect-[3/4] border border-beige/50 overflow-hidden">
                                <img
                                    src="/About.jpg"
                                    alt="Pramesh Bhandari"
                                    className="w-full h-full object-cover object-top"
                                />
                            </div>
                            <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-gold/40" />
                            <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-gold/40" />
                        </div>
                    </ScrollReveal>

                    {/* Bio Text */}
                    <div className="lg:col-span-3 space-y-6">
                        <ScrollReveal>
                            <p className="text-lg text-charcoal-light/80 leading-relaxed font-light">
                                I&apos;m <strong className="font-medium text-charcoal">Pramesh Bhandari</strong>, a 21-year-old
                                from Jhapa, Eastern Nepal. My journey sits at the intersection
                                of <span className="text-gold font-medium">finance</span>,{" "}
                                <span className="text-gold font-medium">entrepreneurship</span>
                                , and <span className="text-gold font-medium">healthcare</span>{" "}
                                — three pillars that I believe can transform communities when
                                united with purpose and discipline.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal delay={0.1}>
                            <p className="text-charcoal-light/70 leading-relaxed font-light">
                                Currently pursuing my BSc (Hons) in Computing at Itahari
                                International College, I complement my technical education with
                                deep interests in business administration, investment
                                strategies, and sports management. My academic foundation in
                                management from Damak Multiple Campus laid the groundwork for my
                                strategic thinking.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal delay={0.2}>
                            <div className="border-l-2 border-gold pl-6 py-2">
                                <p className="text-charcoal-light/70 leading-relaxed font-light italic">
                                    &ldquo;I envision a future where business acumen serves
                                    humanitarian goals — where hospitals are built not just for
                                    profit, but for peace, simplicity, and genuine care.&rdquo;
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={0.3}>
                            <p className="text-charcoal-light/70 leading-relaxed font-light">
                                Beyond academics, I&apos;m a Precision Nutrition certified
                                coach with over three years of dedicated fitness training. I
                                believe physical discipline mirrors mental clarity — both
                                essential for any leader. My spiritual grounding in Hindu
                                philosophy keeps me centered amidst ambitious pursuits, while my
                                interest in aviation and cabin crew careers reflects my love for
                                global exposure and cultural connectivity.
                            </p>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Career Vision */}
            <section className="py-20 bg-cream/50">
                <div className="container-custom">
                    <ScrollReveal>
                        <span className="text-xs tracking-[0.3em] uppercase text-gold font-sans font-medium">
                            Vision
                        </span>
                        <h2 className="font-serif text-3xl md:text-4xl mt-3 mb-8 text-charcoal">
                            Career Vision
                        </h2>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <ScrollReveal delay={0.1}>
                            <div className="space-y-4">
                                <h3 className="font-serif text-xl text-charcoal">
                                    Business & Finance
                                </h3>
                                <p className="text-charcoal-light/70 leading-relaxed font-light">
                                    Building expertise in financial analysis, investment
                                    strategies, and business administration. My goal is to become a
                                    strategic business consultant who bridges the gap between
                                    traditional commerce and modern digital economies in Nepal and
                                    beyond.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={0.2}>
                            <div className="space-y-4">
                                <h3 className="font-serif text-xl text-charcoal">
                                    Healthcare Entrepreneurship
                                </h3>
                                <p className="text-charcoal-light/70 leading-relaxed font-light">
                                    Founding <strong className="text-gold font-medium">आयुरक्षा</strong> —
                                    a hospital startup in Damak driven by the motto
                                    &ldquo;Simplicity, Peace, and Care.&rdquo; This project
                                    represents my deepest commitment to serving communities where
                                    quality healthcare meets compassionate service.
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Values Grid */}
            <section className="py-20">
                <div className="container-custom">
                    <ScrollReveal>
                        <span className="text-xs tracking-[0.3em] uppercase text-gold font-sans font-medium">
                            What Drives Me
                        </span>
                        <h2 className="font-serif text-3xl md:text-4xl mt-3 mb-12 text-charcoal">
                            Core Values
                        </h2>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {values.map((value, i) => (
                            <ScrollReveal key={i} delay={i * 0.08}>
                                <div className="p-8 border border-beige/30 hover:border-gold/40 transition-all duration-500 group">
                                    <value.icon className="text-gold text-xl mb-4 group-hover:scale-110 transition-transform duration-300" />
                                    <h3 className="font-serif text-lg text-charcoal mb-2">
                                        {value.title}
                                    </h3>
                                    <p className="text-sm text-charcoal-light/60 font-light leading-relaxed">
                                        {value.desc}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership Journey */}
            <section className="py-20 bg-charcoal">
                <div className="container-custom">
                    <ScrollReveal>
                        <span className="text-xs tracking-[0.3em] uppercase text-gold font-sans font-medium">
                            Service & Leadership
                        </span>
                        <h2 className="font-serif text-3xl md:text-4xl mt-3 mb-8 text-offwhite">
                            Leadership Journey
                        </h2>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Leo Club Member",
                                desc: "Active participation in community service, social events, and youth leadership programs.",
                            },
                            {
                                title: "Club Treasurer",
                                desc: "Managing finances and budgets for club activities, demonstrating fiscal responsibility.",
                            },
                            {
                                title: "Community Service",
                                desc: "Plantation drives, orphanage service, and grassroots initiatives across Eastern Nepal.",
                            },
                        ].map((item, i) => (
                            <ScrollReveal key={i} delay={i * 0.1}>
                                <div className="p-8 border border-offwhite/10 hover:border-gold/40 transition-all duration-500">
                                    <h3 className="font-serif text-lg text-offwhite mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-offwhite/50 font-light leading-relaxed">
                                        {item.desc}
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
