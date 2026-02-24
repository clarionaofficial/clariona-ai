import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Mic, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../lib/LanguageContext';

export const Hero = () => {
  const { t } = useLanguage();
  const [times, setTimes] = React.useState({ call: 2, appointment: 5, lead: 12 });

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimes(prev => ({
        call: prev.call + 1,
        appointment: prev.appointment + 1,
        lead: prev.lead + 1
      }));
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-blue/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-brand-orange/20 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-sm font-medium mb-8"
            >
              <Sparkles size={16} />
              <span>{t('hero.badge')}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-brand-heading mb-8 tracking-tight leading-[1.1]"
            >
              {t('hero.title')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-xl text-lg md:text-xl text-brand-body mb-12 leading-relaxed"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Link to="/contact" className="btn-primary w-full sm:w-auto text-lg px-8 py-4">
                {t('hero.ctaPrimary')}
                <ArrowRight size={20} />
              </Link>
              <Link to="/services" className="btn-secondary w-full sm:w-auto text-lg px-8 py-4">
                {t('hero.ctaSecondary')}
              </Link>
            </motion.div>
          </div>

          {/* Right Image with Ken Burns Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="aspect-square md:aspect-4/3 lg:aspect-square rounded-3xl overflow-hidden shadow-2xl border border-brand-blue/10 relative">
              <motion.div
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear"
                }}
                className="w-full h-full"
              >
                <img
                  src="/happy-man-coffee.png"
                  alt="Happy Client"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              {/* Subtle overlay to tie in with brand colors */}
              <div className="absolute inset-0 bg-linear-to-tr from-brand-blue/10 to-transparent pointer-events-none" />
            </div>

            {/* Floating Customer Review */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 glass p-5 rounded-2xl shadow-xl hidden sm:block z-20 max-w-[240px]"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Sparkles key={i} size={12} className="text-brand-orange fill-brand-orange" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider">
                    {t('hero.successBadge')}
                  </span>
                </div>
                <p className="text-xs font-medium text-brand-heading leading-relaxed italic">
                  {t('hero.successText')}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Abstract AI Illustration Mockup (Moved below the main split) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-32 relative max-w-5xl mx-auto"
        >
          <div className="aspect-video rounded-2xl overflow-hidden glass p-4 border-brand-blue/10 shadow-2xl">
            <div className="w-full h-full bg-white rounded-xl flex flex-col relative overflow-hidden border border-brand-blue/5">
              {/* Mock Interface Header */}
              <div className="h-12 border-b border-brand-blue/5 flex items-center justify-between px-6 bg-brand-bg/50">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/20" />
                </div>
                <div className="text-[10px] font-mono text-brand-blue/40 tracking-widest uppercase">
                  Clariona OS v2.5
                </div>
                <div className="w-12" />
              </div>

              {/* Mock Interface Content */}
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full max-w-4xl">
                  {/* Left: Visualizer */}
                  <div className="flex flex-col items-center justify-center space-y-8">
                    <div className="relative w-48 h-48 flex items-center justify-center">
                      <motion.div 
                        animate={{ scale: [1, 1.1, 1], rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-2 border-dashed border-brand-blue/20 rounded-full" 
                      />
                      <motion.div 
                        animate={{ scale: [1.1, 1, 1.1], rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-4 border border-dashed border-brand-orange/20 rounded-full" 
                      />
                      <div className="w-32 h-32 rounded-full bg-linear-to-br from-brand-blue to-brand-orange p-0.5 shadow-xl shadow-brand-blue/20">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                          <Phone size={48} className="text-brand-blue" />
                        </div>
                      </div>
                      {/* Pulse rings */}
                      <div className="absolute inset-0 rounded-full border-2 border-brand-blue/10 animate-ping" />
                    </div>
                    
                    <div className="flex items-end gap-1 h-8">
                      {[...Array(15)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ height: [4, Math.random() * 24 + 4, 4] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.05 }}
                          className="w-1 bg-brand-blue/30 rounded-full"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Right: Info & Call Action */}
                  <div className="text-left space-y-6">
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-brand-blue uppercase tracking-widest">{t('hero.activeAgent')}</div>
                      <h3 className="text-2xl font-bold text-brand-heading">{t('hero.agentName')}</h3>
                      <p className="text-sm text-brand-body leading-relaxed">
                        {t('hero.agentDesc')}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <div className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider border border-emerald-100 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {t('hero.onlineNow')}
                      </div>
                      <div className="px-3 py-1.5 rounded-lg bg-brand-blue/5 text-brand-blue text-[10px] font-bold uppercase tracking-wider border border-brand-blue/10">
                        {t('hero.accuracy')}
                      </div>
                    </div>

                    <div className="pt-4">
                      <button className="btn-primary w-full md:w-auto shadow-xl shadow-brand-blue/20 group">
                        <Mic size={18} className="group-hover:scale-110 transition-transform" />
                        {t('hero.demo')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative background elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-[100px] -z-10" />
            </div>
          </div>
          
          {/* Floating elements */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 glass p-4 rounded-2xl shadow-xl hidden md:block z-20"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Phone size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <div className="text-sm font-bold text-brand-heading">{t('hero.agentStatus')}</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-10 -left-10 glass p-6 rounded-2xl shadow-xl hidden md:block z-20 min-w-[240px]"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-blue" />
                <span className="text-[11px] font-medium text-brand-body">
                  {t('activity.call')} – {times.call} {t('activity.ago')}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-orange" />
                <span className="text-[11px] font-medium text-brand-body">
                  {t('activity.appointment')} – {times.appointment} {t('activity.ago')}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-blue/40" />
                <span className="text-[11px] font-medium text-brand-body">
                  {t('activity.lead')} – {times.lead} {t('activity.ago')}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};


