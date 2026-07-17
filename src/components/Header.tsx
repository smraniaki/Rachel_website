import React, { useState } from 'react';
import { Menu, X, Phone, Globe, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

export default function Header({ lang, setLang }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const copy = TRANSLATIONS[lang];

  const handleScroll = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-sage-50/95 backdrop-blur-md border-b border-sage-300 shadow-sm" id="header">
      {/* Top Notification Bar */}
      <div className="bg-sage-600 text-sage-50 px-4 py-1.5 text-xs text-center font-medium tracking-wide flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 border-b border-sage-700">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          {copy.nav.license}
        </span>
        <span className="hidden sm:inline">|</span>
        <a href="tel:+14386864317" className="flex items-center gap-1 hover:underline font-mono">
          <Phone className="w-3 h-3" />
          +1 (438) 686-4317
        </a>
        <span className="hidden sm:inline">|</span>
        <span>{copy.hero.promo}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo / Brand Name */}
          <div className="flex-shrink-0 flex items-center">
            <button 
              onClick={() => handleScroll('hero')} 
              className="text-left group cursor-pointer"
            >
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-sage-800 tracking-tight leading-tight group-hover:text-sage-600 transition-colors">
                Rachel’s <span className="font-sans font-medium text-sm sm:text-base tracking-wider block sm:inline sm:ml-2 text-charcoal-700 uppercase">Mobile Physio</span>
              </h1>
              <span className="text-[10px] font-sans text-sage-800/60 block sm:hidden uppercase tracking-wider">{copy.footer.madeWith.split(',')[0]}</span>
            </button>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-1 lg:space-x-4 items-center">
            <button onClick={() => handleScroll('about')} className="px-3 py-2 rounded-md text-sm font-medium text-charcoal-800/80 hover:text-sage-600 hover:bg-sage-100 transition-all cursor-pointer">
              {copy.nav.about}
            </button>
            <button onClick={() => handleScroll('benefits')} className="px-3 py-2 rounded-md text-sm font-medium text-charcoal-800/80 hover:text-sage-600 hover:bg-sage-100 transition-all cursor-pointer">
              {copy.nav.benefits}
            </button>
            <button onClick={() => handleScroll('expertise')} className="px-3 py-2 rounded-md text-sm font-medium text-charcoal-800/80 hover:text-sage-600 hover:bg-sage-100 transition-all cursor-pointer">
              {copy.nav.expertise}
            </button>
            <button onClick={() => handleScroll('testimonials')} className="px-3 py-2 rounded-md text-sm font-medium text-charcoal-800/80 hover:text-sage-600 hover:bg-sage-100 transition-all cursor-pointer">
              {copy.nav.testimonials}
            </button>
            
            {/* Language Switcher */}
            <button 
              onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
              className="flex items-center gap-1 px-3 py-2 rounded-md text-xs font-semibold uppercase text-sage-800 border border-sage-300 hover:bg-sage-600 hover:text-sage-50 hover:border-sage-600 transition-all cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === 'en' ? 'FR' : 'EN'}
            </button>

            {/* Main CTA */}
            <button 
              onClick={() => handleScroll('booking')}
              className="ml-3 px-5 py-2.5 rounded-full text-sm font-semibold bg-sage-600 text-sage-50 hover:bg-sage-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer shadow-[#6b705c44]"
            >
              {copy.nav.booking}
            </button>
          </nav>

          {/* Mobile menu button & Language switch */}
          <div className="flex items-center md:hidden gap-2">
            <button 
              onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold text-sage-800 border border-sage-300 hover:bg-sage-100 transition-all"
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === 'en' ? 'FR' : 'EN'}
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-sage-800 hover:bg-sage-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-sage-50 border-b border-sage-300 shadow-lg absolute left-0 w-full">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            <button
              onClick={() => handleScroll('about')}
              className="block w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-charcoal-800 hover:bg-sage-100 hover:text-sage-600"
            >
              {copy.nav.about}
            </button>
            <button
              onClick={() => handleScroll('benefits')}
              className="block w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-charcoal-800 hover:bg-sage-100 hover:text-sage-600"
            >
              {copy.nav.benefits}
            </button>
            <button
              onClick={() => handleScroll('expertise')}
              className="block w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-charcoal-800 hover:bg-sage-100 hover:text-sage-600"
            >
              {copy.nav.expertise}
            </button>
            <button
              onClick={() => handleScroll('testimonials')}
              className="block w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-charcoal-800 hover:bg-sage-100 hover:text-sage-600"
            >
              {copy.nav.testimonials}
            </button>
            <div className="pt-2 border-t border-sage-300 mt-2 px-3">
              <button
                onClick={() => handleScroll('booking')}
                className="w-full text-center px-4 py-3 rounded-full text-base font-semibold bg-sage-600 text-sage-50 hover:bg-sage-700 shadow-sm"
              >
                {copy.nav.booking}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
