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
        <div className="relative rounded-[32px] overflow-hidden bg-brand-heading p-8 md:p-16 text-center">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-brand-blue/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-1/2 h-full bg-linear-to-r from-brand-orange/10 to-transparent pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              {t('audit.title')}
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-10 text-lg">
              {t('audit.subtitle')}
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="flex items-center gap-2 text-white/90">
                <CheckCircle size={20} className="text-brand-blue" />
                <span>{t('audit.feature1')}</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <CheckCircle size={20} className="text-brand-blue" />
                <span>{t('audit.feature2')}</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <CheckCircle size={20} className="text-brand-blue" />
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
