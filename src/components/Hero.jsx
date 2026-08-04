import { useCountdown } from "../hooks/useCountdown";

function CountdownBox({ value, label }) {
  return (
    <div className="w-[72px] rounded-xl border border-white/15 bg-black/25 py-2.5 text-center backdrop-blur-[2px]">
      <div className="font-cinzel text-[22px] text-beige">{value}</div>
      <div className="mt-1 font-poppins text-[10px] uppercase tracking-[2px] opacity-70">{label}</div>
    </div>
  );
}

export default function Hero() {
  const { days, hours, mins, secs } = useCountdown();

  return (
    <section id="hero" className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden text-center">
      <img
        src="/images/hero-newspaper.JPG"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[50%_58%]"
        fetchPriority="high"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_32%,rgba(73,0,18,.45),transparent_58%),linear-gradient(180deg,rgba(7,2,3,.66)_0%,rgba(19,2,7,.72)_48%,rgba(5,2,3,.92)_100%)]" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-4 text-[34px] text-gold animate-floaty">♛</div>
        <div className="mb-4 font-poppins text-xs uppercase tracking-[3px] text-beige opacity-80">
          Countdown to August 22, 2026
        </div>
        <h1 className="text-[clamp(38px,7vw,74px)] leading-[1.05] text-white [text-shadow:0_2px_35px_rgba(0,0,0,.9)]">
          Jamaica Tyfany
          <br />
          <span className="text-gold-soft">Julongbayan</span>
        </h1>
        <div className="mt-2.5 font-vibes text-[clamp(24px,4vw,38px)] text-gold-soft [text-shadow:0_2px_18px_rgba(0,0,0,.9)]">
          Celebrating 18 Beautiful Years
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2.5 opacity-90">
          <CountdownBox value={days} label="Days" />
          <CountdownBox value={hours} label="Hours" />
          <CountdownBox value={mins} label="Minutes" />
          <CountdownBox value={secs} label="Seconds" />
        </div>

        <button
          className="gold-btn mt-[50px]"
          onClick={() => document.getElementById("invitation").scrollIntoView({ behavior: "smooth" })}
        >
          View Invitation
        </button>
      </div>
    </section>
  );
}
