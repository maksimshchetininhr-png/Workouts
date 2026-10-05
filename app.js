const APP_VERSION = '4.2';

const STORAGE = {
  settings: 'trainingApp.settings.v1',
  logs: 'trainingApp.logs.v1',
  benchmarks: 'trainingApp.benchmarks.v1',
  restTimer: 'trainingApp.restTimer.v1'
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
  }
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

function deepSettings(raw){
  const out = structuredClone(defaultSettings);
  if(!raw) return out;
  if(raw.startDate) out.startDate = raw.startDate;
  out.profile = {...out.profile, ...(raw.profile||{})};
  out.baselines = {...out.baselines, ...(raw.baselines||{})};
  if(raw.chestStart && !raw.baselines?.chestPress) out.baselines.chestPress = raw.chestStart;
  if(raw.rowStart && !raw.baselines?.dbRow) out.baselines.dbRow = raw.rowStart;
  return out;
}

let settings = deepSettings(loadJSON(STORAGE.settings, defaultSettings));
let logs = loadJSON(STORAGE.logs, {});
let benchmarks = loadJSON(STORAGE.benchmarks, {});
let currentView = 'today';
let selectedWeek = Math.max(1, Math.min(12, getProgramWeek(new Date())));
let selectedDay = dayKeyFromDate(new Date()) || 'sat';
let activeSession = null;
let timerTickHandle = null;
let restAlertedFor = null;

const app = document.getElementById('app');
const pageTitle = document.getElementById('pageTitle');
const settingsDialog = document.getElementById('settingsDialog');

