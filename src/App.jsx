import React, { useState } from 'react'

const options = [
  ['bouquet', '✿'], ['letter', '✉'], ['drawing', '✎'], ['tune', '♫'],
  ['avatars', '♡'], ['pictures', '▧'], ['little world', '✦'],
]

const flowers = [
  ['orchid', 'Orchid', '#c9a6d8'], ['spider lily', 'Spider lily', '#d85b73'],
  ['lotus', 'Lotus', '#eaa0b7'], ['rose', 'Rose', '#d96b78'],
  ['tulip', 'Tulip', '#e89b68'], ['sunflower', 'Sunflower', '#e7bd3f'],
  ['daisy', 'Daisy', '#eee6b0'], ['lavender', 'Lavender', '#a58bc7'],
  ['lily of the valley', 'Lily of the valley', '#e7e7df'],
  ['cherry blossom', 'Cherry blossom', '#e9a6b7'], ['hibiscus', 'Hibiscus', '#dc6674'],
  ['lily', 'Lily', '#efe5ce'],
]
const fillers = [
  ['fern', 'Fern', '#6f8d70'], ['wispy grass', 'Wispy grass', '#78966e'], ['moss sprig', 'Moss sprig', '#879b62'],
]
const wraps = ['classic cone', 'folded paper', 'soft gathered', 'newspaper', 'kraft paper']
const baskets = ['round basket', 'woven basket', 'handled basket', 'box basket']
const ribbons = ['classic bow', 'long ribbon', 'double bow', 'thin tie']

function Home({ onStart }) {
  return <main className="home"><header className="site-header"><a className="brand" href="#top">rila</a><nav className="nav"><button className="text-link" onClick={onStart}>make a little world</button></nav></header><section className="hero" id="top"><p className="eyebrow">a tiny place for someone you love</p><h1>rila</h1><p className="intro">make something little, personal, and entirely yours to give to someone you love.</p><button className="primary" onClick={onStart}>make something little →</button></section></main>
}

function WorldPicker({ onBack, onBouquet }) {
  const [selected, setSelected] = useState([])
  const toggle = name => setSelected(current => current.includes(name) ? current.filter(item => item !== name) : [...current, name])
  const continueWorld = () => selected.length === 1 && selected[0] === 'bouquet' ? onBouquet() : null
  return <main className="world-picker"><header className="picker-header"><button className="back-link" onClick={onBack}>← back</button><span className="picker-brand">rila</span><span className="step">1 / ∞</span></header><section className="options-panel"><p className="options-kicker">let's make something little</p><h1 className="picker-title">select what you want<br />your beloved to see.</h1><p className="picker-subtitle">choose as many as you like.</p><div className="options-row">{options.map(([name, symbol]) => { const active = selected.includes(name); return <button key={name} className={`option-chip${active ? ' active' : ''}`} aria-pressed={active} onClick={() => toggle(name)}><span>{name}</span><span aria-hidden="true">{symbol}</span></button> })}</div><button className={`continue-button${selected.length ? ' ready' : ''}`} disabled={!selected.length} onClick={continueWorld}>{selected.length ? `continue with ${selected.length} ${selected.length === 1 ? 'choice' : 'choices'} →` : 'choose something first'}</button></section></main>
}

