import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const greetings = [
  "Hello",
  "नमस्ते",
  "¡Hola!",
  "ନମସ୍କାର",
  "ನಮಸ್ಕಾರ",
];

interface LoaderProps {
  onComplete: () => void;
}

function Loader({ onComplete }: LoaderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<"greetings" | "final" | "done">(
    "greetings"
  );
  const [contentLoaded, setContentLoaded] = useState(false);
  const [hasShownAtLeastOneGreeting, setHasShownAtLeastOneGreeting] = useState(false);

  // Check if all content (fonts, images) is loaded
  useEffect(() => {
    const checkContentLoaded = () => {
      const fontsReady = document.fonts?.ready ?? Promise.resolve();
      const imagesReady = Promise.all(
        Array.from(document.images).map((img) =>
          img.complete
            ? Promise.resolve()
            : new Promise<void>((resolve) => {
              img.onload = img.onerror = () => resolve();
            })
        )
      );

      // When DOM ready, wait for fonts and images readiness
      const whenDomReady = new Promise<void>((resolve) => {
        if (document.readyState === 'complete') resolve();
        else window.addEventListener('load', () => resolve(), { once: true });
      });

      Promise.all([whenDomReady, fontsReady, imagesReady])
        .then(() => new Promise((r) => setTimeout(r, 400)))
        .then(() => setContentLoaded(true));
    };

    checkContentLoaded();
  }, []);

  // Safety net - but longer since we're waiting for content
  useEffect(() => {
    const safety = setTimeout(onComplete, 15000);
    return () => clearTimeout(safety);
  }, [onComplete]);

  // Greeting cycle - ensure at least one greeting is shown
  useEffect(() => {
    if (phase === "greetings" && currentIndex < greetings.length) {
      const t = setTimeout(() => {
        setCurrentIndex((i) => {
          const newIndex = i + 1;
          if (newIndex > 0) {
            setHasShownAtLeastOneGreeting(true);
          }
          return newIndex;
        });
      }, 500);
      return () => clearTimeout(t);
    }
    if (phase === "greetings" && currentIndex >= greetings.length && contentLoaded && hasShownAtLeastOneGreeting) {
      // Only proceed to final when content is loaded AND we've shown at least one greeting
      requestAnimationFrame(() => setPhase("final"));
    }
  }, [phase, currentIndex, contentLoaded, hasShownAtLeastOneGreeting]);

  // Keep cycling greetings if content isn't loaded yet OR we haven't shown at least one greeting
  useEffect(() => {
    if (phase === "greetings" && currentIndex >= greetings.length && (!contentLoaded || !hasShownAtLeastOneGreeting)) {
      const t = setTimeout(() => {
        setCurrentIndex(0); // Restart greeting cycle
      }, 500);
      return () => clearTimeout(t);
    }
  }, [phase, currentIndex, contentLoaded, hasShownAtLeastOneGreeting]);

  // Final text timer
  useEffect(() => {
    if (phase === "final") {
      const t = setTimeout(() => setPhase("done"), 800); // short display
      return () => clearTimeout(t);
    }
    if (phase === "done") {
      const t = setTimeout(onComplete, 300);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  const greetingVariants = {
    initial: { y: 50, opacity: 0, filter: "blur(5px)" },
    animate: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.15 },
    },
    exit: {
      y: -50,
      opacity: 0,
      filter: "blur(2px)",
      transition: { duration: 0 },
    },
  };

  const finalTextVariants = {
    initial: { y: 50, opacity: 0, filter: "blur(10px)" },
    animate: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.3 },
    },
    exit: {
      y: -50,
      opacity: 0,
      filter: "blur(10px)",
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="fixed inset-0 bg-[#171717] flex items-center justify-center z-50">
      <AnimatePresence mode="wait">
        {phase === "greetings" && currentIndex < greetings.length && (
          <motion.div
            key={`greet-${currentIndex}`}
            variants={greetingVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="text-6xl md:text-6xl font-sb text-white"
          >
            {greetings[currentIndex]}
          </motion.div>
        )}

        {phase === "final" && (
          <motion.div
            key="final-text"
            variants={finalTextVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="text-center"
          >
            <div className="text-2xl text-gray-400 mb-2 font-b text-left">
              I&apos;m
            </div>
            <div className="text-6xl md:text-8xl font-deb text-white">
              Dibyashakti Moharana
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Loader;
