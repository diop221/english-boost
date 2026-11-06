// Révisions espacées : on revoit chaque mot 1, 3, 7, 21 puis 60 jours après l'avoir appris.
// Modes : à réviser aujourd'hui (défaut), favoris, ou tout ce qui a été appris.
import { getItem } from '../../data/index.mjs';
import { state, dueIds, learnedIds, grade, nextDueDate, today, addDays } from '../store.js';
import { speak, stopSpeaking, stopListening, canListen } from '../speech.js';
import { esc, shuffle, sayIt, confetti, icons, favBtn } from '../ui.js';

const MODES = {
  due: { title: 'Révisions du jour', ids: dueIds },
  favoris: { title: 'Mes favoris', ids: () => state.favs },
  tout: { title: 'Tout ce que j\'ai appris', ids: learnedIds },
};

function formatDue(key) {
  if (!key) return null;
  if (key === addDays(today(), 1)) return 'demain';
  const [y, m, d] = key.split('-').map(Number);
  return 'le ' + new Date(y, m - 1, d).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
}

export function renderReview(app, mode = 'due') {
  const config = MODES[mode] ?? MODES.due;
  const queue = shuffle(config.ids().map(getItem).filter(Boolean));
  const total = queue.length;
  let knewCount = 0, againCount = 0, seen = 0;
  let alive = true;

  document.title = `${config.title} — English Boost`;

  if (!total) {
    const next = formatDue(nextDueDate());
    app.innerHTML = `
      <section class="empty">
        <div class="empty-art" aria-hidden="true">${mode === 'favoris' ? '⭐' : '🌱'}</div>
        <h1>${mode === 'favoris' ? 'Pas encore de favoris' : mode === 'tout' ? 'Rien d\'appris pour l\'instant' : 'Tout est révisé !'}</h1>
        <p class="lead">${
          mode === 'favoris' ? 'Touche l\'étoile ☆ à côté d\'un mot ou d\'une expression pour le retrouver ici.'
          : learnedIds().length ? `Reviens ${next ?? 'plus tard'} pour ta prochaine révision.`
          : 'Termine ton premier jour : ses mots et expressions arriveront ici dès demain.'}</p>
        <div class="hero-actions">
          ${mode !== 'favoris' && state.favs.length ? `<a class="btn btn-ghost" href="#/revisions/favoris">⭐ Réviser mes favoris (${state.favs.length})</a>` : ''}
          ${mode !== 'tout' && learnedIds().length ? `<a class="btn btn-ghost" href="#/revisions/tout">Réviser tout (${learnedIds().length})</a>` : ''}
          <a class="btn btn-primary" href="#/">Continuer le parcours</a>
        </div>
      </section>`;
    return;
  }

  function show() {
    const item = queue[0];
    const progress = seen / (seen + queue.length);
    app.innerHTML = `
      <div class="quiz-head">
        <p class="eyebrow">${config.title}</p>
        <div class="quiz-progress"><span style="width:${progress * 100}%"></span></div>
        <span class="quiz-count">${queue.length} restant${queue.length > 1 ? 's' : ''}</span>
      </div>
      <div class="review-card" style="--h:${(item.day * 47) % 360}" data-fb-scope>
        <div class="review-inner">
          <div class="review-face review-front">
            <span class="review-kind">${item.type === 'word' ? 'Mot' : 'Expression'} · Jour ${item.day}</span>
            ${item.type === 'word' ? `<span class="review-emoji motion-${item.motion}">${item.emoji}</span>` : '<span class="review-emoji">💬</span>'}
            <p class="review-fr">${esc(item.fr)}</p>
            <p class="review-ask">Comment dit-on en anglais ?</p>
          </div>
          <div class="review-face review-back">
            <span class="review-kind">${item.type === 'word' ? 'Mot' : 'Expression'} · Jour ${item.day}</span>
            <p class="review-en">${esc(item.en)}</p>
            <p class="review-fr-small">${esc(item.fr)}</p>
            ${item.example ? `<p class="review-example">${esc(item.example)}</p>` : item.tip ? `<p class="review-example">${esc(item.tip)}</p>` : ''}
            <div class="review-tools">
              <button class="icon-btn" type="button" data-speak="${esc(item.en)}" aria-label="Réécouter">${icons.play}</button>
              ${favBtn(item.id)}
            </div>
          </div>
        </div>
        <span class="say-fb" aria-live="polite"></span>
      </div>
      <div class="review-actions" id="reviewActions">
        ${canListen ? `<button class="btn btn-primary btn-lg" type="button" id="sayBtn">${icons.mic} Le dire</button>` : ''}
        <button class="btn ${canListen ? 'btn-ghost' : 'btn-primary'} btn-lg" type="button" id="revealBtn">Voir la réponse</button>
      </div>
      <p class="hint review-keys">Raccourcis : Espace = voir la réponse · 1 = à revoir · 2 = je savais</p>`;

    const card = app.querySelector('.review-card');
    const reveal = () => {
      if (card.classList.contains('is-flipped')) return;
      card.classList.add('is-flipped');
      speak(item.en);
      app.querySelector('#reviewActions').innerHTML = `
        <button class="btn btn-again btn-lg" type="button" data-grade="0">😕 À revoir</button>
        <button class="btn btn-knew btn-lg" type="button" data-grade="1">✓ Je savais</button>`;
    };
    app.querySelector('#revealBtn').addEventListener('click', reveal);
    app.querySelector('#sayBtn')?.addEventListener('click', async e => {
      await sayIt(item.en, e.currentTarget);
      if (alive) reveal();
    });
    app.querySelector('#reviewActions').addEventListener('click', e => {
      const btn = e.target.closest('[data-grade]');
      if (btn) answer(btn.dataset.grade === '1');
    });
  }

  const retried = new Set();
  function answer(knew) {
    if (app.querySelector('.leave-left, .leave-right')) return; // déjà en train de partir
    const item = queue.shift();
    seen++;
    if (!retried.has(item.id)) {
      grade(item.id, knew);
      if (knew) knewCount++;
      else { againCount++; retried.add(item.id); queue.push(item); } // revu une fois à la fin de la séance
    }
    const card = app.querySelector('.review-card');
    card.classList.add(knew ? 'leave-right' : 'leave-left');
    setTimeout(() => { if (!alive) return; queue.length ? show() : end(); }, 320);
  }

  function end() {
    app.innerHTML = `
      <section class="result">
        <div class="empty-art" aria-hidden="true">🎉</div>
        <h1>Séance terminée !</h1>
        <p class="result-score"><strong>${total}</strong> élément${total > 1 ? 's' : ''} révisé${total > 1 ? 's' : ''}</p>
        <div class="result-split">
          <span class="is-knew">✓ ${knewCount} su${knewCount > 1 ? 's' : ''}</span>
          <span class="is-again">😕 ${againCount} à revoir</span>
        </div>
        <p class="hint">Chaque élément reviendra au bon moment : plus tu le sais, plus il revient tard.</p>
        <div class="hero-actions"><a class="btn btn-primary" href="#/">Retour à l'accueil</a></div>
      </section>`;
    confetti(app.querySelector('.empty-art'));
  }

  function onKey(e) {
    if (e.target.closest('input, textarea') || document.querySelector('dialog[open]')) return;
    const flipped = app.querySelector('.review-card.is-flipped');
    if (e.key === ' ' && !flipped && app.querySelector('#revealBtn')) { e.preventDefault(); app.querySelector('#revealBtn').click(); }
    else if (flipped && (e.key === '1' || e.key === '2')) answer(e.key === '2');
  }
  document.addEventListener('keydown', onKey);

  show();
  return () => { alive = false; document.removeEventListener('keydown', onKey); stopSpeaking(); stopListening(); };
}
