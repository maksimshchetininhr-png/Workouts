# 12-Week Training PWA

A small installable web app for the 12-week Saturday / Sunday / Wednesday training program.

## What it does

- Shows the correct workout for the current training day
- Lets you browse all 12 weeks
- Logs weight, reps, RIR and pain per set
- Stores session notes and completed workouts
- Tracks Week 1 / 4 / 8 / 12 benchmarks
- Exports/imports a JSON backup
- Works offline after the first successful load when hosted as a PWA

## Default start date

Saturday, 10 October 2026. Change this from the Settings button in the app.

## Easiest iPhone installation

The files need to be served over HTTPS for full PWA/offline installation.

### Option A: GitHub Pages
1. Create a new GitHub repository.
2. Upload the CONTENTS of the `training_app` folder to the repository root.
3. In GitHub, open Settings > Pages.
4. Under Build and deployment, choose `Deploy from a branch`.
5. Select the `main` branch and `/ (root)`, then save.
6. Open the Pages address in Safari on the iPhone.
7. Tap Share > Add to Home Screen.

### Option B: Netlify Drop
1. On a computer, open Netlify Drop in a browser.
2. Drag the `training_app` folder onto the page.
3. Open the generated HTTPS address on the iPhone in Safari.
4. Tap Share > Add to Home Screen.

## Data

Logs are stored in the browser on the device. Use the Backup tab to export a JSON backup periodically.
