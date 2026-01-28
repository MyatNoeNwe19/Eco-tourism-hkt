import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,Eye, EyeOff, Mail, Phone, Calendar, Settings, Heart, History, Clock,
    LogOut, ChevronRight, Camera, Check, X, Leaf, Star, ShieldCheck, Lock, Trash2, ShieldAlert
} from 'lucide-react';
import Navbar from './NavbarPage';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const calculateLevel = (bookingCount) => {
    if (bookingCount >= 10) return { level: 5, label: "Eco Legend", color: "text-purple-700 bg-purple-50 border-purple-100" };
    if (bookingCount >= 6) return { level: 4, label: "Master Traveler", color: "text-amber-700 bg-amber-50 border-amber-100" };
    if (bookingCount >= 4) return { level: 3, label: "Eco Explorer", color: "text-blue-700 bg-blue-50 border-blue-100" };
    if (bookingCount >= 2) return { level: 2, label: "Pathfinder", color: "text-emerald-700 bg-emerald-50 border-emerald-100" };
    if (bookingCount >= 1) return { level: 1, label: "Green Scout", color: "text-green-700 bg-green-50 border-green-100" };
    return { level: 0, label: "Newcomer", color: "text-stone-500 bg-stone-50 border-stone-100" };
};

const ImpactView = ({ bookingCount }) => {
    const { t } = useTranslation();

    const getNextGoal = (count) => {
        if (count < 1) return { next: 1, label: "Green Scout", color: "from-green-400 to-emerald-600" };
        if (count < 2) return { next: 2, label: "Pathfinder", color: "from-emerald-400 to-teal-600" };
        if (count < 4) return { next: 4, label: "Eco Explorer", color: "from-blue-400 to-indigo-600" };
        if (count < 6) return { next: 6, label: "Master Traveler", color: "from-amber-400 to-orange-600" };
        if (count < 10) return { next: 10, label: "Eco Legend", color: "from-purple-400 to-rose-600" };
        return { next: count, label: "Ultimate Legend", color: "from-stone-700 to-stone-900" };
    };

    const goal = getNextGoal(bookingCount);
    const progressPercent = Math.min((bookingCount / goal.next) * 100, 100);
    const ecoPoints = bookingCount * 12; 
    const co2Saved = (bookingCount * 0.4).toFixed(1);

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="px-4">
                <h2 className="text-3xl font-serif font-bold italic text-stone-800">{t('profile.env')}</h2>
                <p className="text-stone-400 text-sm italic font-serif mt-1">{t('profile.step')}</p>
            </div>

            {/* Level Progress Card */}
            <div className="bg-white p-8 md:p-10 rounded-[45px] border border-stone-100 shadow-sm overflow-hidden relative group">
                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                        <div>
                            <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-3">
                                {t('profile.rank')}
                            </span>
                            <h4 className="text-3xl font-serif italic font-bold text-stone-800">
                                {t('profile.goal')} <span className="text-emerald-600">{goal.label}</span>
                            </h4>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black uppercase text-stone-300 tracking-widest mb-1">{t('profile.progress')}</p>
                            <span className="text-2xl font-serif italic text-stone-800 font-bold">{bookingCount} <span className="text-stone-300 text-lg">/ {goal.next}</span></span>
                        </div>
                    </div>

                    {/* Animated Progress Bar */}
                    <div className="relative h-4 w-full bg-stone-50 rounded-full border border-stone-100 p-1 shadow-inner">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercent}%` }}
                            transition={{ duration: 1.5, ease: "circOut" }}
                            className={`h-full rounded-full bg-gradient-to-r ${goal.color} shadow-[0_0_15px_rgba(16,185,129,0.3)]`}
                        />
                    </div>

                    <p className="mt-4 text-[10px] text-stone-400 font-medium uppercase tracking-widest">
                        {progressPercent === 100 ? "🏆 Rank Maximum Reached!" : `Just ${goal.next - bookingCount} more journeys to become a ${goal.label}`}
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-emerald-900 p-8 rounded-[40px] text-white shadow-xl relative overflow-hidden group">
                    <Leaf className="mb-4 text-emerald-400" />
                    <h4 className="text-4xl font-serif italic mb-1">{ecoPoints}</h4>
                    <p className="text-[10px] uppercase tracking-widest opacity-60 font-black font-sans">{t('profile.point')}</p>
                    <div className="absolute -right-6 -bottom-6 text-white/5 rotate-12 group-hover:rotate-45 transition-transform duration-1000">
                        <Leaf size={140} />
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[40px] border border-stone-100 shadow-sm">
                    <History className="mb-4 text-amber-400" />
                    <h4 className="text-4xl font-serif italic mb-1">{bookingCount}</h4>
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-black font-sans">{t('profile.complete')}</p>
                </div>

                <div className="bg-white p-8 rounded-[40px] border border-stone-100 shadow-sm">
                    <ShieldCheck className="mb-4 text-blue-400" />
                    <h4 className="text-4xl font-serif italic mb-1">{co2Saved}</h4>
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-black font-sans">{t('profile.save')}</p>
                </div>
            </div>

            {/* Achievements Section */}
            <div className="bg-stone-950 p-10 md:p-12 rounded-[50px] text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                    <h5 className="font-serif italic text-2xl mb-8 flex items-center gap-3">
                        <Star className="text-amber-400 fill-amber-400" size={24} />
                        {t('profile.badge')}
                    </h5>

                    <div className="flex flex-wrap gap-10 justify-start">
                        <Badge icon={<Leaf />} label="Scout" active={bookingCount >= 1} requiredCount={1} currentCount={bookingCount} />
                        <Badge icon={<ShieldCheck />} label="Pathfinder" active={bookingCount >= 2} requiredCount={2} currentCount={bookingCount} />
                        <Badge icon={<Star />} label="Explorer" active={bookingCount >= 4} requiredCount={4} currentCount={bookingCount} />
                        <Badge icon={<History />} label="Traveler" active={bookingCount >= 6} requiredCount={6} currentCount={bookingCount} />
                        <Badge icon={<ShieldAlert />} label="Legend" active={bookingCount >= 10} requiredCount={10} currentCount={bookingCount} />
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full"></div>
            </div>
        </div>
    );
};

const Badge = ({ icon, label, active, requiredCount, currentCount }) => {
    const [showTip, setShowTip] = useState(false);
    const remaining = requiredCount - currentCount;

    return (
        <div
            className="relative flex flex-col items-center gap-3 cursor-pointer group"
            onMouseEnter={() => setShowTip(true)}
            onMouseLeave={() => setShowTip(false)}
        >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-700 ${active
                    ? 'bg-emerald-500 shadow-[0_10px_20px_rgba(16,185,129,0.3)] text-white scale-110'
                    : 'bg-white/10 text-white/20 border border-white/5 grayscale'
                }`}>
                {React.cloneElement(icon, { size: 20 })}
            </div>

            <span className={`text-[9px] font-black uppercase tracking-widest transition-colors duration-500 ${active ? 'text-emerald-400' : 'text-stone-600'
                }`}>
                {label}
            </span>

            <AnimatePresence>
                {showTip && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        className="absolute -top-16 left-1/2 -translate-x-1/2 px-4 py-2 bg-white text-stone-900 rounded-xl shadow-2xl z-50 border border-stone-100 min-w-[140px] text-center"
                    >
                        <p className="text-[10px] font-serif italic leading-tight">
                            {active
                                ? `✨ Unlocked: You are a ${label}!`
                                : `🔒 Need ${remaining} more ${remaining === 1 ? 'journey' : 'journeys'}`}
                        </p>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-r border-b border-stone-100"></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const WishlistView = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    useEffect(() => {
        const savedWishlist = JSON.parse(localStorage.getItem('user_wishlist') || '[]');
        setItems(savedWishlist);
    }, []);
    const removeFromWishlist = (e, id) => {
        e.stopPropagation();
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
        localStorage.setItem('user_wishlist', JSON.stringify(updatedItems));
    };
    return (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.length === 0 ? (
                <div className="col-span-full py-32 text-center bg-white rounded-[40px] border border-dashed border-stone-200">
                    <Heart size={40} className="mx-auto text-stone-200 mb-4" />
                    <p className="text-stone-400 italic font-serif">{t('profile.empty')}</p>
                </div>
            ) : (
                <AnimatePresence mode='popLayout'>
                    {items.map((item) => (
                        <motion.div layout key={`${item.type}-${item.id}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.3 }} whileHover={{ y: -8 }} onClick={() => navigate(`/${item.type === 'experience' ? 'experience' : 'attraction'}/${item.id}`)} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer border border-stone-100">
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img src={item.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={item.title} />
                                <button onClick={(e) => removeFromWishlist(e, item.id)} className="absolute top-3 right-3 z-20 p-2.5 rounded-full backdrop-blur-md bg-green-600 text-white shadow-lg transition-transform active:scale-90 hover:bg-red-600">
                                    <Heart size={14} fill="white" />
                                </button>
                                <div className="absolute top-3 left-3">
                                    <span className="bg-white/90 backdrop-blur-md text-stone-900 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-wider shadow-sm">{item.type === 'experience' ? 'Experience' : 'Destination'}</span>
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="font-serif italic text-stone-900 group-hover:text-green-800 transition-colors text-lg mb-3 line-clamp-1">{item.type === 'experience' ? t(`${item.title.replace('experience.', '')}.name`) : t(item.title)}</h3>
                                <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-[0.2em] border-t border-stone-50 pt-4 text-stone-300 group-hover:text-green-700 transition-colors">
                                    <span>{t('mustVisit.explore_story')}</span>
                                    <ChevronRight size={12} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            )}
        </motion.div>
    );
};

const JourneysView = ({ bookings }) => {
    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold italic mb-6 px-4 text-stone-800">{t('profile.story')}</h2>

            {bookings.length === 0 ? (
                <div className="py-32 text-center bg-white rounded-[40px] border border-stone-100 shadow-sm">
                    <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Leaf className="text-green-800/20" size={32} />
                    </div>
                    <p className="text-stone-400 italic font-serif">{t('profile.sub-desc')}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {bookings.map((booking) => (
                        <motion.div
                            key={booking.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-6 rounded-[35px] border border-stone-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-700">
                                    <History size={20} />
                                </div>
                                <div>
                                    <h4 className="font-serif font-bold italic text-stone-900">
                                        {booking.title || "Reserved Journey"}
                                    </h4>
                                    <div className="flex gap-3 mt-1">
                                        <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest flex items-center gap-1">
                                            <Calendar size={10} /> {booking.date}
                                        </span>
                                        <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest flex items-center gap-1">
                                            <User size={10} /> {booking.guests || 1} {t('profile.guest')}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* လက်ယာဘက် - စျေးနှုန်းနဲ့ Status */}
                            <div className="flex items-center justify-between w-full md:w-auto md:gap-8 border-t md:border-t-0 pt-4 md:pt-0">
                                <div className="text-right">
                                    <p className="text-[9px] font-black uppercase text-stone-300">{t('profile.total')}</p>
                                    <p className="font-bold text-stone-900">
                                        {booking.total?.toLocaleString()} {booking.currency}
                                    </p>
                                </div>
                                <div className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg ${booking.status === 'Confirmed' ? 'bg-emerald-600 text-white shadow-emerald-100' : 'bg-stone-100 text-stone-500'
                                    }`}>
                                    {booking.status}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

// --- Main Profile Component ---
const Profile = () => {
    const { user, logout, updateUser } = useAuth();
    const navigate = useNavigate();
    const joinDate = "January 2026";
    const [bookingHistory, setBookingHistory] = useState([]);
    const {t} = useTranslation();
    // const bookingHistory = JSON.parse(localStorage.getItem('user_bookings') || '[]');

    const [subTab, setSubTab] = useState('menu');
    const [isEditing, setIsEditing] = useState(false);
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({ fullName: "", phone: "", nationality: "Myanmar", bio: "" });
    const [profileImage, setProfileImage] = useState(null);
    const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();

    const [userRank, setUserRank] = useState({ level: 0, label: "Newcomer", color: "..." });

    useEffect(() => {
        if (user && user.email) {
            const storageKey = `bookings_${user.email}`;
            const savedBookings = JSON.parse(localStorage.getItem(storageKey) || '[]');

            setBookingHistory(savedBookings);
            setUserRank(calculateLevel(savedBookings.length));
        } else {
            setBookingHistory([]);
        }
    }, [user]);


    const [activeTab, setActiveTab] = useState(() => {
        return location.state?.activeTab || localStorage.getItem('profile_active_tab') || 'journeys';
    });

    useEffect(() => {
        if (location.state?.activeTab) {
            setActiveTab(location.state.activeTab);
        }
    }, [location.state]);

    useEffect(() => {
        localStorage.setItem('profile_active_tab', activeTab);
        if (activeTab !== 'settings') setSubTab('menu');
    }, [activeTab]);

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('kurashiki_user')) || {};
        setFormData({
            fullName: savedData.fullName || user?.displayName || user?.name || "Eco Explorer",
            phone: savedData.phone || user?.phone || "",
            nationality: savedData.nationality || "Myanmar",
            bio: savedData.bio || "Preserving nature, one journey at a time."
        });
        setProfileImage(savedData.profileImage || null);
    }, [user]);

    const handleSave = () => {
        const updatedUser = { ...formData, profileImage, email: user?.email };
        localStorage.setItem('kurashiki_user', JSON.stringify(updatedUser));
        if (updateUser) updateUser(updatedUser);
        setIsEditing(false);
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        alert("Password change request received.");
        setPasswords({ current: "", new: "", confirm: "" });
    };

    const handleDeleteAccount = () => {
        if (window.confirm("Are you sure you want to delete your sanctuary?")) {
            localStorage.clear();
            logout();
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen bg-[#F8F7F4]">
            <Navbar forceDark={true} />
            <div className="pt-32 pb-20 px-4 md:px-12 max-w-[1400px] mx-auto">

                {/* --- Compact Professional Header --- */}
                <div className="relative mb-8">
                    <div className="bg-white rounded-[32px] shadow-sm border border-stone-100 overflow-hidden">
                        <div className="h-1.5 w-full bg-stone-900"></div>

                        <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
                            <div className="relative">
                                <div
                                    className="relative w-32 h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden bg-stone-50 cursor-pointer group"
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    {profileImage ? (
                                        <img src={profileImage} className="w-full h-full object-cover" alt="Profile" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-3xl font-serif italic text-stone-200">
                                            {formData.fullName[0]}
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Camera className="text-white" size={20} />
                                    </div>
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                            </div>

                            <div className="flex-1 w-full text-center md:text-left">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                    <div>
                                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 leading-tight">
                                            {formData.fullName}
                                        </h1>
                                        <p className="text-stone-400 font-serif italic text-base mt-1">
                                            {formData.bio || "Eco-conscious traveler & explorer."}
                                        </p>
                                        <span className="hidden sm:block text-stone-200 text-xs">•</span>
                                        <div className="flex items-center gap-1.5 text-xs font-sans font-medium uppercase tracking-widest text-emerald-700/60">
                                            <Leaf size={12} /> Member since {joinDate}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap justify-center gap-2">
                                        <span className="px-3 py-1 bg-stone-50 text-stone-500 rounded-lg text-[9px] font-black uppercase tracking-widest border border-stone-100">
                                            Verified
                                        </span>
                                        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${userRank.color}`}>
                                            Level {userRank.level} • {userRank.label}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center gap-6 pt-4 border-t border-stone-50">
                                    <div className="flex items-center gap-2 text-stone-500">
                                        <Mail size={14} className="text-stone-300" />
                                        <span className="text-xs font-medium">{user?.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-stone-500">
                                        <Phone size={14} className="text-stone-300" />
                                        <span className="text-xs font-medium">{formData.phone || 'Private'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => setProfileImage(reader.result);
                            reader.readAsDataURL(file);
                        }
                    }} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-3 space-y-4">
                        <TabButton active={activeTab === 'journeys'} label="Journeys" icon={<History />} onClick={() => setActiveTab('journeys')} />
                        <TabButton active={activeTab === 'wishlist'} label="Wishlist" icon={<Heart />} onClick={() => setActiveTab('wishlist')} />
                        <TabButton active={activeTab === 'impact'} label="Eco Impact" icon={<Leaf />} onClick={() => setActiveTab('impact')} />
                        <TabButton active={activeTab === 'settings'} label="Settings" icon={<Settings />} onClick={() => setActiveTab('settings')} />
                        <button onClick={logout} className="w-full mt-10 p-4 text-red-400 hover:bg-red-50 rounded-2xl flex items-center justify-between group font-black uppercase text-[10px] tracking-widest">
                           {t('profile.exit')} <LogOut size={18} />
                        </button>
                    </div>

                    <div className="lg:col-span-9">
                        <AnimatePresence mode="wait">
                            {activeTab === 'journeys' && <motion.div key="journeys" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><JourneysView bookings={bookingHistory} /></motion.div>}
                            {activeTab === 'wishlist' && <motion.div key="wishlist" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><WishlistView /></motion.div>}
                            {activeTab === 'impact' && <motion.div key="impact" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><ImpactView bookingCount={bookingHistory.length} /></motion.div>}

                            {activeTab === 'settings' && (
                                <motion.div key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                    <AnimatePresence mode="wait">
                                        {subTab === 'menu' ? (
                                            <motion.div key="s-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                                                <h2 className="text-2xl font-serif font-bold italic mb-6 px-4 text-stone-800">{t('profile.account')}</h2>
                                                <SettingOption icon={<User />} title={t('profile.personal-details')} desc={t('profile.personal-desc')} onClick={() => setSubTab('personal')} />
                                                <SettingOption icon={<Lock />} title={t('profile.security-title')} desc={t('profile.security-desc')} onClick={() => setSubTab('security')} />
                                                <SettingOption icon={<ShieldAlert className="text-rose-400" />} title={t('profile.privacy-title')} desc={t('profile.privacy-desc')} onClick={() => setSubTab('privacy')} />
                                            </motion.div>
                                        ) : (
                                            <motion.div key="s-content" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                                <button onClick={() => { setSubTab('menu'); setIsEditing(false); }} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-stone-400 hover:text-stone-800 mb-8 transition-colors group">
                                                    <ChevronRight size={14} className="rotate-180 group-hover:-translate-x-1 transition-transform" /> {t('profile.back')}
                                                </button>

                                                {subTab === 'personal' && (
                                                    <section className="bg-white p-10 rounded-[40px] border border-stone-100 shadow-sm">
                                                        <div className="flex justify-between items-center mb-10">
                                                            <div className="flex items-center gap-3">
                                                                <User className="text-stone-300" size={24} />
                                                                <h2 className="text-2xl font-serif font-bold italic">{t('profile.personal')}</h2>
                                                            </div>
                                                            {!isEditing ? (
                                                                <button onClick={() => setIsEditing(true)} className="px-6 py-2 bg-stone-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest">Edit Details</button>
                                                            ) : (
                                                                <div className="flex gap-2">
                                                                    <button onClick={handleSave} className="p-2 bg-green-700 text-white rounded-full"><Check size={20} /></button>
                                                                    <button onClick={() => setIsEditing(false)} className="p-2 bg-stone-100 text-stone-400 rounded-full"><X size={20} /></button>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                            <InputField label="Username / Name" value={formData.fullName} editing={isEditing} onChange={(v) => setFormData({ ...formData, fullName: v })} />
                                                            <InputField label="Phone Number" value={formData.phone} editing={isEditing} onChange={(v) => setFormData({ ...formData, phone: v })} />
                                                            <div className="md:col-span-2">
                                                                <InputField label="About My Journey" value={formData.bio} editing={isEditing} isTextArea onChange={(v) => setFormData({ ...formData, bio: v })} />
                                                            </div>
                                                        </div>
                                                    </section>
                                                )}
                                                {subTab === 'security' && (
                                                    <section className="bg-white p-10 rounded-[40px] border border-stone-100 shadow-sm">
                                                        <div className="flex items-center gap-3 mb-10">
                                                            <Lock className="text-stone-300" size={24} />
                                                            <h2 className="text-2xl font-serif font-bold italic">{t('profile.security')}</h2>
                                                        </div>
                                                        <form onSubmit={handlePasswordChange} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                            {/* Current Password */}
                                                            <div className="md:col-span-2 space-y-2">
                                                                <label className="text-[10px] font-black uppercase text-stone-300 tracking-widest">{t('profile.current')}</label>
                                                                <div className="relative">
                                                                    <input
                                                                        type={showPassword ? "text" : "password"}
                                                                        value={passwords.current}
                                                                        onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                                                                        className="w-full bg-stone-50 p-4 rounded-xl border-none outline-none pr-12"
                                                                        placeholder="••••••••"
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setShowPassword(!showPassword)}
                                                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-900 transition-colors"
                                                                    >
                                                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            {/* New Password */}
                                                            <div className="space-y-2">
                                                                <label className="text-[10px] font-black uppercase text-stone-300 tracking-widest">{t('profile.new')}</label>
                                                                <div className="relative">
                                                                    <input
                                                                        type={showPassword ? "text" : "password"}
                                                                        value={passwords.new}
                                                                        onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                                                        className="w-full bg-stone-50 p-4 rounded-xl border-none outline-none pr-12"
                                                                        placeholder="••••••••"
                                                                    />
                                                                </div>
                                                            </div>

                                                            {/* Confirm Password */}
                                                            <div className="space-y-2">
                                                                <label className="text-[10px] font-black uppercase text-stone-300 tracking-widest">{t('profile.confirm')}</label>
                                                                <div className="relative">
                                                                    <input
                                                                        type={showPassword ? "text" : "password"}
                                                                        value={passwords.confirm}
                                                                        onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                                                        className="w-full bg-stone-50 p-4 rounded-xl border-none outline-none pr-12"
                                                                        placeholder="••••••••"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="md:col-span-2 pt-4">
                                                                <button type="submit" className="px-8 py-3 bg-stone-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-stone-700 transition-colors">
                                                                    {t('profile.update')}
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </section>
                                                )}

                                                {subTab === 'privacy' && (
                                                    <section className="bg-rose-50/30 p-10 rounded-[40px] border border-rose-100">
                                                        <div className="flex items-center gap-3 mb-6">
                                                            <ShieldAlert className="text-rose-400" size={24} />
                                                            <h2 className="text-2xl font-serif font-bold italic text-rose-900">{t('profile.privacy')}</h2>
                                                        </div>
                                                        <p className="text-stone-500 text-sm italic font-serif mb-8 leading-relaxed">{t('profile.delete-desc')}</p>
                                                        <button onClick={handleDeleteAccount} className="flex items-center gap-2 px-6 py-3 bg-white border border-rose-200 text-rose-500 hover:bg-rose-500 hover:text-white transition-all rounded-2xl text-[10px] font-black uppercase tracking-widest">
                                                            <Trash2 size={16} />{t('profile.delete')}
                                                        </button>
                                                    </section>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Helper Components ---
const SettingOption = ({ icon, title, desc, onClick }) => (
    <button onClick={onClick} className="w-full bg-white p-6 rounded-[30px] border border-stone-50 shadow-sm flex items-center justify-between group hover:border-stone-200 transition-all duration-300">
        <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center text-stone-400 group-hover:bg-stone-900 group-hover:text-white transition-colors">
                {icon}
            </div>
            <div className="text-left">
                <h4 className="font-serif italic text-lg text-stone-800">{title}</h4>
                <p className="text-xs text-stone-400 italic">{desc}</p>
            </div>
        </div>
        <ChevronRight size={18} className="text-stone-200 group-hover:text-stone-900 transition-colors" />
    </button>
);

const TabButton = ({ active, label, icon, onClick }) => (
    <button onClick={onClick} className={`w-full p-5 rounded-2xl flex items-center gap-4 transition-all duration-300 ${active ? 'bg-stone-900 text-white shadow-lg translate-x-2' : 'text-stone-400 hover:bg-white hover:text-stone-600'}`}>
        {icon} <span className="text-[11px] font-black uppercase tracking-widest">{label}</span>
    </button>
);

const InputField = ({ label, value, editing, onChange, isTextArea }) => (
    <div className="space-y-2">
        <label className="text-[10px] font-black uppercase text-stone-300 tracking-widest">{label}</label>
        {editing ? (
            isTextArea ? <textarea value={value} onChange={e => onChange(e.target.value)} className="w-full bg-stone-50 p-4 rounded-xl border-none outline-none font-serif italic text-stone-800" rows="4" />
                : <input type="text" value={value} onChange={e => onChange(e.target.value)} className="w-full bg-stone-50 p-4 rounded-xl border-none outline-none font-serif italic text-stone-800" />
        ) : (
            <p className="text-lg font-serif italic text-stone-800 border-b border-stone-50 pb-2">{value || "Not set"}</p>
        )}
    </div>
);

export default Profile;