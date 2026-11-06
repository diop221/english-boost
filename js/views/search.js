// Recherche dans les 300 mots et 300 expressions, en anglais ou en français.
import { items } from '../../data/index.mjs';
import { normalize } from '../match.js';
import { esc, itemRow, icons, stagger } from '../ui.js';

const index = items.map(item => ({ item, en: normalize(item.en), fr: normalize(item.fr) }));

function find(query) {
  const q = normalize(query);
  if (!q) return [];
  const rank = ({ en, fr }) => (en === q || fr === q ? 0 : en.startsWith(q) || fr.startsWith(q) ? 1 : 2);
  return index
    .filter(({ en, fr }) => en.includes(q) || fr.includes(q))
    .sort((a, b) => rank(a) - rank(b) || a.item.day - b.item.day)
    .map(entry => entry.item);
}

export function renderSearch(app, initial = '') {
  document.title = 'Recherche — English Boost';
  app.innerHTML = `
    <header class="page-head">
      <p class="eyebrow">Recherche</p>
      <h1>Trouver un mot</h1>
    </header>
    <label class="search-box">
      ${icons.search}
      <input id="searchInput" type="search" value="${esc(initial)}" placeholder="En anglais ou en français : taxi, bonjour, bill…" autocomplete="off" aria-label="Rechercher un mot ou une expression">
    </label>
    <p class="hint" id="searchInfo" aria-live="polite"></p>
    <ul class="item-list" id="searchResults" data-stagger></ul>`;

  const input = app.querySelector('#searchInput');
  const results = app.querySelector('#searchResults');
  const info = app.querySelector('#searchInfo');

  function update() {
    const q = input.value;
    const found = find(q);
    history.replaceState(null, '', q ? `#/recherche?q=${encodeURIComponent(q)}` : '#/recherche');
    info.textContent = !q.trim() ? `${items.length} mots et expressions à explorer.`
      : found.length ? `${found.length} résultat${found.length > 1 ? 's' : ''}${found.length > 60 ? ' (60 premiers affichés)' : ''}`
      : 'Aucun résultat. Essaie un autre mot.';
    results.innerHTML = found.slice(0, 60).map(itemRow).join('');
    stagger(app);
  }
  input.addEventListener('input', update);
  update();
  input.focus({ preventScroll: true });
}
