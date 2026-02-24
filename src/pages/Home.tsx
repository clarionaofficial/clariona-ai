import React from 'react';
import { Hero } from '../components/sections/Hero';
import { ServicesOverview } from '../components/sections/ServicesOverview';
import { HowWeWork } from '../components/sections/HowWeWork';
import { FAQSection } from '../components/sections/FAQSection';
import { AuditCTA } from '../components/sections/AuditCTA';
import { useLanguage } from '../lib/LanguageContext';

const Home = () => {
  const { t } = useLanguage();

  const stats = [
    { label: t('stats.growth'), value: '250%' },
    { label: t('stats.projects'), value: '120+' },
    { label: t('stats.rankings'), value: '#1' },
    { label: t('stats.uptime'), value: '24/7' },
  ];

  return (
    <main>
      <Hero />
      <ServicesOverview />
      <HowWeWork />
      
      {/* Value Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-8 rounded-2xl bg-brand-bg border border-brand-blue/5">
                <div className="text-4xl font-bold text-brand-blue mb-2">{stat.value}</div>
                <div className="text-sm font-medium text-brand-body uppercase tracking-wider">{stat.label}</div>
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

export default Home;
