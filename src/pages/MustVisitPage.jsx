import React, { useEffect, useState } from 'react'; // useState ကိုပါ import လုပ်ပါ
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight, Navigation } from 'lucide-react';
import { FaTicketAlt, FaChevronRight, FaLeaf } from 'react-icons/fa';
import Navbar from './NavbarPage';
import FooterPage from './FooterPage';
import { spots } from '../data/Spots';
import experiences from '../data/Experiences';
import { motion, AnimatePresence } from 'framer-motion';

const MustVisitPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter အတွက် state နှစ်ခု (Spots နဲ့ Experiences အတွက်)
  const [activeSpotTab, setActiveSpotTab] = useState('all');
  const [activeExpTab, setActiveExpTab] = useState('all');

  const tabs = [
    { id: 'all', label: t('experience.tabs.all') },
    { id: 'food', label: t('experience.tabs.food') },
    { id: 'eco', label: t('experience.tabs.eco') },
    { id: 'art', label: t('experience.tabs.art') }
  ];

  // Spots ကို filter လုပ်ခြင်း
  const filteredSpots = activeSpotTab === 'all'
    ? spots
    : spots.filter(spot => spot.tag.toLowerCase() === activeSpotTab.toLowerCase());

  // Experiences ကို filter လုပ်ခြင်း
  const filteredExperiences = activeExpTab === 'all'
    ? experiences
    : experiences.filter(exp => exp.category.toLowerCase() === activeExpTab.toLowerCase());

  return (
    <div className="bg-[#fcfdfa] min-h-screen">
      <Navbar forceDark={true} />


      <section className="relative min-h-[95vh] flex items-center justify-center px-6 bg-[#072d07] text-white overflow-hidden">

        {/* Background Layer: ပိုမိုနက်ရှိုင်းပြီး သဘာဝဆန်သော အရောင်များ */}
        <div className="absolute inset-0 z-0">
          {/* အစိမ်းရောင် အလင်းဖျော့လေးများ (Soft Forest Glow) */}
          <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] bg-green-700/15 rounded-full blur-[140px] opacity-60" />
          <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-emerald-700/10 rounded-full blur-[120px] opacity-40" />

          {/* Grainy Texture: Premium ပုံစံရစေရန် */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

          {/* Subtle Vignette: အလယ်ကစာသားကို ပိုပေါ်စေရန် */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a120a]/80" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-20 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="text-emerald-400 font-bold text-[10px] uppercase tracking-[0.5em] px-4 py-1.5 border border-emerald-500/20 bg-emerald-500/5 rounded-full backdrop-blur-sm">
                  {t('mustVisit.hero_sub')}
                </span>
              </div>

              <h1 className="text-6xl md:text-[100px] font-serif italic leading-[0.85] tracking-tighter mb-8 text-stone-100">
                {t('mustVisit.hero_title')}
                <span className="block text-3xl md:text-6xl not-italic font-sans font-extralight text-stone-500 tracking-tight mt-6">
                  {t('mustVisit.hero_title_accent')}
                </span>
              </h1>

              <div className="max-w-md">
                <p className="text-stone-400 text-sm md:text-lg font-light leading-relaxed italic mb-10 border-l-2 border-emerald-800/40 pl-6">
                  {t('mustVisit.hero_desc')}
                </p>

                <motion.button
                  onClick={() => {
                    document.getElementById('spots-section')?.scrollIntoView({
                      behavior: 'smooth'
                    });
                  }}
                  whileHover={{ scale: 1.05 }}
                  className="group relative flex items-center gap-6 bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-full overflow-hidden transition-all shadow-xl"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] z-10 text-stone-200 group-hover:text-white transition-colors">{t('mustVisit.start')}</span>
                  <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform z-10 text-green-500" />
                  <div className="absolute inset-0 bg-green-800 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500" />
                </motion.button>
              </div>
            </motion.div>

            {/* Right: Floating Aesthetic Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative hidden md:block"
            >
              <div className="relative aspect-[4/5] w-[420px] ml-auto rounded-[4rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] border-[1px] border-white/10">
                <img
                  src="./images/whiteHouse19.jpg"
                  alt="Nature Scene"
                  className="w-full h-full object-cover brightness-90 hover:brightness-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a120a]/80 via-transparent to-transparent" />
              </div>

              {/* Minimalist Floating Label */}
              <div className="absolute -bottom-6 -left-12 bg-[#0a120a]/90 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 font-sans">{t('mustVisit.nature')}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* --- THE ORGANIC WAVE (SLOPE) --- */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] translate-y-[2px]">
          <svg
            viewBox="0 0 1440 320"
            className="relative block w-full h-[120px] md:h-[200px]"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#fcfdfa"
              fillOpacity="1"
              d="M0,160L80,176C160,192,320,224,480,213.3C640,203,800,149,960,138.7C1120,128,1280,160,1360,176L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>



      {/* --- SPOTS GRID SECTION (Filter ထည့်သွင်းထားသည်) --- */}
      <section id="spots-section" className="py-16 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col bg-green-800 p-3 rounded-[1rem] md:flex-row justify-between items-center mb-12 gap-6 shadow-xl border border-green-700/50 mt-10">
          <div>
            <h2 className="text-3xl text-stone-100 italic font-serif leading-tight mb-1">
              {t('mustVisit.spots_title')}
            </h2>
            <span className="text-stone-300 font-bold text-[9px] uppercase tracking-[0.3em] block">
              {t('mustVisit.spots_subtitle')}
            </span>
          </div>
          <div>
            <p className="text-sm text-green-100 italic font-serif">🌸 {t('mustVisit.side_title')} 🌸 </p>
          </div>

        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          <AnimatePresence mode='popLayout'>
            {filteredSpots.map((spot, index) => (
              <motion.div
                layout
                key={spot.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -10 }}
                onClick={() => navigate(`/attraction/${spot.id}`)}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group cursor-pointer border border-stone-100"
              >
                <div className="relative aspect-4/3 overflow-hidden">
                  <img src={spot.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={t(spot.titleKey)} />
                  <div className="absolute top-5 left-5">
                    <span className="bg-white/90 backdrop-blur-md text-stone-900 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm">
                      {spot.tag ? t(`common.tabs.${spot.tag}`) : t('common.tabs.heritage')}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-serif italic text-stone-900 group-hover:text-green-800 transition-colors text-xl">
                      {t(spot.titleKey)}
                    </h3>
                    <a href={spot.mapUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 hover:bg-green-100 hover:text-green-700 transition-all">
                      <MapPin size={18} />
                    </a>
                  </div>
                  <p className="text-stone-500 text-sm leading-relaxed mb-3 line-clamp-3 italic font-light">{t(spot.descKey)}</p>
                  <div className="flex items-center gap-6 mb-1 text-[10px] font-bold text-stone-400">
                    <div className="flex items-center gap-2"><FaTicketAlt className="text-green-700" /><span>{spot.fee === "Free" ? t('common.free') : spot.fee}</span></div>
                    <div className="flex items-center gap-2"><Navigation size={14} className="text-green-700" /><span className="uppercase tracking-widest">{t('mustVisit.navigate')}</span></div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.3em] border-t border-stone-50 pt-6 text-stone-300 group-hover:text-green-700 transition-colors">
                    <span>{t('mustVisit.explore_story')}</span><FaChevronRight size={10} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* --- EXPERIENCES SECTION --- */}
      <section id="experiences" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col bg-green-800 p-3 rounded-[1rem] md:flex-row justify-between items-center mb-12 gap-6 shadow-xl border border-green-700/50">
          <div>
            <span className="text-stone-300 font-bold text-[9px] uppercase tracking-[0.3em] block">{t('experience.subtitle')}</span>
            <h2 className="text-3xl font-serif italic text-stone-100 leading-tight">
              {t('experience.title')} <span className="italic text-green-300">{t('experience.greentitle')}</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveExpTab(tab.id)}
                className={`px-5 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest transition-all border ${activeExpTab === tab.id
                  ? 'bg-stone-900 border-stone-900 text-white shadow-lg'
                  : 'bg-transparent border-stone-200/30 text-stone-100 hover:border-white'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence mode='popLayout'>
            {filteredExperiences.slice(0, 40).map((exp) => (
              <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} key={exp.id} whileHover={{ y: -8 }} className="group cursor-pointer" onClick={() => navigate(`/experience/${exp.id}`)}>
                <div className="relative aspect-3/4 md:aspect-4/5 rounded-[2rem] overflow-hidden mb-4 shadow-sm group-hover:shadow-2xl transition-all duration-500">
                  <img src={exp.img} className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" alt={t(exp.titleKey)} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80"></div>
                  <div className="absolute top-5 left-5">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-[7px] font-black uppercase tracking-widest">{t(`common.tags.${exp.category.toLowerCase()}`)}</span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-xl font-serif italic mb-2 leading-tight">{t(exp.titleKey)}</h3>
                    <div className="flex gap-2 opacity-80">
                      {exp.tags.map(tag => (
                        <span key={tag}
                          className="text-[8px] text-green-300 uppercase font-bold tracking-wider"
                        >
                          #{t(`common.tags.${tag.toLowerCase()}`)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end px-4">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2 text-stone-400 group-hover:text-green-700 transition-colors">{t('experience.join_btn')} <FaChevronRight size={8} /></span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <FooterPage />
    </div>
  );
};

export default MustVisitPage;