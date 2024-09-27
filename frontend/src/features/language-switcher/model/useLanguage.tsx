'use client'

import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import { useTranslation as useTranslationOriginal } from 'react-i18next';

export const useLanguage = () => {
    const { i18n } = useTranslationOriginal();
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

    const changeLanguage = (lang: string) => {
        Cookies.set('language', lang, { expires: 7 });
        i18n.changeLanguage(lang);
        setCurrentLanguage(lang);
    };

    useEffect(() => {
        const savedLang = Cookies.get('language');
        if (savedLang && savedLang !== currentLanguage) {
            i18n.changeLanguage(savedLang);
            setCurrentLanguage(savedLang);
        }
    }, [i18n, currentLanguage]);

    return { currentLanguage, changeLanguage };
};