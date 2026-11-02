const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const {chromium} = require('playwright');
const program = JSON.parse(vm.runInNewContext(fs.readFileSync('program.js','utf8')+'\nJSON.stringify(bundledProgram)'));
const markdown = fs.readFileSync('docs/training-program-weeks5-12-readable.md','utf8');

// Independently compare the supplied readable tables with every JSON prescription.
let week,day,variant,rows=0;
for(const line of markdown.split('\n')){
  const heading=line.match(/^## Week (\d+)/);
  if(heading) week=Number(heading[1]);
  const session=line.match(/^### (Sat|Sun|Wed)(.*)/);
  if(session){day={Sat:'sat',Sun:'sun',Wed:'wed'}[session[1]];variant=session[2].includes('CF')?'cf':'regular';rows=0;}
  const row=line.match(/^\| ([^|]+) \| (\d+) × ([^|]+) \|$/);
  if(row){
    const raw=program.sessions[`w${week}-${day}`];
    const exercise=(day==='wed'?raw[variant]:raw).exercises[rows++];
    assert.equal(exercise.name,row[1].trim());
    assert.equal(exercise.sets,Number(row[2]));
    assert.equal(exercise.reps,row[3].trim().replace(/ sec$/,''));
  }
}

(async()=>{
  const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',headless:true,args:['--no-sandbox']});
  try{
    const context=await browser.newContext({viewport:{width:390,height:844}});
    const page=await context.newPage();
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto('http://127.0.0.1:8000/',{waitUntil:'networkidle'});
    assert.equal(await page.evaluate(()=>validProgram(bundledProgram)),true);
    await page.evaluate(()=>{
      logs={'w2-sat':{startedAt:'2026-10-17T08:00:00Z',endedAt:'2026-10-17T09:00:00Z',notes:'Preserve my history',exercises:{Deadlift:[{weight:70,reps:6}]}}};
      saveJSON(STORAGE.logs,logs);
    });
    const before=await page.evaluate(()=>JSON.stringify(logs));
    await page.reload({waitUntil:'networkidle'});
    assert.equal(await page.evaluate(()=>JSON.stringify(logs)),before);
    const early=await page.evaluate(()=>getExercises(1,'sat'));
    assert.deepEqual(early[0],{name:'Deadlift',sets:4,reps:'5–7',note:'Main strength lift. Build up gradually; one hard hinge day.'});
    assert.ok(!early.some(e=>e.name.includes('knee rehab')));
    await page.locator('[data-view="program"]').click();
    let count=0;
    for(let w=5;w<=12;w++){
      await page.locator(`[data-week="${w}"]`).click();
      for(const d of ['sat','sun','wed']){
        await page.locator(`[data-day="${d}"]`).click();
        for(const gym of d==='wed'?['regular','cf']:['cf']){
          if(d==='wed') await page.locator(`[data-gym-type="${gym}"]`).click();
          const raw=program.sessions[`w${w}-${d}`];
          const expected=d==='wed'?raw[gym]:raw;
          const actual=await page.evaluate(({w,d})=>({exercises:getExercises(w,d),warmup:getWarmup(w,d)}),{w,d});
          assert.deepEqual(actual.warmup,expected.warmup);
          assert.deepEqual(actual.exercises,expected.exercises.map(e=>({...e,startWeightKg:e.startWeightKg??null})));
          assert.equal(await page.locator('[data-card]').count(),expected.exercises.length);
          assert.match(await page.locator('#app').innerText(),/physiotherapist|clinician/);
          const first=page.locator('[data-card]').first();
          if(expected.exercises[0].name.includes('isometric') || expected.exercises[0].name.includes('wall sit')){
            assert.equal((await first.locator('.head').nth(1).innerText()).toLowerCase(),'seconds');
            assert.equal(await first.locator('[data-field="weight"]').first().getAttribute('placeholder'),'BW');
          }
          count++;
        }
      }
    }
    assert.equal(count,32);
    // An explicit user import retains priority, and restoring built-in uses the new programme.
    await page.evaluate(()=>{
      uploadedProgram=structuredClone(bundledProgram);
      uploadedProgram.name='My own programme';
      uploadedProgram.sessions['w5-sat'].exercises[0].sets=1;
      saveJSON(STORAGE.program,uploadedProgram);
    });
    await page.reload({waitUntil:'networkidle'});
    assert.equal(await page.evaluate(()=>getExercises(5,'sat')[0].sets),1);
    await page.locator('#settingsBtn').click();
    page.on('dialog',d=>d.accept());
    await page.locator('#resetProgramBtn').click();
    await page.waitForFunction(()=>uploadedProgram===null);
    assert.equal(await page.evaluate(()=>getExercises(5,'sat')[0].sets),3);
    await page.locator('[data-view="program"]').click();
    await page.locator('[data-week="5"]').click();
    await page.locator('[data-day="sat"]').click();
    await page.locator('[data-check]').first().click();
    assert.equal(await page.locator('[data-check].on').count(),1,'unloaded hold can be logged in seconds');
    assert.equal(await page.evaluate(()=>logs['w5-sat'].exercises['Supported wall sit (knee rehab)'][0].reps),'30');
    assert.equal(await page.evaluate(()=>rowWork('Supported wall sit (knee rehab)',{weight:10,reps:30},82).tonnage),0);
    await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
    await page.waitForFunction(()=>!!navigator.serviceWorker.controller);
    assert.equal(await page.evaluate(async()=>!!(await caches.match('./program.js'))),true);
    await context.setOffline(true);
    await page.reload({waitUntil:'load'});
    assert.equal(await page.evaluate(()=>getExercises(12,'sat')[4].sets),1,'explicit deload counts remain unchanged offline');
    assert.equal(await page.evaluate(()=>logs['w2-sat'].notes),'Preserve my history');
    assert.equal(await page.evaluate(()=>logs['w5-sat'].exercises['Supported wall sit (knee rehab)'][0].reps),'30');
    assert.deepEqual(errors,[]);
    console.log('PASS: readable tables match; all 32 sessions and warmups; seconds labels; history/import preservation; explicit deloads; offline programme');
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
