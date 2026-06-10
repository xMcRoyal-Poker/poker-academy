/* ============================================================
   CURRICULUM — faithful, self-paced, one MODULE per sub-domino.
   This honors Matsuhashi's method: spend as long as you need on ONE
   sub-domino, ingrain it (the book's "Play With Purpose" task), and
   advance to the next only when the skill feels solid — not on a timer.

   - Each module = one book sub-domino (the book's own unit of study).
   - `focus` = the session's purposeful-practice task (the book's
     "Play With Purpose", adapted to Ido's no-HUD 7XL play → reads, not stats).
   - You do as many sessions on a module as you want; the dashboard's
     "Got this — next sub-domino" button advances you when ready.
   - Study method (How to Study Poker) is woven into the early Phase-1
     modules' reading + drills, tapering as you progress.

   Phases group modules for level-gating: 1 = Preflop+Study, 2 = Postflop,
   3 = Tournaments. Full path ≈ 38 sub-dominoes — at your own pace.
   ============================================================ */
window.PT = window.PT || {};

PT.CURRICULUM = {
  loop: ["Prepare", "Perform", "Evaluate", "Analyze"], // Learning Process Model (Ch.5)

  phases: [
    {
      id: 1,
      name: "Preflop + Study Engine",
      books: "Preflop Online Poker (Dominoes 1–4) + How to Study Poker woven in",
      blurb: "Build your study habits AND your preflop game together — one sub-domino at a time.",
      modules: [
        { domino: "1.1", title: "Position & Player Types", read: "🧠 Take action + great-minds mindset · ♠ position & the 6 player types", focus: "Tag every opponent's player type (Nit / TAGfish / TAG / LAG / Whale / Maniac) before you play a big pot with them.", stat: "Read opponents' VPIP / PFR / 3bet (%) to classify each player's type.", concepts: ["player-types","study-mindset","learn-from-books","thinking-in-ranges"] },
        { domino: "1.2", title: "KISS Open-Raising Ranges", read: "🧠 Your destination + a SMART goal · ♠ the 3 KISS opens (EP12 / CO20 / BTN31) + combos", focus: "Open-raise ONLY your KISS ranges this session — no limping, no off-range opens. Note any time you deviated and why.", stat: "Your VPIP & PFR — VPIP should tighten and PFR rise as you stick to KISS opens; note both before & after.", concepts: ["rfi-ranges","combo-counting","poker-destination","smart-goals"] },
        { domino: "1.3", title: "2bet Calling Ranges", read: "🧠 The Focusing Question · ♠ what to call a raise with, by position", focus: "Before every call of a raise, ask: 'is this hand in my calling range for this position, and will it play well postflop?'", stat: "Your VPIP — keep calls disciplined so it doesn't balloon away from your PFR.", concepts: ["rfi-ranges","avoiding-domination","focusing-question"] },
        { domino: "1.4", title: "3bet Ranges", read: "🧠 Purposeful practice (4 parts) · ♠ building a polarized 3bet range", focus: "3bet at least 3 times this session using value+bluff (polarized) hands — keep bluffs to ≤30% of your 3bets.", stat: "Your 3bet% — should rise toward a healthy number as you add the polarized bluffs.", concepts: ["3bet-construction","unconscious-competence","purposeful-practice"] },
        { domino: "1.5", title: "3bet Defense Ranges", read: "🧠 Ask 'Why?' · ♠ 4bet / call / fold when you get 3bet", focus: "When 3bet, consciously sort your hand into 4bet (KK+) / call (QQ-TT, AQ+) / fold. Don't auto-fold or auto-call.", concepts: ["3bet-defense","fold-to-tight-3bet","asking-why"] },
        { domino: "2.1", title: "Stealing Fundamentals", read: "🧠 The Learning Process Model · ♠ why & when to blind-steal (not any-two)", focus: "From CO/BTN/SB, steal with your KISS range when folded to you — and notice who's folding their blinds.", stat: "Your ATS (Attempt To Steal) — should climb as you steal more from late position.", concepts: ["rfi-ranges","player-types","learning-process-model"] },
        { domino: "2.2", title: "Reading Steal Spots", read: "♠ who to target stealing (use reads + their VPIP/PFR)", focus: "Pick the 2 players most likely to fold their blinds and target them. Avoid stealing into the sticky callers.", stat: "Opponents' VPIP/PFR (who's tight = steal them) + your own ATS.", concepts: ["player-types","observation"] },
        { domino: "2.3", title: "Steal Positional Analysis", read: "♠ adjusting steal width by position & opponents", focus: "Widen your steals when the blinds are nits; tighten when they fight back. Note one adjustment you made.", stat: "Your ATS by position (CO vs BTN vs SB).", concepts: ["rfi-ranges","avoiding-domination"] },
        { domino: "2.4", title: "Blind-Stealing Consequences", read: "🧠 Set this week's theme (Weekly Plan) · ♠ playing the pot after a steal gets called", focus: "When your steal gets called, have a postflop plan BEFORE the flop. Win the blinds without a hand when you can.", stat: "Your ATS (keep it healthy without spewing when called).", concepts: ["rfi-ranges","weekly-plan"] },
        { domino: "3.1", title: "3bet Essentials", read: "♠ why we 3bet: value vs fold-equity", focus: "Every time you 3bet, say (to yourself) whether it's for value or as a bluff before you click.", stat: "Your 3bet%.", concepts: ["3bet-construction"] },
        { domino: "3.2", title: "Value 3bets", read: "♠ which hands 3bet for value, by combos", focus: "Value-3bet your premiums for max value vs the players who call too wide. Don't slow-play them preflop.", stat: "Your 3bet% (and who you're 3betting — target the loose callers).", concepts: ["3bet-construction","combo-counting"] },
        { domino: "3.3", title: "Better Bluff 3bets", read: "♠ choosing bluff-3bet hands (blockers + playability)", focus: "Bluff-3bet with hands that have an ace/king blocker or can flop equity (A5s, 76s) — not random trash.", stat: "Your 3bet% — the bluff portion should push it up without going reckless.", concepts: ["3bet-construction"] },
        { domino: "3.4", title: "3bet Defense (deep)", read: "♠ defending vs 3bets & 4bets in tougher spots", focus: "Against a tight 3bettor, fold the dominated stuff (AJ, KQ OOP). Against a LAG, fight back more.", concepts: ["3bet-defense","fold-to-tight-3bet"] },
        { domino: "4.1", title: "Defending the Blinds", read: "🧠 Start your poker journal · ♠ defending the BB/SB vs steals", focus: "Defend your big blind a bit wider vs late-position steals — but only with hands that play OK postflop.", stat: "Your VPIP from the blinds (defend more, but don't over-call).", concepts: ["avoiding-domination","poker-journal"] },
        { domino: "4.2", title: "Post-flop Blind Defense", read: "♠ playing flops after you defend OOP", focus: "After defending OOP, pick your spots to check-call vs check-fold based on board and opponent. Don't auto-fold.", concepts: ["avoiding-domination","observation"] },
        { domino: "4.3", title: "Blind vs Blind", read: "🧠 Lock in a 30-day study habit · ♠ SB vs BB battles", focus: "In blind-vs-blind, widen up and use position (BB closes the action). Review your BvB hands afterward.", stat: "Your VPIP/PFR in blind-vs-blind spots.", concepts: ["rfi-ranges","study-habits"] }
      ]
    },
    {
      id: 2,
      name: "Postflop",
      books: "Post-Flop Online Poker (Dominoes 5–8) — study method now applied",
      blurb: "Hand reading, c-bets, math and defense — one sub-domino at a time.",
      modules: [
        { domino: "5.1", title: "How to Hand Read", read: "♠ the hand-reading process + Poker's Ultimate Question", focus: "Do 1 full hand-reading exercise: take a showdown hand and reconstruct their range street by street.", concepts: ["hand-reading"] },
        { domino: "5.2", title: "Assigning Preflop Ranges", read: "♠ giving opponents an accurate preflop range", focus: "Before the flop, assign every player still in the pot a rough preflop range based on position + type.", concepts: ["hand-reading","rfi-ranges"] },
        { domino: "5.3", title: "Narrowing Ranges Post-flop", read: "🧠 'Why?' on every street · ♠ the 4 narrowing questions", focus: "On each street, ask 'why didn't they check/bet/raise/fold?' and remove hands from their range accordingly.", concepts: ["hand-reading","asking-why"] },
        { domino: "5.4", title: "Hand Reading On-the-Felt", read: "🧠 Run the Learning Process Model · ♠ live hand reading", focus: "For 1 session, ask 'what are they doing this with?' on every action you face — even before folding.", concepts: ["hand-reading","learning-process-model"] },
        { domino: "6.1", title: "C-Bets in Bread & Butter", read: "♠ value vs bluff cbets, B&B spots, 2/3 sizing", focus: "Only c-bet for a clear reason (value or bluff). Use 2/3 pot. Skip the 'default' c-bets with no plan.", concepts: ["cbet-fundamentals"] },
        { domino: "6.2", title: "Out-of-Position C-Bets", read: "♠ c-betting (and checking) from OOP", focus: "OOP, check more of your range to stay balanced; c-bet the boards that favor your range. Note one check you'd normally auto-bet.", concepts: ["cbet-fundamentals"] },
        { domino: "6.3", title: "Utilizing Board Texture", read: "♠ which boards favor the raiser vs the caller", focus: "Before c-betting, judge: does this flop hit MY range or THEIRS? Bluff the boards that miss them (K72r).", concepts: ["board-texture"] },
        { domino: "6.4", title: "Double & Triple Barreling", read: "♠ picking good barrel cards", focus: "When you barrel a bluff, name a hand they fold to it. Barrel turn/river cards that are bad for THEIR range.", concepts: ["barreling","board-texture"] },
        { domino: "7.1", title: "Decisions with EV", read: "♠ thinking in Expected Value", focus: "On one tough decision, compare the EV of each option out loud (folding = 0). Pick the highest-EV play.", concepts: ["postflop-math"] },
        { domino: "7.2", title: "The Break-even Point", read: "♠ break-even % for bluffs and calls", focus: "Before a bluff, estimate the break-even fold% (bet ÷ (bet+pot)). Only fire if they fold more than that.", concepts: ["postflop-math"] },
        { domino: "7.3", title: "Exploiting Tendencies", read: "♠ exploiting reads (book uses HUD → you use live reads)", focus: "Pick the biggest leak you've seen in a regular opponent and make one play this session that exploits it.", concepts: ["cbet-fundamentals","observation"] },
        { domino: "8.1", title: "Raising & Check-Raising", read: "♠ raising/check-raising vs c-bets", focus: "Find one spot to (check-)raise a c-bet — for value or as a bluff with equity — instead of just calling.", concepts: ["postflop-defense"] },
        { domino: "8.2", title: "Calling, Floating & Probing", read: "♠ calling, floating, and probe-betting", focus: "Float one flop in position (call planning to take it away later) when the board misses their range.", concepts: ["postflop-defense"] },
        { domino: "8.3", title: "Donk Betting", read: "🧠 Journal review · ♠ leading into the preflop raiser", focus: "Identify one board where a donk-lead makes sense (hits your range, misses theirs) and use it.", concepts: ["postflop-defense","poker-journal"] }
      ]
    },
    {
      id: 3,
      name: "Tournaments & Exploitation",
      books: "Strategies for Beating Small Stakes Tournaments (Jonathan Little)",
      blurb: "Apply everything to your 7XL micro-stakes tournaments.",
      modules: [
        { domino: "T1", title: "The 3 Player Types", read: "♠ too many / too few / correct hands (p.11)", focus: "Classify every opponent into JL's 3 types and write one exploit for each in your journal.", concepts: ["observation","value-betting-vs-loose-passive"] },
        { domino: "T2", title: "Exploit Passive Players", read: "♠ value bet & thin value (p.13–17)", focus: "vs loose-passive players, value-bet relentlessly and bet SMALL on rivers. Never slow-play.", concepts: ["value-betting-vs-loose-passive","thin-value-sizing"] },
        { domino: "T3", title: "Exploit Aggressive Players", read: "♠ induce & trap (p.18–23)", focus: "vs an aggressive player, check a strong hand to induce a bluff and check-call down — don't check-raise.", concepts: ["inducing-bluffs-vs-aggressive","trapping-vs-aggressive","reverse-blocking-bet"] },
        { domino: "T4", title: "Exploit Tight Players", read: "♠ fold to tight 3bets, avoid domination (p.31–33)", focus: "Fold AJ/KQ to a tight player's 3bet; steal their blinds more. Avoid A9/KT against them.", concepts: ["fold-to-tight-3bet","avoiding-domination"] },
        { domino: "T5", title: "Push/Fold & Stack Sizes", read: "♠ short-stack push/fold ranges", focus: "At ≤15bb, switch to push/fold. Open-shove your range from the BTN/SB instead of min-raising.", concepts: ["push-fold-ranges"] },
        { domino: "T6", title: "Bet-Sizing Tells & Reads", read: "♠ reading sizing patterns (p.17)", focus: "Watch for sizing tells (small=weak, big=strong). Adjust calls/folds to what their size means.", concepts: ["bet-sizing-tells","observation"] },
        { domino: "T7", title: "Your Weak Spots", read: "🧠 Journal-driven leak review · ♠ your flagged leaks", focus: "Take your top app-flagged leak and play one session focused only on fixing it.", concepts: ["poker-journal","exploitation-thinking"] },
        { domino: "T8", title: "Integration", read: "🧠 30-day challenge review · ♠ put it all together", focus: "Play a full session applying preflop + postflop + tournament reads. Journal your A/B/C game rating.", concepts: ["study-habits","exploitation-thinking"] }
      ]
    }
  ]
};
