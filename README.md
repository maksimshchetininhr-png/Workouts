# 12-Week Training App v5.0

A phone-friendly installable web app (PWA) for the 12-week Saturday / Sunday / Wednesday program.

## v5.22: updated Weeks 5–12 programme

The built-in programme now uses the supplied **Strength + Shoulder Capacity + Progressive Knee Rehabilitation** plan. [Readable schedule](docs/training-program-weeks5-12-readable.md) lists every session; `program.js` contains its complete prescriptions, warmups, notes, goals and rehab rules. Weeks 1–4, the existing start date, workout logs, times, settings and benchmarks are retained. With the original start date, Week 5 begins on 7 November 2026.

Both regular-gym and CF-gym Wednesday options are included. Weeks 8 and 12 use the file's explicit deload counts without reducing them again. Isometric holds are labelled in seconds, carries in metres, and rehab exercises retain manual load control and the supplied clinician-clearance conditions. The programme is cached for offline use and included in the Pages app assets.

An explicitly imported programme continues to take priority. To switch from one to this updated default, select **Settings → Use built-in programme**; saved training data stays intact. Run `node tests/program.cjs` with Playwright available and the local server running to check all 32 session variants, the readable tables, history preservation, custom import priority, and offline programme loading.

## v5.21: working-session suggestions and GitHub backups

Load suggestions now prefer the same exercise on the same training day, using a non-deload session when available. Saturday working loads stay separate from lighter Wednesday sets. The next block skips deload logs, and deadlift technique calibration uses the working load rather than a first ramp set.

In **Settings → Data & backup → GitHub backup upload**, enter a fine-grained GitHub token with **Contents: read and write** permission for `maksimshchetininhr-png/Workouts`, then choose **Upload backup to GitHub** and confirm. Each upload creates or replaces `backups/workouts.json` on `main`. It includes full workout times, set loads/reps/RIR/pain/timestamps, notes, settings, benchmarks and any imported programme, using the same importable format as Export backup. To restore, download the JSON file from the repository and use Import backup.

The token is used for that upload only, cleared on use or closing Settings, and never saved in browser storage or included in the backup. There are no automatic uploads. Backups remain in Git history and are visible to anyone with repository access (everyone if the repository is public). The Pages workflow publishes only app assets and skips backup-only commits, keeping backups out of the website. Branch protection or token access rules can prevent an upload; the app reports failure without marking the backup successful.

## Local development and tests

No build or package installation is required to run the app:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Check syntax with `node --check app.js` and `node --check service-worker.js`. With Playwright available to Node and Chromium installed, run `node tests/browser.cjs` against that server. Set `NODE_PATH` to your Playwright installation and `CHROMIUM_PATH` to your Chromium binary if needed. The tests exercise working-session/deload references, navigation, and GitHub upload creation, replacement, cancellation and failures with synthetic data and a mocked API. They never upload actual workout data or use a real GitHub token.

## Update your GitHub Pages app
Upload/replace these files in the root of the `Workouts` repository:
- `index.html`
- `app.js`
- `styles.css`
- `manifest.webmanifest`
- `service-worker.js`
- `icon-192.png`
- `icon-512.png`
- `apple-touch-icon.png` (new)

You can delete the old `*.bak_v4` files and `icon.svg` from the repo; they aren't used.

Your logged workouts, benchmarks and settings carry over automatically (same storage as v4).
Still, export a backup from v4.4 before updating, just in case.

After committing, open the app once while online. From v5.0 on, the app always checks for the latest files when you're online, so future updates appear on the next open.

To release a future version, change only `APP_VERSION` at the top of `app.js`.

## v5.0 changes

### Fixes
- iPhone no longer zooms in when you tap a set field (inputs are 16px).
- Deload weeks (4, 8, 12) now suggest about 85% of your last load instead of repeating it.
- The week after a deload builds on your last normal week, not the lighter deload week.
- The rest timer beeps and flashes the screen when rest is over (iPhone doesn't support vibration). The screen stays awake while a session is running. Both can be turned off in Settings.
- "Reset all app data" only deletes this app's data, not other apps on the same GitHub Pages site.
- Pain-based reductions now work for light dumbbells too (e.g. 4 kg → 3 kg).

### Workout flow
- Every set shows grey targets (load and reps) from your suggestion and last session. Tap ✓ to log them in one tap, or type your own numbers.
- Entering a load copies it down as the target for the next sets.
- One exercise is open at a time. Finished exercises collapse to a summary line (e.g. "4/4 · 37.5 kg × 11, 10, 10, 10") and the next one opens.
- Session timer and a sets-done progress bar sit in the session header. The warm-up list collapses once you start.
- "Save workout" and "Mark completed" are replaced by **Finish workout**, which shows a summary: time, sets, volume vs last week and new bests.
- Notes save as you type.
- Pain of 3 or more is highlighted with a reminder of the pain rule.

### Schedule changes
- **Switch session** on Today lets you do any session today (for example Saturday's on a Friday). Today shows it for the rest of the day.
- Rest days have **Train today instead**.
- Missed sessions from the last 10 days are listed on Today with a "Do today" button.

### Screens
- New **History** tab: every logged session with date, sets, time and volume. Tap one to open it.
- Backup, import, reset and the help texts moved into Settings.
- Progress: lift trend charts per main lift, weekly volume and time combined (only weeks with data, deloads marked), benchmarks as autosaving cards.
- Each day has its own name (e.g. "Wednesday · Press + Hips") instead of the cycle name.
- Goals appear once per session instead of three times. Load suggestions are a compact box that hides once you start logging that exercise.
- Technique videos are shown as "Technique video" chips under each exercise.
- Automatic dark mode, SVG icons, and a backup reminder on Today when your last backup is more than 14 days old.

## Baseline logic
A known baseline is always preferred. Once workouts are logged, the app uses your previous load, reps, RIR and pain to recommend adding load, repeating it, or reducing it.

Unknown lifts use conservative calibration loads based mainly on bodyweight. They're deliberately not shown as estimated 1RM/5RM values, because age, height and bodyweight don't predict an individual's strength accurately enough.

## Earlier versions
- v4.4: technique demo links for every movement.
- v4.3: weekly workload tracking; new aurora mountain icon.
- v4.2: session timing and automatic rest timer.
- v4: warm-ups in every workout, goal badges, suggested starting loads, live goal cards.
