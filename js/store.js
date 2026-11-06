// Progression de l'élève, stockée dans le navigateur (localStorage).
// Contient aussi la logique des révisions espacées et de la série de jours.

const KEY = 'english-boost-v3';
const OLD_KEY = 'english-boost-v2';

// Écart (en jours) avant la prochaine révision, selon la « boîte » de l'élément.
// Chaque bonne réponse fait monter d'une boîte ; une erreur fait revenir à la première.
export const INTERVALS = [1, 3, 7, 21, 60];

const pad = n => String(n).padStart(2, '0');
export const dateKey = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const today = () => dateKey(new Date());
export function addDays(key, n) {
  const [y, m, d] = key.split('-').map(Number);
  return dateKey(new Date(y, m - 1, d + n));
}

function storage() {
  try { return globalThis.localStorage ?? null; } catch { return null; }
}

function load() {
  const fresh = { done: [], slow: false, srs: {}, favs: [], activity: [], scores: {} };
  const ls = storage();
  if (!ls) return fresh;
  try {
    const saved = JSON.parse(ls.getItem(KEY));
    if (saved) return { ...fresh, ...saved };
    const old = JSON.parse(ls.getItem(OLD_KEY)); // reprise de l'ancienne version
    if (old && Array.isArray(old.done)) return { ...fresh, done: old.done, slow: !!old.slow };
  } catch {}
  return fresh;
}

export const state = load();
const listeners = new Set();
export const onChange = fn => listeners.add(fn);

export function save() {
  try { storage()?.setItem(KEY, JSON.stringify(state)); } catch {}
  listeners.forEach(fn => fn());
}

// ─── Jours terminés ──────────────────────────────────────────────────────
export const isDone = day => state.done.includes(day);

// Terminer un jour programme ses mots et expressions pour une révision demain.
export function setDone(day, done, itemIds = []) {
  state.done = done ? [...new Set([...state.done, day])] : state.done.filter(d => d !== day);
  if (done) {
    itemIds.forEach(schedule);
    markActive(false);
  }
  save();
}

// ─── Série de jours (🔥) ─────────────────────────────────────────────────
export function markActive(persist = true) {
  const t = today();
  if (!state.activity.includes(t)) state.activity = [...state.activity, t].slice(-400);
  if (persist) save();
}

export function streak(from = today()) {
  const days = new Set(state.activity);
  let d = days.has(from) ? from : addDays(from, -1); // la série tient jusqu'à ce soir
  let n = 0;
  while (days.has(d)) { n++; d = addDays(d, -1); }
  return n;
}

// ─── Révisions espacées ──────────────────────────────────────────────────
export function schedule(id) {
  if (!state.srs[id]) state.srs[id] = { box: 0, due: addDays(today(), INTERVALS[0]) };
}

export function grade(id, knew, on = today()) {
  const box = knew ? Math.min((state.srs[id]?.box ?? -1) + 1, INTERVALS.length - 1) : 0;
  state.srs[id] = { box, due: addDays(on, INTERVALS[box]) };
  markActive(false);
  save();
}

export const dueIds = (on = today()) => Object.keys(state.srs).filter(id => state.srs[id].due <= on);
export const learnedIds = () => Object.keys(state.srs);
export function nextDueDate() {
  const dates = Object.values(state.srs).map(s => s.due).sort();
  return dates[0] ?? null;
}

// ─── Favoris ─────────────────────────────────────────────────────────────
export const isFav = id => state.favs.includes(id);
export function toggleFav(id) {
  state.favs = isFav(id) ? state.favs.filter(f => f !== id) : [...state.favs, id];
  save();
  return isFav(id);
}

// ─── Exercices ───────────────────────────────────────────────────────────
export function saveScore(day, score) {
  state.scores[day] = Math.max(state.scores[day] ?? 0, score);
  markActive(false);
  save();
}

export function setSlow(slow) {
  state.slow = slow;
  save();
}
