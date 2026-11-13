import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button, Check, Collapse, Segmented, Spinner, States } from 'micro-motion'
import { Nav, Footer, BackLink, Icon, img, scrollTo, useToast, BrandMarquee } from '../components/ui.jsx'
import { useLang } from '../i18n.jsx'

const ICONS = ['wrench', 'pin', 'printer', 'copier', 'toner', 'recycle']
const STATUS_C = ['#f59e0b', '#0071e3', '#1f9d55']
const D = {
  sr: {
    services: [['Popravka i održavanje', 'Kopir aparati, štampači, multifunkcijski uređaji, skeneri, laptopovi i računari.'], ['Izlazak na teren', 'Dolazimo u vašu kancelariju u Subotici i okolini.'], ['Rezervni aparat', 'Dok traje popravka, posao ne staje.'], ['Prodaja aparata', 'Novi kopir aparati i štampači, uz savet koji model odgovara vašem obimu posla.'], ['Toneri i delovi', 'Originalni i Clover toneri visokog kapaciteta, kertridži i rezervni delovi.'], ['Reciklaža kertridža', 'Od 2012. imamo dozvolu – preuzimamo prazne kasete iz vašeg magacina.']],
    steps: [['Prijavite kvar', 'Online ili na 024/601-193.'], ['Javljamo se', 'Dogovaramo termin i šta treba poneti.'], ['Popravljamo', 'Na licu mesta ili u servisu, uz rezervni aparat.'], ['Radi kao nov', 'Plus savet kako da kvar izbegnete.']],
    faq: [['Papir se zaglavljuje – šta da uradim?', 'Isključite aparat, otvorite vratanca prema slici na poklopcu i polako izvucite papir u smeru kretanja. Proverite da papir u fioci nije vlažan ili savijen. Ako se ponavlja, prijavite kvar – verovatno su istrošeni valjci.'], ['Otisak je bled ili ima pruge', 'Najčešće je pri kraju toner. Izvadite kasetu, protresite je levo-desno i vratite. Ako pruge ostanu, potrebno je čišćenje ili zamena bubnja.'], ['Na ekranu je kod greške', 'Zapišite kod (npr. E000, C-2557) i upišite ga u prijavu kvara – serviser će poneti pravi deo i rešiti kvar iz prvog dolaska.'], ['Da li dajete rezervni aparat?', 'Da. Ako popravka traje duže, po dogovoru ostavljamo rezervni aparat dok vaš ne bude spreman.']],
    status: ['Primljeno', 'Serviser na putu', 'Završeno'], statusLabel: 'Status vaše prijave',
    kick: 'Servis i prodaja kopir aparata', h1a: 'Aparat stao?', h1b: 'Dolazimo mi.', lead: 'Popravka i održavanje kopir aparata, štampača, multifunkcijskih uređaja i skenera. Ako kvar ne možemo da otklonimo na licu mesta, ostavljamo vam rezervni aparat.',
    report: 'Prijavi kvar', toner: 'Naruči toner', callBtn: 'Pozovi 024/601-193', points: ['Izlazak na teren', 'Rezervni aparat dok popravljamo', 'Sertifikovani serviseri'], hours: 'Pon–pet 07–16h · Sub 08–12h · Maksima Gorkog 40, Subotica', heroAlt: 'Otvoren laserski štampač sa zaglavljenim papirom',
    servKick: 'Usluge', servH: 'Sve oko birotehnike, na jednom mestu.',
    formKick: 'Prijava kvara i narudžbina', formH: 'Javite nam za dva minuta.', formLead: 'Popunite formu, a serviser vas zove u toku radnog dana.',
    seg: ['Prijava kvara', 'Naruči toner'], segAria: 'Vrsta zahteva', name: 'Firma ili ime', namePh: 'npr. Opština Subotica', phone: 'Telefon', device: 'Uređaj', devices: ['Kopir aparat', 'Štampač', 'Multifunkcijski uređaj', 'Skener', 'Laptop / računar'], model: 'Marka i model', modelPh: 'npr. Canon iR 2520',
    what: 'Šta se dešava?', whatPh: 'npr. papir se zaglavljuje u fioci 2, na ekranu greška E000', urgent: 'Hitno – aparat ne radi uopšte', qty: 'Količina', qtys: ['1 komad', '2 komada', '5 komada', '10 komada'], recycle: 'Uzmite i prazne kasete za reciklažu',
    sending: 'Šaljem…', sentFault: 'Prijava poslata', sentToner: 'Narudžbina poslata', sendFault: 'Pošalji prijavu', sendToner: 'Pošalji narudžbinu', note: 'Prototip – forma ništa ne šalje.',
    toastFault: 'Prijava primljena – serviser vas zove danas', toastToner: 'Narudžbina tonera primljena',
    brands: 'Servisiramo i prodajemo:', faqKick: 'Česti problemi', faqH: 'Možda rešite i sami.',
  },
  hu: {
    services: [['Javítás és karbantartás', 'Fénymásolók, nyomtatók, multifunkciós készülékek, szkennerek, laptopok és számítógépek.'], ['Helyszíni kiszállás', 'Kimegyünk az irodájába Szabadkán és környékén.'], ['Cserekészülék', 'A javítás ideje alatt sem áll le a munka.'], ['Készülékek értékesítése', 'Új fénymásolók és nyomtatók, tanácsadással, hogy melyik modell illik a munkájához.'], ['Tonerek és alkatrészek', 'Eredeti és nagy kapacitású Clover tonerek, patronok és alkatrészek.'], ['Patronok újrahasznosítása', '2012 óta van engedélyünk – elvisszük az üres kazettákat a raktárából.']],
    steps: [['Jelentse a hibát', 'Online vagy a 024/601-193-as számon.'], ['Jelentkezünk', 'Időpontot egyeztetünk, és megbeszéljük, mit kell vinni.'], ['Megjavítjuk', 'A helyszínen vagy a szervizben, cserekészülékkel.'], ['Újra működik', 'Plusz tanács, hogyan kerülheti el a hibát.']],
    faq: [['Beszorul a papír – mit tegyek?', 'Kapcsolja ki a készüléket, nyissa ki az ajtót a fedélen lévő ábra szerint, és lassan húzza ki a papírt a haladási irányban. Ellenőrizze, hogy a tálcában lévő papír nem nedves vagy gyűrött. Ha ismétlődik, jelentse a hibát – valószínűleg kopottak a görgők.'], ['Halvány vagy csíkos a nyomat', 'Legtöbbször fogyóban van a toner. Vegye ki a kazettát, rázza meg jobbra-balra, és tegye vissza. Ha a csíkok maradnak, tisztítás vagy dobcsere szükséges.'], ['Hibakód van a kijelzőn', 'Írja fel a kódot (pl. E000, C-2557), és adja meg a hibabejelentésben – a szerelő a megfelelő alkatrésszel érkezik, és elsőre megoldja a hibát.'], ['Adnak cserekészüléket?', 'Igen. Ha a javítás tovább tart, megbeszélés szerint cserekészüléket hagyunk, amíg az Öné el nem készül.']],
    status: ['Beérkezett', 'A szerelő úton van', 'Kész'], statusLabel: 'Bejelentése állapota',
    kick: 'Fénymásolók szervize és értékesítése', h1a: 'Leállt a gép?', h1b: 'Megyünk.', lead: 'Fénymásolók, nyomtatók, multifunkciós készülékek és szkennerek javítása és karbantartása. Ha a hibát nem tudjuk a helyszínen elhárítani, cserekészüléket hagyunk.',
    report: 'Hiba bejelentése', toner: 'Toner rendelése', callBtn: 'Hívás: 024/601-193', points: ['Helyszíni kiszállás', 'Cserekészülék a javítás idejére', 'Képzett szerelők'], hours: 'H–P 7–16 · Szo 8–12 · Maksima Gorkog 40, Szabadka', heroAlt: 'Nyitott lézernyomtató beszorult papírral',
    servKick: 'Szolgáltatások', servH: 'Minden, ami irodatechnika, egy helyen.',
    formKick: 'Hibabejelentés és rendelés', formH: 'Két perc alatt jelezze nekünk.', formLead: 'Töltse ki az űrlapot, és a szerelő még aznap munkaidőben felhívja.',
    seg: ['Hibabejelentés', 'Toner rendelése'], segAria: 'Kérés típusa', name: 'Cég vagy név', namePh: 'pl. Szabadka Önkormányzata', phone: 'Telefon', device: 'Készülék', devices: ['Fénymásoló', 'Nyomtató', 'Multifunkciós készülék', 'Szkenner', 'Laptop / számítógép'], model: 'Márka és modell', modelPh: 'pl. Canon iR 2520',
    what: 'Mi történik?', whatPh: 'pl. a 2. tálcában beszorul a papír, a kijelzőn E000 hiba', urgent: 'Sürgős – a készülék egyáltalán nem működik', qty: 'Mennyiség', qtys: ['1 darab', '2 darab', '5 darab', '10 darab'], recycle: 'Vigyék el az üres kazettákat is újrahasznosításra',
    sending: 'Küldés…', sentFault: 'Bejelentés elküldve', sentToner: 'Rendelés elküldve', sendFault: 'Bejelentés küldése', sendToner: 'Rendelés küldése', note: 'Prototípus – az űrlap nem küld semmit.',
    toastFault: 'Bejelentés beérkezett – a szerelő ma felhívja', toastToner: 'Tonerrendelés beérkezett',
    brands: 'Szervizeljük és forgalmazzuk:', faqKick: 'Gyakori problémák', faqH: 'Talán Ön is meg tudja oldani.',
  },
  en: {
    services: [['Repair and maintenance', 'Copiers, printers, multifunction devices, scanners, laptops and computers.'], ['On-site visits', 'We come to your office in Subotica and the surrounding area.'], ['Loaner machine', 'Your work does not stop while we repair.'], ['Machine sales', 'New copiers and printers, with advice on which model fits your workload.'], ['Toners and parts', 'Original and high-capacity Clover toners, cartridges and spare parts.'], ['Cartridge recycling', 'Licensed since 2012 – we collect empty cartridges from your storage.']],
    steps: [['Report the fault', 'Online or call 024/601-193.'], ['We get back to you', 'We agree on a time and what to bring.'], ['We repair', 'On site or in our workshop, with a loaner machine.'], ['Works like new', 'Plus advice on how to avoid the fault.']],
    faq: [['Paper keeps jamming – what should I do?', 'Switch the machine off, open the door as shown on the cover and slowly pull the paper out in the direction it travels. Check that the paper in the tray is not damp or bent. If it keeps happening, report the fault – the rollers are probably worn.'], ['Prints are faint or streaky', 'Usually the toner is running low. Take the cartridge out, shake it left and right and put it back. If the streaks remain, the drum needs cleaning or replacing.'], ['There is an error code on the display', 'Write down the code (e.g. E000, C-2557) and add it to the fault report – the technician will bring the right part and fix it on the first visit.'], ['Do you provide a loaner machine?', 'Yes. If the repair takes longer, we leave a loaner machine by arrangement until yours is ready.']],
    status: ['Received', 'Technician on the way', 'Done'], statusLabel: 'Status of your report',
    kick: 'Copier service and sales', h1a: 'Machine stopped?', h1b: 'We come to you.', lead: 'Repair and maintenance of copiers, printers, multifunction devices and scanners. If we cannot fix the fault on site, we leave you a loaner machine.',
    report: 'Report a fault', toner: 'Order toner', callBtn: 'Call 024/601-193', points: ['On-site visits', 'Loaner machine while we repair', 'Certified technicians'], hours: 'Mon–Fri 7am–4pm · Sat 8am–12pm · Maksima Gorkog 40, Subotica', heroAlt: 'Open laser printer with jammed paper',
    servKick: 'Services', servH: 'Everything for office technology, in one place.',
    formKick: 'Fault reports and orders', formH: 'Let us know in two minutes.', formLead: 'Fill in the form and a technician will call you during the working day.',
    seg: ['Report a fault', 'Order toner'], segAria: 'Request type', name: 'Company or name', namePh: 'e.g. City of Subotica', phone: 'Phone', device: 'Device', devices: ['Copier', 'Printer', 'Multifunction device', 'Scanner', 'Laptop / computer'], model: 'Brand and model', modelPh: 'e.g. Canon iR 2520',
    what: 'What is happening?', whatPh: 'e.g. paper jams in tray 2, error E000 on the display', urgent: 'Urgent – the machine does not work at all', qty: 'Quantity', qtys: ['1 piece', '2 pieces', '5 pieces', '10 pieces'], recycle: 'Also collect empty cartridges for recycling',
    sending: 'Sending…', sentFault: 'Report sent', sentToner: 'Order sent', sendFault: 'Send report', sendToner: 'Send order', note: 'Prototype – the form does not send anything.',
    toastFault: 'Report received – a technician will call you today', toastToner: 'Toner order received',
    brands: 'We service and sell:', faqKick: 'Common problems', faqH: 'You may be able to fix it yourself.',
  },
}

