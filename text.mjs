// Repère les expressions du jour dans une réplique du dialogue.
// Une expression peut contenir "..." (partie à compléter) : chaque morceau est cherché séparément.

const EDGE = /^[\s,.;:!?…]+|[\s,.;:!?…]+$/g;

export function fragments(expression) {
  return expression.split('...').map(part => part.replace(EDGE, '')).filter(Boolean);
}

// Renvoie les plages [début, fin, index de l'expression] trouvées dans le texte, sans chevauchement.
export function findRanges(text, expressions) {
  const lower = text.toLowerCase();
  const ranges = [];
  expressions.forEach((expression, index) => {
    let from = 0;
    for (const part of fragments(expression)) {
      const start = lower.indexOf(part.toLowerCase(), from);
      if (start < 0) return;
      ranges.push([start, start + part.length, index]);
      from = start + part.length;
    }
  });
  ranges.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
  return ranges.filter((range, i) => i === 0 || range[0] >= ranges[i - 1][1]);
}

// Vrai si tous les morceaux de l'expression apparaissent, dans l'ordre, dans le texte.
export function contains(text, expression) {
  const lower = text.toLowerCase();
  let from = 0;
  for (const part of fragments(expression)) {
    const start = lower.indexOf(part.toLowerCase(), from);
    if (start < 0) return false;
    from = start + part.length;
  }
  return true;
}
