import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { Menu, X, Globe } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useLanguage } from '../../lib/LanguageContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { name: t('nav.services'), href: '/services' },
    { name: t('nav.websites'), href: '/websites' },
    { name: t('nav.gmb'), href: '/gmb-ranking' },
    { name: t('nav.voice'), href: '/voice-agents' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-brand-blue/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex-shrink-0">
            <Logo />
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-brand-blue",
                  location.pathname === link.href ? "text-brand-blue" : "text-brand-body"
                )}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="flex items-center gap-4">
              {/* Language Switcher */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-bg border border-brand-blue/10 text-xs font-bold text-brand-heading hover:border-brand-blue transition-all"
              >
                <Globe size={14} className="text-brand-blue" />
                {language === 'en' ? 'DE' : 'EN'}
              </button>

              <Link to="/contact" className="btn-primary py-2 px-5 text-sm">
                {t('nav.cta')}
              </Link>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-bg border border-brand-blue/10 text-xs font-bold text-brand-heading"
            >
              <Globe size={14} className="text-brand-blue" />
              {language === 'en' ? 'DE' : 'EN'}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-heading p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass border-t border-brand-blue/10 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-4 text-base font-medium text-brand-body hover:text-brand-blue border-b border-brand-blue/5"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4">
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="btn-primary w-full"
              >
                {t('nav.cta')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
