import BentoCard from "./BentoCard";
import { useState, useRef } from "react";
import { Volume2 } from "lucide-react";

function IntroCard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  return (
    <BentoCard classes="col-span-3 flex items-center relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-blue-600/5 to-cyan-600/10 opacity-60"></div>
      <div className="relative z-10 flex flex-col gap-4 md:px-8 md:py-8 px-4 py-6">
        <div className="space-y-2">
          <span className="block text-base text-gray-400 font-med">
            Hey, I&apos;m
          </span>
          <h1 className="text-2xl md:text-3xl bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent leading-tight flex items-center gap-3 font-deb">
            Dibyashakti Moharana
            <button
              onClick={handlePlayAudio}
              className="text-gray-400 hover:text-white transition-colors duration-200 hover:scale-110 transform"
              aria-label="Play name pronunciation"
            >
              <Volume2 className="w-7 h-7" />
            </button>
          </h1>
        </div>
        <p className="text-gray-500 text-sm font-med max-w-md leading-relaxed">
          Computer Science student with expertise in full-stack development,
          enterprise software solutions, and modern web technologies.
        </p>
      </div>
      <audio
        ref={audioRef}
        src="/name.mp3"
        onEnded={handleAudioEnd}
        preload="none"
      />
    </BentoCard>
  );
}

export default IntroCard;
