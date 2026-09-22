import React, { useState } from 'react'

const options = [
  ['bouquet', '✿'],
  ['letter', '✉'],
  ['drawing', '✎'],
  ['tune', '♫'],
  ['avatars', '♡'],
  ['pictures', '▧'],
  ['little world', '✦'],
]

function Home({ onStart }) {
  return (
    <main className="home">
      <header className="site-header">
        <a className="brand" href="#top" onClick={(event) => event.preventDefault()}>rila</a>
        <nav className="nav" aria-label="Main navigation">
          <button className="text-link" onClick={onStart}>make a little world</button>
        </nav>
      </header>

      <section className="hero" id="top">
        <p className="eyebrow">a tiny place for someone you love</p>
        <h1>rila</h1>
        <p className="intro">make something little, personal, and entirely yours to give to someone you love.</p>
        <button className="primary" onClick={onStart}>make something little →</button>
      </section>
    </main>
  )
}

function WorldPicker({ onBack }) {
  const [selected, setSelected] = useState([])

  const toggle = (name) => {
    setSelected((current) => current.includes(name)
      ? current.filter((item) => item !== name)
      : [...current, name])
  }

  return (
    <main className="world-picker">
      <header className="picker-header">
        <button className="back-link" onClick={onBack}>← back</button>
        <span className="picker-brand">rila</span>
        <span className="step">1 / ∞</span>
      </header>

      <section className="options-panel" aria-labelledby="picker-title">
        <p className="options-kicker">let's make something little</p>
        <h1 className="picker-title" id="picker-title">select what you want<br />your beloved to see.</h1>
        <p className="picker-subtitle">choose as many as you like.</p>

        <div className="options-row">
          {options.map(([name, symbol]) => {
            const active = selected.includes(name)
            return (
              <button
                key={name}
                className={`option-chip${active ? ' active' : ''}`}
                aria-pressed={active}
                onClick={() => toggle(name)}
              >
                <span>{name}</span>
                <span aria-hidden="true">{symbol}</span>
              </button>
            )
          })}
        </div>

        <button
          className={`continue-button${selected.length ? ' ready' : ''}`}
          disabled={!selected.length}
          onClick={() => {}}
        >
          {selected.length ? `continue with ${selected.length} ${selected.length === 1 ? 'choice' : 'choices'} →` : 'choose something first'}
        </button>
      </section>
    </main>
  )
}

export default function App() {
  const [page, setPage] = useState('home')
  return page === 'home'
    ? <Home onStart={() => setPage('picker')} />
    : <WorldPicker onBack={() => setPage('home')} />
}
