import React from 'react';
import { useTranslation } from 'react-i18next';
import { Leaf, Mail, Globe2, Clock, ShieldCheck } from 'lucide-react';
import { FaInstagram, FaFacebook, FaTwitter, FaArrowRight } from 'react-icons/fa';

const FooterPage = () => {
  const { t } = useTranslation();

  const quickLinks = [
    { key: 'home', text: t('navbar.home') || 'Home', href: '/home' },
    { key: 'area', text: t('navbar.area') || 'Area', href: '/area' },
    { key: 'trip_planner', text: t('navbar.trip_planner') || 'Trip Planner', href: '/trip-planner' },
    { key: 'must_visit', text: t('navbar.must_visit') || 'Must Visit', href: '/must-visit' },
    { key: 'travel_journal', text: t('navbar.travel_journal') || 'Travel Journal', href: '/‌all-experiences' },
  ];

  return (
    // Footer bottom padding ကို py-20 md:py-24 ကနေ pb-8 md:pb-10 လို့ လျှော့ချလိုက်ပါတယ်
    <footer className="bg-[#0b0d0b] pt-20 md:pt-24 pb-8 md:pb-10 px-6 md:px-16 text-white overflow-hidden relative border-t border-white/[0.05]">
      {/* Decorative Glows */}
      <div className="absolute -top-24 -right-24 opacity-10 text-green-500 rotate-12 pointer-events-none blur-2xl">
        <Leaf size={500} />
      </div>
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-green-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-12 items-start border-b border-white/[0.08] pb-16">

          {/* Column 1: Brand & Desc */}
          <div className="md:col-span-5 space-y-8">
            <div className="flex items-center gap-4 group cursor-pointer w-fit">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-800 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-green-950/40 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Leaf size={28} />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-serif font-black tracking-tighter uppercase leading-none">
                  KURASHIKI<span className="text-green-500 italic font-light">.eco</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-bold mt-1">Sustainable Tourism</span>
              </div>
            </div>

            <h2 className="text-3xl font-serif italic leading-tight max-w-md text-stone-100">
              {t('footer.title')} <br />
              <span className="text-green-500">{t('footer.greentitle')}</span> {t('footer.subtitle')}
            </h2>
            <p className="text-stone-400 text-lg leading-relaxed max-w-sm font-light italic">
              " {t('footer.desc') || 'Exploring the beauty of Kurashiki with a sustainable touch.'} "
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="md:col-span-3">
            <div className="flex items-center gap-2 mb-10">
              <div className="w-1 h-4 bg-green-500 rounded-full"></div>
              <span className="text-green-500 font-black text-[11px] uppercase tracking-[0.4em] opacity-90">
                {t('footer.navigation_label') || 'Navigation'}
              </span>
            </div>
            <nav className="flex flex-col gap-1">
              {quickLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  className="group flex items-center justify-between py-3 px-2 rounded-xl hover:bg-white/[0.03] transition-all duration-300"
                >
                  <span className="text-lg font-serif italic text-stone-400 group-hover:text-green-400 transition-colors">
                    {link.text}
                  </span>
                  <FaArrowRight className="text-[10px] text-green-500 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact & Service Info */}
          <div className="md:col-span-4 md:text-right flex flex-col md:items-end">
            <div className="flex items-center md:justify-end gap-2 mb-10">
              <span className="text-green-500 font-black text-[11px] uppercase tracking-[0.4em] opacity-90">
                {t('footer.contact_label')}
              </span>
              <div className="w-1 h-4 bg-green-50 rounded-full"></div>
            </div>

            <div className="space-y-6">
              <a
                href={`mailto:${t('footer.email')}`}
                className="flex items-center md:justify-end gap-3 text-2xl font-serif italic text-stone-200 hover:text-green-400 transition-all duration-500 group"
              >
                <span className="border-b border-stone-800 group-hover:border-green-500 pb-1 transition-all">
                  {t('footer.email')}
                </span>
                <Mail size={20} className="text-green-600" />
              </a>

              <div className="flex items-center md:justify-end gap-3 text-stone-400">
                <div className="text-right">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-stone-500 leading-none mb-1">
                    {t('footer.hours_label')}
                  </p>
                  <p className="text-sm italic leading-none">{t('footer.hours_value')}</p>
                </div>
                <Clock size={18} className="text-green-600" />
              </div>

              <div className="flex items-center md:justify-end gap-3 text-stone-500 text-sm italic font-light">
                <span>{t('footer.location')}</span>
                <Globe2 size={16} />
              </div>
            </div>

            {/* Social Icons - Logic remains same */}
            <div className="flex gap-4 mt-12">
              {[FaInstagram, FaFacebook, FaTwitter].map((Icon, idx) => (
                <a
                  key={idx} href="#"
                  className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-stone-400 hover:text-green-500 hover:border-green-500/50 transition-all duration-500 group"
                >
                  <Icon size={20} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>


        </div>
        {/* Trust Badges Section */}
        <div className="pt-8 flex border-b border-white/[0.05] flex flex-wrap justify-center md:justify-start gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          <div className="flex items-center gap-3">
            <ShieldCheck size={24} className="text-green-500" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{t('footer.badges.eco_tourism')}</span>
          </div>
          <div className="flex items-center gap-3">
            <Leaf size={24} className="text-green-500" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{t('footer.badges.sustainable_partner')}</span>
          </div>
          <div className="flex items-center gap-3">
            <Globe2 size={24} className="text-green-500" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{t('footer.badges.zero_waste')}</span>
          </div>
        </div>
        {/* Legal & Copyright - Padding bottom is very short here */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-3 gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-600">
          <div className="flex gap-10">
            <a href="#" className="hover:text-green-500 transition-colors relative group">
              {t('footer.privacy') || 'Privacy Policy'}
              <span className="absolute left-0 w-0 h-px bg-green-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#" className="hover:text-green-500 transition-colors relative group">
              {t('footer.cookie') || 'Cookie Policy'}
              <span className="absolute left-0 w-0 h-px bg-green-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-green-800"></div>
            <p className="tracking-[0.3em]">
              {t('footer.copyright') || '© 2025 Kurashiki Eco-Tourism'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterPage;