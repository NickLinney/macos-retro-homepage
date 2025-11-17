# Design Guidelines: Retro MacOS 7 Personal Homepage

## Design Approach
**Reference-Based Approach**: MacOS 7/Classic Mac OS aesthetic (1991-1997)
- System.css provides authentic MacOS 7 UI components
- Embrace pixel-perfect retro styling with Chicago font, monochrome icons, and classic window chrome
- Balance nostalgia with modern web functionality

## Core Design Principles
1. **Authentic Retro Aesthetic**: Faithful recreation of MacOS 7 visual language
2. **Skeuomorphic Depth**: 3D beveled borders, inset/outset elements, realistic shadows
3. **Desktop Metaphor**: Windows, icons, menus, pointers - true to original OS paradigm
4. **Playful Personality**: Reflect programmer/gamer interests through window content and desktop customization

## Typography
- **Primary Font**: Chicago (system.css default) for all UI elements, menu bars, window titles
- **Body Text**: Geneva or system font stack for content within windows
- **Sizes**: System.css handles appropriate scaling - maintain classic hierarchy (9px-12px range typical for retro OS)
- **Style**: All-caps for menu bar items, title case for window headers

## Layout System
**Spacing**: Use system.css native spacing (typically 4px, 8px, 12px, 16px units)
- Window padding: 12-16px internal spacing
- Desktop icon spacing: 80-100px grid for icon placement
- Menu bar height: ~20-24px (system.css standard)
- Window title bar: ~19px (system.css standard)

## Component Library

### Desktop Environment
- **Background**: Classic tiled pattern or solid light gray (#C0C0C0 heritage)
- **Menu Bar**: Fixed top bar with dropdowns (System, Projects, Applications, Links)
- **Desktop Icons**: "OS Drive" icon with label underneath, positioned top-right or grid layout
- **Trash Can**: Bottom-right corner (optional but authentic)

### Window System
- **Window Chrome**: System.css window styling with title bar, close button, minimize/maximize
- **Draggable Headers**: Allow repositioning anywhere on desktop
- **Z-Index Management**: Active window comes to front, inactive windows dim slightly
- **Window Sizes**: 400-600px width, variable height based on content
- **Scrollable Content**: Classic scrollbars when content overflows

### Menu Dropdowns
- **Structure**: Hover or click to reveal dropdown menus
- **Items**: Left-aligned text, keyboard shortcuts right-aligned (⌘ symbols)
- **Separators**: Horizontal rules between grouped items
- **Hierarchy**: Submenus (Projects → Programming/Tabletop/Video Games) with right arrows

### Content Windows
**Programming Projects**:
- List view with folder icons and project names
- Date modified, file size columns (faux filesystem aesthetic)

**Tabletop Gaming**:
- Card-style layout for different games/campaigns
- Dice icons, character sheets references

**Video Games**:
- Grid of game "icons" with titles
- Progress bars for completion status (system.css progress elements)

**About/System**:
- Classic "About This Macintosh" styled panel
- System info, profile picture, bio text

### Interactive Elements
- **Buttons**: System.css default buttons with 3D bevel effect
- **Links**: Underlined blue text (classic hyperlink style)
- **Checkboxes/Radio**: System.css native controls
- **Alerts**: Modal dialogs with classic alert icon and OK/Cancel buttons

## Interactions & Behavior
- **Window Dragging**: Smooth drag on title bar, constrain to viewport
- **Window Stacking**: Click brings window to front with subtle animation
- **Menu Activation**: Click menu name, then click item to activate
- **Icon Double-Click**: Open corresponding application window
- **Window Close**: X button closes/hides window with brief animation
- **Desktop Click**: Deselect active window, click away menus

## Content Strategy
- **Personality**: Inject humor and personal touches (error messages, custom icons)
- **Easter Eggs**: Hidden menus, About box with credits, fun alert dialogs
- **Placeholder Content**: Use lorem ipsum styled as "Read Me" files, sample project listings
- **Progressive Enhancement**: Start with core windows, add more applications later

## Images
**Desktop Background**: Optional textured pattern or classic Macintosh pattern
**Window Icons**: Use retro 16x16 or 32x32 pixel icons for folders, applications, documents
**Profile Photo**: Pixelated/dithered effect to match retro aesthetic (in About window)
**No Hero Image**: Desktop interface doesn't use traditional hero sections

## Accessibility Notes
- Maintain keyboard navigation for menus and windows
- Ensure sufficient contrast despite retro color palette
- Focus indicators on interactive elements
- Window management via keyboard shortcuts (ESC to close, Tab to switch)

## Authenticity Details
- **System Font**: Rely on system.css Chicago font rendering
- **Pixel Borders**: Embrace 1-2px borders everywhere
- **Monochrome Icons**: Black and white icons for maximum retro feel
- **Watch Cursor**: Loading states with classic watch/hourglass cursor
- **Sound Effects** (optional): System beeps on errors, window open sounds via Web Audio API

This design creates an immersive, nostalgic experience that serves as both a functional portfolio and a love letter to classic Mac OS.