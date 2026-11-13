import { useState } from 'react'
import { Button, Check, Meter, Segmented, Spinner, Swap } from 'micro-motion'
import { Nav, Footer, BackLink, Icon, img, scrollTo, useToast } from '../components/ui.jsx'

const GROUPS = [
  ['printer', 'Kopiranje i skeniranje', ['Crno-belo i kolor kopiranje', 'Veliki formati – nacrti i projekti', 'Skeniranje dokumenata', 'Kopiranje i povez knjiga']],
  ['card', 'Mali format A4 / A3', ['Vizit karte', 'Diplome i zahvalnice', 'Katalozi i flajeri', 'Čestitke i kalendari']],
  ['large', 'Veliki format i solvent', ['Nalepnice i PVC folija', 'Nalepnice za izloge radnji', 'Sečenje na ploteru', 'Roll-up baneri i table']],
  ['lighter', 'Promo štampa', ['Štampa na upaljačima', 'Štampa na hemijskim olovkama', 'Rokovnici', 'Kalendari sa logom']],
]
const TIPS = [
  ['PDF fajl', 'Najsigurniji format – fontovi i boje ostaju isti.'],
  ['300 dpi', 'Slike u punoj rezoluciji, ne iz poruka ili sa društvenih mreža.'],
  ['3 mm preko ivice', 'Za vizit karte i sve što se seče do ivice.'],
  ['CMYK boje', 'Ako ne znate šta je to – nije problem, proverićemo mi.'],
]
const TABS = ['Vizit karte', 'Izlozi', 'Promo', 'Kalendari']
const GALLERY = [
  [['kopirnica-vizit-karte-1.webp', 'Vizit karte – mat papir'], ['kopirnica-vizit-karte-2.webp', 'Vizit karte – sjajni lak'], ['kopirnica-vizit-karte-3.webp', 'Vizit karte – razne vrste papira']],
  [['kopirnica-izlog-1.webp', 'Natpis na staklu izloga'], ['kopirnica-izlog-2.webp', 'Folija za izlog radnje'], ['kopirnica-izlog-3.webp', 'Natpis na prozoru restorana']],
  [['kopirnica-upaljac.webp', 'Upaljači sa logom'], ['olovke.webp', 'Hemijske olovke'], ['kopirnica-nalepnice.webp', 'Nalepnice']],
  [['kopirnica-kalendar-1.webp', 'Stoni kalendar – januar'], ['kopirnica-kalendar-2.webp', 'Stoni kalendar – april'], ['kopirnica-kalendar-3.webp', 'Stoni kalendar – jun']],
]

