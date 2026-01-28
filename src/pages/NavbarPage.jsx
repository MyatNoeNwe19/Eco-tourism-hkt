import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
// useAuth ကို ဒီမှာ သေချာချိတ်ထားဖို့ လိုပါတယ်
import { useAuth } from '../context/AuthContext';
import { Leaf, Navigation, Globe, User, LogIn, History, LogOut, Settings, ChevronDown, UserPlus, Bookmark } from 'lucide-react';
import { FaSearch, FaTimes, FaArrowRight, FaInstagram, FaFacebook } from 'react-icons/fa';


const NotificationBadge = () => {
  const notis = JSON.parse(localStorage.getItem('user_notis') || '[]');
  const unreadCount = notis.filter(n => !n.read).length;

  return (
    <div className="relative cursor-pointer">
      <ReceiptText size={20} className="text-stone-800" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center border-2 border-white">
          {unreadCount}
        </span>
      )}
    </div>
  );
};

const Navbar = ({ forceDark = false }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user, logout, isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  const languages = [
    { code: 'ja', name: t('languages.ja'), flag: '🇯🇵' },
    { code: 'en', name: t('languages.en'), flag: '🇺🇸' },
    { code: 'my', name: t('languages.my'), flag: '🇲🇲' },
    { code: 'vi', name: t('languages.vi'), flag: '🇻🇳' },
    { code: 'ko', name: t('languages.ko'), flag: '🇰🇷' }
  ];

  const navLinks = [
    { key: 'home', text: t('navbar.home') || 'Home', href: '/' },
    { key: 'area', text: t('navbar.area') || 'Area', href: '/area' },
    { key: 'trip_planner', text: t('navbar.trip_planner') || 'Trip Planner', href: '/trip-planner' },
    { key: 'must_visit', text: t('navbar.must_visit') || 'Must Visit', href: '/must-visit' },
    { key: 'travel_journal', text: t('navbar.travel_journal') || 'Travel Journal', href: '/travel-journal' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setShowUserMenu(false);
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const changeLanguage = (lng) => { i18n.changeLanguage(lng); setIsOpen(false); };

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
      <nav className={`fixed w-full z-[100] transition-all duration-700 ${isSolid ? 'py-3 bg-white/95 backdrop-blur-xl shadow-sm' : 'py-8 bg-transparent'}`}>
        <div className="max-w-[1500px] mx-auto px-8 flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-700 rounded-2xl flex items-center justify-center text-white shadow-xl rotate-3">
              <Leaf size={22} />
            </div>
            <span className={`text-2xl font-serif font-black tracking-tighter uppercase ${isSolid ? 'text-stone-900' : 'text-white'}`}>
              KURASHIKI BIKAN<span className="text-green-700 italic font-light">.eco</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden xl:flex items-center gap-6">
            <div className="flex gap-6 mr-4">
              {navLinks.map((link) => (
                <Link key={link.key} to={link.href} className={`text-[12px] font-bold uppercase tracking-[0.15em] hover:text-green-700 transition-all ${isSolid ? 'text-stone-600' : 'text-white'}`}>
                  {link.text}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4 border-l border-stone-200/20 pl-6" ref={menuRef}>
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className={`flex items-center gap-3 p-1 pr-4 rounded-full transition-all border group ${isSolid ? 'bg-stone-50 border-stone-200' : 'bg-white/10 border-white/20'}`}
                  >
                    <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white shadow-inner font-bold text-xs overflow-hidden border-2 border-white/20 group-hover:scale-105 transition-transform">
                      {user?.profileImage || user?.photoURL ? (
                        <img
                          src={user?.profileImage || user?.photoURL}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        user?.fullName?.charAt(0) || user?.name?.charAt(0) || <User size={14} />
                      )}
                    </div>

                    <span className={`text-[11px] font-black uppercase tracking-widest ${isSolid ? 'text-stone-800' : 'text-white'}`}>
                      {(user?.fullName || user?.name)?.split(' ')[0]}
                    </span>

                    <ChevronDown size={14} className={`transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''} ${isSolid ? 'text-stone-400' : 'text-white/50'}`} />
                  </button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }}
                        className="absolute right-0 mt-3 w-60 bg-white rounded-[1.5rem] shadow-2xl border border-stone-100 p-2 z-[110] overflow-hidden"
                      >
                        <div className="px-4 py-4 border-b border-stone-50 mb-1 bg-stone-50/50 rounded-t-[1.2rem]">
                          <p className="text-[9px] text-stone-400 uppercase font-black tracking-widest mb-1">{t('profile.journey')}</p>
                          <p className="text-sm font-bold text-stone-800 truncate">{user?.name || "Traveler"}</p>
                          <p className="text-[10px] text-stone-500 truncate font-medium">{user?.email}</p>
                        </div>
                        <Link to="/profile" state={{ activeTab: 'journeys' }} onClick={() => setShowUserMenu(false)} className="flex items-center gap-3 px-4 py-3 text-[12px] font-bold text-stone-600 hover:bg-green-50 hover:text-green-700 rounded-xl transition-all">
                          <User size={14} /> {t('profile.my-profile')}
                        </Link>
                        <Link
                          to="/profile"
                          state={{ activeTab: 'journeys' }}
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-4 py-3 text-[12px] font-bold text-stone-600 hover:bg-green-50 hover:text-green-700 rounded-xl transition-all"
                        >
                          <History size={14} /> {t('profile.my-bookings')}
                        </Link>
                        <Link to="/profile" state={{ activeTab: 'wishlist' }} onClick={() => setShowUserMenu(false)} className="flex items-center gap-3 px-4 py-3 text-[12px] font-bold text-stone-600 hover:bg-green-50 hover:text-green-700 rounded-xl transition-all">
                          <Bookmark size={14} /> {t('profile.fav-places')}
                        </Link>
                        <Link to="/profile" state={{ activeTab: 'settings' }} onClick={() => setShowUserMenu(false)} className="flex items-center gap-3 px-4 py-3 text-[12px] font-bold text-stone-600 hover:bg-green-50 hover:text-green-700 rounded-xl transition-all">
                          <Settings size={14} /> {t('profile.setting')}
                        </Link>
                        <button
                          onClick={() => { logout(); setShowUserMenu(false); }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-[12px] font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all mt-1 border-t border-stone-50 pt-3"
                        >
                          <LogOut size={14} /> {t('profile.logout')}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link to="/login" className={`px-5 py-2.5 rounded-full font-bold text-[10px] uppercase tracking-widest transition-all shadow-sm ${isSolid ? 'bg-stone-900 text-white hover:bg-green-700 shadow-stone-900/10' : 'bg-white text-stone-900 hover:bg-stone-100'}`}>
                    {t('profile.login')}
                  </Link>
                  <Link to="/register" className={`text-[10px] font-bold rounded-full px-5 py-2.5 uppercase tracking-widest transition-all border ${isSolid ? 'text-stone-600 border-stone-200 hover:bg-stone-50' : 'text-white border-white/20 hover:bg-white/10'}`}>
                    {t('profile.register')}
                  </Link>
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${isSolid ? 'bg-stone-50 border-stone-200 text-stone-900' : 'bg-black/20 border-white/20 text-white'}`}>
              <span className="text-sm">{languages.find(l => l.code === i18n.language)?.flag}</span>
              <select value={i18n.language} onChange={(e) => changeLanguage(e.target.value)} className="bg-transparent text-[11px] font-black focus:outline-none cursor-pointer uppercase">
                {languages.map(l => <option key={l.code} value={l.code} className="text-stone-900">{l.name}</option>)}
              </select>
            </div>
          </div>

          {/* Mobile Menu Trigger */}
          <button onClick={() => setIsOpen(true)} className="p-4 bg-emerald-800 rounded-2xl text-white shadow-2xl hover:scale-110 transition-all xl:hidden">
            <Navigation size={20} />
          </button>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30 }}
            className="fixed inset-0 z-[1000] flex justify-end"
          >
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="absolute inset-0 bg-stone-900/60 backdrop-blur-md" />

            <motion.div className="relative w-full md:w-[450px] bg-white h-full p-8 md:p-12 flex flex-col shadow-2xl overflow-y-auto">

              <div className="flex justify-between items-center mb-8 shrink-0">
                <div className="w-10 h-10 bg-stone-50 rounded-full flex items-center justify-center text-stone-900 cursor-pointer shadow-sm" onClick={() => setIsOpen(false)}>
                  <FaTimes size={16} />
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">{t('profile.main-menu')}</span>
              </div>

              {/* 1. User Section Card (Mobile Update) */}
              <div className="mb-10 p-6 bg-gradient-to-br from-stone-50 to-stone-100/50 rounded-[2rem] border border-stone-200/60 shadow-inner">
                {isLoggedIn ? (
                  <div className="flex items-center justify-between">
                    <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-green-700 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-green-900/20 rotate-3 font-bold text-xl uppercase">
                        {user?.name?.charAt(0)}
                      </div>
                      <div>
                        <p className="text-[10px] text-stone-400 uppercase font-black tracking-widest mb-0.5 text-left">{t('profile.wel-back')}</p>
                        <p className="text-xl font-serif italic font-bold text-stone-800 leading-none">{user?.name}</p>
                      </div>
                    </Link>
                    <button onClick={() => { logout(); setIsOpen(false); }} className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                      <LogOut size={20} />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="space-y-1 text-left">
                      <h4 className="text-lg font-serif italic font-bold text-stone-800">{t('profile.login-title')}</h4>
                      <p className="text-[13px] text-stone-500 leading-relaxed">{t('profile.sub-title')}</p>
                    </div>
                    <div className="flex flex-col gap-3">
                      <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-3 w-full py-4 bg-stone-900 text-white rounded-2xl font-bold uppercase tracking-[0.15em] text-[11px] shadow-xl shadow-stone-900/20 hover:bg-green-700 transition-all"><LogIn size={16} /> {t('profile.login')}</Link>
                      <Link to="/register" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-3 w-full py-3.5 bg-white border border-stone-200 text-stone-800 rounded-2xl font-bold uppercase tracking-[0.15em] text-[11px] hover:bg-stone-50 transition-all"><UserPlus size={16} /> {t('profile.register')}</Link>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col flex-grow space-y-8">
                <div className="pt-2">
                  <form onSubmit={handleInternalSearch} className="relative group text-left">
                    <input type="text" placeholder={t('profile.search')} className="w-full bg-stone-50 border-none rounded-2xl py-4 pl-5 pr-12 text-sm focus:ring-2 focus:ring-green-600/20 transition-all outline-none font-medium text-left" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-green-600 transition-colors"><FaSearch size={14} /></button>
                  </form>
                </div>

                <nav className="flex flex-col gap-4 text-left">
                  {navLinks.map((l, index) => (
                    <motion.div key={l.key} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
                      <Link to={l.href} onClick={() => setIsOpen(false)} className="flex text-2xl font-serif italic text-stone-800 hover:text-green-700 transition-all group items-center justify-between py-1">
                        {l.text} <FaArrowRight className="text-[10px] opacity-0 group-hover:opacity-100 transition-all text-green-600" />
                      </Link>
                    </motion.div>
                  ))}

                  {isLoggedIn && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-6 mt-2 border-t border-stone-100 space-y-4 text-left">
                      <Link
                        to="/profile"
                        state={{ activeTab: 'journeys' }}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-[12px] font-bold text-stone-600 hover:bg-green-50 hover:text-green-700 rounded-xl transition-all"
                      >
                        <User size={14} /> {t('profile.my-profile')}
                      </Link>

                      <Link
                        to="/profile"
                        state={{ activeTab: 'journeys' }}
                        onClick={() => setIsOpen(false)} 
                        className="flex items-center gap-3 px-4 py-3 text-[12px] font-bold text-stone-600 hover:bg-green-50 hover:text-green-700 rounded-xl transition-all"
                      >
                        <History size={14} /> {t('profile.my-bookings')}
                      </Link>

                      <Link
                        to="/profile"
                        state={{ activeTab: 'wishlist' }}
                        onClick={() => setIsOpen(false)} 
                        className="flex items-center gap-3 px-4 py-3 text-[12px] font-bold text-stone-600 hover:bg-green-50 hover:text-green-700 rounded-xl transition-all"
                      >
                        <Bookmark size={14} /> {t('profile.fav-places')}
                      </Link>

                      <Link
                        to="/profile"
                        state={{ activeTab: 'settings' }}
                        onClick={() => setIsOpen(false)} 
                        className="flex items-center gap-3 px-4 py-3 text-[12px] font-bold text-stone-600 hover:bg-green-50 hover:text-green-700 rounded-xl transition-all"
                      >
                        <Settings size={14} /> {t('profile.setting')}
                      </Link>
                      
                    </motion.div>
                  )}

                </nav>

                {/* Regional Settings Section */}
                <div className="pt-4 border-t border-stone-100 text-left">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe size={12} className="text-green-700" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">{t('profile.setting')}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {languages.map((l) => (
                      <button key={l.code} onClick={() => changeLanguage(l.code)} className={`flex flex-col items-center justify-center py-3 rounded-2xl transition-all border ${i18n.language === l.code ? 'bg-white border-green-600 text-green-700 shadow-md shadow-green-900/5' : 'bg-stone-50/50 border-transparent text-stone-500 hover:bg-stone-100'}`}>
                        <span className="text-xl mb-1">{l.flag}</span>
                        <span className="text-[9px] font-bold uppercase tracking-tighter">{l.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Footer */}
              <div className="mt-auto pt-8 border-t border-stone-100 flex items-center justify-between shrink-0">
                <div className="flex gap-5 text-stone-400">
                  <FaInstagram size={18} className="hover:text-green-700 cursor-pointer transition-colors" />
                  <FaFacebook size={18} className="hover:text-green-700 cursor-pointer transition-colors" />
                </div>
                <span className="text-[9px] text-stone-300 font-bold tracking-widest uppercase">© 2026 KURASHIKI</span>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;