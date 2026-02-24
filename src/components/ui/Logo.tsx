import React from 'react';

export const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="relative w-10 h-10 flex items-center justify-center">
      <div className="absolute w-10 h-10 border-2 border-brand-blue rounded-full opacity-80" />
      <div className="absolute w-6 h-6 border-2 border-brand-orange rounded-full opacity-80" />
    </div>
    <span className="text-xl font-bold tracking-tight text-brand-heading">
      clariona-ai<span className="text-brand-blue">.</span>com
    </span>
  </div>
);

export const LogoSymbol = ({ className = "" }: { className?: string }) => (
  <div className={`relative w-8 h-8 flex items-center justify-center ${className}`}>
    <div className="absolute w-8 h-8 border-2 border-brand-blue rounded-full" />
    <div className="absolute w-5 h-5 border-2 border-brand-orange rounded-full" />
  </div>
);
