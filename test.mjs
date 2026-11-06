// Vérifie la cohérence du parcours : npm test
import assert from 'node:assert/strict';
import { chapters, lessons } from './data/index.mjs';
import { contains, findRanges, fragments } from './text.mjs';
import { MOTIONS } from './data/mots.mjs';

assert.deepEqual(fragments("My name is... but everyone calls me..."), ["My name is", "but everyone calls me"]);
assert.deepEqual(findRanges("Hi, nice to meet you.", ["Nice to meet you"]), [[4, 20, 0]]);

assert.equal(lessons.length, 30, '30 jours attendus');
const problems = [];
lessons.forEach((lesson, i) => {
  const where = `Jour ${lesson.day}`;
  if (lesson.day !== i + 1) problems.push(`${where} : mauvais ordre`);
  if (!chapters.some(c => c.id === lesson.chapter)) problems.push(`${where} : chapitre inconnu`);
  if (lesson.expressions.length !== 10) problems.push(`${where} : ${lesson.expressions.length} expressions au lieu de 10`);
  for (const [code, en, fr] of lesson.dialogue) {
    if (!lesson.cast[code]) problems.push(`${where} : personnage « ${code} » inconnu`);
    if (!en || !fr) problems.push(`${where} : réplique sans traduction`);
  }
  for (const [en, fr] of lesson.expressions) {
    if (!fr) problems.push(`${where} : « ${en} » sans traduction`);
    if (!lesson.dialogue.some(line => contains(line[1], en))) problems.push(`${where} : « ${en} » n'apparaît pas dans le dialogue`);
  }
  if (lesson.words.length !== 10) problems.push(`${where} : ${lesson.words.length} mots au lieu de 10`);
  for (const [en, fr, emoji, motion, example] of lesson.words) {
    if (!fr || !emoji) problems.push(`${where} : mot « ${en} » incomplet`);
    if (!MOTIONS.includes(motion)) problems.push(`${where} : mouvement « ${motion} » inconnu pour « ${en} »`);
    if (!example || !contains(example, en)) problems.push(`${where} : l'exemple de « ${en} » ne contient pas le mot`);
  }
});
const seen = new Map();
for (const lesson of lessons) for (const [en, fr] of lesson.words) {
  const key = `${en.toLowerCase()}|${fr}`;
  if (seen.has(key)) problems.push(`Jour ${lesson.day} : « ${en} » déjà vu au jour ${seen.get(key)}`);
  else seen.set(key, lesson.day);
}
assert.deepEqual(problems, [], '\n' + problems.join('\n'));
console.log(`OK : ${lessons.length} jours, ${lessons.reduce((n, l) => n + l.expressions.length, 0)} expressions, toutes présentes dans leur dialogue, ${lessons.reduce((n, l) => n + l.words.length, 0)} mots.`);

// ─── Journal de Modou (étape Écoute) ───
import journal from './data/journal.mjs';
const jProblems = [];
for (const [day, ep] of Object.entries(journal)) {
  const lesson = lessons.find(l => l.day === Number(day));
  const where = `Journal du jour ${day}`;
  if (!lesson) { jProblems.push(`${where} : ce jour n'existe pas`); continue; }
  if (!ep.title?.[0] || !ep.title?.[1]) jProblems.push(`${where} : titre incomplet`);
  if (ep.text.length < 8) jProblems.push(`${where} : texte trop court (${ep.text.length} phrases)`);
  ep.text.forEach(([en, fr], i) => { if (!en || !fr) jProblems.push(`${where} : phrase ${i} sans traduction`); });
  if (ep.questions.length < 5) jProblems.push(`${where} : ${ep.questions.length} questions au lieu d'au moins 5`);
  for (const q of ep.questions) {
    if (!q.q || !q.fr) jProblems.push(`${where} : question sans traduction`);
    if (!ep.text[q.line]) jProblems.push(`${where} : « ${q.q} » renvoie à une phrase inexistante`);
    if ('tf' in q ? typeof q.tf !== 'boolean' : !(q.a?.length >= 2)) jProblems.push(`${where} : « ${q.q} » sans réponses valables`);
    if (q.a && new Set(q.a).size !== q.a.length) jProblems.push(`${where} : « ${q.q} » a deux réponses identiques`);
  }
  // Le texte doit réutiliser le vocabulaire du jour.
  const full = ep.text.map(([en]) => en).join(' ');
  const reused = [...lesson.words.map(w => w[0]), ...lesson.expressions.map(e => e[0])].filter(x => contains(full, x));
  if (reused.length < 8) jProblems.push(`${where} : seulement ${reused.length} mots ou expressions du jour réutilisés (8 attendus)`);
}
assert.deepEqual(jProblems, [], '\n' + jProblems.join('\n'));
console.log(`OK : ${Object.keys(journal).length} épisodes du journal de Modou.`);

