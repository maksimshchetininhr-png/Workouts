// The only place the version lives: index.html shows it and the service worker
// cache is keyed on it, so bump this one line for each release.
const APP_VERSION = '5.0';

const STORAGE = {
  settings: 'trainingApp.settings.v1',
  logs: 'trainingApp.logs.v1',
  benchmarks: 'trainingApp.benchmarks.v1',
  restTimer: 'trainingApp.restTimer.v1',
  override: 'trainingApp.todayOverride.v1',
  meta: 'trainingApp.meta.v1'
};

const defaultSettings = {
  startDate: '2026-10-10',
  profile: { age: 36, heightCm: 181, bodyweightKg: 82 },
  baselines: {
    deadlift5RM: '',
    chinupMax: 8,
    chestPress: 35,
    dbRow: 16,
    hipThrust: '',
    farmerCarryTotal: '',
    lateralRaise: 4,
    scaption: 4,
    hammerCurl: 10
  },
  prefs: { sound: true, wakeLock: true }
};

const cycles = [
  { weeks:[1,2,3,4], name:'Pull + Posterior Chain', focus:'Chin-ups, deadlift, back hypertrophy, hamstrings/glutes' },
  { weeks:[5,6,7,8], name:'Shoulders + Arms', focus:'Delts, biceps, triceps, shoulder capacity' },
  { weeks:[9,10,11,12], name:'Functional Strength', focus:'Deadlift, weighted chin-up, carries, trunk strength and grip' }
];

const progressionNote = (week) => {
  const phase = ((week - 1) % 4) + 1;
  return [
    'Establish loads. Stay around 3 RIR.',
    'Add reps where possible. Aim for ~2 RIR.',
    'Progress load if you hit the top of the rep range. Work around 1–2 RIR.',
    'Consolidation week: reduce working sets by ~30–40%; no grinders.'
  ][phase - 1];
};

const warmups = {
  1: {
    sat: [
      ['BikeErg / easy bike','3 min'],
      ['Hip hinge drill','10 reps'],
      ['Band external rotation','12/side'],
      ['Scapular pull-up','8 reps'],
      ['Deadlift ramp-up','3 progressive sets before work sets']
    ],
    sun: [
      ['BikeErg / easy bike','3 min'],
      ['Band external rotation','12/side'],
      ['Serratus wall slide','8–10 reps'],
      ['GHD hip extension','8 easy reps'],
      ['Light DB row','10 reps/side']
    ],
    wed: [
      ['Easy bike','3 min'],
      ['Band external rotation','12/side'],
      ['Serratus wall slide','8–10 reps'],
      ['Machine chest press ramp-up','2 light sets'],
      ['Bodyweight glute bridge','10 reps']
    ]
  },
  2: {
    sat: [
      ['BikeErg / easy bike','3 min'],
      ['Band external rotation','12/side'],
      ['Serratus wall slide','8–10 reps'],
      ['Scapular pull-up','8 reps'],
      ['Very light lateral raise','15 reps']
    ],
    sun: [
      ['Easy bike','3 min'],
      ['Band external rotation','12/side'],
      ['Serratus wall slide','8–10 reps'],
      ['Light scaption','12 reps'],
      ['GHD hip extension','8 easy reps']
    ],
    wed: [
      ['Easy bike','3 min'],
      ['Band external rotation','12/side'],
      ['Serratus wall slide','8–10 reps'],
      ['Machine chest press ramp-up','2 light sets'],
      ['Light cable lateral raise','12 reps/side']
    ]
  },
  3: {
    sat: [
      ['BikeErg / easy bike','3 min'],
      ['Hip hinge drill','10 reps'],
      ['Band external rotation','12/side'],
      ['Scapular pull-up','8 reps'],
      ['Deadlift ramp-up','3 progressive sets before work sets']
    ],
    sun: [
      ['Easy bike','3 min'],
      ['Band external rotation','12/side'],
      ['Serratus wall slide','8–10 reps'],
      ['Bodyweight glute bridge','12 reps'],
      ['Hip thrust ramp-up','2 progressive sets']
    ],
    wed: [
      ['Easy bike','3 min'],
      ['Band external rotation','12/side'],
      ['Serratus wall slide','8–10 reps'],
      ['Machine chest press ramp-up','2 light sets'],
      ['Hip thrust ramp-up','2 progressive sets']
    ]
  }
};

const basePrograms = {
  1: {
    sat: [
      ['Deadlift',4,'5–7','Main strength lift. Build up gradually.'],
      ['Strict chin-up',4,'5–8','Neutral or supinated grip; no kipping.'],
      ['Chest-supported DB row',3,'8–12','Strict, chest supported.'],
      ['Farmer carry',4,'30–40 m','Heavy, ribs down, shoulders relaxed.'],
      ['Band external rotation',2,'15/side','Shoulder prehab.']
    ],
    sun: [
      ['GHD hip extension',3,'10–15','Controlled tempo.'],
      ['Chest-supported DB row',3,'10–15','Lighter than Saturday.'],
      ['DB lateral raise',3,'12–20','Strict reps; no shrugging.'],
      ['DB scaption',3,'10–15','Pain-free scapular plane.'],
      ['Hammer curl',3,'8–12','Controlled eccentric.'],
      ['Ab wheel / hanging knee raise',3,'6–15','Alternate weekly.']
    ],
    wed: [
      ['Machine chest press',4,'8–12','Pain-free ROM only.'],
      ['Hip thrust',3,'8–12','Moderately heavy.'],
      ['Seated or cable row',3,'8–12','Controlled full ROM.'],
      ['Leg curl',3,'10–15','Hamstring hypertrophy.'],
      ['Cable triceps pushdown',3,'10–15','Stop short of shoulder irritation.'],
      ['Pallof press',3,'10–15/side','Anti-rotation trunk work.']
    ]
  },
  2: {
    sat: [
      ['Deadlift',3,'5–6','Maintenance strength; keep reps clean.'],
      ['Strict chin-up',3,'6–8','Maintain pulling strength.'],
      ['DB lateral raise',4,'12–20','Primary delt volume.'],
      ['Rear-delt raise',3,'12–20','Chest-supported if possible.'],
      ['DB triceps extension / kickback',3,'10–15','Choose the pain-free option.'],
      ['Farmer carry',3,'30–40 m','Grip + trunk + loaded carry.']
    ],
    sun: [
      ['DB scaption',4,'10–15','Pain-free scapular plane.'],
      ['Rear-delt raise',3,'12–20','Controlled.'],
      ['Hammer curl',4,'8–12','Main biceps movement.'],
      ['Band triceps pressdown',3,'12–20','Use a strong band; shoulder-friendly.'],
      ['GHD hip extension',3,'10–15','Posterior chain maintenance.'],
      ['Ab wheel / hanging knee raise',3,'6–15','Controlled.']
    ],
    wed: [
      ['Machine chest press',4,'8–12','Only if pain-free.'],
      ['Hip thrust',3,'8–12','Posterior chain.'],
      ['Cable lateral raise',3,'12–20','Smooth reps.'],
      ['Cable rear-delt fly',3,'12–20','Light and controlled.'],
      ['Cable curl',3,'8–12','Full elbow flexion.'],
      ['Cable triceps pushdown',3,'10–15','No shoulder compensation.']
    ]
  },
  3: {
    sat: [
      ['Deadlift',4,'4–6','Primary strength lift.'],
      ['Weighted / strict chin-up',4,'4–6','Add load only when bodyweight sets are clean.'],
      ['Farmer carry',4,'30–40 m','Progress total load.'],
      ['Chest-supported DB row',3,'8–10','Strength-hypertrophy bridge.'],
      ['Ab wheel',3,'6–12','Strict trunk position.']
    ],
    sun: [
      ['Hip thrust',4,'6–10','Heavier functional hip extension.'],
      ['GHD hip extension',3,'10–12','Controlled posterior-chain work.'],
      ['Suitcase carry',3,'30 m/side','Anti-lateral-flexion trunk work.'],
      ['1-arm DB row',3,'8–12/side','Stable torso.'],
      ['DB scaption',3,'12–15','Maintain shoulder capacity.'],
      ['Hanging knee raise',3,'8–15','No swinging.']
    ],
    wed: [
      ['Machine chest press',3,'8–12','Pain-free chest maintenance.'],
      ['Cable row',3,'8–12','Controlled strength work.'],
      ['Leg curl',3,'8–12','Hamstrings.'],
      ['Hip thrust',3,'8–10','Moderate-heavy.'],
      ['Pallof press',3,'10–15/side','Trunk control.'],
      ['Optional curls + triceps',2,'10–15','Only if time/recovery allow.']
    ]
  }
};

const goalMap = {
  1: {
    'Deadlift': 'Cycle goal: build your clean 5–7 rep working load. By Week 3 aim for ~+5 kg vs Week 1 at similar RIR and pain.',
    'Strict chin-up': 'Cycle goal: add 1–2 clean reps to your sets and improve your max strict-rep benchmark.',
    'Machine chest press': 'Secondary goal: reach all prescribed sets at 12 reps pain-free before increasing the stack.'
  },
  2: {
    'DB lateral raise': 'Cycle goal: add strict reps first, then the smallest load jump without shrugging or shoulder irritation.',
    'DB scaption': 'Cycle goal: own 4 kg for 15 clean reps pain-free before considering 5 kg.',
    'Hammer curl': 'Cycle goal: progress from 10 kg toward clean 3–4 × 12 before increasing load.',
    'Machine chest press': 'Secondary goal: maintain or slowly progress pain-free pressing capacity.'
  },
  3: {
    'Deadlift': 'Cycle goal: strongest clean 4–6 rep sets of the program in Week 11; no grinders.',
    'Weighted / strict chin-up': 'Cycle goal: once 4 × 6 bodyweight is comfortable, add 2.5 kg and rebuild reps.',
    'Farmer carry': 'Cycle goal: carry ~10–20% more total load than your Week 9 baseline for the same distance.',
    'Hip thrust': 'Secondary goal: progress a strong 6–10 rep hip-extension pattern while the knee stays calm.'
  }
};

