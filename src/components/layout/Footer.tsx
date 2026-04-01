import Link from "next/link";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const quickLinks = [
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/resume", label: "Resume" },
    { href: "/contact", label: "Contact" },
];

export default function Footer() {
    return (
        <footer className="bg-charcoal text-offwhite/80">
            <div className="container-custom py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Brand */}
                    <div>
                        <h3 className="font-serif text-2xl text-offwhite mb-4">
                            Pramesh <span className="text-gold">Bhandari</span>
                        </h3>
                        <p className="text-sm leading-relaxed text-offwhite/60 max-w-xs">
                            Finance. Strategy. Leadership. Purpose. Building a future at the
                            intersection of business, healthcare, and meaningful impact.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-serif text-lg text-offwhite mb-4">
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-offwhite/60 hover:text-gold transition-colors duration-300"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-serif text-lg text-offwhite mb-4">
                            Get in Touch
                        </h4>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-sm text-offwhite/60">
                                <FiMapPin className="text-gold flex-shrink-0" />
                                Jhapa, Koshi Province, Nepal
                            </li>
                            <li className="flex items-center gap-3 text-sm text-offwhite/60">
                                <FiMail className="text-gold flex-shrink-0" />
                                contact@prameshbhandari.com.np
                            </li>
                            <li className="flex items-center gap-3 text-sm text-offwhite/60">
                                <FiPhone className="text-gold flex-shrink-0" />
                                +977 9815188662
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="mt-12 pt-8 border-t border-offwhite/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-offwhite/40">
                        © {new Date().getFullYear()} Pramesh Bhandari. All rights reserved.
                    </p>
                    <p className="text-xs text-offwhite/40">
                        Built with purpose and precision.
                    </p>
                </div>
            </div>
        </footer>
    );
}
