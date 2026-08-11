import { useState } from "react";
import { EVENT_LINKS } from "../data/eventParticipants";

export default function EventQuickNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-[max(1rem,env(safe-area-inset-left))] z-[190] sm:bottom-6 sm:left-6">
      {open && (
        <div className="mb-3 max-h-[60vh] w-[230px] overflow-y-auto rounded-2xl border border-gold/25 bg-[#120909]/95 p-2 shadow-[0_20px_60px_rgba(0,0,0,.55)] backdrop-blur-xl">
          <div className="px-3 py-2 font-poppins text-[9px] uppercase tracking-[2px] text-gold-soft/70">
            Jump to an Event
          </div>
          {EVENT_LINKS.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2.5 font-poppins text-xs text-white/85 transition hover:bg-gold/10 hover:text-gold-soft">
              {label}
            </a>
          ))}
        </div>
      )}
      <button type="button" onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-label={`${open ? "Close" : "Open"} 18 events navigation`} className="flex min-h-11 items-center gap-2 rounded-full border border-gold/35 bg-[#120909]/90 px-4 py-3 font-poppins text-[10px] uppercase tracking-[1.5px] text-gold-soft shadow-[0_12px_35px_rgba(0,0,0,.45)] backdrop-blur-xl transition hover:border-gold/60 hover:bg-[#241016]">
        <span className="text-base">✦</span>
        18 Events
      </button>
    </div>
  );
}
