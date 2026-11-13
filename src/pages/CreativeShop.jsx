import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon, img, scrollTo } from '../components/ui.jsx'
import { ProductCard, useCart } from '../components/Shop.jsx'
import { useLang, LangSwitch } from '../i18n.jsx'

const RB = ['#ED1C24', '#EE7D15', '#F7BE43', '#BDCF37', '#55B976', '#437E81', '#823967', '#A0586A']
const P_BASE = [
  { price: '690 RSD', img: 'creative-ai/cs-p0.webp', cat: 0, tag: true }, { price: '553 RSD', img: 'creative-ai/cs-p1.webp', cat: 2 },
  { price: '990 RSD', img: 'creative-ai/cs-p2.webp', cat: 1 }, { price: '1.490 RSD', img: 'creative-ai/cs-p3.webp', cat: 5 },
  { price: '790 RSD', img: 'creative-ai/cs-p4.webp', cat: 5 }, { price: '290 RSD', img: 'creative-ai/cs-p5.webp', cat: 5 },
  { price: '290 RSD', img: 'creative-ai/cs-p6.webp', cat: 6 }, { price: null, img: 'creative-ai/cs-p7.webp', cat: 5 },
]
const STEP_BASE = [[RB[0], 'creative-ai/cs-step1.webp'], [RB[2], 'creative-ai/cs-step2.webp'], [RB[4], 'creative-ai/cs-step3.webp']]
const POST_BASE = [[RB[0], 'creative-ai/cs-blog1.webp'], [RB[5], 'creative-ai/cs-blog2.webp'], [RB[6], 'creative-ai/cs-blog3.webp']]
const H1C = ['#ED1C24', '#EE7D15', '#55B976', '#437E81']

