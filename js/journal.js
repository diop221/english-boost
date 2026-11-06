// Étape « Écoute » : le journal audio de Modou.
// On écoute d'abord sans lire, on répond aux questions, puis le texte se dévoile.
import { state, saveListening } from './store.js';
import { speak, stopSpeaking, stopCount, canSpeak } from './speech.js';
import { esc, shuffle, wait, confetti, icons } from './ui.js';

// Environ 150 mots par minute à vitesse normale.
const minutes = text => Math.max(1, Math.round(text.reduce((n, [en]) => n + en.split(' ').length, 0) / (state.slow ? 110 : 150)));

export function journalSection(lesson, num) {
  const { title, text } = lesson.journal;
  return `
    <section class="block" id="ecoute">
      <h2><span class="step-num">${num}</span> Le journal de Modou</h2>
      <p class="hint">Chaque jour, Modou raconte sa journée dans son journal audio. Écoute d'abord sans lire, réponds aux questions, puis découvre le texte.</p>
      <div class="jr-card">
        <div class="jr-player">
          <button class="listen-big jr-play" type="button" id="jrPlay" aria-label="Écouter l'épisode"${canSpeak ? '' : ' disabled'}>${icons.play}</button>
          <div class="jr-info">
            <p class="jr-episode">🎙️ Épisode ${lesson.day} · ${esc(title[0])}</p>
            <p class="jr-episode-fr">${esc(title[1])}</p>
            <div class="jr-bar" aria-hidden="true"><span id="jrBar"></span></div>
            <p class="jr-status" id="jrStatus">${canSpeak ? `${text.length} phrases · environ ${minutes(text)} min` : 'La voix n\'est pas disponible dans ce navigateur : lis le texte.'}</p>
          </div>
          <button class="icon-btn" type="button" id="jrRestart" aria-label="Reprendre depuis le début" title="Reprendre depuis le début"${canSpeak ? '' : ' disabled'}>${icons.review}</button>
        </div>
        <div class="jr-text" id="jrText"${canSpeak ? ' hidden' : ''}>
          ${text.map(([en, fr], i) => `
            <button class="jr-line" type="button" data-jl="${i}" title="Écouter cette phrase">
              <span class="jr-en">${esc(en)}</span>
              <span class="jr-fr">${esc(fr)}</span>
            </button>`).join('')}
        </div>
        <button class="btn btn-ghost btn-small jr-reveal" type="button" id="jrReveal"${canSpeak ? '' : ' hidden'}>Voir le texte maintenant</button>
      </div>
      <div id="jrQuiz"></div>
    </section>`;
}

