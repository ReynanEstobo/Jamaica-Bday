import { useEffect, useState } from "react";
import { SITE_IMAGES } from "../data/siteImages";

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(src);
    image.onerror = () => reject(new Error(`Unable to load ${src}`));
    image.src = src;

    if (image.complete) {
      image.naturalWidth > 0 ? resolve(src) : reject(new Error(`Unable to load ${src}`));
    }
  });
}

export default function ImagePreloader({ children }) {
  const [attempt, setAttempt] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [failed, setFailed] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    let completed = 0;

    setLoaded(0);
    setFailed([]);
    setReady(false);

    Promise.allSettled(
      SITE_IMAGES.map((src) =>
        loadImage(src).finally(() => {
          completed += 1;
          if (active) setLoaded(completed);
        }),
      ),
    ).then((results) => {
      if (!active) return;

      const failures = results
        .map((result, index) => (result.status === "rejected" ? SITE_IMAGES[index] : null))
        .filter(Boolean);

      setFailed(failures);
      setReady(failures.length === 0);
    });

    return () => {
      active = false;
    };
  }, [attempt]);

  if (ready) return children;

  const progress = Math.round((loaded / SITE_IMAGES.length) * 100);

  return (
    <div className="fixed inset-0 z-[2000] flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_50%_36%,#4a111d_0%,#21090e_43%,#080405_100%)] px-6 text-center">
      <div className="font-vibes text-5xl text-gold-soft">Jamaica</div>
      <p className="mt-3 font-poppins text-[10px] uppercase tracking-[0.3rem] text-white/60">
        {failed.length ? "Some photos could not be loaded" : "Preparing your invitation"}
      </p>

      <div className="mt-8 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#9d7620] to-gold-soft transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-3 font-cinzel text-sm text-gold-soft" aria-live="polite">
        {failed.length ? `${failed.length} photo${failed.length === 1 ? "" : "s"} unavailable` : `${progress}%`}
      </p>

      {failed.length > 0 && (
        <button className="gold-btn" type="button" onClick={() => setAttempt((value) => value + 1)}>
          Retry Photos
        </button>
      )}
    </div>
  );
}

