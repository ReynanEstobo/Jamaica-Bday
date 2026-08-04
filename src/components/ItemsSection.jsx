import { useReveal, revealClass } from "../hooks/useReveal";

function ItemEntry({ index, name, roleLabel, message, special = false }) {
  const [ref, revealed] = useReveal();

  return (
    <div
      ref={ref}
      className={`
      flex

      flex-col

      items-center

      text-center

      min-w-0


      transition-opacity

      duration-500


      ${revealClass(revealed)}

      `}
    >
      {/* NUMBER */}

      <div
        className="
        font-cinzel

        text-gold-soft

        text-xs

        sm:text-base

        tracking-[2px]

        opacity-90
        "
      >
        {String(index).padStart(2, "0")}
      </div>

      {/* DECORATIVE LINE */}

      <div
        className="
        w-8

        h-px

        bg-gold/30

        my-2
        "
      />

      {/* ROLE */}

      <div
        className="
        font-poppins

        uppercase

        tracking-[2px]

        text-[8px]

        sm:text-[10px]


        text-gold-soft


        opacity-80
        "
      >
        {special ? "Special Wish" : roleLabel}
      </div>

      {/* NAME */}

      <div
        className="
        font-cinzel


        text-sm

        sm:text-lg


        text-white


        mt-1


        leading-tight
        "
      >
        {name}
      </div>

      {/* MESSAGE */}

      <div
        className="
        text-[11px]


        sm:text-sm



        opacity-60



        leading-relaxed



        mt-2



        max-w-[130px]

        sm:max-w-[240px]
        "
      >
        {message}
      </div>
    </div>
  );
}

export default function ItemsSection({
  id,

  eyebrow,

  titleMain,

  titleScript,

  roleLabel,

  messages,

  names,
}) {
  const [headerRef, headerIn] = useReveal();

  return (
    <section
      id={id}
      className="
      w-full


      py-14


      sm:py-20
      "
    >
      {/* HEADER */}

      <div ref={headerRef} className={revealClass(headerIn)}>
        <div className="eyebrow">{eyebrow}</div>

        <h2
          className="
          sec-title

          text-center
          "
        >
          {titleMain}

          <span
            className="
            font-vibes


            text-gold-soft



            text-[1.2em]


            sm:text-[1.4em]



            block


            mt-1
            "
          >
            {titleScript}
          </span>
        </h2>
      </div>

      {/* PREMIUM CONTAINER */}

      <div
        className="
        relative


        max-w-5xl


        mx-auto


        mt-12




        rounded-[36px]




        bg-gradient-to-b


        from-white/[0.08]


        to-white/[0.02]




        backdrop-blur-2xl




        border


        border-gold/20




        px-5


        py-12




        sm:px-14


        sm:py-16




        shadow-[0_40px_100px_rgba(0,0,0,.55)]



        overflow-hidden
        "
      >
        {/* GOLD GLOW */}

        <div
          className="
          absolute


          top-0


          left-1/2


          -translate-x-1/2




          w-72


          h-72




          bg-gold/10




          blur-[120px]



          rounded-full




          pointer-events-none
          "
        />

        {/* INNER BORDER */}

        <div
          className="
          absolute


          inset-4



          rounded-[30px]



          border


          border-gold/10



          pointer-events-none
          "
        />

        {/* TOP SYMBOL */}

        <div
          className="
          relative


          z-10



          flex


          justify-center



          mb-10
          "
        >
          <div
            className="
            text-gold-soft


            text-xl


            opacity-70
            "
          >
            ✦
          </div>
        </div>

        {/* CONTENT */}

        <div
          className="
          relative


          z-10




          grid




          grid-cols-2




          md:grid-cols-2





          gap-x-5



          sm:gap-x-16




          gap-y-10



          sm:gap-y-12



          text-center
          "
        >
          {names.map((name, index) => (
              <ItemEntry
                key={`${name}-${index}`}
                index={index + 1}
                name={name}
                roleLabel={roleLabel}
                message={messages[index % messages.length]}
                special={index >= 18}
              />
            ))}
        </div>

        {/* BOTTOM SYMBOL */}

        <div
          className="
          relative


          z-10



          flex


          justify-center




          mt-12
          "
        >
          <div
            className="
            text-gold-soft


            text-xl


            opacity-70
            "
          >
            ✦
          </div>
        </div>
      </div>
    </section>
  );
}
