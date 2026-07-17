import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, Plus, CheckCircle, ShieldCheck, User, Sparkles } from 'lucide-react';
import { Language, Testimonial } from '../types';
import { TRANSLATIONS, TESTIMONIALS } from '../data';

interface TestimonialsProps {
  lang: Language;
}

export default function Testimonials({ lang }: TestimonialsProps) {
  const copy = TRANSLATIONS[lang];
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // New review form fields
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [condition, setCondition] = useState('');
  const [comment, setComment] = useState('');
  
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('rachel_testimonials');
      if (stored) {
        setReviews(JSON.parse(stored));
      } else {
        setReviews(TESTIMONIALS);
      }
    } catch (e) {
      console.error(e);
      setReviews(TESTIMONIALS);
    }
  }, []);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!name.trim() || !comment.trim() || !condition.trim()) {
      setErrorMsg(lang === 'en' ? 'Please fill out all fields.' : 'Veuillez remplir tous les champs.');
      return;
    }

    const newReview: Testimonial = {
      id: 'r_' + Math.random().toString(36).substring(2, 9),
      name,
      rating,
      date: new Date().toISOString().split('T')[0],
      comment,
      conditionTreated: condition
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    try {
      localStorage.setItem('rachel_testimonials', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    // Success reset
    setSuccessMsg(copy.testimonials.form.success);
    setName('');
    setRating(5);
    setCondition('');
    setComment('');
    setTimeout(() => {
      setShowAddForm(false);
      setSuccessMsg('');
    }, 3000);
  };

  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-sage-50 border-b border-sage-300 relative">
      <div className="absolute right-0 top-1/4 w-32 h-64 bg-sage-100/60 rounded-l-full -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <span className="text-sm font-bold tracking-widest text-sage-600 uppercase block font-sans">
              {lang === 'en' ? 'Patient Voices' : 'Paroles de patients'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal-800 tracking-tight">
              {copy.testimonials.title}
            </h2>
            <p className="text-base sm:text-lg text-charcoal-700 font-sans">
              {copy.testimonials.subtitle}
            </p>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-6 py-3 bg-sage-600 text-sage-50 rounded-full text-sm font-semibold hover:bg-sage-700 shadow-md flex items-center gap-2 transition-all cursor-pointer flex-shrink-0 shadow-[#6b705c44]"
          >
            <Plus className={`w-4 h-4 transition-transform ${showAddForm ? 'rotate-45' : ''}`} />
            {copy.testimonials.addReview}
          </button>
        </div>

        {/* Add Review Dialog / Drawer */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden mb-12 bg-white rounded-3xl border border-sage-300 shadow-md max-w-xl mx-auto"
            >
              <form onSubmit={handleAddReview} className="p-6 sm:p-8 space-y-5">
                <h3 className="text-lg font-serif font-bold text-charcoal-800 flex items-center gap-2 border-b border-sage-300 pb-3">
                  <Sparkles className="w-5 h-5 text-sage-600" />
                  {copy.testimonials.addReview}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-charcoal-700 uppercase tracking-wider block font-sans">
                      {copy.testimonials.form.name} *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Marie-Claude L."
                      className="w-full px-4 py-2.5 bg-sage-50 border border-sage-300 rounded-xl text-sm font-sans focus:outline-none focus:border-sage-600 text-charcoal-800"
                    />
                  </div>

                  {/* Condition Treated */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-charcoal-700 uppercase tracking-wider block font-sans">
                      {copy.testimonials.form.condition} *
                    </label>
                    <input
                      type="text"
                      required
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}
                      placeholder={copy.testimonials.form.conditionPlaceholder}
                      className="w-full px-4 py-2.5 bg-sage-50 border border-sage-300 rounded-xl text-sm font-sans focus:outline-none focus:border-sage-600 text-charcoal-800"
                    />
                  </div>
                </div>

                {/* Rating Select stars */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-charcoal-700 uppercase tracking-wider block font-sans">
                    {copy.testimonials.form.rating} *
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="text-2xl transition-transform hover:scale-110 cursor-pointer"
                      >
                        <Star className={`w-6 h-6 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-charcoal-700 uppercase tracking-wider block font-sans">
                    {copy.testimonials.form.comment} *
                  </label>
                  <textarea
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={copy.testimonials.form.commentPlaceholder}
                    rows={4}
                    className="w-full px-4 py-2.5 bg-sage-50 border border-sage-300 rounded-xl text-sm font-sans focus:outline-none focus:border-sage-600 resize-none text-charcoal-800"
                  />
                </div>

                {/* Messages */}
                {errorMsg && (
                  <p className="text-xs text-rose-600 font-sans">{errorMsg}</p>
                )}
                {successMsg && (
                  <div className="p-3 bg-emerald-50 border border-emerald-500/10 rounded-xl text-emerald-800 text-xs flex items-center gap-1.5 font-sans font-medium">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{successMsg}</span>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-sage-600 hover:bg-sage-700 text-sage-50 rounded-xl text-sm font-bold shadow transition-all cursor-pointer shadow-[#6b705c44]"
                >
                  {copy.testimonials.form.submit}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Testimonials Grid Card list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((rev, index) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.05, duration: 0.6 }}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-sage-300 shadow-sm flex flex-col justify-between gap-6 relative overflow-hidden group hover:shadow-md hover:border-sage-600/55 transition-all"
            >
              {/* Star Rating & Quote Visual icon */}
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-sage-800 bg-sage-100 px-2 py-0.5 rounded border border-sage-300 font-bold uppercase tracking-wider">
                    {rev.conditionTreated}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-charcoal-700 italic text-sm sm:text-base leading-relaxed font-sans font-medium">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex justify-between items-center pt-4 border-t border-sage-300 text-xs sm:text-sm">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-sage-100 border border-sage-300 flex items-center justify-center">
                    <User className="w-4 h-4 text-sage-600" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-charcoal-800">{rev.name}</h4>
                    <span className="text-[10px] font-sans text-charcoal-500 uppercase tracking-widest">{lang === 'en' ? 'Verified Client' : 'Client vérifié'}</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-charcoal-500">{rev.date}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
