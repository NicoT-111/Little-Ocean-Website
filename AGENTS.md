# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Accepted visual preferences
Keep English copy vivid, concise and focused on small moments in the aquarium. Use the supplied creator and verified GitHub links. Strengthen mouse-driven depth with reef layers, individual fish depth and soft lighting, while preserving autonomous fish behaviour and reduced-motion support.

## More visual preferences
The user prefers a flat live aquarium over 3D perspective, with clearly rounded preview corners. Fish detail interactions should overlay cards without shifting surrounding page layout. Avoid the rejected closing slogan “Make your everyday a little more extraordinary.” Make creator/social/legal links feel polished and grouped.

Keep aquarium and fish shadows restrained and natural, without broad muddy halos. Make fish field-note overlays feel deliberate and editorial, with clear hierarchy and no layout shift.
Keep the download action clean and tactile: avoid glossy gradients, shine overlays and oversized capsule treatments.