const D = {
  sr: {
    cats: ['Dizajner', 'Muški', 'Ženski', 'Extra veličina', 'Dečiji', 'Unikatni pokloni', 'Rasprodaja'],
    products: [['Majica po tvom dizajnu', 'Bela majica sa šarenom mačkom u naočarima'], ['Pamučna ženska majica', 'Svetlosiva ženska pamučna majica'], ['Esprit Single muška majica', 'Teget muška majica dugih rukava'], ['Plišani Medo sa majicom za štampu', 'Plišani meda u beloj majici sa srcem'], ['Vodeni ram sa vašom slikom', 'Akrilni vodeni ram sa porodičnom fotografijom i šljokicama'], ['Boca sa navlakom', 'Bela boca za vodu sa tirkiznom navlakom'], ['Ukrasna vreća za poklone', 'Lanena vrećica za poklone sa šarenim tačkicama'], ['Šolja sa tvojom slikom', 'Bela šolja sa kolažom fotografija para']],
    tag: 'Dizajniraj sam', noPrice: '[cena] RSD',
    steps: [['Izaberi proizvod', 'Majica, duks, šolja, puzla, kačket…', 'Ruka bira između majice, šolje i kačketa'], ['Dodaj sliku ili tekst', 'U online dizajneru – vidiš kako izgleda pre poručivanja.', 'Laptop sa dizajnerom majice na ekranu'], ['Mi štampamo', 'Gotov proizvod šaljemo na adresu ili ga preuzimaš u Subotici.', 'Termo presa štampa šareni dizajn na majicu']],
    posts: [['Poklon koji razumete samo vas dvoje', 'Dve šolje sa srcima i poklon'], ['Vodič za cozy dejtove kod kuće', 'Puzla sa fotografijom, ćebe i šolje'], ['Strašne priče za plašljive kupce', 'Crna majica sa duhom, čarapa i bundeva']],
    home: 'creativeshop.rs – početna', searchPh: 'npr. superman, mama, rođendan', searchAria: 'Pretraga motiva', login: 'Prijava', toBm: 'Idi na Biromarket 024',
    badge: 'Svaki mesec novi motivi', h1a: 'Tvoja ideja.', h1b: ['Na ', 'ma', 'ji', 'ci.'], lead: 'Majice, duksevi, šolje, puzle i kačketi sa tvojom slikom ili tekstom. Dizajniraj sam u online dizajneru – brzo i lako.',
    openDesigner: 'Otvori dizajner', browse: 'Pogledaj ponudu', heroAlt: 'Majica, duks, šolja, kačket, puzla i meda sa šarenim printovima na stolu', fromLabel: 'Majica iz dizajnera', from: 'od 690 RSD',
    howH: 'Kako radi dizajner', offerH: 'Akcija i novo', newsH: 'Novosti', newsNote: 'Bodovi za kupce koji se vraćaju · Reklamacije i garancija', newsTag: 'Novosti',
    f: { buy: 'Kupovina', buyL: ['Reklamacija i garancija', 'Registracija', 'Bodovanje za verne kupce'], contact: 'Kontaktirajte nas', pay: 'Plaćanje i isporuka', payL: ['Načini plaćanja', 'Isporuka, naknade i uslovi', 'Tabela veličina'], news: 'Novosti', nl: 'Novi motivi na mejl', nlText: 'Popusti i novi dizajni, jednom nedeljno.', email: 'Vaš e-mail', emailAria: 'E-mail za novosti', join: 'Prijavi me', part: 'deo', proto: 'Prototip' },
  },
  hu: {
    cats: ['Tervező', 'Férfi', 'Női', 'Extra méret', 'Gyerek', 'Egyedi ajándékok', 'Kiárusítás'],
    products: [['Póló saját tervvel', 'Fehér póló színes, napszemüveges macskával'], ['Női pamutpóló', 'Világosszürke női pamutpóló'], ['Esprit Single férfi póló', 'Sötétkék hosszú ujjú férfi póló'], ['Plüssmaci nyomtatható pólóval', 'Plüssmaci fehér pólóban szívvel'], ['Vizes képkeret saját fotóval', 'Akril vizes képkeret családi fotóval és csillámmal'], ['Kulacs huzattal', 'Fehér kulacs türkiz huzattal'], ['Díszes ajándékzsák', 'Lenvászon ajándékzsák színes pöttyökkel'], ['Bögre saját fotóval', 'Fehér bögre egy pár fotókollázsával']],
    tag: 'Tervezd meg', noPrice: '[ár] RSD',
    steps: [['Válassz terméket', 'Póló, pulóver, bögre, puzzle, sapka…', 'Egy kéz választ a póló, a bögre és a sapka közül'], ['Adj hozzá képet vagy szöveget', 'Az online tervezőben – rendelés előtt látod, hogy fog kinézni.', 'Laptop pólótervezővel a képernyőn'], ['Mi kinyomtatjuk', 'A kész terméket házhoz küldjük, vagy átveheted Szabadkán.', 'Hőprés színes mintát nyom egy pólóra']],
    posts: [['Ajándék, amit csak ti ketten értetek', 'Két szíves bögre és egy ajándék'], ['Útmutató otthoni, meghitt randikhoz', 'Fotós puzzle, takaró és bögrék'], ['Ijesztő történetek félénk vásárlóknak', 'Fekete póló szellemmel, zokni és tök']],
    home: 'creativeshop.rs – főoldal', searchPh: 'pl. superman, anya, születésnap', searchAria: 'Motívum keresése', login: 'Belépés', toBm: 'Tovább a Biromarket 024-re',
    badge: 'Minden hónapban új motívumok', h1a: 'A te ötleted.', h1b: ['A ', 'pó', 'ló', 'don.'], lead: 'Pólók, pulóverek, bögrék, puzzle-k és sapkák a saját képeddel vagy szövegeddel. Tervezd meg magad az online tervezőben – gyorsan és egyszerűen.',
    openDesigner: 'Tervező megnyitása', browse: 'Kínálat megtekintése', heroAlt: 'Póló, pulóver, bögre, sapka, puzzle és maci színes mintákkal az asztalon', fromLabel: 'Póló a tervezőből', from: '690 RSD-től',
    howH: 'Így működik a tervező', offerH: 'Akciók és újdonságok', newsH: 'Hírek', newsNote: 'Pontok visszatérő vásárlóknak · Reklamáció és garancia', newsTag: 'Hírek',
    f: { buy: 'Vásárlás', buyL: ['Reklamáció és garancia', 'Regisztráció', 'Hűségpontok'], contact: 'Lépj kapcsolatba velünk', pay: 'Fizetés és szállítás', payL: ['Fizetési módok', 'Szállítás, díjak és feltételek', 'Mérettáblázat'], news: 'Hírek', nl: 'Új motívumok e-mailben', nlText: 'Kedvezmények és új minták, hetente egyszer.', email: 'Az e-mail címed', emailAria: 'E-mail a hírlevélhez', join: 'Feliratkozom', part: 'a', proto: 'Prototípus', partSuffix: 'része' },
  },
  en: {
    cats: ['Designer', 'Men', 'Women', 'Plus size', 'Kids', 'Unique gifts', 'Sale'],
    products: [['T-shirt with your design', 'White T-shirt with a colorful cat in sunglasses'], ["Women's cotton T-shirt", "Light grey women's cotton T-shirt"], ["Esprit Single men's T-shirt", "Navy long-sleeve men's T-shirt"], ['Teddy bear with a printable shirt', 'Teddy bear in a white shirt with a heart'], ['Water frame with your photo', 'Acrylic water frame with a family photo and glitter'], ['Bottle with a sleeve', 'White water bottle with a turquoise sleeve'], ['Decorative gift bag', 'Linen gift bag with colorful dots'], ['Mug with your photo', 'White mug with a photo collage of a couple']],
    tag: 'Design it yourself', noPrice: '[price] RSD',
    steps: [['Choose a product', 'T-shirt, hoodie, mug, puzzle, cap…', 'A hand choosing between a T-shirt, a mug and a cap'], ['Add a photo or text', 'In the online designer – see how it looks before you order.', 'Laptop showing the T-shirt designer'], ['We print it', 'We ship the finished product to you, or pick it up in Subotica.', 'Heat press printing a colorful design on a T-shirt']],
    posts: [['A gift only the two of you understand', 'Two mugs with hearts and a gift'], ['A guide to cozy dates at home', 'Photo puzzle, blanket and mugs'], ['Scary stories for timid shoppers', 'Black T-shirt with a ghost, a sock and a pumpkin']],
    home: 'creativeshop.rs – home', searchPh: 'e.g. superman, mom, birthday', searchAria: 'Search designs', login: 'Sign in', toBm: 'Go to Biromarket 024',
    badge: 'New designs every month', h1a: 'Your idea.', h1b: ['On a ', 'T-', 'sh', 'irt.'], lead: 'T-shirts, hoodies, mugs, puzzles and caps with your own photo or text. Design it yourself in the online designer – quick and easy.',
    openDesigner: 'Open the designer', browse: 'Browse products', heroAlt: 'T-shirt, hoodie, mug, cap, puzzle and teddy bear with colorful prints on a table', fromLabel: 'T-shirt from the designer', from: 'from 690 RSD',
    howH: 'How the designer works', offerH: 'Deals and new arrivals', newsH: 'News', newsNote: 'Points for returning customers · Returns and warranty', newsTag: 'News',
    f: { buy: 'Shopping', buyL: ['Returns and warranty', 'Registration', 'Loyalty points'], contact: 'Contact us', pay: 'Payment and delivery', payL: ['Payment methods', 'Delivery, fees and terms', 'Size chart'], news: 'News', nl: 'New designs by e-mail', nlText: 'Discounts and new designs, once a week.', email: 'Your e-mail', emailAria: 'E-mail for news', join: 'Sign me up', part: 'part of', proto: 'Prototype' },
  },
}

