"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/resume", label: "Resume" },
    { href: "/contact", label: "Contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? "bg-offwhite/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.05)]"
                    : "bg-transparent"
                }`}
        >
            <nav className="container-custom flex items-center justify-between h-20">
                {/* Logo */}
                <Link href="/" className="relative group">
                    <span className="font-serif text-xl tracking-wide text-charcoal">
                        Pramesh
                    </span>
                    <span className="font-serif text-xl tracking-wide text-gold ml-1">
                        Bhandari
                    </span>
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`relative text-sm tracking-widest uppercase font-sans font-medium transition-colors duration-300 py-1 ${pathname === link.href
                                        ? "text-gold"
                                        : "text-charcoal-light hover:text-gold"
                                    }`}
                            >
                                {link.label}
                                {pathname === link.href && (
                                    <motion.span
                                        layoutId="navIndicator"
                                        className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gold"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Hamburger */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
                    aria-label="Toggle menu"
                >
                    <motion.span
                        animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                        className="block w-6 h-[1.5px] bg-charcoal origin-center"
                    />
                    <motion.span
                        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                        className="block w-6 h-[1.5px] bg-charcoal"
                    />
                    <motion.span
                        animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                        className="block w-6 h-[1.5px] bg-charcoal origin-center"
                    />
                </button>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden bg-offwhite/98 backdrop-blur-md border-t border-beige/30 overflow-hidden"
                    >
                        <ul className="container-custom py-8 space-y-6">
                            {navLinks.map((link, i) => (
                                <motion.li
                                    key={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <Link
                                        href={link.href}
                                        className={`text-lg tracking-widest uppercase font-sans ${pathname === link.href
                                                ? "text-gold"
                                                : "text-charcoal-light"
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
