"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { en, Translations } from "../locales/en";
import { es } from "../locales/es";

type Language = "en" | "es";

interface LanguageContextProps {
    language: Language;
    toggleLanguage: () => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>("en");

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === "en" ? "es" : "en"));
    };

    const t = language === "en" ? en : es;

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
