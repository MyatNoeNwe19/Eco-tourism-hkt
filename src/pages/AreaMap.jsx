import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCompass, FaSearch, FaGlobe, FaLocationArrow } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import Navbar from './NavbarPage';
import FooterPage from './FooterPage';

const AreaMapPage = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSatellite, setIsSatellite] = useState(false);

  // 'map' အစား 'explorer' ကို သုံးထားပါတယ်
  const locations = t('explorer.locations', { returnObjects: true }) || [];

  const [selectedLoc, setSelectedLoc] = useState(locations[0] || {});

  const activePlaceName = searchQuery.length > 2 ? searchQuery : (selectedLoc?.name || "");

  const filteredLocations = locations.filter(loc =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenInGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activePlaceName)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar forceDark="true" />
      <div className="h-screen my-20 w-full flex bg-[#F5F5F7] overflow-hidden font-sans">

        {/* SIDEBAR */}
        <aside className="w-[380px] h-full bg-white shadow-2xl z-20 flex flex-col border-r border-stone-200">
          <div className="p-8 space-y-6">
            <div className="flex items-center gap-2 text-green-700">
              <FaCompass className="text-xl" />
              <span className="font-bold tracking-widest text-[10px] uppercase">{t('explorer.nav_label')}</span>
            </div>
            <h1 className="text-4xl font-serif text-stone-900 leading-tight">
              {t('explorer.title_main')} <span className="italic text-stone-400 font-light underline decoration-stone-200 underline-offset-8">{t('explorer.title_sub')}</span>
            </h1>

            <div className="relative group">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 transition-colors group-focus-within:text-green-600" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('explorer.search_placeholder')}
                className="w-full bg-stone-50 border border-stone-100 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-green-700/10 transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Scrollable List Container */}
          <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3 custom-scrollbar">
            {filteredLocations.map((loc) => (
              <button key={loc.id} onClick={() => { setSelectedLoc(loc); setSearchQuery(""); }}
                className={`w-full text-left p-5 rounded-[2.5rem] transition-all duration-500 flex gap-5 border ${selectedLoc.id === loc.id && searchQuery === ""
                    ? 'bg-green-50/50 border-green-200 shadow-sm scale-[1.02]'
                    : 'bg-white border-transparent hover:bg-green-200'
                  }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-3xl border border-stone-100">{loc.icon}</div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-bold text-stone-900 text-sm leading-tight">{loc.name}</h3>
                  <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-1 font-semibold">{loc.type}</p>
                </div>
              </button>
            ))}
            {searchQuery !== "" && filteredLocations.length === 0 && (
              <div className="p-8 text-center bg-stone-50 rounded-3xl border-2 border-dashed border-stone-100">
                <p className="text-xs text-stone-400 italic">{t('explorer.no_result')} <br /><strong>"{searchQuery}"</strong></p>
              </div>
            )}
          </div>

          <div className="p-6 bg-stone-50 border-t border-stone-100">
            <button
              onClick={handleOpenInGoogleMaps}
              className="w-full bg-stone-900 text-white rounded-3xl py-5 font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 active:scale-95 shadow-xl hover:bg-green-800 transition-all"
            >
              <FaLocationArrow className="text-[10px]" /> {t('explorer.cta_directions')}
            </button>
          </div>
        </aside>

        {/* MAIN MAP AREA */}
        <main className="flex-1 relative">
          <div className="absolute top-8 right-8 z-10 flex gap-4">
            <button onClick={() => setIsSatellite(!isSatellite)}
              className="px-6 py-3 rounded-2xl flex items-center gap-3 shadow-2xl border transition-all duration-500 backdrop-blur-xl bg-white/90 text-stone-800 border-white/40 hover:bg-white"
            >
              <FaGlobe className={isSatellite ? 'animate-spin-slow text-green-700' : 'text-stone-400'} />
              <span className="text-[11px] font-black uppercase tracking-widest">
                {isSatellite ? t('explorer.satellite_view') : t('explorer.map_view')}
              </span>
            </button>
          </div>

          <div className="w-full h-full bg-stone-100">
            <AnimatePresence mode="wait">
              <motion.iframe
                key={activePlaceName + isSatellite}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(activePlaceName)}&t=${isSatellite ? 'k' : 'm'}&z=15&output=embed`}
                className="w-full h-full border-none"
                allowFullScreen="" loading="lazy"
              />
            </AnimatePresence>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-stone-900/95 backdrop-blur-2xl px-10 py-5 rounded-full border border-white/10 flex items-center gap-8 shadow-3xl text-white min-w-max">
            <div className="flex items-center gap-4 border-r border-white/10 pr-8">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_20px_#ef4444] animate-pulse"></div>
              <span className="text-[11px] font-black uppercase tracking-[0.2em]">{t('explorer.live_marker')}</span>
            </div>
            <div className="flex flex-col overflow-hidden max-w-[300px]">
              <span className="text-[9px] text-stone-500 uppercase font-bold tracking-widest leading-none mb-1">{t('explorer.target_label')}</span>
              <p className="text-sm font-serif italic truncate pt-1">{activePlaceName}</p>
            </div>
          </div>
        </main>
      </div>
      <FooterPage />
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #15803d; border-radius: 20px; }
      `}} />
    </div>
  );
};

export default AreaMapPage;