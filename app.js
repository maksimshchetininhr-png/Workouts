const STORAGE = {
  settings: 'trainingApp.settings.v1',
  logs: 'trainingApp.logs.v1',
  benchmarks: 'trainingApp.benchmarks.v1'
};

const defaultSettings = {
  startDate: '2026-10-10',
  chestStart: 35,
  rowStart: 16
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

const basePrograms = {
  1: {
    sat: [
      ['Deadlift',4,'5–7','Main strength lift. Build up gradually.'],
      ['Strict chin-up',4,'5–8','Neutral or supinated grip; no kipping.'],
      ['Chest-supported DB row',3,'8–12','Start around 16 kg/hand if comfortable.'],
      ['Farmer carry',4,'30–40 m','Heavy, ribs down, shoulders relaxed.'],
      ['Band external rotation',2,'15/side','Shoulder prehab.']
    ],
    sun: [
      ['GHD hip extension',3,'10–15','Controlled tempo.'],
      ['Chest-supported DB row',3,'10–15','Lighter than Saturday.'],
      ['DB lateral raise',3,'12–20','Start around 4 kg.'],
      ['DB scaption',3,'10–15','4 kg if pain-free.'],
      ['Hammer curl',3,'8–12','Start around 10 kg.'],
      ['Ab wheel / hanging knee raise',3,'6–15','Alternate weekly.']
    ],
    wed: [
      ['Machine chest press',4,'8–12','Start around 35 kg; pain-free ROM only.'],
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
      ['Strict chin-up',3,'6–8','Keep pulling strength.'],
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
      ['Weighted / strict chin-up',4,'4–6','Add load only if bodyweight reps are clean.'],
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

let settings = loadJSON(STORAGE.settings, defaultSettings);
let logs = loadJSON(STORAGE.logs, {});
let benchmarks = loadJSON(STORAGE.benchmarks, {});
let currentView = 'today';
let selectedWeek = Math.max(1, Math.min(12, getProgramWeek(new Date())));
let selectedDay = dayKeyFromDate(new Date()) || 'sat';

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
function getSessionLog(week, day){ return logs[logKey(week,day)] || {exercises:{}, notes:'', completed:false}; }

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
  if(!next){
    app.innerHTML=`<div class="card"><div class="empty">Your 12-week program has finished. Check Progress for your final benchmarks.</div></div>`; return;
  }
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

function sessionHTML(week,day,isToday=false){
  const cycleNo=cycleForWeek(week), cycle=cycles[cycleNo-1], ex=getExercises(week,day), log=getSessionLog(week,day);
  const dateLine=isToday?formatDate(new Date()):`Week ${week}`;
  return `
    <section class="card hero">
      <div class="row between wrap"><div><div class="muted small">${dateLine} · Cycle ${cycleNo}</div><h2 style="margin-top:5px">${dayLabel(day)} · ${cycle.name}</h2></div><span class="badge ${log.completed?'good':''}">${log.completed?'✓ Completed':'~60 min'}</span></div>
      <p class="muted small" style="margin-bottom:0">${progressionNote(week)}</p>
    </section>
    <div class="section-title">Workout</div>
    <section class="card">
      ${ex.map((e,i)=>exerciseHTML(week,day,e,i,log)).join('')}
    </section>
    <div class="section-title">Session notes</div>
    <section class="card">
      <textarea id="sessionNotes" placeholder="Energy, shoulder/knee response, anything to change next time...">${escapeHtml(log.notes||'')}</textarea>
      <div class="row" style="margin-top:12px">
        <button id="saveSession" class="primary full">Save workout</button>
      </div>
      <div class="row" style="margin-top:8px">
        <button id="toggleComplete" class="secondary full">${log.completed?'Mark as not completed':'Mark completed'}</button>
      </div>
    </section>
    <div class="callout warn"><strong>Pain rule:</strong> 0–2/10 continue; around 3/10 reduce load/ROM; sharp or >3/10 stop that exercise. Symptoms should settle back to baseline by the next day.</div>`;
}
function escapeHtml(s){ return String(s).replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[m])); }
function exerciseHTML(week,day,e,index,log){
  const saved=log.exercises[e.name] || [];
  return `<div class="exercise">
    <div class="row between"><div><h3>${e.name}</h3><div class="exercise-meta">${e.sets} sets · ${e.reps}</div></div><span class="badge">${index+1}</span></div>
    <div class="exercise-meta">${e.note}</div>
    <div class="set-grid">
      <div></div><div class="head">kg</div><div class="head">reps</div><div class="head">RIR</div><div class="head">pain</div>
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
  const save=()=>{
    const key=logKey(week,day); const entry=getSessionLog(week,day); entry.exercises=entry.exercises||{};
    document.querySelectorAll('[data-ex]').forEach(inp=>{
      const ex=decodeURIComponent(inp.dataset.ex), set=Number(inp.dataset.set), field=inp.dataset.field;
      entry.exercises[ex]=entry.exercises[ex]||[]; entry.exercises[ex][set]=entry.exercises[ex][set]||{};
      entry.exercises[ex][set][field]=inp.value;
    });
    entry.notes=document.getElementById('sessionNotes')?.value||'';
    logs[key]=entry; saveJSON(STORAGE.logs,logs);
  };
  document.getElementById('saveSession').onclick=()=>{ save(); toast('Workout saved'); };
  document.getElementById('toggleComplete').onclick=()=>{ save(); const key=logKey(week,day); logs[key].completed=!logs[key].completed; saveJSON(STORAGE.logs,logs); render(); };
}

function renderProgram(){
  pageTitle.textContent='Program';
  app.innerHTML = `
    <div class="week-tabs">${Array.from({length:12},(_,i)=>`<button class="week-pill ${selectedWeek===i+1?'active':''}" data-week="${i+1}">W${i+1}</button>`).join('')}</div>
    <div class="day-grid">
      ${['sat','sun','wed'].map(d=>`<button class="day-btn ${selectedDay===d?'active':''}" data-day="${d}">${dayLabel(d)}</button>`).join('')}
    </div>
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
    <section class="card"><h3>Install on iPhone</h3><ol class="muted small" style="padding-left:20px;line-height:1.6"><li>Open the hosted app in Safari.</li><li>Tap Share.</li><li>Choose <strong>Add to Home Screen</strong>.</li></ol><p class="muted small">Once installed and opened once online, the app is cached for offline use.</p></section>
    <section class="card"><button id="resetBtn" class="danger-btn full">Reset all app data</button></section>`;
  document.getElementById('exportBtn').onclick=exportBackup;
  document.getElementById('importInput').onchange=importBackup;
  document.getElementById('resetBtn').onclick=()=>{ if(confirm('Delete all logs, benchmarks and settings?')){ localStorage.clear(); location.reload(); } };
}
function exportBackup(){
  const data={version:1,exportedAt:new Date().toISOString(),settings,logs,benchmarks};
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='training-backup.json'; a.click(); URL.revokeObjectURL(url);
}
function importBackup(ev){
  const file=ev.target.files?.[0]; if(!file)return; const reader=new FileReader(); reader.onload=()=>{ try{ const d=JSON.parse(reader.result); settings=d.settings||defaultSettings; logs=d.logs||{}; benchmarks=d.benchmarks||{}; saveJSON(STORAGE.settings,settings); saveJSON(STORAGE.logs,logs); saveJSON(STORAGE.benchmarks,benchmarks); toast('Backup imported'); render(); }catch{ alert('Could not read this backup file.'); } }; reader.readAsText(file);
}
function toast(msg){
  const t=document.createElement('div'); t.textContent=msg; t.style.cssText='position:fixed;left:50%;bottom:92px;transform:translateX(-50%);background:#111827;color:#fff;padding:10px 14px;border-radius:999px;font-weight:800;font-size:12px;z-index:30;box-shadow:0 10px 30px rgba(0,0,0,.2)'; document.body.appendChild(t); setTimeout(()=>t.remove(),1400);
}

document.querySelectorAll('.nav-btn').forEach(b=>b.addEventListener('click',()=>{currentView=b.dataset.view;render();}));
document.getElementById('settingsBtn').onclick=()=>{
  document.getElementById('startDateInput').value=settings.startDate;
  document.getElementById('chestStartInput').value=settings.chestStart;
  document.getElementById('rowStartInput').value=settings.rowStart;
  settingsDialog.showModal();
};
document.getElementById('saveSettingsBtn').onclick=(e)=>{
  e.preventDefault(); settings.startDate=document.getElementById('startDateInput').value||defaultSettings.startDate; settings.chestStart=Number(document.getElementById('chestStartInput').value)||35; settings.rowStart=Number(document.getElementById('rowStartInput').value)||16; saveJSON(STORAGE.settings,settings); selectedWeek=Math.max(1,Math.min(12,getProgramWeek(new Date()))); settingsDialog.close(); render();
};

if('serviceWorker' in navigator){ window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(()=>{})); }
render();
