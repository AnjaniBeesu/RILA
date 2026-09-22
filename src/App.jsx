import { useState } from 'react'

const options = [
  { id: 'bouquet', label: 'a bouquet' },
  { id: 'letter', label: 'a letter' },
  { id: 'drawing', label: 'a drawing' },
  { id: 'music', label: 'a tune' },
  { id: 'avatars', label: 'avatars' },
  { id: 'pictures', label: 'pictures' },
  { id: 'world', label: 'a little world' },
]

function Home({ onCreate }) {
  return (
    <main className="home">
      <header className="site-header">
        <a className="brand" href="/" aria-label="Rila home">rila</a>
        <nav className="nav" aria-label="Main navigation">
          <button className="text-link" type="button">how it works</button>
          <button className="text-link" type="button">open a rila</button>
        </nav>
      </header>
      <section className="hero" aria-labelledby="hero-title">
        <p className="eyebrow">a little place on the internet</p>
        <h1 id="hero-title">a tiny world<br />for someone you love.</h1>
        <p className="intro">Make them a letter, a bouquet, a tune, a drawing — or a whole little world of your own.</p>
        <button className="primary" onClick={onCreate} type="button">make a little world <span>→</span></button>
      </section>
    </main>
  )
}

function LittleWorld({ onBack }) {
  const [selected, setSelected] = useState([])
  const toggle = (id) => setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])

  return (
    <main className="world-picker">
      <header className="picker-header">
        <button className="back-link" onClick={onBack} type="button">← back</button>
        <span className="picker-brand">rila</span>
        <span className="step">1 / ∞</span>
      </header>

      <section className="reference-section" aria-label="Little-world preview">
        <img className="reference-image" src="/rila-reference.jpg?v=5" alt="Rila little-world selection scene" draggable="false" />
      </section>

      <section className="options-panel" aria-label="Things to include">
        <p className="options-kicker">choose what your beloved gets to see</p>
        <div className="options-row">
          {options.map((option) => {
            const active = selected.includes(option.id)
            return (
              <button key={option.id} className={`option-chip ${active ? 'active' : ''}`} onClick={() => toggle(option.id)} aria-pressed={active} type="button">
                <span>{option.label}</span><span aria-hidden="true">{active ? '✓' : '+'}</span>
              </button>
            )
          })}
        </div>
        <button className={`continue-button ${selected.length ? 'ready' : ''}`} disabled={!selected.length} type="button">
          {selected.length ? `continue with ${selected.length} ${selected.length === 1 ? 'thing' : 'things'} →` : 'choose something first →'}
        </button>
      </section>
    </main>
  )
}

function App() {
  const [page, setPage] = useState('home')
  return page === 'home' ? <Home onCreate={() => setPage('world')} /> : <LittleWorld onBack={() => setPage('home')} />
}

export default App