function loadJSON(key, fallback){
  try { return JSON.parse(localStorage.getItem(key)) ?? structuredClone(fallback); }
  catch { return structuredClone(fallback); }
}
function saveJSON(key, value){ localStorage.setItem(key, JSON.stringify(value)); }
function cycleForWeek(w){ return w <= 4 ? 1 : w <= 8 ? 2 : 3; }
function dayKeyFromDate(d){ return ({6:'sat',0:'sun',3:'wed'})[d.getDay()] || null; }
function dayLabel(k){ return ({sat:'Saturday',sun:'Sunday',wed:'Wednesday'})[k]; }
function dayOrder(k){ return ({sat:0,sun:1,wed:2})[k] ?? 0; }
function parseLocalDate(s){ const [y,m,d]=s.split('-').map(Number); return new Date(y,m-1,d,12); }
function getProgramWeek(date){
  const start = parseLocalDate(settings.startDate);
  const diff = Math.floor((stripTime(date)-stripTime(start))/86400000);
  return Math.floor(diff/7)+1;
}
function stripTime(d){ return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime(); }
function formatDate(d){ return new Intl.DateTimeFormat(undefined,{weekday:'short',month:'short',day:'numeric'}).format(d); }
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
  const phase=((week-1)%4)+1;
  if(phase===4){
    base.forEach((e, i)=>{ e.sets = Math.max(2, Math.round(e.sets*0.65)); if(i===0 && e.name==='Deadlift') e.reps = cycle===3 ? '4–5' : '5'; });
  }
  return base;
}
function logKey(week, day){ return `w${week}-${day}`; }
function getSessionLog(week, day){ return logs[logKey(week,day)] || {exercises:{}, notes:'', completed:false, startedAt:null, lastSetAt:null, endedAt:null}; }
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
  return /chin-up|GHD hip extension|Ab wheel|hanging knee raise|Band external rotation|Pallof press/i.test(name);
}
function rowIsComplete(name,row){
  const reps=Number(row?.reps);
  if(!Number.isFinite(reps) || reps<=0) return false;
  if(weightOptional(name)) return true;
  const w=Number(row?.weight);
  return Number.isFinite(w) && w>0;
}
function allSetsComplete(week,day,entry){
  return getExercises(week,day).every(e=>Array.from({length:e.sets},(_,i)=>rowIsComplete(e.name,entry.exercises?.[e.name]?.[i])).every(Boolean));
}
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
  t.endsAt+=seconds*1000; t.seconds+=seconds; saveRestTimer(t); restAlertedFor=null; updateRestTimerDock();
}
function updateRestTimerDock(){
  const dock=document.getElementById('restTimerDock'); if(!dock) return;
  const t=loadRestTimer();
  if(!t){ dock.classList.add('hidden'); return; }
  dock.classList.remove('hidden');
  const remain=Math.max(0,Math.ceil((t.endsAt-Date.now())/1000));
  const mm=Math.floor(remain/60), ss=remain%60;
  const label=document.getElementById('restTimerLabel');
  const value=document.getElementById('restTimerValue');
  if(label) label.textContent=`${t.exercise} · after set ${Number(t.setIndex)+1}`;
  if(value) value.textContent=remain>0?`${mm}:${String(ss).padStart(2,'0')}`:'GO';
  dock.classList.toggle('done',remain===0);
  if(remain===0 && restAlertedFor!==t.endsAt){
    restAlertedFor=t.endsAt;
    if(navigator.vibrate) navigator.vibrate([160,100,160]);
  }
}
function updateSessionClock(){
  if(!activeSession) return;
  const {week,day}=activeSession, entry=getSessionLog(week,day);
  const elapsed=document.getElementById('sessionElapsed');
  const detail=document.getElementById('sessionTimeDetail');
  if(!elapsed || !detail) return;
  if(!entry.startedAt){ elapsed.textContent='Not started'; detail.textContent='Start when you begin the warm-up.'; return; }
  const duration=sessionDurationMs(entry,!entry.endedAt);
  elapsed.textContent=formatDuration(duration);
  if(entry.endedAt) detail.textContent=`${formatClock(entry.startedAt)}–${formatClock(entry.endedAt)} · final set logged`;
  else if(entry.lastSetAt) detail.textContent=`Started ${formatClock(entry.startedAt)} · last set ${formatClock(entry.lastSetAt)}`;
  else detail.textContent=`Started ${formatClock(entry.startedAt)} · warm-up running`;
}
function ensureTimerTick(){
  if(timerTickHandle) clearInterval(timerTickHandle);
  timerTickHandle=setInterval(()=>{ updateSessionClock(); updateRestTimerDock(); },1000);
  updateSessionClock(); updateRestTimerDock();
}
function roundStep(n, step){ return Math.round(n/step)*step; }
function numeric(v){ const n=Number(v); return Number.isFinite(n) && n>0 ? n : null; }
function profileWeight(){ return numeric(settings.profile?.bodyweightKg) || 82; }
function repRange(reps){
  const nums=String(reps).match(/\d+/g)?.map(Number)||[];
  return nums.length ? {min:nums[0], max:nums[1]||nums[0]} : null;
}
function previousExerciseLog(exerciseName, week, day){
  const currentScore=(week-1)*3+dayOrder(day);
  let best=null;
  Object.entries(logs).forEach(([key,entry])=>{
    const m=key.match(/^w(\d+)-(sat|sun|wed)$/); if(!m)return;
    const score=(Number(m[1])-1)*3+dayOrder(m[2]);
    if(score>=currentScore)return;
    const sets=entry.exercises?.[exerciseName];
    if(!sets?.length)return;
    if(!best || score>best.score) best={score,sets};
  });
  return best?.sets || null;
}
function progressionFromLast(e, week, day){
  const prev=previousExerciseLog(e.name,week,day); if(!prev)return null;
  const rows=prev.filter(r=>r && (r.weight!=='' || r.reps!=='')); if(!rows.length)return null;
  const weights=rows.map(r=>Number(r.weight)).filter(w=>Number.isFinite(w) && w>0);
  if(!weights.length)return null;
  const lastWeight=weights[0];
  const pains=rows.map(r=>Number(r.pain)).filter(Number.isFinite);
  const rirs=rows.map(r=>Number(r.rir)).filter(Number.isFinite);
  const reps=rows.map(r=>Number(r.reps)).filter(Number.isFinite);
  const range=repRange(e.reps);
  const maxPain=pains.length?Math.max(...pains):0;
  const minRir=rirs.length?Math.min(...rirs):2;
  if(maxPain>2) return {value:roundStep(lastWeight*0.9,2.5), text:`Reduce from last time (${lastWeight} kg) because pain was >2/10.`, kind:'log'};
  const allTop=range && reps.length>=Math.min(e.sets,rows.length) && reps.every(r=>r>=range.max);
  if(allTop && minRir>=1){
    const step = /Deadlift|Hip thrust/.test(e.name)?5 : /DB row|1-arm DB row|Hammer curl/.test(e.name)?2 : /lateral|scaption/i.test(e.name)?1 : /chest press/i.test(e.name)?2.5 : 2.5;
    return {value:roundStep(lastWeight+step, step<2?1:step), text:`Progress from ${lastWeight} kg: all logged sets reached the top of the rep range with room left.`, kind:'log'};
  }
  return {value:lastWeight, text:`Repeat ${lastWeight} kg and beat reps/quality before adding load.`, kind:'log'};
}
function baselineSuggestion(e,week){
  const phase=((week-1)%4)+1;
  const b=settings.baselines||{}; const bw=profileWeight();
  const factors=[0.80,0.85,0.90,0.70];
  if(e.name==='Deadlift'){
    const base=numeric(b.deadlift5RM);
    if(base) return {value:roundStep(base*factors[phase-1],2.5), text:`Based on your ${base} kg comfortable 5RM baseline.`, kind:'baseline'};
    return {value:roundStep(bw*0.80,2.5), text:`Conservative starter estimate from ${bw} kg bodyweight. Treat this as a calibration load, not a strength prediction.`, kind:'estimate'};
  }
  if(e.name==='Strict chin-up'){
    const max=numeric(b.chinupMax)||8; const pct=[0.62,0.68,0.72,0.55][phase-1];
    const reps=Math.max(4,Math.min(8,Math.floor(max*pct)));
    return {value:null,text:`Bodyweight · aim ~${reps} reps/set. Baseline max: ${max} clean reps.`,kind:numeric(b.chinupMax)?'baseline':'estimate'};
  }
  if(e.name==='Weighted / strict chin-up'){
    return {value:null,text:'Start at bodyweight. When 4 × 6 is clean at ≥2 RIR and pain ≤2/10, add 2.5 kg.',kind:'rule'};
  }
  if(e.name==='Chest-supported DB row' || e.name==='1-arm DB row'){
    const v=numeric(b.dbRow)||16; return {value:v,text:`${v} kg/hand starting point. Add load only after the top rep target is clean.`,kind:numeric(b.dbRow)?'baseline':'estimate'};
  }
  if(e.name==='Machine chest press'){
    const v=numeric(b.chestPress)||35; return {value:v,text:`${v} kg starting point. Reach all sets at 12 pain-free reps before increasing.`,kind:numeric(b.chestPress)?'baseline':'estimate'};
  }
  if(e.name==='Hip thrust'){
    const base=numeric(b.hipThrust); if(base) return {value:roundStep(base*0.85,5),text:`Based on your ${base} kg 8–10RM baseline.`,kind:'baseline'};
    return {value:roundStep(bw*0.90,5),text:`Conservative starter estimate from bodyweight. Adjust to ~3 RIR on the first set.`,kind:'estimate'};
  }
  if(e.name==='Farmer carry'){
    const base=numeric(b.farmerCarryTotal); const total=base||roundStep(bw*0.70,5);
    return {value:total,text:`~${total} kg total (${roundStep(total/2,2.5)} kg/hand) for 30–40 m.`,kind:base?'baseline':'estimate'};
  }
  if(e.name==='Suitcase carry'){
    const base=numeric(b.farmerCarryTotal); const per=base?roundStep(base/2,2.5):roundStep(bw*0.35,2.5);
    return {value:per,text:`~${per} kg in one hand; keep torso upright.`,kind:base?'baseline':'estimate'};
  }
  if(e.name==='DB lateral raise'){
    const v=numeric(b.lateralRaise)||4; return {value:v,text:`${v} kg/hand; strict reps first.`,kind:'baseline'};
  }
  if(e.name==='DB scaption'){
    const v=numeric(b.scaption)||4; return {value:v,text:`${v} kg/hand while completely shoulder-friendly.`,kind:'baseline'};
  }
  if(e.name==='Hammer curl'){
    const v=numeric(b.hammerCurl)||10; return {value:v,text:`${v} kg/hand; use double progression.`,kind:'baseline'};
  }
  if(/Cable|Leg curl|Seated or cable row/.test(e.name)) return {value:null,text:'Machine stacks vary: choose a load that leaves ~3 RIR in Week 1, then log it as your baseline.',kind:'rule'};
  if(/GHD hip extension/.test(e.name)) return {value:null,text:'Start bodyweight. Add a light plate only after 15 controlled reps are easy.',kind:'rule'};
  return null;
}
function suggestedLoad(e,week,day){ return progressionFromLast(e,week,day) || baselineSuggestion(e,week); }
function goalFor(e,week){ return goalMap[cycleForWeek(week)]?.[e.name] || null; }

