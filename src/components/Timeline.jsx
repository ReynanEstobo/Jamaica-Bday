import { useReveal, revealClass } from '../hooks/useReveal'

const TIMELINE_DATA = [
  'Grand Entrance of Debutant',
  'Opening Prayer',
  '18 Perfume',
  '18 Gifts',
  '18 Cosmetics',
  '18 Alfonso',
  '18 Bills',
  '18 Candles and Wishes',
  '18 Roses',
  '18 Shots',
  'Singing Happy Birthday',
  'Message of the Parents',
  'Appreciation Message of the Debutant',
]

function TimelineItem({ title }) {
  const [ref, revealed] = useReveal()
  return (
    <div
      ref={ref}
      className={`relative pb-[38px]
        before:content-[''] before:absolute before:-left-[34px] before:top-1
        before:w-3 before:h-3 before:rounded-full before:bg-gold before:shadow-[0_0_12px_rgba(212,175,55,0.7)]
        ${revealClass(revealed)}`}
    >
      <div className="font-cinzel text-xl text-white">{title}</div>
    </div>
  )
}

export default function Timeline() {
  const [headerRef, headerIn] = useReveal()

  return (
    <section id="timeline">
      <div ref={headerRef} className={revealClass(headerIn)}>
        <div className="eyebrow">Program</div>
        <h2 className="sec-title">
          Celebration<span className="font-vibes text-gold-soft text-[1.4em] block mt-1">Timeline</span>
        </h2>
      </div>
      <div
        className="relative mt-10 pl-[34px]
          before:content-[''] before:absolute before:left-1.5 before:top-0 before:bottom-0 before:w-px
          before:bg-gradient-to-b before:from-gold before:to-transparent"
      >
        {TIMELINE_DATA.map((title) => (
          <TimelineItem key={title} title={title} />
        ))}
      </div>
    </section>
  )
}
