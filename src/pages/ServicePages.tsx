import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FAQSection } from '../components/sections/FAQSection';
import { AuditCTA } from '../components/sections/AuditCTA';
import { useLanguage } from '../lib/LanguageContext';

interface ServicePageProps {
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  includes: string[];
  process: { title: string; text: string }[];
}

const ServiceTemplate: React.FC<ServicePageProps> = ({ title, subtitle, description, benefits, includes, process }) => {
  const { t } = useLanguage();

  return (
    <main>
      {/* Hero */}
      <section className="pt-24 pb-20 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 rounded-full bg-brand-blue/10 text-brand-blue text-sm font-bold mb-6"
          >
            {subtitle}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-brand-heading mb-8"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-lg text-brand-body leading-relaxed mb-10"
          >
            {description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/contact" className="btn-primary inline-flex">
              {t('serviceTemplate.getStarted')}
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Benefits & Includes */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-brand-heading mb-8">{t('serviceTemplate.benefits')}</h2>
              <div className="space-y-6">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-1">
                      <CheckCircle size={16} />
                    </div>
                    <p className="text-brand-body leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass p-8 md:p-12 rounded-[32px]">
              <h2 className="text-2xl font-bold text-brand-heading mb-8">{t('serviceTemplate.includes')}</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {includes.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-brand-body text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-heading mb-16 text-center">{t('serviceTemplate.process')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {process.map((step, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-bold text-brand-blue/10 absolute -top-10 left-0">0{i + 1}</div>
                <h3 className="text-xl font-bold text-brand-heading mb-4 relative z-10">{step.title}</h3>
                <p className="text-brand-body text-sm leading-relaxed relative z-10">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AuditCTA />
      <FAQSection />
    </main>
  );
};

export const WebsitesPage = () => {
  const { t } = useLanguage();
  return (
    <ServiceTemplate 
      title={t('services.websites.title')}
      subtitle={t('services.websites.subtitle')}
      description={t('services.websites.desc')}
      benefits={t('services.websites.benefits') as unknown as string[]}
      includes={t('services.websites.includes') as unknown as string[]}
      process={t('services.websites.processSteps') as unknown as { title: string; text: string }[]}
    />
  );
};

export const GMBPage = () => {
  const { t } = useLanguage();
  return (
    <ServiceTemplate 
      title={t('services.gmb.title')}
      subtitle={t('services.gmb.subtitle')}
      description={t('services.gmb.desc')}
      benefits={t('services.gmb.benefits') as unknown as string[]}
      includes={t('services.gmb.includes') as unknown as string[]}
      process={t('services.gmb.processSteps') as unknown as { title: string; text: string }[]}
    />
  );
};

export const VoiceAgentsPage = () => {
  const { t } = useLanguage();
  return (
    <ServiceTemplate 
      title={t('services.voice.title')}
      subtitle={t('services.voice.subtitle')}
      description={t('services.voice.desc')}
      benefits={t('services.voice.benefits') as unknown as string[]}
      includes={t('services.voice.includes') as unknown as string[]}
      process={t('services.voice.processSteps') as unknown as { title: string; text: string }[]}
    />
  );
};
