import { Metadata } from "next";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import ScrollReveal from "@/components/ui/ScrollReveal";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const project = await prisma.project.findUnique({ where: { slug } });
    if (!project) return { title: "Project Not Found" };
    
    return { title: project.title, description: project.description };
}

export default async function ProjectDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = await prisma.project.findUnique({ where: { slug } });

    if (!project) {
        return (
            <div className="page-transition pt-28">
                <div className="container-custom py-20 text-center">
                    <h1 className="font-serif text-4xl text-charcoal mb-4">
                        Project Not Found
                    </h1>
                    <Link
                        href="/projects"
                        className="text-gold hover:text-charcoal transition-colors"
                    >
                        ← Back to Projects
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="page-transition pt-28">
            <div className="container-custom py-16 max-w-3xl">
                <ScrollReveal>
                    <Link
                        href="/projects"
                        className="inline-flex items-center text-sm text-charcoal-light/60 hover:text-gold transition-colors font-sans tracking-wider uppercase mb-8"
                    >
                        <FiArrowLeft className="mr-2" /> Back to Projects
                    </Link>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs tracking-[0.2em] uppercase text-gold font-sans font-medium px-3 py-1 border border-gold/30 bg-gold/5">
                            {project.category}
                        </span>
                        {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-xs tracking-widest uppercase text-gold font-sans hover:underline">
                                Live Demo
                            </a>
                        )}
                        {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-xs tracking-widest uppercase text-gold font-sans hover:underline">
                                GitHub
                            </a>
                        )}
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={0.15}>
                    <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-6">
                        {project.title}
                    </h1>
                    <div className="w-16 h-[2px] bg-gold mb-8" />
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                    <p className="text-lg text-charcoal-light/80 leading-relaxed font-light mb-12">
                        {project.description}
                    </p>
                </ScrollReveal>

                <div className="space-y-6 mb-12">
                    <ScrollReveal delay={0.25}>
                        <div className="pl-6 border-l-2 border-beige/50">
                            <p className="text-charcoal-light/70 leading-relaxed font-light whitespace-pre-wrap">
                                {project.content || project.description}
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </div>
    );
}
