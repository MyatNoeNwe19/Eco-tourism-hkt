import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaTicketAlt, FaChevronLeft, FaBus, FaWalking, FaChevronRight } from 'react-icons/fa';
import { Leaf, MapPin, Clock, Sparkles, X } from 'lucide-react';
import Navbar from './NavbarPage';
import { spots } from '../data/Spots';
import { motion, useScroll, AnimatePresence, useTransform } from 'framer-motion';
import FooterPage from './FooterPage';

const AttractionDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const [selectedImg, setSelectedImg] = useState(null);

  const spotId = parseInt(id);
  const spot = spots.find(s => s.id === spotId);
  const spotKey = `spot${spotId}`;

  // Parallax effect: image ကို အပေါ်သို့ ဖြည်းဖြည်းချင်း ရွေ့စေခြင်း
  const yTransform = useTransform(scrollY, [0, 500], [0, 150]);
  const sliderRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!spot) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-stone-50">
        <p className="text-2xl font-serif italic text-stone-700">{t('common.notFound')}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#fdfcfb] min-h-screen text-stone-900 font-sans selection:bg-green-100 selection:text-green-900">
      <Navbar forceDark={true} />

      <main>
        {/* --- HERO SECTION --- */}
        <section className="relative mb-12 h-[85vh] md:h-[90vh] flex items-end pb-28 overflow-hidden bg-stone-900">
          <motion.img
            style={{ y: yTransform }}
            src={spot.image}
            className="absolute inset-0 w-full h-full object-cover brightness-[0.75] scale-110"
            alt={t(`${spotKey}.title`)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#132413] via-transparent to-black/40"></div>

          <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full">
            <motion.button
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate(-1)}
              className="mb-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/90 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/25 transition-all"
            >
              <FaChevronLeft size={10} /> {t('common.back')}
            </motion.button>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <span className="flex items-center gap-2 text-green-400 font-bold text-xs uppercase tracking-[0.3em] mb-3 italic">
                <Sparkles size={14} /> {spot.tag}
              </span>
              <h1 className="text-5xl md:text-7xl font-serif italic mb-6 leading-tight text-white drop-shadow-2xl">
                {t(`${spotKey}.title`)}
              </h1>
              <p className="text-white/90 leading-relaxed text-lg max-w-xl font-light italic border-l-4 border-green-500 pl-6 bg-black/5 py-2">
                {t(`${spotKey}.desc`)}
              </p>
            </motion.div>
          </div>
        </section>

        {/* --- CONTENT SECTION --- */}
        <section className="relative z-20 -mt-20 pb-24 px-6 max-w-[1300px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-start">

            <div className="lg:col-span-8 order-2 lg:order-1">
              <div className="prose prose-stone max-w-none">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-green-800 font-bold text-[10px] uppercase tracking-[0.4em]">{t('details.journal')}</span>
                  <div className="h-[1px] flex-1 bg-stone-200/60"></div>
                </div>

                <h2 className="text-4xl md:text-5xl font-serif italic text-stone-900 mb-10 leading-[1.2]">
                  {t('details.discovering')} {t(`${spotKey}.title`)}
                </h2>

                <p className="text-stone-600 leading-[2] text-lg md:text-xl font-light whitespace-pre-line first-letter:text-7xl first-letter:font-serif first-letter:float-left first-letter:mr-4 first-letter:mt-2 first-letter:text-green-900 first-letter:leading-none">
                  {t(`${spotKey}.longDesc`)}
                </p>

                {/* --- LOCATION & ACCESS --- */}
                <div className="mt-20 pt-16 border-t border-stone-100">
                  <h3 className="text-2xl font-serif italic mb-8">{t('details.locationAccess')}</h3>

                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="relative group rounded-[32px] overflow-hidden shadow-2xl h-[400px] border border-stone-100 p-2 bg-white">
                      {/* Interactive Google Map Iframe */}
                      <iframe
                        title={`${spotKey} Map`}
                        src={t(`${spotKey}.mapEmbedUrl`)}
                        className="w-full h-full rounded-[28px] grayscale contrast-110 opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 ease-in-out"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />

                      {/* Map Link Floating Button */}
                      <a
                        href={t(`${spotKey}.mapUrl`)}
                        target="_blank" rel="noopener noreferrer"
                        className="absolute bottom-8 left-8 bg-white text-stone-900 px-7 py-3.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl flex items-center gap-3 hover:bg-green-800 hover:text-white transition-all z-10"
                      >
                        <MapPin size={14} /> {t('details.openMaps')}
                      </a>
                    </div>



                    {/* Access Details Steps */}
                    <div className="space-y-7 flex flex-col justify-center">
                      <div className="flex gap-5">
                        <div className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0 shadow-lg">01</div>
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-wider mb-1.5 text-stone-900">{t('details.step1Title')}</h4>
                          <p className="text-stone-500 text-sm leading-relaxed">{t(`${spotKey}.access_step1`)}</p>
                        </div>
                      </div>

                      <div className="flex gap-5">
                        <div className="w-10 h-10 rounded-full bg-green-800 text-white flex items-center justify-center text-[10px] font-bold shrink-0 shadow-lg">02</div>
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-wider mb-1.5 text-stone-900">{t('details.step2Title')}</h4>
                          <p className="text-stone-500 text-sm leading-relaxed">{t(`${spotKey}.access_step2`)}</p>
                        </div>
                      </div>

                      <div className="bg-stone-50/80 p-6 rounded-[2rem] border border-stone-100 italic relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-green-600/20"></div>
                        <p className="text-stone-500 text-[12px] leading-relaxed">
                          <span className="font-bold text-green-800 uppercase text-[9px] block mb-1 not-italic tracking-widest">Traveler's Tip</span>
                          {t('details.walkingTip')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* --- RIGHT SIDE: INFO CARD --- */}
            <aside className="lg:col-span-4 order-1 lg:order-2">
              <div className="sticky top-28 space-y-6">
                <div className="bg-white rounded-[40px] shadow-2xl shadow-stone-200/50 border border-stone-100 overflow-hidden transition-all hover:shadow-emerald-100/50">
                  <div className="bg-[#0c1a0c] p-8 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50 mb-2 block">{t('details.curationNote')}</span>
                    <h3 className="text-2xl font-serif italic text-white leading-tight">{t('details.essentialGuide')}</h3>
                  </div>

                  <div className="p-8 space-y-8">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">{t('details.entryFee')}</span>
                        <p className="text-emerald-800 text-sm font-bold">{t(`${spotKey}.fee`) || t('common.free')}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">{t('details.timeRequired')}</span>
                        <p className="text-stone-800 text-sm font-bold">{t(`${spotKey}.avgDuration`)}</p>
                      </div>
                    </div>

                    <div className="bg-stone-50 p-5 rounded-3xl border border-stone-100">
                      <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-400 mb-4 flex items-center gap-2">
                        <Clock size={12} className="text-emerald-800/40" /> {t('details.openingHours')}
                      </h4>
                      <div className="space-y-3 text-[12px]">
                        <div className="flex justify-between items-center">
                          <span className="text-stone-500 font-medium">{t('details.weekdays')}</span>
                          <span className="text-stone-800 font-bold">{t(`${spotKey}.hours_weekdays`) || "09:00 AM — 05:00 PM"}</span>
                        </div>
                        <div className="flex justify-between items-center text-red-800/80">
                          <span className="font-medium italic">{t('details.saturday')}</span>
                          <span className="font-bold">{t(`${spotKey}.hours_sat`) || t('common.closed')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="h-[1px] bg-stone-100"></div>

                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-900 mb-6 block">{t('details.keyExperience')}</span>
                      <div className="space-y-6">
                        {[1, 2, 3].map((num) => (
                          <div key={num} className="group flex items-start gap-4 cursor-default">
                            <div className="w-5 h-5 rounded-full border border-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-800 group-hover:bg-emerald-800 group-hover:text-white transition-all shrink-0">{num}</div>
                            <p className="text-stone-600 text-[14px] leading-relaxed group-hover:text-stone-950 transition-colors italic">
                              {t(`${spotKey}.highlight${num}`)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-stone-50">
                      <div className="bg-emerald-50/40 p-6 rounded-[24px] border border-emerald-100/30">
                        <div className="flex items-center gap-2 mb-3">
                          <Leaf size={14} className="text-emerald-800" />
                          <span className="text-[9px] font-black uppercase tracking-widest text-emerald-950">{t('details.localWisdom')}</span>
                        </div>
                        <p className="text-stone-600 text-[12px] leading-relaxed italic">
                          "{t(`${spotKey}.wisdomTip`)}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 py-4 bg-emerald-50 rounded-2xl border border-emerald-100/50">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-900">{t('details.openStatus')}</span>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* --- GALLERY --- */}
        <section className="py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-5 mb-12">
              <h2 className="text-4xl font-serif italic text-stone-900 shrink-0">{t('details.galleryTitle')}</h2>
              <div className="h-[1px] bg-stone-100 w-full"></div>
            </div>

            <div className={`grid gap-5 ${spot.galleryImages?.length === 2 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'}`}>
              {spot.galleryImages?.map((img, idx) => (
                <motion.div
                  key={idx}
                  layoutId={`img-${idx}-${spotId}`}
                  whileHover={{ scale: 0.98 }}
                  onClick={() => setSelectedImg({ ...img, idx })}
                  className={`relative rounded-3xl overflow-hidden group shadow-sm cursor-zoom-in 
                    ${spot.galleryImages.length > 2 && idx === 0 ? 'md:col-span-2 md:row-span-2' : 'aspect-square md:aspect-auto'}`}
                >
                  <img src={img.src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={`Gallery ${idx}`} />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all flex items-end p-6">
                    <p className="text-white font-serif italic text-sm drop-shadow-md">
                      {img.altKey ? t(`gallery.${img.altKey.split('.').pop()}`) : "View Image"}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {selectedImg && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedImg(null)}
                className="fixed inset-0 z-[100] bg-[#0c1a0c]/95 backdrop-blur-xl flex items-center justify-center p-6 cursor-pointer"
              >
                <button className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors p-3 bg-white/5 rounded-full" onClick={() => setSelectedImg(null)}><X size={24} /></button>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                  className="relative max-w-5xl w-full flex flex-col items-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img src={selectedImg.src} className="max-h-[80vh] w-auto object-contain rounded-2xl shadow-2xl" alt="Expanded" />
                  {selectedImg.altKey && (
                    <p className="text-white/80 font-serif italic mt-6 text-xl tracking-wide">{t(`gallery.${selectedImg.altKey.split('.').pop()}`)}</p>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* --- TRANSPORT SECTION --- */}
        <section className="py-24 px-6 bg-[#faf9f6] border-y border-stone-100 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-[500px] h-[500px] bg-emerald-50/50 rounded-full blur-[100px] pointer-events-none" />
          <div className="max-w-[1200px] mx-auto relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-4 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-[2px] bg-emerald-800/30" />
                  <span className="text-emerald-900 font-bold tracking-[0.4em] uppercase text-[10px]">{t('details.transport')}</span>
                </div>
                <h2 className="text-4xl font-serif italic text-stone-900 leading-tight">{t('details.gettingThere')}</h2>
                <p className="text-stone-500 text-base leading-relaxed font-light italic max-w-sm">{t('details.transportSubtitle')}</p>
              </div>

              <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
                {[
                  { icon: FaBus, title: t('details.publicBus'), desc: t(`${spotKey}.busDesc`), time: t('details.busTime'), timeIcon: Clock },
                  { icon: FaWalking, title: t('details.walking'), desc: t(`${spotKey}.walkDesc`), time: t('details.walkTime'), timeIcon: MapPin }
                ].map((item, i) => (
                  <motion.div key={i} whileHover={{ y: -8 }} className="group p-8 bg-white rounded-[32px] shadow-sm border border-stone-100/80 transition-all hover:shadow-2xl hover:shadow-emerald-900/5">
                    <div className="flex items-center gap-5 mb-6">
                      <div className="w-14 h-14 bg-stone-50 rounded-2xl flex items-center justify-center text-emerald-900 group-hover:bg-emerald-900 group-hover:text-white transition-all"><item.icon size={22} /></div>
                      <h3 className="text-[12px] font-black uppercase tracking-widest text-stone-400 group-hover:text-emerald-900">{item.title}</h3>
                    </div>
                    <p className="text-stone-600 text-[15px] leading-relaxed italic mb-6">{item.desc}</p>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-stone-400 uppercase tracking-tight"><item.timeIcon size={14} /> {item.time}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- CONTINUE JOURNEY --- */}
        <section className="py-24 px-6 overflow-hidden bg-white">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col mb-16 relative">
              <div className="flex items-center gap-4 mb-4">
                <span className="w-12 h-[2px] bg-emerald-800"></span>
                <span className="text-emerald-800 font-bold text-[10px] uppercase tracking-[0.4em]">{t('details.curatedSelection')}</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <h2 className="text-4xl font-serif italic text-stone-900 leading-tight">{t('details.continueJourney')}</h2>
                  <p className="text-stone-500 text-lg mt-3 font-light italic">{t('details.continueJourneySubtitle')}</p>
                </div>
                <div className="hidden md:block border-l-2 border-stone-100 pl-8">
                  <span className="text-[10px] font-black uppercase tracking-widest text-stone-300 block mb-2">{t('details.nextStops')}</span>
                  <span className="text-2xl font-serif italic text-stone-950">{spots.length} {t('details.attractionsCount')}</span>
                </div>
              </div>
            </div>

            <div className="relative group/slider">
              <button
                onClick={() => sliderRef.current.scrollBy({ left: -400, behavior: 'smooth' })}
                className="absolute -left-5 md:-left-8 top-[40%] -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-2xl flex items-center justify-center text-stone-600 hover:bg-emerald-900 hover:text-white transition-all opacity-0 group-hover/slider:opacity-100"
              >
                <FaChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => sliderRef.current.scrollBy({ left: 400, behavior: 'smooth' })}
                className="absolute -right-5 md:-right-8 top-[40%] -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-2xl flex items-center justify-center text-stone-600 hover:bg-emerald-900 hover:text-white transition-all opacity-0 group-hover/slider:opacity-100"
              >
                <FaChevronRight className="w-4 h-4" />
              </button>

              <div
                ref={sliderRef}
                className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {spots.map((s) => (
                  <motion.div
                    key={s.id}
                    whileHover={{ y: -10 }}
                    onClick={() => navigate(`/attraction/${s.id}`)}
                    className="min-w-[300px] md:min-w-[400px] snap-center cursor-pointer group"
                  >
                    <div className="bg-white rounded-[32px] overflow-hidden border border-stone-100 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-900/10">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img src={s.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={t(s.titleKey)} />
                        <div className="absolute top-5 left-5">
                          <span className="bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm">{s.tag}</span>
                        </div>
                      </div>
                      <div className="p-7">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-serif italic text-stone-900 group-hover:text-emerald-900 transition-colors uppercase tracking-tight leading-tight">{t(s.titleKey)}</h3>
                          <MapPin size={16} className="text-emerald-800/30 mt-1" />
                        </div>
                        <p className="text-stone-400 text-[12px] leading-relaxed mb-6 line-clamp-2 italic">{t(s.descKey)}</p>
                        <div className="flex items-center justify-between pt-5 border-t border-stone-50">
                          <div className="flex items-center gap-5">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-stone-500"><FaTicketAlt className="text-emerald-800/50" /> <span>{s.fee || t('common.free')}</span></div>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-stone-500"><Clock size={12} className="text-emerald-800/50" /> <span>{t(`spot${s.id}.avgDuration`) || "1h"}</span></div>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center text-emerald-900 group-hover:bg-emerald-900 group-hover:text-white transition-all"><FaChevronRight size={10} /></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterPage />
    </div>
  );
};

export default AttractionDetailsPage;