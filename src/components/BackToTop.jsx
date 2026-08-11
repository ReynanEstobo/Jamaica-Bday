import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 500);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <button
      type="button"
      onClick={scrollTop}
      aria-label="Back to top"
      className={`
      fixed


      right-6


      bottom-24


      sm:bottom-28



      z-[180]



      w-11

      h-11


      sm:w-12

      sm:h-12



      rounded-full


      flex

      items-center

      justify-center



      border

      border-gold/40



      bg-black/30


      backdrop-blur-xl



      text-gold-soft


      text-lg



      transition-all

      duration-500



      ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-5 pointer-events-none"
      }



      hover:border-gold

      hover:scale-105
      `}
    >
      ↑
    </button>
  );
}
