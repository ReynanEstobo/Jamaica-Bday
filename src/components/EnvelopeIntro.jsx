import { useEffect, useMemo, useRef, useState } from "react";

export default function EnvelopeIntro({ onOpened }) {
  const [opening, setOpening] = useState(false);
  const [flapBehind, setFlapBehind] = useState(false);
  const [cardMoving, setCardMoving] = useState(false);
  const [launching, setLaunching] = useState(false);
  const [hidden, setHidden] = useState(false);
  const timers = useRef([]);

  // Lock scrolling while envelope intro is active
  useEffect(() => {
    if (!hidden) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [hidden]);

  useEffect(
    () => () => timers.current.forEach((timer) => clearTimeout(timer)),
    [],
  );

  // Generate particles only once
  const particles = useMemo(
    () =>
      [...Array(14)].map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${4 + Math.random() * 8}px`,
        duration: `${10 + Math.random() * 8}s`,
        delay: `${Math.random() * 6}s`,
      })),
    [],
  );

  function handleOpen() {
    if (opening) return;

    // Start opening
    setOpening(true);

    // Change the flap's depth only after it passes the 90-degree midpoint.
    timers.current.push(setTimeout(() => {
      setFlapBehind(true);
    }, 670));

    // Let the flap finish and settle before the card begins to rise.
    timers.current.push(setTimeout(() => {
      setCardMoving(true);
    }, 1340));

    // Envelope transition
    timers.current.push(setTimeout(() => {
      setLaunching(true);
    }, 2920));

    // Reveal website
    timers.current.push(setTimeout(() => {
      setHidden(true);

      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";

      window.scrollTo({
        top: 0,
        behavior: "instant",
      });

      onOpened?.();
    }, 3820));
  }

  return (
    <>
      {" "}
      <style>{`
        @keyframes floatParticle {
          0%{
            transform:
              translateY(25px)
              translateX(0px)
              scale(.7);
            opacity:0;
          }

          20%{
            opacity:.85;
          }

          50%{
            transform:
              translateY(-25px)
              translateX(12px)
              scale(1);
          }

          100%{
            transform:
              translateY(-90px)
              translateX(-12px)
              scale(.8);
            opacity:0;
          }
        }

        @keyframes envelopeRespond {
          0% { transform: translate3d(0,0,0) rotate(0); }
          7% { transform: translate3d(-3px,1px,0) rotate(-.35deg); }
          14% { transform: translate3d(4px,-1px,0) rotate(.45deg); }
          21% { transform: translate3d(-3px,0,0) rotate(-.3deg); }
          28% { transform: translate3d(2px,-1px,0) rotate(.22deg); }
          36% { transform: translate3d(-1px,0,0) rotate(-.1deg); }
          48% { transform: translate3d(0,2px,0) rotate(0); }
          72% { transform: translate3d(0,-1px,0) rotate(0); }
          100% { transform: translate3d(0,0,0) rotate(0); }
        }

        @keyframes sealRelease {
          0% { transform: translate(-50%,-50%) rotate(0) scale(1); opacity:1; }
          32% { transform: translate(-50%,-44%) rotate(-3deg) scale(1.025); opacity:1; }
          100% { transform: translate(-50%,-22%) rotate(7deg) scale(.78); opacity:0; }
        }

        @keyframes introDepart {
          0% { transform: translateY(0) scale(1); opacity:1; filter:blur(0); }
          100% { transform: translateY(-22px) scale(1.12); opacity:0; filter:blur(3px); }
        }

        @keyframes cardRise {
          0% {
            transform: translateY(30%) scale(1);
            box-shadow: 0 8px 18px rgba(65,42,20,.2);
            clip-path: inset(0 0 20% 0 round 10px);
          }
          24% {
            clip-path: inset(0 0 0 0 round 10px);
          }
          100% {
            transform: translateY(-85%) scale(1.018);
            box-shadow: 0 24px 45px rgba(0,0,0,.3);
            clip-path: inset(0 0 0 0 round 10px);
          }
        }

        .envelope-opening { animation: envelopeRespond 1.15s cubic-bezier(.25,.7,.25,1); }
        .seal-releasing { animation: sealRelease .55s cubic-bezier(.4,0,.7,.2) forwards; }
        .intro-departing { animation: introDepart .9s cubic-bezier(.45,0,.2,1) forwards; }
        .card-rising {
          animation: cardRise 1.4s cubic-bezier(.2,.72,.22,1) forwards;
          will-change: transform, box-shadow;
        }
        .envelope-stage {
          --envelope-radius: clamp(10px, 3.4vw, 16px);
          width: min(430px, 88vw, 74dvh);
          min-width: 220px;
          aspect-ratio: 1.55 / 1;
          container-type: inline-size;
          filter: drop-shadow(0 28px 26px rgba(0,0,0,.24));
        }

        .envelope-intro {
          min-height: 100vh;
          min-height: 100dvh;
          padding: max(18px, env(safe-area-inset-top)) max(14px, env(safe-area-inset-right)) max(18px, env(safe-area-inset-bottom)) max(14px, env(safe-area-inset-left));
        }

        .envelope-shell, .envelope-shell > .envelope-clip { border-radius: var(--envelope-radius); }

        .envelope-flap {
          inset-inline: 0;
          width: 100%;
          height: 55%;
          transform-box: border-box;
          transform-origin: 50% 0%;
          clip-path: polygon(0 0, 100% 0, 50% 100%);
          -webkit-clip-path: polygon(0 0, 100% 0, 50% 100%);
          will-change: transform;
        }

        .envelope-pocket {
          height: 62%;
          border-radius: 0 0 var(--envelope-radius) var(--envelope-radius);
          clip-path: polygon(0 0, 50% 35%, 100% 0, 100% 100%, 0 100%);
          -webkit-clip-path: polygon(0 0, 50% 35%, 100% 0, 100% 100%, 0 100%);
        }

        .invitation-card { border-radius: clamp(7px, 2.4cqw, 12px); }
        .invitation-card .card-kicker { font-size: clamp(7px, 2.35cqw, 10px); letter-spacing: clamp(.18rem, 1.25cqw, .38rem); }
        .invitation-card .card-roman { font-size: clamp(9px, 2.8cqw, 12px); letter-spacing: clamp(.18rem, 1.1cqw, .32rem); }
        .invitation-card .card-event { font-size: clamp(8px, 2.55cqw, 11px); letter-spacing: clamp(.12rem, .9cqw, .25rem); }

        .paper-grain {
          background-image:
            linear-gradient(115deg, rgba(255,255,255,.22), transparent 38%),
            repeating-linear-gradient(103deg, transparent 0 8px, rgba(118,82,30,.025) 9px, transparent 10px);
          mix-blend-mode: soft-light;
        }

        .wax-seal {
          box-shadow:
            0 9px 18px rgba(44,5,14,.42),
            0 2px 3px rgba(0,0,0,.28),
            inset 3px 4px 7px rgba(255,167,176,.16),
            inset -5px -6px 10px rgba(42,3,12,.34);
        }

        .intro-copy { margin-top: clamp(1.5rem, 4vh, 2.5rem); }

        @media (max-width: 520px) {
          .envelope-stage { width: min(90vw, 72dvh); min-width: 0; }
          .intro-copy { width: 90vw; }
          .intro-copy h3 { font-size: 1.8rem; }
          .intro-copy p { font-size: 9px; letter-spacing: .2rem; line-height: 1.7; }
          .wax-seal { width: 54px; height: 54px; }
        }

        @media (max-height: 620px) {
          .envelope-stage { width: min(360px, 78vw, 58dvh); }
          .intro-copy { margin-top: 1rem; }
          .intro-copy h3 { font-size: 1.6rem; }
          .intro-copy p { margin-top: .4rem; }
        }

        @media (max-height: 460px) and (orientation: landscape) {
          .envelope-intro { flex-direction: row; gap: clamp(18px, 5vw, 54px); }
          .envelope-stage { width: min(330px, 48vw, 72dvh); flex: 0 0 auto; }
          .intro-copy { width: min(42vw, 360px); margin-top: 0; }
        }

        @media (max-width: 300px) {
          .envelope-stage { width: 92vw; }
          .intro-copy h3 { font-size: 1.5rem; }
          .intro-copy p { letter-spacing: .12rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .envelope-opening, .seal-releasing, .intro-departing { animation-duration: 1ms; }
        }


        .floating-particle{
          position:absolute;

          border-radius:9999px;

          background:
          radial-gradient(circle,
          rgba(255,245,215,1) 0%,
          rgba(212,175,55,.85) 55%,
          rgba(212,175,55,0) 100%);

          animation:
          floatParticle
          linear
          infinite;
        }
      `}</style>
      <div
        className={`envelope-intro
        fixed

        inset-0

        z-[999]

        flex

        flex-col

        items-center

        justify-center

        overflow-hidden


        bg-[radial-gradient(ellipse_at_50%_36%,#4a111d_0%,#21090e_43%,#080405_100%)]


        transition-opacity

        duration-[800ms]


        ${
          hidden
            ? "opacity-0 invisible pointer-events-none"
            : "opacity-100 visible"
        }
        `}
      >
        {/* Ambient Glow */}

        <div
          className="
          absolute

          w-[550px]

          h-[550px]

          rounded-full

          bg-gold/10

          blur-[150px]
          "
        />

        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(0,0,0,.36)_100%)]" />

        {/* Floating Particles */}

        <div
          className="
          absolute

          inset-0

          pointer-events-none

          overflow-hidden
          "
        >
          {particles.map((particle) => (
            <span
              key={particle.id}
              className="floating-particle"
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
                animationDuration: particle.duration,
                animationDelay: particle.delay,
              }}
            />
          ))}

          <span className="absolute left-[18%] top-[20%] text-gold/30 text-xl animate-pulse">
            ✦
          </span>

          <span className="absolute right-[20%] top-[18%] text-gold/25 text-lg animate-pulse delay-300">
            ✧
          </span>

          <span className="absolute left-[25%] bottom-[18%] text-gold/30 text-lg animate-pulse delay-700">
            ✦
          </span>

          <span className="absolute right-[22%] bottom-[25%] text-gold/25 text-xl animate-pulse delay-1000">
            ✧
          </span>
        </div>

        {/* Envelope */}

        <div
          className={`envelope-stage
          relative

          ${opening ? "envelope-opening" : ""}
          ${launching ? "intro-departing" : ""}
          `}
        >
          <div className="absolute -bottom-[12%] left-[8%] h-[16%] w-[84%] rounded-full bg-black/45 blur-xl transition-all duration-1000" />

          {/* Envelope Base */}

          <div
            className={`envelope-shell
            absolute

            inset-0

            rounded-2xl


            border

            border-[#d5bb7a]


            bg-gradient-to-br

            from-[#f9f3e7]

            via-[#efe3c7]

            to-[#dcc8a3]


            shadow-[0_35px_70px_rgba(0,0,0,.35)]

            overflow-visible
            `}
          >
            <div className="envelope-clip absolute inset-0 overflow-hidden">
              <div className="paper-grain absolute inset-0 opacity-70" />
            </div>

            {/* Interior lining visible when the flap opens */}
            <div className="absolute inset-[2px] z-[2] overflow-hidden rounded-[15px] bg-gradient-to-b from-[#fffaf0] via-[#f1e4c8] to-[#dfc89b]">
              <div className="absolute inset-0 opacity-25 bg-[repeating-linear-gradient(135deg,transparent_0px,transparent_9px,rgba(146,106,45,.12)_10px,transparent_11px)]" />
              <div className="absolute inset-x-[6%] top-[7%] h-px bg-[#c8a85c]/25" />
            </div>
            {/* Decorative Border */}

            <div
              className="
              absolute

              inset-[10px]

              rounded-[10px]

              border

              border-[#c6a552]/30

              z-[3]
              "
            />

            {/* Invitation Card */}

            <div className="absolute inset-0 z-[15] overflow-visible rounded-2xl">
            <div
              className={`invitation-card
              absolute


              left-[7%]

              right-[7%]


              top-[18%]


              bottom-[8%]


              rounded-[9px]


              bg-gradient-to-b

              from-[#fffefb]

              to-[#f7f2e7]


              border

              border-[#c7a85d]/35



              shadow-[0_8px_18px_rgba(65,42,20,.2)]


              flex

              flex-col

              justify-center

              items-center


              text-center

              overflow-hidden



              ${
                cardMoving
                  ? "card-rising"
                  : "translate-y-[30%] [clip-path:inset(0_0_20%_0_round_10px)]"
              }

              `}
            >
              <img
                src="/images/envelope-family.JPG"
                alt="Jamaica with her family"
                className="absolute bottom-[12%] left-[7%] top-[12%] w-[37%] -rotate-2 rounded-sm border-2 border-white object-cover object-[50%_42%] shadow-[0_7px_14px_rgba(65,42,20,.3),0_1px_2px_rgba(65,42,20,.25)]"
              />
              <div className="paper-grain pointer-events-none absolute inset-0 opacity-40" />
              <div className="absolute bottom-[12%] left-[48%] right-[7%] top-[12%] flex flex-col items-center justify-center overflow-hidden rounded-md border border-[#c6a552]/35 bg-[#fffdf8]/80 px-2 text-center shadow-[inset_0_0_18px_rgba(198,165,82,.06)]">
                <div className="mb-1.5 flex items-center gap-1.5">
                  <span className="h-px w-4 bg-gradient-to-r from-transparent to-[#b48a31]" />
                  <span className="text-[7px] text-[#b48a31]">◆</span>
                  <span className="h-px w-4 bg-gradient-to-l from-transparent to-[#b48a31]" />
                </div>
                <p className="font-cinzel text-[clamp(6px,1.6cqw,8px)] uppercase leading-relaxed tracking-[.09em] text-[#8a692b]">
                  You are cordially invited to
                </p>
                <p className="mt-1.5 font-vibes text-[clamp(18px,5.5cqw,26px)] leading-none text-[#8b1830]">
                  Jamaica&apos;s
                </p>
                <h2 className="mt-1.5 flex flex-col font-cinzel uppercase leading-none text-[#4d3331]">
                  <span className="text-[clamp(12px,3.6cqw,17px)] tracking-[.13em]">18th</span>
                  <span className="mt-1 text-[clamp(7px,2.4cqw,11px)] tracking-[.16em]">Birthday</span>
                </h2>
                <p className="mt-2 font-cinzel text-[clamp(5px,1.45cqw,7px)] uppercase tracking-[.09em] text-[#76624d]">
                  August 22, 2026
                </p>
                <div className="mt-1.5 h-px w-10 bg-gradient-to-r from-transparent via-[#b48a31]/70 to-transparent" />
              </div>
              <div className="pointer-events-none absolute inset-[7px] rounded-[7px] border border-[#e8cd7a]/45" />
            </div>
            </div>

            {/* Front Pocket */}

            <div
              className="envelope-pocket
              absolute

              bottom-0

              left-0


              w-full


              z-20


              bg-gradient-to-b

              from-[#f3e8cf]

              via-[#e6d4af]

              to-[#d8c096]


              shadow-[inset_0_1px_0_rgba(255,255,255,.55)]

              [filter:drop-shadow(0_-1px_0_rgba(164,126,62,.28))]
              "
            >
              <div
                className="
                absolute

                inset-x-5

                top-0

                h-px

                bg-white/30
                "
              />

              <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(115deg,transparent_0px,transparent_8px,rgba(255,255,255,.65)_9px,transparent_10px)]" />
            </div>
            {/* Flap */}

            <div
              className={`envelope-flap
              absolute

              top-0

              ${flapBehind ? "z-[4]" : "z-20"}


              rounded-t-2xl


              bg-gradient-to-br

              from-[#f5ebd5]

              to-[#dec89d]


              border-b

              border-gold/20


              shadow-[0_15px_30px_rgba(0,0,0,.18)]


              transition-transform


              duration-[1000ms]


              ease-[cubic-bezier(.45,.02,.2,1)]

              ${opening ? "delay-[160ms]" : "delay-0"}


              ${opening ? "[transform:scaleY(-1)] shadow-[0_-8px_18px_rgba(50,25,12,.12)]" : "[transform:scaleY(1)]"}

              `}
            >
              <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,.34),transparent_42%,rgba(151,114,54,.08))]" />
              <div className="absolute inset-x-[8%] top-2 h-px bg-white/35" />
            </div>

            {/* Wax Seal */}

            <button
              onClick={handleOpen}
              aria-label="Open invitation"
              className={`wax-seal
              absolute


              left-1/2


              top-[55%]


              -translate-x-1/2


              -translate-y-1/2



              z-30



              w-[62px]


              h-[62px]



              rounded-full



              border-2


              border-gold/60



              bg-[radial-gradient(circle_at_30%_30%,#a32842,#6b1223)]



              flex


              items-center


              justify-center



              transition-all



              duration-400



              ease-[cubic-bezier(.22,1,.36,1)]



              hover:scale-105



              ${
                opening
                  ? "seal-releasing pointer-events-none"
                  : ""
              }

              `}
            >
              <span className="absolute inset-[4px] rounded-full border border-[#efcf72]/35 shadow-[inset_0_2px_5px_rgba(255,255,255,.15),inset_0_-4px_8px_rgba(45,3,12,.3)]" />
              <span
                className="
                font-cinzel

                text-[28px]

                text-gold-soft
                "
              >
                J
              </span>
            </button>
          </div>
        </div>

        {/* Bottom Text */}

        <div
          className={`intro-copy


          text-center



          transition-all



          duration-500




          ${cardMoving ? "opacity-0 translate-y-4" : "opacity-100"}

          `}
        >
          <h3
            className="
            font-vibes

            text-[34px]

            text-gold-soft
            "
          >
            An Evening to Remember
          </h3>

          <p
            className="
            mt-3

            uppercase

            tracking-[0.35rem]

            text-[11px]

            text-white/60
            "
          >
            Touch the wax seal to reveal your invitation
          </p>
        </div>
      </div>
    </>
  );
}
