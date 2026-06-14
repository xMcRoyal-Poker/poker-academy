/* ============================================================
   DRILL BANK
   Each drill is tagged with: phase, type, source, concept.
   Types:
     - flashcard : question -> reveal answer -> self-rate (Hard/Got it/Easy)
     - mc        : multiple choice -> tap -> instant feedback + XP
     - scenario  : board + hand shown -> choose action -> feedback
   SOURCES:
     - Real Jonathan Little tournament hands are from the uploaded PDF
       "Strategies for Beating Small Stakes Tournaments" (verbatim spots).
     - Web fundamentals are from the project knowledge-base.md (GTO baseline).
   TODO (tomorrow): append Phase 1 study drills + Phase 2 preflop drills
     extracted from the scanned Matsuhashi books. Add objects to this array.
   ============================================================ */
window.PT = window.PT || {};
PT.DRILLS = [

  /* ---------- PHASE 1 · Study Foundations ----------
     Real content from the SCANNED book: "How to Study Poker Vol 1" (Sky Matsuhashi).
     Page citations are the book's printed page numbers.
     The first 3 (ranges/observation/exploitation) are foundational study concepts
     that also feed the Leaks menu — kept on purpose. */
  {
    id: "p1-think-ranges",
    phase: 1, type: "flashcard", concept: "thinking-in-ranges",
    source: "JL — Strategies for Beating Small Stakes Tournaments (p.9)",
    question: "Why should you never put an opponent on one specific hand?",
    answer: "Because players play many different hands the same way. You assign a RANGE (e.g. a tight UTG raiser = AA, KK, QQ, JJ, AK) and then narrow it street by street based on their actions. You cannot analyze a hand without assigning a range."
  },
  {
    id: "p1-pay-attention",
    phase: 1, type: "flashcard", concept: "observation",
    source: "JL — Strategies for Beating Small Stakes Tournaments (p.8, 37)",
    question: "What is the single biggest edge available in small-stakes games, and how do you capture it?",
    answer: "Paying attention to opponents every hand — not just when you're in the pot. Quantify each player's specific mistake (e.g. 'folds turn too much after calling flop') and build a concrete plan to exploit it. Most opponents are oblivious, so observation is nearly free money."
  },
  {
    id: "p1-quantify-leak",
    phase: 1, type: "mc", concept: "exploitation-thinking",
    source: "JL — Strategies for Beating Small Stakes Tournaments (p.37)",
    question: "You notice an opponent. Which thought is the most USEFUL way to frame their leak?",
    choices: [
      "My opponent is bad at poker.",
      "My opponent calls wide preflop and on the flop, then plays too tight on the turn — so I should bet almost every turn after they call my flop c-bet.",
      "My opponent got lucky last hand.",
      "My opponent seems aggressive today."
    ],
    answer: 1,
    explain: "Little's core lesson: don't think 'he's bad' — QUANTIFY the leak into a specific, repeatable action you can take. The second option turns a read into a money-making plan."
  },

  /* --- Matsuhashi · How to Study Poker Vol 1 (scanned) --- */
  {
    id: "p1-great-minds",
    phase: 1, type: "flashcard", concept: "study-mindset",
    source: "How to Study Poker V1 — Ch.2 (p.10–13)",
    question: "Matsuhashi names three characteristics of great poker minds. What are they?",
    answer: "1) Patient & Persevering — mastery takes years of dedicated study and practice. 2) Open-minded — willing to question your own play and adopt better ideas. 3) Observant & Calculating — always watching opponents and doing the math. Build the mindset before the tactics."
  },
  {
    id: "p1-mindset-proverb",
    phase: 1, type: "flashcard", concept: "study-mindset",
    source: "How to Study Poker V1 — Ch.2 epigraph (p.10)",
    question: "Finish the proverb that opens the mindset chapter: 'If your mind is strong, all difficult things become ___; but if your mind is weak, ___.'",
    answer: "'...become EASY; but if your mind is weak, all easy things become DIFFICULT.' (Chinese proverb). The point: your study mindset is the foundation — fix it first and the tactics get easier."
  },
  {
    id: "p1-why",
    phase: 1, type: "flashcard", concept: "asking-why",
    source: "How to Study Poker V1 — Ch.6 (p.29)",
    question: "Matsuhashi says the single most useful study question is one word. What is it, and what does it do?",
    answer: "'WHY?' — e.g. 'Why did the BTN check behind?', 'Why did villain check-raise?', 'Why the 5x sizing?'. Asking why forces you to reconstruct the opponent's logic, which is how you learn to read ranges and tendencies instead of just memorizing plays."
  },
  {
    id: "p1-why-mc",
    phase: 1, type: "mc", concept: "asking-why",
    source: "How to Study Poker V1 — Ch.6 (p.29)",
    question: "Which is a strong 'Why?' study question (the kind that actually improves you)?",
    choices: [
      "Did I win the hand?",
      "Why did the BTN check behind on the turn?",
      "Was I just unlucky?",
      "Should I quit for the night?"
    ],
    answer: 1,
    explain: "Great study questions probe an opponent's DECISION ('Why did the BTN check behind?'), not your result or your emotions. Results and tilt questions don't teach you anything repeatable."
  },
  {
    id: "p1-session-process",
    phase: 1, type: "flashcard", concept: "session-process",
    source: "How to Study Poker V1 — Ch.6, Action Step #8 (p.28)",
    question: "What is the structured study-session process (Action Step #8)?",
    answer: "Warm up → play without distraction → end the session by evaluating your chip & play results → measure your quantifiables → the NEXT day, review the session and pick aspects to focus on → plan the next session's focus. It's a loop: play, review, plan, repeat."
  },
  {
    id: "p1-smart",
    phase: 1, type: "flashcard", concept: "smart-goals",
    source: "How to Study Poker V1 — Step 2 (p.38)",
    question: "What does the SMART goal framework stand for?",
    answer: "Specific, Measurable, Achievable, Relevant, Time-bound. A goal that isn't all five is just a wish — you can't track it or know when you've hit it."
  },
  {
    id: "p1-smart-mc",
    phase: 1, type: "mc", concept: "smart-goals",
    source: "How to Study Poker V1 — Step 2 (p.38–39)",
    question: "Which of these is an actual SMART goal?",
    choices: [
      "Get better at poker",
      "Win more money",
      "Save $835/month from my bankroll for 12 months to fund a $10k buy-in",
      "Stop playing badly"
    ],
    answer: 2,
    explain: "Only the third is Specific ($835), Measurable (track it monthly), Achievable, Relevant (funds a real goal), and Time-bound (12 months). The others are vague wishes you can't measure — Matsuhashi's exact WSOP example."
  },
  {
    id: "p1-journal",
    phase: 1, type: "flashcard", concept: "poker-journal",
    source: "How to Study Poker V1 — Step 5 (p.59)",
    question: "Why keep a poker journal? Name at least three things it lets you do.",
    answer: "Track your leaks AND what you did about them; track study & play time; track tilt issues; crystalize your thoughts on plays/strategies; revisit past topics you've studied. (This app's Play-log + hand review IS your journal — use it that way.)"
  },
  {
    id: "p1-habit-30",
    phase: 1, type: "flashcard", concept: "study-habits",
    source: "How to Study Poker V1 — Step 6 (p.65)",
    question: "Why does Matsuhashi build habits with 30-Day Challenges instead of just 'forming the habit'?",
    answer: "Research says a habit takes ~36–66 days to stick, which feels insurmountable. A 30-day challenge is achievable, you gain value even from a partial run, and you can simply repeat it. Small, finite commitments beat vague open-ended ones — exactly why this app tracks a streak."
  },
  {
    id: "p1-habit-mc",
    phase: 1, type: "mc", concept: "study-habits",
    source: "How to Study Poker V1 — Step 6 (p.65)",
    question: "Which is one of Matsuhashi's real 30-Day Challenges?",
    choices: [
      "Play 12 hours every day",
      "Do a daily warm-up before each session",
      "Only ever play premium hands",
      "Never fold preflop"
    ],
    answer: 1,
    explain: "His actual challenges were study/discipline habits: a daily warm-up, posting a hand on a forum daily, reading a strategy article daily, recording game tape daily. Volume-grinding and rigid hand rules aren't habits that build skill."
  },
  {
    id: "p1-weekly-plan",
    phase: 1, type: "flashcard", concept: "weekly-plan",
    source: "How to Study Poker V1 — Step 4, Weekly Study Plan (p.56)",
    question: "Matsuhashi's Weekly Study Plan starts with three things before the day-by-day breakdown. What are they?",
    answer: "1) A Weekly Theme (your focus). 2) Hypotheses — what you think you'll learn this week. 3) Quantifiables — trackable stats with a Starting % and Ending %. Set the theme and what you expect to learn FIRST, then plan the days."
  },

  /* --- Full-coverage drills from the free companion Workbook (all 12 chapters) --- */
  {
    id: "p1-take-action",
    phase: 1, type: "flashcard", concept: "learn-from-books",
    source: "How to Study Poker V1 Workbook — Ch.1, Action Step #1 (p.3)",
    question: "What's the #1 rule for learning from any poker book (the whole premise of the book)?",
    answer: "TAKE ACTION — put ONE thing to work after every chapter you read. Reading without applying changes nothing. Knowledge isn't skill; knowledge + repetition is skill."
  },
  {
    id: "p1-competence-levels",
    phase: 1, type: "flashcard", concept: "unconscious-competence",
    source: "How to Study Poker V1 — Ch.3 (p.17, Workbook p.5)",
    question: "Name the 4 levels of skill development, in order.",
    answer: "1) Unconscious Incompetence (you don't know what you don't know). 2) Conscious Incompetence (you see the gap). 3) Conscious Competence (you can do it, but must concentrate). 4) Unconscious Competence (automatic — gut feel takes over). Level 4 is the goal for every skill."
  },
  {
    id: "p1-competence-mc",
    phase: 1, type: "mc", concept: "unconscious-competence",
    source: "How to Study Poker V1 — Ch.3 (p.17)",
    question: "You can find the right 3-bet — but only when you stop and consciously work it out. Which level are you at?",
    choices: ["Unconscious Incompetence", "Conscious Incompetence", "Conscious Competence", "Unconscious Competence"],
    answer: 2,
    explain: "That's Conscious Competence — the skill works but needs concentration. Repetition (purposeful practice) moves it to Unconscious Competence, where it's automatic at the table."
  },
  {
    id: "p1-purposeful-practice",
    phase: 1, type: "flashcard", concept: "purposeful-practice",
    source: "How to Study Poker V1 — Ch.4 (p.21, Workbook p.6)",
    question: "What are the 4 parts of Purposeful Practice?",
    answer: "1) Begin with a clear goal (know the exact skill). 2) Plan your work & work your plan (pick targeted content, take notes). 3) Challenge yourself (FOCUS sessions, teach it, record game tape). 4) Measure your progress (a stat/number before & after). 'Only perfect practice makes perfect.'"
  },
  {
    id: "p1-focusing-question",
    phase: 1, type: "flashcard", concept: "focusing-question",
    source: "How to Study Poker V1 — Ch.4 & Step 3 (Workbook p.6, 11)",
    question: "What is 'The Focusing Question', and what is it for?",
    answer: "'What's the ONE thing I can study right now such that by learning it, everything else becomes easier or unnecessary?' Use it to cut a huge to-study list down to the single highest-leverage topic to start with."
  },
  {
    id: "p1-learning-model",
    phase: 1, type: "flashcard", concept: "learning-process-model",
    source: "How to Study Poker V1 — Ch.5 (p.25, Workbook p.7)",
    question: "What are the 5 stages of the Learning Process Model?",
    answer: "Prepare (warm-up) → Perform (play with ONE focus) → Results (the $/hands/length outcome) → Evaluate (rate your A/B/C game, tilt, how well you held focus) → Analysis (off-felt deep work: hand reviews, videos, coaching). It's a cycle that feeds the next session."
  },
  {
    id: "p1-learning-model-mc",
    phase: 1, type: "mc", concept: "learning-process-model",
    source: "How to Study Poker V1 — Ch.5 (p.25)",
    question: "In the Learning Process Model, when should you do deep hand-history reviews?",
    choices: [
      "During the session, while playing (Perform)",
      "Immediately after, in the Results stage",
      "In the Analysis stage — off the felt, ideally a bit later so you can be objective",
      "You shouldn't review hands at all"
    ],
    answer: 2,
    explain: "Analysis happens off-the-felt and not right after the session — distance lets you review objectively. Playing (Perform) and tallying Results are separate from the deep work."
  },
  {
    id: "p1-destination",
    phase: 1, type: "flashcard", concept: "poker-destination",
    source: "How to Study Poker V1 — Step 1, Action Step #10 (p.37, Workbook p.9)",
    question: "Before choosing what to study, Matsuhashi has you answer 3 'poker destination' questions. What are they?",
    answer: "1) Why do I play poker? 2) At what level/stakes would I feel I've achieved something great? 3) Full-time, or a profitable part-time endeavor? Your destination decides what's worth studying — you can't pick a route without knowing where you're going."
  },
  {
    id: "p1-8020-domino",
    phase: 1, type: "flashcard", concept: "focusing-question",
    source: "How to Study Poker V1 — Step 3 (p.44, Workbook p.11)",
    question: "What 3 principles does Matsuhashi use to choose WHAT to study?",
    answer: "1) The 80/20 Principle — 80% of results come from 20% of efforts, so focus there. 2) The Focusing Question — the ONE highest-leverage thing. 3) The Domino Effect — build in small incremental steps; each topic topples a bigger one (it's literally why the strategy series is called 'The Dominoes of Poker')."
  },
  {
    id: "p1-domino-mc",
    phase: 1, type: "mc", concept: "focusing-question",
    source: "How to Study Poker V1 — Step 3 (p.44)",
    question: "What does the 'Domino Effect' mean for how you study?",
    choices: [
      "Study everything at once so nothing is missed",
      "Build in small, smart, incremental steps where each topic sets up a bigger one",
      "Only study when you feel motivated",
      "Skip the hard topics entirely"
    ],
    answer: 1,
    explain: "One domino can topple another 50% bigger. Start small, study topics that build on each other, and over time you topple the 'mountain-sized' goal. Incremental beats scattershot."
  },

  /* --- extra MC drills to deepen pools & balance the type mix (Phase 1 study) --- */
  {
    id: "p1-openminded-mc",
    phase: 1, type: "mc", concept: "study-mindset",
    source: "How to Study Poker V1 — Ch.2 (Open-minded)",
    question: "A great poker mind is 'open-minded'. Which behavior shows it?",
    choices: [
      "Defending the way you've always played because it won before",
      "Willing to test any new idea/line and drop one that's proven worse — no single 'right' way to play a hand",
      "Copying whatever the biggest stack does",
      "Refusing to study lines you find uncomfortable"
    ],
    answer: 1,
    explain: "Open-minded = you put new strategies to the test and let results/logic update your game. There's no one right way to play a hand or spot."
  },
  {
    id: "p1-takeaction-mc",
    phase: 1, type: "mc", concept: "learn-from-books",
    source: "How to Study Poker V1 — Ch.1 (take action)",
    question: "You just finished a chapter. What's the highest-value next move?",
    choices: [
      "Immediately start the next chapter",
      "Put ONE concrete thing from it into action in your next session",
      "Re-read it twice to memorize it",
      "Bookmark it to apply 'later'"
    ],
    answer: 1,
    explain: "Action is the teacher. One applied takeaway per chapter beats passively consuming more pages — knowledge becomes skill only through reps."
  },
  {
    id: "p1-ranges-mc",
    phase: 1, type: "mc", concept: "thinking-in-ranges",
    source: "How to Study Poker / JL — thinking in ranges",
    question: "A super-tight player open-raises from under the gun. How should you think about their hand?",
    choices: [
      "They have exactly A-K",
      "A RANGE — e.g. AA, KK, QQ, JJ, AK — that you narrow as the hand goes on",
      "Impossible to know, so just play your cards",
      "They're definitely bluffing"
    ],
    answer: 1,
    explain: "Never assign one hand — assign a range and narrow it street by street. A tight UTG raiser is a tight range you can read against, not a single holding."
  },
  {
    id: "p1-purposeful-mc",
    phase: 1, type: "mc", concept: "purposeful-practice",
    source: "How to Study Poker V1 — Ch.4 (purposeful practice)",
    question: "Which is actually 'purposeful practice'?",
    choices: [
      "Watching random poker videos while half-paying-attention",
      "Picking ONE skill, setting a goal, drilling it with focus, and measuring a stat before/after",
      "Grinding as many tables as possible",
      "Reading three strategy articles on different topics"
    ],
    answer: 1,
    explain: "Purposeful practice = clear goal on ONE skill + focused reps + measurement. Scattered consumption isn't practice; 'only perfect practice makes perfect.'"
  },
  {
    id: "p1-journal-mc",
    phase: 1, type: "mc", concept: "poker-journal",
    source: "How to Study Poker V1 — Step 5 (journal)",
    question: "Which belongs in a post-session journal entry?",
    choices: [
      "Only the hands you won",
      "Your strategy focus, mistakes made, baffling spots, any tilt, and a rating of your play",
      "Just the final $ result",
      "Nothing — good players don't journal"
    ],
    answer: 1,
    explain: "The After-Action Review captures focus, mistakes, baffling spots, tilt, and an A/B/C self-rating — that's what turns sessions into improvement (and feeds your coach)."
  },
  {
    id: "p1-tagfish-mc",
    phase: 1, type: "mc", concept: "player-types",
    source: "Preflop Online Poker — Sub-Domino 1.1 (TAGfish)",
    question: "A 'TAGfish' (bad reg — tight-ish but plays more from late position) keeps stealing your blinds from the CO/BTN. Best counter?",
    choices: [
      "Fold and wait for aces",
      "3bet-resteal from the blinds frequently — they open too wide late and over-fold to 3bets",
      "Call every steal and play guessing games postflop",
      "Limp behind to set-mine"
    ],
    answer: 1,
    explain: "TAGfish open too wide in late position but can't handle 3bets — punish their steals with light 3bet-resteals from the blinds."
  },
  {
    id: "p1-maniac-mc",
    phase: 1, type: "mc", concept: "player-types",
    source: "Preflop Online Poker — Sub-Domino 1.1 (Maniac)",
    question: "A Maniac (plays tons of hands, bluffs constantly) keeps barreling into you. Best adjustment?",
    choices: [
      "Bluff them back even harder",
      "Tighten up, then call down lighter and value-bet relentlessly — let them bluff into your made hands",
      "Fold everything but the nuts",
      "Avoid the table entirely"
    ],
    answer: 1,
    explain: "Don't fight a Maniac's fire with fire. Sit tight, let them barrel into your strong hands, call down lighter, and value-bet — they tilt and spew after failed bluffs."
  },

  /* ---------- Preflop · KISS system (Phase 1 strategy) — Preflop Online Poker ---------- */
  {
    id: "pf-kiss-opens",
    phase: 1, type: "flashcard", concept: "rfi-ranges",
    source: "Preflop Online Poker — Sub-Domino 1.2 (KISS open ranges)",
    question: "What are the 3 KISS base opening ranges by position (the whole simplified system)?",
    answer: "EP 12% · CO 20% (also the SB) · BTN 31% (also the BB). Three ranges cover every seat. Start from these, then adjust to opponents. Never open-limp — raising is more profitable."
  },
  {
    id: "pf-ep-open",
    phase: 1, type: "mc", concept: "rfi-ranges",
    source: "Preflop Online Poker — EP 12% range (Sub-Domino 1.2)",
    question: "You're in EARLY position (12% range). Which of these is an open-raise?",
    choices: ["K♠9♠", "A♥5♥", "Q♦9♦", "J♣8♣"],
    answer: 1,
    explain: "The EP 12% range is tight & high-playability: AA-22, AKo-AQo, AKs-ATs, A5s-A2s, KQs, QJs, JTs, T9s, 98s, 87s, 76s. A5s makes it (small suited ace); K9s/Q9s/J8s are too weak this early and play badly OOP."
  },
  {
    id: "pf-btn-open",
    phase: 1, type: "mc", concept: "rfi-ranges",
    source: "Preflop Online Poker — BTN 31% range (Sub-Domino 1.2)",
    question: "Folded to you on the BUTTON (31% range). Which is a fine steal-open?",
    choices: ["3♥2♥", "K♦5♦", "J♠5♣", "8♦4♦"],
    answer: 1,
    explain: "BTN 31% includes K2s+, so K5s is an easy open/steal. 32s/84s are below the suited cutoff and J5o is offsuit junk. Steal wide from the BTN — best position, and weak hands mixed in make you hard to read. But 'if they ain't folding, we ain't bluffing.'"
  },
  {
    id: "pf-no-limp",
    phase: 1, type: "flashcard", concept: "rfi-ranges",
    source: "Preflop Online Poker — Open Raising + Raise-Over-Limpers",
    question: "KISS rule on limping — and what do you do from the blinds when limpers are already in?",
    answer: "Never open-limp or over-limp; raising is more profitable. From the blinds facing non-blind limpers, use the tight value-only Raise-Over-Limpers range (7%, ~96 combos): AA-99, AKo-AJo, AKs-ATs, KQs-KJs. Go for value, don't bloat pots OOP with junk."
  },
  {
    id: "pf-combo-count",
    phase: 1, type: "flashcard", concept: "combo-counting",
    source: "Preflop Online Poker — Combo counting (Sub-Domino 1.2)",
    question: "How many combos in a pocket pair, a suited hand, and an offsuit hand — and how many combos ≈ 10%?",
    answer: "Pair = 6, suited = 4, offsuit = 12. There are 1,326 total combos, so ~133 combos = 10%. Thinking in combos (not just 'hands') is how you size ranges accurately."
  },
  {
    id: "pf-combo-mc",
    phase: 1, type: "mc", concept: "combo-counting",
    source: "Preflop Online Poker — Combo counting example",
    question: "A villain's 3bet range is TT+ and AQ+. How many combos is that?",
    choices: ["30", "62", "100", "16"],
    answer: 1,
    explain: "5 pairs (TT,JJ,QQ,KK,AA) × 6 = 30, plus AK (16) and AQ (16) = 32. Total 62 combos. Counting combos tells you how often they actually have it."
  },
  {
    id: "pf-player-nit",
    phase: 1, type: "mc", concept: "player-types",
    source: "Preflop Online Poker — Sub-Domino 1.1 (6 player types)",
    question: "A NIT (very tight, folds too much) opens. What's the main exploit?",
    choices: [
      "4bet-bluff them often",
      "Steal their blinds and 3bet them in position frequently — they over-fold",
      "Limp behind and hope to flop big",
      "Call down light — they're always bluffing"
    ],
    answer: 1,
    explain: "Nits fold far too often, so steal their blinds and 3bet them IP relentlessly. But RESPECT their 3bets/4bets (those are real value) — don't 4bet-bluff. They're fit-or-fold postflop too."
  },
  {
    id: "pf-player-whale",
    phase: 1, type: "flashcard", concept: "player-types",
    source: "Preflop Online Poker — Sub-Domino 1.1 (Whale)",
    question: "How do you exploit a WHALE (recreational — plays tons of hands, hates folding)?",
    answer: "Value bet relentlessly and rarely bluff (they don't fold — 'if they ain't folding, you ain't bluffing'). Never slow-play monsters against them. Sit to their LEFT (act after them, in position) via table & seat selection."
  },
  {
    id: "pf-3bet-polarized",
    phase: 1, type: "flashcard", concept: "3bet-construction",
    source: "Preflop Online Poker — Sub-Domino 1.4 (3bet ranges)",
    question: "KISS 3bet ranges are POLARIZED. What does that mean, and what's the bluff cap?",
    answer: "Polarized = value hands + bluff hands, NOT medium hands (you flat-call those). Build the bluff portion to ≤30% of your total 3bet range. Always know WHY: for value (called by worse) or as a bluff (fold out better)."
  },
  {
    id: "pf-3bet-defense",
    phase: 1, type: "mc", concept: "3bet-defense",
    source: "Preflop Online Poker — Sub-Domino 1.5 (3bet defense)",
    question: "You open, a villain 3bets you. What's the KISS defense baseline?",
    choices: [
      "Value 4bet KK+, flat-call QQ-TT and AQ+, fold the rest (mix in A5s/A4s as 4bet bluffs)",
      "Always call to see a flop",
      "Fold everything except aces",
      "4bet any ace"
    ],
    answer: 0,
    explain: "KISS 3bet defense: 4bet your nut value (KK+), flat the strong-but-not-nut hands (QQ-TT, AQ+), fold the rest. In wider spots add small-suited-ace 4bet bluffs (A5s/A4s) — blockers + playability."
  },
  {
    id: "pf-adjust",
    phase: 1, type: "flashcard", concept: "rfi-ranges",
    source: "Preflop Online Poker — Using the KISS ranges (principles)",
    question: "The KISS ranges are a starting point. When do you tighten or widen them?",
    answer: "TIGHTEN (e.g. use the EP range from the CO) when aggressive players sit to your left and make things hard. WIDEN (use the BTN range from earlier seats) when opponents let you steal freely. Never follow ranges blindly — adjust to opponents & dynamics."
  },
  {
    id: "pf-stack-adjust",
    phase: 1, type: "mc", concept: "avoiding-domination",
    source: "Preflop fundamentals (also JL Tournaments p.4)",
    question: "Why are hands like 4♦4♠ and 9♥7♥ great DEEP (100bb) but weak SHORT (15bb)?",
    choices: [
      "Deep, they can win a huge pot when they flop big (set/two pair); short, there's no implied odds to pay off the speculative call",
      "They're always premium hands",
      "They should be folded at every stack depth",
      "They play better than AK when short"
    ],
    answer: 0,
    explain: "Implied-odds hands (small pairs, suited connectors) need deep stacks — you risk a little to win a lot when you hit. Short-stacked you can't win enough to justify it, so shift to high-card strength / push-fold."
  },
  {
    id: "pf-domination",
    phase: 1, type: "mc", concept: "avoiding-domination",
    source: "Preflop fundamentals (also JL Tournaments p.31)",
    question: "A tight player opens. You hold A♦9♣ in late position. Best default?",
    choices: [
      "Fold — A9/KT are easily dominated vs a tight opening range",
      "3-bet to isolate",
      "Call to set-mine",
      "Call and check-raise any flop"
    ],
    answer: 0,
    explain: "A9 and KT make strong-but-DOMINATED hands (e.g. KT on K72) that lose big and win small vs tight ranges. Fold and wait for a cleaner spot."
  },

  /* ---------- PHASE 2 · Postflop (Dominoes 5–8) — Post-Flop Online Poker ----------
     Read-based, not HUD-based: Ido plays 7XL with no HUD, so "stats" become live reads. */
  {
    id: "po-handread-questions",
    phase: 2, type: "flashcard", concept: "hand-reading",
    source: "Post-Flop Online Poker — Domino 5 (the 4 narrowing questions)",
    question: "Matsuhashi's 4 post-flop hand-reading questions for narrowing a range?",
    answer: "1) 'What are they doing this with?' (the Ultimate Question). 2) How well does their range hit this board? 3) Why didn't they check/bet/raise/fold? 4) What does their action/read tell you? Ranges only SHRINK street by street — never grow past the preflop range."
  },
  {
    id: "po-ultimate-q",
    phase: 2, type: "flashcard", concept: "hand-reading",
    source: "Post-Flop Online Poker — Domino 5.1 (Poker's Ultimate Question)",
    question: "What is 'Poker's Ultimate Question', and why ask it every street?",
    answer: "'What are they doing this with?' Asked at every decision, it forces you to build their range from their preflop tendencies + each action, so you play their RANGE, not your own two cards. It's the engine of hand reading."
  },
  {
    id: "po-range-hits",
    phase: 2, type: "mc", concept: "hand-reading",
    source: "Post-Flop Online Poker — Domino 5/6 (range-board interaction)",
    question: "On a random flop, how often does a typical preflop range flop top-pair-or-better / a real draw?",
    choices: ["About 65%", "Only about 25–35% (it MISSES ~65%)", "Almost always", "Exactly 50%"],
    answer: 1,
    explain: "Ranges connect (TP+ or OESD+) only ~25–35% of the time and miss ~65%. That gap is the fold equity that makes c-betting profitable — most of the time your opponent also missed."
  },
  {
    id: "po-cbet-why",
    phase: 2, type: "mc", concept: "cbet-fundamentals",
    source: "Post-Flop Online Poker — Domino 6.1 (why you cbet)",
    question: "There are only TWO valid reasons to make a continuation bet. Which pair is right?",
    choices: [
      "For value, or as a bluff",
      "For information, or to 'see where I'm at'",
      "Because I raised preflop, or out of habit",
      "To look strong, or to be unpredictable"
    ],
    answer: 0,
    explain: "Only two reasons: VALUE (you want calls from worse) or BLUFF (you want folds). Never cbet 'by default', 'for info', or to 'see where I'm at'. For a bluff you must be able to name hands they can fold."
  },
  {
    id: "po-bread-butter",
    phase: 2, type: "flashcard", concept: "cbet-fundamentals",
    source: "Post-Flop Online Poker — Domino 6.1 (Bread & Butter)",
    question: "What is a 'Bread & Butter' spot, and why do you want it?",
    answer: "You're IN POSITION on the flop as the preflop raiser, facing just 1–2 opponents. The most profitable common spot: range + position + initiative, so you can cbet for value or as a bluff and apply maximum pressure. Engineer your preflop play to be here often."
  },
  {
    id: "po-cbet-size",
    phase: 2, type: "mc", concept: "cbet-fundamentals",
    source: "Post-Flop Online Poker — Domino 6.1 (cbet sizing)",
    question: "What's the recommended DEFAULT c-bet size?",
    choices: ["1/2 pot", "2/3 pot", "Always all-in", "1/4 pot"],
    answer: 1,
    explain: "Default 2/3 pot. Avoid a standard 1/2 pot — players are so used to it that it doesn't hit their 'pain threshold'. 2/3 also disguises strength (value and bluffs look identical). Adjust up/down with reads."
  },
  {
    id: "po-cbet-fish",
    phase: 2, type: "mc", concept: "cbet-fundamentals",
    source: "Post-Flop Online Poker — Domino 6.1 (read-based, vs a Fish)",
    question: "A loose-passive Fish almost never folds to flop cbets. You flop top pair. Best line?",
    choices: [
      "Value-bet (and keep value-betting) — never slow-play vs a Fish",
      "Check behind for pot control",
      "Bluff bigger to make him fold",
      "Check-raise only on the turn"
    ],
    answer: 0,
    explain: "Never slow-play monsters vs Fish — build the pot while they'll pay. Don't bluff them ('if they ain't folding, you ain't bluffing'). The READ replaces the HUD: you've SEEN him call too much, so value-bet relentlessly."
  },
  {
    id: "po-board-texture",
    phase: 2, type: "mc", concept: "board-texture",
    source: "Post-Flop Online Poker — Domino 6.3 (board texture)",
    question: "You raised preflop and want to cbet as a bluff. Which flop is BEST to bluff at?",
    choices: [
      "A dry high board like K-7-2 rainbow (misses most calling ranges)",
      "A wet board like 9-8-7 two-tone",
      "A low connected board like 6-5-4",
      "It never matters — bluff every board"
    ],
    answer: 0,
    explain: "Dry high boards (K72r) smash YOUR raising range and miss the caller's range — they fold often. Wet/connected low boards hit a caller's range and give draws to continue, so they're poor bluffing boards."
  },
  {
    id: "po-barrel",
    phase: 2, type: "flashcard", concept: "barreling",
    source: "Post-Flop Online Poker — Domino 6.4 (double/triple barreling)",
    question: "Before you fire a second/third barrel as a bluff, what must you be able to do?",
    answer: "Name the hands in their range that the turn/river card lets them fold, AND have a plan for their response. Good barrel cards scare THEIR range (overcards / cards that complete draws you'd represent). Don't barrel blindly — pick cards bad for their range."
  },
  {
    id: "po-ev",
    phase: 2, type: "flashcard", concept: "postflop-math",
    source: "Post-Flop Online Poker — Domino 7.1 (Expected Value)",
    question: "What is a +EV decision, and what's the EV of folding?",
    answer: "+EV = a play that wins chips in the long run. Folding is 0 EV (you neither win nor lose). Goal: pick the highest-EV option each decision — a -EV call loses money long-term even if it sometimes wins the pot."
  },
  {
    id: "po-breakeven",
    phase: 2, type: "mc", concept: "postflop-math",
    source: "Post-Flop Online Poker — Domino 7.2 (break-even point)",
    question: "You bluff 2/3 pot. Roughly how often must it work to break even?",
    choices: ["~40%", "~25%", "~67%", "~10%"],
    answer: 0,
    explain: "Break-even fold% = bet / (bet + pot) = 0.67 / 1.67 ≈ 40%. If they fold more than ~40% of the time, the bluff prints. Knowing the break-even point turns 'feel' bluffs into math."
  },
  {
    id: "po-defense",
    phase: 2, type: "mc", concept: "postflop-defense",
    source: "Post-Flop Online Poker — Domino 8 (defending vs cbets)",
    question: "Villain c-bets you. Which is NOT one of the core defenses Matsuhashi teaches?",
    choices: [
      "Raise / check-raise",
      "Call / float (call now to take it away on a later street)",
      "Probe / donk bet",
      "Always fold unless you have top pair"
    ],
    answer: 3,
    explain: "Defending vs cbets = raise/check-raise, call/float (call the flop planning to take it later), and donk/probe betting. Auto-folding everything but top pair is exactly the over-folding good players exploit."
  },

  /* ---------- PHASE 3 · Postflop & Tournaments (REAL JL hands from the PDF) ---------- */
  {
    id: "p3-kq-valuebet",
    phase: 3, type: "scenario", concept: "value-betting-vs-loose-passive",
    source: "JL — Small Stakes Tournaments (p.14): K-Q on K-T-7",
    setup: "100bb deep. You raise to 3bb with K♣Q♥. A loose-PASSIVE player calls on the button.",
    board: ["Ks","Th","7d"],
    hand: ["Kc","Qh"],
    info: { stack: "100bb", pos: "vs BTN call", pot: "~7bb" },
    question: "Flop K♠T♥7♦ — top pair good kicker. Your action?",
    choices: ["Check to keep pot small", "C-bet ~4bb for value", "Check-raise plan", "Over-bet to deny equity"],
    answer: 1,
    explain: "Little's line: c-bet ~4bb, then barrel most turns. vs loose-passive players you VALUE BET RELENTLESSLY with top-pair-good-kicker — they pay off with worse Kx, Tx and draws. If they raise you, you can confidently fold to a slow-played set/two-pair."
  },
  {
    id: "p3-river-sizing",
    phase: 3, type: "mc", concept: "thin-value-sizing",
    source: "JL — Small Stakes Tournaments (p.14): river sizing vs passive",
    question: "Same K-Q hand, safe river, villain is loose-passive. You want max value. Best river size?",
    choices: [
      "75% pot — big value",
      "~33% pot (small) — they fold worse to big bets but call small with one-pair hands",
      "Check and give up",
      "Pot-sized shove"
    ],
    answer: 1,
    explain: "Counter-intuitive but key: a SMALL ~33% river bet gets called by all their one-pair hands. A big 75% bet folds out exactly the hands you beat and only gets called when you're crushed. Against passive players, bet small for thin value."
  },
  {
    id: "p3-induce-bluff",
    phase: 3, type: "scenario", concept: "inducing-bluffs-vs-aggressive",
    source: "JL — Small Stakes Tournaments (p.18): A-T on A-7-4",
    setup: "50bb. You raise 2.5bb with A♠T♦ from MP. A player who plays too many hands too AGGRESSIVELY calls.",
    board: ["Ad","7s","4c"],
    hand: ["As","Td"],
    info: { stack: "50bb", pos: "vs aggressive caller", pot: "~6bb" },
    question: "Flop A♦7♠4♣ — you have top pair. The aggressive player will fold to a bet but bluffs when checked to. Best line?",
    choices: ["Bet for value/protection", "CHECK to induce a bluff", "Check-fold", "Over-bet"],
    answer: 1,
    explain: "vs an aggressive player, CHECK to induce. They fold to your bets but can't resist betting when you show weakness. Then check-CALL down (not check-raise — that folds out the worse hands and draws you beat). Let them bluff their stack off."
  },
  {
    id: "p3-set-vs-aggro",
    phase: 3, type: "mc", concept: "trapping-vs-aggressive",
    source: "JL — Small Stakes Tournaments (p.20): 3-3 on J-6-3",
    question: "BB with 3♥3♣ vs an aggressive MP raiser. Flop J♠6♦3♠ gives you bottom set. After you lead 3.5bb he raises to 9bb. Best plan?",
    choices: [
      "Re-raise big — get it in now",
      "Go into call-down mode: just call, then check-call turn & river",
      "Fold to the raise",
      "Shove all-in"
    ],
    answer: 1,
    explain: "With the nuts vs an aggressive player, DON'T re-raise (it screams strength and folds out his bluffs). Call down. He's drawing nearly dead and will keep firing bluffs. Exception: if the board gets dangerous (e.g. J-6-3-T-A) you switch to check-RAISE."
  },
  {
    id: "p3-pushfold-15bb",
    phase: 3, type: "mc", concept: "push-fold-ranges",
    source: "Knowledge base — tournament push/fold baseline",
    question: "15bb stack, folded to you on the BTN. Which hand is a clear OPEN-SHOVE / open?",
    choices: ["K♣T♠", "8♦5♣", "Q♥6♦", "J♠4♥"],
    answer: 0,
    explain: "At ~15bb on the button you open/shove roughly the top 25%: 22+, any ace, KTs+/KQo, QJs. KTo is comfortably in range. The other three are folds — too weak to play for 15bb from any position."
  },
  {
    id: "p3-blocking-bet",
    phase: 3, type: "flashcard", concept: "reverse-blocking-bet",
    source: "JL — Small Stakes Tournaments (p.21): A-3 on A-7-6-2-J",
    question: "You hold A♣3♦ on A-7-6-2-J vs an aggressive player who checked the turn. Why make a tiny ~2.5bb 'blocking' bet into an 18bb pot?",
    answer: "Because he checked the turn he probably has no ace. A tiny river bet (a) gets called by all his worse made hands for thin value, and (b) if he raises, it's his junk bluffing — and you've turned a normally-bad blocking bet into a trap by exploiting his aggression. Against thinking players this is bad; against aggro fish it's gold."
  },
  {
    id: "p3-bet-size-tells",
    phase: 3, type: "flashcard", concept: "bet-sizing-tells",
    source: "JL — Small Stakes Tournaments (p.17)",
    question: "Many small-stakes players have a bet-sizing tell. What's the common pattern and how do you exploit it?",
    answer: "They bet small (~1/3 pot) with weak/medium hands and large (~2/3+ pot) with strong hands — or check-raise only with top pair+. Read the size as a window into strength: fold non-premium hands to their big bets, and float/raise their small bets. They almost never change patterns, so the exploit prints forever."
  },
  {
    id: "p3-tight-aggro-fold",
    phase: 3, type: "mc", concept: "fold-to-tight-3bet",
    source: "JL — Small Stakes Tournaments (p.33): A-J vs tight 3-bet",
    question: "35bb. You open A♥J♠ from the hijack. A TIGHT player on the button 3-bets to 7bb. Best play?",
    choices: [
      "4-bet shove — AJ is strong",
      "Call and play postflop",
      "Easy fold — you're dominated and OOP",
      "Call and bluff most boards"
    ],
    answer: 2,
    explain: "vs a TIGHT player's 3-bet, AJ is an easy fold: you're usually dominated (AK/AQ/QQ+) and when you're not, you play a tricky hand OOP that misses 2/3 of flops. Shoving is bad — tight players call only with hands that beat you and fold the rest."
  }
];
