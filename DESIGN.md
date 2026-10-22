---
name: Liang — AI Engineer portfolio
description: A site-entrance sign system. Four colours each mean one thing, and signs hang from a gantry to deliver verdicts.
colors:
  sheet: "#f3f6f4"
  sheet-raised: "#e6ebe8"
  ink: "#0c0f10"
  ink-soft: "#2f383c"
  ink-quiet: "#55616a"
  rule: "#c3ccc8"
  rule-strong: "#8b9792"
  sign-face: "#fbfcfb"
  sign-face-rule: "#d3dad7"
  board: "#0f1314"
  night-sheet: "#0e1112"
  night-sheet-raised: "#161b1c"
  night-ink: "#eef2f0"
  night-sign-face: "#e8edeb"
  night-board: "#070a0b"
  action-blue: "#0a59b5"
  permit-green: "#0e7a55"
  caution-yellow: "#ffc20e"
  block-red: "#c8281e"
  on-signal: "#ffffff"
  on-yellow: "#0c0f10"
  blue-text-night: "#7db5ff"
  green-text-night: "#46d09a"
  red-text-night: "#ff7d70"
typography:
  display:
    fontFamily: "'Barlow Condensed', 'Arial Narrow', 'Helvetica Neue', sans-serif"
    fontSize: "clamp(3.1rem, 1.3rem + 7vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.005em"
  headline:
    fontFamily: "'Barlow Condensed', 'Arial Narrow', 'Helvetica Neue', sans-serif"
    fontSize: "clamp(2.25rem, 1.5rem + 3vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.005em"
  title:
    fontFamily: "'Barlow Condensed', 'Arial Narrow', 'Helvetica Neue', sans-serif"
    fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2rem)"
    fontWeight: 700
    lineHeight: 1.04
  body:
    fontFamily: "'Overpass Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.62
  label:
    fontFamily: "'Barlow Condensed', 'Arial Narrow', 'Helvetica Neue', sans-serif"
    fontSize: "1.2rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "0.05em"
  code:
    fontFamily: "'Overpass Mono Variable', ui-monospace, 'SF Mono', Menlo, Consolas, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.55
rounded:
  plate: "6px"
  chip: "8px"
  button: "10px"
  field: "10px"
  sign: "14px"
spacing:
  s1: "4px"
  s2: "8px"
  s3: "12px"
  s4: "16px"
  s5: "24px"
  s6: "32px"
  s7: "48px"
  s8: "72px"
  s9: "112px"
components:
  button-primary:
    backgroundColor: "{colors.action-blue}"
    textColor: "{colors.on-signal}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    height: "52px"
    padding: "0 20px"
  button-secondary:
    backgroundColor: "{colors.sign-face}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    height: "52px"
    padding: "0 20px"
  sign-panel:
    backgroundColor: "{colors.sign-face}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sign}"
    padding: "clamp(24px, 3vw, 44px)"
  sign-tag:
    backgroundColor: "{colors.sign-face}"
    textColor: "{colors.ink}"
    rounded: "{rounded.chip}"
    padding: "5px 12px 5px 8px"
  chip-button:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.chip}"
    height: "44px"
    padding: "0 18px"
  chip-button-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.sheet}"
  field:
    backgroundColor: "{colors.on-signal}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    height: "44px"
    padding: "8px 12px"
  sign-band:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.sheet}"
    height: "62px"
  sign-band-link-current:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.chip}"
    height: "44px"
---

# Design System: Liang — AI Engineer portfolio

## Overview

**Creative North Star: "The Site Gantry"**

The site is a site-entrance sign system. Panels hang from an overhead beam, and each one carries a single verdict in the grammar of safety signage: a green rounded square for permitted, a blue disc for a human decision, a yellow triangle for caution, a red ring and slash for blocked. Everything else is restraint: a cool reflective-white ground, near-black ink, heavy condensed capitals for headings, and a plain humanist sans for reading. Colour is never decoration; it is information.

The tone is that of a document you can check. Results sit beside their limits, unfinished work wears a barrier stripe, and nothing is shaded to look more finished than it is. The world is daylight by default (a hiring engineer skimming on a laptop between meetings) with a night variant in which the ground goes to asphalt and the signs stay lit, as reflective sheeting does under headlights.

