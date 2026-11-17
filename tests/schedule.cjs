// Start the static server on port 8000 before running this suite.
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
(async()=>{
  const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',headless:true,args:['--no-sandbox']});
  try{
    const context=await browser.newContext({timezoneId:'Europe/Amsterdam',viewport:{width:390,height:844},serviceWorkers:'block'});
    const page=await context.newPage(), errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.clock.install({time:new Date('2026-11-17T12:00:00+01:00')});
    await page.goto('http://127.0.0.1:8000/',{waitUntil:'networkidle'});
    await page.evaluate(()=>{
      settings=deepSettings({startDate:'2026-10-10'}); logs={};
      for(const s of programmeSessions().filter(s=>sessionScore(s.week,s.day)<sessionScore(6,'sat'))){
        logs[logKey(s.week,s.day)]={completed:true,notes:'Keep my history',exercises:{}};
      }
      logs['w5-wed'].startedAt='2026-11-11T10:00:00Z';
      logs['w5-wed'].endedAt='2026-11-11T11:00:00Z';
      saveJSON(STORAGE.settings,settings);saveJSON(STORAGE.logs,logs);render();
    });
    const history=await page.evaluate(()=>JSON.stringify(logs));
    await page.getByRole('button',{name:'Move remaining programme',exact:true}).click();
    assert.equal(await page.locator('#moveFrom').inputValue(),'w6-sat');
    assert.match(await page.locator('#schedulePreview').innerText(),/Wed,? Nov 18/);
    // Cancel changes nothing.
    await page.locator('#scheduleDialog [aria-label="Close"]').click();
    assert.deepEqual(await page.evaluate(()=>settings.sessionDates),{});
    await page.getByRole('button',{name:'Move remaining programme',exact:true}).click();
    await page.locator('#resumeDate').fill('2026-11-16');
    assert.equal(await page.locator('#applyScheduleMove').isDisabled(),true);
    await page.locator('#resumeDate').fill('2026-11-17');
    await page.locator('#applyScheduleMove').click();
    assert.equal(await page.locator('#scheduleDialog').evaluate(d=>d.open),false);
    const moved=await page.evaluate(()=>({
      dates:['sat','sun','wed'].map(d=>dateKey(sessionDate(6,d))),
      next:scheduledSession(nextTrainingDate()), current:getProgramWeek(new Date()),
      previous:dateKey(sessionDate(5,'wed')), settings:backupData().settings
    }));
    assert.deepEqual(moved.dates,['2026-11-18','2026-11-21','2026-11-22']);
    assert.equal(moved.next.week,6);assert.equal(moved.next.day,'sat');
    assert.equal(moved.previous,'2026-11-11');
    assert.equal(await page.evaluate(()=>JSON.stringify(logs)),history);
    assert.match(await page.locator('#app').innerText(),/Next: Week 6 · Saturday/);
    // Date labels and Today resolve session identity independently of the weekday.
    await page.locator('[data-view="program"]').click();
    await page.locator('[data-week="6"]').click();
    assert.match(await page.locator('[data-day="sat"]').innerText(),/Nov 18/);
    await page.reload({waitUntil:'networkidle'});
    assert.deepEqual(await page.evaluate(()=>settings.sessionDates),moved.settings.sessionDates);
    await page.clock.setSystemTime(new Date('2026-11-18T12:00:00+01:00'));
    await page.evaluate(()=>render());
    assert.equal(await page.locator('[data-card="Deadlift"]').count(),1,'Today must show the moved Saturday workout on Wednesday');
    assert.equal(await page.evaluate(()=>activeSession.day),'sat');
    assert.equal(await page.evaluate(()=>getProgramWeek(new Date())),6);
    // Backup imports retain the moved schedule, including after a second postponement.
    await page.locator('#settingsBtn').click();
    page.on('dialog',d=>d.accept());
    await page.locator('#importInput').setInputFiles({name:'backup.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({logs:JSON.parse(history),settings:moved.settings}))});
    await page.waitForFunction(()=>!document.getElementById('settingsDialog').open);
    assert.deepEqual(await page.evaluate(()=>settings.sessionDates),moved.settings.sessionDates);
    const edge=await page.evaluate(()=>{
      // Reserve a later logged session's date, including partial work.
      logs['w7-sat']={startedAt:'2026-11-25T10:00:00Z',exercises:{}};
      const fixed=dateKey(sessionDate(7,'sat'));
      const plan=scheduleMovePlan('w6-sat','2026-11-21');
      const invalid=deepSettings({sessionDates:{'w6-sat':'2026-02-30','w99-sun':'2026-11-21'}});
      const tail=scheduleMovePlan('w12-wed','2027-04-01');
      return {fixed,plan,invalid:invalid.sessionDates,tail};
    });
    assert.equal(edge.plan.some(s=>s.week===7 && s.day==='sat'),false);
    assert.equal(edge.plan.some(s=>s.to===edge.fixed),false);
    assert.equal(new Set(edge.plan.map(s=>s.to)).size,edge.plan.length);
    assert.ok(edge.plan.every((s,i)=>!i || s.to>edge.plan[i-1].to));
    assert.deepEqual(edge.invalid,{});
    assert.equal(edge.tail.length,1);assert.equal(edge.tail[0].to,'2027-04-03');
    assert.deepEqual(errors,[]);
    console.log('PASS: missed weekend preview/cancel/apply; ordered dates; Today and Program; reload and backup import; repeated breaks; logged-date collisions; invalid dates; programme extension');
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