function isCarryExercise(name){ return /Farmer carry|Suitcase carry/i.test(name); }
function isChinupExercise(name){ return /chin-up/i.test(name); }
function perHandFactor(name){
  if(/Chest-supported DB row|1-arm DB row|DB lateral raise|DB scaption|Hammer curl|Rear-delt raise|DB triceps/i.test(name)) return 2;
  return 1;
}
function weeklyWorkload(week){
  const bw=profileWeight();
  const result={tonnage:0, carryKgM:0, totalSets:0, totalReps:0, byExercise:{}};
  ['sat','sun','wed'].forEach(day=>{
    const entry=getSessionLog(week,day);
    Object.entries(entry.exercises||{}).forEach(([name,sets])=>{
      const ex=result.byExercise[name] ||= {tonnage:0,carryKgM:0,sets:0,reps:0};
      (sets||[]).forEach(row=>{
        if(!row) return;
        const reps=Number(row.reps);
        if(!Number.isFinite(reps) || reps<=0) return;
        const rawWeight=Number(row.weight);
        const hasWeight=Number.isFinite(rawWeight) && rawWeight>0;
        const factor=perHandFactor(name);
        ex.sets += 1; result.totalSets += 1;
        ex.reps += reps; result.totalReps += reps;
        if(isCarryExercise(name)){
          if(hasWeight){
            const sideFactor=/Suitcase carry/i.test(name)?2:1;
            const work=rawWeight*reps*sideFactor;
            ex.carryKgM += work; result.carryKgM += work;
          }
          return;
        }
        let effectiveLoad = hasWeight ? rawWeight : 0;
        if(isChinupExercise(name)) effectiveLoad = bw + (hasWeight ? rawWeight : 0);
        if(effectiveLoad>0){
          const work=effectiveLoad*reps*factor;
          ex.tonnage += work; result.tonnage += work;
        }
      });
    });
  });
  return result;
}
function workloadWeeks(){ return Array.from({length:12},(_,i)=>({week:i+1,...weeklyWorkload(i+1)})); }
function weeklyTrainingTime(week){
  const sessions=['sat','sun','wed'].map(day=>getSessionLog(week,day)).map(entry=>sessionDurationMs(entry,false)).filter(ms=>Number.isFinite(ms) && ms>0);
  return {totalMs:sessions.reduce((a,b)=>a+b,0), sessions:sessions.length, avgMs:sessions.length?sessions.reduce((a,b)=>a+b,0)/sessions.length:0};
}
function trainingTimeHTML(){
  const rows=Array.from({length:12},(_,i)=>({week:i+1,...weeklyTrainingTime(i+1)}));
  if(!rows.some(r=>r.sessions)) return `<div class="empty">Start the warm-up timer and log sets to see your training time here.</div>`;
  return `<div class="time-week-list">${rows.map(r=>`<div class="time-week-row"><strong>W${r.week}</strong><span>${r.sessions?`${formatDuration(r.totalMs)} total · ${formatDuration(r.avgMs)} avg · ${r.sessions} session${r.sessions===1?'':'s'}`:'—'}</span></div>`).join('')}</div>`;
}
function fmtKg(n){ return Math.round(n).toLocaleString(); }
function workloadTrendHTML(){
  const rows=workloadWeeks();
  const hasAny=rows.some(r=>r.tonnage>0 || r.carryKgM>0);
  if(!hasAny) return `<div class="empty">Log your working sets and weekly workload will appear here.</div>`;
  const max=Math.max(...rows.map(r=>r.tonnage),1);
  return `<div class="workload-list">${rows.map((r,i)=>{
    const prev=i>0?rows[i-1]:null;
    const change=prev && prev.tonnage>0 && r.tonnage>0 ? ((r.tonnage-prev.tonnage)/prev.tonnage)*100 : null;
    const width=Math.max(2,(r.tonnage/max)*100);
    return `<div class="workload-row"><div class="workload-week">W${r.week}</div><div class="workload-main"><div class="workload-bar"><span style="width:${width}%"></span></div><div class="workload-meta"><strong>${r.tonnage>0?fmtKg(r.tonnage)+' kg':'—'}</strong>${change===null?'':`<span class="${change>=0?'up':'down'}">${change>=0?'+':''}${change.toFixed(1)}%</span>`}${r.carryKgM>0?`<span>${fmtKg(r.carryKgM)} kg·m carries</span>`:''}</div></div></div>`;
  }).join('')}</div>`;
}
function latestWorkloadBreakdownHTML(){
  const rows=workloadWeeks().filter(r=>r.tonnage>0 || r.carryKgM>0);
  if(!rows.length) return '';
  const latest=rows[rows.length-1];
  const items=Object.entries(latest.byExercise).filter(([,v])=>v.tonnage>0 || v.carryKgM>0).sort((a,b)=>(b[1].tonnage+b[1].carryKgM)-(a[1].tonnage+a[1].carryKgM));
  return `<section class="card"><div class="row between"><h3>Week ${latest.week} breakdown</h3><span class="badge">${latest.totalSets} logged sets</span></div><div class="workload-breakdown">${items.map(([name,v])=>`<div class="breakdown-row"><div><strong>${name}</strong><div class="exercise-meta">${v.sets} sets · ${v.reps} reps${v.carryKgM>0?' / m':''}</div></div><div class="breakdown-value">${v.tonnage>0?fmtKg(v.tonnage)+' kg':fmtKg(v.carryKgM)+' kg·m'}</div></div>`).join('')}</div></section>`;
}

