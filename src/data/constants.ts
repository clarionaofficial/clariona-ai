export const getServices = (t: any) => [
  {
    id: 'websites',
    title: t('services.websites.title'),
    description: t('services.websites.desc'),
    icon: 'Globe',
    href: '/websites',
    benefits: t('services.websites.benefits')
  },
  {
    id: 'gmb',
    title: t('services.gmb.title'),
    description: t('services.gmb.desc'),
    icon: 'MapPin',
    href: '/gmb-ranking',
    benefits: t('services.gmb.benefits')
  },
  {
    id: 'voice-agents',
    title: t('services.voice.title'),
    description: t('services.voice.desc'),
    icon: 'Mic',
    href: '/voice-agents',
    benefits: t('services.voice.benefits')
  }
];

export const getFaqs = (t: any) => t('faqs');

export const getProcessSteps = (t: any) => t('process');
