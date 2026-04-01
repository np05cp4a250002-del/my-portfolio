"use client";

import { useState } from "react";
import { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { FiCalendar, FiClock, FiArrowRight } from "react-icons/fi";
import Link from "next/link";

const categories = [
    "All",
    "Finance & Economics",
    "Entrepreneurship",
    "Health & Nutrition",
    "Spiritual Insights",
    "Leadership & Growth",
];

const blogPosts = [
    {
        slug: "building-healthcare-vision-nepal",
        title: "Building a Healthcare Vision in Nepal",
        excerpt:
            "How a small-town dream to serve communities through healthcare is slowly taking shape as a structured entrepreneurial venture.",
        category: "Entrepreneurship",
        date: "Coming Soon",
        readTime: "8 min read",
    },
    {
        slug: "investment-strategies-south-asian-markets",
        title: "Investment Strategies for South Asian Markets",
        excerpt:
            "Exploring the unique dynamics of capital markets in Nepal and the broader South Asian region — opportunities, risks, and long-term value creation.",
        category: "Finance & Economics",
        date: "Coming Soon",
        readTime: "12 min read",
    },
    {
        slug: "precision-nutrition-sustainable-habits",
        title: "Precision Nutrition: Building Sustainable Habits",
        excerpt:
            "Why crash diets fail and how evidence-based nutrition coaching creates lasting transformation through gradual habit-building.",
        category: "Health & Nutrition",
        date: "Coming Soon",
        readTime: "6 min read",
    },
    {
        slug: "dharma-in-modern-leadership",
        title: "Dharma in Modern Leadership",
        excerpt:
            "Drawing parallels between ancient Hindu philosophical concepts of duty (dharma) and the responsibilities of modern business leadership.",
        category: "Spiritual Insights",
        date: "Coming Soon",
        readTime: "10 min read",
    },
    {
        slug: "lessons-from-leo-club",
        title: "Lessons from Leading a Leo Club",
        excerpt:
            "What managing finances, organizing events, and serving communities taught me about real-world leadership beyond the classroom.",
        category: "Leadership & Growth",
        date: "Coming Soon",
        readTime: "7 min read",
    },
    {
        slug: "discipline-of-the-gym",
        title: "The Discipline of the Gym",
        excerpt:
            "Three years of consistent training taught me more about business than any textbook — lessons in consistency, patience, and progressive overload.",
        category: "Health & Nutrition",
        date: "Coming Soon",
        readTime: "5 min read",
    },
];

export default function BlogPage() {
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
                                            {post.date}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <FiClock className="text-gold/60" />
                                            {post.readTime}
                                        </span>
                                    </div>

                                    <h3 className="font-serif text-lg text-charcoal mb-3 group-hover:text-gold transition-colors duration-300">
                                        {post.title}
                                    </h3>

                                    <p className="text-sm text-charcoal-light/60 font-light leading-relaxed flex-1">
                                        {post.excerpt}
                                    </p>

                                    <div className="mt-6 pt-4 border-t border-beige/20">
                                        <span className="inline-flex items-center text-xs font-medium text-gold font-sans tracking-wider uppercase group-hover:gap-3 gap-2 transition-all duration-300">
                                            Read Article
                                            <FiArrowRight className="text-sm" />
                                        </span>
                                    </div>
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
