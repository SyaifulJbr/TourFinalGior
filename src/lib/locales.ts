'use client';
import { useState, useCallback, useEffect } from 'react';

const translations = {
  en: {
    home: 'Home',
    about: 'About',
    contact: 'Contact',
    bookNow: 'Book Now',
    yourPersonalDriver: 'Your Personal Driver Awaits',
    yourPersonalDriverDesc: 'Book a private car with a professional driver. Seamless travel, fixed rates, and premium comfort.',
    contactUs: 'Contact Us',
    aboutUs: 'About Us',
    aboutUsDesc: 'We provide professional car rental services with experienced drivers in Bali. Your comfort and safety is our priority. We offer a wide range of vehicles to suit your needs, from city tours to airport transfers.',
    allRightsReserved: 'All rights reserved.',
    availableCars: 'Available Cars',
    // Car details
    sedan: 'Sedan',
    suv: 'SUV',
    van: 'Van',
    luxury: 'Luxury',
    gps: 'GPS',
    childSeat: 'Child Seat',
    automaticTransmission: 'Automatic Transmission',
    airConditioning: 'Air Conditioning',
    manualTransmission: 'Manual Transmission',
    per10Hours: '/10 hours',
    priceIncludes: 'Price includes driver and gasoline',
  },
  id: {
    home: 'Beranda',
    about: 'Tentang',
    contact: 'Kontak',
    bookNow: 'Pesan Sekarang',
    yourPersonalDriver: 'Sopir Pribadi Anda Menanti',
    yourPersonalDriverDesc: 'Pesan mobil pribadi dengan sopir profesional. Perjalanan mulus, harga tetap, dan kenyamanan premium.',
    contactUs: 'Hubungi Kami',
    aboutUs: 'Tentang Kami',
    aboutUsDesc: 'Kami menyediakan layanan rental mobil profesional dengan sopir berpengalaman di Bali. Kenyamanan dan keamanan Anda adalah prioritas kami. Kami menawarkan berbagai macam kendaraan untuk memenuhi kebutuhan Anda, dari tur kota hingga antar-jemput bandara.',
    allRightsReserved: 'Hak cipta dilindungi undang-undang.',
    availableCars: 'Mobil yang Tersedia',
    // Car details
    sedan: 'Sedan',
    suv: 'SUV',
    van: 'Van',
    luxury: 'Mewah',
    gps: 'GPS',
    childSeat: 'Kursi Anak',
    automaticTransmission: 'Transmisi Otomatis',
    airConditioning: 'AC',
    manualTransmission: 'Transmisi Manual',
    per10Hours: '/10 jam',
    priceIncludes: 'Harga sudah termasuk sopir dan bensin',
  },
  zh: {
    home: '首页',
    about: '关于',
    contact: '联系',
    bookNow: '现在预订',
    yourPersonalDriver: '您的私人司机正在等候',
    yourPersonalDriverDesc: '预订带专业司机的私家车。无缝旅行、固定费率和高级舒适度。',
    contactUs: '联系我们',
    aboutUs: '关于我们',
    aboutUsDesc: '我们在巴厘岛提供带经验丰富的司机的专业汽车租赁服务。您的舒适和安全是我们的首要任务。我们提供多种车辆以满足您的需求，从城市旅游到机场接送。',
    allRightsReserved: '版权所有。',
    availableCars: '可用车辆',
    // Car details
    sedan: '轿车',
    suv: '越野车',
    van: '面包车',
    luxury: '豪华车',
    gps: 'GPS',
    childSeat: '儿童座椅',
    automaticTransmission: '自动变速器',
    airConditioning: '空调',
    manualTransmission: '手动变速器',
    per10Hours: '/10小时',
    priceIncludes: '价格包括司机和汽油',
  },
  ko: {
    home: '홈',
    about: '소개',
    contact: '연락처',
    bookNow: '지금 예약',
    yourPersonalDriver: '개인 운전기사가 기다리고 있습니다',
    yourPersonalDriverDesc: '전문 운전기사와 함께 개인 차량을 예약하세요. 원활한 여행, 고정 요금 및 최고의 편안함.',
    contactUs: '문의하기',
    aboutUs: '회사 소개',
    aboutUsDesc: '발리에서 숙련된 운전기사와 함께 전문 렌터카 서비스를 제공합니다. 고객님의 편안함과 안전이 최우선입니다. 시내 관광부터 공항 환승까지 고객님의 필요에 맞는 다양한 차량을 제공합니다.',
    allRightsReserved: '모든 권리 보유.',
    availableCars: '이용 가능한 차량',
    // Car details
    sedan: '세단',
    suv: 'SUV',
    van: '밴',
    luxury: '고급차',
    gps: 'GPS',
    childSeat: '어린이용 시트',
    automaticTransmission: '자동 변속기',
    airConditioning: '에어컨',
    manualTransmission: '수동 변속기',
    per10Hours: '/10시간',
    priceIncludes: '가격에는 운전기사와 휘발유가 포함됩니다',
  },
  fr: {
    home: 'Accueil',
    about: 'À propos',
    contact: 'Contact',
    bookNow: 'Réserver maintenant',
    yourPersonalDriver: 'Votre Chauffeur Personnel Vous Attend',
    yourPersonalDriverDesc: 'Réservez une voiture privée avec un chauffeur professionnel. Voyage fluide, tarifs fixes et confort premium.',
    contactUs: 'Contactez-nous',
    aboutUs: 'À propos de nous',
    aboutUsDesc: 'Nous fournissons des services de location de voitures professionnels avec des chauffeurs expérimentés à Bali. Votre confort et votre sécurité sont notre priorité. Nous proposons une large gamme de véhicules pour répondre à vos besoins, des visites de la ville aux transferts aéroport.',
    allRightsReserved: 'Tous droits réservés.',
    availableCars: 'Voitures disponibles',
    // Car details
    sedan: 'Berline',
    suv: 'SUV',
    van: 'Van',
    luxury: 'Luxe',
    gps: 'GPS',
    childSeat: 'Siège enfant',
    automaticTransmission: 'Transmission automatique',
    airConditioning: 'Climatisation',
    manualTransmission: 'Transmission manuelle',
    per10Hours: '/10 heures',
    priceIncludes: 'Le prix comprend le chauffeur et l\'essence',
  },
};

