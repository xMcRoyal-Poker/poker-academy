/* ============================================================
   APP — boot + hash router + bottom nav
   ============================================================ */
window.PT = window.PT || {};

PT.state = PT.Store.load();
if (!PT.state.created) { PT.state.created = new Date().toISOString(); PT.Store.save(PT.state); }

const ROUTES = {
  onboard: PT.UI.onboard,
  home: PT.UI.home,
  drill: PT.UI.drill,
  progress: PT.UI.progress,
  leaks: PT.UI.leaks,
  playlog: PT.UI.playlog
};

PT.go = function (route) {
  if (location.hash !== "#" + route) { location.hash = route; return; } // triggers hashchange -> render
  render(route);
};

function render(route) {
  try {
    // First-run: force onboarding (Steps 1-2 of the book), no nav chrome.
    if (!PT.state.profile || !PT.state.profile.onboarded) {
      PT.UI.onboard();
      const nav = document.querySelector(".nav");
      if (nav) nav.remove();
      window.scrollTo(0, 0);
      return;
    }
    (ROUTES[route] || ROUTES.home)();
    renderNav(route);
    window.scrollTo(0, 0);
    fadeIn();
  } catch (e) {
    // Error boundary: never white-screen. Show a safe recovery screen.
    console.error("render failed", e);
    if (PT.UI.errorScreen) PT.UI.errorScreen(e);
  }
}

// Subtle screen-change fade (native feel)
function fadeIn() {
  const a = document.getElementById("app");
  if (!a) return;
  a.style.animation = "none";
  void a.offsetWidth; // reflow to restart the animation
  a.style.animation = "appfade .18s ease";
}

function renderNav(active) {
  let nav = document.querySelector(".nav");
  if (!nav) {
    nav = document.createElement("nav");
    nav.className = "nav";
    document.body.appendChild(nav);
  }
  const items = [
    ["home", "🏠", "Today"],
    ["drill", "🎯", "Drill"],
    ["leaks", "🩹", "Leaks"],
    ["playlog", "📋", "Play"],
    ["progress", "📈", "Stats"]
  ];
  nav.innerHTML = items.map(([r, ic, lab]) =>
    `<a href="#${r}" class="${active === r ? "active" : ""}"><span class="ni">${ic}</span>${lab}</a>`).join("");
}

window.addEventListener("hashchange", () => render((location.hash || "#home").slice(1)));
window.addEventListener("DOMContentLoaded", () => render((location.hash || "#home").slice(1)));

// register service worker for offline / installable PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
}
