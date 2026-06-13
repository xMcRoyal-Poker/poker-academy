/* ============================================================
   SCREENS — render functions + drill engine. Vanilla DOM.
   ============================================================ */
window.PT = window.PT || {};

PT.UI = (function () {
  const $ = (sel, el = document) => el.querySelector(sel);
  const app = () => document.getElementById("app");

  /* ---------- helpers ---------- */
  const SUIT = { s: ["♠", "black"], c: ["♣", "black"], h: ["♥", "red"], d: ["♦", "red"] };
  function cardHTML(code) {
    const rank = code.slice(0, -1).replace("T", "10");
    const [sym, cls] = SUIT[code.slice(-1)] || ["?", "black"];
    return `<div class="pcard ${cls}">${rank}${sym}</div>`;
  }
  function toast(msg) {
    const t = document.createElement("div");
    t.className = "toast"; t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 1800);
  }
  const esc = s => (s || "").replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));

  /* ---------- curriculum helpers ---------- */
  function curPhase(s) { return PT.CURRICULUM.phases.find(p => p.id === s.phase); }
  // Current sub-domino module (self-paced)
  function curSession(s) {
    const p = curPhase(s);
    if (!p) return null;
    const list = p.modules || [];
    return list[Math.min(s.moduleIndex || 0, list.length - 1)] || null;
  }
  // Pick 5 drills for this session: prefer matching concepts, prioritize weak spots & SRS-due, fall back to phase
  function pickDrills(s) {
    const sess = curSession(s);
    const wantConcepts = new Set(sess ? sess.concepts : []);
    // Interleaving: a session can pull drills from its own phase OR any drill
    // whose concept the session explicitly lists (e.g. a postflop week that
    // reinforces the Learning Process Model still surfaces that study drill).
    const phaseDrills = PT.DRILLS.filter(d => d.phase === s.phase || wantConcepts.has(d.concept));
    const flagged = new Set([...(s.flaggedLeaks || []), ...PT.Store.weakSpots(s).map(w => w.concept)]);

    const scored = phaseDrills.map(d => {
      let score = 0;
      if (wantConcepts.has(d.concept)) score += 3;
      if (flagged.has(d.concept)) score += 2;             // boost weak spots
      if ((s.srs[d.id] || 0) <= s.sessionsDone) score += 1; // due for review
      return { d, score };
    }).sort((a, b) => b.score - a.score);

    let chosen = scored.map(x => x.d).slice(0, 5);
    // pad from other phases if a fresh phase has <5
    if (chosen.length < 5) {
      const extra = PT.DRILLS.filter(d => !chosen.includes(d)).slice(0, 5 - chosen.length);
      chosen = chosen.concat(extra);
    }
    return chosen;
  }

  /* ============================================================
     ONBOARDING — Step 1 (Destination) + Step 2 (SMART goal)
     Straight from the book's Action Step #10 + SMART framework.
     Runs once on first launch; personalizes the whole app.
     ============================================================ */
  function onboard() {
    const s = PT.state;
    const p = s.profile || {};
    app().innerHTML = `
      <h1 class="page">Set your poker journey</h1>
      <p class="sub">Straight from <i>How to Study Poker</i>, Steps 1–2. Two minutes now — it points everything that follows. You can change it anytime.</p>

      <div class="label">STEP 1 · YOUR DESTINATION</div>
      <div class="card">
        <div class="field"><label>Why do you play poker?</label>
          <textarea id="why" placeholder="e.g. I love the competition and want a profitable hobby">${esc(p.why)}</textarea></div>
        <div class="field"><label>At what level / stakes would you feel you've achieved something great?</label>
          <input id="level" placeholder="e.g. consistently profitable in $20–50 online MTTs" value="${esc(p.level)}"></div>
        <div class="field"><label>Full-time, or a profitable part-time hobby?</label>
          <select id="commitment">
            <option ${p.commitment === "Part-time hobby" ? "selected" : ""}>Part-time hobby</option>
            <option ${p.commitment === "Serious side income" ? "selected" : ""}>Serious side income</option>
            <option ${p.commitment === "Aiming full-time" ? "selected" : ""}>Aiming full-time</option>
          </select></div>
      </div>

      <div class="label">STEP 2 · YOUR SMART GOAL</div>
      <div class="card">
        <p class="sub" style="margin:0 0 10px">Specific · Measurable · Achievable · Relevant · Time-bound. Make it one concrete sentence.</p>
        <div class="field"><label>Your SMART goal</label>
          <textarea id="goal" placeholder="e.g. Reach a positive ROI across 200 micro-stakes 7XL tournaments within 6 months">${esc(p.goal)}</textarea></div>
      </div>

      <button class="btn btn-primary btn-full btn-lg mt" id="finishOnboard">Start my journey →</button>
      <button class="btn btn-secondary btn-full" id="skipOnboard" style="margin-top:8px">Skip for now</button>
    `;
    const save = (onboarded) => {
      s.profile = {
        onboarded,
        why: ($("#why").value || "").trim(),
        level: ($("#level").value || "").trim(),
        commitment: $("#commitment").value,
        goal: ($("#goal").value || "").trim()
      };
      PT.Store.save(s);
      PT.go("home");
    };
    $("#finishOnboard").onclick = () => save(true);
    $("#skipOnboard").onclick = () => save(true);
  }

  /* ============================================================
     HOME — Dashboard
     ============================================================ */
  /* ---------- activity log · grace-streak · modal ---------- */
  function localDay() {
    const d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function daysBetween(a, b) { // "YYYY-MM-DD" → whole days
    const pa = a.split("-").map(Number), pb = b.split("-").map(Number);
    return Math.round((Date.UTC(pb[0], pb[1] - 1, pb[2]) - Date.UTC(pa[0], pa[1] - 1, pa[2])) / 86400000);
  }
  // Study-day streak with a 4-day grace: counts once per active day; resets only after a 4+ day gap.
  function touchStreak(s) {
    const today = localDay();
    if (s.lastActiveDay === today) return; // already counted today
    s.streak = (s.lastActiveDay && daysBetween(s.lastActiveDay, today) <= 4) ? (s.streak || 0) + 1 : 1;
    s.lastActiveDay = today;
    if (s.streak % 7 === 0) { s.xp += PT.XP.STREAK_BONUS; toast(`🔥 ${s.streak}-day streak +${PT.XP.STREAK_BONUS} XP`); }
  }
  // Log an activity (read/drill/review) for coach review + count it toward streak & module.
  function logActivity(s, type, detail) {
    s.activityLog = s.activityLog || [];
    const m = curSession(s);
    s.activityLog.push(Object.assign({ date: localDay(), type, module: m ? m.domino + " " + m.title : "" }, detail || {}));
    s.sessionsDone = (s.sessionsDone || 0) + 1;
    s.sessionsOnModule = (s.sessionsOnModule || 0) + 1;
    touchStreak(s);
  }
  function todayCounts(s) {
    const today = localDay(), c = { read: 0, drill: 0, review: 0 };
    (s.activityLog || []).forEach(e => { if (e.date === today && c[e.type] != null) c[e.type]++; });
    return c;
  }
  function modal(html) {
    const o = document.createElement("div");
    o.className = "overlay";
    o.innerHTML = `<div class="lu-card">${html}</div>`;
    o.addEventListener("click", e => { if (e.target === o) o.remove(); });
    document.body.appendChild(o);
    return o;
  }

  function home() {
    const s = PT.state;
    const lvl = PT.Game.levelFor(s);
    const prog = PT.Game.progress(s);
    const sess = curSession(s);
    const phase = curPhase(s);
    const tc = todayCounts(s);

    app().innerHTML = `
      <div class="topbar">
        <div class="hi">👋 Hey <b>Ido</b></div>
        <div class="streak">🔥 ${s.streak || 0}-day streak</div>
      </div>

      <div class="xpwrap">
        <div class="xprow">
          <span class="lvl">${lvl.icon} Level ${lvl.lvl} · ${lvl.name}</span>
          <span>${prog.max ? "MAX" : prog.have + " / " + prog.need + " XP"}</span>
        </div>
        <div class="xpbg"><div class="xpfill" style="width:${prog.pct}%"></div></div>
        ${prog.gatedByPhase ? `<div class="gatemsg">⚡ Enough XP — complete Phase ${prog.phaseNeeded} to unlock the next level.</div>` : ""}
      </div>

      ${s.profile && s.profile.goal ? `<div class="goalchip">🎯 <b>Your goal:</b> ${esc(s.profile.goal)}</div>` : ""}

      ${renderWeakBanner(s)}

      <div class="label">${phase ? "PHASE " + phase.id + " · " + esc(phase.name) : ""} · SUB-DOMINO ${(s.moduleIndex + 1)}/${phase ? phase.modules.length : "?"}</div>
      <div class="modtitle">${sess ? "♦ " + esc(sess.domino) + " · " + esc(sess.title) : ""}</div>
      ${sess && sess.focus ? `<div class="focusrow">🎯 <b>This sub-domino's focus:</b> ${esc(sess.focus)}</div>` : ""}
      ${sess && sess.stat ? `<div class="statrow">📊 <b>Track on 7XL:</b> ${esc(sess.stat)}</div>` : ""}
      <div class="looprow">Pick today's work — do any of these, as many as you like. No fixed session; each earns XP on its own.</div>
      <div class="mission">
        <div class="task" data-act="read">
          <span class="ic">📖</span><span>Read assignment</span>
          <span class="go">${tc.read ? "✓ " + tc.read + "×" : "→"}</span>
        </div>
        <div class="task" data-act="drills">
          <span class="ic">🎯</span><span>Drill set (5)</span>
          <span class="go">${tc.drill ? "✓ " + tc.drill + "×" : "→"}</span>
        </div>
        <div class="task" data-act="review">
          <span class="ic">📓</span><span>Session review <small style="color:var(--dim)">· after you play</small></span>
          <span class="go">${tc.review ? "✓ " + tc.review + "×" : "→"}</span>
        </div>
      </div>
      <div class="looprow center">Today: 📖 ${tc.read} · 🎯 ${tc.drill} · 📓 ${tc.review}</div>

      ${(s.sessionsOnModule || 0) >= 1 ? `<button class="btn btn-secondary btn-full mt" data-act="advance">✓ I've got this sub-domino — next one →</button>
      <div class="looprow center">Advance only when the skill feels solid (the book's way).</div>` : ""}
    `;

    app().querySelectorAll("[data-act]").forEach(el => el.onclick = () => {
      const a = el.dataset.act;
      if (a === "read") openReadModal();
      else if (a === "drills") openDrillBrief();
      else if (a === "review") PT.go("playlog");
      else if (a === "advance") advanceModule();
    });
  }

  function renderWeakBanner(s) {
    const weak = PT.Store.weakSpots(s);
    if (!weak.length) return "";
    const w = weak[0];
    const leak = PT.LEAKS.find(l => l.concepts.includes(w.concept));
    return `<div class="weak">🩹 Weak spot detected: <b>${esc(leak ? leak.title : w.concept)}</b> — ${w.rate}% miss rate.
      <a href="#leaks" style="color:#ff8a7a">Drill it →</a></div>`;
  }

  // READ popup — the full assignment for this sub-domino + a Complete button
  function openReadModal() {
    const s = PT.state;
    const sess = curSession(s);
    const phase = curPhase(s);
    if (!sess) return;
    const o = modal(`
      <div class="lu-head">
        <div class="lu-chip">READING ASSIGNMENT</div>
        <div class="lu-name">♦ ${esc(sess.domino)} · ${esc(sess.title)}</div>
        <div class="lu-sub">${esc(phase ? phase.books : "")}</div>
      </div>
      <div class="card" style="text-align:left">
        <div class="assignrow"><b>📖 Read:</b> ${esc(sess.read)}</div>
        ${sess.focus ? `<div class="assignrow"><b>🎯 Then do:</b> ${esc(sess.focus)}</div>` : ""}
        ${sess.stat ? `<div class="assignrow"><b>📊 Track:</b> ${esc(sess.stat)}</div>` : ""}
        <div class="assignrow muted" style="font-size:12px">Read this sub-domino's section in the book. If it's long, read what you can — re-open this next session. You advance when it clicks, not on a timer.</div>
      </div>
      <button class="btn btn-primary btn-full btn-lg" id="readDone">✓ Mark reading complete (+${PT.XP.READING} XP)</button>
      <button class="btn btn-secondary btn-full" id="readClose" style="margin-top:8px">Close</button>
    `);
    $("#readDone", o).onclick = () => {
      s.xp += PT.XP.READING;
      logActivity(s, "read", { detail: sess.read });
      PT.Store.save(s);
      o.remove();
      toast(`📖 Reading logged +${PT.XP.READING} XP`);
      checkLevelThenRender(home);
    };
    $("#readClose", o).onclick = () => o.remove();
  }

  // DRILL briefing popup — what to expect, then Start
  function openDrillBrief() {
    const s = PT.state;
    const list = pickDrills(s);
    if (!list.length) { toast("No drills for this sub-domino yet"); return; }
    const concepts = [...new Set(list.map(d => d.concept))].map(c => c.replace(/-/g, " ")).join(", ");
    const ty = { flashcard: 0, mc: 0, scenario: 0 };
    list.forEach(d => ty[d.type]++);
    const bits = [];
    if (ty.flashcard) bits.push(ty.flashcard + " flashcard" + (ty.flashcard > 1 ? "s" : ""));
    if (ty.mc) bits.push(ty.mc + " multiple-choice");
    if (ty.scenario) bits.push(ty.scenario + " live spot" + (ty.scenario > 1 ? "s" : ""));
    const o = modal(`
      <div class="lu-head">
        <div class="lu-chip">DRILL SET · ${list.length} DRILLS</div>
        <div class="lu-name">What to expect</div>
        <div class="lu-sub">Concepts: ${esc(concepts)}</div>
      </div>
      <div class="card" style="text-align:left;font-size:13px;color:#cdd">
        <div class="assignrow">You'll get a mix: ${esc(bits.join(" · "))}.</div>
        <div class="assignrow muted">Flashcards: think, reveal, rate yourself honestly. Multiple-choice & spots: pick, get instant feedback + the why. Wrong answers quietly flag your weak spots for later.</div>
      </div>
      <button class="btn btn-primary btn-full btn-lg" id="drillStart">▶ Start drills (+${PT.XP.DRILL_SESSION} XP on finish)</button>
      <button class="btn btn-secondary btn-full" id="drillCancel" style="margin-top:8px">Close</button>
    `);
    $("#drillStart", o).onclick = () => {
      o.remove();
      session = { list, i: 0, correct: 0, done: false, revealed: false, answered: false, results: [] };
      PT.go("drill");
    };
    $("#drillCancel", o).onclick = () => o.remove();
  }

  /* ============================================================
     DRILL — run 5 drills, mixed types
     ============================================================ */
  let session = null;
  function drill() {
    const s = PT.state;
    if (!session || session.done) {
      session = { list: pickDrills(s), i: 0, correct: 0, done: false, revealed: false, answered: false, results: [] };
    }
    renderDrill();
  }

  function renderDrill() {
    const s = PT.state;
    const d = session.list[session.i];
    const total = session.list.length;
    const pills = session.list.map((_, i) =>
      `<div class="pill ${i < session.i ? "on" : i === session.i ? "cur" : ""}"></div>`).join("");

    let body = "";
    if (d.type === "flashcard") body = renderFlashcard(d);
    else body = renderChoice(d); // mc + scenario share choice UI

    app().innerHTML = `
      <div class="drill-top">
        <span class="drill-tag">${d.concept.toUpperCase().replace(/-/g, " ")} · ${session.i + 1}/${total}</span>
        <div class="pills">${pills}</div>
      </div>
      ${body}
    `;
    wireDrill(d);
  }

  function renderFlashcard(d) {
    return `
      <div class="flash">
        <div class="q">${esc(d.question)}</div>
        ${session.revealed ? `<div class="ans">${esc(d.answer)}</div>` : ""}
        <div class="src">${esc(d.source)}</div>
      </div>
      ${session.revealed
        ? `<div class="rate">
             <button class="r-hard" data-rate="hard">😅 Hard</button>
             <button class="r-ok" data-rate="ok">🤔 Got it</button>
             <button class="r-easy" data-rate="easy">✅ Easy</button>
           </div>`
        : `<button class="btn btn-primary btn-full btn-lg mt" data-reveal>Reveal Answer</button>`}
    `;
  }

  function renderChoice(d) {
    const isScenario = d.type === "scenario";
    const board = isScenario && d.board ? `
      <div class="board">
        <div class="bl">BOARD</div>
        <div class="cardrow">${d.board.map(cardHTML).join("")}</div>
        ${d.hand ? `<div class="bl" style="margin-top:6px">YOUR HAND</div><div class="cardrow">${d.hand.map(cardHTML).join("")}</div>` : ""}
      </div>
      ${d.info ? `<div class="sinfo">${Object.entries(d.info).map(([k, v]) => `<div><b>${esc(v)}</b>${esc(k)}</div>`).join("")}</div>` : ""}
    ` : "";

    const choices = d.choices.map((c, i) => {
      let cls = "choice";
      if (session.answered) {
        if (i === d.answer) cls += " correct";
        else if (i === session.picked) cls += " wrong";
      }
      return `<button class="${cls}" data-pick="${i}" ${session.answered ? "disabled" : ""}>
        <span class="ltr">${"ABCD"[i]}</span><span>${esc(c)}</span></button>`;
    }).join("");

    return `
      ${board}
      <div class="qbox">
        ${d.setup ? `<div class="sit">${esc(d.setup)}</div>` : ""}
        ${esc(d.question)}
      </div>
      <div class="choices">${choices}</div>
      ${session.answered ? `<div class="explain">${esc(d.explain)}<div class="src">${esc(d.source)}</div></div>
        <button class="btn btn-primary btn-full btn-lg mt" data-next>Next →</button>` : ""}
    `;
  }

  function wireDrill(d) {
    const s = PT.state;
    const reveal = app().querySelector("[data-reveal]");
    if (reveal) reveal.onclick = () => { session.revealed = true; renderDrill(); };

    app().querySelectorAll("[data-rate]").forEach(b => b.onclick = () => {
      const r = b.dataset.rate;
      // SRS: hard -> next session, ok -> +2, easy -> +4
      s.srs[d.id] = s.sessionsDone + (r === "hard" ? 1 : r === "ok" ? 2 : 4);
      const ok = r !== "hard";
      PT.Store.recordAnswer(s, d.concept, ok);
      (session.results = session.results || []).push({ concept: d.concept, title: d.question.slice(0, 60), correct: ok });
      PT.Store.save(s);
      advance();
    });

    app().querySelectorAll("[data-pick]").forEach(b => b.onclick = () => {
      if (session.answered) return;
      session.picked = +b.dataset.pick;
      session.answered = true;
      const correct = session.picked === d.answer;
      if (correct) { session.correct++; s.xp += PT.XP.PER_CORRECT; }
      PT.Store.recordAnswer(s, d.concept, correct);
      (session.results = session.results || []).push({ concept: d.concept, title: d.question.slice(0, 60), correct });
      PT.Store.save(s);
      renderDrill();
    });

    const next = app().querySelector("[data-next]");
    if (next) next.onclick = advance;
  }

  function advance() {
    session.i++;
    session.revealed = false;
    session.answered = false;
    session.picked = undefined;
    if (session.i >= session.list.length) finishDrills();
    else renderDrill();
  }

  function finishDrills() {
    const s = PT.state;
    session.done = true;
    const total = session.list.length;
    const results = session.results || [];
    // Score from ALL results (flashcard "Got it/Easy" count as correct, "Hard" doesn't) — honest accuracy.
    const correctCount = results.filter(r => r.correct).length;
    const acc = total ? Math.round((correctCount / total) * 100) : 0;
    const missed = results.filter(r => !r.correct);
    const missedConcepts = [...new Set(missed.map(r => r.concept))].map(c => c.replace(/-/g, " "));

    // award XP + log this drill set for coach review (in the export JSON)
    s.xp += PT.XP.DRILL_SESSION;
    logActivity(s, "drill", {
      correct: correctCount, total, accuracy: acc,
      concepts: [...new Set(session.list.map(d => d.concept))],
      missed: missed.map(r => ({ concept: r.concept, q: r.title }))
    });
    PT.Store.save(s);

    app().innerHTML = `
      <h1 class="page">Drills complete 🎯</h1>
      <div class="stats">
        <div class="stat"><div class="num">${correctCount}/${total}</div><div class="lab">Correct</div></div>
        <div class="stat"><div class="num">${acc}%</div><div class="lab">Accuracy</div></div>
        <div class="stat"><div class="num">+${PT.XP.DRILL_SESSION}</div><div class="lab">XP</div></div>
      </div>
      ${missedConcepts.length
        ? `<div class="focusrow" style="border-color:#e74c3c44"><b style="color:#ff8a7a">Worth another look:</b> ${esc(missedConcepts.join(", "))}</div>`
        : `<div class="focusrow"><b>Clean sweep</b> — nailed all ${total}. 🔥</div>`}
      <div class="looprow center">📓 Saved to your log — it'll show up when you export for the coach.</div>
      <button class="btn btn-primary btn-full btn-lg mt" id="back">Back to Today</button>
    `;
    $("#back").onclick = () => checkLevelThenRender(() => PT.go("home"));
  }

  /* ============================================================
     PROGRESS — levels, badges, stats
     ============================================================ */
  function progress() {
    const s = PT.state;
    const cur = PT.Game.levelFor(s);
    const earned = new Set(PT.Game.earnedBadges(s).map(b => b.id));
    const acc = s.totalDrills ? Math.round((s.correctDrills / s.totalDrills) * 100) : 0;

    app().innerHTML = `
      <h1 class="page">Progress</h1>
      <div class="stats">
        <div class="stat"><div class="num">${s.sessionsDone}</div><div class="lab">Sessions</div></div>
        <div class="stat"><div class="num">${s.totalDrills}</div><div class="lab">Drills</div></div>
        <div class="stat"><div class="num">${acc}%</div><div class="lab">Accuracy</div></div>
      </div>

      <div class="label">LEVELS</div>
      ${PT.LEVELS.map(L => {
        const unlocked = L.lvl <= cur.lvl;
        const isCur = L.lvl === cur.lvl;
        return `<div class="lvl-row ${isCur ? "cur" : ""} ${unlocked ? "" : "locked"}">
          <span class="lic">${L.icon}</span>
          <div><div class="lname">Level ${L.lvl} · ${L.name}${isCur ? '<span class="youtag">YOU</span>' : ""}</div>
          <div class="ldesc">${L.desc}</div></div>
          <span class="lxp">${L.xp} XP${L.phaseGate ? " · P" + L.phaseGate : ""}</span>
        </div>`;
      }).join("")}

      <div class="label">BADGES</div>
      <div class="badges">
        ${PT.BADGES.map(b => `<div class="badge ${earned.has(b.id) ? "on" : "off"}">
          <div class="bic">${b.icon}</div><div class="bn">${b.name}</div></div>`).join("")}
      </div>

      <div class="label">SYNC / BACKUP</div>
      <button class="btn btn-secondary btn-full" id="exportBtn">⬇️ Export progress (file + copy)</button>
      <label class="btn btn-secondary btn-full" style="display:block;margin-top:8px;text-align:center;cursor:pointer">
        ⬆️ Import progress (choose file)
        <input type="file" id="importFile" accept="application/json,.json" style="display:none">
      </label>
      <div class="looprow center">Move your progress between iPhone and PC — export on one, import on the other.</div>

      <div class="label">DEV</div>
      <button class="btn btn-secondary btn-full" id="reset">Reset all progress</button>
    `;

    $("#exportBtn").onclick = async () => {
      const json = JSON.stringify(PT.state, null, 2);
      try {
        const blob = new Blob([json], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "poker-progress.json";
        document.body.appendChild(a); a.click();
        setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
      } catch (e) { /* download may be blocked in some PWA contexts */ }
      try { await navigator.clipboard.writeText(json); toast("Exported — file saved + copied to clipboard"); }
      catch { toast("Progress file exported"); }
    };

    $("#importFile").onchange = (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const r = new FileReader();
      r.onload = () => {
        let data;
        try { data = JSON.parse(r.result); }
        catch { toast("Couldn't read that file"); return; }
        if (typeof data.xp !== "number" || !("phase" in data) || !("moduleIndex" in data)) {
          toast("That's not a valid progress file"); return;
        }
        if (confirm("Import this progress? It replaces what's currently on THIS device.")) {
          PT.state = Object.assign(PT.Store.default(), data);
          PT.Store.save(PT.state);
          toast("✅ Progress imported");
          PT.go("home");
        }
      };
      r.readAsText(file);
    };

    $("#reset").onclick = () => {
      if (confirm("Reset all progress? This cannot be undone.")) {
        PT.state = PT.Store.reset(); PT.go("home");
      }
    };
  }

  /* ============================================================
     LEAKS — common leaks menu + auto weak spots
     ============================================================ */
  function leaks() {
    const s = PT.state;
    const weak = PT.Store.weakSpots(s);
    app().innerHTML = `
      <h1 class="page">Find a Leak</h1>
      <p class="sub">Tap what sounds like you for a targeted drill set. The app also flags leaks automatically from your wrong answers.</p>

      ${weak.length ? `<div class="label">AUTO-DETECTED (from your drills)</div>
        ${weak.map(w => {
          const leak = PT.LEAKS.find(l => l.concepts.includes(w.concept));
          return `<div class="weak">🩹 <b>${esc(leak ? leak.title : w.concept)}</b> — missing ${w.rate}% (${w.n} drills)</div>`;
        }).join("")}` : ""}

      <div class="label">COMMON LEAKS</div>
      ${PT.LEAKS.map(l => `
        <div class="leak" data-leak="${l.id}">
          <span class="le">${l.emoji}</span>
          <div style="flex:1">
            <div class="lt">${esc(l.title)} ${(s.flaggedLeaks || []).includes(l.id) ? "🚩" : ""}</div>
            <div class="ld">${esc(l.detail)}</div>
            <div class="lref">${esc(l.ref)}</div>
          </div>
        </div>`).join("")}
    `;
    app().querySelectorAll("[data-leak]").forEach(el => el.onclick = () => startLeakSession(el.dataset.leak));
  }

  function startLeakSession(leakId) {
    const s = PT.state;
    const leak = PT.LEAKS.find(l => l.id === leakId);
    if (!leak) return;
    if (!s.flaggedLeaks.includes(leakId)) s.flaggedLeaks.push(leakId);
    PT.Store.save(s);
    const drills = PT.DRILLS.filter(d => leak.concepts.includes(d.concept)).slice(0, 5);
    if (!drills.length) { toast("No drills yet for this leak — coming with the books"); return; }
    session = { list: drills, i: 0, correct: 0, done: false, revealed: false, answered: false, results: [] };
    PT.go("drill");
  }

  /* ============================================================
     PLAY LOG — log session + guided hand review
     ============================================================ */
  function playlog() {
    const s = PT.state;
    app().innerHTML = `
      <h1 class="page">Play & Review</h1>
      <p class="sub">Log a session or walk through one hand. No file uploads — just answer in plain words. Findings feed your next coach session.</p>

      <div class="label">SESSION REVIEW · MATSUHASHI'S JOURNAL (+${PT.XP.HAND_REVIEW} XP)</div>
      <p class="sub" style="margin:-6px 2px 12px">The book's "Play Session" After-Action Review (How to Study Poker, Step 5). Be honest — this is where the learning happens.</p>
      <div class="card">
        <div class="field"><label>1 · Warm-up — did you warm up before playing?</label><input id="q1" placeholder="e.g. Yes, 5 min reviewing ranges / No, jumped in cold"></div>
        <div class="field"><label>2 · Strategy focus — your ONE focus this session</label><input id="q2" placeholder="e.g. 3-bet defense from the blinds"></div>
        <div class="field"><label>3 · Mistakes made</label><textarea id="q3" placeholder="Spots where you know you misplayed..."></textarea></div>
        <div class="field"><label>4 · Baffling spots — hands you couldn't figure out</label><textarea id="q4" placeholder="The hand that confused you — bring this to a coach session"></textarea></div>
        <div class="field"><label>5 · Tilt — did any come up, and what triggered it?</label><input id="q5" placeholder="e.g. Got it in good, lost, started spewing"></div>
        <div class="field"><label>6 · Rate your play</label>
          <select id="q6">
            <option value="">—</option>
            <option value="A-game">A-game (focused, my best)</option>
            <option value="B-game">B-game (okay, some lapses)</option>
            <option value="C-game">C-game (tilted / autopilot)</option>
          </select></div>
        <button class="btn btn-primary btn-full" id="saveHand">Save Review</button>
      </div>

      <div class="label">QUICK SESSION LOG</div>
      <div class="card">
        <div class="field"><label>Format</label>
          <select id="fmt"><option>Online tournament (7XL)</option><option>Live cash</option><option>Online cash</option></select></div>
        <div class="field"><label>How it went (notes)</label><textarea id="notes" placeholder="Result, mood, anything notable..."></textarea></div>
        <button class="btn btn-secondary btn-full" id="saveSession">Log Session</button>
      </div>

      ${s.playLog.length ? `<div class="label">RECENT</div>${s.playLog.slice(-5).reverse().map(e =>
        `<div class="logitem"><div class="when">${esc(e.when)} · ${esc(e.kind)}</div>${esc(e.summary)}</div>`).join("")}` : ""}
    `;

    $("#saveHand").onclick = () => {
      const get = id => ($("#" + id).value || "").trim();
      const fields = {
        warmup: get("q1"), focus: get("q2"), mistakes: get("q3"),
        baffling: get("q4"), tilt: get("q5"), rate: get("q6")
      };
      if (!Object.values(fields).some(Boolean)) { toast("Fill in at least one field"); return; }
      const summary = `${fields.rate || "Reviewed"}${fields.focus ? " · focus: " + fields.focus : ""}${fields.mistakes ? " · " + fields.mistakes.slice(0, 40) : ""}`;
      s.playLog.push({ when: dateStr(), kind: "Session review", summary, detail: fields });
      s.xp += PT.XP.HAND_REVIEW;
      logActivity(s, "review", { detail: fields });
      PT.Store.save(s);
      toast(`📓 Review saved +${PT.XP.HAND_REVIEW} XP`);
      checkLevelThenRender(() => PT.go("home"));
    };

    $("#saveSession").onclick = () => {
      const fmt = $("#fmt").value, notes = ($("#notes").value || "").trim();
      s.playLog.push({ when: dateStr(), kind: "Session", summary: `${fmt}${notes ? " — " + notes : ""}` });
      PT.Store.save(s);
      toast("Session logged");
      playlog();
    };
  }

  function dateStr() {
    const d = new Date();
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }

  /* ============================================================
     SESSION COMPLETION + LEVEL-UP overlay
     ============================================================ */
  // Self-paced: advance to the next sub-domino; completing a phase's last
  // module = phase complete (level gate + celebration).
  function advanceModule() {
    const s = PT.state;
    const phase = curPhase(s);
    if (!phase) return;
    s.moduleIndex = (s.moduleIndex || 0) + 1;
    s.sessionsOnModule = 0;
    if (s.moduleIndex >= phase.modules.length) {
      // phase complete
      if (!s.phasesComplete.includes(phase.id)) {
        s.phasesComplete.push(phase.id);
        s.xp += PT.XP.PHASE_COMPLETE;
      }
      const next = PT.CURRICULUM.phases.find(p => p.id === phase.id + 1);
      if (next) { s.phase = next.id; s.moduleIndex = 0; }
      else { s.moduleIndex = phase.modules.length - 1; } // curriculum complete; stay
      PT.Store.save(s);
      showPhaseComplete(phase);
      return;
    }
    PT.Store.save(s);
    toast(`Next: ${phase.modules[s.moduleIndex].domino} ${phase.modules[s.moduleIndex].title}`);
    checkLevelThenRender(() => PT.go("home"));
  }

  // Detect level-up against lastLevel; show overlay if changed
  function checkLevelThenRender(then) {
    const s = PT.state;
    const lvl = PT.Game.levelFor(s);
    if (lvl.lvl > (s.lastLevel || 1)) {
      s.lastLevel = lvl.lvl;
      PT.Store.save(s);
      showLevelUp(lvl, then);
    } else {
      s.lastLevel = lvl.lvl; PT.Store.save(s);
      then();
    }
  }

  function showLevelUp(lvl, then) {
    const o = document.createElement("div");
    o.className = "overlay";
    o.innerHTML = `
      <div class="lu-card">
        <div class="lu-head">
          <div class="lu-chip">LEVEL UP</div>
          <div class="lu-name">${lvl.icon} ${lvl.name}</div>
          <div class="lu-sub">${lvl.desc}</div>
        </div>
        <div class="lu-badge">
          <span class="bigic">${lvl.icon}</span>
          <div class="bname">Level ${lvl.lvl} reached</div>
          <div class="bdesc">Keep the streak alive.</div>
        </div>
        <button class="btn btn-primary btn-full btn-lg" id="luClose">Continue</button>
      </div>`;
    document.body.appendChild(o);
    $("#luClose", o).onclick = () => { o.remove(); then(); };
  }

  // Achievement Card (style B) for phase completion
  function showPhaseComplete(phase) {
    const s = PT.state;
    const acc = s.totalDrills ? Math.round((s.correctDrills / s.totalDrills) * 100) : 0;
    const weak = PT.Store.weakSpots(s)[0];
    const leak = weak && PT.LEAKS.find(l => l.concepts.includes(weak.concept));
    const o = document.createElement("div");
    o.className = "overlay";
    o.innerHTML = `
      <div class="lu-card">
        <div class="lu-head">
          <div class="lu-chip">PHASE ${phase.id} COMPLETE</div>
          <div class="lu-name">${esc(phase.name)}</div>
          <div class="lu-sub">${esc(phase.books)}</div>
        </div>
        <div class="lu-badge">
          <span class="bigic">🏅</span>
          <div class="bname">The Student</div>
          <div class="bdesc">Completed all reading + drills for Phase ${phase.id}</div>
        </div>
        <div class="stats">
          <div class="stat"><div class="num">${s.sessionsDone}</div><div class="lab">Sessions</div></div>
          <div class="stat"><div class="num">${s.totalDrills}</div><div class="lab">Drills</div></div>
          <div class="stat"><div class="num">${acc}%</div><div class="lab">Accuracy</div></div>
        </div>
        ${leak ? `<div class="weak">Biggest leak found: <b>${esc(leak.title)}</b></div>` : ""}
        <button class="btn btn-primary btn-full btn-lg" id="pcClose">${PT.CURRICULUM.phases.find(p => p.id === phase.id + 1) ? "Begin Phase " + (phase.id + 1) + " →" : "Finish 🎉"}</button>
      </div>`;
    document.body.appendChild(o);
    $("#pcClose", o).onclick = () => { o.remove(); checkLevelThenRender(() => PT.go("home")); };
  }

  return { onboard, home, drill, progress, leaks, playlog };
})();
