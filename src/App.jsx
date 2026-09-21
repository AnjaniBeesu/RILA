import { useState } from 'react'

function Heart({ className = '' }) {
  return (
    <span aria-hidden="true" className={`heart ${className}`}>
      ♡
    </span>
  )
}

function App() {
  const [hint, setHint] = useState(false)

  return (
    <main className="home">
      <div className="atmosphere" aria-hidden="true">
        <span className="spark spark-one">✦</span>
        <span className="spark spark-two">·</span>
        <span className="spark spark-three">✦</span>
        <span className="spark spark-four">·</span>
      </div>

      <header className="site-header">
        <a className="brand" href="/" aria-label="Rila home">
          rila
        </a>

        <nav className="nav" aria-label="Main navigation">
          <button className="text-link" onClick={() => setHint(true)}>
            how it works
          </button>
          <button className="text-link" onClick={() => setHint(true)}>
            open a rila
          </button>
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <p className="eyebrow">a little place on the internet</p>
        <h1 id="hero-title">
          a tiny world
          <br />
          for someone you love.
        </h1>
        <p className="intro">
          Make them a letter, a bouquet, a tune, a drawing — or a whole little
          world of your own.
        </p>

        <div className="actions">
          <button className="primary" onClick={() => setHint(true)}>
            make a little world <span aria-hidden="true">→</span>
          </button>
          <button className="secondary" onClick={() => setHint(true)}>
            I have a Rila <span aria-hidden="true">↗</span>
          </button>
        </div>

        <div className="tiny-note" aria-hidden="true">
          <Heart />
          made with a little bit of love
        </div>
      </section>

      <footer className="site-footer">
        <span>rila</span>
        <span>for all the people who make your world feel a little bigger.</span>
      </footer>

      {hint && (
        <div className="coming-soon" role="dialog" aria-modal="true" aria-label="Rila is coming soon">
          <div className="note-card">
            <button className="close" onClick={() => setHint(false)} aria-label="Close">
              ×
            </button>
            <span className="note-flower" aria-hidden="true">✿</span>
            <p className="note-kicker">the little workshop is waking up</p>
            <h2>Rila is almost ready.</h2>
            <p>We’re building the tiny world first. Soon you’ll be able to make one and send it to someone special.</p>
            <button className="note-button" onClick={() => setHint(false)}>okay, I’ll wait ♡</button>
          </div>
        </div>
      )}
    </main>
  )
}

export default App
