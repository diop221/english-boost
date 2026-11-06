// Mes favoris : les mots et expressions marqués d'une étoile.
import { getItem } from '../../data/index.mjs';
import { state } from '../store.js';
import { itemRow, icons } from '../ui.js';

export function renderFavorites(app) {
  document.title = 'Mes favoris — English Boost';
  const favs = state.favs.map(getItem).filter(Boolean);
  const words = favs.filter(i => i.type === 'word');
  const exprs = favs.filter(i => i.type === 'expr');

  app.innerHTML = `
    <header class="page-head">
      <p class="eyebrow">Ma liste perso</p>
      <h1>Mes favoris</h1>
      <p class="lead">Les mots et expressions que tu veux garder sous la main. Touche l'étoile pour en ajouter ou en retirer.</p>
      ${favs.length ? `<div class="hero-actions"><a class="btn btn-primary" href="#/revisions/favoris">${icons.review} Réviser mes ${favs.length} favoris</a></div>` : ''}
    </header>
    ${favs.length ? '' : `
      <section class="empty">
        <div class="empty-art" aria-hidden="true">⭐</div>
        <p class="lead">Aucun favori pour l'instant. Dans chaque jour, touche ☆ à côté d'un mot difficile.</p>
        <div class="hero-actions"><a class="btn btn-ghost" href="#/">Voir le parcours</a></div>
      </section>`}
    ${words.length ? `<section class="block"><h2>Mots <span class="count">${words.length}</span></h2><ul class="item-list" data-stagger>${words.map(itemRow).join('')}</ul></section>` : ''}
    ${exprs.length ? `<section class="block"><h2>Expressions <span class="count">${exprs.length}</span></h2><ul class="item-list" data-stagger>${exprs.map(itemRow).join('')}</ul></section>` : ''}
  `;
}
