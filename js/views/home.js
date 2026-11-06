// Accueil : série, progression, révisions du jour et parcours des 30 jours.
import { chapters, lessons, getLesson } from '../../data/index.mjs';
import { state, isDone, streak, dueIds, learnedIds } from '../store.js';
import { esc, ring, icons } from '../ui.js';

export function renderHome(app) {
  const doneCount = state.done.length;
  const resume = getLesson(lessons.find(l => !isDone(l.day))?.day ?? 1);
  const allDone = doneCount === lessons.length;
  const cta = doneCount === 0 ? 'Commencer le jour 1' : allDone ? 'Revoir le jour 1' : `Continuer : jour ${resume.day}`;
  const due = dueIds().length;
  const days = streak();

  app.innerHTML = `
    <section class="hero">
      <p class="eyebrow">30 jours · 30 situations</p>
      <h1>Parle anglais comme dans la vraie vie.</h1>
      <p class="lead">Suis Modou pendant son mois de mission à Londres. Chaque jour : 10 mots animés, 10 expressions, une scène à jouer au micro et des exercices.</p>
      <div class="hero-actions">
        <a class="btn btn-primary btn-lg" href="#/jour/${allDone ? 1 : resume.day}">${cta} →</a>
        ${doneCount && !allDone ? `<span class="hero-next">${esc(resume.title)}</span>` : ''}
      </div>
    </section>

    <section class="stats" data-stagger>
      <div class="stat">
        <span class="stat-icon flame${days ? ' is-lit' : ''}" aria-hidden="true">🔥</span>
        <div><strong>${days}</strong><small>jour${days > 1 ? 's' : ''} d'affilée</small></div>
      </div>
      <div class="stat">
        ${ring(doneCount / lessons.length, `${doneCount} jours terminés sur ${lessons.length}`)}
        <div><strong>${doneCount}<span>/${lessons.length}</span></strong><small>jours terminés</small></div>
      </div>
      <div class="stat">
        <span class="stat-icon" aria-hidden="true">🧠</span>
        <div><strong>${learnedIds().length}</strong><small>mots et expressions appris</small></div>
      </div>
    </section>

    ${due ? `
    <a class="review-cta" href="#/revisions">
      <span class="review-cta-icon">${icons.review}</span>
      <span><strong>${due} révision${due > 1 ? 's' : ''} t'attend${due > 1 ? 'ent' : ''}</strong><small>Quelques minutes pour ne pas oublier ce que tu as appris.</small></span>
      <span class="review-cta-go" aria-hidden="true">→</span>
    </a>` : ''}

    ${chapters.map(chapter => {
      const list = lessons.filter(l => l.chapter === chapter.id);
      const done = list.filter(l => isDone(l.day)).length;
      return `
      <section class="chapter">
        <div class="chapter-head">
          <h2><span>Chapitre ${chapter.id}</span> ${esc(chapter.title)}</h2>
          <span class="chapter-count${done === list.length ? ' is-complete' : ''}">${done}/${list.length}</span>
        </div>
        <p class="chapter-sub">${esc(chapter.subtitle)}</p>
        <ol class="day-grid" data-stagger>
          ${list.map(l => `
            <li>
              <a class="day-card${isDone(l.day) ? ' is-done' : ''}${l.day === resume.day && !allDone ? ' is-next' : ''}" href="#/jour/${l.day}">
                <span class="day-num">${isDone(l.day) ? '✓' : l.day}</span>
                <span class="day-text">
                  <strong>${esc(l.title)}</strong>
                  <small>${esc(l.en)}</small>
                </span>
                <span class="day-emojis" aria-hidden="true">${l.words.slice(0, 3).map(w => w[2]).join('')}</span>
              </a>
            </li>`).join('')}
        </ol>
      </section>`;
    }).join('')}
  `;
  document.title = 'English Boost';
}
