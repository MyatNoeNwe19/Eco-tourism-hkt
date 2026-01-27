import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaChevronRight, FaArrowLeft, FaFilter, FaHeart } from 'react-icons/fa'; // FaHeart ထည့်လိုက်ပါပြီ
import experiences from '../data/Experiences';
import Navbar from './NavbarPage';
import FooterPage from './FooterPage';

const SeeMoreExperience = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { search } = useLocation();
  const [activeTab, setActiveTab] = useState('all');
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    // LocalStorage ကနေ wishlist data ဖတ်မယ်
    const savedWishlist = JSON.parse(localStorage.getItem('user_wishlist') || '[]');
    setWishlist(savedWishlist);
  }, []);

  const toggleWishlist = (e, exp) => {
    e.stopPropagation();
    let updatedWishlist = JSON.parse(localStorage.getItem('user_wishlist') || '[]');
    const isExist = updatedWishlist.find(item => item.id === exp.id);

    if (isExist) {
      updatedWishlist = updatedWishlist.filter(item => item.id !== exp.id);
    } else {
      updatedWishlist.push({
        id: exp.id,
        title: exp.titleKey,
        image: exp.img,
        type: 'experience', // ဒီမှာ type သတ်မှတ်ပေးပါ
        category: exp.category
      });
    }
    setWishlist(updatedWishlist);
    localStorage.setItem('user_wishlist', JSON.stringify(updatedWishlist));
  };

  const tabs = [
    { id: 'all', label: t('experience.tabs.all') || 'All' },
    { id: 'heritage', label: t('experience.tabs.heritage') || 'Heritage' },
    { id: 'art', label: t('experience.tabs.art') || 'Craft & Art' },
    { id: 'food', label: t('experience.tabs.food') || 'Food' }
  ];

  const queryParams = new URLSearchParams(search);
  const searchTerm = queryParams.get('search')?.toLowerCase() || "";

  const filtered = experiences.filter(exp => {
    const matchesTab = activeTab === 'all' || exp.category?.toLowerCase() === activeTab.toLowerCase();

    const lowerSearch = searchTerm.toLowerCase().trim();

    if (lowerSearch === "") return matchesTab;

    const translatedTitle = String(t(exp.titleKey) || "").toLowerCase();

    const matchesTags = exp.tags && exp.tags.some(tag => {
      const translatedTag = String(t(`tags.${tag}`) || "").toLowerCase();
      return translatedTag.includes(lowerSearch) || lowerSearch.includes(translatedTag);
    });

    const matchesSearch = translatedTitle.includes(lowerSearch) || matchesTags;

    return matchesTab && matchesSearch;
  });

  return (
    <div className="bg-[#fcfdfa] min-h-screen font-sans">
      <Navbar forceDark='true' />

      <section className="pt-24 pb-8 px-6 bg-stone-50 border-b border-stone-100">
        <div className="max-w-[1200px] mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 hover:text-green-700 transition-colors mb-4"
          >
            <FaArrowLeft size={10} /> {t('common.back')}
          </button>

          <h1 className="text-3xl md:text-4xl font-serif italic text-stone-900 mb-2">
            {t('experience.subtitle')} <span className="text-green-700 text-5xl">{t('experience.title')}</span>
          </h1>
          <p className="text-stone-500 max-w-2xl italic leading-tight text-xs md:text-sm">
            {t('experience.description')}
          </p>
        </div>
      </section>

      <section className="sticky top-16 z-30 bg-white/80 backdrop-blur-md border-b border-stone-100 py-2 px-6">
        <div className="max-w-[1200px] mx-auto flex items-center gap-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 text-stone-400 shrink-0">
            <FaFilter size={10} />
            <span className="text-[9px] font-black uppercase tracking-widest">{t('experience.filter_label')}</span>
          </div>
          <div className="flex gap-1.5">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id
                  ? 'bg-green-800 text-white shadow-md'
                  : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 px-6 max-w-[1200px] mx-auto">
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((exp) => {
              // card တစ်ခုချင်းစီအတွက် like လုပ်ထားသလား စစ်တဲ့ logic
              const isLiked = wishlist.some(item => item.id === exp.id);

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  key={exp.id}
                  onClick={() => navigate(`/experience/${exp.id}`)}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[4/5] rounded-[20px] overflow-hidden mb-2 shadow-sm group-hover:shadow-lg transition-all duration-500">
                    <img
                      src={exp.img}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      alt={t(exp.titleKey)}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

                    {/* Heart Button */}
                    <button
                      onClick={(e) => toggleWishlist(e, exp)}
                      className="absolute top-3 right-3 z-20 p-2 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-90 shadow-lg"
                      style={{
                        backgroundColor: isLiked ? '#15803d' : 'rgba(255, 255, 255, 0.3)',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      <FaHeart
                        size={10}
                        className={`transition-colors duration-300 ${isLiked ? 'text-white' : 'text-white/80'}`}
                      />
                    </button>

                    <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                      <h2 className="text-white text-lg md:text-xl font-serif italic leading-tight 
                                    opacity-0 group-hover:opacity-100 
                                    transform translate-y-4 group-hover:translate-y-0 
                                    transition-all duration-500 ease-out z-10 
                                    drop-shadow-md">
                        {t(`${exp.titleKey.replace('experience.', '')}.name`)}
                      </h2>
                    </div>

                    <div className="absolute top-3 left-3">
                      <span className="bg-green-800/80 backdrop-blur-md text-white border border-white/10 px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest">
                        {exp.category ? t(`common.tabs.${exp.category.toLowerCase()}`) : ""}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white group-hover:opacity-0 transition-opacity duration-300">
                      <div className="flex flex-wrap gap-1">
                        {exp.tags.map(tag => (
                          <span key={tag} className="text-[6px] text-green-300 font-bold uppercase tracking-wider">
                            #{t(`common.tags.${tag.toLowerCase()}`)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center px-1">
                    <span className="text-[8px] font-bold text-stone-400 group-hover:text-green-700 transition-colors uppercase tracking-[0.1em]">
                      {t('experience.explore_more')}
                    </span>
                    <div className="w-6 h-6 rounded-full border border-stone-100 flex items-center justify-center group-hover:bg-green-800 group-hover:text-white transition-all">
                      <FaChevronRight size={6} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-stone-400 font-serif italic text-sm">
            {t('experience.no_results')}
          </div>
        )}
      </section>

      <FooterPage />
    </div>
  );
};

export default SeeMoreExperience;