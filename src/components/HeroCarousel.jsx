import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { img, scrollTo } from './ui.jsx'
import { useLang } from '../i18n.jsx'

/* Horizontal auto-playing hero carousel with a slide transition.
   - 5 s per slide, seamless loop (first slide cloned at the end)
   - pauses on hover / keyboard focus / hidden tab; no autoplay with reduced motion
   - arrows, progress dots, swipe on touch, arrow keys when focused */

const DELAY = 5000
const SLIDES = [
  { img: 'creative-ai/cs-hero-2.webp', color: '#ED1C24', to: '/creative-shop/dizajner', pos: '60% 30%' },
  { img: 'creative-ai/cs-blog1.webp', color: '#EE7D15', scroll: 'ponuda', pos: '50% 50%' },
  { img: 'creative-ai/cs-blog2.webp', color: '#55B976', to: '/creative-shop/dizajner', pos: '50% 60%' },
  { img: 'creative-ai/cs-p3.webp', color: '#437E81', scroll: 'ponuda', pos: '50% 40%' },
]
const D = {
  sr: {
    region: 'Istaknuto', prev: 'Prethodni slajd', next: 'Sledeći slajd', goTo: 'Idi na slajd', pause: 'Pauziraj', play: 'Pusti',
    slides: [
      ['Online dizajner', 'Tvoja ideja. Na majici.', 'Dodaj sliku ili tekst i odmah vidi kako izgleda – mi štampamo.', 'Otvori dizajner', 'Devojka drži belu majicu sa šarenim srcem'],
      ['Pokloni', 'Šolja sa vašom porukom.', 'Srca, imena, fotografije – poklon koji se pamti.', 'Pogledaj ponudu', 'Dve šolje sa srcima i poklon na stolu'],
      ['Foto puzla', 'Vaša fotografija kao puzla.', 'Za duge zimske večeri i zajedničko slaganje.', 'Napravi puzlu', 'Puzla sa porodičnom fotografijom, ćebe i šolje'],
      ['Novo', 'Medo u majici sa tvojim printom.', 'Plišani meda u majici koju štampamo po tvojoj želji – 1.490 RSD.', 'Pogledaj ponudu', 'Plišani meda u beloj majici sa srcem'],
    ],
  },
  hu: {
    region: 'Kiemelt', prev: 'Előző dia', next: 'Következő dia', goTo: 'Ugrás a diára', pause: 'Szünet', play: 'Lejátszás',
    slides: [
      ['Online tervező', 'A te ötleted. A pólódon.', 'Adj hozzá képet vagy szöveget, és rögtön látod, hogy fog kinézni – mi kinyomtatjuk.', 'Tervező megnyitása', 'Fiatal nő fehér pólót tart színes szívvel'],
      ['Ajándékok', 'Bögre a saját üzenetével.', 'Szívek, nevek, fotók – ajándék, amire emlékeznek.', 'Kínálat megtekintése', 'Két szíves bögre és egy ajándék az asztalon'],
      ['Fotós kirakó', 'A fotója kirakóként.', 'Hosszú téli estékre, közös kirakáshoz.', 'Kirakó készítése', 'Kirakó családi fotóval, takaró és bögrék'],
      ['Újdonság', 'Maci pólóban a saját mintáddal.', 'Plüssmaci pólóban, amelyet a kívánságod szerint nyomtatunk – 1.490 RSD.', 'Kínálat megtekintése', 'Plüssmaci fehér pólóban szívvel'],
    ],
  },
  en: {
    region: 'Featured', prev: 'Previous slide', next: 'Next slide', goTo: 'Go to slide', pause: 'Pause', play: 'Play',
    slides: [
      ['Online designer', 'Your idea. On a T-shirt.', 'Add a photo or text and see right away how it looks – we print it.', 'Open the designer', 'Young woman holding a white T-shirt with a colorful heart'],
      ['Gifts', 'A mug with your message.', 'Hearts, names, photos – a gift they will remember.', 'Browse products', 'Two mugs with hearts and a gift on a table'],
      ['Photo puzzle', 'Your photo as a puzzle.', 'For long winter evenings and puzzling together.', 'Make a puzzle', 'Puzzle with a family photo, a blanket and mugs'],
      ['New', 'A teddy in a shirt with your print.', 'A teddy bear in a shirt we print just the way you want – 1,490 RSD.', 'Browse products', 'Teddy bear in a white shirt with a heart'],
    ],
  },
}

