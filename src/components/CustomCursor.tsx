import { motion } from "framer-motion";
import { useMousePosition } from "../hooks/useMousePosition";
import { useMouseState } from "../hooks/useMouseState";
import { useCursorType } from "../hooks/useCursorType";
import { RedirectCursor } from "./cursor/RedirectCursor";
import { NormalCursor } from "./cursor/NormalCursor";
import { CURSOR_CONFIG } from "../config/cursorConfig";

const CustomCursor = () => {
  const mousePosition = useMousePosition();
  const { isMouseDown } = useMouseState();
  const { cursorType, inSection } = useCursorType();

  const isRedirect = cursorType === "redirect";
  const isHovering = cursorType === "hover";

  const getScale = (): number => {
    if (!inSection) return CURSOR_CONFIG.SCALE.DEFAULT;
    return isMouseDown
      ? CURSOR_CONFIG.SCALE.MOUSE_DOWN
      : CURSOR_CONFIG.SCALE.IN_SECTION;
  };

  // Hide cursor on mobile devices
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  if (isMobile) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[80] hidden md:block"
      animate={{
        x: mousePosition.x - CURSOR_CONFIG.OFFSET.x,
        y: mousePosition.y - CURSOR_CONFIG.OFFSET.y,
        scale: getScale(),
      }}
      transition={{
        type: "spring",
        ...CURSOR_CONFIG.ANIMATION.MAIN,
      }}
    >
      <RedirectCursor isVisible={isRedirect} />
      <NormalCursor isVisible={!isRedirect} isHovering={isHovering} scale={getScale()} />
    </motion.div>
  );
};

export default CustomCursor;
