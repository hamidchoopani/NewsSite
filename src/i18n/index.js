import { createI18n } from "vue-i18n";
import pluralRules from "./rules/pluralization" 
import numberFormats from "./rules/numbers.js"
import datetimeFormats from "./rules/datetime.js"
import en from "./locales/en.json"
import fa from "./locales/fa.json"

export default createI18n({
    locale: import.meta.env.VITE_DEFAULT_LOCALE,
    fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE, 
    legacy: false,
    globalInjection: true,
    messages: { en,fa },
    pluralRules,
    numberFormats,
    datetimeFormats,
    // defaultLocale: 'fa',
    // locales: [{
    //     code: 'en',
    //     name: 'English',
    //     file: "en.json",
    //     iso: "en-US"
    // },
    // {
    //     code: 'fa',
    //     name: 'Persian',
    //     file: "fa.json",
    //     iso: "fa-ir"
    // }
    // ],
    // baseUrl: '/',
    // strategy: 'no_prefix',

})

