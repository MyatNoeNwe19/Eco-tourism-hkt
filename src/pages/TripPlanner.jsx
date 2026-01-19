import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

import {
  Clock, MapPin, Train, Wallet, Camera, Info,
  ChevronRight, Download, ExternalLink, Sun,
  Wind, Map as MapIcon, ShieldCheck, Coffee,
  ShoppingBag, Anchor, HelpCircle, Utensils,
  CloudRain, Languages, PhoneCall, Heart,
  Star, Calendar, Users, CreditCard, CheckCircle2,
  Navigation, Eye, Music, Ticket, Zap, Scissors, Home, Sparkles, Plus, Minus,
  Globe, Award, Bookmark, Share2, Instagram, Facebook, Twitter, ShieldAlert,
  Bike, Briefcase, MessageSquare, Trash2, Image as ImageIcon
} from 'lucide-react';
import Navbar from './NavbarPage';
import FooterPage from './FooterPage';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const PRICES = {
  ADULT: 15000,
  CHILD: 8500,
  FAMILY_BASE: 42000,
  PREMIUM_UPGRADE: 5000,
  BOOKING_FEE: 1200
};

const EXCHANGE_RATES = { JPY: 1, USD: 0.0067, EUR: 0.0063, MMK: 46.5, VND: 168.0, KRW: 9.2 };

const ITINERARY_DAYS = {
  1: [
    {
      time: "09:00 AM",
      title: "dayPlan.days.day1.s1.title",
      desc: "dayPlan.days.day1.s1.desc",
      icon: Train,
      tags: ["arrival", "history"]
    },
    {
      time: "11:00 AM",
      title: "dayPlan.days.day1.s2.title",
      desc: "dayPlan.days.day1.s2.desc",
      icon: Anchor,
      tags: ["signature", "scenic"]
    },
    {
      time: "01:30 PM",
      title: "dayPlan.days.day1.s3.title",
      desc: "dayPlan.days.day1.s3.desc",
      icon: Utensils,
      tags: ["gourmet"]
    },
    {
      time: "03:30 PM",
      title: "dayPlan.days.day1.s4.title",
      desc: "dayPlan.days.day1.s4.desc",
      icon: Camera,
      tags: ["art"]
    },
    {
      time: "06:00 PM",
      title: "dayPlan.days.day1.s5.title",
      desc: "dayPlan.days.day1.s5.desc",
      icon: Sparkles,
      tags: ["tags.seasonal"]
    }
  ],
  2: [
    {
      time: "10:00 AM",
      title: "dayPlan.days.day2.s1.title",
      desc: "dayPlan.days.day2.s1.desc",
      icon: Scissors,
      tags: ["craft"]
    },
    {
      time: "12:30 PM",
      title: "dayPlan.days.day2.s2.title",
      desc: "dayPlan.days.day2.s2.desc",
      icon: Utensils,
      tags: ["gourmet"]
    },
    {
      time: "02:00 PM",
      title: "dayPlan.days.day2.s3.title",
      desc: "dayPlan.days.day2.s3.desc",
      icon: Home,
      tags: ["architecture", "history"]
    },
    {
      time: "05:30 PM",
      title: "dayPlan.days.day2.s4.title",
      desc: "dayPlan.days.day2.s4.desc",
      icon: Navigation,
      tags: ["scenic"]
    }
  ],
  3: [
    {
      time: "09:00 AM",
      title: "dayPlan.days.day3.s1.title",
      desc: "dayPlan.days.day3.s1.desc",
      icon: ShoppingBag,
      tags: ["local", "gourmet"]
    },
    {
      time: "11:00 AM",
      title: "dayPlan.days.day3.s2.title",
      desc: "dayPlan.days.day3.s2.desc",
      icon: Scissors,
      tags: ["craft"]
    },
    {
      time: "01:00 PM",
      title: "dayPlan.days.day3.s3.title",
      desc: "dayPlan.days.day3.s3.desc",
      icon: Coffee,
      tags: ["relax", "history"]
    },
    {
      time: "04:00 PM",
      title: "dayPlan.days.day3.s4.title",
      desc: "dayPlan.days.day3.s4.desc",
      icon: MapPin,
      tags: ["farewell"]
    }
  ]
};