export default function Fotokopirnica() {
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('idle')
  const [tab, setTab] = useState(0)
  const toast = useToast()

  const onFile = (e) => {
    const f = e.target.files && e.target.files[0]
    setFile(f ? f.name : 'vizit-karta.pdf')
    setProgress(0)
    setTimeout(() => setProgress(1), 60)
  }
  const send = () => {
    if (phase !== 'idle') return
    setPhase('sending')
    setTimeout(() => { setPhase('sent'); toast('Primili smo fajl – javljamo cenu i rok danas') }, 1100)
    setTimeout(() => setPhase('idle'), 4200)
  }

  return (
    <div className="page">
      <Nav />
      <section style={{ padding: '64px 0 72px' }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 24 }}>
            <BackLink />
            <span className="kick">Fotokopirnica i štampa · od 1995.</span>
            <h1 className="h1" style={{ fontSize: 'clamp(40px,5vw,68px)' }}>Od vizit karte<br /><span className="muted">do izloga radnje.</span></h1>
            <p className="lead" style={{ maxWidth: '36ch' }}>Kopiranje, skeniranje i štampa svih formata – od A4 do solventne štampe na PVC foliji, sa idejnim rešenjem i dizajnom ako vam treba.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <button className="btn btn-red" onClick={() => scrollTo('posalji')}>Pošalji fajl <Icon name="arrow" size={16} stroke={2.2} /></button>
              <a href="tel:+38124601192" className="btn btn-glass">024/601-192</a>
            </div>
            <span className="small">Pon–pet 07–16h · Sub 08–12h · Maksima Gorkog 40, Subotica</span>
          </div>
          <div style={{ position: 'relative' }}>
            <div className="photo" style={{ aspectRatio: '1 / 1', maxHeight: 560 }}>
              <img src={img('kopirnica-ploter.webp')} alt="Ploter za sečenje folije u štampariji" />
            </div>
            <div className="glass float-card left stack" style={{ left: -24, bottom: 28, gap: 4 }}>
              <span style={{ fontSize: 13, color: 'var(--muted)' }}>Novo u ponudi</span>
              <span style={{ fontSize: 16, fontWeight: 500 }}>A0 štampa · UV štampa · canvas</span>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 24 }}>
        <div className="wrap stack" style={{ gap: 36 }}>
          <div className="stack" style={{ gap: 10, maxWidth: 640 }}><span className="kick">Šta štampamo</span><h2 className="h2">Četiri vrste posla, jedna radnja.</h2></div>
          <div className="g4">
            {GROUPS.map(([ic, t, items]) => (
              <div key={t} className="card stack" style={{ padding: 26, gap: 14 }}>
                <span className="ico" style={{ background: 'var(--bg)' }}><Icon name={ic} /></span>
                <span style={{ fontSize: 21, fontWeight: 700 }}>{t}</span>
                <span className="stack" style={{ gap: 8 }}>
                  {items.map((i) => <span key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 15, color: 'var(--ink-2)' }}><Icon name="check" size={16} color="#1f9d55" stroke={2.4} />{i}</span>)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="posalji" className="sec sec-white" style={{ scrollMarginTop: 64 }}>
        <div className="wrap split" style={{ alignItems: 'start' }}>
          <div className="stack" style={{ gap: 24 }}>
            <div className="stack" style={{ gap: 10 }}><span className="kick">Pošaljite fajl</span><h2 className="h2">Pošaljete danas, preuzmete sutra.</h2><p className="lead">Za većinu poslova javljamo cenu i rok u toku istog radnog dana.</p></div>
            <div className="stack" style={{ gap: 10 }}>
              <span style={{ fontSize: 15, fontWeight: 500 }}>Kako pripremiti fajl</span>
              <div className="g2" style={{ gap: 12 }}>
                {TIPS.map(([t, x]) => <div key={t} className="soft stack" style={{ borderRadius: 20, padding: '20px 22px', gap: 6 }}><span style={{ fontSize: 18, fontWeight: 700 }}>{t}</span><span style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--muted)' }}>{x}</span></div>)}
              </div>
            </div>
          </div>
          <form className="soft stack on-soft" style={{ padding: 28, gap: 18 }} onSubmit={(e) => { e.preventDefault(); send() }}>
            <div className="g2" style={{ gap: 14 }}>
              <label className="field">Šta štampamo<select><option>Vizit karte</option><option>Nalepnice / PVC folija</option><option>Nalepnica za izlog</option><option>Štampa na upaljačima</option><option>Kalendari</option><option>Diplome</option><option>Kopiranje / skeniranje</option><option>Nešto drugo</option></select></label>
              <label className="field">Količina<input type="text" placeholder="npr. 500 kom" /></label>
            </div>
            <div className="g2" style={{ gap: 14 }}>
              <label className="field">Ime ili firma<input type="text" /></label>
              <label className="field">Telefon ili e-mail<input type="text" /></label>
            </div>
            <div className="stack" style={{ gap: 12, background: '#fff', borderRadius: 16, padding: 18, border: '1.5px dashed rgba(0,0,0,.15)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Icon name="upload" size={22} color="#424245" />
                <span className="stack" style={{ gap: 2, flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: 15, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file || 'Prevucite fajl ili izaberite'}</span>
                  <span style={{ fontSize: 13, color: 'var(--muted)' }}>{file ? (progress >= 1 ? 'Spreman za slanje' : 'Otpremanje…') : 'PDF, JPG, PNG, AI, CDR – do 50 MB'}</span>
                </span>
                <label className="btn btn-glass btn-sm" style={{ position: 'relative', overflow: 'hidden' }}>Izaberi fajl
                  <input type="file" onChange={onFile} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                </label>
              </span>
              {file && <Meter value={progress} tone={progress >= 1 ? 'success' : 'accent'} aria-label="Otpremanje fajla" />}
            </div>
            <label className="field">Napomena<textarea rows={2} placeholder="dimenzije, papir, rok…" /></label>
            <Button type="submit" variant="primary" size="large" className="mm-big" disabled={phase === 'sending'}
              icon={phase === 'sending' ? <Spinner /> : phase === 'sent' ? <Check on size={16} /> : undefined}
              style={{ background: phase === 'sent' ? 'var(--ok)' : 'var(--accent)' }}>
              {phase === 'sending' ? 'Šaljem…' : phase === 'sent' ? 'Poslato' : 'Pošalji na štampu'}
            </Button>
            <span className="small" style={{ fontSize: 13, textAlign: 'center' }}>Prototip – fajl se ne šalje nigde.</span>
          </form>
        </div>
      </section>

      <section className="sec">
        <div className="wrap stack" style={{ gap: 28 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'end', gap: 20 }}>
            <div className="stack" style={{ gap: 10 }}><span className="kick">Naši radovi</span><h2 className="h2">Galerija gotovih radova.</h2></div>
            <Segmented items={TABS} value={tab} onChange={setTab} aria-label="Kategorija radova" style={{ minWidth: 'min(480px, 100%)' }} />
          </div>
          <Swap id={tab}>
            <div className="g3 gallery">
              {GALLERY[tab].map(([src, label]) => (
                <figure key={src}><img src={img(src)} alt={label} loading="lazy" /><figcaption style={{ fontSize: 15, color: 'var(--ink-2)' }}>{label}</figcaption></figure>
              ))}
            </div>
          </Swap>
          <span className="small" style={{ fontSize: 13 }}>Primeri sa stock fotografija (Pexels) – zamenićemo ih fotografijama vaših pravih radova.</span>
        </div>
      </section>
      <Footer />
    </div>
  )
}
