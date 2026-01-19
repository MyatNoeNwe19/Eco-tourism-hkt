import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom'; // useNavigate ထည့်သွင်းထားသည်
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Navigation, Globe } from 'lucide-react';
import {
  FaSearch, FaTimes, FaArrowRight,
  FaInstagram, FaFacebook
} from 'react-icons/fa';

const Navbar = ({ forceDark = false }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate(); // Hook ကြေညာခြင်း
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const languages = [
    { code: 'ja', name: t('languages.ja'), flag: '🇯🇵' },
    { code: 'en', name: t('languages.en'), flag: '🇺🇸' },
    { code: 'my', name: t('languages.my'), flag: '🇲🇲' },
    { code: 'vi', name: t('languages.vi'), flag: '🇻🇳' },
    { code: 'ko', name: t('languages.ko'), flag: '🇰🇷' }
  ];

  const navLinks = [
    { key: 'home', text: t('navbar.home') || 'Home', href: '/#home' },
    { key: 'area', text: t('navbar.area') || 'Area', href: '/area' },
    { key: 'trip_planner', text: t('navbar.trip_planner') || 'Trip Planner', href: '/trip-planner' },
    { key: 'must_visit', text: t('navbar.must_visit') || 'Must Visit', href: '/must-visit' },
    { key: 'travel_journal', text: t('navbar.travel_journal') || 'Travel Journal', href: '/travel-journal' },
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

  const isSolid = scrolled || forceDark;

  return (
    <>
      <nav className={`fixed w-full z-[100] transition-all duration-700 ${isSolid ? 'py-3 bg-white/90 backdrop-blur-xl shadow-sm' : 'py-8 bg-transparent'}`}>
        <div className="max-w-[1500px] mx-auto px-8 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-700 rounded-2xl flex items-center justify-center text-white shadow-xl rotate-3">
              <Leaf size={22} />
            </div>
            <span className={`text-2xl font-serif font-black tracking-tighter uppercase ${isSolid ? 'text-stone-900' : 'text-white'}`}>
              KURASHIKI BIKAN<span className="text-green-700 italic font-light">.eco</span>
            </span>
          </Link>

          <div className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <a key={link.key} href={link.href} className={`text-[13px] font-bold uppercase tracking-[0.15em] hover:text-green-700 transition-all ${isSolid ? 'text-stone-600' : 'text-white'}`}>
                {link.text}
              </a>
            ))}

            <form onSubmit={handleInternalSearch} className={`flex items-center px-4 py-1.5 rounded-full border transition-all ${isSolid ? 'bg-stone-50 border-stone-200' : 'bg-white/10 border-white/20'}`}>
              <input
                type="text" placeholder={t('common.search') || "Search..."}
                className={`bg-transparent text-[10px] font-bold focus:outline-none w-28 placeholder:text-current ${isSolid ? 'text-stone-500' : 'text-white'}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className={isSolid ? 'text-stone-400' : 'text-white/60'}><FaSearch size={12} /></button>
            </form>

            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${isSolid ? 'bg-stone-50 border-stone-200 text-stone-900' : 'bg-black/20 border-white/20 text-white'}`}>
              <span className="text-sm">{languages.find(l => l.code === i18n.language)?.flag}</span>
              <select
                value={i18n.language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="bg-transparent text-[11px] font-black focus:outline-none cursor-pointer uppercase"
              >
                {languages.map(l => <option key={l.code} value={l.code} className="text-stone-900">{l.name}</option>)}
              </select>
            </div>
          </div>

          <button onClick={() => setIsOpen(true)} className="p-4 bg-emerald-800 rounded-2xl text-white shadow-2xl hover:scale-110 transition-all">
            <Navigation size={20} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30 }} className="fixed inset-0 z-[1000] flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="absolute inset-0 bg-stone-900/60 backdrop-blur-md" />

            <motion.div className="relative w-full md:w-[450px] bg-white h-full p-8 md:p-12 flex flex-col shadow-2xl overflow-y-auto">
              {/* Sidebar Header */}
              <div className="flex justify-between items-center mb-10 shrink-0">
                <div
                  className="w-10 h-10 bg-stone-50 rounded-full flex items-center justify-center text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  <FaTimes size={16} />
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">Menu</span>
              </div>

              {/* Sidebar Content */}
              <div className="flex flex-col h-full space-y-10">
                <form onSubmit={handleInternalSearch} className="relative group">
                  <input
                    type="text"
                    placeholder={t('sidebar.search') || "Search experiences..."}
                    className="w-full border-b border-green-300 py-2 text-sm focus:outline-none focus:border-green-600 transition-all bg-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <FaSearch className="absolute right-0 top-2 text-stone-300 group-focus-within:text-green-600" size={14} />
                </form>

                <nav className="flex flex-col gap-4">
                  {navLinks.map((l, index) => (
                    <motion.a
                      key={l.key}
                      href={l.href}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setIsOpen(false)}
                      className="flex text-2xl font-serif italic hover:text-green-700 transition-all group items-center justify-between"
                    >
                      {l.text}
                      <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-green-600" />
                    </motion.a>
                  ))}
                </nav>

                <div className="mt-auto pt-6 border-t border-stone-100">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe size={12} className="text-green-700" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">
                      {t('sidebar.language') || "Languages"}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => changeLanguage(l.code)}
                        className={`flex flex-col items-center justify-center py-3 rounded-xl transition-all border ${i18n.language === l.code
                            ? 'bg-green-50 border-green-200 text-green-800 shadow-sm'
                            : 'bg-stone-50/50 border-transparent text-stone-500 hover:bg-stone-100 hover:text-stone-700'
                          }`}
                      >
                        <span className="text-base mb-1">{l.flag}</span>
                        <span className="text-[9px] font-bold uppercase tracking-tight">{l.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 shrink-0">
                  <div className="flex gap-4 text-stone-400">
                    <FaInstagram size={16} className="hover:text-green-700 cursor-pointer" />
                    <FaFacebook size={16} className="hover:text-green-700 cursor-pointer" />
                  </div>
                  <span className="text-[9px] text-stone-300 font-bold tracking-widest uppercase">© 2025 Kurashiki</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;