import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Icon, img, scrollTo } from '../components/ui.jsx'
import { ProductCard, useCart } from '../components/Shop.jsx'

const RB = ['#ED1C24', '#EE7D15', '#F7BE43', '#BDCF37', '#55B976', '#437E81', '#823967', '#A0586A']
const CATS = ['Dizajner', 'Muški', 'Ženski', 'Extra veličina', 'Dečiji', 'Unikatni pokloni', 'Rasprodaja']
const PRODUCTS = [
  { name: 'Majica po tvom dizajnu', cat: 'Dizajner', price: '690 RSD', img: 'creative-ai/cs-p0.webp', alt: 'Bela majica sa šarenom mačkom u naočarima', tag: 'Dizajniraj sam' },
  { name: 'Pamučna ženska majica', cat: 'Ženski', price: '553 RSD', img: 'creative-ai/cs-p1.webp', alt: 'Svetlosiva ženska pamučna majica' },
  { name: 'Esprit Single muška majica', cat: 'Muški', price: '990 RSD', img: 'creative-ai/cs-p2.webp', alt: 'Teget muška majica dugih rukava' },
  { name: 'Plišani Medo sa majicom za štampu', cat: 'Unikatni pokloni', price: '1.490 RSD', img: 'creative-ai/cs-p3.webp', alt: 'Plišani meda u beloj majici sa srcem' },
  { name: 'Vodeni ram sa vašom slikom', cat: 'Unikatni pokloni', price: '790 RSD', img: 'creative-ai/cs-p4.webp', alt: 'Akrilni vodeni ram sa porodičnom fotografijom i šljokicama' },
  { name: 'Boca sa navlakom', cat: 'Unikatni pokloni', price: '290 RSD', img: 'creative-ai/cs-p5.webp', alt: 'Bela boca za vodu sa tirkiznom navlakom' },
  { name: 'Ukrasna vreća za poklone', cat: 'Rasprodaja', price: '290 RSD', img: 'creative-ai/cs-p6.webp', alt: 'Lanena vrećica za poklone sa šarenim tačkicama' },
  { name: 'Šolja sa tvojom slikom', cat: 'Unikatni pokloni', price: '[cena] RSD', img: 'creative-ai/cs-p7.webp', alt: 'Bela šolja sa kolažom fotografija para' },
].map((p) => ({ ...p, img: img(p.img) }))
const STEPS = [
  ['Izaberi proizvod', 'Majica, duks, šolja, puzla, kačket…', RB[0], 'creative-ai/cs-step1.webp', 'Ruka bira između majice, šolje i kačketa'],
  ['Dodaj sliku ili tekst', 'U online dizajneru – vidiš kako izgleda pre poručivanja.', RB[2], 'creative-ai/cs-step2.webp', 'Laptop sa dizajnerom majice na ekranu'],
  ['Mi štampamo', 'Gotov proizvod šaljemo na adresu ili ga preuzimaš u Subotici.', RB[4], 'creative-ai/cs-step3.webp', 'Termo presa štampa šareni dizajn na majicu'],
]
const POSTS = [['Poklon koji razumete samo vas dvoje', RB[0], 'creative-ai/cs-blog1.webp', 'Dve šolje sa srcima i poklon'], ['Vodič za cozy dejtove kod kuće', RB[5], 'creative-ai/cs-blog2.webp', 'Puzla sa fotografijom, ćebe i šolje'], ['Strašne priče za plašljive kupce', RB[6], 'creative-ai/cs-blog3.webp', 'Crna majica sa duhom, čarapa i bundeva']]

