# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Project Architecture

This is a Next.js 15 portfolio application using the App Router with TypeScript and Tailwind CSS.

### Key Architecture Points

- **App Structure**: Uses Next.js App Router with pages in `src/app/` including nested routes for `/experience`, `/home`, `/recentWork`
- **Client-Side Navigation**: Main app component in `src/app/page.tsx` implements tab-based navigation using React state instead of Next.js routing
- **Font System**: Uses custom Raleway font variants (Light, Regular, Medium, SemiBold, Bold) and Doto ExtraBold, configured via CSS variables in `tailwind.config.js`
- **Animation**: Framer Motion for page transitions with `AnimatePresence` for smooth tab switching
- **Custom Components**: 
  - Custom cursor system with hover states (`CustomCursor`, `NormalCursor`, `RedirectCursor`)
  - Reusable card components in `src/components/cards/`
  - Section-based layout in `src/components/sections/`

### Project Structure

- `src/pages/` - Page components (Home, Experience, RecentWork, Loader)
- `src/components/` - Reusable UI components organized by function
- `src/hooks/` - Custom React hooks for cursor and mouse interactions
- `src/data/` - Static data definitions (projects array)
- `src/config/` - Configuration objects (cursor animation settings)

### Custom Cursor Implementation

The application features a sophisticated custom cursor system:
- Mouse position tracking via `useMousePosition` hook
- Cursor type state management via `useCursorType` hook
- Animation configuration in `src/config/cursorConfig.ts`
- Interactive element detection using data attributes and selectors

### TypeScript Configuration

- Path aliases configured: `./*` maps to `./src/*`
- Strict TypeScript enabled
- Next.js plugin integration for optimized builds