// v4.4: curated movement demo links. Exercise names open the primary demo;
// movements with more than one programmed option also expose alternate demo links.
const movementVideos = {
  'BikeErg / easy bike': [{label:'BikeErg setup', url:'https://www.youtube.com/watch?v=xWE5Q_NljyY'}],
  'Hip hinge drill': [{label:'Hip hinge drill', url:'https://www.youtube.com/watch?v=EK0P-9nIECY'}],
  'Band external rotation': [{label:'Band external rotation', url:'https://www.youtube.com/watch?v=aePkwVQ1yLw'}],
  'Scapular pull-up': [{label:'Scapular pull-up', url:'https://www.wodbuilders.com/en/exercises/scapular-pull-up'}],
  'Deadlift': [{label:'Deadlift technique', url:'https://www.youtube.com/watch?v=MBbyAqvTNkU'}],
  'Serratus wall slide': [{label:'Serratus wall slide', url:'https://fit-pro.com/videos-450-Functionally-Fit-Serratus-Wall-Slide.html'}],
  'GHD hip extension': [{label:'GHD hip extension', url:'https://www.youtube.com/watch?v=yCoUpLutVo8'}],
  'Chest-supported DB row': [{label:'Chest-supported row', url:'https://www.youtube.com/watch?v=0UBRfiO4zDs'}],
  'Machine chest press': [{label:'Machine chest press', url:'https://www.youtube.com/watch?v=NwzUje3z0qY'}],
  'Bodyweight glute bridge': [{label:'Glute bridge demos', url:'https://bretcontreras.com/the-evolution-of-the-hip-thrust/'}],
  'DB lateral raise': [{label:'DB lateral raise', url:'https://www.youtube.com/watch?v=4hTUCDUQaNA'}],
  'DB scaption': [{label:'DB scaption', url:'https://tigerfitness.com/blogs/exercise-database/dumbbell-scaption'}],
  'Cable lateral raise': [{label:'Cable lateral raise', url:'https://www.youtube.com/watch?v=lq7eLC30b9w'}],
  'Hip thrust': [{label:'Hip thrust', url:'https://www.youtube.com/watch?v=zbcGIPsNO6g'}],
  'Strict chin-up': [{label:'Strict pull/chin-up', url:'https://www.youtube.com/watch?v=HRV5YKKaeVw'}],
  'Farmer carry': [{label:'Farmer carry', url:'https://www.youtube.com/watch?v=lLAw6fUccKA'}],
  'Hammer curl': [{label:'Hammer curl', url:'https://www.youtube.com/watch?v=XOEL4MgekYE'}],
  'Ab wheel': [{label:'Ab wheel', url:'https://www.youtube.com/watch?v=OJIWMlLa38Q'}],
  'Hanging knee raise': [{label:'Hanging knee raise', url:'https://support.runna.com/en/articles/6376285-hanging-knee-raise-exercise-tutorial'}],
  'Seated or cable row': [{label:'Seated cable row', url:'https://www.youtube.com/watch?v=UCXxvVItLoM'}],
  'Leg curl': [{label:'Leg curl', url:'https://www.youtube.com/watch?v=jobEeklwrrs'}],
  'Cable triceps pushdown': [{label:'Cable triceps pushdown', url:'https://www.youtube.com/watch?v=_w-HpW70nSQ'}],
  'Pallof press': [{label:'Pallof press', url:'https://www.youtube.com/watch?v=HXrLaqNIkTs'}],
  'Rear-delt raise': [{label:'Rear-delt raise', url:'https://www.youtube.com/watch?v=a2S4pCIVZGw'}],
  'DB triceps extension / kickback': [
    {label:'DB triceps extension', url:'https://www.youtube.com/watch?v=k0OT0xqAXJs'},
    {label:'DB triceps kickback', url:'https://www.youtube.com/watch?v=dnyUwaA7Pok'}
  ],
  'Band triceps pressdown': [{label:'Band triceps pressdown', url:'https://www.youtube.com/watch?v=Tz-eIqfB-1Y'}],
  'Cable rear-delt fly': [{label:'Cable rear-delt fly', url:'https://www.youtube.com/watch?v=ATSjVXoOgVg'}],
  'Cable curl': [{label:'Cable curl', url:'https://www.youtube.com/watch?v=ra-Kxl5JmUU'}],
  'Weighted / strict chin-up': [
    {label:'Weighted chin-up', url:'https://www.youtube.com/watch?v=ktTWlfShrP8'},
    {label:'Strict pull/chin-up', url:'https://www.youtube.com/watch?v=HRV5YKKaeVw'}
  ],
  'Suitcase carry': [{label:'Suitcase carry', url:'https://www.muscleandstrength.com/exercises/dumbbell-suitcase-carry'}],
  '1-arm DB row': [{label:'1-arm DB row', url:'https://www.youtube.com/watch?v=dFzUjzfih7k'}],
  'Cable row': [{label:'Cable row', url:'https://www.youtube.com/watch?v=UCXxvVItLoM'}],
  'Optional curls + triceps': [
    {label:'Cable curl', url:'https://www.youtube.com/watch?v=ra-Kxl5JmUU'},
    {label:'Triceps pushdown', url:'https://www.youtube.com/watch?v=_w-HpW70nSQ'}
  ],
  'Ab wheel / hanging knee raise': [
    {label:'Ab wheel', url:'https://www.youtube.com/watch?v=OJIWMlLa38Q'},
    {label:'Hanging knee raise', url:'https://support.runna.com/en/articles/6376285-hanging-knee-raise-exercise-tutorial'}
  ]
};

const movementVideoAliases = {
  'Easy bike':'BikeErg / easy bike',
  'Deadlift ramp-up':'Deadlift',
  'Light DB row':'Chest-supported DB row',
  'Machine chest press ramp-up':'Machine chest press',
  'Very light lateral raise':'DB lateral raise',
  'Light scaption':'DB scaption',
  'Light cable lateral raise':'Cable lateral raise',
  'Hip thrust ramp-up':'Hip thrust'
};

const dayNames = {
  1: { sat:'Pull + Hinge', sun:'Back, Delts + Arms', wed:'Press + Hips' },
  2: { sat:'Strength + Delts', sun:'Arms + Shoulders', wed:'Press + Cable Pump' },
  3: { sat:'Heavy Pull + Carry', sun:'Hips + Trunk', wed:'Press + Hamstrings' }
};
const DAYS = ['sat','sun','wed'];