const PHOTO_SPOTS = [
  {
    name: "dayPlan.photo_spots.spot1.name",
    peak: 17,
    description: "dayPlan.photo_spots.spot1.desc"
  },
  {
    name: "dayPlan.photo_spots.spot2.name",
    peak: 10,
    description: "dayPlan.photo_spots.spot2.desc"
  },
  {
    name: "dayPlan.photo_spots.spot3.name",
    peak: 14,
    description: "dayPlan.photo_spots.spot3.desc"
  }
];

const LOCAL_FOODS = [
  {
    name: "dayPlan.foods.f1.name",
    price: "¥1,200",
    image: "🍑",
    desc: "dayPlan.foods.f1.desc"
  },
  {
    name: "dayPlan.foods.f2.name",
    price: "¥500",
    image: "🍡",
    desc: "dayPlan.foods.f2.desc"
  },
  {
    name: "dayPlan.foods.f3.name",
    price: "¥1,100",
    image: "🍜",
    desc: "dayPlan.foods.f3.desc"
  }
];

const PACKING_CHECKLIST = [
  { item: "dayPlan.checklist.item1", icon: Heart },
  { item: "dayPlan.checklist.item2", icon: Zap },
  { item: "dayPlan.checklist.item3", icon: Wind },
  { item: "dayPlan.checklist.item4", icon: Sun }
];

const SectionTitle = ({ number, title, subtitle }) => (
  <div className="mb-12">
    <div className="flex items-center gap-4 mb-4">
      <span className="text-[10px] font-black text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-tighter">{number}</span>
      <div className="h-[1px] w-8 bg-stone-200"></div>
    </div>
    <h2 className="text-3xl md:text-4xl font-serif italic text-stone-900 mb-4">{title}</h2>
    <p className="text-stone-500 font-light text-sm max-w-lg leading-relaxed">{subtitle}</p>
  </div>
);

const TimelineItem = ({ time, title, desc, icon: Icon, tags }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative pl-16 pb-10 group">
    <div className="absolute left-[23px] top-0 bottom-0 w-[1px] bg-stone-100 group-last:bg-transparent" />
    <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-white border border-stone-200 flex items-center justify-center z-10 group-hover:bg-stone-900 group-hover:text-white transition-all duration-500 shadow-lg">
      <Icon size={16} />
    </div>
    <div className="bg-white p-7 rounded-[35px] border border-stone-50 hover:border-emerald-100 shadow-sm hover:shadow-xl transition-all duration-500">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[9px] font-mono font-black text-stone-400 uppercase tracking-widest">{time}</span>
        <div className="flex gap-1"><Star size={8} className="text-amber-400 fill-amber-400" /><Star size={8} className="text-amber-400 fill-amber-400" /></div>
      </div>
      <h4 className="text-xl font-serif italic text-stone-900 mb-2">{title}</h4>
      <p className="text-xs text-stone-500 font-light leading-relaxed mb-5">{desc}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <span key={i} className="text-[8px] bg-stone-50 px-2.5 py-1 rounded-full uppercase font-bold text-stone-400 border border-stone-100 italic">#{tag}</span>
        ))}
      </div>
    </div>
  </motion.div>
);


