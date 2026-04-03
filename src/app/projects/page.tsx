import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
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
export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
    const projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });

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
                                </div>
                                <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
                                    {project.title}
                                </h2>
                                <p className="text-charcoal-light/70 leading-relaxed font-light max-w-3xl mb-6">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-8 hidden">
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
                                            <FiCpu className="text-gold text-xl" />
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
                                        <div className="flex flex-wrap gap-2 hidden">
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
