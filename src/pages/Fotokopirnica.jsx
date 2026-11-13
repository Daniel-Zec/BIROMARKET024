import { useState } from 'react'
import { Button, Check, Meter, Segmented, Spinner, Swap } from 'micro-motion'
import { Nav, Footer, BackLink, Icon, img, scrollTo, useToast } from '../components/ui.jsx'
import { useLang } from '../i18n.jsx'

const G_ICONS = ['printer', 'card', 'large', 'lighter']
const GALLERY_IMG = [
  ['kopirnica-vizit-karte-1.webp', 'kopirnica-vizit-karte-2.webp', 'kopirnica-vizit-karte-3.webp'],
  ['kopirnica-izlog-1.webp', 'kopirnica-izlog-2.webp', 'kopirnica-izlog-3.webp'],
  ['kopirnica-upaljac.webp', 'olovke.webp', 'kopirnica-nalepnice.webp'],
  ['kopirnica-kalendar-1.webp', 'kopirnica-kalendar-2.webp', 'kopirnica-kalendar-3.webp'],
]
const D = {
  sr: {
    groups: [['Kopiranje i skeniranje', ['Crno-belo i kolor kopiranje', 'Veliki formati – nacrti i projekti', 'Skeniranje dokumenata', 'Kopiranje i povez knjiga']], ['Mali format A4 / A3', ['Vizit karte', 'Diplome i zahvalnice', 'Katalozi i flajeri', 'Čestitke i kalendari']], ['Veliki format i solvent', ['Nalepnice i PVC folija', 'Nalepnice za izloge radnji', 'Sečenje na ploteru', 'Roll-up baneri i table']], ['Promo štampa', ['Štampa na upaljačima', 'Štampa na hemijskim olovkama', 'Rokovnici', 'Kalendari sa logom']]],
    tips: [['PDF fajl', 'Najsigurniji format – fontovi i boje ostaju isti.'], ['300 dpi', 'Slike u punoj rezoluciji, ne iz poruka ili sa društvenih mreža.'], ['3 mm preko ivice', 'Za vizit karte i sve što se seče do ivice.'], ['CMYK boje', 'Ako ne znate šta je to – nije problem, proverićemo mi.']],
    tabs: ['Vizit karte', 'Izlozi', 'Promo', 'Kalendari'],
    captions: [['Vizit karte – mat papir', 'Vizit karte – sjajni lak', 'Vizit karte – razne vrste papira'], ['Natpis na staklu izloga', 'Folija za izlog radnje', 'Natpis na prozoru restorana'], ['Upaljači sa logom', 'Hemijske olovke', 'Nalepnice'], ['Stoni kalendar – januar', 'Stoni kalendar – april', 'Stoni kalendar – jun']],
    kick: 'Fotokopirnica i štampa · od 1995.', h1a: 'Od vizit karte', h1b: 'do izloga radnje.', lead: 'Kopiranje, skeniranje i štampa svih formata – od A4 do solventne štampe na PVC foliji, sa idejnim rešenjem i dizajnom ako vam treba.',
    sendFile: 'Pošalji fajl', hours: 'Pon–pet 07–16h · Sub 08–12h · Maksima Gorkog 40, Subotica', heroAlt: 'Ploter za sečenje folije u štampariji', newLabel: 'Novo u ponudi', newText: 'A0 štampa · UV štampa · canvas',
    whatKick: 'Šta štampamo', whatH: 'Četiri vrste posla, jedna radnja.',
    sendKick: 'Pošaljite fajl', sendH: 'Pošaljete danas, preuzmete sutra.', sendLead: 'Za većinu poslova javljamo cenu i rok u toku istog radnog dana.', prep: 'Kako pripremiti fajl',
    whatPrint: 'Šta štampamo', options: ['Vizit karte', 'Nalepnice / PVC folija', 'Nalepnica za izlog', 'Štampa na upaljačima', 'Kalendari', 'Diplome', 'Kopiranje / skeniranje', 'Nešto drugo'], qty: 'Količina', qtyPh: 'npr. 500 kom', name: 'Ime ili firma', contact: 'Telefon ili e-mail',
    drop: 'Prevucite fajl ili izaberite', ready: 'Spreman za slanje', uploading: 'Otpremanje…', formats: 'PDF, JPG, PNG, AI, CDR – do 50 MB', choose: 'Izaberi fajl', uploadAria: 'Otpremanje fajla', noteLabel: 'Napomena', notePh: 'dimenzije, papir, rok…',
    sending: 'Šaljem…', sent: 'Poslato', send: 'Pošalji na štampu', protoNote: 'Prototip – fajl se ne šalje nigde.', toast: 'Primili smo fajl – javljamo cenu i rok danas',
    workKick: 'Naši radovi', workH: 'Galerija gotovih radova.', tabsAria: 'Kategorija radova', stock: 'Primeri sa stock fotografija (Pexels) – zamenićemo ih fotografijama vaših pravih radova.',
  },
  hu: {
    groups: [['Fénymásolás és szkennelés', ['Fekete-fehér és színes másolás', 'Nagy formátum – tervrajzok és projektek', 'Dokumentumok szkennelése', 'Könyvek másolása és kötése']], ['Kis formátum A4 / A3', ['Névjegykártyák', 'Oklevelek és köszönőlevelek', 'Katalógusok és szórólapok', 'Üdvözlőlapok és naptárak']], ['Nagy formátum és oldószeres nyomtatás', ['Matricák és PVC fólia', 'Kirakatmatricák üzleteknek', 'Plotteres vágás', 'Roll-up bannerek és táblák']], ['Reklámnyomtatás', ['Nyomtatás öngyújtókra', 'Nyomtatás golyóstollakra', 'Határidőnaplók', 'Naptárak logóval']]],
    tips: [['PDF fájl', 'A legbiztosabb formátum – a betűk és a színek nem változnak.'], ['300 dpi', 'Teljes felbontású képek, ne üzenetekből vagy közösségi oldalakról.'], ['3 mm ráhagyás', 'Névjegykártyákhoz és mindenhez, ami szélig van vágva.'], ['CMYK színek', 'Ha nem tudja, mi ez – nem baj, mi ellenőrizzük.']],
    tabs: ['Névjegyek', 'Kirakatok', 'Reklám', 'Naptárak'],
    captions: [['Névjegykártyák – matt papír', 'Névjegykártyák – fényes lakk', 'Névjegykártyák – különféle papírok'], ['Felirat a kirakatüvegen', 'Kirakatfólia üzletnek', 'Felirat étterem ablakán'], ['Öngyújtók logóval', 'Golyóstollak', 'Matricák'], ['Asztali naptár – január', 'Asztali naptár – április', 'Asztali naptár – június']],
    kick: 'Fénymásoló és nyomda · 1995 óta', h1a: 'A névjegykártyától', h1b: 'az üzlet kirakatáig.', lead: 'Fénymásolás, szkennelés és nyomtatás minden formátumban – A4-től az oldószeres PVC-fólia nyomtatásig, igény esetén ötlettel és grafikai tervvel.',
    sendFile: 'Fájl küldése', hours: 'H–P 7–16 · Szo 8–12 · Maksima Gorkog 40, Szabadka', heroAlt: 'Fóliavágó plotter a nyomdában', newLabel: 'Újdonság', newText: 'A0 nyomtatás · UV nyomtatás · vászonkép',
    whatKick: 'Mit nyomtatunk', whatH: 'Négyféle munka, egy műhely.',
    sendKick: 'Küldje el a fájlt', sendH: 'Ma elküldi, holnap átveszi.', sendLead: 'A legtöbb munkánál még aznap megadjuk az árat és a határidőt.', prep: 'Hogyan készítse elő a fájlt',
    whatPrint: 'Mit nyomtatunk', options: ['Névjegykártyák', 'Matricák / PVC fólia', 'Kirakatmatrica', 'Nyomtatás öngyújtókra', 'Naptárak', 'Oklevelek', 'Másolás / szkennelés', 'Valami más'], qty: 'Mennyiség', qtyPh: 'pl. 500 db', name: 'Név vagy cég', contact: 'Telefon vagy e-mail',
    drop: 'Húzza ide a fájlt, vagy válassza ki', ready: 'Küldésre kész', uploading: 'Feltöltés…', formats: 'PDF, JPG, PNG, AI, CDR – max. 50 MB', choose: 'Fájl kiválasztása', uploadAria: 'Fájl feltöltése', noteLabel: 'Megjegyzés', notePh: 'méret, papír, határidő…',
    sending: 'Küldés…', sent: 'Elküldve', send: 'Küldés nyomtatásra', protoNote: 'Prototípus – a fájl sehová sem kerül.', toast: 'Megkaptuk a fájlt – ma jelezzük az árat és a határidőt',
    workKick: 'Munkáink', workH: 'Kész munkák galériája.', tabsAria: 'Munkák kategóriája', stock: 'Példák stockfotókból (Pexels) – később saját munkáink fotóira cseréljük.',
  },
  en: {
    groups: [['Copying and scanning', ['Black-and-white and color copying', 'Large formats – plans and drawings', 'Document scanning', 'Book copying and binding']], ['Small format A4 / A3', ['Business cards', 'Diplomas and certificates', 'Catalogs and flyers', 'Greeting cards and calendars']], ['Large format and solvent', ['Stickers and PVC foil', 'Shop window stickers', 'Plotter cutting', 'Roll-up banners and signs']], ['Promotional printing', ['Printing on lighters', 'Printing on ballpoint pens', 'Planners', 'Calendars with your logo']]],
    tips: [['PDF file', 'The safest format – fonts and colors stay the same.'], ['300 dpi', 'Full-resolution images, not from messages or social media.'], ['3 mm bleed', 'For business cards and anything cut to the edge.'], ['CMYK colors', "If you don't know what that is – no problem, we will check."]],
    tabs: ['Business cards', 'Windows', 'Promo', 'Calendars'],
    captions: [['Business cards – matte paper', 'Business cards – gloss varnish', 'Business cards – various papers'], ['Lettering on a shop window', 'Window foil for a shop', 'Lettering on a restaurant window'], ['Lighters with a logo', 'Ballpoint pens', 'Stickers'], ['Desk calendar – January', 'Desk calendar – April', 'Desk calendar – June']],
    kick: 'Copy and print shop · since 1995', h1a: 'From business cards', h1b: 'to shop windows.', lead: 'Copying, scanning and printing in every format – from A4 to solvent printing on PVC foil, with concept and design if you need it.',
    sendFile: 'Send a file', hours: 'Mon–Fri 7am–4pm · Sat 8am–12pm · Maksima Gorkog 40, Subotica', heroAlt: 'Vinyl cutting plotter in the print shop', newLabel: 'New', newText: 'A0 printing · UV printing · canvas',
    whatKick: 'What we print', whatH: 'Four kinds of work, one shop.',
    sendKick: 'Send your file', sendH: 'Send it today, pick it up tomorrow.', sendLead: 'For most jobs we give you the price and deadline on the same working day.', prep: 'How to prepare your file',
    whatPrint: 'What to print', options: ['Business cards', 'Stickers / PVC foil', 'Shop window sticker', 'Printing on lighters', 'Calendars', 'Diplomas', 'Copying / scanning', 'Something else'], qty: 'Quantity', qtyPh: 'e.g. 500 pcs', name: 'Name or company', contact: 'Phone or e-mail',
    drop: 'Drag a file here or choose one', ready: 'Ready to send', uploading: 'Uploading…', formats: 'PDF, JPG, PNG, AI, CDR – up to 50 MB', choose: 'Choose file', uploadAria: 'File upload', noteLabel: 'Note', notePh: 'size, paper, deadline…',
    sending: 'Sending…', sent: 'Sent', send: 'Send to print', protoNote: 'Prototype – the file is not sent anywhere.', toast: 'We got your file – price and deadline today',
    workKick: 'Our work', workH: 'Gallery of finished work.', tabsAria: 'Work category', stock: 'Examples from stock photos (Pexels) – we will replace them with photos of your real work.',
  },
}

