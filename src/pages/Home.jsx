import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Count, Roll } from 'micro-motion'
import { Nav, Footer, Icon, img, scrollTo, BrandMarquee } from '../components/ui.jsx'
import { useLang } from '../i18n.jsx'

const RAINBOW = ['#ED1C24', '#EE7D15', '#F7BE43', '#BDCF37', '#55B976', '#437E81', '#823967', '#A0586A']

const TILE_BASE = [
  { to: '/servis', dot: 'var(--accent)', img: 'bm-servis.webp' },
  { to: '/fotokopirnica', dot: '#1d1d1f', img: 'kopirnica-ploter.webp' },
  { to: '/kancelarija', dot: '#0a7d4f', img: 'kancelarija-ai/km-hero.webp' },
  { to: '/creative-shop', dot: '#EE7D15', img: 'creative-ai/cs-hero.webp', rainbow: true },
]
const STAT_V = [[31], [35], [7], [100, true]]
const DEPT_C = [['024/601-193', '+38124601193', 'servis@biromarket024.rs'], ['024/601-192', '+38124601192', 'kopirnica.bm@gmail.com'], ['024/673-915', '+38124673915', 'prodaja@biromarket024.rs'], ['024/601-190', '+38124601190', 'info@biromarket024.rs'], ['024/533-853', '+38124533853', 'info@creativeshop.rs']]
const ADDR = ['Matije Gupca 56', 'Maksima Gorkog 40', 'Harambašićeva 14']