function sessionGoalsHTML(week, exercises){
  const goals=exercises.map(e=>({name:e.name,goal:goalFor(e,week)})).filter(x=>x.goal);
  if(!goals.length) return '';
  return `<div class="section-title">Goals this session</div><section class="card session-goals">${goals.map(g=>`<div class="session-goal"><span class="session-goal-icon">🎯</span><div><strong>${g.name}</strong><div class="exercise-meta">${g.goal}</div></div></div>`).join('')}</section>`;
}

function targetSummary(){
  const b=settings.baselines||{}; const bw=profileWeight();
  const chin=numeric(b.chinupMax)||8;
  const dl=numeric(b.deadlift5RM);
  const farmer=numeric(b.farmerCarryTotal)||roundStep(bw*0.70,5);
  const chest=numeric(b.chestPress)||35;
  return [
    {name:'Strict chin-up', value:`${chin} → ${chin+2} reps`, note:`Cycle 1 target; 12-week stretch target ${chin+3}–${chin+5} clean reps.`},
    {name:'Deadlift', value:dl?`${dl} → ${roundStep(dl*1.05,2.5)}+ kg`:'Calibrate in Week 1', note:dl?'Comfortable 5RM / working-strength target for Cycle 1.':'First suggested work set is intentionally conservative; your logged RIR will set the real baseline.'},
    {name:'Farmer carry', value:`${farmer} → ${roundStep(farmer*1.10,5)}+ kg total`, note:'Build toward ~10–20% more load over the program for the same distance.'},
    {name:'Chest press', value:`${chest} kg → 4×12`, note:'First goal is pain-free rep progression; only then increase the machine load.'}
  ];
}

function render(){
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active', b.dataset.view===currentView));
  if(currentView==='today') renderToday();
  if(currentView==='program') renderProgram();
  if(currentView==='progress') renderProgress();
  if(currentView==='backup') renderBackup();
}

