# Retro MacOS 7 Personal Homepage

## Overview

This is a nostalgic personal homepage designed to recreate the classic MacOS 7 desktop experience (1991-1997). The application presents a fully interactive retro desktop interface featuring draggable windows, a menu bar, desktop icons, and a dock system. Users can explore programming projects, tabletop gaming interests, and video game collections through authentic MacOS 7-styled windows and UI components.

The application combines modern web technologies (React, TypeScript, Vite) with retro aesthetics powered by the system.css library, which provides pixel-perfect MacOS 7 UI components including Chicago font, monochrome icons, and classic window chrome.

**Current Status (November 17, 2025):** Fully functional MVP with interactive desktop interface, complete window management, working applications (Calculator, Text Editor, File Browser, Music Player), and rich content sections for programming projects, tabletop gaming, and video games.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server with HMR (Hot Module Replacement)
- Wouter for lightweight client-side routing
- React Query (@tanstack/react-query) for data fetching and state management

**UI Component Strategy:**
- System.css library (loaded via CDN) provides authentic MacOS 7 visual components
- Shadcn UI components (Radix UI primitives) integrated but customized for retro aesthetic
- Custom components for desktop metaphor: Window, MenuBar, DesktopIcon, Dock, FileBrowser
- Draggable windows using react-draggable for authentic desktop window management
- Z-index management system for window stacking and focus behavior

**Styling Approach:**
- Tailwind CSS with custom configuration for retro color palette
- CSS variables for theming (neutral color scheme)
- System.css provides core retro UI primitives (buttons, windows, title bars)
- Design guidelines document specifies Chicago font, beveled borders, and skeuomorphic depth

**State Management:**
- Component-level state with useState for window management (open/close/minimize)
- Window registry tracking z-index, position, and minimization state
- React Query for any future server data fetching needs

### Backend Architecture

**Server Framework:**
- Express.js server with TypeScript
- HTTP server creation for potential WebSocket upgrades
- Middleware: JSON parsing, URL encoding, request logging with duration tracking

**Development vs Production:**
- Development: Vite middleware integration for HMR and dev server
- Production: Static file serving from dist/public directory
- Environment-based configuration (NODE_ENV)

**Storage Layer:**
- In-memory storage implementation (MemStorage class) for user data
- Interface-based design (IStorage) allows future database integration
- User schema defined with basic username/password fields
- Drizzle ORM configured for PostgreSQL (via @neondatabase/serverless)
- Schema defined but not yet actively used (placeholder for future features)

**Route Structure:**
- API routes prefixed with /api
- Routes registered via registerRoutes function in server/routes.ts
- Currently minimal backend - application is primarily client-side

### Design System

**Visual Language:**
- MacOS 7/Classic Mac OS aesthetic (1991-1997 era)
- Skeuomorphic design with 3D beveled borders and realistic shadows
- Desktop metaphor: windows, icons, menus, pointers
- Color palette: White desktop background, black/white diagonal striped menu bar
- Typography: Chicago font (11px bold) for menu bar with 3px white text-stroke for visibility, Geneva for body text

**Component Categories:**
1. **Desktop Environment:** White background, black/white striped menu bar, desktop icons (OS Drive, Trash)
2. **Window System:** Draggable windows with title bars, close/minimize buttons, z-index management, minimize to dock
3. **Menu Dropdowns:** Click-to-open menus with submenus (System, Projects, Applications, Links)
4. **Dock System:** Bottom taskbar appears when windows are minimized, click to restore windows
5. **Content Windows:** 
   - **ProgrammingProjects**: Interactive project table with selectable rows showing detailed project info
   - **TabletopGaming**: Tabbed interface with Campaigns, Characters, and Collection views
   - **VideoGames**: Filterable game library with progress bars and status tracking
   - **Calculator**: Fully functional calculator with number pad and basic operations
   - **TextEditor**: Live text editor with word/character/line count
   - **FileBrowser**: Expandable/collapsible tree view of file system
   - **MusicPlayer**: Hybrid audio player with Play/Stop/Forward/Back/Eject controls (80% scale, centered), volume slider, progress bar, and local file selection via system file picker; Play button toggles to Pause icon when playing; Stop button halts playback and resets to 0:00; supports .mid/.midi (Tone.js synthesis), .mp3, and .wav formats with file type validation and graceful error handling

**Spacing & Layout:**
- System.css native spacing (4px, 8px, 12px, 16px units)
- Window padding: 12-16px internal spacing
- Menu bar height: 20-24px
- Desktop icon grid: 80-100px spacing

### External Dependencies

**Third-Party Libraries:**
- **@radix-ui/***: Unstyled, accessible UI primitives (accordion, dialog, dropdown-menu, etc.)
- **system.css**: MacOS 7 UI component library (loaded from unpkg.com CDN)
- **react-draggable**: Enables draggable window functionality
- **class-variance-authority & clsx**: Utility-first styling and conditional classes
- **date-fns**: Date manipulation utilities
- **cmdk**: Command menu component
- **embla-carousel-react**: Carousel/slider functionality
- **lucide-react**: Icon library
- **react-hook-form & @hookform/resolvers**: Form handling with Zod validation
- **zod & drizzle-zod**: Schema validation and type safety

**Database & ORM:**
- **Drizzle ORM**: TypeScript ORM for PostgreSQL
- **@neondatabase/serverless**: Neon serverless PostgreSQL driver
- **connect-pg-simple**: PostgreSQL session store (prepared but not actively used)
- Database configuration in drizzle.config.ts points to PostgreSQL via DATABASE_URL

**Build & Development Tools:**
- **Vite**: Build tool with React plugin
- **esbuild**: Fast JavaScript bundler for production server build
- **tsx**: TypeScript execution for development server
- **PostCSS & Autoprefixer**: CSS processing
- **Tailwind CSS**: Utility-first CSS framework
- **@replit/vite-plugin-***: Replit-specific development plugins (runtime error overlay, cartographer, dev banner)

**External Assets:**
- System.css loaded from CDN: https://unpkg.com/@sakun/system.css
- Default audio file: attached_assets/ff4boss_1763391077864.mid (MIDI format, synthesized using Tone.js)
- Favicon: /favicon.png (referenced but not present in repository)

**MIDI Playback Implementation:**
- Uses Tone.js (@tonejs/midi + tone packages) for browser-based MIDI synthesis
- MIDI files parsed and notes scheduled on Tone.Transport timeline
- Each MIDI track gets a PolySynth instrument for playback
- Transport controls (play/pause/seek) fully functional
- Hybrid system: MIDI uses Tone.js, MP3/WAV use HTML5 audio element

**Local File Loading:**
- Eject button triggers system file picker dialog (hidden HTML file input)
- Validates file extensions: .mid, .midi, .wav, .mp3
- Creates blob URLs via URL.createObjectURL() for local file playback
- Proper memory management: blob URLs revoked on new file load and component unmount
- MIDI detection based on original filename (not blob URL) ensures correct playback path
- Status bar displays accurate file type based on loaded file

**Path Aliases:**
- `@/`: Maps to client/src/
- `@shared/`: Maps to shared/
- `@assets/`: Maps to attached_assets/