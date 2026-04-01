"use client";

import { useState, FormEvent } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheck } from "react-icons/fi";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [newsletter, setNewsletter] = useState("");
    const [formStatus, setFormStatus] = useState<
        "idle" | "sending" | "sent" | "error"
    >("idle");
    const [newsletterStatus, setNewsletterStatus] = useState<
        "idle" | "sending" | "sent" | "error"
    >("idle");

    const handleContactSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setFormStatus("sending");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setFormStatus("sent");
                setFormData({ name: "", email: "", message: "" });
            } else {
                setFormStatus("error");
            }
        } catch {
            setFormStatus("error");
        }
    };

    const handleNewsletterSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setNewsletterStatus("sending");
        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: newsletter }),
            });
            if (res.ok) {
                setNewsletterStatus("sent");
                setNewsletter("");
            } else {
                setNewsletterStatus("error");
            }
        } catch {
            setNewsletterStatus("error");
        }
    };

    return (
        <div className="page-transition pt-28">
            <section className="container-custom py-16">
                <SectionHeading
                    title="Get in Touch"
                    subtitle="Whether it's a business proposal, collaboration, or just a meaningful conversation — I'd love to hear from you."
                />
            </section>

            <section className="container-custom pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
                    {/* Contact Form */}
                    <ScrollReveal className="lg:col-span-3">
                        <form onSubmit={handleContactSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="contact-name"
                                    className="block text-xs tracking-widest uppercase text-charcoal-light/60 font-sans mb-2"
                                >
                                    Full Name
                                </label>
                                <input
                                    id="contact-name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    className="w-full px-4 py-3 bg-transparent border border-beige/40 text-charcoal font-sans text-sm focus:outline-none focus:border-gold transition-colors duration-300 placeholder:text-charcoal-light/30"
                                    placeholder="Your full name"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="contact-email"
                                    className="block text-xs tracking-widest uppercase text-charcoal-light/60 font-sans mb-2"
                                >
                                    Email Address
                                </label>
                                <input
                                    id="contact-email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    className="w-full px-4 py-3 bg-transparent border border-beige/40 text-charcoal font-sans text-sm focus:outline-none focus:border-gold transition-colors duration-300 placeholder:text-charcoal-light/30"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="contact-message"
                                    className="block text-xs tracking-widest uppercase text-charcoal-light/60 font-sans mb-2"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="contact-message"
                                    required
                                    rows={6}
                                    value={formData.message}
                                    onChange={(e) =>
                                        setFormData({ ...formData, message: e.target.value })
                                    }
                                    className="w-full px-4 py-3 bg-transparent border border-beige/40 text-charcoal font-sans text-sm focus:outline-none focus:border-gold transition-colors duration-300 placeholder:text-charcoal-light/30 resize-none"
                                    placeholder="How can we work together?"
                                />
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                size="md"
                                disabled={formStatus === "sending"}
                            >
                                {formStatus === "sending" ? (
                                    "Sending..."
                                ) : formStatus === "sent" ? (
                                    <>
                                        <FiCheck className="mr-2" /> Message Sent
                                    </>
                                ) : (
                                    <>
                                        <FiSend className="mr-2" /> Send Message
                                    </>
                                )}
                            </Button>

                            {formStatus === "error" && (
                                <p className="text-sm text-red-600/70 font-sans">
                                    Something went wrong. Please try again or email directly.
                                </p>
                            )}
                        </form>
                    </ScrollReveal>

                    {/* Contact Info Sidebar */}
                    <div className="lg:col-span-2 space-y-10">
                        <ScrollReveal delay={0.1}>
                            <div>
                                <h3 className="font-serif text-xl text-charcoal mb-6">
                                    Contact Information
                                </h3>
                                <ul className="space-y-5">
                                    <li className="flex items-start gap-4">
                                        <div className="w-10 h-10 flex items-center justify-center border border-beige/30 flex-shrink-0">
                                            <FiMapPin className="text-gold text-sm" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-sans text-charcoal">
                                                Location
                                            </p>
                                            <p className="text-sm text-charcoal-light/60 font-light">
                                                Jhapa, Koshi Province
                                                <br />
                                                Eastern Nepal
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="w-10 h-10 flex items-center justify-center border border-beige/30 flex-shrink-0">
                                            <FiMail className="text-gold text-sm" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-sans text-charcoal">Email</p>
                                            <a
                                                href="mailto:contact@prameshbhandari.com.np"
                                                className="text-sm text-charcoal-light/60 font-light hover:text-gold transition-colors"
                                            >
                                                contact@prameshbhandari.com.np
                                            </a>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="w-10 h-10 flex items-center justify-center border border-beige/30 flex-shrink-0">
                                            <FiPhone className="text-gold text-sm" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-sans text-charcoal">Phone</p>
                                            <a
                                                href="tel:+9779815188662"
                                                className="text-sm text-charcoal-light/60 font-light hover:text-gold transition-colors"
                                            >
                                                +977 9815188662
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </ScrollReveal>

                        {/* Newsletter */}
                        <ScrollReveal delay={0.2}>
                            <div className="p-6 border border-beige/30 bg-cream/30">
                                <h3 className="font-serif text-lg text-charcoal mb-2">
                                    Stay Updated
                                </h3>
                                <p className="text-xs text-charcoal-light/50 font-light mb-4">
                                    Subscribe for insights on finance, leadership, and
                                    entrepreneurship.
                                </p>
                                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                                    <input
                                        type="email"
                                        required
                                        value={newsletter}
                                        onChange={(e) => setNewsletter(e.target.value)}
                                        placeholder="your@email.com"
                                        className="w-full px-4 py-2.5 bg-transparent border border-beige/40 text-charcoal font-sans text-sm focus:outline-none focus:border-gold transition-colors duration-300 placeholder:text-charcoal-light/30"
                                    />
                                    <button
                                        type="submit"
                                        disabled={newsletterStatus === "sending"}
                                        className="w-full text-xs tracking-widest uppercase font-sans font-medium px-4 py-2.5 bg-charcoal text-offwhite hover:bg-gold hover:text-charcoal border border-charcoal hover:border-gold transition-all duration-300"
                                    >
                                        {newsletterStatus === "sent"
                                            ? "✓ Subscribed!"
                                            : "Subscribe"}
                                    </button>
                                </form>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </div>
    );
}
