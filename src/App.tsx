import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Expertise from './components/Expertise';
import Booking from './components/Booking';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import { Language } from './types';

export default function App() {
  const [lang, setLang] = useState<Language>('en');

  return (
    <div className="min-h-screen bg-sage-50 text-charcoal-800 selection:bg-sage-600/10 selection:text-sage-900 overflow-x-hidden">
      {/* Header with Bilingual Toggle */}
      <Header lang={lang} setLang={setLang} />

      {/* Hero Section with Promotion Banner and Outdoors Portrait */}
      <Hero lang={lang} />

      {/* About Section featuring Knee Bend Care */}
      <About lang={lang} />

      {/* Expertise & Benefits featuring Shoulder Stretch Care */}
      <Expertise lang={lang} />

      {/* Interactive Booking Module & Dashboard */}
      <Booking lang={lang} />

      {/* Testimonials with Local Storage Integration */}
      <Testimonials lang={lang} />

      {/* Footer with Postal Coverage Area Check & Detailed Contact */}
      <Footer lang={lang} />
    </div>
  );
}