const ICONS = {
  check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  play:'<path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none"/>',
  chev:'<path d="M9 6l6 6-6 6"/>',
  swap:'<path d="M4 8h13l-3.5-3.5M20 16H7l3.5 3.5"/>'
};
function icon(name, cls=''){
  return `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;
}

function videosForMovement(name){
  const key=movementVideoAliases[name] || name;
  return movementVideos[key] || [];
}
function movementTitleHTML(name){
  const videos=videosForMovement(name), safe=escapeHtml(name);
  if(!videos.length) return safe;
  return `<a class="movement-link" href="${videos[0].url}" target="_blank" rel="noopener noreferrer" aria-label="Watch ${safe} technique demo">${safe}<span class="video-indicator">${icon('play')}</span></a>`;
}
function videoChipsHTML(name){
  const videos=videosForMovement(name);
  if(!videos.length) return '';
  return `<div class="video-chips">${videos.map(v=>`<a class="video-chip" href="${v.url}" target="_blank" rel="noopener noreferrer">${icon('play')}${escapeHtml(videos.length>1?v.label:'Technique video')}</a>`).join('')}</div>`;
}

const benchmarkRows = [
  ['Strict chin-ups','max reps'],
  ['Weighted chin-up','3–5RM load'],
  ['Deadlift','comfortable 5RM'],
  ['Farmer carry 40 m','total load'],
  ['Machine chest press','8–12RM'],
  ['Hip thrust','8–10RM'],
  ['Ab wheel','max clean reps'],
  ['Bodyweight','kg'],
  ['Waist','cm']
];

const trendLifts = [
  {label:'Deadlift', names:['Deadlift'], mode:'load'},
  {label:'Chin-up', names:['Strict chin-up','Weighted / strict chin-up'], mode:'reps'},
  {label:'Chest press', names:['Machine chest press'], mode:'load'},
  {label:'Hip thrust', names:['Hip thrust'], mode:'load'},
  {label:'Farmer carry', names:['Farmer carry'], mode:'load'},
  {label:'Lateral raise', names:['DB lateral raise'], mode:'load'},
  {label:'Hammer curl', names:['Hammer curl'], mode:'load'}
];

function deepSettings(raw){
  const out = structuredClone(defaultSettings);
  if(!raw) return out;
  if(raw.startDate) out.startDate = raw.startDate;
  out.profile = {...out.profile, ...(raw.profile||{})};
  out.baselines = {...out.baselines, ...(raw.baselines||{})};
  out.prefs = {...out.prefs, ...(raw.prefs||{})};
  if(raw.chestStart && !raw.baselines?.chestPress) out.baselines.chestPress = raw.chestStart;
  if(raw.rowStart && !raw.baselines?.dbRow) out.baselines.dbRow = raw.rowStart;
  return out;
}

let settings = deepSettings(loadJSON(STORAGE.settings, null));
let logs = loadJSON(STORAGE.logs, {});
let benchmarks = loadJSON(STORAGE.benchmarks, {});
let meta = loadJSON(STORAGE.meta, {});
let currentView = 'today';
let selectedWeek = clampWeek(getProgramWeek(new Date()));
let selectedDay = dayKeyFromDate(new Date()) || 'sat';
let activeSession = null;
let timerTickHandle = null;
let restAlertedFor = null;
let wakeLock = null;
let wakeLockPending = false;
let audioCtx = null;

const app = document.getElementById('app');
const pageTitle = document.getElementById('pageTitle');
const settingsDialog = document.getElementById('settingsDialog');
const chooserDialog = document.getElementById('chooserDialog');
const summaryDialog = document.getElementById('summaryDialog');

// ---------- basics ----------
function loadJSON(key, fallback){
  try { return JSON.parse(localStorage.getItem(key)) ?? structuredClone(fallback); }
  catch { return structuredClone(fallback); }
}
function saveJSON(key, value){ localStorage.setItem(key, JSON.stringify(value)); }
function clampWeek(w){ return Math.max(1, Math.min(12, w)); }
function cycleForWeek(w){ return w <= 4 ? 1 : w <= 8 ? 2 : 3; }
function phaseForWeek(w){ return ((w-1)%4)+1; }
function isDeload(w){ return phaseForWeek(w)===4; }
function dayKeyFromDate(d){ return ({6:'sat',0:'sun',3:'wed'})[d.getDay()] || null; }
function dayLabel(k){ return ({sat:'Saturday',sun:'Sunday',wed:'Wednesday'})[k]; }
function dayOrder(k){ return ({sat:0,sun:1,wed:2})[k] ?? 0; }
function sessionName(week, day){ return dayNames[cycleForWeek(week)][day]; }
function parseLocalDate(s){ const [y,m,d]=s.split('-').map(Number); return new Date(y,m-1,d,12); }
function getProgramWeek(date){
  const start = parseLocalDate(settings.startDate);
  const diff = Math.floor((stripTime(date)-stripTime(start))/86400000);
  return Math.floor(diff/7)+1;
}
function stripTime(d){ return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime(); }
function formatDate(d){ return new Intl.DateTimeFormat(undefined,{weekday:'short',month:'short',day:'numeric'}).format(d); }
function formatShortDate(d){ return new Intl.DateTimeFormat(undefined,{month:'short',day:'numeric'}).format(d); }
function dateKey(d){ return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
function sessionDate(week, day){
  const start = parseLocalDate(settings.startDate);
  const d = new Date(start.getFullYear(), start.getMonth(), start.getDate()+(week-1)*7);
  for(let i=0;i<7;i++){ if(dayKeyFromDate(d)===day) return d; d.setDate(d.getDate()+1); }
  return d;
}
function nextTrainingDate(from=new Date()){
  const start = parseLocalDate(settings.startDate);
  let d = new Date(from.getFullYear(),from.getMonth(),from.getDate());
  if (d < start) d = new Date(start);
  for(let i=0;i<21;i++){
    const w = getProgramWeek(d); const k=dayKeyFromDate(d);
    if(w>=1 && w<=12 && k) return d;
    d.setDate(d.getDate()+1);
  }
  return null;
}
function getExercises(week, day){
  const cycle = cycleForWeek(week);
  const base = basePrograms[cycle][day].map(x=>({name:x[0], sets:x[1], reps:x[2], note:x[3]}));
  if(isDeload(week)){
    base.forEach((e, i)=>{ e.sets = Math.max(2, Math.round(e.sets*0.65)); if(i===0 && e.name==='Deadlift') e.reps = cycle===3 ? '4–5' : '5'; });
  }
  return base;
}
function logKey(week, day){ return `w${week}-${day}`; }
function parseLogKey(k){ const m=String(k).match(/^w(\d+)-(sat|sun|wed)$/); return m ? {week:Number(m[1]), day:m[2]} : null; }
function sessionScore(week, day){ return (week-1)*3+dayOrder(day); }
function getSessionLog(week, day){ return logs[logKey(week,day)] || {exercises:{}, notes:'', completed:false, startedAt:null, lastSetAt:null, endedAt:null}; }
function rowHasData(r){ return !!r && ((r.weight!=null && r.weight!=='') || (r.reps!=null && r.reps!=='')); }
function hasData(entry){
  return !!entry && (!!entry.startedAt || !!entry.completed || Object.values(entry.exercises||{}).some(sets=>(sets||[]).some(rowHasData)));
}
function nowISO(){ return new Date().toISOString(); }
function formatClock(iso){
  if(!iso) return '—';
  return new Intl.DateTimeFormat(undefined,{hour:'2-digit',minute:'2-digit'}).format(new Date(iso));
}
function formatDuration(ms){
  if(!Number.isFinite(ms) || ms < 0) return '—';
  const total=Math.round(ms/1000), h=Math.floor(total/3600), m=Math.floor((total%3600)/60), sec=total%60;
  return h>0 ? `${h}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}` : `${m}:${String(sec).padStart(2,'0')}`;
}
function fmtRest(sec){ return `${Math.floor(sec/60)}:${String(sec%60).padStart(2,'0')}`; }
function sessionDurationMs(entry, live=true){
  if(!entry?.startedAt) return null;
  const end=entry.endedAt || entry.lastSetAt || (live?new Date().toISOString():null);
  return end ? Math.max(0,new Date(end)-new Date(entry.startedAt)) : null;
}
function restSecondsFor(name){
  if(/Deadlift/i.test(name)) return 180;
  if(/Weighted \/ strict chin-up/i.test(name)) return 180;
  if(/Strict chin-up/i.test(name)) return 150;
  if(/Hip thrust/i.test(name)) return 150;
  if(/Machine chest press|Chest-supported DB row|1-arm DB row|Seated or cable row|Cable row|Farmer carry|Suitcase carry/i.test(name)) return 120;
  if(/GHD hip extension|Leg curl|lateral raise|scaption|Hammer curl|Rear-delt|triceps|Cable curl|rear-delt fly/i.test(name)) return 90;
  return 60;
}
function weightOptional(name){
  return /chin-up|GHD hip extension|Ab wheel|hanging knee raise|Band external rotation|Pallof press|Band triceps/i.test(name);
}
function rowIsComplete(name,row){
  const reps=Number(row?.reps);
  if(!row || row.reps==='' || !Number.isFinite(reps) || reps<=0) return false;
  if(weightOptional(name)) return true;
  const w=Number(row?.weight);
  return Number.isFinite(w) && w>0;
}
function exerciseComplete(e, entry){
  return Array.from({length:e.sets},(_,i)=>rowIsComplete(e.name,entry.exercises?.[e.name]?.[i])).every(Boolean);
}
function allSetsComplete(week,day,entry){ return getExercises(week,day).every(e=>exerciseComplete(e,entry)); }
function setCounts(week,day,entry){
  let done=0,total=0;
  getExercises(week,day).forEach(e=>{ for(let i=0;i<e.sets;i++){ total++; if(rowIsComplete(e.name,entry.exercises?.[e.name]?.[i])) done++; } });
  return {done,total};
}

// ---------- rest timer, sound, wake lock ----------
function loadRestTimer(){ return loadJSON(STORAGE.restTimer,null); }
function saveRestTimer(t){
  if(t) localStorage.setItem(STORAGE.restTimer,JSON.stringify(t));
  else localStorage.removeItem(STORAGE.restTimer);
}
function startRestTimer(exercise,setIndex,seconds){
  const t={exercise,setIndex,seconds,startedAt:Date.now(),endsAt:Date.now()+seconds*1000};
  saveRestTimer(t); restAlertedFor=null; updateRestTimerDock();
}
function clearRestTimer(){ saveRestTimer(null); restAlertedFor=null; updateRestTimerDock(); }
function addRestTime(seconds){
  const t=loadRestTimer(); if(!t) return;
  const base=Math.max(t.endsAt, Date.now());
  t.endsAt=base+seconds*1000; t.seconds+=seconds; saveRestTimer(t); restAlertedFor=null; updateRestTimerDock();
}
function updateRestTimerDock(){
  const dock=document.getElementById('restTimerDock'); if(!dock) return;
  let t=loadRestTimer();
  if(t && Date.now()-t.endsAt>120000){ saveRestTimer(null); t=null; }
  document.body.classList.toggle('timer-on', !!t);
  if(!t){ dock.classList.add('hidden'); return; }
  dock.classList.remove('hidden');
  const remain=Math.max(0,Math.ceil((t.endsAt-Date.now())/1000));
  const label=document.getElementById('restTimerLabel');
  const value=document.getElementById('restTimerValue');
  const bar=document.getElementById('restTimerBar');
  if(label) label.textContent=`${t.exercise} · after set ${Number(t.setIndex)+1}`;
  if(value) value.textContent=remain>0?fmtRest(remain):'GO';
  if(bar) bar.style.width=`${Math.min(100,Math.max(0,100-(remain/t.seconds)*100))}%`;
  dock.classList.toggle('done',remain===0);
  if(remain===0 && restAlertedFor!==t.endsAt){
    restAlertedFor=t.endsAt;
    // Don't alarm for a timer that ran out while the app was closed.
    if(Date.now()-t.endsAt<5000 && !document.hidden) restAlert();
  }
}
function unlockAudio(){
  try{
    audioCtx ||= new (window.AudioContext||window.webkitAudioContext)();
    if(audioCtx.state==='suspended') audioCtx.resume();
  }catch{ audioCtx=null; }
}
function beep(){
  if(!settings.prefs?.sound || !audioCtx) return;
  try{
    const t0=audioCtx.currentTime;
    [0,0.22,0.44].forEach((dt,i)=>{
      const o=audioCtx.createOscillator(), g=audioCtx.createGain();
      o.type='sine'; o.frequency.value=i===2?1175:880;
      g.gain.setValueAtTime(0.0001,t0+dt);
      g.gain.exponentialRampToValueAtTime(0.5,t0+dt+0.02);
      g.gain.exponentialRampToValueAtTime(0.0001,t0+dt+0.18);
      o.connect(g); g.connect(audioCtx.destination);
      o.start(t0+dt); o.stop(t0+dt+0.2);
    });
  }catch{}
}
function restAlert(){
  if(navigator.vibrate) navigator.vibrate([160,100,160]);
  beep();
  document.body.classList.remove('flash'); void document.body.offsetWidth; document.body.classList.add('flash');
  setTimeout(()=>document.body.classList.remove('flash'),1600);
}
function sessionIsLive(){
  if(!activeSession) return false;
  const e=getSessionLog(activeSession.week,activeSession.day);
  return !!e.startedAt && !e.endedAt && !e.completed;
}
async function syncWakeLock(){
  const want = !!settings.prefs?.wakeLock && !document.hidden && sessionIsLive() && 'wakeLock' in navigator;
  if(wakeLockPending) return;
  try{
    if(want && !wakeLock){
      wakeLockPending=true;
      wakeLock=await navigator.wakeLock.request('screen');
      wakeLock.addEventListener('release',()=>{ wakeLock=null; });
    } else if(!want && wakeLock){
      const l=wakeLock; wakeLock=null; await l.release();
    }
  }catch{ wakeLock=null; }
  finally{ wakeLockPending=false; }
}
function updateSessionClock(){
  if(!activeSession) return;
  const {week,day}=activeSession, entry=getSessionLog(week,day);
  const elapsed=document.getElementById('sessionElapsed');
  const detail=document.getElementById('sessionTimeDetail');
  if(!elapsed || !detail) return;
  if(!entry.startedAt){
    elapsed.textContent=entry.completed?'Not timed':'0:00';
    detail.textContent=entry.completed?'Finished without the timer':'Tap Start when you begin the warm-up';
    return;
  }
  elapsed.textContent=formatDuration(sessionDurationMs(entry,!entry.endedAt));
  if(entry.endedAt) detail.textContent=`${formatClock(entry.startedAt)}–${formatClock(entry.endedAt)} · finished`;
  else if(entry.lastSetAt) detail.textContent=`Started ${formatClock(entry.startedAt)} · last set ${formatClock(entry.lastSetAt)}`;
  else detail.textContent=`Started ${formatClock(entry.startedAt)} · warm-up running`;
}
function ensureTimerTick(){
  if(timerTickHandle) clearInterval(timerTickHandle);
  timerTickHandle=setInterval(()=>{ updateSessionClock(); updateRestTimerDock(); syncWakeLock(); },1000);
  updateSessionClock(); updateRestTimerDock();
}

// ---------- load suggestions ----------
function roundStep(n, step){ return Math.round(n/step)*step; }
function numeric(v){ if(v===''||v==null) return null; const n=Number(v); return Number.isFinite(n) && n>0 ? n : null; }
function profileWeight(){ return numeric(settings.profile?.bodyweightKg) || 82; }
function repRange(reps){
  const nums=String(reps).match(/\d+/g)?.map(Number)||[];
  return nums.length ? {min:nums[0], max:nums[1]||nums[0]} : null;
}
function loadStep(name){
  if(/Deadlift|Hip thrust/.test(name)) return 5;
  if(/DB row|1-arm DB row|Hammer curl/.test(name)) return 2;
  if(/lateral raise|scaption|Rear-delt raise/i.test(name)) return 1;
  return 2.5;
}
// Deload weeks are skipped so a light week never becomes the base for the next block.
function previousExerciseLog(exerciseName, week, day){
  const currentScore=sessionScore(week,day);
  let best=null, bestAny=null;
  Object.entries(logs).forEach(([key,entry])=>{
    const p=parseLogKey(key); if(!p) return;
    const score=sessionScore(p.week,p.day);
    if(score>=currentScore) return;
    const sets=entry.exercises?.[exerciseName];
    if(!sets?.some(rowHasData)) return;
    const item={score,sets,week:p.week,day:p.day};
    if(!bestAny || score>bestAny.score) bestAny=item;
    if(!isDeload(p.week) && (!best || score>best.score)) best=item;
  });
  return best || bestAny;
}
function progressionFromLast(e, week, day){
  const prev=previousExerciseLog(e.name,week,day); if(!prev) return null;
  const rows=prev.sets.filter(rowHasData); if(!rows.length) return null;
  const weights=rows.map(r=>numeric(r.weight)).filter(Boolean);
  if(!weights.length) return null;
  const lastWeight=weights[0];
  const pains=rows.map(r=>r.pain===''||r.pain==null?NaN:Number(r.pain)).filter(Number.isFinite);
  const rirs=rows.map(r=>r.rir===''||r.rir==null?NaN:Number(r.rir)).filter(Number.isFinite);
  const reps=rows.map(r=>Number(r.reps)).filter(n=>Number.isFinite(n)&&n>0);
  const range=repRange(e.reps);
  const maxPain=pains.length?Math.max(...pains):0;
  const minRir=rirs.length?Math.min(...rirs):2;
  const step=loadStep(e.name);
  if(maxPain>2){
    const v=Math.max(step, Math.min(roundStep(lastWeight*0.9,step), lastWeight-step));
    return {value:v, tag:'↓ pain', text:`Pain went above 2/10 last time at ${lastWeight} kg, so drop about 10%.`, kind:'log'};
  }
  if(isDeload(week)){
    const v=Math.max(step, Math.min(roundStep(lastWeight*0.85,step), lastWeight-step));
    return {value:v, tag:'deload', text:`Deload week: about 85% of your last ${lastWeight} kg. Fewer sets, crisp reps, no grinders.`, kind:'deload'};
  }
  const allTop=range && reps.length>=Math.min(e.sets,rows.length) && reps.every(r=>r>=range.max);
  if(allTop && minRir>=1){
    return {value:roundStep(lastWeight+step,step), tag:'↑ add load', text:`Every set reached the top of the rep range at ${lastWeight} kg with reps to spare.`, kind:'log'};
  }
  return {value:lastWeight, tag:'repeat', text:`Repeat ${lastWeight} kg and beat last time's reps before adding load.`, kind:'log'};
}
function baselineSuggestion(e,week){
  const phase=phaseForWeek(week);
  const b=settings.baselines||{}; const bw=profileWeight();
  const factors=[0.80,0.85,0.90,0.70];
  if(e.name==='Deadlift'){
    const base=numeric(b.deadlift5RM);
    if(base) return {value:roundStep(base*factors[phase-1],2.5), text:`Based on your ${base} kg comfortable 5RM.`, kind:'baseline'};
    return {value:roundStep(bw*0.80,2.5), text:`Conservative starting load from ${bw} kg bodyweight. It's a calibration load, not a strength prediction.`, kind:'estimate'};
  }
  if(e.name==='Strict chin-up'){
    const max=numeric(b.chinupMax)||8; const pct=[0.62,0.68,0.72,0.55][phase-1];
    const reps=Math.max(4,Math.min(8,Math.floor(max*pct)));
    return {value:null,text:`Bodyweight, about ${reps} reps per set. Your max: ${max} clean reps.`,kind:numeric(b.chinupMax)?'baseline':'estimate'};
  }
  if(e.name==='Weighted / strict chin-up'){
    return {value:null,text:'Start at bodyweight. When 4 × 6 is clean at 2+ RIR and pain is 2/10 or less, add 2.5 kg.',kind:'rule'};
  }
  if(e.name==='Chest-supported DB row' || e.name==='1-arm DB row'){
    const v=numeric(b.dbRow)||16; return {value:v,text:`${v} kg per hand. Add load only once the top rep target is clean.`,kind:numeric(b.dbRow)?'baseline':'estimate'};
  }
  if(e.name==='Machine chest press'){
    const v=numeric(b.chestPress)||35; return {value:v,text:`${v} kg. Reach 12 pain-free reps on all sets before increasing.`,kind:numeric(b.chestPress)?'baseline':'estimate'};
  }
  if(e.name==='Hip thrust'){
    const base=numeric(b.hipThrust); if(base) return {value:roundStep(base*0.85,5),text:`Based on your ${base} kg 8–10RM.`,kind:'baseline'};
    return {value:roundStep(bw*0.90,5),text:`Conservative starting load from bodyweight. Adjust to about 3 RIR on the first set.`,kind:'estimate'};
  }
  if(e.name==='Farmer carry'){
    const base=numeric(b.farmerCarryTotal); const total=base||roundStep(bw*0.70,5);
    return {value:total,text:`About ${total} kg total (${roundStep(total/2,2.5)} kg per hand) for 30–40 m.`,kind:base?'baseline':'estimate'};
  }
  if(e.name==='Suitcase carry'){
    const base=numeric(b.farmerCarryTotal); const per=base?roundStep(base/2,2.5):roundStep(bw*0.35,2.5);
    return {value:per,text:`About ${per} kg in one hand. Keep your torso upright.`,kind:base?'baseline':'estimate'};
  }
  if(e.name==='DB lateral raise'){
    const v=numeric(b.lateralRaise)||4; return {value:v,text:`${v} kg per hand. Strict reps first.`,kind:'baseline'};
  }
  if(e.name==='DB scaption'){
    const v=numeric(b.scaption)||4; return {value:v,text:`${v} kg per hand while it stays shoulder-friendly.`,kind:'baseline'};
  }
  if(e.name==='Hammer curl'){
    const v=numeric(b.hammerCurl)||10; return {value:v,text:`${v} kg per hand. Use double progression.`,kind:'baseline'};
  }
  if(/Cable|Leg curl|Seated or cable row/.test(e.name)) return {value:null,text:'Machine stacks vary. Pick a load that leaves about 3 RIR; the app will build from what you log.',kind:'rule'};
  if(/GHD hip extension/.test(e.name)) return {value:null,text:'Start with bodyweight. Add a light plate only after 15 controlled reps feel easy.',kind:'rule'};
  return null;
}
function suggestedLoad(e,week,day){ return progressionFromLast(e,week,day) || baselineSuggestion(e,week); }
function goalFor(e,week){ return goalMap[cycleForWeek(week)]?.[e.name] || null; }

