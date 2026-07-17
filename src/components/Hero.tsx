import React from 'react';
import { motion } from 'motion/react';
import { Phone, Calendar, ArrowRight, Star, HeartPulse, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';
import rachelPortrait from '../assets/images/physio_portrait_1783822899668.jpg';

interface HeroProps {
  lang: Language;
}

export default function Hero({ lang }: HeroProps) {
  const copy = TRANSLATIONS[lang];

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-sage-50 py-12 lg:py-24 border-b border-sage-300">
      {/* Visual Accents - Organic Circles resembling the flyer design */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-sage-600/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-sage-100/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Promo Tag */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sage-100 text-sage-800 text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-sm border border-sage-300/40"
            >
              <Sparkles className="w-4 h-4 text-sage-600 animate-pulse" />
              {copy.hero.promo}
            </motion.div>

            {/* Core Titles */}
            <div className="space-y-4">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-charcoal-800 tracking-tight leading-none"
              >
                {copy.hero.tagline.split(' ').map((word, idx) => {
                  // highlight last word or dynamic style
                  if (word.toLowerCase().includes('movement') || word.toLowerCase().includes('mouvement')) {
                    return <span key={idx} className="italic font-light text-sage-600">{word} </span>;
                  }
                  return word + ' ';
                })}
              </motion.h2>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-sans font-semibold text-sage-600/90 tracking-tight"
              >
                {copy.hero.subtagline}
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-base sm:text-lg text-charcoal-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans"
              >
                {copy.hero.subtitle}
              </motion.p>
            </div>

            {/* Quick trust metrics */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 text-xs sm:text-sm font-medium text-charcoal-800"
            >
              <span className="flex items-center gap-1.5 bg-sage-100/60 px-3 py-1.5 rounded-full border border-sage-300 shadow-sm">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <strong>5.0 Star Rated</strong> on Google Maps
              </span>
              <span className="flex items-center gap-1.5 bg-sage-100/60 px-3 py-1.5 rounded-full border border-sage-300 shadow-sm">
                <HeartPulse className="w-4 h-4 text-sage-600" />
                <strong>Licensed pht</strong> (OPPQ Registered)
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
            >
              <button
                onClick={() => handleScroll('booking')}
                className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-semibold bg-sage-600 text-sage-50 hover:bg-sage-700 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[#6b705c44]"
              >
                <Calendar className="w-5 h-5" />
                {copy.hero.ctaBook}
              </button>
              
              <button
                onClick={() => handleScroll('benefits')}
                className="w-full sm:w-auto px-6 py-4 rounded-full text-base font-semibold bg-white text-charcoal-800 border border-sage-300 hover:bg-sage-100 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {copy.hero.ctaLearn}
                <ArrowRight className="w-4 h-4 text-sage-600" />
              </button>
            </motion.div>

            {/* In-home promotion footer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="p-4 rounded-2xl bg-white/60 border border-sage-300 max-w-xl mx-auto lg:mx-0 shadow-sm"
            >
              <p className="text-xs sm:text-sm text-charcoal-800 font-medium font-sans">
                💡 <span className="font-bold">{copy.hero.freeConsult}</span>
              </p>
            </motion.div>
          </div>

          {/* Right Side Image (Rachel's portrait outdoors) */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-[3/4]"
            >
              {/* Outer decorative border resembling custom flyer arches */}
              <div className="absolute inset-0 rounded-[2.5rem] border-2 border-sage-600/20 translate-x-4 translate-y-4 -z-10" />
              <div className="absolute inset-0 rounded-[2.5rem] bg-sage-600/10 -translate-x-3 -translate-y-3 -z-10" />
              
              {/* Actual Image container with high quality photo */}
              <div className="w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white relative bg-sage-100">
                <img 
                  src={rachelPortrait} 
                  alt="Rachel Dara Temper - Professional Physiotherapist in Montreal" 
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual badge on image */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-lg border border-sage-300 flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <div className="text-left">
                    <p className="text-xs font-bold text-charcoal-800">Rachel Dara Temper</p>
                    <p className="text-[10px] text-sage-800 font-medium font-sans">Physiothérapeute, pht. (OPPQ)</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
