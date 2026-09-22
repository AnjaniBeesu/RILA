import React, { useMemo, useState } from 'react'

const options = [
  ['bouquet', '✿'],
  ['letter', '✉'],
  ['drawing', '✎'],
  ['tune', '♫'],
  ['avatars', '♡'],
  ['pictures', '▧'],
  ['little world', '✦'],
]

const flowers = [
  ['orchid', 'Orchid', '#c9a6d8'],
  ['spider lily', 'Spider lily', '#d85b73'],
  ['lotus', 'Lotus', '#eaa0b7'],
  ['rose', 'Rose', '#d96b78'],
  ['tulip', 'Tulip', '#e89b68'],
  ['sunflower', 'Sunflower', '#e7bd3f'],
  ['daisy', 'Daisy', '#eee6b0'],
  ['lavender', 'Lavender', '#a58bc7'],
  ['lily of the valley', 'Lily of the valley', '#e7e7df'],
  ['cherry blossom', 'Cherry blossom', '#e9a6b7'],
  ['hibiscus', 'Hibiscus', '#dc6674'],
  ['lily', 'Lily', '#efe5ce'],
]

const wraps = ['classic cone', 'folded paper', 'soft gathered', 'newspaper', 'kraft paper']
const baskets = ['round basket', 'woven basket', 'handled basket', 'box basket']
const ribbons = ['classic bow', 'long ribbon', 'double bow', 'thin tie']

function Home({ onStart }) {
  return (
    <main className="home">
      <header className="site-header"><a className="brand" href="#top">rila</a><nav className="nav"><button className="text-link" onClick={onStart}>make a little world</button></nav></header>
      <section className="hero" id="top"><p className="eyebrow">a tiny place for someone you love</p><h1>rila</h1><p className="intro">make something little, personal, and entirely yours to give to someone you love.</p><button className="primary" onClick={onStart}>make something little →</button></section>
    </main>
  )
}

function WorldPicker({ onBack, onBouquet }) {
  const [selected, setSelected] = useState([])
  const toggle = (name) => setSelected((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name])
  const continueWorld = () => selected.length === 1 && selected[0] === 'bouquet' ? onBouquet() : null
  return <main className="world-picker"><header className="picker-header"><button className="back-link" onClick={onBack}>← back</button><span className="picker-brand">rila</span><span className="step">1 / ∞</span></header><section className="options-panel"><p className="options-kicker">let's make something little</p><h1 className="picker-title">select what you want<br />your beloved to see.</h1><p className="picker-subtitle">choose as many as you like.</p><div className="options-row">{options.map(([name, symbol]) => { const active = selected.includes(name); return <button key={name} className={`option-chip${active ? ' active' : ''}`} aria-pressed={active} onClick={() => toggle(name)}><span>{name}</span><span aria-hidden="true">{symbol}</span></button> })}</div><button className={`continue-button${selected.length ? ' ready' : ''}`} disabled={!selected.length} onClick={continueWorld}>{selected.length ? `continue with ${selected.length} ${selected.length === 1 ? 'choice' : 'choices'} →` : 'choose something first'}</button></section></main>
}

function FlowerMark({ type, color }) {
  const petals = type === 'sunflower' ? 12 : type === 'daisy' ? 10 : type === 'spider lily' ? 7 : type === 'lavender' ? 5 : 6
  return <svg className="flower-mark" viewBox="0 0 100 120" aria-hidden="true"><path d="M50 116 C48 88 51 60 50 45" fill="none" stroke="#66856c" strokeWidth="5" strokeLinecap="round"/><path d="M49 84 C35 75 27 78 21 86 C34 91 42 90 49 86" fill="#78977b"/><g transform="translate(50 42)">{Array.from({length: petals}, (_, i) => <ellipse key={i} cx="0" cy="-22" rx={type === 'lavender' ? 8 : 12} ry={type === 'lavender' ? 16 : 23} fill={color} transform={`rotate(${(360 / petals) * i})`} opacity=".92"/>)}<circle cx="0" cy="0" r="9" fill={type === 'sunflower' ? '#8d672b' : '#f5dfba'}/></g></svg>
}