export default function CreativeShop() {
  const navigate = useNavigate()
  const pageRef = useRef(null)
  const { add, flyLayer, CartButton } = useCart(pageRef)
  const { tr } = useLang()
  const d = tr(D)
  const CATS = d.cats
  const PRODUCTS = P_BASE.map((b, i) => ({ name: d.products[i][0], alt: d.products[i][1], cat: d.cats[b.cat], price: b.price || d.noPrice, img: img(b.img), tag: b.tag ? d.tag : undefined }))
  const STEPS = STEP_BASE.map(([c, src], i) => [d.steps[i][0], d.steps[i][1], c, src, d.steps[i][2]])
  const POSTS = POST_BASE.map(([c, src], i) => [d.posts[i][0], c, src, d.posts[i][1]])
  return (
    <div className="page" data-brand="creative" ref={pageRef}>
      <div style={{ display: 'flex', height: 5 }}>{RB.map((c) => <span key={c} style={{ flex: 1, background: c }} />)}</div>
      <header className="nav" style={{ background: 'rgba(251,250,246,.75)' }}>
        <div className="wrap nav-row" style={{ height: 68 }}>
          <Link to="/creative-shop" aria-label={d.home} style={{ display: 'block', lineHeight: 0 }}><img src={`${import.meta.env.BASE_URL}logo/creativeshop-logo.svg`} alt="creativeshop.rs" style={{ height: 46, width: 'auto' }} /></Link>
          <label className="search" style={{ maxWidth: 460 }}><Icon name="search" size={18} color="#6e6e73" stroke={2} /><input type="search" placeholder={d.searchPh} aria-label={d.searchAria} /></label>
          <span style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <span className="cart"><Icon name="user" size={20} />{d.login}</span>
            <CartButton icon="bag" />
            <LangSwitch />
          </span>
        </div>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', gap: 28, overflowX: 'auto' }}>
          {CATS.map((n, i) => (
            <button key={n} onClick={() => (i === 0 ? navigate('/creative-shop/dizajner') : scrollTo('ponuda'))} style={{ background: 'none', border: 0, borderBottom: `3px solid ${RB[i]}`, color: '#3e3e3e', fontSize: 14, fontWeight: 500, padding: '12px 2px', whiteSpace: 'nowrap', cursor: 'pointer' }}>{n}</button>
          ))}
          <Link to="/" className="cs-to-bm" aria-label={d.toBm}>
            <img src={`${import.meta.env.BASE_URL}logo/biromarket-024-logo.svg`} alt="" style={{ height: 19, width: 'auto' }} />
            <span>↗</span>
          </Link>
        </div>
      </header>

      <section style={{ padding: '48px 0 64px' }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 22 }}>
            <span style={{ alignSelf: 'flex-start', fontSize: 14, fontWeight: 700, color: '#fff', background: '#823967', borderRadius: 980, padding: '7px 14px' }}>{d.badge}</span>
            <h1 className="h1">{d.h1a}<br />{d.h1b.map((p, i) => <span key={i} style={{ color: H1C[i], whiteSpace: 'pre' }}>{p}</span>)}</h1>
            <p className="lead" style={{ maxWidth: '34ch' }}>{d.lead}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <Link to="/creative-shop/dizajner" className="btn btn-red">{d.openDesigner} <Icon name="arrow" size={16} stroke={2.2} /></Link>
              <button className="btn btn-glass" onClick={() => scrollTo('ponuda')}>{d.browse}</button>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <div className="photo" style={{ aspectRatio: '1 / 1', maxHeight: 560, boxShadow: '0 30px 60px -20px rgba(130,57,103,.35)' }}>
              <img src={img('creative-ai/cs-hero.webp')} alt={d.heroAlt} />
            </div>
            <div className="glass float-card left" style={{ left: -24, bottom: 28, display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px' }}>
              <span style={{ display: 'flex', paddingLeft: 6 }}>{RB.slice(0, 5).map((c) => <span key={c} style={{ width: 22, height: 22, borderRadius: '50%', background: c, marginLeft: -6, boxShadow: '0 0 0 2px #fff' }} />)}</span>
              <span className="stack"><span style={{ fontSize: 13, color: 'var(--muted)' }}>{d.fromLabel}</span><span style={{ fontSize: 17, fontWeight: 700 }}>{d.from}</span></span>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 16 }}>
        <div className="wrap stack" style={{ gap: 28 }}>
          <h2 className="h2">{d.howH}</h2>
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
            <h2 className="h2">{d.offerH}</h2>
            <span style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{CATS.slice(1, 6).map((n, i) => <span key={n} className="chip" style={{ boxShadow: `inset 0 -2px 0 ${RB[i]}` }}>{n}</span>)}</span>
          </div>
          <div className="g4">{PRODUCTS.map((p) => <ProductCard key={p.name} p={p} onAdd={add} dark="#3e3e3e" />)}</div>
        </div>
      </section>

      <section id="novosti" className="sec" style={{ scrollMarginTop: 110 }}>
        <div className="wrap stack" style={{ gap: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 16, flexWrap: 'wrap' }}>
            <h2 className="h2">{d.newsH}</h2>
            <span className="small" style={{ fontSize: 15 }}>{d.newsNote}</span>
          </div>
          <div className="g3">
            {POSTS.map(([t, c, src, alt]) => (
              <div key={t} className="card stack" style={{ overflow: 'hidden' }}>
                <img src={img(src)} alt={alt} loading="lazy" style={{ width: '100%', aspectRatio: '16 / 9', objectFit: 'cover' }} />
                <span style={{ height: 6, background: c }} />
                <span className="stack" style={{ padding: 22, gap: 8 }}><span style={{ fontSize: 12, color: 'var(--muted)' }}>{d.newsTag}</span><span style={{ fontSize: 19, fontWeight: 700, lineHeight: 1.3 }}>{t}</span></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="cs-foot">
        <div className="wrap">
          <div className="cs-foot-grid">
            <div className="cs-tile" style={{ background: '#BDCF37', color: '#3e3e3e' }}>
              <b>{d.f.buy}</b>
              <a role="button" tabIndex={0} onClick={() => scrollTo('ponuda')}>{d.f.buyL[0]}</a>
              <a role="button" tabIndex={0} onClick={() => scrollTo('ponuda')}>{d.f.buyL[1]}</a>
              <a role="button" tabIndex={0} onClick={() => scrollTo('ponuda')}>{d.f.buyL[2]}</a>
            </div>
            <div className="cs-tile" style={{ background: '#437E81', color: '#fff' }}>
              <b>{d.f.contact}</b>
              <a href="tel:+38124533853">024/533-853</a>
              <a href="mailto:info@creativeshop.rs">info@creativeshop.rs</a>
              <span className="cs-social">Facebook · YouTube</span>
            </div>
            <div className="cs-tile" style={{ background: '#823967', color: '#fff' }}>
              <b>{d.f.pay}</b>
              <a role="button" tabIndex={0} onClick={() => scrollTo('ponuda')}>{d.f.payL[0]}</a>
              <a role="button" tabIndex={0} onClick={() => scrollTo('ponuda')}>{d.f.payL[1]}</a>
              <a role="button" tabIndex={0} onClick={() => scrollTo('ponuda')}>{d.f.payL[2]}</a>
            </div>
            <div className="cs-tile" style={{ background: '#F7BE43', color: '#3e3e3e' }}>
              <b>{d.f.news}</b>
              {POSTS.map(([t]) => <a key={t} role="button" tabIndex={0} onClick={() => scrollTo('novosti')}>{t}</a>)}
            </div>
            <div className="cs-tile cs-news" style={{ background: '#EE7D15', color: '#fff' }}>
              <b>{d.f.nl}</b>
              <span>{d.f.nlText}</span>
              <form onSubmit={(e) => e.preventDefault()}><input type="email" placeholder={d.f.email} aria-label={d.f.emailAria} /><button type="submit">{d.f.join}</button></form>
            </div>
          </div>
          <div className="cs-foot-bottom">
            <img src={`${import.meta.env.BASE_URL}logo/creativeshop-logo.svg`} alt="creativeshop.rs" style={{ height: 34, width: 'auto' }} />
            <span>© 2026 Creative Shop · {d.f.part} <Link to="/" style={{ color: 'inherit' }}>Biromarket 024 d.o.o.</Link>{d.f.partSuffix ? ` ${d.f.partSuffix}` : ''} · {d.f.proto}</span>
          </div>
        </div>
        <div style={{ display: 'flex', height: 6 }}>{RB.map((c) => <span key={c} style={{ flex: 1, background: c }} />)}</div>
      </footer>
      {flyLayer}
    </div>
  )
}
