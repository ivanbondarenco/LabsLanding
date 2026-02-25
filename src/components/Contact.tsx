"use client";

import { motion, Variants } from "framer-motion";
import { Github, Linkedin, Mail, ArrowLeft } from "lucide-react";
import { useLanguage } from "./LanguageContext";

interface ContactProps {
    onNavigate?: (screen: "home" | "work" | "about" | "contact") => void;
}

const DiscordIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="none"
        className={className}
    >
        <path d="M19.349 5.862a14.886 14.886 0 0 0-3.69-1.127.058.058 0 0 0-.063.028 10.372 10.372 0 0 0-1.222 2.508 14.195 14.195 0 0 0-4.757 0 10.395 10.395 0 0 0-1.233-2.508.058.058 0 0 0-.063-.028 14.869 14.869 0 0 0-3.69 1.127.054.054 0 0 0-.025.021C.585 9.778-.292 13.618.077 17.391a.066.066 0 0 0 .025.045 14.942 14.942 0 0 0 4.542 2.29.058.058 0 0 0 .063-.02l.965-1.564a.057.057 0 0 0-.03-.081 9.942 9.942 0 0 1-1.458-.696.06.06 0 0 1-.006-.098c.097-.074.194-.151.288-.228a.055.055 0 0 1 .057-.008c3.155 1.439 6.565 1.439 9.68 0a.055.055 0 0 1 .057.008c.095.077.191.154.288.228a.06.06 0 0 1-.006.098 10.035 10.035 0 0 1-1.458.696.058.058 0 0 0-.03.081l.965 1.564a.058.058 0 0 0 .063.02 14.936 14.936 0 0 0 4.543-2.29.064.064 0 0 0 .025-.045c.421-4.32-.486-8.15-4.499-11.508a.048.048 0 0 0-.025-.021zM8.33 14.613c-1.116 0-2.036-.91-2.036-2.028s.904-2.029 2.036-2.029c1.144 0 2.048.916 2.035 2.029 0 1.118-.905 2.028-2.035 2.028zm7.339 0c-1.116 0-2.036-.91-2.036-2.028s.904-2.029 2.036-2.029c1.144 0 2.048.916 2.035 2.029 0 1.118-.891 2.028-2.035 2.028z" />
    </svg>
);

const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
};

const staggerContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const iconVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
};

const socialLinks = [
    { icon: Github, href: "https://github.com/ivanbondarenco", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/ivanbondarenco", label: "LinkedIn" },
    { icon: DiscordIcon, href: "https://discordapp.com/users/ivannnb", label: "Discord" },
    { icon: Mail, href: "mailto:hello@ivanbondarenco.com", label: "Email" },
];

export function Contact({ onNavigate }: ContactProps) {
    const { t } = useLanguage();

    return (
        <main className="flex-grow flex flex-col items-center justify-center w-full min-h-[60vh]">
            <section className="relative flex w-full flex-col justify-end py-24">
                <div className="flex w-full flex-col items-center justify-center px-4">

                    {/* CTA Label */}
                    <motion.div
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="mb-8 text-center"
                    >
                        <h4 className="text-text-main dark:text-white text-sm font-medium uppercase tracking-[0.2em]">
                            {t.contact.ctaLabel}
                        </h4>
                    </motion.div>

                    {/* Social Grid */}
                    <motion.div
                        variants={staggerContainerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-row gap-4 mb-16"
                    >
                        {socialLinks.map((social) => {
                            const Icon = social.icon;
                            return (
                                <motion.div key={social.label} variants={iconVariants}>
                                    <a
                                        aria-label={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex h-12 w-12 items-center justify-center rounded-[12px] bg-surface-light transition-all duration-300 ease-out hover:bg-black hover:-translate-y-1 hover:shadow-ios-lift dark:bg-zinc-800 dark:hover:bg-white"
                                    >
                                        <Icon className="w-6 h-6 text-black transition-colors duration-300 group-hover:text-white dark:text-white dark:group-hover:text-black" />
                                    </a>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Copyright & Navigation */}
                    <motion.div
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-center"
                    >
                        <p className="text-[10px] text-text-muted leading-relaxed uppercase tracking-wider">
                            {t.contact.footerTextLine1}<br />
                            {t.contact.footerTextLine2}
                        </p>
                    </motion.div>

                </div>
            </section>
        </main>
    );
}
