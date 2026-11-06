// Point d'entrée : navigation entre les pages, barre du haut, boutons communs.
import { getLesson } from './data/index.mjs';
import { state, onChange, dueIds, streak, toggleFav, setSlow, markActive } from './js/store.js';
import { speak, stopSpeaking, stopListening } from './js/speech.js';
import { sayIt, stagger, toast, icons } from './js/ui.js';
import { closeStudio } from './js/studio.js';
import { closeRoleplay } from './js/roleplay.js';
import { renderHome } from './js/views/home.js';
import { renderLesson } from './js/views/lesson.js';
import { renderExercises } from './js/views/exercises.js';
import { renderReview } from './js/views/review.js';
import { renderFavorites } from './js/views/favorites.js';
import { renderSearch } from './js/views/search.js';

const app = document.getElementById('app');

// ─── Pages ───────────────────────────────────────────────────────────────
// Un numéro de jour inexistant renvoie false : on affiche alors l'accueil.
const withLesson = (m, render) => { const lesson = getLesson(Number(m[1])); return lesson ? render(lesson) : false; };
// Chaque route renvoie éventuellement une fonction de nettoyage (arrêt du son…).
const routes = [
  [/^#\/jour\/(\d+)\/exercices$/, m => withLesson(m, lesson => renderExercises(app, lesson)), 'home'],
  [/^#\/jour\/(\d+)(?:\/(mot|expr)\/(\d+))?$/, m => withLesson(m, lesson => renderLesson(app, lesson, m[2] && `${m[2]}-${m[3]}`)), 'home'],
  [/^#\/revisions(?:\/(favoris|tout))?$/, m => renderReview(app, m[1] ?? 'due'), 'review'],
  [/^#\/favoris$/, () => renderFavorites(app), 'favs'],
  [/^#\/recherche(?:\?q=(.*))?$/, m => renderSearch(app, decodeURIComponent(m[1] ?? '')), 'search'],
];

let cleanup = null;
function route() {
  cleanup?.();
  cleanup = null;
  stopSpeaking();
  stopListening();
  closeStudio();
  closeRoleplay();

  const hash = location.hash;
  let section = 'home', rendered = false;
  for (const [pattern, render, nav] of routes) {
    const match = hash.match(pattern);
    if (!match) continue;
    const result = render(match);
    if (result !== false) {
      cleanup = result ?? null;
      section = nav;
      rendered = true;
    }
    break;
  }
  if (!rendered) renderHome(app);

  updateNav(section);
  stagger(app);
  app.classList.remove('page-enter');
  void app.offsetWidth;
  app.classList.add('page-enter');
  window.scrollTo(0, 0);
  app.focus({ preventScroll: true });
}

// ─── Barre de navigation ─────────────────────────────────────────────────
const nav = document.getElementById('mainNav');
nav.innerHTML = `
  <a href="#/" data-nav="home">${icons.home}<span>Parcours</span></a>
  <a href="#/revisions" data-nav="review">${icons.review}<span>Réviser</span><b class="nav-badge" id="dueBadge" hidden></b></a>
  <a href="#/favoris" data-nav="favs">${icons.star}<span>Favoris</span></a>
  <a href="#/recherche" data-nav="search">${icons.search}<span>Chercher</span></a>`;

let currentSection = 'home';
function updateNav(section = currentSection) {
  currentSection = section;
  nav.querySelectorAll('[data-nav]').forEach(a => {
    const active = a.dataset.nav === section;
    a.classList.toggle('is-active', active);
    if (active) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
  const due = dueIds().length;
  const badge = document.getElementById('dueBadge');
  badge.hidden = !due;
  badge.textContent = due > 99 ? '99+' : due;
  const days = streak();
  const streakEl = document.getElementById('streak');
  streakEl.innerHTML = `<span class="flame${days ? ' is-lit' : ''}" aria-hidden="true">🔥</span>${days}`;
  streakEl.title = `${days} jour${days > 1 ? 's' : ''} d'affilée`;
  streakEl.setAttribute('aria-label', streakEl.title);
}
onChange(() => updateNav());

const speedBtn = document.getElementById('speedBtn');
function renderSpeed() {
  speedBtn.innerHTML = `${icons.turtle}<span>${state.slow ? 'Lent' : 'Normal'}</span>`;
  speedBtn.setAttribute('aria-pressed', String(state.slow));
  speedBtn.title = state.slow ? 'Voix lente (cliquer pour vitesse normale)' : 'Voix normale (cliquer pour ralentir)';
}
speedBtn.addEventListener('click', () => { setSlow(!state.slow); renderSpeed(); toast(state.slow ? '🐢 Voix ralentie' : 'Voix à vitesse normale'); });
renderSpeed();

// ─── Boutons communs à toutes les pages ──────────────────────────────────
document.addEventListener('click', e => {
  const speakBtn = e.target.closest('[data-speak]');
  if (speakBtn) {
    speakBtn.classList.add('is-playing');
    speak(speakBtn.dataset.speak).then(() => speakBtn.classList.remove('is-playing'));
    return;
  }
  const micBtn = e.target.closest('[data-mic]');
  if (micBtn) {
    markActive();
    sayIt(micBtn.dataset.mic, micBtn);
    return;
  }
  const favBtn = e.target.closest('[data-fav]');
  if (favBtn) {
    const on = toggleFav(favBtn.dataset.fav);
    document.querySelectorAll(`[data-fav="${favBtn.dataset.fav}"]`).forEach(b => {
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', String(on));
    });
    favBtn.classList.remove('pop'); void favBtn.offsetWidth; favBtn.classList.add('pop');
    toast(on ? '⭐ Ajouté à tes favoris' : 'Retiré des favoris');
  }
});

window.addEventListener('hashchange', route);
route();

// ─── Application installable et utilisable hors ligne ────────────────────
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
