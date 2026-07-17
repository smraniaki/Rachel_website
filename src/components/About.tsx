import React from 'react';
import { motion } from 'motion/react';
import { Award, GraduationCap, CheckCircle2, ShieldCheck, HeartPulse } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';
import rachelTreating from '../assets/images/physio_knee_bend_1783822890971.jpg';

interface AboutProps {
  lang: Language;
}

export default function About({ lang }: AboutProps) {
  const copy = TRANSLATIONS[lang];

  return (
    <section id="about" className="py-16 sm:py-24 bg-white border-b border-sage-300 relative overflow-hidden">
      {/* Decorative side shape */}
      <div className="absolute right-0 top-1/4 w-32 h-64 bg-sage-100/60 rounded-l-full -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Photo of Rachel treating a knee bend */}
          <div className="lg:col-span-5 flex justify-center order-last lg:order-first">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-[3/4]"
            >
              {/* Geometric details matching the flyer layout */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-sage-200 translate-x-4 translate-y-4 -z-10" />
              <div className="absolute inset-0 rounded-[2.5rem] border-2 border-sage-600 -translate-x-3 -translate-y-3 -z-10 opacity-10" />

              <div className="w-full h-full rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white relative bg-sage-100/50">
                <img 
                  src={rachelTreating} 
                  alt="Rachel treating a patient's knee in physical therapy" 
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />

                {/* Floating clinical excellence badge */}
                <div className="absolute top-6 right-6 bg-sage-600/95 backdrop-blur-sm text-sage-50 px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-2 border border-white/10">
                  <HeartPulse className="w-4 h-4 text-sage-100" />
                  <span className="text-xs font-bold tracking-wide uppercase font-sans">Clinical Excellence</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Text & Bio info */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-sm font-bold tracking-widest text-sage-600 uppercase block font-sans">
                {copy.about.experience}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal-800 tracking-tight">
                {copy.about.title}
              </h2>
              <div className="h-1.5 w-16 bg-sage-300 rounded-full" />
            </div>

            {/* Paragraphs */}
            <div className="space-y-5 text-base text-charcoal-700 leading-relaxed font-sans">
              <p className="font-medium text-charcoal-800 text-lg">
                {copy.about.p1}
              </p>
              <p>
                {copy.about.p2}
              </p>
              <p>
                {copy.about.p3}
              </p>
            </div>

            {/* Credentials Card list */}
            <div className="pt-4 border-t border-sage-300 space-y-5">
              <h3 className="text-lg font-serif font-bold text-charcoal-800 flex items-center gap-2">
                <Award className="w-5 h-5 text-sage-600" />
                {copy.about.credentialTitle}
              </h3>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {copy.about.credentials.map((cred, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="flex items-start gap-3 bg-sage-50 p-4 rounded-2xl border border-sage-300 hover:border-sage-600 transition-all shadow-sm"
                  >
                    {idx === 1 ? (
                      <GraduationCap className="w-5 h-5 text-sage-600 mt-0.5 flex-shrink-0" />
                    ) : idx === 0 ? (
                      <ShieldCheck className="w-5 h-5 text-sage-600 mt-0.5 flex-shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-sage-600 mt-0.5 flex-shrink-0" />
                    )}
                    <span className="text-sm text-charcoal-800 leading-snug font-sans">{cred}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
