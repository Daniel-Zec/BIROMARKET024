import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Nav, Footer, Icon, img, scrollTo } from '../components/ui.jsx'
import { ProductCard, useCart } from '../components/Shop.jsx'
import { useLang } from '../i18n.jsx'

const CAT_IMG = [['#eef3fb', 'kancelarija-ai/km-p0.webp'], ['#fdf0ec', 'kancelarija-ai/km-p1.webp'], ['#eef7f1', 'kancelarija-ai/km-p2.webp'], ['#f5effa', 'kancelarija-ai/km-p3.webp'], ['#fff6e5', 'kancelarija-ai/km-p4.webp'], ['#eef1f5', 'kancelarija-ai/km-p5.webp'], ['#fbeef3', 'kancelarija-ai/km-p6.webp'], ['#edf6f7', 'kancelarija-ai/km-p7.webp']]
const PROD_IMG = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => `kancelarija-ai/km-p${i}.webp`)
const PROD_CAT = [0, 1, 2, 3, 4, 5, 6, 0]
const PERK_IC = ['invoice', 'truck', 'repeat', 'home']
const D = {
  sr: {
    cats: ['Papir', 'Registratori', 'Pisanje', 'Heftalice', 'Koverte', 'Toneri', 'Fascikle', 'Blokčići'],
    products: [['Fotokopir papir A4, 80 g, 500 listova', 'Ris belog A4 papira'], ['Registrator A4, široka leđa 75 mm', 'Tri registratora: grafit, siva i crvena'], ['Hemijska olovka, plava, 10 kom', 'Deset plavih hemijskih olovaka'], ['Heftalica 24/6, do 25 listova', 'Crvena heftalica sa spajalicama'], ['Koverte B5, samolepljive, 50 kom', 'Bele samolepljive koverte'], ['Clover toner, visok kapacitet', 'Crna toner kaseta sa kutijom'], ['Fascikla sa mehanizmom, 10 kom', 'Fascikle sa mehanizmom u sivoj i crvenoj'], ['Samolepljivi blokčići 76×76', 'Samolepljivi blokčići']],
    price: '[cena] RSD',
    perks: [['Plaćanje na račun firme', 'Predračun i plaćanje virmanom.'], ['Dostava po Subotici', 'I u Bačku Topolu, Sombor, Kikindu i Sentu.'], ['Ponovi porudžbinu', 'Isti spisak kao prošlog meseca – jednim klikom.'], ['Preuzimanje u magacinu', 'Harambašićeva 14, Subotica.']],
    title: 'Prodavnica kancelarijskog materijala', search: 'Pretraži papir, registratore, tonere…', searchAria: 'Pretraga proizvoda', account: 'Moj nalog',
    kick: 'Kancelarijski materijal', h1a: 'Sve za kancelariju.', h1b: 'Na račun firme.', lead: 'Papir, registratori, pribor i toneri iz našeg magacina u Subotici. Naručite online – preuzmite u magacinu ili sačekajte dostavu.',
    browse: 'Pogledaj ponudu', companyAcc: 'Otvori nalog za firmu', heroAlt: 'Uredan radni sto: papir, registrator, crvena heftalica, olovke i blokčići', forCo: 'Za firme', wire: 'Plaćanje virmanom',
    popular: 'Najčešće naručujemo', pricesNote: 'Cene ubacujemo iz vašeg cenovnika',
  },
  hu: {
    cats: ['Papír', 'Iratrendezők', 'Íróeszközök', 'Tűzőgépek', 'Borítékok', 'Tonerek', 'Mappák', 'Jegyzettömbök'],
    products: [['Fénymásolópapír A4, 80 g, 500 lap', 'Egy csomag fehér A4-es papír'], ['Iratrendező A4, 75 mm-es gerinc', 'Három iratrendező: grafit, szürke és piros'], ['Golyóstoll, kék, 10 db', 'Tíz kék golyóstoll'], ['Tűzőgép 24/6, max. 25 lap', 'Piros tűzőgép kapcsokkal'], ['Boríték B5, öntapadós, 50 db', 'Fehér öntapadós borítékok'], ['Clover toner, nagy kapacitású', 'Fekete tonerkazetta dobozzal'], ['Gyorsfűző mappa, 10 db', 'Gyorsfűző mappák szürkében és pirosban'], ['Öntapadós jegyzettömb 76×76', 'Öntapadós jegyzettömbök']],
    price: '[ár] RSD',
    perks: [['Fizetés céges számlára', 'Előlegszámla és átutalás.'], ['Kiszállítás Szabadkán', 'Topolyára, Zomborba, Nagykikindára és Zentára is.'], ['Rendelés megismétlése', 'Ugyanaz a lista, mint a múlt hónapban – egy kattintással.'], ['Átvétel a raktárban', 'Harambašićeva 14, Szabadka.']],
    title: 'Irodaszer webáruház', search: 'Keressen papírt, iratrendezőt, tonert…', searchAria: 'Termékkeresés', account: 'Fiókom',
    kick: 'Irodaszer', h1a: 'Minden az irodába.', h1b: 'Céges számlára.', lead: 'Papír, iratrendezők, írószerek és tonerek szabadkai raktárunkból. Rendeljen online – vegye át a raktárban, vagy várja a kiszállítást.',
    browse: 'Kínálat megtekintése', companyAcc: 'Céges fiók nyitása', heroAlt: 'Rendezett íróasztal: papír, iratrendező, piros tűzőgép, tollak és jegyzettömbök', forCo: 'Cégeknek', wire: 'Fizetés átutalással',
    popular: 'Legnépszerűbb termékek', pricesNote: 'Az árakat az Önök árlistájából töltjük be',
  },
  en: {
    cats: ['Paper', 'Binders', 'Writing', 'Staplers', 'Envelopes', 'Toners', 'Folders', 'Sticky notes'],
    products: [['Copy paper A4, 80 g, 500 sheets', 'A ream of white A4 paper'], ['Lever arch file A4, 75 mm spine', 'Three binders: graphite, grey and red'], ['Ballpoint pen, blue, 10 pcs', 'Ten blue ballpoint pens'], ['Stapler 24/6, up to 25 sheets', 'Red stapler with staples'], ['Envelopes B5, self-seal, 50 pcs', 'White self-seal envelopes'], ['Clover toner, high capacity', 'Black toner cartridge with box'], ['Clip folder, 10 pcs', 'Clip folders in grey and red'], ['Sticky notes 76×76', 'Sticky notes']],
    price: '[price] RSD',
    perks: [['Pay by company invoice', 'Pro forma invoice and bank transfer.'], ['Delivery in Subotica', 'Also to Bačka Topola, Sombor, Kikinda and Senta.'], ['Repeat an order', "Same list as last month – in one click."], ['Pick up at the warehouse', 'Harambašićeva 14, Subotica.']],
    title: 'Office supplies shop', search: 'Search paper, binders, toners…', searchAria: 'Product search', account: 'My account',
    kick: 'Office supplies', h1a: 'Everything for the office.', h1b: 'On company invoice.', lead: 'Paper, binders, supplies and toners from our warehouse in Subotica. Order online – pick up at the warehouse or wait for delivery.',
    browse: 'Browse products', companyAcc: 'Open a company account', heroAlt: 'Tidy desk: paper, binder, red stapler, pens and sticky notes', forCo: 'For companies', wire: 'Pay by bank transfer',
    popular: 'Most ordered', pricesNote: 'Prices will come from your price list',
  },
}

