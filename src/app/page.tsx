"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  FiArrowRight,
  FiBookOpen,
  FiTarget,
  FiBriefcase,
  FiHeart,
} from "react-icons/fi";

const highlights = [
  {
    icon: FiBriefcase,
    title: "Finance & Strategy",
    desc: "Business administration, investment research, and strategic thinking.",
  },
  {
    icon: FiHeart,
    title: "Healthcare Vision",
    desc: "Founding आयुरक्षा — a hospital built on simplicity, peace, and care.",
  },
  {
    icon: FiBookOpen,
    title: "Research & Knowledge",
    desc: "BSc (Hons) Computing student with a passion for continuous learning.",
  },
  {
    icon: FiTarget,
    title: "Leadership & Impact",
    desc: "Leo Club member, treasurer, and advocate for community service.",
  },
];

export default function HomePage() {
  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--cream)_0%,_transparent_50%)]" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-beige/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />

        <div className="container-custom relative z-10 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              >
                <span className="text-xs tracking-[0.3em] uppercase text-gold font-sans font-medium">
                  Finance · Strategy · Leadership · Purpose
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.15,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                className="font-serif text-5xl md:text-6xl lg:text-7xl mt-6 leading-[1.1] text-charcoal"
              >
                Pramesh
                <br />
                <span className="text-gold">Bhandari</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
              >
                <div className="w-16 h-[2px] bg-gold mt-8 mb-6" />
                <p className="text-charcoal-light/70 text-lg leading-relaxed max-w-lg font-light">
                  A young finance professional, future entrepreneur, and
                  research-oriented thinker from Eastern Nepal — driven by
                  discipline, strategy, and the pursuit of meaningful impact in
                  business and healthcare.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap gap-4 mt-10"
              >
                <Button href="/about" variant="primary" size="md">
                  About Me <FiArrowRight className="ml-2" />
                </Button>
                <Button href="/projects" variant="outline" size="md">
                  View Projects
                </Button>
              </motion.div>
            </div>

            {/* Portrait Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative">
                <div className="w-[400px] h-[500px] bg-cream border border-beige/50 flex items-center justify-center relative">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-beige/30 flex items-center justify-center">
                      <span className="font-serif text-2xl text-gold">PB</span>
                    </div>
                    <p className="text-sm text-charcoal-light/40 font-sans">
                      Professional Portrait
                    </p>
                  </div>
                  {/* Decorative frame */}
                  <div className="absolute -top-3 -left-3 w-20 h-20 border-t-2 border-l-2 border-gold/40" />
                  <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b-2 border-r-2 border-gold/40" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-gradient-to-b from-transparent via-gold to-transparent"
          />
        </motion.div>
      </section>

      {/* Highlights Section */}
      <section className="py-24 bg-cream/50">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs tracking-[0.3em] uppercase text-gold font-sans font-medium">
                Areas of Focus
              </span>
              <h2 className="font-serif text-3xl md:text-4xl mt-3 text-charcoal">
                Where Vision Meets{" "}
                <span className="text-gold">Discipline</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-offwhite p-8 border border-beige/30 group hover:border-gold/50 transition-all duration-500 hover:-translate-y-1">
                  <item.icon className="text-gold text-2xl mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-serif text-lg text-charcoal mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-charcoal-light/60 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Quote */}
      <section className="py-24">
        <div className="container-custom max-w-3xl text-center">
          <ScrollReveal>
            <div className="relative">
              <span className="font-serif text-8xl text-gold/20 absolute -top-8 left-1/2 -translate-x-1/2">
                &ldquo;
              </span>
              <blockquote className="font-serif text-2xl md:text-3xl text-charcoal leading-relaxed italic relative z-10">
                The purpose of life is to find your gift. The meaning of life is
                to give it away.
              </blockquote>
              <div className="w-12 h-[1px] bg-gold mx-auto mt-8 mb-4" />
              <p className="text-sm text-charcoal-light/50 tracking-widest uppercase font-sans">
                Personal Philosophy
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-charcoal">
        <div className="container-custom text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl text-offwhite mb-4">
              Let&apos;s Build Something{" "}
              <span className="text-gold">Meaningful</span>
            </h2>
            <p className="text-offwhite/50 max-w-xl mx-auto mb-10 font-light">
              Whether it&apos;s a business venture, research collaboration, or
              community initiative — I&apos;m always open to purposeful
              conversations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="secondary" size="lg">
                Get in Touch
              </Button>
              <Button href="/resume" variant="outline" size="lg">
                <span className="text-offwhite group-hover:text-charcoal">
                  View Resume
                </span>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
