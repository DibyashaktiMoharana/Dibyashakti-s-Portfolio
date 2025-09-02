import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BlogSkeleton = () => {
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    const interval = setInterval(
      () => {
        setShowSkeleton((prev) => !prev);
      },
      showSkeleton ? 2500 : 2500
    );

    return () => clearInterval(interval);
  }, [showSkeleton]);

  const transition = { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const };
  const variants = {
    hidden: { filter: "blur(10px)", transform: "translateY(10%)", opacity: 0 },
    visible: { filter: "blur(0)", transform: "translateY(0)", opacity: 1 },
  };

  return (
    <div className="h-full">
      <div className="flex flex-col items-center justify-center h-full">
        <AnimatePresence mode="wait">
          {showSkeleton ? (
            <motion.div
              key="skeleton"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={variants}
              transition={transition}
              className="w-full space-y-3"
            >
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-gray-600/50 rounded-md w-3/4 animate-pulse"></div>
                <div className="h-3 bg-gray-600/40 rounded-md w-full animate-pulse"></div>
                <div className="h-3 bg-gray-600/40 rounded-md w-5/6 animate-pulse"></div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="text"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={variants}
              transition={transition}
              className="text-center"
            >
              <div className="text-3xl text-gray-300 font-deb">My Blogs</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BlogSkeleton;
