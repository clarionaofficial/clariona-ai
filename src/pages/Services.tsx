import React from 'react';
import { ServicesOverview } from '../components/sections/ServicesOverview';
import { AuditCTA } from '../components/sections/AuditCTA';
import { motion } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';

const Services = () => {
  const { t } = useLanguage();

  return (
    <main>
      <section className="pt-24 pb-12 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-brand-heading mb-6"
          >
            {t('servicesPage.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-lg text-brand-body"
          >
            {t('servicesPage.subtitle')}
          </motion.p>
        </div>
      </section>
      <ServicesOverview />
      <AuditCTA />
    </main>
  );
};

export default Services;
