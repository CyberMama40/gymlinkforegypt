import { create } from 'zustand'

export type Lang = 'ar' | 'en' | 'ru'

export type Dir = 'rtl' | 'ltr'

export function getDir(lang: Lang): Dir {
  return lang === 'ar' ? 'rtl' : 'ltr'
}

interface LangState {
  lang: Lang
  setLang: (lang: Lang) => void
}

export const useLang = create<LangState>((set) => ({
  lang: 'en',
  setLang: (lang) => set({ lang }),
}))
