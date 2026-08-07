export default function Footer() {
  return (
    <footer className="px-[6%] pb-10 pt-[60px] text-center">
      <div className="font-vibes text-2xl text-gold-soft">
        See you there, with love
      </div>
      <p className="mt-2.5 font-poppins text-[11px] uppercase tracking-[2px] text-beige/75">
        Jamaica Tyfany Julongbayan · August 22, 2026
      </p>

      <div className="mx-auto mt-8 max-w-md border-t border-gold/20 pt-6">
        <p className="font-poppins text-xs tracking-wide text-beige/70">
          Want this kind of invitation?{" "}
          <a
            href="https://www.facebook.com/beysik.111304"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-gold-soft underline decoration-gold/45 underline-offset-4 transition-colors duration-300 hover:text-white"
          >
            Message Us.
          </a>
        </p>
      </div>
    l</footer>
  );
}
