export function localDate(date=new Date()){const offset=date.getTimezoneOffset()*60000;return new Date(date-offset).toISOString().slice(0,10)}
export function shiftDate(value,days){const date=new Date(value+'T12:00:00');date.setDate(date.getDate()+days);return localDate(date)}
export function safeLoad(storage,key,fallback){try{const value=JSON.parse(storage.getItem(key));return value&&typeof value==='object'?value:fallback}catch{return fallback}}
export function normalizeAnswer(value){return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase().replace(/[’']/g,"'").replace(/\s+/g,' ')}
export function recordAttempt(previous={},correct,date=localDate()){const next={attempts:0,correct:0,streak:0,lastSeen:null,...previous};next.attempts++;if(correct){next.correct++;next.streak++}else next.streak=0;next.lastSeen=date;next.accuracy=Math.round(next.correct/next.attempts*100);return next}
export function scheduleCard(previous={},rating,date=localDate()){const card={level:0,interval:0,ease:2.5,lapses:0,seen:false,...previous};card.seen=true;if(rating==='again'){card.level=0;card.interval=1;card.ease=Math.max(1.3,card.ease-.2);card.lapses++}else{card.level++;const factor=rating==='hard'?.75:1;card.interval=card.level===1?1:card.level===2?3:Math.max(4,Math.round((card.interval||3)*card.ease*factor));card.ease=Math.max(1.3,Math.min(3,card.ease+(rating==='known'?.1:-.05)))}card.due=shiftDate(date,card.interval);return card}
export function mastery(performance={},card={}){return (performance.attempts||0)>=3&&(performance.accuracy||0)>=80&&(performance.streak||0)>=2&&(card.level||0)>=2}
export function adaptiveDailyLimit(dueCount){if(dueCount>=30)return 5;if(dueCount>=20)return 10;if(dueCount>=10)return 15;return 20}
export function resultSummary(answers,items){const unanswered=items.slice(answers.length).map(word=>({id:word.id,word:word.word,translation:word.translation,ok:false})),all=[...answers,...unanswered],correct=all.filter(answer=>answer.ok).length,missed=[...new Map(all.filter(answer=>!answer.ok).map(answer=>[answer.id,answer])).values()];return{total:items.length,correct,score:items.length?Math.round(correct/items.length*100):0,missed}}
export function formatTime(seconds){const m=Math.floor(seconds/60),s=seconds%60;return `${m}:${String(s).padStart(2,'0')}`}
export function speechSimilarity(target,spoken){
  const expand=s=>String(s||'').toLowerCase()
    .replace(/[’']/g,"'")
    .replace(/\bhow's\b/g,'how is').replace(/\bwhat's\b/g,'what is').replace(/\bthat's\b/g,'that is').replace(/\bit's\b/g,'it is')
    .replace(/\bi'm\b/g,'i am').replace(/\bi'll\b/g,'i will').replace(/\byou're\b/g,'you are').replace(/\bwe're\b/g,'we are')
    .replace(/\bthey're\b/g,'they are').replace(/\bdon't\b/g,'do not').replace(/\bdoesn't\b/g,'does not').replace(/\bdidn't\b/g,'did not')
    .replace(/\bcan't\b/g,'cannot').replace(/\bcouldn't\b/g,'could not').replace(/\bwon't\b/g,'will not').replace(/\blet's\b/g,'let us')
    .replace(/\bi've\b/g,'i have').replace(/\byou've\b/g,'you have');
  const clean=str=>expand(str).replace(/[^a-z0-9\s]/g,'').trim().split(/\s+/).filter(Boolean);
  const t=clean(target),sp=clean(spoken);
  if(!t.length||!sp.length)return 0;
  const setT=new Set(t);let match=0;
  sp.forEach(w=>{if(setT.has(w))match++});
  return Math.min(100,Math.round((match/Math.max(t.length,sp.length))*100));
}

