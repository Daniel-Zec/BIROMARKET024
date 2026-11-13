import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Footer, Icon, img, scrollTo } from '../components/ui.jsx'
import { ProductCard, useCart } from '../components/Shop.jsx'

const CATS = [
  ['Papir', '#eef3fb', 'kancelarija-ai/km-p0.webp'],
  ['Registratori', '#fdf0ec', 'kancelarija-ai/km-p1.webp'],
  ['Pisanje', '#eef7f1', 'kancelarija-ai/km-p2.webp'],
  ['Heftalice', '#f5effa', 'kancelarija-ai/km-p3.webp'],
  ['Koverte', '#fff6e5', 'kancelarija-ai/km-p4.webp'],
  ['Toneri', '#eef1f5', 'kancelarija-ai/km-p5.webp'],
  ['Fascikle', '#fbeef3', 'kancelarija-ai/km-p6.webp'],
  ['Blokčići', '#edf6f7', 'kancelarija-ai/km-p7.webp'],
]
const PRODUCTS = [
  { name: 'Fotokopir papir A4, 80 g, 500 listova', cat: 'Papir', img: 'kancelarija-ai/km-p0.webp', alt: 'Ris belog A4 papira' },
  { name: 'Registrator A4, široka leđa 75 mm', cat: 'Registratori', img: 'kancelarija-ai/km-p1.webp', alt: 'Tri registratora: grafit, siva i crvena' },
  { name: 'Hemijska olovka, plava, 10 kom', cat: 'Pisanje', img: 'kancelarija-ai/km-p2.webp', alt: 'Deset plavih hemijskih olovaka' },
  { name: 'Heftalica 24/6, do 25 listova', cat: 'Heftalice', img: 'kancelarija-ai/km-p3.webp', alt: 'Crvena heftalica sa spajalicama' },
  { name: 'Koverte B5, samolepljive, 50 kom', cat: 'Koverte', img: 'kancelarija-ai/km-p4.webp', alt: 'Bele samolepljive koverte' },
  { name: 'Clover toner, visok kapacitet', cat: 'Toneri', img: 'kancelarija-ai/km-p5.webp', alt: 'Crna toner kaseta sa kutijom' },
  { name: 'Fascikla sa mehanizmom, 10 kom', cat: 'Fascikle', img: 'kancelarija-ai/km-p6.webp', alt: 'Fascikle sa mehanizmom u sivoj i crvenoj' },
  { name: 'Samolepljivi blokčići 76×76', cat: 'Papir', img: 'kancelarija-ai/km-p7.webp', alt: 'Samolepljivi blokčići' },
].map((p) => ({ ...p, img: img(p.img), price: '[cena] RSD' }))
const PERKS = [
  ['invoice', 'Plaćanje na račun firme', 'Predračun i plaćanje virmanom.'],
  ['truck', 'Dostava po Subotici', 'I u Bačku Topolu, Sombor, Kikindu i Sentu.'],
  ['repeat', 'Ponovi porudžbinu', 'Isti spisak kao prošlog meseca – jednim klikom.'],
  ['home', 'Preuzimanje u magacinu', 'Harambašićeva 14, Subotica.'],
]

export default function Kancelarija() {
  const pageRef = useRef(null)
  const { add, flyLayer, CartButton } = useCart(pageRef)
  return (
    <div className="page" ref={pageRef}>
      <div style={{ background: '#1d1d1f', color: '#f5f5f7', fontSize: 13 }}>
        <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '8px 32px', flexWrap: 'wrap' }}>
          <Link to="/" style={{ color: '#f5f5f7', textDecoration: 'none' }}>← biromarket024.rs</Link>
          <span>Plaćanje na račun firme · Dostava po Subotici i okolini</span>
        </div>
      </div>
      <header className="nav">
        <div className="wrap nav-row" style={{ height: 72 }}>
          <Link to="/kancelarija" aria-label="Biromarket 024 prodavnica" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <img src={`${import.meta.env.BASE_URL}logo/biromarket-024-logo.svg`} alt="Biromarket 024" style={{ height: 30, width: 'auto', display: 'block' }} /><span style={{ fontSize: 13, fontWeight: 500, color: 'var(--muted)', borderLeft: '1px solid rgba(0,0,0,.12)', paddingLeft: 10 }}>Prodavnica</span>
          </Link>
          <label className="search"><Icon name="search" size={18} color="#6e6e73" stroke={2} /><input type="search" placeholder="Pretraži papir, registratore, tonere…" aria-label="Pretraga proizvoda" /></label>
          <span style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <span className="cart"><Icon name="user" size={20} />Moj nalog</span>
            <CartButton />
          </span>
        </div>
      </header>

      <section style={{ padding: '36px 0 24px' }}>
        <div className="wrap">
          <div className="card split" style={{ gap: 0, borderRadius: 32, overflow: 'hidden', alignItems: 'stretch' }}>
            <div className="stack" style={{ padding: 'clamp(28px,4vw,56px)', gap: 20 }}>
              <span className="kick">Kancelarijski materijal</span>
              <h1 className="h1" style={{ fontSize: 'clamp(36px,4.2vw,58px)' }}>Sve za kancelariju.<br /><span className="muted">Na račun firme.</span></h1>
              <p className="lead" style={{ fontSize: 18, maxWidth: '38ch' }}>Papir, registratori, pribor i toneri iz našeg magacina u Subotici. Naručite online – preuzmite u magacinu ili sačekajte dostavu.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <button className="btn btn-red" style={{ fontSize: 16, padding: '14px 24px' }} onClick={() => scrollTo('proizvodi')}>Pogledaj ponudu <Icon name="arrow" size={16} stroke={2.2} /></button>
                <span className="btn btn-glass" style={{ fontSize: 16, padding: '14px 24px' }}>Otvori nalog za firmu</span>
              </div>
            </div>
            <div style={{ position: 'relative', minHeight: 360 }}>
              <img src={img('kancelarija-ai/km-hero.webp')} alt="Uredan radni sto: papir, registrator, crvena heftalica, olovke i blokčići" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div className="glass" style={{ position: 'absolute', right: 20, bottom: 20, borderRadius: 18, padding: '14px 16px' }}>
                <span style={{ fontSize: 13, color: 'var(--muted)', display: 'block' }}>Za firme</span>
                <span style={{ fontSize: 16, fontWeight: 700 }}>Plaćanje virmanom</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '32px 0' }}>
        <div className="wrap cats">
          {CATS.map(([n, bg, src]) => (
            <button key={n} className="cat" onClick={() => scrollTo('proizvodi')}>
              <span className="c" style={{ background: bg, overflow: 'hidden' }}><img src={img(src)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></span>{n}
            </button>
          ))}
        </div>
      </section>

      <section id="proizvodi" className="sec" style={{ paddingTop: 40, scrollMarginTop: 72 }}>
        <div className="wrap stack" style={{ gap: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 16, flexWrap: 'wrap' }}>
            <h2 className="h2" style={{ fontSize: 'clamp(28px,3vw,40px)' }}>Najčešće naručujemo</h2>
            <span className="small" style={{ fontSize: 15 }}>Cene ubacujemo iz vašeg cenovnika</span>
          </div>
          <div className="g4">{PRODUCTS.map((p) => <ProductCard key={p.name} p={p} onAdd={add} />)}</div>
        </div>
      </section>

      <section className="sec sec-white">
        <div className="wrap g4">
          {PERKS.map(([ic, t, x]) => (
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
