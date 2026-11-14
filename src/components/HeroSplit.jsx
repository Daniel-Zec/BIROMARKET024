import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Roll } from 'micro-motion'
import { Icon, img, scrollTo } from './ui.jsx'
import { useLang } from '../i18n.jsx'

/* Version C: classic split hero (text left, photo right).
   Only the photo slides; the text follows ~300 ms later:
   - first headline line stays, the colored second line rolls (like the Biromarket home headline)
   - kicker, description and price card fade to the matching slide. */

const DELAY = 5000
const RAINBOW = ['#ED1C24', '#EE7D15', '#F7BE43', '#BDCF37', '#55B976']
const TEXT_LAG = 300
const SLIDES = [
  { img: 'creative-ai/cs-hero.webp', color: '#ED1C24', pos: '50% 50%', price: '690 RSD' },
  { img: 'creative-ai/cs-blog1.webp', color: '#EE7D15', pos: '55% 50%' },
  { img: 'creative-ai/cs-blog2.webp', color: '#55B976', pos: '50% 60%' },
  { img: 'creative-ai/cs-p3.webp', color: '#437E81', pos: '50% 40%', price: '1.490 RSD' },
]
const D = {
  sr: {
    h1a: 'Tvoja ideja.', go: 'Idi na slajd', pause: 'Pauziraj', play: 'Pusti',
    slides: [
      ['Svaki mesec novi motivi', 'Na majici.', 'Majice, duksevi, šolje, puzle i kačketi sa tvojom slikom ili tekstom. Dizajniraj sam u online dizajneru – brzo i lako.', 'Majica iz dizajnera', 'Majica, duks, šolja, kačket, puzla i meda sa šarenim printovima'],
      ['Pokloni', 'Na šolji.', 'Srca, imena ili zajednička fotografija – šolja kao poklon koji se koristi svaki dan.', 'Šolja sa tvojom slikom', 'Dve šolje sa srcima i poklon na stolu'],
      ['Foto puzla', 'Na puzli.', 'Tvoja fotografija kao puzla – za duge zimske večeri i zajedničko slaganje.', 'Puzla sa tvojom fotografijom', 'Puzla sa porodičnom fotografijom, ćebe i šolje'],
      ['Novo', 'Na medi.', 'Plišani meda u majici sa tvojim printom – poklon za male i velike.', 'Medo sa majicom', 'Plišani meda u beloj majici sa srcem'],
    ],
    from: 'od', design: 'Dizajniraj sam', open: 'Otvori dizajner', browse: 'Pogledaj ponudu',
  },
  hu: {
    h1a: 'A te ötleted.', go: 'Ugrás a diára', pause: 'Szünet', play: 'Lejátszás',
    slides: [
      ['Minden hónapban új motívumok', 'A pólódon.', 'Pólók, pulóverek, bögrék, puzzle-k és sapkák a saját képeddel vagy szövegeddel. Tervezd meg magad az online tervezőben – gyorsan és egyszerűen.', 'Póló a tervezőből', 'Póló, pulóver, bögre, sapka, puzzle és maci színes mintákkal'],
      ['Ajándékok', 'A bögréden.', 'Szívek, nevek vagy közös fotó – bögre ajándékba, amit minden nap használnak.', 'Bögre saját fotóval', 'Két szíves bögre és egy ajándék az asztalon'],
      ['Fotós kirakó', 'A kirakódon.', 'A fotód kirakóként – hosszú téli estékre, közös kirakáshoz.', 'Kirakó saját fotóval', 'Kirakó családi fotóval, takaró és bögrék'],
      ['Újdonság', 'A macidon.', 'Plüssmaci pólóban a saját mintáddal – ajándék kicsiknek és nagyoknak.', 'Maci pólóval', 'Plüssmaci fehér pólóban szívvel'],
    ],
    from: '', fromSuffix: '-tól', design: 'Tervezd meg', open: 'Tervező megnyitása', browse: 'Kínálat megtekintése',
  },
  en: {
    h1a: 'Your idea.', go: 'Go to slide', pause: 'Pause', play: 'Play',
    slides: [
      ['New designs every month', 'On a T-shirt.', 'T-shirts, hoodies, mugs, puzzles and caps with your own photo or text. Design it yourself in the online designer – quick and easy.', 'T-shirt from the designer', 'T-shirt, hoodie, mug, cap, puzzle and teddy bear with colorful prints'],
      ['Gifts', 'On a mug.', 'Hearts, names or a photo together – a mug as a gift that gets used every day.', 'Mug with your photo', 'Two mugs with hearts and a gift on a table'],
      ['Photo puzzle', 'On a puzzle.', 'Your photo as a puzzle – for long winter evenings and puzzling together.', 'Puzzle with your photo', 'Puzzle with a family photo, a blanket and mugs'],
      ['New', 'On a teddy.', 'A teddy bear in a shirt with your print – a gift for little ones and grown-ups.', 'Teddy with a shirt', 'Teddy bear in a white shirt with a heart'],
    ],
    from: 'from', design: 'Design it yourself', open: 'Open the designer', browse: 'Browse products',
  },
}

