import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'

import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import ElementLocale from 'element-ui/lib/locale'

Vue.use(VueI18n)

const DEFAULT_LANG = 'zh'
const LOCALE_KEY = 'localeLanguage'

const locales = {
  zh: {
    ...require('./zh.json'),
    ...zhLocale
  },
  en: {
    ...require('./en.json'),
    ...enLocale
  }
}

const i18n = new VueI18n({
  locale: DEFAULT_LANG,
  messages: locales
})

export const setUp = lang => {
  if (lang === undefined) {
    lang = Cookies.get(LOCALE_KEY)
    if (locales[lang] === undefined) {
      lang = DEFAULT_LANG
    }
  }
  Cookies.set(LOCALE_KEY, lang)

  Vue.config.lang = lang
  i18n.locale = lang
  return i18n
}

setUp()

ElementLocale.i18n((key, value) => i18n.t(key, value))

export default i18n