// Branche les boutons. onPlay : appelé avant de lancer la lecture (pour couper la scène).
// Renvoie stop(), à appeler quand une autre lecture démarre ou qu'on quitte la page.
export function setupJournal(root, lesson, onPlay) {
  const { text, questions } = lesson.journal;
  const voice = Math.max(0, Object.keys(lesson.cast).indexOf('M'));
  const playBtn = root.querySelector('#jrPlay');
  const bar = root.querySelector('#jrBar');
  const status = root.querySelector('#jrStatus');
  const textEl = root.querySelector('#jrText');
  const revealBtn = root.querySelector('#jrReveal');
  const lineEls = [...root.querySelectorAll('.jr-line')];

  // ─── Lecture ───
  let run = 0, playing = false, position = 0;
  function showPosition(i) {
    bar.style.width = `${(i / text.length) * 100}%`;
    lineEls.forEach((el, j) => el.classList.toggle('is-playing', j === i && playing));
  }
  function stop() {
    if (!playing) return;
    run++;
    playing = false;
    stopSpeaking();
    playBtn.innerHTML = icons.play;
    playBtn.setAttribute('aria-label', 'Écouter l\'épisode');
    status.textContent = position ? `En pause · phrase ${position + 1} / ${text.length}` : `${text.length} phrases · environ ${minutes(text)} min`;
    showPosition(position);
  }
  async function play(from, to = text.length) {
    const saved = position;
    onPlay();
    stop();
    const me = ++run;
    playing = true;
    playBtn.innerHTML = '<span class="jr-pause" aria-hidden="true">❚❚</span>';
    playBtn.setAttribute('aria-label', 'Mettre en pause');
    for (let i = from; i < to; i++) {
      position = i;
      status.textContent = `Phrase ${i + 1} / ${text.length}`;
      showPosition(i);
      if (!textEl.hidden) lineEls[i].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      const before = stopCount();
      await speak(text[i][0], voice);
      if (me !== run) return;
      if (stopCount() !== before) return stop(); // le micro ou une autre lecture a coupé la voix
      await wait(450);
      if (me !== run) return;
    }
    const finished = to >= text.length && to - from > 1;
    position = finished ? 0 : saved; // une phrase écoutée seule ne déplace pas la lecture
    stop();
    if (finished) {
      bar.style.width = '100%';
      status.textContent = 'Épisode terminé · réponds aux questions ci-dessous';
    }
  }
  playBtn.addEventListener('click', () => (playing ? stop() : play(position)));
  root.querySelector('#jrRestart').addEventListener('click', () => { position = 0; play(0); });
  lineEls.forEach((el, i) => el.addEventListener('click', () => { play(i, i + 1); }));

  function reveal() {
    textEl.hidden = false;
    revealBtn.hidden = true;
    textEl.classList.add('is-revealed');
  }
  revealBtn.addEventListener('click', reveal);

  // ─── Questions ───
  const quiz = root.querySelector('#jrQuiz');
  function renderQuiz() {
    const shown = questions.map(q => ({
      ...q,
      options: 'tf' in q ? [['True', 'Vrai', q.tf], ['False', 'Faux', !q.tf]] : shuffle(q.a.map((o, i) => [o, '', i === 0])),
    }));
    const picked = new Array(shown.length).fill(null);
    const best = state.listening[lesson.day];
    quiz.innerHTML = `
      <ol class="jr-questions">
        ${shown.map((q, qi) => `
          <li class="jr-q" data-q="${qi}">
            <p class="jr-q-type">${'tf' in q ? 'Vrai ou faux ?' : 'Choisis la bonne réponse'}</p>
            <p class="jr-q-en">${esc(q.q)}</p>
            <p class="jr-q-fr">${esc(q.fr)}</p>
            <div class="jr-options">
              ${q.options.map(([en, fr], oi) => `<button class="q-option jr-option" type="button" data-opt="${oi}" aria-pressed="false">${esc(en)}${fr ? ` <small>${fr}</small>` : ''}</button>`).join('')}
            </div>
            <div class="jr-proof" hidden></div>
          </li>`).join('')}
      </ol>
      <div class="jr-actions">
        <button class="btn btn-primary" type="button" id="jrCheck" disabled>Vérifier mes réponses</button>
        ${best != null ? `<span class="practice-best">Meilleur score : ${best} / ${questions.length}</span>` : ''}
      </div>`;

    const checkBtn = quiz.querySelector('#jrCheck');
    quiz.querySelectorAll('.jr-q').forEach(li => {
      const qi = Number(li.dataset.q);
      li.querySelectorAll('.jr-option').forEach(btn => btn.addEventListener('click', () => {
        picked[qi] = Number(btn.dataset.opt);
        li.querySelectorAll('.jr-option').forEach(b => {
          const on = b === btn;
          b.classList.toggle('is-picked', on);
          b.setAttribute('aria-pressed', String(on));
        });
        checkBtn.disabled = picked.includes(null);
      }));
    });

    checkBtn.addEventListener('click', () => {
      let score = 0;
      quiz.querySelectorAll('.jr-q').forEach(li => {
        const q = shown[li.dataset.q];
        const ok = q.options[picked[li.dataset.q]][2];
        if (ok) score++;
        li.classList.add(ok ? 'is-right' : 'is-wrong');
        li.querySelectorAll('.jr-option').forEach((b, oi) => {
          b.disabled = true;
          b.classList.remove('is-picked');
          if (q.options[oi][2]) b.classList.add('is-right');
          else if (oi === picked[li.dataset.q]) b.classList.add('is-wrong');
        });
        const [en, fr] = text[q.line];
        const proof = li.querySelector('.jr-proof');
        proof.innerHTML = `
          <p class="jr-proof-label">${ok ? '✓ Bien entendu !' : '✗ La réponse était dans cette phrase :'}</p>
          <button class="jr-proof-line" type="button" data-goto="${q.line}" title="Écouter cette phrase">
            <span class="jr-en">${esc(en)}</span><span class="jr-fr">${esc(fr)}</span>
          </button>`;
        proof.hidden = false;
        proof.querySelector('[data-goto]').addEventListener('click', () => play(q.line, q.line + 1));
      });
      saveListening(lesson.day, score);
      reveal();
      const perfect = score === questions.length;
      checkBtn.outerHTML = `
        <p class="jr-score${perfect ? ' is-perfect' : ''}">${perfect ? '🎉' : score >= questions.length / 2 ? '👍' : '💪'} ${score} / ${questions.length}
          <small>${perfect ? 'Tout juste, tu as tout compris !' : 'Relis le texte en écoutant chaque phrase, puis réessaie.'}</small></p>
        <button class="btn btn-ghost btn-small" type="button" id="jrRetry">Recommencer les questions</button>`;
      quiz.querySelector('#jrRetry').addEventListener('click', () => {
        renderQuiz();
        quiz.scrollIntoView({ block: 'start', behavior: 'smooth' });
      });
      if (perfect) confetti(quiz.querySelector('.jr-score'));
    });
  }
  renderQuiz();

  return stop;
}
