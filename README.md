# A Little Ocean

A wide, English-language landing page for a Mac desktop aquarium, with rewritten storytelling copy and a fish-led Little Ocean brand mark. The design uses a light canvas, blue accents, rounded type, spacious sections and the user's iridescent bubble artwork.

## Run locally

With Node.js 20.19+ or 22.12+ installed:

```sh
npm install
npm run dev
```

## GitHub Pages

The `main` branch deploys to GitHub Pages through the workflow in `.github/workflows/pages.yml`. Its Vite base path is configured for the `Little-Ocean-Website` repository. After the first push, select **GitHub Actions** as the Pages build and deployment source in the repository settings if GitHub asks for it.

For the production preview:

```sh
npm run build
npm run preview
```

## Interactions

- An actual canvas aquarium: 13 independently animated fish choose their own routes, speeds and pauses. One curious resident at a time may investigate the cursor; the others keep exploring. Stronger personal space keeps the school from bunching up.
- Touch/click also guides the school. Focus the aquarium and use the arrow keys for keyboard control.
- Three colour moods: Rocky Cove, Golden Hour and Deep Blue. The live aquarium stays flat with rounded corners while fish react naturally to the cursor.
- Pause/play stops the aquarium clock and decorative animation.
- Small iridescent bubbles rise over the entire page.
- A neon tetra forms the Y in the headline.
- Fish illustrations are decorative and cannot be clicked. A separate button opens floating field notes without shifting the card or page.
- A restrained, tactile download button and compact footer with creator, community and legal links. Responsive layout, readable supporting copy and reduced-motion support.

## Add your links

The footer links to the creator portfolio at https://nicot-111.github.io/, the verified profile at https://github.com/NicoT-111/, and the Little Ocean Discord. Edit `src/site-config.js` to add the actual app download. The legal, privacy and terms dialogs need the actual provider/app information before public release.

This is a browser simulation, not a live capture of the Mac app. The 9+ background feature comes from the supplied mockup; app feature counts and performance have not been independently measured.

Assets: `ASSETS.md`. Browser and visual checks: `design-qa.md`.

Motion checks: `node --test tests/fish-motion.test.mjs`. The tests cover scattered starts, limited cursor interest, independent pauses/dashes and two minutes of bounded swimming.
