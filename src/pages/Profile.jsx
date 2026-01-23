import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext'; 
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, Mail, Phone, MapPin,
    Calendar, LogOut, ChevronRight, 
    Globe, ShieldCheck, Bookmark, 
    Camera, Check, X, Award, 
    CreditCard, Bell, ChevronDown
} from 'lucide-react';
import Navbar from './NavbarPage';

import { Clock, CheckCircle2, AlertCircle, ReceiptText } from 'lucide-react';

const BookingHistory = () => {
  // LocalStorage ကနေ Booking တွေကို ပြန်ဖတ်မယ်
  const bookings = JSON.parse(localStorage.getItem('user_bookings') || '[]');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-4">
        <h3 className="text-2xl font-serif italic text-stone-800">My Journeys</h3>
        <span className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em]">
          {bookings.length} Bookings Found
        </span>
      </div>

      {bookings.length === 0 ? (
        <div className="py-20 text-center border-2 border-dashed border-stone-100 rounded-[40px]">
          <p className="text-stone-400 text-xs italic">No bookings yet. Start your Kurashiki adventure!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white border border-stone-100 p-6 rounded-[35px] hover:shadow-xl transition-all group">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-stone-400">#{booking.id}</span>
                    {/* STATUS BADGE */}
                    <div className={`px-3 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center gap-1.5 ${
                      booking.status === 'Confirmed' 
                        ? 'bg-emerald-50 text-emerald-600' 
                        : 'bg-amber-50 text-amber-600'
                    }`}>
                      {booking.status === 'Confirmed' ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                      {booking.status}
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-stone-800">{booking.date} Journey</h4>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-serif italic text-stone-900">{booking.total} {booking.currency}</p>
                  <p className="text-[9px] font-bold text-stone-400 uppercase tracking-tighter">via {booking.method}</p>
                </div>
              </div>

              {/* Prove of Payment Info */}
              {booking.status === 'Pending Approval' && (
                <div className="mt-4 p-3 bg-stone-50 rounded-2xl flex items-center gap-3">
                  <AlertCircle size={14} className="text-amber-500" />
                  <p className="text-[10px] text-stone-500 leading-tight">
                    Our team is currently verifying your payment. You'll be notified once confirmed.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Profile = () => {
    const { user, logout, updateUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const fileInputRef = useRef(null);

    // Initial States (Refresh လုပ်လည်း မပျောက်အောင် Lazy Loading သုံးထားပါတယ်)
    const [formData, setFormData] = useState(() => {
        const saved = localStorage.getItem('kurashiki_user');
        const userData = saved ? JSON.parse(saved) : null;
        return {
            fullName: userData?.fullName || userData?.name || "Eco Traveler",
            phone: userData?.phone || "",
            nationality: userData?.nationality || "Myanmar"
        };
    });

    const [profileImage, setProfileImage] = useState(() => {
        const saved = localStorage.getItem('kurashiki_user');
        const userData = saved ? JSON.parse(saved) : null;
        return userData?.profileImage || null;
    });

    if (!user) {
        const saved = localStorage.getItem('kurashiki_user');
        if (!saved) return (
            <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB]">
                <div className="text-center animate-pulse font-serif italic text-stone-400">Arriving at Sanctuary...</div>
            </div>
        );
    }

    const bookings = [
        { id: 1, place: "Kurashiki Canal Walk", date: "Jan 12, 2026", status: "Completed", cost: "$120", img: "/public/images/wh1.jpg" },
        { id: 2, place: "Ivy Square Workshop", date: "Feb 05, 2026", status: "Upcoming", cost: "$45", img: "/public/images/ivynew2.jpg" }
    ];

    const favorites = [
        { id: 1, name: "Bikan Historical Quarter", type: "Culture", rating: "4.9", img: "/public/images/canals2.jpg" },
        { id: 2, name: "Achi Shrine", type: "Heritage", rating: "4.8", img: "/public/images/achi shrine.jpg" }
    ];

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setProfileImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        if (updateUser) {
            updateUser({ ...user, ...formData, profileImage });
        }
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-[#FDFCFB] selection:bg-green-100">
            <Navbar forceDark={true} />
            
            <div className="pt-32 pb-20 px-4 md:px-8">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Sidebar - Profile & Quick Stats */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-4 space-y-6">
                        <div className="bg-white rounded-[3rem] p-8 border border-stone-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50/50 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                            
                            {/* Profile Image */}
                            <div className="relative w-36 h-36 mx-auto mb-8">
                                <div className="w-full h-full bg-stone-100 rounded-[2.5rem] p-1 shadow-inner overflow-hidden">
                                    <div className="w-full h-full rounded-[2.3rem] bg-green-800 flex items-center justify-center text-white text-4xl font-serif overflow-hidden relative group">
                                        {profileImage ? (
                                            <img src={profileImage} alt="Profile" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        ) : (
                                            <span>{formData.fullName.charAt(0)}</span>
                                        )}
                                        <button onClick={() => fileInputRef.current.click()} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2">
                                            <Camera size={20} />
                                            <span className="text-[10px] uppercase font-bold tracking-widest">Change</span>
                                        </button>
                                    </div>
                                </div>
                                <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
                            </div>

                            <div className="text-center space-y-2">
                                {isEditing ? (
                                    <input 
                                        type="text" 
                                        value={formData.fullName} 
                                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                        className="w-full bg-stone-50 p-3 rounded-2xl text-center text-xl font-serif font-bold italic border border-green-100 outline-none focus:ring-2 ring-green-50"
                                    />
                                ) : (
                                    <h2 className="text-2xl font-serif font-bold text-stone-800 italic">{formData.fullName}</h2>
                                )}
                                <p className="text-stone-400 text-sm font-medium">{user?.email}</p>
                            </div>

                            <div className="mt-8 flex flex-col gap-3">
                                {isEditing ? (
                                    <div className="flex gap-2">
                                        <button onClick={handleSave} className="flex-1 py-4 bg-green-800 text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:shadow-lg hover:shadow-green-900/20 transition-all flex items-center justify-center gap-2">
                                            <Check size={14} /> Save Changes
                                        </button>
                                        <button onClick={() => setIsEditing(false)} className="px-5 py-4 bg-stone-100 text-stone-500 rounded-2xl hover:bg-stone-200 transition-all"><X size={18} /></button>
                                    </div>
                                ) : (
                                    <button onClick={() => setIsEditing(true)} className="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-green-800 transition-all shadow-xl shadow-stone-200/50">Edit Profile</button>
                                )}
                            </div>
                        </div>

                        {/* Badges Section - New Feature */}
                        <div className="bg-white rounded-[2.5rem] p-6 border border-stone-100 shadow-sm">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-4 flex items-center gap-2">
                                <Award size={14} /> Achievements
                            </h4>
                            <div className="flex gap-3">
                                {['Eco Pioneer', 'Heritage Scout', 'Zen Master'].map((badge) => (
                                    <div key={badge} className="w-10 h-10 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-center text-stone-400 hover:text-green-700 hover:bg-green-50 transition-colors cursor-pointer" title={badge}>
                                        <ShieldCheck size={20} />
                                    </div>
                                ))}
                                <div className="w-10 h-10 rounded-xl bg-stone-50 border border-stone-100 border-dashed flex items-center justify-center text-stone-300">
                                    <span className="text-xs font-bold">+5</span>
                                </div>
                            </div>
                        </div>

                        <button onClick={logout} className="w-full py-4 px-8 text-red-400 font-bold text-[10px] uppercase tracking-widest flex items-center justify-between group hover:bg-red-50 rounded-2xl transition-all">
                            <div className="flex items-center gap-3"><LogOut size={16} /> Sign Out</div>
                            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>

                    {/* Right Content */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-8 space-y-8 text-left">
                        
                        {/* Personal Info Grid */}
                        <div className="bg-white rounded-[3rem] p-8 md:p-10 border border-stone-100 shadow-sm relative overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 flex items-center gap-2">
                                        <Mail size={12} /> Email Address
                                    </label>
                                    <p className="text-stone-700 font-serif font-bold italic truncate border-b border-stone-50 pb-2">{user?.email}</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 flex items-center gap-2">
                                        <Phone size={12} /> Contact Number
                                    </label>
                                    {isEditing ? (
                                        <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-stone-50 p-2 rounded-lg border-b-2 border-green-700 outline-none font-serif font-bold italic" />
                                    ) : (
                                        <p className="text-stone-700 font-serif font-bold italic border-b border-stone-50 pb-2">{formData.phone || "Not Set"}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 flex items-center gap-2">
                                        <Globe size={12} /> Origin
                                    </label>
                                    {isEditing ? (
                                        <select value={formData.nationality} onChange={(e) => setFormData({...formData, nationality: e.target.value})} className="w-full bg-stone-50 p-2 rounded-lg border-b-2 border-green-700 outline-none font-serif font-bold italic">
                                            <option value="Myanmar">Myanmar</option>
                                            <option value="Japan">Japan</option>
                                            <option value="Thailand">Thailand</option>
                                        </select>
                                    ) : (
                                        <p className="text-stone-700 font-serif font-bold italic border-b border-stone-50 pb-2">{formData.nationality}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 flex items-center gap-2">
                                        <Calendar size={12} /> Sanctuary Member
                                    </label>
                                    <p className="text-stone-700 font-serif font-bold italic border-b border-stone-50 pb-2">Jan 2026</p>
                                </div>
                            </div>
                        </div>

                        {/* Recent Journeys */}
                        <div>
                            <div className="flex justify-between items-center mb-6 px-4">
                                <h3 className="text-2xl font-serif font-bold text-stone-800 italic tracking-tight">Recent Journeys</h3>
                                <button className="text-[10px] font-black text-green-800 bg-green-50 px-4 py-2 rounded-full uppercase tracking-widest hover:bg-green-800 hover:text-white transition-all">View Ledger</button>
                            </div>
                            <div className="grid gap-4">
                                {bookings.map((trip) => (
                                    <motion.div whileHover={{ y: -5 }} key={trip.id} className="group bg-white p-5 rounded-[2.5rem] border border-stone-100 flex items-center gap-6 shadow-sm hover:shadow-xl hover:shadow-stone-200/40 transition-all">
                                        <div className="w-20 h-20 rounded-[1.8rem] overflow-hidden shrink-0">
                                            <img src={trip.img} alt={trip.place} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <span className={`text-[8px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest ${trip.status === 'Completed' ? 'bg-green-50 text-green-700' : 'bg-stone-100 text-stone-500'}`}>{trip.status}</span>
                                                    <h4 className="text-lg font-serif font-bold text-stone-800 mt-1">{trip.place}</h4>
                                                </div>
                                                <p className="text-sm font-serif font-bold text-stone-900">{trip.cost}</p>
                                            </div>
                                            <div className="flex gap-4 mt-2 text-stone-400 text-[10px] font-bold uppercase tracking-tighter">
                                                <div className="flex items-center gap-1"><Calendar size={12} className="text-stone-300" /> {trip.date}</div>
                                                <div className="flex items-center gap-1"><MapPin size={12} className="text-stone-300" /> Kurashiki</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Favorites */}
                        <div className="pt-4">
                            <h3 className="text-2xl font-serif font-bold text-stone-800 italic mb-6 px-4">Favorite Sanctuaries</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {favorites.map((fav) => (
                                    <div key={fav.id} className="relative group rounded-[2.5rem] overflow-hidden aspect-[4/3] shadow-lg">
                                        <img src={fav.img} alt={fav.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent p-8 flex flex-col justify-end">
                                            <div className="flex justify-between items-end">
                                                <div>
                                                    <span className="text-[9px] font-black text-green-400 uppercase tracking-widest mb-2 block">{fav.type}</span>
                                                    <h4 className="text-white font-serif font-bold text-xl leading-tight">{fav.name}</h4>
                                                </div>
                                                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg text-white text-[10px] font-bold">
                                                    ★ {fav.rating}
                                                </div>
                                            </div>
                                            <div className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20 group-hover:bg-green-700 transition-colors cursor-pointer">
                                                <Bookmark size={16} fill="white" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Profile;