export default function HeroSplit() {
  const { tr } = useLang()
  const d = tr(D)
  const n = SLIDES.length
  const [i, setI] = useState(0) // image position 0..n (n = clone of 0)
  const [anim, setAnim] = useState(true)
  const [t, setT] = useState(0) // text index, follows the image with a small lag
  const [hover, setHover] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const [reduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const trackRef = useRef(null)
  const drag = useRef(null)
  const active = i % n
  const running = !hover && !userPaused && !reduced

  useEffect(() => { const id = setTimeout(() => setT(active), reduced ? 0 : TEXT_LAG); return () => clearTimeout(id) }, [active, reduced])

  const go = (to) => { setAnim(true); setI(to) }
  const next = () => go(i >= n ? 1 : i + 1)
  const prev = () => { if (i === 0) { setAnim(false); setI(n); requestAnimationFrame(() => requestAnimationFrame(() => go(n - 1))) } else go(i - 1) }

  useEffect(() => {
    if (!running) return
    const id = setTimeout(next, DELAY)
    return () => clearTimeout(id)
  }, [i, running]) // eslint-disable-line react-hooks/exhaustive-deps

  const onEnd = (e) => { if (e.target === trackRef.current && i === n) { setAnim(false); setI(0) } }
  const down = (e) => { drag.current = { x: e.clientX, dx: 0 } }
  const move = (e) => { if (drag.current) drag.current.dx = e.clientX - drag.current.x }
  const up = () => { const g = drag.current; drag.current = null; if (!g) return; if (g.dx < -50) next(); else if (g.dx > 50) prev() }

  const [kick, line2, lead, cardLabel] = d.slides[t]
  const s = SLIDES[t]
  const price = s.price ? (d.from ? `${d.from} ${s.price}` : `${s.price}${d.fromSuffix || ''}`) : d.design

  return (
    <section style={{ padding: '48px 0 64px' }}>
      <div className="wrap split">
        <div className="stack" style={{ gap: 22 }}>
          <span key={`k${t}`} className="hs-fade" style={{ alignSelf: 'flex-start', fontSize: 14, fontWeight: 700, color: '#fff', background: s.color, borderRadius: 980, padding: '7px 14px', transition: 'background-color 400ms ease' }}>{kick}</span>
          <h1 className="h1" aria-live="polite">
            {d.h1a}<br />
            <span className="hs-line2" style={{ color: s.color }}><Roll variant="roll">{line2}</Roll></span>
          </h1>
          <p key={`l${t}`} className="lead hs-fade" style={{ maxWidth: '34ch', minHeight: '4.5em' }}>{lead}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Link to="/creative-shop/dizajner" className="btn btn-red">{d.open} <Icon name="arrow" size={16} stroke={2.2} /></Link>
            <button className="btn btn-glass" onClick={() => scrollTo('ponuda')}>{d.browse}</button>
          </div>
        </div>
        <div style={{ position: 'relative' }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          <div className="photo hs-photo" style={{ aspectRatio: '1 / 1', maxHeight: 560, boxShadow: '0 30px 60px -20px rgba(130,57,103,.35)' }}
            onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
            <div ref={trackRef} className="hs-track" onTransitionEnd={onEnd}
              style={{ transform: `translateX(-${i * 100}%)`, transition: anim ? 'transform 800ms cubic-bezier(.65,0,.25,1)' : 'none' }}>
              {[...SLIDES, SLIDES[0]].map((sl, k) => (
                <div key={k} className="hs-slide" aria-hidden={k !== i || k === n}>
                  <img src={img(sl.img)} alt={k === n ? '' : d.slides[k % n][4]} draggable="false" style={{ objectPosition: sl.pos }} />
                </div>
              ))}
            </div>
          </div>
          <div className="glass float-card left" style={{ left: -24, bottom: 28, display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px' }}>
            <span style={{ display: 'flex', paddingLeft: 6 }} aria-hidden="true">{RAINBOW.map((c) => <span key={c} style={{ width: 22, height: 22, borderRadius: '50%', background: c, marginLeft: -6, boxShadow: '0 0 0 2px #fff' }} />)}</span>
            <span key={`c${t}`} className="stack hs-fade"><span style={{ fontSize: 13, color: 'var(--muted)' }}>{cardLabel}</span><span style={{ fontSize: 17, fontWeight: 700 }}>{price}</span></span>
          </div>
          <div className="hs-dots">
            {SLIDES.map((sl, k) => (
              <button key={k} type="button" className={`hc-dot${k === active ? ' on' : ''}`} aria-label={`${d.go} ${k + 1}`} aria-current={k === active} onClick={() => go(k)} style={{ '--hc-c': sl.color }}>
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
        </div>
      </div>
    </section>
  )
}