// Per-set targets shown as grey placeholders; the check button logs them.
function setTargets(e, week, day, entry){
  const sug=suggestedLoad(e,week,day);
  const prev=previousExerciseLog(e.name,week,day)?.sets||[];
  const prevRows=prev.filter(rowHasData);
  const range=repRange(e.reps);
  const saved=entry.exercises?.[e.name]||[];
  const out=[]; let lastW=null;
  for(let s=0;s<e.sets;s++){
    const p=(rowHasData(prev[s])?prev[s]:prevRows[prevRows.length-1])||{};
    const weight = lastW ?? sug?.value ?? numeric(p.weight) ?? null;
    const reps = numeric(p.reps) ?? range?.min ?? null;
    out.push({weight, reps});
    const own=numeric(saved[s]?.weight); if(own) lastW=own;
  }
  return out;
}

// ---------- workload ----------
function isCarryExercise(name){ return /Farmer carry|Suitcase carry/i.test(name); }
function isChinupExercise(name){ return /chin-up/i.test(name); }
function perHandFactor(name){
  if(/Chest-supported DB row|1-arm DB row|DB lateral raise|DB scaption|Hammer curl|Rear-delt raise|DB triceps/i.test(name)) return 2;
  return 1;
}
function rowWork(name,row,bw){
  const reps=Number(row?.reps);
  if(!row || row.reps==='' || !Number.isFinite(reps) || reps<=0) return null;
  const w=Number(row.weight), hasW=row.weight!=='' && Number.isFinite(w) && w>0;
  if(isCarryExercise(name)) return {reps, tonnage:0, carry:hasW ? w*reps*(/Suitcase carry/i.test(name)?2:1) : 0};
  let load=hasW?w:0;
  if(isChinupExercise(name)) load=bw+(hasW?w:0);
  return {reps, tonnage:load>0?load*reps*perHandFactor(name):0, carry:0};
}
function entryWorkload(entry){
  const bw=profileWeight();
  const r={tonnage:0,carryKgM:0,totalSets:0,totalReps:0,byExercise:{}};
  Object.entries(entry?.exercises||{}).forEach(([name,sets])=>{
    (sets||[]).forEach(row=>{
      const w=rowWork(name,row,bw); if(!w) return;
      const ex=r.byExercise[name] ||= {tonnage:0,carryKgM:0,sets:0,reps:0};
      ex.sets++; r.totalSets++; ex.reps+=w.reps; r.totalReps+=w.reps;
      ex.tonnage+=w.tonnage; r.tonnage+=w.tonnage; ex.carryKgM+=w.carry; r.carryKgM+=w.carry;
    });
  });
  return r;
}
function weeklyWorkload(week){
  const out={tonnage:0,carryKgM:0,totalSets:0,totalReps:0,byExercise:{}};
  DAYS.forEach(day=>{
    const w=entryWorkload(getSessionLog(week,day));
    out.tonnage+=w.tonnage; out.carryKgM+=w.carryKgM; out.totalSets+=w.totalSets; out.totalReps+=w.totalReps;
    Object.entries(w.byExercise).forEach(([n,v])=>{
      const ex=out.byExercise[n] ||= {tonnage:0,carryKgM:0,sets:0,reps:0};
      ex.tonnage+=v.tonnage; ex.carryKgM+=v.carryKgM; ex.sets+=v.sets; ex.reps+=v.reps;
    });
  });
  return out;
}
function weeklyTrainingTime(week){
  const sessions=DAYS.map(day=>sessionDurationMs(getSessionLog(week,day),false)).filter(ms=>Number.isFinite(ms) && ms>0);
  const totalMs=sessions.reduce((a,b)=>a+b,0);
  return {totalMs, sessions:sessions.length, avgMs:sessions.length?totalMs/sessions.length:0};
}
function fmtKg(n){ return Math.round(n).toLocaleString(); }

// ---------- shared fragments ----------
function escapeHtml(s){ return String(s??'').replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[m])); }
function missedSessions(today=new Date(), windowDays=10){
  const t=stripTime(today), out=[];
  for(let w=1;w<=12;w++) for(const d of DAYS){
    const dt=stripTime(sessionDate(w,d));
    if(dt>=t || t-dt>windowDays*86400000) continue;
    if(hasData(getSessionLog(w,d))) continue;
    out.push({week:w,day:d,date:new Date(dt)});
  }
  return out.sort((a,b)=>b.date-a.date).slice(0,3);
}
function missedHTML(excludeKey){
  const list=missedSessions().filter(m=>logKey(m.week,m.day)!==excludeKey);
  if(!list.length) return '';
  return `<section class="card missed-card"><div class="section-kicker warn-text">Missed recently</div>${list.map(m=>`
    <div class="missed-row"><div><strong>W${m.week} · ${dayLabel(m.day)}</strong><div class="exercise-meta">${sessionName(m.week,m.day)} · ${formatDate(m.date)}</div></div>
    <button type="button" class="secondary compact" data-choose="${m.week}-${m.day}">Do today</button></div>`).join('')}</section>`;
}
function backupReminderHTML(){
  if(!Object.values(logs).some(hasData)) return '';
  const last=meta.lastBackupAt?new Date(meta.lastBackupAt):null;
  const days=last?Math.floor((Date.now()-last)/86400000):null;
  if(days!==null && days<14) return '';
  return `<div class="callout backup-callout"><div><strong>${last?`Last backup ${days} days ago`:'No backup yet'}</strong><div class="exercise-meta">Your logs are stored only on this phone.</div></div><button type="button" class="secondary compact" data-backup-now>Back up</button></div>`;
}
function bindCommon(){
  app.querySelectorAll('[data-choose]').forEach(b=>b.onclick=()=>{ const [w,d]=b.dataset.choose.split('-'); chooseSession(Number(w),d); });
  app.querySelectorAll('[data-backup-now]').forEach(b=>b.onclick=exportBackup);
  app.querySelectorAll('[data-open-chooser]').forEach(b=>b.onclick=openChooser);
  app.querySelectorAll('[data-open-session]').forEach(b=>b.onclick=()=>{
    const [w,d]=b.dataset.openSession.split('-'); selectedWeek=Number(w); selectedDay=d; currentView='program'; render(); window.scrollTo(0,0);
  });
}

// ---------- render ----------
function render(){
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active', b.dataset.view===currentView));
  activeSession=null;
  ({today:renderToday, program:renderProgram, progress:renderProgress, history:renderHistory}[currentView] || renderToday)();
  bindCommon();
  updateRestTimerDock();
  syncWakeLock();
}

