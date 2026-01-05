import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FaBicycle, FaArrowLeft, FaLeaf, FaRecycle, FaWalking,
  FaRegClock, FaStore, FaHandPaper, FaTrashAlt, FaFacebookF, FaTwitter, FaLink,
  FaMapMarkerAlt, FaStar
} from 'react-icons/fa';
import Navbar from './NavbarPage'
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import experiences from '../data/Experiences';

const ExperienceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const exp = experiences.find(e => e.id.toString() === id.toString());

  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (!exp) return <div className="h-screen flex items-center justify-center text-emerald-800">Experience Undefined</div>;

  const key = exp.titleKey.split('.')[1] || exp.titleKey;
  const activities = t(`${key}.activities`, { returnObjects: true }) || [];
  const practicalInfo = t(`${key}.practical_info`, { returnObjects: true }) || [];

  return (
    <div className="bg-[#fdfbf7] min-h-screen text-[#1a2e26] selection:bg-orange-200 overflow-x-hidden">
      <Navbar />

      <main>
        {/* --- COMPACT TOP NAV --- */}
        <nav className="fixed top-16 left-0 w-full p-6 z-[100] flex justify-between items-center pointer-events-none">
          <button
            onClick={() => navigate(-1)}
            className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-green-600 hover:text-white transition-all duration-300 pointer-events-auto"
          >
            <FaArrowLeft size={14} />
          </button>
          <div className="bg-green-600 text-white px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg flex items-center gap-2 pointer-events-auto">
            <FaStar className="text-yellow-400" /> {t('experience.top')}
          </div>
        </nav>

        {/* --- DYNAMIC HERO SECTION (Adjusted Height) --- */}
        <section className="relative h-[75vh] flex items-end p-8 lg:p-16 overflow-hidden">
          <motion.div
            initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 2 }}
            className="absolute inset-0 z-0"
          >
            <img src={exp.img} className="w-full h-full object-cover" alt="Hero" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e26] via-black/10 to-transparent" />
          </motion.div>

          <div className="relative z-10 w-full max-w-6xl mx-auto">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
              <span className="bg-green-600 text-white px-3 py-1 rounded text-[9px] font-black uppercase mb-3 inline-block tracking-widest">{t('experience_details.subtitle')}</span>
              <h1 className="text-5xl md:text-8xl font-serif text-white leading-none tracking-tighter italic">
                {t(`${key}.name`)}
              </h1>
              <div className="flex items-center gap-2 text-emerald-300 mt-3">
                <FaMapMarkerAlt size={14} />
                <p className="text-base font-medium">{t(`${key}.address`)}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- COMPACT STATS BAR --- */}
        <div className="container mx-auto px-6 -mt-12 relative z-20">
          <div className="bg-white rounded-2xl shadow-xl p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 border-b-4 border-emerald-600">
            {[
              { icon: <FaWalking />, label: 'activity', val: t('experience_details.eco_walk'), color: 'bg-orange-50 text-orange-600' },
              { icon: <FaRecycle />, label: 'policy', val: t('experience_details.zero_waste'), color: 'bg-emerald-50 text-emerald-600' },
              { icon: <FaLeaf />, label: 'nature', val: t('experience_details.protected'), color: 'bg-blue-50 text-blue-600' },
              { icon: <FaRegClock />, label: 'hours', val: t(`${key}.hours`), color: 'bg-purple-50 text-purple-600' }
            ].map((stat, i) => (
              <div key={i} className={`flex flex-col items-center text-center p-2 ${i !== 0 ? 'lg:border-l border-stone-100' : ''}`}>
                <div className={`w-10 h-10 ${stat.color} rounded-full flex items-center justify-center mb-3`}>{stat.icon}</div>
                <p className="text-[9px] font-black uppercase text-stone-400 tracking-tighter">{t(`experience_details.${stat.label}`)}</p>
                <p className="text-sm font-bold">{stat.val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* --- STORY & EXPERIENCE GRID --- */}
        <section className="container mx-auto px-12 py-30 lg:px-30 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h2 className="text-green-700 font-black uppercase tracking-[0.4em] text-xs">{t('experience_details.story')}</h2>
            <p className="text-3xl md:text-4xl font-serif text-stone-800 leading-tight italic">
              {t(`${key}.short_intro`)}
            </p>
            <p className="text-base text-stone-600 leading-relaxed font-light text-justify">
              {t(`${key}.full_desc`)}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-emerald-700 font-black uppercase tracking-[0.4em] text-xs italic">{t('experience_details.top_exp')}</h2>
            <div className="grid gap-4">
              {activities.map((act, i) => (
                <div key={i} className="flex gap-5 p-6 bg-white rounded-xl border-l-4 border-orange-400 shadow-sm group hover:bg-[#fdf2e9] transition-all">
                  <span className="text-3xl font-serif text-orange-200 group-hover:text-orange-500">0{i + 1}</span>
                  <div>
                    <h4 className="text-lg font-bold text-stone-800 mb-1">{act.title}</h4>
                    <p className="text-xs text-stone-500 leading-relaxed">{act.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- COMPACT PRACTICAL TABLE --- */}
        <section className="container mx-auto px-12 lg:px-30 pb-12">
          <div className="bg-[#2d3a35] text-[#d4d9d1] rounded-[2.5rem] p-10 lg:p-16 relative overflow-hidden shadow-2xl">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5">
                <h3 className="text-4xl font-serif italic mb-4">{t('experience_details.respect')}</h3>
                <p className="text-emerald-200/50 text-sm leading-relaxed">{t('experience_details.sub_desc')}</p>
              </div>
              <div className="lg:col-span-7 divide-y divide-emerald-800/30">
                {practicalInfo.map((info, idx) => (
                  <div key={idx} className="py-4 flex justify-between items-center group transition-all">
                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500/40 group-hover:text-emerald-400">{info.label}</span>
                    <span className="text-base font-serif text-emerald-50 tracking-tight">{info.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- ADDED MAP SECTION (NEW) --- */}
        <section className="container mx-auto px-12 lg:px-30 pb-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-green-700"></div>
            <span className="text-green-800 font-black text-[10px] uppercase tracking-[0.4em]">
              {t('experience_details.location_guide') || 'Location Guide'}
            </span>
          </div>

          <div className="bg-white p-3 rounded-[3rem] shadow-xl border border-stone-100 overflow-hidden h-[450px] relative group">
            <iframe
              title="Kurashiki Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.023246830588!2d133.7691515763529!3d34.59089908920405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x355156391d46b737%3A0x673c79f323759a29!2sKurashiki%20Bikan%20Historical%20Quarter!5e0!3m2!1sen!2sjp!4v1710000000000!5m2!1sen!2sjp"
              className="w-full h-full rounded-[2.5rem] grayscale contrast-125 opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 ease-in-out"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Decorative Premium Overlay */}
            <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5 rounded-[3rem]"></div>

            {/* Floating Location Badge */}
            <div className="absolute bottom-10 right-10 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl border border-stone-100 flex items-center gap-3">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-ping"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-stone-800">
                {t('experience_details.district')}
              </span>
            </div>
          </div>
        </section>

        {/* --- MINIMALIST ECO TIPS --- */}
        <section className="bg-white p-12 px-12 lg:px-30 border-y border-stone-100 mb-12">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
              <h3 className="text-2xl font-serif text-green-900 flex items-center gap-3">
                <FaLeaf className="text-green-600" size={18} /> {t('experience_details.guide')}
              </h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-800/40">{t('experience_details.act')}</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { icon: <FaBicycle />, label: 'transit', opt: 'opt' },
                { icon: <FaStore />, label: 'shop', opt: 'choose' },
                { icon: <FaHandPaper />, label: 'beauty', opt: 'admire' },
                { icon: <FaTrashAlt />, label: 'clean', opt: 'leave' }
              ].map((tip, i) => (
                <div key={i} className="px-8 py-12 bg-[#fcfdfa] rounded-2xl border border-green-100 flex flex-col items-center text-center hover:border-green-300 transition-all">
                  <div className="text-emerald-700 mb-5 text-lg">{tip.icon}</div>
                  <h5 className="text-[10px] font-black uppercase mb-2 text-stone-800">{t(`experience_details.${tip.label}`)}</h5>
                  <p className="text-[11px] text-stone-400 leading-tight">{t(`experience_details.${tip.opt}`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- MINIMALIST SHARE & FOOTER --- */}
        <div className="flex flex-col items-center gap-4 py-6">
          <span className="text-[9px] font-black uppercase tracking-widest text-green-300">{t('experience_details.invite')}</span>
          <div className="flex gap-4">
            {[
              { icon: <FaFacebookF size={16} />, color: 'hover:bg-[#1877F2]' },
              { icon: <FaTwitter size={16} />, color: 'hover:bg-[#1DA1F2]' },
              { icon: <FaLink size={16} />, color: 'hover:bg-emerald-800' }
            ].map((social, i) => (
              <button
                key={i}
                className={`w-12 h-12 rounded-full bg-white border border-stone-100 flex items-center justify-center ${social.color} hover:text-white transition-all shadow-sm`}
              >
                {social.icon}
              </button>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-[#1a2e26] py-16 text-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-green-500/40 text-[9px] font-black uppercase tracking-[0.6em]">{t('experience_details.foot')}</p>
          <button
            onClick={() => navigate('/all-experiences')}
            className="text-white font-serif italic text-xl hover:text-green-500 transition-all border-b border-green-500 hover:border-white pb-1"
          >
            {t('experience_details.discover')}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ExperienceDetailPage;