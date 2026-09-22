import { useState } from 'react'

const options = [
  { id: 'bouquet', label: 'a bouquet', position: 'pos-one', sprite: 0 },
  { id: 'letter', label: 'a letter', position: 'pos-two', sprite: 1 },
  { id: 'drawing', label: 'a drawing', position: 'pos-three', sprite: 2 },
  { id: 'music', label: 'a tune', position: 'pos-four', sprite: 3 },
  { id: 'avatars', label: 'avatars', position: 'pos-five', sprite: 4 },
  { id: 'pictures', label: 'pictures', position: 'pos-six', sprite: 5 },
  { id: 'world', label: 'a little world', position: 'pos-seven', sprite: 6 },
]

function Sticker({ option, selected, onClick }) {
  return (
    <button
      className={`sticker-option ${option.position} ${selected ? 'selected' : ''}`}
      onClick={onClick}
      aria-pressed={selected}
      aria-label={`Add ${option.label}`}
    >
      <span
        className="sticker-art sticker-sprite"
        style={{ '--sprite-index': option.sprite }}
        aria-hidden="true"
      />
      <span className="sticker-label">{option.label}</span>
      {selected && <span className="sticker-check">✓</span>}
    </button>
  )
}

function Home({ onCreate }) {
  return (
    <main className="home">
      <div className="atmosphere" aria-hidden="true">
        <span className="spark spark-one">✦</span>
        <span className="spark spark-two">·</span>
        <span className="spark spark-three">✦</span>
        <span className="spark spark-four">·</span>
      </div>

      <header className="site-header">
        <a className="brand" href="/" aria-label="Rila home">rila</a>
        <nav className="nav" aria-label="Main navigation">
          <button className="text-link">how it works</button>
          <button className="text-link">open a rila</button>
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <p className="eyebrow">a little place on the internet</p>
        <h1 id="hero-title">a tiny world<br />for someone you love.</h1>
        <p className="intro">Make them a letter, a bouquet, a tune, a drawing — or a whole little world of your own.</p>
        <div className="actions">
          <button className="primary" onClick={onCreate}>make a little world <span aria-hidden="true">→</span></button>
          <button className="secondary">I have a Rila <span aria-hidden="true">↗</span></button>
        </div>
        <div className="tiny-note" aria-hidden="true"><span className="heart">♡</span> made with a little bit of love</div>
      </section>
    </main>
  )
}

function LittleWorld({ onBack }) {
  const [selected, setSelected] = useState([])

  const toggle = (id) => {
    setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  return (
    <main className="world-picker">
      <div className="world-wash" aria-hidden="true" />
      <header className="picker-header">
        <button className="back-link" onClick={onBack}>← back</button>
        <span className="picker-brand">rila</span>
        <span className="step">1 / ∞</span>
      </header>

      <section className="picker-stage" aria-labelledby="picker-title">
        <div className="question-wrap">
          <p className="picker-eyebrow">let's make something little</p>
          <h1 id="picker-title">select what you want<br />your beloved to see.</h1>
          <p className="picker-subtitle">choose as many as you like.</p>
          {selected.length > 0 && <p className="selected-count">{selected.length} little {selected.length === 1 ? 'thing' : 'things'} chosen ♡</p>}
        </div>

        <div className="sticker-field" aria-label="Things to include">
          {options.map((option) => (
            <Sticker key={option.id} option={option} selected={selected.includes(option.id)} onClick={() => toggle(option.id)} />
          ))}
        </div>

        <button className={`continue-button ${selected.length ? 'ready' : ''}`} disabled={!selected.length}>
          continue with {selected.length ? selected.length : 'your'} little {selected.length === 1 ? 'thing' : 'world'} <span>→</span>
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