const TripPlannerPage = () => {
  const [activeDay, setActiveDay] = useState(1);
  const [bookingStep, setBookingStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [bookingDate, setBookingDate] = useState('2026-01-20');
  const [counts, setCounts] = useState({ adult: 2, child: 0, family: 0 });
  const [currency, setCurrency] = useState('JPY');
  const [vibe, setVibe] = useState('All');
  const [hour, setHour] = useState(12);
  const [userRating, setUserRating] = useState(); // Default 5 stars
  const [userName, setUserName] = useState("");
  const [t, i18n] = useTranslation();


  const [newReview, setNewReview] = useState("");

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const navigate = useNavigate();

  const formatPrice = (amount) => {
    const converted = amount * EXCHANGE_RATES[currency];
    if (currency === 'MMK') {
      return new Intl.NumberFormat('en-US').format(Math.round(converted)) + " Ks";
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency', currency: currency, maximumFractionDigits: 0,
    }).format(converted);
  };

  const calculateTotal = () => {
    let subtotal = counts.family > 0 ? PRICES.FAMILY_BASE : ((counts.adult * PRICES.ADULT) + (counts.child * PRICES.CHILD));

    if (isPremium) {
      const headCount = counts.family > 0 ? 4 : (counts.adult + counts.child);
      subtotal += headCount * PRICES.PREMIUM_UPGRADE;
    }

    const today = new Date();
    const travelDate = new Date(bookingDate);
    const diffDays = Math.ceil((travelDate - today) / (1000 * 60 * 60 * 24));
    if (diffDays >= 30) subtotal *= 0.9;

    return subtotal > 0 ? subtotal + PRICES.BOOKING_FEE : 0;
  };


  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem('kurashiki_reviews');
    return savedReviews ? JSON.parse(savedReviews) : [
      { id: 1, user: "Moe Moe", rating: 5, text: "The canal boat ride was magical!" },
      { id: 2, user: "Kyaw Zayar", rating: 4, text: "Very peaceful and beautiful." }
    ];
  });

  useEffect(() => {
    localStorage.setItem('kurashiki_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const handlePostReview = () => {
    if (newReview.trim() && userName.trim()) {
      const reviewData = {
        id: Date.now(),
        user: userName,
        rating: userRating,
        text: newReview
      };
      setReviews([reviewData, ...reviews]);
      setNewReview("");
      setUserName("");
      setUserRating();
    } else {
      alert("Please fill in both name and review!");
    }
  };

  const deleteReview = (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      const updatedReviews = reviews.filter(r => r.id !== id);
      setReviews(updatedReviews);
    }
  };

  const filteredItinerary = useMemo(() => {
    const dayData = ITINERARY_DAYS[activeDay] || [];

    return dayData.filter(item => {
      if (vibe === 'All') return true;

      return item.tags?.some(tag =>
        tag.toLowerCase().includes(vibe.toLowerCase())
      );
    });
  }, [activeDay, vibe]);


  return (
    <div className="bg-[#F1F5F9] min-h-screen text-stone-900 selection:bg-stone-900 selection:text-white relative">
      <Navbar />
      
      {/* HERO SECTION */}
      <section ref={heroRef} className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-stone-900 relative">
        <motion.div style={{ y: heroY }} className="absolute inset-0 opacity-60">
          <img src="./images/autumn1.avif" className="w-full h-full object-cover" alt="Kurashiki" />
        </motion.div>
        <div className="relative z-10 text-center px-6">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-8xl font-serif italic text-white mb-6">{t('trip.title')}</motion.h1>
          <p className="text-white/90 font-light italic tracking-widest uppercase text-[15px]">{t('trip.desc')}</p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-8 lg:px-16 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* LEFT: BOOKING & TRACKERS */}
          <div className="lg:col-span-5 sticky top-32 space-y-8 order-2 lg:order-1">
            <div className="bg-white border border-stone-200 rounded-[50px] p-8 md:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-green-500 to-stone-900" />

              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-2xl font-serif italic">{t('trip.reserved')}</h3>
                  <div className="flex gap-2 mt-2 overflow-x-auto pb-2 scrollbar-hide">
                    {['JPY', 'USD', 'EUR', 'MMK', 'VND', 'KRW'].map(curr => (
                      <button key={curr} onClick={() => setCurrency(curr)} className={`text-[8px] px-2 py-0.5 rounded-full font-bold transition-colors whitespace-nowrap ${currency === curr ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-400'}`}>{curr}</button>
                    ))}
                  </div>
                </div>
                <span className="text-[10px] border-1 border-green-400 bg-stone-100 px-3 py-1 rounded-full font-bold uppercase tracking-widest text-stone-500">{t('trip.step')} {bookingStep}/3</span>
              </div>

              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {bookingStep === 1 && (
                      <div className="space-y-6">
                        <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest">{t('trip.date')}</label>
                        <input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} className="w-full p-5 bg-stone-50 rounded-3xl border-none outline-none font-bold text-sm focus:ring-1 ring-stone-200" />
                        <div className="p-5 bg-emerald-50 rounded-3xl flex gap-3 italic">
                          <Zap size={16} className="text-green-700" />
                          <p className="text-[11px] text-green-800">{t('trip.bird')}</p>
                        </div>
                      </div>
                    )}

                    {bookingStep === 2 && (
                      <div className="space-y-4">
                        {['adult', 'child'].map((k) => (
                          <div key={k} className="flex justify-between items-center p-5 bg-stone-50 rounded-[30px] border border-stone-100 transition-opacity" style={{ opacity: counts.family > 0 ? 0.4 : 1 }}>
                            <div>
                              <p className="text-sm font-bold capitalize">{k}s</p>
                              <p className="text-[10px] text-stone-400">{formatPrice(PRICES[k.toUpperCase()])}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <button disabled={counts.family > 0} onClick={() => setCounts({ ...counts, [k]: Math.max(0, counts[k] - 1) })} className="p-2 border rounded-full bg-white disabled:opacity-30"><Minus size={12} /></button>
                              <span className="text-sm font-bold w-4 text-center">{counts[k]}</span>
                              <button disabled={counts.family > 0} onClick={() => setCounts({ ...counts, [k]: counts[k] + 1 })} className="p-2 border rounded-full bg-stone-900 text-white disabled:opacity-30"><Plus size={12} /></button>
                            </div>
                          </div>
                        ))}
                        <div onClick={() => setCounts({ adult: 0, child: 0, family: counts.family ? 0 : 1 })} className={`p-6 rounded-[30px] border-2 transition-all cursor-pointer flex justify-between items-center ${counts.family > 0 ? 'border-emerald-900 bg-emerald-900 text-white shadow-lg' : 'border-stone-100 bg-stone-50 hover:border-emerald-200'}`}>
                          <div>
                            <p className="text-sm font-bold">{t('trip.family')}</p>
                            <p className={`text-[10px] ${counts.family > 0 ? 'text-white/70' : 'text-stone-400'}`}>{t('trip.upto')} {formatPrice(PRICES.FAMILY_BASE)}</p>
                          </div>
                          {counts.family > 0 && <CheckCircle2 size={18} />}
                        </div>
                      </div>
                    )}

                    {bookingStep === 3 && (
                      <div className="space-y-6">
                        <div className="bg-stone-900 text-white p-8 rounded-[40px] space-y-4 shadow-xl">
                          <div className="flex justify-between text-xs opacity-50 uppercase font-bold tracking-tighter"><span>{t('trip.continue')}</span><span>{bookingDate}</span></div>
                          <div className="h-[1px] bg-white/10" />
                          <div className="space-y-2 text-xs font-light">
                            {counts.family > 0 ? <div className="flex justify-between"><span>{t('trip.plan')}</span><span>{formatPrice(PRICES.FAMILY_BASE)}</span></div> :
                              <><div className="flex justify-between"><span>{t('trip.adult')} x{counts.adult}</span><span>{formatPrice(counts.adult * PRICES.ADULT)}</span></div>
                                {counts.child > 0 && <div className="flex justify-between"><span>{t('trip.child')} x{counts.child}</span><span>{formatPrice(counts.child * PRICES.CHILD)}</span></div>}</>}
                            {isPremium && <div className="flex justify-between text-emerald-400 font-bold"><span>{t('trip.service')}</span><span>{t('trip.included')}</span></div>}
                            <div className="flex justify-between text-stone-500 italic"><span>{t('trip.booking')}</span><span>{formatPrice(PRICES.BOOKING_FEE)}</span></div>
                          </div>
                          <div className="flex justify-between text-2xl font-serif italic pt-4 border-t border-white/10"><span>{t('trip.total')}</span><span>{formatPrice(calculateTotal())}</span></div>
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-3xl bg-white hover:border-emerald-500 transition-colors cursor-pointer" onClick={() => setIsPremium(!isPremium)}>
                          <div className="flex items-center gap-3">
                            <ShieldCheck size={20} className={isPremium ? "text-emerald-600" : "text-stone-300"} />
                            <span className="text-xs font-bold italic text-stone-600">{t('trip.private')}</span>
                          </div>
                          <div className={`w-10 h-5 rounded-full transition-colors ${isPremium ? 'bg-emerald-600' : 'bg-stone-200'}`}>
                            <div className={`w-3 h-3 bg-white rounded-full mt-1 transition-all ${isPremium ? 'ml-6' : 'ml-1'}`} />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mt-8 flex gap-3">
                      {bookingStep > 1 && <button onClick={() => setBookingStep(s => s - 1)} className="px-6 py-4 border border-stone-200 rounded-full text-[10px] font-bold uppercase hover:bg-stone-50 transition-all">{t('trip.back')}</button>}
                      <button onClick={() => bookingStep === 3 ? setIsSuccess(true) : setBookingStep(s => s + 1)} disabled={calculateTotal() === 0} className="flex-1 bg-stone-900 text-white py-4 rounded-full text-[10px] font-bold uppercase disabled:opacity-20 hover:bg-emerald-800 transition-all shadow-lg">
                        {bookingStep === 3 ? "Confirm Reservation" : t('trip.continue')}
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center py-6">
                    <CheckCircle2 size={56} className="mx-auto text-emerald-600 mb-6" />
                    <h4 className="text-3xl font-serif italic mb-2">{t('trip.pass')}</h4>
                    <p className="text-xs text-stone-400 mb-8 leading-relaxed">{t('trip.passage')} {bookingDate} {t('trip.check')}</p>
                    <button onClick={() => { setIsSuccess(false); setBookingStep(1); }} className="w-full py-4 bg-stone-100 rounded-full text-[10px] font-bold uppercase hover:bg-stone-200 transition-colors">{t('trip.new')}</button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-8 pt-8 border-t border-stone-100 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 group-hover:text-emerald-800 transition-colors"><PhoneCall size={14} /></div>
                <div>
                  <p className="text-[9px] font-black uppercase text-stone-400 tracking-widest">{t('trip.support')}</p>
                  <p className="text-xs font-bold text-stone-900">+81 86-426-1751</p>
                </div>
                <div className="ml-auto flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[8px] font-bold text-emerald-600 uppercase">Live</span>
                </div>
              </div>


            </div>
            {/* 3. Packing Checklist Feature */}
            <div className="bg-green-200 border border-stone-100 rounded-[40px] p-8 shadow-sm">
              <h4 className="text-[10px] font-black uppercase text-stone-400 mb-6 tracking-widest flex items-center gap-2">
                <Briefcase size={14} /> {t('trip.checkList')} {/* ဒါက ခေါင်းစဉ်ပါ */}
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {PACKING_CHECKLIST.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-stone-50 text-[11px] font-bold">
                    <item.icon size={14} className="text-emerald-600" />

                    {/* ဒီနေရာမှာ t() သုံးမှ စာသားပေါ်မှာပါ */}
                    {t(item.item)}
                  </div>
                ))}
              </div>
            </div>


            {/* PHOTO SPOT TRACKER */}
            <div className="p-8 bg-stone-900 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5"><Camera size={80} /></div>
              <div className="flex justify-between items-end mb-6 relative z-10">
                <h4 className="font-serif italic text-xl">{t('trip.hour')}</h4>
                <span className="text-emerald-400 font-mono text-2xl">{hour}:00</span>
              </div>
              <input type="range" min="6" max="20" value={hour} onChange={(e) => setHour(parseInt(e.target.value))} className="w-full mb-8 h-1 bg-stone-700 accent-emerald-500 rounded-lg appearance-none cursor-pointer relative z-10" />
              <div className="space-y-4 relative z-10">
                {PHOTO_SPOTS.map((spot) => (
                  <div key={spot.name} className={`flex justify-between transition-all duration-500 ${Math.abs(spot.peak - hour) <= 1 ? 'opacity-100 scale-100' : 'opacity-20 scale-95 translate-x-2'}`}>
                    <div>
                      {/* t() function များ ထည့်သွင်းပေးထားပါတယ် */}
                      <p className="text-xs font-bold">{t(spot.name)}</p>
                      <p className="text-[10px] text-stone-400">{t(spot.description)}</p>
                    </div>
                    {Math.abs(spot.peak - hour) <= 1 && <Camera size={14} className="text-emerald-400 animate-pulse" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Added Kurashiki-tabi Weather Forecast Feature */}
            <div className="p-8 bg-emerald-50 border border-emerald-100 rounded-[40px] text-emerald-900 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-[11px] font-black uppercase tracking-widest">{t('trip.season')}</h4>
                <CloudRain size={16} />
              </div>
              <p className="text-xs font-serif italic mb-2">{t('trip.bloom')}</p>
              <p className="text-[10px] leading-relaxed opacity-70">{t('trip.rainy')}</p>
            </div>
          </div>

          {/* RIGHT: CONTENT SECTIONS */}
          <div className="lg:col-span-7 space-y-24 order-1 lg:order-2">

            {/* Section 01: Itinerary */}
            <div id="itinerary" className="scroll-mt-32">
              <SectionTitle
                number="01"
                title={t('trip.sections.s1.title')}
                subtitle={t('trip.sections.s1.subtitle')}
              />

              <div className="flex flex-wrap gap-4 mb-10 overflow-x-auto pb-4 scrollbar-hide">
                <div className="flex bg-stone-100 p-1 rounded-full">
                  {[1, 2, 3].map(d => (
                    <button
                      key={d}
                      onClick={() => setActiveDay(d)}
                      className={`px-10 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeDay === d ? 'bg-stone-900 text-white shadow-xl' : 'text-stone-400 hover:text-stone-600'}`}
                    >
                      {t('trip.step')} {d}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2 items-center ml-auto overflow-x-auto whitespace-nowrap scrollbar-hide">
                  <span className="text-[9px] font-bold text-green-800 uppercase mr-2 tracking-widest">
                    {t('trip.filter')}
                  </span>

                  {['All', 'Art', 'Gourmet', 'Craft', 'Seasonal'].map(v => (
                    <button
                      key={v}
                      onClick={() => setVibe(v)} // v ရဲ့ value က 'Art', 'Gourmet' စသဖြင့် ဖြစ်မယ်
                      className={`text-[8px] px-4 py-2 rounded-full border transition-all font-bold ${vibe === v
                        ? 'bg-emerald-900 text-white border-emerald-900 shadow-md'
                        : 'text-stone-400 border-stone-200 hover:border-stone-400'
                        }`}
                    >
                      {/* 'All' ဆိုရင် All ပြပြီး ကျန်တာကို i18n tag ထဲက ယူသုံးမယ် */}
                      {v === 'All' ? 'All' : t(`dayPlan.tags.${v.toLowerCase()}`)}
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDay + vibe}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-2"
                >
                  {filteredItinerary.length > 0 ? (
                    filteredItinerary.map((item, idx) => (
                      <TimelineItem
                        key={idx}
                        {...item}
                        title={t(item.title)}
                        desc={t(item.desc)}
                        tags={item.tags?.map(tag => t(`${tag.toLowerCase()}`))}
                      />
                    ))
                  ) : (
                    <div className="py-20 text-center">
                      <p className="text-stone-400 text-sm italic">No activities found for this category.</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Section 02: Local Food Guide */}
            <div>
              <SectionTitle
                number="02"
                title={t('trip.sections.s2.title')}
                subtitle={t('trip.sections.s2.subtitle')}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {LOCAL_FOODS.map((food, i) => (
                  <div key={i} className="bg-white border border-stone-100 p-6 rounded-[40px] hover:shadow-xl transition-all group">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-500">{food.image}</div>
                    <h4 className="text-sm font-bold mb-1">{t(food.name)}</h4>
                    <p className="text-[10px] text-stone-400 italic mb-4">{food.price}</p>
                    <p className="text-[10px] text-stone-500 leading-relaxed">{t(food.desc)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 03: Logistics */}
            <div id="map" className="scroll-mt-32">
              <SectionTitle
                number="03"
                title={t('trip.sections.s3.title')}
                subtitle={t('trip.sections.s3.subtitle')}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 bg-stone-900 text-white rounded-[50px] space-y-4">
                  <div className="flex items-center gap-3">
                    <Train className="text-emerald-400" size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest">{t('trip.logistics.shinkansen')}</span>
                  </div>
                  <p className="text-[11px] opacity-70 leading-relaxed">{t('trip.logistics.shinkansen_desc')}</p>
                </div>
                <div className="p-8 bg-emerald-900 text-white rounded-[50px] space-y-4">
                  <div className="flex items-center gap-3">
                    <Bike className="text-emerald-300" size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest">{t('trip.logistics.getting_around')}</span>
                  </div>
                  <p className="text-[11px] opacity-70 leading-relaxed">{t('trip.logistics.getting_around_desc')}</p>
                </div>
              </div>
            </div>

            {/* --- Review Form Section --- */}
            <div className="bg-green-900 p-8 rounded-[40px] shadow-xl border border-stone-200 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder={t('trip.review_form.placeholder_name')}
                  className="bg-stone-50 p-4 rounded-2xl text-xs outline-none border-none focus:ring-1 ring-stone-200 font-bold"
                />

                <div className="flex items-center justify-between bg-stone-50 px-5 py-4 rounded-2xl">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                    {t('trip.review_form.rating_label')}
                  </span>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setUserRating(star)}
                        className="transition-transform hover:scale-125"
                      >
                        <Star
                          size={20}
                          className={`${star <= userRating ? "fill-amber-400 text-amber-400" : "text-stone-200"} transition-colors cursor-pointer`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative">
                <textarea
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  placeholder={t('trip.review_form.placeholder_text')}
                  className="w-full bg-stone-50/50 p-6 rounded-[25px] text-xs min-h-[120px] outline-none border-none focus:ring-1 ring-stone-200 resize-none"
                />
                <div className="mt-4 flex justify-end gap-3 items-center">
                  <button type="button" className="p-2 text-stone-300 hover:text-stone-500">
                    <ImageIcon size={20} />
                  </button>
                  <button
                    onClick={handlePostReview}
                    className="px-10 py-4 bg-stone-900 text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-800 transition-all shadow-lg shadow-stone-200"
                  >
                    {t('trip.review_form.post_btn')}
                  </button>
                </div>
              </div>
            </div>

            {/* --- Review List Section --- */}
            <div id="community" className="space-y-4 py-5 max-h-[450px] bg-green-100 border border-green-200 rounded-2xl overflow-y-auto pr-2 scrollbar-hide scroll-mt-32">
              {reviews.map(r => (
                <div key={r.id} className="bg-white p-5 max-w-[580px] mx-auto rounded-[30px] shadow-sm border border-green-100 group relative">

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteReview(r.id)}
                    className="absolute top-4 right-4 p-2 text-stone-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={14} />
                  </button>

                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[11px] font-black uppercase text-stone-700 tracking-widest">
                      {r.user}
                    </span>
                    <div className="flex gap-0.5 mr-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < r.rating ? "fill-amber-400 text-amber-400" : "text-stone-100"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-stone-500 italic leading-relaxed">"{r.text}"</p>
                </div>
              ))}
            </div>



            {/* Added Kurashiki-tabi Map Access */}
            <div className="relative group overflow-hidden rounded-[50px] border border-stone-200 h-[300px]">
              <img src="./images/high view.jpg" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000" alt="Map Preview" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent flex items-end p-10">
                <div className="flex justify-between items-center w-full text-white">
                  <div>
                    <h4 className="text-xl font-serif italic mb-1">{t('trip.map_section.title')}</h4>
                    <p className="text-[10px] opacity-70 uppercase tracking-widest">{t('trip.map_section.subtitle')}</p>
                  </div>
                  <button
                    onClick={() => navigate('/area')}
                    className="bg-white text-stone-900 p-4 rounded-full shadow-xl hover:bg-emerald-50 transition-colors"
                  >
                    <ExternalLink size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Section: Testimonial */}
            <div className="p-10 bg-white border border-stone-100 rounded-[50px] shadow-sm relative italic text-stone-600 font-light text-sm leading-relaxed overflow-hidden">
              <span className="absolute top-6 left-6 text-5xl text-stone-500 opacity-10 font-serif">“</span>
              {t('trip.testimonial.quote')}
              <div className="mt-8 flex items-center gap-4 not-italic">
                <div className="w-10 h-10 rounded-full bg-stone-200 overflow-hidden"><img src="https://i.pravatar.cc/100?img=32" alt="Avatar" /></div>
                <div>
                  <p className="text-[10px] font-bold text-stone-900">{t('trip.testimonial.user_name')}</p>
                  <p className="text-[9px] text-stone-400">{t('trip.testimonial.user_country')}</p>
                </div>
              </div>
            </div>

            {/* Section 04: Gallery */}
            <div id="gallery" className="scroll-mt-32">
              <SectionTitle
                number="04"
                title={t('trip.gallery.title')}
                subtitle={t('trip.gallery.subtitle')}
              />

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-[600px]">
                <div className="rounded-[30px] overflow-hidden shadow-lg group relative">
                  <img
                    src="./images/ohara.webp"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    alt={t('trip.gallery.title')}
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>

                <div className="rounded-[30px] overflow-hidden md:col-span-2 shadow-lg group relative">
                  <img
                    src="./images/kojima jean1.webp"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    alt={t('trip.gallery.title')}
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>

                <div className="rounded-[30px] overflow-hidden md:col-span-2 shadow-lg group relative">
                  <img
                    src="./images/night light.webp"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    alt={t('trip.gallery.title')}
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>

                <div className="rounded-[30px] overflow-hidden shadow-lg group relative">
                  <img
                    src="./images/lvy square5.webp"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    alt={t('trip.gallery.title')}
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <FooterPage></FooterPage>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400;1,700&family=Inter:wght@300;400;700;900&display=swap');
          
          .font-serif { font-family: 'Playfair Display', serif; }
          .font-sans { font-family: 'Inter', sans-serif; }
          .scrollbar-hide::-webkit-scrollbar { 
            display: none; 
          }
        `}
      </style>
    </div>
  );
};

export default TripPlannerPage;