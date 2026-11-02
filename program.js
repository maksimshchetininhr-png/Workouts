// Built-in Weeks 5–12 programme supplied on 2 November 2026.
// Keep prescriptions in sync with docs/training-program-weeks5-12-readable.md.
const bundledProgram = {
  "type": "training-program-v1",
  "name": "Strength + Shoulder Capacity + Progressive Knee Rehabilitation",
  "version": 1,
  "createdAt": "2026-11-02",
  "appMinVersion": "5.20",
  "startWeek": 5,
  "endWeek": 12,
  "originalStartDate": "2026-10-10",
  "days": [
    "sat",
    "sun",
    "wed"
  ],
  "description": "Weeks 5-12 of the existing 12-week app. Weeks 1-4 and all existing logs are not changed. One knee rehabilitation movement per session, conditional staged progression, two light deloads.",
  "rehabRules": {
    "maxPainDuringExercise": 3,
    "nextMorning": "Symptoms should settle to usual baseline within ~24 hours before repeating/progressing.",
    "progression": "No automatic weight progression for knee rehab. Move to slow dynamic exercise ONLY after physiotherapist confirms readiness and at least 1 week of tolerating current stage. Partial tear history requires individual clearance.",
    "loggedIsometricRepsUnit": "seconds",
    "stages": {
      "weeks5-6": "Isometric holds at tolerable effort",
      "weeks7-9": "Conditional introduction of slow knee extension on Wednesday",
      "weeks10-12": "Conditional controlled leg press on regular-gym Wednesdays; CF-gym variant stays isometric fallback"
    },
    "avoid": "No jumping, running, deep squats, lunges or impact before clinician-directed return-to-sport assessment."
  },
  "goals": {
    "Supported wall sit (knee rehab)": "Tendon-capacity goal: steady comfortable holds, pain <=3/10, baseline symptoms by the following morning. Seconds are logged as reps.",
    "Leg extension isometric hold (knee rehab)": "Knee rehab goal: mid-range isometric strength, no automatic load progression; seconds are logged as reps.",
    "Slow leg extension (knee rehab)": "Knee rehab goal: pain-monitored quadriceps strengthening. Progress only after physiotherapist clearance; use 3s up/3s down.",
    "Slow leg press (knee rehab)": "Knee rehab goal: gradual controlled quadriceps loading with clinician-approved range and load, no automatic increases.",
    "Deadlift": "Keep increasing clean posterior-chain strength without grinding.",
    "Strict chin-up": "Gradually raise total strict reps; no kipping.",
    "Weighted / strict chin-up": "Start with bodyweight; add weight only when clean and shoulder-tolerated.",
    "DB bench press": "Second weekly chest exposure only if shoulder remains comfortable.",
    "Machine chest press": "Improve pain-free pressing capacity, add reps before weight.",
    "DB scaption": "Shoulder-capacity goal: pain-free control before load progression."
  },
  "sessions": {
    "w5-sat": {
      "warmup": [
        [
          "Easy bike",
          "3 min"
        ],
        [
          "Hip hinge drill",
          "10 reps"
        ],
        [
          "Band external rotation",
          "12/side"
        ],
        [
          "Scapular pull-up",
          "8 reps"
        ],
        [
          "Deadlift ramp-up",
          "2-3 gradual warm-up sets before working load"
        ]
      ],
      "exercises": [
        {
          "name": "Supported wall sit (knee rehab)",
          "sets": 3,
          "reps": "30-40",
          "note": "Moderate controlled hold at comfortable shallow-to-mid knee bend (about 30-60 degrees). Log SECONDS in reps field, leave weight blank unless coached. Keep pain <=3/10 and return to baseline by next morning. Do not add load automatically."
        },
        {
          "name": "Deadlift",
          "sets": 3,
          "reps": "6-8",
          "note": "Controlled hinge. Week 5: ~60-65 kg is a sensible calibration after the lighter week, then use 2-3 RIR; warm up first."
        },
        {
          "name": "Strict chin-up",
          "sets": 4,
          "reps": "5-8",
          "note": "Bodyweight, no kipping. Stop a set if shoulder symptoms increase."
        },
        {
          "name": "Chest-supported DB row",
          "sets": 3,
          "reps": "8-12",
          "note": "Per-hand dumbbell load; Week 5 ~16-17.5 kg if controlled."
        },
        {
          "name": "DB bench press",
          "sets": 2,
          "reps": "8-12",
          "note": "Optional second weekly chest exposure. Neutral/comfortable grip; skip if shoulder provokes symptoms. Week 5 ~15-17.5 kg per hand if tolerated."
        },
        {
          "name": "Farmer carry",
          "sets": 2,
          "reps": "30-40",
          "note": "Log METRES in reps field. Weight is total carried load. Use ~48-56 kg total if form stays crisp."
        },
        {
          "name": "Band external rotation",
          "sets": 2,
          "reps": "12-15",
          "note": "Easy, controlled; not a max-effort lift. Log reps; leave weight blank."
        }
      ]
    },
    "w5-sun": {
      "warmup": [
        [
          "Easy bike",
          "3 min"
        ],
        [
          "Band external rotation",
          "12/side"
        ],
        [
          "Serratus wall slide",
          "8 reps"
        ],
        [
          "Easy supported wall sit",
          "15-20 sec; this is a warm-up, not a working set"
        ],
        [
          "Very light lateral raise",
          "12 reps"
        ]
      ],
      "exercises": [
        {
          "name": "Supported wall sit (knee rehab)",
          "sets": 2,
          "reps": "30-40",
          "note": "Easy supported hold, shallower and lower effort than Saturday. Log SECONDS in reps field, leave weight blank. Pain <=3/10 and back to baseline next morning."
        },
        {
          "name": "DB lateral raise",
          "sets": 2,
          "reps": "12-15",
          "note": "Controlled without shrugging; start around 4-5 kg per hand."
        },
        {
          "name": "DB scaption",
          "sets": 2,
          "reps": "12-15",
          "note": "Scapular plane, slow, pain-free; ~4 kg per hand."
        },
        {
          "name": "Rear-delt raise",
          "sets": 2,
          "reps": "12-15",
          "note": "Chest supported if possible; no shrugging."
        },
        {
          "name": "Hammer curl",
          "sets": 2,
          "reps": "10-12",
          "note": "~10 kg per hand if strict; otherwise reduce."
        },
        {
          "name": "Band triceps pressdown",
          "sets": 2,
          "reps": "12-15",
          "note": "Smooth lockout and no shoulder compensation; log reps."
        },
        {
          "name": "Ab wheel",
          "sets": 2,
          "reps": "8-12",
          "note": "Stop before low back arches. Choose hollow rocks if ab wheel bothers the shoulder."
        }
      ]
    },
    "w5-wed": {
      "regular": {
        "warmup": [
          [
            "Easy bike",
            "3 min"
          ],
          [
            "Knee symptom check",
            "Compare with usual morning baseline"
          ],
          [
            "Band external rotation",
            "12/side"
          ],
          [
            "Hip thrust ramp-up",
            "1-2 light sets"
          ],
          [
            "Chest press ramp-up",
            "1-2 easy sets"
          ]
        ],
        "exercises": [
          {
            "name": "Leg extension isometric hold (knee rehab)",
            "sets": 3,
            "reps": "30-40",
            "note": "Seated knee-extension isometric at an individually comfortable mid-range knee angle, ideally with physiotherapist guidance. Log hold SECONDS in reps field. Use clinician-approved resistance; pain <=3/10 and next-day baseline."
          },
          {
            "name": "Hip thrust",
            "sets": 3,
            "reps": "8-12",
            "note": "Calibrate around 50 kg, aim 2-3 RIR; progress reps first."
          },
          {
            "name": "Machine chest press",
            "sets": 3,
            "reps": "8-12",
            "note": "Shoulder-friendly range; use last actual machine load as reference (~17.5 kg recorded), not an assumed baseline."
          },
          {
            "name": "Seated or cable row",
            "sets": 3,
            "reps": "10-12",
            "note": "Machine stacks vary; choose ~2-3 RIR. Log the displayed stack."
          },
          {
            "name": "Leg curl",
            "sets": 2,
            "reps": "10-12",
            "note": "Optional only if knee comfortable; use controlled tempo."
          },
          {
            "name": "Pallof press",
            "sets": 2,
            "reps": "10-12",
            "note": "Log per-side reps; anti-rotation without trunk twisting."
          },
          {
            "name": "Cable curl",
            "sets": 2,
            "reps": "10-12",
            "note": "Keep elbows still; no swinging."
          },
          {
            "name": "Cable triceps pushdown",
            "sets": 2,
            "reps": "10-15",
            "note": "Shoulder-friendly elbows-down variation."
          }
        ]
      },
      "cf": {
        "warmup": [
          [
            "Easy bike",
            "3 min"
          ],
          [
            "Knee symptom check",
            "Compare with usual morning baseline"
          ],
          [
            "Band external rotation",
            "12/side"
          ],
          [
            "Serratus wall slide",
            "8 reps"
          ],
          [
            "DB bench press ramp-up",
            "1-2 light sets"
          ]
        ],
        "exercises": [
          {
            "name": "Supported wall sit (knee rehab)",
            "sets": 3,
            "reps": "30-45",
            "note": "Moderate controlled hold at comfortable shallow-to-mid knee bend (about 30-60 degrees). Log SECONDS in reps field, leave weight blank unless coached. Keep pain <=3/10 and return to baseline by next morning. Do not add load automatically. CF gym fallback for when leg-extension or leg-press machines are unavailable. This is NOT progression to a new stage."
          },
          {
            "name": "Hip thrust",
            "sets": 3,
            "reps": "8-12",
            "note": "~50 kg if controlled; main hip strength accessory."
          },
          {
            "name": "DB bench press",
            "sets": 3,
            "reps": "8-12",
            "note": "Comfortable grip; no painful depth. Start near last tolerated ~17.5 kg per hand."
          },
          {
            "name": "Ring row",
            "sets": 3,
            "reps": "10-12",
            "note": "Adjust body angle for clean reps; log reps only."
          },
          {
            "name": "Hammer curl",
            "sets": 2,
            "reps": "10-12",
            "note": "Controlled, no swing."
          },
          {
            "name": "DB triceps extension / kickback",
            "sets": 2,
            "reps": "10-15",
            "note": "Only if shoulder-friendly, or use a band pressdown."
          },
          {
            "name": "Hollow rock",
            "sets": 2,
            "reps": "10-15",
            "note": "Keep low back pressed down."
          }
        ]
      }
    },
    "w6-sat": {
      "warmup": [
        [
          "Easy bike",
          "3 min"
        ],
        [
          "Hip hinge drill",
          "10 reps"
        ],
        [
          "Band external rotation",
          "12/side"
        ],
        [
          "Scapular pull-up",
          "8 reps"
        ],
        [
          "Deadlift ramp-up",
          "2-3 gradual warm-up sets before working load"
        ]
      ],
      "exercises": [
        {
          "name": "Supported wall sit (knee rehab)",
          "sets": 3,
          "reps": "35-45",
          "note": "Moderate controlled hold at comfortable shallow-to-mid knee bend (about 30-60 degrees). Log SECONDS in reps field, leave weight blank unless coached. Keep pain <=3/10 and return to baseline by next morning. Do not add load automatically."
        },
        {
          "name": "Deadlift",
          "sets": 3,
          "reps": "6-8",
          "note": "Controlled hinge. Week 5: ~60-65 kg is a sensible calibration after the lighter week, then use 2-3 RIR; warm up first."
        },
        {
          "name": "Strict chin-up",
          "sets": 4,
          "reps": "5-8",
          "note": "Bodyweight, no kipping. Stop a set if shoulder symptoms increase."
        },
        {
          "name": "Chest-supported DB row",
          "sets": 3,
          "reps": "8-12",
          "note": "Per-hand dumbbell load; Week 5 ~16-17.5 kg if controlled."
        },
        {
          "name": "DB bench press",
          "sets": 2,
          "reps": "8-12",
          "note": "Optional second weekly chest exposure. Neutral/comfortable grip; skip if shoulder provokes symptoms. Week 5 ~15-17.5 kg per hand if tolerated."
        },
        {
          "name": "Farmer carry",
          "sets": 2,
          "reps": "30-40",
          "note": "Log METRES in reps field. Weight is total carried load. Use ~48-56 kg total if form stays crisp."
        },
        {
          "name": "Band external rotation",
          "sets": 2,
          "reps": "12-15",
          "note": "Easy, controlled; not a max-effort lift. Log reps; leave weight blank."
        }
      ]
    },
    "w6-sun": {
      "warmup": [
        [
          "Easy bike",
          "3 min"
        ],
        [
          "Band external rotation",
          "12/side"
        ],
        [
          "Serratus wall slide",
          "8 reps"
        ],
        [
          "Easy supported wall sit",
          "15-20 sec; this is a warm-up, not a working set"
        ],
        [
          "Very light lateral raise",
          "12 reps"
        ]
      ],
      "exercises": [
        {
          "name": "Supported wall sit (knee rehab)",
          "sets": 2,
          "reps": "30-45",
          "note": "Easy supported hold, shallower and lower effort than Saturday. Log SECONDS in reps field, leave weight blank. Pain <=3/10 and back to baseline next morning."
        },
        {
          "name": "DB lateral raise",
          "sets": 2,
          "reps": "12-15",
          "note": "Controlled without shrugging; start around 4-5 kg per hand."
        },
        {
          "name": "DB scaption",
          "sets": 2,
          "reps": "12-15",
          "note": "Scapular plane, slow, pain-free; ~4 kg per hand."
        },
        {
          "name": "Rear-delt raise",
          "sets": 2,
          "reps": "12-15",
          "note": "Chest supported if possible; no shrugging."
        },
        {
          "name": "Hammer curl",
          "sets": 2,
          "reps": "10-12",
          "note": "~10 kg per hand if strict; otherwise reduce."
        },
        {
          "name": "Band triceps pressdown",
          "sets": 2,
          "reps": "12-15",
          "note": "Smooth lockout and no shoulder compensation; log reps."
        },
        {
          "name": "Ab wheel",
          "sets": 2,
          "reps": "8-12",
          "note": "Stop before low back arches. Choose hollow rocks if ab wheel bothers the shoulder."
        }
      ]
    },
    "w6-wed": {
      "regular": {
        "warmup": [
          [
            "Easy bike",
            "3 min"
          ],
          [
            "Knee symptom check",
            "Compare with usual morning baseline"
          ],
          [
            "Band external rotation",
            "12/side"
          ],
          [
            "Hip thrust ramp-up",
            "1-2 light sets"
          ],
          [
            "Chest press ramp-up",
            "1-2 easy sets"
          ]
        ],
        "exercises": [
          {
            "name": "Leg extension isometric hold (knee rehab)",
            "sets": 3,
            "reps": "35-45",
            "note": "Seated knee-extension isometric at an individually comfortable mid-range knee angle, ideally with physiotherapist guidance. Log hold SECONDS in reps field. Use clinician-approved resistance; pain <=3/10 and next-day baseline."
          },
          {
            "name": "Hip thrust",
            "sets": 3,
            "reps": "8-12",
            "note": "Calibrate around 50 kg, aim 2-3 RIR; progress reps first."
          },
          {
            "name": "Machine chest press",
            "sets": 3,
            "reps": "8-12",
            "note": "Shoulder-friendly range; use last actual machine load as reference (~17.5 kg recorded), not an assumed baseline."
          },
          {
            "name": "Seated or cable row",
            "sets": 3,
            "reps": "10-12",
            "note": "Machine stacks vary; choose ~2-3 RIR. Log the displayed stack."
          },
          {
            "name": "Leg curl",
            "sets": 2,
            "reps": "10-12",
            "note": "Optional only if knee comfortable; use controlled tempo."
          },
          {
            "name": "Pallof press",
            "sets": 2,
            "reps": "10-12",
            "note": "Log per-side reps; anti-rotation without trunk twisting."
          },
          {
            "name": "Cable curl",
            "sets": 2,
            "reps": "10-12",
            "note": "Keep elbows still; no swinging."
          },
          {
            "name": "Cable triceps pushdown",
            "sets": 2,
            "reps": "10-15",
            "note": "Shoulder-friendly elbows-down variation."
          }
        ]
      },
      "cf": {
        "warmup": [
          [
            "Easy bike",
            "3 min"
          ],
          [
            "Knee symptom check",
            "Compare with usual morning baseline"
          ],
          [
            "Band external rotation",
            "12/side"
          ],
          [
            "Serratus wall slide",
            "8 reps"
          ],
          [
            "DB bench press ramp-up",
            "1-2 light sets"
          ]
        ],
        "exercises": [
          {
            "name": "Supported wall sit (knee rehab)",
            "sets": 3,
            "reps": "30-45",
            "note": "Moderate controlled hold at comfortable shallow-to-mid knee bend (about 30-60 degrees). Log SECONDS in reps field, leave weight blank unless coached. Keep pain <=3/10 and return to baseline by next morning. Do not add load automatically. CF gym fallback for when leg-extension or leg-press machines are unavailable. This is NOT progression to a new stage."
          },
          {
            "name": "Hip thrust",
            "sets": 3,
            "reps": "8-12",
            "note": "~50 kg if controlled; main hip strength accessory."
          },
          {
            "name": "DB bench press",
            "sets": 3,
            "reps": "8-12",
            "note": "Comfortable grip; no painful depth. Start near last tolerated ~17.5 kg per hand."
          },
          {
            "name": "Ring row",
            "sets": 3,
            "reps": "10-12",
            "note": "Adjust body angle for clean reps; log reps only."
          },
          {
            "name": "Hammer curl",
            "sets": 2,
            "reps": "10-12",
            "note": "Controlled, no swing."
          },
          {
            "name": "DB triceps extension / kickback",
            "sets": 2,
            "reps": "10-15",
            "note": "Only if shoulder-friendly, or use a band pressdown."
          },
          {
            "name": "Hollow rock",
            "sets": 2,
            "reps": "10-15",
            "note": "Keep low back pressed down."
          }
        ]
      }
    },
    "w7-sat": {
      "warmup": [
        [
          "Easy bike",
          "3 min"
        ],
        [
          "Hip hinge drill",
          "10 reps"
        ],
        [
          "Band external rotation",
          "12/side"
        ],
        [
          "Scapular pull-up",
          "8 reps"
        ],
        [
          "Deadlift ramp-up",
          "2-3 gradual warm-up sets before working load"
        ]
      ],
      "exercises": [
        {
          "name": "Supported wall sit (knee rehab)",
          "sets": 3,
          "reps": "40-45",
          "note": "Moderate controlled hold at comfortable shallow-to-mid knee bend (about 30-60 degrees). Log SECONDS in reps field, leave weight blank unless coached. Keep pain <=3/10 and return to baseline by next morning. Do not add load automatically. After a fully tolerated week, increase effort modestly before adding external weight."
        },
        {
          "name": "Deadlift",
          "sets": 3,
          "reps": "6-8",
          "note": "Controlled hinge. Week 5: ~60-65 kg is a sensible calibration after the lighter week, then use 2-3 RIR; warm up first."
        },
        {
          "name": "Strict chin-up",
          "sets": 4,
          "reps": "5-8",
          "note": "Bodyweight, no kipping. Stop a set if shoulder symptoms increase."
        },
        {
          "name": "Chest-supported DB row",
          "sets": 3,
          "reps": "8-12",
          "note": "Per-hand dumbbell load; Week 5 ~16-17.5 kg if controlled."
        },
        {
          "name": "DB bench press",
          "sets": 2,
          "reps": "8-12",
          "note": "Optional second weekly chest exposure. Neutral/comfortable grip; skip if shoulder provokes symptoms. Week 5 ~15-17.5 kg per hand if tolerated."
        },
        {
          "name": "Farmer carry",
          "sets": 2,
          "reps": "30-40",
          "note": "Log METRES in reps field. Weight is total carried load. Use ~48-56 kg total if form stays crisp."
        },
        {
          "name": "Band external rotation",
          "sets": 2,
          "reps": "12-15",
          "note": "Easy, controlled; not a max-effort lift. Log reps; leave weight blank."
        }
      ]
    },
    "w7-sun": {
      "warmup": [
        [
          "Easy bike",
          "3 min"
        ],
        [
          "Band external rotation",
          "12/side"
        ],
        [
          "Serratus wall slide",
          "8 reps"
        ],
        [
          "Easy supported wall sit",
          "15-20 sec; this is a warm-up, not a working set"
        ],
        [
          "Very light lateral raise",
          "12 reps"
        ]
      ],
      "exercises": [
        {
          "name": "Supported wall sit (knee rehab)",
          "sets": 2,
          "reps": "30-45",
          "note": "Easy supported hold, shallower and lower effort than Saturday. Log SECONDS in reps field, leave weight blank. Pain <=3/10 and back to baseline next morning."
        },
        {
          "name": "DB lateral raise",
          "sets": 2,
          "reps": "12-15",
          "note": "Controlled without shrugging; start around 4-5 kg per hand."
        },
        {
          "name": "DB scaption",
          "sets": 2,
          "reps": "12-15",
          "note": "Scapular plane, slow, pain-free; ~4 kg per hand."
        },
        {
          "name": "Rear-delt raise",
          "sets": 2,
          "reps": "12-15",
          "note": "Chest supported if possible; no shrugging."
        },
        {
          "name": "Hammer curl",
          "sets": 2,
          "reps": "10-12",
          "note": "~10 kg per hand if strict; otherwise reduce."
        },
        {
          "name": "Band triceps pressdown",
          "sets": 2,
          "reps": "12-15",
          "note": "Smooth lockout and no shoulder compensation; log reps."
        },
        {
          "name": "Ab wheel",
          "sets": 2,
          "reps": "8-12",
          "note": "Stop before low back arches. Choose hollow rocks if ab wheel bothers the shoulder."
        }
      ]
    },
    "w7-wed": {
      "regular": {
        "warmup": [
          [
            "Easy bike",
            "3 min"
          ],
          [
            "Knee symptom check",
            "Compare with usual morning baseline"
          ],
          [
            "Band external rotation",
            "12/side"
          ],
          [
            "Hip thrust ramp-up",
            "1-2 light sets"
          ],
          [
            "Chest press ramp-up",
            "1-2 easy sets"
          ]
        ],
        "exercises": [
          {
            "name": "Slow leg extension (knee rehab)",
            "sets": 2,
            "reps": "12-15",
            "note": "ONLY if physiotherapist has cleared controlled dynamic quadriceps work and previous stage was tolerated for >=1 week. Slow 3 seconds up, 3 seconds down, comfortable ~10-60 degree knee-flexion arc. Otherwise repeat the isometric stage. No automatic load increase."
          },
          {
            "name": "Hip thrust",
            "sets": 3,
            "reps": "8-12",
            "note": "Calibrate around 50 kg, aim 2-3 RIR; progress reps first."
          },
          {
            "name": "Machine chest press",
            "sets": 3,
            "reps": "8-12",
            "note": "Shoulder-friendly range; use last actual machine load as reference (~17.5 kg recorded), not an assumed baseline."
          },
          {
            "name": "Seated or cable row",
            "sets": 3,
            "reps": "10-12",
            "note": "Machine stacks vary; choose ~2-3 RIR. Log the displayed stack."
          },
          {
            "name": "Leg curl",
            "sets": 2,
            "reps": "10-12",
            "note": "Optional only if knee comfortable; use controlled tempo."
          },
          {
            "name": "Pallof press",
            "sets": 2,
            "reps": "10-12",
            "note": "Log per-side reps; anti-rotation without trunk twisting."
          },
          {
            "name": "Cable curl",
            "sets": 2,
            "reps": "10-12",
            "note": "Keep elbows still; no swinging."
          },
          {
            "name": "Cable triceps pushdown",
            "sets": 2,
            "reps": "10-15",
            "note": "Shoulder-friendly elbows-down variation."
          }
        ]
      },
      "cf": {
        "warmup": [
          [
            "Easy bike",
            "3 min"
          ],
          [
            "Knee symptom check",
            "Compare with usual morning baseline"
          ],
          [
            "Band external rotation",
            "12/side"
          ],
          [
            "Serratus wall slide",
            "8 reps"
          ],
          [
            "DB bench press ramp-up",
            "1-2 light sets"
          ]
        ],
        "exercises": [
          {
            "name": "Supported wall sit (knee rehab)",
            "sets": 3,
            "reps": "30-45",
            "note": "Moderate controlled hold at comfortable shallow-to-mid knee bend (about 30-60 degrees). Log SECONDS in reps field, leave weight blank unless coached. Keep pain <=3/10 and return to baseline by next morning. Do not add load automatically. CF gym fallback for when leg-extension or leg-press machines are unavailable. This is NOT progression to a new stage."
          },
          {
            "name": "Hip thrust",
            "sets": 3,
            "reps": "8-12",
            "note": "~50 kg if controlled; main hip strength accessory."
          },
          {
            "name": "DB bench press",
            "sets": 3,
            "reps": "8-12",
            "note": "Comfortable grip; no painful depth. Start near last tolerated ~17.5 kg per hand."
          },
          {
            "name": "Ring row",
            "sets": 3,
            "reps": "10-12",
            "note": "Adjust body angle for clean reps; log reps only."
          },
          {
            "name": "Hammer curl",
            "sets": 2,
            "reps": "10-12",
            "note": "Controlled, no swing."
          },
          {
            "name": "DB triceps extension / kickback",
            "sets": 2,
            "reps": "10-15",
            "note": "Only if shoulder-friendly, or use a band pressdown."
          },
          {
            "name": "Hollow rock",
            "sets": 2,
            "reps": "10-15",
            "note": "Keep low back pressed down."
          }
        ]
      }
    },
    "w8-sat": {
      "warmup": [
        [
          "Easy bike",
          "3 min"
        ],
        [
          "Hip hinge drill",
          "10 reps"
        ],
        [
          "Band external rotation",
          "12/side"
        ],
        [
          "Scapular pull-up",
          "8 reps"
        ],
        [
          "Deadlift ramp-up",
          "2-3 gradual warm-up sets before working load"
        ]
      ],
      "exercises": [
        {
          "name": "Supported wall sit (knee rehab)",
          "sets": 2,
          "reps": "30-40",
          "note": "Moderate controlled hold at comfortable shallow-to-mid knee bend (about 30-60 degrees). Log SECONDS in reps field, leave weight blank unless coached. Keep pain <=3/10 and return to baseline by next morning. Do not add load automatically. Deload: lower effort."
        },
        {
          "name": "Deadlift",
          "sets": 2,
          "reps": "5",
          "note": "Controlled hinge. Week 5: ~60-65 kg is a sensible calibration after the lighter week, then use 2-3 RIR; warm up first."
        },
        {
          "name": "Strict chin-up",
          "sets": 2,
          "reps": "5-7",
          "note": "Bodyweight, no kipping. Stop a set if shoulder symptoms increase."
        },
        {
          "name": "Chest-supported DB row",
          "sets": 2,
          "reps": "8-10",
          "note": "Per-hand dumbbell load; Week 5 ~16-17.5 kg if controlled."
        },
        {
          "name": "DB bench press",
          "sets": 1,
          "reps": "8-10",
          "note": "Optional second weekly chest exposure. Neutral/comfortable grip; skip if shoulder provokes symptoms. Week 5 ~15-17.5 kg per hand if tolerated."
        },
        {
          "name": "Farmer carry",
          "sets": 1,
          "reps": "30-40",
          "note": "Log METRES in reps field. Weight is total carried load. Use ~48-56 kg total if form stays crisp."
        },
        {
          "name": "Band external rotation",
          "sets": 1,
          "reps": "12-15",
          "note": "Easy, controlled; not a max-effort lift. Log reps; leave weight blank."
        }
      ]
    },
    "w8-sun": {
      "warmup": [
        [
          "Easy bike",
          "3 min"
        ],
        [
          "Band external rotation",
          "12/side"
        ],
        [
          "Serratus wall slide",
          "8 reps"
        ],
        [
          "Easy supported wall sit",
          "15-20 sec; this is a warm-up, not a working set"
        ],
        [
          "Very light lateral raise",
          "12 reps"
        ]
      ],
      "exercises": [
        {
          "name": "Supported wall sit (knee rehab)",
          "sets": 2,
          "reps": "25-35",
          "note": "Easy supported hold, shallower and lower effort than Saturday. Log SECONDS in reps field, leave weight blank. Pain <=3/10 and back to baseline next morning. Deload: lower effort."
        },
        {
          "name": "DB lateral raise",
          "sets": 2,
          "reps": "12-15",
          "note": "Controlled without shrugging; start around 4-5 kg per hand."
        },
        {
          "name": "DB scaption",
          "sets": 1,
          "reps": "12-15",
          "note": "Scapular plane, slow, pain-free; ~4 kg per hand."
        },
        {
          "name": "Rear-delt raise",
          "sets": 1,
          "reps": "12-15",
          "note": "Chest supported if possible; no shrugging."
        },
        {
          "name": "Hammer curl",
          "sets": 1,
          "reps": "10-12",
          "note": "~10 kg per hand if strict; otherwise reduce."
        },
        {
          "name": "Band triceps pressdown",
          "sets": 1,
          "reps": "12-15",
          "note": "Smooth lockout and no shoulder compensation; log reps."
        },
        {
          "name": "Ab wheel",
          "sets": 1,
          "reps": "8-12",
          "note": "Stop before low back arches. Choose hollow rocks if ab wheel bothers the shoulder."
        }
      ]
    },
    "w8-wed": {
      "regular": {
        "warmup": [
          [
            "Easy bike",
            "3 min"
          ],
          [
            "Knee symptom check",
            "Compare with usual morning baseline"
          ],
          [
            "Band external rotation",
            "12/side"
          ],
          [
            "Hip thrust ramp-up",
            "1-2 light sets"
          ],
          [
            "Chest press ramp-up",
            "1-2 easy sets"
          ]
        ],
        "exercises": [
          {
            "name": "Slow leg extension (knee rehab)",
            "sets": 2,
            "reps": "10-12",
            "note": "ONLY if physiotherapist has cleared controlled dynamic quadriceps work and previous stage was tolerated for >=1 week. Slow 3 seconds up, 3 seconds down, comfortable ~10-60 degree knee-flexion arc. Otherwise repeat the isometric stage. No automatic load increase. Deload: lighter than Week 7."
          },
          {
            "name": "Hip thrust",
            "sets": 2,
            "reps": "8-10",
            "note": "Calibrate around 50 kg, aim 2-3 RIR; progress reps first."
          },
          {
            "name": "Machine chest press",
            "sets": 2,
            "reps": "8-10",
            "note": "Shoulder-friendly range; use last actual machine load as reference (~17.5 kg recorded), not an assumed baseline."
          },
          {
            "name": "Seated or cable row",
            "sets": 2,
            "reps": "10-12",
            "note": "Machine stacks vary; choose ~2-3 RIR. Log the displayed stack."
          },
          {
            "name": "Leg curl",
            "sets": 1,
            "reps": "10-12",
            "note": "Optional only if knee comfortable; use controlled tempo."
          },
          {
            "name": "Pallof press",
            "sets": 1,
            "reps": "10-12",
            "note": "Log per-side reps; anti-rotation without trunk twisting."
          },
          {
            "name": "Cable curl",
            "sets": 1,
            "reps": "10-12",
            "note": "Keep elbows still; no swinging."
          },
          {
            "name": "Cable triceps pushdown",
            "sets": 1,
            "reps": "10-15",
            "note": "Shoulder-friendly elbows-down variation."
          }
        ]
      },
      "cf": {
        "warmup": [
          [
            "Easy bike",
            "3 min"
          ],
          [
            "Knee symptom check",
            "Compare with usual morning baseline"
          ],
          [
            "Band external rotation",
            "12/side"
          ],
          [
            "Serratus wall slide",
            "8 reps"
          ],
          [
            "DB bench press ramp-up",
            "1-2 light sets"
          ]
        ],
        "exercises": [
          {
            "name": "Supported wall sit (knee rehab)",
            "sets": 2,
            "reps": "25-35",
            "note": "Moderate controlled hold at comfortable shallow-to-mid knee bend (about 30-60 degrees). Log SECONDS in reps field, leave weight blank unless coached. Keep pain <=3/10 and return to baseline by next morning. Do not add load automatically. CF gym fallback for when leg-extension or leg-press machines are unavailable. This is NOT progression to a new stage."
          },
          {
            "name": "Hip thrust",
            "sets": 2,
            "reps": "8-10",
            "note": "~50 kg if controlled; main hip strength accessory."
          },
          {
            "name": "DB bench press",
            "sets": 2,
            "reps": "8-10",
            "note": "Comfortable grip; no painful depth. Start near last tolerated ~17.5 kg per hand."
          },
          {
            "name": "Ring row",
            "sets": 2,
            "reps": "10-12",
            "note": "Adjust body angle for clean reps; log reps only."
          },
          {
            "name": "Hammer curl",
            "sets": 1,
            "reps": "10-12",
            "note": "Controlled, no swing."
          },
          {
            "name": "DB triceps extension / kickback",
            "sets": 1,
            "reps": "10-15",
            "note": "Only if shoulder-friendly, or use a band pressdown."
          },
          {
            "name": "Hollow rock",
            "sets": 1,
            "reps": "10-15",
            "note": "Keep low back pressed down."
          }
        ]
      }
    },
    "w9-sat": {
      "warmup": [
        [
          "Easy bike",
          "3 min"
        ],
        [
          "Hip hinge drill",
          "10 reps"
        ],
        [
          "Band external rotation",
          "12/side"
        ],
        [
          "Scapular pull-up",
          "8 reps"
        ],
        [
          "Deadlift ramp-up",
          "2-3 gradual warm-up sets before working load"
        ]
      ],
      "exercises": [
        {
          "name": "Supported wall sit (knee rehab)",
          "sets": 3,
          "reps": "40-45",
          "note": "Moderate controlled hold at comfortable shallow-to-mid knee bend (about 30-60 degrees). Log SECONDS in reps field, leave weight blank unless coached. Keep pain <=3/10 and return to baseline by next morning. Do not add load automatically."
        },
        {
          "name": "Deadlift",
          "sets": 3,
          "reps": "4-6",
          "note": "Strength focus, maintain 1-3 RIR and clean form; no grinding."
        },
        {
          "name": "Weighted / strict chin-up",
          "sets": 4,
          "reps": "4-6",
          "note": "Start bodyweight; add 2.5 kg only after all strict sets are clean, shoulder comfortable, and 1-2 RIR."
        },
        {
          "name": "Chest-supported DB row",
          "sets": 3,
          "reps": "8-10",
          "note": "Strict chest-supported reps; add reps before weight."
        },
        {
          "name": "DB bench press",
          "sets": 2,
          "reps": "8-12",
          "note": "Optional second weekly chest exposure, only if shoulder-friendly."
        },
        {
          "name": "Farmer carry",
          "sets": 3,
          "reps": "30-40",
          "note": "Log METRES in reps field, total load in kg. Prioritize posture and grip; do not chase load with shoulder symptoms."
        },
        {
          "name": "Band external rotation",
          "sets": 2,
          "reps": "12-15",
          "note": "Slow, comfortable external rotation; leave weight blank."
        }
      ]
    },
    "w9-sun": {
      "warmup": [
        [
          "Easy bike",
          "3 min"
        ],
        [
          "Band external rotation",
          "12/side"
        ],
        [
          "Serratus wall slide",
          "8 reps"
        ],
        [
          "Easy supported wall sit",
          "15-20 sec; this is a warm-up, not a working set"
        ],
        [
          "Very light lateral raise",
          "12 reps"
        ]
      ],
      "exercises": [
        {
          "name": "Supported wall sit (knee rehab)",
          "sets": 2,
          "reps": "30-45",
          "note": "Easy supported hold, shallower and lower effort than Saturday. Log SECONDS in reps field, leave weight blank. Pain <=3/10 and back to baseline next morning."
        },
        {
          "name": "DB lateral raise",
          "sets": 2,
          "reps": "12-15",
          "note": "Strict, controlled; start 4-5 kg per hand unless prior log supports more."
        },
        {
          "name": "DB scaption",
          "sets": 2,
          "reps": "12-15",
          "note": "Stay in comfortable range."
        },
        {
          "name": "Rear-delt raise",
          "sets": 2,
          "reps": "12-15",
          "note": "Controlled shoulder-friendly reps."
        },
        {
          "name": "Hammer curl",
          "sets": 3,
          "reps": "8-12",
          "note": "Arm focus; add repetitions first."
        },
        {
          "name": "Band triceps pressdown",
          "sets": 3,
          "reps": "10-15",
          "note": "Arm focus with no shoulder compensation."
        },
        {
          "name": "Ab wheel",
          "sets": 2,
          "reps": "8-12",
          "note": "Only if shoulder and lower back tolerate it; otherwise hollow rocks."
        }
      ]
    },
    "w9-wed": {
      "regular": {
        "warmup": [
          [
            "Easy bike",
            "3 min"
          ],
          [
            "Knee symptom check",
            "Compare with usual morning baseline"
          ],
          [
            "Band external rotation",
            "12/side"
          ],
          [
            "Hip thrust ramp-up",
            "1-2 light sets"
          ],
          [
            "Chest press ramp-up",
            "1-2 easy sets"
          ]
        ],
        "exercises": [
          {
            "name": "Slow leg extension (knee rehab)",
            "sets": 3,
            "reps": "10-12",
            "note": "ONLY if physiotherapist has cleared controlled dynamic quadriceps work and previous stage was tolerated for >=1 week. Slow 3 seconds up, 3 seconds down, comfortable ~10-60 degree knee-flexion arc. Otherwise repeat the isometric stage. No automatic load increase. If week 7-8 were not tolerated, remain on the previous phase."
          },
          {
            "name": "Hip thrust",
            "sets": 3,
            "reps": "6-10",
            "note": "~50 kg starting reference; progress only if good control and ~2 RIR."
          },
          {
            "name": "Machine chest press",
            "sets": 3,
            "reps": "8-12",
            "note": "Use comfortable ROM and previous actual stack setting."
          },
          {
            "name": "Seated or cable row",
            "sets": 3,
            "reps": "8-12",
            "note": "Controlled upper-back strength."
          },
          {
            "name": "Leg curl",
            "sets": 2,
            "reps": "10-12",
            "note": "Optional only if knee comfortable."
          },
          {
            "name": "Pallof press",
            "sets": 2,
            "reps": "10-12",
            "note": "Reps per side. Rotate neither pelvis nor shoulders."
          },
          {
            "name": "Cable curl",
            "sets": 2,
            "reps": "8-12",
            "note": "Strict elbow flexion."
          },
          {
            "name": "Cable triceps pushdown",
            "sets": 2,
            "reps": "10-15",
            "note": "Smooth and shoulder-friendly."
          }
        ]
      },
      "cf": {
        "warmup": [
          [
            "Easy bike",
            "3 min"
          ],
          [
            "Knee symptom check",
            "Compare with usual morning baseline"
          ],
          [
            "Band external rotation",
            "12/side"
          ],
          [
            "Serratus wall slide",
            "8 reps"
          ],
          [
            "DB bench press ramp-up",
            "1-2 light sets"
          ]
        ],
        "exercises": [
          {
            "name": "Supported wall sit (knee rehab)",
            "sets": 3,
            "reps": "30-45",
            "note": "Moderate controlled hold at comfortable shallow-to-mid knee bend (about 30-60 degrees). Log SECONDS in reps field, leave weight blank unless coached. Keep pain <=3/10 and return to baseline by next morning. Do not add load automatically. CF fallback if machine loading is unavailable; maintain prior phase, do not substitute unapproved deep squats."
          },
          {
            "name": "Hip thrust",
            "sets": 3,
            "reps": "6-10",
            "note": "~50 kg starting reference; strong hip extension."
          },
          {
            "name": "DB bench press",
            "sets": 3,
            "reps": "8-12",
            "note": "Neutral grip, shoulder-friendly ROM."
          },
          {
            "name": "Ring row",
            "sets": 3,
            "reps": "8-12",
            "note": "Keep body rigid and adjust angle."
          },
          {
            "name": "Hammer curl",
            "sets": 2,
            "reps": "8-12",
            "note": "Controlled."
          },
          {
            "name": "DB triceps extension / kickback",
            "sets": 2,
            "reps": "10-15",
            "note": "Shoulder-friendly option only."
          },
          {
            "name": "Hollow rock",
            "sets": 2,
            "reps": "10-15",
            "note": "Low back to floor."
          }
        ]
      }
    },
    "w10-sat": {
      "warmup": [
        [
          "Easy bike",
          "3 min"
        ],
        [
          "Hip hinge drill",
          "10 reps"
        ],
        [
          "Band external rotation",
          "12/side"
        ],
        [
          "Scapular pull-up",
          "8 reps"
        ],
        [
          "Deadlift ramp-up",
          "2-3 gradual warm-up sets before working load"
        ]
      ],
      "exercises": [
        {
          "name": "Supported wall sit (knee rehab)",
          "sets": 3,
          "reps": "40-45",
          "note": "Moderate controlled hold at comfortable shallow-to-mid knee bend (about 30-60 degrees). Log SECONDS in reps field, leave weight blank unless coached. Keep pain <=3/10 and return to baseline by next morning. Do not add load automatically."
        },
        {
          "name": "Deadlift",
          "sets": 3,
          "reps": "4-6",
          "note": "Strength focus, maintain 1-3 RIR and clean form; no grinding."
        },
        {
          "name": "Weighted / strict chin-up",
          "sets": 4,
          "reps": "4-6",
          "note": "Start bodyweight; add 2.5 kg only after all strict sets are clean, shoulder comfortable, and 1-2 RIR."
        },
        {
          "name": "Chest-supported DB row",
          "sets": 3,
          "reps": "8-10",
          "note": "Strict chest-supported reps; add reps before weight."
        },
        {
          "name": "DB bench press",
          "sets": 2,
          "reps": "8-12",
          "note": "Optional second weekly chest exposure, only if shoulder-friendly."
        },
        {
          "name": "Farmer carry",
          "sets": 3,
          "reps": "30-40",
          "note": "Log METRES in reps field, total load in kg. Prioritize posture and grip; do not chase load with shoulder symptoms."
        },
        {
          "name": "Band external rotation",
          "sets": 2,
          "reps": "12-15",
          "note": "Slow, comfortable external rotation; leave weight blank."
        }
      ]
    },
    "w10-sun": {
      "warmup": [
        [
          "Easy bike",
          "3 min"
        ],
        [
          "Band external rotation",
          "12/side"
        ],
        [
          "Serratus wall slide",
          "8 reps"
        ],
        [
          "Easy supported wall sit",
          "15-20 sec; this is a warm-up, not a working set"
        ],
        [
          "Very light lateral raise",
          "12 reps"
        ]
      ],
      "exercises": [
        {
          "name": "Supported wall sit (knee rehab)",
          "sets": 2,
          "reps": "30-45",
          "note": "Easy supported hold, shallower and lower effort than Saturday. Log SECONDS in reps field, leave weight blank. Pain <=3/10 and back to baseline next morning."
        },
        {
          "name": "DB lateral raise",
          "sets": 2,
          "reps": "12-15",
          "note": "Strict, controlled; start 4-5 kg per hand unless prior log supports more."
        },
        {
          "name": "DB scaption",
          "sets": 2,
          "reps": "12-15",
          "note": "Stay in comfortable range."
        },
        {
          "name": "Rear-delt raise",
          "sets": 2,
          "reps": "12-15",
          "note": "Controlled shoulder-friendly reps."
        },
        {
          "name": "Hammer curl",
          "sets": 3,
          "reps": "8-12",
          "note": "Arm focus; add repetitions first."
        },
        {
          "name": "Band triceps pressdown",
          "sets": 3,
          "reps": "10-15",
          "note": "Arm focus with no shoulder compensation."
        },
        {
          "name": "Ab wheel",
          "sets": 2,
          "reps": "8-12",
          "note": "Only if shoulder and lower back tolerate it; otherwise hollow rocks."
        }
      ]
    },
    "w10-wed": {
      "regular": {
        "warmup": [
          [
            "Easy bike",
            "3 min"
          ],
          [
            "Knee symptom check",
            "Compare with usual morning baseline"
          ],
          [
            "Band external rotation",
            "12/side"
          ],
          [
            "Hip thrust ramp-up",
            "1-2 light sets"
          ],
          [
            "Chest press ramp-up",
            "1-2 easy sets"
          ]
        ],
        "exercises": [
          {
            "name": "Slow leg press (knee rehab)",
            "sets": 3,
            "reps": "10-12",
            "note": "ONLY if physiotherapist has cleared this stage, slow 3 seconds each direction, controlled shallow range (initially about 10-60 degrees of knee flexion). Otherwise continue slow leg extension / isometrics. No automatic load increase."
          },
          {
            "name": "Hip thrust",
            "sets": 3,
            "reps": "6-10",
            "note": "~50 kg starting reference; progress only if good control and ~2 RIR."
          },
          {
            "name": "Machine chest press",
            "sets": 3,
            "reps": "8-12",
            "note": "Use comfortable ROM and previous actual stack setting."
          },
          {
            "name": "Seated or cable row",
            "sets": 3,
            "reps": "8-12",
            "note": "Controlled upper-back strength."
          },
          {
            "name": "Leg curl",
            "sets": 2,
            "reps": "10-12",
            "note": "Optional only if knee comfortable."
          },
          {
            "name": "Pallof press",
            "sets": 2,
            "reps": "10-12",
            "note": "Reps per side. Rotate neither pelvis nor shoulders."
          },
          {
            "name": "Cable curl",
            "sets": 2,
            "reps": "8-12",
            "note": "Strict elbow flexion."
          },
          {
            "name": "Cable triceps pushdown",
            "sets": 2,
            "reps": "10-15",
            "note": "Smooth and shoulder-friendly."
          }
        ]
      },
      "cf": {
        "warmup": [
          [
            "Easy bike",
            "3 min"
          ],
          [
            "Knee symptom check",
            "Compare with usual morning baseline"
          ],
          [
            "Band external rotation",
            "12/side"
          ],
          [
            "Serratus wall slide",
            "8 reps"
          ],
          [
            "DB bench press ramp-up",
            "1-2 light sets"
          ]
        ],
        "exercises": [
          {
            "name": "Supported wall sit (knee rehab)",
            "sets": 3,
            "reps": "30-45",
            "note": "Moderate controlled hold at comfortable shallow-to-mid knee bend (about 30-60 degrees). Log SECONDS in reps field, leave weight blank unless coached. Keep pain <=3/10 and return to baseline by next morning. Do not add load automatically. CF fallback if machine loading is unavailable; maintain prior phase, do not substitute unapproved deep squats."
          },
          {
            "name": "Hip thrust",
            "sets": 3,
            "reps": "6-10",
            "note": "~50 kg starting reference; strong hip extension."
          },
          {
            "name": "DB bench press",
            "sets": 3,
            "reps": "8-12",
            "note": "Neutral grip, shoulder-friendly ROM."
          },
          {
            "name": "Ring row",
            "sets": 3,
            "reps": "8-12",
            "note": "Keep body rigid and adjust angle."
          },
          {
            "name": "Hammer curl",
            "sets": 2,
            "reps": "8-12",
            "note": "Controlled."
          },
          {
            "name": "DB triceps extension / kickback",
            "sets": 2,
            "reps": "10-15",
            "note": "Shoulder-friendly option only."
          },
          {
            "name": "Hollow rock",
            "sets": 2,
            "reps": "10-15",
            "note": "Low back to floor."
          }
        ]
      }
    },
    "w11-sat": {
      "warmup": [
        [
          "Easy bike",
          "3 min"
        ],
        [
          "Hip hinge drill",
          "10 reps"
        ],
        [
          "Band external rotation",
          "12/side"
        ],
        [
          "Scapular pull-up",
          "8 reps"
        ],
        [
          "Deadlift ramp-up",
          "2-3 gradual warm-up sets before working load"
        ]
      ],
      "exercises": [
        {
          "name": "Supported wall sit (knee rehab)",
          "sets": 3,
          "reps": "40-45",
          "note": "Moderate controlled hold at comfortable shallow-to-mid knee bend (about 30-60 degrees). Log SECONDS in reps field, leave weight blank unless coached. Keep pain <=3/10 and return to baseline by next morning. Do not add load automatically."
        },
        {
          "name": "Deadlift",
          "sets": 3,
          "reps": "4-6",
          "note": "Strength focus, maintain 1-3 RIR and clean form; no grinding."
        },
        {
          "name": "Weighted / strict chin-up",
          "sets": 4,
          "reps": "4-6",
          "note": "Start bodyweight; add 2.5 kg only after all strict sets are clean, shoulder comfortable, and 1-2 RIR."
        },
        {
          "name": "Chest-supported DB row",
          "sets": 3,
          "reps": "8-10",
          "note": "Strict chest-supported reps; add reps before weight."
        },
        {
          "name": "DB bench press",
          "sets": 2,
          "reps": "8-12",
          "note": "Optional second weekly chest exposure, only if shoulder-friendly."
        },
        {
          "name": "Farmer carry",
          "sets": 3,
          "reps": "30-40",
          "note": "Log METRES in reps field, total load in kg. Prioritize posture and grip; do not chase load with shoulder symptoms."
        },
        {
          "name": "Band external rotation",
          "sets": 2,
          "reps": "12-15",
          "note": "Slow, comfortable external rotation; leave weight blank."
        }
      ]
    },
    "w11-sun": {
      "warmup": [
        [
          "Easy bike",
          "3 min"
        ],
        [
          "Band external rotation",
          "12/side"
        ],
        [
          "Serratus wall slide",
          "8 reps"
        ],
        [
          "Easy supported wall sit",
          "15-20 sec; this is a warm-up, not a working set"
        ],
        [
          "Very light lateral raise",
          "12 reps"
        ]
      ],
      "exercises": [
        {
          "name": "Supported wall sit (knee rehab)",
          "sets": 2,
          "reps": "30-45",
          "note": "Easy supported hold, shallower and lower effort than Saturday. Log SECONDS in reps field, leave weight blank. Pain <=3/10 and back to baseline next morning."
        },
        {
          "name": "DB lateral raise",
          "sets": 2,
          "reps": "12-15",
          "note": "Strict, controlled; start 4-5 kg per hand unless prior log supports more."
        },
        {
          "name": "DB scaption",
          "sets": 2,
          "reps": "12-15",
          "note": "Stay in comfortable range."
        },
        {
          "name": "Rear-delt raise",
          "sets": 2,
          "reps": "12-15",
          "note": "Controlled shoulder-friendly reps."
        },
        {
          "name": "Hammer curl",
          "sets": 3,
          "reps": "8-12",
          "note": "Arm focus; add repetitions first."
        },
        {
          "name": "Band triceps pressdown",
          "sets": 3,
          "reps": "10-15",
          "note": "Arm focus with no shoulder compensation."
        },
        {
          "name": "Ab wheel",
          "sets": 2,
          "reps": "8-12",
          "note": "Only if shoulder and lower back tolerate it; otherwise hollow rocks."
        }
      ]
    },
    "w11-wed": {
      "regular": {
        "warmup": [
          [
            "Easy bike",
            "3 min"
          ],
          [
            "Knee symptom check",
            "Compare with usual morning baseline"
          ],
          [
            "Band external rotation",
            "12/side"
          ],
          [
            "Hip thrust ramp-up",
            "1-2 light sets"
          ],
          [
            "Chest press ramp-up",
            "1-2 easy sets"
          ]
        ],
        "exercises": [
          {
            "name": "Slow leg press (knee rehab)",
            "sets": 3,
            "reps": "10-12",
            "note": "ONLY if physiotherapist has cleared this stage, slow 3 seconds each direction, controlled shallow range (initially about 10-60 degrees of knee flexion). Otherwise continue slow leg extension / isometrics. No automatic load increase."
          },
          {
            "name": "Hip thrust",
            "sets": 3,
            "reps": "6-10",
            "note": "~50 kg starting reference; progress only if good control and ~2 RIR."
          },
          {
            "name": "Machine chest press",
            "sets": 3,
            "reps": "8-12",
            "note": "Use comfortable ROM and previous actual stack setting."
          },
          {
            "name": "Seated or cable row",
            "sets": 3,
            "reps": "8-12",
            "note": "Controlled upper-back strength."
          },
          {
            "name": "Leg curl",
            "sets": 2,
            "reps": "10-12",
            "note": "Optional only if knee comfortable."
          },
          {
            "name": "Pallof press",
            "sets": 2,
            "reps": "10-12",
            "note": "Reps per side. Rotate neither pelvis nor shoulders."
          },
          {
            "name": "Cable curl",
            "sets": 2,
            "reps": "8-12",
            "note": "Strict elbow flexion."
          },
          {
            "name": "Cable triceps pushdown",
            "sets": 2,
            "reps": "10-15",
            "note": "Smooth and shoulder-friendly."
          }
        ]
      },
      "cf": {
        "warmup": [
          [
            "Easy bike",
            "3 min"
          ],
          [
            "Knee symptom check",
            "Compare with usual morning baseline"
          ],
          [
            "Band external rotation",
            "12/side"
          ],
          [
            "Serratus wall slide",
            "8 reps"
          ],
          [
            "DB bench press ramp-up",
            "1-2 light sets"
          ]
        ],
        "exercises": [
          {
            "name": "Supported wall sit (knee rehab)",
            "sets": 3,
            "reps": "30-45",
            "note": "Moderate controlled hold at comfortable shallow-to-mid knee bend (about 30-60 degrees). Log SECONDS in reps field, leave weight blank unless coached. Keep pain <=3/10 and return to baseline by next morning. Do not add load automatically. CF fallback if machine loading is unavailable; maintain prior phase, do not substitute unapproved deep squats."
          },
          {
            "name": "Hip thrust",
            "sets": 3,
            "reps": "6-10",
            "note": "~50 kg starting reference; strong hip extension."
          },
          {
            "name": "DB bench press",
            "sets": 3,
            "reps": "8-12",
            "note": "Neutral grip, shoulder-friendly ROM."
          },
          {
            "name": "Ring row",
            "sets": 3,
            "reps": "8-12",
            "note": "Keep body rigid and adjust angle."
          },
          {
            "name": "Hammer curl",
            "sets": 2,
            "reps": "8-12",
            "note": "Controlled."
          },
          {
            "name": "DB triceps extension / kickback",
            "sets": 2,
            "reps": "10-15",
            "note": "Shoulder-friendly option only."
          },
          {
            "name": "Hollow rock",
            "sets": 2,
            "reps": "10-15",
            "note": "Low back to floor."
          }
        ]
      }
    },
    "w12-sat": {
      "warmup": [
        [
          "Easy bike",
          "3 min"
        ],
        [
          "Hip hinge drill",
          "10 reps"
        ],
        [
          "Band external rotation",
          "12/side"
        ],
        [
          "Scapular pull-up",
          "8 reps"
        ],
        [
          "Deadlift ramp-up",
          "2-3 gradual warm-up sets before working load"
        ]
      ],
      "exercises": [
        {
          "name": "Supported wall sit (knee rehab)",
          "sets": 2,
          "reps": "30-40",
          "note": "Moderate controlled hold at comfortable shallow-to-mid knee bend (about 30-60 degrees). Log SECONDS in reps field, leave weight blank unless coached. Keep pain <=3/10 and return to baseline by next morning. Do not add load automatically. Deload: ease the effort."
        },
        {
          "name": "Deadlift",
          "sets": 2,
          "reps": "4-5",
          "note": "Strength focus, maintain 1-3 RIR and clean form; no grinding."
        },
        {
          "name": "Weighted / strict chin-up",
          "sets": 2,
          "reps": "4-5",
          "note": "Start bodyweight; add 2.5 kg only after all strict sets are clean, shoulder comfortable, and 1-2 RIR."
        },
        {
          "name": "Chest-supported DB row",
          "sets": 2,
          "reps": "8-10",
          "note": "Strict chest-supported reps; add reps before weight."
        },
        {
          "name": "DB bench press",
          "sets": 1,
          "reps": "8-10",
          "note": "Optional second weekly chest exposure, only if shoulder-friendly."
        },
        {
          "name": "Farmer carry",
          "sets": 2,
          "reps": "30-40",
          "note": "Log METRES in reps field, total load in kg. Prioritize posture and grip; do not chase load with shoulder symptoms."
        },
        {
          "name": "Band external rotation",
          "sets": 1,
          "reps": "12-15",
          "note": "Slow, comfortable external rotation; leave weight blank."
        }
      ]
    },
    "w12-sun": {
      "warmup": [
        [
          "Easy bike",
          "3 min"
        ],
        [
          "Band external rotation",
          "12/side"
        ],
        [
          "Serratus wall slide",
          "8 reps"
        ],
        [
          "Easy supported wall sit",
          "15-20 sec; this is a warm-up, not a working set"
        ],
        [
          "Very light lateral raise",
          "12 reps"
        ]
      ],
      "exercises": [
        {
          "name": "Supported wall sit (knee rehab)",
          "sets": 2,
          "reps": "25-35",
          "note": "Easy supported hold, shallower and lower effort than Saturday. Log SECONDS in reps field, leave weight blank. Pain <=3/10 and back to baseline next morning. Deload."
        },
        {
          "name": "DB lateral raise",
          "sets": 2,
          "reps": "12-15",
          "note": "Strict, controlled; start 4-5 kg per hand unless prior log supports more."
        },
        {
          "name": "DB scaption",
          "sets": 1,
          "reps": "12-15",
          "note": "Stay in comfortable range."
        },
        {
          "name": "Rear-delt raise",
          "sets": 1,
          "reps": "12-15",
          "note": "Controlled shoulder-friendly reps."
        },
        {
          "name": "Hammer curl",
          "sets": 1,
          "reps": "8-12",
          "note": "Arm focus; add repetitions first."
        },
        {
          "name": "Band triceps pressdown",
          "sets": 1,
          "reps": "10-15",
          "note": "Arm focus with no shoulder compensation."
        },
        {
          "name": "Ab wheel",
          "sets": 1,
          "reps": "8-12",
          "note": "Only if shoulder and lower back tolerate it; otherwise hollow rocks."
        }
      ]
    },
    "w12-wed": {
      "regular": {
        "warmup": [
          [
            "Easy bike",
            "3 min"
          ],
          [
            "Knee symptom check",
            "Compare with usual morning baseline"
          ],
          [
            "Band external rotation",
            "12/side"
          ],
          [
            "Hip thrust ramp-up",
            "1-2 light sets"
          ],
          [
            "Chest press ramp-up",
            "1-2 easy sets"
          ]
        ],
        "exercises": [
          {
            "name": "Slow leg press (knee rehab)",
            "sets": 2,
            "reps": "10",
            "note": "ONLY if physiotherapist has cleared this stage, slow 3 seconds each direction, controlled shallow range (initially about 10-60 degrees of knee flexion). Otherwise continue slow leg extension / isometrics. No automatic load increase. Deload: reduce resistance."
          },
          {
            "name": "Hip thrust",
            "sets": 2,
            "reps": "6-8",
            "note": "~50 kg starting reference; progress only if good control and ~2 RIR."
          },
          {
            "name": "Machine chest press",
            "sets": 2,
            "reps": "8-10",
            "note": "Use comfortable ROM and previous actual stack setting."
          },
          {
            "name": "Seated or cable row",
            "sets": 2,
            "reps": "8-10",
            "note": "Controlled upper-back strength."
          },
          {
            "name": "Leg curl",
            "sets": 1,
            "reps": "10-12",
            "note": "Optional only if knee comfortable."
          },
          {
            "name": "Pallof press",
            "sets": 1,
            "reps": "10-12",
            "note": "Reps per side. Rotate neither pelvis nor shoulders."
          },
          {
            "name": "Cable curl",
            "sets": 1,
            "reps": "8-12",
            "note": "Strict elbow flexion."
          },
          {
            "name": "Cable triceps pushdown",
            "sets": 1,
            "reps": "10-15",
            "note": "Smooth and shoulder-friendly."
          }
        ]
      },
      "cf": {
        "warmup": [
          [
            "Easy bike",
            "3 min"
          ],
          [
            "Knee symptom check",
            "Compare with usual morning baseline"
          ],
          [
            "Band external rotation",
            "12/side"
          ],
          [
            "Serratus wall slide",
            "8 reps"
          ],
          [
            "DB bench press ramp-up",
            "1-2 light sets"
          ]
        ],
        "exercises": [
          {
            "name": "Supported wall sit (knee rehab)",
            "sets": 2,
            "reps": "25-35",
            "note": "Moderate controlled hold at comfortable shallow-to-mid knee bend (about 30-60 degrees). Log SECONDS in reps field, leave weight blank unless coached. Keep pain <=3/10 and return to baseline by next morning. Do not add load automatically. CF fallback if machine loading is unavailable; maintain prior phase, do not substitute unapproved deep squats."
          },
          {
            "name": "Hip thrust",
            "sets": 2,
            "reps": "6-8",
            "note": "~50 kg starting reference; strong hip extension."
          },
          {
            "name": "DB bench press",
            "sets": 2,
            "reps": "8-10",
            "note": "Neutral grip, shoulder-friendly ROM."
          },
          {
            "name": "Ring row",
            "sets": 2,
            "reps": "8-12",
            "note": "Keep body rigid and adjust angle."
          },
          {
            "name": "Hammer curl",
            "sets": 1,
            "reps": "8-12",
            "note": "Controlled."
          },
          {
            "name": "DB triceps extension / kickback",
            "sets": 1,
            "reps": "10-15",
            "note": "Shoulder-friendly option only."
          },
          {
            "name": "Hollow rock",
            "sets": 1,
            "reps": "10-15",
            "note": "Low back to floor."
          }
        ]
      }
    }
  }
};
