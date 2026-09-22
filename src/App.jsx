import React, { useMemo, useState } from 'react'
import { flowerMasks } from './flowerMasks'

const options = ['bouquet', 'letter', 'drawing', 'tune', 'avatars', 'pictures', 'little world']
const flowers = [
  ['orchid', 'Orchid', '#b9a1d1'], ['spider-lily', 'Spider lily', '#c96d82'], ['lotus', 'Lotus', '#dca0b5'], ['rose', 'Rose', '#c95e70'],
  ['tulip', 'Tulip', '#d88b68'], ['sunflower', 'Sunflower', '#d7ad35'], ['daisy', 'Daisy', '#eee6bd'], ['lavender', 'Lavender', '#9b83bd'],
  ['lily-of-the-valley', 'Lily of the valley', '#d9ddd3'], ['cherry-blossom', 'Cherry blossom', '#e0a0b2'], ['hibiscus', 'Hibiscus', '#cf6573'], ['lily', 'Lily', '#e6d9c2'],
]
const fillers = [['fern', 'Fern', '#708b70'], ['wispy-grass', 'Wispy grass', '#78956f'], ['moss-sprig', 'Moss sprig', '#819565']]
const wrappers = ['classic cone', 'folded paper', 'soft gathered', 'kraft paper']
const baskets = ['round basket', 'woven basket', 'handled basket', 'box basket']
const ribbons = ['classic bow', 'long ribbon', 'double bow', 'thin tie']
const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`

function Home({ onStart }) {
  return <main className="home"><header className="site-header"><span className="brand">rila</span><button className="text-link" onClick={onStart}>make a little world</button></header><section className="hero"><p className="eyebrow">a tiny place for someone you love</p><h1>rila</h1><p className="intro">make something little, personal, and entirely yours to give to someone you love.</p><button className="primary" onClick={onStart}>make something little →</button></section></main>
}

function WorldPicker({ onBack, onBouquet }) {
  const [selected, setSelected] = useState([])
  const toggle = name => setSelected(v => v.includes(name) ? v.filter(x => x !== name) : [...v, name])
  return <main className="world-picker"><header className="picker-header"><button className="back-link" onClick={onBack}>← back</button><span className="picker-brand">rila</span><span className="step">1 / ∞</span></header><section className="options-panel"><p className="options-kicker">let's make something little</p><h1 className="picker-title">select what you want<br />your beloved to see.</h1><p className="picker-subtitle">choose as many as you like.</p><div className="options-row">{options.map(name => <button key={name} className={`option-chip ${selected.includes(name) ? 'active' : ''}`} onClick={() => toggle(name)} aria-pressed={selected.includes(name)}>{name}</button>)}</div><button className={`continue-button ${selected.length ? 'ready' : ''}`} disabled={!selected.length} onClick={() => selected.length === 1 && selected[0] === 'bouquet' ? onBouquet() : null}>{selected.length === 1 && selected[0] === 'bouquet' ? 'continue with your bouquet →' : selected.length ? 'continue with your little world →' : 'choose something first'}</button>{selected.length > 1 && <p className="picker-hint">bouquet is ready first — the other little pieces will join your world next.</p>}</section></main>
}

function FlowerImage({ type, color, small = false }) {
  const src = flowerMasks[type]
  return <span className={`flower-image ${small ? 'small' : ''}`} style={{ backgroundColor: color, WebkitMaskImage: `url(${src})`, maskImage: `url(${src})` }} aria-hidden="true" />
}

function FillerImage({ type, color }) {
  const shapes = {
    fern: 'M50 100 C48 75 49 42 56 8 M49 82 C37 73 28 69 18 70 M49 68 C38 58 30 54 22 55 M50 54 C42 44 35 40 28 41 M51 39 C46 30 41 26 36 27',
    'wispy-grass': 'M50 106 C45 72 28 35 18 10 M50 106 C50 70 45 32 43 8 M50 106 C56 69 70 32 82 12 M50 106 C52 72 60 42 64 18',
    'moss-sprig': 'M50 105 C50 77 50 48 50 20 M50 70 C37 62 28 57 20 48 M50 62 C62 55 70 48 78 39 M50 50 C39 43 33 36 29 28 M50 45 C61 38 67 31 71 22',
  }
  return <span className="filler-image" aria-hidden="true"><svg viewBox="0 0 100 115"><path d={shapes[type]} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
}

function DraggableItem({ item, active, onSelect, onMove }) {
  const start = e => { e.currentTarget.setPointerCapture(e.pointerId); onSelect(item.id); const sx=e.clientX, sy=e.clientY, ox=item.x, oy=item.y; const move=ev=>onMove(item.id,Math.max(10,Math.min(90,ox+(ev.clientX-sx)/4)),Math.max(8,Math.min(46,oy+(ev.clientY-sy)/4))); const end=()=>{window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',end)}; window.addEventListener('pointermove',move); window.addEventListener('pointerup',end) }
  return <button className={`stage-item ${active ? 'active' : ''}`} style={{left:`${item.x}%`,top:`${item.y}%`,transform:`translate(-50%,-50%) rotate(${item.rotation}deg)`}} onPointerDown={start} onClick={()=>onSelect(item.id)} title={`${item.label} — drag me`}>{item.kind === 'flower' ? <FlowerImage type={item.type} color={item.color}/> : <FillerImage type={item.type} color={item.color}/>}</button>
}

function Bouquet({ onBack }) {
  const [items,setItems]=useState([]),[arrangement,setArrangement]=useState('wrapper'),[variant,setVariant]=useState(wrappers[0]),[wrapColor,setWrapColor]=useState('#d9e4e8'),[ribbon,setRibbon]=useState(ribbons[0]),[ribbonColor,setRibbonColor]=useState('#9eb5c8'),[note,setNote]=useState(''),[noteColor,setNoteColor]=useState('#fffaf1'),[activeId,setActiveId]=useState(null)
  const active=items.find(item=>item.id===activeId), words=useMemo(()=>note.trim()?note.trim().split(/\s+/).filter(Boolean):[],[note])
  const add=([type,label,defaultColor],kind)=>{const item={id:makeId(),type,label,kind,color:defaultColor,rotation:Math.round(Math.random()*14-7),x:50+Math.round(Math.random()*28-14),y:20+Math.round(Math.random()*22)};setItems(v=>[...v,item]);setActiveId(item.id)}
  const update=(id,patch)=>setItems(v=>v.map(item=>item.id===id?{...item,...patch}:item))
  const remove=id=>{setItems(v=>v.filter(item=>item.id!==id));if(activeId===id)setActiveId(null)}
  return <main className="bouquet-page"><header className="picker-header"><button className="back-link" onClick={onBack}>← choices</button><span className="picker-brand">rila</span><span className="step">bouquet</span></header><div className="bouquet-layout"><section className="bouquet-preview"><p className="options-kicker">your bouquet</p><div className="bouquet-stage"><div className={`arrangement ${arrangement} ${variant.replaceAll(' ','-')}`}><div className="arrangement-back" style={{backgroundColor:wrapColor}}/><div className="items-layer">{items.map(item=><DraggableItem key={item.id} item={item} active={activeId===item.id} onSelect={setActiveId} onMove={(id,x,y)=>update(id,{x,y})}/>)}</div><div className="arrangement-front" style={{backgroundColor:wrapColor}}/><div className="ribbon" style={{color:ribbonColor}}>{ribbon==='classic bow'?'୨୧':ribbon==='long ribbon'?'⌁':ribbon==='double bow'?'ꕤ':'∿'}</div></div></div><p className="preview-count">{items.length?`${items.length} pieces — click one to recolor it, drag to arrange`:'your flowers will appear here exactly as you choose them'}</p><div className="note-card" style={{backgroundColor:noteColor}}><textarea value={note} onChange={e=>{const next=e.target.value;const nextWords=next.trim()?next.trim().split(/\s+/).filter(Boolean):[];if(nextWords.length<=50)setNote(next)}} placeholder="a little note for them..."/><div className="note-meta">{words.length}/50 words</div></div><button className="add-world-button" onClick={()=>alert('Your bouquet is ready for the little world!')}>add bouquet to my little world →</button></section><section className="bouquet-controls"><div className="control-block"><h2>choose your flowers</h2><p>these are the exact flowers from your reference sheet. click one to add it.</p><div className="flower-grid">{flowers.map(flower=><button key={flower[0]} className="flower-choice" onClick={()=>add(flower,'flower')}><FlowerImage type={flower[0]} color={flower[2]} small/><span>{flower[1]}</span></button>)}</div></div><div className="control-block"><h2>fillers</h2><p>three little greens for filling out the bouquet.</p><div className="flower-grid filler-grid">{fillers.map(filler=><button key={filler[0]} className="flower-choice" onClick={()=>add(filler,'filler')}><FillerImage type={filler[0]} color={filler[2]}/><span>{filler[1]}</span></button>)}</div></div>{active&&<div className="control-block selected-control"><div className="control-heading"><div><h2>your {active.label}</h2><p>this color belongs only to this flower.</p></div><button className="remove-flower" onClick={()=>remove(active.id)}>remove</button></div><label className="color-control">flower color<input type="color" value={active.color} onChange={e=>update(active.id,{color:e.target.value})}/><span style={{backgroundColor:active.color}}>{active.color}</span></label></div>}<div className="control-block"><h2>arrangement</h2><div className="segmented"><button className={arrangement==='wrapper'?'selected':''} onClick={()=>{setArrangement('wrapper');setVariant(wrappers[0])}}>wrapper</button><button className={arrangement==='basket'?'selected':''} onClick={()=>{setArrangement('basket');setVariant(baskets[0])}}>basket</button></div><div className="choice-line">{(arrangement==='wrapper'?wrappers:baskets).map(name=><button key={name} className={variant===name?'chosen':''} onClick={()=>setVariant(name)}>{name}</button>)}</div><label className="color-control">arrangement color<input type="color" value={wrapColor} onChange={e=>setWrapColor(e.target.value)}/><span style={{backgroundColor:wrapColor}}>{wrapColor}</span></label></div><div className="control-block"><h2>ribbon</h2><div className="choice-line">{ribbons.map(name=><button key={name} className={ribbon===name?'chosen':''} onClick={()=>setRibbon(name)}>{name}</button>)}</div><label className="color-control">ribbon color<input type="color" value={ribbonColor} onChange={e=>setRibbonColor(e.target.value)}/><span style={{backgroundColor:ribbonColor}}>{ribbonColor}</span></label></div><div className="control-block"><h2>little note</h2><p>up to 50 words. the paper gets its own color too.</p><label className="color-control">paper color<input type="color" value={noteColor} onChange={e=>setNoteColor(e.target.value)}/><span style={{backgroundColor:noteColor}}>{noteColor}</span></label></div></section></div></main>
}

export default function App(){const [page,setPage]=useState('home');if(page==='world')return <WorldPicker onBack={()=>setPage('home')} onBouquet={()=>setPage('bouquet')}/>;if(page==='bouquet')return <Bouquet onBack={()=>setPage('world')}/>;return <Home onStart={()=>setPage('world')}/>}
