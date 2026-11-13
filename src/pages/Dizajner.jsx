import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Segmented } from 'micro-motion'
import { useToast } from '../components/ui.jsx'

/* Mockup of the new Creative Shop designer.
   Two separate layouts (desktop: mouse + keyboard, mobile: touch) share one state.
   Not a real editor yet: no print export, no real upload. */

const FONTS = [
  ['Luckiest Guy', "'Luckiest Guy', system-ui"],
  ['Caveat', "'Caveat', cursive"],
  ['Bree Serif', "'Bree Serif', serif"],
  ['Roboto', "'Roboto', system-ui"],
]
const SHIRT = [
  ['bela', '#ffffff'], ['crna', '#1f1f22'], ['crvena', '#d7191f'], ['zuta', '#f7c948'], ['narandzasta', '#ee7d15'],
  ['grafit', '#45484d'], ['melirana', '#b9b9bb'], ['royal', '#2449a8'], ['zelena', '#2f9e55'], ['magenta', '#c2266e'],
]
const INK = ['#3e3e3e', '#ffffff', '#ED1C24', '#EE7D15', '#F7BE43', '#55B976', '#437E81', '#823967']
const MOTIFS = {
  srce: 'M12 21s-7.5-4.6-9.6-9.3C.9 8.2 3 4.5 6.6 4.5c2.1 0 3.6 1.2 4.4 2.6.8-1.4 2.3-2.6 4.4-2.6 3.6 0 5.7 3.7 4.2 7.2C19.5 16.4 12 21 12 21z',
  zvezda: 'M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z',
  munja: 'M13.5 2 4.5 13.5h6L9.5 22l10-12.5h-6.2z',
  sunce: 'M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zM12 1v3M12 20v3M1 12h3M20 12h3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1',
  cvet: 'M12 9.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM12 2c2 0 3 2.2 2.2 4.6-.4 1.1-1.2 2-2.2 2.9-1-.9-1.8-1.8-2.2-2.9C9 4.2 10 2 12 2zm0 20c-2 0-3-2.2-2.2-4.6.4-1.1 1.2-2 2.2-2.9 1 .9 1.8 1.8 2.2 2.9.8 2.4-.2 4.6-2.2 4.6zM2 12c0-2 2.2-3 4.6-2.2 1.1.4 2 1.2 2.9 2.2-.9 1-1.8 1.8-2.9 2.2C4.2 15 2 14 2 12zm20 0c0 2-2.2 3-4.6 2.2-1.1-.4-2-1.2-2.9-2.2.9-1 1.8-1.8 2.9-2.2C19.8 9 22 10 22 12z',
  kruna: 'M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z',
  nota: 'M9 18.5a3 3 0 1 1-2-2.8V4l12-2v13.5a3 3 0 1 1-2-2.8V6.3l-8 1.4z',
  osmeh: 'M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm-3.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm7 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM7.5 14.5c1 1.8 2.6 2.8 4.5 2.8s3.5-1 4.5-2.8',
}
const MOTIF_COLORS = { srce: '#ED1C24', zvezda: '#F7BE43', munja: '#437E81', sunce: '#EE7D15', cvet: '#823967', kruna: '#F7BE43', nota: '#55B976', osmeh: '#EE7D15' }

