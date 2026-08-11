import { useRef, useState } from "react";
import Particles from "./components/Particles";
import EnvelopeIntro from "./components/EnvelopeIntro";
import MusicPlayer from "./components/MusicPlayer";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Invitation from "./components/Invitation";
import About from "./components/About";
import ItemsSection from "./components/ItemsSection";
import Timeline from "./components/Timeline";
import DressCode from "./components/DressCode";
import Location from "./components/Location";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import EventQuickNav from "./components/EventQuickNav";
import { EVENT_PARTICIPANTS } from "./data/eventParticipants";

const ROSE_MESSAGES = [
  "A rose symbolizes admiration and respect.",
  "May every dance be filled with cherished memories.",
  "Wishing you elegance and happiness always.",
];

const CANDLE_MESSAGES = [
  "May your light continue to inspire others.",
  "Wishing you wisdom, hope, and endless blessings.",
  "May every year shine brighter than the last.",
];

const PERFUME_MESSAGES = [
  "May your life always be filled with beautiful moments.",
  "Carry kindness wherever you go.",
  "Leave a fragrance of love in every heart.",
];

const SHOTS_MESSAGES = [
  "Cheers to unforgettable memories.",
  "To laughter, friendship, and happiness.",
  "Celebrate every milestone with joy.",
];

const ALFONSO_MESSAGES = [
  "Raise a toast to new beginnings.",
  "May success follow wherever life leads you.",
  "To dreams that become reality.",
];

const GIFTS_MESSAGES = [
  "Every gift carries love and warm wishes.",
  "May these presents remind you of this special day.",
  "A token of appreciation for your journey.",
];

const BILLS_MESSAGES = [
  "May abundance and prosperity always be yours.",
  "Wishing you financial success and wisdom.",
  "May your future be filled with opportunities.",
];

const COSMETICS_MESSAGES = [
  "May your confidence shine inside and out.",
  "True beauty comes from a kind heart.",
  "Always embrace your unique self.",
];

export default function App() {
  const [opened, setOpened] = useState(false);
  const musicPlayerRef = useRef(null);

  return (
    <>
      {/* Background */}
      <div
        className="
          fixed inset-0 -z-20
          bg-[radial-gradient(ellipse_at_20%_0%,rgba(122,0,25,0.55),transparent_55%),radial-gradient(ellipse_at_80%_100%,rgba(122,0,25,0.4),transparent_55%),linear-gradient(180deg,#0c0c0c_0%,#1a0508_45%,#120a05_100%)]
        "
      />

      <Particles />

      <EnvelopeIntro
        onOpening={() => musicPlayerRef.current?.start()}
        onOpened={() => setOpened(true)}
      />
      <MusicPlayer ref={musicPlayerRef} show={opened} autoStart={opened} />

      <Navbar />

      <Hero />

      <Invitation />

      <About />

      <DressCode />

      {/* 18 PERFUME */}
      <ItemsSection
        id="perfume"
        eyebrow="Debut Tradition"
        titleMain="18 Perfume"
        titleScript="Scents of Blessings"
        roleLabel="Perfume"
        messages={PERFUME_MESSAGES}
        names={EVENT_PARTICIPANTS.perfume}
      />

      {/* 18 GIFTS */}
      <ItemsSection
        id="gifts"
        eyebrow="Debut Tradition"
        titleMain="18 Gifts"
        titleScript="Tokens of Love"
        roleLabel="Gift"
        messages={GIFTS_MESSAGES}
        names={EVENT_PARTICIPANTS.gifts}
      />

      {/* 18 COSMETICS */}
      <ItemsSection
        id="cosmetics"
        eyebrow="Debut Tradition"
        titleMain="18 Cosmetics"
        titleScript="Beauty & Confidence"
        roleLabel="Cosmetic"
        messages={COSMETICS_MESSAGES}
        names={EVENT_PARTICIPANTS.cosmetics}
      />

      {/* 18 ALFONSO */}
      <ItemsSection
        id="alfonso"
        eyebrow="Debut Tradition"
        titleMain="18 Alfonso"
        titleScript="Toast"
        roleLabel="Bottle"
        messages={ALFONSO_MESSAGES}
        names={EVENT_PARTICIPANTS.alfonso}
      />

      {/* 18 BILLS */}
      <ItemsSection
        id="bills"
        eyebrow="Debut Tradition"
        titleMain="18 Bills"
        titleScript="Blessings"
        roleLabel="Bill"
        messages={BILLS_MESSAGES}
        names={EVENT_PARTICIPANTS.bills}
      />

      {/* 18 CANDLES */}
      <ItemsSection
        id="candles"
        eyebrow="Debut Tradition"
        titleMain="18 Candles & Wishes"
        titleScript="Family & Friends"
        roleLabel="Candle"
        messages={CANDLE_MESSAGES}
        names={EVENT_PARTICIPANTS.candles}
      />

      {/* 18 ROSES */}
      <ItemsSection
        id="roses"
        eyebrow="Debut Tradition"
        titleMain="18 Roses"
        titleScript="Gentlemen"
        roleLabel="Rose"
        messages={ROSE_MESSAGES}
        names={EVENT_PARTICIPANTS.roses}
      />

      {/* 18 SHOTS */}
      <ItemsSection
        id="shots"
        eyebrow="Debut Tradition"
        titleMain="18 Shots"
        titleScript="Cheers"
        roleLabel="Shot"
        messages={SHOTS_MESSAGES}
        names={EVENT_PARTICIPANTS.shots}
      />

      <Timeline />

      <Location />

      <Gallery />

      <EventQuickNav />

      <BackToTop />

      <Footer />
    </>
  );
}
