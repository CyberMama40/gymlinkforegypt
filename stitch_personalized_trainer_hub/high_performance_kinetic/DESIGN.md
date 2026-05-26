---
name: High-Performance Kinetic
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#37393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#c4c9ac'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#8e9379'
  outline-variant: '#444933'
  surface-tint: '#abd600'
  primary: '#ffffff'
  on-primary: '#283500'
  primary-container: '#c3f400'
  on-primary-container: '#556d00'
  inverse-primary: '#506600'
  secondary: '#c8c6c8'
  on-secondary: '#303032'
  secondary-container: '#474649'
  on-secondary-container: '#b6b4b7'
  tertiary: '#ffffff'
  on-tertiary: '#313030'
  tertiary-container: '#e5e2e1'
  on-tertiary-container: '#656464'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c3f400'
  primary-fixed-dim: '#abd600'
  on-primary-fixed: '#161e00'
  on-primary-fixed-variant: '#3c4d00'
  secondary-fixed: '#e4e2e4'
  secondary-fixed-dim: '#c8c6c8'
  on-secondary-fixed: '#1b1b1d'
  on-secondary-fixed-variant: '#474649'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474646'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Sora
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 16px
  margin-mobile: 20px
  margin-desktop: 48px
---

## Brand & Style

The design system is built for an elite coaching environment that bridges the gap between raw athletic energy and professional data-driven insights. The brand personality is **authoritative, high-octane, and meticulously organized.** It targets dedicated athletes and coaches who value precision and speed.

The visual style is **Corporate Modern with Glassmorphic accents.** It utilizes a deep, monochromatic base to allow vibrant action colors to "pop," simulating the high-contrast environment of a modern, premium training facility. The UI should feel fast and responsive, evoking a sense of forward momentum and elite performance.

## Colors

The palette is anchored in **Deep Charcoal (#121212)** to minimize eye strain during intense workouts and provide a sophisticated backdrop for photography. **Electric Lime (#CCFF00)** serves as the high-visibility functional accent, reserved strictly for primary actions, progress indicators, and critical data points. 

**Slate Gray (#2C2C2E)** acts as the secondary surface color, creating depth through tonal layering rather than heavy shadows. **Pure White (#FFFFFF)** is used sparingly for high-hierarchy typography and iconography to ensure maximum legibility against the dark background.

## Typography

This design system employs a tiered typographic strategy. **Sora** is used for headlines to provide a geometric, futuristic feel that aligns with high-tech fitness equipment. **Hanken Grotesk** handles body copy with modern precision and excellent readability. For technical data, workout metrics, and timestamps, **JetBrains Mono** is utilized to emphasize a "data-first" coaching philosophy.

All caps should be applied to `label-sm` and `label-md` to differentiate metadata from conversational text. Heavy weights (700+) are preferred for headlines to maintain the energetic brand voice.

## Layout & Spacing

The system follows a **12-column fluid grid** for desktop and a **4-column fluid grid** for mobile. Spacing is based on an **8px linear scale**, ensuring mathematical harmony between elements. 

To emphasize clarity of data, the layout prioritizes generous vertical rhythm. Content cards should utilize `md` (24px) padding to allow metrics enough room to breathe. On mobile devices, side margins are tightened to 20px to maximize the real estate for horizontal scrolling charts and exercise lists.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Glassmorphism**. 
- **Level 0 (Base):** Deep Charcoal (#121212).
- **Level 1 (Cards/Surfaces):** Slate Gray (#2C2C2E) with a subtle 1px inner border (opacity 10% White) to define edges.
- **Level 2 (Overlays/Modals):** A semi-transparent blur effect (Backdrop Filter: blur 20px) using a 60% opacity version of Slate Gray.

Shadows are avoided in favor of light-based depth. Use "glow" effects (0px blur, Electric Lime) for active states or notifications instead of traditional drop shadows.

## Shapes

The shape language is **Rounded**, balancing the aggressive nature of the colors with an approachable, human-centric feel. Standard UI components like buttons and input fields use a **0.5rem (8px)** corner radius. Larger containers, such as workout cards and profile headers, utilize **1rem (16px)** to create a soft, premium aesthetic. Interactive elements should never be fully sharp, as the roundness reinforces the "personal" aspect of the coaching.

## Components

### Buttons
- **Primary:** Solid Electric Lime background with Black text. Bold weight.
- **Secondary:** Ghost style with a 2px Slate Gray border.
- **Tertiary:** Transparent background with Electric Lime text for low-priority actions.

### Cards
- **Workout Cards:** Use high-quality photography as a background with a Slate Gray gradient overlay at the bottom for text legibility.
- **Metric Cards:** Clean Slate Gray background with JetBrains Mono for the primary value and Hanken Grotesk for the label.

### Inputs
- **Text Fields:** Darker than the surface level with a subtle 1px border. On focus, the border transforms to Electric Lime with a soft outer glow.

### Specialized Components
- **Progress Rings:** Use Electric Lime for the active track and a 10% opacity White for the remaining track.
- **Coach Chips:** Circular avatars paired with Hanken Grotesk medium weight labels to emphasize the human connection.
- **Activity Feed:** Minimalist list items with high-contrast icons to denote different exercise types (Cardio, Strength, Recovery).