function Bouquet({ onBack }) {
  const [items, setItems] = useState([])
  const [arrangement, setArrangement] = useState('wrapper')
  const [variant, setVariant] = useState(wraps[0])
  const [wrapColor, setWrapColor] = useState('#ead9cc')
  const [ribbon, setRibbon] = useState(ribbons[0])
  const [ribbonColor, setRibbonColor] = useState('#b76a78')
  const [note, setNote] = useState('')
  const [noteColor, setNoteColor] = useState('#fff8ed')
  const [activeFlower, setActiveFlower] = useState(null)

  const addFlower = (flower) => {
    const item = { id: crypto.randomUUID(), type: flower[0], name: flower[1], color: flower[2], rotation: Math.round(Math.random() * 18 - 9), x: 50 + Math.round(Math.random() * 24 - 12) }
    setItems((current) => [...current, item]); setActiveFlower(item.id)
  }
  const updateFlower = (id, color) => setItems((current) => current.map((item) => item.id === id ? { ...item, color } : item))
  const removeFlower = (id) => { setItems((current) => current.filter((item) => item.id !== id)); if (activeFlower === id) setActiveFlower(null) }
  const active = items.find((item) => item.id === activeFlower)
  const remaining = 50 - note.trim().split(/\s+/).filter(Boolean).length
  const optionsForArrangement = arrangement === 'wrapper' ? wraps : baskets
  const bouquetData = useMemo(() => ({ flowers: items, arrangement: { type: arrangement, variant, color: wrapColor }, ribbon: { type: ribbon, color: ribbonColor }, note: { text: note, paperColor: noteColor } }), [items, arrangement, variant, wrapColor, ribbon, ribbonColor, note, noteColor])

  return <main className="bouquet-page"><header className="picker-header"><button className="back-link" onClick={onBack}>← choices</button><span className="picker-brand">rila</span><span className="step">bouquet</span></header><div className="bouquet-layout"><section className="bouquet-preview"><p className="options-kicker">your bouquet</p><div className="bouquet-stage"><div className={`arrangement-art ${arrangement}`} style={{background: wrapColor}}><div className="flowers-on-stage">{items.map((item) => <button key={item.id} className="stage-flower" style={{left: `${item.x}%`, transform: `translateX(-50%) rotate(${item.rotation}deg)`}} onClick={() => setActiveFlower(item.id)} title={item.name}><FlowerMark type={item.type} color={item.color} /></button>)}</div><div className="ribbon-art" style={{color: ribbonColor}}>⌁</div></div></div><p className="preview-count">{items.length ? `${items.length} flower${items.length === 1 ? '' : 's'} in your bouquet` : 'your flowers will appear here'}</p>{items.length > 0 && <div className="note-preview" style={{background: noteColor}}><span>{note || 'a little note for them...'}</span></div>}<button className="add-world-button" onClick={() => alert(JSON.stringify(bouquetData, null, 2))}>add bouquet to my little world →</button></section>
  <section className="bouquet-controls"><div className="control-block"><h2>choose your flowers</h2><p>each flower can have its own color.</p><div className="flower-grid">{flowers.map((flower) => <button key={flower[0]} className="flower-choice" onClick={() => addFlower(flower)}><FlowerMark type={flower[0]} color={flower[2]} /><span>{flower[1]}</span></button>)}</div></div>{active && <div className="control-block"><div className="control-heading"><div><h2>your {active.name}</h2><p>make this flower yours.</p></div><button className="remove-flower" onClick={() => removeFlower(active.id)}>remove</button></div><label className="color-control">color <input type="color" value={active.color} onChange={(e) => updateFlower(active.id, e.target.value)} /></label></div>}<div className="control-block"><div className="segmented"><button className={arrangement === 'wrapper' ? 'selected' : ''} onClick={() => {setArrangement('wrapper');setVariant(wraps[0])}}>wrappers</button><button className={arrangement === 'basket' ? 'selected' : ''} onClick={() => {setArrangement('basket');setVariant(baskets[0])}}>baskets</button></div><div className="select-grid">{optionsForArrangement.map((item) => <button key={item} className={variant === item ? 'selected' : ''} onClick={() => setVariant(item)}>{item}</button>)}</div><label className="color-control">{arrangement} color <input type="color" value={wrapColor} onChange={(e) => setWrapColor(e.target.value)} /></label></div><div className="control-block"><h2>ribbon</h2><div className="select-grid">{ribbons.map((item) => <button key={item} className={ribbon === item ? 'selected' : ''} onClick={() => setRibbon(item)}>{item}</button>)}</div><label className="color-control">ribbon color <input type="color" value={ribbonColor} onChange={(e) => setRibbonColor(e.target.value)} /></label></div><div className="control-block"><div className="control-heading"><div><h2>a little note</h2><p>50 words maximum.</p></div><span className={remaining < 0 ? 'word-count over' : 'word-count'}>{remaining} left</span></div><textarea value={note} maxLength={320} onChange={(e) => { const words = e.target.value.trim().split(/\s+/).filter(Boolean); if (words.length <= 50) setNote(e.target.value) }} placeholder="write something for them..."/><label className="color-control">paper color <input type="color" value={noteColor} onChange={(e) => setNoteColor(e.target.value)} /></label></div></section></div></main>
}

export default function App() { const [page, setPage] = useState('home'); return page === 'home' ? <Home onStart={() => setPage('picker')} /> : page === 'picker' ? <WorldPicker onBack={() => setPage('home')} onBouquet={() => setPage('bouquet')} /> : <Bouquet onBack={() => setPage('picker')} /> }
