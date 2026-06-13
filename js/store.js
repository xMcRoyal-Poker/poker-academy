/* ============================================================
   STORE — all progress in localStorage. No backend.
   ============================================================ */
window.PT = window.PT || {};

PT.Store = {
  KEY: "poker-trainer-v1",
  VERSION: 2, // bump when the saved-data shape changes; migrate() handles upgrades

  default() {
    return {
      schemaVersion: 2,
      // Step 1 (destination) + Step 2 (SMART goal) — set in first-run onboarding
      profile: { onboarded: false, why: "", level: "", commitment: "", goal: "" },
      xp: 0,
      streak: 0,            // consecutive sessions
      sessionsDone: 0,      // total sessions completed
      totalDrills: 0,       // total drills answered
      correctDrills: 0,
      phase: 1,             // current phase (1-3, for level gating)
      moduleIndex: 0,       // index into current phase's modules (sub-dominoes)
      sessionsOnModule: 0,  // how many sessions done on the current sub-domino (self-paced)
      phasesComplete: [],   // [1,2,...]
      // activity history (for coach review via the export JSON)
      activityLog: [],      // { date, type:'read'|'drill'|'review', module, ...detail }
      lastActiveDay: null,  // YYYY-MM-DD of last activity — powers the grace-streak
      // leak tracking: { concept: {wrong, total} }
      conceptStats: {},
      // flagged leaks (from menu or coach)
      flaggedLeaks: [],
      // spaced-repetition: drillId -> due session number
      srs: {},
      // play session log
      playLog: [],
      // badges already celebrated (avoid re-popping)
      seenBadges: [],
      lastLevel: 1,
      created: null
    };
  },

  load() {
    try {
      const raw = localStorage.getItem(this.KEY);
      if (!raw) { const d = this.default(); this.save(d); return d; }
      const parsed = JSON.parse(raw);
      const migrated = this.migrate(parsed);
      const merged = Object.assign(this.default(), migrated); // backfill any new keys
      const safe = this.sanitize(merged);                     // coerce wrong types
      safe.schemaVersion = this.VERSION;
      this.save(safe);
      return safe;
    } catch (e) {
      console.warn("store load failed — preserving a backup, then resetting", e);
      try { localStorage.setItem(this.KEY + "-corrupt-backup", localStorage.getItem(this.KEY) || ""); } catch (_) {}
      const d = this.default(); this.save(d); return d;
    }
  },

  // Upgrade older saved shapes to the current one (idempotent, never throws).
  migrate(data) {
    if (!data || typeof data !== "object") return {};
    const v = data.schemaVersion || 1;
    if (v < 2) {
      // v1 used sessionIndex + todayTasks; v2 uses moduleIndex + activityLog
      if (data.moduleIndex == null && typeof data.sessionIndex === "number") data.moduleIndex = data.sessionIndex;
      delete data.sessionIndex;
      delete data.todayTasks;
      if (!Array.isArray(data.activityLog)) data.activityLog = [];
    }
    return data;
  },

  // Coerce fields to their expected types so a corrupt/partial blob can't crash the UI.
  sanitize(s) {
    const d = this.default();
    const arrays = ["phasesComplete", "activityLog", "flaggedLeaks", "playLog", "seenBadges"];
    arrays.forEach(k => { if (!Array.isArray(s[k])) s[k] = []; });
    const objects = ["profile", "conceptStats", "srs"];
    objects.forEach(k => { if (!s[k] || typeof s[k] !== "object" || Array.isArray(s[k])) s[k] = d[k]; });
    const numbers = ["xp", "streak", "sessionsDone", "totalDrills", "correctDrills", "phase", "moduleIndex", "sessionsOnModule", "lastLevel"];
    numbers.forEach(k => { if (typeof s[k] !== "number" || isNaN(s[k])) s[k] = d[k]; });
    if (!s.profile || typeof s.profile.onboarded !== "boolean") s.profile = Object.assign(d.profile, s.profile || {});
    return s;
  },

  save(s) {
    try { localStorage.setItem(this.KEY, JSON.stringify(s)); }
    catch (e) { console.warn("store save failed", e); }
  },

  reset() {
    localStorage.removeItem(this.KEY);
    return this.load();
  },

  // Record a drill answer for leak tracking
  recordAnswer(s, concept, correct) {
    if (!s.conceptStats[concept]) s.conceptStats[concept] = { wrong: 0, total: 0 };
    s.conceptStats[concept].total++;
    if (!correct) s.conceptStats[concept].wrong++;
    s.totalDrills++;
    if (correct) s.correctDrills++;
  },

  // Weakest concepts (auto leak detection, layer 1)
  weakSpots(s, min = 2) {
    return Object.entries(s.conceptStats)
      .filter(([, v]) => v.total >= min && v.wrong / v.total >= 0.4)
      .sort((a, b) => (b[1].wrong / b[1].total) - (a[1].wrong / a[1].total))
      .map(([c, v]) => ({ concept: c, rate: Math.round((v.wrong / v.total) * 100), n: v.total }));
  }
};