// ─── Exercices : chaque jour a assez de répliques courtes à remettre dans l'ordre ───
const fits = ([, en]) => en.split(' ').length >= 4 && en.split(' ').length <= 10;
for (const lesson of lessons) {
  assert.ok(lesson.dialogue.filter(fits).length >= 3, `Jour ${lesson.day} : pas assez de répliques courtes pour l'exercice d'ordre`);
}

// ─── Comparaison de ce qui est dit au micro ───
import { similarity, verdict } from './js/match.js';
assert.equal(similarity('Loud and clear!', 'Loud and clear'), 1);
assert.equal(similarity("I'm from Senegal", "I'm from…"), 1);
assert.equal(similarity('My name is Modou but everyone calls me Mo', 'My name is… but everyone calls me…'), 1);
assert.equal(verdict(similarity('loud and clean', 'Loud and clear')).level, 'great');
assert.equal(verdict(similarity('hello', 'Loud and clear')).level, 'retry');
assert.equal(similarity('I have 5 years', 'I have five years'), 1);

// ─── Révisions espacées et série ───
import { state, grade, schedule, dueIds, streak, addDays, today, INTERVALS } from './js/store.js';
const t = today();
schedule('w-1-0');
assert.equal(state.srs['w-1-0'].due, addDays(t, 1), 'un nouvel élément revient demain');
assert.deepEqual(dueIds(t), []);
assert.deepEqual(dueIds(addDays(t, 1)), ['w-1-0']);
grade('w-1-0', true, t);
assert.equal(state.srs['w-1-0'].due, addDays(t, INTERVALS[1]), 'bonne réponse : intervalle suivant');
grade('w-1-0', true, t);
assert.equal(state.srs['w-1-0'].due, addDays(t, INTERVALS[2]));
grade('w-1-0', false, t);
assert.deepEqual(state.srs['w-1-0'], { box: 0, due: addDays(t, 1) }, 'erreur : retour à la première boîte');
assert.equal(addDays('2026-12-31', 1), '2027-01-01');
state.activity = [addDays(t, -2), addDays(t, -1)];
assert.equal(streak(), 2, 'la série tient encore aujourd\'hui');
state.activity = [addDays(t, -3), addDays(t, -1), t];
assert.equal(streak(), 2);

// ─── Mode hors ligne : tous les fichiers de l'application sont mis en cache ───
import { readFileSync, readdirSync } from 'node:fs';
const sw = readFileSync('sw.js', 'utf8');
const files = ['app.js', 'text.mjs', 'styles.css', 'index.html',
  ...readdirSync('data').map(f => `data/${f}`),
  ...readdirSync('js').filter(f => f.endsWith('.js')).map(f => `js/${f}`),
  ...readdirSync('js/views').map(f => `js/views/${f}`)];
const missing = files.filter(f => !sw.includes(`'${f}'`));
assert.deepEqual(missing, [], `fichiers absents du cache hors ligne (sw.js) : ${missing.join(', ')}`);
console.log('OK : révisions, micro, exercices et mode hors ligne.');