const T = {
  sr: { back: 'Nazad u prodavnicu', login: 'Prijava', steps: ['Proizvod', 'Dizajn', 'Veličina', 'Korpa'], tools: { proizvod: 'Proizvod', tekst: 'Tekst', slika: 'Slika', motivi: 'Motivi', boja: 'Boja majice' },
    front: 'Napred', backSide: 'Nazad', del: 'Obriši', dup: 'Kopiraj', center: 'Centriraj', fwd: 'Napred', bwd: 'Nazad', typeText: 'Upiši tekst', font: 'Font', color: 'Boja', align: 'Poravnanje', size: 'Veličina teksta',
    upload: 'Otpremi sliku', drop: 'Prevuci sliku ovde ili izaberi sa uređaja', uploadNote: 'Najbolje PNG ili JPG, najmanje 1500 px. Upozorićemo te ako je slika premala za štampu.', motifsNote: 'Dodirni motiv da ga staviš na majicu.',
    product: 'Majica, 100% pamuk', price: 'Cena', next: 'Dalje: veličina', layers: 'Slojevi', keys: 'Strelice pomeraju · Del briše · Ctrl+Z vraća', mock: 'Maketa – još ne radi', shirtColors: 'Boja majice', more: 'Još',
    products: ['Majica', 'Duks', 'Šolja', 'Kačket'], printArea: 'Površina štampe 40 × 50 cm', textLayer: 'Tekst', motifLayer: 'Motiv', toast: 'Ovo je maketa – sledeći korak (veličine) dolazi kasnije',
    colorNames: { bela: 'Bela', crna: 'Crna', crvena: 'Crvena', zuta: 'Žuta', narandzasta: 'Narandžasta', grafit: 'Grafitno siva', melirana: 'Melirana siva', royal: 'Royal plava', zelena: 'Zelena', magenta: 'Magenta' }, sample: 'Subotica' },
  hu: { back: 'Vissza a boltba', login: 'Belépés', steps: ['Termék', 'Tervezés', 'Méret', 'Kosár'], tools: { proizvod: 'Termék', tekst: 'Szöveg', slika: 'Kép', motivi: 'Motívumok', boja: 'Póló színe' },
    front: 'Elöl', backSide: 'Hátul', del: 'Törlés', dup: 'Másolás', center: 'Középre', fwd: 'Előre', bwd: 'Hátra', typeText: 'Írd be a szöveget', font: 'Betűtípus', color: 'Szín', align: 'Igazítás', size: 'Szövegméret',
    upload: 'Kép feltöltése', drop: 'Húzd ide a képet, vagy válaszd ki az eszközödről', uploadNote: 'Legjobb a PNG vagy JPG, legalább 1500 px. Szólunk, ha a kép túl kicsi a nyomtatáshoz.', motifsNote: 'Koppints egy motívumra, hogy a pólóra kerüljön.',
    product: 'Póló, 100% pamut', price: 'Ár', next: 'Tovább: méret', layers: 'Rétegek', keys: 'Nyilak: mozgatás · Del: törlés · Ctrl+Z: visszavonás', mock: 'Bemutató – még nem működik', shirtColors: 'Póló színe', more: 'Több',
    products: ['Póló', 'Pulóver', 'Bögre', 'Sapka'], printArea: 'Nyomtatási terület 40 × 50 cm', textLayer: 'Szöveg', motifLayer: 'Motívum', toast: 'Ez egy bemutató – a következő lépés (méret) később jön',
    colorNames: { bela: 'Fehér', crna: 'Fekete', crvena: 'Piros', zuta: 'Sárga', narandzasta: 'Narancs', grafit: 'Grafitszürke', melirana: 'Melírozott szürke', royal: 'Királykék', zelena: 'Zöld', magenta: 'Magenta' }, sample: 'Szabadka' },
  en: { back: 'Back to shop', login: 'Sign in', steps: ['Product', 'Design', 'Size', 'Cart'], tools: { proizvod: 'Product', tekst: 'Text', slika: 'Image', motivi: 'Graphics', boja: 'Shirt color' },
    front: 'Front', backSide: 'Back', del: 'Delete', dup: 'Duplicate', center: 'Center', fwd: 'Forward', bwd: 'Backward', typeText: 'Type your text', font: 'Font', color: 'Color', align: 'Alignment', size: 'Text size',
    upload: 'Upload image', drop: 'Drag an image here or choose one from your device', uploadNote: 'PNG or JPG works best, at least 1500 px. We will warn you if the image is too small to print.', motifsNote: 'Tap a graphic to put it on the shirt.',
    product: 'T-shirt, 100% cotton', price: 'Price', next: 'Next: size', layers: 'Layers', keys: 'Arrows move · Del deletes · Ctrl+Z undo', mock: 'Mockup – not working yet', shirtColors: 'Shirt color', more: 'More',
    products: ['T-shirt', 'Hoodie', 'Mug', 'Cap'], printArea: 'Print area 40 × 50 cm', textLayer: 'Text', motifLayer: 'Graphic', toast: 'This is a mockup – the next step (sizes) comes later',
    colorNames: { bela: 'White', crna: 'Black', crvena: 'Red', zuta: 'Yellow', narandzasta: 'Orange', grafit: 'Graphite', melirana: 'Heather grey', royal: 'Royal blue', zelena: 'Green', magenta: 'Magenta' }, sample: 'Subotica' },
}