function renderToday(){
  pageTitle.textContent='Today';
  const today=new Date(); const w=getProgramWeek(today); const dk=dayKeyFromDate(today);
  if(w>=1 && w<=12 && dk){
    app.innerHTML = sessionHTML(w,dk,true);
    bindSessionInputs(w,dk);
    return;
  }
  const next=nextTrainingDate(today);
  if(!next){ app.innerHTML=`<div class="card"><div class="empty">Your 12-week program has finished. Check Progress for your final benchmarks.</div></div>`; return; }
  const nw=getProgramWeek(next), nd=dayKeyFromDate(next);
  app.innerHTML = `
    <section class="card hero">
      <div class="muted small">${w<1?'PROGRAM STARTS':'REST / RECOVERY DAY'}</div>
      <div class="big-number" style="margin-top:8px">${formatDate(next)}</div>
      <p class="muted">Next session: Week ${nw} · ${dayLabel(nd)}</p>
      <button class="primary" id="openNext" style="background:#fff;color:#111827">Open next workout</button>
    </section>
    <section class="card"><h3>Current focus</h3><p class="muted">${cycles[cycleForWeek(Math.max(1,Math.min(12,nw)))-1].focus}</p></section>
    <div class="callout warn"><strong>Joint rules:</strong> shoulder pain should stay ≤2/10. No landmine press, dips, push-ups or free-weight chest pressing for now. No squats, lunges, running or jumping.</div>`;
  document.getElementById('openNext').onclick=()=>{ selectedWeek=nw; selectedDay=nd; currentView='program'; render(); };
}

