---
name: Liang — AI Engineer portfolio
description: The name as a monument, with the owner's own safety gate live in the first screen. Graphite ground, one cobalt field, one pale field, safety orange for the single action.
colors:
  graphite: "#17181a"
  graphite-raised: "#222427"
  graphite-lifted: "#2e3135"
  graphite-high: "#3a3e43"
  ink: "#eff0f1"
  ink-soft: "#c9cbcf"
  ink-quiet: "#a8abb0"
  safety-orange: "#ff4a1f"
  safety-orange-hover: "#ff6a45"
  ask-blue: "#8da7ff"
  ask-blue-hover: "#a9bcff"
  cobalt: "#1341d6"
  cobalt-deep: "#0f33a8"
  cobalt-deepest: "#0c2a8c"
  on-cobalt: "#ffffff"
  on-cobalt-soft: "rgb(255 255 255 / 0.9)"
  paper: "#eceeef"
  paper-ink: "#17181a"
  paper-soft: "#33363a"
  paper-quiet: "#4f5358"
typography:
  monument:
    fontFamily: "'Chivo Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "min(27vw, 46svh), then fitted by script to span the page width"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.03em"
  poster:
    fontFamily: "'Chivo Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(3.5rem, 1.5rem + 9.5vw, 10.5rem)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.05em"
  head:
    fontFamily: "'Chivo Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(2.25rem, 1rem + 5vw, 5rem)"
    fontWeight: 900
    lineHeight: 0.98
    letterSpacing: "-0.045em"
  sub:
    fontFamily: "'Chivo Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(1.625rem, 1.1rem + 1.5vw, 2.25rem)"
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  lead:
    fontFamily: "'Chivo Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem)"
    fontWeight: 600
    lineHeight: 1.32
    letterSpacing: "-0.01em"
  body:
    fontFamily: "'Chivo Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  label:
    fontFamily: "'Chivo Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem)"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  code:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.55
rounded:
  none: "0px"
  round: "50%"
spacing:
  margin: "clamp(16px, 2.2vw, 32px)"
  gap: "clamp(16px, 2vw, 32px)"
  section: "clamp(72px, 9vw, 140px)"
  bar: "64px"
components:
  button-primary:
    backgroundColor: "{colors.safety-orange}"
    textColor: "{colors.graphite}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.safety-orange-hover}"
  button-gate:
    backgroundColor: "{colors.graphite-lifted}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "48px"
  button-gate-ask:
    backgroundColor: "{colors.ask-blue}"
    textColor: "{colors.graphite}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "48px"
  exhibit:
    backgroundColor: "{colors.graphite-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "7% 8%"
  bar-cobalt:
    backgroundColor: "{colors.cobalt-deep}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    height: "58px"
  row-contact:
    backgroundColor: "{colors.graphite-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
  button-mail:
    backgroundColor: "{colors.safety-orange}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.round}"
---

# Design System: Liang — AI Engineer portfolio

## Overview

**Creative North Star: "The Name on the Gate"**

The name is the loudest thing on the page, and the owner's own safety gate is the picture. The first screen holds a
doorway-shaped gate with small requests drifting toward it, and one of them is always about to be allowed, denied or
held for a person. Under it, the name LIANG is fitted to the full width of the screen and cropped by nothing but the
edge. After that the page goes calm: a narrow column of reading, a list of interests that lights one line at a time,
three project names passing a square that holds still, and then plain fields of colour with plain content.

The system is graphite with two other grounds (one cobalt field for the stack, one pale field for the record and the
footer) and one loud colour, safety orange, which marks the single action on a screen and whatever the gate stopped.
Everything is set in one family, Chivo, in the black weight and capitals for names and in the regular weight for
reading. It refuses the dark-glow AI page, rounded cards with soft shadows, hairline grids, monospace costume and
numbered sections. Depth is a step in tone. State is a shape beside a word.

