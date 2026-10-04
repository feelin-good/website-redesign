import Link from 'next/link'

export default function NotFound() {
  return (
    <section style={{ padding: 'clamp(40px, 8vw, 120px) var(--gutter)' }}>
      <p className="ref">Error · sheet not in register</p>
      <h1 className="display" style={{ margin: '14px 0 22px' }}>No such <em>drawing.</em></h1>
      <Link className="stamp ink" href="/">Back to the general arrangement →</Link>
    </section>
  )
}
