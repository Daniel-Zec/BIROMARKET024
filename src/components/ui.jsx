import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Follow, Toast, rectIn } from 'micro-motion'
import { useLang, LangSwitch } from '../i18n.jsx'

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
const NAV = {
  sr: { links: [['Servis', '/servis'], ['Fotokopirnica', '/fotokopirnica'], ['Kancelarijski materijal', '/kancelarija'], ['Creative Shop', '/creative-shop']], contact: 'Kontakt', home: 'Biromarket 024 – naslovna', menu: 'Glavni meni' },
  hu: { links: [['Szerviz', '/servis'], ['Fénymásoló', '/fotokopirnica'], ['Irodaszer', '/kancelarija'], ['Creative Shop', '/creative-shop']], contact: 'Kapcsolat', home: 'Biromarket 024 – főoldal', menu: 'Főmenü' },
  en: { links: [['Service', '/servis'], ['Copy shop', '/fotokopirnica'], ['Office supplies', '/kancelarija'], ['Creative Shop', '/creative-shop']], contact: 'Contact', home: 'Biromarket 024 – home', menu: 'Main menu' },
}
export function Nav() {
  const { tr } = useLang()
  const d = tr(NAV)
  const navRef = useRef(null)
  const [hl, setHl] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 4)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const over = (e) => {
    const a = e.target.closest('a'); if (!a || !navRef.current) return
    const r = rectIn(navRef.current, a)
    setHl({ x: r.x - 12, y: r.y - 7, width: r.width + 24, height: r.height + 14 })
  }
  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="wrap nav-row">
        <Link to="/" aria-label={d.home}><img src={`${import.meta.env.BASE_URL}logo/biromarket-024-logo.svg`} alt="Biromarket 024" style={{ height: 30, width: 'auto', display: 'block' }} /></Link>
        <nav className="navlinks" aria-label={d.menu} ref={navRef} onMouseOver={over} onFocus={over} onMouseLeave={() => setHl(null)} onBlur={() => setHl(null)}>
          <Follow to={hl} className="nav-hl" aria-hidden="true" />
          {d.links.map(([t, to]) => <NavLink key={to} to={to}>{t}</NavLink>)}
          <Link to="/#kontakt" onClick={() => setTimeout(() => scrollTo('kontakt'), 50)}>{d.contact}</Link>
        </nav>
        <LangSwitch />
      </div>
    </header>
  )
}

/* Subtle scroll reveal: 8px rise + fade, once. Runs on every route change. */
const REVEAL = '.sec .kick, .sec .h2, .sec .lead, .tile, .card, .prod, .cat, .gallery > *, .photo, .stat'
export function Reveal() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const els = [...document.querySelectorAll(REVEAL)].filter((el) => !el.closest('.nav') && !el.classList.contains('rv-in') && !el.dataset.rvDone)
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) {
        const t = en.target; t.classList.add('rv-in'); io.unobserve(t)
        setTimeout(() => { t.classList.remove('rv', 'rv-in'); t.dataset.rvDone = '1' }, 1000)
      }
    }), { rootMargin: '0px 0px -6% 0px' })
    els.forEach((el) => {
      const sib = el.parentElement ? [...el.parentElement.children].indexOf(el) : 0
      el.style.setProperty('--rv-d', `${Math.min(sib, 4) * 60}ms`)
      el.classList.add('rv'); io.observe(el)
    })
    return () => io.disconnect()
  }, [pathname])
  return null
}

export function BackLink() {
  const { tr } = useLang()
  return <Link to="/" className="back"><Icon name="back" size={16} stroke={2} />{tr({ sr: 'Naslovna', hu: 'Főoldal', en: 'Home' })}</Link>
}
const FOOT = {
  sr: { services: 'Usluge', s1: 'Servis i prodaja kopir aparata', s2: 'Fotokopirnica i štampa', shops: 'Prodavnice', p1: 'Kancelarijski materijal', eco: 'Ekologija', ecoText: 'Dozvola za sakupljanje praznih kertridža i tonera od 2012.', copy: 'Prototip novog sajta', city: 'Subotica' },
  hu: { services: 'Szolgáltatások', s1: 'Fénymásolók szervize és értékesítése', s2: 'Fénymásoló és nyomda', shops: 'Webáruházak', p1: 'Irodaszer', eco: 'Környezetvédelem', ecoText: '2012 óta engedéllyel gyűjtjük az üres tintapatronokat és tonereket.', copy: 'Az új weboldal prototípusa', city: 'Szabadka' },
  en: { services: 'Services', s1: 'Copier service and sales', s2: 'Copy and print shop', shops: 'Shops', p1: 'Office supplies', eco: 'Environment', ecoText: 'Licensed to collect empty cartridges and toners since 2012.', copy: 'Prototype of the new website', city: 'Subotica' },
}
export function Footer() {
  const { tr } = useLang()
  const d = tr(FOOT)
  return (
    <footer style={{ background: '#fff', borderTop: '1px solid rgba(0,0,0,.06)', padding: '48px 0 40px', fontSize: 13, color: 'var(--muted)' }}>
      <div className="wrap stack" style={{ gap: 32 }}>
        <div className="foot">
          <div className="stack" style={{ gap: 8 }}><b style={{ color: 'var(--ink)', fontSize: 14 }}>Biromarket 024 d.o.o.</b><span>Matije Gupca 56, 24000 {d.city}</span><a href="mailto:info@biromarket024.rs" style={{ textDecoration: 'none' }}>info@biromarket024.rs</a></div>
          <div className="stack" style={{ gap: 8 }}><b style={{ color: 'var(--ink)', fontSize: 14 }}>{d.services}</b><Link to="/servis" style={{ textDecoration: 'none' }}>{d.s1}</Link><Link to="/fotokopirnica" style={{ textDecoration: 'none' }}>{d.s2}</Link></div>
          <div className="stack" style={{ gap: 8 }}><b style={{ color: 'var(--ink)', fontSize: 14 }}>{d.shops}</b><Link to="/kancelarija" style={{ textDecoration: 'none' }}>{d.p1}</Link><Link to="/creative-shop" style={{ textDecoration: 'none' }}>Creative Shop</Link></div>
          <div className="stack" style={{ gap: 8 }}><b style={{ color: 'var(--ink)', fontSize: 14 }}>{d.eco}</b><span>{d.ecoText}</span></div>
        </div>
        <div style={{ borderTop: '1px solid rgba(0,0,0,.06)', paddingTop: 20 }}>© 2026 Biromarket 024 d.o.o. · {d.copy}</div>
      </div>
    </footer>
  )
}

/* Brand logos, scrolling slowly in a never-ending loop. */
const BRAND_LOGOS = [
  ['Canon', 'canon', 26], ['HP', 'hp', 34], ['Konica Minolta', 'konica-minolta', 36],
  ['Epson', 'epson', 22], ['Lexmark', 'lexmark', 28], ['Samsung', 'samsung', 16],
]
export function BrandMarquee({ label = 'Servisiramo:' }) {
  const row = (hidden) => BRAND_LOGOS.map(([name, file, h]) => (
    <img key={file + String(hidden)} src={`${import.meta.env.BASE_URL}logo/brands/${file}.svg`} alt={hidden ? '' : name}
      aria-hidden={hidden || undefined} style={{ height: h }} loading="lazy" />
  ))
  return (
    <div className="brands">
      <span className="small">{label}</span>
      <div className="marquee">
        <div className="marquee-track">{row(false)}{row(1)}{row(2)}{row(3)}</div>
      </div>
    </div>
  )
}