export default function HeroCarousel() {
  const { tr } = useLang()
  const d = tr(D)
  const n = SLIDES.length
  const [i, setI] = useState(0) // 0..n (n = clone of slide 0)
  const [anim, setAnim] = useState(true)
  const [paused, setPaused] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const [reduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const drag = useRef(null)
  const trackRef = useRef(null)
  const active = i % n
  const running = !paused && !userPaused && !reduced

  const go = (to) => { setAnim(true); setI(to) }
  const next = () => go(i >= n ? 1 : i + 1)
  const prev = () => { if (i === 0) { setAnim(false); setI(n); requestAnimationFrame(() => requestAnimationFrame(() => go(n - 1))) } else go(i - 1) }

  useEffect(() => {
    if (!running) return
    const t = setTimeout(next, DELAY)
    return () => clearTimeout(t)
  }, [i, running]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const vis = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', vis)
    return () => document.removeEventListener('visibilitychange', vis)
  }, [])

  // after sliding onto the clone, jump back to the real first slide without animation
  const onEnd = (e) => { if (e.target === trackRef.current && i === n) { setAnim(false); setI(0) } }

  const down = (e) => { drag.current = { x: e.clientX, dx: 0 }; setPaused(true) }
  const move = (e) => { if (drag.current) drag.current.dx = e.clientX - drag.current.x }
  const up = () => {
    const d0 = drag.current; drag.current = null; setPaused(false)
    if (!d0) return
    if (d0.dx < -50) next(); else if (d0.dx > 50) prev()
  }

  const slides = [...SLIDES, SLIDES[0]]
  return (
    <section className="hc-wrap wrap" aria-roledescription="carousel" aria-label={d.region}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onFocusCapture={(e) => { if (e.target.matches(':focus-visible')) setPaused(true) }} onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => { if (e.key === 'ArrowRight') next(); if (e.key === 'ArrowLeft') prev() }}>
      <div className="hc" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
        <div ref={trackRef} className="hc-track" onTransitionEnd={onEnd}
          style={{ transform: `translateX(-${i * 100}%)`, transition: anim ? 'transform 700ms cubic-bezier(.65,0,.25,1)' : 'none' }}>
          {slides.map((s, k) => {
            const [kick, title, text, cta, alt] = d.slides[k % n]
            const isClone = k === n
            const current = k === i
            return (
              <article key={k} className="hc-slide" aria-roledescription="slide" aria-label={`${(k % n) + 1} / ${n}`} aria-hidden={!current || isClone} style={{ '--hc-c': s.color }}>
                <div className="hc-text">
                  <span className="hc-kick">{kick}</span>
                  <h2 className="hc-title">{title}</h2>
                  <p className="hc-lead">{text}</p>
                  {s.to
                    ? <Link to={s.to} className="btn hc-btn" tabIndex={current && !isClone ? 0 : -1}>{cta}</Link>
                    : <button type="button" className="btn hc-btn" tabIndex={current && !isClone ? 0 : -1} onClick={() => scrollTo(s.scroll)}>{cta}</button>}
                </div>
                <div className="hc-media"><img src={img(s.img)} alt={isClone ? '' : alt} draggable="false" style={{ objectPosition: s.pos }} loading={k === 0 ? 'eager' : 'lazy'} /></div>
              </article>
            )
          })}
        </div>
        <button type="button" className="hc-arrow prev" onClick={prev} aria-label={d.prev}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg></button>
        <button type="button" className="hc-arrow next" onClick={next} aria-label={d.next}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg></button>
      </div>
      <div className="hc-dots">
        {SLIDES.map((s, k) => (
          <button key={k} type="button" className={`hc-dot${k === active ? ' on' : ''}`} aria-label={`${d.goTo} ${k + 1}`} aria-current={k === active} onClick={() => go(k)} style={{ '--hc-c': s.color }}>
            <i key={`${i}-${running}`} className={k === active && running ? 'run' : ''} style={{ animationDuration: `${DELAY}ms` }} />
          </button>
        ))}
        {!reduced && (
          <button type="button" className="hc-pp" onClick={() => setUserPaused((p) => !p)} aria-label={userPaused ? d.play : d.pause}>
            {userPaused
              ? <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l13 8-13 8z" /></svg>
              : <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z" /></svg>}
          </button>
        )}
      </div>
    </section>
  )
}
