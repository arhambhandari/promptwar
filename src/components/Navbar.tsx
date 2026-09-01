"use client";
import Link from "next/link";
import { useLanguage, languageNames, Language } from "../context/LanguageContext";

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="bg-surface-container-lowest border-b border-outline-variant sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-container-max mx-auto px-margin-desktop py-4">
        {/* Brand */}
        <Link href="/" className="text-headline-md font-headline-md font-bold tracking-tighter text-primary">
          CENSUS 2027
        </Link>
        
        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-200">
            {t("home")}
          </Link>
          <Link href="/dashboard" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-200">
            {t("dashboard")}
          </Link>
          <Link href="/privacy" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-200">
            {t("privacy")}
          </Link>
        </nav>
        
        {/* Trailing Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-on-surface-variant">
              <select 
                value={lang} 
                onChange={(e) => setLang(e.target.value as Language)}
                className="bg-surface-container-lowest text-on-surface-variant border border-outline-variant rounded px-2 py-1 outline-none font-label-sm"
              >
                {(Object.entries(languageNames) as [Language, string][]).map(([code, name]) => (
                  <option key={code} value={code}>{name}</option>
                ))}
              </select>
          </div>
          
          <Link href="/enumeration" className="font-label-md text-label-md bg-primary text-on-primary px-6 py-2 rounded hover:opacity-90 transition-opacity">
            {t("begin_enrollment")}
          </Link>
        </div>
      </div>
    </header>
  );
}
