'use client';

import { BookOpen, UserCheck, Award } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function TeachersPage() {
  const { t, translations } = useLanguage();
  const roles = translations?.teachers?.roles || {};

  const teachersList = [
    {
      id: 1,
      name: 'Ahmedov Firdavs',
      roleKey: 'director',
      defaultRole: 'Director',
      experience: 7,
      imageUrl: '/director.jpg',
      avatarText: 'AF',
    },
    {
      id: 2,
      name: 'Demir Sharipov',
      roleKey: 'deputyAcademic',
      defaultRole: 'Deputy, Academic',
      experience: 8,
      imageUrl: '/zvuch.png',
      avatarText: 'NK',
    },
    {
      id: 3,
      name: 'Niyazmetov Hasanboy',
      roleKey: 'deputyStudent',
      defaultRole: 'Deputy, Student Affairs',
      experience: 20,
      imageUrl: '/zam-driektor.png',
      avatarText: 'BR',
    },
    {
      id: 4,
      name: 'Erkinova Ullijon',
      roleKey: 'counsellor',
      defaultRole: 'Counsellor',
      experience: 3,
      imageUrl: '/photo_2026-09-23_16-42-34.jpg',
      avatarText: 'DU',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full">
          <UserCheck className="w-3 h-3" /> {t('teachers', 'badge')}
        </span>
        <h1 className="text-3xl md:text-5xl font-serif font-bold theme-text-primary">
          {t('teachers', 'title')}
        </h1>
        <p className="text-xs md:text-sm theme-text-secondary leading-relaxed">
          {t('teachers', 'subtitle')}
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {teachersList.map((teacher) => {
          const displayRole = roles[teacher.roleKey] || teacher.defaultRole;
          return (
            <div
              key={teacher.id}
              className="group theme-bg-card border theme-border rounded-3xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 shadow-lg hover:shadow-2xl flex flex-col justify-between"
            >
              {/* Teacher Photo */}
              <div className="relative w-full h-64 bg-black/40 overflow-hidden flex items-center justify-center">
                {teacher.imageUrl ? (
                  <img
                    src={teacher.imageUrl}
                    alt={teacher.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full border-2 border-emerald-500/30 bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-2xl font-serif font-bold">
                    {teacher.avatarText}
                  </div>
                )}

                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold text-amber-400 flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-400" />
                  <span>{teacher.experience} {t('teachers', 'experience')}</span>
                </div>
              </div>

              {/* Content Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 font-mono font-semibold truncate w-fit">
                    <BookOpen className="w-3 h-3 shrink-0" />
                    <span className="truncate">{displayRole}</span>
                  </div>

                  <h3 className="text-lg font-bold font-serif theme-text-primary group-hover:text-emerald-400 transition-colors">
                    {teacher.name}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