function todaysOverride(){
  const ov=loadJSON(STORAGE.override,null);
  if(!ov) return null;
  if(ov.date===dateKey(new Date()) && ov.week>=1 && ov.week<=12 && DAYS.includes(ov.day)) return ov;
  localStorage.removeItem(STORAGE.override);
  return null;
}
function chooseSession(week, day){
  saveJSON(STORAGE.override,{date:dateKey(new Date()),week,day});
  if(chooserDialog.open) chooserDialog.close();
  currentView='today'; render(); window.scrollTo(0,0);
}
function openChooser(){
  const today=new Date();
  const cur=clampWeek(getProgramWeek(today));
  const seen=new Set(), opts=[];
  const add=(week,day,note)=>{ const k=logKey(week,day); if(seen.has(k)||week<1||week>12) return; seen.add(k); opts.push({week,day,note}); };
  missedSessions(today,21).forEach(m=>add(m.week,m.day,'Missed'));
  DAYS.forEach(d=>add(cur,d,''));
  if(cur<12) DAYS.forEach(d=>add(cur+1,d,''));
  chooserDialog.querySelector('.chooser-list').innerHTML=opts.map(o=>{
    const l=getSessionLog(o.week,o.day);
    const badge=l.completed?'<span class="badge good">Done</span>':o.note?`<span class="badge warn">${o.note}</span>`:hasData(l)?'<span class="badge warn">Started</span>':`<span class="badge">${formatShortDate(sessionDate(o.week,o.day))}</span>`;
    return `<button type="button" class="chooser-item" data-pick="${o.week}-${o.day}"><div><strong>W${o.week} · ${dayLabel(o.day)}</strong><span>${sessionName(o.week,o.day)}${isDeload(o.week)?' · deload':''}</span></div>${badge}</button>`;
  }).join('');
  chooserDialog.querySelectorAll('[data-pick]').forEach(b=>b.onclick=()=>{ const [w,d]=b.dataset.pick.split('-'); chooseSession(Number(w),d); });
  chooserDialog.showModal();
}

function renderToday(){
  pageTitle.textContent='Today';
  const today=new Date();
  const w=getProgramWeek(today), dk=dayKeyFromDate(today);
  const override=todaysOverride();
  const scheduled = (w>=1 && w<=12 && dk) ? {week:w, day:dk} : null;
  const target = override || scheduled;
  if(target){
    app.innerHTML = missedHTML(logKey(target.week,target.day))
      + sessionHTML(target.week,target.day,{context:'today', swapped:!!override, scheduled})
      + backupReminderHTML();
    bindSessionInputs(target.week,target.day);
    return;
  }
  const next=nextTrainingDate(today);
  if(!next){
    app.innerHTML=`<section class="card hero"><div class="hero-kicker">Program complete</div><h2 class="hero-title">12 weeks done</h2><p class="hero-note">Record your Week 12 benchmarks and compare them with Week 1 on the Progress tab.</p></section>${backupReminderHTML()}`;
    return;
  }
  const nw=getProgramWeek(next), nd=dayKeyFromDate(next);
  const daysAway=Math.round((stripTime(next)-stripTime(today))/86400000);
  const beforeStart=w<1;
  app.innerHTML = `
    <section class="card hero">
      <div class="hero-kicker">${beforeStart?`Program starts in ${daysAway} day${daysAway===1?'':'s'}`:'Rest day'}</div>
      <div class="big-number">${formatDate(next)}</div>
      <p class="hero-note">Next: Week ${nw} · ${dayLabel(nd)} · ${sessionName(nw,nd)}</p>
      <div class="hero-actions">
        <button type="button" class="hero-btn" data-open-session="${nw}-${nd}">Preview workout</button>
        ${beforeStart?'':'<button type="button" class="ghost-btn" data-open-chooser>Train today instead</button>'}
      </div>
    </section>
    ${beforeStart?'':missedHTML('')}
    <section class="card"><div class="section-kicker">Current focus · Cycle ${cycleForWeek(clampWeek(nw))}</div><h3>${cycles[cycleForWeek(clampWeek(nw))-1].name}</h3><p class="muted small">${cycles[cycleForWeek(clampWeek(nw))-1].focus}</p></section>
    <div class="callout warn"><strong>Joint rules:</strong> shoulder pain stays at 2/10 or less. No landmine press, dips, push-ups or free-weight chest pressing for now. No squats, lunges, running or jumping.</div>
    ${backupReminderHTML()}`;
}

