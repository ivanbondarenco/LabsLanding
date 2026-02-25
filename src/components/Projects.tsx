"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, ArrowLeft, Lightbulb } from "lucide-react";
import { useLanguage } from "./LanguageContext";

interface ProjectsProps {
    onNavigate?: (screen: "home" | "work" | "about" | "contact") => void;
}

const ProtocolIcon = ({ className, strokeWidth }: { className?: string; strokeWidth?: number }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} strokeWidth={strokeWidth}>
        <text x="45%" y="53%" dominantBaseline="middle" textAnchor="middle" fill="currentColor" fontFamily="Georgia, 'Times New Roman', serif" fontSize="23" fontWeight="bold">
            P.
        </text>
    </svg>
);

const projects = [
    {
        title: "Protocol",
        descKey: "protocolDesc" as const,
        icon: ProtocolIcon,
        colorFrom: "from-[#fcfcfc]",
        colorTo: "to-[#efefef]",
        iconColor: "text-black",
        glowColor: "bg-gray-200/50 dark:bg-gray-600/20",
        link: "https://protocol-frontend.o3ncbr.easypanel.host/",
    },
    // {
    //     title: "Nuevo Proyecto",
    //     descKey: "newProjectDesc" as const,
    //     icon: Lightbulb,
    //     colorFrom: "from-orange-50",
    //     colorTo: "to-amber-100",
    //     iconColor: "text-orange-400",
    //     glowColor: "bg-orange-50/50 dark:bg-orange-900/20",
    //     link: "https://tue-link.com",
    // },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
};

export function Projects({ onNavigate }: ProjectsProps) {
    const { t } = useLanguage();

    return (
        <section className="w-full h-screen px-6 pt-16 flex flex-col items-center justify-center">
            <div className="mx-auto max-w-[980px] w-full flex flex-col h-full justify-center">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-8 text-center"
                >
                    <h2 className="text-text-main dark:text-white text-[32px] md:text-[40px] font-semibold leading-tight tracking-tight-ios">
                        {t.projects.title}
                    </h2>
                    <p className="mt-2 text-lg text-text-muted font-normal max-w-2xl mx-auto">
                        {t.projects.subtitle}
                    </p>
                </motion.div>

                {/* The Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {projects.map((project, index) => {
                        const Icon = project.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="group relative flex flex-col h-full bg-background-light dark:bg-background-dark rounded-[16px] border border-border-light dark:border-border-dark p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-ios-lift cursor-pointer overflow-hidden"
                            >
                                <div className="mb-4 flex-shrink-0">
                                    {/* Icon / Thumbnail */}
                                    <div
                                        className={`w-12 h-12 rounded-[12px] flex items-center justify-center bg-gradient-to-br ${project.colorFrom} ${project.colorTo} shadow-inner`}
                                    >
                                        <Icon className={`w-6 h-6 ${project.iconColor}`} strokeWidth={1.5} />
                                    </div>
                                </div>
                                <div className="flex flex-col flex-grow z-10 w-full">
                                    <h3 className="text-[19px] font-semibold text-text-main dark:text-white mb-2 tracking-tight-ios truncate">
                                        {project.title}
                                    </h3>
                                    <p className="text-[15px] leading-relaxed text-text-muted mb-4 flex-grow line-clamp-3">
                                        {t.projects[project.descKey]}
                                    </p>
                                    <div className="mt-auto pt-2 flex items-center text-primary text-[15px] font-normal group-hover:underline">
                                        {(project as any).link ? (
                                            <a
                                                href={(project as any).link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center w-full h-full relative z-20"
                                            >
                                                {t.projects.visitApp} <ArrowRight className="w-4 h-4 ml-1" />
                                            </a>
                                        ) : (
                                            <>
                                                {t.projects.viewCaseStudy} <ArrowRight className="w-4 h-4 ml-1" />
                                            </>
                                        )}
                                    </div>
                                </div>
                                {/* Subtle Background Decoration */}
                                <div
                                    className={`absolute -right-10 -bottom-10 w-32 h-32 ${project.glowColor} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                                ></div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
