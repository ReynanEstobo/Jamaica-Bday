import { useReveal, revealClass } from '../hooks/useReveal'

export default function About() {
  const [portraitRef, portraitIn] = useReveal()
  const [textRef, textIn] = useReveal()

  return (
    <section id="about">
      <div className="grid grid-cols-[1fr_1.2fr] max-[800px]:grid-cols-1 gap-[60px] items-center">
        <div
          ref={portraitRef}
          className={`relative aspect-[3/4] rounded-2xl overflow-hidden
            bg-gradient-to-br from-crimson/50 to-ink/90 border border-gold/35
            flex items-center justify-center font-cinzel text-gold-soft text-sm tracking-[2px]
            before:content-[''] before:absolute before:inset-0
            before:bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.25),transparent_60%)]
            ${revealClass(portraitIn)}`}
        >
          <img
            src="/images/celebrant-portrait.png"
            alt="Jamaica Tyfany Julongbayan, the celebrant"
            width="1024"
            height="1536"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain object-bottom [image-rendering:auto]"
          />
        </div>
        <div ref={textRef} className={revealClass(textIn)}>
          <div className="eyebrow">About the Debut</div>
          <h2 className="sec-title">
            Eighteen Years<span className="font-vibes text-gold-soft text-[1.4em] block mt-1">of Grace</span>
          </h2>
          <p className="text-[19px] leading-[1.8] opacity-90 mt-4">
            From her first steps to the woman she has become, this milestone celebrates
            a journey of laughter, learning, and love. Jamaica steps into adulthood
            carrying the values of family, faith, and gratitude â€” ready to write the
            next beautiful chapter of her story, surrounded by everyone who has shaped it.
          </p>
        </div>
      </div>
    </section>
  )
}