function warmupHTML(week,day,log){
  const list=warmups[cycleForWeek(week)][day];
  const started=!!log.startedAt;
  return `<div class="section-title">Warm-up · ~8 min</div><section class="card warmup-card">
    <div class="session-clock">
      <div><div class="clock-kicker">SESSION TIMER</div><div class="clock-value" id="sessionElapsed">${started?formatDuration(sessionDurationMs(log,!log.endedAt)):'Not started'}</div><div class="exercise-meta" id="sessionTimeDetail">${started?`Started ${formatClock(log.startedAt)}`:'Start when you begin the warm-up.'}</div></div>
      <div class="clock-actions">${started?`<button type="button" class="secondary compact" id="resetSessionTimer">Reset</button>`:`<button type="button" class="primary compact" id="startSessionTimer">Start warm-up</button>`}</div>
    </div>
    ${list.map(([n,d],i)=>`<div class="warmup-row"><span class="warmup-num">${i+1}</span><div><strong>${n}</strong><div class="exercise-meta">${d}</div></div></div>`).join('')}
  </section>`;
}
function sessionHTML(week,day,isToday=false){
  const cycleNo=cycleForWeek(week), cycle=cycles[cycleNo-1], ex=getExercises(week,day), log=getSessionLog(week,day);
  const dateLine=isToday?formatDate(new Date()):`Week ${week}`;
  return `
    <section class="card hero">
      <div class="row between wrap"><div><div class="muted small">${dateLine} · Cycle ${cycleNo}</div><h2 style="margin-top:5px">${dayLabel(day)} · ${cycle.name}</h2></div><span class="badge ${log.completed?'good':''}">${log.completed?'✓ Completed':'~60 min'}</span></div>
      <p class="muted small" style="margin-bottom:0">${progressionNote(week)}</p>
    </section>
    ${warmupHTML(week,day,log)}
    ${sessionGoalsHTML(week,ex)}
    <div class="section-title">Workout</div>
    <section class="card">
      ${ex.map((e,i)=>exerciseHTML(week,day,e,i,log)).join('')}
    </section>
    <div class="section-title">Session notes</div>
    <section class="card">
      <textarea id="sessionNotes" placeholder="Energy, shoulder/knee response, anything to change next time...">${escapeHtml(log.notes||'')}</textarea>
      <div class="row" style="margin-top:12px"><button id="saveSession" class="primary full">Save workout</button></div>
      <div class="row" style="margin-top:8px"><button id="toggleComplete" class="secondary full">${log.completed?'Mark as not completed':'Mark completed'}</button></div>
    </section>
    <div class="callout warn"><strong>Pain rule:</strong> 0–2/10 continue; around 3/10 reduce load/ROM; sharp or >3/10 stop that exercise. Symptoms should settle back to baseline by the next day.</div>`;
}
function escapeHtml(s){ return String(s).replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[m])); }
function exerciseHTML(week,day,e,index,log){
  const saved=log.exercises[e.name] || [];
  const goal=goalFor(e,week); const suggestion=suggestedLoad(e,week,day);
  const suggestedText=suggestion ? `<div class="suggestion ${suggestion.kind==='estimate'?'estimated':''}"><strong>Suggested:</strong> ${suggestion.value!==null?`${suggestion.value} kg · `:''}${suggestion.text}${suggestion.value!==null?`<br><button type="button" class="use-suggestion" data-use-suggestion="${encodeURIComponent(e.name)}" data-suggested="${suggestion.value}">Use ${suggestion.value} kg for all sets</button>`:''}</div>` : '';
  const goalText=goal ? `<div class="goal-strip"><span>🎯</span><div><strong>Working toward</strong><br>${goal}</div></div>` : '';
  return `<div class="exercise">
    <div class="row between"><div><div class="row wrap" style="gap:6px"><h3>${e.name}</h3>${goal?'<span class="badge goal-badge">GOAL</span>':''}</div><div class="exercise-meta">${e.sets} sets · ${e.reps} · <span class="rest-prescription">rest ${Math.floor(restSecondsFor(e.name)/60)}:${String(restSecondsFor(e.name)%60).padStart(2,'0')}</span></div></div><span class="badge">${index+1}</span></div>
    <div class="exercise-meta">${e.note}</div>
    ${goalText}${suggestedText}
    <div class="set-grid">
      <div></div><div class="head">kg</div><div class="head">${isCarryExercise(e.name)?'m':'reps'}</div><div class="head">RIR</div><div class="head">pain</div>
      ${Array.from({length:e.sets},(_,s)=>{
        const r=saved[s]||{};
        return `<div class="set-num">${s+1}</div>
          <input inputmode="decimal" data-ex="${encodeURIComponent(e.name)}" data-set="${s}" data-field="weight" value="${r.weight??''}" placeholder="–">
          <input inputmode="numeric" data-ex="${encodeURIComponent(e.name)}" data-set="${s}" data-field="reps" value="${r.reps??''}" placeholder="–">
          <input inputmode="numeric" data-ex="${encodeURIComponent(e.name)}" data-set="${s}" data-field="rir" value="${r.rir??''}" placeholder="–">
          <input inputmode="decimal" data-ex="${encodeURIComponent(e.name)}" data-set="${s}" data-field="pain" value="${r.pain??''}" placeholder="0–10">`;
      }).join('')}
    </div>
  </div>`;
}
function bindSessionInputs(week,day){
  activeSession={week,day};
  const persistInputs=()=>{
    const key=logKey(week,day); const entry=getSessionLog(week,day); entry.exercises=entry.exercises||{};
    document.querySelectorAll('[data-ex]').forEach(inp=>{
      const ex=decodeURIComponent(inp.dataset.ex), set=Number(inp.dataset.set), field=inp.dataset.field;
      entry.exercises[ex]=entry.exercises[ex]||[]; entry.exercises[ex][set]=entry.exercises[ex][set]||{};
      entry.exercises[ex][set][field]=inp.value;
    });
    entry.notes=document.getElementById('sessionNotes')?.value||'';
    logs[key]=entry; saveJSON(STORAGE.logs,logs); return entry;
  };
  const registerSetIfComplete=(inp)=>{
    const entry=persistInputs();
    const ex=decodeURIComponent(inp.dataset.ex), set=Number(inp.dataset.set);
    const row=entry.exercises?.[ex]?.[set];
    if(!rowIsComplete(ex,row) || row.completedAt) return;
    const stamp=nowISO(); row.completedAt=stamp;
    if(!entry.startedAt){ entry.startedAt=stamp; toast('Session timer started now — warm-up time was not captured'); }
    entry.lastSetAt=stamp;
    const finished=allSetsComplete(week,day,entry);
    if(finished){ entry.endedAt=stamp; clearRestTimer(); toast(`Final set logged · ${formatDuration(sessionDurationMs(entry,false))}`); }
    else { entry.endedAt=null; startRestTimer(ex,set,restSecondsFor(ex)); }
    logs[logKey(week,day)]=entry; saveJSON(STORAGE.logs,logs); updateSessionClock();
  };
  document.querySelectorAll('[data-ex]').forEach(inp=>inp.addEventListener('change',()=>registerSetIfComplete(inp)));
  document.querySelectorAll('[data-use-suggestion]').forEach(btn=>btn.onclick=()=>{
    const ex=btn.dataset.useSuggestion; const v=btn.dataset.suggested;
    document.querySelectorAll(`[data-ex="${ex}"][data-field="weight"]`).forEach(inp=>{ if(!inp.value) inp.value=v; });
    persistInputs(); toast(`Suggested ${v} kg filled in`);
  });
  const startBtn=document.getElementById('startSessionTimer');
  if(startBtn) startBtn.onclick=()=>{
    const entry=persistInputs(); entry.startedAt=nowISO(); entry.lastSetAt=null; entry.endedAt=null;
    logs[logKey(week,day)]=entry; saveJSON(STORAGE.logs,logs); render(); toast('Workout timer started');
  };
  const resetBtn=document.getElementById('resetSessionTimer');
  if(resetBtn) resetBtn.onclick=()=>{
    if(!confirm('Reset this session timer and set timestamps? Your weights/reps will stay.')) return;
    const entry=persistInputs(); entry.startedAt=null; entry.lastSetAt=null; entry.endedAt=null;
    Object.values(entry.exercises||{}).forEach(sets=>(sets||[]).forEach(r=>{ if(r) delete r.completedAt; }));
    logs[logKey(week,day)]=entry; saveJSON(STORAGE.logs,logs); clearRestTimer(); render();
  };
  document.getElementById('saveSession').onclick=()=>{ persistInputs(); toast('Workout saved'); };
  document.getElementById('toggleComplete').onclick=()=>{ const entry=persistInputs(); entry.completed=!entry.completed; if(entry.completed && entry.startedAt && entry.lastSetAt) entry.endedAt=entry.lastSetAt; if(!entry.completed) entry.endedAt=null; logs[logKey(week,day)]=entry; saveJSON(STORAGE.logs,logs); if(entry.completed) clearRestTimer(); render(); };
  ensureTimerTick();
}
function renderProgram(){
  pageTitle.textContent='Program';
  app.innerHTML = `
    <div class="week-tabs">${Array.from({length:12},(_,i)=>`<button class="week-pill ${selectedWeek===i+1?'active':''}" data-week="${i+1}">W${i+1}</button>`).join('')}</div>
    <div class="day-grid">${['sat','sun','wed'].map(d=>`<button class="day-btn ${selectedDay===d?'active':''}" data-day="${d}">${dayLabel(d)}</button>`).join('')}</div>
    <section class="card cycle-card"><div class="small muted">CYCLE ${cycleForWeek(selectedWeek)} · WEEK ${selectedWeek}</div><h2 style="margin-top:4px">${cycles[cycleForWeek(selectedWeek)-1].name}</h2><p class="muted small">${cycles[cycleForWeek(selectedWeek)-1].focus}</p></section>
    ${sessionHTML(selectedWeek,selectedDay,false)}`;
  document.querySelectorAll('[data-week]').forEach(b=>b.onclick=()=>{selectedWeek=Number(b.dataset.week);renderProgram();});
  document.querySelectorAll('[data-day]').forEach(b=>b.onclick=()=>{selectedDay=b.dataset.day;renderProgram();});
  bindSessionInputs(selectedWeek,selectedDay);
}

