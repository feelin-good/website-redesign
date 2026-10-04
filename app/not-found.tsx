import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="wrap">
      <section className="chapter">
        <div className="num" aria-hidden>4<span>04</span></div>
        <div className="txt">
          <p className="mono mute">error · no signal</p>
          <h1 className="h1">Nothing on <em>this channel.</em></h1>
          <p><Link className="key" href="/">home<span className="led" /></Link></p>
        </div>
      </section>
    </div>
  )
}
