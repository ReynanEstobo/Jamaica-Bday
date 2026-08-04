import { useReveal, revealClass } from "../hooks/useReveal";

const SWATCHES = [
  ["#172554", "Dark Blue"],
  ["#121212", "Black"],
  ["#ffffff", "White"],
  ["#6B7280", "Grey"],
  ["#D8C3A5", "Beige"],
];

export default function DressCode() {
  const [headerRef, headerIn] = useReveal();
  const [cardRef, cardIn] = useReveal();

  return (
    <section id="dresscode">
      <div ref={headerRef} className={revealClass(headerIn)}>
        <div className="eyebrow">Attire</div>
        <h2 className="sec-title">
          Dress Code
          <span className="mt-1 block font-vibes text-[1.4em] text-gold-soft">Smart Casual</span>
        </h2>
      </div>

      <div ref={cardRef} className={`glass-card mt-8 px-6 py-10 text-center sm:px-10 sm:py-14 ${revealClass(cardIn)}`}>
        <p className="mx-auto max-w-2xl text-xl leading-relaxed text-beige/90">
          Men/Women — dark blue, black, white, grey, or beige.
        </p>

        <div className="my-9 flex flex-wrap justify-center gap-5 sm:gap-8">
          {SWATCHES.map(([color, label]) => (
            <div className="text-center" key={label}>
              <div className="mx-auto h-14 w-14 rounded-full border-2 border-white/20 shadow-[0_8px_24px_rgba(0,0,0,.4)] sm:h-16 sm:w-16" style={{ background: color }} />
              <div className="mt-3 font-poppins text-[10px] uppercase tracking-[1.5px] text-beige/75">{label}</div>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-xl border-t border-gold/25 pt-7">
          <h3 className="font-cinzel text-lg text-gold-soft">Dress Code for 18 Roses</h3>
          <p className="mt-2 text-lg text-beige/85">Black polo shirt and black pants.</p>
        </div>
      </div>
    </section>
  );
}
