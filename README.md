# English Boost

30 jours, 30 situations réelles pour parler anglais. On suit Modou, développeur web
sénégalais, pendant son mois de mission à Londres : du premier appel vidéo jusqu'aux au revoir.

## Ce qu'on fait chaque jour

Chaque jour est organisé en 4 étapes :

1. **10 mots animés** : chaque mot est présenté en motion design. L'emoji bouge selon le sens du mot
   (l'avion s'envole, la pluie tombe, le froid fait trembler), les lettres apparaissent une à une pendant
   que le mot est prononcé, puis viennent la traduction et une phrase d'exemple. La série se termine par
   des cartes à retourner pour vérifier ce qu'on a retenu.
2. **10 expressions** à écouter, puis à répéter **au micro** : le site dit si c'est bien prononcé.
3. **La scène** : le dialogue du jour, avec les expressions surlignées. En mode **🎭 Joue Modou**, les autres
   personnages parlent, et c'est à toi de dire les répliques de Modou au micro.
4. **Exercices** : 10 questions (choisir le bon mot, écrire le mot entendu, remettre une phrase dans l'ordre),
   avec un score et des étoiles.

## Pour ne pas oublier

- **Révisions espacées** : terminer un jour ajoute ses 20 mots et expressions aux révisions.
  Chacun revient 1, 3, 7, 21 puis 60 jours plus tard. Une erreur le fait revenir dès le lendemain.
- **Série 🔥** : le nombre de jours d'affilée où tu as appris quelque chose.
- **Favoris ⭐** : une liste perso de mots difficiles, qu'on peut réviser à part.
- **Recherche** : retrouver n'importe lequel des 600 mots et expressions, en anglais ou en français.

La progression est enregistrée dans le navigateur (localStorage). Il n'y a ni compte ni serveur.

## Sur téléphone et hors ligne

Le site s'installe sur l'écran d'accueil d'un téléphone (menu du navigateur → « Ajouter à l'écran d'accueil »)
et reste utilisable sans connexion une fois chargé.

Le micro utilise la reconnaissance vocale du navigateur : elle marche dans **Chrome** et **Edge**.
Dans les autres navigateurs, les boutons micro sont masqués et tout le reste fonctionne.

## Lancer le projet

```bash
npm start
```

Puis ouvrir **http://localhost:5173**. Le serveur (`serve.py`) empêche le navigateur de garder les fichiers
en cache, donc un simple rechargement suffit pour voir chaque modification.

```bash
npm test
```

Vérifie le contenu (30 jours, 10 mots et 10 expressions par jour, chaque expression présente dans son dialogue…),
la logique des révisions, la comparaison au micro et la liste des fichiers disponibles hors ligne.

## Organisation du code

```
index.html, styles.css, app.js   page, styles (classés par section), navigation entre les pages
data/                            contenu : jours, dialogues, expressions (jours-*.mjs) et mots (mots.mjs)
js/store.js                      progression, révisions espacées, série, favoris
js/speech.js                     voix (synthèse) et micro (reconnaissance vocale)
js/match.js                      comparaison tolérante de ce qui est dit ou écrit
js/ui.js                         outils d'affichage : boutons, retours, confettis, animations
js/studio.js                     animation des mots du jour
js/roleplay.js                   mode « Joue Modou »
js/views/                        une page par fichier : accueil, jour, exercices, révisions, favoris, recherche
sw.js, manifest.webmanifest      installation sur téléphone et mode hors ligne
```

Pour ajouter un fichier JavaScript, l'ajouter aussi à la liste `CORE` de `sw.js` (le test le vérifie).
