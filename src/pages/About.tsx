import React from 'react';
import { motion } from 'motion/react';
import { Users, Target, Zap, Shield } from 'lucide-react';
import { AuditCTA } from '../components/sections/AuditCTA';
import { useLanguage } from '../lib/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  const values = [
    { icon: Users, title: t('about.values.client.title'), text: t('about.values.client.text') },
    { icon: Target, title: t('about.values.data.title'), text: t('about.values.data.text') },
    { icon: Zap, title: t('about.values.innovation.title'), text: t('about.values.innovation.text') },
    { icon: Shield, title: t('about.values.integrity.title'), text: t('about.values.integrity.text') },
  ];

  return (
    <main>
      <section className="py-24 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-brand-heading mb-8"
          >
            {t('about.hero.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto text-lg text-brand-body leading-relaxed"
          >
            {t('about.hero.subtitle')}
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl font-bold text-brand-heading mb-6">{t('about.mission.title')}</h2>
              <p className="text-brand-body leading-relaxed mb-6">
                {t('about.mission.p1')}
              </p>
              <p className="text-brand-body leading-relaxed">
                {t('about.mission.p2')}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {values.map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-brand-bg border border-brand-blue/5">
                  <item.icon className="text-brand-blue mb-4" size={24} />
                  <h4 className="font-bold text-brand-heading mb-2">{item.title}</h4>
                  <p className="text-xs text-brand-body leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AuditCTA />
    </main>
  );
};

export default About;
