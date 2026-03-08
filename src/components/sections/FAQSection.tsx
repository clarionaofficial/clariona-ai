import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { getFaqs } from '../../data/constants';
import { cn } from '../../lib/utils';
import { useLanguage } from '../../lib/LanguageContext';

export const FAQSection = () => {
  const { t } = useLanguage();
  const faqs = getFaqs(t);
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <section className="py-24 bg-minimalist-blue relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-heading mb-4">
            {t('faq.title')}
          </h2>
          <p className="text-brand-body">
            {t('faq.subtitle')}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq: any, index: number) => (
            <div
              key={index}
              className={cn(
                "border rounded-2xl overflow-hidden transition-all duration-300 bg-white minimalist-shadow",
                openIndex === index ? "border-brand-blue/30 scale-[1.02]" : "border-slate-100"
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={cn(
                  "w-full flex items-center justify-between p-6 text-left transition-colors",
                  openIndex === index ? "bg-brand-blue/[0.03]" : "hover:bg-brand-bg"
                )}
              >
                <span className="font-semibold text-brand-heading">{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={cn(
                    "text-brand-blue transition-transform duration-300",
                    openIndex === index ? "rotate-180" : ""
                  )}
                />
              </button>
              <motion.div
                initial={false}
                animate={{ height: openIndex === index ? 'auto' : 0 }}
                className="overflow-hidden"
              >
                <div className={cn(
                  "p-6 pt-0 text-brand-body text-sm leading-relaxed border-t border-brand-blue/5 transition-colors",
                  openIndex === index ? "bg-brand-blue/[0.03]" : ""
                )}>
                  {faq.answer}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section >
  );
};