function warmupHTML(week,day,log){
  const list=warmups[cycleForWeek(week)][day];
  const open=!log.startedAt && !log.completed;
  return `<details class="card warmup-card" ${open?'open':''}>
    <summary><div><div class="section-kicker">Warm-up</div><strong>${list.length} movements · about 8 min</strong></div>${icon('chev','chev')}</summary>
    <div class="warmup-list">${list.map(([n,d],i)=>`<div class="warmup-row"><span class="warmup-num">${i+1}</span><div><strong>${movementTitleHTML(n)}</strong><div class="exercise-meta">${escapeHtml(d)}</div></div></div>`).join('')}</div>
  </details>`;
}
function sessionGoalsHTML(week, exercises){
  const goals=exercises.map(e=>({name:e.name,goal:goalFor(e,week)})).filter(x=>x.goal);
  if(!goals.length) return '';
  return `<details class="card goals-card"><summary><div><div class="section-kicker goal-text">Goals this session</div><strong>${goals.map(g=>escapeHtml(g.name)).join(' · ')}</strong></div>${icon('chev','chev')}</summary>
    <div class="goal-list">${goals.map(g=>`<div class="session-goal"><strong>${escapeHtml(g.name)}</strong><div class="exercise-meta">${escapeHtml(g.goal)}</div></div>`).join('')}</div></details>`;
}
function sessionHTML(week,day,{context='program', swapped=false, scheduled=null}={}){
  const cycleNo=cycleForWeek(week), ex=getExercises(week,day), log=getSessionLog(week,day);
  const {done,total}=setCounts(week,day,log);
  const started=!!log.startedAt;
  const dateText=context==='today'?formatDate(new Date()):formatDate(sessionDate(week,day));
  const firstOpen=ex.findIndex(e=>!exerciseComplete(e,log));
  const pct=total?Math.round(done/total*100):0;
  let clockBtn='';
  if(!log.completed) clockBtn = started
    ? `<button type="button" class="ghost-btn" id="resetSessionTimer">Reset</button>`
    : `<button type="button" class="hero-btn" id="startSessionTimer">Start warm-up</button>`;
  const links = context==='today' ? `<div class="hero-links">
      ${swapped && scheduled ? `<button type="button" class="link-btn" id="backToSchedule">Back to ${dayLabel(scheduled.day)}'s session</button>` : swapped ? `<button type="button" class="link-btn" id="backToSchedule">Clear swap</button>` : ''}
      <button type="button" class="link-btn" data-open-chooser>${icon('swap')}Switch session</button></div>` : '';
  return `
    <section class="card hero">
      <div class="hero-top"><div class="hero-kicker">${dateText} · Week ${week} · Cycle ${cycleNo}${isDeload(week)?' · Deload':''}</div><span class="badge ${log.completed?'good':'on-dark'}">${log.completed?'✓ Done':'~60 min'}</span></div>
      <h2 class="hero-title">${dayLabel(day)} · ${sessionName(week,day)}</h2>
      <p class="hero-note">${progressionNote(week)}</p>
      <div class="hero-clock">
        <div><div class="clock-value" id="sessionElapsed">0:00</div><div class="clock-detail" id="sessionTimeDetail"></div></div>
        ${clockBtn}
      </div>
      <div class="hero-progress"><div class="bar"><span id="setsBar" style="width:${pct}%"></span></div><span id="setsLabel">${done}/${total} sets</span></div>
      ${links}
    </section>
    ${warmupHTML(week,day,log)}
    ${sessionGoalsHTML(week,ex)}
    <div class="section-title">Workout</div>
    <div class="hint-row"><span>Grey numbers are your targets. Tap ${icon('check')} to log them, or type your own.</span><span>Pain 0–2/10 continue · about 3 reduce load or range · sharp or over 3 stop.</span></div>
    <section class="card exercise-list">${ex.map((e,i)=>exerciseHTML(week,day,e,i,log,i===firstOpen)).join('')}</section>
    <div class="section-title">Notes</div>
    <section class="card">
      <textarea id="sessionNotes" placeholder="Energy, shoulder/knee response, anything to change next time...">${escapeHtml(log.notes||'')}</textarea>
      <button id="finishBtn" type="button" class="${log.completed?'secondary':'primary'} full" style="margin-top:12px">${log.completed?'Reopen workout':'Finish workout'}</button>
      <p class="autosave-note">Everything saves automatically as you go.</p>
    </section>`;
}
function exerciseSummary(e,log,sug){
  const rows=(log.exercises?.[e.name]||[]).slice(0,e.sets).filter(r=>rowIsComplete(e.name,r));
  if(!rows.length) return `${e.sets} × ${escapeHtml(e.reps)}${sug?.value!=null?` · ${sug.value} kg`:''}`;
  const u=isCarryExercise(e.name)?' m':'';
  const ws=rows.map(r=>numeric(r.weight));
  const same=ws.every(w=>w===ws[0]);
  const body=same
    ? `${ws[0]?`${ws[0]} kg `:''}× ${rows.map(r=>escapeHtml(r.reps)+u).join(', ')}`
    : rows.map(r=>`${numeric(r.weight)||'BW'}×${escapeHtml(r.reps)}${u}`).join(', ');
  return `${rows.length}/${e.sets} · ${body}`;
}
function suggestionHTML(sug, hidden){
  if(!sug) return '';
  const tag=sug.tag || ({baseline:'from baseline', estimate:'calibration'})[sug.kind] || '';
  return `<div class="suggestion ${sug.kind}" data-suggestion ${hidden?'hidden':''}>
    ${sug.value!=null?`<div class="sug-line"><span>Suggested</span><strong>${sug.value} kg</strong>${tag?`<em>${tag}</em>`:''}</div>`:''}
    <div class="sug-text">${escapeHtml(sug.text)}</div></div>`;
}
function exerciseHTML(week,day,e,index,log,open){
  const saved=log.exercises?.[e.name] || [];
  const enc=encodeURIComponent(e.name);
  const goal=goalFor(e,week);
  const sug=suggestedLoad(e,week,day);
  const targets=setTargets(e,week,day,log);
  const done=exerciseComplete(e,log);
  const anyDone=saved.some(r=>rowIsComplete(e.name,r));
  const unit=isCarryExercise(e.name)?'m':'reps';
  const wPh=t=>t.weight ?? (weightOptional(e.name)?'BW':'–');
  return `<details class="exercise ${done?'done':''}" data-card="${enc}" ${open?'open':''}>
    <summary>
      <span class="ex-index">${done?icon('check'):index+1}</span>
      <div class="ex-head"><div class="ex-title">${escapeHtml(e.name)}${goal?'<span class="badge goal-badge">Goal</span>':''}</div><div class="ex-sub" data-summary>${exerciseSummary(e,log,sug)}</div></div>
      ${icon('chev','chev')}
    </summary>
    <div class="ex-body">
      <div class="ex-meta"><strong>${e.sets} sets · ${escapeHtml(e.reps)}</strong> · rest ${fmtRest(restSecondsFor(e.name))} · ${escapeHtml(e.note)}</div>
      ${videoChipsHTML(e.name)}
      ${suggestionHTML(sug, anyDone)}
      <div class="set-grid">
        <div></div><div class="head">kg</div><div class="head">${unit}</div><div class="head">RIR</div><div class="head">pain</div><div></div>
        ${Array.from({length:e.sets},(_,s)=>{
          const r=saved[s]||{}, t=targets[s];
          const a=(f)=>`data-ex="${enc}" data-set="${s}" data-field="${f}"`;
          return `<div class="set-num">${s+1}</div>
            <input inputmode="decimal" ${a('weight')} value="${escapeHtml(r.weight)}" placeholder="${wPh(t)}" aria-label="Set ${s+1} load in kg">
            <input inputmode="numeric" ${a('reps')} value="${escapeHtml(r.reps)}" placeholder="${t.reps??'–'}" aria-label="Set ${s+1} ${unit}">
            <input inputmode="numeric" ${a('rir')} value="${escapeHtml(r.rir)}" placeholder="–" aria-label="Set ${s+1} reps in reserve">
            <input inputmode="decimal" ${a('pain')} value="${escapeHtml(r.pain)}" placeholder="0" class="${Number(r.pain)>=3?'pain-high':''}" aria-label="Set ${s+1} pain out of 10">
            <button type="button" class="check-btn ${rowIsComplete(e.name,r)?'on':''}" data-check="${enc}" data-set="${s}" aria-label="Log set ${s+1}">${icon('check')}</button>`;
        }).join('')}
      </div>
    </div>
  </details>`;
}

function bindSessionInputs(week,day){
  activeSession={week,day};
  const key=logKey(week,day);
  const exercises=getExercises(week,day);
  const byName=Object.fromEntries(exercises.map(e=>[e.name,e]));
  const field=(enc,s,f)=>app.querySelector(`[data-ex="${enc}"][data-set="${s}"][data-field="${f}"]`);
  const persistInputs=()=>{
    const entry=getSessionLog(week,day); entry.exercises=entry.exercises||{};
    app.querySelectorAll('[data-ex]').forEach(inp=>{
      const ex=decodeURIComponent(inp.dataset.ex), set=Number(inp.dataset.set), f=inp.dataset.field;
      entry.exercises[ex]=entry.exercises[ex]||[]; entry.exercises[ex][set]=entry.exercises[ex][set]||{};
      entry.exercises[ex][set][f]=inp.value.trim().replace(',','.');
    });
    entry.notes=document.getElementById('sessionNotes')?.value||'';
    logs[key]=entry; saveJSON(STORAGE.logs,logs); return entry;
  };
  const updateHeroProgress=(entry)=>{
    const {done,total}=setCounts(week,day,entry);
    const bar=document.getElementById('setsBar'), lbl=document.getElementById('setsLabel');
    if(bar) bar.style.width=`${total?Math.round(done/total*100):0}%`;
    if(lbl) lbl.textContent=`${done}/${total} sets`;
  };
  const refreshCard=(name)=>{
    const e=byName[name]; if(!e) return null;
    const enc=encodeURIComponent(name);
    const card=app.querySelector(`[data-card="${enc}"]`); if(!card) return null;
    const entry=getSessionLog(week,day);
    const targets=setTargets(e,week,day,entry);
    for(let s=0;s<e.sets;s++){
      const wI=field(enc,s,'weight'), rI=field(enc,s,'reps');
      if(wI) wI.placeholder=targets[s].weight ?? (weightOptional(name)?'BW':'–');
      if(rI) rI.placeholder=targets[s].reps ?? '–';
      card.querySelector(`[data-check][data-set="${s}"]`)?.classList.toggle('on',rowIsComplete(name,entry.exercises?.[name]?.[s]));
    }
    const sug=suggestedLoad(e,week,day);
    card.querySelector('[data-summary]').innerHTML=exerciseSummary(e,entry,sug);
    const sugEl=card.querySelector('[data-suggestion]');
    if(sugEl) sugEl.hidden=(entry.exercises?.[name]||[]).some(r=>rowIsComplete(name,r));
    const wasDone=card.classList.contains('done'), nowDone=exerciseComplete(e,entry);
    card.classList.toggle('done',nowDone);
    card.querySelector('.ex-index').innerHTML=nowDone?icon('check'):String(exercises.indexOf(e)+1);
    updateHeroProgress(entry);
    return {wasDone,nowDone,card};
  };
  const advanceFrom=(card)=>{
    card.open=false;
    const next=[...app.querySelectorAll('details.exercise')].find(c=>!c.classList.contains('done'));
    if(next){ next.open=true; setTimeout(()=>next.scrollIntoView({behavior:'smooth',block:'start'}),80); }
    else document.getElementById('finishBtn')?.scrollIntoView({behavior:'smooth',block:'center'});
  };
  const registerSet=(name,s)=>{
    const entry=persistInputs();
    const row=entry.exercises?.[name]?.[s];
    const complete=rowIsComplete(name,row);
    if(!complete && row?.completedAt){
      delete row.completedAt;
      if(entry.endedAt && !entry.completed) entry.endedAt=null;
      saveJSON(STORAGE.logs,logs);
    }
    if(complete && !row.completedAt){
      const stamp=nowISO(); row.completedAt=stamp;
      if(!entry.startedAt){
        entry.startedAt=stamp;
        document.getElementById('startSessionTimer')?.remove();
        toast('Session timer started now (warm-up not timed)');
      }
      entry.lastSetAt=stamp;
      if(allSetsComplete(week,day,entry)){ entry.endedAt=stamp; clearRestTimer(); toast('All sets logged. Tap Finish workout.'); }
      else { entry.endedAt=null; startRestTimer(name,s,restSecondsFor(name)); }
      logs[key]=entry; saveJSON(STORAGE.logs,logs);
    }
    const res=refreshCard(name);
    if(res && !res.wasDone && res.nowDone) advanceFrom(res.card);
    updateSessionClock(); syncWakeLock();
  };

  app.querySelectorAll('[data-ex]').forEach(inp=>inp.addEventListener('change',()=>{
    const name=decodeURIComponent(inp.dataset.ex);
    if(inp.dataset.field==='pain'){
      const high=Number(inp.value)>=3;
      inp.classList.toggle('pain-high',high);
      if(high) toast('Pain 3+/10: reduce load or range. Stop if sharp.');
    }
    registerSet(name,Number(inp.dataset.set));
  }));
  app.querySelectorAll('[data-check]').forEach(btn=>btn.addEventListener('click',()=>{
    const enc=btn.dataset.check, name=decodeURIComponent(enc), s=Number(btn.dataset.set);
    const entry=getSessionLog(week,day);
    if(rowIsComplete(name,entry.exercises?.[name]?.[s])){ toast('Already logged. Edit the numbers to change it.'); return; }
    const wI=field(enc,s,'weight'), rI=field(enc,s,'reps');
    const fill=(inp)=>{ if(inp && !inp.value && Number.isFinite(Number(inp.placeholder)) && inp.placeholder!=='') inp.value=inp.placeholder; };
    fill(wI); fill(rI);
    if(!rowIsComplete(name,{weight:wI?.value,reps:rI?.value})){
      toast(weightOptional(name)?'Enter reps first':'Enter load and reps first');
      (rI && !rI.value ? rI : wI)?.focus();
      return;
    }
    document.activeElement?.blur?.();
    registerSet(name,s);
  }));
  document.getElementById('sessionNotes')?.addEventListener('input',persistInputs);

  const startBtn=document.getElementById('startSessionTimer');
  if(startBtn) startBtn.onclick=()=>{
    unlockAudio();
    const entry=persistInputs(); entry.startedAt=nowISO(); entry.lastSetAt=null; entry.endedAt=null;
    logs[key]=entry; saveJSON(STORAGE.logs,logs); render(); toast('Workout timer started');
  };
  const resetBtn=document.getElementById('resetSessionTimer');
  if(resetBtn) resetBtn.onclick=()=>{
    if(!confirm('Reset this session timer and set timestamps? Your weights and reps stay.')) return;
    const entry=persistInputs(); entry.startedAt=null; entry.lastSetAt=null; entry.endedAt=null;
    Object.values(entry.exercises||{}).forEach(sets=>(sets||[]).forEach(r=>{ if(r) delete r.completedAt; }));
    logs[key]=entry; saveJSON(STORAGE.logs,logs); clearRestTimer(); render();
  };
  document.getElementById('finishBtn').onclick=()=>{
    const entry=persistInputs();
    if(entry.completed){
      entry.completed=false; entry.endedAt=null; delete entry.finishedAt;
      logs[key]=entry; saveJSON(STORAGE.logs,logs); render(); return;
    }
    const {done,total}=setCounts(week,day,entry);
    if(done<total && !confirm(`${total-done} of ${total} sets aren't logged. Finish anyway?`)) return;
    entry.completed=true; entry.finishedAt=nowISO();
    if(entry.startedAt) entry.endedAt=entry.lastSetAt||entry.finishedAt;
    logs[key]=entry; saveJSON(STORAGE.logs,logs); clearRestTimer();
    render(); window.scrollTo(0,0); showSummary(week,day);
  };
  document.getElementById('backToSchedule')?.addEventListener('click',()=>{ localStorage.removeItem(STORAGE.override); render(); window.scrollTo(0,0); });
  ensureTimerTick();
}

function sessionBests(week,day,entry){
  const score=sessionScore(week,day), out=[];
  Object.entries(entry.exercises||{}).forEach(([name,sets])=>{
    const rows=(sets||[]).filter(r=>rowIsComplete(name,r));
    if(!rows.length) return;
    const ws=rows.map(r=>numeric(r.weight)).filter(Boolean);
    const prevRows=[];
    Object.entries(logs).forEach(([k,en])=>{
      const p=parseLogKey(k); if(!p || sessionScore(p.week,p.day)>=score) return;
      (en.exercises?.[name]||[]).forEach(r=>{ if(rowIsComplete(name,r)) prevRows.push(r); });
    });
    if(!prevRows.length) return;
    if(!ws.length){
      if(!isChinupExercise(name)) return;
      const best=Math.max(...rows.map(r=>Number(r.reps)));
      const prev=Math.max(...prevRows.filter(r=>!numeric(r.weight)).map(r=>Number(r.reps)),0);
      if(prev>0 && best>prev) out.push({name,text:`${best} reps (previous best ${prev})`});
      return;
    }
    const top=Math.max(...ws);
    const prevTop=Math.max(...prevRows.map(r=>numeric(r.weight)||0),0);
    if(prevTop>0 && top>prevTop) out.push({name,text:`${top} kg (previous best ${prevTop} kg)`});
    else if(prevTop>0 && top===prevTop){
      const repsAt=Math.max(...rows.filter(r=>numeric(r.weight)===top).map(r=>Number(r.reps)));
      const prevRepsAt=Math.max(...prevRows.filter(r=>numeric(r.weight)===top).map(r=>Number(r.reps)),0);
      if(repsAt>prevRepsAt) out.push({name,text:`${repsAt} reps at ${top} kg (previous best ${prevRepsAt})`});
    }
  });
  return out;
}
function showSummary(week,day){
  const entry=getSessionLog(week,day), wl=entryWorkload(entry);
  const {done,total}=setCounts(week,day,entry);
  const dur=sessionDurationMs(entry,false);
  const prevEntry=week>1?getSessionLog(week-1,day):null;
  const prevWl=prevEntry && hasData(prevEntry) ? entryWorkload(prevEntry) : null;
  const change=prevWl && prevWl.tonnage>0 && wl.tonnage>0 ? (wl.tonnage-prevWl.tonnage)/prevWl.tonnage*100 : null;
  const bests=sessionBests(week,day,entry);
  summaryDialog.querySelector('.summary-body').innerHTML=`
    <div class="section-kicker">Week ${week} · ${dayLabel(day)} · ${sessionName(week,day)}</div>
    <h2 style="margin:4px 0 14px">Workout complete</h2>
    <div class="stat-grid">
      <div class="stat"><span>Time</span><strong>${dur?formatDuration(dur):'—'}</strong></div>
      <div class="stat"><span>Sets</span><strong>${done}/${total}</strong></div>
      <div class="stat"><span>Volume</span><strong>${wl.tonnage?fmtKg(wl.tonnage)+' kg':'—'}</strong>${change!==null?`<em class="${change>=0?'up':'down'}">${change>=0?'+':''}${change.toFixed(0)}% vs W${week-1}</em>`:''}</div>
    </div>
    ${bests.length?`<div class="settings-section">New bests</div>${bests.map(b=>`<div class="pr-row">${icon('check')}<div><strong>${escapeHtml(b.name)}</strong><span>${b.text}</span></div></div>`).join('')}`:''}
    ${isDeload(week)?'<p class="muted small">Deload week: lower volume is the point.</p>':''}
    ${entry.notes?`<div class="settings-section">Notes</div><p class="muted small">${escapeHtml(entry.notes)}</p>`:''}`;
  summaryDialog.showModal();
}

