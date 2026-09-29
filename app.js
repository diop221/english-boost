import {adaptiveDailyLimit,formatTime,localDate,mastery,normalizeAnswer,recordAttempt,resultSummary,safeLoad,scheduleCard,shiftDate,speechSimilarity} from './learning-core.mjs';
import {survivalChunks,argumentChunks,conversationLab,miniDialogues,prepFrameworkQuestions,phaseDescriptions,getPhase,getDailyChunks,getAvailablePrepQuestions,getDailyDialogue,tongueTwisters,pronunciationTraps,emergencyPhrases,getDailyVocalChallenge} from './speaking-data.mjs';

/* ═══════════════════════════════════════════════════════════════════════
   STATE & UTILS
   ═══════════════════════════════════════════════════════════════════════ */
const KEY='english30-v7',now=()=>localDate(),shift=shiftDate;
const LAUNCH_DATE=now(); // Aujourd'hui = Jour 1
const initialState={version:9,start:LAUNCH_DATE,currentDay:1,maxUnlockedDay:1,cards:{},performance:{},reviews:0,last:null,streak:0,exams:{},quizzes:{},studied:0,done:{},dailySets:{},dailyPass:{},attempts:{},testResults:{},chunksHeard:{},chunksSpoken:{},completedDays:{},vocalDone:{}};
let s=safeLoad(localStorage,KEY,initialState);
if(!s.version||s.version<9){s={...initialState};localStorage.setItem(KEY,JSON.stringify(s))}
s={...initialState,...s};s.cards||={};s.performance||={};s.done||={};s.dailySets||={};s.dailyPass||={};s.attempts||={};s.testResults||={};s.chunksHeard||={};s.chunksSpoken||={};s.completedDays||={};s.vocalDone||={};
s.currentDay=Math.min(30,Math.max(1,parseInt(s.currentDay,10)||1));
s.maxUnlockedDay=Math.min(30,Math.max(1,parseInt(s.maxUnlockedDay,10)||s.currentDay));

const $=x=>document.querySelector(x);
let day=s.currentDay,phase=getPhase(day);
const cs=id=>s.cards[id]||{level:0,due:now(),seen:false},shuffle=a=>[...a].sort(()=>Math.random()-.5);
function save(){localStorage.setItem(KEY,JSON.stringify(s))}

function goToDay(targetDay){
  stopPlayingAll();
  carouselIndex = 0;
  day=Math.min(30,Math.max(1,targetDay));
  phase=getPhase(day);
  s.currentDay=day;
  s.maxUnlockedDay=Math.max(s.maxUnlockedDay||1,day);
  save();
  renderDayNavigator();
  renderPhaseBar();
  renderMission();
  renderDailyChunks();
  initQuiz();
  initSpeakingLab();
  initConversationLab();
  renderDialogue();
  updateStats();
  initReflexLab();
  window.scrollTo({top:0,behavior:'smooth'});
}

function renderDayNavigator(){
  const select=$('#daySelect');
  const prevBtn=$('#prevDayBtn');
  const nextBtn=$('#nextDayBtn');
  const resetBtn=$('#resetToDay1Btn');

  if(prevBtn)prevBtn.disabled=(day<=1);
  if(nextBtn)nextBtn.disabled=(day>=30);

  if(select){
    select.innerHTML='';
    for(let d=1;d<=30;d++){
      const opt=document.createElement('option');
      opt.value=d;
      const isCurrent=(d===day);
      const isUnlocked=(d<=(s.maxUnlockedDay||1));
      const isDone=s.completedDays[d];
      let status=isDone?'✓ Validé':isUnlocked?'Débloqué':'🔒';
      if(isCurrent)status='Aujourd\'hui';
      opt.textContent=`Jour ${d} (${status})`;
      if(isCurrent)opt.selected=true;
      select.appendChild(opt);
    }
    select.onchange=e=>goToDay(parseInt(e.target.value,10));
  }

  if(prevBtn)prevBtn.onclick=()=>goToDay(day-1);
  if(nextBtn)nextBtn.onclick=()=>goToDay(day+1);
  if(resetBtn)resetBtn.onclick=()=>{
    if(confirm('Recommencer depuis le Jour 1 ?')){
      s.currentDay=1;
      s.maxUnlockedDay=1;
      s.chunksHeard={};
      s.chunksSpoken={};
      s.completedDays={};
      save();
      goToDay(1);
    }
  };
}

let isPlayingAll=false;
let playAllIdx=0;
let playAllTimeout=null;

function stopPlayingAll(){
  isPlayingAll=false;
  clearTimeout(playAllTimeout);
  if('speechSynthesis' in window)window.speechSynthesis.cancel();
  document.querySelectorAll('.chunk-card').forEach(x=>x.classList.remove('playing'));
  const btn=$('#playAllChunksBtn');
  if(btn){
    btn.classList.remove('playing');
    btn.textContent=playAllIdx>0?'▶ Reprendre':'▶ Tout écouter';
  }
  const status=$('#audioPlayingStatus');
  if(status&&playAllIdx===0)status.classList.add('hidden');
  resumeCarousel();
}

function speakText(text,lang='en-GB',rate=0.82,onEnd=null){
  if(!('speechSynthesis' in window)){
    if(onEnd)onEnd();
    return;
  }
  window.speechSynthesis.cancel();
  setTimeout(()=>{
    const clean=text
      .replace(/\[name\]/gi,'Modou')
      .replace(/\[country\]/gi,'Senegal')
      .replace(/\[job\]/gi,'developer')
      .replace(/\[hobby\]/gi,'coding');
    const u=new SpeechSynthesisUtterance(clean);
    u.lang=lang;
    u.rate=rate;
    const voices=window.speechSynthesis.getVoices();
    const enVoice=voices.find(v=>(v.lang===lang||v.lang.startsWith('en'))&&!v.localService)||voices.find(v=>v.lang===lang||v.lang.startsWith('en'));
    if(enVoice)u.voice=enVoice;
    if(onEnd){
      u.onend=onEnd;
      u.onerror=onEnd;
    }
    window.speechSynthesis.speak(u);
  },40);
}

if('speechSynthesis' in window){
  window.speechSynthesis.onvoiceschanged=()=>window.speechSynthesis.getVoices();
}

/* ═══════════════════════════════════════════════════════════════════════
   PHASE INDICATOR & MISSION DU JOUR
   ═══════════════════════════════════════════════════════════════════════ */
function renderPhaseBar(){
  document.querySelectorAll('.phase-dot').forEach(dot=>{
    const p=parseInt(dot.dataset.phase,10);
    dot.classList.toggle('active',p===phase);
    dot.classList.toggle('completed',p<phase);
  });
}

function renderMission(){
  const ph=phaseDescriptions[phase];
  if($('#missionPhaseLabel'))$('#missionPhaseLabel').textContent=`PHASE ${phase} · ${ph.name.toUpperCase()}`;

  const todayChunks=getDailyChunks(day);
  const heard=todayChunks.filter(c=>s.chunksHeard[c.id]).length;

  if(phase===1){
    if($('#missionTitle'))$('#missionTitle').textContent=`${todayChunks.length} expressions de survie — Jour ${day}`;
    if($('#missionDesc'))$('#missionDesc').textContent=ph.goal;
  } else if(phase===2){
    if($('#missionTitle'))$('#missionTitle').textContent=`Connecteurs d'argumentation — Jour ${day}`;
    if($('#missionDesc'))$('#missionDesc').textContent=ph.goal;
  } else if(phase===3){
    if($('#missionTitle'))$('#missionTitle').textContent=`Conversations réelles — Jour ${day}`;
    if($('#missionDesc'))$('#missionDesc').textContent=ph.goal;
  } else {
    if($('#missionTitle'))$('#missionTitle').textContent=`Mode libre — Jour ${day}`;
    if($('#missionDesc'))$('#missionDesc').textContent=ph.goal;
  }

  if($('#missionDone'))$('#missionDone').textContent=heard;
  if($('#missionTotal'))$('#missionTotal').textContent=todayChunks.length;
  if($('#missionBar'))$('#missionBar').style.width=todayChunks.length?Math.round(heard/todayChunks.length*100)+'%':'0%';
  if($('#dayNumber'))$('#dayNumber').textContent=day;

  // Affichage du bandeau de complétion Étape 1
  const allHeard=todayChunks.length>0&&heard>=todayChunks.length;
  const compEl=$('#chunksCompleted');
  if(compEl){
    compEl.classList.toggle('hidden',!allHeard);
    if(allHeard){
      compEl.innerHTML=`<span>✓</span><p><strong>15 / 15 expressions écoutées !</strong> Passez à l'Étape 2 (Quiz rapide).</p>`;
    }
  }
}

