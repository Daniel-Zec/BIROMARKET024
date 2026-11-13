import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Count } from 'micro-motion'
import { Nav, Icon, img, scrollTo } from '../components/ui.jsx'

const RAINBOW = ['#ED1C24', '#EE7D15', '#F7BE43', '#BDCF37', '#55B976', '#437E81', '#823967', '#A0586A']

const TILES = [
  { to: '/servis', kicker: 'Servis', dot: 'var(--accent)', img: 'bm-servis.webp', alt: 'Otvoren laserski štampač sa zaglavljenim papirom',
    title: 'Servis i prodaja kopir aparata', cta: 'Otvori servis',
    text: 'Popravka i održavanje kopir aparata, štampača i multifunkcijskih uređaja. Izlazimo na teren, a dok popravljamo dobijate rezervni aparat.',
    chips: ['Prijava kvara', 'Toneri i delovi', 'Novi aparati', 'Iznajmljivanje'] },
  { to: '/fotokopirnica', kicker: 'Fotokopirnica', dot: '#1d1d1f', img: 'kopirnica-ploter.webp', alt: 'Ploter za sečenje folije u štampariji',
    title: 'Fotokopirnica i štampa', cta: 'Otvori fotokopirnicu',
    text: 'Kopiranje i skeniranje do velikih formata, vizit karte, kalendari i diplome, solventna štampa nalepnica i izloga, štampa na upaljačima i hemijskim.',
    chips: ['Vizit karte', 'Solventna štampa', 'Nalepnice za izloge', 'Upaljači'] },
  { to: '/kancelarija', kicker: 'Online prodavnica', dot: '#0a7d4f', img: 'kancelarija-pribor-sto.webp', alt: 'Kancelarijski pribor na drvenom stolu',
    title: 'Kancelarijski materijal', cta: 'Otvori prodavnicu',
    text: 'Papir, registratori, fascikle, pribor za pisanje, toneri i kertridži – naručite online, platite na račun firme, preuzmite ili sačekajte dostavu.',
    chips: ['Papir', 'Registratori', 'Toneri', 'Za firme'] },
  { to: '/creative-shop', kicker: 'creativeshop.rs', dot: '#EE7D15', img: 'bm-majice.webp', alt: 'Ručno oslikana majica na roze podlozi', rainbow: true,
    title: 'Creative Shop', cta: 'Otvori Creative Shop',
    text: 'Majice, šolje, puzle, kačketi i pokloni sa vašom slikom ili tekstom. Dizajnirajte sami u online dizajneru – mi štampamo.',
    chips: ['Majice', 'Šolje', 'Pokloni', 'Online dizajner'] },
]

const STATS = [
  { v: 31, label: 'godina rada, od 1995.' },
  { v: 35, label: 'zaposlenih' },
  { v: 7, label: 'brendova koje servisiramo' },
  { v: 100, plus: true, label: 'zadovoljnih kupaca: opštine, škole, firme' },
]
const BRANDS = ['Canon', 'Kyocera', 'HP', 'Konica Minolta', 'Epson', 'Lexmark', 'Samsung']
const DEPTS = [
  ['Servis', '024/601-193', '+38124601193', 'servis@biromarket024.rs'],
  ['Fotokopirnica', '024/601-192', '+38124601192', 'kopirnica.bm@gmail.com'],
  ['Magacin i prodaja', '024/673-915', '+38124673915', 'prodaja@biromarket024.rs'],
  ['Administracija', '024/601-190', '+38124601190', 'info@biromarket024.rs'],
  ['Creative Shop', '024/533-853', '+38124533853', 'info@creativeshop.rs'],
]
const PLACES = [
  ['Matije Gupca 56', 'Sedište i administracija'],
  ['Maksima Gorkog 40', 'Servis i fotokopirnica'],
  ['Harambašićeva 14', 'Magacin – kancelarijski materijal'],
]

/* number that rolls from 0 when it scrolls into view */
function RollNumber({ value }) {
  const ref = useRef(null)
  const [v, setV] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(value); io.disconnect() } }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [value])
  return <span ref={ref}><Count value={v} duration={700} stagger={45} aria-label={String(value)} /></span>
}