function renderProgress(){
  pageTitle.textContent='Progress';
  app.innerHTML=`
    <section class="card hero"><div class="muted small">12-WEEK STRENGTH PASSPORT</div><h2 style="margin-top:6px">Make progress visible</h2><p class="muted small">Record benchmarks in Weeks 1, 4, 8 and 12. Clean reps and joint tolerance matter more than maxing out.</p></section>
    <section class="card"><h3>Your current targets</h3><div class="target-grid">${targetSummary().map(t=>`<div class="target-card"><strong>${t.name}</strong><div class="target-value">${t.value}</div><div class="target-note">${t.note}</div></div>`).join('')}</div></section>
    <section class="card"><div class="row between wrap"><div><h3>Weekly workload</h3><div class="exercise-meta">Rep-based tonnage from your logged sets</div></div><span class="badge">Σ load × reps</span></div>${workloadTrendHTML()}<div class="callout" style="margin-top:12px"><strong>How to use this:</strong> compare the trend mainly within the same cycle and, even better, within the same exercise. DB loads entered per hand are doubled. Chin-ups use bodyweight + added load. Carries are kept separate as kg·m. A higher number is useful only when technique, RIR and joint symptoms stay comparable.</div></section>
    <section class="card"><div class="row between wrap"><div><h3>Training time</h3><div class="exercise-meta">Warm-up start → last logged working set</div></div><span class="badge">⏱ automatic</span></div>${trainingTimeHTML()}</section>
    ${latestWorkloadBreakdownHTML()}
    <section class="card progress-scroll"><table class="progress-table"><thead><tr><th>Benchmark</th><th>Unit</th><th>W1</th><th>W4</th><th>W8</th><th>W12</th></tr></thead><tbody>
      ${benchmarkRows.map(([name,unit])=>`<tr><td>${name}</td><td class="muted">${unit}</td>${[1,4,8,12].map(w=>`<td><input data-bench="${encodeURIComponent(name)}" data-bw="${w}" value="${benchmarks[name]?.[w]??''}"></td>`).join('')}</tr>`).join('')}
    </tbody></table><button id="saveBench" class="primary full" style="margin-top:10px">Save benchmarks</button></section>
    <section class="card"><h3>12-week win condition</h3><p class="muted small">Stronger chin-up, stronger deadlift, heavier carry, better physique, with no worsening of shoulder or knee symptoms.</p></section>`;
  document.getElementById('saveBench').onclick=()=>{
    document.querySelectorAll('[data-bench]').forEach(inp=>{ const n=decodeURIComponent(inp.dataset.bench),w=inp.dataset.bw; benchmarks[n]=benchmarks[n]||{}; benchmarks[n][w]=inp.value; });
    saveJSON(STORAGE.benchmarks,benchmarks); toast('Benchmarks saved');
  };
}

function renderBackup(){
  pageTitle.textContent='Backup';
  const completed=Object.values(logs).filter(x=>x.completed).length;
  app.innerHTML=`
    <section class="card"><h2>Your data</h2><p class="muted">${completed} workouts marked completed. Everything is currently stored on this device in your browser.</p>
      <button id="exportBtn" class="primary full">Export backup (.json)</button>
      <label class="secondary full" style="display:block;text-align:center;margin-top:10px">Import backup<input id="importInput" type="file" accept="application/json" hidden></label>
    </section>
    <section class="card"><h3>How suggestions work</h3><p class="muted small">Known baselines are used first. After you log sessions, the app uses your previous load, reps, RIR and pain to suggest whether to hold, progress, or reduce. Unknown strength movements use conservative bodyweight-based calibration loads rather than pretending age/height can predict your strength; machine stacks use RIR calibration.</p></section><section class="card"><h3>Automatic rest timer</h3><p class="muted small">The timer starts as soon as a working set has enough data to count as completed. Defaults: 3:00 for heavy strength, 2:00–2:30 for compound lifts/carries, 1:30 for accessories and 1:00 for core/prehab. Use +30 s whenever you are not ready to repeat the target performance with good technique.</p></section>
    <section class="card"><h3>Install on iPhone</h3><ol class="muted small" style="padding-left:20px;line-height:1.6"><li>Open the hosted app in Safari.</li><li>Tap Share.</li><li>Choose <strong>Add to Home Screen</strong>.</li></ol><p class="muted small">Once installed and opened once online, the app is cached for offline use.</p></section>
    <section class="card"><button id="resetBtn" class="danger-btn full">Reset all app data</button></section>`;
  document.getElementById('exportBtn').onclick=exportBackup;
  document.getElementById('importInput').onchange=importBackup;
  document.getElementById('resetBtn').onclick=()=>{ if(confirm('Delete all logs, benchmarks and settings?')){ localStorage.clear(); location.reload(); } };
}
function exportBackup(){
  const data={version:2,exportedAt:new Date().toISOString(),settings,logs,benchmarks};
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='training-backup.json'; a.click(); URL.revokeObjectURL(url);
}
function importBackup(ev){
  const file=ev.target.files?.[0]; if(!file)return; const reader=new FileReader(); reader.onload=()=>{ try{ const d=JSON.parse(reader.result); settings=deepSettings(d.settings); logs=d.logs||{}; benchmarks=d.benchmarks||{}; saveJSON(STORAGE.settings,settings); saveJSON(STORAGE.logs,logs); saveJSON(STORAGE.benchmarks,benchmarks); toast('Backup imported'); render(); }catch{ alert('Could not read this backup file.'); } }; reader.readAsText(file);
}
function toast(msg){
  const t=document.createElement('div'); t.textContent=msg; t.style.cssText='position:fixed;left:50%;bottom:165px;transform:translateX(-50%);background:#111827;color:#fff;padding:10px 14px;border-radius:999px;font-weight:800;font-size:12px;z-index:30;box-shadow:0 10px 30px rgba(0,0,0,.2)'; document.body.appendChild(t); setTimeout(()=>t.remove(),1400);
}

