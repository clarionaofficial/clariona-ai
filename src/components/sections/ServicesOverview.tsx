import React from 'react';
import { motion } from 'motion/react';
import { Globe, MapPin, Mic, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getServices } from '../../data/constants';
import { useLanguage } from '../../lib/LanguageContext';

const IconMap: Record<string, any> = {
  Globe: Globe,
  MapPin: MapPin,
  Mic: Mic,
};

export const ServicesOverview = () => {
  const { t } = useLanguage();
  const services = getServices(t);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-heading mb-4">
            {t('servicesOverview.title')}
          </h2>
          <p className="text-brand-body max-w-2xl mx-auto">
            {t('servicesOverview.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = IconMap[service.icon];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-8 rounded-2xl bg-brand-bg border border-brand-blue/5 hover:border-brand-blue/20 transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <Icon className="text-brand-blue" size={28} />
                </div>
                <h3 className="text-xl font-bold text-brand-heading mb-4">{service.title}</h3>
                <p className="text-brand-body text-sm mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {service.benefits.map((benefit: string) => (
                    <li key={benefit} className="flex items-center gap-2 text-sm text-brand-body">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <Link
                  to={service.href}
                  className="inline-flex items-center gap-2 text-brand-blue font-semibold text-sm hover:gap-3 transition-all"
                >
                  {t('servicesOverview.learnMore')} <ArrowRight size={16} />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
