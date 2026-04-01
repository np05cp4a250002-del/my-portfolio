import { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
    FiHeart,
    FiTrendingUp,
    FiCpu,
    FiAward,
    FiArrowRight,
} from "react-icons/fi";

export const metadata: Metadata = {
    title: "Projects",
    description:
        "Explore Pramesh Bhandari's projects — from the आयुरक्षा hospital concept to finance research and tech deployments.",
};

const projects = [
    {
        slug: "ayuraksha",
        title: "आयुरक्षा Hospital",
        category: "Healthcare",
        icon: FiHeart,
        description:
            "A hospital startup concept in Damak, Nepal built on the motto \"Simplicity, Peace, and Care.\" This project envisions quality and accessible healthcare for Eastern Nepal, combining modern medical practices with compassionate community service.",
        tags: ["Healthcare", "Entrepreneurship", "Social Impact", "Damak"],
        featured: true,
        status: "In Development",
    },
    {
        slug: "finance-research",
        title: "Finance & Investment Research",
        category: "Finance",
        icon: FiTrendingUp,
        description:
            "Ongoing research papers exploring investment strategies, market dynamics in South Asia, and the intersection of traditional business models with digital economies in Nepal.",
        tags: ["Finance", "Research", "Investment", "Economics"],
        featured: false,
        status: "Ongoing",
    },
    {
        slug: "nutrition-coaching",
        title: "Precision Nutrition Coaching",
        category: "Health & Fitness",
        icon: FiAward,
        description:
            "Certified nutrition coaching practice leveraging Precision Nutrition methodologies. Providing evidence-based dietary guidance combined with 3+ years of practical fitness experience.",
        tags: ["Nutrition", "Fitness", "Coaching", "Health"],
        featured: false,
        status: "Active",
    },
    {
        slug: "tech-projects",
        title: "IT & Software Projects",
        category: "Technology",
        icon: FiCpu,
        description:
            "Academic and personal technology projects developed during BSc (Hons) Computing coursework — including web applications, database systems, and deployed solutions.",
        tags: ["Web Development", "Database", "Software", "Computing"],
        featured: false,
        status: "Portfolio",
    },
    {
        slug: "leo-club-initiatives",
        title: "Leo Club & Social Initiatives",
        category: "Leadership",
        icon: FiAward,
        description:
            "Leading and organizing community service initiatives as Leo Club Treasurer — from plantation drives and orphanage service to youth empowerment programs across Eastern Nepal.",
        tags: ["Leadership", "Social Work", "Community", "Youth"],
        featured: false,
        status: "Active",
    },
];

export default function ProjectsPage() {
    return (
        <div className="page-transition pt-28">
            <section className="container-custom py-16">
                <SectionHeading
                    title="Projects & Ventures"
                    subtitle="A portfolio of purpose-driven work across healthcare, finance, technology, and community leadership."
                />
            </section>

            <section className="container-custom pb-24">
                {/* Featured Project */}
                {projects
                    .filter((p) => p.featured)
                    .map((project) => (
                        <ScrollReveal key={project.slug} className="mb-16">
                            <div className="border border-gold/30 bg-cream/30 p-8 md:p-12 group hover:border-gold/60 transition-all duration-500">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-xs tracking-[0.2em] uppercase text-gold font-sans font-medium px-3 py-1 border border-gold/30 bg-gold/5">
                                        Featured Project
                                    </span>
                                    <span className="text-xs tracking-widest uppercase text-charcoal-light/50 font-sans">
                                        {project.status}
                                    </span>
                                </div>
                                <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
                                    {project.title}
                                </h2>
                                <p className="text-charcoal-light/70 leading-relaxed font-light max-w-3xl mb-6">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-xs font-sans px-3 py-1 bg-beige/20 text-charcoal-light/60 border border-beige/30"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <Link
                                    href={`/projects/${project.slug}`}
                                    className="inline-flex items-center text-sm font-medium text-gold hover:text-charcoal font-sans tracking-wider uppercase transition-colors duration-300 group/link"
                                >
                                    View Project Details
                                    <FiArrowRight className="ml-2 group-hover/link:translate-x-1 transition-transform duration-300" />
                                </Link>
                            </div>
                        </ScrollReveal>
                    ))}

                {/* Project Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects
                        .filter((p) => !p.featured)
                        .map((project, i) => (
                            <ScrollReveal key={project.slug} delay={i * 0.1}>
                                <Link href={`/projects/${project.slug}`} className="block group">
                                    <div className="h-full border border-beige/30 p-8 hover:border-gold/40 transition-all duration-500 hover:-translate-y-1">
                                        <div className="flex items-center justify-between mb-4">
                                            <project.icon className="text-gold text-xl" />
                                            <span className="text-xs tracking-widest uppercase text-charcoal-light/40 font-sans">
                                                {project.status}
                                            </span>
                                        </div>
                                        <span className="text-xs tracking-[0.2em] uppercase text-gold/80 font-sans font-medium">
                                            {project.category}
                                        </span>
                                        <h3 className="font-serif text-xl text-charcoal mt-2 mb-3 group-hover:text-gold transition-colors duration-300">
                                            {project.title}
                                        </h3>
                                        <p className="text-sm text-charcoal-light/60 font-light leading-relaxed mb-5">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.slice(0, 3).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-xs font-sans px-2.5 py-0.5 bg-beige/10 text-charcoal-light/50 border border-beige/20"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        ))}
                </div>
            </section>
        </div>
    );
}
