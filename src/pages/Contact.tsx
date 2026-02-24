import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left Column: Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-brand-heading mb-6">
                {t('contact.hero.title')}
              </h1>
              <p className="text-lg text-brand-body leading-relaxed">
                {t('contact.hero.subtitle')}
              </p>
            </motion.div>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-heading mb-1">{t('contact.info.email')}</h4>
                  <p className="text-brand-body">hello@clariona-ai.com</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-heading mb-1">{t('contact.info.call')}</h4>
                  <p className="text-brand-body">+1 (555) 000-0000</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-heading mb-1">{t('contact.info.visit')}</h4>
                  <p className="text-brand-body">{t('footer.address')}</p>
                </div>
              </div>
            </div>

            <div className="mt-16 p-8 rounded-3xl bg-brand-heading text-white">
              <h3 className="text-2xl font-bold mb-4">{t('contact.booking.title')}</h3>
              <p className="text-white/70 mb-8">
                {t('contact.booking.subtitle')}
              </p>
              <button className="btn-primary bg-white text-brand-heading hover:bg-white/90 border-none w-full py-4">
                {t('contact.booking.cta')}
              </button>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="glass p-8 md:p-12 rounded-[32px]">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
                  <Send size={40} />
                </div>
                <h2 className="text-3xl font-bold text-brand-heading mb-4">{t('contact.success.title')}</h2>
                <p className="text-brand-body mb-8">
                  {t('contact.success.subtitle')}
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary"
                >
                  {t('contact.success.cta')}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-brand-heading ml-1">{t('contact.form.name')}</label>
                    <input 
                      required
                      type="text" 
                      placeholder="John Doe"
                      className="w-full px-5 py-4 rounded-xl bg-brand-bg border border-brand-blue/10 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-brand-heading ml-1">{t('contact.form.email')}</label>
                    <input 
                      required
                      type="email" 
                      placeholder="john@company.com"
                      className="w-full px-5 py-4 rounded-xl bg-brand-bg border border-brand-blue/10 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-brand-heading ml-1">{t('contact.form.company')}</label>
                  <input 
                    type="text" 
                    placeholder="Acme Inc."
                    className="w-full px-5 py-4 rounded-xl bg-brand-bg border border-brand-blue/10 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-brand-heading ml-1">{t('contact.form.service')}</label>
                  <select className="w-full px-5 py-4 rounded-xl bg-brand-bg border border-brand-blue/10 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all appearance-none">
                    <option>{t('nav.websites')}</option>
                    <option>{t('nav.gmb')}</option>
                    <option>{t('nav.voice')}</option>
                    <option>{t('contact.form.audit')}</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-brand-heading ml-1">{t('contact.form.message')}</label>
                  <textarea 
                    required
                    rows={5}
                    placeholder={t('contact.form.messagePlaceholder')}
                    className="w-full px-5 py-4 rounded-xl bg-brand-bg border border-brand-blue/10 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all resize-none"
                  />
                </div>
                <button type="submit" className="btn-primary w-full py-4 text-lg">
                  {t('contact.form.submit')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