const D = {
  sr: {
    years: 'godina sa vama · Subotica, od 1995.', h1a: 'Sve za vašu', words: ['kancelariju.', 'štampu.', 'firmu.'], h1aria: 'Sve za vašu kancelariju, štampu i firmu. Na jednom mestu.', h1b: 'Na jednom mestu.',
    lead: 'Servis i prodaja kopir aparata, fotokopirnica i štampa, kancelarijski materijal i Creative Shop – sve iz jedne firme koju znate.',
    heroAlt: 'Službena vozila Biromarketa 024 parkirana ispred firme u Subotici', call: 'Pozovite nas', region: 'Region', regionList: ['Subotica · Bačka Topola · Sombor', 'Kikinda · Senta'],
    whatKick: 'Šta radimo', whatH: 'Izaberite šta vam treba.', open: 'Otvori',
    tiles: [
      { kicker: 'Servis', alt: 'Otvoren laserski štampač sa zaglavljenim papirom', title: 'Servis i prodaja kopir aparata', cta: 'Otvori servis', text: 'Popravka i održavanje kopir aparata, štampača i multifunkcijskih uređaja. Izlazimo na teren, a dok popravljamo dobijate rezervni aparat.', chips: ['Prijava kvara', 'Toneri i delovi', 'Novi aparati', 'Iznajmljivanje'] },
      { kicker: 'Fotokopirnica', alt: 'Ploter za sečenje folije u štampariji', title: 'Fotokopirnica i štampa', cta: 'Otvori fotokopirnicu', text: 'Kopiranje i skeniranje do velikih formata, vizit karte, kalendari i diplome, solventna štampa nalepnica i izloga, štampa na upaljačima i hemijskim.', chips: ['Vizit karte', 'Solventna štampa', 'Nalepnice za izloge', 'Upaljači'] },
      { kicker: 'Online prodavnica', alt: 'Uredan radni sto sa kancelarijskim materijalom', title: 'Kancelarijski materijal', cta: 'Otvori prodavnicu', text: 'Papir, registratori, fascikle, pribor za pisanje, toneri i kertridži – naručite online, platite na račun firme, preuzmite ili sačekajte dostavu.', chips: ['Papir', 'Registratori', 'Toneri', 'Za firme'] },
      { kicker: 'creativeshop.rs', alt: 'Odštampane majice, šolja, kačket, puzla i plišani meda', title: 'Creative Shop', cta: 'Otvori Creative Shop', text: 'Majice, šolje, puzle, kačketi i pokloni sa vašom slikom ili tekstom. Dizajnirajte sami u online dizajneru – mi štampamo.', chips: ['Majice', 'Šolje', 'Pokloni', 'Online dizajner'] },
    ],
    aboutKick: 'O nama', aboutH: 'Vodeća birotehnička firma u regionu.', aboutLead: 'Od 1995. održavamo kancelarije opština, škola, fakulteta i preduzeća. Ono što ne možemo da popravimo na licu mesta – zamenimo rezervnim aparatom dok traje popravka.',
    stats: ['godina rada, od 1995.', 'zaposlenih', 'brendova koje servisiramo', 'zadovoljnih kupaca: opštine, škole, firme'], brands: 'Servisiramo:',
    contactKick: 'Kontakt', contactH: 'Pozovite pravo odeljenje.', depts: ['Servis', 'Fotokopirnica', 'Magacin i prodaja', 'Administracija', 'Creative Shop'],
    hoursLabel: 'Servis i fotokopirnica', hours: 'Pon–pet 07–16h · Sub 08–12h', map: 'Mapa sa tri lokacije', mapAria: 'Mesto za mapu Subotice sa tri lokacije',
    places: ['Sedište i administracija', 'Servis i fotokopirnica', 'Magacin – kancelarijski materijal'],
  },
  hu: {
    years: 'éve Önökkel · Szabadka, 1995 óta', h1a: 'Minden', words: ['az irodájának.', 'a nyomtatáshoz.', 'a cégének.'], h1aria: 'Minden az irodájának, a nyomtatáshoz és a cégének. Egy helyen.', h1b: 'Egy helyen.',
    lead: 'Fénymásolók szervize és értékesítése, fénymásoló és nyomda, irodaszer és Creative Shop – mind egy cégtől, amelyet már ismer.',
    heroAlt: 'A Biromarket 024 céges autói a szabadkai telephely előtt', call: 'Hívjon minket', region: 'Régió', regionList: ['Szabadka · Topolya · Zombor', 'Nagykikinda · Zenta'],
    whatKick: 'Mivel foglalkozunk', whatH: 'Válassza ki, mire van szüksége.', open: 'Megnyitás',
    tiles: [
      { kicker: 'Szerviz', alt: 'Nyitott lézernyomtató beszorult papírral', title: 'Fénymásolók szervize és értékesítése', cta: 'Szerviz megnyitása', text: 'Fénymásolók, nyomtatók és multifunkciós készülékek javítása és karbantartása. Kimegyünk a helyszínre, és a javítás idejére cserekészüléket adunk.', chips: ['Hibabejelentés', 'Tonerek és alkatrészek', 'Új készülékek', 'Bérlés'] },
      { kicker: 'Fénymásoló', alt: 'Fóliavágó plotter a nyomdában', title: 'Fénymásoló és nyomda', cta: 'Fénymásoló megnyitása', text: 'Fénymásolás és szkennelés nagy formátumig, névjegykártyák, naptárak és oklevelek, oldószeres nyomtatás matricákra és kirakatokra, nyomtatás öngyújtókra és tollakra.', chips: ['Névjegykártyák', 'Oldószeres nyomtatás', 'Kirakatmatricák', 'Öngyújtók'] },
      { kicker: 'Webáruház', alt: 'Rendezett íróasztal irodaszerekkel', title: 'Irodaszer', cta: 'Webáruház megnyitása', text: 'Papír, iratrendezők, mappák, íróeszközök, tonerek és patronok – rendeljen online, fizessen számlára, vegye át személyesen, vagy várja a kiszállítást.', chips: ['Papír', 'Iratrendezők', 'Tonerek', 'Cégeknek'] },
      { kicker: 'creativeshop.rs', alt: 'Nyomtatott pólók, bögre, sapka, puzzle és plüssmaci', title: 'Creative Shop', cta: 'Creative Shop megnyitása', text: 'Pólók, bögrék, puzzle-k, sapkák és ajándékok saját képével vagy szövegével. Tervezze meg maga az online tervezőben – mi kinyomtatjuk.', chips: ['Pólók', 'Bögrék', 'Ajándékok', 'Online tervező'] },
    ],
    aboutKick: 'Rólunk', aboutH: 'A régió vezető irodatechnikai cége.', aboutLead: '1995 óta látjuk el önkormányzatok, iskolák, egyetemek és vállalatok irodáit. Amit nem tudunk a helyszínen megjavítani, azt a javítás idejére cserekészülékkel pótoljuk.',
    stats: ['év, 1995 óta', 'munkatárs', 'márkát szervizelünk', 'elégedett ügyfél: önkormányzatok, iskolák, cégek'], brands: 'Szervizeljük:',
    contactKick: 'Kapcsolat', contactH: 'Hívja a megfelelő részleget.', depts: ['Szerviz', 'Fénymásoló', 'Raktár és értékesítés', 'Adminisztráció', 'Creative Shop'],
    hoursLabel: 'Szerviz és fénymásoló', hours: 'H–P 7–16 · Szo 8–12', map: 'Térkép a három helyszínnel', mapAria: 'Helyőrző Szabadka térképének három helyszínnel',
    places: ['Székhely és adminisztráció', 'Szerviz és fénymásoló', 'Raktár – irodaszer'],
  },
  en: {
    years: 'years with you · Subotica, since 1995', h1a: 'Everything for your', words: ['office.', 'printing.', 'business.'], h1aria: 'Everything for your office, printing and business. All in one place.', h1b: 'All in one place.',
    lead: 'Copier service and sales, copy and print shop, office supplies and Creative Shop – all from one company you already know.',
    heroAlt: 'Biromarket 024 company vans parked in front of the office in Subotica', call: 'Call us', region: 'Region', regionList: ['Subotica · Bačka Topola · Sombor', 'Kikinda · Senta'],
    whatKick: 'What we do', whatH: 'Choose what you need.', open: 'Open',
    tiles: [
      { kicker: 'Service', alt: 'Open laser printer with jammed paper', title: 'Copier service and sales', cta: 'Open service', text: 'Repair and maintenance of copiers, printers and multifunction devices. We come on site, and while we repair you get a replacement machine.', chips: ['Report a fault', 'Toners and parts', 'New machines', 'Rental'] },
      { kicker: 'Copy shop', alt: 'Vinyl cutting plotter in the print shop', title: 'Copy and print shop', cta: 'Open copy shop', text: 'Copying and scanning up to large formats, business cards, calendars and diplomas, solvent printing of stickers and shop windows, printing on lighters and pens.', chips: ['Business cards', 'Solvent printing', 'Shop window stickers', 'Lighters'] },
      { kicker: 'Online shop', alt: 'Tidy desk with office supplies', title: 'Office supplies', cta: 'Open the shop', text: 'Paper, binders, folders, writing supplies, toners and cartridges – order online, pay by company invoice, pick up or wait for delivery.', chips: ['Paper', 'Binders', 'Toners', 'For companies'] },
      { kicker: 'creativeshop.rs', alt: 'Printed T-shirts, mug, cap, puzzle and teddy bear', title: 'Creative Shop', cta: 'Open Creative Shop', text: 'T-shirts, mugs, puzzles, caps and gifts with your own photo or text. Design it yourself in the online designer – we print it.', chips: ['T-shirts', 'Mugs', 'Gifts', 'Online designer'] },
    ],
    aboutKick: 'About us', aboutH: 'The leading office-technology company in the region.', aboutLead: 'Since 1995 we have kept the offices of municipalities, schools, universities and companies running. What we cannot fix on site, we replace with a loaner machine while the repair lasts.',
    stats: ['years in business, since 1995', 'employees', 'brands we service', 'happy customers: municipalities, schools, companies'], brands: 'We service:',
    contactKick: 'Contact', contactH: 'Call the right department.', depts: ['Service', 'Copy shop', 'Warehouse and sales', 'Administration', 'Creative Shop'],
    hoursLabel: 'Service and copy shop', hours: 'Mon–Fri 7am–4pm · Sat 8am–12pm', map: 'Map with three locations', mapAria: 'Placeholder for a map of Subotica with three locations',
    places: ['Head office and administration', 'Service and copy shop', 'Warehouse – office supplies'],
  },
}

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