/* ═══════════════════════════════════════════════════════════════════════
   ÉTAPE 1 : EXPRESSIONS DU JOUR (CARROUSEL 2 PAR 2 · 5 SECONDES)
   ═══════════════════════════════════════════════════════════════════════ */
let carouselIndex = 0;
let carouselIsPaused = false;
let carouselProgressInterval = null;
let carouselCurrentPercent = 0;
const CAROUSEL_DURATION = 15000; // 15 secondes par paire d'expressions
const PROGRESS_TICK = 50; // Rafraîchissement barre toutes les 50ms

function stopCarouselTimer() {
  if (carouselProgressInterval) {
    clearInterval(carouselProgressInterval);
    carouselProgressInterval = null;
  }
}

function startCarouselTimer() {
  stopCarouselTimer();
  if (carouselIsPaused) return;

  const bar = $('#carouselTimerBar');
  const status = $('#carouselStatusText');
  const liveIndicator = $('.carousel-live-indicator');
  if (status) status.textContent = 'Défilement auto';
  if (liveIndicator) liveIndicator.classList.remove('paused');

  carouselProgressInterval = setInterval(() => {
    if (carouselIsPaused) return;
    carouselCurrentPercent += (PROGRESS_TICK / CAROUSEL_DURATION) * 100;
    if (bar) bar.style.width = `${Math.min(carouselCurrentPercent, 100)}%`;
    if (carouselCurrentPercent >= 100) {
      carouselCurrentPercent = 0;
      advanceCarousel(1);
    }
  }, PROGRESS_TICK);
}

function pauseCarousel() {
  carouselIsPaused = true;
  stopCarouselTimer();
  const btn = $('#carouselPausePlayBtn');
  if (btn) {
    btn.classList.add('is-paused');
    btn.title = 'Reprendre le défilement';
    const icon = $('#carouselPauseIcon');
    const text = $('#carouselPauseText');
    if (icon) icon.textContent = '▶';
    if (text) text.textContent = 'Reprendre';
  }
  const status = $('#carouselStatusText');
  if (status) status.textContent = 'En pause';
  const liveIndicator = $('.carousel-live-indicator');
  if (liveIndicator) liveIndicator.classList.add('paused');
}

function resumeCarousel() {
  carouselIsPaused = false;
  const btn = $('#carouselPausePlayBtn');
  if (btn) {
    btn.classList.remove('is-paused');
    btn.title = 'Mettre en pause';
    const icon = $('#carouselPauseIcon');
    const text = $('#carouselPauseText');
    if (icon) icon.textContent = '⏸';
    if (text) text.textContent = 'Pause';
  }
  carouselCurrentPercent = 0;
  startCarouselTimer();
}

function advanceCarousel(dir) {
  const todayChunks = getDailyChunks(day);
  const totalSlides = Math.ceil(todayChunks.length / 2);
  if (totalSlides <= 1) return;
  let next = carouselIndex + dir;
  if (next >= totalSlides) next = 0;
  if (next < 0) next = totalSlides - 1;
  goToCarouselSlide(next);
}

function goToCarouselSlide(idx) {
  const todayChunks = getDailyChunks(day);
  const totalSlides = Math.ceil(todayChunks.length / 2);
  if (idx < 0 || idx >= totalSlides) return;
  carouselIndex = idx;
  carouselCurrentPercent = 0;
  const bar = $('#carouselTimerBar');
  if (bar) bar.style.width = '0%';

  const track = $('#carouselSliderTrack');
  if (track) {
    track.style.transform = `translateX(-${carouselIndex * 100}%)`;
  }

  // Mettre à jour les indicateurs de points
  document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === carouselIndex);
  });

  // Mettre à jour le compteur d'expressions
  const startNum = carouselIndex * 2 + 1;
  const endNum = Math.min((carouselIndex + 1) * 2, todayChunks.length);
  const pairEl = $('#carouselCurrentPair');
  if (pairEl) pairEl.textContent = `${startNum}–${endNum}`;
  const totalEl = $('#carouselTotalCount');
  if (totalEl) totalEl.textContent = `${todayChunks.length}`;
}

const CHUNK_VISUAL_MAP = {
  's01': 'assets/visuals/chunk-s01.png',
  's02': 'assets/visuals/chunk-s02.png',
  's03': 'assets/visuals/chunk-s03.png',
  's04': 'assets/visuals/chunk-s04.png',
  's05': 'assets/visuals/chunk-s05.png',
  's36': 'assets/visuals/chunk-s36.png',
  's37': 'assets/visuals/chunk-s37.png',
  's38': 'assets/visuals/chunk-s38.png',
  's39': 'assets/visuals/chunk-s39.png',
  's40': 'assets/visuals/chunk-s40.png',
  's41': 'assets/visuals/chunk-s41.png',
  's42': 'assets/visuals/chunk-s42.png',
  's43': 'assets/visuals/chunk-s43.png',
  's44': 'assets/visuals/chunk-s44.png',
  's45': 'assets/visuals/chunk-s45.png'
};

function getChunkVisualSrc(chunkId) {
  if (CHUNK_VISUAL_MAP[chunkId]) {
    return CHUNK_VISUAL_MAP[chunkId];
  }
  return `assets/visuals/chunk-${chunkId}.svg`;
}

