import { useCallback, useEffect, useRef, useState } from 'react'
import { Badge, Button, Check, Count, Fly, Popover, States, rectIn } from 'micro-motion'
import { Icon, useToast } from './ui.jsx'
import { useLang } from '../i18n.jsx'

const CT = {
  sr: { inCart: 'u korpi', cart: 'Korpa', added: 'Dodato', addAria: 'Dodaj u korpu', empty: 'Korpa je prazna.', total: 'Ukupno artikala', checkout: 'Na kasu', proto: 'Prototip – kasa još ne radi', close: 'Zatvori' },
  hu: { inCart: 'a kosárban', cart: 'Kosár', added: 'Hozzáadva', addAria: 'Kosárba', empty: 'A kosár üres.', total: 'Összes termék', checkout: 'Pénztár', proto: 'Prototípus – a pénztár még nem működik', close: 'Bezárás' },
  en: { inCart: 'added to cart', cart: 'Cart', added: 'Added', addAria: 'Add to cart', empty: 'Your cart is empty.', total: 'Items in total', checkout: 'Checkout', proto: 'Prototype – checkout does not work yet', close: 'Close' },
}

/* Cart with a "fly to cart" flight (micro-motion Fly) and a rolling count. */
export function useCart(pageRef) {
  const cartRef = useRef(null)
  const wrapRef = useRef(null)
  const [count, setCount] = useState(0)
  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)
  const [flight, setFlight] = useState(null)
  const toast = useToast()
  const { tr } = useLang()
  const ct = tr(CT)

  const remember = (src, name, price) => setItems((list) => {
    const hit = list.find((x) => x.name === name)
    return hit ? list.map((x) => (x === hit ? { ...x, qty: x.qty + 1 } : x)) : [...list, { name, src, price, qty: 1 }]
  })

  useEffect(() => {
    if (!open) return
    const down = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false) }
    const key = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('pointerdown', down); document.addEventListener('keydown', key)
    return () => { document.removeEventListener('pointerdown', down); document.removeEventListener('keydown', key) }
  }, [open])

  const add = (imgEl, src, name, price) => {
    toast(`${name} – ${ct.inCart}`)
    remember(src, name, price)
    const page = pageRef.current
    if (!page || !imgEl || !cartRef.current) { setCount((c) => c + 1); return }
    const from = rectIn(page, imgEl)
    const to = rectIn(page, cartRef.current)
    const id = Date.now()
    setFlight({ id, from, to, src, go: false })
    requestAnimationFrame(() => requestAnimationFrame(() => setFlight((f) => (f && f.id === id ? { ...f, go: true } : f))))
    setTimeout(() => {
      setCount((c) => c + 1)
      setFlight((f) => (f && f.id === id ? null : f))
    }, 760)
  }

  const flyLayer = flight ? (
    <Fly key={flight.id} from={flight.from} to={flight.to} go={flight.go} held duration={750}>
      <img src={flight.src} alt="" width={flight.from.width} height={flight.from.height} style={{ width: flight.from.width, height: flight.from.height, objectFit: 'cover', borderRadius: 16 }} />
    </Fly>
  ) : null

  const live = { wrapRef, cartRef, open, setOpen, items, count, toast, ct }
  const liveRef = useRef(live); liveRef.current = live
  const CartButton = useCallback((props) => <MiniCart {...props} {...liveRef.current} />, [])

  return { add, flyLayer, CartButton }
}

function MiniCart({ label, icon = 'cart', wrapRef, cartRef, open, setOpen, items, count, toast, ct }) {
  label = label || ct.cart
  return (
    <div className="minicart" ref={wrapRef}>
      <button type="button" aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <span className="cart" ref={cartRef}>
          <Icon name={icon} size={22} />
          {label}
          <Badge tone="accent"><Count value={count} /></Badge>
        </span>
      </button>
      <Popover show={open} origin="top right" className="mc-panel" role="dialog" aria-label={ct.cart}
        style={{ top: 'calc(100% + 12px)', right: -6, width: 300 }}>
        {items.length === 0 ? (
          <div className="mc-empty">{ct.empty}</div>
        ) : (
          <>
            <div style={{ maxHeight: 260, overflow: 'auto' }}>
              {items.map((it) => (
                <div className="mc-row" key={it.name}>
                  <img src={it.src} alt="" />
                  <span>{it.name}</span>
                  <span style={{ color: 'var(--muted)', whiteSpace: 'nowrap' }}>× {it.qty}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(0,0,0,.08)' }}>
              <span className="small muted">{ct.total}: <b style={{ color: 'var(--ink)' }}><Count value={count} /></b></span>
              <button type="button" className="btn btn-red btn-sm" onClick={() => { setOpen(false); toast(ct.proto) }}>{ct.checkout}</button>
            </div>
          </>
        )}
      </Popover>
    </div>
  )
}

export function ProductCard({ p, onAdd, dark = '#1d1d1f' }) {
  const { tr } = useLang()
  const ct = tr(CT)
  const imgRef = useRef(null)
  const [added, setAdded] = useState(false)
  const click = () => {
    onAdd(imgRef.current, p.img, p.name, p.price)
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }
  return (
    <div className="prod">
      <div className="pimg" style={{ position: 'relative' }}>
        <img ref={imgRef} src={p.img} alt={p.alt || p.name} loading="lazy" />
        {p.tag && <span style={{ position: 'absolute', left: 14, top: 14, fontSize: 12, fontWeight: 700, color: '#fff', background: 'var(--accent)', borderRadius: 980, padding: '5px 10px' }}>{p.tag}</span>}
      </div>
      <div className="stack" style={{ padding: '16px 18px 18px', gap: 6, flex: 1 }}>
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>{p.cat}</span>
        <span style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.35, minHeight: '2.7em' }}>{p.name}</span>
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginTop: 'auto', paddingTop: 8 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: p.price.startsWith('[') ? 'var(--muted)' : 'var(--ink)' }}>{p.price}</span>
          <Button
            variant="primary"
            size="large"
            className="mm-add"
            onClick={click}
            aria-label={`${ct.addAria}: ${p.name}`}
            icon={added ? <Check on size={14} /> : <Icon name="cart" size={14} stroke={2.2} />}
            style={{ background: added ? 'var(--ok)' : dark, borderColor: 'transparent' }}
          >
            <States value={added ? 'done' : 'add'} states={{ add: ct.cart, done: ct.added }} align="center" />
          </Button>
        </span>
      </div>
    </div>
  )
}