function RollWord({ words }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI((n) => n + 1), 3000)
    return () => clearInterval(t)
  }, [])
  return <span className="roll-word" aria-hidden="true"><Roll variant="roll">{words[i % words.length]}</Roll></span>
}

export default function Home() {
  const { hash } = useLocation()
  const { tr } = useLang()
  const d = tr(D)
  const TILES = TILE_BASE.map((b, i) => ({ ...b, ...d.tiles[i] }))
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
              {d.years}
            </span>
            <h1 className="h1" aria-label={d.h1aria}>{d.h1a} <RollWord words={d.words} /><br /><span className="muted">{d.h1b}</span></h1>
            <p className="lead" style={{ fontSize: 21, maxWidth: '34ch' }}>{d.lead}</p>
          </div>
          <div style={{ position: 'relative' }}>
            <div className="photo" style={{ aspectRatio: '4 / 3.4' }}>
              <img src={img('bm-kombiji-novo.webp')} alt={d.heroAlt} style={{ objectPosition: '62% 70%' }} />
            </div>
            <div className="glass float-card left" style={{ left: -28, bottom: 36, display: 'flex', alignItems: 'center', gap: 14, maxWidth: 300 }}>
              <span style={{ width: 44, height: 44, borderRadius: 14, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="phone" size={22} color="#fff" stroke={2} /></span>
              <span className="stack" style={{ gap: 2 }}>
                <span style={{ fontSize: 13, color: 'var(--muted)' }}>{d.call}</span>
                <a href="tel:+38124601190" style={{ fontSize: 19, fontWeight: 700, textDecoration: 'none' }}>024/601-190</a>
              </span>
            </div>
            <div className="glass float-card right" style={{ right: -20, top: 32, borderRadius: 20, padding: '14px 16px' }}>
              <span style={{ fontSize: 13, color: 'var(--muted)', display: 'block' }}>{d.region}</span>
              <span style={{ fontSize: 15, fontWeight: 500 }}>{d.regionList[0]}<br />{d.regionList[1]}</span>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '24px 0 96px' }}>
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 10, maxWidth: 640 }}>
            <span className="kick">{d.whatKick}</span>
            <h2 className="h2">{d.whatH}</h2>
          </div>
          <div className="g2">
            {TILES.map((t) => (
              <Link key={t.to} to={t.to} className="tile" aria-label={`${d.open}: ${t.title}`}>
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
            <span className="kick">{d.aboutKick}</span>
            <h2 className="h2">{d.aboutH}</h2>
            <p className="lead">{d.aboutLead}</p>
          </div>
          <div className="stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 20 }}>
            {STAT_V.map(([v, plus], i) => ({ v, plus, label: d.stats[i] })).map((s) => (
              <div key={s.v} className="soft stack" style={{ padding: 28, gap: 8 }}>
                <span style={{ fontSize: 56, fontWeight: 700, letterSpacing: '-.03em', lineHeight: 1, display: 'flex', alignItems: 'flex-start' }}>
                  <RollNumber value={s.v} />{s.plus && <span style={{ fontSize: 28, marginLeft: 4, color: 'var(--accent)' }}>+</span>}
                </span>
                <span style={{ fontSize: 15, lineHeight: 1.4, color: 'var(--muted)' }}>{s.label}</span>
              </div>
            ))}
          </div>
          <div style={{ paddingTop: 8 }}><BrandMarquee label={d.brands} /></div>
        </div>
      </section>

      <section id="kontakt" className="sec">
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 10 }}>
            <span className="kick">{d.contactKick}</span>
            <h2 className="h2">{d.contactH}</h2>
          </div>
          <div className="split" style={{ alignItems: 'start', gap: 24, gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,1fr)' }}>
            <div className="stack" style={{ gap: 12 }}>
              <div className="dept">
                {DEPT_C.map(([ph, tel, mail], i) => [d.depts[i], ph, tel, mail]).map(([n, ph, tel, mail]) => (
                  <div key={n} className="stack" style={{ background: '#fff', borderRadius: 20, padding: '20px 22px', gap: 6, boxShadow: '0 1px 2px rgba(0,0,0,.04)' }}>
                    <span className="small">{n}</span>
                    <a href={`tel:${tel}`} style={{ fontSize: 20, fontWeight: 700, textDecoration: 'none' }}>{ph}</a>
                    <a href={`mailto:${mail}`} style={{ fontSize: 14, color: 'var(--ink-2)', textDecoration: 'none', overflowWrap: 'anywhere' }}>{mail}</a>
                  </div>
                ))}
              </div>
              <div style={{ background: '#fff', borderRadius: 20, padding: '20px 22px', display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', fontSize: 15 }}>
                <span className="small" style={{ fontSize: 15 }}>{d.hoursLabel}</span>
                <span style={{ fontWeight: 500 }}>{d.hours}</span>
              </div>
            </div>
            <div className="card stack" style={{ borderRadius: 28, overflow: 'hidden' }}>
              <div role="img" aria-label={d.mapAria} style={{ height: 200, background: '#e8e8ed', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted-2)', fontSize: 14 }}>{d.map}</div>
              <div className="stack" style={{ padding: '8px 24px 16px' }}>
                {ADDR.map((a, i) => [a, d.places[i]]).map(([a, w], i) => (
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

      <Footer />
    </div>
  )
}