function renderDailyChunks(){
  const todayChunks = getDailyChunks(day);
  const label = phase === 1 ? 'Expressions du jour' : 'Connecteurs du jour';
  if ($('#stepChunksTitle')) $('#stepChunksTitle').textContent = label;

  function buildCardHTML(c, i) {
    const heard = s.chunksHeard[c.id];
    const spoken = s.chunksSpoken[c.id];
    const visualSrc = getChunkVisualSrc(c.id);

    return `
    <div class="chunk-card theme-green ${heard ? 'heard' : ''}" data-chunk-id="${c.id}" data-chunk-idx="${i}">
      <div class="chunk-card-top">
        <span class="chunk-number">${i + 1}</span>
        <span class="chunk-check ${heard ? 'checked' : ''}">✓</span>
      </div>

      <div class="chunk-card-main">
        <div class="chunk-card-info">
          <h3 class="chunk-text">${c.chunk}</h3>
          <div class="chunk-translation">
            <button class="chunk-audio-mini-btn" data-speak="${encodeURIComponent(c.chunk)}" title="Écouter l'expression">📢</button>
            <span class="chunk-translation-text">${c.translation}</span>
          </div>
        </div>

        <div class="chunk-card-visual">
          <img src="${visualSrc}" alt="${c.chunk}" class="chunk-visual-img" loading="lazy" />
        </div>
      </div>

      ${c.example ? `
      <div class="chunk-example-bar">
        <span class="chunk-quote-icon">❝</span>
        <span class="chunk-example-text">« ${c.example} »</span>
        <button class="example-listen-btn" data-example="${encodeURIComponent(c.example)}" title="Écouter l'exemple">🔊</button>
      </div>` : ''}

      <div class="chunk-actions">
        <button class="chunk-listen-btn" data-speak="${encodeURIComponent(c.chunk)}">
          <span class="btn-icon">🎧</span> Écouter
        </button>
        <button class="chunk-mic-btn" data-target="${encodeURIComponent(c.chunk)}" data-id="${c.id}">
          <span class="btn-icon">🎤</span> Répéter au micro
        </button>
      </div>

      ${spoken ? `<div class="chunk-mic-result ${spoken >= 70 ? 'good' : 'partial'}">Score de reconnaissance : ${spoken}%</div>` : ''}
    </div>`;
  }

  // 1. Rendu du Slider Horizontal (Paires de 2 expressions par slide)
  const track = $('#carouselSliderTrack');
  if (track) {
    let slidesHTML = '';
    for (let i = 0; i < todayChunks.length; i += 2) {
      const c1 = todayChunks[i];
      const c2 = todayChunks[i + 1];
      slidesHTML += `
      <div class="carousel-slide" data-slide-idx="${Math.floor(i / 2)}">
        ${buildCardHTML(c1, i)}
        ${c2 ? buildCardHTML(c2, i + 1) : '<div class="chunk-card-empty"></div>'}
      </div>`;
    }
    track.innerHTML = slidesHTML;
  }

  // 2. Rendu des points indicateurs (Pagination)
  const dotsContainer = $('#carouselPaginationDots');
  if (dotsContainer) {
    const totalSlides = Math.ceil(todayChunks.length / 2);
    let dotsHTML = '';
    for (let sIdx = 0; sIdx < totalSlides; sIdx++) {
      const sStart = sIdx * 2 + 1;
      const sEnd = Math.min((sIdx + 1) * 2, todayChunks.length);
      dotsHTML += `<button class="carousel-dot ${sIdx === carouselIndex ? 'active' : ''}" data-slide="${sIdx}" title="Paire ${sIdx + 1} : Expressions ${sStart}-${sEnd}"></button>`;
    }
    dotsContainer.innerHTML = dotsHTML;

    dotsContainer.querySelectorAll('.carousel-dot').forEach(btn => {
      btn.onclick = () => {
        const slideIdx = parseInt(btn.dataset.slide, 10);
        goToCarouselSlide(slideIdx);
      };
    });
  }

  // 3. Rendu de la vue liste complète alternative
  const list = $('#chunksList');
  if (list) {
    list.innerHTML = todayChunks.map((c, i) => buildCardHTML(c, i)).join('');
  }

  // Contrôles du carrousel (flèches + bouton pause/play)
  const prevBtn = $('#carouselPrevBtn');
  if (prevBtn) prevBtn.onclick = () => advanceCarousel(-1);

  const nextBtn = $('#carouselNextBtn');
  if (nextBtn) nextBtn.onclick = () => advanceCarousel(1);

  const pauseBtn = $('#carouselPausePlayBtn');
  if (pauseBtn) {
    pauseBtn.onclick = () => {
      if (carouselIsPaused) {
        resumeCarousel();
      } else {
        pauseCarousel();
      }
    };
  }

  const timerTrack = $('#carouselTimerTrack');
  if (timerTrack) {
    timerTrack.onclick = () => {
      if (carouselIsPaused) {
        resumeCarousel();
      } else {
        pauseCarousel();
      }
    };
  }

  // Pause au survol de la scène
  const stage = $('#carouselStage');
  if (stage) {
    stage.onmouseenter = () => {
      if (!carouselIsPaused) {
        stopCarouselTimer();
        const status = $('#carouselStatusText');
        if (status) status.textContent = 'Pause (survol)';
      }
    };
    stage.onmouseleave = () => {
      if (!carouselIsPaused) {
        startCarouselTimer();
      }
    };
  }

  // Toggle entre Mode Carrousel et Mode Liste
  const carrouselWrapper = $('#chunksCarouselWrapper');
  const viewModeCarouselBtn = $('#viewModeCarouselBtn');
  const viewModeListBtn = $('#viewModeListBtn');

  if (viewModeCarouselBtn && viewModeListBtn && carrouselWrapper && list) {
    viewModeCarouselBtn.onclick = () => {
      viewModeCarouselBtn.classList.add('active');
      viewModeListBtn.classList.remove('active');
      carrouselWrapper.classList.remove('hidden');
      list.classList.add('hidden');
      resumeCarousel();
    };

    viewModeListBtn.onclick = () => {
      viewModeListBtn.classList.add('active');
      viewModeCarouselBtn.classList.remove('active');
      carrouselWrapper.classList.add('hidden');
      list.classList.remove('hidden');
      pauseCarousel();
    };
  }

  // Réinitialiser la position de la slide à 0 si hors limites
  if (carouselIndex >= Math.ceil(todayChunks.length / 2)) {
    carouselIndex = 0;
  }
  goToCarouselSlide(carouselIndex);
  startCarouselTimer();

  // Barre de contrôle audio globale (Play all / Mark all heard)
  const playAllBtn = $('#playAllChunksBtn');
  if (playAllBtn) {
    playAllBtn.classList.toggle('playing', isPlayingAll);
    playAllBtn.textContent = isPlayingAll ? '⏸ Pause' : (playAllIdx > 0 ? '▶ Reprendre' : '▶ Tout écouter');
    playAllBtn.onclick = () => {
      if (isPlayingAll) {
        stopPlayingAll();
      } else {
        startPlayingAll();
      }
    };
  }

  const markAllBtn = $('#markAllHeardBtn');
  if (markAllBtn) {
    markAllBtn.onclick = () => {
      todayChunks.forEach(c => {
        s.chunksHeard[c.id] = true;
      });
      save();
      renderDailyChunks();
      renderMission();
    };
  }

  // Écoute individuelle par expression
  document.querySelectorAll('.chunk-listen-btn, .chunk-audio-mini-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const text = decodeURIComponent(btn.dataset.speak);
      speakText(text);
      const card = btn.closest('.chunk-card');
      const id = card.dataset.chunkId;
      s.chunksHeard[id] = true;
      save();
      document.querySelectorAll(`.chunk-card[data-chunk-id="${id}"]`).forEach(cEl => {
        cEl.classList.add('heard');
        if (!cEl.querySelector('.chunk-check')) {
          cEl.querySelector('.chunk-card-top').insertAdjacentHTML('beforeend', '<span class="chunk-check">✓</span>');
        }
      });
      renderMission();
    };
  });

  // Écoute de l'exemple contextuel
  document.querySelectorAll('.example-listen-btn').forEach(btn => {
    btn.onclick = () => speakText(decodeURIComponent(btn.dataset.example), 'en-GB', 0.85);
  });

  // Enregistrement / test micro
  document.querySelectorAll('.chunk-mic-btn').forEach(btn => {
    btn.onclick = () => {
      pauseCarousel(); // Pause automatique pendant l'enregistrement vocal
      runChunkMicRecognition(btn);
    };
  });
}

function startPlayingAll(){
  const todayChunks = getDailyChunks(day);
  if (!todayChunks.length) return;
  isPlayingAll = true;
  pauseCarousel(); // Pause du carrousel pendant la lecture audio en continu
  const playAllBtn = $('#playAllChunksBtn');
  if (playAllBtn) {
    playAllBtn.classList.add('playing');
    playAllBtn.textContent = '⏸ Pause';
  }
  const status = $('#audioPlayingStatus');
  if (status) status.classList.remove('hidden');

  function step(){
    if (!isPlayingAll) return;
    if (playAllIdx >= todayChunks.length) {
      isPlayingAll = false;
      playAllIdx = 0;
      resumeCarousel(); // Reprendre le défilement auto
      if (playAllBtn) {
        playAllBtn.classList.remove('playing');
        playAllBtn.textContent = '🔄 Réécouter';
      }
      if (status) {
        status.innerHTML = '✅ <strong>15 / 15</strong> expressions écoutées !';
      }
      document.querySelectorAll('.chunk-card').forEach(x => x.classList.remove('playing'));
      renderMission();
      return;
    }

    const c = todayChunks[playAllIdx];
    const targetSlide = Math.floor(playAllIdx / 2);
    goToCarouselSlide(targetSlide);

    const cards = document.querySelectorAll(`.chunk-card[data-chunk-id="${c.id}"]`);
    document.querySelectorAll('.chunk-card').forEach(x => x.classList.remove('playing'));
    cards.forEach(card => {
      card.classList.add('playing');
      card.scrollIntoView({behavior: 'smooth', block: 'nearest'});
    });

    if (status) {
      status.innerHTML = `Lecture : <strong>${playAllIdx + 1} / ${todayChunks.length}</strong>`;
    }

    speakText(c.chunk, 'en-GB', 0.82, () => {
      s.chunksHeard[c.id] = true;
      save();
      cards.forEach(card => {
        card.classList.add('heard');
        if (!card.querySelector('.chunk-check')) {
          card.querySelector('.chunk-card-top').insertAdjacentHTML('beforeend', '<span class="chunk-check">✓</span>');
        }
      });
      renderMission();
      playAllIdx++;
      if (isPlayingAll) {
        playAllTimeout = setTimeout(step, 1100);
      }
    });
  }

  step();
}

function runChunkMicRecognition(btn){
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRec) {
    alert('Reconnaissance vocale supportée sur Chrome et Edge.');
    if (!carouselIsPaused) resumeCarousel();
    return;
  }
  const target = decodeURIComponent(btn.dataset.target);
  const chunkId = btn.dataset.id;

  try {
    const rec = new SpeechRec();
    rec.lang = 'en-US';
    rec.continuous = false;
    rec.interimResults = false;
    btn.classList.add('listening');
    btn.textContent = '🎤 Parlez maintenant...';

    rec.onresult = event => {
      btn.classList.remove('listening');
      btn.textContent = '🎤 Répéter au micro';
      const spoken = event.results[0][0].transcript;
      const score = speechSimilarity(target, spoken);
      s.chunksSpoken[chunkId] = score;
      s.chunksHeard[chunkId] = true;
      save();

      document.querySelectorAll(`.chunk-card[data-chunk-id="${chunkId}"]`).forEach(cEl => {
        cEl.classList.add('heard');
        if (!cEl.querySelector('.chunk-check')) {
          cEl.querySelector('.chunk-card-top').insertAdjacentHTML('beforeend', '<span class="chunk-check">✓</span>');
        }
        let existing = cEl.querySelector('.chunk-mic-result');
        if (!existing) {
          existing = document.createElement('div');
          cEl.appendChild(existing);
        }
        existing.className = `chunk-mic-result ${score >= 70 ? 'good' : 'partial'}`;
        existing.innerHTML = `Score : <strong>${score}%</strong> — Entendu : « <em>${spoken}</em> »`;
      });
      renderMission();

      setTimeout(() => {
        if (!carouselIsPaused) resumeCarousel();
      }, 3000);
    };

    rec.onerror = () => {
      btn.classList.remove('listening');
      btn.textContent = '🎤 Répéter au micro';
      setTimeout(() => {
        if (!carouselIsPaused) resumeCarousel();
      }, 1500);
    };

    rec.onend = () => {
      btn.classList.remove('listening');
      btn.textContent = '🎤 Répéter au micro';
    };

    rec.start();
  } catch {
    btn.classList.remove('listening');
    btn.textContent = '🎤 Répéter au micro';
    if (!carouselIsPaused) resumeCarousel();
  }
}