**Key Characteristics:**
- One monumental word per screen; everything else is small and calm.
- Flat tonal layers: graphite, raised graphite, lifted graphite. No shadows, no gradients, no hairlines.
- One accent, safety orange, with one job: the action, and the thing that was stopped.
- Colour never carries a state alone; every state has a shape and a word.
- Square corners everywhere except one round mail button.
- Motion is rare and authored: the name rises once, the gate demo moves, lines light as they cross the middle.

## Colors

A graphite room with one cobalt field and one pale field, lit by a single safety-orange signal.

### Primary
- **Safety Orange** (#ff4a1f): the one action on a screen ("See my work", the round mail button) and the token the gate denied. Hover lifts to #ff6a45. Text on it is graphite, never white.

### Secondary
- **Ask Blue** (#8da7ff): a request the gate is holding for a person, the Approve button, a stage that is waiting. Hover #a9bcff. Always paired with the word "Held" or "Waiting".
- **Cobalt** (#1341d6): the Stack field and the stack page. Its deeper steps (#0f33a8 for bars, #0c2a8c for hover) hold the content. **On Cobalt** (#ffffff) is the text on it, 7.7:1, with **On Cobalt Soft** (rgb(255 255 255 / 0.9)) for notes.

### Neutral
- **Graphite** (#17181a): the ground of the page and the text on orange and on the pale field.
- **Raised Graphite** (#222427): exhibits, panels, alternate contact rows. **Lifted Graphite** (#2e3135) and **High Graphite** (#3a3e43): controls and their hover.
- **Ink** (#eff0f1): running text and the large words. **Ink Soft** (#c9cbcf): long reading. **Ink Quiet** (#a8abb0): labels and notes; 7:1 on graphite.
- **Paper** (#eceeef): the record and the footer, with **Paper Ink** (#17181a), **Paper Soft** (#33363a) and **Paper Quiet** (#4f5358).

### Named Rules
**The One Signal Rule.** Safety orange appears on the single action of a screen and on a denied request. It never decorates, never appears twice as an action, and never fills a section.
**The Shape Beside Colour Rule.** Orange, blue and ink marks always travel with a word (Denied, Held, Valid) and a shape (filled square, ring, dash). A state that only changes colour is a bug.

## Typography

**Display Font:** Chivo Variable (with Helvetica Neue, Arial, sans-serif)
**Body Font:** Chivo Variable, the same file at regular weight
**Label/Mono Font:** none; the system monospace stack appears only inside code blocks.

**Character:** a black grotesque with the weight of a hoarding, letters nearly colliding at display size and open and plain at reading size. One family, so the contrast is size and weight alone.

### Hierarchy
- **Monument** (900, capitals, fitted to the page width and capped at half the screen height, 0.9, -0.03em): the name in the hero and again, cropped, in the footer.
- **Poster** (900, capitals, clamp(3.5rem, 1.5rem + 9.5vw, 10.5rem), 0.9, -0.05em): project names, and the words Work, Stack and Record.
- **Head** (900, capitals, clamp(2.25rem, 1rem + 5vw, 5rem), 0.98, -0.045em): the interests, and the title of every detail page.
- **Sub** (900 for page sections, 800 under the name, clamp(1.625rem, 1.1rem + 1.5vw, 2.25rem), 1.1, -0.03em): section titles inside a detail page, and who the owner is under the name.
- **Lead** (600, clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem), 1.32): the background statement, what the owner does under the name, the result in each exhibit, and the line under each page title; 34em at most.
- **Body** (400, clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem), 1.4): reading, 38em at most.
- **Label** (700, clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem)): controls, notes, table cells. Never below 13px.

### Named Rules
**The Two Ends Rule.** The page uses enormous type and small type and little between. A headline is never set at an in-between size to "fit".
**The Sentence Case Rule.** Capitals belong to the black display weight only. Labels, buttons and notes are sentence case, never tracked-out capitals.

## Layout

One pair of equal page margins (16 to 32px, widening past 1800px so the page stops growing). Home sections are full-bleed fields with content on that margin; the about block is a 12-column grid (3 for the facts, 9 for the statement); stack and record are a 5/7 and 6/6 split with a sticky giant word on the left. The work section is a grid in which one 520px square (36vw) is sticky at the middle of the screen and the three names pass across it, 74svh apart, with the result and the limit either side of it. Section padding is 72 to 140px. Below 900px nothing is pinned: each project is a card of name, picture and words, and every split stacks.

Detail pages use the same margin: a head (way back, title, one lead sentence), then a reading column no wider than 38em for paragraphs, with a sticky contents list on case studies.

## Elevation & Depth

Flat by design. Depth is a step in tone: ground, raised, lifted, high. There are no shadows, no blur, no gradients and no hairlines; a separation is a gap or a change of tone.

### Named Rules
**The No Edge Lines Rule.** If two things need separating, give them space or a different tone. A 1px line is never the answer.

## Shapes

Square corners, everywhere. The one exception is the round orange mail button in the contact section. The gate is two posts and a beam; requests are rectangles; marks are 10px squares (filled), rings, or dashes. The monument is cropped by the footer edge and never by a letter's top.

## Components

### Buttons
- **Shape:** square, 52px tall, 24px side padding.
- **Primary:** safety orange with graphite text; hover #ff6a45; the arrow slides 4px right; pressed moves 1px down at 0.99 scale. One per screen.
- **Gate controls:** 48px tall, lifted graphite with ink text (Send an action), ask blue with graphite text (Approve), transparent with quiet text (Pause demo).
- **Text link:** bold, underlined 2px with a 0.3em offset, 44px tall, arrow on the right.

### The gate demo
- **Gate:** two ink posts 16px wide and a 16px beam, 150px tall; a floor bar in lifted graphite. The ruling appears above it as one word (Allowed, Held, Denied) in black capitals, in ink, ask blue or orange.
- **Requests:** 48px rectangles with a plain label in bold ("Delete 12 drafts") and the tool name in regular weight beside it on wide screens. Ink while travelling, ask blue while held, orange once denied.
- **Behaviour:** four requests play on their own and stop; a visitor can pause them or take over. Allowed requests pass, denied ones bounce back and fade, held ones wait for Approve or Decline and are declined after silence.

### Exhibits
- **The held square:** raised graphite, 520px (36vw), with content only in the top and bottom thirds so a project name can cross the middle. Each exhibit has a title, the result in lead-size type, and a note when its content is a simulation or an example. Either side of the square sit the project in a line, and the measured result with its limit, both word for word from the case study, at 16 to 17px.

### Lit lines
- **Style:** poster-weight capitals that move from 40% to full ink as they cross the middle of the screen, with a right-aligned note naming the work behind each.

### Stack groups
- **Style:** six filled blocks in a deeper cobalt step, every one open, in two columns; each item has a mark (filled square, ring, dash) and its evidence word. Nothing needs a click.

### Contact rows
- **Style:** display type, full width, alternating graphite and raised graphite, the first row holding the round mail button.

### Navigation
- **Style:** 64px bar, transparent over the first screen and solid once the page moves; 44px links in quiet ink, ink with a 2px underline for the current section; the name hides on the narrowest phones.

## Do's and Don'ts

### Do:
- **Do** let one word per screen be enormous and keep everything else small.
- **Do** put the result and its limit side by side, and label every simulation and example as one.
- **Do** pair every colour state with a shape and a word.
- **Do** use only graphite, cobalt and paper as grounds, and safety orange for one action per screen.
- **Do** keep reading text to 38em and at 17px or larger.
- **Do** give every motion a reduced-motion version that keeps the content.

### Don't:
- **Don't** add hairlines, shadows, gradients, glows, glass, or rounded cards.
- **Don't** set labels in capitals, letter-spaced, or in monospace; code is the only monospace.
- **Don't** number sections or put a small label above a heading.
- **Don't** fill a section with orange or use it for decoration.
- **Don't** add a second typeface, a portrait or a screenshot the owner has not supplied, or any claim, number or customer that is not in the repositories.
- **Don't** animate anything with layout properties; transform and opacity only.
