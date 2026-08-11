import musicFile from "../assets/music/jamaica-song.mp3";

export function createAudioEngine() {
  let audio = null;
  let isPlaying = false;

  function init() {
    if (audio) return;

    audio = new Audio(musicFile);

    // Always loop
    audio.loop = true;

    // Always max volume
    audio.volume = 1;
  }

  async function start() {
    init();

    try {
      // Ensure volume stays max
      audio.volume = 1;

      await audio.play();

      isPlaying = true;
      return true;
    } catch (error) {
      console.error("Audio playback failed:", error);
      isPlaying = false;
      return false;
    }
  }

  function stop() {
    if (!audio) return;

    audio.pause();

    audio.currentTime = 0;

    isPlaying = false;
  }

  function pause() {
    if (!audio) return;

    audio.pause();
    isPlaying = false;
  }

  function setVolume() {
    // Ignore volume changes
    // Music is always max volume

    if (!audio) return;

    audio.volume = 1;
  }

  function getIsPlaying() {
    return isPlaying;
  }

  return {
    init,
    start,
    pause,
    stop,
    setVolume,
    getIsPlaying,
  };
}
