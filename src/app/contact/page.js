'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, MapPin, Phone, Mail, Sparkles, Clock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 flex flex-col justify-center min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-teal-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* Header Section */}
      <div className="text-center mb-12 md:mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold tracking-wider uppercase shadow-sm backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t('contact', 'badge')}</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold theme-text-primary tracking-tight">
          {t('contact', 'title')}
        </h1>
        
        <p className="theme-text-secondary text-base md:text-lg max-w-lg mx-auto font-normal leading-relaxed">
          {t('contact', 'subtitle')}
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid md:grid-cols-12 gap-8 items-stretch">
        
        {/* Contact Information (5 Columns) */}
        <div className="md:col-span-5 relative overflow-hidden p-8 md:p-10 rounded-3xl border theme-border theme-bg-card shadow-2xl backdrop-blur-xl flex flex-col justify-between space-y-8 hover:border-emerald-500/30 transition-all duration-300">
          <div className="absolute -top-16 -left-16 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-8 relative z-10">
            <div>
              <h2 className="text-2xl font-serif font-bold theme-text-primary">
                {t('contact', 'infoTitle')}
              </h2>
              <p className="theme-text-secondary text-xs mt-1">
                {t('contact', 'infoSubtitle')}
              </p>
            </div>

            <div className="space-y-6 text-sm">
              {/* Address */}
              <div className="group flex items-start gap-4 p-3 -mx-3 rounded-2xl hover:bg-emerald-500/5 transition-colors duration-200">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-emerald-500/40 transition-all duration-300 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-mono text-[11px] text-emerald-400 font-bold uppercase tracking-wider">
                    {t('contact', 'address')}
                  </p>
                  <p className="theme-text-primary font-medium mt-1 leading-snug">
                    {t('contact', 'addressVal')}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="group flex items-start gap-4 p-3 -mx-3 rounded-2xl hover:bg-emerald-500/5 transition-colors duration-200">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-emerald-500/40 transition-all duration-300 shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-mono text-[11px] text-emerald-400 font-bold uppercase tracking-wider">
                    {t('contact', 'phone')}
                  </p>
                  <p className="theme-text-primary font-medium mt-1 leading-snug">
                    (+998) 997302929
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="group flex items-start gap-4 p-3 -mx-3 rounded-2xl hover:bg-emerald-500/5 transition-colors duration-200">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-emerald-500/40 transition-all duration-300 shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-mono text-[11px] text-emerald-400 font-bold uppercase tracking-wider">
                    {t('contact', 'email')}
                  </p>
                  <p className="theme-text-primary font-medium mt-1 leading-snug">
                    ixm313@piima.uz
                  </p>
                </div>
              </div>
            </div>
          </div>

           {/* Office Hours */}
          <div className="relative z-10 p-4.5 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 text-xs theme-text-secondary leading-relaxed backdrop-blur-md flex items-center gap-3">
            <Clock className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <span className="font-bold text-emerald-400 block mb-0.5">{t('contact', 'officeHours')}</span>
              <span>{t('contact', 'officeHoursVal')}</span>
            </div>
          </div>
        </div> 

        {/* Send a Message Form (7 Columns) */}
        <div className="md:col-span-7 relative overflow-hidden p-8 md:p-10 rounded-3xl border theme-border theme-bg-card shadow-2xl backdrop-blur-xl flex flex-col justify-between hover:border-emerald-500/30 transition-all duration-300">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif font-bold theme-text-primary">
                {t('contact', 'formTitle')}
              </h2>
              <p className="theme-text-secondary text-xs mt-1">
                {t('contact', 'formSubtitle')}
              </p>
            </div>

            {status === 'success' ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 p-8 rounded-2xl flex items-center gap-4 my-auto shadow-inner animate-in fade-in duration-300">
                <CheckCircle2 className="w-7 h-7 text-emerald-400 shrink-0" />
                <p className="text-sm font-semibold leading-relaxed">
                  {t('contact', 'successMsg')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {status === 'error' && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-2xl flex items-center gap-3 text-xs animate-in fade-in duration-200">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-semibold theme-text-secondary uppercase tracking-wider block">
                      {t('contact', 'fullName')}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full px-4 py-3.5 rounded-2xl border theme-border bg-slate-900/40 theme-text-primary placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono font-semibold theme-text-secondary uppercase tracking-wider block">
                      {t('contact', 'emailAddress')}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3.5 rounded-2xl border theme-border bg-slate-900/40 theme-text-primary placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono font-semibold theme-text-secondary uppercase tracking-wider block">
                    {t('contact', 'message')}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3.5 rounded-2xl border theme-border bg-slate-900/40 theme-text-primary placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm transition-all duration-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none cursor-pointer"
                >
                  {status === 'loading' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{t('contact', 'sendBtn')}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
