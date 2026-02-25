"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "./LanguageContext";

interface AboutProps {
    onNavigate?: (screen: "home" | "work" | "about" | "contact") => void;
}

const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
};

export function About({ onNavigate }: AboutProps) {
    const { t } = useLanguage();

    return (
        <main className="h-screen w-full flex flex-col items-center justify-center">
            <section className="w-full max-w-[980px] px-6 flex flex-col justify-center pt-8">
                {/* Section Headline */}
                <motion.div
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-6 md:mb-8"
                >
                    <h2 className="text-[32px] md:text-[48px] leading-[1.05] font-semibold text-text-main dark:text-white tracking-tighter">
                        {t.about.title}
                    </h2>
                </motion.div>

                {/* Technical Spec Sheet Grid */}
                <div className="w-full flex flex-col">
                    {/* Row 1: Profile */}
                    <motion.div
                        variants={fadeUpVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="group border-t border-border-light dark:border-border-dark py-4 md:py-6 grid grid-cols-1 md:grid-cols-12 gap-y-2"
                    >
                        <div className="md:col-span-4 lg:col-span-3">
                            <span className="text-[12px] font-bold text-text-muted uppercase tracking-wide">
                                {t.about.profileLabel}
                            </span>
                        </div>
                        <div className="md:col-span-8 lg:col-span-9">
                            <p className="text-[15px] leading-relaxed text-text-main dark:text-gray-200 font-normal">
                                {t.about.profileText}
                            </p>
                        </div>
                    </motion.div>

                    {/* Row 2: Technology Stack */}
                    <motion.div
                        variants={fadeUpVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="group border-t border-border-light dark:border-border-dark py-4 md:py-6 grid grid-cols-1 md:grid-cols-12 gap-y-2"
                    >
                        <div className="md:col-span-4 lg:col-span-3">
                            <span className="text-[12px] font-bold text-text-muted uppercase tracking-wide">
                                {t.about.technologyLabel}
                            </span>
                        </div>
                        <div className="md:col-span-8 lg:col-span-9">
                            <div className="flex flex-wrap gap-2">
                                {["AI Tools", "Java", "Base de Datos", "GeneXus", "Web3", "Linux"].map(
                                    (tech) => (
                                        <span
                                            key={tech}
                                            className="inline-flex items-center px-3 py-1 rounded-full bg-surface-light dark:bg-surface-dark text-[12px] font-medium text-text-main dark:text-gray-200 border border-transparent hover:border-border-light dark:hover:border-border-dark transition-colors cursor-default"
                                        >
                                            {tech}
                                        </span>
                                    )
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Row 3: Timeline */}
                    <motion.div
                        variants={fadeUpVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="group border-t border-border-light dark:border-border-dark py-4 md:py-6 grid grid-cols-1 md:grid-cols-12 gap-y-2"
                    >
                        <div className="md:col-span-4 lg:col-span-3">
                            <span className="text-[12px] font-bold text-text-muted uppercase tracking-wide">
                                {t.about.timelineLabel}
                            </span>
                        </div>
                        <div className="md:col-span-8 lg:col-span-9 flex flex-col gap-4">
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[15px] font-semibold text-text-main dark:text-white">
                                    {t.about.timeline.currentJob}
                                </span>
                                <span className="text-[13px] text-text-muted">{t.about.timeline.currentCompany} • {t.about.timeline.currentDate}</span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[15px] font-semibold text-text-main dark:text-white">
                                    {t.about.timeline.pastJob}
                                </span>
                                <span className="text-[13px] text-text-muted">{t.about.timeline.pastCompany} • {t.about.timeline.pastDate}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Row 4: Approach */}
                    <motion.div
                        variants={fadeUpVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="group border-y border-border-light dark:border-border-dark py-4 md:py-6 grid grid-cols-1 md:grid-cols-12 gap-y-2"
                    >
                        <div className="md:col-span-4 lg:col-span-3">
                            <span className="text-[12px] font-bold text-text-muted uppercase tracking-wide">
                                {t.about.approachLabel}
                            </span>
                        </div>
                        <div className="md:col-span-8 lg:col-span-9">
                            <p className="text-[15px] leading-relaxed text-text-main dark:text-gray-200 font-normal">
                                {t.about.approachText}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
