import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Toast } from 'micro-motion'

export const img = (name) => `${import.meta.env.BASE_URL}img/${name}`

const PATHS = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  back: <path d="M19 12H5M11 18l-6-6 6-6" />,
  check: <path d="M20 6 9 17l-5-5" />,
  chev: <path d="m6 9 6 6 6-6" />,
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />,
  wrench: <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z" />,
  pin: <><path d="M12 21s-7-6.3-7-12a7 7 0 0 1 14 0c0 5.7-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></>,
  printer: <><rect x="6" y="3" width="12" height="7" rx="1" /><rect x="3" y="10" width="18" height="8" rx="2" /><path d="M7 18v3h10v-3" /></>,
  copier: <><rect x="4" y="8" width="16" height="10" rx="2" /><path d="M7 8V4h10v4M8 22h8M12 18v4" /></>,
  toner: <><rect x="3" y="8" width="18" height="8" rx="2" /><path d="M7 8V6h10v2M7 16v2h10v-2" /></>,
  recycle: <><path d="M7 19H4l3-5M17 19h3l-3-5M12 4l3 5H9z" /><path d="M7 19h10" /></>,
  card: <><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M7 10h6M7 14h4" /></>,
  large: <><path d="M3 7h18v10H3z" /><path d="M7 7V4h10v3M7 17v3h10v-3" /></>,
  lighter: <><path d="M8 3h8l-1 6H9z" /><rect x="7" y="9" width="10" height="12" rx="2" /></>,
  upload: <><path d="M12 16V4M7 9l5-5 5 5" /><path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  cart: <><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6" /><circle cx="10" cy="20" r="1.5" /><circle cx="17" cy="20" r="1.5" /></>,
  bag: <><path d="M6 7h12l-1 13H7z" /><path d="M9 7V6a3 3 0 0 1 6 0v1" /></>,
  invoice: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18" /></>,
  truck: <><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>,
  repeat: <><path d="M4 4v6h6" /><path d="M20 12a8 8 0 1 0-2.3 5.7" /></>,
  home: <><path d="M3 10 12 4l9 6v10H3z" /><path d="M9 20v-6h6v6" /></>,
}
export function Icon({ name, size = 24, color = 'currentColor', stroke = 1.8 }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }}>
      {PATHS[name]}
    </svg>
  )
}

/* ---------- toast ---------- */
const ToastCtx = createContext(() => {})
export const useToast = () => useContext(ToastCtx)
export function ToastProvider({ children }) {
  const [state, setState] = useState({ show: false, text: '' })
  const timer = useRef()
  const toast = useCallback((text) => {
    clearTimeout(timer.current)
    setState({ show: true, text })
    timer.current = setTimeout(() => setState((s) => ({ ...s, show: false })), 2600)
  }, [])
  useEffect(() => () => clearTimeout(timer.current), [])
  return (
    <ToastCtx.Provider value={toast}>
      {children}
      <div className="toast-host" role="status" aria-live="polite">
        <Toast show={state.show} icon={<span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--ok)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="check" size={13} color="#fff" stroke={3} /></span>}>
          {state.text}
        </Toast>
      </div>
    </ToastCtx.Provider>
  )
}

/* ---------- scrolling ---------- */
export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}
export const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

/* ---------- Biromarket nav + footer ---------- */
const LINKS = [
  ['Servis', '/servis'],
  ['Fotokopirnica', '/fotokopirnica'],
  ['Kancelarijski materijal', '/kancelarija'],
  ['Creative Shop', '/creative-shop'],
]
export function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav-row">
        <Link to="/" aria-label="Biromarket 024 – naslovna"><img src={`${import.meta.env.BASE_URL}logo/biromarket-024-logo.svg`} alt="Biromarket 024" style={{ height: 30, width: 'auto', display: 'block' }} /></Link>
        <nav className="navlinks" aria-label="Glavni meni">
          {LINKS.map(([t, to]) => <NavLink key={to} to={to}>{t}</NavLink>)}
          <Link to="/#kontakt" onClick={() => setTimeout(() => scrollTo('kontakt'), 50)}>Kontakt</Link>
        </nav>
        <Link to="/servis?prijava=1" className="btn btn-red btn-sm">Prijavi kvar</Link>
      </div>
    </header>
  )
}
export function BackLink() {
  return <Link to="/" className="back"><Icon name="back" size={16} stroke={2} />Naslovna</Link>
}
export function Footer() {
  return (
    <footer style={{ background: '#fff', borderTop: '1px solid rgba(0,0,0,.06)', padding: '32px 0', fontSize: 13, color: 'var(--muted)' }}>
      <div className="wrap" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 }}>
        <span>© 2026 Biromarket 024 d.o.o. · Matije Gupca 56, 24000 Subotica · Prototip</span>
        <Link to="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Nazad na naslovnu</Link>
      </div>
    </footer>
  )
}
