import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const transition = {
  duration: 0.6,
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
};
const variants = {
  hidden: { filter: "blur(10px)", transform: "translateY(10%)", opacity: 0 },
  visible: { filter: "blur(0)", transform: "translateY(0)", opacity: 1 },
  exit: { filter: "blur(10px)", transform: "translateY(-20%)", opacity: 0 },
};

const experiences = ["Frontend", "Backend", "FullStack", "AI/ML", "DevOps"];

export default function ExperienceRotator() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % experiences.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-start justify-center h-full ">
      <div className="text-left">
        <motion.div
          initial="visible"
          animate="visible"
          className="mb-4 flex flex-row justify-start items-center gap-4 "
        >
          <h2 className="text-3xl font-semibold text-white">I know </h2>

          <div className="h-16 flex items-center justify-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={transition}
                variants={variants}
                className="text-5xl font-deb text-blue-400 leading-0"
              >
                {experiences[currentIndex]}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