const I = {
  proizvod: 'M8 3 3 6l2 4 2-1v12h10V9l2 1 2-4-5-3c-.5 1.6-2 2.5-4 2.5S8.5 4.6 8 3z',
  tekst: 'M5 6V4h14v2M12 4v16M9 20h6',
  slika: 'M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M15 9.5a1.5 1.5 0 1 0 0-.01',
  motivi: MOTIFS.zvezda,
  boja: 'M12 3a9 9 0 1 0 0 18c1.5 0 2-1 2-2s-1-1.5-1-2.5 1-1.5 2-1.5h2a4 4 0 0 0 4-4C21 6.6 17 3 12 3zM7.5 12a1 1 0 1 0 0-.01M10 7.5a1 1 0 1 0 0-.01M15 7.5a1 1 0 1 0 0-.01',
  trash: 'M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3',
  copy: 'M8 8h12v12H8zM4 16V4h12',
  center: 'M12 3v18M7 8h10M5 14h14',
  up: 'M12 19V5M6 11l6-6 6 6',
  down: 'M12 5v14M6 13l6 6 6-6',
  undo: 'M9 14 4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3',
  redo: 'M15 14l5-5-5-5M20 9H10a6 6 0 0 0 0 12h3',
  back: 'M19 12H5M11 18l-6-6 6-6',
  upload: 'M12 16V4M7 9l5-5 5 5M4 20h16',
  close: 'M6 6l12 12M18 6 6 18',
  alignL: 'M4 6h16M4 12h10M4 18h14', alignC: 'M4 6h16M7 12h10M5 18h14', alignR: 'M4 6h16M10 12h10M6 18h14',
}
const Ico = ({ d, size = 20, fill = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill ? 'currentColor' : 'none'} stroke={fill ? 'none' : 'currentColor'} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
)

const START = [
  { id: 'm1', type: 'motif', motif: 'srce', x: 50, y: 34, s: 1, z: 1 },
  { id: 't1', type: 'text', x: 50, y: 70, z: 2 },
]

function useIsMobile() {
  const q = '(max-width: 820px), (pointer: coarse) and (max-width: 1024px)'
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches)
  useEffect(() => {
    const mq = window.matchMedia(q); const on = () => setM(mq.matches)
    mq.addEventListener('change', on); return () => mq.removeEventListener('change', on)
  }, [])
  return m
}

