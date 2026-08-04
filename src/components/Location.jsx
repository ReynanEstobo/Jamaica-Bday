import { useReveal, revealClass } from "../hooks/useReveal";

// Geographic point directly below ZANDER in the supplied map reference.
// Using coordinates makes Google's marker part of the map, so it stays on
// this location when the user pans or zooms.
const MAP_QUERY = "13.97175,120.73598";

export default function Location() {
  const [headerRef, headerIn] = useReveal();
  const [mapRef, mapIn] = useReveal();

  return (
    <section id="location">
      <div ref={headerRef} className={revealClass(headerIn)}>
        <div className="eyebrow">Find Us</div>
        <h2 className="sec-title">
          Venue
          <span className="mt-1 block font-vibes text-[1.4em] text-gold-soft">
            Dao, Balayan, Batangas
          </span>
        </h2>
      </div>
      <div
        ref={mapRef}
        className={`relative mt-8 min-h-[340px] overflow-hidden rounded-2xl border border-gold/35 bg-[#120a0a] sm:aspect-[16/7] ${revealClass(mapIn)}`}
      >
        <iframe
          title={`Map of ${MAP_QUERY}`}
          src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`}
          className="h-full min-h-[340px] w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <button
          type="button"
          className="ghost-btn absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#120909]/90 backdrop-blur-md"
          onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`, "_blank", "noopener,noreferrer")}
        >
          Get Directions
        </button>
      </div>
    </section>
  );
}
