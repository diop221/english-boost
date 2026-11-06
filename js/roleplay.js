// Mode « Joue Modou » : la scène se déroule comme une vraie conversation.
// Les autres personnages parlent ; quand c'est le tour de Modou, l'élève voit
// la phrase en français et doit la dire en anglais (micro) avant de voir la réponse.
import { speak, stopSpeaking, stopListening, canListen } from './speech.js';
import { markActive } from './store.js';
import { esc, wait, highlight, sayIt, confetti, icons } from './ui.js';

const dialog = document.createElement('dialog');
dialog.className = 'modal roleplay';
dialog.setAttribute('aria-label', 'Joue Modou');
document.body.append(dialog);

let run = 0;

function stop() {
  run++;
  stopSpeaking();
  stopListening();
}

function addBubble(chat, lesson, [code, en, fr], extra = '') {
  const el = document.createElement('div');
  el.className = `rp-line${code === 'M' ? ' is-me' : ''}`;
  el.innerHTML = `
    <span class="who">${esc(lesson.cast[code])}</span>
    <div class="bubble">
      <p class="line-en">${highlight(en, lesson.expressions)}</p>
      <p class="line-fr">${esc(fr)}</p>
      ${extra}
    </div>`;
  chat.append(el);
  el.scrollIntoView({ block: 'end', behavior: 'smooth' });
  return el;
}

// Attend que l'élève fasse son tour : dire la réplique, ou demander la réponse.
function myTurn(panel, line) {
  const [, en, fr] = line;
  return new Promise(resolve => {
    let best = null;
    panel.innerHTML = `
      <div class="turn" data-fb-scope>
        <p class="turn-label">À toi ! Dis en anglais :</p>
        <p class="turn-fr">« ${esc(fr)} »</p>
        <span class="say-fb" aria-live="polite"></span>
        <div class="turn-actions">
          ${canListen ? `<button class="btn btn-primary" type="button" data-turn="mic">${icons.mic} Parler</button>` : ''}
          <button class="btn btn-ghost" type="button" data-turn="reveal">${canListen ? 'Voir la réponse' : 'Voir la réplique'}</button>
        </div>
      </div>`;
    panel.onclick = async e => {
      const btn = e.target.closest('[data-turn]');
      if (!btn) return;
      if (btn.dataset.turn === 'reveal') { panel.onclick = null; return resolve(best); }
      const result = await sayIt(en, btn);
      if (!best || result.score > best.score) best = result;
      btn.innerHTML = `${icons.mic} Réessayer`;
      panel.querySelector('[data-turn="reveal"]').textContent = 'Continuer →';
    };
  });
}

async function start(lesson) {
  stop();
  const r = run;
  const codes = Object.keys(lesson.cast);
  dialog.innerHTML = `
    <div class="modal-top">
      <span class="modal-label">🎭 Tu joues Modou · ${esc(lesson.title)}</span>
      <button class="modal-close" type="button" data-act="close" aria-label="Fermer">✕</button>
    </div>
    <div class="rp-chat">
      <div class="rp-intro"><strong>📍 ${esc(lesson.scene)}</strong>${esc(lesson.intro)}</div>
    </div>
    <div class="rp-panel"></div>`;
  const chat = dialog.querySelector('.rp-chat');
  const panel = dialog.querySelector('.rp-panel');
  let mine = 0, good = 0;

  for (const line of lesson.dialogue) {
    if (r !== run) return;
    const [code, en] = line;
    if (code !== 'M') {
      panel.innerHTML = `<p class="rp-wait"><span class="typing"><i></i><i></i><i></i></span> ${esc(lesson.cast[code])} parle…</p>`;
      await wait(500);
      if (r !== run) return;
      const el = addBubble(chat, lesson, line);
      el.classList.add('is-playing');
      await speak(en, codes.indexOf(code));
      el.classList.remove('is-playing');
      await wait(300);
      continue;
    }
    mine++;
    const result = await myTurn(panel, line);
    if (r !== run) return;
    if (result && result.level !== 'retry') good++;
    const badge = result
      ? `<span class="rp-badge is-${result.level}">${result.level === 'great' ? '✓ Bien dit' : result.level === 'close' ? '≈ Presque' : '✗ À retravailler'}</span>`
      : '';
    panel.innerHTML = '';
    const el = addBubble(chat, lesson, line, badge);
    el.classList.add('is-playing');
    await speak(en, codes.indexOf('M'));
    el.classList.remove('is-playing');
    await wait(250);
  }
  if (r !== run) return;
  markActive();
  panel.innerHTML = `
    <div class="rp-end">
      <p class="rp-score">${canListen ? `${good} / ${mine}` : '🎉'}</p>
      <p>${canListen ? 'répliques bien dites' : 'Scène terminée !'}</p>
      <div class="turn-actions">
        <button class="btn btn-ghost" type="button" data-act="restart">↺ Recommencer</button>
        <button class="btn btn-primary" type="button" data-act="close">Terminé</button>
      </div>
    </div>`;
  if (!canListen || good >= mine / 2) confetti(panel);
}

let currentLesson = null;
export function openRoleplay(lesson) {
  currentLesson = lesson;
  dialog.showModal();
  start(lesson);
}
export function closeRoleplay() {
  if (dialog.open) dialog.close();
}

dialog.addEventListener('click', e => {
  const act = e.target.closest('[data-act]')?.dataset.act;
  if (act === 'close' || e.target === dialog) dialog.close();
  else if (act === 'restart') start(currentLesson);
});
dialog.addEventListener('close', () => { stop(); dialog.innerHTML = ''; });
