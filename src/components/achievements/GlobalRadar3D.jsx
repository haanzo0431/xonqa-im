'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import * as THREE from 'three';
import { XORAZM_ORIGIN, ABROAD_STUDENTS } from '@/data/abroadStudents';
import {
  Globe as GlobeIcon,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  RotateCcw,
  Users,
  CheckCircle2,
  BookmarkCheck,
  User,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// Dynamically import Globe to prevent SSR issues
const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

export default function GlobalRadar3D() {
  const { t, translations } = useLanguage();
  const globeRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0); // Default to first
  const [countries, setCountries] = useState({ features: [] });
  const [mounted, setMounted] = useState(false);

  // Custom Sky Blue Globe Material for Oceans
  const customGlobeMaterial = useMemo(() => {
    return new THREE.MeshPhongMaterial({
      color: new THREE.Color('#38bdf8'),
      shininess: 12,
    });
  }, []);

  // Fetch world country border polygons
  useEffect(() => {
    setMounted(true);
    fetch(
      'https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson'
    )
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error('Error loading world borders:', err));
  }, []);

  const activeStudent = currentIndex !== null ? ABROAD_STUDENTS[currentIndex] : null;

  // Camera handling
  useEffect(() => {
    if (globeRef.current) {
      if (activeStudent) {
        globeRef.current.pointOfView(
          { lat: activeStudent.lat, lng: activeStudent.lng, altitude: 2.1 },
          1000
        );
      } else {
        globeRef.current.pointOfView(
          { lat: 35, lng: 50, altitude: 2.6 },
          1000
        );
      }
    }
  }, [currentIndex, activeStudent]);

  const handleChipClick = (index) => {
    if (currentIndex === index) {
      setCurrentIndex(null);
    } else {
      setCurrentIndex(index);
    }
  };

  const handleNext = () => {
    if (currentIndex === null) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prev) => (prev + 1) % ABROAD_STUDENTS.length);
    }
  };

  const handlePrev = () => {
    if (currentIndex === null) {
      setCurrentIndex(ABROAD_STUDENTS.length - 1);
    } else {
      setCurrentIndex((prev) =>
        prev === 0 ? ABROAD_STUDENTS.length - 1 : prev - 1
      );
    }
  };

  const singleArcData = activeStudent
    ? [
        {
          startLat: XORAZM_ORIGIN.lat,
          startLng: XORAZM_ORIGIN.lng,
          endLat: activeStudent.lat,
          endLng: activeStudent.lng,
          color: activeStudent.status === 'enrolled' ? '#10b981' : '#f59e0b',
        },
      ]
    : [];

  const pointsData = [
    {
      lat: XORAZM_ORIGIN.lat,
      lng: XORAZM_ORIGIN.lng,
      size: 0.8,
      color: '#059669',
      name: 'Xorazm IM Base',
    },
    ...ABROAD_STUDENTS.map((s, idx) => {
      const isSelected = idx === currentIndex;
      const isEnrolled = s.status === 'enrolled';
      return {
        lat: s.lat,
        lng: s.lng,
        size: isSelected ? 1.1 : 0.7,
        color: isSelected
          ? '#3b82f6'
          : isEnrolled
          ? '#10b981'
          : '#f59e0b',
        studentIndex: idx,
      };
    }),
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b theme-border">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold uppercase mb-2">
            <GlobeIcon className="w-3.5 h-3.5 animate-pulse" /> {t('achievements', 'radarBadge')}
          </div>
          <h2 className="text-3xl font-serif font-bold theme-text-primary">
            {t('achievements', 'radarTitle')}
          </h2>
          <p className="text-xs theme-text-secondary mt-1">
            {t('achievements', 'radarSubtitle')}
          </p>
        </div>

        {/* University Chips */}
        <div className="flex flex-wrap items-center gap-2">
          {ABROAD_STUDENTS.map((s, idx) => {
            const isActive = idx === currentIndex;
            const isEnrolled = s.status === 'enrolled';
            return (
              <button
                key={s.id}
                onClick={() => handleChipClick(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 border ${
                  isActive
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold shadow-md shadow-emerald-500/10 scale-105'
                    : 'theme-bg-card theme-border theme-text-secondary hover:theme-text-primary'
                }`}
              >
                <span>{s.flag}</span>
                <span>{s.shortName}</span>
                {isEnrolled && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                )}
              </button>
            );
          })}

          {currentIndex !== null && (
            <button
              onClick={() => setCurrentIndex(null)}
              className="px-3 py-1.5 rounded-xl text-xs font-mono bg-white/5 border theme-border text-sky-400 hover:bg-sky-500/10 flex items-center gap-1 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" /> {t('achievements', 'allPlaces')}
            </button>
          )}
        </div>
      </div>

      {/* Main Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT SIDE: Interactive 3D Globe */}
        <div className="lg:col-span-7 relative w-full h-[520px] rounded-3xl theme-bg-card border theme-border overflow-hidden flex items-center justify-center shadow-2xl">
          {mounted ? (
            <Globe
              ref={globeRef}
              backgroundColor="rgba(0,0,0,0)"
              globeMaterial={customGlobeMaterial}
              width={650}
              height={520}
              showAtmosphere={true}
              atmosphereColor="#60a5fa"
              atmosphereAltitude={0.14}
              
              polygonsData={countries.features}
              polygonCapColor={() => '#f8fafc'}
              polygonSideColor={() => '#e2e8f0'}
              polygonStrokeColor={() => '#94a3b8'}
              
              arcsData={singleArcData}
              arcColor="color"
              arcDashLength={1}
              arcDashGap={0}
              arcDashAnimateTime={0}
              arcStroke={2.5}
              
              pointsData={pointsData}
              pointColor="color"
              pointRadius="size"
              pointAltitude={0.015}
              pointResolution={32}
              onPointClick={(pt) => {
                if (pt.studentIndex !== undefined) {
                  if (currentIndex === pt.studentIndex) {
                    setCurrentIndex(null);
                  } else {
                    setCurrentIndex(pt.studentIndex);
                  }
                }
              }}
            />
          ) : (
            <div className="text-xs font-mono text-emerald-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 animate-spin" /> Rendering Vector 3D Globe...
            </div>
          )}

          {/* Quick Legend Overlay */}
          <div className="absolute bottom-4 left-4 p-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-white/80 space-y-1.5 z-10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t('achievements', 'enrolled')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>{t('achievements', 'offerReceived')}</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Information Showcase Panel */}
        <div className="lg:col-span-5 h-full flex flex-col justify-between p-6 md:p-8 rounded-3xl theme-bg-card border theme-border space-y-6">
          {activeStudent ? (
            <div className="space-y-5">
              {/* Status Badge & Flag Header */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b theme-border">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{activeStudent.flag}</span>
                    <span className="text-[11px] font-mono theme-text-secondary uppercase tracking-wider font-semibold">
                      {activeStudent.country}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif font-bold theme-text-primary leading-tight">
                    {activeStudent.university}
                  </h3>
                  <p className="text-xs theme-text-secondary flex items-center gap-1 mt-1 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" /> {activeStudent.city}
                  </p>
                </div>

                {/* Status Badge */}
                {activeStudent.status === 'enrolled' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold shrink-0 shadow-lg shadow-emerald-500/10">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {t('achievements', 'enrolled')}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-400 text-xs font-mono font-bold shrink-0">
                    <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" /> {t('achievements', 'offerReceived')}
                  </span>
                )}
              </div>

              {/* 1 OR 2 PHOTOS SHOWCASE BOX */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-bold block">
                  {t('achievements', 'photoShowcase')}
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Photo 1: Student Photo */}
                  {activeStudent.studentPhoto ? (
                    <div className="relative group h-40 rounded-2xl overflow-hidden border theme-border bg-black/40 shadow-md">
                      <img
                        src={activeStudent.studentPhoto}
                        alt={activeStudent.studentName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white">
                        <span className="text-[11px] font-serif font-bold truncate">
                          {activeStudent.studentName.split(' ')[0]} {activeStudent.studentName.split(' ')[1]}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/80 text-[9px] font-mono font-bold uppercase">
                          {t('achievements', 'enrolled')}
                        </span>
                      </div>
                    </div>
                  ) : null}

                  {/* Photo 2: University Campus Photo */}
                  <div className={`relative group h-40 rounded-2xl overflow-hidden border theme-border bg-black/40 shadow-md ${!activeStudent.studentPhoto ? 'md:col-span-2' : ''}`}>
                    <img
                      src={activeStudent.uniPhoto}
                      alt={activeStudent.university}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white">
                      <span className="text-[11px] font-mono font-semibold truncate text-white/90">
                        {activeStudent.shortName} Campus
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-sky-500/80 text-[9px] font-mono font-bold uppercase">
                        University
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Student & Scholarship Information Details */}
              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-2xl theme-bg-page border theme-border space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase">
                    <User className="w-3.5 h-3.5" />
                    <span>{t('achievements', 'acceptedGrads')}</span>
                  </div>

                  {activeStudent.students ? (
                    <div className="space-y-1.5 pt-1">
                      {activeStudent.students.map((st, i) => (
                        <div key={i} className="flex items-center justify-between text-xs font-mono border-b theme-border pb-1 last:border-0 last:pb-0">
                          <span className="theme-text-primary font-medium">{st.name}</span>
                          <span className="text-amber-400 font-bold">{st.grant}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm font-serif font-bold theme-text-primary">
                      {activeStudent.studentName}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-2xl theme-bg-page border theme-border space-y-1">
                    <span className="text-[10px] font-mono theme-text-secondary uppercase">{t('achievements', 'programMajor')}</span>
                    <p className="text-xs font-mono font-semibold theme-text-primary truncate">
                      {translations?.achievements?.majors?.[activeStudent.major] || activeStudent.major}
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl theme-bg-page border theme-border space-y-1">
                    <span className="text-[10px] font-mono theme-text-secondary uppercase">{t('achievements', 'grantAward')}</span>
                    <p className="text-xs font-mono font-bold text-amber-400 truncate">
                      {activeStudent.scholarship}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="space-y-5 py-2">
              <div className="flex items-center gap-3 pb-3 border-b theme-border">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold theme-text-primary">
                    Global Network Overview
                  </h3>
                  <p className="text-xs theme-text-secondary font-mono">
                    Xonqa tuman IM Acceptance & Enrollment Statistics
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl theme-bg-page border theme-border font-mono text-xs space-y-1">
                  <span className="text-[10px] theme-text-secondary uppercase">{t('achievements', 'destinations')}</span>
                  <p className="text-xl font-bold text-amber-400">6 Universities</p>
                </div>
                <div className="p-3.5 rounded-2xl theme-bg-page border theme-border font-mono text-xs space-y-1">
                  <span className="text-[10px] theme-text-secondary uppercase">{t('achievements', 'enrolledStudents')}</span>
                  <p className="text-xl font-bold text-emerald-400">1 Currently Enrolled</p>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Back / Next Controls */}
          <div className="pt-4 border-t theme-border flex items-center justify-between gap-4">
            <button
              onClick={handlePrev}
              className="px-4 py-2.5 rounded-2xl theme-bg-page border theme-border hover:border-emerald-500/50 theme-text-primary text-xs font-mono font-bold flex items-center gap-2 transition-all group"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {t('achievements', 'back')}
            </button>

            <span className="text-xs font-mono theme-text-secondary">
              {currentIndex !== null ? `${currentIndex + 1} / ${ABROAD_STUDENTS.length}` : t('achievements', 'allPlaces')}
            </span>

            <button
              onClick={handleNext}
              className="px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20 group"
            >
              {t('achievements', 'next')}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
