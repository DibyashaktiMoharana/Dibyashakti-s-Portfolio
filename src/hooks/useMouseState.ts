import { useState, useEffect } from "react";

export const useMouseState = () => {
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) { // Left mouse button
        setIsMouseDown(true);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 0) { // Left mouse button
        setIsMouseDown(false);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return { isMouseDown };
};