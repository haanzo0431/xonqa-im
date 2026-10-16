'use client';

import { useState } from 'react';
import { YEAR_METRICS, ACHIEVEMENTS } from '@/data/achievements';
import { Calendar } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function AchievementHub() {
  const { t, translations } = useLanguage();
  const [selectedYear, setSelectedYear] = useState('2025-2026');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const years = ['2025-2026'];

  const categories = [
    { id: 'all', label: translations?.achievements?.categories?.all || 'All Heroes' },
    { id: 'prodigies', label: translations?.achievements?.categories?.prodigies || 'Prodigies & Olympiads' },
    { id: 'acceptances', label: translations?.achievements?.categories?.acceptances || 'Uni Acceptances' },
    { id: 'team', label: translations?.achievements?.categories?.team || 'Team Wins' },
  ];

  // Filter achievements by both Academic Year and Category
  const baseAchievements = ACHIEVEMENTS.filter((item) => {
    const matchesYear = item.year === selectedYear;
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    return matchesYear && matchesCategory;
  });

  const filteredAchievements = baseAchievements.map((item) => {
    const itemData = translations?.achievements?.items?.[item.id] || {};
    return {
      ...item,
      title: itemData.title || item.title,
      detail: itemData.detail || item.detail,
    };
  });

  const rawMetrics = YEAR_METRICS[selectedYear] || [];

  // Dynamic Metric Labels
  const metrics = rawMetrics.map((m) => {
    let translatedLabel = m.label;
    if (m.label === 'The admission rate') translatedLabel = translations?.achievements?.metrics?.admissionRate || m.label;
    if (m.label === 'Total certificates') translatedLabel = translations?.achievements?.metrics?.totalCertificates || m.label;
    if (m.label === 'Top IELTS/SAT Score') translatedLabel = translations?.achievements?.metrics?.topScore || m.label;
    if (m.label === 'Total Scholarships') translatedLabel = translations?.achievements?.metrics?.totalScholarships || m.label;
    return { ...m, label: translatedLabel };
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 space-y-8 overflow-hidden">
      {/* Header & Combined Controls */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b theme-border">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold theme-text-primary">
              {t('achievements', 'honorWallTitle')}
            </h2>
            <p className="text-xs theme-text-secondary mt-1">
              {t('achievements', 'honorWallSubtitle')}
            </p>
          </div>

          {/* Academic Year Selector Bar */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl theme-bg-card border theme-border self-start md:self-auto">
            {years.map((year) => {
              const isActive = selectedYear === year;
              return (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                      : 'theme-text-secondary hover:theme-text-primary hover:bg-white/5'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  {year}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-medium transition-all border cursor-pointer ${
                  isActive
                    ? 'bg-amber-500/15 border-amber-500/50 text-amber-400 shadow-md shadow-amber-500/10'
                    : 'theme-bg-card theme-border theme-text-secondary hover:theme-text-primary'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Metric Stats Banner for Selected Academic Year */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {metrics.map((m, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 rounded-2xl theme-bg-card border theme-border space-y-1"
          >
            <div className="flex items-center justify-between text-xs theme-text-secondary font-mono">
              <span className="truncate pr-2">{m.label}</span>
              <span className="text-[10px] opacity-60 shrink-0">{selectedYear}</span>
            </div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-amber-400">
              {m.value}
            </div>
          </div>
        ))}
      </div>

      {/* Cards Grid */}
      {filteredAchievements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {filteredAchievements.map((item) => (
            <div
              key={item.id}
              className="p-5 sm:p-6 rounded-3xl theme-bg-card border theme-border space-y-4 hover:border-emerald-500/30 transition-all group relative overflow-hidden"
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${
                    item.badgeColor === 'emerald'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : item.badgeColor === 'amber'
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                      : 'bg-sky-500/10 border-sky-500/30 text-sky-400'
                  }`}
                >
                  {item.badge}
                </span>
                <span className="text-xs font-mono theme-text-secondary">
                  {item.date}
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-serif font-bold theme-text-primary group-hover:text-emerald-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs theme-text-secondary mt-1">
                  {item.subtitle}
                </p>
              </div>

              {item.detail && (
                <p className="text-xs font-mono text-emerald-400/90 pt-2 border-t theme-border leading-relaxed">
                  {item.detail}
                </p>
              )}

              {item.teamName && (
                <div className="pt-2 border-t theme-border flex items-center justify-between text-xs font-mono">
                  <span className="theme-text-secondary">Team</span>
                  <span className="text-sky-400 font-bold">{item.teamName}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 sm:p-12 text-center rounded-3xl theme-bg-card border theme-border space-y-2">
          <p className="text-sm font-mono theme-text-secondary">
            No achievements recorded under "{categories.find((c) => c.id === selectedCategory)?.label}" for {selectedYear}.
          </p>
          <button
            onClick={() => setSelectedCategory('all')}
            className="text-xs text-emerald-400 hover:underline font-mono cursor-pointer"
          >
            Reset to All Heroes
          </button>
        </div>
      )}
    </div>
  );
}
