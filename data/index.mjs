// Le parcours : 30 jours, 6 chapitres, dans l'ordre du voyage de Modou.
import part1 from './jours-01-10.mjs';
import part2 from './jours-11-20.mjs';
import part3 from './jours-21-30.mjs';
import words from './mots.mjs';
import journal from './journal.mjs';

export const chapters = [
  { id: 1, title: "Les bases", subtitle: "Appels vidéo avant le départ" },
  { id: 2, title: "Le voyage", subtitle: "De Dakar à Londres" },
  { id: 3, title: "L'arrivée en ville", subtitle: "Hôtel, rues et métro" },
  { id: 4, title: "Au travail", subtitle: "Collègues, réunions et pauses" },
  { id: 5, title: "La vie de tous les jours", subtitle: "Restaurant, courses et santé" },
  { id: 6, title: "Week-ends et imprévus", subtitle: "Sorties, urgence et départ" },
];

export const lessons = [...part1, ...part2, ...part3].map(lesson => ({ ...lesson, words: words[lesson.day] ?? [], journal: journal[lesson.day] ?? null }));

export function getLesson(day) {
  return lessons.find(lesson => lesson.day === day);
}

// Tous les éléments à apprendre (mots et expressions), avec un identifiant stable
// utilisé pour les révisions et les favoris : w-<jour>-<n> (mot), e-<jour>-<n> (expression).
export const items = lessons.flatMap(lesson => [
  ...lesson.words.map(([en, fr, emoji, motion, example], i) => ({
    id: `w-${lesson.day}-${i}`, type: 'word', day: lesson.day, index: i, en, fr, emoji, motion, example,
  })),
  ...lesson.expressions.map(([en, fr, tip], i) => ({
    id: `e-${lesson.day}-${i}`, type: 'expr', day: lesson.day, index: i, en: en.replace(/\.\.\./g, '…'), fr, tip,
  })),
]);
const itemsById = new Map(items.map(item => [item.id, item]));
export const getItem = id => itemsById.get(id);
export const lessonItemIds = day => items.filter(item => item.day === day).map(item => item.id);
