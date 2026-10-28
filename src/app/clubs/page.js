'use client';

import { useState } from 'react';
import { Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const BASE_GALLERY_ITEMS = [
  {
    id: 'item-1',
    category: 'stem',
    images: [
      'lessons_1.webp',
      'lessons_2.webp',
      'lessons_3.webp'
    ],
  },
  {
    id: 'item-2',
    category: 'stem',
    images: [ 
      'trash_3.webp',
      'trash_2.webp'
    ],
  },
  {
    id: 'item-3',
    category: 'sports',
    images: [
      'football_1.webp',
      'football_2.webp',
    ],
  },
  {
    id: 'item-4',
    category: 'sports',
    images: [
      'zakovat_1.webp',
      'zakovat_2.webp',
      'zakovat_3.webp'
    ],
  },
  {
    id: 'item-5',
    category: 'culture',
    images: [
      'graduation_1.webp',
      'graduation_2.webp',
      'graduation_3.webp'
    ],
  },
  {
    id: 'item-6',
    category: 'campus',
    images: [
      'campus_1.webp',
      'campus_2.webp',
      'campus_3.webp'
    ],
  },
];

function GalleryCard({ item }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === 0 ? item.images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === item.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="group relative h-80 rounded-3xl overflow-hidden theme-bg-card border theme-border shadow-sm hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-end">
      
      {/* Full Card Background Image */}
      <img
        src={item.images[currentIdx]}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

      {/* Photo Progress Indicator Bars */}
      {item.images.length > 1 && (
        <div className="absolute top-4 left-4 right-4 flex gap-1.5 z-10 pointer-events-auto">
          {item.images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIdx(i);
              }}
              aria-label={`Go to photo ${i + 1}`}
              className={`h-1.5 flex-1 rounded-full transition-all cursor-pointer ${
                i === currentIdx ? 'bg-amber-400 shadow-md scale-y-110' : 'bg-white/40 hover:bg-white/70 backdrop-blur-sm'
              }`}
            />
          ))}
        </div>
      )}

      {/* Always Visible Navigation Arrows on Mobile / Hover on Desktop */}
      {item.images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            aria-label="Previous Photo"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/70 hover:bg-amber-500 hover:text-black text-white flex items-center justify-center transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer z-20 backdrop-blur-md border border-white/20 shadow-lg active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Photo"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/70 hover:bg-amber-500 hover:text-black text-white flex items-center justify-center transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer z-20 backdrop-blur-md border border-white/20 shadow-lg active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Overlaid Content */}
      <div className="relative p-6 z-10 space-y-1.5">
        <h3 className="text-xl font-serif font-bold text-white group-hover:text-amber-400 transition-colors">
          {item.title}
        </h3>
        <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function PublicGalleryPage() {
  const { t, translations } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const galleryCategories = [
    { id: 'all', label: t('gallery', 'categories')?.all || 'All Photos' },
    { id: 'stem', label: t('gallery', 'categories')?.stem || 'STEM & Tech' },
    { id: 'campus', label: t('gallery', 'categories')?.campus || 'Campus Life' },
    { id: 'sports', label: t('gallery', 'categories')?.sports || 'Sports & Olympiads' },
    { id: 'culture', label: t('gallery', 'categories')?.culture || 'Cultural Events' },
  ];

  const galleryItems = BASE_GALLERY_ITEMS.map((base) => {
    const itemData = translations?.gallery?.items?.[base.id] || {};
    return {
      ...base,
      title: itemData.title || base.id,
      description: itemData.description || '',
    };
  });

  const filteredItems = galleryItems.filter(
    (item) => selectedCategory === 'all' || item.category === selectedCategory
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 flex flex-col justify-center min-h-[calc(100vh-4rem)]">
      
      {/* Header Section */}
      <div className="text-center mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-mono font-bold tracking-wider uppercase">
          <Camera className="w-3.5 h-3.5" /> {t('gallery', 'badge')}
        </div>
        <h1 className="text-4xl md:text-6xl font-serif font-bold theme-text-primary tracking-tight">
          {t('gallery', 'title')}
        </h1>
        <p className="theme-text-secondary text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
          {t('gallery', 'subtitle')}
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {galleryCategories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all border cursor-pointer ${
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

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <GalleryCard key={item.id} item={item} />
        ))}
      </div>

    </div>
  );
}
