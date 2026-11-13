import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button, Check, Collapse, Segmented, Spinner, States } from 'micro-motion'
import { Nav, Footer, BackLink, Icon, img, scrollTo, useToast, BrandMarquee } from '../components/ui.jsx'

const SERVICES = [
  ['wrench', 'Popravka i održavanje', 'Kopir aparati, štampači, multifunkcijski uređaji, skeneri, laptopovi i računari.'],
  ['pin', 'Izlazak na teren', 'Dolazimo u vašu kancelariju u Subotici i okolini.'],
  ['printer', 'Rezervni aparat', 'Dok traje popravka, posao ne staje.'],
  ['copier', 'Prodaja aparata', 'Novi kopir aparati i štampači, uz savet koji model odgovara vašem obimu posla.'],
  ['toner', 'Toneri i delovi', 'Originalni i Clover toneri visokog kapaciteta, kertridži i rezervni delovi.'],
  ['recycle', 'Reciklaža kertridža', 'Od 2012. imamo dozvolu – preuzimamo prazne kasete iz vašeg magacina.'],
]
const STEPS = [
  ['Prijavite kvar', 'Online ili na 024/601-193.'],
  ['Javljamo se', 'Dogovaramo termin i šta treba poneti.'],
  ['Popravljamo', 'Na licu mesta ili u servisu, uz rezervni aparat.'],
  ['Radi kao nov', 'Plus savet kako da kvar izbegnete.'],
]
const FAQ = [
  ['Papir se zaglavljuje – šta da uradim?', 'Isključite aparat, otvorite vratanca prema slici na poklopcu i polako izvucite papir u smeru kretanja. Proverite da papir u fioci nije vlažan ili savijen. Ako se ponavlja, prijavite kvar – verovatno su istrošeni valjci.'],
  ['Otisak je bled ili ima pruge', 'Najčešće je pri kraju toner. Izvadite kasetu, protresite je levo-desno i vratite. Ako pruge ostanu, potrebno je čišćenje ili zamena bubnja.'],
  ['Na ekranu je kod greške', 'Zapišite kod (npr. E000, C-2557) i upišite ga u prijavu kvara – serviser će poneti pravi deo i rešiti kvar iz prvog dolaska.'],
  ['Da li dajete rezervni aparat?', 'Da. Ako popravka traje duže, po dogovoru ostavljamo rezervni aparat dok vaš ne bude spreman.'],
]
const STATUS = { 0: ['Primljeno', '#f59e0b'], 1: ['Serviser na putu', '#0071e3'], 2: ['Završeno', '#1f9d55'] }

