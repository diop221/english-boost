// Voix (synthèse vocale) et micro (reconnaissance vocale) du navigateur.
import { state } from './store.js';

export const canSpeak = 'speechSynthesis' in window;
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
export const canListen = !!Recognition;

let englishVoices = [];
function loadVoices() {
  const all = speechSynthesis.getVoices().filter(v => v.lang.startsWith('en'));
  const british = all.filter(v => v.lang === 'en-GB');
  englishVoices = british.length >= 2 ? british : [...british, ...all.filter(v => v.lang !== 'en-GB')];
}
if (canSpeak) {
  loadVoices();
  speechSynthesis.addEventListener('voiceschanged', loadVoices);
}
const PITCHES = [1, 1.15, 0.9, 1.25];

// Chaque personnage garde la même voix : voiceIndex = sa place dans la distribution.
export function speak(text, voiceIndex = 0) {
  return new Promise(resolve => {
    if (!canSpeak) return resolve();
    const utterance = new SpeechSynthesisUtterance(String(text).replace(/[“”]/g, '').replace(/…/g, ', '));
    utterance.lang = 'en-GB';
    if (englishVoices.length) utterance.voice = englishVoices[voiceIndex % englishVoices.length];
    utterance.pitch = PITCHES[voiceIndex % PITCHES.length];
    utterance.rate = state.slow ? 0.72 : 0.95;
    utterance.onend = utterance.onerror = resolve;
    speechSynthesis.speak(utterance);
  });
}

export function stopSpeaking() {
  if (canSpeak) speechSynthesis.cancel();
}

// Écoute une phrase en anglais. Renvoie les transcriptions possibles ([] si rien entendu).
let current = null;
export function listen() {
  stopListening();
  stopSpeaking();
  return new Promise((resolve, reject) => {
    if (!canListen) return reject(new Error('unsupported'));
    const rec = new Recognition();
    current = rec;
    rec.lang = 'en-GB';
    rec.interimResults = false;
    rec.maxAlternatives = 5;
    let heard = [];
    rec.onresult = e => { heard = [...e.results[0]].map(alt => alt.transcript); };
    rec.onerror = e => {
      if (e.error === 'not-allowed' || e.error === 'service-not-allowed') reject(new Error('denied'));
    };
    rec.onend = () => { if (current === rec) current = null; resolve(heard); };
    rec.start();
  });
}

export function stopListening() {
  if (current) { const rec = current; current = null; rec.abort(); }
}
