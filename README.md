# Training App v4.4

# 12-Week Training App — v4

A phone-friendly installable web app (PWA) for the 12-week Saturday / Sunday / Wednesday program.

## v4 changes
- Warm-up is shown inside every workout.
- Goal exercises are marked with a purple **GOAL** badge and a **Goals this session** card.
- Each suitable exercise shows a suggested starting load.
- Tap **Use X kg for all sets** to pre-fill the weight column.
- Suggestions use your saved baseline first, then your previous workout results.
- If a baseline is unknown, the app uses a conservative bodyweight-based *calibration load* rather than treating demographic averages as your true strength.
- Progress now shows live goal cards for chin-ups, deadlift, farmer carries and machine chest press.
- Offline cache bumped to v3 so updated GitHub Pages files replace the older app more reliably.

## Current known baselines preloaded
- Age: 36
- Height: 181 cm
- Bodyweight: 82 kg
- Strict chin-up max: 8 clean reps (editable)
- Machine chest press: 35 kg
- Chest-supported DB row: 16 kg per hand
- Lateral raise: 4 kg per hand
- Scaption: 4 kg per hand
- Hammer curl: 10 kg per hand

Deadlift, hip thrust and farmer carry are left blank so the app gives a conservative first-session calibration suggestion until you enter your approximate real baseline.

## Update your GitHub Pages app
Upload/replace these files in the root of the `Workouts` repository:
- `index.html`
- `app.js`
- `styles.css`
- `manifest.webmanifest`
- `service-worker.js`
- `icon-192.png`
- `icon-512.png`

Commit the changes. GitHub Pages should redeploy automatically.

If the installed iPhone app still shows the old version, fully close it and reopen it once while online. If needed, open the GitHub Pages URL in Safari and refresh once; the v3 service worker is configured to fetch the latest page on navigation.

## Baseline logic
A known baseline is always preferred. Once workouts are logged, the app uses the previous load, reps, RIR and pain to recommend whether to increase, repeat or reduce the load.

Unknown lifts use conservative calibration loads based mainly on bodyweight. These are intentionally not presented as estimated 1RM/5RM values, because age, height and bodyweight do not predict an individual's lifting strength accurately enough for that.


## v4.3
- Adds weekly workload tracking on the Progress screen.
- Rep-based tonnage is calculated from logged load x reps.
- Two-dumbbell/per-hand movements are doubled.
- Chin-ups use bodyweight plus any added load.
- Carries are tracked separately in kg-m because distance is the relevant work variable.
- Shows week-over-week change and the latest week exercise breakdown.


## v4.2 — workout timing and rest timer
- Tap **Start warm-up** when you begin. The app timestamps the session.
- Each completed working set is timestamped when its reps/distance and required load are entered.
- Session duration is measured from warm-up start to the last logged working set; when all prescribed sets are logged it freezes automatically.
- A rest timer starts automatically after each completed set. Defaults are 3:00 for heavy strength, 2:00–2:30 for compound lifts/carries, 1:30 for accessories and 1:00 for core/prehab.
- The floating timer supports **+30 sec** and **Skip**.
- Progress now includes weekly total and average training time.


## v4.3
- Replaced the app icon/logo with the selected cropped aurora mountain image for the home-screen icon and PWA icons.
- Bumped visible version and cache version so the update is easier to verify and refresh.


## v4.4 — movement demo links
- Every programmed warm-up movement and workout exercise now has a clickable technique/demo link.
- Tap the exercise name or the small play icon to open its demo.
- Combined movements (for example Ab wheel / hanging knee raise) show separate video choices.
- Links were curated from sources including CrossFit, Concept2, Renaissance Periodization, Bret Contreras, Catalyst Athletics, PureGym and other exercise-demo libraries.