export default function Servis() {
  const [params] = useSearchParams()
  const [mode, setMode] = useState(params.get('toner') ? 1 : 0)
  const [phase, setPhase] = useState('idle')
  const [status, setStatus] = useState(0)
  const [openQ, setOpenQ] = useState(0)
  const toast = useToast()
  const { tr } = useLang()
  const d = tr(D)

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
    setTimeout(() => { setPhase('sent'); toast(isFault ? d.toastFault : d.toastToner) }, 1100)
    setTimeout(() => setPhase('idle'), 4200)
  }
  const label = phase === 'sending' ? d.sending : phase === 'sent' ? (isFault ? d.sentFault : d.sentToner) : (isFault ? d.sendFault : d.sendToner)

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
              <button className="btn btn-red" onClick={() => { setMode(0); setPhase('idle'); scrollTo('prijava') }}>{d.report} <Icon name="arrow" size={16} stroke={2.2} /></button>
              <button className="btn btn-glass" onClick={() => { setMode(1); setPhase('idle'); scrollTo('prijava') }}>{d.toner}</button>
              <a href="tel:+38124601193" className="btn btn-glass">{d.callBtn}</a>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 24px', fontSize: 14, color: 'var(--muted)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon name="wrench" size={18} color="#1d1d1f" />{d.points[0]}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon name="printer" size={18} color="#1d1d1f" />{d.points[1]}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon name="check" size={18} color="#1d1d1f" />{d.points[2]}</span>
            </div>
            <span className="small">{d.hours}</span>
          </div>
          <div style={{ position: 'relative' }}>
            <div className="photo" style={{ aspectRatio: '1 / 1', maxHeight: 560 }}>
              <img src={img('bm-servis.webp')} alt={d.heroAlt} />
            </div>
            <div className="glass float-card left stack" style={{ left: -24, bottom: 28, gap: 10, minWidth: 260 }}>
              <span style={{ fontSize: 13, color: 'var(--muted)' }}>{d.statusLabel}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 17, fontWeight: 500 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: STATUS_C[status], transition: 'background-color 200ms ease' }} />
                <States value={String(status)} states={{ 0: d.status[0], 1: d.status[1], 2: d.status[2] }} />
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="sec sec-white">
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 10, maxWidth: 640 }}><span className="kick">{d.servKick}</span><h2 className="h2">{d.servH}</h2></div>
          <div className="g3">
            {d.services.map(([t, x], i) => [ICONS[i], t, x]).map(([ic, t, x]) => (
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
            <div className="stack" style={{ gap: 10 }}><span className="kick">{d.formKick}</span><h2 className="h2">{d.formH}</h2><p className="lead">{d.formLead}</p></div>
            <div className="stack">
              {d.steps.map(([t, x], i) => (
                <div key={t} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '14px 0' }}>
                  <span style={{ flex: 'none', width: 36, height: 36, borderRadius: '50%', background: '#fff', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--accent)' }}>{i + 1}</span>
                  <span className="stack" style={{ gap: 2 }}><span style={{ fontSize: 17, fontWeight: 500 }}>{t}</span><span style={{ fontSize: 15, color: 'var(--muted)' }}>{x}</span></span>
                </div>
              ))}
            </div>
          </div>
          <form className="card stack" style={{ padding: 28, gap: 18 }} onSubmit={(e) => { e.preventDefault(); send() }}>
            <Segmented items={d.seg} value={mode} onChange={(i) => { setMode(i); setPhase('idle') }} aria-label={d.segAria} />
            <div className="g2" style={{ gap: 14 }}>
              <label className="field">{d.name}<input type="text" placeholder={d.namePh} /></label>
              <label className="field">{d.phone}<input type="tel" placeholder="06x xxx xxxx" /></label>
            </div>
            <div className="g2" style={{ gap: 14 }}>
              <label className="field">{d.device}<select>{d.devices.map((o) => <option key={o}>{o}</option>)}</select></label>
              <label className="field">{d.model}<input type="text" placeholder={d.modelPh} /></label>
            </div>
            <Collapse open={isFault}>
              <div className="stack" style={{ gap: 14 }}>
                <label className="field">{d.what}<textarea rows={3} placeholder={d.whatPh} /></label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: 'var(--ink-2)' }}><input type="checkbox" style={{ width: 18, height: 18, accentColor: 'var(--accent)' }} />{d.urgent}</label>
              </div>
            </Collapse>
            <Collapse open={!isFault}>
              <div className="stack" style={{ gap: 14 }}>
                <label className="field">{d.qty}<select>{d.qtys.map((o) => <option key={o}>{o}</option>)}</select></label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: 'var(--ink-2)' }}><input type="checkbox" style={{ width: 18, height: 18, accentColor: 'var(--accent)' }} />{d.recycle}</label>
              </div>
            </Collapse>
            <Button type="submit" variant="primary" size="large" className="mm-big" disabled={phase === 'sending'}
              icon={phase === 'sending' ? <Spinner /> : phase === 'sent' ? <Check on size={16} /> : undefined}
              style={{ background: phase === 'sent' ? 'var(--ok)' : 'var(--accent)' }}>
              {label}
            </Button>
            <span className="small" style={{ fontSize: 13, textAlign: 'center' }}>{d.note}</span>
          </form>
        </div>
      </section>

      <section className="sec sec-white">
        <div className="wrap stack" style={{ gap: 32 }}>
          <BrandMarquee label={d.brands} />
          <div className="stack" style={{ gap: 10, maxWidth: 640, paddingTop: 32 }}><span className="kick">{d.faqKick}</span><h2 className="h2">{d.faqH}</h2></div>
          <div style={{ borderTop: '1px solid rgba(0,0,0,.08)' }}>
            {d.faq.map(([q, a], i) => (
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
