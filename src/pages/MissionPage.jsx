import React from 'react';
import { ShieldCheck, Globe, Heart, Leaf, ArrowRight, Compass } from 'lucide-react';
import Navbar from './NavbarPage';
import { useNavigate } from 'react-router-dom';
import FooterPage from './FooterPage';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const MissionPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  // Team data keys for translation
  const teamMembers = [
    { key: "kenji", img: "./images/mission2.jpg" },
    { key: "aoi", img: "./images/mosan.jpg" },
    { key: "hiroshi", img: "./images/milon.jpg" },
    { key: "yuki", img: "./images/noesan.jpg" },
    { key: "yuki", img: "./images/mission1.jpg" }
  ];

  return (
    <div className="bg-[#fcfdfa] min-h-screen text-stone-900 font-sans selection:bg-green-100">
      <Navbar forceDark="true" />

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="./images/summer1.jpg" className="w-full h-full object-cover" alt="Kurashiki Canal" />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/5 -z-10 pointer-events-none">
              <Leaf size={450} strokeWidth={0.5} />
            </div>

            <span className="text-green-400 font-serif italic text-sm md:text-lg mt-4 mb-6 block tracking-wide">
              {t('mission.hero_sub')}
            </span>

            <h1 className="text-white text-7xl md:text-[110px] font-serif leading-[0.8] mb-8 tracking-tighter">
              {t('mission.hero_title_1')} <br />
              <span className="italic font-light">{t('mission.hero_title_2')}</span>{" "}
              <span className="text-green-500 italic">{t('mission.hero_title_3')}</span>
            </h1>

            <p className="text-white/80 font-sans font-bold text-sm md:text-xl tracking-[0.3em] uppercase mb-5">
              {t('mission.hero_tracking')}
            </p>

            <div className="max-w-2xl mx-auto">
              <p className="text-white/90 text-base md:text-xl font-light leading-relaxed mb-12">
                {t('mission.hero_desc_1')}{" "}
                <span className="text-green-400 font-medium">{t('mission.hero_desc_highlight_1')}</span>{" "}
                {t('mission.hero_desc_2')}{" "}
                <span className="underline decoration-green-500/50 underline-offset-4">{t('mission.hero_desc_highlight_2')}</span>{" "}
                {t('mission.hero_desc_3')}
              </p>
            </div>

            <div className="flex flex-col items-center gap-6">
              <motion.button
                onClick={() => navigate('/must-visit')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 text-green-950 px-10 py-4 rounded-full font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-2 shadow-2xl hover:bg-green-400 transition-all"
              >
                {t('mission.cta_button')} <Compass size={18} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- THE PROMISE --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div {...fadeInUp}>
            <span className="text-green-700 font-bold text-[10px] uppercase tracking-[0.4em] mb-3 block decoration-green-300 underline underline-offset-8">
              {t('mission.vision_label')}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif italic mb-6">
              {t('mission.vision_title_1')} <span className='text-green-800 font-semibold'>{t('mission.vision_title_highlight')}</span>.
            </h2>
            <div className="space-y-5 text-stone-500 text-base md:text-lg leading-relaxed">
              <p>{t('mission.vision_p1_part1')} <span className='text-green-800 font-semibold'>{t('mission.brand_name')}</span>{t('mission.vision_p1_part2')}</p>
              <p>{t('mission.vision_p2_part1')} <span className='text-green-800 font-semibold'>{t('mission.location_name')}</span>{t('mission.vision_p2_part2')}</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {[
              { icon: <ShieldCheck size={20} />, key: "heritage", color: "bg-orange-100/70" },
              { icon: <Globe size={20} />, key: "eco", color: "bg-blue-100/70" },
              { icon: <Heart size={20} />, key: "community", color: "bg-red-100/70" },
              { icon: <Leaf size={20} />, key: "waste", color: "bg-green-100/70" }
            ].map((item, i) => (
              <div key={i} className={`${item.color} p-6 rounded-[24px] border border-white/50 flex flex-col items-center text-center gap-3 shadow-sm hover:shadow-md transition-all`}>
                <div className="text-stone-800">{item.icon}</div>
                <h4 className="font-bold text-[10px] uppercase tracking-widest">{t(`mission.pill_${item.key}`)}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- THE TEAM --- */}
      <section className="bg-stone-950 py-24 rounded-[3.5rem] mx-4 md:mx-10 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-green-900/10 blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <div className="mb-16">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-green-500 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">
              {t('mission.team_label')}
            </motion.span>
            <h2 className="text-white text-4xl md:text-5xl font-serif italic mb-4">{t('mission.team_title')}</h2>
            <div className="h-px w-20 bg-stone-700 mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
            {teamMembers.map((member, i) => (
              <motion.div key={i} {...fadeInUp} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center group text-center">
                <div className="relative w-32 h-32 md:w-40 md:h-40 mb-6">
                  <motion.div whileHover={{ scale: 1.08 }} className="w-full h-full rounded-full overflow-hidden border-2 border-stone-800 p-1 group-hover:border-green-500/50 transition-all duration-500">
                    <img src={member.img} className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110" alt={t(`mission.team_${member.key}_name`)} />
                  </motion.div>
                  <div className="absolute inset-0 rounded-full bg-green-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </div>
                <motion.div whileHover={{ y: -2 }}>
                  <h5 className="text-white text-lg font-bold mb-1 group-hover:text-green-200 transition-colors">
                    {t(`mission.team_${member.key}_name`)}
                  </h5>
                  <p className="text-[10px] text-stone-500 uppercase tracking-[0.2em] font-medium leading-relaxed">
                    {t(`mission.team_${member.key}_role`)}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ACTION: WISE TRAVELER --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 border-l-2 border-stone-100 pl-8 flex flex-col justify-center">
            <h2 className="text-3xl font-serif italic mb-4">{t('mission.tips_title')}</h2>
            <p className="text-stone-400 leading-relaxed">{t('mission.tips_subtitle')}</p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex gap-4 items-start p-5 rounded-2xl bg-stone-50 hover:bg-white border border-transparent hover:border-green-100 transition-all group">
                <div className="text-xl font-bold text-green-800 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm">0{num}</div>
                <div>
                  <h6 className="font-bold text-[15px] mb-1">{t(`mission.tip_${num}_title`)}</h6>
                  <p className="text-[13px] text-stone-500 leading-relaxed">{t(`mission.tip_${num}_desc`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterPage />
    </div>
  );
};

export default MissionPage;