import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from 'lucide-react';
import { useLanguage } from '../../lib/LanguageContext';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-brand-blue/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Logo className="mb-6" />
            <p className="text-brand-body text-sm leading-relaxed mb-6">
              {t('footer.desc')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-brand-body hover:text-brand-blue transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-brand-body hover:text-brand-blue transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-brand-body hover:text-brand-blue transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-brand-heading font-semibold mb-6">{t('footer.services')}</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/websites" className="text-brand-body hover:text-brand-blue transition-colors">{t('nav.websites')}</Link></li>
              <li><Link to="/gmb-ranking" className="text-brand-body hover:text-brand-blue transition-colors">{t('nav.gmb')}</Link></li>
              <li><Link to="/voice-agents" className="text-brand-body hover:text-brand-blue transition-colors">{t('nav.voice')}</Link></li>
              <li><Link to="/services" className="text-brand-body hover:text-brand-blue transition-colors">{t('footer.allServices')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-brand-heading font-semibold mb-6">{t('footer.company')}</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/about" className="text-brand-body hover:text-brand-blue transition-colors">{t('nav.about')}</Link></li>
              <li><Link to="/contact" className="text-brand-body hover:text-brand-blue transition-colors">{t('nav.contact')}</Link></li>
              <li><a href="#" className="text-brand-body hover:text-brand-blue transition-colors">{t('footer.privacy')}</a></li>
              <li><a href="#" className="text-brand-body hover:text-brand-blue transition-colors">{t('footer.terms')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-brand-heading font-semibold mb-6">{t('footer.contactUs')}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-brand-blue shrink-0" />
                <span className="text-brand-body">hello@clariona-ai.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-brand-blue shrink-0" />
                <span className="text-brand-body">+1 (555) 000-0000</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-blue shrink-0" />
                <span className="text-brand-body">{t('footer.address')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-brand-blue/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-brand-body text-xs">
            © {currentYear} clariona-ai.com. {t('footer.rights')}
          </p>
          <div className="flex gap-6 text-xs text-brand-body">
            <a href="#" className="hover:text-brand-blue">Cookies</a>
            <a href="#" className="hover:text-brand-blue">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
