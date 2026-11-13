import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Icon, img, scrollTo } from '../components/ui.jsx'
import { ProductCard, useCart } from '../components/Shop.jsx'

const RB = ['#ED1C24', '#EE7D15', '#F7BE43', '#BDCF37', '#55B976', '#437E81', '#823967', '#A0586A']
const CATS = ['Dizajner', 'Muški', 'Ženski', 'Extra veličina', 'Dečiji', 'Unikatni pokloni', 'Rasprodaja']
const PRODUCTS = [
  { name: 'Majica po tvom dizajnu', cat: 'Dizajner', price: '690 RSD', img: 'creative-majica-print.jpg', alt: 'Crna majica sa šarenim printom', tag: 'Dizajniraj sam' },
  { name: 'Pamučna ženska majica', cat: 'Ženski', price: '553 RSD', img: 'creative-zenska-majica.jpg', alt: 'Bela ženska majica' },
  { name: 'Esprit Single muška majica', cat: 'Muški', price: '990 RSD', img: 'creative-majice-slozene.jpg', alt: 'Složene majice u tri boje' },
  { name: 'Plišani Medo sa majicom za štampu', cat: 'Unikatni pokloni', price: '1.490 RSD', img: 'creative-meda.jpg', alt: 'Plišani meda na jastuku' },
  { name: 'Vodeni ram sa vašom slikom', cat: 'Unikatni pokloni', price: '790 RSD', img: 'creative-ramovi.jpg', alt: 'Ramovi sa fotografijama' },
  { name: 'Boca sa navlakom', cat: 'Unikatni pokloni', price: '290 RSD', img: 'creative-boce.jpg', alt: 'Bela i crna boca za vodu' },
  { name: 'Ukrasna vreća za poklone', cat: 'Rasprodaja', price: '290 RSD', img: 'creative-poklon-kese.jpg', alt: 'Šarene kese za poklone sa trakama' },
  { name: 'Šolja sa tvojom slikom', cat: 'Unikatni pokloni', price: '[cena] RSD', img: 'creative-solje.jpg', alt: 'Dve bele šolje sa natpisom' },
].map((p) => ({ ...p, img: img(p.img) }))
const STEPS = [
  ['Izaberi proizvod', 'Majica, duks, šolja, puzla, kačket…', RB[0]],
  ['Dodaj sliku ili tekst', 'U online dizajneru – vidiš kako izgleda pre poručivanja.', RB[2]],
  ['Mi štampamo', 'Gotov proizvod šaljemo na adresu ili ga preuzimaš u Subotici.', RB[4]],
]
const POSTS = [['Poklon koji razumete samo vas dvoje', RB[0]], ['Vodič za cozy dejtove kod kuće', RB[5]], ['Strašne priče za plašljive kupce', RB[6]]]

