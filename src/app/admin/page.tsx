"use client";

import { useState, FormEvent } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import { FiEdit3, FiLogIn, FiPlus, FiSave } from "react-icons/fi";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState("");
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [loginError, setLoginError] = useState("");

    // Blog post form
    const [postData, setPostData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        category: "Finance & Economics",
        published: false,
    });
    const [postStatus, setPostStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setLoginError("");
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData),
            });
            const data = await res.json();
            if (res.ok) {
                setToken(data.token);
                setIsAuthenticated(true);
            } else {
                setLoginError(data.error || "Login failed");
            }
        } catch {
            setLoginError("Connection error");
        }
    };

    const handleCreatePost = async (e: FormEvent) => {
        e.preventDefault();
        setPostStatus("saving");
        try {
            const res = await fetch("/api/blog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(postData),
            });
            if (res.ok) {
                setPostStatus("saved");
                setPostData({
                    title: "",
                    slug: "",
                    excerpt: "",
                    content: "",
                    category: "Finance & Economics",
                    published: false,
                });
                setTimeout(() => setPostStatus("idle"), 3000);
            } else {
                setPostStatus("error");
            }
        } catch {
            setPostStatus("error");
        }
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim();
    };

    if (!isAuthenticated) {
        return (
            <div className="page-transition pt-28">
                <div className="container-custom py-16 max-w-md mx-auto">
                    <ScrollReveal>
                        <div className="text-center mb-10">
                            <h1 className="font-serif text-3xl text-charcoal mb-2">
                                Admin Access
                            </h1>
                            <div className="w-12 h-[2px] bg-gold mx-auto mb-4" />
                            <p className="text-sm text-charcoal-light/50 font-light">
                                Sign in to manage your portfolio content.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.1}>
                        <form onSubmit={handleLogin} className="space-y-5">
                            <div>
                                <label className="block text-xs tracking-widest uppercase text-charcoal-light/60 font-sans mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={loginData.email}
                                    onChange={(e) =>
                                        setLoginData({ ...loginData, email: e.target.value })
                                    }
                                    className="w-full px-4 py-3 bg-transparent border border-beige/40 text-charcoal font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                                    placeholder="admin@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-xs tracking-widest uppercase text-charcoal-light/60 font-sans mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    required
                                    value={loginData.password}
                                    onChange={(e) =>
                                        setLoginData({ ...loginData, password: e.target.value })
                                    }
                                    className="w-full px-4 py-3 bg-transparent border border-beige/40 text-charcoal font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                            {loginError && (
                                <p className="text-sm text-red-600/70">{loginError}</p>
                            )}
                            <Button type="submit" variant="primary" size="md" className="w-full">
                                <FiLogIn className="mr-2" /> Sign In
                            </Button>
                        </form>
                    </ScrollReveal>
                </div>
            </div>
        );
    }

    return (
        <div className="page-transition pt-28">
            <section className="container-custom py-16">
                <SectionHeading
                    title="Admin Dashboard"
                    subtitle="Manage blog posts, messages, and newsletter subscribers."
                />
            </section>

            {/* Create Blog Post */}
            <section className="container-custom pb-24">
                <ScrollReveal>
                    <div className="border border-beige/30 p-8 md:p-10">
                        <div className="flex items-center gap-3 mb-8">
                            <FiPlus className="text-gold" />
                            <h3 className="font-serif text-xl text-charcoal">
                                Create Blog Post
                            </h3>
                        </div>

                        <form onSubmit={handleCreatePost} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs tracking-widest uppercase text-charcoal-light/60 font-sans mb-2">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={postData.title}
                                        onChange={(e) => {
                                            setPostData({
                                                ...postData,
                                                title: e.target.value,
                                                slug: generateSlug(e.target.value),
                                            });
                                        }}
                                        className="w-full px-4 py-3 bg-transparent border border-beige/40 text-charcoal font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                                        placeholder="Article title"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs tracking-widest uppercase text-charcoal-light/60 font-sans mb-2">
                                        Slug
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={postData.slug}
                                        onChange={(e) =>
                                            setPostData({ ...postData, slug: e.target.value })
                                        }
                                        className="w-full px-4 py-3 bg-transparent border border-beige/40 text-charcoal font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                                        placeholder="article-url-slug"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs tracking-widest uppercase text-charcoal-light/60 font-sans mb-2">
                                    Category
                                </label>
                                <select
                                    value={postData.category}
                                    onChange={(e) =>
                                        setPostData({ ...postData, category: e.target.value })
                                    }
                                    className="w-full px-4 py-3 bg-transparent border border-beige/40 text-charcoal font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                                >
                                    <option>Finance & Economics</option>
                                    <option>Entrepreneurship</option>
                                    <option>Health & Nutrition</option>
                                    <option>Spiritual Insights</option>
                                    <option>Leadership & Growth</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs tracking-widest uppercase text-charcoal-light/60 font-sans mb-2">
                                    Excerpt
                                </label>
                                <textarea
                                    required
                                    rows={2}
                                    value={postData.excerpt}
                                    onChange={(e) =>
                                        setPostData({ ...postData, excerpt: e.target.value })
                                    }
                                    className="w-full px-4 py-3 bg-transparent border border-beige/40 text-charcoal font-sans text-sm focus:outline-none focus:border-gold transition-colors resize-none"
                                    placeholder="Brief summary of the article"
                                />
                            </div>

                            <div>
                                <label className="block text-xs tracking-widest uppercase text-charcoal-light/60 font-sans mb-2">
                                    Content (Markdown)
                                </label>
                                <div className="flex items-center gap-2 mb-2">
                                    <FiEdit3 className="text-gold/50 text-xs" />
                                    <span className="text-xs text-charcoal-light/40">
                                        Supports Markdown formatting
                                    </span>
                                </div>
                                <textarea
                                    required
                                    rows={12}
                                    value={postData.content}
                                    onChange={(e) =>
                                        setPostData({ ...postData, content: e.target.value })
                                    }
                                    className="w-full px-4 py-3 bg-transparent border border-beige/40 text-charcoal font-sans text-sm focus:outline-none focus:border-gold transition-colors resize-none font-mono"
                                    placeholder="Write your article content in Markdown..."
                                />
                            </div>

                            <div className="flex items-center gap-3 py-2">
                                <input
                                    type="checkbox"
                                    id="published"
                                    checked={postData.published}
                                    onChange={(e) =>
                                        setPostData({ ...postData, published: e.target.checked })
                                    }
                                    className="accent-gold"
                                />
                                <label
                                    htmlFor="published"
                                    className="text-sm text-charcoal-light/70 font-sans"
                                >
                                    Publish immediately
                                </label>
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                size="md"
                                disabled={postStatus === "saving"}
                            >
                                {postStatus === "saving" ? (
                                    "Saving..."
                                ) : postStatus === "saved" ? (
                                    "✓ Post Created!"
                                ) : (
                                    <>
                                        <FiSave className="mr-2" /> Create Post
                                    </>
                                )}
                            </Button>

                            {postStatus === "error" && (
                                <p className="text-sm text-red-600/70">
                                    Failed to create post. Please check the database connection.
                                </p>
                            )}
                        </form>
                    </div>
                </ScrollReveal>
            </section>
        </div>
    );
}
