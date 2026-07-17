import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Activity, 
  ArrowUpRight, 
  Calendar, 
  ShieldAlert, 
  Sparkles, 
  Clock, 
  Smile,
  Check, 
  Heart,
  ChevronRight,
  ShieldCheck,
  Zap,
  Flame,
  Brain,
  Timer
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';
import rachelShoulderStretch from '../assets/images/physio_shoulder_stretch_1783822911235.jpg';

interface ExpertiseProps {
  lang: Language;
}

export default function Expertise({ lang }: ExpertiseProps) {
  const copy = TRANSLATIONS[lang];
  const [activeTab, setActiveTab] = useState<'treat' | 'benefits'>('treat');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Associate icons to each benefit card
  const benefitIcons = [
    <Home className="w-5 h-5 text-sage-600" />,
    <Activity className="w-5 h-5 text-sage-600" />,
    <Sparkles className="w-5 h-5 text-sage-600" />,
    <ShieldAlert className="w-5 h-5 text-sage-600" />,
    <Zap className="w-5 h-5 text-sage-600" />,
    <Smile className="w-5 h-5 text-sage-600" />,
    <Clock className="w-5 h-5 text-sage-600" />
  ];

  // Associate specific icons to clinical conditions treated
  const treatIcons = [
    <Heart className="w-5 h-5 text-sage-800" />,
    <ShieldCheck className="w-5 h-5 text-sage-800" />,
    <Flame className="w-5 h-5 text-sage-800" />,
    <ArrowUpRight className="w-5 h-5 text-sage-800" />,
    <Zap className="w-5 h-5 text-sage-800" />,
    <ShieldAlert className="w-5 h-5 text-sage-800" />,
    <Timer className="w-5 h-5 text-sage-800" />,
    <Brain className="w-5 h-5 text-sage-800" />
  ];

  return (
    <section id="benefits" className="py-16 sm:py-24 bg-sage-50 border-b border-sage-300 relative">
      <div className="absolute left-[-5%] top-1/3 w-[30%] h-[30%] rounded-full bg-sage-600/5 blur-3xl pointer-events-none" />
      <div className="absolute right-[-10%] bottom-1/4 w-[35%] h-[35%] rounded-full bg-sage-100/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-bold tracking-widest text-sage-600 uppercase block font-sans">
            {lang === 'en' ? 'Clinical Services' : 'Services Cliniques'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal-800 tracking-tight">
            {activeTab === 'treat' ? copy.expertise.title : copy.benefits.title}
          </h2>
          <p className="text-base sm:text-lg text-charcoal-700 font-sans">
            {activeTab === 'treat' ? copy.expertise.subtitle : copy.benefits.subtitle}
          </p>

          {/* Tab Selector */}
          <div className="inline-flex p-1.5 rounded-full bg-sage-200/40 border border-sage-300 mt-6">
            <button
              onClick={() => setActiveTab('treat')}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === 'treat' 
                  ? 'bg-sage-600 text-sage-50 shadow-sm shadow-[#6b705c44]' 
                  : 'text-charcoal-700 hover:text-sage-600'
              }`}
            >
              {lang === 'en' ? 'What I Treat' : 'Ce que je traite'}
            </button>
            <button
              onClick={() => setActiveTab('benefits')}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === 'benefits' 
                  ? 'bg-sage-600 text-sage-50 shadow-sm shadow-[#6b705c44]' 
                  : 'text-charcoal-700 hover:text-sage-600'
              }`}
            >
              {lang === 'en' ? 'Benefits of Home Physio' : 'Avantages de la physio'}
            </button>
          </div>
        </div>

        {/* Content Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="expertise">
          
          {/* Left Column: Interactive lists / cards */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {activeTab === 'treat' ? (
                <motion.div
                  key="treat-panel"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {copy.expertise.items.map((item, index) => (
                    <motion.div
                      key={index}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className="p-5 bg-white rounded-3xl border border-sage-300 hover:border-sage-600 hover:shadow-md transition-all group flex flex-col justify-between min-h-[160px]"
                    >
                      <div className="space-y-3">
                        <div className="w-10 h-10 rounded-2xl bg-sage-100 flex items-center justify-center border border-sage-300 group-hover:scale-105 transition-transform">
                          {treatIcons[index] || <Check className="w-5 h-5 text-sage-800" />}
                        </div>
                        <h3 className="text-base sm:text-lg font-serif font-bold text-charcoal-800 leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed font-sans">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex justify-end pt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight className="w-4 h-4 text-sage-600" />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="benefits-panel"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  {copy.benefits.items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-4 p-5 bg-white rounded-3xl border border-sage-300 hover:border-sage-600 hover:shadow-sm transition-all"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-sage-100 flex-shrink-0 flex items-center justify-center border border-sage-300">
                        {benefitIcons[index] || <Check className="w-5 h-5 text-sage-600" />}
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base sm:text-lg font-serif font-bold text-charcoal-800">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed font-sans">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Beautiful Clinical Care Photo */}
          <div className="lg:col-span-5 flex justify-center sticky top-24">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-[3/4]"
            >
              {/* Offset card border decorations */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-sage-600/10 translate-x-4 translate-y-4 -z-10" />
              <div className="absolute inset-0 rounded-[2.5rem] border-2 border-sage-300 -translate-x-3 -translate-y-3 -z-10" />

              <div className="w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white relative bg-sage-900">
                <img 
                  src={rachelShoulderStretch} 
                  alt="Rachel stretching an elderly patient's arm professionally" 
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />

                {/* Floating helpful banner */}
                <div className="absolute bottom-6 left-6 right-6 bg-sage-50/95 backdrop-blur-sm px-5 py-4 rounded-2xl shadow-xl border border-sage-300">
                  <div className="space-y-1.5 text-left">
                    <p className="text-xs font-bold text-sage-800 uppercase tracking-widest font-sans">
                      {lang === 'en' ? 'Evidence-Based Care' : 'Soins fondés sur des preuves'}
                    </p>
                    <p className="text-xs text-charcoal-700 font-sans leading-normal">
                      {lang === 'en' 
                        ? 'Every movement is guided with medical accuracy, safety, and deep empathy.' 
                        : 'Chaque mouvement est guidé avec précision médicale, sécurité et empathie profonde.'}
                    </p>
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