export default function CreativeShop() {
  const pageRef = useRef(null)
  const { add, flyLayer, CartButton } = useCart(pageRef)
  return (
    <div className="page" data-brand="creative" ref={pageRef}>
      <div style={{ display: 'flex', height: 5 }}>{RB.map((c) => <span key={c} style={{ flex: 1, background: c }} />)}</div>
      <header className="nav" style={{ background: 'rgba(251,250,246,.75)' }}>
        <div className="wrap nav-row" style={{ height: 68 }}>
          <Link to="/creative-shop" aria-label="Creative Shop" style={{ textDecoration: 'none', fontSize: 24, fontWeight: 900, letterSpacing: '-.02em', color: '#3e3e3e' }}>creativeshop<span style={{ color: '#ED1C24' }}>.rs</span></Link>
          <label className="search" style={{ maxWidth: 460 }}><Icon name="search" size={18} color="#6e6e73" stroke={2} /><input type="search" placeholder="npr. superman, mama, rođendan" aria-label="Pretraga motiva" /></label>
          <span style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <span className="cart"><Icon name="user" size={20} />Prijava</span>
            <CartButton icon="bag" />
          </span>
        </div>
        <div className="wrap" style={{ display: 'flex', gap: 28, overflowX: 'auto' }}>
          {CATS.map((n, i) => (
            <button key={n} onClick={() => scrollTo('ponuda')} style={{ background: 'none', border: 0, borderBottom: `3px solid ${RB[i]}`, color: '#3e3e3e', fontSize: 14, fontWeight: 500, padding: '12px 2px', whiteSpace: 'nowrap', cursor: 'pointer' }}>{n}</button>
          ))}
        </div>
      </header>

      <section style={{ padding: '48px 0 64px' }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 22 }}>
            <span style={{ alignSelf: 'flex-start', fontSize: 14, fontWeight: 700, color: '#fff', background: '#823967', borderRadius: 980, padding: '7px 14px' }}>Svaki mesec novi motivi</span>
            <h1 className="h1">Tvoja ideja.<br /><span style={{ color: '#ED1C24' }}>Na</span> <span style={{ color: '#EE7D15' }}>ma</span><span style={{ color: '#55B976' }}>ji</span><span style={{ color: '#437E81' }}>ci.</span></h1>
            <p className="lead" style={{ maxWidth: '34ch' }}>Majice, duksevi, šolje, puzle i kačketi sa tvojom slikom ili tekstom. Dizajniraj sam u online dizajneru – brzo i lako.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <button className="btn btn-red" onClick={() => scrollTo('ponuda')}>Otvori dizajner <Icon name="arrow" size={16} stroke={2.2} /></button>
              <button className="btn btn-glass" onClick={() => scrollTo('ponuda')}>Pogledaj ponudu</button>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <div className="photo" style={{ aspectRatio: '1 / 1', maxHeight: 560, boxShadow: '0 30px 60px -20px rgba(130,57,103,.35)' }}>
              <img src={img('bm-majice.jpg')} alt="Ručno oslikana majica na roze podlozi" />
            </div>
            <div className="glass float-card left" style={{ left: -24, bottom: 28, display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px' }}>
              <span style={{ display: 'flex', paddingLeft: 6 }}>{RB.slice(0, 5).map((c) => <span key={c} style={{ width: 22, height: 22, borderRadius: '50%', background: c, marginLeft: -6, boxShadow: '0 0 0 2px #fff' }} />)}</span>
              <span className="stack"><span style={{ fontSize: 13, color: 'var(--muted)' }}>Majica iz dizajnera</span><span style={{ fontSize: 17, fontWeight: 700 }}>od 690 RSD</span></span>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 16 }}>
        <div className="wrap stack" style={{ gap: 28 }}>
          <h2 className="h2">Kako radi dizajner</h2>
          <div className="g3">
            {STEPS.map(([t, x, c], i) => (
              <div key={t} className="card stack" style={{ padding: 26, gap: 12 }}>
                <span style={{ width: 44, height: 44, borderRadius: '50%', background: c, color: '#fff', fontSize: 18, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
                <span style={{ fontSize: 21, fontWeight: 700 }}>{t}</span>
                <span style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--muted)' }}>{x}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="ponuda" className="sec sec-white" style={{ scrollMarginTop: 110 }}>
        <div className="wrap stack" style={{ gap: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 16, flexWrap: 'wrap' }}>
            <h2 className="h2">Akcija i novo</h2>
            <span style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{CATS.slice(1, 6).map((n, i) => <span key={n} className="chip" style={{ boxShadow: `inset 0 -2px 0 ${RB[i]}` }}>{n}</span>)}</span>
          </div>
          <div className="g4">{PRODUCTS.map((p) => <ProductCard key={p.name} p={p} onAdd={add} dark="#3e3e3e" />)}</div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap stack" style={{ gap: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 16, flexWrap: 'wrap' }}>
            <h2 className="h2">Novosti</h2>
            <span className="small" style={{ fontSize: 15 }}>Bodovi za kupce koji se vraćaju · Reklamacije i garancija</span>
          </div>
          <div className="g3">
            {POSTS.map(([t, c]) => (
              <div key={t} className="card stack" style={{ overflow: 'hidden' }}>
                <span style={{ height: 10, background: c }} />
                <span className="stack" style={{ padding: 22, gap: 8 }}><span style={{ fontSize: 12, color: 'var(--muted)' }}>Novosti</span><span style={{ fontSize: 19, fontWeight: 700, lineHeight: 1.3 }}>{t}</span></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer style={{ background: '#3e3e3e', color: '#e8e8ed', padding: '32px 0', fontSize: 13 }}>
        <div className="wrap" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 }}>
          <span>Creative Shop · deo Biromarket 024 d.o.o. · 024/533-853 · info@creativeshop.rs</span>
          <Link to="/" style={{ color: '#e8e8ed', textDecoration: 'none' }}>biromarket024.rs</Link>
        </div>
      </footer>
      {flyLayer}
    </div>
  )
}
