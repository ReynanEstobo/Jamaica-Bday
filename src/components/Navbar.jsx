import { useEffect, useState } from "react";
import { EVENT_LINKS } from "../data/eventParticipants";

const LINKS = [
  ["#hero", "Home"],
  ["#invitation", "Invitation"],
  ["#about", "About"],
  ["#dresscode", "Dress Code"],
  {
    label: "Event",
    items: EVENT_LINKS,
  },
  ["#timeline", "Timeline"],
  ["#location", "Location"],
  ["#gallery", "Gallery"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <nav
      className="
      fixed

      inset-x-0

      top-0

      z-[200]

      flex

      items-center

      justify-between


      px-[6%]

      py-4


      bg-black/20

      backdrop-blur-xl


      shadow-[0_12px_35px_rgba(0,0,0,.25)]
      "
    >
      {/* ===============================
              LOGO
      =============================== */}

      <a href="#hero" onClick={() => setOpen(false)} className="select-none">
        <div
          className="
          flex

          items-center

          gap-3
          "
        >
          <span
            className="
            w-6

            h-px

            bg-gold/40
            "
          />

          <div
            className="
  flex
  items-center
  gap-2
  "
          >
            <h1
              className="
    font-cinzel

    uppercase

    text-gold-soft

    tracking-[0.2rem]

    text-[0.9rem]

    leading-none
    "
            >
              JAMAICA
            </h1>

            <span
              className="
    text-gold/70

    text-[10px]
    "
            >
              @
            </span>

            <span
              className="
    font-cinzel

    uppercase

    text-gold

    tracking-[0.2rem]

    text-[0.85rem]
    "
            >
              XVIII
            </span>
          </div>

          <span
            className="
            w-6

            h-px

            bg-gold/40
            "
          />
        </div>
      </a>

      {/* NAVIGATION */}

      {open && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[199] hidden bg-black/55 backdrop-blur-[2px] max-[900px]:block"
        />
      )}

      <ul
        className={`
        flex

        items-center

        gap-8


        max-[900px]:fixed

        max-[900px]:top-0

        max-[900px]:right-0


        max-[900px]:h-screen

        max-[900px]:h-dvh

        max-[900px]:w-[74%]


        max-[900px]:bg-[#090707]/95

        max-[900px]:backdrop-blur-3xl


        max-[900px]:flex-col

        max-[900px]:justify-center

        max-[900px]:items-start


        max-[900px]:pl-10

        max-[900px]:pr-6

        max-[900px]:py-24

        max-[900px]:overflow-y-auto

        max-[900px]:gap-7


        max-[900px]:transition-all

        max-[900px]:duration-500


        max-[900px]:z-[205]

        ${open ? "max-[900px]:translate-x-0" : "max-[900px]:invisible max-[900px]:translate-x-full"}
        `}
      >
        {LINKS.map((item) => {
          if (Array.isArray(item)) {
            const [href, label] = item;

            return (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className="
                  relative

                  uppercase

                  tracking-[0.18rem]

                  text-[13px]

                  text-white/85


                  transition-all

                  duration-300


                  after:absolute

                  after:left-0

                  after:-bottom-1

                  after:h-px

                  after:w-0

                  after:bg-gold


                  after:transition-all


                  hover:text-gold

                  hover:after:w-full
                  "
                >
                  {label}
                </a>
              </li>
            );
          }

          return (
            <li
              key={item.label}
              className="
              relative

              group

              max-[900px]:w-full
              "
            >
              {/* ===============================
                    DESKTOP EVENT DROPDOWN
              =============================== */}

              <div
                className="
                hidden

                min-[901px]:block
                "
              >
                <button
                  type="button"
                  aria-haspopup="true"
                  className="
                  flex

                  items-center

                  gap-2


                  uppercase

                  tracking-[0.18rem]

                  text-[13px]


                  text-white/85


                  transition-all

                  duration-300


                  hover:text-gold
                  "
                >
                  {item.label}

                  <svg
                    className="
                    w-3

                    h-3


                    transition-transform

                    duration-300


                    group-hover:rotate-180
                    "
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                <div
                  className="
                  absolute

                  top-10

                  left-1/2

                  -translate-x-1/2


                  invisible

                  opacity-0


                  translate-y-2


                  group-hover:visible

                  group-focus-within:visible

                  group-hover:opacity-100

                  group-focus-within:opacity-100


                  group-hover:translate-y-0

                  group-focus-within:translate-y-0


                  transition-all

                  duration-300


                  w-64


                  rounded-2xl


                  overflow-hidden


                  bg-[#161111]/95


                  backdrop-blur-xl


                  border

                  border-gold/20


                  shadow-[0_25px_60px_rgba(0,0,0,.45)]
                  "
                >
                  {item.items.map(([href, label]) => (
                    <a
                      key={href}
                      href={href}
                      onClick={() => setOpen(false)}
                      className="
                      block


                      px-6

                      py-3.5


                      text-[13px]


                      tracking-wide


                      text-white/80


                      transition-all


                      duration-300


                      hover:bg-gold/10


                      hover:text-gold
                      "
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              {/* ===============================
                    MOBILE EVENT LIST
              =============================== */}

              <div
                className="
                hidden

                max-[900px]:flex

                flex-col

                gap-6

                w-full
                "
              >
                {item.items.map(([href, label]) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="
                    uppercase

                    tracking-[0.18rem]

                    text-[13px]


                    text-white/85


                    transition-all

                    duration-300


                    hover:text-gold
                    "
                  >
                    {label}
                  </a>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
      {/* ==================================
            MOBILE MENU BUTTON
      =================================== */}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle navigation"
        aria-expanded={open}
        className="
          hidden

          max-[900px]:flex


          relative


          w-11

          h-11


          items-center

          justify-center


          rounded-full


          border

          border-gold/20


          bg-black/10


          backdrop-blur-lg


          transition-all


          duration-300


          hover:border-gold/40


          hover:bg-gold/5


          z-[210]
        "
      >
        <span
          className={`
            absolute

            w-6

            h-0.5

            rounded-full

            bg-gold-soft


            transition-all

            duration-300


            ${open ? "rotate-45" : "-translate-y-2"}
          `}
        />

        <span
          className={`
            absolute

            w-6

            h-0.5

            rounded-full

            bg-gold-soft


            transition-all

            duration-300


            ${open ? "opacity-0" : ""}
          `}
        />

        <span
          className={`
            absolute

            w-6

            h-0.5

            rounded-full

            bg-gold-soft


            transition-all

            duration-300


            ${open ? "-rotate-45" : "translate-y-2"}
          `}
        />
      </button>
    </nav>
  );
}
