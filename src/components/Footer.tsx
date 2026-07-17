import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  Clock, 
  ArrowUp, 
  Compass, 
  CheckCircle, 
  AlertCircle,
  Activity
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS, REGIONS } from '../data';

interface FooterProps {
  lang: Language;
}

export default function Footer({ lang }: FooterProps) {
  const copy = TRANSLATIONS[lang];
  const [postalInput, setPostalInput] = useState('');
  const [coverageResult, setCoverageResult] = useState<{
    status: 'success' | 'fail' | 'invalid' | null;
    message: string;
  }>({ status: null, message: '' });

  const handleScrollUp = () => {
    const element = document.getElementById('header');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCheckCoverage = (e: React.FormEvent) => {
    e.preventDefault();
    const input = postalInput.trim().toUpperCase().replace(/\s/g, '');
    
    if (input.length < 3) {
      setCoverageResult({
        status: 'invalid',
        message: copy.coverage.invalid
      });
      return;
    }

    const firstThree = input.substring(0, 3);
    const prefix = input.substring(0, 2);
    const singleLetter = input.substring(0, 1);

    // Montreal postal codes start with H
    // South Shore has J4 and J3 prefix
    const isCovered = singleLetter === 'H' || prefix === 'J4' || prefix === 'J3';

    if (isCovered) {
      // Find matches in our listed list or just approve standard H/J4/J3
      const foundRegion = REGIONS.find(r => r.postalPrefix === prefix || r.postalPrefix === firstThree || r.postalPrefix === singleLetter);
      const suffix = foundRegion ? ` (${foundRegion.neighborhood})` : '';
      
      setCoverageResult({
        status: 'success',
        message: copy.coverage.success.replace('{code}', firstThree) + suffix
      });
    } else {
      setCoverageResult({
        status: 'fail',
        message: copy.coverage.fail.replace('{code}', firstThree)
      });
    }
  };

  return (
    <footer id="contact" className="bg-charcoal-900 text-sage-50 pt-16 pb-12 relative overflow-hidden border-t border-charcoal-800">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sage-600 via-sage-300 to-charcoal-700" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Upper Column Widget: Coverage Area Check */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-5 space-y-3">
            <h3 className="text-xl font-serif font-bold text-sage-200 flex items-center gap-2">
              <Compass className="w-5 h-5 text-sage-300" />
              {copy.coverage.title}
            </h3>
            <p className="text-xs sm:text-sm text-sage-100/80 font-sans leading-normal">
              {copy.coverage.subtitle}
            </p>
          </div>

          <div className="md:col-span-7 space-y-4">
            <form onSubmit={handleCheckCoverage} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={postalInput}
                onChange={(e) => setPostalInput(e.target.value)}
                placeholder={copy.coverage.placeholder}
                className="flex-grow px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-sm font-mono placeholder-sage-100/50 focus:outline-none focus:border-sage-400 text-white uppercase"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-sage-600 hover:bg-sage-500 text-white rounded-2xl text-sm font-semibold transition-all cursor-pointer flex-shrink-0"
              >
                {copy.coverage.checkBtn}
              </button>
            </form>

            {/* Results Display */}
            {coverageResult.status && (
              <div className={`p-4 rounded-xl text-xs flex items-start gap-2.5 font-sans ${
                coverageResult.status === 'success' 
                  ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' 
                  : coverageResult.status === 'invalid' 
                  ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                  : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
              }`}>
                {coverageResult.status === 'success' ? (
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                )}
                <span>{coverageResult.message}</span>
              </div>
            )}
          </div>

        </div>

        {/* Middle Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start border-b border-white/10 pb-12">
          
          {/* Column 1: Brand & Region */}
          <div className="md:col-span-5 space-y-4">
            <h2 className="text-2xl font-serif font-black tracking-tight text-white leading-none">
              Rachel’s <span className="font-sans font-medium text-xs uppercase tracking-wider block sm:inline sm:ml-1 text-sage-300">Mobile Physio</span>
            </h2>
            <p className="text-xs sm:text-sm text-sage-100/70 leading-relaxed font-sans">
              {copy.footer.madeWith}
            </p>
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
              <h4 className="text-xs font-bold uppercase tracking-wider text-sage-300 mb-2 font-sans">
                {copy.coverage.listTitle}
              </h4>
              <ul className="text-xs text-sage-100/80 grid grid-cols-2 gap-2 font-sans font-medium">
                {REGIONS.map((r) => (
                  <li key={r.postalPrefix} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-sage-300 rounded-full" />
                    <strong className="font-mono text-sage-300">{r.postalPrefix}</strong>: {r.neighborhood.split(',')[0]}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 2: Contact Info */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-base font-serif font-bold text-sage-200">
              {copy.footer.contactTitle}
            </h3>
            
            <ul className="space-y-3.5 text-xs sm:text-sm text-sage-100/80 font-sans">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-sage-300" />
                </div>
                <div>
                  <p className="text-[10px] text-sage-300 uppercase tracking-widest font-bold">Phone</p>
                  <a href="tel:+14386864317" className="font-semibold hover:underline font-mono text-white">+1 (438) 686-4317</a>
                </div>
              </li>
              
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-sage-300" />
                </div>
                <div>
                  <p className="text-[10px] text-sage-300 uppercase tracking-widest font-bold">Email</p>
                  <a href="mailto:rachelmobilephysio@gmail.com" className="font-semibold hover:underline text-white">rachelmobilephysio@gmail.com</a>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <Globe className="w-4 h-4 text-sage-300" />
                </div>
                <div>
                  <p className="text-[10px] text-sage-300 uppercase tracking-widest font-bold">Website</p>
                  <a href="https://rachelmobilephysio.ca" className="font-semibold hover:underline text-white">rachelmobilephysio.ca</a>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 3: Working Hours */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-base font-serif font-bold text-sage-200">
              {copy.footer.hoursTitle}
            </h3>
            
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-sage-300" />
              </div>
              <p className="text-xs sm:text-sm text-sage-100/80 font-sans leading-relaxed whitespace-pre-line font-medium">
                {copy.footer.hours}
              </p>
            </div>
          </div>

        </div>

        {/* Lower Disclosures & Copyrights */}
        <div className="space-y-6 pt-2">
          
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-[11px] leading-relaxed text-sage-100/75 font-sans">
              ℹ️ {copy.footer.disclaimer}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-sage-100/60 font-sans">
            <span>{copy.footer.rights}</span>
            <button
              onClick={handleScrollUp}
              className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all flex items-center justify-center gap-1 text-sage-100/80 cursor-pointer text-[10px] uppercase font-bold tracking-wider"
            >
              <ArrowUp className="w-3.5 h-3.5 text-sage-300" />
              Top
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
