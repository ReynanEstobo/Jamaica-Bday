import { useEffect, useRef, useState } from "react";
import { useReveal, revealClass } from "../hooks/useReveal";

const IMAGES = [
  "/images/gallery/IMG_3547.JPG",
  "/images/gallery/IMG_3446.JPG",
  "/images/gallery/IMG_3588.JPG",
  "/images/gallery/IMG_3433.JPG",
  "/images/gallery/IMG_3538.JPG",
  "/images/gallery/IMG_3440.JPG",
  "/images/gallery/IMG_3585.JPG",
  "/images/gallery/IMG_3475.JPG",
  "/images/gallery/IMG_3568.JPG",
  "/images/gallery/IMG_3479.JPG",
];

const LOOP_IMAGES = [...IMAGES, ...IMAGES, ...IMAGES];

function GalleryImage({ src, number, fullScreen = false, featured = false }) {
  return (
    <>
      <span
        className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_35%,rgba(212,175,55,0.14),transparent_45%),linear-gradient(145deg,#3a0713,#16080b)] text-gold-soft ${
          fullScreen ? "m-4 rounded-2xl sm:m-10" : ""
        }`}
        aria-hidden="true"
      >
        <span className="font-vibes text-4xl sm:text-5xl">Jamaica</span>
        <span className="mt-2 font-poppins text-[9px] uppercase tracking-[3px] opacity-60">
          Photo {number}
        </span>
      </span>
      <img
        src={src}
        alt={`Gallery photo ${number}`}
        loading={fullScreen ? "eager" : "lazy"}
        decoding="async"
        className={
          fullScreen
            ? "relative z-10 max-h-full max-w-full select-none object-contain"
            : `relative z-10 h-full w-full object-cover object-center transition-transform duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] ${
                featured ? "scale-[1.035]" : "scale-100"
              }`
        }
        draggable="false"
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
      />
    </>
  );
}

export default function Gallery() {
  const [headerRef, headerIn] = useReveal();
  const start = IMAGES.length;
  const [active, setActive] = useState(start);
  const [animate, setAnimate] = useState(true);
  const [offset, setOffset] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [autoplayReset, setAutoplayReset] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const cardRef = useRef(null);
  const containerRef = useRef(null);
  const lightboxRef = useRef(null);
  const touchStartX = useRef(0);
  const suppressClickUntil = useRef(0);

  function updatePosition() {
    if (!cardRef.current || !containerRef.current) return;
    setOffset(
      containerRef.current.offsetWidth / 2 - cardRef.current.offsetWidth / 2,
    );
  }

  function openLightbox(index) {
    if (Date.now() < suppressClickUntil.current) return;
    setLightboxIndex(index % IMAGES.length);
  }

  function handleTouchStart(event) {
    touchStartX.current = event.touches[0].clientX;
    setIsDragging(true);
    setDragOffset(0);
    setAutoplayReset((reset) => reset + 1);
  }

  function handleTouchMove(event) {
    const distance = event.touches[0].clientX - touchStartX.current;
    setDragOffset(distance);
  }

  function handleTouchEnd(event) {
    const distance = event.changedTouches[0].clientX - touchStartX.current;
    setIsDragging(false);
    setDragOffset(0);
    if (Math.abs(distance) < 45) return;

    suppressClickUntil.current = Date.now() + 350;
    setActive((current) => current + (distance < 0 ? 1 : -1));
  }

  function handleTouchCancel() {
    setIsDragging(false);
    setDragOffset(0);
  }

  useEffect(() => {
    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  useEffect(() => {
    if (active >= IMAGES.length * 2 || active <= 0) {
      const resetTimer = setTimeout(() => {
        setAnimate(false);
        setActive(start);
      }, 925);
      const animateTimer = setTimeout(() => setAnimate(true), 950);

      return () => {
        clearTimeout(resetTimer);
        clearTimeout(animateTimer);
      };
    }
    return undefined;
  }, [active, start]);

  useEffect(() => {
    if (lightboxIndex !== null || isDragging) return undefined;

    const autoplay = window.setTimeout(() => {
      setActive((current) => current + 1);
    }, 3000);

    return () => window.clearTimeout(autoplay);
  }, [active, autoplayReset, isDragging, lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex === null) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => {
      lightboxRef.current?.scrollTo({
        left: lightboxRef.current.clientWidth * lightboxIndex,
      });
    });
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setLightboxIndex(null);
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [lightboxIndex]);

  return (
    <>
      <section id="gallery" className="w-full overflow-hidden py-12 sm:py-16">
        <div ref={headerRef} className={revealClass(headerIn)}>
          <div className="eyebrow">Memories</div>
          <h2 className="sec-title text-center">
            Gallery
            <span className="mt-1 block font-vibes text-[1.2em] text-gold-soft sm:text-[1.35em]">
              of Moments
            </span>
          </h2>
        </div>

        <div
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchCancel}
          className="relative w-full touch-pan-y overflow-hidden py-8 sm:py-10"
        >
          <div
            className={`flex items-center justify-start gap-5 ${
              animate && !isDragging
                ? "transform-gpu will-change-transform transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)]"
                : ""
            }`}
            style={{
              transform: `translate3d(${offset - active * (cardRef.current?.offsetWidth + 20 || 0) + dragOffset}px, 0, 0)`,
            }}
          >
            {LOOP_IMAGES.map((img, index) => {
              const distance = Math.abs(index - active);
              const emphasis =
                distance === 0
                  ? "scale-105 border-gold/80 opacity-100 shadow-[0_20px_50px_rgba(212,175,55,.25)] z-20"
                  : distance === 1
                    ? "scale-95 border-gold/40 opacity-75 z-10"
                    : distance === 2
                      ? "scale-90 border-gold/20 opacity-50 z-0"
                      : "scale-85 border-transparent opacity-30 blur-[2px] z-0";

              return (
                <button
                  type="button"
                  key={index}
                  ref={index === active ? cardRef : null}
                  onClick={() => openLightbox(index)}
                  className={`relative h-[250px] w-[180px] flex-none cursor-pointer overflow-hidden rounded-3xl border p-0 transition-[transform,opacity,border-color,box-shadow,filter] duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] sm:h-[350px] sm:w-[260px] ${emphasis}`}
                  aria-label={`Open gallery photo ${(index % IMAGES.length) + 1} full screen`}
                >
                  <GalleryImage
                    src={img}
                    number={(index % IMAGES.length) + 1}
                    featured={distance === 0}
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </button>
              );
            })}
          </div>
        </div>

        <p className="text-center font-poppins text-[10px] uppercase tracking-[2px] text-beige/50">
          Swipe or tap a photo to view
        </p>
      </section>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[1000] bg-black/95"
          role="dialog"
          aria-modal="true"
          aria-label="Full-screen photo gallery"
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="fixed right-4 top-4 z-[1002] flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/40 text-2xl text-white backdrop-blur-md sm:right-7 sm:top-7"
            aria-label="Close full-screen gallery"
          >
            &times;
          </button>

          <div
            ref={lightboxRef}
            className="flex h-full w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {IMAGES.map((img, index) => (
              <div
                key={img}
                className="relative flex h-full min-w-full snap-center items-center justify-center p-4 sm:p-10"
              >
                <GalleryImage src={img} number={index + 1} fullScreen />
              </div>
            ))}
          </div>

          <p className="pointer-events-none fixed bottom-5 left-1/2 z-[1001] -translate-x-1/2 whitespace-nowrap rounded-full bg-black/45 px-4 py-2 font-poppins text-[10px] uppercase tracking-[2px] text-white/70 backdrop-blur-md">
            Swipe to view more
          </p>
        </div>
      )}
    </>
  );
}
