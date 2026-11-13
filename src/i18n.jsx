import { createContext, useContext, useEffect, useState } from 'react'

/* Simple 3-language setup for the Biromarket site: sr (default), hu, en.
   Each page keeps its own dictionary { sr: {...}, hu: {...}, en: {...} } and picks with tr(). */

export const LANGS = ['sr', 'hu', 'en']
const KEY = 'bm-lang'
const read = () => { try { const v = localStorage.getItem(KEY); return LANGS.includes(v) ? v : 'sr' } catch { return 'sr' } }

const LangCtx = createContext({ lang: 'sr', setLang: () => {} })

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(read)
  const setLang = (l) => { setLangState(l); try { localStorage.setItem(KEY, l) } catch { /* private mode */ } }
  useEffect(() => { document.documentElement.lang = lang === 'sr' ? 'sr-Latn' : lang }, [lang])
  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>
}

/* Force a language for a subtree (Creative Shop stays Serbian for now). */
export function LangScope({ lang, children }) {
  return <LangCtx.Provider value={{ lang, setLang: () => {} }}>{children}</LangCtx.Provider>
}

export function useLang() {
  const { lang, setLang } = useContext(LangCtx)
  const tr = (dict) => (dict && (dict[lang] ?? dict.sr))
  return { lang, setLang, tr }
}

export function LangSwitch({ className = '' }) {
  const { lang, setLang } = useLang()
  return (
    <div className={`lang-switch ${className}`} role="group" aria-label="Jezik / Nyelv / Language">
      {LANGS.map((l) => (
        <button key={l} type="button" className={lang === l ? 'on' : ''} aria-pressed={lang === l} onClick={() => setLang(l)}>{l.toUpperCase()}</button>
      ))}
    </div>
  )
}
