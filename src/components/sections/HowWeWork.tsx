import React from 'react';
import { motion } from 'motion/react';
import { getProcessSteps } from '../../data/constants';
import { useLanguage } from '../../lib/LanguageContext';

export const HowWeWork = () => {
  const { t } = useLanguage();
  const steps = getProcessSteps(t);

  return (
    <section className="py-24 vibrant-bg-orange relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-heading mb-4">
            {t('howWeWork.title')}
          </h2>
          <p className="text-brand-body max-w-2xl mx-auto">
            {t('howWeWork.subtitle')}
          </p>
        </div>

        <div className="relative">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-linear-to-r from-brand-blue/40 via-brand-orange/40 to-brand-blue/40 -translate-y-1/2 hidden lg:block" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8">
            {steps.map((step: any, index: number) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex flex-col items-center text-center group"
              >
                <div className="relative w-16 h-16 rounded-full bg-brand-blue text-white border-2 border-white shadow-lg flex items-center justify-center font-bold text-xl mb-6 z-10 group-hover:scale-110 transition-all">
                  <div className="absolute inset-0 rounded-full border-2 border-brand-blue/50 animate-ping group-hover:hidden" />
                  0{index + 1}
                </div>
                <h3 className="text-lg font-bold text-brand-heading mb-3">{step.title}</h3>
                <p className="text-sm text-brand-body leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
