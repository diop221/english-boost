// Petits outils d'affichage partagés par toutes les pages.
import { findRanges } from '../text.mjs';
import { isFav } from './store.js';
import { canListen, listen } from './speech.js';
import { bestSimilarity, verdict } from './match.js';

export const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
export const wait = ms => new Promise(r => setTimeout(r, ms));
export const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Surligne les expressions du jour dans une réplique.
export function highlight(text, expressions) {
  let html = '', pos = 0;
  for (const [start, end, index] of findRanges(text, expressions.map(e => e[0]))) {
    html += esc(text.slice(pos, start));
    html += `<mark data-expr="${index}" title="${esc(expressions[index][1])}">${esc(text.slice(start, end))}</mark>`;
    pos = end;
  }
  return html + esc(text.slice(pos));
}

// ─── Icônes (traits simples, couleur = currentColor) ─────────────────────
const svg = path => `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
export const icons = {
  home: svg('<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>'),
  review: svg('<path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/>'),
  star: svg('<path d="M12 3l2.8 5.8 6.2.9-4.5 4.4 1 6.3L12 17.5 6.5 20.4l1-6.3L3 9.7l6.2-.9z"/>'),
  search: svg('<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>'),
  play: '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" fill="currentColor"/></svg>',
  mic: svg('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),
  turtle: svg('<path d="M4 15c0-4 3.6-7 8-7s8 3 8 7H4z"/><path d="M20 15l2-1M7 15v3M17 15v3"/>'),
};

// ─── Boutons réutilisables (gérés globalement dans app.js) ───────────────
export const playBtn = (text, label = 'Écouter') =>
  `<button class="icon-btn" type="button" data-speak="${esc(text)}" aria-label="${esc(label)} : ${esc(text)}" title="Écouter">${icons.play}</button>`;
export const micBtn = text => canListen
  ? `<button class="icon-btn mic-btn" type="button" data-mic="${esc(text)}" aria-label="Le dire au micro" title="Le dire au micro">${icons.mic}</button>`
  : '';
export const favBtn = id =>
  `<button class="icon-btn fav-btn${isFav(id) ? ' is-on' : ''}" type="button" data-fav="${id}" aria-pressed="${isFav(id)}" aria-label="Favori" title="Ajouter aux favoris">${icons.star}</button>`;

// Ligne d'un mot ou d'une expression (favoris, recherche).
export function itemRow(item) {
  const link = `#/jour/${item.day}/${item.type === 'word' ? 'mot' : 'expr'}/${item.index}`;
  return `
    <li class="item-row" data-fb-scope>
      <span class="item-badge" aria-hidden="true">${item.type === 'word' ? item.emoji : '💬'}</span>
      <div class="item-text">
        <p class="item-en">${esc(item.en)}</p>
        <p class="item-fr">${esc(item.fr)}</p>
        <span class="say-fb" aria-live="polite"></span>
      </div>
      <a class="item-day" href="${link}">Jour ${item.day}</a>
      <div class="item-actions">${playBtn(item.en)}${micBtn(item.en)}${favBtn(item.id)}</div>
    </li>`;
}

// ─── Dire au micro : écoute, compare, affiche un retour ──────────────────
export async function sayIt(target, button) {
  const scope = button.closest('[data-fb-scope]') ?? button.parentElement;
  const fb = scope.querySelector('.say-fb');
  button.classList.add('is-listening');
  if (fb) { fb.className = 'say-fb is-listening'; fb.textContent = 'Je t\'écoute…'; }
  try {
    const heard = await listen();
    const score = bestSimilarity(heard, target);
    const v = verdict(score);
    if (fb) {
      fb.className = `say-fb is-${heard.length ? v.level : 'retry'}`;
      fb.textContent = heard.length ? `${v.label} J'ai entendu : « ${heard[0]} »` : 'Je n\'ai rien entendu. Réessaie.';
    }
    return { heard, score, ...v };
  } catch (err) {
    if (fb) {
      fb.className = 'say-fb is-retry';
      fb.textContent = err.message === 'denied' ? 'Autorise le micro dans ton navigateur pour t\'entraîner à l\'oral.' : 'Le micro n\'est pas disponible ici.';
    }
    return { heard: [], score: 0, level: 'retry' };
  } finally {
    button.classList.remove('is-listening');
  }
}

// ─── Animations ──────────────────────────────────────────────────────────
// Les enfants d'un [data-stagger] apparaissent l'un après l'autre.
export function stagger(root) {
  root.querySelectorAll('[data-stagger]').forEach(list => {
    [...list.children].forEach((child, i) => child.style.setProperty('--i', Math.min(i, 14)));
  });
}

let toastTimer;
export function toast(message) {
  let el = document.querySelector('.toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    el.setAttribute('role', 'status');
    document.body.append(el);
  }
  el.textContent = message;
  el.classList.remove('is-shown');
  void el.offsetWidth;
  el.classList.add('is-shown');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('is-shown'), 2600);
}

const CONFETTI_COLORS = ['#1f5fbf', '#2e8b57', '#ffb020', '#e5484d', '#8e4ec6', '#12a594'];
export function confetti(origin = null) {
  if (reducedMotion()) return;
  const box = origin?.getBoundingClientRect();
  const x = box ? box.left + box.width / 2 : innerWidth / 2;
  const y = box ? box.top + box.height / 2 : innerHeight / 3;
  const layer = document.createElement('div');
  layer.className = 'confetti';
  for (let i = 0; i < 48; i++) {
    const piece = document.createElement('span');
    const angle = Math.random() * Math.PI * 2;
    const power = 120 + Math.random() * 220;
    piece.style.cssText = `left:${x}px; top:${y}px; background:${CONFETTI_COLORS[i % CONFETTI_COLORS.length]};
      --dx:${Math.cos(angle) * power}px; --dy:${Math.sin(angle) * power - 160}px; --r:${Math.random() * 720 - 360}deg;
      animation-delay:${Math.random() * 80}ms`;
    layer.append(piece);
  }
  document.body.append(layer);
  setTimeout(() => layer.remove(), 1700);
}

// Anneau de progression (SVG) : value entre 0 et 1.
export function ring(value, label) {
  const c = 2 * Math.PI * 26;
  return `
    <svg class="ring" viewBox="0 0 64 64" role="img" aria-label="${esc(label)}">
      <circle cx="32" cy="32" r="26" class="ring-track"/>
      <circle cx="32" cy="32" r="26" class="ring-value" style="--len:${c}; --off:${c * (1 - value)}"/>
    </svg>`;
}