/* ═══════════════════════════════════════════════════════════════════════
   ÉTAPE 2 : MINI-QUIZ SUR LES CHUNKS DU JOUR
   ═══════════════════════════════════════════════════════════════════════ */
function initQuiz(){
  const btn=$('#startQuizBtn');
  if(!btn)return;
  btn.onclick=()=>startChunkQuiz();
}

function startChunkQuiz(){
  const area=$('#quizArea');
  if(!area)return;
  const todayChunks=getDailyChunks(day);
  if(todayChunks.length<2){
    area.innerHTML='<p class="muted">Pas assez d\'expressions pour un quiz. Écoutez d\'abord les expressions ci-dessus.</p>';
    return;
  }
  const allChunks=[...survivalChunks,...argumentChunks];
  // 15 questions pour évaluer toutes les 15 expressions du jour
  const items=shuffle([...todayChunks]);
  let idx=0,score=0;

  const Q_TYPES = [
    'translate-fr-en',
    'listen',
    'fill-blank',
    'meaning-en-fr',
    'unscramble',
    'speak',
    'fill-blank',
    'listen',
    'translate-fr-en',
    'unscramble',
    'meaning-en-fr',
    'fill-blank',
    'listen',
    'speak',
    'translate-fr-en'
  ];

  function renderQ(){
    if(idx>=items.length){
      const pct=Math.round(score/items.length*100);
      s.completedDays[day]=true;
      if(day<30)s.maxUnlockedDay=Math.max(s.maxUnlockedDay||1,day+1);
      save();
      renderDayNavigator();
      area.innerHTML=`
        <div class="quiz-result">
          <h3>${pct>=80?'🎉 Félicitations !':pct>=60?'👍 Journée validée !':'💪 Continue tes efforts !'}</h3>
          <p><strong>${score} / ${items.length}</strong> bonnes réponses (${pct}%)</p>
          <div style="display:flex;gap:10px;justify-content:center;margin-top:20px;flex-wrap:wrap">
            <button class="secondary-btn" id="retryQuizBtn">Refaire le quiz (15 questions)</button>
            ${day<30?`<button class="primary-btn" id="nextDayQuizBtn">Passer au Jour ${day+1} ➔</button>`:''}
          </div>
        </div>`;
      $('#retryQuizBtn').onclick=()=>startChunkQuiz();
      if($('#nextDayQuizBtn'))$('#nextDayQuizBtn').onclick=()=>goToDay(day+1);
      return;
    }

    const q=items[idx];
    const qType=Q_TYPES[idx % Q_TYPES.length];
    const progressPct=Math.round((idx / items.length) * 100);
    const others=shuffle(allChunks.filter(c=>c.id!==q.id)).slice(0,3);

    function getTypeBadge(type){
      switch(type){
        case 'listen': return '🎧 Écoute & Compréhension';
        case 'fill-blank': return '🧩 Mot Manquant';
        case 'meaning-en-fr': return '🇫🇷 Sens en Français';
        case 'unscramble': return '🔤 Mots dans l\'ordre';
        case 'speak': return '🎙️ Défi Prononciation';
        default: return '🎯 Traduction FR ➔ EN';
      }
    }

    const progressHeaderHTML = `
      <div class="quiz-progress-bar-wrap">
        <div class="quiz-progress-bar-fill" style="width: ${progressPct}%"></div>
      </div>
      <div class="quiz-header-row">
        <span class="quiz-badge-type">${getTypeBadge(qType)}</span>
        <span class="quiz-progress-label">Question ${idx+1} sur ${items.length}</span>
      </div>`;

    function advanceNext(ok, correctText){
      if(ok) score++;
      const fb=$('#quizFeedback');
      if(fb){
        fb.className='quiz-feedback '+(ok?'feedback-correct':'feedback-wrong');
        fb.textContent=ok?'✓ Bravo ! Bonne réponse !':`✕ Correct : ${correctText || q.chunk}`;
      }
      setTimeout(()=>{ idx++; renderQ(); }, 1400);
    }

    // FORMAT 1 : ÉCOUTE AUDIO (listen)
    if(qType==='listen'){
      const opts=shuffle([q,...others]);
      area.innerHTML=`
        <div class="quiz-question">
          ${progressHeaderHTML}
          <h3 class="quiz-question-title">Écoute attentivement et trouve la phrase :</h3>
          <div class="quiz-listen-box">
            <button class="quiz-audio-play-btn" id="quizPlayAudioBtn">🔊 Écouter l'audio</button>
            <div class="quiz-subhint">Indice : « ${q.translation} »</div>
          </div>
          <div class="quiz-options">
            ${opts.map(o=>`<button class="quiz-opt" data-ok="${o.id===q.id}">${o.chunk}</button>`).join('')}
          </div>
          <p class="quiz-feedback" id="quizFeedback"></p>
        </div>`;

      speakText(q.chunk, 'en-GB', 0.85);
      const playBtn=$('#quizPlayAudioBtn');
      if(playBtn) playBtn.onclick=()=>speakText(q.chunk, 'en-GB', 0.85);

      area.querySelectorAll('.quiz-opt').forEach(b=>{
        b.onclick=()=>{
          const ok=b.dataset.ok==='true';
          b.classList.add(ok?'correct':'wrong');
          area.querySelectorAll('.quiz-opt').forEach(x=>{x.disabled=true;if(x.dataset.ok==='true')x.classList.add('correct')});
          advanceNext(ok, q.chunk);
        };
      });
      return;
    }

    // FORMAT 2 : MOT MANQUANT / TEXTE À TROU (fill-blank)
    if(qType==='fill-blank'){
      const rawWords = q.chunk.split(/\s+/);
      const candidates = [];
      rawWords.forEach((w, wIdx)=>{
        const clean = w.replace(/[^a-zA-Z]/g, '');
        if(clean.length>=3 && !w.includes('[') && !w.includes(']')) candidates.push(wIdx);
      });
      const pickIdx = candidates.length > 0 ? candidates[Math.floor(candidates.length / 2)] : 0;
      const targetToken = rawWords[pickIdx] || rawWords[0];
      const cleanTarget = targetToken.replace(/[^a-zA-Z']/g, '');

      const sentenceHTML = rawWords.map((w, wIdx)=>{
        if(wIdx === pickIdx){
          const punct = w.replace(/[a-zA-Z']/g, '');
          return `<span class="quiz-blank-slot" id="quizBlankSlot">_____</span>${punct}`;
        }
        return w;
      }).join(' ');

      const fallbackWords = ['repeat', 'learning', 'improve', 'mean', 'going', 'where', 'beginner', 'pronounce', 'correct', 'first', 'meet', 'about', 'help', 'speak', 'bear', 'understand', 'listen', 'welcome'];
      const otherWords = allChunks
        .map(c => c.chunk.split(/\s+/))
        .flat()
        .map(w => w.replace(/[^a-zA-Z']/g, ''))
        .filter(w => w.length >= 3 && w.toLowerCase() !== cleanTarget.toLowerCase() && !w.includes('['));
      const distractors = shuffle([...otherWords, ...fallbackWords].filter(w => w.toLowerCase() !== cleanTarget.toLowerCase())).slice(0, 3);
      const opts = shuffle([cleanTarget, ...distractors]);

      area.innerHTML=`
        <div class="quiz-question">
          ${progressHeaderHTML}
          <h3 class="quiz-question-title">Complète le mot manquant dans la phrase :</h3>
          <p class="quiz-fill-sentence">${sentenceHTML}</p>
          <div class="quiz-subhint">Sens : « ${q.translation} »</div>
          <div class="quiz-options">
            ${opts.map(w=>`<button class="quiz-opt" data-word="${w}" data-ok="${w.toLowerCase()===cleanTarget.toLowerCase()}">${w}</button>`).join('')}
          </div>
          <p class="quiz-feedback" id="quizFeedback"></p>
        </div>`;

      area.querySelectorAll('.quiz-opt').forEach(b=>{
        b.onclick=()=>{
          const ok=b.dataset.ok==='true';
          b.classList.add(ok?'correct':'wrong');
          const slot=$('#quizBlankSlot');
          if(slot){
            slot.textContent = b.dataset.word;
            slot.classList.add('filled');
          }
          area.querySelectorAll('.quiz-opt').forEach(x=>{x.disabled=true;if(x.dataset.ok==='true')x.classList.add('correct')});
          advanceNext(ok, q.chunk);
        };
      });
      return;
    }

    // FORMAT 3 : SENS EN FRANÇAIS (meaning-en-fr)
    if(qType==='meaning-en-fr'){
      const opts=shuffle([q,...others]);
      area.innerHTML=`
        <div class="quiz-question">
          ${progressHeaderHTML}
          <h3 class="quiz-question-title">Que signifie cette expression en français ?</h3>
          <div class="quiz-target-en-wrap">
            <p class="quiz-target-en">« ${q.chunk} »</p>
            <button class="quiz-mini-speak" id="quizMiniSpeakBtn" title="Écouter l'expression">🔊</button>
          </div>
          <div class="quiz-options">
            ${opts.map(o=>`<button class="quiz-opt" data-ok="${o.id===q.id}">${o.translation}</button>`).join('')}
          </div>
          <p class="quiz-feedback" id="quizFeedback"></p>
        </div>`;

      const speakBtn=$('#quizMiniSpeakBtn');
      if(speakBtn) speakBtn.onclick=()=>speakText(q.chunk, 'en-GB', 0.85);

      area.querySelectorAll('.quiz-opt').forEach(b=>{
        b.onclick=()=>{
          const ok=b.dataset.ok==='true';
          b.classList.add(ok?'correct':'wrong');
          area.querySelectorAll('.quiz-opt').forEach(x=>{x.disabled=true;if(x.dataset.ok==='true')x.classList.add('correct')});
          advanceNext(ok, q.translation);
        };
      });
      return;
    }

    // FORMAT 4 : REMETTRE LES MOTS DANS L'ORDRE (unscramble)
    if(qType==='unscramble'){
      const originalTokens = q.chunk.split(/\s+/);
      const shuffledTokens = shuffle(originalTokens.map((t, i) => ({ text: t, id: i })));
      let placedTokens = [];

      area.innerHTML=`
        <div class="quiz-question">
          ${progressHeaderHTML}
          <h3 class="quiz-question-title">Reconstitue la phrase anglaise dans le bon ordre :</h3>
          <div class="quiz-subhint">Sens : « ${q.translation} »</div>
          <div class="quiz-unscramble-answer" id="unscrambleAnswerArea">
            <span class="unscramble-placeholder" id="unscramblePlaceholder">Clique sur les mots ci-dessous pour former la phrase...</span>
          </div>
          <div class="quiz-word-bank" id="unscrambleBankArea">
            ${shuffledTokens.map(t => `<button class="quiz-word-pill" data-tok-id="${t.id}">${t.text}</button>`).join('')}
          </div>
          <div class="quiz-unscramble-actions">
            <button class="quiz-reset-btn" id="unscrambleResetBtn">↺ Réinitialiser</button>
            <button class="primary-btn compact-btn" id="unscrambleValidateBtn" disabled>✓ Valider</button>
          </div>
          <p class="quiz-feedback" id="quizFeedback"></p>
        </div>`;

      const answerArea = $('#unscrambleAnswerArea');
      const bankArea = $('#unscrambleBankArea');
      const resetBtn = $('#unscrambleResetBtn');
      const valBtn = $('#unscrambleValidateBtn');

      function updateUnscrambleUI(){
        if(placedTokens.length === 0){
          answerArea.innerHTML = '<span class="unscramble-placeholder">Clique sur les mots ci-dessous pour former la phrase...</span>';
          valBtn.disabled = true;
        } else {
          answerArea.innerHTML = placedTokens.map((t, pIdx) => `<button class="quiz-word-pill in-answer" data-placed-idx="${pIdx}">${t.text}</button>`).join('');
          valBtn.disabled = (placedTokens.length !== originalTokens.length);

          answerArea.querySelectorAll('.quiz-word-pill').forEach(pill => {
            pill.onclick = () => {
              const pIdx = parseInt(pill.dataset.placedIdx, 10);
              const removed = placedTokens.splice(pIdx, 1)[0];
              const bankPill = bankArea.querySelector(`.quiz-word-pill[data-tok-id="${removed.id}"]`);
              if(bankPill) bankPill.style.display = 'inline-block';
              updateUnscrambleUI();
            };
          });
        }
      }

      bankArea.querySelectorAll('.quiz-word-pill').forEach(pill => {
        pill.onclick = () => {
          const tokId = parseInt(pill.dataset.tokId, 10);
          const found = shuffledTokens.find(t => t.id === tokId);
          if(found && !placedTokens.some(t => t.id === tokId)){
            placedTokens.push(found);
            pill.style.display = 'none';
            updateUnscrambleUI();
          }
        };
      });

      if(resetBtn) {
        resetBtn.onclick = () => {
          placedTokens = [];
          bankArea.querySelectorAll('.quiz-word-pill').forEach(p => p.style.display = 'inline-block');
          updateUnscrambleUI();
        };
      }

      if(valBtn) {
        valBtn.onclick = () => {
          valBtn.disabled = true;
          const userStr = placedTokens.map(t => t.text).join(' ');
          const ok = (userStr === originalTokens.join(' '));
          speakText(q.chunk, 'en-GB', 0.85);
          advanceNext(ok, q.chunk);
        };
      }
      return;
    }

    // FORMAT 5 : DÉFI ORAL AU MICRO (speak)
    if(qType==='speak'){
      area.innerHTML=`
        <div class="quiz-question">
          ${progressHeaderHTML}
          <h3 class="quiz-question-title">Défi oral : Prononce cette phrase à voix haute</h3>
          <div class="quiz-speak-box">
            <p class="quiz-target-en">« ${q.chunk} »</p>
            <div class="quiz-subhint">Sens : « ${q.translation} »</div>
            <div class="quiz-speak-controls">
              <button class="secondary-btn" id="quizModelListenBtn">🔊 Écouter modèle</button>
              <button class="quiz-mic-record-btn" id="quizMicBtn">🎤 Parler au micro</button>
              <button class="quiz-skip-btn" id="quizSkipBtn">Passer ce défi ➔</button>
            </div>
            <div class="quiz-mic-live-status" id="quizMicStatus">Clique sur "Parler au micro" et répète l'expression.</div>
          </div>
          <p class="quiz-feedback" id="quizFeedback"></p>
        </div>`;

      const listenBtn=$('#quizModelListenBtn');
      if(listenBtn) listenBtn.onclick=()=>speakText(q.chunk, 'en-GB', 0.85);

      const skipBtn=$('#quizSkipBtn');
      if(skipBtn) skipBtn.onclick=()=>{ advanceNext(true, q.chunk); };

      const micBtn=$('#quizMicBtn');
      const micStatus=$('#quizMicStatus');
      const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;

      if(micBtn){
        micBtn.onclick=()=>{
          if(!SpeechRec){
            if(micStatus) micStatus.textContent="Reconnaissance vocale non supportée sur ce navigateur. Vous pouvez passer.";
            return;
          }
          const rec = new SpeechRec();
          rec.lang = 'en-US';
          rec.interimResults = false;
          micBtn.classList.add('recording');
          micBtn.textContent = 'Écoute en cours... 🔴';
          if(micStatus) micStatus.textContent = 'Parlez maintenant...';

          rec.onresult=(e)=>{
            const transcript = e.results[0][0].transcript.toLowerCase();
            const target = q.chunk.toLowerCase().replace(/[^a-z0-9 ]/g,'');
            const match = target.split(' ').filter(w => transcript.includes(w)).length / target.split(' ').length;
            const ok = match >= 0.4 || transcript.length > 3;
            micBtn.classList.remove('recording');
            micBtn.textContent = '🎤 Parler au micro';
            if(micStatus) micStatus.textContent = `Entendu : "${transcript}"`;
            advanceNext(ok, q.chunk);
          };

          rec.onerror=()=>{
            micBtn.classList.remove('recording');
            micBtn.textContent = '🎤 Parler au micro';
            if(micStatus) micStatus.textContent = "Erreur audio ou micro muet. Vous pouvez réessayer ou passer.";
          };

          rec.start();
        };
      }
      return;
    }

    // FORMAT 6 : TRADUCTION DIRECTE FR ➔ EN (translate-fr-en - classique)
    const opts=shuffle([q,...others]);
    area.innerHTML=`
      <div class="quiz-question">
        ${progressHeaderHTML}
        <h3 class="quiz-question-title">Quelle expression anglaise signifie :</h3>
        <p class="quiz-target">« ${q.translation} »</p>
        <div class="quiz-options">
          ${opts.map(o=>`<button class="quiz-opt" data-ok="${o.id===q.id}">${o.chunk}</button>`).join('')}
        </div>
        <p class="quiz-feedback" id="quizFeedback"></p>
      </div>`;

    area.querySelectorAll('.quiz-opt').forEach(b=>{
      b.onclick=()=>{
        const ok=b.dataset.ok==='true';
        b.classList.add(ok?'correct':'wrong');
        area.querySelectorAll('.quiz-opt').forEach(x=>{x.disabled=true;if(x.dataset.ok==='true')x.classList.add('correct')});
        advanceNext(ok, q.chunk);
      };
    });
  }
  renderQ();
}

/* ═══════════════════════════════════════════════════════════════════════
   ÉTAPE 3 : SPEAKING LAB (PREP) — Phase 2+
   ═══════════════════════════════════════════════════════════════════════ */
let prepIndex=0,prepStep=0,prepTimerSec=60,prepIntervalId=null,prepSpeechRec=null,prepIsRecording=false;

function initSpeakingLab(){
  const isUnlocked=true; // Débloqué dès le Jour 1
  if($('#prepBadge'))$('#prepBadge').textContent='Étape 3 · Speaking Lab';
  if($('#prepBadge'))$('#prepBadge').className='step-badge';
  if($('#prepLockedOverlay'))$('#prepLockedOverlay').classList.add('hidden');
  if($('#prepContainer'))$('#prepContainer').classList.remove('hidden');
  if($('#stepPrep'))$('#stepPrep').classList.remove('locked-section');

  if(!isUnlocked)return;

  const questions=getAvailablePrepQuestions(day);
  if(!questions.length)return;

  if($('#prepNextBtn'))$('#prepNextBtn').onclick=()=>{prepIndex=(prepIndex+1)%questions.length;prepStep=0;renderPrepQ()};
  document.querySelectorAll('.prep-step-btn').forEach(btn=>{btn.onclick=()=>{prepStep=parseInt(btn.dataset.step,10);renderPrepQ()}});

  if($('#prepTimerStartBtn'))$('#prepTimerStartBtn').onclick=()=>{
    const display=$('#prepTimer');
    if(prepIntervalId){
      clearInterval(prepIntervalId);prepIntervalId=null;
      $('#prepTimerStartBtn').textContent='▶ Reprendre';display?.classList.remove('running');
    }else{
      $('#prepTimerStartBtn').textContent='⏸ Pause';display?.classList.add('running');
      prepIntervalId=setInterval(()=>{
        prepTimerSec--;if(display)display.textContent=formatTime(prepTimerSec);
        if(prepTimerSec<=0){clearInterval(prepIntervalId);prepIntervalId=null;$('#prepTimerStartBtn').textContent='▶ Démarrer';display?.classList.remove('running');
          const fb=$('#prepFeedback');if(fb){fb.classList.remove('hidden');fb.innerHTML='🎉 <strong>Bravo ! 60 secondes de parole !</strong> Tirez un nouveau sujet.'}}
      },1000);
    }
  };
  if($('#prepTimerResetBtn'))$('#prepTimerResetBtn').onclick=()=>{clearInterval(prepIntervalId);prepIntervalId=null;prepTimerSec=60;if($('#prepTimer')){$('#prepTimer').textContent='1:00';$('#prepTimer').classList.remove('running')}if($('#prepTimerStartBtn'))$('#prepTimerStartBtn').textContent='▶ Démarrer le chrono'};
  if($('#prepMicBtn'))$('#prepMicBtn').onclick=togglePrepMic;

  renderPrepQ();
}

function renderPrepQ(){
  const questions=getAvailablePrepQuestions(day);
  const q=questions[prepIndex%questions.length];
  if(!q)return;
  if($('#prepTopic'))$('#prepTopic').textContent=q.topic;
  if($('#prepQuestionText'))$('#prepQuestionText').textContent=q.question;
  document.querySelectorAll('.prep-step-btn').forEach(btn=>btn.classList.toggle('active',parseInt(btn.dataset.step,10)===prepStep));

  const box=$('#prepStepContent');if(!box)return;
  const steps=[
    {title:'Point',prompt:q.promptP,connectors:q.connectorsP},
    {title:'Reason',prompt:q.promptR,connectors:q.connectorsR},
    {title:'Example',prompt:q.promptE,connectors:q.connectorsE},
    {title:'Conclusion',prompt:q.promptConclusion,connectors:q.connectorsC},
  ][prepStep];
  box.innerHTML=`<div class="step-prompt-text"><strong>${steps.title} :</strong> ${steps.prompt}</div><div class="connectors-list">${steps.connectors.map(c=>`<button class="connector-chip" data-speak="${c}"><span class="chip-speaker">🔊</span><span>${c}</span></button>`).join('')}</div>`;
  box.querySelectorAll('.connector-chip').forEach(chip=>{chip.onclick=()=>speakText(chip.dataset.speak)});
}

function togglePrepMic(){
  const SpeechRec=window.SpeechRecognition||window.webkitSpeechRecognition;
  const btn=$('#prepMicBtn'),transcriptEl=$('#prepTranscriptText'),placeholderEl=$('#prepSpeechPlaceholder'),feedbackEl=$('#prepFeedback');
  if(!SpeechRec){alert('Reconnaissance vocale supportée sur Chrome et Edge.');return}
  if(prepIsRecording){prepSpeechRec?.stop();prepIsRecording=false;btn?.classList.remove('recording');if(btn)btn.textContent='🎤 Activer le micro';return}
  try{
    prepSpeechRec=new SpeechRec();prepSpeechRec.lang='en-US';prepSpeechRec.continuous=true;prepSpeechRec.interimResults=true;
    prepIsRecording=true;btn?.classList.add('recording');if(btn)btn.textContent='⏹ Arrêter';if(placeholderEl)placeholderEl.classList.add('hidden');if(transcriptEl)transcriptEl.textContent='Écoute...';
    let fullTranscript='';
    prepSpeechRec.onresult=event=>{let interim='';for(let i=event.resultIndex;i<event.results.length;++i){if(event.results[i].isFinal)fullTranscript+=' '+event.results[i][0].transcript;else interim+=event.results[i][0].transcript}if(transcriptEl)transcriptEl.textContent=(fullTranscript+' '+interim).trim();const wc=fullTranscript.trim().split(/\s+/).filter(Boolean).length;if(feedbackEl){feedbackEl.classList.remove('hidden');feedbackEl.innerHTML=`<strong>${wc}</strong> mot(s) reconnu(s). Continuez !`}};
    prepSpeechRec.onerror=()=>{prepIsRecording=false;btn?.classList.remove('recording');if(btn)btn.textContent='🎤 Activer le micro'};
    prepSpeechRec.onend=()=>{prepIsRecording=false;btn?.classList.remove('recording');if(btn)btn.textContent='🎤 Activer le micro'};
    prepSpeechRec.start();
  }catch{prepIsRecording=false;btn?.classList.remove('recording')}
}

/* ═══════════════════════════════════════════════════════════════════════
   ÉTAPE 4 : CONVERSATION LAB — Débloqué dès le Jour 8
   ═══════════════════════════════════════════════════════════════════════ */
let convLabFilter='all';

function initConversationLab(){
  const isUnlocked=true; // Débloqué dès le Jour 1
  if($('#convLabBadge'))$('#convLabBadge').textContent='Étape 4 · Conversation Lab';
  if($('#convLabBadge'))$('#convLabBadge').className='step-badge';
  if($('#convLabLockedOverlay'))$('#convLabLockedOverlay').classList.add('hidden');
  if($('#convLabUnlocked'))$('#convLabUnlocked').classList.remove('hidden');
  if($('#stepConvLab'))$('#stepConvLab').classList.remove('locked-section');
  if(!isUnlocked)return;

  const filterBar=$('#convLabFilterBar');
  if(filterBar){
    filterBar.innerHTML=`<button class="convlab-filter-btn active" data-conv="all">Tout</button>${conversationLab.map(c=>`<button class="convlab-filter-btn" data-conv="${c.id}">${c.category}</button>`).join('')}`;
    filterBar.onclick=e=>{const b=e.target.closest('[data-conv]');if(!b)return;convLabFilter=b.dataset.conv;filterBar.querySelectorAll('.convlab-filter-btn').forEach(x=>x.classList.toggle('active',x===b));renderConvLabScenarios()};
  }
  renderConvLabScenarios();
}

function renderConvLabScenarios(){
  const container=$('#convLabScenarios');if(!container)return;
  let cats=convLabFilter==='all'?conversationLab:conversationLab.filter(c=>c.id===convLabFilter);
  let html='';

  cats.forEach(cat=>{
    html+=`<div class="convlab-category"><h3 class="convlab-cat-title">${cat.category}</h3><p class="convlab-cat-desc">${cat.desc}</p><div class="convlab-cards">`;

    cat.scenarios.forEach(sc=>{
      const hasPhrases=sc.phrases&&sc.phrases.length>0;
      html+=`<div class="convlab-card">
        <h4 class="convlab-card-title">${sc.title}</h4>
        <p class="convlab-card-prompt">${sc.prompt}</p>`;

      if(hasPhrases){
        html+=`<div class="convlab-phrases">${sc.phrases.map(p=>`<div class="convlab-phrase"><span>${p}</span><button class="convlab-phrase-speak" data-speak="${encodeURIComponent(p)}">🔊</button></div>`).join('')}</div>`;
      }

      if(sc.example){
        html+=`<div class="convlab-example"><strong>Exemple :</strong><p>${sc.example.replace(/\\n/g,'<br>')}</p></div>`;
      }

      html+=`<div class="convlab-card-tip">💡 ${sc.tip}</div>`;
      html+=`<div class="convlab-card-actions">
        <button class="convlab-mic-btn" data-scenario="${encodeURIComponent(sc.title)}">🎤 Pratiquer au micro</button>
      </div>`;
      html+=`</div>`;
    });

    html+=`</div></div>`;
  });

  container.innerHTML=html;
  container.querySelectorAll('.convlab-phrase-speak').forEach(b=>{b.onclick=()=>speakText(decodeURIComponent(b.dataset.speak))});
  container.querySelectorAll('.convlab-mic-btn').forEach(b=>{b.onclick=()=>startConvLabMic(b)});
}

function startConvLabMic(btn){
  const SpeechRec=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SpeechRec){alert('Reconnaissance vocale supportée sur Chrome et Edge.');return}
  if(btn.classList.contains('recording')){return}

  try{
    const rec=new SpeechRec();rec.lang='en-US';rec.continuous=true;rec.interimResults=true;
    btn.classList.add('recording');btn.textContent='⏹ Arrêter l\'enregistrement';
    let fullTranscript='',feedbackEl=btn.closest('.convlab-card').querySelector('.convlab-mic-feedback');
    if(!feedbackEl){feedbackEl=document.createElement('div');feedbackEl.className='convlab-mic-feedback';btn.closest('.convlab-card-actions').after(feedbackEl)}

    rec.onresult=event=>{
      let interim='';
      for(let i=event.resultIndex;i<event.results.length;++i){if(event.results[i].isFinal)fullTranscript+=' '+event.results[i][0].transcript;else interim+=event.results[i][0].transcript}
      feedbackEl.innerHTML=`<div class="convlab-transcript">${(fullTranscript+' '+interim).trim()}</div><div class="convlab-wc"><strong>${fullTranscript.trim().split(/\s+/).filter(Boolean).length}</strong> mot(s) reconnus</div>`;
    };

    const stopRec=()=>{rec.stop();btn.classList.remove('recording');btn.textContent='🎤 Pratiquer au micro';
      const wc=fullTranscript.trim().split(/\s+/).filter(Boolean).length;
      if(wc>0)feedbackEl.innerHTML+=`<div class="convlab-result ${wc>=10?'good':'partial'}">${wc>=20?'🎉 Excellent ! '+wc+' mots produits.':wc>=10?'👍 Bon effort ! Continue à développer.':'💪 C\'est un début ! Essaie d\'en dire plus.'}</div>`;
    };
    btn.onclick=stopRec;
    rec.onerror=()=>{btn.classList.remove('recording');btn.textContent='🎤 Pratiquer au micro';btn.onclick=()=>startConvLabMic(btn)};
    rec.onend=()=>{btn.classList.remove('recording');btn.textContent='🎤 Pratiquer au micro';btn.onclick=()=>startConvLabMic(btn)};
    rec.start();
  }catch{btn.classList.remove('recording');btn.textContent='🎤 Pratiquer au micro'}
}

/* ═══════════════════════════════════════════════════════════════════════
   MINI-DIALOGUE DU JOUR (Bonus automatique selon le jour)
   ═══════════════════════════════════════════════════════════════════════ */

function renderDialogue(){
  const dial = getDailyDialogue(day);
  const container = $('#dialogueContainer'), title = $('#dialogueTitle'), badge = $('#stepDialogue .step-badge');

  if(badge) badge.textContent = `✨ Bonus · Jour ${day}`;
  if(title) title.textContent = dial ? dial.title : 'Dialogue immersif';

  if(!container || !dial) return;
  container.innerHTML = `
    <p class="dialogue-context">${dial.context}</p>
    <div class="dialogue-bubble-list">
      ${dial.lines.map(l => `
        <div class="dialogue-line ${l.speaker === 'You' ? 'you' : 'other'}" data-speak="${encodeURIComponent(l.text)}">
          <div class="dialogue-speaker ${l.speaker === 'You' ? 'you' : ''}">${l.speaker}</div>
          <div class="dialogue-text">${l.text}</div>
        </div>`).join('')}
    </div>
    <div class="dialogue-footer-actions">
      <button class="dialogue-play-all-btn" id="dialoguePlayAllBtn">
        <span>▶ Écouter tout le dialogue</span>
      </button>
    </div>`;

  container.querySelectorAll('.dialogue-line').forEach(line => {
    line.onclick = () => speakText(decodeURIComponent(line.dataset.speak));
  });

  const playAllBtn = $('#dialoguePlayAllBtn');
  if(playAllBtn){
    playAllBtn.onclick = () => {
      let lineIdx = 0;
      function playNext(){
        if(lineIdx >= dial.lines.length) return;
        const line = dial.lines[lineIdx];
        speakText(line.text);
        lineIdx++;
        setTimeout(playNext, Math.max(2200, line.text.split(' ').length * 450));
      }
      playNext();
    };
  }
}

/* ═══════════════════════════════════════════════════════════════════════
   STATISTIQUES & PROGRESSION
   ═══════════════════════════════════════════════════════════════════════ */
function updateStats(){
  const chunksLearned=Object.keys(s.chunksHeard).length;
  const chunksSpoken=Object.keys(s.chunksSpoken).length;
  const streakCount=Math.max(1,s.streak||1);
  if($('#knownStat'))$('#knownStat').textContent=chunksLearned;
  if($('#reviewStat'))$('#reviewStat').textContent=chunksSpoken;
  if($('#streakStat'))$('#streakStat').textContent=streakCount;
  if($('#rateStat'))$('#rateStat').textContent=chunksLearned?Math.min(100,Math.round((chunksSpoken/Math.max(1,chunksLearned))*100))+'%':'0%';
}

/* ═══════════════════════════════════════════════════════════════════════
   PRONUNCIATION & REFLEX LAB (Atelier Vocal Anti-Blocage)
   ═══════════════════════════════════════════════════════════════════════ */
function startTwisterMic(btn, isDaily = false){
  const card=btn.closest('.twister-card') || btn.closest('.daily-vocal-card');
  const fb=card?.querySelector('.twister-feedback');
  const target=decodeURIComponent(btn.dataset.target);
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){
    alert('Reconnaissance vocale non disponible sur ce navigateur. Utilisez Google Chrome ou Microsoft Edge pour le micro.');
    return;
  }
  btn.classList.add('recording');
  btn.textContent='🔴 Parlez...';
  if(fb){
    fb.classList.remove('hidden');
    fb.innerHTML='<em>Écoute en cours... Récitez le virelangue à voix haute.</em>';
  }

  try{
    const rec=new SR();
    rec.lang='en-US';
    rec.continuous=false;
    rec.interimResults=false;
    rec.onresult=e=>{
      const spoken=e.results[0][0].transcript;
      const sim=speechSimilarity(target,spoken);
      btn.classList.remove('recording');
      btn.textContent='🎤 Réessayer';
      const isGood = sim >= 65;
      if(isDaily && isGood){
        s.vocalDone[day] = true;
        save();
        const statusEl = $('#dailyVocalStatus');
        if(statusEl){
          statusEl.className = 'daily-vocal-status done';
          statusEl.textContent = '✅ Défi vocal validé !';
        }
      }
      if(fb){
        fb.innerHTML=`
          <div class="twister-score-box ${isGood?'good':'try'}">
            <strong>${isGood?'🎉 Défi Validé ! Score : '+sim+'%':'💪 Encourageant ! Score : '+sim+'% (vise 65%+)'}</strong>
            <p>Entendu : « ${spoken} »</p>
          </div>
        `;
      }
    };
    rec.onerror=()=>{
      btn.classList.remove('recording');
      btn.textContent='🎤 Défi Micro';
      if(fb)fb.innerHTML='<span class="twister-err">Micro interrompu. Réessayez !</span>';
    };
    rec.onend=()=>{
      btn.classList.remove('recording');
      if(!btn.textContent.includes('Réessayer'))btn.textContent='🎤 Défi Micro';
    };
    rec.start();
  }catch{
    btn.classList.remove('recording');
    btn.textContent='🎤 Défi Micro';
  }
}

function initReflexLab(){
  // Mise à jour de l'indicateur du jour
  const tag=$('#reflexDayTag');
  if(tag)tag.textContent=`Jour ${day}`;

  // Gestion des onglets
  const tabs=document.querySelectorAll('.reflex-tab-btn');
  tabs.forEach(btn=>{
    btn.onclick=()=>{
      tabs.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const target=btn.dataset.tab;
      $('#tabDaily')?.classList.toggle('hidden',target!=='daily');
      $('#tabTwisters')?.classList.toggle('hidden',target!=='twisters');
      $('#tabTraps')?.classList.toggle('hidden',target!=='traps');
      $('#tabEmergency')?.classList.toggle('hidden',target!=='emergency');
    };
  });

  // Rendu Onglet 1 (Par défaut) : Défi Vocal du Jour (dynamique selon le jour sélectionné)
  const dailyContainer=$('#dailyVocalContainer');
  if(dailyContainer){
    const ch=getDailyVocalChallenge(day);
    const isDone=!!s.vocalDone[day];
    dailyContainer.innerHTML=`
      <div class="daily-vocal-header">
        <div class="daily-vocal-title">
          <h3>⭐ Défi Vocal Quotidien · Jour ${ch.day}</h3>
          <p>💡 ${ch.dailyTip}</p>
        </div>
        <div class="daily-vocal-status ${isDone?'done':'todo'}" id="dailyVocalStatus">
          ${isDone?'✅ Défi validé au micro !':'🎯 À répéter au micro'}
        </div>
      </div>

      <div class="daily-vocal-cards">
        <!-- 1. Virelangue du Jour -->
        <div class="daily-vocal-card twister-card">
          <div class="twister-top">
            <span class="twister-level ${ch.twister.level.toLowerCase()}">${ch.twister.level}</span>
            <span class="twister-focus">${ch.twister.focus}</span>
          </div>
          <p class="twister-text">« ${ch.twister.text} »</p>
          <p class="twister-tip">💡 ${ch.twister.tip}</p>
          <div class="twister-actions">
            <button class="twister-btn btn-daily-slow" data-text="${encodeURIComponent(ch.twister.text)}">🐢 Lent (0.6x)</button>
            <button class="twister-btn btn-daily-norm" data-text="${encodeURIComponent(ch.twister.text)}">🔊 Normal</button>
            <button class="twister-btn btn-twister-mic btn-daily-mic" data-target="${encodeURIComponent(ch.twister.text)}">🎤 Défi Micro</button>
          </div>
          <div class="twister-feedback hidden"></div>
        </div>

        <!-- 2. Son Piège du Jour -->
        <div class="daily-vocal-card trap-card">
          <div class="trap-header">
            <div class="daily-vocal-card-head">
              <h3>${ch.trap.sound}</h3>
              <span class="daily-vocal-card-badge">Son Piège</span>
            </div>
            <span class="trap-rule">${ch.trap.rule}</span>
          </div>
          <p class="trap-tip">💡 ${ch.trap.tip}</p>
          <div class="trap-pairs">
            ${ch.trap.pairs.map(pair=>`
              <button class="trap-word-btn" data-word="${pair.word}">
                <strong>${pair.word}</strong>
                <small>${pair.ipa}</small>
                <span>🔊</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- 3. Phrase Réflexe du Jour -->
        <div class="daily-vocal-card emergency-card" data-phrase="${encodeURIComponent(ch.emergency.phrase)}">
          <div class="emergency-icon">⚡</div>
          <div class="emergency-body">
            <div class="daily-vocal-card-head" style="margin-bottom:4px;">
              <span class="daily-vocal-card-badge" style="background:var(--secondary-light); color:var(--secondary);">Réflexe Clé</span>
            </div>
            <strong class="emergency-phrase">« ${ch.emergency.phrase} »</strong>
            <span class="emergency-fr">${ch.emergency.translation}</span>
          </div>
          <button class="emergency-listen-btn" aria-label="Écouter">🔊</button>
        </div>
      </div>
    `;

    dailyContainer.querySelector('.btn-daily-slow').onclick=()=>speakText(ch.twister.text,'en-GB',0.62);
    dailyContainer.querySelector('.btn-daily-norm').onclick=()=>speakText(ch.twister.text,'en-GB',0.88);
    const micBtn=dailyContainer.querySelector('.btn-daily-mic');
    micBtn.onclick=()=>startTwisterMic(micBtn,true);
    dailyContainer.querySelectorAll('.trap-word-btn').forEach(b=>{
      b.onclick=()=>speakText(b.dataset.word,'en-GB',0.78);
    });
    const emCard=dailyContainer.querySelector('.emergency-card');
    if(emCard)emCard.onclick=()=>speakText(ch.emergency.phrase,'en-GB',0.85);
  }

  // Rendu Onglet 2 : Bibliothèque Virelangues
  const twistersGrid=$('#twistersGrid');
  if(twistersGrid){
    twistersGrid.innerHTML=tongueTwisters.map(t=>`
      <div class="twister-card" id="twister-${t.id}">
        <div class="twister-top">
          <span class="twister-level ${t.level.toLowerCase()}">${t.level}</span>
          <span class="twister-focus">${t.focus}</span>
        </div>
        <p class="twister-text">« ${t.text} »</p>
        <p class="twister-tip">💡 ${t.tip}</p>
        <div class="twister-actions">
          <button class="twister-btn btn-listen-slow" data-text="${encodeURIComponent(t.text)}">🐢 Lent (0.6x)</button>
          <button class="twister-btn btn-listen-norm" data-text="${encodeURIComponent(t.text)}">🔊 Normal</button>
          <button class="twister-btn btn-twister-mic" data-target="${encodeURIComponent(t.text)}">🎤 Défi Micro</button>
        </div>
        <div class="twister-feedback hidden"></div>
      </div>
    `).join('');

    twistersGrid.querySelectorAll('.btn-listen-slow').forEach(b=>{
      b.onclick=()=>speakText(decodeURIComponent(b.dataset.text),'en-GB',0.62);
    });
    twistersGrid.querySelectorAll('.btn-listen-norm').forEach(b=>{
      b.onclick=()=>speakText(decodeURIComponent(b.dataset.text),'en-GB',0.88);
    });
    twistersGrid.querySelectorAll('.btn-twister-mic').forEach(b=>{
      b.onclick=()=>startTwisterMic(b,false);
    });
  }

  // Rendu Onglet 3 : Tous les Sons Pièges
  const trapsGrid=$('#trapsGrid');
  if(trapsGrid){
    trapsGrid.innerHTML=pronunciationTraps.map(p=>`
      <div class="trap-card">
        <div class="trap-header">
          <h3>${p.sound}</h3>
          <span class="trap-rule">${p.rule}</span>
        </div>
        <p class="trap-tip">💡 ${p.tip}</p>
        <div class="trap-pairs">
          ${p.pairs.map(pair=>`
            <button class="trap-word-btn" data-word="${pair.word}">
              <strong>${pair.word}</strong>
              <small>${pair.ipa}</small>
              <span>🔊</span>
            </button>
          `).join('')}
        </div>
      </div>
    `).join('');

    trapsGrid.querySelectorAll('.trap-word-btn').forEach(b=>{
      b.onclick=()=>speakText(b.dataset.word,'en-GB',0.78);
    });
  }

  // Rendu Onglet 4 : Toutes les Phrases de Secours
  const emergencyGrid=$('#emergencyGrid');
  if(emergencyGrid){
    emergencyGrid.innerHTML=emergencyPhrases.map(e=>`
      <div class="emergency-card" data-phrase="${encodeURIComponent(e.phrase)}">
        <div class="emergency-icon">⚡</div>
        <div class="emergency-body">
          <strong class="emergency-phrase">« ${e.phrase} »</strong>
          <span class="emergency-fr">${e.translation}</span>
        </div>
        <button class="emergency-listen-btn" aria-label="Écouter">🔊</button>
      </div>
    `).join('');

    emergencyGrid.querySelectorAll('.emergency-card').forEach(card=>{
      card.onclick=()=>speakText(decodeURIComponent(card.dataset.phrase),'en-GB',0.85);
    });
  }
}

function initNavDropdown(){
  const dropdown = $('#navDropdown');
  const btn = $('#navDropdownBtn');
  if(!dropdown || !btn) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  dropdown.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
      dropdown.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (e) => {
    if(!dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && dropdown.classList.contains('open')) {
      dropdown.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.focus();
    }
  });
}

// ═══════════════════════════════════════════════════════════════
// DÉMARRAGE DE L'APPLICATION (BOOT)
// ═══════════════════════════════════════════════════════════════
renderDayNavigator();
initNavDropdown();
renderPhaseBar();
renderMission();
renderDailyChunks();
initQuiz();
initSpeakingLab();
initConversationLab();
renderDialogue();
updateStats();
initReflexLab();

