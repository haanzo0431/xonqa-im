'use client';

import Link from 'next/link';
import {
  GraduationCap,
  ArrowRight,
  Play,
  ExternalLink,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// Import built page components directly from their file locations
import AchievementsPage from '@/app/achievements/page';
import ClubsPage from '@/app/clubs/page';
import ContactPage from '@/app/contact/page';
import NewsPage from '@/app/news/page';
import TeachersTeamPage from '@/app/teachers-team/page';
import SchoolProfilePage from '@/app/school-profile/page';

function InstagramIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3v6Z" />
    </svg>
  );
}

function TelegramIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function FacebookIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const RAW_SOCIAL_FEED = [
  { id: '1', platform: 'telegram', defaultTitle: 'School Sports Championship Highlights', defaultDesc: 'Our football team took 2nd place in the regional championship!', imageUrl: 'https://static01.nyt.com/images/2012/07/06/sports/SOCCER/SOCCER-superJumbo.jpg', link: 'https://t.me/SSinKhanka/16000', date: 'Sep 19, 2026' },
  { id: '3', platform: 'telegram', defaultTitle: 'Our National Olympiad Results', defaultDesc: 'See our highest olympiad results', imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop', link: 'https://t.me/SSinKhanka/14222', date: 'March 28, 2026' },
  { id: '5', platform: 'instagram', defaultTitle: 'Successful Graduate Students', defaultDesc: 'Our successful graduates share their experiences!', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQJl10pjURcPWEZ2hCZ1oWEhlbG99ORnsnZkjQbyu-SGJ5MwMeZJw1Gs4&s=10', link: 'https://www.instagram.com/xonqa.im/reel/DXn7HuEDERj/', date: 'Apr 27, 2026' },
  { id: '6', platform: 'telegram', defaultTitle: 'Results on Foreign certificates', defaultDesc: 'Check our IELTS/SAT/National certificates!', imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=8₀&w=8₀₀&auto=format&fit=crop', link: 'https://t.me/SSinKhanka/15778', date: 'Aug 27, 2026' },
  { id: '7', platform: 'youtube', defaultTitle: 'School-Talk Podcast', defaultDesc: 'A school podcast featuring educational and meaningful discussions, led by students.', imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop', link: 'https://youtube.com/@School-Talk1'},
  { id: '8', platform: 'instagram', defaultTitle: 'Students thoughts on the future', defaultDesc: 'Students ideas and thoughts on the future of education', imageUrl: 'question.png', link: 'https://youtube.com/@School-Talk1', date: 'Aug 28, 2026' },
];

function SocialBadge({ platform }) {
  switch (platform) {
    case 'instagram':
      return (
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-lg border-2 border-[var(--bg-page)]">
          <InstagramIcon className="w-5 h-5" />
        </div>
      );
    case 'telegram':
      return (
        <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white shadow-lg border-2 border-[var(--bg-page)]">
          <TelegramIcon className="w-4 h-4 -translate-x-0.5 translate-y-0.5" />
        </div>
      );
    case 'youtube':
      return (
        <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white shadow-lg border-2 border-[var(--bg-page)]">
          <YoutubeIcon className="w-5 h-5" />
        </div>
      );
    case 'facebook':
    default:
      return (
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg border-2 border-[var(--bg-page)]">
          <FacebookIcon className="w-5 h-5" />
        </div>
      );
  }
}

export default function Home() {
  const { t, translations } = useLanguage();

  const socialFeed = RAW_SOCIAL_FEED.map((item) => {
    const translation = translations?.hero?.socialFeed?.[item.id] || {};
    return {
      ...item,
      title: translation.title || item.defaultTitle,
      description: translation.description || item.defaultDesc,
    };
  });

  const marqueeItems = [...socialFeed, ...socialFeed];

  return (
    <div className="theme-bg-page theme-text-primary selection:bg-amber-500 selection:text-black min-h-screen flex flex-col justify-between overflow-x-hidden scroll-smooth bg-ambient-glow">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden">
        
        {/* Integrated Right-Side Floating Gallery */}
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-3/5 lg:w-1/2 pointer-events-none z-0 overflow-hidden flex items-center justify-end">
          <div className="relative w-[130%] h-[130%] md:w-[150%] flex items-center justify-center -rotate-6 scale-110 opacity-40 md:opacity-70 transition-transform duration-1000">
             <div className="grid grid-cols-3 gap-4 md:gap-6">
                <div className="flex flex-col gap-4 md:gap-6 -mt-24">
                   <img src="lesson_5.jpg" className="rounded-3xl object-cover w-32 h-48 md:w-48 md:h-64 shadow-2xl border-4 border-white/5" alt="Demo 1" />
                   <img src="lesson_6.jpg" className="rounded-3xl object-cover w-32 h-56 md:w-48 md:h-80 shadow-2xl border-4 border-white/5" alt="Demo 2" />
                </div>
                <div className="flex flex-col gap-4 md:gap-6 mt-12">
                   <img src="lesson_4.jpg" className="rounded-3xl object-cover w-32 h-56 md:w-48 md:h-80 shadow-2xl border-4 border-white/5" alt="Demo 3" />
                   <img src="lesson_3.jpg" className="rounded-3xl object-cover w-32 h-48 md:w-48 md:h-64 shadow-2xl border-4 border-white/5" alt="Demo 4" />
                </div>
                <div className="flex flex-col gap-4 md:gap-6 -mt-16">
                   <img src="lesson_2.jpg" className="rounded-3xl object-cover w-32 h-48 md:w-48 md:h-64 shadow-2xl border-4 border-white/5" alt="Demo 5" />
                   <img src="lesson_1.jpg" className="rounded-3xl object-cover w-32 h-56 md:w-48 md:h-80 shadow-2xl border-4 border-white/5" alt="Demo 6" />
                </div>
             </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-page)] via-[var(--bg-page)]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-page)] via-transparent to-[var(--bg-page)]/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-page)] via-transparent to-transparent opacity-80" />
        </div>

        {/* Hero Content Layer */}
        <div className="relative z-10 px-6 pt-12 pb-6 max-w-7xl mx-auto w-full my-auto">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase backdrop-blur-md">
              <GraduationCap className="w-4 h-4 shrink-0 text-amber-500" />
              <span className="leading-tight">
                {t('hero', 'agencyBadge')}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight theme-text-primary leading-[1.1]">
              {t('hero', 'headingTitle')} <span className="text-amber-500">{t('hero', 'headingAccent')}</span>
            </h1>

            <p className="theme-text-secondary text-sm md:text-base max-w-xl leading-relaxed">
              {t('hero', 'subtitle')}
            </p>

            <div>
              <a
                href="#clubs"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black px-6 py-3.5 rounded-full text-xs font-bold transition-all shadow-lg"
              >
                {t('hero', 'exploreClubs')} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* MARQUEE TICKER */}
        <div className="relative z-10 w-full py-8 mt-auto">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[var(--bg-page)] to-transparent z-20" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[var(--bg-page)] to-transparent z-20" />

          <div className="overflow-hidden w-full">
            <div className="animate-marquee transform-gpu gap-6 pl-6">
              {marqueeItems.map((item, index) => (
                <a
                  key={`${item.id}-${index}`}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col items-center shrink-0 w-[280px] md:w-[320px] cursor-pointer"
                >
                  <div className="z-10 mb-3 transition-transform duration-300 group-hover:scale-110">
                    <SocialBadge platform={item.platform} />
                  </div>

                  <div className="w-full h-[300px] md:h-[340px] rounded-3xl overflow-hidden relative bg-zinc-900 border-none outline-none ring-0 shadow-2xl isolate transform-gpu transition-transform duration-300 group-hover:-translate-y-1">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {(item.platform === 'youtube' || item.platform === 'instagram') && (
                      <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white opacity-80 group-hover:opacity-100 transition-opacity">
                        <Play className="w-4 h-4 fill-white" />
                      </div>
                    )}

                    <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-zinc-950 via-zinc-950/85 to-transparent text-white flex flex-col justify-end pt-12">
                      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-300 mb-1.5">
                        <span className="uppercase tracking-wider font-semibold text-amber-400">
                          {item.platform}
                        </span>
                        <span>{item.date}</span>
                      </div>

                      <h3 className="font-serif font-bold text-base text-white leading-snug mb-1.5 line-clamp-1">
                        {item.title}
                      </h3>

                      <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2 mb-3">
                        {item.description}
                      </p>

                      <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-400">
                        <span>{t('hero', 'openPost')}</span>
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TEACHERS SECTION */}
      <section id="teachers-team" className="min-h-[calc(100vh-4rem)] flex flex-col justify-center scroll-mt-16 py-12 border-t theme-border">
        <TeachersTeamPage />
      </section>

      {/* HONORS / ACHIEVEMENTS SECTION */}
      <section id="achievements" className="min-h-[calc(100vh-4rem)] flex flex-col justify-center scroll-mt-16 py-12 border-t theme-border">
        <AchievementsPage />
      </section>

      {/* CLUBS SECTION */}
      <section id="clubs" className="min-h-[calc(100vh-4rem)] flex flex-col justify-center scroll-mt-16 py-12 border-t theme-border">
        <ClubsPage />
      </section>

      {/* NEWS SECTION */}
      <section id="news" className="min-h-[calc(100vh-4rem)] flex flex-col justify-center scroll-mt-16 py-12 border-t theme-border">
        <NewsPage />
      </section>

      {/* SCHOOL PROFILE SECTION */}
      <section id="school-profile" className="min-h-[calc(100vh-4rem)] flex flex-col justify-center scroll-mt-16 py-12 border-t theme-border">
        <SchoolProfilePage />
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="min-h-[calc(100vh-4rem)] flex flex-col justify-center scroll-mt-16 py-12 border-t theme-border">
        <ContactPage />
      </section>

    </div>
  );
}
