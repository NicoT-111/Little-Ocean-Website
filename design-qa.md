# Redesign QA

final result: passed

## Visual target and scope

The user explicitly clarified that the first mockup was rough, requested a substantial improvement without black dividers, English throughout, real cursor response, and rising bubbles across the page. The new screenshot guides the light composition, two-line title, fish Y, blue download button, underwater hero and three fish cards. This is a redesign, not a pixel-exact clone.

Source: `Bildschirmfoto 2026-10-11 um 15.22.21.png` (714 × 960 px).
Headline detail reference: `Bildschirmfoto 2026-10-11 um 15.00.02.png`.
Implementation: `http://127.0.0.1:4174/`.
Final comparison capture: `redesign-comparison-render.png` (698 × 2486 px; CSS viewport 713 × 960; scrollbar excluded by browser capture).
Combined source/render input: `redesign-comparison.png`. Viewed together at native density. The combined image contains the complete reference and the top 1350 px of the implementation; the complete implementation was separately reviewed.
User-facing desktop capture: `vorschau.png` (1280 × 1000 CSS viewport).
Mobile reviewed at 390 × 844 CSS px; capture `redesign-mobile.png`.

## Required fidelity surfaces

- Typography: rounded display type, two-line headline, bright blue Ocean, actual neon-fish sprite replacing the Y. English throughout, including metadata and dialogs.
- Layout: white/light background, no black dividers, spacious hero, immersive aquarium, three soft fish cards, original iridescent feature bubbles, closing CTA and simple footer. Larger vertical rhythm and a slim navigation are intentional improvements to the rough reference.
- Colour: pale blue-white, vivid blue actions, turquoise landscape, readable slate supporting text. No original dark dotted background.
- Assets: existing generated fish and reef assets retained. User-provided bubble art retained. Generated bubble sprites also used across the page. No substitute drawing or placeholder artwork.
- Content: illustrative English location copy and species-appropriate cards. Download/community destinations still explicitly absent. Neon tetra is accurately labelled rather than called a parrotfish.

Focused review covered the fish Y, cursor hint, pause control, card expansion and mobile footer; these were inspected in browser close-ups and state snapshots.

## Fix and comparison history

1. Found P2: expanding a fish card rewrote its class and removed its scroll-reveal class, causing it to disappear. Fixed by recording reveal state in an independent data attribute. Browser verification confirms expanded card opacity remains 1.
2. Found P2: small supporting text and mobile footer hit areas. Increased contrast, enlarged footer text and added 44 px mobile button heights.
3. Found P2: a decorative fish produced a small horizontal overflow at intermediate widths. Moved it inward and clipped decorative overflow. Final document widths: 698 at a 713 viewport, and 383 at a 390 viewport. Core controls remain visible.
4. Compared final combined reference/render after the fixes. Remaining composition/asset differences are intentional within the requested redesign. No remaining actionable P0/P1/P2 issues.

## Behaviour checks

- Cursor input tested by dragging within the aquarium: following state becomes true and the school changes direction toward the pointer.
- Native Pause/Play controls verified in browser. Two paused aquarium captures 1.2 seconds apart show no spatial fish movement; 99.7% of sampled colour channels were identical, with only tiny compositor differences (maximum 4/255).
- Colour mood selection updates background treatment, heading and description.
- Fish expansion/collapse verified with persistent visible reveal state.
- All image assets loaded on mobile; page language is en.
- Browser console: no errors observed.
- Production build passed. All four existing Sites worker/package tests passed.
- Temporary viewport overrides cleared and the user-facing preview left open.

## Limits

Actual app binary and final legal/community details are not supplied. Feature counts/performance are not independently verified. No public deployment requested or performed.


## Latest refinement: independent residents, richer copy and less empty margin

final result: passed

User-authorized changes: stronger English storytelling, independent fish behaviour, a better upper-left brand and narrower lateral margins.

Before source screenshot: `redesign-comparison-render.png` (698 × 2486).
After implementation screenshot: `independent-final.png` (698 × 2515).
Both use a 713 × 960 CSS viewport, native density and scrollbar-excluded capture. Combined comparison: `independent-comparison.png`; both images viewed together, top 1300 px included. Complete page and focused mobile/header/canvas states reviewed separately.
Mobile screenshot: `independent-mobile.png` at 390 × 844.
User-facing final capture: `vorschau.png` at 1440 × 1180.

