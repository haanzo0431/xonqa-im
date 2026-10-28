'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full border-t theme-border theme-bg-page py-6 px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs theme-text-secondary font-mono">
      <p className="text-center sm:text-left">
        © 2026 {t('footer', 'schoolName')}. <strong>{t('footer', 'rights')}</strong>
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
        {/* Creator Rectangle Button */}
        <a
          href="https://haanzo0431.github.io/personal-website/index.html"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 border border-zinc-700/60 bg-zinc-900/50 hover:bg-amber-500 hover:border-amber-500 hover:text-black text-[10px] font-mono text-zinc-400 flex items-center gap-1.5 rounded-[2px] transition-all duration-300 shadow-sm group"
        >
          <span>{t('footer', 'creator')}</span>
          <span className="font-bold theme-text-primary group-hover:text-black transition-colors">
            Behruz O'ktamboyev
          </span>
        </a>

        <a
          href="https://t.me/SSinKhanka"
          target="_blank"
          rel="noreferrer"
          className="hover:text-amber-500 transition-colors"
        >
          Telegram
        </a>

        <a
          href="https://www.instagram.com/xonqa"
          target="_blank"
          rel="noreferrer"
          className="hover:text-amber-500 transition-colors"
        >
          Instagram
        </a>

        <a
          href="https://facebook.com/SSinKhanka"
          target="_blank"
          rel="noreferrer"
          className="hover:text-amber-500 transition-colors"
        >
          Facebook
        </a>

        <a
          href="http://www.youtube.com/@SSinKhanka"
          target="_blank"
          rel="noreferrer"
          className="hover:text-amber-500 transition-colors"
        >
          YouTube
        </a>
      </div>
    </footer>
  );
}
