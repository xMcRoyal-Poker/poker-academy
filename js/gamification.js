/* ============================================================
   GAMIFICATION — XP rules, phase-gated levels, badges, streak
   ============================================================ */
window.PT = window.PT || {};

PT.XP = {
  DRILL_SESSION: 25,   // completing 5 drills
  READING: 20,         // finishing a reading assignment
  HAND_REVIEW: 15,     // logging + reviewing a hand
  STREAK_BONUS: 50,    // every 7 sessions
  PHASE_COMPLETE: 200, // completing a full phase
  PER_CORRECT: 3       // small bonus per correct drill answer
};

/* Phase-gated levels: BOTH xp AND phaseGate must be met to be AT a level.
   phaseGate = number of phases that must be completed. */
PT.LEVELS = [
  { lvl: 1, name: "Fish",            xp: 0,    phaseGate: 0, icon: "🐟", desc: "Just started. Learning how to study." },
  { lvl: 2, name: "Calling Station", xp: 150,  phaseGate: 0, icon: "📞", desc: "Getting the basics, still reactive." },
  { lvl: 3, name: "Rec Player",      xp: 350,  phaseGate: 1, icon: "🎰", desc: "Thinking about ranges. Getting there." },
  { lvl: 4, name: "Solid Reg",       xp: 700,  phaseGate: 1, icon: "📈", desc: "Consistent decisions, understands GTO basics." },
  { lvl: 5, name: "Winning Reg",     xp: 1400, phaseGate: 2, icon: "🏆", desc: "Exploiting opponents. Profitable long-term." },
  { lvl: 6, name: "Crusher",         xp: 2500, phaseGate: 3, icon: "⚡", desc: "Full game mastery. Small stakes domination." }
];

PT.BADGES = [
  { id: "first-streak", icon: "🔥", name: "First Streak",  test: s => s.streak >= 5 },
  { id: "first-chapter",icon: "📚", name: "First Chapter", test: s => s.sessionsDone >= 1 },
  { id: "drill-master", icon: "🎯", name: "Drill Master",  test: s => s.totalDrills >= 50 },
  { id: "phase1",       icon: "🏅", name: "Phase 1 Done",  test: s => (s.phasesComplete||[]).includes(1) },
  { id: "range-thinker",icon: "🧠", name: "Range Thinker", test: s => (s.phasesComplete||[]).includes(2) },
  { id: "crusher",      icon: "⚡", name: "Crusher",       test: s => PT.Game.levelFor(s).lvl >= 6 }
];

PT.Game = {
  // Current level given xp AND completed phases
  levelFor(s) {
    const phases = (s.phasesComplete || []).length;
    let cur = PT.LEVELS[0];
    for (const L of PT.LEVELS) {
      if (s.xp >= L.xp && phases >= L.phaseGate) cur = L;
    }
    return cur;
  },
  // Next level object (or null if maxed)
  nextLevel(s) {
    const cur = this.levelFor(s);
    return PT.LEVELS.find(L => L.lvl === cur.lvl + 1) || null;
  },
  // Progress toward next level as {have, need, pct, gatedByPhase}
  progress(s) {
    const cur = this.levelFor(s);
    const next = this.nextLevel(s);
    if (!next) return { have: s.xp, need: s.xp, pct: 100, max: true };
    const base = cur.xp;
    const have = s.xp - base;
    const need = next.xp - base;
    const phases = (s.phasesComplete || []).length;
    const gatedByPhase = s.xp >= next.xp && phases < next.phaseGate;
    return {
      have, need,
      pct: Math.min(100, Math.round((have / need) * 100)),
      gatedByPhase,
      phaseNeeded: next.phaseGate
    };
  },
  earnedBadges(s) {
    return PT.BADGES.filter(b => { try { return b.test(s); } catch { return false; } });
  }
};
