export const CURSOR_CONFIG = {
  // Scale values
  SCALE: {
    DEFAULT: 1,
    IN_SECTION: 1.4,
    MOUSE_DOWN: 1.2,
  },

  // Animation settings
  ANIMATION: {
    MAIN: {
      stiffness: 500,
      damping: 30,
      mass: 0.5,
    },
    REDIRECT: {
      stiffness: 400,
      damping: 25,
    },
    NORMAL: {
      stiffness: 500,
      damping: 28,
    },
    RING: {
      stiffness: 150,
      damping: 15,
    },
  },

  // Positioning offset
  OFFSET: {
    x: 16,
    y: 16,
  },

  // Selectors
  SELECTORS: {
    REDIRECT: '[data-redirect="true"]',
    INTERACTIVE: 'a, button, [role="button"], .cursor-pointer',
  },
} as const;
