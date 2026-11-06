// Exercices d'un jour : 10 questions de 3 types, une par écran.
//   choix   : une image + le français → choisir le bon mot anglais
//   dictée  : écouter un mot → l'écrire
//   ordre   : remettre dans l'ordre les mots d'une réplique de Modou
import { getLesson } from '../../data/index.mjs';
import { state, saveScore, schedule, save } from '../store.js';
import { speak, stopSpeaking } from '../speech.js';
import { esc, shuffle, confetti, icons, wait } from '../ui.js';
import { normalize, similarity } from '../match.js';

// Répliques assez courtes pour être remises dans l'ordre : celles de Modou d'abord.
export function orderCandidates(lesson) {
  const fits = ([, en]) => en.split(' ').length >= 4 && en.split(' ').length <= 10;
  return [
    ...shuffle(lesson.dialogue.filter(line => line[0] === 'M' && fits(line))),
    ...shuffle(lesson.dialogue.filter(line => line[0] !== 'M' && fits(line))),
  ];
}

function buildQuestions(lesson) {
  const words = shuffle(lesson.words.map((w, i) => ({ en: w[0], fr: w[1], emoji: w[2], id: `w-${lesson.day}-${i}` })));
  const choice = words.slice(0, 4).map(w => ({
    type: 'choice', word: w,
    options: shuffle([w.en, ...shuffle(lesson.words.map(x => x[0]).filter(en => en !== w.en)).slice(0, 3)]),
  }));
  const dictation = words.slice(4, 7).map(w => ({ type: 'dictation', word: w }));
  const lines = orderCandidates(lesson);
  const order = lines.slice(0, 3).map(([, en, fr]) => ({ type: 'order', en, fr, tokens: en.split(' ') }));
  // On alterne les types pour garder du rythme.
  const out = [];
  for (let i = 0; out.length < choice.length + dictation.length + order.length; i++) {
    [choice[i], dictation[i], order[i]].forEach(q => q && out.push(q));
  }
  return out;
}

