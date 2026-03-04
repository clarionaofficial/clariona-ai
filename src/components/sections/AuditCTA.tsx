import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '../../lib/LanguageContext';

export const AuditCTA = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[32px] overflow-hidden bg-linear-to-br from-brand-blue to-brand-orange p-8 md:p-16 text-center shadow-2xl shadow-brand-blue/20">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/10 pointer-events-none skew-x-12 translate-x-32" />
          <div className="absolute bottom-0 left-0 w-1/2 h-full bg-white/10 pointer-events-none -skew-x-12 -translate-x-32" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-md">
              {t('audit.title')}
            </h2>
            <p className="text-white max-w-2xl mx-auto mb-10 text-lg font-medium opacity-90">
              {t('audit.subtitle')}
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="flex items-center gap-2 text-white font-semibold">
                <div className="bg-white/20 p-1 rounded-full"><CheckCircle size={18} className="text-white" /></div>
                <span>{t('audit.feature1')}</span>
              </div>
              <div className="flex items-center gap-2 text-white font-semibold">
                <div className="bg-white/20 p-1 rounded-full"><CheckCircle size={18} className="text-white" /></div>
                <span>{t('audit.feature2')}</span>
              </div>
              <div className="flex items-center gap-2 text-white font-semibold">
                <div className="bg-white/20 p-1 rounded-full"><CheckCircle size={18} className="text-white" /></div>
                <span>{t('audit.feature3')}</span>
              </div>
            </div>

            <Link to="/contact" className="btn-primary inline-flex bg-white text-brand-heading hover:bg-white/90 border-none px-10 py-4 text-lg">
              {t('audit.cta')}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
