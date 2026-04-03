"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { FiCalendar, FiClock, FiArrowRight } from "react-icons/fi";

const categories = [
    "All",
    "Finance & Economics",
    "Entrepreneurship",
    "Health & Nutrition",
    "Spiritual Insights",
    "Leadership & Growth",
];

type BlogPostType = { slug: string; title: string; excerpt: string; category: string; createdAt: Date; };

export default function BlogContent({ blogPosts }: { blogPosts: BlogPostType[] }) {
    const [activeCategory, setActiveCategory] = useState("All");

    const filtered =
        activeCategory === "All"
            ? blogPosts
            : blogPosts.filter((p) => p.category === activeCategory);

    return (
        <div className="page-transition pt-28">
            <section className="container-custom py-16">
                <SectionHeading
                    title="Insights & Reflections"
                    subtitle="Thoughts on finance, entrepreneurship, health, spirituality, and the art of purposeful leadership."
                />
            </section>

            {/* Category Filters */}
            <section className="container-custom pb-12">
                <ScrollReveal>
                    <div className="flex flex-wrap gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`text-xs tracking-widest uppercase font-sans px-4 py-2 border transition-all duration-300 ${activeCategory === cat
                                        ? "bg-charcoal text-offwhite border-charcoal"
                                        : "bg-transparent text-charcoal-light/60 border-beige/30 hover:border-gold/50 hover:text-gold"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </ScrollReveal>
            </section>

            {/* Blog Grid */}
            <section className="container-custom pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map((post, i) => (
                        <ScrollReveal key={post.slug} delay={i * 0.08}>
                            <article className="group border border-beige/30 hover:border-gold/40 transition-all duration-500 hover:-translate-y-1 h-full flex flex-col">
                                {/* Category Banner */}
                                <div className="h-32 bg-cream/60 flex items-center justify-center border-b border-beige/20">
                                    <span className="text-xs tracking-[0.2em] uppercase text-gold/60 font-sans font-medium">
                                        {post.category}
                                    </span>
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-4 text-xs text-charcoal-light/40 font-sans mb-4">
                                        <span className="flex items-center gap-1.5">
                                            <FiCalendar className="text-gold/60" />
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <FiClock className="text-gold/60" />
                                            5 min read
                                        </span>
                                    </div>

                                    <h3 className="font-serif text-lg text-charcoal mb-3 group-hover:text-gold transition-colors duration-300">
                                        {post.title}
                                    </h3>

                                    <p className="text-sm text-charcoal-light/60 font-light leading-relaxed flex-1">
                                        {post.excerpt}
                                    </p>

                                    <a href={`/blog/${post.slug}`} className="mt-6 pt-4 border-t border-beige/20 inline-block group-hover:text-gold">
                                        <span className="inline-flex items-center text-xs font-medium text-gold font-sans tracking-wider uppercase group-hover:gap-3 gap-2 transition-all duration-300">
                                            Read Article
                                            <FiArrowRight className="text-sm" />
                                        </span>
                                    </a>
                                </div>
                            </article>
                        </ScrollReveal>
                    ))}
                </div>

                {/* CMS Note */}
                <ScrollReveal className="mt-16">
                    <div className="text-center py-12 border border-dashed border-beige/50">
                        <p className="text-sm text-charcoal-light/40 font-sans">
                            Blog posts are managed through the admin dashboard.
                        </p>
                        <p className="text-xs text-charcoal-light/30 font-sans mt-1">
                            New articles are published regularly across all categories.
                        </p>
                    </div>
                </ScrollReveal>
            </section>
        </div>
    );
}
