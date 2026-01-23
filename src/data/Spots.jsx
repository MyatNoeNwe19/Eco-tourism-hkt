// src/data/spotsData.js

import { t } from "i18next";

export const spots = [
  { 
    id: 1, 
    image: "/images/whiteHouse6.jpg", 
    titleKey: "spot1.title", 
    descKey: "spot1.desc", 
    tag: "cultural", 
    fee: "Free",
    longDescriptionKey: "spot1.longDesc",
    galleryImages: [
      { src: "/images/whiteHouse5.jpg", altKey: "gallery.canalView" },
      { src: "/images/whiteHouseboat.jpg", altKey: "gallery.traditional" },
      { src: "/images/whiteHouse7.jpg", altKey: "gallery.traditional" },
      { src: "/images/whiteHouse3.jpg", altKey: "gallery.streetView" },
      { src: "/images/whiteHouse12.jpg", altKey: "gallery.streetView" }
    ],
    // JSON ထဲက spot1.highlight key တွေနဲ့ ချိတ်လိုက်တာပါ
    keyHighlightsKeys: ["spot1.highlight1", "spot1.highlight2", "spot1.highlight3"],
    timeToVisitKey: "spot1.hours_weekdays",
    durationKey: "spot1.avgDuration",
    transportDetails: [
      { methodKey: "details.walking", time: "10-15 min", descKey: "spot1.walkDesc" }
    ]
  },
  { 
    id: 2, 
    image: "/images/bigBuilding.jpg", 
    titleKey: "spot2.title", 
    descKey: "spot2.desc", 
    tag: "art", 
    fee: "¥2,000",
    longDescriptionKey: "spot2.longDesc",
    galleryImages: [
      { src: "/images/bigBuilding.jpg", altKey: "gallery.museumFront" },
      { src: "/images/bigBuilding1.jpg", altKey: "gallery.museumFront" }
    ],
    keyHighlightsKeys: ["spot2.highlight1", "spot2.highlight2", "spot2.highlight3"],
    timeToVisitKey: "spot2.hours_weekdays",
    durationKey: "spot2.avgDuration",
    transportDetails: [
      { methodKey: "details.publicBus", time: "15 min", descKey: "spot2.busDesc" }
    ]
  },
  { 
    id: 3, 
    image: "/images/wh.jpg", 
    titleKey: "spot3.title", 
    descKey: "spot3.desc", 
    tag: "cultural", 
    fee: "Free",
    longDescriptionKey: "spot3.longDesc",
    galleryImages: [
      { src: "/images/shop8.jpg", altKey: "gallery.shopView" },
      { src: "/images/whiteHouse1.jpg", altKey: "gallery.shopView" },
      { src: "/images/shop3.jpg", altKey: "gallery.shopView" },
      { src: "/images/shop7.jpg", altKey: "gallery.shopView" },
      { src: "/images/shop4.jpg", altKey: "gallery.shopView" }
    ],
    keyHighlightsKeys: ["spot3.highlight1", "spot3.highlight2", "spot3.highlight3"],
    timeToVisitKey: "spot3.hours_weekdays",
    durationKey: "spot3.avgDuration",
    transportDetails: [
      { methodKey: "details.walking", time: "5 min", descKey: "spot3.walkDesc" }
    ]
  },
  { 
    id: 4, 
    image: "/images/ivynew3.jpg", 
    titleKey: "spot4.title", 
    descKey: "spot4.desc", 
    tag: "life_style", 
    fee: "Free",
    longDescriptionKey: "spot4.longDesc",
    galleryImages: [
      { src: "/images/ivynew1.jpg", altKey: "gallery.mainEntrance" },
      { src: "/images/ivynew2.jpg", altKey: "gallery.InnerView" },
      { src: "/images/ivynew3.jpg", altKey: "gallery.InnerView" }
    ],
    keyHighlightsKeys: ["spot4.highlight1", "spot4.highlight2"],
    timeToVisitKey: "spot4.hours_weekdays",
    durationKey: "spot4.avgDuration",
    transportDetails: [
      { methodKey: "details.walking", time: "15 min", descKey: "spot4.walkDesc" }
    ]
  },
  { 
    id: 5, 
    image: "/images/kojima jeanstreet.jpg", 
    titleKey: "spot5.title", 
    descKey: "spot5.desc", 
    tag: "local_craft", 
    fee: "Free",
    longDescriptionKey: "spot5.longDesc",
    galleryImages: [
      
      { src: "/images/kojima jeanstreet.jpg", altKey: "gallery.denimStreet" },
      { src: "/images/kojima jean.jpg", altKey: "gallery.denimStreet" },
      { src: "/images/jean street.jpg", altKey: "gallery.denimShop" }
    ],
    keyHighlightsKeys: ["spot5.highlight1", "spot5.highlight2", "spot5.highlight3"],
    timeToVisitKey: "spot5.hours_weekdays",
    durationKey: "spot5.avgDuration",
    transportDetails: [
      { methodKey: "details.walking", time: "15 min", descKey: "spot5.walkDesc" }
    ]
  },
  { 
    id: 6, 
    image: "/images/achi shrine.jpg", 
    titleKey: "spot6.title", 
    descKey: "spot6.desc", 
    tag: "top_view", 
    fee: "Free",
    longDescriptionKey: "spot6.longDesc",

    keyHighlightsKeys: ["spot6.highlight1", "spot6.highlight2", "spot6.highlight3"],
    timeToVisitKey: "spot6.hours_weekdays",
    durationKey: "spot6.avgDuration",
    transportDetails: [
      { methodKey: "details.walking", time: "20 min", descKey: "spot6.walkDesc" }
    ]
  }
];