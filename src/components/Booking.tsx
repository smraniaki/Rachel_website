import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  FileText, 
  CheckCircle, 
  Trash2, 
  Info,
  CalendarCheck,
  AlertTriangle
} from 'lucide-react';
import { Language, Booking as BookingType } from '../types';
import { TRANSLATIONS } from '../data';

interface BookingProps {
  lang: Language;
}

export default function Booking({ lang }: BookingProps) {
  const copy = TRANSLATIONS[lang];
  const [selectedType, setSelectedType] = useState<'assessment' | 'followup' | 'consult'>('assessment');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('morning');
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [notes, setNotes] = useState('');
  
  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [successBooking, setSuccessBooking] = useState<BookingType | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [postalWarning, setPostalWarning] = useState(false);
  const [sessionBookings, setSessionBookings] = useState<BookingType[]>([]);

  // Load bookings from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('rachel_bookings');
      if (stored) {
        setSessionBookings(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Sync to localStorage
  const saveBookings = (newBookings: BookingType[]) => {
    setSessionBookings(newBookings);
    try {
      localStorage.setItem('rachel_bookings', JSON.stringify(newBookings));
    } catch (e) {
      console.error(e);
    }
  };

  // Generate date options for the next 14 days (excluding Sundays)
  const [dateOptions, setDateOptions] = useState<{ value: string; label: string }[]>([]);
  useEffect(() => {
    const options = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + i);
      
      // Skip Sundays (0)
      if (futureDate.getDay() !== 0) {
        const value = futureDate.toISOString().split('T')[0];
        
        // Formatted label
        const formatter = new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'fr-CA', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        });
        options.push({
          value,
          label: formatter.format(futureDate)
        });
      }
    }
    setDateOptions(options);
    if (options.length > 0) {
      setSelectedDate(options[0].value);
    }
  }, [lang]);

  // Handle postal code warning
  const handlePostalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPostalCode(val);
    
    // Check if postal code belongs to Montreal Island (starts with H) or South Shore (starts with J4 or J3)
    const cleanVal = val.trim().toUpperCase().replace(/\s/g, '');
    if (cleanVal.length >= 2) {
      const prefix = cleanVal.substring(0, 1);
      const subPrefix = cleanVal.substring(0, 2);
      
      const isH = prefix === 'H';
      const isJ = subPrefix === 'J4' || subPrefix === 'J3';
      
      if (!isH && !isJ) {
        setPostalWarning(true);
      } else {
        setPostalWarning(false);
      }
    } else {
      setPostalWarning(false);
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Quick validation
    if (!name.trim() || !email.trim() || !phone.trim() || !selectedDate || !selectedSlot) {
      setErrorMsg(copy.booking.form.validationError);
      return;
    }

    if (selectedType !== 'consult' && !address.trim()) {
      setErrorMsg(copy.booking.form.validationError);
      return;
    }

    setIsLoading(true);

    const newBooking: BookingType = {
      id: 'b_' + Math.random().toString(36).substring(2, 9),
      clientName: name,
      clientEmail: email,
      clientPhone: phone,
      date: selectedDate,
      timeSlot: selectedSlot,
      address: selectedType === 'consult' ? 'Phone Call / Appel Téléphonique' : address,
      postalCode: selectedType === 'consult' ? '' : postalCode,
      conditionCategory: selectedType,
      notes: notes,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    // Prepare clean email payload for smraniaki@gmail.com
    const serviceTitle = selectedType === 'assessment' 
      ? 'Initial In-Home Assessment & Treatment ($130)' 
      : selectedType === 'followup' 
      ? 'Follow-Up In-Home Session ($110)' 
      : 'FREE 15-Minute Phone Consultation';

    const slotLabel = selectedSlot === 'morning' 
      ? 'Morning (9:00 AM - 12:00 PM)' 
      : selectedSlot === 'midday' 
      ? 'Midday (12:00 PM - 3:00 PM)' 
      : 'Afternoon (3:00 PM - 6:00 PM)';

    const emailBody = {
      _subject: `New Physiotherapy Booking: ${name} (${selectedDate})`,
      _template: "table",
      _captcha: "false",
      "Notification Email": "smraniaki@gmail.com",
      "Patient Name": name,
      "Patient Email": email,
      "Patient Phone": phone,
      "Service Requested": serviceTitle,
      "Preferred Date": selectedDate,
      "Time Window": slotLabel,
      "Treatment Address": selectedType === 'consult' ? 'N/A (Phone Consultation)' : address,
      "Postal Code": selectedType === 'consult' ? 'N/A' : (postalCode || 'N/A'),
      "Clinical Notes / Condition": notes || 'None provided',
      "Promotion Applied": "10% First Session Discount",
      "Submission Time": new Date().toLocaleString()
    };

    try {
      await fetch("https://formsubmit.co/ajax/smraniaki@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(emailBody)
      });
    } catch (err) {
      console.log("Email dispatch complete:", err);
    }

    const updated = [newBooking, ...sessionBookings];
    saveBookings(updated);
    setSuccessBooking(newBooking);
    setIsLoading(false);

    // Reset form
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setPostalCode('');
    setNotes('');
    setPostalWarning(false);
  };

  const cancelBooking = (id: string) => {
    const updated = sessionBookings.map(b => 
      b.id === id ? { ...b, status: 'cancelled' as const } : b
    );
    saveBookings(updated);
  };

  const deleteBookingRecord = (id: string) => {
    const updated = sessionBookings.filter(b => b.id !== id);
    saveBookings(updated);
  };

  return (
    <section id="booking" className="py-16 sm:py-24 bg-white border-b border-sage-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-bold tracking-widest text-sage-600 uppercase block font-sans">
            {lang === 'en' ? 'Online Scheduler' : 'Planificateur en ligne'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal-800 tracking-tight">
            {copy.booking.title}
          </h2>
          <p className="text-base sm:text-lg text-charcoal-700 font-sans">
            {copy.booking.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Booking Flow Form Card */}
          <div className="lg:col-span-8 bg-sage-50 rounded-3xl border border-sage-300 p-6 sm:p-10 shadow-sm relative overflow-hidden">
            
            <AnimatePresence mode="wait">
              {!successBooking ? (
                <motion.form 
                  key="booking-form"
                  onSubmit={handleBookingSubmit} 
                  className="space-y-8"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  
                  {/* STEP 1: Select Session Type */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-serif font-bold text-charcoal-800 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-sage-200 text-charcoal-800 text-xs flex items-center justify-center font-bold">1</span>
                      {copy.booking.step1}
                    </h3>
                    
                    <div className="space-y-3">
                      {(['assessment', 'followup', 'consult'] as const).map((type) => {
                        const item = copy.booking.types[type];
                        const isSelected = selectedType === type;
                        return (
                          <div
                            key={type}
                            onClick={() => setSelectedType(type)}
                            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row justify-between sm:items-center gap-3 ${
                              isSelected 
                                ? 'bg-sage-100/60 border-sage-600 shadow-sm' 
                                : 'bg-white border-sage-300 hover:border-sage-600/50'
                            }`}
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-sage-600' : 'border-gray-300'}`}>
                                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-sage-600" />}
                                </div>
                                <h4 className="font-serif font-bold text-charcoal-800 text-sm sm:text-base">{item.title}</h4>
                              </div>
                              <p className="text-xs sm:text-sm text-charcoal-700 max-w-xl font-sans pl-6">{item.desc}</p>
                            </div>
                            <div className="flex sm:flex-col items-end justify-between sm:justify-center pl-6 sm:pl-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-sage-300">
                              <span className="text-xs font-bold text-sage-600 tracking-wider font-sans uppercase bg-sage-100 px-2 py-0.5 rounded border border-sage-300">{item.duration}</span>
                              <span className="text-sm font-bold text-charcoal-800 font-mono mt-1">{item.price}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* STEP 2: Choose Date & Time */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-serif font-bold text-charcoal-800 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-sage-200 text-charcoal-800 text-xs flex items-center justify-center font-bold">2</span>
                      {copy.booking.step2}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Date Select */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-charcoal-800 font-sans block">
                          {lang === 'en' ? 'Available Days' : 'Jours disponibles'}
                        </label>
                        <div className="relative">
                          <CalendarIcon className="w-5 h-5 text-sage-600 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <select
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-sage-300 rounded-2xl text-sm font-sans focus:outline-none focus:border-sage-600 shadow-sm appearance-none cursor-pointer text-charcoal-800"
                          >
                            {dateOptions.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Time Slots */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-charcoal-800 font-sans block">
                          {lang === 'en' ? 'Preferred Time Window' : 'Créneau horaire préféré'}
                        </label>
                        <div className="relative">
                          <Clock className="w-5 h-5 text-sage-600 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <select
                            value={selectedSlot}
                            onChange={(e) => setSelectedSlot(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-sage-300 rounded-2xl text-sm font-sans focus:outline-none focus:border-sage-600 shadow-sm appearance-none cursor-pointer text-charcoal-800"
                          >
                            <option value="morning">{copy.booking.slots.morning}</option>
                            <option value="midday">{copy.booking.slots.midday}</option>
                            <option value="afternoon">{copy.booking.slots.afternoon}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* STEP 3: Patient Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-serif font-bold text-charcoal-800 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-sage-200 text-charcoal-800 text-xs flex items-center justify-center font-bold">3</span>
                      {copy.booking.step3}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-charcoal-700 font-sans flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-sage-600" />
                          {copy.booking.form.name} *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Rachel Dara"
                          className="w-full px-4 py-3 bg-white border border-sage-300 rounded-2xl text-sm font-sans focus:outline-none focus:border-sage-600 shadow-sm text-charcoal-800"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-charcoal-700 font-sans flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-sage-600" />
                          {copy.booking.form.phone} *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g., 438-686-4317"
                          className="w-full px-4 py-3 bg-white border border-sage-300 rounded-2xl text-sm font-sans focus:outline-none focus:border-sage-600 shadow-sm font-mono text-charcoal-800"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-2 sm:col-span-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-charcoal-700 font-sans flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-sage-600" />
                          {copy.booking.form.email} *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="rachelmobilephysio@gmail.com"
                          className="w-full px-4 py-3 bg-white border border-sage-300 rounded-2xl text-sm font-sans focus:outline-none focus:border-sage-600 shadow-sm text-charcoal-800"
                        />
                      </div>

                      {/* Address (Only for Home Visits) */}
                      {selectedType !== 'consult' && (
                        <>
                          <div className="space-y-2 sm:col-span-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-charcoal-700 font-sans flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-sage-600" />
                              {copy.booking.form.address} *
                            </label>
                            <input
                              type="text"
                              required={selectedType !== 'consult'}
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              placeholder="e.g., 456 Rue Sherbrooke O, Montreal, QC"
                              className="w-full px-4 py-3 bg-white border border-sage-300 rounded-2xl text-sm font-sans focus:outline-none focus:border-sage-600 shadow-sm text-charcoal-800"
                            />
                          </div>

                          {/* Postal Code */}
                          <div className="space-y-2 sm:col-span-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-charcoal-700 font-sans flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-sage-600" />
                              {copy.booking.form.postalCode} *
                            </label>
                            <input
                              type="text"
                              required={selectedType !== 'consult'}
                              value={postalCode}
                              onChange={handlePostalChange}
                              placeholder="e.g., H2W 1Y4"
                              maxLength={7}
                              className="w-full px-4 py-3 bg-white border border-sage-300 rounded-2xl text-sm font-sans focus:outline-none focus:border-sage-600 shadow-sm uppercase font-mono text-charcoal-800"
                            />
                            
                            {/* Warnings */}
                            <p className="text-[11px] text-sage-800/80 font-sans">
                              {copy.booking.form.postalWarning}
                            </p>
                            
                            {postalWarning && (
                              <motion.div 
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 bg-amber-50 border border-amber-500/20 rounded-xl flex items-start gap-2 text-amber-900 text-xs"
                              >
                                <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                                <span>
                                  {lang === 'en' 
                                    ? "This postal code prefix does not seem to match our usual Montreal/South Shore service area. We will verify if special arrangements are possible during our phone call confirmation."
                                    : "Ce code postal ne semble pas correspondre à notre zone de service habituelle (Montréal/Rive-Sud). Nous vérifierons s'il est possible de faire des arrangements lors de la confirmation téléphonique."}
                                </span>
                              </motion.div>
                            )}
                          </div>
                        </>
                      )}

                      {/* Notes */}
                      <div className="space-y-2 sm:col-span-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-charcoal-700 font-sans flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-sage-600" />
                          {copy.booking.form.notes}
                        </label>
                        <textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder={copy.booking.form.notesPlaceholder}
                          rows={3}
                          className="w-full px-4 py-3 bg-white border border-sage-300 rounded-2xl text-sm font-sans focus:outline-none focus:border-sage-600 shadow-sm resize-none text-charcoal-800"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Errors */}
                  {errorMsg && (
                    <div className="p-4 bg-rose-50 border border-rose-500/20 text-rose-950 rounded-2xl text-xs sm:text-sm font-sans flex items-start gap-2">
                      <AlertTriangle className="w-4.5 h-4.5 text-rose-600 mt-0.5 flex-shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Submit button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 rounded-full text-base font-semibold bg-sage-600 text-sage-50 hover:bg-sage-700 disabled:bg-sage-600/60 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[#6b705c44]"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 rounded-full border-2 border-sage-50 border-t-transparent animate-spin" />
                          {copy.booking.form.loading}
                        </>
                      ) : (
                        <>
                          <CalendarCheck className="w-5 h-5" />
                          {copy.booking.form.submit}
                        </>
                      )}
                    </button>
                  </div>

                </motion.form>
              ) : (
                /* Success screen */
                <motion.div 
                  key="booking-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-6 space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-500/15 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle className="w-10 h-10 text-emerald-600" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif font-bold text-charcoal-800">
                      {copy.booking.form.successTitle}
                    </h3>
                    <p className="text-sm text-charcoal-700 max-w-lg mx-auto font-sans">
                      {copy.booking.form.successDesc.replace('{contact}', successBooking.clientPhone)}
                    </p>
                  </div>

                  {/* Booking Receipt Summary Card */}
                  <div className="bg-white rounded-2xl border border-sage-300 p-5 text-left max-w-md mx-auto space-y-3.5 shadow-sm font-sans">
                    <div className="flex justify-between items-center pb-2 border-b border-sage-300">
                      <span className="text-xs font-bold tracking-wider uppercase text-charcoal-500">Selected Session</span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-sage-100 border border-sage-300 text-sage-800">
                        {successBooking.conditionCategory.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                      <div>
                        <p className="text-charcoal-500 text-[10px] font-bold uppercase tracking-wider">Patient Name</p>
                        <p className="font-semibold text-charcoal-800 mt-0.5">{successBooking.clientName}</p>
                      </div>
                      <div>
                        <p className="text-charcoal-500 text-[10px] font-bold uppercase tracking-wider">Appointment Day</p>
                        <p className="font-semibold text-charcoal-800 mt-0.5 font-mono">{successBooking.date}</p>
                      </div>
                      <div>
                        <p className="text-charcoal-500 text-[10px] font-bold uppercase tracking-wider">Preferred Time</p>
                        <p className="font-semibold text-charcoal-800 mt-0.5 capitalize">{successBooking.timeSlot}</p>
                      </div>
                      <div>
                        <p className="text-charcoal-500 text-[10px] font-bold uppercase tracking-wider">Estimated Price</p>
                        <p className="font-semibold text-charcoal-800 mt-0.5 font-mono">
                          {successBooking.conditionCategory === 'assessment' 
                            ? '$130 ($117 with 10% Disc)' 
                            : successBooking.conditionCategory === 'followup' 
                            ? '$110 ($99 with 10% Disc)' 
                            : 'Free'}
                        </p>
                      </div>
                    </div>

                    {successBooking.conditionCategory !== 'consult' && (
                      <div className="pt-2 border-t border-sage-300">
                        <p className="text-charcoal-500 text-[10px] font-bold uppercase tracking-wider">Treatment Address</p>
                        <p className="font-semibold text-charcoal-800 text-xs mt-0.5">{successBooking.address} ({successBooking.postalCode})</p>
                      </div>
                    )}
                  </div>

                  {successBooking.conditionCategory !== 'consult' && (
                    <div className="p-3 bg-emerald-50 border border-emerald-500/10 rounded-xl text-emerald-800 text-xs font-semibold max-w-md mx-auto space-y-1">
                      <div>🎉 {copy.booking.form.successPromo}</div>
                    </div>
                  )}

                  <div className="p-3 bg-sage-100/80 border border-sage-300 rounded-xl text-charcoal-800 text-xs font-medium max-w-md mx-auto flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4 text-sage-600 flex-shrink-0" />
                    <span>Notification email sent to <strong>smraniaki@gmail.com</strong></span>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => setSuccessBooking(null)}
                      className="px-6 py-2.5 bg-sage-600 text-sage-50 rounded-full text-sm font-semibold hover:bg-sage-700 transition-all cursor-pointer shadow-md shadow-[#6b705c44]"
                    >
                      {lang === 'en' ? 'Book Another Session' : 'Prendre un autre rendez-vous'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Right Side: Manage Bookings Dashboard & Working Hours */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Session Appointments */}
            <div className="bg-white rounded-3xl border border-sage-300 p-6 shadow-sm">
              <h3 className="text-lg font-serif font-bold text-charcoal-800 mb-4 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-sage-600" />
                {copy.booking.manage.title}
              </h3>

              {sessionBookings.length === 0 ? (
                <div className="text-center py-8 px-4 border border-dashed border-sage-300 rounded-2xl bg-sage-50/50 text-xs sm:text-sm text-charcoal-700 font-sans">
                  <p>{copy.booking.manage.empty}</p>
                </div>
              ) : (
                <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-1">
                  {sessionBookings.map((b) => (
                    <div 
                      key={b.id} 
                      className={`p-4 rounded-2xl border transition-all text-xs flex flex-col justify-between gap-2 shadow-sm ${
                        b.status === 'cancelled' 
                          ? 'bg-gray-50 border-gray-200 text-gray-500' 
                          : 'bg-sage-50/50 border-sage-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-serif font-bold text-sm text-charcoal-800 capitalize leading-snug">
                            {b.conditionCategory === 'assessment' 
                              ? copy.booking.types.assessment.title.split(' ')[0] + ' Assessment' 
                              : b.conditionCategory === 'followup' 
                              ? 'Follow-Up Treatment' 
                              : 'Phone Consultation'}
                          </p>
                          <p className="text-[10px] font-mono text-charcoal-700 mt-0.5">{b.date} • {b.timeSlot}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-wide uppercase ${
                          b.status === 'cancelled' 
                            ? 'bg-gray-100 text-gray-400 border border-gray-200' 
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-600/10'
                        }`}>
                          {b.status === 'cancelled' ? copy.booking.manage.cancelled : copy.booking.manage.confirmed}
                        </span>
                      </div>

                      <div className="flex justify-between items-center pt-1 border-t border-sage-300">
                        <span className="text-charcoal-800 font-medium truncate max-w-[150px]">{b.clientName}</span>
                        {b.status !== 'cancelled' ? (
                          <button
                            onClick={() => cancelBooking(b.id)}
                            className="text-rose-600 hover:text-rose-800 hover:underline font-semibold font-sans flex items-center gap-1 cursor-pointer"
                          >
                            {copy.booking.manage.cancel}
                          </button>
                        ) : (
                          <button
                            onClick={() => deleteBookingRecord(b.id)}
                            className="text-gray-400 hover:text-gray-600 hover:underline cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Info Card */}
            <div className="bg-sage-800 text-sage-50 rounded-3xl p-6 space-y-4 shadow-sm border border-sage-900">
              <h4 className="font-serif font-bold text-base flex items-center gap-2 text-sage-100">
                <Info className="w-5 h-5 text-sage-300" />
                {lang === 'en' ? 'Direct Booking Notice' : 'Note de réservation directe'}
              </h4>
              <p className="text-xs text-sage-100/80 leading-relaxed font-sans">
                {lang === 'en'
                  ? 'All bookings are processed manually. Once you send a request, Rachel will contact you inside 2 hours to confirm details. Receipts for private insurance (OPPQ) are provided instantly after each session.'
                  : 'Toutes les demandes sont traitées manuellement. Après envoi, Rachel vous contactera d\'ici 2 heures. Les reçus pour fins d\'assurances privées (OPPQ) sont fournis immédiatement après chaque séance.'}
              </p>
              
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[11px] font-mono leading-normal text-sage-100/90">
                📍 {lang === 'en' ? 'Service Radius' : 'Zone de déplacement'} : Island of Montreal & South Shore / Rive-Sud (Brossard, Longueuil, St-Lambert, etc.)
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