function renderProgram(){
  pageTitle.textContent='Program';
  const cur=getProgramWeek(new Date());
  const c=cycleForWeek(selectedWeek);
  app.innerHTML = `
    <div class="week-tabs">${Array.from({length:12},(_,i)=>{
      const w=i+1, all=DAYS.every(d=>getSessionLog(w,d).completed);
      return `<button class="week-pill ${selectedWeek===w?'active':''} ${w===cur?'current':''} ${all?'complete':''}" data-week="${w}">W${w}${isDeload(w)?'<small>deload</small>':''}</button>`;
    }).join('')}</div>
    <div class="day-grid">${DAYS.map(d=>{
      const l=getSessionLog(selectedWeek,d);
      return `<button class="day-btn ${selectedDay===d?'active':''}" data-day="${d}"><span>${dayLabel(d)}${l.completed?' ✓':''}</span><small>${formatShortDate(sessionDate(selectedWeek,d))}</small></button>`;
    }).join('')}</div>
    <section class="card cycle-card"><div class="section-kicker">Cycle ${c} · weeks ${cycles[c-1].weeks[0]}–${cycles[c-1].weeks[3]}</div><h3>${cycles[c-1].name}</h3><p class="muted small">${cycles[c-1].focus}</p></section>
    ${sessionHTML(selectedWeek,selectedDay,{context:'program'})}`;
  app.querySelectorAll('[data-week]').forEach(b=>b.onclick=()=>{selectedWeek=Number(b.dataset.week);render();});
  app.querySelectorAll('[data-day]').forEach(b=>b.onclick=()=>{selectedDay=b.dataset.day;render();});
  app.querySelector('.week-pill.active')?.scrollIntoView({inline:'center',block:'nearest'});
  bindSessionInputs(selectedWeek,selectedDay);
}