export default function Servis() {
  const [params] = useSearchParams()
  const [mode, setMode] = useState(params.get('toner') ? 1 : 0)
  const [phase, setPhase] = useState('idle')
  const [status, setStatus] = useState(0)
  const [openQ, setOpenQ] = useState(0)
  const toast = useToast()

  useEffect(() => { if (params.get('prijava')) setTimeout(() => scrollTo('prijava'), 120) }, [params])
  useEffect(() => {
    const a = setTimeout(() => setStatus(1), 1600)
    const b = setTimeout(() => setStatus(2), 3600)
    return () => { clearTimeout(a); clearTimeout(b) }
  }, [])

  const isFault = mode === 0
  const send = () => {
    if (phase !== 'idle') return
    setPhase('sending')
    setTimeout(() => { setPhase('sent'); toast(isFault ? 'Prijava primljena – serviser vas zove danas' : 'Narudžbina tonera primljena') }, 1100)
    setTimeout(() => setPhase('idle'), 4200)
  }
  const label = phase === 'sending' ? 'Šaljem…' : phase === 'sent' ? (isFault ? 'Prijava poslata' : 'Narudžbina poslata') : (isFault ? 'Pošalji prijavu' : 'Pošalji narudžbinu')

  return (
    <div className="page">
      <Nav />
      <section style={{ padding: '64px 0 72px' }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 24 }}>
            <BackLink />
            <span className="kick">Servis i prodaja kopir aparata</span>
            <h1 className="h1" style={{ fontSize: 'clamp(40px,5vw,68px)' }}>Aparat stao?<br /><span className="muted">Dolazimo mi.</span></h1>
            <p className="lead" style={{ maxWidth: '36ch' }}>Popravka i održavanje kopir aparata, štampača, multifunkcijskih uređaja i skenera. Ako kvar ne možemo da otklonimo na licu mesta, ostavljamo vam rezervni aparat.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <button className="btn btn-red" onClick={() => scrollTo('prijava')}>Prijavi kvar <Icon name="arrow" size={16} stroke={2.2} /></button>
              <a href="tel:+38124601193" className="btn btn-glass">Pozovi 024/601-193</a>
            </div>
            <span className="small">Pon–pet 07–16h · Sub 08–12h · Maksima Gorkog 40, Subotica</span>
          </div>
          <div style={{ position: 'relative' }}>
            <div className="photo" style={{ aspectRatio: '1 / 1', maxHeight: 560 }}>
              <img src={img('bm-servis.webp')} alt="Otvoren laserski štampač sa zaglavljenim papirom" />
            </div>
            <div className="glass float-card left stack" style={{ left: -24, bottom: 28, gap: 10, minWidth: 260 }}>
              <span style={{ fontSize: 13, color: 'var(--muted)' }}>Status vaše prijave</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 17, fontWeight: 500 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: STATUS[status][1], transition: 'background-color 200ms ease' }} />
                <States value={String(status)} states={{ 0: STATUS[0][0], 1: STATUS[1][0], 2: STATUS[2][0] }} />
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="sec sec-white">
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 10, maxWidth: 640 }}><span className="kick">Usluge</span><h2 className="h2">Sve oko birotehnike, na jednom mestu.</h2></div>
          <div className="g3">
            {SERVICES.map(([ic, t, x]) => (
              <div key={t} className="soft stack" style={{ padding: 26, gap: 12 }}>
                <span className="ico"><Icon name={ic} /></span>
                <span style={{ fontSize: 20, fontWeight: 700 }}>{t}</span>
                <span style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--muted)' }}>{x}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="prijava" className="sec" style={{ scrollMarginTop: 64 }}>
        <div className="wrap split" style={{ alignItems: 'start' }}>
          <div className="stack" style={{ gap: 28 }}>
            <div className="stack" style={{ gap: 10 }}><span className="kick">Prijava kvara i narudžbina</span><h2 className="h2">Javite nam za dva minuta.</h2><p className="lead">Popunite formu, a serviser vas zove u toku radnog dana.</p></div>
            <div className="stack">
              {STEPS.map(([t, x], i) => (
                <div key={t} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '14px 0' }}>
                  <span style={{ flex: 'none', width: 36, height: 36, borderRadius: '50%', background: '#fff', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--accent)' }}>{i + 1}</span>
                  <span className="stack" style={{ gap: 2 }}><span style={{ fontSize: 17, fontWeight: 500 }}>{t}</span><span style={{ fontSize: 15, color: 'var(--muted)' }}>{x}</span></span>
                </div>
              ))}
            </div>
          </div>
          <form className="card stack" style={{ padding: 28, gap: 18 }} onSubmit={(e) => { e.preventDefault(); send() }}>
            <Segmented items={['Prijava kvara', 'Naruči toner']} value={mode} onChange={(i) => { setMode(i); setPhase('idle') }} aria-label="Vrsta zahteva" />
            <div className="g2" style={{ gap: 14 }}>
              <label className="field">Firma ili ime<input type="text" placeholder="npr. Opština Subotica" /></label>
              <label className="field">Telefon<input type="tel" placeholder="06x xxx xxxx" /></label>
            </div>
            <div className="g2" style={{ gap: 14 }}>
              <label className="field">Uređaj<select><option>Kopir aparat</option><option>Štampač</option><option>Multifunkcijski uređaj</option><option>Skener</option><option>Laptop / računar</option></select></label>
              <label className="field">Marka i model<input type="text" placeholder="npr. Canon iR 2520" /></label>
            </div>
            <Collapse open={isFault}>
              <div className="stack" style={{ gap: 14 }}>
                <label className="field">Šta se dešava?<textarea rows={3} placeholder="npr. papir se zaglavljuje u fioci 2, na ekranu greška E000" /></label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: 'var(--ink-2)' }}><input type="checkbox" style={{ width: 18, height: 18, accentColor: 'var(--accent)' }} />Hitno – aparat ne radi uopšte</label>
              </div>
            </Collapse>
            <Collapse open={!isFault}>
              <div className="stack" style={{ gap: 14 }}>
                <label className="field">Količina<select><option>1 komad</option><option>2 komada</option><option>5 komada</option><option>10 komada</option></select></label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: 'var(--ink-2)' }}><input type="checkbox" style={{ width: 18, height: 18, accentColor: 'var(--accent)' }} />Uzmite i prazne kasete za reciklažu</label>
              </div>
            </Collapse>
            <Button type="submit" variant="primary" size="large" className="mm-big" disabled={phase === 'sending'}
              icon={phase === 'sending' ? <Spinner /> : phase === 'sent' ? <Check on size={16} /> : undefined}
              style={{ background: phase === 'sent' ? 'var(--ok)' : 'var(--accent)' }}>
              {label}
            </Button>
            <span className="small" style={{ fontSize: 13, textAlign: 'center' }}>Prototip – forma ništa ne šalje.</span>
          </form>
        </div>
      </section>

      <section className="sec sec-white">
        <div className="wrap stack" style={{ gap: 32 }}>
          <BrandMarquee label="Servisiramo i prodajemo:" />
          <div className="stack" style={{ gap: 10, maxWidth: 640, paddingTop: 32 }}><span className="kick">Česti problemi</span><h2 className="h2">Možda rešite i sami.</h2></div>
          <div style={{ borderTop: '1px solid rgba(0,0,0,.08)' }}>
            {FAQ.map(([q, a], i) => (
              <div key={q} style={{ borderBottom: '1px solid rgba(0,0,0,.08)' }}>
                <button className="qa" aria-expanded={openQ === i} onClick={() => setOpenQ(openQ === i ? -1 : i)}>
                  {q}<span className={openQ === i ? 'chev open' : 'chev'}><Icon name="chev" size={20} color="#6e6e73" stroke={2} /></span>
                </button>
                <Collapse open={openQ === i}>
                  <p style={{ margin: '0 0 22px', fontSize: 16, lineHeight: 1.6, color: 'var(--muted)', maxWidth: '70ch' }}>{a}</p>
                </Collapse>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