export default function Kancelarija() {
  const pageRef = useRef(null)
  const { add, flyLayer, CartButton } = useCart(pageRef)
  const { tr } = useLang()
  const d = tr(D)
  const PRODUCTS = d.products.map(([name, alt], i) => ({ name, alt, cat: d.cats[PROD_CAT[i]], img: img(PROD_IMG[i]), price: d.price }))
  return (
    <div className="page" ref={pageRef}>
      <Nav />
      <div className="shopbar">
        <div className="wrap shopbar-row">
          <span className="shopbar-title"><Icon name="cart" size={18} stroke={2} /> {d.title}</span>
          <label className="search"><Icon name="search" size={18} color="#6e6e73" stroke={2} /><input type="search" placeholder={d.search} aria-label={d.searchAria} /></label>
          <span style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <span className="cart"><Icon name="user" size={20} />{d.account}</span>
            <CartButton />
          </span>
        </div>
      </div>

      <section style={{ padding: '36px 0 24px' }}>
        <div className="wrap">
          <div className="card split" style={{ gap: 0, borderRadius: 32, overflow: 'hidden', alignItems: 'stretch' }}>
            <div className="stack" style={{ padding: 'clamp(28px,4vw,56px)', gap: 20 }}>
              <span className="kick">{d.kick}</span>
              <h1 className="h1" style={{ fontSize: 'clamp(36px,4.2vw,58px)' }}>{d.h1a}<br /><span className="muted">{d.h1b}</span></h1>
              <p className="lead" style={{ fontSize: 18, maxWidth: '38ch' }}>{d.lead}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <button className="btn btn-red" style={{ fontSize: 16, padding: '14px 24px' }} onClick={() => scrollTo('proizvodi')}>{d.browse} <Icon name="arrow" size={16} stroke={2.2} /></button>
                <span className="btn btn-glass" style={{ fontSize: 16, padding: '14px 24px' }}>{d.companyAcc}</span>
              </div>
            </div>
            <div style={{ position: 'relative', minHeight: 360 }}>
              <img src={img('kancelarija-ai/km-hero.webp')} alt={d.heroAlt} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div className="glass" style={{ position: 'absolute', right: 20, bottom: 20, borderRadius: 18, padding: '14px 16px' }}>
                <span style={{ fontSize: 13, color: 'var(--muted)', display: 'block' }}>{d.forCo}</span>
                <span style={{ fontSize: 16, fontWeight: 700 }}>{d.wire}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '32px 0' }}>
        <div className="wrap cats">
          {CAT_IMG.map(([bg, src], i) => [d.cats[i], bg, src]).map(([n, bg, src]) => (
            <button key={n} className="cat" onClick={() => scrollTo('proizvodi')}>
              <span className="c" style={{ background: bg, overflow: 'hidden' }}><img src={img(src)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></span>{n}
            </button>
          ))}
        </div>
      </section>

      <section id="proizvodi" className="sec" style={{ paddingTop: 40, scrollMarginTop: 72 }}>
        <div className="wrap stack" style={{ gap: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 16, flexWrap: 'wrap' }}>
            <h2 className="h2" style={{ fontSize: 'clamp(28px,3vw,40px)' }}>{d.popular}</h2>
            <span className="small" style={{ fontSize: 15 }}>{d.pricesNote}</span>
          </div>
          <div className="g4">{PRODUCTS.map((p) => <ProductCard key={p.name} p={p} onAdd={add} />)}</div>
        </div>
      </section>

      <section className="sec sec-white">
        <div className="wrap g4">
          {d.perks.map(([t, x], i) => [PERK_IC[i], t, x]).map(([ic, t, x]) => (
            <div key={t} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <span className="ico" style={{ background: 'var(--bg)' }}><Icon name={ic} /></span>
              <span className="stack" style={{ gap: 2 }}><span style={{ fontSize: 16, fontWeight: 700 }}>{t}</span><span className="small">{x}</span></span>
            </div>
          ))}
        </div>
      </section>
      <Footer />
      {flyLayer}
    </div>
  )
}