export default function CreativeShop() {
  const pageRef = useRef(null)
  const { add, flyLayer, CartButton } = useCart(pageRef)
  return (
    <div className="page" data-brand="creative" ref={pageRef}>
      <div style={{ display: 'flex', height: 5 }}>{RB.map((c) => <span key={c} style={{ flex: 1, background: c }} />)}</div>
      <header className="nav" style={{ background: 'rgba(251,250,246,.75)' }}>
        <div className="wrap nav-row" style={{ height: 68 }}>
          <Link to="/creative-shop" aria-label="creativeshop.rs – početna" style={{ display: 'block', lineHeight: 0 }}><img src={`${import.meta.env.BASE_URL}logo/creativeshop-logo.svg`} alt="creativeshop.rs" style={{ height: 46, width: 'auto' }} /></Link>
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
              <img src={img('creative-ai/cs-hero.webp')} alt="Majica, duks, šolja, kačket, puzla i meda sa šarenim printovima na stolu" />
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
            {STEPS.map(([t, x, c, src, alt], i) => (
              <div key={t} className="card stack" style={{ overflow: 'hidden' }}>
                <img src={img(src)} alt={alt} loading="lazy" style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover' }} />
                <span className="stack" style={{ padding: '20px 26px 26px', gap: 12 }}>
                <span style={{ width: 44, height: 44, borderRadius: '50%', background: c, color: '#fff', fontSize: 18, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
                <span style={{ fontSize: 21, fontWeight: 700 }}>{t}</span>
                <span style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--muted)' }}>{x}</span>
              </span>
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

      <section id="novosti" className="sec" style={{ scrollMarginTop: 110 }}>
        <div className="wrap stack" style={{ gap: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 16, flexWrap: 'wrap' }}>
            <h2 className="h2">Novosti</h2>
            <span className="small" style={{ fontSize: 15 }}>Bodovi za kupce koji se vraćaju · Reklamacije i garancija</span>
          </div>
          <div className="g3">
            {POSTS.map(([t, c, src, alt]) => (
              <div key={t} className="card stack" style={{ overflow: 'hidden' }}>
                <img src={img(src)} alt={alt} loading="lazy" style={{ width: '100%', aspectRatio: '16 / 9', objectFit: 'cover' }} />
                <span style={{ height: 6, background: c }} />
                <span className="stack" style={{ padding: 22, gap: 8 }}><span style={{ fontSize: 12, color: 'var(--muted)' }}>Novosti</span><span style={{ fontSize: 19, fontWeight: 700, lineHeight: 1.3 }}>{t}</span></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="cs-foot">
        <div className="wrap">
          <div className="cs-foot-grid">
            <div className="cs-tile" style={{ background: '#BDCF37', color: '#3e3e3e' }}>
              <b>Kupovina</b>
              <a role="button" tabIndex={0} onClick={() => scrollTo('ponuda')}>Reklamacija i garancija</a>
              <a role="button" tabIndex={0} onClick={() => scrollTo('ponuda')}>Registracija</a>
              <a role="button" tabIndex={0} onClick={() => scrollTo('ponuda')}>Bodovanje za verne kupce</a>
            </div>
            <div className="cs-tile" style={{ background: '#437E81', color: '#fff' }}>
              <b>Kontaktirajte nas</b>
              <a href="tel:+38124533853">024/533-853</a>
              <a href="mailto:info@creativeshop.rs">info@creativeshop.rs</a>
              <span className="cs-social">Facebook · YouTube</span>
            </div>
            <div className="cs-tile" style={{ background: '#823967', color: '#fff' }}>
              <b>Plaćanje i isporuka</b>
              <a role="button" tabIndex={0} onClick={() => scrollTo('ponuda')}>Načini plaćanja</a>
              <a role="button" tabIndex={0} onClick={() => scrollTo('ponuda')}>Isporuka, naknade i uslovi</a>
              <a role="button" tabIndex={0} onClick={() => scrollTo('ponuda')}>Tabela veličina</a>
            </div>
            <div className="cs-tile" style={{ background: '#F7BE43', color: '#3e3e3e' }}>
              <b>Novosti</b>
              {POSTS.map(([t]) => <a key={t} role="button" tabIndex={0} onClick={() => scrollTo('novosti')}>{t}</a>)}
            </div>
            <div className="cs-tile cs-news" style={{ background: '#EE7D15', color: '#fff' }}>
              <b>Novi motivi na mejl</b>
              <span>Popusti i novi dizajni, jednom nedeljno.</span>
              <form onSubmit={(e) => e.preventDefault()}><input type="email" placeholder="Vaš e-mail" aria-label="E-mail za novosti" /><button type="submit">Prijavi me</button></form>
            </div>
          </div>
          <div className="cs-foot-bottom">
            <img src={`${import.meta.env.BASE_URL}logo/creativeshop-logo.svg`} alt="creativeshop.rs" style={{ height: 34, width: 'auto' }} />
            <span>© 2026 Creative Shop · deo Biromarket 024 d.o.o. · Prototip</span>
          </div>
        </div>
        <div style={{ display: 'flex', height: 6 }}>{RB.map((c) => <span key={c} style={{ flex: 1, background: c }} />)}</div>
      </footer>
      {flyLayer}
    </div>
  )
}