export default function Fotokopirnica() {
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('idle')
  const [tab, setTab] = useState(0)
  const toast = useToast()
  const { tr } = useLang()
  const d = tr(D)

  const onFile = (e) => {
    const f = e.target.files && e.target.files[0]
    setFile(f ? f.name : 'vizit-karta.pdf')
    setProgress(0)
    setTimeout(() => setProgress(1), 60)
  }
  const send = () => {
    if (phase !== 'idle') return
    setPhase('sending')
    setTimeout(() => { setPhase('sent'); toast(d.toast) }, 1100)
    setTimeout(() => setPhase('idle'), 4200)
  }

  return (
    <div className="page">
      <Nav />
      <section style={{ padding: '64px 0 72px' }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 24 }}>
            <BackLink />
            <span className="kick">{d.kick}</span>
            <h1 className="h1" style={{ fontSize: 'clamp(40px,5vw,68px)' }}>{d.h1a}<br /><span className="muted">{d.h1b}</span></h1>
            <p className="lead" style={{ maxWidth: '36ch' }}>{d.lead}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <button className="btn btn-red" onClick={() => scrollTo('posalji')}>{d.sendFile} <Icon name="arrow" size={16} stroke={2.2} /></button>
              <a href="tel:+38124601192" className="btn btn-glass">024/601-192</a>
            </div>
            <span className="small">{d.hours}</span>
          </div>
          <div style={{ position: 'relative' }}>
            <div className="photo" style={{ aspectRatio: '1 / 1', maxHeight: 560 }}>
              <img src={img('kopirnica-ploter.webp')} alt={d.heroAlt} />
            </div>
            <div className="glass float-card left stack" style={{ left: -24, bottom: 28, gap: 4 }}>
              <span style={{ fontSize: 13, color: 'var(--muted)' }}>{d.newLabel}</span>
              <span style={{ fontSize: 16, fontWeight: 500 }}>{d.newText}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 24 }}>
        <div className="wrap stack" style={{ gap: 36 }}>
          <div className="stack" style={{ gap: 10, maxWidth: 640 }}><span className="kick">{d.whatKick}</span><h2 className="h2">{d.whatH}</h2></div>
          <div className="g4">
            {d.groups.map(([t, items], i) => [G_ICONS[i], t, items]).map(([ic, t, items]) => (
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
            <div className="stack" style={{ gap: 10 }}><span className="kick">{d.sendKick}</span><h2 className="h2">{d.sendH}</h2><p className="lead">{d.sendLead}</p></div>
            <div className="stack" style={{ gap: 10 }}>
              <span style={{ fontSize: 15, fontWeight: 500 }}>{d.prep}</span>
              <div className="g2" style={{ gap: 12 }}>
                {d.tips.map(([t, x]) => <div key={t} className="soft stack" style={{ borderRadius: 20, padding: '20px 22px', gap: 6 }}><span style={{ fontSize: 18, fontWeight: 700 }}>{t}</span><span style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--muted)' }}>{x}</span></div>)}
              </div>
            </div>
          </div>
          <form className="soft stack on-soft" style={{ padding: 28, gap: 18 }} onSubmit={(e) => { e.preventDefault(); send() }}>
            <div className="g2" style={{ gap: 14 }}>
              <label className="field">{d.whatPrint}<select>{d.options.map((o) => <option key={o}>{o}</option>)}</select></label>
              <label className="field">{d.qty}<input type="text" placeholder={d.qtyPh} /></label>
            </div>
            <div className="g2" style={{ gap: 14 }}>
              <label className="field">{d.name}<input type="text" /></label>
              <label className="field">{d.contact}<input type="text" /></label>
            </div>
            <div className="stack" style={{ gap: 12, background: '#fff', borderRadius: 16, padding: 18, border: '1.5px dashed rgba(0,0,0,.15)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Icon name="upload" size={22} color="#424245" />
                <span className="stack" style={{ gap: 2, flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: 15, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file || d.drop}</span>
                  <span style={{ fontSize: 13, color: 'var(--muted)' }}>{file ? (progress >= 1 ? d.ready : d.uploading) : d.formats}</span>
                </span>
                <label className="btn btn-glass btn-sm" style={{ position: 'relative', overflow: 'hidden' }}>{d.choose}
                  <input type="file" onChange={onFile} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                </label>
              </span>
              {file && <Meter value={progress} tone={progress >= 1 ? 'success' : 'accent'} aria-label={d.uploadAria} />}
            </div>
            <label className="field">{d.noteLabel}<textarea rows={2} placeholder={d.notePh} /></label>
            <Button type="submit" variant="primary" size="large" className="mm-big" disabled={phase === 'sending'}
              icon={phase === 'sending' ? <Spinner /> : phase === 'sent' ? <Check on size={16} /> : undefined}
              style={{ background: phase === 'sent' ? 'var(--ok)' : 'var(--accent)' }}>
              {phase === 'sending' ? d.sending : phase === 'sent' ? d.sent : d.send}
            </Button>
            <span className="small" style={{ fontSize: 13, textAlign: 'center' }}>{d.protoNote}</span>
          </form>
        </div>
      </section>

      <section className="sec">
        <div className="wrap stack" style={{ gap: 28 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'end', gap: 20 }}>
            <div className="stack" style={{ gap: 10 }}><span className="kick">{d.workKick}</span><h2 className="h2">{d.workH}</h2></div>
            <Segmented items={d.tabs} value={tab} onChange={setTab} aria-label={d.tabsAria} style={{ minWidth: 'min(480px, 100%)' }} />
          </div>
          <Swap id={tab}>
            <div className="g3 gallery">
              {GALLERY_IMG[tab].map((src, i) => [src, d.captions[tab][i]]).map(([src, label]) => (
                <figure key={src}><img src={img(src)} alt={label} loading="lazy" /><figcaption style={{ fontSize: 15, color: 'var(--ink-2)' }}>{label}</figcaption></figure>
              ))}
            </div>
          </Swap>
          <span className="small" style={{ fontSize: 13 }}>{d.stock}</span>
        </div>
      </section>
      <Footer />
    </div>
  )
}