**Key Characteristics:**
- Four signal colours, each locked to one meaning, used nowhere else.
- Every verdict carries a shape and a word as well as a colour.
- Sign faces stay reflective white in both themes; only the ground changes.
- Heavy condensed signage capitals over a humanist highway sans; mono only for code and logs.
- Signs hang from a beam; arrows sit in their own cell flush to the edge they point past.
- Motion is one authored moment (signs hang into place) plus short state flips, each 300 ms or less.

## Colors

A cool, near-white ground with ink black, and four signal colours that mean exactly one thing each.

### Primary
- **Action Blue** (#0a59b5): a human decision or an action to take. Every primary button, every inline link on a light ground, the approval disc, selection rings. Never used for information.

### Secondary
- **Permit Green** (#0e7a55): permitted, verified, working. The check square, "used in a project" tags, passing results. Darker text variant #0b6b49 on the sheet.

### Tertiary
- **Caution Yellow** (#ffc20e): a limit, a caveat, work in progress. Always paired with black ink and the triangle shape; never as text on a light ground (use #7a5a00).
- **Block Red** (#c8281e): blocked, or a defect that was found. The prohibition ring and slash only. Red never means "important" or "error" in general.

### Neutral
- **Reflective Sheet** (#f3f6f4): the page ground in daylight. Cool, never cream.
- **Raised Sheet** (#e6ebe8): alternating section bands and diagram canvases.
- **Ink** (#0c0f10): text, beams, borders, the sticky band.
- **Soft Ink** (#2f383c) and **Quiet Ink** (#55616a): secondary text (11:1 and 5.8:1 on the sheet).
- **Sign Face** (#fbfcfb): the face of every sign panel, in both themes (#e8edeb at night).
- **Night Sheet** (#0e1112): the ground at night; the dark board and sticky band are always dark.
- **Hairline** (#c3ccc8) and **Strong Hairline** (#8b9792): table rules and dividers.

### Named Rules
**The One Meaning Rule.** Red, yellow, blue and green each carry one meaning and nothing else. A fifth colour, or one of these used for emphasis, breaks the system.

**The Shape-and-Word Rule.** No verdict is conveyed by colour alone. Each signal has a shape (square, disc, triangle, ring) and a short word beside it.

**The Reflective Face Rule.** A sign face stays light in both themes. The night theme changes the ground around the signs, never the signs.

## Typography

**Display Font:** Barlow Condensed (with Arial Narrow, Helvetica Neue)
**Body Font:** Overpass Variable (with Helvetica Neue, Arial)
**Label/Mono Font:** Barlow Condensed for labels; Overpass Mono Variable for code, paths and logs only

**Character:** Barlow Condensed is drawn from highway and licence-plate lettering, so headings read as signage: tight, heavy, upright. Overpass is its calmer sibling from the same highway-sign tradition, which keeps long reading comfortable. Both are open (SIL OFL) and self-hosted as Latin subsets.

### Hierarchy
- **Display** (700, clamp(3.1rem, 1.3rem + 7vw, 6rem), 0.92): the hero headline only, capped at 5rem in the hero sign.
- **Headline** (700, clamp(2.25rem, 1.5rem + 3vw, 3.75rem), 0.98): section titles, balanced across two lines.
- **Title** (700, clamp(1.5rem, 1.25rem + 1vw, 2rem), 1.04): card titles, panel titles, notes.
- **Body** (400, 1.0625rem, 1.62): all reading text, held to 68ch.
- **Label** (700, 1.05 to 1.2rem, +0.05em, uppercase): buttons, gate names, nav items, table headers.
- **Code** (400, 0.8125rem, 1.55): Overpass Mono, only for proposals, paths, ledger rows.

### Named Rules
**The Signage Capitals Rule.** Uppercase condensed is for things you press or that name a gate. Prose is sentence case.

**The Mono Is Data Rule.** Monospace appears only where the content is code, a path or a log line.

## Layout

A single container of up to 1240px with a fluid gutter (16 to 40px). Spacing is a 4px scale (4, 8, 12, 16, 24, 32, 48, 72, 112) with generous separation between groups and tighter rhythm inside them. Sections alternate between the sheet, the raised sheet and one always-dark board, so the page reads as a series of signs and boards rather than a continuous scroll.

The hero is a stack, not a split: one monumental headline sign, then a second beam carrying six gate signs, so the mechanism is visible in the first viewport at 1440 by 900. Reading text is held to 68ch. Breakpoints used: 640, 800, 960, 1000 and 1100px. Gates collapse from six across to three to a compact two-column grid; the navigation collapses to a Menu disclosure whose rows keep their arrows on the right edge.

### Named Rules
**The Edge-Locked Arrow Rule.** An arrow lives in its own cell against the edge it points past: the right edge of a button, the right edge of a mobile nav row.

## Elevation & Depth

Depth is physical and soft: signs hang from a beam and cast a diffuse shadow. There are no hard-offset or flat block shadows anywhere.

### Shadow Vocabulary
- **Sign** (`box-shadow: 0 1px 2px rgb(8 12 14 / 0.14), 0 16px 28px -18px rgb(8 12 14 / 0.42)`): the resting shadow of every sign panel.
- **Lift** (`box-shadow: 0 2px 4px rgb(8 12 14 / 0.16), 0 24px 36px -20px rgb(8 12 14 / 0.52)`): reserved for a raised state.

### Named Rules
**The Hang, Don't Float Rule.** A shadow implies the sign is hung from something. Nothing floats free of a beam, a band or a board.

## Shapes

Rounded rectangles throughout, with one family of radii: 14px for signs, 10px for buttons and fields, 8px for chips and tags, 6px for the black name plate. Every sign has a second inset border (a 2px ink line, 7px in from the edge) over its white margin, as real signs do. The verdict shapes are fixed: rounded square, disc, triangle, ring with a slash. A diagonal yellow-and-black barrier stripe (authored as an SVG pattern) marks work that is not finished.

## Components

### Buttons
- **Shape:** 10px radius, 52px tall, a label cell and a separate arrow cell divided by a 2px rule.
- **Primary:** Action Blue fill with white condensed uppercase label; the arrow cell is tinted 12% darker.
- **Secondary:** Sign Face fill with an ink border and ink label.
- **Hover / Focus:** lifts 1px with a sign shadow and the arrow slides 3px; pressed returns to flat. Focus is a 3px ring in Action Blue (light blue on dark grounds) offset 3px.

### Chip buttons
- **Style:** 44px tall, 8px radius, 2px ink border, transparent fill, condensed uppercase label.
- **State:** a pressed or selected chip inverts to ink fill with sheet text.

### Sign panels
- **Corner Style:** 14px with the inset ink border.
- **Background:** Sign Face.
- **Shadow Strategy:** the Sign shadow.
- **Internal Padding:** clamp(24px, 3vw, 44px).

### Tags
- **Style:** Sign Face fill, 1.5px strong-hairline outline, a small verdict glyph then a short statement. A yellow tag takes an ink outline.
- **Use:** statuses and caveats, never decoration.

### Inputs / Fields
- **Style:** 44px minimum, 2px ink border, 10px radius, white fill; paths use the mono face.
- **Focus:** 3px Action Blue ring, 2px offset.

### Navigation
- **Style:** a sticky ink band, 62px tall, with the logo mark, name, role and condensed uppercase destinations. The followed section is a filled sheet-coloured pill with ink text. On small screens it becomes a Menu disclosure with full-width rows and right-edge arrows. A Day/Night toggle sits at the end.

### Gate sign (signature)
A compact sign for one pipeline stage: a black numeral plate, the stage name, a pictogram, and a verdict shape with its word. It flips like a split-flap (220ms) when its verdict arrives and is hung from the beam by a short rod.

### Diagram
Nodes are sign-faced rounded rectangles on the raised sheet, joined by orthogonal 2px ink connectors with arrowheads. Tone is a coloured outline plus a corner verdict glyph. Dashed outlines and connectors mean not built or not verified. Every diagram has a text alternative.

## Do's and Don'ts

### Do:
- **Do** let a signal colour appear only with its meaning: blue for a decision or action, green for permitted or verified, yellow for a limit or work in progress, red for blocked.
- **Do** pair every colour with its shape and a word.
- **Do** put a caution sign and sentence beside every measured result.
- **Do** keep sign faces light in both themes.
- **Do** keep every motion at 300ms or less and collapse it under `prefers-reduced-motion`.
- **Do** use the arrow cell, flush to the right edge, for every linking button.

### Don't:
- **Don't** add a fifth accent colour or use a signal colour for emphasis.
- **Don't** use hard-offset or flat block shadows, gradients on text, or glass effects.
- **Don't** set monospace outside code, paths and logs.
- **Don't** convey state by colour or motion alone.
- **Don't** use warm cream grounds or a dark-with-neon scheme; the ground is cool and the signs are the light.
