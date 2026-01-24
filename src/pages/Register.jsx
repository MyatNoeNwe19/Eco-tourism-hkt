import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // navigate ထည့်သုံးပါမယ်
import { Leaf, User, Mail, Lock, Phone, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Navbar from './NavbarPage';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth(); // AuthContext က register ကို ယူသုံးမယ်

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        nationality: 'Myanmar',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = (e) => {
        e.preventDefault();

        // Validation အနည်းငယ်ထည့်ပါမယ်
        if (formData.fullName && formData.email && formData.password) {
            // Context ထဲက register function ကို လှမ်းခေါ်ပါမယ်
            // register function ထဲမှာ navigate('/') ပါပြီးသားဆိုရင် ဒီမှာ ထပ်ရေးစရာမလိုပါဘူး
            register(formData.fullName, formData.email, formData.password);
        } else {
            alert("Please fill all required fields");
        }
    };

    return (
        <div>
            <Navbar forceDark={true} />
            <div className="min-h-screen w-full flex items-center justify-center bg-[#fcfcfc] p-4 pt-24">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-[1100px] w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row-reverse border border-stone-100"
                >
                    {/* Right Side: Image Content */}
                    <div className="md:w-[45%] relative h-48 md:h-auto">
                        <img
                            src="/public/images/whiteHouse2.jpg"
                            alt="Japan Architecture"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-stone-900/30 backdrop-blur-[1px] flex flex-col p-12 text-white">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                                <Leaf className="text-white" size={28} />
                            </div>
                            <h2 className="text-4xl font-serif italic font-bold leading-tight">Start Your Eco-Adventure.</h2>
                            <p className="mt-4 text-white/80 font-medium">Join 5,000+ travelers exploring Kurashiki sustainably.</p>
                        </div>
                    </div>

                    {/* Left Side: Register Form */}
                    <div className="md:w-[55%] p-8 md:p-16 text-left">
                        <div className="mb-8">
                            <h3 className="text-3xl font-serif font-bold text-stone-800 mb-2">Create Account</h3>
                            <p className="text-stone-400 text-sm font-medium">Please fill in the details to register.</p>
                        </div>

                        <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-green-600 transition-colors" size={16} />
                                    <input name="fullName" required value={formData.fullName} onChange={handleChange} type="text" placeholder="John Doe" className="w-full bg-stone-50 border-none rounded-2xl py-3.5 pl-11 pr-4 text-sm focus:ring-2 focus:ring-green-600/10 transition-all outline-none font-medium" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">Email</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-green-600 transition-colors" size={16} />
                                    <input name="email" required value={formData.email} onChange={handleChange} type="email" placeholder="john@example.com" className="w-full bg-stone-50 border-none rounded-2xl py-3.5 pl-11 pr-4 text-sm focus:ring-2 focus:ring-green-600/10 transition-all outline-none font-medium" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">Phone Number</label>
                                <div className="relative group">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-green-600 transition-colors" size={16} />
                                    <input name="phone" required value={formData.phone} onChange={handleChange} type="tel" placeholder="+95 9..." className="w-full bg-stone-50 border-none rounded-2xl py-3.5 pl-11 pr-4 text-sm focus:ring-2 focus:ring-green-600/10 transition-all outline-none font-medium" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">Nationality</label>
                                <div className="relative group">
                                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-green-600 transition-colors" size={16} />
                                    <select name="nationality" value={formData.nationality} onChange={handleChange} className="w-full bg-stone-50 border-none rounded-2xl py-3.5 pl-11 pr-4 text-sm focus:ring-2 focus:ring-green-600/10 transition-all outline-none appearance-none font-medium cursor-pointer">
                                        <option value="Myanmar">Myanmar</option>
                                        <option value="Japan">Japan</option>
                                        <option value="United States">United States</option>
                                    </select>
                                </div>
                            </div>

                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-green-600 transition-colors" size={16} />
                                    <input name="password" required value={formData.password} onChange={handleChange} type="password" placeholder="Minimum 8 characters" className="w-full bg-stone-50 border-none rounded-2xl py-3.5 pl-11 pr-4 text-sm focus:ring-2 focus:ring-green-600/10 transition-all outline-none font-medium" />
                                </div>
                            </div>

                            <div className="md:col-span-2 mt-4">
                                <button type="submit" className="w-full bg-green-700 text-white py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] shadow-xl shadow-green-700/20 hover:bg-green-800 transition-all active:scale-[0.98]">
                                    Create Account
                                </button>
                            </div>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-stone-400 text-xs font-medium">
                                Already have an account?{' '}
                                <Link to="/login" className="text-stone-900 font-bold hover:underline underline-offset-4">Sign In</Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;