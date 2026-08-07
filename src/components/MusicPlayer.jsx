import { useEffect, useRef, useState } from "react";
import { createAudioEngine } from "../utils/audio";

export default function MusicPlayer({ show, autoStart }) {
  const engineRef = useRef(null);
  const startedRef = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    engineRef.current = createAudioEngine(1);
    engineRef.current.setVolume(1);

    return () => engineRef.current?.stop();
  }, []);

  useEffect(() => {
    async function startMusic() {
      if (autoStart && !startedRef.current && engineRef.current) {
        startedRef.current = true;
        await engineRef.current.start();
        engineRef.current.setVolume(1);
        setPlaying(true);
      }
    }

    startMusic();
  }, [autoStart]);

  async function toggle() {
    if (!engineRef.current) return;
    engineRef.current.init();

    if (engineRef.current.getIsPlaying()) {
      engineRef.current.pause();
      setPlaying(false);
    } else {
      await engineRef.current.start();
      engineRef.current.setVolume(1);
      setPlaying(true);
    }
  }

  return (
    <div
      className={`fixed bottom-5 right-4 z-[150] transition-all duration-500 sm:bottom-6 sm:right-6 ${
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-5 opacity-0"
      }`}
    >
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
}
