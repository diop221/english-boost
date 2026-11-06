// Studio des mots : chaque mot animé en motion design.
// Déroulé d'un mot : l'emoji entre et bouge selon le sens du mot, les lettres
// tombent une à une pendant qu'on entend le mot, puis la traduction, puis la
// phrase d'exemple (mot surligné) lue à voix haute. À la fin : cartes à retourner.
import { speak, stopSpeaking } from './speech.js';
import { markActive } from './store.js';
import { esc, wait, confetti } from './ui.js';

const dialog = document.createElement('dialog');
dialog.className = 'modal studio';
dialog.setAttribute('aria-label', 'Les mots du jour en animation');
document.body.append(dialog);

let run = 0;
let st = null; // { lesson, index, playing }

function stop() {
  run++;
  stopSpeaking();
}

function highlightWord(sentence, word) {
  const start = sentence.toLowerCase().indexOf(word.toLowerCase());
  if (start < 0) return esc(sentence);
  return esc(sentence.slice(0, start)) + `<span class="st-hl">${esc(sentence.slice(start, start + word.length))}</span>` + esc(sentence.slice(start + word.length));
}

function frame(body) {
  const { lesson, index, playing } = st;
  const total = lesson.words.length;
  const quiz = index >= total;
  dialog.innerHTML = `
    <div class="modal-top">
      <span class="modal-label">${quiz ? 'À toi de jouer' : `Mot ${index + 1} / ${total}`}</span>
      <button class="modal-close" type="button" data-act="close" aria-label="Fermer">✕</button>
    </div>
    ${body}
    <div class="dots" aria-hidden="true">
      ${lesson.words.map((_, i) => `<span class="${i < index ? 'is-past' : i === index ? 'is-now' : ''}"></span>`).join('')}
    </div>
    ${quiz ? `
    <div class="modal-actions">
      <button class="btn btn-ghost" type="button" data-act="restart">↺ Revoir l'animation</button>
      <button class="btn btn-primary" type="button" data-act="close">Terminé</button>
    </div>` : `
    <div class="modal-actions">
      <button class="round-btn" type="button" data-act="prev" aria-label="Mot précédent" ${index === 0 ? 'disabled' : ''}>⏮</button>
      <button class="round-btn round-main" type="button" data-act="toggle" aria-label="${playing ? 'Pause' : 'Lecture'}">${playing ? '⏸' : '▶'}</button>
      <button class="round-btn" type="button" data-act="next" aria-label="Mot suivant">⏭</button>
    </div>`}`;
}

function renderWord(revealed = false) {
  const { lesson, index } = st;
  const [en, fr, emoji, motion, example] = lesson.words[index];
  const letters = [...en].map((c, i) => `<span style="--i:${i}">${c === ' ' ? '&nbsp;' : esc(c)}</span>`).join('');
  frame(`
    <div class="stage${revealed ? ' show-fr show-ex' : ''}" style="--h:${index * 36}; --n:${en.length}" data-act="replay">
      <div class="st-burst" aria-hidden="true"></div>
      <div class="st-emoji-wrap" aria-hidden="true"><span class="st-emoji motion-${motion}">${emoji}</span></div>
      <p class="st-word" aria-label="${esc(en)}">${letters}</p>
      <p class="st-fr">${esc(fr)}</p>
      <p class="st-example">${highlightWord(example, en)}</p>
    </div>`);
  return dialog.querySelector('.stage');
}

function renderQuiz() {
  frame(`
    <div class="studio-quiz">
      <p class="hint">Retrouve le mot anglais de chaque image, puis retourne la carte pour vérifier.</p>
      <ul class="flip-grid">
        ${st.lesson.words.map(([en, fr, emoji], i) => `
          <li style="--i:${i}">
            <button class="flip" type="button" data-flip="${i}" style="--h:${i * 36}" aria-label="${esc(fr)} : retourner la carte">
              <span class="flip-inner">
                <span class="flip-face flip-front"><span class="flip-emoji">${emoji}</span><small>${esc(fr)}</small></span>
                <span class="flip-face flip-back"><strong>${esc(en)}</strong></span>
              </span>
            </button>
          </li>`).join('')}
      </ul>
    </div>`);
}

async function play() {
  stop();
  const r = run;
  st.playing = true;
  while (st.index < st.lesson.words.length) {
    const [en, , , , example] = st.lesson.words[st.index];
    const stage = renderWord();
    await wait(400);
    if (r !== run) return;
    await Promise.all([speak(en), wait(900 + en.length * 60)]);
    if (r !== run) return;
    stage.classList.add('show-fr');
    await wait(1100);
    if (r !== run) return;
    stage.classList.add('show-ex');
    await Promise.all([speak(example), wait(1800)]);
    if (r !== run) return;
    await wait(900);
    if (r !== run) return;
    st.index++;
  }
  st.playing = false;
  markActive();
  renderQuiz();
}

function pause() {
  stop();
  st.playing = false;
  renderWord(true);
}

function go(index) {
  st.index = Math.max(0, Math.min(index, st.lesson.words.length - 1));
  if (st.playing) return play();
  stop();
  renderWord(true);
  speak(st.lesson.words[st.index][0]);
}

function toQuiz() {
  stop();
  st.playing = false;
  st.index = st.lesson.words.length;
  renderQuiz();
}

export function openStudio(lesson, index = 0) {
  st = { lesson, index, playing: true };
  dialog.showModal();
  play();
}

export function closeStudio() {
  if (dialog.open) dialog.close();
}

dialog.addEventListener('click', e => {
  const flip = e.target.closest('[data-flip]');
  if (flip) {
    if (flip.classList.toggle('is-flipped')) speak(st.lesson.words[Number(flip.dataset.flip)][0]);
    if (dialog.querySelectorAll('.flip.is-flipped').length === st.lesson.words.length) confetti();
    return;
  }
  const act = e.target.closest('[data-act]')?.dataset.act;
  if (!act) { if (e.target === dialog) dialog.close(); return; } // clic sur le fond
  if (act === 'close') dialog.close();
  else if (act === 'restart') { st.index = 0; play(); }
  else if (act === 'toggle') st.playing ? pause() : play();
  else if (act === 'prev') go(st.index - 1);
  else if (act === 'next') st.index + 1 >= st.lesson.words.length ? toQuiz() : go(st.index + 1);
  else if (act === 'replay' && !st.playing) go(st.index);
});

dialog.addEventListener('keydown', e => {
  if (!st || st.index >= st.lesson.words.length) return;
  if (e.key === 'ArrowRight') { e.preventDefault(); st.index + 1 >= st.lesson.words.length ? toQuiz() : go(st.index + 1); }
  else if (e.key === 'ArrowLeft' && st.index > 0) { e.preventDefault(); go(st.index - 1); }
  else if (e.key === ' ' && !e.target.closest('button')) { e.preventDefault(); st.playing ? pause() : play(); }
});

dialog.addEventListener('close', () => { stop(); st = null; dialog.innerHTML = ''; });