export default function Home() {
  const { hash } = useLocation()
  useEffect(() => { if (hash === '#kontakt') setTimeout(() => scrollTo('kontakt'), 80) }, [hash])

  return (
    <div className="page">
      <Nav />

      <section style={{ padding: '72px 0 88px' }}>
        <div className="wrap split" style={{ gridTemplateColumns: 'minmax(0,1.05fr) minmax(0,1fr)' }}>
          <div className="stack" style={{ gap: 28 }}>
            <span className="glass" style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 10, borderRadius: 980, padding: '8px 16px 8px 8px', fontSize: 14, color: 'var(--ink-2)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 28, padding: '0 10px', borderRadius: 980, background: 'var(--accent)', color: '#fff', fontWeight: 700, fontSize: 15 }}>
                <RollNumber value={31} />
              </span>
              godina sa vama · Subotica, od 1995.
            </span>
            <h1 className="h1">Sve za vašu kancelariju.<br /><span className="muted">Na jednom mestu.</span></h1>
            <p className="lead" style={{ fontSize: 21, maxWidth: '34ch' }}>Servis i prodaja kopir aparata, fotokopirnica i štampa, kancelarijski materijal i Creative Shop – sve iz jedne firme koju znate.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <Link to="/servis?prijava=1" className="btn btn-red">Prijavi kvar <Icon name="arrow" size={16} stroke={2.2} /></Link>
              <Link to="/servis?prijava=1&toner=1" className="btn btn-glass">Naruči toner</Link>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, fontSize: 14, color: 'var(--muted)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon name="wrench" size={18} color="#1d1d1f" />Izlazak na teren</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon name="printer" size={18} color="#1d1d1f" />Rezervni aparat dok popravljamo</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon name="check" size={18} color="#1d1d1f" />Sertifikovani serviseri</span>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <div className="photo" style={{ aspectRatio: '4 / 3.4' }}>
              <img src={img('bm-kombiji.webp')} alt="Službena vozila Biromarketa 024 parkirana ispred firme u Subotici" style={{ objectPosition: '60% 60%' }} />
            </div>
            <div className="glass float-card left" style={{ left: -28, bottom: 36, display: 'flex', alignItems: 'center', gap: 14, maxWidth: 300 }}>
              <span style={{ width: 44, height: 44, borderRadius: 14, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="phone" size={22} color="#fff" stroke={2} /></span>
              <span className="stack" style={{ gap: 2 }}>
                <span style={{ fontSize: 13, color: 'var(--muted)' }}>Servis, pon–pet 07–16h</span>
                <a href="tel:+38124601193" style={{ fontSize: 19, fontWeight: 700, textDecoration: 'none' }}>024/601-193</a>
              </span>
            </div>
            <div className="glass float-card right" style={{ right: -20, top: 32, borderRadius: 20, padding: '14px 16px' }}>
              <span style={{ fontSize: 13, color: 'var(--muted)', display: 'block' }}>Region</span>
              <span style={{ fontSize: 15, fontWeight: 500 }}>Subotica · Bačka Topola · Sombor<br />Kikinda · Senta</span>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '24px 0 96px' }}>
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 10, maxWidth: 640 }}>
            <span className="kick">Šta radimo</span>
            <h2 className="h2">Izaberite šta vam treba.</h2>
          </div>
          <div className="g2">
            {TILES.map((t) => (
              <Link key={t.to} to={t.to} className="tile" aria-label={`Otvori: ${t.title}`}>
                <span style={{ display: 'block', position: 'relative', height: 280, overflow: 'hidden' }}>
                  <img className="img" src={img(t.img)} alt={t.alt} loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span className="glass" style={{ position: 'absolute', left: 20, top: 20, display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 980, padding: '7px 14px 7px 8px', fontSize: 13, fontWeight: 500 }}>
                    <span style={{ width: 22, height: 22, borderRadius: '50%', background: t.dot }} />{t.kicker}
                  </span>
                </span>
                {t.rainbow && <span style={{ display: 'flex', height: 6 }}>{RAINBOW.map((c) => <span key={c} style={{ flex: 1, background: c }} />)}</span>}
                <span className="stack" style={{ gap: 14, padding: '26px 28px 28px', flex: 1 }}>
                  <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-.015em' }}>{t.title}</span>
                  <span style={{ fontSize: 16, lineHeight: 1.5, color: 'var(--muted)' }}>{t.text}</span>
                  <span style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{t.chips.map((c) => <span key={c} className="chip">{c}</span>)}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 'auto', paddingTop: 6, fontSize: 16, fontWeight: 500 }}>
                    {t.cta}<span className="go" style={{ display: 'flex' }}><Icon name="arrow" size={16} color={t.dot} stroke={2.4} /></span>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="o-nama" className="sec sec-white">
        <div className="wrap stack" style={{ gap: 48 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="kick">O nama</span>
            <h2 className="h2">Vodeća birotehnička firma u regionu.</h2>
            <p className="lead">Od 1995. održavamo kancelarije opština, škola, fakulteta i preduzeća. Ono što ne možemo da popravimo na licu mesta – zamenimo rezervnim aparatom dok traje popravka.</p>
          </div>
          <div className="stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 20 }}>
            {STATS.map((s) => (
              <div key={s.label} className="soft stack" style={{ padding: 28, gap: 8 }}>
                <span style={{ fontSize: 56, fontWeight: 700, letterSpacing: '-.03em', lineHeight: 1, display: 'flex', alignItems: 'flex-start' }}>
                  <RollNumber value={s.v} />{s.plus && <span style={{ fontSize: 28, marginLeft: 4, color: 'var(--accent)' }}>+</span>}
                </span>
                <span style={{ fontSize: 15, lineHeight: 1.4, color: 'var(--muted)' }}>{s.label}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px 36px', paddingTop: 8 }}>
            <span className="small">Servisiramo:</span>
            {BRANDS.map((b) => <span key={b} style={{ fontSize: 20, fontWeight: 700, color: '#aeaeb2' }}>{b}</span>)}
          </div>
        </div>
      </section>

      <section id="kontakt" className="sec">
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 10 }}>
            <span className="kick">Kontakt</span>
            <h2 className="h2">Pozovite pravo odeljenje.</h2>
          </div>
          <div className="split" style={{ alignItems: 'start', gap: 24, gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,1fr)' }}>
            <div className="stack" style={{ gap: 12 }}>
              <div className="dept">
                {DEPTS.map(([n, ph, tel, mail]) => (
                  <div key={n} className="stack" style={{ background: '#fff', borderRadius: 20, padding: '20px 22px', gap: 6, boxShadow: '0 1px 2px rgba(0,0,0,.04)' }}>
                    <span className="small">{n}</span>
                    <a href={`tel:${tel}`} style={{ fontSize: 20, fontWeight: 700, textDecoration: 'none' }}>{ph}</a>
                    <a href={`mailto:${mail}`} style={{ fontSize: 14, color: 'var(--ink-2)', textDecoration: 'none', overflowWrap: 'anywhere' }}>{mail}</a>
                  </div>
                ))}
              </div>
              <div style={{ background: '#fff', borderRadius: 20, padding: '20px 22px', display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', fontSize: 15 }}>
                <span className="small" style={{ fontSize: 15 }}>Servis i fotokopirnica</span>
                <span style={{ fontWeight: 500 }}>Pon–pet 07–16h · Sub 08–12h</span>
              </div>
            </div>
            <div className="card stack" style={{ borderRadius: 28, overflow: 'hidden' }}>
              <div role="img" aria-label="Mesto za mapu Subotice sa tri lokacije" style={{ height: 200, background: '#e8e8ed', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted-2)', fontSize: 14 }}>Mapa sa tri lokacije</div>
              <div className="stack" style={{ padding: '8px 24px 16px' }}>
                {PLACES.map(([a, w], i) => (
                  <div key={a} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '14px 0', borderBottom: i < 2 ? '1px solid rgba(0,0,0,.06)' : 0 }}>
                    <span style={{ flex: 'none', marginTop: 3, width: 24, height: 24, borderRadius: '50%', background: 'var(--accent)', color: '#fff', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
                    <span className="stack" style={{ gap: 2 }}><span style={{ fontSize: 17, fontWeight: 500 }}>{a}</span><span className="small">{w}</span></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ background: '#fff', borderTop: '1px solid rgba(0,0,0,.06)', padding: '48px 0 40px', fontSize: 13, color: 'var(--muted)' }}>
        <div className="wrap stack" style={{ gap: 32 }}>
          <div className="foot">
            <div className="stack" style={{ gap: 8 }}><b style={{ color: 'var(--ink)', fontSize: 14 }}>Biromarket 024 d.o.o.</b><span>Matije Gupca 56, 24000 Subotica</span><a href="mailto:info@biromarket024.rs" style={{ textDecoration: 'none' }}>info@biromarket024.rs</a></div>
            <div className="stack" style={{ gap: 8 }}><b style={{ color: 'var(--ink)', fontSize: 14 }}>Usluge</b><Link to="/servis" style={{ textDecoration: 'none' }}>Servis i prodaja kopir aparata</Link><Link to="/fotokopirnica" style={{ textDecoration: 'none' }}>Fotokopirnica i štampa</Link></div>
            <div className="stack" style={{ gap: 8 }}><b style={{ color: 'var(--ink)', fontSize: 14 }}>Prodavnice</b><Link to="/kancelarija" style={{ textDecoration: 'none' }}>Kancelarijski materijal</Link><Link to="/creative-shop" style={{ textDecoration: 'none' }}>Creative Shop</Link></div>
            <div className="stack" style={{ gap: 8 }}><b style={{ color: 'var(--ink)', fontSize: 14 }}>Ekologija</b><span>Dozvola za sakupljanje praznih kertridža i tonera od 2012.</span></div>
          </div>
          <div style={{ borderTop: '1px solid rgba(0,0,0,.06)', paddingTop: 20 }}>© 2026 Biromarket 024 d.o.o. · Prototip novog sajta</div>
        </div>
      </footer>
    </div>
  )
}
