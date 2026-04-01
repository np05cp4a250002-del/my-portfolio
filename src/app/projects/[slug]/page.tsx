import { Metadata } from "next";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import ScrollReveal from "@/components/ui/ScrollReveal";

const projectData: Record<
    string,
    {
        title: string;
        category: string;
        status: string;
        description: string;
        details: string[];
        tags: string[];
    }
> = {
    ayuraksha: {
        title: "आयुरक्षा Hospital",
        category: "Healthcare Entrepreneurship",
        status: "In Development",
        description:
            "A hospital startup concept in Damak, Nepal built on the motto \"Simplicity, Peace, and Care.\" This project aims to revolutionize healthcare delivery in Eastern Nepal.",
        details: [
            "आयुरक्षा (Ayuraksha) is derived from the Sanskrit words for 'life' and 'protection' — embodying the core mission of safeguarding health with integrity and compassion.",
            "The hospital is envisioned as a comprehensive healthcare facility in Damak, Jhapa, serving the growing healthcare needs of Eastern Nepal's population.",
            "The founding philosophy rests on three pillars: Simplicity in processes, Peace in environments, and Care in every interaction — ensuring that patients feel valued and respected.",
            "The project integrates modern medical technology with traditional Nepali values of community care, aiming to make quality healthcare accessible and affordable.",
            "As a future entrepreneur, Pramesh is currently developing the business plan, researching healthcare models, and building the foundational network needed to bring this vision to life.",
        ],
        tags: [
            "Healthcare",
            "Entrepreneurship",
            "Social Impact",
            "Damak",
            "Nepal",
            "Hospital Management",
        ],
    },
    "finance-research": {
        title: "Finance & Investment Research",
        category: "Academic & Professional Research",
        status: "Ongoing",
        description:
            "A collection of research initiatives exploring investment strategies, market dynamics in South Asia, and the intersection of traditional business models with digital economies.",
        details: [
            "Research into Nepali capital markets and the emerging investment landscape in South Asia, with focus on long-term value creation strategies.",
            "Analysis of the intersection between traditional business practices in Nepal and the emerging digital economy, exploring how local businesses can adapt to global trends.",
            "Exploring microfinance and community-based financial instruments as tools for economic empowerment in rural Nepal.",
            "Studying the role of fiscal policy and monetary mechanisms in developing economies, with particular focus on Nepal's economic trajectory.",
        ],
        tags: [
            "Finance",
            "Research",
            "Investment",
            "Economics",
            "South Asia",
            "Capital Markets",
        ],
    },
    "nutrition-coaching": {
        title: "Precision Nutrition Coaching",
        category: "Health & Wellness",
        status: "Active",
        description:
            "Certified nutrition coaching practice combining scientific methodology with practical fitness experience.",
        details: [
            "Precision Nutrition (PN) certification providing evidence-based dietary guidance tailored to individual goals and lifestyles.",
            "Over 3 years of personal gym training experience informing a holistic approach to health that combines nutrition, strength training, and lifestyle optimization.",
            "Advocating for sustainable dietary habits rather than extreme diets — promoting long-term health over short-term results.",
            "Integrating traditional Nepali dietary wisdom with modern nutritional science to create culturally relevant coaching programs.",
        ],
        tags: [
            "Nutrition",
            "Fitness",
            "Coaching",
            "Health",
            "Precision Nutrition",
            "Wellness",
        ],
    },
    "tech-projects": {
        title: "IT & Software Projects",
        category: "Technology & Development",
        status: "Portfolio",
        description:
            "Academic and personal technology projects spanning web development, database design, and application deployment.",
        details: [
            "Web application development using modern frameworks and technologies as part of BSc (Hons) Computing coursework at Itahari International College.",
            "Database design and management projects implementing structured data solutions with PostgreSQL and related technologies.",
            "Full-stack development experience covering frontend interfaces, backend APIs, and deployment pipelines.",
            "Continuous learning in emerging technologies including cloud services, DevOps practices, and modern JavaScript frameworks.",
        ],
        tags: [
            "Web Development",
            "Database",
            "Software Engineering",
            "Computing",
            "Full Stack",
            "Cloud",
        ],
    },
    "leo-club-initiatives": {
        title: "Leo Club & Social Initiatives",
        category: "Leadership & Community Service",
        status: "Active",
        description:
            "Leading community service initiatives and youth empowerment programs across Eastern Nepal.",
        details: [
            "Serving as Club Treasurer — managing budgets, financial planning, and ensuring fiscal accountability for all club activities and events.",
            "Organizing and participating in plantation drives to promote environmental awareness and green initiatives in the local community.",
            "Regular visits and service at orphanages, providing support, mentorship, and resources to underprivileged children.",
            "Youth empowerment programs focused on leadership development, public speaking, and community engagement skills.",
            "Collaborative initiatives with other clubs and organizations to maximize the impact of social service efforts.",
        ],
        tags: [
            "Leadership",
            "Social Work",
            "Community Service",
            "Youth",
            "Environment",
            "Leo Club",
        ],
    },
};

export async function generateStaticParams() {
    return Object.keys(projectData).map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const project = projectData[slug];
    if (!project)
        return { title: "Project Not Found" };

    return {
        title: project.title,
        description: project.description,
    };
}

export default async function ProjectDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = projectData[slug];

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
                        <span className="text-xs tracking-widest uppercase text-charcoal-light/50 font-sans">
                            {project.status}
                        </span>
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
                    {project.details.map((detail, i) => (
                        <ScrollReveal key={i} delay={0.25 + i * 0.05}>
                            <div className="pl-6 border-l-2 border-beige/50">
                                <p className="text-charcoal-light/70 leading-relaxed font-light">
                                    {detail}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                <ScrollReveal delay={0.4}>
                    <div className="flex flex-wrap gap-2 pt-8 border-t border-beige/30">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-xs font-sans px-3 py-1 bg-beige/15 text-charcoal-light/60 border border-beige/25"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
}
