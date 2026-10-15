'use client';

import {
  FileText,
  Download,
  ExternalLink,
  ShieldCheck,
  Building,
  GraduationCap,
  Award,
  Globe,
  Calendar,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function SchoolProfilePage() {
  const { t } = useLanguage();

  // Replace "PUT_YOUR_PDF_SCHOOL_PROFILE_NAME_HERE.pdf" with your exact file name placed inside the /public folder
  const pdfFileName = "Xonqa IM profile.pdf";
  const pdfFilePath = `/${pdfFileName}`;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-12">
      {/* Background Glow */}
      <div className="relative overflow-hidden rounded-3xl theme-bg-card border theme-border p-8 md:p-12 shadow-2xl space-y-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

        {/* Top Official Badge */}
        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>{t('profile', 'badge')}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold">
            <Calendar className="w-3.5 h-3.5" />
            <span>{t('profile', 'year')}</span>
          </div>
        </div>

        {/* Main Heading */}
        <div className="relative z-10 space-y-4 max-w-4xl">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold theme-text-primary tracking-tight leading-[1.1]">
            {t('profile', 'title')}
          </h1>
          <p className="theme-text-secondary text-sm md:text-lg font-normal leading-relaxed">
            {t('profile', 'subtitle')}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="relative z-10 flex flex-wrap items-center gap-4 pt-2">
          <a
            href={pdfFilePath}
            download={pdfFileName}
            className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-mono font-bold transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2.5 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
          >
            <Download className="w-4 h-4" />
            <span>{t('profile', 'downloadBtn')}</span>
          </a>

          <a
            href={pdfFilePath}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-2xl theme-bg-page border theme-border hover:border-emerald-500/40 theme-text-primary text-xs font-mono font-bold transition-all flex items-center gap-2.5 hover:-translate-y-0.5 active:translate-y-0"
          >
            <ExternalLink className="w-4 h-4 text-emerald-400" />
            <span>{t('profile', 'viewBtn')}</span>
          </a>
        </div>
      </div>

      {/* Key Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="p-6 rounded-3xl theme-bg-card border theme-border space-y-3 hover:border-emerald-500/30 transition-all">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Building className="w-5 h-5" />
          </div>
          <p className="text-[11px] font-mono theme-text-secondary uppercase tracking-wider font-bold">
            {t('profile', 'affiliation')}
          </p>
          <h3 className="text-base font-serif font-bold theme-text-primary">
            {t('profile', 'affiliationVal')}
          </h3>
          <p className="text-xs theme-text-secondary leading-relaxed">
            {t('profile', 'affiliationDesc')}
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-6 rounded-3xl theme-bg-card border theme-border space-y-3 hover:border-emerald-500/30 transition-all">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
            <GraduationCap className="w-5 h-5" />
          </div>
          <p className="text-[11px] font-mono theme-text-secondary uppercase tracking-wider font-bold">
            {t('profile', 'curriculum')}
          </p>
          <h3 className="text-base font-serif font-bold theme-text-primary">
            {t('profile', 'curriculumVal')}
          </h3>
          <p className="text-xs theme-text-secondary leading-relaxed">
            {t('profile', 'curriculumDesc')}
          </p>
        </div>

        {/* Card 3 */}
        <div className="p-6 rounded-3xl theme-bg-card border theme-border space-y-3 hover:border-emerald-500/30 transition-all">
          <div className="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <p className="text-[11px] font-mono theme-text-secondary uppercase tracking-wider font-bold">
            {t('profile', 'olympiad')}
          </p>
          <h3 className="text-base font-serif font-bold theme-text-primary">
            {t('profile', 'olympiadVal')}
          </h3>
          <p className="text-xs theme-text-secondary leading-relaxed">
            {t('profile', 'olympiadDesc')}
          </p>
        </div>

        {/* Card 4 */}
        <div className="p-6 rounded-3xl theme-bg-card border theme-border space-y-3 hover:border-emerald-500/30 transition-all">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
            <Globe className="w-5 h-5" />
          </div>
          <p className="text-[11px] font-mono theme-text-secondary uppercase tracking-wider font-bold">
            {t('profile', 'global')}
          </p>
          <h3 className="text-base font-serif font-bold theme-text-primary">
            {t('profile', 'globalVal')}
          </h3>
          <p className="text-xs theme-text-secondary leading-relaxed">
            {t('profile', 'globalDesc')}
          </p>
        </div>
      </div>

      {/* Overview Table */}
      <div className="p-8 rounded-3xl theme-bg-card border theme-border space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b theme-border">
          <FileText className="w-6 h-6 text-emerald-400" />
          <div>
            <h2 className="text-xl font-serif font-bold theme-text-primary">
              {t('profile', 'overviewTitle')}
            </h2>
            <p className="text-xs theme-text-secondary">{t('profile', 'overviewSubtitle')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="flex items-center justify-between p-3.5 rounded-2xl theme-bg-page border theme-border">
            <span className="theme-text-secondary">{t('profile', 'officialName')}</span>
            <span className="theme-text-primary font-bold">Xonqa tuman Ixtisoslashtirilgan Maktabi</span>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-2xl theme-bg-page border theme-border">
            <span className="theme-text-secondary">{t('profile', 'location')}</span>
            <span className="theme-text-primary font-bold">Mustaqillik street 59-a, Khorezm</span>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-2xl theme-bg-page border theme-border">
            <span className="theme-text-secondary">{t('profile', 'governingBody')}</span>
            <span className="text-amber-400 font-bold">PIIMA Agency Uzbekistan</span>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-2xl theme-bg-page border theme-border">
            <span className="theme-text-secondary">{t('profile', 'officialContact')}</span>
            <span className="text-emerald-400 font-bold">ixm313@piima.uz</span>
          </div>
        </div>
      </div>
    </div>
  );
}
