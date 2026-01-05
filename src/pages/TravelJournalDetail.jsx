import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import {
  MapPin, Calendar, Clock, Share2, Heart, ArrowRight,
  Volume2, VolumeX, Star, Quote, Send, Play,
  Compass, Camera, Coffee, Utensils, Info, Cloud,
  Facebook, Link, X, CheckCircle2,
  Hammer, Sun, Moon, Waves, Map as MapIcon, Navigation,
  ChevronRight, Bookmark, Eye, Landmark, ShoppingBag, Shirt
} from 'lucide-react';
import Navbar from './NavbarPage';
import FooterPage from './FooterPage';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { Trash2 } from 'lucide-react';

const TravelJournalDetail = () => {
  const { scrollYProgress } = useScroll();
  const [isMuted, setIsMuted] = useState(false);
  const iframeRef = useRef(null);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  // --- AMBIENT AUDIO & LIGHTBOX ---
  const audioRef = useRef(new Audio('https://www.soundjay.com/nature/river-1.mp3'));
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  // --- LIKE & TIME SYSTEM ---
  const [likes, setLikes] = useState(154);
  const [isLiked, setIsLiked] = useState(false);
  const [japanTime, setJapanTime] = useState("");






  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.sendForm(
      'kurashiki_service',   // Step 1 က Service ID ထည့်ပါ
      'template_kurashiki',  // Step 1 က Template ID ထည့်ပါ
      formRef.current,
      'QimfUV7C_GwtRLAL6'    // Step 1 က Public Key ထည့်ပါ
    )
      .then(() => {
        setIsSubscribed(true);
        setLoading(false);
      }, (error) => {
        alert("Error ! Please Try Again.");
        setLoading(false);
      });
  };

  // --- KURASHIKI LOCATIONS DATA ---
  const locations = [
    {
      id: 'ohara',
      name: t('journal.locations.ohara.name'),
      embedUrl: "https://maps.google.com/maps?q=Ohara%20Museum%20of%20Art%20Kurashiki&t=&z=15&ie=UTF8&iwloc=&output=embed",
      desc: t('journal.locations.ohara.desc'),
      icon: <Landmark size={20} />,
      address: '1 Chome-1-15 Central, Kurashiki'
    },
    {
      id: 'bikan',
      name: t('journal.locations.bikan.name'),
      embedUrl: "https://maps.google.com/maps?q=Kurashiki%20Bikan%20Historical%20Quarter&t=&z=15&ie=UTF8&iwloc=&output=embed",
      desc: t('journal.locations.bikan.desc'),
      icon: <MapIcon size={20} />,
      address: 'Central, Kurashiki, Okayama'
    },
    {
      id: 'kojima',
      name: t('journal.locations.kojima.name'),
      embedUrl: "https://maps.google.com/maps?q=Kojima%20Jeans%20Street&t=&z=15&ie=UTF8&iwloc=&output=embed",
      desc: t('journal.locations.kojima.desc'),
      icon: <Shirt size={20} />,
      address: 'Kojima Ajano, Kurashiki'
    },
    {
      id: 'ivy',
      name: t('journal.locations.ivy.name'),
      embedUrl: "https://maps.google.com/maps?q=Kurashiki%20Ivy%20Square&t=&z=15&ie=UTF8&iwloc=&output=embed",
      desc: t('journal.locations.ivy.desc'),
      icon: <Landmark size={20} />,
      address: '7-2 Honmachi, Kurashiki'
    },
    {
      id: 'shop',
      name: t('journal.locations.shop.name'),
      embedUrl: "https://maps.google.com/maps?q=Kurashiki%20Ebisu%20Dori%20Shopping%20Street&t=&z=15&ie=UTF8&iwloc=&output=embed",
      desc: t('journal.locations.shop.desc'),
      icon: <ShoppingBag size={20} />,
      address: 'Achi, Kurashiki, Okayama'
    }
  ];
  const [activeLocation, setActiveLocation] = useState(locations[0] || null);

  // --- TIME AGO FORMATTER ---
  const formatTimeAgo = (timestamp) => {
    const diff = Date.now() - timestamp;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (seconds < 60) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  };

  const [weather, setWeather] = useState({ temp: 18, condition: 'clear' });
  const API_KEY = "6990d099951664c6c946e7f8670c563d";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Kurashiki,jp&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();

        if (response.ok && data.main) {
          let currentTemp = Math.round(data.main.temp);
          let condition = data.weather[0].main.toLowerCase();

          // သင့်ရဲ့ Winter Logic
          if (currentTemp > 20 && new Date().getMonth() <= 2) {
            setWeather({ temp: 4, condition: 'clear' }); // လက်ရှိ ၄ ဒီဂရီဖြစ်အောင် ပြင်ထားပေးပါတယ်
          } else {
            setWeather({ temp: currentTemp, condition: condition });
          }
        } else {
          setWeather({ temp: 4, condition: 'clear' });
        }
      } catch (error) {
        setWeather({ temp: 4, condition: 'clear' });
      }
    };
    fetchWeather();
  }, [API_KEY]);

  const getWeatherIcon = (condition) => {
    const hour = new Date().getHours();
    const isNight = hour >= 18 || hour <= 6;
    const cond = condition.toLowerCase();

    if (cond === 'clear') return isNight ? '🌙' : '☀️';
    if (cond === 'clouds') return '☁️';
    if (cond === 'rain') return '🌧️';
    if (weather.temp <= 5) return '❄️'; // ၅ ဒီဂရီအောက်ဆို နှင်းပုံပြမယ်
    return '🌤️';
  };

  // --- PARALLAX EFFECTS ---
  const yImage = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const scaleProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setJapanTime(new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
      }).format(now));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hasLiked = localStorage.getItem('journal_42_liked');
    if (hasLiked) setIsLiked(true);
  }, []);

  const toggleMusic = () => {
    const command = !isMuted ? '{"event":"command","func":"pauseVideo","args":""}' : '{"event":"command","func":"playVideo","args":""}';
    if (iframeRef.current) iframeRef.current.contentWindow.postMessage(command, '*');
    setIsMuted(!isMuted);
  };

  const toggleAmbient = () => {
    if (isAmbientPlaying) { audioRef.current.pause(); }
    else { audioRef.current.play(); audioRef.current.loop = true; }
    setIsAmbientPlaying(!isAmbientPlaying);
  };

  const handleLikeToggle = () => {
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    setIsLiked(!isLiked);
    if (!isLiked) localStorage.setItem('journal_42_liked', 'true');
    else localStorage.removeItem('journal_42_liked');
  };

  // --- HERO SLIDER ---
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "./images/banner1.jpg",
    "./images/lvy square3.webp",
    "./images/night light2.webp",
    "./images/night view.jpg",
    "./images/ohara.webp"];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  // --- MODALS & REVIEWS ---
  const [showShareModal, setShowShareModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('journal_reviews');
    if (saved) return JSON.parse(saved);

    // memory ထဲမှာ မရှိသေးရင် ဒီ default list ကို သုံးမယ်
    return [
      { id: 1, name: "Julian Thorne", role: "common.reviews.r1.role", comment: "common.reviews.r1.comment", rating: 5, timestamp: Date.now() - 604800000 },
      { id: 2, name: "Elena Rossi", role: "common.reviews.r2.role", comment: "common.reviews.r2.comment", rating: 5, timestamp: Date.now() - 86400000 },
      { id: 3, name: "Liam Chen", role: "common.reviews.r3.role", comment: "common.reviews.r3.comment", rating: 4, timestamp: Date.now() - 3600000 }
    ];
  });

  useEffect(() => {
    localStorage.setItem('journal_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const [newReview, setNewReview] = useState({ name: '', comment: '', role: '' });
  const handleAddReview = (e) => {
    e.preventDefault();

    // Rating မရှိရင် Alert ပြပြီး ရပ်လိုက်မယ်
    if (rating === 0) {
      alert("Please select a rating!"); // သို့မဟုတ် t('journal.review.select_rating')
      return;
    }

    if (newReview.name && newReview.comment) {
      // Review အသစ်ကို list ထဲထည့်မယ်
      const reviewData = {
        id: Date.now(),
        name: newReview.name,
        comment: newReview.comment, // User ရိုက်တဲ့စာသား (i18n key မဟုတ်ပါ)
        role: newReview.role || "Explorer",
        rating: rating,
        timestamp: Date.now()
      };

      setReviews([reviewData, ...reviews]);

      // Form ကို ပြန်ရှင်းမယ်
      setNewReview({ name: '', comment: '', role: '' });
      setRating(0);
    }
  };


  const handleDeleteReview = (id) => {
    if (window.confirm("Delete this review?")) {
      setReviews(prev => prev.filter(r => r.id !== id));
    }
  };

  // Kojima Jeans ဆီသို့ သွားရန် Function
  const goToKojima = () => {
    const kojimaLoc = locations.find(l => l.id === 'kojima');
    if (kojimaLoc) {
      setActiveLocation(kojimaLoc);
      document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#F7F6F2] relative min-h-screen font-sans text-stone-900 selection:bg-stone-200 overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-[9999] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
      <Navbar />

      {/* AUDIO PLAYER */}
      <div className="fixed pointer-events-none opacity-0 w-0 h-0">
        <iframe ref={iframeRef} width="100" height="100" src="https://www.youtube.com/embed/8fbfVdEz7Lk?enablejsapi=1&autoplay=1&mute=0&loop=1&playlist=8fbfVdEz7Lk" allow="autoplay" />
      </div>

      {/* FLOATING CONTROLS */}
      <div className="fixed bottom-10 right-10 z-[100] flex flex-col gap-4">
        <button onClick={toggleAmbient} className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all shadow-xl ${isAmbientPlaying ? 'bg-blue-600 text-white' : 'bg-white text-stone-400 border-stone-200'}`}>
          <Waves size={20} className={isAmbientPlaying ? "animate-pulse" : ""} />
        </button>
        <button onClick={toggleMusic} className="w-14 h-14 rounded-full bg-white border border-stone-200 shadow-2xl flex items-center justify-center hover:scale-110 transition-all">
          {isMuted ? <VolumeX size={20} /> : <div className="flex items-center gap-1"><span className="w-1 h-3 bg-stone-900 animate-bounce" /><Volume2 size={20} /></div>}
        </button>
      </div>

      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-stone-900 origin-left z-[1001]" style={{ scaleX: scaleProgress }} />

      {/* HERO SECTION */}
      <header className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-10">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentSlide}
              src={slides[currentSlide]}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-stone-900/40 via-transparent to-black/20" />
        </div>

        <div className="absolute pt-8 inset-0 flex flex-col justify-center items-center text-center z-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }} className="max-w-6xl space-y-8 px-6">
            <span className="text-[11px] font-black uppercase tracking-[0.8em] text-white/90">
              {t('journal.hero.subtitle')}
            </span>
            <br /><br />

            <h1 className="text-5xl md:text-[8rem] font-serif text-white leading-[0.85] drop-shadow-2xl">
              {t('journal.hero.title_main')} <br />
              <span className="italic font-light">{t('journal.hero.title_sub')}</span>
            </h1>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex items-center justify-center gap-8 pt-10">
              <div className="text-white text-left">
                <p className="text-[10px] uppercase font-black tracking-widest opacity-60">
                  {t('journal.hero.label_location')}
                </p>
                <p className="font-serif italic text-xl">
                  {t('journal.hero.location_value')}
                </p>
              </div>

              <div className="h-10 w-[1px] bg-white/20" />

              <div className="text-white text-left">
                <p className="text-[10px] uppercase font-black tracking-widest opacity-60">
                  {t('journal.hero.label_date')}
                </p>
                <p className="font-serif italic text-xl">
                  {t('journal.hero.date_value')}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/50">
          <Clock size={24} />
        </div>
      </header>

      {/* MAIN CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-stretch">

          <div className="lg:col-span-8 flex flex-col">
            <div id="intro" className="flex items-center justify-between border-b border-stone-200 pb-8 mb-16">
              <div className="flex items-center gap-6">
                <img src="./images/milon.jpg" className="w-20 h-20 rounded-full border-4 border-white shadow-2xl" alt="Author" />
                <div>
                  <h4 className="font-serif italic text-3xl">{t('journal.author.name')}</h4>
                  <p className="text-[10px] uppercase tracking-widest text-stone-400 font-black">{t('journal.author.role')}</p>
                </div>
              </div>
              {/* Like & Share buttons */}
              <div className="flex gap-4">
                <button onClick={handleLikeToggle} className={`flex items-center gap-3 px-6 py-3 rounded-full border transition-all ${isLiked ? 'bg-red-50 border-red-200 text-red-500 shadow-inner' : 'bg-white hover:border-stone-400 shadow-sm'}`}>
                  <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
                  <span className="text-xs font-black">{likes}</span>
                </button>
                <button onClick={() => setShowShareModal(true)} className="w-12 h-12 rounded-full border bg-white flex items-center justify-center hover:bg-green-900 hover:text-white transition-all shadow-sm"><Share2 size={18} /></button>
              </div>
            </div>

            <article className="prose prose-stone lg:prose-2xl max-w-none">
              <p className='text-center pb-2'>  🌸 🌸 🌸 </p>
              <motion.p style={{ y: yText }} className="text-2xl md:text-3xl font-serif leading-[1.8] mb-18 first-letter:text-8xl first-letter:float-left first-letter:mr-6 first-letter:font-serif first-letter:leading-[0.7] text-stone-800">
                {t('journal.content.intro_text')}
              </motion.p>

              <div className="space-y-12 mb-24">
                {/* Section Header */}
                <h3 className="text-4xl md:text-5xl font-serif italic text-stone-900 border-l-4 border-green-800 pl-6 py-2">
                  {t('journal.content.body_header')}
                </h3>

                {/* Body Text Content */}
                <div className="text-xl md:text-2xl font-serif leading-[2] text-stone-600 space-y-8 text-justify">
                  {/* t('journal.content.body_text') ထဲက စာသားတွေကို paragraph ခွဲထားရင် ပိုလှပါတယ် */}
                  <p>
                    {t('journal.content.body_text')}
                  </p>
                </div>
              </div>

              <div className="space-y-12 mb-24">
                {/* Section Header */}
                <h3 className="text-4xl md:text-5xl font-serif italic text-stone-900 border-l-4 border-green-800 pl-6 py-2">
                  {t('journal.content.culture')}
                </h3>

                {/* Body Text Content */}
                <div className="text-xl md:text-2xl font-serif leading-[2] text-stone-600 space-y-8 text-justify">
                  {/* t('journal.content.body_text') ထဲက စာသားတွေကို paragraph ခွဲထားရင် ပိုလှပါတယ် */}
                  <p>
                    {t('journal.content.culture_text')}
                  </p>
                </div>
              </div>

              <div className="space-y-12 mb-24">
                {/* Section Header */}
                <h3 className="text-4xl md:text-5xl font-serif italic text-stone-900 border-l-4 border-green-800 pl-6 py-2">
                  {t('journal.content.experience')}
                </h3>

                {/* Body Text Content */}
                <div className="text-xl md:text-2xl font-serif leading-[2] text-stone-600 space-y-8 text-justify">
                  {/* t('journal.content.body_text') ထဲက စာသားတွေကို paragraph ခွဲထားရင် ပိုလှပါတယ် */}
                  <p>
                    {t('journal.content.experience_text')}
                  </p>
                </div>
              </div>


              {/* MAP HEADER */}
              <div id="map" className="my-24 space-y-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-2">
                    <h5 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-stone-400">
                      <Navigation size={14} className="text-blue-500" /> {t('journal.mapping.expedition_label')}
                    </h5>
                    <h3 className="text-5xl font-serif italic text-stone-900">{t('journal.mapping.title')}</h3>
                  </div>
                  <p className="text-xs text-stone-400 font-medium max-w-xs">
                    {t('journal.mapping.description')}
                  </p>
                </div>

                <div className="relative aspect-video bg-stone-100 rounded-xl overflow-hidden border border-stone-200 shadow-2xl">
                  <AnimatePresence mode="wait">
                    {activeLocation ? (
                      <motion.iframe
                        key={activeLocation.id}
                        src={activeLocation.embedUrl}
                        className="w-full h-full border-none grayscale-[0.1] contrast-[1.05]"
                        allowFullScreen=""
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">Loading map...</div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {locations.slice(0, 5).map((loc) => (
                    <motion.div
                      key={loc.id}
                      onClick={() => setActiveLocation(loc)}
                      whileHover={{ y: -5 }}
                      className={`cursor-pointer px-5 py-3 border hover:border-green-300 transition-all duration-500 rounded-sm flex flex-col justify-between ${activeLocation?.id === loc.id
                        ? 'bg-green-900 border-stone-900 shadow-xl'
                        : 'bg-white border-stone-100 hover:shadow-md'
                        }`}
                    >
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <div className={`p-2 rounded-full ${activeLocation?.id === loc.id ? 'bg-white/10 text-white' : 'bg-stone-50 text-stone-400'}`}>
                            <MapPin size={12} />
                          </div>
                          <span className={`text-[8px] font-mono ${activeLocation?.id === loc.id ? 'text-stone-500' : 'text-stone-300'}`}>
                            {loc.coordinates}
                          </span>
                        </div>

                        <h6 className={`font-serif text-base mb-3 leading-tight ${activeLocation?.id === loc.id ? 'text-white' : 'text-stone-900'}`}>
                          {t(`journal.mapping.locations.${loc.id}.name`)}
                        </h6>

                        <p className={`text-[10px] leading-relaxed font-light line-clamp-3 ${activeLocation?.id === loc.id ? 'text-stone-400' : 'text-stone-500'}`}>
                          {t(`journal.mapping.locations.${loc.id}.desc`)}
                        </p>
                      </div>

                      {activeLocation?.id === loc.id && (
                        <motion.div layoutId="activeUnderline" className="h-0.5 bg-white mt-0 w-full" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div id='video' className="relative aspect-video my-24 rounded-[2rem] overflow-hidden shadow-2xl group bg-stone-900 border border-white/5">
                {/* Video Element */}
                <video
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                  muted
                  loop
                  playsInline
                  controls
                  poster="./images/video-thumbnail.jpg" // Video မလာခင် ပြမယ့်ပုံ
                >
                  <source src="./images/video1.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

              </div>

              <h3 className="text-4xl font-serif italic mb-8">{t('journal.sidebar.cta_title')}</h3>
              <p id="tradition" className="text-stone-600 leading-[2] mb-12 text-xl font-light">
                {t('journal.sidebar.cta_desc')}
              </p>
            </article>
          </div>

          {/* SIDEBAR */}
          <aside className="lg:col-span-4 flex flex-col gap-12">
            {/* INDEX LIST SECTION */}
            <div className="bg-white border border-stone-100 p-10 hidden lg:block sticky top-32 z-50 shadow-sm">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-green-400 mb-8 font-sans flex items-center gap-2">
                <Bookmark size={12} /> {t('journal.sidebar.index')}
              </h5>
              <ul className="space-y-4">
                {['Hero', 'Map', 'Video', 'Timeline', 'Review'].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-[11px] font-medium text-green-800 hover:text-stone-900 transition-colors uppercase tracking-widest block border-l-2 border-transparent hover:border-stone-900 pl-4"
                    >
                      {/* nav path အောက်မှာ item နာမည်ကို lowercase ပြောင်းပြီး ရှာခိုင်းတာပါ */}
                      {t(`nav.${item.toLowerCase()}`)} 🌸
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* CALL TO ACTION */}
            <div className="bg-stone-900 p-12 text-white rounded-sm shadow-2xl space-y-10 relative overflow-hidden group">
              <h3 className="text-4xl font-serif italic">{t('journal.sidebar.cta_title')}</h3>
              <p className="text-stone-400 text-sm font-light leading-relaxed">{t('journal.sidebar.cta_desc')}</p>
              <button className="w-full py-5 bg-white text-stone-900 text-[11px] font-black uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-2 hover:bg-stone-200">
                {t('journal.sidebar.cta_button')} <ChevronRight size={14} />
              </button>
            </div>

            {/* WEATHER WIDGET */}
            <div className="relative overflow-hidden bg-white border border-stone-100 p-8 shadow-[0_4px_25px_-4px_rgba(0,0,0,0.03)] group">
              {/* Top Section */}
              <div className="flex justify-between items-start mb-8">
                <div className="space-y-1.5">
                  <div className="flex items-baseline">
                    <span className="text-6xl font-serif tracking-tighter text-stone-900 leading-none">
                      {/* Weather temp က 4 ဆိုရင် 4 ပေါ်ပါမယ် */}
                      {weather.temp}
                    </span>
                    <span className="text-2xl font-light text-green-800 ml-2 italic">°</span>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-stone-400">
                    {/* Condition က Clear/Clouds စသဖြင့် dynamic ပေါ်ပါမယ် */}
                    {weather.condition} • Kurashiki
                  </p>
                </div>

                <div className="w-14 h-14 bg-stone-50 rounded-full flex items-center justify-center text-3xl shadow-inner transition-transform duration-500 group-hover:scale-110">
                  {/* Icon က Clear ဖြစ်ရင် ☀️/🌙၊ Clouds ဖြစ်ရင် ☁️ စသဖြင့် ပြောင်းပါမယ် */}
                  {getWeatherIcon(weather.condition)}
                </div>
              </div>

              {/* Bottom Section (Three-Tier Vertical Stack) */}
              <div className="border-t border-green-200 pt-8 mt-4 space-y-6">

                {/* ၁။ ပထမကြောင်း: Standard Time Label (ဘယ်ဘက်ကပ်) */}
                <div className="flex justify-start">
                  <p className="text-[8px] font-black uppercase tracking-[0.4em] text-stone-300 leading-none">
                    Standard Time / JST
                  </p>
                </div>

                {/* ၂။ ဒုတိယကြောင်း: အချိန် (အလယ်တည့်တည့်) */}
                <div className="flex justify-center">
                  <p className="text-3xl font-serif text-stone-900 tabular-nums leading-none italic tracking-tighter">
                    {japanTime || '00:00'}
                  </p>
                </div>

                {/* ၃။ တတိယကြောင်း: Okayama Live (ညာဘက်ကပ်) */}
                <div className="flex flex-col items-end space-y-2">
                  <p className="text-[11px] uppercase font-bold tracking-[0.25em] text-green-800 leading-none">
                    Okayama, Japan
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                    </span>
                    <span className="text-[8px] font-black uppercase text-stone-400 tracking-[0.2em]">
                      {t('journal.sidebar.live_context')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Subtle Background Decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-stone-50/50 rounded-full -mr-12 -mt-12 pointer-events-none" />
            </div>

            {/* CRAFTSMANSHIP */}
            <div className="bg-white border border-stone-100 p-10 space-y-10">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-green-800 flex items-center gap-2"><Hammer size={12} /> {t('journal.sidebar.craftsmanship.label')}</h5>
              <div className="space-y-4">
                <h4 className="font-serif italic text-2xl pt-2">{t('journal.sidebar.craftsmanship.indigo_title')}</h4>
                <p className="text-xs text-stone-500 leading-relaxed font-light">{t('journal.sidebar.craftsmanship.indigo_desc')}</p>
                <button
                  onClick={goToKojima}
                  className="text-[10px] font-black uppercase tracking-widest border-b border-stone-900 pb-1 hover:text-blue-600 hover:border-blue-600 transition-all"
                >
                  {t('journal.sidebar.craftsmanship.learn_more')}
                </button>
              </div>
            </div>

            {/* SUBSCRIBE FORM */}
            <div className="p-10 bg-stone-900 text-white rounded-sm space-y-8 relative overflow-hidden">
              {!isSubscribed ? (
                <>
                  <div className="space-y-2">
                    <h4 className="font-serif text-3xl italic">{t('journal.sidebar.subscribe.title')}</h4>
                    <p className="text-[10px] text-stone-400 uppercase tracking-widest">{t('journal.sidebar.subscribe.subtitle')}</p>
                  </div>

                  <form ref={formRef} onSubmit={sendEmail} className="space-y-5">
                    {/* 'user_email' ဆိုတဲ့ name က EmailJS template ထဲက နာမည်နဲ့ တူရပါမယ် */}
                    <input
                      name="user_email"
                      type="email"
                      required
                      placeholder={t('journal.sidebar.subscribe.placeholder')}
                      className="w-full bg-transparent border-b border-white/20 py-3 text-xs outline-none focus:border-white font-light"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-white text-stone-900 text-[10px] font-black uppercase tracking-[0.3em] disabled:opacity-50"
                    >
                      {loading ? "SENDING..." : t('journal.sidebar.subscribe.button')}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <CheckCircle2 className="mx-auto text-green-400" size={40} />
                  <h5 className="font-serif text-2xl italic">{t('journal.sidebar.subscribe.success_title')}</h5>
                  <p className="text-[10px] text-stone-400 uppercase tracking-widest leading-loose">{t('journal.sidebar.subscribe.success_msg')}</p>
                </div>
              )}
            </div>

          </aside>
        </div>
      </section>

      {/* ENHANCED TIMELINE SECTION */}
      <section id='timeline' className="bg-[#F7F6F2] py-16 pt-5 border-t border-stone-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header Part */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 relative">
            <div className="space-y-4 relative z-10">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
                <div className="w-12 h-[1px] bg-stone-900" />
                <span className="text-[11px] font-black uppercase tracking-[0.5em] text-stone-500">{t('itinerary.label')}</span>
              </motion.div>
              <h4 className="font-serif italic text-3xl md:text-5xl text-stone-900 leading-tight">
                {t('itinerary.title_top')} <br /> {t('itinerary.title_bottom')}
              </h4>
            </div>
            <div className="max-w-xs space-y-4 pb-2">
              <p className="text-xs text-stone-500 leading-relaxed font-light italic">{t('itinerary.quote')}</p>
              <div className="flex items-center gap-4 text-stone-400">
                <Calendar size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">{t('itinerary.edition')}</span>
              </div>
            </div>
          </div>

          {/* Timeline Content */}
          <div id="timeline" className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {[
                { id: "01", key: "day1" },
                { id: "02", key: "day2" },
                { id: "03", key: "day3" }
              ].map((item, i) => (
                <motion.div key={i} className="relative group">
                  <div className="bg-white p-10 pt-16 border border-stone-100 rounded-sm shadow-sm relative h-full flex flex-col">

                    {/* Day Badge */}
                    <div className="absolute top-0 left-0 bg-stone-900 text-white px-6 py-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                        {t('itinerary.day')} {t(`itinerary.days.${i}.d`)}
                      </span>
                    </div>

                    {/* ပြင်ရမည့်နေရာ- </h5> နဲ့ ပိတ်ရပါမယ် */}
                    <h5 className="font-serif text-3xl italic text-stone-900">
                      {t(`itinerary.days.${i}.t`)}
                    </h5>

                    <p className="text-sm text-stone-500 mt-4">
                      {t(`itinerary.days.${i}.s`)}
                    </p>

                    {/* Activities Section */}
                    <div className="flex flex-wrap gap-2 mt-6">
                      {/* Array check လုပ်ပြီးမှ map ပတ်ပါမယ် */}
                      {Array.isArray(t(`itinerary.days.${i}.activities`, { returnObjects: true })) &&
                        t(`itinerary.days.${i}.activities`, { returnObjects: true }).map((act, idx) => (
                          <span key={idx} className="text-[9px] px-3 py-1.5 bg-stone-50 text-stone-600 rounded-full">
                            {act}
                          </span>
                        ))}
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer Progress Detail */}
          <div className="mt-6 pt-10 border-t border-stone-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest">{t('itinerary.stats.distance_label')}</p>
                <p className="text-lg font-serif italic text-stone-800">{t('itinerary.stats.distance_val')}</p>
              </div>
              <div className="w-[1px] h-8 bg-stone-200" />
              <div className="text-center">
                <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest">{t('itinerary.stats.transport_label')}</p>
                <p className="text-lg font-serif italic text-stone-800">{t('itinerary.stats.transport_val')}</p>
              </div>
            </div>

            <motion.button
              onClick={() => navigate('/area')} // ဒီနေရာမှာ /area ကို သွားခိုင်းတာပါ
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-stone-900 text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-full shadow-xl hover:bg-stone-800 transition-all flex items-center gap-3"
            >
              {t('itinerary.stats.button')} <ArrowRight size={14} />
            </motion.button>
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION WITH COMPACT & DARK FORM DESIGN */}
      <section id='review' className="bg-white py-20 border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* LEFT SIDE: DARK GREEN COMPACT FORM */}
          <div className="lg:col-span-5">
            <div className="sticky top-10 space-y-8">
              <div className="space-y-3">
                <h2 className="text-4xl font-serif">
                  {t('journal.reviews.title_main')} <br />
                  <span className="italic text-green-800">{t('journal.reviews.title_sub')}</span>
                </h2>
                <p className="text-stone-400 text-xs font-light max-w-xs">{t('journal.reviews.description')}</p>
              </div>

              {/* Form with Dark Green Background */}
              <form onSubmit={handleAddReview} className="space-y-5 p-8 bg-green-900 rounded-sm shadow-2xl relative overflow-hidden">
                {/* Decorative Leaf or Pattern (Optional) */}
                <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
                  <div className="w-32 h-32 border-4 border-white rounded-full -mr-16 -mt-16" />
                </div>

                <div className="flex gap-2 relative z-10">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button key={s} type="button" onClick={() => setRating(s)} className="transition-transform hover:scale-110">
                      <Star size={18} fill={rating >= s ? "#FFD700" : "none"} className={rating >= s ? "text-[#FFD700]" : "text-green-700"} />
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div className="space-y-1">
                    <label className="text-[9px] text-green-300 font-bold uppercase tracking-widest">{t('journal.review.fullname')}</label>
                    <input type="text" value={newReview.name} onChange={(e) => setNewReview({ ...newReview, name: e.target.value })} className="w-full bg-white/5 border-b border-green-700 py-1.5 text-sm text-white font-light outline-none focus:border-white transition-colors" placeholder="Name" required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] text-green-300 font-bold uppercase tracking-widest">{t('journal.review.occu')}</label>
                    <input type="text" value={newReview.role} onChange={(e) => setNewReview({ ...newReview, role: e.target.value })} className="w-full bg-white/5 border-b border-green-700 py-1.5 text-sm text-white font-light outline-none focus:border-white transition-colors" placeholder="Role" />
                  </div>
                </div>

                <div className="space-y-1 relative z-10">
                  <label className="text-[9px] text-green-300 font-bold uppercase tracking-widest">{t('journal.review.refl')}</label>
                  <textarea value={newReview.comment} onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })} className="w-full bg-white/10 border border-green-700 p-4 rounded-sm text-sm text-white h-24 outline-none focus:border-white transition-all shadow-inner" placeholder="Your thoughts..." required />
                </div>

                <button type="submit" className="w-full py-4 bg-white text-green-900 text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-green-50 transition-all shadow-lg active:scale-95">
                  {t('journal.review.button')}<Send size={14} />
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT SIDE: COMPACT REVIEW LIST */}
          <div className="lg:col-span-7 space-y-4 max-h-[750px] overflow-y-auto pr-3 custom-scrollbar">
            {/* List Header */}
            <div className="flex items-center justify-between border-b border-stone-100 pb-4 sticky top-0 bg-white/95 backdrop-blur-sm z-20">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-900 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-800 rounded-full"></span>
                {t('journal.review.recent')} ({reviews.length})
              </h4>
              <div className="flex items-center gap-2 text-stone-400">
                <Eye size={12} />
                <span className="text-[9px] font-bold uppercase">{t('journal.review.view')}</span>
              </div>
            </div>

            <AnimatePresence initial={false}>
              {reviews.map((r) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  layout
                  className="p-5 bg-stone-50/50 border border-stone-100 rounded-sm space-y-3 hover:bg-white hover:shadow-md transition-all group relative"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex gap-0.5">
                      {[...Array(r.rating)].map((_, i) => (
                        <Star key={i} size={10} fill="#FFD700" className="text-[#FFD700]" />
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-bold text-stone-300 uppercase flex items-center gap-1.5">
                        <Clock size={10} /> {formatTimeAgo(r.timestamp)}
                      </span>
                      <button
                        onClick={() => handleDeleteReview(r.id)}
                        className="p-1.5 text-stone-200 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>

                  <p className="text-base font-serif italic text-stone-700 leading-snug">
                    "{r.comment.includes('.') ? t(r.comment) : r.comment}"
                  </p>

                  <div className="flex items-center gap-3 pt-3 border-t border-stone-100/50">
                    <div className="w-8 h-8 bg-green-900 text-white rounded-full flex items-center justify-center text-[10px] font-black shadow-sm">
                      {r.name ? r.name.trim().charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="leading-tight">
                      <p className="text-[10px] font-black uppercase tracking-wider text-stone-900">{r.name}</p>
                      <p className="text-[8px] uppercase text-stone-400 font-bold">
                        {r.role && r.role.includes('.') ? t(r.role) : (r.role || "Explorer")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* DEVELOPER-STYLE COMPACT GALLERY */}
      <section className="bg-[#F7F6F2] py-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* Minimalist Header */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-100">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-[2px] bg-red-500" /> {/* Red tech dot/line */}
                <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-stone-900">
                  {t('journal.gallery.title')}
                </h2>
              </div>
              <p className="text-[9px] text-stone-400 pl-4 font-light italic">{t('journal.gallery.subtitle')}</p>
            </div>
            <p className="text-[10px] text-stone-400 font-mono tracking-tighter">VOL_2025 // KURASHIKI</p>
          </div>

          {/* Compact Bento-style Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {slides.map((src, i) => (
              <motion.div
                key={i}
                onClick={() => setSelectedImg(src)}
                whileHover={{ scale: 0.98 }}
                className={`relative group cursor-crosshair overflow-hidden rounded-md border border-stone-100 bg-stone-50 ${i === 0 ? 'md:col-span-2 md:row-span-2 aspect-auto' : 'aspect-square'
                  }`}
              >
                {/* Image */}
                <img
                  src={src}
                  className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
                  alt="Gallery"
                />

                {/* Minimalist Tech Overlay */}
                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/20 transition-all duration-300">
                  <div className="absolute bottom-2 left-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="px-1.5 py-0.5 bg-white/90 backdrop-blur-md rounded-[2px] border border-stone-200">
                      <p className="text-[8px] font-mono text-stone-600">IMG_0{i + 1}.RAW</p>
                    </div>
                  </div>

                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100">
                    <Camera size={12} className="text-white shadow-sm" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer Info */}
          <div className="mt-6 flex justify-between items-center text-[9px] font-mono text-stone-400 uppercase tracking-widest">
            <span>Okayama, Kurashiki, JP / 2025</span>
            <span className="flex items-center gap-4">
              <span>ISO 400</span>
              <span>f/2.8</span>
              <span>1/1000s</span>
            </span>
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImg(null)} className="fixed inset-0 z-[3000] bg-black/98 flex items-center justify-center p-10 cursor-zoom-out backdrop-blur-sm">
            <button className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors"><X size={50} strokeWidth={1} /></button>
            <motion.img initial={{ scale: 0.95 }} animate={{ scale: 1 }} src={selectedImg} className="max-w-full max-h-full object-contain shadow-[0_0_100px_rgba(255,255,255,0.1)]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* SHARE MODAL */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] bg-stone-900/60 backdrop-blur-md flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white p-14 max-w-sm w-full rounded-sm shadow-2xl relative text-center">
              <button onClick={() => setShowShareModal(false)} className="absolute top-6 right-6 text-stone-300 hover:text-stone-900"><X size={24} /></button>
              <div className="space-y-4 mb-12">
                <h3 className="font-serif italic text-4xl">Spread the Word</h3>
                <p className="text-[10px] text-stone-400 uppercase tracking-widest">Share this journal with friends</p>
              </div>
              <div className="grid gap-4">
                <button onClick={() => { navigator.clipboard.writeText(window.location.href); alert("Link copied!") }} className="flex items-center justify-between p-5 border border-stone-100 hover:bg-stone-900 hover:text-white transition-all font-bold uppercase text-[9px] tracking-[0.2em] group">
                  Copy Journal Link <Link size={16} className="text-stone-300 group-hover:text-white" />
                </button>
                <button className="flex items-center justify-between p-5 border border-stone-100 hover:bg-stone-50 transition-all font-bold uppercase text-[9px] tracking-[0.2em]">
                  Facebook <Facebook size={16} fill="black" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOOKING MODAL */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] bg-stone-900/80 backdrop-blur-xl flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-[#FAF9F6] p-16 max-w-2xl w-full rounded-sm shadow-2xl relative">
              <button onClick={() => setShowBookingModal(false)} className="absolute top-8 right-8 text-stone-400 hover:text-stone-900 transition-colors"><X size={30} /></button>
              {!bookingSuccess ? (
                <div className="space-y-10">
                  <div className="text-center space-y-4">
                    <p className="text-[10px] text-stone-400 uppercase tracking-[0.6em] font-black">Official Expedition</p>
                    <h3 className="font-serif text-6xl italic">Reservation</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-stone-400">First Name</label>
                      <input type="text" className="w-full bg-transparent border-b border-stone-200 py-4 text-sm outline-none focus:border-stone-900" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-stone-400">Last Name</label>
                      <input type="text" className="w-full bg-transparent border-b border-stone-200 py-4 text-sm outline-none focus:border-stone-900" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-stone-400">Email Address</label>
                    <input type="email" className="w-full bg-transparent border-b border-stone-200 py-4 text-sm outline-none focus:border-stone-900" />
                  </div>
                  <div className="pt-6">
                    <button onClick={() => setBookingSuccess(true)} className="w-full py-6 bg-stone-900 text-white text-[11px] font-black uppercase tracking-[0.5em] hover:bg-stone-800 transition-all shadow-xl">Confirm Request</button>
                    <p className="text-[9px] text-stone-400 mt-6 text-center italic">By confirming, you agree to our expedition terms and seasonal schedule.</p>
                  </div>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10 space-y-10">
                  <div className="relative inline-block">
                    <CheckCircle2 size={100} className="text-green-800 mx-auto" />
                    <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0, 0.5, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 bg-green-200 rounded-full" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-serif text-5xl italic">Request Received</h3>
                    <p className="text-[10px] text-stone-400 uppercase tracking-widest leading-loose">We will contact you within 48 hours to confirm <br /> your expedition details for Spring 2026.</p>
                  </div>
                  <button onClick={() => setShowBookingModal(false)} className="text-[11px] font-black uppercase tracking-[0.3em] border-b border-stone-900 pb-2 hover:opacity-50 transition-all">Back to Journal</button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- ELEGANT CONCLUSION SECTION --- */}
      <section className="relative py-32 overflow-hidden bg-[#F9F8F4]">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#F7F6F2] to-transparent" />
        <div className="absolute -right-20 top-40 opacity-[0.03] pointer-events-none">
          <MapIcon size={600} />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            {/* Left Column: Visual Storytelling */}
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative z-10"
              >
                <img
                  src="./images/group.jpg"
                  alt="Kurashiki evening"
                  className="rounded-sm shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 w-full aspect-[3/4] object-cover"
                />
                {/* Overlay Box */}
                <div className="absolute -bottom-10 -right-10 bg-white p-8 shadow-xl border border-stone-100 hidden md:block max-w-[280px]">
                  <Quote className="text-stone-200 mb-4" size={40} />
                  <p className="font-serif italic text-stone-600 text-lg">
                   {t('common.last')}
                  </p>
                </div>
              </motion.div>
              {/* Decorative Frame */}
              <div className="absolute top-10 left-10 w-full h-full border border-stone-200 -z-10" />
            </div>

            {/* Right Column: Content */}
            <div className="lg:col-span-7 space-y-16 lg:pl-10">

              {/* Kurashiki Today Block */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                  <span className="h-[1px] w-10 bg-stone-300"></span>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400">
                    {t('journal.conclusion_section.today_label')}
                  </span>
                </div>
                <h2 className="text-5xl md:text-6xl font-serif text-stone-900 leading-tight">
                  {t('journal.conclusion_section.today_title')}
                </h2>
                <p className="text-xl text-stone-500 font-light leading-relaxed max-w-2xl">
                  {t('journal.conclusion_section.today_desc')}
                </p>
              </motion.div>

              {/* Separator */}
              <div className="w-20 h-[1px] bg-stone-200" />

              {/* Conclusion Block */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-8 bg-white/50 backdrop-blur-sm p-10 border-l-2 border-stone-900"
              >
                <h3 className="text-3xl font-serif italic text-stone-800">
                  {t('journal.conclusion_section.closing_title')}
                </h3>
                <p className="text-2xl font-serif text-stone-700 leading-snug italic">
                  {t('journal.conclusion_section.closing_desc')}
                </p>

                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center">
                      <Heart size={14} className="text-white fill-white" />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-stone-900">
                      {t('journal.conclusion_section.signature')}
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-tighter">
                    Kurashiki, Okayama • 2025
                  </p>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>
      <FooterPage />

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 2px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #008000; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #a8a29e; }
        .prose p { margin-bottom: 2.5rem; }
        html { scroll-behavior: smooth; }
        ::selection { background: #e7e5e4; color: #1c1917; }
      `}} />
    </div>
  );
};

export default TravelJournalDetail;