Fidelity surfaces: rounded type and the fish Y retained; copy rewritten around the residents' behaviour; new raster clownfish brand mark and tagline; wide aquarium/section layout with the same pale/blue palette; existing real image assets retained, scaled consistently. Supporting text, mobile controls and image loading checked. Intentional differences follow the user's requested improvements.

Comparison history: the prior single shared cursor target was replaced with individual goals, randomized decision intervals and selective interest. Wider layout checked at 1440 and 713 px; mobile checked at 390 px. Found and fixed a missing space at the hidden mobile line break, then recaptured. No remaining actionable P0/P1/P2 findings.

Motion validation: thirteen scattered residents with distinct routes/speeds; cruising, hovering and tetra dashes; maximum three curious fish at once; goldfish continues its own route; neighbour separation, gentle turns and variable depth. Three meaningful motion tests passed, including two simulated minutes. All seven project tests passed. Native pointer, keyboard and Pause/Play actions verified in browser; no console errors observed.

Layout evidence: aquarium width 1310.625 px at a 1440 px viewport (91%); document width 1425. At 713, document width 698. At 390, document width 375. No horizontal overflow. All reveal sections had opacity 1 in the final page capture. Temporary viewport reset and preview left open.

Existing missing download/community URLs and app/legal information remain explicit availability notices. No public deployment performed.


## Latest refinement: richer depth, English storytelling and creator links

User requested more compelling English copy, greater 3D depth in the live preview, and working creator/GitHub links. Rewrote hero, habitat, fish, feature and closing copy. Added a gentle cursor-driven aquarium tilt, separate parallax on the reef and foreground, depth-sensitive fish size/softness, and a soft moving water reflection. The existing fish keep independent destinations; the canvas still draws them in depth order.

Creator links verified from the portfolio site: https://nicot-111.github.io/ redirects to the creator's portfolio, whose source links to https://github.com/NicoT-111. Both footer links now open those addresses in a new tab. Download and Discord remain honest availability notices pending real destinations.

Browser QA at desktop and narrow mobile viewport: canvas is present, all images load, no horizontal overflow, main copy and both footer links render. Pointer drag changes the aquarium transform, underlying reef position, and foreground position independently. Keyboard movement continues working; Pause/Play was verified. Browser console had no warning/error entries. Production build and all seven available project tests passed. Final viewport restored to the production preview at 1440 × 1180. The production preview remains running at http://127.0.0.1:4174/.

Final visible screenshot: `vorschau.png`.


## Latest refinement: flat aquarium, stable fish notes and a clearer footer

Removed the mouse-driven perspective tilt, layered reef motion, foreground duplicate and moving light treatment. Restored the flat reef and its naturally rounded preview window (34 px desktop, 23 px mobile). Fish still react to cursor movement independently inside the water.

Replaced the in-flow fish detail text with a field-notes overlay contained within each card. Its absolute overlay leaves the resident grid and page height in place when opened. Closing notes returns the card to its original view. Replaced the rejected “Make your everyday a little more extraordinary” line with “A quiet moment. A whole ocean to explore.” Redesigned the footer as a rounded pale-blue panel with clear pill links and a gentle separator for legal links.


## Latest refinement: download button, non-clickable fish art and short footer

Restyled the download action with a layered ocean-blue gradient, gloss highlight and separate rounded arrow badge. Fish illustrations are now decorative `div` content, so they cannot be clicked; field notes are opened using a separate labeled control within the card. Cut the footer down to one slim row with Little Ocean, Discord, GitHub, About, Privacy, Legal and Terms. Removed the large panel, explanatory paragraphs and extra tagline there.

Browser inspection confirms there are no controls inside the fish artwork, the custom gradient CTA renders, and the footer is only 62 px tall at desktop size. The page remains in a 2D aquarium presentation. Production build and browser interaction checked; the local preview stays open.


## Latest refinement: more room between fish and a clearly bounded habitat story

Reduced cursor interest to one fish at a time and strengthened the local separation force to keep residents from bunching together. The Rocky Cove description now sits in a distinct pale-blue rounded panel with a small label, generous padding and a soft edge; this makes its beginning and end visible without a dark divider.
