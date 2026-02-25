"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";

interface HomeProps {
    onNavigate: (screen: "work" | "about" | "contact") => void;
}

export function Home({ onNavigate }: HomeProps) {
    const { t } = useLanguage();
    const [typewriterText, setTypewriterText] = useState("");
    const words = t.home.words;

    useEffect(() => {
        let currentWordIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let timeoutId: NodeJS.Timeout;

        const type = () => {
            const currentWord = words[currentWordIndex];

            if (isDeleting) {
                setTypewriterText(currentWord.substring(0, currentCharIndex - 1));
                currentCharIndex--;
            } else {
                setTypewriterText(currentWord.substring(0, currentCharIndex + 1));
                currentCharIndex++;
            }

            let typeSpeed = isDeleting ? 75 : 150;

            if (!isDeleting && currentCharIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 2000;
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentWordIndex = (currentWordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            timeoutId = setTimeout(type, typeSpeed);
        };

        timeoutId = setTimeout(type, 1000);

        return () => clearTimeout(timeoutId);
    }, [words]);

    return (
        <section className="w-full pt-32 pb-20 md:pt-40 md:pb-32 px-6 flex-grow flex items-center justify-center">
            <div className="max-w-[980px] w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">
                {/* Text Content (Left - 60%) */}
                <div className="md:col-span-7 flex flex-col justify-center z-10 order-2 md:order-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h1 className="text-[48px] md:text-[64px] lg:text-[80px] font-bold leading-[1.05] tracking-tighter text-black dark:text-white mb-6">
                            {t.home.titlePrefix}<br />
                            {t.home.titleMid} <span className="text-primary">{typewriterText}</span>
                            <span className="cursor-blink"></span>
                        </h1>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    >
                        <p className="text-text-muted text-lg md:text-xl font-normal leading-relaxed max-w-md">
                            {t.home.subtitle}
                        </p>
                        <div className="mt-8 flex gap-4">
                            <button
                                onClick={() => onNavigate("work")}
                                className="inline-flex items-center text-primary text-base font-medium hover:underline decoration-2 underline-offset-4 group"
                            >
                                {t.home.viewProjects}
                                <span className="material-symbols-outlined text-sm ml-1 transition-transform group-hover:translate-x-1">
                                    arrow_forward_ios
                                </span>
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Visual Content (Right - 40%) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                    className="md:col-span-5 relative flex justify-center md:justify-end order-1 md:order-2"
                >
                    {/* Abstract Galaxy Image Container */}
                    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                        <div className="absolute inset-0 bg-gradient-to-tr from-gray-200 to-transparent dark:from-gray-800 rounded-full blur-3xl opacity-50 scale-90"></div>
                        <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl transition-transform duration-700 hover:scale-[1.02] animate-[spin_120s_linear_infinite]">
                            {/* Note: The image src from stitch is hardcoded here */}
                            <img
                                alt="High contrast black and white artistic view of the Andromeda Galaxy representing infinite potential"
                                className="w-full h-full object-cover grayscale contrast-125 hover:contrast-100 transition-all duration-700"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVpZV6JPo9zpr8aLKWuOCJR3nwrlWpyRdkil1pCzHyTr9chR_a8fpOaKGTlzWzvadTMwbJKpR37jNGXYlJUu3VrOMmGqllm31ObgSlIsvHjx4aT1niBtJprWuLYAtMDyqYMWXFcdBCFA6xHqPnwDz7JeMQf6DLmgdlUUmbIVqqnpwPFv9ayZzcd8Fr2WPexg_Jo46dNPr_y8Aj_k42hyrDMfpQLKQu1j6rB-FT1OUUvwaWT8tOsoB9agLEbmRO90nUBOoMtEmT3KVy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background-light/20 via-transparent to-transparent dark:from-background-dark/20 mix-blend-overlay"></div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator (Subtle hint) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="absolute bottom-8 left-0 right-0 flex justify-center"
            >
                <button
                    onClick={() => onNavigate("work")}
                    className="flex flex-col items-center gap-2 text-text-muted hover:text-primary transition-colors duration-300 group cursor-pointer"
                >
                    <span className="text-[10px] uppercase tracking-wide font-medium">{t.home.discover}</span>
                    <span className="material-symbols-outlined text-xl animate-bounce">keyboard_arrow_down</span>
                </button>
            </motion.div>
        </section>
    );
}
