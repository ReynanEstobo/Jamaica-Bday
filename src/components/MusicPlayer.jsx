import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { createAudioEngine } from "../utils/audio";

const MusicPlayer = forwardRef(function MusicPlayer({ show, autoStart }, ref) {
  const engineRef = useRef(null);
  const startedRef = useRef(false);
  const titleTimerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    engineRef.current = createAudioEngine(1);
    engineRef.current.setVolume(1);

    return () => engineRef.current?.stop();
  }, []);

  useEffect(() => {
    async function startMusic() {
      if (autoStart && !startedRef.current && engineRef.current) {
        startedRef.current = true;
        const didStart = await engineRef.current.start();
        engineRef.current.setVolume(1);
        setPlaying(didStart);
        if (didStart) revealTitle();
      }
    }

    startMusic();
  }, [autoStart]);

  useEffect(
    () => () => window.clearTimeout(titleTimerRef.current),
    [],
  );

  useEffect(() => {
    if (show && playing) revealTitle();
  }, [show, playing]);

  function revealTitle() {
    window.clearTimeout(titleTimerRef.current);
    setShowTitle(true);
    titleTimerRef.current = window.setTimeout(() => setShowTitle(false), 8000);
  }

  async function startPlayback() {
    if (!engineRef.current) return false;

    const didStart = await engineRef.current.start();
    engineRef.current.setVolume(1);
    startedRef.current = didStart;
    setPlaying(didStart);
    return didStart;
  }

  useImperativeHandle(ref, () => ({ start: startPlayback }));

  async function toggle() {
    if (!engineRef.current) return;
    engineRef.current.init();

    if (engineRef.current.getIsPlaying()) {
      engineRef.current.pause();
      setPlaying(false);
      window.clearTimeout(titleTimerRef.current);
      setShowTitle(false);
    } else {
      await startPlayback();
    }
  }

  return (
    <div
      className={`fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-[150] flex items-center gap-2 transition-all duration-500 sm:bottom-6 sm:right-6 ${
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-5 opacity-0"
      }`}
    >
      <div
        role="status"
        aria-live="polite"
        className={`absolute bottom-14 right-0 min-w-0 overflow-hidden rounded-xl border border-gold/30 bg-[#16080b]/95 shadow-[0_12px_35px_rgba(0,0,0,.45)] backdrop-blur-xl transition-all duration-500 sm:relative sm:bottom-auto sm:right-auto ${
          showTitle
            ? "w-[min(270px,calc(100vw-2rem))] translate-y-0 px-4 py-3 opacity-100 sm:w-[270px] sm:translate-x-0"
            : "pointer-events-none w-0 translate-y-3 px-0 py-3 opacity-0 sm:translate-x-4 sm:translate-y-0"
        }`}
      >
        <p className="whitespace-nowrap font-poppins text-[8px] uppercase tracking-[2.5px] text-gold-soft/65">
          Now Playing
        </p>
        <p className="mt-1 whitespace-nowrap font-cinzel text-sm text-white sm:text-base">
          A Whole New World
        </p>
        <p className="mt-0.5 whitespace-nowrap font-poppins text-[9px] text-white/55 sm:text-[10px]">
          Violin Cover by Daniel Jang
        </p>
      </div>

      <button
        type="button"
        onClick={toggle}
        title={playing ? "Mute music" : "Unmute music"}
        aria-label={playing ? "Mute background music" : "Unmute background music"}
        aria-pressed={playing}
        className={`relative flex h-11 w-11 cursor-pointer items-center justify-center bg-transparent text-gold-soft drop-shadow-[0_4px_10px_rgba(0,0,0,.65)] transition duration-300 hover:scale-110 hover:text-gold focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/80 ${
          playing
            ? "text-gold-soft"
            : "text-gold-soft/60"
        }`}
      >
        <svg
          viewBox="0 0 32 32"
          aria-hidden="true"
          className={`h-9 w-9 shrink-0 ${
            playing ? "animate-[pulse_1.8s_ease-in-out_infinite]" : ""
          }`}
        >
          <path fill="currentColor" d="M22.6 8.4a1 1 0 0 0-.84-.19l-8 1.78a1 1 0 0 0-.78.98v8.16a4 4 0 0 0-1.7-.37c-2 0-3.62 1.2-3.62 2.68s1.62 2.68 3.62 2.68 3.62-1.2 3.62-2.68v-6.95l5.96-1.33v3.98a4 4 0 0 0-1.7-.37c-2 0-3.62 1.2-3.62 2.68s1.62 2.68 3.62 2.68 3.62-1.2 3.62-2.68V9.2a1 1 0 0 0-.18-.8Z" />
          {!playing && (
            <path d="M7 7 25 25" fill="none" stroke="#18090d" strokeWidth="4.5" strokeLinecap="round" />
          )}
          {!playing && (
            <path d="M7 7 25 25" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          )}
        </svg>
      </button>
    </div>
  );
});

export default MusicPlayer;