function BotanicalMark({ type, color, small = false }) {
  const c = color
  const common = { fill: c, stroke: '#55725c', strokeWidth: 1.5, strokeLinejoin: 'round' }
  const stem = <path d="M50 116 C50 91 49 68 50 42" fill="none" stroke="#55725c" strokeWidth="3" strokeLinecap="round" />
  let art
  if (type === 'rose') art = <><g {...common}>{[0,1,2,3,4].map(i => <path key={i} d="M50 45 C25 32 25 5 48 9 C67 1 82 21 65 35 C78 43 65 60 50 45Z" transform={`rotate(${i * 72} 50 45)`}/>)}</g><circle cx="50" cy="43" r="7" fill="#9b5362"/></>
  else if (type === 'tulip') art = <path {...common} d="M25 18 C31 34 39 39 50 30 C61 39 70 33 76 18 C78 43 67 58 50 58 C33 58 22 43 25 18Z" />
  else if (type === 'sunflower') art = <><g fill={c}>{Array.from({length:12},(_,i)=><ellipse key={i} cx="50" cy="34" rx="7" ry="21" transform={`rotate(${i*30} 50 34)`}/>)}</g><circle cx="50" cy="34" r="14" fill="#765b2c"/><circle cx="50" cy="34" r="7" fill="#a77c36"/></>
  else if (type === 'daisy') art = <><g fill={c}>{Array.from({length:10},(_,i)=><ellipse key={i} cx="50" cy="34" rx="6" ry="22" transform={`rotate(${i*36} 50 34)`}/>)}</g><circle cx="50" cy="34" r="9" fill="#d3a948"/></>
  else if (type === 'lotus') art = <><path {...common} d="M50 53 C20 51 12 35 21 27 C31 28 42 36 50 49 C58 36 69 28 79 27 C88 35 80 51 50 53Z"/><path {...common} d="M50 49 C31 42 29 26 39 18 C46 24 49 35 50 49Z"/><path {...common} d="M50 49 C69 42 71 26 61 18 C54 24 51 35 50 49Z"/></>
  else if (type === 'orchid') art = <><path {...common} d="M50 43 C29 54 17 42 27 27 C35 17 44 25 50 32 C56 25 65 17 73 27 C83 42 71 54 50 43Z"/><path fill={c} stroke="#55725c" strokeWidth="1.5" d="M50 43 C38 35 41 17 50 13 C59 17 62 35 50 43Z"/><circle cx="50" cy="39" r="6" fill="#f1c76c"/></>
  else if (type === 'spider lily') art = <><g fill="none" stroke={c} strokeWidth="4" strokeLinecap="round">{[0,45,90,135,180,225,270,315].map(i=><path key={i} d="M50 43 Q50 15 50 8" transform={`rotate(${i} 50 43)`}/>)}</g><circle cx="50" cy="43" r="6" fill={c}/></>
  else if (type === 'lavender') art = <><path d="M50 86 C39 68 42 38 50 18" fill="none" stroke="#55725c" strokeWidth="3"/><g fill={c}>{[20,28,36,44,52,60].map((y,i)=><ellipse key={i} cx={i%2?55:45} cy={y} rx="6" ry="10"/></g></>
  else if (type === 'lily of the valley') art = <><path d="M50 85 C48 60 50 37 60 18" fill="none" stroke="#55725c" strokeWidth="3"/><path d="M49 76 C38 67 30 69 23 77 C34 83 42 83 49 78" fill="#71916f"/><g fill={c}>{[25,39,53,67].map((y,i)=><circle key={i} cx={60 + i*2} cy={y} r="8"/></g></>
  else if (type === 'cherry blossom') art = <><path d="M50 108 C48 80 57 58 73 37" fill="none" stroke="#55725c" strokeWidth="3"/><path d="M73 37 C58 32 53 21 58 11 M73 37 C77 23 88 18 94 22" fill="none" stroke="#55725c" strokeWidth="2"/>{[[58,11],[94,22],[61,35]].map(([x,y],i)=><g key={i} transform={`translate(${x} ${y})`} fill={c}><circle r="8"/><circle cx="8" cy="2" r="7"/><circle cx="4" cy="9" r="7"/><circle cx="-5" cy="7" r="7"/><circle cx="-7" cy="-2" r="7"/><circle r="3" fill="#c99062"/></g>)}</>
  else if (type === 'hibiscus') art = <><path {...common} d="M50 49 C28 55 16 43 22 27 C29 12 43 22 50 34 C57 22 71 12 78 27 C84 43 72 55 50 49Z"/><path d="M50 47 C52 32 57 20 65 10" fill="none" stroke="#d5a45e" strokeWidth="3"/><circle cx="50" cy="45" r="7" fill="#a94f62"/></>
  else art = <><path {...common} d="M50 54 C25 54 15 39 24 25 C31 15 42 23 50 35 C58 23 69 15 76 25 C85 39 75 54 50 54Z"/><path {...common} d="M50 54 C43 38 44 20 50 13 C56 20 57 38 50 54Z"/></>
  return <svg className="flower-mark" viewBox="0 0 100 120" style={{width: small ? 44 : 78, height: small ? 52 : 94}} aria-hidden="true">{stem}{art}</svg>
}

function FillerMark({ type, color }) {
  if (type === 'fern') return <svg className="flower-mark" viewBox="0 0 80 120" aria-hidden="true"><path d="M42 115 C41 78 43 43 48 10" fill="none" stroke="#55725c" strokeWidth="3"/><g fill="none" stroke={color} strokeWidth="5" strokeLinecap="round">{Array.from({length:8},(_,i)=><path key={i} d={`M${45-i*.5} ${88-i*10} Q${28-i*1.2} ${80-i*10} ${20-i*.8} ${70-i*9}`}/>)}</g></svg>
  if (type === 'wispy grass') return <svg className="flower-mark" viewBox="0 0 80 120" aria-hidden="true"><g fill="none" stroke={color} strokeWidth="3" strokeLinecap="round">{[-18,-10,-3,5,13,21].map((x,i)=><path key={i} d={`M40 116 C${38+x/3} 72 ${39+x/2} 38 ${40+x} ${10+i*3}`}/>)}</g></svg>
  return <svg className="flower-mark" viewBox="0 0 80 120" aria-hidden="true"><path d="M40 116 C40 83 40 55 40 24" fill="none" stroke="#55725c" strokeWidth="3"/><g fill={color}>{Array.from({length:12},(_,i)=><ellipse key={i} cx={28+(i%3)*12} cy={20+Math.floor(i/3)*18} rx="9" ry="6" transform={`rotate(${i%2?25:-25} ${28+(i%3)*12} ${20+Math.floor(i/3)*18})`}/>)}</g></svg>
}

function DraggableItem({ item, active, onSelect, onMove, children }) {
  const onPointerDown = e => { e.currentTarget.setPointerCapture(e.pointerId); onSelect(item.id); const startX=e.clientX, startY=e.clientY, ox=item.x, oy=item.y; const move=ev=>onMove(item.id, Math.max(8,Math.min(92,ox+(ev.clientX-startX)/3)), Math.max(5,Math.min(82,oy+(ev.clientY-startY)/3))); const up=()=>{window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',up)}; window.addEventListener('pointermove',move); window.addEventListener('pointerup',up) }
  return <button className={`stage-flower ${active?'is-active':''}`} style={{left:`${item.x}%`,top:`${item.y}%`,transform:`translate(-50%,-50%) rotate(${item.rotation}deg)`,touchAction:'none'}} onPointerDown={onPointerDown} title={`${item.name} — drag me`}>{children}</button>
}

function Bouquet({ onBack }) {
  const [items,setItems]=useState([]), [arrangement,setArrangement]=useState('wrapper'), [variant,setVariant]=useState(wraps[0]), [wrapColor,setWrapColor]=useState('#ead9cc'), [ribbon,setRibbon]=useState(ribbons[0]), [ribbonColor,setRibbonColor]=useState('#b76a78'), [note,setNote]=useState(''), [noteColor,setNoteColor]=useState('#fff8ed'), [activeId,setActiveId]=useState(null)
  const addItem=(source,type)=>{const [id,name,defaultColor]=source; const item={id:crypto.randomUUID(),type,name,color:defaultColor,rotation:Math.round(Math.random()*18-9),x:50+Math.round(Math.random()*28-14),y:28+Math.round(Math.random()*15-7)};setItems(v=>[...v,item]);setActiveId(item.id)}
  const update=(id,patch)=>setItems(v=>v.map(x=>x.id===id?{...x,...patch}:x))
  const remove=id=>{setItems(v=>v.filter(x=>x.id!==id));if(activeId===id)setActiveId(null)}
  const active=items.find(x=>x.id===activeId), remaining=50-note.trim().split(/\s+/).filter(Boolean).length, arrangementOptions=arrangement==='wrapper'?wraps:baskets
  return <main className="bouquet-page"><header className="picker-header"><button className="back-link" onClick={onBack}>← choices</button><span className="picker-brand">rila</span><span className="step">bouquet</span></header><div className="bouquet-layout"><section className="bouquet-preview"><p className="options-kicker">your bouquet</p><div className="bouquet-stage"><div className={`arrangement-art ${arrangement}`} style={{background:arrangement==='wrapper'?'transparent':wrapColor}}>{arrangement==='wrapper'&&<div className="wrapper-back" style={{background:wrapColor}}/>}{items.map(item=><DraggableItem key={item.id} item={item} active={activeId===item.id} onSelect={setActiveId} onMove={(id,x,y)=>update(id,{x,y})}>{item.type==='fern'||item.type==='wispy grass'||item.type==='moss sprig'?<FillerMark type={item.type} color={item.color}/>:<BotanicalMark type={item.type} color={item.color}/>}</DraggableItem>)}{arrangement==='wrapper'&&<div className="wrapper-front" style={{background:wrapColor}}/>}<div className="ribbon-art" style={{color:ribbonColor}}>{ribbon==='classic bow'?'🎀':ribbon==='double bow'?'∞':ribbon==='long ribbon'?'⌁':'∿'}</div></div></div><p className="preview-count">{items.length?`${items.length} stems in your bouquet — drag them around`:'add flowers or fillers below'}</p>{items.length>0&&<div className="note-preview" style={{background:noteColor}}>{note||'a little note for them...'}</div>}<button className="add-world-button" onClick={()=>alert('Bouquet saved to your little world!')}>add bouquet to my little world →</button></section><section className="bouquet-controls"><div className="control-block"><h2>choose your flowers</h2><p>each flower is distinct — add it, then give that individual flower its own color.</p><div className="flower-grid">{flowers.map(f=><button key={f[0]} className="flower-choice" onClick={()=>addItem(f,'flower')}><BotanicalMark type={f[0]} color={f[2]} small/><span>{f[1]}</span></button>)}</div></div><div className="control-block"><h2>fillers</h2><p>little green shapes that make a bouquet feel full.</p><div className="flower-grid">{fillers.map(f=><button key={f[0]} className="flower-choice" onClick={()=>addItem(f,'filler')}><FillerMark type={f[0]} color={f[2]}/><span>{f[1]}</span></button>)}</div></div>{active&&<div className="control-block"><div className="control-heading"><div><h2>your {active.name}</h2><p>drag it on the bouquet or change its color.</p></div><button className="remove-flower" onClick={()=>remove(active.id)}>remove</button></div><label className="color-control">color <input type="color" value={active.color} onChange={e=>update(active.id,{color:e.target.value})}/></label><label className="color-control">rotation <input type="range" min="-30" max="30" value={active.rotation} onChange={e=>update(active.id,{rotation:Number(e.target.value)})}/></label></div>}<div className="control-block"><div className="segmented"><button className={arrangement==='wrapper'?'selected':''} onClick={()=>{setArrangement('wrapper');setVariant(wraps[0])}}>wrappers</button><button className={arrangement==='basket'?'selected':''} onClick={()=>{setArrangement('basket');setVariant(baskets[0])}}>baskets</button></div><div className="select-grid">{arrangementOptions.map(x=><button key={x} className={variant===x?'selected':''} onClick={()=>setVariant(x)}>{x}</button>)}</div><label className="color-control">{arrangement} color <input type="color" value={wrapColor} onChange={e=>setWrapColor(e.target.value)}/></label></div><div className="control-block"><h2>ribbon</h2><div className="select-grid">{ribbons.map(x=><button key={x} className={ribbon===x?'selected':''} onClick={()=>setRibbon(x)}>{x}</button>)}</div><label className="color-control">ribbon color <input type="color" value={ribbonColor} onChange={e=>setRibbonColor(e.target.value)}/></label></div><div className="control-block"><div className="control-heading"><div><h2>a little note</h2><p>50 words maximum.</p></div><span className="word-count">{remaining} left</span></div><textarea value={note} onChange={e=>{const words=e.target.value.trim().split(/\s+/).filter(Boolean);if(words.length<=50)setNote(e.target.value)}} placeholder="write something for them..."/><label className="color-control">paper color <input type="color" value={noteColor} onChange={e=>setNoteColor(e.target.value)}/></label></div></section></div></main>
}

export default function App(){const [page,setPage]=useState('home');return page==='home'?<Home onStart={()=>setPage('picker')}/>:page==='picker'?<WorldPicker onBack={()=>setPage('home')} onBouquet={()=>setPage('bouquet')}/>:<Bouquet onBack={()=>setPage('picker')}/>}