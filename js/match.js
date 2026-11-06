// Compare ce que l'élève a dit (ou tapé) avec la bonne réponse.
// Tolérant : ignore majuscules, accents, ponctuation, et accepte de petites fautes.

const NUMBERS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];

export function normalize(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[’‘]/g, "'")
    .replace(/…|\.\.\./g, ' ')
    .replace(/[^a-z0-9' ]+/g, ' ')
    .replace(/\b(\d+)\b/g, (m, n) => NUMBERS[Number(n)] ?? m)
    .replace(/\s+/g, ' ')
    .trim();
}

function distance(a, b) {
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const row = [i];
    for (let j = 1; j <= b.length; j++) {
      row[j] = Math.min(prev[j] + 1, row[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = row;
  }
  return prev[b.length];
}

// Note entre 0 et 1. Une expression à trous (« I'm from … ») est réussie
// si chaque morceau est présent dans ce qui a été dit.
export function similarity(said, target) {
  const a = normalize(said);
  const parts = String(target).split(/…|\.\.\./).map(normalize).filter(Boolean);
  const b = parts.join(' ');
  if (!a || !b) return 0;
  if (a === b) return 1;
  if (/…|\.\.\./.test(target) && parts.every(p => a.includes(p))) return 1; // expression à trous complétée
  if (parts.length === 1 && ` ${a} `.includes(` ${b} `)) return 0.95;
  return Math.max(0, 1 - distance(a, b) / Math.max(a.length, b.length));
}

export const bestSimilarity = (alternatives, target) => Math.max(0, ...alternatives.map(alt => similarity(alt, target)));

export function verdict(score) {
  if (score >= 0.85) return { level: 'great', label: 'Parfait !' };
  if (score >= 0.6) return { level: 'close', label: 'Presque !' };
  return { level: 'retry', label: 'Réessaie' };
}
