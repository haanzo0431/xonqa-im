'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sun, Moon, GraduationCap, ArrowUpRight, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const LANGUAGES = [
  { code: 'EN', name: 'English', flag: '🇬🇧' },
  { code: 'UZ', name: "O'zbek", flag: '🇺🇿' },
  { code: 'RU', name: 'Русский', flag: '🇷🇺' },
];

export default function PublicHeader() {
  const { lang, changeLanguage, t } = useLanguage();
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Theme initialization
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Close dropdown on outside click
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle dark/light theme
  const toggleTheme = () => {
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setCurrentTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  // Change active language
  const handleLangSelect = (langCode) => {
    changeLanguage(langCode);
    setLangMenuOpen(false);
  };

  // Smooth scroll handler for header navigation
  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${targetId}`);
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b theme-border theme-bg-page sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-emerald-500/20 shrink-0 bg-emerald-500/10 flex items-center justify-center">
          <Image
            src="/school_logo.png"
            alt="School Logo"
            width={120}
            height={120}
            quality={95}
            className="object-cover w-full h-full"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
        <div>
          <h1 className="font-serif font-bold text-sm theme-text-primary">Xonqa Region</h1>
          <p className="text-[10px] font-mono theme-text-secondary uppercase tracking-wider">
            {t('nav', 'specializedSchool')}
          </p>
        </div>
      </Link>

      {/* Navigation Links with Smooth Scroll */}
      <nav className="hidden md:flex items-center gap-6 text-xs font-bold theme-text-primary">
        <a
          href="#teachers-team"
          onClick={(e) => scrollToSection(e, 'teachers-team')}
          className="hover:text-emerald-400 transition-colors cursor-pointer"
        >
          {t('nav', 'teachers')}
        </a>
        <a
          href="#achievements"
          onClick={(e) => scrollToSection(e, 'achievements')}
          className="hover:text-emerald-400 transition-colors cursor-pointer"
        >
          {t('nav', 'honors')}
        </a>
        <a
          href="#clubs"
          onClick={(e) => scrollToSection(e, 'clubs')}
          className="hover:text-emerald-400 transition-colors cursor-pointer"
        >
          {t('nav', 'clubs')}
        </a>
        <a
          href="#news"
          onClick={(e) => scrollToSection(e, 'news')}
          className="hover:text-emerald-400 transition-colors cursor-pointer"
        >
          {t('nav', 'news')}
        </a>
        <a
          href="#school-profile"
          onClick={(e) => scrollToSection(e, 'school-profile')}
          className="hover:text-amber-400 font-bold transition-colors cursor-pointer flex items-center gap-1"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          {t('nav', 'profile')}
        </a>
        <a
          href="#contact"
          onClick={(e) => scrollToSection(e, 'contact')}
          className="hover:text-emerald-400 transition-colors cursor-pointer"
        >
          {t('nav', 'contact')}
        </a>
      </nav>

      {/* Language Switcher, Theme Toggle & Apply Button Group */}
      <div className="flex items-center gap-2.5">

        {/* LANGUAGE SWITCHER BUTTON (TO THE LEFT OF THEME BUTTON) */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            aria-label="Select language"
            className="px-2.5 py-1.5 rounded-xl border theme-border theme-bg-card hover:border-emerald-500/40 text-xs font-mono font-bold theme-text-primary flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>{lang}</span>
            <ChevronDown className={`w-3 h-3 text-zinc-400 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Language Dropdown Menu */}
          {langMenuOpen && (
            <div className="absolute right-0 mt-2 w-36 rounded-2xl border theme-border theme-bg-card shadow-2xl p-1.5 space-y-1 z-50 backdrop-blur-xl animate-in fade-in duration-150">
              {LANGUAGES.map((item) => (
                <button
                  key={item.code}
                  onClick={() => handleLangSelect(item.code)}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-mono flex items-center justify-between transition-all cursor-pointer ${
                    lang === item.code
                      ? 'bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30'
                      : 'theme-text-secondary hover:theme-text-primary hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{item.flag}</span>
                    <span>{item.name}</span>
                  </span>
                  {lang === item.code && <span className="text-[10px]">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* DARK / LIGHT THEME TOGGLE BUTTON */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="p-2 rounded-xl border theme-border theme-bg-card hover:border-emerald-500/50 hover:scale-105 transition-all focus:outline-none cursor-pointer"
        >
          {currentTheme === 'dark' ? (
            <Sun className="w-4 h-4 text-emerald-400" />
          ) : (
            <Moon className="w-4 h-4 text-emerald-500" />
          )}
        </button>

        {/* APPLY BUTTON */}
        <a
          href="https://ariza.piima.uz/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-all duration-300 shadow-md hover:shadow-amber-500/25 flex items-center gap-1.5 shrink-0"
        >
          <GraduationCap className="w-4 h-4" />
          <span>{t('nav', 'apply')}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

    </header>
  );
}
