'use client';

import { Newspaper, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function EditorialNewsPage() {
  const { t, translations } = useLanguage();
  const newsData = translations?.news || {};

  const featured = {
    category: newsData?.featured?.category || 'Our Cover',
    title: newsData?.featured?.title || 'Students of Khanka Specialized School Visit Agrobank’s Khanka Branch',
    subtitle: newsData?.featured?.subtitle || '11th-grade students of Khonqa Specialized School visited Agrobank’s Khonqa branch...',
    readTime: '3 min read',
    imageUrl: 'agrobank.webp',
    articleUrl: 'https://t.me/SSinKhanka/16279',
  };

  const secondary = [
    {
      id: 'sec-1',
      category: newsData?.secondary?.[0]?.category || 'Biology & Chemistry',
      title: newsData?.secondary?.[0]?.title || '5th place in the National Biology competition',
      readTime: '6 min read',
      imageUrl: 'biology_5th.webp',
      summary: newsData?.secondary?.[0]?.summary || 'Her achievement earned her an additional 50% scholarship...',
      articleUrl: 'https://t.me/SSinKhanka/14222',
    },
    {
      id: 'sec-2',
      category: newsData?.secondary?.[1]?.category || 'Certificates',
      title: newsData?.secondary?.[1]?.title || '2025-2026 Results reveal the BEST performance yet',
      readTime: '1 min read',
      imageUrl: 'certificates-1001.webp',
      summary: newsData?.secondary?.[1]?.summary || 'We have achieved over 300 national and international certificates.',
      articleUrl: 'https://t.me/SSinKhanka/15635',
    },
    {
      id: 'sec-3',
      category: newsData?.secondary?.[2]?.category || 'Arts & Drama',
      title: newsData?.secondary?.[2]?.title || 'Khanka Specialized School Students Participate in the “Theatre Is a School of Life” Competition',
      readTime: '2 min read',
      imageUrl: 'turon.webp',
      summary: newsData?.secondary?.[2]?.summary || 'Students of Khanka Specialized School showcased their acting skills...',
      articleUrl: 'https://t.me/SSinKhanka/13775',
    },
  ];

  const sidebar = [
    {
      id: 'col-1',
      category: newsData?.sidebar?.[0]?.category || 'International News',
      title: newsData?.sidebar?.[0]?.title || 'Firdavs Axmedov, Khanka Specialized School Principal, Completes Training in China',
      imageUrl: 'director_1234.webp',
      readTime: '3 min read',
      articleUrl: 'https://t.me/SSinKhanka/15819',
    },
    {
      id: 'col-2',
      category: newsData?.sidebar?.[1]?.category || 'Sports',
      title: newsData?.sidebar?.[1]?.title || 'Regional Football Tournament Highlights and Team Standings',
      imageUrl: 'footballship.webp',
      readTime: '1 min read',
      articleUrl: 'https://t.me/SSinKhanka/16000',
    },
    {
      id: 'col-3',
      category: newsData?.sidebar?.[2]?.category || 'Teachers',
      title: newsData?.sidebar?.[2]?.title || 'Honoring Excellence in Teaching: Umid Matyokubov Recognized for Outstanding Service',
      imageUrl: 'umid_teacher_math.webp',
      readTime: '2 min read',
      articleUrl: 'https://t.me/SSinKhanka/16200',
    },
    {
      id: 'col-4',
      category: newsData?.sidebar?.[3]?.category || 'Olympiads',
      title: newsData?.sidebar?.[3]?.title || 'Regional Olympiad Winners announced',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGO4fJdTcJ3sRp9etQwE8YKa3U-b_XmbuKTZFIgDTURk9a38xE7SRsRDPL&s=10',
      readTime: '4 min read',
      articleUrl: 'https://t.me/SSinKhanka/16597',
    },
  ];

  return (
    <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 py-8 min-h-[calc(100vh-4rem)]">
      
      {/* 1. Page Header */}
      <div className="flex items-center gap-3 border-b-2 border-amber-500 pb-4 mb-8">
        <Newspaper className="w-8 h-8 text-amber-500" />
        <div>
          <h1 className="text-4xl font-serif font-bold theme-text-primary tracking-tight">
            {t('news', 'title')}
          </h1>
          <p className="text-xs theme-text-secondary mt-1 font-mono">
            {t('news', 'subtitle')}
          </p>
        </div>
      </div>

      {/* 2. Main Editorial Grid (Cover + Secondary + Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
        
        {/* LEFT COLUMN: Main Feature & Secondary Stories */}
        <div className="lg:col-span-8 flex flex-col">
          
          {/* Top Feature Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b theme-border pb-8 mb-8">
            {/* Feature Text */}
            <div className="flex flex-col justify-center text-center md:text-left order-2 md:order-1">
              <span className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-3">
                {featured.category}
              </span>
              <a
                href={featured.articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <h2 className="text-3xl md:text-4xl font-serif font-bold theme-text-primary leading-[1.15] mb-3 group-hover:text-amber-400 transition-colors">
                  {featured.title}
                </h2>
              </a>
              <p className="text-sm theme-text-secondary font-serif mb-3">
                {featured.subtitle}
              </p>
              <p className="text-xs theme-text-secondary font-mono mb-5">
                {featured.readTime}
              </p>
              <div>
                <a
                  href={featured.articleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold px-4 py-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-black transition-all"
                >
                  <span>{t('news', 'readFullPost')}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
            
            {/* Feature Image */}
            <a
              href={featured.articleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="order-1 md:order-2 w-full h-[280px] md:h-[360px] rounded-2xl overflow-hidden block border theme-border group"
            >
              <img 
                src={featured.imageUrl}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </a>
          </div>

          {/* Bottom Secondary Stories Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left large secondary story */}
            <div className="flex flex-col md:border-r theme-border md:pr-8">
              <a
                href={secondary[0].articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-48 md:h-56 rounded-2xl overflow-hidden block border theme-border mb-4 group"
              >
                <img
                  src={secondary[0].imageUrl}
                  alt={secondary[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </a>
              <span className="text-amber-500 text-[10px] font-bold uppercase tracking-wider mb-2">
                {secondary[0].category}
              </span>
              <a
                href={secondary[0].articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <h3 className="text-xl font-serif font-bold theme-text-primary leading-tight mb-2 group-hover:text-amber-400 transition-colors">
                  {secondary[0].title}
                </h3>
              </a>
              <p className="text-xs theme-text-secondary mb-3">
                {secondary[0].summary}
              </p>
              <a
                href={secondary[0].articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 hover:underline"
              >
                <span>{t('news', 'readStory')}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Right stacked secondary stories */}
            <div className="flex flex-col gap-6">
              {secondary.slice(1).map((story) => (
                <div key={story.id} className="flex flex-col sm:flex-row gap-4 pb-6 border-b theme-border last:border-0 last:pb-0">
                  <div className="flex-1">
                    <span className="text-amber-500 text-[10px] font-bold uppercase tracking-wider mb-1 block">
                      {story.category}
                    </span>
                    <a
                      href={story.articleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <h3 className="text-base font-serif font-bold theme-text-primary leading-tight mb-2 group-hover:text-amber-400 transition-colors">
                        {story.title}
                      </h3>
                    </a>
                    <p className="text-xs theme-text-secondary mb-2 line-clamp-2">
                      {story.summary}
                    </p>
                    <a
                      href={story.articleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-amber-400 hover:underline"
                    >
                      <span>{t('news', 'openLink')}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <a
                    href={story.articleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-28 h-20 rounded-xl overflow-hidden block border theme-border shrink-0 group"
                  >
                    <img
                      src={story.imageUrl}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar */}
        <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l theme-border pt-8 lg:pt-0 lg:pl-8 flex flex-col">

          {/* Top Sidebar Featured */}
          <div className="mb-8 pb-8 border-b theme-border">
            <a
              href={sidebar[0].articleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-44 rounded-2xl overflow-hidden block border theme-border mb-4 group"
            >
              <img
                src={sidebar[0].imageUrl}
                alt={sidebar[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </a>
            <a
              href={sidebar[0].articleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <h3 className="text-sm font-bold theme-text-primary leading-snug mb-3 group-hover:text-amber-400 transition-colors">
                <span className="font-sans font-bold text-amber-400">{sidebar[0].category}:</span> {sidebar[0].title}
              </h3>
            </a>
            <a
              href={sidebar[0].articleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-amber-500 hover:text-amber-400 font-bold font-mono"
            >
              <span>{t('news', 'openLink')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Columns Header */}
          <div className="flex items-center gap-1.5 mb-6">
            <h3 className="text-xl font-serif font-bold theme-text-primary">{t('news', 'shortNews')}</h3>
          </div>

          {/* Small Vertical Stories */}
          <div className="flex flex-col gap-5">
            {sidebar.slice(1).map((col) => (
              <div key={col.id} className="flex gap-4 items-start border-b theme-border pb-5 last:border-0 last:pb-0">
                <div className="flex-1">
                  <span className="text-amber-500 text-[10px] font-bold uppercase tracking-wider block mb-1">
                    {col.category}
                  </span>
                  <a
                    href={col.articleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <h4 className="text-sm font-serif font-bold theme-text-primary leading-tight mb-2 group-hover:text-amber-400 transition-colors">
                      {col.title}
                    </h4>
                  </a>
                  <a
                    href={col.articleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-400 font-bold hover:underline"
                  >
                    <span>{t('news', 'openLink')}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
                <a
                  href={col.articleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-20 h-14 rounded-xl overflow-hidden block border theme-border shrink-0 group"
                >
                  <img
                    src={col.imageUrl}
                    alt={col.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </a>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}
