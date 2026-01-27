import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Leaf, Navigation, ArrowUpRight, MapPin, Anchor,
  Camera, Info, Globe, Trees
} from 'lucide-react';
import {
  FaLightbulb, FaTimes, FaSearch, FaInstagram, FaFacebook,
  FaTwitter, FaArrowRight, FaArrowDown, FaMapMarkerAlt, FaGlobe,
  FaMoon, FaFingerprint, FaTicketAlt, FaLeaf, FaChevronRight, FaRegCompass, FaRegListAlt, FaRegCalendarCheck
} from 'react-icons/fa';

import { FaQuoteLeft, FaStar, FaChevronLeft } from 'react-icons/fa';
// Swiper Components နှင့် Styles များကို import လုပ်ပါ
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation as SwiperNav } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
// pages
import Navbar from './NavbarPage';
import FooterPage from './FooterPage';

// data
import { spots } from '../data/Spots';
import experiences from '../data/Experiences';




const HomePage = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();
  const [activeSeason, setActiveSeason] = useState('spring');
  const [selectedImg, setSelectedImg] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const reviewsData = t('reviews', { returnObjects: true });
  const reviews = Array.isArray(reviewsData) ? reviewsData : [];
  const [weather, setWeather] = useState({ temp: '--', condition: 'Loading' });
  const CITY = "Kurashiki";
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
    const isNight = hour >= 18 || hour <= 6; // ညနေ ၆ ကနေ မနက် ၆ အထိ

    switch (condition.toLowerCase()) {
      case 'clear': return isNight ? '🌙' : '☀️';
      case 'clouds': return '☁️';
      case 'rain': return '🌧️';
      case 'snow': return '❄️';
      default: return '🌤️';
    }
  };

  const areaData = {
    kurashiki: {
      id: 'kurashiki',
      title: "Kurashiki Area (倉敷エリア)",
      desc: "Bikan Historical Quarter ရှိရာ အဓိကနေရာဖြစ်ပြီး ရှေးဟောင်းအဆောက်အအုံများနှင့် တူးမြောင်းများရှိသည်။",
      color: "bg-[#e85a71]", // ပုံထဲကလို ပန်းရောင်
      access: [
        { label: "From Tokyo (Shinkansen)", time: "3 hr 15 min" },
        { label: "From Osaka (Shinkansen)", time: "45 min" },
        { label: "From Okayama Station", time: "17 min" },
        { label: "Kurashiki St. to Bikan", time: "15 min walk" }
      ]
    },
    kojima: {
      id: 'kojima',
      title: "Kojima Area (児島エリア)",
      desc: "Denim Street နှင့် Seto Ohashi တံတားကြီးကို ကြည့်ရှုနိုင်မည့် ပင်လယ်ကမ်းခြေဒေသ။",
      color: "bg-[#8abedb]", // အပြာနုရောင်
      access: [
        { label: "From JR Okayama St.", time: "25 min (Rapid)" },
        { label: "From Kurashiki St.", time: "45 min (Bus)" },
        { label: "Kojima St. to Denim St.", time: "5 min walk" }
      ]
    },
    tamashima: {
      id: 'tamashima',
      title: "Tamashima Area (玉島エリア)",
      desc: "Edo ခေတ်ဆိပ်ကမ်းမြို့ဟောင်းဖြစ်ပြီး ရှေးဟောင်းလမ်းမကြီးများနှင့် သမိုင်းဝင်နေရာများရှိသည်။",
      color: "bg-[#c5d86d]", // အစိမ်းနုရောင်
      access: [
        { label: "From Shin-Kurashiki St.", time: "10 min by Bus" },
        { label: "From Okayama Airport", time: "35 min by Car" }
      ]
    }
  };

  const languages = [
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'my', name: 'မြန်မာ', flag: '🇲🇲' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const seasonalImages = {
    spring: {
      main: "/images/cherry.jpg",
      sub1: "/images/cherry2.jpg",
      sub2: "/images/cherry3.jpg"
    },
    summer: {
      main: "/images/whiteHouse15.jpg",
      sub1: "/images/whiteHouse7.jpg",
      sub2: "/images/whiteHouse5.jpg"
    },
    autumn: {
      main: "/images/autumn1.jpg",
      sub1: "/images/autumn2.jpg",
      sub2: "/images/autumn3.jpg"
    },
    night: {
      main: "/images/night light1.jpg",
      sub1: "/images/whstreetlight.jpg",
      sub2: "/images/ivynew2.jpg"
    }

  };


  const filteredExperiences = activeTab === 'all'
    ? experiences
    : experiences.filter(exp => exp.category === activeTab);

  const tabs = [
    { id: 'all', label: t('experience.tabs.all') },
    { id: 'food', label: t('experience.tabs.food') },
    { id: 'eco', label: t('experience.tabs.eco') },
    { id: 'art', label: t('experience.tabs.art') },

  ];

  const navLinks = [
    { key: 'home', text: t('navbar.home') || 'Home', href: '#home' },
    { key: 'area', text: t('navbar.area') || 'Area', href: '#area' },
    { key: 'trip_planner', text: t('navbar.trip_planner') || 'Trip Planner', href: '#plan-trip' },
    { key: 'must_visit', text: t('navbar.must_visit') || 'Must Visit', href: '#attractions' },
    { key: 'travel_journal', text: t('navbar.travel_journal') || 'Travel Journal', href: '#experiences' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const handleInternalSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/all-experiences?search=${encodeURIComponent(searchQuery.trim())}`);
    setIsOpen(false);
    setSearchQuery("");
  };



  return (
    <div className="bg-[#FDFCFB] overflow-x-hidden text-stone-900 font-sans selection:bg-green-100">
      <Navbar />

      {/* --- HERO --- */}
      <section id="home" className="relative min-h-screen md:h-[110vh] flex items-center justify-center overflow-hidden bg-stone-900">
        <motion.div initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 2 }} className="absolute inset-0">
          <img src="/images/banner.png" className="w-full h-full object-cover brightness-[0.55]" alt="Kurashiki" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-green-900/80"></div>
        </motion.div>

        <div className="relative z-10 text-center px-6 md:px-8 py-20 flex justify-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-7xl w-full mx-auto"
          >
            {/* Subtitle with better margin */}
            <span className="bg-green-600/30 mt-5 backdrop-blur-md text-white border border-green-700/30 px-5 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.4em] mb-8 inline-block opacity-90">
              {t('hero.subtitle') || "Timeless Beauty, Sustainably Shared"}
            </span>

            {/* Main Title - Added leading-tight and responsive padding */}
            <h2 className="text-4xl md:text-5xl lg:text-[65px] font-serif text-white leading-[1.1] md:leading-[1.1] tracking-tighter italic mb-8">
              {t('hero.title')}

              {/* Subheading - Added clear margin-top and better leading */}
              <span className="not-italic font-light text-stone-200 text-lg md:text-2xl lg:text-[22px] block mt-8 md:mt-8 tracking-normal max-w-3xl mx-auto leading-relaxed opacity-90">
                {t('hero.subheading')}
              </span>
            </h2>

            {/* Button with more spacing */}
            <div className="flex flex-wrap justify-center gap-6 mt-12">
              <button
                onClick={() => navigate('/must-visit')} // သင်သွားချင်တဲ့ Page ရဲ့ Path လမ်းကြောင်းကို ထည့်ပါ
                className="bg-green-700 text-white px-10 py-4 rounded-full font-black text-[12px] uppercase tracking-widest hover:bg-white hover:text-emerald-900 transition-all shadow-2xl flex items-center gap-4 group"
              >
                {t('hero.button') || "Start Discovery"}
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* --- Bottom Left Info --- */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-8 md:bottom-12 md:left-16 z-20 hidden sm:flex items-center gap-6 text-white/80"
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute w-12 h-12 border border-white/30 rounded-full animate-ping"></div>

            {/* ဒီနေရာကို <a> ကနေ <button> ပြောင်းလဲလိုက်ပါတယ် */}
            <button
              onClick={() => {
                const section = document.getElementById('attractions');
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="relative w-12 h-12 border border-white/50 rounded-full flex items-center justify-center text-xl hover:bg-white hover:text-green-900 transition-colors duration-300 group cursor-pointer"
            >
              <FaArrowDown className="text-sm animate-bounce" />
            </button>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] md:text-[11px] font-medium tracking-[0.2em] leading-tight max-w-[200px] italic uppercase">
              {t('hero.guide_text') || "A conscious traveler’s guide to the beauty of Kurashiki"}
            </span>
            <div className="h-[1px] w-12 bg-green-500/50 mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* --- Must Visit Places --- */}
      <section id="attractions" className="py-16 px-6 max-w-[1200px] mx-auto">
        {/* Header - More Professional & Tight */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 pb-6 border-b border-stone-100 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-[1px] bg-green-700"></span>
              <span className="text-green-700 font-bold text-[9px] uppercase tracking-[0.2em]">{t('attractions.subtitle') || "Curation"}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif italic text-stone-900 leading-tight">
              {t("attractions.title") || "Must Visit"}
            </h2>
          </div>
          <p className="text-stone-500 max-w-[320px] text-[11px] md:text-xs max-w-xs leading-relaxed italic">
            {t('attractions.desc')}
          </p>
        </div>

        {/* Standard Grid instead of Masonry for better alignment */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spots.map((spot) => (
            <motion.div
              key={spot.id}
              whileHover={{ y: -5 }}
              onClick={() => navigate(`/attraction/${spot.id}`)}
              className="bg-white border border-stone-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={spot.image}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={t(spot.titleKey)}
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[8px] font-bold uppercase tracking-wider">
                    {spot.tag ? t(`common.tabs.${spot.tag.toLowerCase()}`) : ""}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-serif italic text-stone-900 group-hover:text-green-700 transition-colors">
                    {t(spot.titleKey)}
                  </h3>
                  {/* Map Link ကို Arrow နေရာမှာ တိုက်ရိုက်ထည့်နိုင်သည် သို့မဟုတ် သီးသန့် Button ထားနိုင်သည် */}
                  <a
                    href={spot.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()} // Card click နဲ့ မရောအောင် တားခြင်း
                    className="text-stone-300 hover:text-green-600 transition-all"
                  >
                    <MapPin size={16} />
                  </a>
                </div>

                <p className="text-stone-500 text-[11px] leading-relaxed mb-4 line-clamp-2 italic">
                  {t(spot.descKey)}
                </p>

                {/* --- ဝင်ကြေးပြသမည့် အပိုင်းအသစ် --- */}
                <div className="flex items-center gap-4 mb-4 text-[10px] font-bold text-stone-400">
                  <div className="flex items-center gap-1.5">
                    <FaTicketAlt className="text-green-700/50" />
                    <span>{spot.fee || t('common.free_entry')}</span>
                  </div>
                  <div className="w-[1px] h-3 bg-stone-200"></div>
                  <div className="flex items-center gap-1.5">
                    <Navigation size={12} className="text-green-700/50" />
                    <span className="uppercase tracking-wider">{t('common.navigate')}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest border-t border-stone-50 pt-4 text-stone-400 group-hover:text-green-700 transition-colors">
                  <span>{t('section.details_btn') || "View Story"}</span>
                  <FaChevronRight size={8} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- Our Mission --- */}
      <section className="py-10  bg-linear-to-b from-green-100">
        <div className="max-w-[1200px] mx-auto px-6">

          <div className="mb-10 text-center">
            <h2 className="text-4xl md:text-5xl font-serif italic text-stone-900 mb-6">
              {t('eco.title')}
            </h2>
            <p className=" text-green-700 max-w-2xl mx-auto leading-relaxed italic text-sm md:text-base">
              {t('eco.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
            {/* Connector Line (Desktop Only) */}
            <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-[0.5px] bg-stone-300"></div>

            {/* Point 1: Heritage */}
            <div className="relative group text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-8 mx-auto shadow-sm border border-stone-100 relative z-10 transition-all duration-500 group-hover:bg-green-700 group-hover:text-white group-hover:scale-110">
                <Anchor size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-serif italic mb-4">{t('eco.preserve_title')}</h3>
              <p className="text-stone-500 text-[13px] leading-[1.8] px-4">
                {t('eco.preserve_para')}
              </p>
            </div>

            {/* Point 2: Reuse */}
            <div className="relative group text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-8 mx-auto shadow-sm border border-stone-100 relative z-10 transition-all duration-500 group-hover:bg-green-700 group-hover:text-white group-hover:scale-110">
                <Camera size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-serif italic mb-4">{t('eco.architecture_title')}</h3>
              <p className="text-stone-500 text-[13px] leading-[1.8] px-4">
                {t('eco.architecture_para')}
              </p>
            </div>

            {/* Point 3: Future */}
            <div className="relative group text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-8 mx-auto shadow-sm border border-stone-100 relative z-10 transition-all duration-500 group-hover:bg-green-700 group-hover:text-white group-hover:scale-110">
                <Leaf size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-serif italic mb-4">{t('eco.conscious_title')}</h3>
              <p className="text-stone-500 text-[13px] leading-[1.8] px-4">
                {t('eco.conscious_para')}
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/mission')}
              className="text-[11px] font-black uppercase tracking-[0.3em] text-green-800 border-b border-green-800 pb-2 hover:text-green-600 hover:border-green-600 transition-all"
            >
              {t('eco.learn_more')}
            </button>
          </div>
        </div>
      </section>

      {/* --- 4 SEASONAL SECTION --- */}
      <section className="py-20 px-6 max-w-[1200px] mx-auto border border-x-green-200 border-y-white/30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Side: Text & Tabs Control */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-1px bg-green-700"></span>
              <span className="text-green-700 font-bold text-[9px] uppercase tracking-[0.2em]">{t('seasonal.subtitle')}</span>
            </div>
            <h2 className="text-4xl font-serif italic text-stone-900 mb-8 leading-tight">
              {t('seasonal.title') || "Four Seasons of Kurashiki"}
            </h2>

            <div className="space-y-4">
              {[
                { id: 'spring', label: t('seasonal.spring_title'), sub: t('seasonal.spring_date') },
                { id: 'summer', label: t('seasonal.summer_title'), sub: t('seasonal.summer_date') },
                { id: 'autumn', label: t('seasonal.autumn_title'), sub: t('seasonal.autumn_date') },
                { id: 'night', label: t('seasonal.nightlight'), sub: t('seasonal.nightlight_date') }
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSeason(s.id)}
                  className={`group w-full flex items-center justify-between p-4 rounded-xl transition-all ${activeSeason === s.id ? 'bg-white shadow-md border-l-4 border-green-600' : 'hover:bg-green-100'
                    }`}
                >
                  <div className="text-left">
                    <span className={`block text-xs font-black uppercase tracking-widest ${activeSeason === s.id ? 'text-green-700' : 'text-stone-400'}`}>
                      {s.label}
                    </span>
                    <span className="text-[10px] text-stone-400 italic">{s.sub}</span>
                  </div>
                  <FaChevronRight size={10} className={`${activeSeason === s.id ? 'text-green-700' : 'text-stone-200'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Mosaic Photo Grid */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSeason}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-5 grid-rows-2 gap-3 h-[450px]"
              >
                {/* Main Photo - Fix ပေးထားပါတယ် */}
                <div className="col-span-3 row-span-2 relative rounded-3xl overflow-hidden shadow-lg group">
                  <img
                    src={seasonalImages[activeSeason]?.main}
                    onClick={() => setSelectedImg(seasonalImages[activeSeason]?.main)}
                    /* 🔥 z-10 ထည့်လိုက်လို့ overlay ရဲ့ အပေါ်ကို ရောက်သွားပါပြီ */
                    className="w-full h-full object-cover cursor-zoom-in transition-transform duration-700 group-hover:scale-105 relative z-10"
                    alt="Main"
                  />
                  {/* Overlay Div - အောက်က စာသားဖတ်ရအောင် ပေးထားတာပါ */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-0 pointer-events-none"></div>
                  <div className="absolute bottom-6 left-6 right-6 z-20 pointer-events-none">
                    <p className="text-white text-xs md:text-sm italic font-serif leading-relaxed max-w-[250px]">
                      {t(`seasonal.${activeSeason}_desc`)}
                    </p>
                  </div>
                </div>

                {/* Sub Photo 1 */}
                <div className="col-span-2 row-span-1 relative rounded-2xl overflow-hidden shadow-md group">
                  <img
                    src={seasonalImages[activeSeason]?.sub1}
                    onClick={() => setSelectedImg(seasonalImages[activeSeason]?.sub1)}
                    className="w-full h-full object-cover cursor-zoom-in group-hover:scale-110 transition-transform duration-500"
                    alt="detail 1"
                  />
                </div>

                {/* Sub Photo 2 - Fix ပေးထားပါတယ် (sub2 လို့ ပြောင်းထားပါတယ်) */}
                <div className="col-span-2 row-span-1 relative rounded-2xl overflow-hidden shadow-md group">
                  <img
                    src={seasonalImages[activeSeason]?.sub2}
                    onClick={() => setSelectedImg(seasonalImages[activeSeason]?.sub2)}
                    className="w-full h-full object-cover cursor-zoom-in group-hover:scale-110 transition-transform duration-500"
                    alt="detail 2"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* FULLSCREEN IMAGE MODAL - 🔥 z-index ကို အမြင့်ဆုံး တင်ထားပါတယ် */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={selectedImg}
              onClick={(e) => e.stopPropagation()} // ပုံကိုနှိပ်ရင် modal ပြန်မပိတ်သွားစေဖို့
              className="max-w-full max-h-[90vh] rounded-lg shadow-2xl object-contain"
            />
            <button className="absolute top-10 right-10 text-white text-4xl hover:scale-110 transition-transform">&times;</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Places Collections --- */}
      <section id="experiences" className="py-2 px-6 max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-stone-100 pb-8">
          <div>
            <span className="text-green-600 font-bold text-[9px] uppercase tracking-[0.3em] mb-2 block">{t('experience.subtitle')}</span>
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 leading-tight">
              {t('experience.title')} <span className="italic text-green-600">{t('experience.greentitle')}</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest transition-all border ${activeTab === tab.id
                  ? 'bg-stone-900 border-stone-900 text-white'
                  : 'bg-transparent border-stone-200 text-stone-500 hover:border-stone-400'
                  }`}
              >
                {t(tab.label)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredExperiences.slice(0, 4).map((exp) => (
            <motion.div
              layout
              key={exp.id}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
              onClick={() => navigate(`/experience/${exp.id}`)}
            >
              <div className="relative aspect-3/4 md:aspect-4/5 rounded-24px overflow-hidden mb-4 shadow-md group-hover:shadow-xl transition-all">
                <img src={exp.img} className="w-full h-full rounded-2xl object-cover transition-transform duration-[1.2s] group-hover:scale-110" alt={t(exp.title)} />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent opacity-80"></div>

                <div className="absolute top-4 left-4">
                  <span className="bg-green-600 text-white px-2.5 py-1 rounded-full text-[7px] font-black uppercase tracking-widest">
                    {exp.category ? t(`common.tabs.${exp.category.toLowerCase()}`) : ""}
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <h3 className="text-lg font-serif italic mb-2 leading-tight">
                    {t(exp.titleKey)}
                  </h3>
                  <div className="flex gap-2 opacity-80">
                    {exp.tags.map(tag => (
                      <span key={tag} className="text-[7px] text-green-300 uppercase font-bold tracking-wider">
                        #{t(`experience.tabs.${tag.toLowerCase()}`)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end px-2">
                <span className="text-[8px] font-black uppercase tracking-[0.2em] flex items-center gap-1.5 text-stone-400 group-hover:text-green-700 transition-colors">
                  {t('experience.join_btn')} <FaChevronRight size={7} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* See More Button Section */}
        <div className="mb-5 text-center">
          {/* အပေါ်က မျဉ်းတိုလေးက အမြင်မှာ ပိုပြီး အဆင့်အတန်းရှိစေပါတယ် */}
          <div className="w-px bg-stone-200 mx-auto mb-10"></div>

          <button
            onClick={() => navigate('/all-experiences')}
            className="group relative inline-flex flex-col items-center gap-4 transition-all duration-500"
          >
            {/* Text Layer */}
            <span className="text-[12px] font-black uppercase tracking-[0.6em] text-green-800 group-hover:text-stone-900 transition-colors duration-500">
              {t('experience.explore_more') || "Explore More Experiences"}
            </span>

            {/* Animated Line Container */}
            <div className="relative w-40 h-[1px] bg-stone-100 overflow-hidden">
              {/* Hover လုပ်လိုက်ရင် ဒီမျဉ်းလေးက ဘယ်ကနေ ညာကို ပြေးသွားမှာပါ */}
              <div className="absolute top-0 left-0 w-full h-full bg-stone-900 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out"></div>
            </div>

            {/* Optional: အောက်က စာသားလေးက ခံစားချက်ကို ပိုဖော်ဆောင်ပေးပါတယ် */}
            <span className="text-[10px] font-serif italic text-green-800 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
              {t('experience.discover')}
            </span>
          </button>
        </div>
      </section>

      {/* --- MAP EXPERIENCE --- */}
      <section className="py-20 max-w-[1200px] mx-auto px-6 relative overflow-hidden">
        {/* Background Large Text */}
        <div className="absolute bottom-0 right-10 text-[150px] font-serif italic text-stone-100/60 pointer-events-none select-none -z-10 translate-y-10">
          Okayama
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-center">

          {/* LEFT: CONTENT & DISCOVERY */}
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-10">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-6 h-[1px] bg-green-700/50"></div>
                <span className="text-green-800 font-bold text-[9px] uppercase tracking-[0.4em] leading-none">
                  {t('map.label')}
                </span>
              </div>

              {/* Weather Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-2 bg-white/50 backdrop-blur-sm rounded-full border border-stone-100 shadow-sm">
                <span className="text-sm animate-pulse">{getWeatherIcon(weather.condition)}</span>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-stone-400 uppercase tracking-tighter leading-none">Live Kurashiki</span>
                  <span className="text-[10px] font-serif italic text-stone-800">
                    {weather.temp}°C {t(`${weather.condition.toLowerCase()}`)}
                  </span>
                </div>
              </div>

              <h2 className="text-4xl md:text-5xl font-serif text-stone-900 leading-[1.15] tracking-tight">
                {t('map.title_main')} <br />
                <span className="italic text-stone-400 font-light">{t('map.title_italic')}</span>
              </h2>

              <p className="text-stone-500 text-sm leading-relaxed font-light max-w-[380px] italic">
                {t('map.description')}
              </p>
            </div>

            {/* Modern Grid Legend */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                { key: 'riverside', icon: '🛶' },
                { key: 'museums', icon: '🖼️' },
                { key: 'teahouses', icon: '🍵' },
                { key: 'kojima', icon: '👖' }
              ].map((item) => (
                <div
                  key={item.key}
                  className="group flex items-center gap-3 p-3.5 bg-white rounded-xl border border-stone-100 hover:border-green-200 hover:shadow-sm transition-all duration-500 cursor-pointer"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400 group-hover:text-green-800 transition-colors">
                    {t(`map.legend.${item.key}`)}
                  </span>
                </div>
              ))}
            </div>

            {/* Premium Navigation Trigger */}
            <div className="pt-4">
              <button
                onClick={() => window.open('https://maps.google.com/?q=Kurashiki+Bikan+Historical+Quarter', '_blank')}
                className="group relative flex items-center gap-6"
              >
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-stone-900 flex items-center justify-center text-white group-hover:bg-green-800 transition-all duration-500 z-10 relative shadow-lg">
                    <FaMapMarkerAlt size={18} className="group-hover:animate-bounce" />
                  </div>
                  <div className="absolute inset-0 bg-green-200 rounded-full animate-ping opacity-15"></div>
                </div>

                <div className="text-left">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-green-700 mb-0.5">{t('map.nav_label')}</p>
                  <p className="font-serif text-lg italic text-stone-800 group-hover:text-green-900 transition-all">{t('map.nav_action')}</p>
                  <div className="h-[1px] w-6 group-hover:w-full bg-green-800/30 transition-all duration-500 mt-1"></div>
                </div>
              </button>
            </div>
          </div>

          {/* RIGHT: ARTISTIC MAP CARD */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative">
            <div className="absolute -inset-4 border border-stone-100 rounded-[5rem] -z-10 rotate-1 group-hover:rotate-0 transition-transform duration-1000"></div>

            <div className="relative group px-5">
              <div className="absolute top-10 -right-5 z-30 bg-green-900 shadow-2xl p-5 rounded-3xl border border-stone-100 rotate-12 group-hover:rotate-0 transition-all duration-700">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-serif italic text-white">Kurashiki</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-stone-300">Okayama, JP</span>
                </div>
              </div>

              <div className="relative h-[550px] w-full bg-white p-1.5 rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-green-200 overflow-hidden">
                <iframe
                  title="Kurashiki Interactive Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.4357736630043!2d133.7684126763402!3d34.59562779013898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35515647a505b8cf%3A0x633d778a48b59363!2sKurashiki%20Bikan%20Historical%20Quarter!5e0!3m2!1sen!2smm!4v1700000000000!5m2!1sen!2smm"
                  className="w-full h-full rounded-[1.6rem] grayscale group-hover:grayscale-0 contrast-[1.05] brightness-[0.98] transition-all duration-1000 ease-in-out"
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- TRIP PLANNER --- */}
      <section id="plan-trip" className="py-20 bg-[#FCFCFA] border border-y-green-200 mb-10">
        <div className="max-w-[1100px] mx-auto px-6">

          {/* Header - Simple & Centered */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif text-green-800 mb-4">
              {t('planner.title')}
            </h2>
            <div className="w-12 h-[1px] bg-green-600 mx-auto"></div>
          </div>

          {/* The 3-Step Information Flow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

            {/* Step 1 */}
            <div className="text-center space-y-4">
              <div className="text-green-700 flex justify-center"><FaRegCompass size={24} /></div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-900">
                {t('planner.discovery.label')}
              </h4>
              <p className="text-[13px] text-stone-500 leading-relaxed font-light px-4">
                {t('planner.discovery.desc')}
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center space-y-4 border-x border-stone-100">
              <div className="text-green-700 flex justify-center"><FaRegListAlt size={24} /></div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-900">
                {t('planner.essentials.label')}
              </h4>
              <p className="text-[13px] text-stone-500 leading-relaxed font-light px-4">
                {t('planner.essentials.desc')}
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center space-y-4">
              <div className="text-green-700 flex justify-center"><FaRegCalendarCheck size={24} /></div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-900">
                {t('planner.booking.label')}
              </h4>
              <p className="text-[13px] text-stone-500 leading-relaxed font-light px-4">
                {t('planner.booking.desc')}
              </p>
            </div>

          </div>

          {/* Clean Call to Action */}
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/trip-planner')}
              className="group relative px-12 py-5 overflow-hidden rounded-full bg-white border border-stone-200 transition-all hover:border-green-800"
            >
              <div className="relative z-10 flex items-center gap-4">
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-green-800">
                  {t('planner.cta')}
                </span>
                <FaChevronRight size={10} className="text-stone-400 group-hover:text-green-800 transition-colors" />
              </div>
              {/* Subtle slide-up background on hover */}
              <div className="absolute inset-0 bg-stone-50 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>

        </div>
      </section>

      {/* --- PRACTICAL TRAVEL INFO  --- */}
      <section className="py-18 pt-8 max-w-[1200px] mx-auto px-6 bg-[#f8f7f4] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-stone-100/50 rounded-l-[100px] pointer-events-none"></div>

        <div className="max-w-[1300px] mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">

            {/* LEFT: VISUAL COMPOSITION */}
            <div className="lg:w-1/2 sm:mb-8 relative w-full">
              <div className="relative w-full aspect-[1.1/1] h-[350px] md:h-auto group/img">
                <div className="absolute inset-0 rounded-[2rem] rounded-tr-[8rem] overflow-hidden shadow-2xl transition-all duration-700 group-hover/img:rounded-tr-[2rem] group-hover/img:rounded-bl-[8rem]">
                  <img
                    src="/images/canalRef.jpg"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-110"
                    alt="Kurashiki Aesthetic"
                  />
                  <div className="absolute inset-0 bg-stone-900/10 group-hover/img:bg-transparent transition-colors"></div>
                </div>

                <div className="absolute -top-6 -right-6 w-24 h-24 bg-green-700 rounded-full flex flex-col items-center justify-center text-white shadow-2xl rotate-6 group-hover/img:rotate-0 transition-all duration-500">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-80">Best of</span>
                  <span className="text-2xl font-serif italic">2025</span>
                </div>

                <div className="absolute -inset-4 border border-stone-200 rounded-[2.5rem] rounded-tr-[9rem] -z-10 group-hover/img:translate-x-2 group-hover/img:translate-y-2 transition-transform duration-500"></div>
              </div>

              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 lg:left-auto lg:right-0 lg:translate-x-8 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-[240px] border border-stone-100">
                <div className="space-y-2">
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse"></div>
                    <div className="w-1.5 h-1.5 bg-stone-300 rounded-full"></div>
                  </div>
                  <p className="text-[10px] font-black text-green-900 uppercase tracking-widest">{t('practical.tip_label')}</p>
                  {/* စာသားအရောင်ကို text-stone-700 သို့ ပြောင်းလိုက်ပါသည် */}
                  <p className="text-[13px] font-serif italic text-stone-700 leading-snug">
                    "{t('practical.tip_text')}"
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT: CONTENT */}
            <div className="lg:w-1/2 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-green-700"></div>
                  <span className="text-green-800 font-black text-[10px] uppercase tracking-[0.4em]">
                    {t('practical.label')}
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-stone-950 leading-[1.1]">
                  {t('practical.title_part1')} <br />
                  {/* မှိန်နေတဲ့ text-stone-400 ကို text-stone-500/60 သို့မဟုတ် ပိုရင့်အောင် ပြင်ထားပါတယ် */}
                  <span className="italic font-light text-stone-500">{t('practical.title_part2')}</span>
                </h2>
              </div>

              <div className="grid gap-6">
                <div className="group flex gap-8 pb-6 border-b border-stone-200">
                  {/* 01 ကို ပိုမြင်သာအောင် text-stone-400 ပြောင်းလိုက်ပါတယ် */}
                  <div className="text-stone-400 text-3xl font-serif italic group-hover:text-green-700 transition-colors duration-500">01</div>
                  <div className="space-y-2">
                    <h3 className="font-black text-[11px] uppercase tracking-[0.2em] text-stone-950">
                      {t('practical.access_title')}
                    </h3>
                    {/* Description ကို text-stone-600 သို့ ပြောင်းလိုက်ပါသည် */}
                    <p className="text-stone-600 text-[14px] font-normal leading-relaxed max-w-md">
                      {t('practical.access_desc')}
                    </p>
                  </div>
                </div>

                <div className="group flex gap-8 pb-6 border-b border-stone-200">
                  <div className="text-stone-400 text-3xl font-serif italic group-hover:text-green-700 transition-colors duration-500">02</div>
                  <div className="space-y-2">
                    <h3 className="font-black text-[11px] uppercase tracking-[0.2em] text-stone-950">
                      {t('practical.time_title')}
                    </h3>
                    {/* Description ကို text-stone-600 သို့ ပြောင်းလိုက်ပါသည် */}
                    <p className="text-stone-600 text-[14px] font-normal leading-relaxed max-w-md">
                      {t('practical.time_desc')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <button
                  onClick={() => navigate('/travel-journal')}
                  className="px-6 py-3 bg-green-950 text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-green-800 transition-all shadow-lg active:scale-95">
                  {t('practical.explore')}
                </button>
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-stone-200 flex items-center justify-center overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" />
                    </div>
                  ))}
                  {/* traveled text ကို text-stone-500 သို့ ပြောင်းပါသည် */}
                  <div className="pl-4 text-[10px] font-bold text-stone-500 uppercase tracking-tighter self-center">
                    {t('practical.travelled')}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- "LOCAL INSIGHTS" --- */}
      <section className="py-24 bg-[#FDFDFD] border-t border-stone-100">
        <div className="max-w-[1200px] mx-auto px-6">

          {/* Section Header */}
          <div className="mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-700 mb-4 block">
              {t('insights.badge')}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-800 italic">
              {t('insights.title_main')} <span className="text-emerald-900">{t('insights.title_highlight')}</span>
            </h2>
          </div>

          {/* 3-Column Editorial Grid */}
          <div className="grid md:grid-cols-3 gap-12 lg:gap-20">

            {/* Insight 1: Denim Heritage */}
            <div className="group cursor-default">
              <div className="mb-6 overflow-hidden rounded-[32px] aspect-[4/5]">
                  <img
                    src="/images/kojima jeanstreet.jpg"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt="Indigo Fabric"
                  />
                </div>
              <div className="flex items-center gap-3 mb-4">
                
                <FaFingerprint className="text-emerald-600" size={14} />
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-stone-900">
                  {t('insights.denim.title')}
                </h4>
              </div>
              <p className="text-[13px] text-stone-500 font-light leading-relaxed">
                {t('insights.denim.desc')}
              </p>
            </div>

            {/* Insight 2: Night View */}
            <div className="group cursor-default">
              <div className="mb-6 overflow-hidden rounded-[32px] aspect-[4/5]">
                  <img
                    src="/images/night view.jpg"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt="Indigo Fabric"
                  />
                </div>
              <div className="flex items-center gap-3 mb-4">
                
                <FaMoon className="text-emerald-600" size={14} />
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-stone-900">
                  {t('insights.night.title')}
                </h4>
              </div>
              <p className="text-[13px] text-stone-500 font-light leading-relaxed">
                {t('insights.night.desc')}
              </p>
            </div>

            {/* Insight 3: Tea Houses */}
            <div className="group cursor-default">
              <div className="mb-6 overflow-hidden rounded-[32px] aspect-[4/5]">
                  <img
                    src="/images/whstreetlight.jpg"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt="Indigo Fabric"
                  />
                </div>
              <div className="flex items-center gap-3 mb-4">
                
                <FaLightbulb className="text-emerald-600" size={14} />
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-stone-900">
                  {t('insights.tea.title')}
                </h4>
              </div>
              <p className="text-[13px] text-stone-500 font-light leading-relaxed">
                {t('insights.tea.desc')}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* --- REVIEWS SECTION --- */}
      <section className="py-8 max-w-[1200px] mx-auto overflow-hidden relative group">
        {/* Decorative Background Blob */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-green-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none" />

        <div className="max-w-[1250px] mx-auto px-6 relative">

          {/* 1. Header Portion */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 pb-6 border-b border-stone-200 gap-4 text-left">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-0.5 bg-green-600" />
                <span className="text-green-600 font-black text-[10px] uppercase tracking-[0.3em]">
                  {t('review.subtitle')}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif italic text-stone-900 mb-4 leading-tight">
                {t('review.title')}
              </h2>
            </div>
            <p className="text-stone-400 max-w-[280px] mt-8 text-[11px] leading-relaxed italic font-light">
              {t('review.sub')}
            </p>
          </div>

          {/* 2. Slider Container */}
          <div className="relative md:px-12">
            <Swiper
              modules={[Pagination, Autoplay, SwiperNav]}
              spaceBetween={4}
              slidesPerView={1}
              loop={reviews.length > 3}
              autoplay={{ delay: 5000 }}
              navigation={{
                prevEl: '.review-prev-btn',
                nextEl: '.review-next-btn',
              }}
              pagination={{
                clickable: true,
                el: '.custom-dots-container',
                bulletClass: 'inline-block w-2 h-2 rounded-full bg-stone-300 mx-1 cursor-pointer transition-all duration-300',
                bulletActiveClass: '!w-6 !bg-green-600 !rounded-full'
              }}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              }}
              className="!pb-14"
            >
              {(reviews.length < 6 ? [...reviews, ...reviews] : reviews).map((r, index) => (
                <SwiperSlide key={index} className="py-4">
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm flex flex-col h-[380px] relative transition-all duration-300 hover:shadow-xl hover:border-green-100 group/card mx-0.5"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <div className="w-9 h-9 rounded-2xl bg-stone-50 flex items-center justify-center text-stone-300 group-hover/card:bg-green-800 group-hover/card:text-white transition-all duration-500">
                        <FaQuoteLeft size={12} />
                      </div>
                      <div className="flex text-orange-400 text-[8px] gap-0.5 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100/50">
                        {[...Array(r.rating)].map((_, i) => <FaStar key={i} />)}
                      </div>
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-lg font-serif italic text-stone-900 leading-tight group-hover/card:text-green-800 transition-colors line-clamp-2">
                        {r.title}
                      </h3>
                      <p className="text-stone-500 text-[13px] mt-8 leading-relaxed font-light italic line-clamp-4">
                        "{r.excerpt}"
                      </p>
                    </div>

                    <div className="mt-4 pt-5 border-t border-stone-50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img src={r.img} className="w-10 h-10 rounded-xl object-cover ring-2 ring-stone-50 shadow-sm transition-transform duration-500 group-hover/card:scale-110" alt={r.name} />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-600 rounded-full border-2 border-white flex items-center justify-center">
                            <Leaf size={8} className="text-white" />
                          </div>
                        </div>
                        <div className="text-left">
                          <h4 className="font-bold text-stone-900 text-[12px] leading-none">{r.name}</h4>
                          <p className="text-[9px] text-green-700 font-black uppercase tracking-widest mt-1">{r.country}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            <button className="review-prev-btn absolute left-7 top-53 border-green-700 -translate-y-12 z-20 w-11 h-11 rounded-full bg-green-800 shadow-lg text-white flex items-center justify-center hover:bg-white hover:text-green-900 hover:border-green-800 transition-all border active:scale-90 group">
              <FaChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>

            <button className="review-next-btn absolute right-7 top-53 border-green-700 -translate-y-8 z-20 w-11 h-11 rounded-full bg-green-800 shadow-lg text-white flex items-center justify-center hover:bg-white hover:text-green-900 hover:border-green-800 transition-all border active:scale-90 group">
              <FaChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>

            <div className="custom-dots-container flex justify-center mt-2 space-x-1"></div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/travel-journal')}
              className="group inline-flex items-center gap-4 bg-green-900 text-white pl-8 pr-2 py-2 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-green-700 transition-all duration-500 shadow-xl active:scale-95"
            >
              {t('review.more_stories')}
              <div className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-green-700 transition-all duration-400">
                <ArrowUpRight size={16} />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* --- SIDEBAR MENU --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30 }} className="fixed inset-0 z-150 flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setIsOpen(false)} className="absolute inset-0 bg-stone-900/60 backdrop-blur-md" />

            <motion.div className="relative w-full md:w-500px bg-white h-full p-12 flex flex-col shadow-2xl overflow-y-auto">
              <div className="flex justify-between items-center mb-16">
                <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-900 hover:rotate-90 transition-transform cursor-pointer shadow-sm" onClick={() => setIsOpen(false)}>
                  <FaTimes size={20} />
                </div>
                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-green-700">{t('sidebar.explore')}</span>
              </div>

              <div className="flex grow space-y-12">
                <form onSubmit={handleInternalSearch} className="relative group">
                  <input
                    type="text" placeholder={t('sidebar.search')}
                    className="w-full border-b-2 border-stone-100 py-4 text-sm font-bold focus:outline-none focus:border-green-600 transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <FaSearch className="absolute right-0 top-5 text-stone-300 group-focus-within:text-green-600" />
                </form>

                <nav className="space-y-6">
                  {navLinks.map((l, i) => (
                    <motion.a
                      initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                      key={l.key} href={l.href} onClick={() => setIsOpen(false)}
                      className="text-2xl font-serif italic hover:text-green-700 transition-colors group flex items-center gap-4"
                    >
                      {l.text} <FaArrowRight className="text-lg opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                    </motion.a>
                  ))}
                </nav>

                <div className="pt-10">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-6 flex items-center gap-2">
                    <FaGlobe /> {t('sidebar.language')}
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {languages.map(l => (
                      <button key={l.code} onClick={() =>
                        changeLanguage(l.code)}
                        className={`flex items-center gap-3 p-4 rounded-3xl text-[12px] font-bold border transition-all 
                            ${i18n.language === l.code ?
                            'bg-green-800 border-green-800 text-white' :
                            'bg-stone-50 border-transparent hover:border-green-300'}`}>
                        <span>{l.flag}</span> {l.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-auto flex justify-between items-center pt-10 border-t border-stone-100">
                <div className="flex gap-6">
                  <FaInstagram size={18} className="text-stone-400 hover:text-green-600 transition-colors" />
                  <FaFacebook size={18} className="text-stone-400 hover:text-green-600 transition-colors" />
                  <FaTwitter size={18} className="text-stone-400 hover:text-green-600 transition-colors" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-stone-300">Kurashiki, Okayama</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <FooterPage />
    </div>
  );
};

export default HomePage;
