import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Mail, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext'; 
import Navbar from './NavbarPage';
import { useTranslation } from 'react-i18next'; // ဒီမှာ import လုပ်ပါ

const Login = () => {
  const { t } = useTranslation(); // t function ကို ဒီမှာ declare လုပ်ပါ
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() && password) {
      login(email, password);
    } else {
      alert(t('login.alert_fill_fields') || "Please enter both email and password");
    }
  };

  return (
    <div>
      <Navbar forceDark={true} />
      <div className="min-h-screen pt-20 w-full flex items-center justify-center bg-[#fcfcfc] p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-[1000px] w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-stone-100"
        >
          {/* Left Side: Branding */}
          <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
            <img
              src="/images/evening light.jpg"
              alt="Nature"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-green-900/40 backdrop-blur-[2px] flex flex-col justify-end p-12 text-white">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                <Leaf className="text-white" size={28} />
              </div>
              {/* ဘာသာပြန် Key များကို ဤနေရာတွင် သုံးထားသည် */}
              <h2 className="text-4xl font-serif italic font-bold mb-4 leading-tight">
                {t('login.title')}
              </h2>
              <p className="text-white/80 text-sm font-medium tracking-wide">
                {t('login.subtitle')}
              </p>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
            <div className="mb-10">
              <h3 className="text-3xl font-serif font-bold text-stone-800 mb-2">
                {t('login.signin_title')}
              </h3>
              <p className="text-stone-400 text-sm font-medium">
                {t('login.signin_subtitle')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-stone-400 ml-1">
                  {t('login.email_label')}
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-green-600 transition-colors" size={18} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-stone-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-green-600/10 transition-all outline-none font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] font-black uppercase tracking-widest text-stone-400 ml-1">
                    {t('login.password_label')}
                  </label>
                  <button type="button" className="text-[10px] font-bold text-green-700 hover:underline">
                    {t('login.forgot_password')}
                  </button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-green-600 transition-colors" size={18} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-stone-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-green-600/10 transition-all outline-none font-medium"
                  />
                </div>
              </div>

              <button type="submit" className="w-full bg-stone-900 text-white py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] shadow-xl shadow-stone-900/20 hover:bg-green-700 transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                {t('login.signin_button')} <ArrowRight size={16} />
              </button>
            </form>

            <div className="mt-12 pt-8 border-t border-stone-50 text-center">
              <p className="text-stone-400 text-sm">
                {t('login.no_account')}{' '}
                <Link to="/register" className="text-green-700 font-bold hover:underline underline-offset-4">
                  {t('login.create_account')}
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;