/* ---------- the shirt + print area (shared by both layouts) ---------- */
function Shirt({ st, set, t, compact }) {
  const areaRef = useRef(null)
  const drag = useRef(null)
  const fill = SHIRT.find(([k]) => k === st.color)[1]
  const dark = ['crna', 'grafit', 'royal', 'magenta', 'crvena', 'zelena'].includes(st.color)
  const els = st.layers.filter((l) => l.side === st.side || (!l.side && st.side === 'front'))

  const down = (e, id) => {
    e.stopPropagation(); set({ sel: id })
    const r = areaRef.current.getBoundingClientRect(); const l = st.layers.find((x) => x.id === id)
    drag.current = { id, sx: e.clientX, sy: e.clientY, ox: l.x, oy: l.y, w: r.width, h: r.height }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const move = (e) => {
    const d = drag.current; if (!d) return
    const x = Math.max(8, Math.min(92, d.ox + ((e.clientX - d.sx) / d.w) * 100))
    const y = Math.max(8, Math.min(92, d.oy + ((e.clientY - d.sy) / d.h) * 100))
    set({ layers: st.layers.map((l) => (l.id === d.id ? { ...l, x, y } : l)) })
  }
  const up = () => { drag.current = null }

  return (
    <div className={`dz-stage${compact ? ' compact' : ''}`} onPointerDown={() => set({ sel: null })}>
      <svg className="dz-shirt" viewBox="0 0 400 440" aria-label={`${t.product} – ${t.colorNames[st.color]}`}>
        <defs>
          <linearGradient id="dzShade" x1="0" x2="1"><stop offset="0" stopColor="#000" stopOpacity=".10" /><stop offset=".25" stopColor="#000" stopOpacity="0" /><stop offset=".75" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".12" /></linearGradient>
        </defs>
        <path d={st.side === 'front'
          ? 'M138 26c14 26 110 26 124 0l86 40 46 84-58 30-22-34v286H86V146l-22 34-58-30 46-84z'
          : 'M138 26c20 10 104 10 124 0l86 40 46 84-58 30-22-34v286H86V146l-22 34-58-30 46-84z'}
          fill={fill} stroke="rgba(0,0,0,.14)" strokeWidth="2" strokeLinejoin="round" />
        <path d="M138 26c14 26 110 26 124 0l86 40 46 84-58 30-22-34v286H86V146l-22 34-58-30 46-84z" fill="url(#dzShade)" />
        {st.side === 'front' && <path d="M146 30c16 22 92 22 108 0" fill="none" stroke="rgba(0,0,0,.18)" strokeWidth="5" strokeLinecap="round" />}
      </svg>
      <div className="dz-area" ref={areaRef} style={{ borderColor: dark ? 'rgba(255,255,255,.55)' : 'rgba(0,0,0,.28)' }}>
        <span className="dz-area-label" style={{ color: dark ? 'rgba(255,255,255,.7)' : 'rgba(0,0,0,.4)' }}>{t.printArea}</span>
        {els.sort((a, b) => a.z - b.z).map((l) => (
          <div key={l.id} className={`dz-el${st.sel === l.id ? ' sel' : ''}`} style={{ left: `${l.x}%`, top: `${l.y}%`, zIndex: l.z }}
            onPointerDown={(e) => down(e, l.id)} onPointerMove={move} onPointerUp={up} role="button" tabIndex={0} aria-label={l.type === 'text' ? t.textLayer : t.motifLayer}>
            {l.type === 'text'
              ? <span style={{ fontFamily: FONTS[st.font][1], color: st.ink, fontSize: `${(st.size * 0.45).toFixed(1)}cqw`, textAlign: st.align, whiteSpace: 'pre', lineHeight: 1.05, display: 'block' }}>{st.text || ' '}</span>
              : <span style={{ color: MOTIF_COLORS[l.motif], display: 'block', lineHeight: 0 }}><svg style={{ width: '52cqw', height: '52cqw' }} viewBox="0 0 24 24" fill={l.motif === 'sunce' || l.motif === 'osmeh' ? 'none' : 'currentColor'} stroke={l.motif === 'sunce' || l.motif === 'osmeh' ? 'currentColor' : 'none'} strokeWidth="1.8" strokeLinecap="round"><path d={MOTIFS[l.motif]} /></svg></span>}
            {st.sel === l.id && <><i className="h tl" /><i className="h tr" /><i className="h bl" /><i className="h br" /><i className="h rot" /></>}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- tool panels (same content, different containers) ---------- */
function ToolPanel({ tool, st, set, t, addMotif }) {
  if (tool === 'tekst') return (
    <div className="dz-panel-body">
      <label className="dz-field"><span>{t.typeText}</span>
        <input value={st.text} onChange={(e) => set({ text: e.target.value })} maxLength={24} />
      </label>
      <div className="dz-field"><span>{t.font}</span>
        <div className="dz-chips">{FONTS.map(([n, f], i) => <button key={n} className={st.font === i ? 'on' : ''} style={{ fontFamily: f }} onClick={() => set({ font: i })}>{n}</button>)}</div>
      </div>
      <div className="dz-field"><span>{t.color}</span>
        <div className="dz-swatches">{INK.map((c) => <button key={c} aria-label={c} className={st.ink === c ? 'on' : ''} style={{ background: c }} onClick={() => set({ ink: c })} />)}</div>
      </div>
      <div className="dz-row2">
        <div className="dz-field"><span>{t.align}</span>
          <div className="dz-seg">{['left', 'center', 'right'].map((a) => <button key={a} className={st.align === a ? 'on' : ''} onClick={() => set({ align: a })} aria-label={a}><Ico d={I[a === 'left' ? 'alignL' : a === 'center' ? 'alignC' : 'alignR']} size={18} /></button>)}</div>
        </div>
        <label className="dz-field"><span>{t.size}</span><input type="range" min="22" max="56" value={st.size} onChange={(e) => set({ size: +e.target.value })} /></label>
      </div>
    </div>
  )
  if (tool === 'slika') return (
    <div className="dz-panel-body">
      <div className="dz-drop"><Ico d={I.upload} size={28} /><b>{t.upload}</b><span>{t.drop}</span></div>
      <p className="dz-note">{t.uploadNote}</p>
    </div>
  )
  if (tool === 'motivi') return (
    <div className="dz-panel-body">
      <p className="dz-note" style={{ marginTop: 0 }}>{t.motifsNote}</p>
      <div className="dz-motifs">{Object.keys(MOTIFS).map((k) => (
        <button key={k} onClick={() => addMotif(k)} aria-label={k} style={{ color: MOTIF_COLORS[k] }}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill={k === 'sunce' || k === 'osmeh' ? 'none' : 'currentColor'} stroke={k === 'sunce' || k === 'osmeh' ? 'currentColor' : 'none'} strokeWidth="1.8" strokeLinecap="round"><path d={MOTIFS[k]} /></svg>
        </button>))}
      </div>
    </div>
  )
  if (tool === 'boja') return (
    <div className="dz-panel-body">
      <div className="dz-colors">{SHIRT.map(([k, c]) => (
        <button key={k} className={st.color === k ? 'on' : ''} onClick={() => set({ color: k })}>
          <i style={{ background: c }} />{t.colorNames[k]}
        </button>))}
      </div>
    </div>
  )
  return (
    <div className="dz-panel-body">
      <div className="dz-products">{t.products.map((p, i) => <button key={p} className={i === 0 ? 'on' : ''}>{p}</button>)}</div>
    </div>
  )
}

function SelBar({ st, set, t }) {
  if (!st.sel) return null
  const act = (fn) => (e) => { e.stopPropagation(); fn() }
  const sel = st.layers.find((l) => l.id === st.sel)
  return (
    <div className="dz-selbar" onPointerDown={(e) => e.stopPropagation()}>
      <button onClick={act(() => set({ layers: st.layers.filter((l) => l.id !== st.sel), sel: null }))}><Ico d={I.trash} size={18} />{t.del}</button>
      <button onClick={act(() => { const id = 'c' + Date.now(); set({ layers: [...st.layers, { ...sel, id, x: Math.min(90, sel.x + 6), y: Math.min(90, sel.y + 6), z: 9 }], sel: id }) })}><Ico d={I.copy} size={18} />{t.dup}</button>
      <button onClick={act(() => set({ layers: st.layers.map((l) => (l.id === st.sel ? { ...l, x: 50 } : l)) }))}><Ico d={I.center} size={18} />{t.center}</button>
      <button onClick={act(() => set({ layers: st.layers.map((l) => (l.id === st.sel ? { ...l, z: l.z + 2 } : l)) }))}><Ico d={I.up} size={18} />{t.fwd}</button>
    </div>
  )
}

function Lang({ lang, setLang }) {
  return (
    <div className="dz-lang" role="group" aria-label="Jezik">
      {['sr', 'hu', 'en'].map((l) => <button key={l} className={lang === l ? 'on' : ''} onClick={() => setLang(l)}>{l.toUpperCase()}</button>)}
    </div>
  )
}

export default function Dizajner() {
  const isMobile = useIsMobile()
  const toast = useToast()
  const [lang, setLang] = useState('sr')
  const t = T[lang]
  const [st, setSt] = useState({ side: 'front', color: 'bela', text: 'Subotica', font: 0, ink: '#3e3e3e', align: 'center', size: 40, layers: START, sel: 't1', tool: 'tekst', sheet: true })
  const set = (p) => setSt((s) => ({ ...s, ...p }))
  const addMotif = (k) => { const id = 'm' + Date.now(); set({ layers: [...st.layers, { id, type: 'motif', motif: k, x: 50, y: 34, z: 3 + st.layers.length, side: st.side }], sel: id }) }

  useEffect(() => {
    const id = 'dz-fonts'
    if (!document.getElementById(id)) {
      const l = document.createElement('link'); l.id = id; l.rel = 'stylesheet'
      l.href = 'https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@600&family=Luckiest+Guy&display=swap'
      document.head.appendChild(l)
    }
  }, [])

  // desktop keyboard: arrows move, Delete removes, Esc deselects
  useEffect(() => {
    if (isMobile) return
    const key = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return
      setSt((s) => {
        if (!s.sel) return s
        const d = e.shiftKey ? 5 : 1
        const mv = { ArrowLeft: [-d, 0], ArrowRight: [d, 0], ArrowUp: [0, -d], ArrowDown: [0, d] }[e.key]
        if (mv) { e.preventDefault(); return { ...s, layers: s.layers.map((l) => (l.id === s.sel ? { ...l, x: Math.max(8, Math.min(92, l.x + mv[0])), y: Math.max(8, Math.min(92, l.y + mv[1])) } : l)) } }
        if (e.key === 'Delete' || e.key === 'Backspace') return { ...s, layers: s.layers.filter((l) => l.id !== s.sel), sel: null }
        if (e.key === 'Escape') return { ...s, sel: null }
        return s
      })
    }
    window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key)
  }, [isMobile])

  const sideSeg = (
    <Segmented items={[t.front, t.backSide]} value={st.side === 'front' ? 0 : 1} onChange={(i) => set({ side: i ? 'back' : 'front', sel: null })} aria-label="Strana" />
  )
  const logo = <img src={`${import.meta.env.BASE_URL}logo/creativeshop-logo.svg`} alt="creativeshop.rs" />
  const next = () => toast(t.toast)
  const toolKeys = isMobile ? ['tekst', 'slika', 'motivi', 'boja'] : ['proizvod', 'tekst', 'slika', 'motivi', 'boja']

  if (isMobile) return (
    <div className="dz dz-m" data-brand="creative">
      <header className="dz-m-top">
        <Link to="/creative-shop" className="dz-iconbtn" aria-label={t.back}><Ico d={I.back} /></Link>
        <span className="dz-m-logo">{logo}</span>
        <Lang lang={lang} setLang={setLang} />
      </header>
      <div className="dz-m-steps"><span>2 / 4</span><b>{t.steps[1]}</b><span className="dz-mockflag inline">{t.mock}</span><div className="dz-m-progress"><i style={{ width: '50%' }} /></div></div>
      <div className="dz-m-side">{sideSeg}</div>
      <div className="dz-m-canvas">
        <Shirt st={st} set={set} t={t} compact />
        <SelBar st={st} set={set} t={t} />
      </div>
      <div className={`dz-sheet${st.sheet ? ' open' : ''}`}>
        <div className="dz-sheet-head"><i className="grab" /><b>{t.tools[st.tool]}</b><button className="dz-iconbtn" onClick={() => set({ sheet: false })} aria-label="Zatvori"><Ico d={I.close} size={18} /></button></div>
        <ToolPanel tool={st.tool} st={st} set={set} t={t} addMotif={addMotif} />
      </div>
      <nav className="dz-tabbar">
        {toolKeys.map((k) => (
          <button key={k} className={st.tool === k && st.sheet ? 'on' : ''} onClick={() => set(st.tool === k && st.sheet ? { sheet: false } : { tool: k, sheet: true })}>
            <Ico d={I[k]} size={22} fill={k === 'motivi'} /><span>{t.tools[k]}</span>
          </button>
        ))}
      </nav>
      <div className="dz-pricebar">
        <span className="stack"><small>{t.price}</small><b>690 RSD</b></span>
        <button className="btn btn-red" onClick={next}>{t.next}</button>
      </div>
    </div>
  )

  return (
    <div className="dz dz-d" data-brand="creative">
      <header className="dz-d-top">
        <div className="dz-d-left">
          <Link to="/creative-shop" className="dz-backlink"><Ico d={I.back} size={18} />{t.back}</Link>
          <span className="dz-d-logo">{logo}</span>
        </div>
        <ol className="dz-steps">{t.steps.map((s, i) => <li key={s} className={i === 1 ? 'on' : i < 1 ? 'done' : ''}><i>{i + 1}</i>{s}</li>)}</ol>
        <div className="dz-d-right"><Lang lang={lang} setLang={setLang} /><span className="dz-login">{t.login}</span></div>
      </header>
      <div className="dz-d-body">
        <nav className="dz-rail">
          {toolKeys.map((k) => (
            <button key={k} className={st.tool === k ? 'on' : ''} onClick={() => set({ tool: k })}><Ico d={I[k]} size={22} fill={k === 'motivi'} /><span>{t.tools[k]}</span></button>
          ))}
        </nav>
        <aside className="dz-panel">
          <h3>{t.tools[st.tool]}</h3>
          <ToolPanel tool={st.tool} st={st} set={set} t={t} addMotif={addMotif} />
        </aside>
        <main className="dz-work">
          <div className="dz-work-top">
            {sideSeg}
            <div className="dz-undo"><button className="dz-iconbtn" aria-label="Undo"><Ico d={I.undo} size={18} /></button><button className="dz-iconbtn" aria-label="Redo"><Ico d={I.redo} size={18} /></button></div>
          </div>
          <div className="dz-work-canvas">
            <Shirt st={st} set={set} t={t} />
            <SelBar st={st} set={set} t={t} />
          </div>
          <p className="dz-keys">{t.keys}</p>
        </main>
        <aside className="dz-summary">
          <div className="dz-sum-card">
            <span className="small muted">{t.product}</span>
            <b className="dz-sum-color"><i style={{ background: SHIRT.find(([k]) => k === st.color)[1] }} />{t.colorNames[st.color]}</b>
            <div className="dz-sum-price"><small>{t.price}</small><b>690 RSD</b></div>
            <button className="btn btn-red" style={{ width: '100%', justifyContent: 'center' }} onClick={next}>{t.next}</button>
          </div>
          <div className="dz-sum-card">
            <b style={{ fontSize: 14 }}>{t.layers}</b>
            <ul className="dz-layers">
              {[...st.layers].filter((l) => (l.side || 'front') === st.side).sort((a, b) => b.z - a.z).map((l) => (
                <li key={l.id} className={st.sel === l.id ? 'on' : ''} onClick={() => set({ sel: l.id })}>
                  {l.type === 'text' ? <><Ico d={I.tekst} size={16} />{st.text || t.textLayer}</> : <><span style={{ color: MOTIF_COLORS[l.motif], lineHeight: 0 }}><Ico d={MOTIFS[l.motif]} size={16} fill={l.motif !== 'sunce' && l.motif !== 'osmeh'} /></span>{t.motifLayer}</>}
                </li>
              ))}
            </ul>
          </div>
          <span className="dz-mockflag static">{t.mock}</span>
        </aside>
      </div>
    </div>
  )
}