// ---------- progress ----------
function liftSeries(lift){
  const pts=[];
  Object.entries(logs).map(([k,e])=>({p:parseLogKey(k),e})).filter(x=>x.p && !isDeload(x.p.week))
    .sort((a,b)=>sessionScore(a.p.week,a.p.day)-sessionScore(b.p.week,b.p.day))
    .forEach(({p,e})=>{
      lift.names.forEach(name=>{
        const rows=(e.exercises?.[name]||[]).filter(r=>rowIsComplete(name,r));
        if(!rows.length) return;
        if(lift.mode==='reps'){
          const best=rows.reduce((a,r)=>Number(r.reps)>Number(a.reps)?r:a,rows[0]);
          const add=numeric(best.weight);
          pts.push({week:p.week, value:Number(best.reps), label:`${best.reps} reps${add?` +${add} kg`:''}`, unit:'reps'});
        } else {
          const weighted=rows.filter(r=>numeric(r.weight)); if(!weighted.length) return;
          const top=Math.max(...weighted.map(r=>numeric(r.weight)));
          const reps=Math.max(...weighted.filter(r=>numeric(r.weight)===top).map(r=>Number(r.reps)));
          pts.push({week:p.week, value:top, label:`${top} kg × ${reps}${isCarryExercise(name)?' m':''}`, unit:'kg'});
        }
      });
    });
  return pts;
}
function sparkline(values){
  const W=300,H=64,p=6;
  if(values.length<2) return `<svg class="spark" viewBox="0 0 ${W} ${H}"><line x1="${p}" y1="${H/2}" x2="${W-p}" y2="${H/2}" class="spark-base"/><circle cx="${W-p}" cy="${H/2}" r="5"/></svg>`;
  const min=Math.min(...values), max=Math.max(...values), span=max-min||1;
  const pts=values.map((v,i)=>[p+i*(W-2*p)/(values.length-1), H-p-((v-min)/span)*(H-2*p)]);
  const line=pts.map(([x,y])=>`${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const area=`${p},${H} ${line} ${W-p},${H}`;
  const [lx,ly]=pts[pts.length-1];
  return `<svg class="spark" viewBox="0 0 ${W} ${H}"><polygon points="${area}" class="spark-area"/><polyline points="${line}"/><circle cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="5"/></svg>`;
}
function liftTrendsHTML(){
  const cards=trendLifts.map(l=>({l,pts:liftSeries(l)})).filter(x=>x.pts.length);
  if(!cards.length) return `<section class="card"><div class="empty">Log a few sessions and your main lifts will chart here.</div></section>`;
  return `<div class="trend-grid">${cards.map(({l,pts})=>{
    const first=pts[0], last=pts[pts.length-1], diff=last.value-first.value;
    const delta=pts.length<2?'first log':`${diff>0?'+':''}${Number.isInteger(diff)?diff:diff.toFixed(1)} ${last.unit}`;
    return `<div class="trend-card"><div class="trend-head"><strong>${l.label}</strong><span class="trend-delta ${diff>0?'up':diff<0?'down':''}">${delta}</span></div>
      <div class="trend-value">${last.label}</div>${sparkline(pts.map(x=>x.value))}
      <div class="trend-foot">${pts.length} session${pts.length===1?'':'s'} · W${first.week}–W${last.week}</div></div>`;
  }).join('')}</div><p class="fine-print">Best set per session. Deload weeks are left out so they don't look like drops.</p>`;
}
function targetSummary(){
  const b=settings.baselines||{}; const bw=profileWeight();
  const chin=numeric(b.chinupMax)||8;
  const dl=numeric(b.deadlift5RM);
  const farmer=numeric(b.farmerCarryTotal)||roundStep(bw*0.70,5);
  const chest=numeric(b.chestPress)||35;
  return [
    {name:'Strict chin-up', value:`${chin} → ${chin+2} reps`, note:`Cycle 1 target. 12-week stretch: ${chin+3}–${chin+5} clean reps.`},
    {name:'Deadlift', value:dl?`${dl} → ${roundStep(dl*1.05,2.5)}+ kg`:'Calibrate in Week 1', note:dl?'Comfortable 5RM target for Cycle 1.':'The first suggested load is deliberately conservative; your logged RIR sets the real baseline.'},
    {name:'Farmer carry', value:`${farmer} → ${roundStep(farmer*1.10,5)}+ kg`, note:'Total load. Build toward 10–20% more over the program at the same distance.'},
    {name:'Chest press', value:`${chest} kg → 4×12`, note:'Pain-free reps first, then increase the machine load.'}
  ];
}
function weeklySummaryHTML(){
  const rows=Array.from({length:12},(_,i)=>{ const week=i+1; return {week,...weeklyWorkload(week),...weeklyTrainingTime(week)}; })
    .filter(r=>r.totalSets>0 || r.sessions>0);
  if(!rows.length) return `<div class="empty">Log your sets and each week's volume and training time will show here.</div>`;
  const max=Math.max(...rows.map(r=>r.tonnage),1);
  return `<div class="week-list">${rows.map((r,i)=>{
    const prev=rows[i-1];
    const change=prev && prev.week===r.week-1 && prev.tonnage>0 && r.tonnage>0 ? (r.tonnage-prev.tonnage)/prev.tonnage*100 : null;
    return `<div class="week-row ${isDeload(r.week)?'deload':''}">
      <div class="week-row-label">W${r.week}${isDeload(r.week)?'<small>deload</small>':''}</div>
      <div class="week-row-main">
        <div class="bar"><span style="width:${Math.max(2,r.tonnage/max*100)}%"></span></div>
        <div class="week-row-meta"><strong>${r.tonnage>0?fmtKg(r.tonnage)+' kg':'—'}</strong>${change===null?'':`<span class="${change>=0?'up':'down'}">${change>=0?'+':''}${change.toFixed(0)}%</span>`}${r.carryKgM>0?`<span>${fmtKg(r.carryKgM)} kg·m carries</span>`:''}${r.sessions?`<span>${formatDuration(r.totalMs)} · ${r.sessions} session${r.sessions===1?'':'s'}</span>`:''}</div>
      </div></div>`;
  }).join('')}</div>`;
}
function latestWorkloadBreakdownHTML(){
  const rows=Array.from({length:12},(_,i)=>({week:i+1,...weeklyWorkload(i+1)})).filter(r=>r.tonnage>0 || r.carryKgM>0);
  if(!rows.length) return '';
  const latest=rows[rows.length-1];
  const items=Object.entries(latest.byExercise).filter(([,v])=>v.tonnage>0 || v.carryKgM>0).sort((a,b)=>(b[1].tonnage+b[1].carryKgM)-(a[1].tonnage+a[1].carryKgM));
  return `<details class="card breakdown-card"><summary><div><div class="section-kicker">Week ${latest.week} breakdown</div><strong>${latest.totalSets} logged sets</strong></div>${icon('chev','chev')}</summary>
    <div class="workload-breakdown">${items.map(([name,v])=>`<div class="breakdown-row"><div><strong>${escapeHtml(name)}</strong><div class="exercise-meta">${v.sets} sets · ${v.reps} ${v.carryKgM>0?'m':'reps'}</div></div><div class="breakdown-value">${v.tonnage>0?fmtKg(v.tonnage)+' kg':fmtKg(v.carryKgM)+' kg·m'}</div></div>`).join('')}</div></details>`;
}
function benchmarksHTML(){
  return `<section class="card bench-list">${benchmarkRows.map(([name,unit])=>`
    <div class="bench-row"><div class="bench-head"><strong>${name}</strong><span>${unit}</span></div>
    <div class="bench-inputs">${[1,4,8,12].map(w=>`<label><span>W${w}</span><input inputmode="decimal" data-bench="${encodeURIComponent(name)}" data-bw="${w}" value="${escapeHtml(benchmarks[name]?.[w]??'')}"></label>`).join('')}</div></div>`).join('')}</section>`;
}
function renderProgress(){
  pageTitle.textContent='Progress';
  let completed=0;
  for(let w=1;w<=12;w++) DAYS.forEach(d=>{ if(getSessionLog(w,d).completed) completed++; });
  const cur=getProgramWeek(new Date());
  app.innerHTML=`
    <section class="card hero">
      <div class="hero-kicker">12-week strength passport</div>
      <h2 class="hero-title">${completed} of 36 sessions done</h2>
      <div class="hero-progress"><div class="bar"><span style="width:${completed/36*100}%"></span></div><span>${cur<1?'Not started':cur>12?'Finished':`Week ${cur}`}</span></div>
      <p class="hero-note">Clean reps and calm joints matter more than maxing out.</p>
    </section>
    <div class="section-title">Lift trends</div>
    ${liftTrendsHTML()}
    <div class="section-title">Targets</div>
    <section class="card"><div class="target-grid">${targetSummary().map(t=>`<div class="target-card"><strong>${t.name}</strong><div class="target-value">${t.value}</div><div class="target-note">${t.note}</div></div>`).join('')}</div></section>
    <div class="section-title">Weekly volume & time</div>
    <section class="card">${weeklySummaryHTML()}<p class="fine-print">Volume is load × reps. Per-hand dumbbell loads are doubled, chin-ups include bodyweight, and carries are counted separately in kg·m. Compare weeks within the same cycle.</p></section>
    ${latestWorkloadBreakdownHTML()}
    <div class="section-title">Benchmarks</div>
    <p class="fine-print" style="margin:0 2px 8px">Test in Weeks 1, 4, 8 and 12. Saves automatically.</p>
    ${benchmarksHTML()}
    <section class="card"><h3>12-week win condition</h3><p class="muted small">Stronger chin-up, stronger deadlift, heavier carry, better physique, with no worsening of shoulder or knee symptoms.</p></section>`;
  app.querySelectorAll('[data-bench]').forEach(inp=>inp.addEventListener('change',()=>{
    const n=decodeURIComponent(inp.dataset.bench), w=inp.dataset.bw;
    benchmarks[n]=benchmarks[n]||{}; benchmarks[n][w]=inp.value.trim();
    saveJSON(STORAGE.benchmarks,benchmarks); toast('Benchmark saved');
  }));
}

function renderHistory(){
  pageTitle.textContent='History';
  const items=Object.entries(logs).map(([k,e])=>({...parseLogKey(k),entry:e})).filter(x=>x.week && hasData(x.entry));
  items.forEach(x=>{ const iso=x.entry.finishedAt||x.entry.endedAt||x.entry.lastSetAt||x.entry.startedAt; x.date=iso?new Date(iso):sessionDate(x.week,x.day); });
  items.sort((a,b)=>(b.date-a.date) || (sessionScore(b.week,b.day)-sessionScore(a.week,a.day)));
  if(!items.length){
    app.innerHTML=`<section class="card"><div class="empty">No sessions logged yet. Your finished workouts will appear here.</div></section>`;
    return;
  }
  const finished=items.filter(x=>x.entry.completed).length;
  app.innerHTML=`<p class="fine-print" style="margin:4px 2px 0">${items.length} session${items.length===1?'':'s'} logged · ${finished} finished. Tap one to view or edit it.</p>`+items.map(x=>{
    const wl=entryWorkload(x.entry), {done,total}=setCounts(x.week,x.day,x.entry), dur=sessionDurationMs(x.entry,false);
    return `<button type="button" class="card history-card" data-open-session="${x.week}-${x.day}">
      <div class="history-top"><span>${formatDate(x.date)}</span><span class="badge ${x.entry.completed?'good':'warn'}">${x.entry.completed?'Done':'In progress'}</span></div>
      <div class="history-title">W${x.week} · ${dayLabel(x.day)} · ${sessionName(x.week,x.day)}</div>
      <div class="history-stats"><span>${done}/${total} sets</span><span>${dur?formatDuration(dur):'not timed'}</span>${wl.tonnage?`<span>${fmtKg(wl.tonnage)} kg</span>`:''}</div>
      ${x.entry.notes?`<div class="history-notes">${escapeHtml(x.entry.notes)}</div>`:''}
    </button>`;
  }).join('');
}

// ---------- backup ----------
function updateBackupStatus(){
  const el=document.getElementById('backupStatus'); if(!el) return;
  const n=Object.values(logs).filter(hasData).length;
  const last=meta.lastBackupAt?new Date(meta.lastBackupAt):null;
  el.textContent=`${n} session${n===1?'':'s'} stored on this device. ${last?`Last backup: ${formatDate(last)}.`:'No backup yet.'}`;
}
async function exportBackup(){
  const data={version:3,app:APP_VERSION,exportedAt:nowISO(),settings,logs,benchmarks};
  const name=`training-backup-${dateKey(new Date())}.json`;
  const json=JSON.stringify(data,null,2);
  const markDone=()=>{ meta.lastBackupAt=nowISO(); saveJSON(STORAGE.meta,meta); updateBackupStatus(); toast('Backup saved'); if(currentView==='today') render(); };
  try{
    const file=new File([json],name,{type:'application/json'});
    if(navigator.canShare?.({files:[file]})){ await navigator.share({files:[file],title:'Training backup'}); markDone(); return; }
  }catch(err){ if(err?.name==='AbortError') return; }
  const url=URL.createObjectURL(new Blob([json],{type:'application/json'}));
  const a=document.createElement('a'); a.href=url; a.download=name; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
  markDone();
}
function importBackup(ev){
  const file=ev.target.files?.[0]; if(!file) return;
  const reader=new FileReader();
  reader.onload=()=>{
    try{
      const d=JSON.parse(reader.result);
      if(!d || typeof d!=='object' || !d.logs) throw new Error('bad');
      if(!confirm(`Replace the data on this phone with this backup${d.exportedAt?` from ${formatDate(new Date(d.exportedAt))}`:''}?`)) return;
      settings=deepSettings(d.settings); logs=d.logs||{}; benchmarks=d.benchmarks||{};
      saveJSON(STORAGE.settings,settings); saveJSON(STORAGE.logs,logs); saveJSON(STORAGE.benchmarks,benchmarks);
      settingsDialog.close(); toast('Backup imported'); render();
    }catch{ alert('Could not read this backup file.'); }
    finally{ ev.target.value=''; }
  };
  reader.readAsText(file);
}
function toast(msg){
  const t=document.createElement('div'); t.className='toast'; t.textContent=msg;
  document.body.appendChild(t); setTimeout(()=>t.remove(),1800);
}

// ---------- settings ----------
function updateBaselineHints(){
  const bw=Number(document.getElementById('bodyweightInput')?.value)||profileWeight();
  const dl=roundStep(bw*0.80,2.5), hip=roundStep(bw*0.90,5), farmer=roundStep(bw*0.70,5);
  const set=(id,txt)=>{ const el=document.getElementById(id); if(el) el.textContent=txt; };
  set('deadliftAutoHint',`If blank: first-session calibration load of about ${dl} kg. This is not an estimated max.`);
  set('chinupAutoHint','If blank: the app assumes 8 and learns from your first logged sets.');
  set('hipAutoHint',`If blank: first-session calibration load of about ${hip} kg, then adjust to the target RIR.`);
  set('farmerAutoHint',`If blank: starting load of about ${farmer} kg total (${roundStep(farmer/2,2.5)} kg per hand).`);
}
function setInput(id,value){ const el=document.getElementById(id); if(el) el.value=value??''; }
function numOrBlank(id){ const v=document.getElementById(id)?.value; return v===''?'':Number(v); }
function numOr(id,fallback){ const v=Number(document.getElementById(id)?.value); return Number.isFinite(v)&&v>0?v:fallback; }
function openSettings(){
  setInput('startDateInput',settings.startDate);
  setInput('ageInput',settings.profile.age); setInput('heightInput',settings.profile.heightCm); setInput('bodyweightInput',settings.profile.bodyweightKg);
  setInput('deadliftBaselineInput',settings.baselines.deadlift5RM); setInput('chinupBaselineInput',settings.baselines.chinupMax);
  setInput('chestBaselineInput',settings.baselines.chestPress); setInput('rowBaselineInput',settings.baselines.dbRow);
  setInput('hipThrustBaselineInput',settings.baselines.hipThrust); setInput('farmerBaselineInput',settings.baselines.farmerCarryTotal);
  setInput('lateralBaselineInput',settings.baselines.lateralRaise); setInput('scaptionBaselineInput',settings.baselines.scaption); setInput('hammerBaselineInput',settings.baselines.hammerCurl);
  document.getElementById('soundPref').checked=!!settings.prefs.sound;
  document.getElementById('wakePref').checked=!!settings.prefs.wakeLock;
  updateBaselineHints(); updateBackupStatus();
  document.getElementById('bodyweightInput').oninput=updateBaselineHints;
  settingsDialog.showModal();
}
function saveSettings(e){
  e.preventDefault();
  settings.startDate=document.getElementById('startDateInput').value||settings.startDate;
  settings.profile={age:numOr('ageInput',settings.profile.age), heightCm:numOr('heightInput',settings.profile.heightCm), bodyweightKg:numOr('bodyweightInput',settings.profile.bodyweightKg)};
  settings.baselines={
    deadlift5RM:numOrBlank('deadliftBaselineInput'), chinupMax:numOrBlank('chinupBaselineInput'), chestPress:numOrBlank('chestBaselineInput'), dbRow:numOrBlank('rowBaselineInput'),
    hipThrust:numOrBlank('hipThrustBaselineInput'), farmerCarryTotal:numOrBlank('farmerBaselineInput'), lateralRaise:numOrBlank('lateralBaselineInput'), scaption:numOrBlank('scaptionBaselineInput'), hammerCurl:numOrBlank('hammerBaselineInput')
  };
  settings.prefs={sound:document.getElementById('soundPref').checked, wakeLock:document.getElementById('wakePref').checked};
  saveJSON(STORAGE.settings,settings);
  selectedWeek=clampWeek(getProgramWeek(new Date()));
  settingsDialog.close(); render(); toast('Settings saved');
}

// ---------- wiring ----------
document.querySelectorAll('[data-app-version]').forEach(el=>el.textContent=`v${APP_VERSION}`);
document.querySelectorAll('.nav-btn').forEach(b=>b.addEventListener('click',()=>{ currentView=b.dataset.view; render(); window.scrollTo(0,0); }));
document.getElementById('settingsBtn').onclick=openSettings;
document.getElementById('saveSettingsBtn').onclick=saveSettings;
document.getElementById('exportBtn').onclick=exportBackup;
document.getElementById('importInput').onchange=importBackup;
document.getElementById('resetBtn').onclick=()=>{
  if(!confirm('Delete all workout logs, benchmarks and settings on this phone? Export a backup first if unsure.')) return;
  Object.values(STORAGE).forEach(k=>localStorage.removeItem(k));
  location.reload();
};
document.getElementById('restTimerAdd')?.addEventListener('click',()=>addRestTime(30));
document.getElementById('restTimerSkip')?.addEventListener('click',()=>clearRestTimer());
document.addEventListener('pointerdown',unlockAudio,{passive:true});
document.addEventListener('visibilitychange',()=>{ if(!document.hidden){ updateRestTimerDock(); updateSessionClock(); } syncWakeLock(); });
window.addEventListener('focus',()=>{ updateRestTimerDock(); updateSessionClock(); });
if('serviceWorker' in navigator){
  window.addEventListener('load',()=>navigator.serviceWorker.register(`./service-worker.js?v=${APP_VERSION}`).then(r=>r.update()).catch(()=>{}));
}
render();
ensureTimerTick();
