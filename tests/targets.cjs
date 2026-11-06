const assert = require('node:assert/strict');
const {chromium} = require('playwright');

(async()=>{
  const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',headless:true,args:['--no-sandbox']});
  try{
    const context=await browser.newContext({serviceWorkers:'block'});
    const page=await context.newPage();
    await page.goto('http://127.0.0.1:8000/',{waitUntil:'networkidle'});
    const scenarios=await page.evaluate(()=>{
      const e=getExercises(5,'sat').find(e=>e.name==='Deadlift');
      const run=(rows,week=5,entry={exercises:{}})=>{
        logs={'w3-sat':{exercises:{Deadlift:rows}}};
        const exercise=week===5?e:{...e,sets:2,reps:'5'};
        return {suggestion:suggestedLoad(exercise,week,'sat').value,targets:setTargets(exercise,week,'sat',entry)};
      };
      const set=(weight,reps,rir=2)=>({weight,reps,rir});
      const scenarios={
        mixed:run([set(70,6),set(65,6),set(70,6)]),
        reduction:run([set(70,6,1),set(70,5,1),set(70,6,1)]),
        increase:run([set(70,8),set(70,8),set(70,8)]),
        ramp:run([set(40,5),set(70,6),set(70,6)]),
        deload:run([set(40,5),set(70,6),set(70,6)],4),
        saved:run([set(70,6),set(65,6),set(70,6)],5,{exercises:{Deadlift:[set(60,7)]}}),
        unchanged:run([set(70,6),set(70,6),set(70,6)]),
        tooLight:run([set(70,12),set(60,14),set(70,12)])
      };
      logs={};
      settings.baselines.deadlift5RM=100;
      scenarios.baseline=setTargets({...e,sets:2,reps:'5'},4,'sat',{exercises:{}});
      return scenarios;
    });
    console.log('Mixed history:',scenarios.mixed.targets.map(t=>t.weight),'exercise suggestion:',scenarios.mixed.suggestion);
    console.log('Reduction:',scenarios.reduction.targets.map(t=>t.weight),'exercise suggestion:',scenarios.reduction.suggestion);
    assert.deepEqual(scenarios.mixed.targets.map(t=>t.weight),[70,70,70]);
    assert.deepEqual(scenarios.reduction.targets.map(t=>t.weight),[65,65,65]);
    assert.deepEqual(scenarios.increase.targets.map(t=>t.weight),[75,75,75]);
    assert.deepEqual(scenarios.ramp.targets.map(t=>t.weight),[70,70,70]);
    assert.deepEqual(scenarios.deload.targets.map(t=>t.weight),[60,60]);
    assert.deepEqual(scenarios.baseline.map(t=>t.weight),[70,70],'baseline deload is not reduced twice');
    assert.deepEqual(scenarios.saved.targets.map(t=>t.weight),[60,70,70]);
    assert.equal(scenarios.saved.targets[0].reps,7);
    assert.deepEqual(scenarios.unchanged.targets.map(t=>t.reps),[7,6,6]);
    assert.ok(scenarios.tooLight.targets.every(t=>t.weight===scenarios.tooLight.suggestion));
    // Exercise the real Saturday UI and confirm existing entered values survive.
    await page.evaluate(()=>{
      logs={'w3-sat':{exercises:{Deadlift:[{weight:70,reps:6},{weight:65,reps:6},{weight:70,reps:6}]}}};
      currentView='program';selectedWeek=5;selectedDay='sat';render();
    });
    const deadlift=page.locator('[data-card="Deadlift"]');
    await deadlift.locator('summary').click();
    assert.deepEqual(await deadlift.locator('[data-field="weight"]').evaluateAll(inputs=>inputs.map(i=>i.placeholder)),['70','70','70']);
    await deadlift.locator('[data-field="weight"]').first().fill('60');
    await deadlift.locator('[data-field="reps"]').first().fill('7');
    await deadlift.locator('[data-field="reps"]').first().blur();
    await page.evaluate(()=>{saveJSON(STORAGE.logs,logs);});
    await page.reload({waitUntil:'networkidle'});
    assert.equal(await page.evaluate(()=>logs['w5-sat'].exercises.Deadlift[0].weight),'60');
    assert.equal(await page.evaluate(()=>logs['w5-sat'].exercises.Deadlift[0].reps),'7');
    console.log('PASS: uniform repeat/increase/reduction/deload targets; ramp sets excluded; saved values preserved; Saturday UI and persistence');
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