export function renderExercises(app, lesson) {
  const questions = buildQuestions(lesson);
  let index = 0, score = 0, answered = false;
  let alive = true;

  function shell(body) {
    app.innerHTML = `
      <a class="back" href="#/jour/${lesson.day}">← Jour ${lesson.day} · ${esc(lesson.title)}</a>
      <div class="quiz-head">
        <p class="eyebrow">Exercices · Jour ${lesson.day}</p>
        <div class="quiz-progress" role="progressbar" aria-valuemin="0" aria-valuemax="${questions.length}" aria-valuenow="${index}">
          <span style="width:${index / questions.length * 100}%"></span>
        </div>
        <span class="quiz-count">${Math.min(index + 1, questions.length)} / ${questions.length}</span>
      </div>
      ${body}`;
  }

  function feedback(ok, answer) {
    answered = true;
    if (ok) score++;
    else if (questions[index].word) { schedule(questions[index].word.id); save(); }
    const card = app.querySelector('.q-card');
    card.classList.add(ok ? 'is-right' : 'is-wrong');
    app.querySelector('.q-footer').innerHTML = `
      <div class="q-result ${ok ? 'is-right' : 'is-wrong'}">
        <strong>${ok ? '✓ Bravo !' : '✗ Pas tout à fait'}</strong>
        ${ok ? '' : `<span>Réponse : <b>${esc(answer)}</b></span>`}
      </div>
      <button class="btn btn-primary" type="button" id="nextQ">${index + 1 < questions.length ? 'Continuer →' : 'Voir mon score'}</button>`;
    app.querySelector('#nextQ').addEventListener('click', nextQuestion);
    app.querySelector('#nextQ').focus({ preventScroll: true });
    speak(answer);
  }

  function nextQuestion() {
    index++;
    if (index < questions.length) show();
    else end();
  }

  function show() {
    answered = false;
    const q = questions[index];
    if (q.type === 'choice') {
      shell(`
        <div class="q-card" style="--h:${index * 36}">
          <p class="q-type">🎯 Choisis le bon mot</p>
          <div class="q-visual"><span class="q-emoji">${q.word.emoji}</span><p class="q-fr">${esc(q.word.fr)}</p></div>
          <div class="q-options" data-stagger>
            ${q.options.map(o => `<button class="q-option" type="button" data-opt="${esc(o)}">${esc(o)}</button>`).join('')}
          </div>
        </div>
        <div class="q-footer"></div>`);
      app.querySelectorAll('[data-opt]').forEach((btn, i) => {
        btn.style.setProperty('--i', i);
        btn.addEventListener('click', () => {
          if (answered) return;
          const ok = btn.dataset.opt === q.word.en;
          btn.classList.add(ok ? 'is-right' : 'is-wrong');
          app.querySelectorAll('[data-opt]').forEach(b => { b.disabled = true; if (b.dataset.opt === q.word.en) b.classList.add('is-right'); });
          feedback(ok, q.word.en);
        });
      });
    } else if (q.type === 'dictation') {
      shell(`
        <div class="q-card" style="--h:${index * 36}">
          <p class="q-type">🎧 Écoute et écris le mot</p>
          <button class="listen-big" type="button" id="listenBtn" aria-label="Écouter le mot">${icons.play}<span class="ripple"></span></button>
          <form class="q-form" id="dictForm" autocomplete="off">
            <input class="q-input" id="dictInput" type="text" autocapitalize="off" spellcheck="false" placeholder="Écris ce que tu entends…" aria-label="Ta réponse">
            <button class="btn btn-primary" type="submit">Vérifier</button>
          </form>
          <p class="hint">Indice : ${esc(q.word.fr)}</p>
        </div>
        <div class="q-footer"></div>`);
      const listenBtn = app.querySelector('#listenBtn');
      const play = () => { listenBtn.classList.remove('is-playing'); void listenBtn.offsetWidth; listenBtn.classList.add('is-playing'); speak(q.word.en); };
      listenBtn.addEventListener('click', play);
      wait(350).then(() => alive && questions[index] === q && play());
      const input = app.querySelector('#dictInput');
      input.focus({ preventScroll: true });
      app.querySelector('#dictForm').addEventListener('submit', e => {
        e.preventDefault();
        if (answered || !input.value.trim()) return;
        const ok = normalize(input.value) === normalize(q.word.en) || similarity(input.value, q.word.en) >= 0.85;
        input.disabled = true;
        feedback(ok, q.word.en);
      });
    } else {
      const picked = [];
      shell(`
        <div class="q-card" style="--h:${index * 36}">
          <p class="q-type">🧩 Remets la phrase dans l'ordre</p>
          <p class="q-fr q-fr-small">« ${esc(q.fr)} »</p>
          <div class="order-answer" id="orderAnswer" aria-label="Ta phrase"></div>
          <div class="order-bank" id="orderBank"></div>
          <div class="q-form"><button class="btn btn-primary" type="button" id="orderCheck" disabled>Vérifier</button></div>
        </div>
        <div class="q-footer"></div>`);
      const bankEl = app.querySelector('#orderBank'), answerEl = app.querySelector('#orderAnswer'), check = app.querySelector('#orderCheck');
      const tokens = shuffle(q.tokens.map((t, i) => ({ t, i })));
      bankEl.innerHTML = tokens.map(({ t, i }) => `<button class="chip" type="button" data-tok="${i}">${esc(t)}</button>`).join('');
      const refresh = () => { check.disabled = picked.length !== q.tokens.length; };
      bankEl.addEventListener('click', e => {
        const chip = e.target.closest('[data-tok]');
        if (!chip || answered) return;
        picked.push(Number(chip.dataset.tok));
        answerEl.append(chip);
        refresh();
      });
      answerEl.addEventListener('click', e => {
        const chip = e.target.closest('[data-tok]');
        if (!chip || answered) return;
        picked.splice(picked.indexOf(Number(chip.dataset.tok)), 1);
        bankEl.append(chip);
        refresh();
      });
      check.addEventListener('click', () => {
        if (answered) return;
        const ok = picked.map(i => q.tokens[i]).join(' ') === q.en;
        check.disabled = true;
        feedback(ok, q.en);
      });
    }
  }

  function end() {
    saveScore(lesson.day, score);
    const best = state.scores[lesson.day];
    const next = getLesson(lesson.day + 1);
    const stars = score >= 9 ? 3 : score >= 7 ? 2 : score >= 4 ? 1 : 0;
    app.innerHTML = `
      <a class="back" href="#/jour/${lesson.day}">← Jour ${lesson.day} · ${esc(lesson.title)}</a>
      <section class="result">
        <div class="result-stars" aria-label="${stars} étoile${stars > 1 ? 's' : ''} sur 3">
          ${[0, 1, 2].map(i => `<span class="${i < stars ? 'is-on' : ''}" style="--i:${i}">★</span>`).join('')}
        </div>
        <p class="result-score"><strong>${score}</strong> / ${questions.length}</p>
        <p class="lead">${score >= 9 ? 'Excellent, tu maîtrises ce jour !' : score >= 7 ? 'Très bien ! Encore un petit effort.' : score >= 4 ? 'Pas mal. Revois les mots et réessaie.' : 'Revois les mots du jour, puis réessaie.'}</p>
        ${score < questions.length ? '<p class="hint">Les mots ratés ont été ajoutés à tes révisions.</p>' : ''}
        <p class="hint">Meilleur score : ${best} / ${questions.length}</p>
        <div class="hero-actions">
          <button class="btn btn-ghost" type="button" id="againBtn">↺ Recommencer</button>
          <a class="btn btn-ghost" href="#/jour/${lesson.day}">Retour au jour ${lesson.day}</a>
          ${next ? `<a class="btn btn-primary" href="#/jour/${next.day}">Jour ${next.day} →</a>` : ''}
        </div>
      </section>`;
    app.querySelector('#againBtn').addEventListener('click', () => { alive = false; renderExercises(app, lesson); });
    if (score >= 7) confetti(app.querySelector('.result-stars'));
  }

  show();
  document.title = `Exercices · Jour ${lesson.day} — English Boost`;
  return () => { alive = false; stopSpeaking(); };
}