export const languages = {
  en: { name: 'English', flag: '🇬🇧' },
  id: { name: 'Indonesia', flag: '🇮🇩' },
  zh: { name: '中文', flag: '🇨🇳' },
  ko: { name: '한국어', flag: '🇰🇷' },
  fr: { name: 'Français', flag: '🇫🇷' },
};

export type TranslationKeys = keyof typeof translations.en;
type Language = keyof typeof translations;

let currentLanguage: Language = 'en';
const listeners: React.Dispatch<React.SetStateAction<Language>>[] = [];

const getInitialLanguage = (): Language => {
  if (typeof window !== 'undefined') {
    const storedLang = localStorage.getItem('language') as Language;
    if (storedLang && translations[storedLang]) {
      return storedLang;
    }
  }
  return 'en';
};

const setLanguage = (lang: Language) => {
  currentLanguage = lang;
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', lang);
  }
  listeners.forEach((listener) => listener(lang));
};

const t = (key: TranslationKeys) => {
  return translations[currentLanguage][key] || translations['en'][key];
};

export const useTranslation = () => {
  const [language, setLanguageState] = useState<Language>('en');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const initialLang = getInitialLanguage();
    setLanguage(initialLang);
    setLanguageState(initialLang);

    const onLanguageChange = (newLang: Language) => {
        setLanguageState(newLang);
    };
    listeners.push(onLanguageChange);
    setIsMounted(true);
    
    return () => {
      const index = listeners.indexOf(onLanguageChange);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  const translate = useCallback((key: TranslationKeys) => {
      if (!isMounted) {
          return translations['en'][key];
      }
      return translations[language][key] || translations['en'][key];
  }, [language, isMounted]);

  const effectiveLanguage = isMounted ? language : 'en';

  return { t: translate, setLanguage, language: effectiveLanguage };
};
