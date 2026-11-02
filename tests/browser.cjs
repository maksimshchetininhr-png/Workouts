// Run with Playwright installed: NODE_PATH=<playwright node_modules> node tests/browser.cjs
// Start the repository's static server on port 8000 first.
const assert = require('node:assert/strict');
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',headless:true,args:['--no-sandbox']});
  try {
    const context = await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
    const page = await context.newPage();
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto('http://127.0.0.1:8000/',{waitUntil:'networkidle'});
    await page.evaluate(() => {
      logs={
        'w3-sat':{exercises:{Deadlift:[{weight:40,reps:5},{weight:100,reps:6},{weight:100,reps:6}],'Hammer curl':[{weight:16,reps:10}]}},
        'w3-wed':{exercises:{'Deadlift technique':[{weight:60,reps:5}],'Hammer curl':[{weight:8,reps:10}]}},
        'w4-sat':{exercises:{Deadlift:[{weight:85,reps:5}],'Hammer curl':[{weight:14,reps:10}]}}
      };
    });
    const result=await page.evaluate(()=>{
      const deadlift={name:'Deadlift',reps:'5–7',sets:2};
      const curl={name:'Hammer curl',reps:'8–12',sets:2};
      return {
        heavy:suggestedLoad(deadlift,4,'sat'),
        curl:suggestedLoad(curl,4,'sat'),
        targets:setTargets(deadlift,4,'sat',{exercises:{}}),
        nextBlock:suggestedLoad(deadlift,5,'sat'),
        technique:baselineSuggestion({name:'Deadlift technique',reps:'5'},3,'wed'),
        performance:previousPerformance(curl,4,'sat'),
        fallback:previousExerciseLog('Hammer curl',4,'sun'),
        empty:previousExerciseLog('Unlogged exercise',4,'sat')
      };
    });
    assert.equal(result.heavy.referenceWeight,100);
    assert.equal(result.heavy.value,85);
    assert.equal(result.curl.referenceWeight,16);
    assert.deepEqual(result.targets.map(t=>t.weight),[40,85]);
    assert.equal(result.nextBlock.referenceWeight,100,'skip the prior deload');
    assert.equal(result.technique.value,65,'technique uses working load, not ramp set');
    assert.equal(result.performance.load,'16 kg');
    assert.equal(result.fallback.day,'wed','cross-day fallback when no matching day exists');
    assert.equal(result.empty,null);
    console.log('PASS: working-session selection, technique separation, deload targets, next-block baseline');

    await page.evaluate(()=>{
      logs={'w3-sat':{startedAt:'2026-10-17T08:00:00.000Z',endedAt:'2026-10-17T09:00:00.000Z',lastSetAt:'2026-10-17T08:59:00.000Z',completed:true,notes:'Strong 💪 — café',exercises:{Deadlift:[{weight:100,reps:6,rir:2,pain:0,completedAt:'2026-10-17T08:30:00.000Z'}]}}};
      saveJSON(STORAGE.logs,logs);
      const session={warmup:[],exercises:[{name:'Wall sit (knee rehab)',sets:2,reps:'30–45',note:'Keep comfortable'}]};
      uploadedProgram={type:'training-program-v1',version:1,name:'Test custom programme',startWeek:5,endWeek:12,sessions:{}};
      for(let week=5;week<=12;week++) for(const day of DAYS) uploadedProgram.sessions[logKey(week,day)]=day==='wed'?{regular:session,cf:session}:session;
      if(!validProgram(uploadedProgram)) throw new Error('Invalid test programme');
      const exercise=getExercises(5,'sat')[0];
      if(suggestedLoad(exercise,5,'sat').value!==null) throw new Error('Rehab must not auto-progress');
    });
    for(const view of ['program','progress','history','today']){
      await page.locator(`[data-view="${view}"]`).click();
      assert.equal((await page.locator('#pageTitle').innerText()).toLowerCase(),view);
    }
    await page.locator('#settingsBtn').click();
    await page.locator('summary').filter({hasText:'GitHub backup upload'}).click();
    const token='test-token-never-store';
    let consent=true;
    page.on('dialog',dialog=>consent?dialog.accept():dialog.dismiss());
    let readStatus=404, writeStatus=201, requests=[];
    await page.route('https://api.github.com/**',async route=>{
      const req=route.request();
      requests.push({method:req.method(),url:req.url(),headers:req.headers(),body:req.postDataJSON()});
      if(req.method()==='GET') await route.fulfill({status:readStatus,json:readStatus===200?{type:'file',sha:'existing-sha'}:{message:'not found'}});
      else await route.fulfill({status:writeStatus,json:writeStatus<300?{content:{sha:'new-sha'}}:{message:'failure'}});
    });
    const upload=async()=>{
      await page.locator('#githubToken').fill(token);
      await page.locator('#githubBackupBtn').click();
      await page.waitForFunction(()=>!document.getElementById('githubBackupBtn').disabled);
      assert.equal(await page.locator('#githubToken').inputValue(),'');
      const stored=await page.evaluate(()=>JSON.stringify({local:{...localStorage},session:{...sessionStorage}}));
      assert.ok(!stored.includes(token),'token must never enter browser storage');
    };
    await upload();
    assert.equal(requests.length,2);
    assert.equal(requests[0].headers.authorization,`Bearer ${token}`);
    const put=requests[1];
    assert.ok(put.url.endsWith('/repos/maksimshchetininhr-png/Workouts/contents/backups/workouts.json'));
    assert.equal(put.body.branch,'main');
    assert.ok(!('sha' in put.body));
    const backup=JSON.parse(Buffer.from(put.body.content,'base64').toString('utf8'));
    assert.deepEqual(backup.logs,await page.evaluate(()=>logs));
    assert.ok(backup.settings && backup.benchmarks && backup.version===3);
    assert.deepEqual(backup.customProgram,await page.evaluate(()=>uploadedProgram));
    assert.ok(!JSON.stringify(backup).includes(token));
    assert.match(await page.locator('#githubBackupStatus').innerText(),/Backup uploaded/);
    console.log('PASS: explicit GitHub upload, UTF-8 backup with times/loads/reps/notes, token excluded');

    requests=[]; readStatus=200; writeStatus=200;
    await upload();
    assert.equal(requests[1].body.sha,'existing-sha');
    assert.ok(requests[0].url.endsWith('?ref=main'));
    requests=[]; consent=false;
    await upload();
    assert.equal(requests.length,0,'cancel must not send data');
    consent=true;
    for(const [read,write,pattern] of [[403,200,/denied access/],[200,409,/concurrent update/],[200,422,/branch rules/],[200,500,/HTTP 500/]]){
      requests=[]; readStatus=read; writeStatus=write;
      const before=await page.evaluate(()=>meta.lastBackupAt);
      await upload();
      assert.match(await page.locator('#githubBackupStatus').innerText(),pattern);
      assert.equal(await page.evaluate(()=>meta.lastBackupAt),before,'failed uploads cannot mark backup successful');
      assert.equal(requests.length,read===403?1:2);
    }
    await page.unroute('https://api.github.com/**');
    await page.route('https://api.github.com/**',route=>route.abort());
    await upload();
    assert.match(await page.locator('#githubBackupStatus').innerText(),/could not be confirmed/);
    await page.locator('#githubToken').fill(token);
    await page.locator('#settingsDialog button[value="cancel"]').first().click();
    await page.waitForFunction(()=>!document.getElementById('settingsDialog').open && document.getElementById('githubToken').value==='');
    assert.equal(await page.locator('#githubToken').inputValue(),'');
    await page.locator('#settingsBtn').click();
    await page.evaluate(()=>{logs={};uploadedProgram=null;});
    await page.locator('#importInput').setInputFiles({name:'backup.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(backup))});
    await page.waitForFunction(()=>!document.getElementById('settingsDialog').open);
    assert.deepEqual(await page.evaluate(()=>logs),backup.logs);
    assert.deepEqual(await page.evaluate(()=>uploadedProgram),backup.customProgram);
    console.log('PASS: backup import round trip retains workout data and custom programme; rehab behavior preserved');
    assert.deepEqual(errors,[]);
    console.log('PASS: replacement SHA, cancel, denied access, conflict, server/network errors, token cleared on close');
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
