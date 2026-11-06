// Page d'un jour, en 4 étapes : mots → expressions → scène → exercices,
// plus une 5e, « Écoute » (journal de Modou), pour les jours qui en ont un.
import { chapters, getLesson, lessonItemIds } from '../../data/index.mjs';
import { state, isDone, setDone } from '../store.js';
import { speak, stopSpeaking, canListen } from '../speech.js';
import { esc, highlight, playBtn, micBtn, favBtn, toast, confetti, icons } from '../ui.js';
import { openStudio } from '../studio.js';
import { openRoleplay } from '../roleplay.js';
import { journalSection, setupJournal } from '../journal.js';

const BASE_STEPS = [['mots', 'Mots'], ['expressions', 'Expressions'], ['scene', 'Scène'], ['exercices', 'Exercices']];

export function renderLesson(app, lesson, focus) {
  const chapter = chapters.find(c => c.id === lesson.chapter);
  const prev = getLesson(lesson.day - 1), next = getLesson(lesson.day + 1);
  const hideFr = document.body.classList.contains('hide-fr');
  const score = state.scores[lesson.day];
  const STEPS = lesson.journal ? [...BASE_STEPS, ['ecoute', 'Écoute']] : BASE_STEPS;

  app.innerHTML = `
    <a class="back" href="#/">← Tous les jours</a>
    <header class="lesson-head">
      <p class="eyebrow">Jour ${lesson.day} · Chapitre ${chapter.id} — ${esc(chapter.title)}</p>
      <h1>${esc(lesson.title)}</h1>
      <p class="lesson-en">${esc(lesson.en)}</p>
      <p class="scene-tag">📍 ${esc(lesson.scene)}</p>
      <p class="lead">${esc(lesson.intro)}</p>
    </header>

    <nav class="steps" aria-label="Étapes du jour">
      ${STEPS.map(([id, label], i) => `<button type="button" class="step" data-step="${id}"><span>${i + 1}</span>${label}</button>`).join('')}
    </nav>

    <section class="block" id="mots">
      <div class="block-head">
        <h2><span class="step-num">1</span> Les 10 mots du jour</h2>
        <button id="studioBtn" class="btn btn-primary btn-small" type="button">${icons.play} Lancer l'animation</button>
      </div>
      <p class="hint">Regarde chaque mot prendre vie, écoute-le, répète-le. Clique sur un mot pour revoir son animation.</p>
      <ol class="word-grid" data-stagger>
        ${lesson.words.map(([en, fr, emoji, motion], i) => `
          <li class="word-cell" id="mot-${i}">
            <button class="word-tile" type="button" data-word="${i}" style="--h:${i * 36}">
              <span class="wt-emoji motion-${motion}" aria-hidden="true">${emoji}</span>
              <strong>${esc(en)}</strong>
              <small>${esc(fr)}</small>
            </button>
            ${favBtn(`w-${lesson.day}-${i}`)}
          </li>`).join('')}
      </ol>
    </section>

    <section class="block" id="expressions">
      <h2><span class="step-num">2</span> Les 10 expressions</h2>
      <p class="hint">Écoute, puis ${canListen ? 'appuie sur le micro et répète : je te dis si c\'est bien prononcé' : 'répète à voix haute'}.</p>
      <ol class="expr-list" data-stagger>
        ${lesson.expressions.map(([en, fr, tip], i) => {
          const text = en.replace(/\.\.\./g, '…');
          return `
          <li class="expr" id="expr-${i}" data-fb-scope>
            ${playBtn(text)}
            <div class="expr-body">
              <p class="expr-en">${esc(text)}</p>
              <p class="expr-fr">${esc(fr)}</p>
              ${tip ? `<p class="expr-tip">${esc(tip)}</p>` : ''}
              <span class="say-fb" aria-live="polite"></span>
            </div>
            <div class="expr-actions">${micBtn(text)}${favBtn(`e-${lesson.day}-${i}`)}</div>
          </li>`;
        }).join('')}
      </ol>
    </section>

    <section class="block" id="scene">
      <div class="block-head">
        <h2><span class="step-num">3</span> La scène</h2>
        <div class="scene-tools">
          <button id="roleplayBtn" class="btn btn-primary btn-small" type="button">🎭 Joue Modou</button>
          <button id="playSceneBtn" class="btn btn-ghost btn-small" type="button">${icons.play} Écouter</button>
          <button id="frBtn" class="btn btn-ghost btn-small" type="button" aria-pressed="${!hideFr}">${hideFr ? 'Afficher' : 'Masquer'} la traduction</button>
        </div>
      </div>
      <p class="hint">Les expressions du jour sont surlignées. Avec « Joue Modou », tu dis toi-même ses répliques${canListen ? ' au micro' : ''}.</p>
      <div class="dialogue">
        ${lesson.dialogue.map(([code, en, fr], i) => `
          <div class="line${code === 'M' ? ' is-me' : ''}" data-line="${i}">
            <span class="who">${esc(lesson.cast[code])}</span>
            <div class="bubble">
              <p class="line-en">${highlight(en, lesson.expressions)}</p>
              <p class="line-fr">${esc(fr)}</p>
            </div>
            <button class="icon-btn play-line" type="button" data-line-play="${i}" aria-label="Écouter la réplique">${icons.play}</button>
          </div>`).join('')}
      </div>
    </section>

    <section class="block" id="exercices">
      <h2><span class="step-num">4</span> Exercices</h2>
      <a class="practice-card" href="#/jour/${lesson.day}/exercices">
        <span class="practice-icons" aria-hidden="true"><span>🎯</span><span>🎧</span><span>🧩</span></span>
        <span class="practice-text">
          <strong>10 questions pour vérifier ce que tu as retenu</strong>
          <small>Choisir le bon mot, écrire ce que tu entends, remettre une phrase dans l'ordre.</small>
          ${score != null ? `<small class="practice-best">Meilleur score : ${score} / 10</small>` : ''}
        </span>
        <span class="btn btn-primary btn-small">${score != null ? 'Recommencer' : 'Commencer'} →</span>
      </a>
    </section>

    ${lesson.journal ? journalSection(lesson, 5) : ''}

    <section class="finish">
      <button id="doneBtn" class="btn btn-lg ${isDone(lesson.day) ? 'btn-ghost' : 'btn-primary'}" type="button">
        ${isDone(lesson.day) ? '✓ Jour terminé' : 'J\'ai terminé ce jour'}
      </button>
      <p class="hint">${isDone(lesson.day) ? 'Ses mots et expressions sont dans tes révisions.' : 'Ses 20 mots et expressions seront ajoutés à tes révisions.'}</p>
      <nav class="pager">
        ${prev ? `<a href="#/jour/${prev.day}">← Jour ${prev.day} · ${esc(prev.title)}</a>` : '<span></span>'}
        ${next ? `<a href="#/jour/${next.day}">Jour ${next.day} · ${esc(next.title)} →</a>` : ''}
      </nav>
    </section>
  `;

  // ─── Lecture de la scène ───
  let playback = 0, stopJournal = () => {};
  const lineEls = [...app.querySelectorAll('.line')];
  const codes = Object.keys(lesson.cast);
  const sceneBtn = app.querySelector('#playSceneBtn');
  function stopScene() {
    playback++;
    stopJournal();
    stopSpeaking();
    lineEls.forEach(el => el.classList.remove('is-playing'));
    sceneBtn.innerHTML = `${icons.play} Écouter`;
  }
  async function playLines(indexes) {
    stopScene();
    const run = playback;
    if (indexes.length > 1) sceneBtn.textContent = '■ Arrêter';
    for (const i of indexes) {
      if (run !== playback) return;
      const el = lineEls[i];
      el.classList.add('is-playing');
      if (indexes.length > 1) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      await speak(lesson.dialogue[i][1], codes.indexOf(lesson.dialogue[i][0]));
      el.classList.remove('is-playing');
      if (run !== playback) return;
      await new Promise(r => setTimeout(r, 350));
    }
    if (run === playback) stopScene();
  }
  sceneBtn.addEventListener('click', () => {
    if (app.querySelector('.line.is-playing')) return stopScene();
    playLines(lineEls.map((_, i) => i));
  });
  app.querySelectorAll('[data-line-play]').forEach(btn => btn.addEventListener('click', () => playLines([Number(btn.dataset.linePlay)])));

  if (lesson.journal) {
    // La scène et le journal ne parlent jamais en même temps.
    stopJournal = setupJournal(app.querySelector('#ecoute'), lesson, stopScene);
  }

  app.querySelector('#studioBtn').addEventListener('click', () => { stopScene(); openStudio(lesson, 0); });
  app.querySelectorAll('[data-word]').forEach(btn => btn.addEventListener('click', () => { stopScene(); openStudio(lesson, Number(btn.dataset.word)); }));
  app.querySelector('#roleplayBtn').addEventListener('click', () => { stopScene(); openRoleplay(lesson); });

  app.querySelector('#frBtn').addEventListener('click', e => {
    const hidden = document.body.classList.toggle('hide-fr');
    e.currentTarget.textContent = `${hidden ? 'Afficher' : 'Masquer'} la traduction`;
    e.currentTarget.setAttribute('aria-pressed', String(!hidden));
  });

  // Cliquer une expression surlignée ramène à sa fiche.
  app.querySelectorAll('mark[data-expr]').forEach(mark => mark.addEventListener('click', () => flash(app.querySelector(`#expr-${mark.dataset.expr}`))));

  app.querySelector('#doneBtn').addEventListener('click', e => {
    const wasDone = isDone(lesson.day);
    setDone(lesson.day, !wasDone, lessonItemIds(lesson.day));
    if (wasDone) return renderLesson(app, lesson);
    confetti(e.currentTarget);
    toast(`Jour ${lesson.day} terminé ! 20 éléments ajoutés à tes révisions.`);
    setTimeout(() => { location.hash = next ? `#/jour/${next.day}` : '#/'; }, 1300);
  });

  // ─── Navigation entre les étapes (pastilles collantes) ───
  const stepBtns = [...app.querySelectorAll('.step')];
  stepBtns.forEach(btn => btn.addEventListener('click', () => app.querySelector(`#${btn.dataset.step}`).scrollIntoView({ behavior: 'smooth', block: 'start' })));
  const spy = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      stepBtns.forEach(b => b.classList.toggle('is-active', b.dataset.step === entry.target.id));
    }
  }, { rootMargin: '-35% 0px -60% 0px' });
  STEPS.forEach(([id]) => spy.observe(app.querySelector(`#${id}`)));

  if (focus) requestAnimationFrame(() => flash(app.querySelector(`#${focus}`)));

  document.title = `Jour ${lesson.day} · ${lesson.title} — English Boost`;
  return () => { stopScene(); spy.disconnect(); };
}

function flash(el) {
  if (!el) return;
  el.scrollIntoView({ block: 'center', behavior: 'smooth' });
  el.classList.remove('flash');
  void el.offsetWidth;
  el.classList.add('flash');
}
