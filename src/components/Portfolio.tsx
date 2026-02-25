"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Home } from "./Home";
import { Projects } from "./Projects";
import { About } from "./About";
import { Contact } from "./Contact";
import { cn } from "@/lib/utils";
import { useLanguage } from "./LanguageContext";

type Screen = "home" | "work" | "about" | "contact";
const SCREENS: Screen[] = ["home", "work", "about", "contact"];

export default function Portfolio() {
    const [activeScreen, setActiveScreen] = useState<Screen>("home");
    const isScrolling = useRef(false);
    const { language, toggleLanguage, t } = useLanguage();

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (isScrolling.current) return;

            const currentIndex = SCREENS.indexOf(activeScreen);

            if (e.deltaY > 50) { // Scroll down
                if (currentIndex < SCREENS.length - 1) {
                    isScrolling.current = true;
                    setActiveScreen(SCREENS[currentIndex + 1]);
                    setTimeout(() => isScrolling.current = false, 1000);
                }
            } else if (e.deltaY < -50) { // Scroll up
                if (currentIndex > 0) {
                    isScrolling.current = true;
                    setActiveScreen(SCREENS[currentIndex - 1]);
                    setTimeout(() => isScrolling.current = false, 1000);
                }
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: false });
        // Prevent default scrolling on body to allow only section transitions
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("wheel", handleWheel);
            document.body.style.overflow = "auto";
        };
    }, [activeScreen]);

    const navigatePrev = () => {
        const currentIndex = SCREENS.indexOf(activeScreen);
        if (currentIndex > 0) setActiveScreen(SCREENS[currentIndex - 1]);
    };

    const navigateNext = () => {
        const currentIndex = SCREENS.indexOf(activeScreen);
        if (currentIndex < SCREENS.length - 1) setActiveScreen(SCREENS[currentIndex + 1]);
    };

    const renderScreen = () => {
        switch (activeScreen) {
            case "home":
                return <Home key="home" onNavigate={setActiveScreen} />;
            case "work":
                return <Projects key="work" onNavigate={setActiveScreen} />;
            case "about":
                return <About key="about" onNavigate={setActiveScreen} />;
            case "contact":
                return <Contact key="contact" onNavigate={setActiveScreen} />;
            default:
                return <Home key="home" onNavigate={setActiveScreen} />;
        }
    };

    return (
        <>
            {/* Shared Sticky Header from Stitch Templates */}
            <header className="fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300">
                <div className="max-w-[980px] mx-auto px-6 h-[52px] flex items-center justify-between">
                    {/* Top Left: Logo */}
                    <button
                        onClick={() => setActiveScreen("home")}
                        className="text-text-main dark:text-white font-semibold text-lg tracking-tight hover:opacity-70 transition-opacity"
                    >
                        Ivan Bondarenco
                    </button>

                    {/* Navigation and Language Toggle */}
                    <div className="flex items-center gap-6 md:gap-8">
                        <nav className="nav-links flex gap-6 md:gap-8">
                            <button
                                onClick={() => setActiveScreen("work")}
                                className={cn(
                                    "text-xs font-medium transition-all duration-200",
                                    activeScreen === "work"
                                        ? "text-primary dark:text-cupertino-accent"
                                        : "text-text-main dark:text-white"
                                )}
                            >
                                {t.nav.work}
                            </button>
                            <button
                                onClick={() => setActiveScreen("about")}
                                className={cn(
                                    "text-xs font-medium transition-all duration-200",
                                    activeScreen === "about"
                                        ? "text-primary dark:text-cupertino-accent"
                                        : "text-text-main dark:text-white"
                                )}
                            >
                                {t.nav.about}
                            </button>
                            <button
                                onClick={() => setActiveScreen("contact")}
                                className={cn(
                                    "text-xs font-medium transition-all duration-200",
                                    activeScreen === "contact"
                                        ? "text-primary dark:text-cupertino-accent"
                                        : "text-text-main dark:text-white"
                                )}
                            >
                                {t.nav.contact}
                            </button>
                        </nav>

                        {/* Separator */}
                        <div className="h-4 w-[1px] bg-border-light dark:bg-border-dark hidden md:block"></div>

                        {/* iOS-Style Language Toggle Switch */}
                        <button
                            onClick={toggleLanguage}
                            className="relative flex items-center justify-between w-[44px] h-[24px] rounded-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-[2px] backdrop-blur-sm transition-colors cursor-pointer group hover:bg-zinc-200 dark:hover:bg-zinc-800"
                            aria-label="Toggle language"
                        >
                            <span className="text-[9px] font-semibold text-text-muted w-1/2 text-center z-0 select-none">EN</span>
                            <span className="text-[9px] font-semibold text-text-muted w-1/2 text-center z-0 select-none">ES</span>

                            <div
                                className={cn(
                                    "absolute top-[2px] bottom-[2px] w-[18px] bg-white dark:bg-zinc-700 rounded-full shadow-sm shadow-black/10 flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-10",
                                    language === "es" ? "left-[22px]" : "left-[2px]"
                                )}
                            >
                                <span className="text-[9px] font-bold text-text-main dark:text-gray-200 select-none">
                                    {language === "en" ? "EN" : "ES"}
                                </span>
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            {/* Global Top Arrow */}
            <AnimatePresence>
                {activeScreen !== "home" && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="fixed top-16 left-0 right-0 z-40 flex justify-center pointer-events-none"
                    >
                        <button
                            onClick={navigatePrev}
                            className="cursor-pointer pointer-events-auto text-text-muted hover:text-primary transition-colors flex flex-col items-center gap-1 group"
                        >
                            <span className="material-symbols-outlined text-3xl group-hover:-translate-y-2 transition-transform duration-300">keyboard_arrow_up</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Global Bottom Arrow */}
            <AnimatePresence>
                {activeScreen !== "contact" && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="fixed bottom-6 left-0 right-0 z-40 flex justify-center pointer-events-none"
                    >
                        <button
                            onClick={navigateNext}
                            className="cursor-pointer pointer-events-auto text-text-muted hover:text-primary transition-colors flex flex-col items-center gap-1 group"
                        >
                            <span className="material-symbols-outlined text-3xl group-hover:translate-y-2 transition-transform duration-300 animate-bounce">keyboard_arrow_down</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content Area with Transitions */}
            <main className="relative h-screen w-full flex flex-col justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeScreen}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full flex-grow flex flex-col"
                    >
                        {renderScreen()}
                    </motion.div>
                </AnimatePresence>
            </main>
        </>
    );
}
