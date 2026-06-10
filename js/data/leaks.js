/* ============================================================
   COMMON LEAKS MENU (Layer 2 leak detection)
   User taps "this sounds like me" -> mini-session of related drills.
   Each leak maps to drill concepts + a book/source reference.
   ============================================================ */
window.PT = window.PT || {};

PT.LEAKS = [
  {
    id: "call-too-much-preflop",
    emoji: "😬",
    title: "I call too much preflop",
    detail: "Defending wide with dominated hands (A9, KT, KJo) out of position.",
    concepts: ["avoiding-domination","rfi-ranges","fold-to-tight-3bet"],
    ref: "JL Small Stakes Tournaments p.31–33 · Preflop Online Poker"
  },
  {
    id: "dont-know-cbet",
    emoji: "🤷",
    title: "I don't know when to c-bet",
    detail: "C-betting every flop regardless of board or opponent type.",
    concepts: ["cbet-fundamentals","board-texture","value-betting-vs-loose-passive"],
    ref: "Post-Flop Online Poker Domino 6 · JL Small Stakes Tournaments p.5–7, 14"
  },
  {
    id: "cant-handle-aggression",
    emoji: "😰",
    title: "I panic vs aggressive players",
    detail: "Check-raising or folding when you should induce and call down.",
    concepts: ["inducing-bluffs-vs-aggressive","trapping-vs-aggressive","reverse-blocking-bet"],
    ref: "JL Small Stakes Tournaments p.18–23"
  },
  {
    id: "overvalue-top-pair",
    emoji: "💸",
    title: "I overvalue top pair",
    detail: "Stacking off with TPGK on wet boards vs players who don't bluff.",
    concepts: ["value-betting-vs-loose-passive","bet-sizing-tells"],
    ref: "JL Small Stakes Tournaments p.5–7, 14"
  },
  {
    id: "tournament-stack-sizes",
    emoji: "📉",
    title: "I ignore stack sizes in tournaments",
    detail: "Playing 15–25bb stacks like deep cash instead of push/fold.",
    concepts: ["push-fold-ranges"],
    ref: "Knowledge base — push/fold charts"
  },
  {
    id: "not-thinking-ranges",
    emoji: "🎯",
    title: "I put people on exact hands",
    detail: "Thinking 'he has AK' instead of assigning a full range.",
    concepts: ["thinking-in-ranges","observation","hand-reading"],
    ref: "Post-Flop Online Poker Domino 5 · JL Small Stakes Tournaments p.9"
  }
];