function updateBaselineHints(){
  const bw=Number(document.getElementById('bodyweightInput')?.value)||profileWeight();
  const dl=roundStep(bw*0.80,2.5), hip=roundStep(bw*0.90,5), farmer=roundStep(bw*0.70,5);
  const set=(id,txt)=>{ const el=document.getElementById(id); if(el) el.textContent=txt; };
  set('deadliftAutoHint',`If blank: first-session calibration suggestion ≈ ${dl} kg. This is not an estimated max.`);
  set('chinupAutoHint','If blank: app starts conservatively and learns from your first logged sets. Current default is 8 based on your recent training history.');
  set('hipAutoHint',`If blank: first-session calibration suggestion ≈ ${hip} kg, then adjust to target RIR.`);
  set('farmerAutoHint',`If blank: starter suggestion ≈ ${farmer} kg total (${roundStep(farmer/2,2.5)} kg/hand).`);
}
function setInput(id,value){ const el=document.getElementById(id); if(el) el.value=value??''; }
function numOrBlank(id){ const v=document.getElementById(id)?.value; return v===''?'':Number(v); }
document.querySelectorAll('.nav-btn').forEach(b=>b.addEventListener('click',()=>{currentView=b.dataset.view;render();}));
document.getElementById('settingsBtn').onclick=()=>{
  setInput('startDateInput',settings.startDate);
  setInput('ageInput',settings.profile.age); setInput('heightInput',settings.profile.heightCm); setInput('bodyweightInput',settings.profile.bodyweightKg);
  setInput('deadliftBaselineInput',settings.baselines.deadlift5RM); setInput('chinupBaselineInput',settings.baselines.chinupMax);
  setInput('chestBaselineInput',settings.baselines.chestPress); setInput('rowBaselineInput',settings.baselines.dbRow);
  setInput('hipThrustBaselineInput',settings.baselines.hipThrust); setInput('farmerBaselineInput',settings.baselines.farmerCarryTotal);
  setInput('lateralBaselineInput',settings.baselines.lateralRaise); setInput('scaptionBaselineInput',settings.baselines.scaption); setInput('hammerBaselineInput',settings.baselines.hammerCurl);
  updateBaselineHints();
  document.getElementById('bodyweightInput').oninput=updateBaselineHints;
  settingsDialog.showModal();
};
document.getElementById('saveSettingsBtn').onclick=(e)=>{
  e.preventDefault();
  settings.startDate=document.getElementById('startDateInput').value||defaultSettings.startDate;
  settings.profile={age:Number(document.getElementById('ageInput').value)||36,heightCm:Number(document.getElementById('heightInput').value)||181,bodyweightKg:Number(document.getElementById('bodyweightInput').value)||82};
  settings.baselines={
    deadlift5RM:numOrBlank('deadliftBaselineInput'), chinupMax:numOrBlank('chinupBaselineInput'), chestPress:numOrBlank('chestBaselineInput'), dbRow:numOrBlank('rowBaselineInput'),
    hipThrust:numOrBlank('hipThrustBaselineInput'), farmerCarryTotal:numOrBlank('farmerBaselineInput'), lateralRaise:numOrBlank('lateralBaselineInput'), scaption:numOrBlank('scaptionBaselineInput'), hammerCurl:numOrBlank('hammerBaselineInput')
  };
  saveJSON(STORAGE.settings,settings); selectedWeek=Math.max(1,Math.min(12,getProgramWeek(new Date()))); settingsDialog.close(); render();
};

document.getElementById('restTimerAdd')?.addEventListener('click',()=>addRestTime(30));
document.getElementById('restTimerSkip')?.addEventListener('click',()=>clearRestTimer());
document.addEventListener('visibilitychange',()=>{ if(!document.hidden){ updateRestTimerDock(); updateSessionClock(); } });
window.addEventListener('focus',()=>{ updateRestTimerDock(); updateSessionClock(); });
if('serviceWorker' in navigator){ window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').then(r=>r.update()).catch(()=>{})); }
render();
ensureTimerTick();
