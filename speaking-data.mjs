/* =========================================================================
   SPEAKING-DATA.MJS — Données pédagogiques restructurées
   Architecture progressive : Phase 1 (Survie) → Phase 4 (Mode Libre)
   ========================================================================= */

// ─── PHASE 1 (Jours 1-7) : EXPRESSIONS DE SURVIE ──────────────────────────
export const survivalChunks = [
  // --- Jour 1 : Se présenter & engager ---
  { id:'s01', day:1, chunk:"Hi, I'm [name]. Nice to meet you!", translation:"Salut, je suis [nom]. Enchanté !", example:"Hi, I'm Modou. Nice to meet you! Where are you from?", audio:'en-GB' },
  { id:'s02', day:1, chunk:"I'm from [country]. What about you?", translation:"Je viens de [pays]. Et toi ?", example:"I'm from Senegal. What about you?", audio:'en-GB' },
  { id:'s03', day:1, chunk:"I'm learning English to improve my speaking.", translation:"J'apprends l'anglais pour améliorer mon oral.", example:"I'm learning English to improve my speaking, so please correct me!", audio:'en-GB' },
  { id:'s04', day:1, chunk:"Could you repeat that, please?", translation:"Tu peux répéter, s'il te plaît ?", example:"Sorry, could you repeat that, please? I didn't catch it.", audio:'en-GB' },
  { id:'s05', day:1, chunk:"What does that mean?", translation:"Qu'est-ce que ça veut dire ?", example:"Interesting word! What does that mean exactly?", audio:'en-GB' },
  { id:'s36', day:1, chunk:"How's it going?", translation:"Comment ça va ?", example:"Hey everyone, how's it going today?", audio:'en-GB' },
  { id:'s37', day:1, chunk:"I go by [name]", translation:"Faites-vous appeler [nom]", example:"My name is Mamadou, but I go by Modou.", audio:'en-GB' },
  { id:'s38', day:1, chunk:"What brings you here?", translation:"Qu'est-ce qui t'amène ici ?", example:"So, what brings you here to this language exchange?", audio:'en-GB' },
  { id:'s39', day:1, chunk:"I work as a [job]", translation:"Je travaille comme [métier]", example:"I work as a software developer.", audio:'en-GB' },
  { id:'s40', day:1, chunk:"English isn't my first language, so bear with me", translation:"L'anglais n'est pas ma langue maternelle, alors soyez indulgents", example:"English isn't my first language, so bear with me if I make mistakes.", audio:'en-GB' },
  { id:'s41', day:1, chunk:"Nice to e-meet you", translation:"Ravi de faire votre connaissance (virtuellement)", example:"I've read your profile, nice to e-meet you!", audio:'en-GB' },
  { id:'s42', day:1, chunk:"Where are you based?", translation:"Où es-tu basé ?", example:"I'm in Paris right now. Where are you based?", audio:'en-GB' },
  { id:'s43', day:1, chunk:"I'm a complete beginner", translation:"Je suis un vrai débutant", example:"I'm a complete beginner, so I'll try to speak slowly.", audio:'en-GB' },
  { id:'s44', day:1, chunk:"How do you pronounce your name?", translation:"Comment prononces-tu ton prénom ?", example:"Sorry if I say it wrong, how do you pronounce your name?", audio:'en-GB' },
  { id:'s45', day:1, chunk:"Feel free to correct me anytime", translation:"N'hésite pas à me corriger à tout moment", example:"I'm still learning, so feel free to correct me anytime.", audio:'en-GB' },

  // --- Jour 2 : Réagir & écouter activement ---
  { id:'s06', day:2, chunk:"That makes sense.", translation:"Ça a du sens. / Je comprends.", example:"Oh, that makes sense. I didn't think about it that way.", audio:'en-GB' },
  { id:'s07', day:2, chunk:"I totally agree with you.", translation:"Je suis totalement d'accord avec toi.", example:"I totally agree with you. That's exactly what I think.", audio:'en-GB' },
  { id:'s08', day:2, chunk:"Really? No way!", translation:"Sérieux ? Pas possible !", example:"You climbed Mount Kilimanjaro? Really? No way!", audio:'en-GB' },
  { id:'s09', day:2, chunk:"That's a good point.", translation:"C'est un bon argument.", example:"That's a good point. I hadn't considered that.", audio:'en-GB' },
  { id:'s10', day:2, chunk:"Exactly! That's what I was thinking.", translation:"Exactement ! C'est ce que je pensais.", example:"Exactly! That's what I was thinking too.", audio:'en-GB' },
  { id:'s46', day:2, chunk:"I couldn't agree more", translation:"Je ne pourrais pas être plus d'accord", example:"I couldn't agree more, it's definitely a problem.", audio:'en-GB' },
  { id:'s47', day:2, chunk:"Wait, seriously?", translation:"Attends, sérieusement ?", example:"Wait, seriously? You've never eaten pizza?", audio:'en-GB' },
  { id:'s48', day:2, chunk:"That's awesome!", translation:"C'est génial !", example:"You got the job? That's awesome!", audio:'en-GB' },
  { id:'s49', day:2, chunk:"I feel the same way", translation:"Je ressens la même chose", example:"I was so stressed today. I feel the same way.", audio:'en-GB' },
  { id:'s50', day:2, chunk:"Oh, I see what you mean", translation:"Oh, je vois ce que tu veux dire", example:"Oh, I see what you mean now. Thanks for explaining.", audio:'en-GB' },
  { id:'s51', day:2, chunk:"Fair enough", translation:"C'est de bonne guerre / Je comprends", example:"You don't want to go? Fair enough.", audio:'en-GB' },
  { id:'s52', day:2, chunk:"I hear you", translation:"Je t'entends / Je te comprends", example:"I hear you, it's a frustrating situation.", audio:'en-GB' },
  { id:'s53', day:2, chunk:"You've got a point", translation:"Tu as raison / C'est pas faux", example:"You've got a point, maybe we should start earlier.", audio:'en-GB' },
  { id:'s54', day:2, chunk:"That's crazy!", translation:"C'est dingue !", example:"That's crazy! How did you manage that?", audio:'en-GB' },
  { id:'s55', day:2, chunk:"Absolutely!", translation:"Absolument !", example:"Are you joining us tomorrow? Absolutely!", audio:'en-GB' },

  // --- Jour 3 : Gagner du temps (anti-blocage) ---
  { id:'s11', day:3, chunk:"How should I put it...", translation:"Comment dire...", example:"How should I put it... I think the problem is deeper than that.", audio:'en-GB' },
  { id:'s12', day:3, chunk:"The thing is...", translation:"Le truc, c'est que...", example:"The thing is, I understand grammar but I can't speak fluently.", audio:'en-GB' },
  { id:'s13', day:3, chunk:"What I mean is...", translation:"Ce que je veux dire, c'est...", example:"Sorry, that came out wrong. What I mean is, we need more practice.", audio:'en-GB' },
  { id:'s14', day:3, chunk:"I'm not sure how to say this in English, but...", translation:"Je ne suis pas sûr de comment dire ça en anglais, mais...", example:"I'm not sure how to say this in English, but basically, I love cooking.", audio:'en-GB' },
  { id:'s15', day:3, chunk:"Let me think about that for a second.", translation:"Laisse-moi y réfléchir une seconde.", example:"Good question. Let me think about that for a second.", audio:'en-GB' },
  { id:'s56', day:3, chunk:"Bear with me...", translation:"Laissez-moi réfléchir / Patientez...", example:"Bear with me, I need to find the right word.", audio:'en-GB' },
  { id:'s57', day:3, chunk:"It's hard to explain, but...", translation:"C'est difficile à expliquer, mais...", example:"It's hard to explain, but it feels like a dream.", audio:'en-GB' },
  { id:'s58', day:3, chunk:"Off the top of my head...", translation:"De but en blanc / Comme ça...", example:"Off the top of my head, I'd say there were 50 people there.", audio:'en-GB' },
  { id:'s59', day:3, chunk:"I'd say roughly...", translation:"Je dirais à peu près...", example:"I'd say roughly half the team was missing.", audio:'en-GB' },
  { id:'s60', day:3, chunk:"Long story short...", translation:"Pour faire court...", example:"Long story short, we missed our train.", audio:'en-GB' },
  { id:'s61', day:3, chunk:"In other words...", translation:"En d'autres termes...", example:"In other words, we need to try a different approach.", audio:'en-GB' },
  { id:'s62', day:3, chunk:"To put it simply...", translation:"Pour faire simple...", example:"To put it simply, the project is cancelled.", audio:'en-GB' },
  { id:'s63', day:3, chunk:"If that makes sense?", translation:"Si tu vois ce que je veux dire ?", example:"I want a job that is challenging but relaxing, if that makes sense?", audio:'en-GB' },
  { id:'s64', day:3, chunk:"Am I making sense?", translation:"Est-ce que ce que je dis est clair ?", example:"Am I making sense, or should I explain it again?", audio:'en-GB' },
  { id:'s65', day:3, chunk:"Sorry, I lost my train of thought", translation:"Désolé, j'ai perdu le fil de mes pensées", example:"Sorry, I lost my train of thought. Where was I?", audio:'en-GB' },

  // --- Jour 4 : Donner son avis simplement ---
  { id:'s16', day:4, chunk:"To be honest, I think...", translation:"Pour être honnête, je pense que...", example:"To be honest, I think social media is a waste of time.", audio:'en-GB' },
  { id:'s17', day:4, chunk:"In my opinion,...", translation:"À mon avis,...", example:"In my opinion, traveling is the best way to learn a language.", audio:'en-GB' },
  { id:'s18', day:4, chunk:"I'm not really sure, but I'd say...", translation:"Je ne suis pas vraiment sûr, mais je dirais que...", example:"I'm not really sure, but I'd say it depends on the situation.", audio:'en-GB' },
  { id:'s19', day:4, chunk:"It depends on the situation.", translation:"Ça dépend de la situation.", example:"Is remote work better? Well, it depends on the situation.", audio:'en-GB' },
  { id:'s20', day:4, chunk:"I've never really thought about that.", translation:"Je n'y ai jamais vraiment réfléchi.", example:"Wow, I've never really thought about that. Let me think...", audio:'en-GB' },
  { id:'s66', day:4, chunk:"If you ask me...", translation:"Si tu veux mon avis...", example:"If you ask me, we should leave earlier.", audio:'en-GB' },
  { id:'s67', day:4, chunk:"I'd say that...", translation:"Je dirais que...", example:"I'd say that this is the best pizza in town.", audio:'en-GB' },
  { id:'s68', day:4, chunk:"I'm kind of torn on this", translation:"Je suis un peu partagé là-dessus", example:"I'm kind of torn on this issue, honestly.", audio:'en-GB' },
  { id:'s69', day:4, chunk:"I'm on the fence about it", translation:"Je suis indécis", example:"I'm on the fence about it, I could go either way.", audio:'en-GB' },
  { id:'s70', day:4, chunk:"I lean towards...", translation:"Je penche plutôt vers...", example:"I lean towards the second option.", audio:'en-GB' },
  { id:'s71', day:4, chunk:"That's debatable", translation:"Ça se discute", example:"That's debatable, some people might disagree.", audio:'en-GB' },
  { id:'s72', day:4, chunk:"I wouldn't say that exactly", translation:"Je ne dirais pas ça comme ça", example:"I wouldn't say that exactly, but it's close.", audio:'en-GB' },
  { id:'s73', day:4, chunk:"I partly agree, but...", translation:"Je suis en partie d'accord, mais...", example:"I partly agree, but we also have to consider the cost.", audio:'en-GB' },
  { id:'s74', day:4, chunk:"Here's the thing...", translation:"Le truc, c'est...", example:"Here's the thing... we don't have enough time.", audio:'en-GB' },
  { id:'s75', day:4, chunk:"The bottom line is...", translation:"L'essentiel, c'est...", example:"The bottom line is that we need to finish this today.", audio:'en-GB' },

  // --- Jour 5 : Raconter & rebondir ---
  { id:'s21', day:5, chunk:"So basically, what happened was...", translation:"En gros, ce qui s'est passé, c'est...", example:"So basically, what happened was, I missed my flight!", audio:'en-GB' },
  { id:'s22', day:5, chunk:"Have you ever experienced something like that?", translation:"T'as déjà vécu un truc comme ça ?", example:"That was crazy. Have you ever experienced something like that?", audio:'en-GB' },
  { id:'s23', day:5, chunk:"It reminds me of the time when...", translation:"Ça me rappelle la fois où...", example:"It reminds me of the time when I got lost in London.", audio:'en-GB' },
  { id:'s24', day:5, chunk:"You know what I mean?", translation:"Tu vois ce que je veux dire ?", example:"It's hard to explain, but it felt right. You know what I mean?", audio:'en-GB' },
  { id:'s25', day:5, chunk:"That's so interesting! Tell me more.", translation:"C'est tellement intéressant ! Raconte-moi la suite.", example:"You lived in Japan? That's so interesting! Tell me more.", audio:'en-GB' },
  { id:'s76', day:5, chunk:"Long story short...", translation:"Pour faire court...", example:"Long story short, we ended up walking the whole way.", audio:'en-GB' },
  { id:'s77', day:5, chunk:"Guess what happened!", translation:"Devine ce qui s'est passé !", example:"Guess what happened! I saw my old boss at the store.", audio:'en-GB' },
  { id:'s78', day:5, chunk:"I couldn't believe it!", translation:"Je n'en revenais pas !", example:"When she told me the news, I couldn't believe it!", audio:'en-GB' },
  { id:'s79', day:5, chunk:"The funny thing is...", translation:"Ce qui est drôle, c'est...", example:"The funny thing is, I had the keys in my pocket the whole time.", audio:'en-GB' },
  { id:'s80', day:5, chunk:"Speaking of which...", translation:"En parlant de ça...", example:"Speaking of which, did you watch the game last night?", audio:'en-GB' },
  { id:'s81', day:5, chunk:"That reminds me...", translation:"Ça me rappelle...", example:"That reminds me, I need to call my mom.", audio:'en-GB' },
  { id:'s82', day:5, chunk:"By the way...", translation:"Au fait...", example:"By the way, have you seen the new movie?", audio:'en-GB' },
  { id:'s83', day:5, chunk:"Going back to what you said...", translation:"Pour en revenir à ce que tu disais...", example:"Going back to what you said earlier, I think you're right.", audio:'en-GB' },
  { id:'s84', day:5, chunk:"Anyway, as I was saying...", translation:"Bref, comme je disais...", example:"Anyway, as I was saying, we should go tomorrow.", audio:'en-GB' },
  { id:'s85', day:5, chunk:"And then out of nowhere...", translation:"Et puis, de nulle part...", example:"And then out of nowhere, it started raining heavily.", audio:'en-GB' },

  // --- Jour 6 : Poser des questions naturelles ---
  { id:'s26', day:6, chunk:"What do you do for a living?", translation:"Tu fais quoi dans la vie ?", example:"By the way, what do you do for a living?", audio:'en-GB' },
  { id:'s27', day:6, chunk:"How long have you been learning English?", translation:"Depuis combien de temps tu apprends l'anglais ?", example:"Your English is good! How long have you been learning?", audio:'en-GB' },
  { id:'s28', day:6, chunk:"What's it like living in [place]?", translation:"C'est comment de vivre à [endroit] ?", example:"What's it like living in Tokyo? I've always wanted to visit.", audio:'en-GB' },
  { id:'s29', day:6, chunk:"Do you have any tips for improving my English?", translation:"T'as des conseils pour que je progresse en anglais ?", example:"You're so fluent! Do you have any tips for improving my English?", audio:'en-GB' },
  { id:'s30', day:6, chunk:"How does that work in your country?", translation:"Comment ça marche dans ton pays ?", example:"That's different here. How does that work in your country?", audio:'en-GB' },
  { id:'s86', day:6, chunk:"What made you decide to...?", translation:"Qu'est-ce qui t'a poussé à... ?", example:"What made you decide to move to London?", audio:'en-GB' },
  { id:'s87', day:6, chunk:"How did you end up...?", translation:"Comment t'es-tu retrouvé à... ?", example:"How did you end up working in marketing?", audio:'en-GB' },
  { id:'s88', day:6, chunk:"Are you into [hobby]?", translation:"Tu aimes [loisir] ?", example:"Are you into photography by any chance?", audio:'en-GB' },
  { id:'s89', day:6, chunk:"Have you ever tried...?", translation:"As-tu déjà essayé... ?", example:"Have you ever tried surfing?", audio:'en-GB' },
  { id:'s90', day:6, chunk:"What would you do if...?", translation:"Que ferais-tu si... ?", example:"What would you do if you won the lottery?", audio:'en-GB' },
  { id:'s91', day:6, chunk:"Is it worth it?", translation:"Ça vaut le coup ?", example:"I'm thinking about buying this phone. Is it worth it?", audio:'en-GB' },
  { id:'s92', day:6, chunk:"What's the deal with...?", translation:"C'est quoi l'histoire avec... ?", example:"What's the deal with that new restaurant?", audio:'en-GB' },
  { id:'s93', day:6, chunk:"Did I get that right?", translation:"J'ai bien compris ?", example:"So you leave at 5, did I get that right?", audio:'en-GB' },
  { id:'s94', day:6, chunk:"Can you walk me through that?", translation:"Tu peux m'expliquer étape par étape ?", example:"Can you walk me through the installation process?", audio:'en-GB' },
  { id:'s95', day:6, chunk:"What do you mean by...?", translation:"Que veux-tu dire par... ?", example:"What do you mean by 'too expensive'?", audio:'en-GB' },

  // --- Jour 7 : Conclure & être poli ---
  { id:'s31', day:7, chunk:"It was great talking to you!", translation:"C'était super de discuter avec toi !", example:"Hey, I have to go. It was great talking to you!", audio:'en-GB' },
  { id:'s32', day:7, chunk:"I really enjoyed this conversation.", translation:"J'ai vraiment apprécié cette conversation.", example:"I really enjoyed this conversation. Let's do it again!", audio:'en-GB' },
  { id:'s33', day:7, chunk:"Sorry, I didn't catch that. Could you speak a bit slower?", translation:"Pardon, j'ai pas compris. Tu peux parler un peu plus lentement ?", example:"Sorry, I didn't catch that. Could you speak a bit slower please?", audio:'en-GB' },
  { id:'s34', day:7, chunk:"I'll keep that in mind, thanks!", translation:"Je retiens ça, merci !", example:"Great advice! I'll keep that in mind, thanks!", audio:'en-GB' },
  { id:'s35', day:7, chunk:"Keep up the good work! See you next time.", translation:"Continue comme ça ! À la prochaine.", example:"You're making great progress. Keep up the good work! See you next time.", audio:'en-GB' },
  { id:'s96', day:7, chunk:"I'll let you go now.", translation:"Je te laisse.", example:"I'll let you go now. Talk to you later!", audio:'en-GB' },
  { id:'s97', day:7, chunk:"Let's stay in touch!", translation:"Restons en contact !", example:"It was great meeting you. Let's stay in touch!", audio:'en-GB' },
  { id:'s98', day:7, chunk:"I'll definitely remember that.", translation:"Je m'en souviendrai, c'est sûr.", example:"That's a good tip, I'll definitely remember that.", audio:'en-GB' },
  { id:'s99', day:7, chunk:"That was really helpful, thanks!", translation:"C'était super utile, merci !", example:"That was really helpful, thanks for your time!", audio:'en-GB' },
  { id:'s100', day:7, chunk:"I appreciate your patience.", translation:"J'apprécie ta patience.", example:"Sorry it took me so long to understand, I appreciate your patience.", audio:'en-GB' },
  { id:'s101', day:7, chunk:"Sorry for my accent!", translation:"Désolé pour mon accent !", example:"Sorry for my accent! I'm still trying to improve.", audio:'en-GB' },
  { id:'s102', day:7, chunk:"Take care and have a great day!", translation:"Prends soin de toi et bonne journée !", example:"Take care and have a great day!", audio:'en-GB' },
  { id:'s103', day:7, chunk:"Hopefully we can chat again soon.", translation:"J'espère qu'on pourra discuter à nouveau bientôt.", example:"Hopefully we can chat again soon, I had a good time.", audio:'en-GB' },
  { id:'s104', day:7, chunk:"You've been so helpful!", translation:"Tu as été tellement utile !", example:"You've been so helpful! I finally understand.", audio:'en-GB' },
  { id:'s105', day:7, chunk:"Good luck with everything!", translation:"Bonne chance pour tout !", example:"Good luck with everything, especially your new job!", audio:'en-GB' }
];

// ─── PHASE 2 (Jours 8-15) : CONNECTEURS D'ARGUMENTATION ───────────────────
export const argumentChunks = [
  // Day 8: Point (stating your opinion)
  { id:'a01', day:8, category:'Point', chunk:"From my perspective,", translation:"De mon point de vue,", example:"From my perspective, learning by doing is always more effective.", level:'B2' },
  { id:'a02', day:8, category:'Point', chunk:"The way I see it,", translation:"La façon dont je vois les choses,", example:"The way I see it, AI is a tool, not a threat.", level:'B2' },
  { id:'a17', day:8, category:'Point', chunk:"I tend to think that...", translation:"J'ai tendance à penser que...", example:"I tend to think that we need more time for this.", level:'B2' },
  { id:'a18', day:8, category:'Point', chunk:"If you ask me,", translation:"Si tu veux mon avis,", example:"If you ask me, this is the best solution we have.", level:'B2' },
  { id:'a19', day:8, category:'Point', chunk:"To my mind,", translation:"À mon sens,", example:"To my mind, this project is a huge success.", level:'B2' },
  { id:'a20', day:8, category:'Point', chunk:"Personally, I feel that...", translation:"Personnellement, je trouve que...", example:"Personally, I feel that we could do better.", level:'B2' },
  { id:'a21', day:8, category:'Point', chunk:"I'm of the opinion that...", translation:"Je suis d'avis que...", example:"I'm of the opinion that reading is better than watching TV.", level:'B2' },
  { id:'a22', day:8, category:'Point', chunk:"As I see it,", translation:"Comme je le vois,", example:"As I see it, we have two main options.", level:'B2' },
  { id:'a23', day:8, category:'Point', chunk:"I honestly believe that...", translation:"Je crois sincèrement que...", example:"I honestly believe that everyone can learn a new language.", level:'B2' },
  { id:'a24', day:8, category:'Point', chunk:"It seems to me that...", translation:"Il me semble que...", example:"It seems to me that we are missing the main point.", level:'B2' },
  { id:'a25', day:8, category:'Point', chunk:"My point of view is that...", translation:"Mon point de vue est que...", example:"My point of view is that quality matters more than speed.", level:'B2' },
  { id:'a26', day:8, category:'Point', chunk:"I figure that...", translation:"Je me dis que...", example:"I figure that we might as well try it out.", level:'B2' },
  { id:'a27', day:8, category:'Point', chunk:"I'd say that...", translation:"Je dirais que...", example:"I'd say that this is our best bet for now.", level:'B2' },
  { id:'a28', day:8, category:'Point', chunk:"I lean towards thinking that...", translation:"Je penche pour dire que...", example:"I lean towards thinking that it's too risky.", level:'B2' },
  { id:'a29', day:8, category:'Point', chunk:"I'm convinced that...", translation:"Je suis convaincu que...", example:"I'm convinced that hard work always pays off.", level:'B2' },

  // Day 9: Point (stating your opinion)
  { id:'a03', day:9, category:'Point', chunk:"I strongly believe that...", translation:"Je crois fermement que...", example:"I strongly believe that everyone should learn a second language.", level:'B2' },
  { id:'a04', day:9, category:'Point', chunk:"As far as I'm concerned,", translation:"En ce qui me concerne,", example:"As far as I'm concerned, 15 minutes a day beats 3 hours on Sunday.", level:'B2' },
  { id:'a30', day:9, category:'Point', chunk:"There's no doubt in my mind that...", translation:"Il n'y a aucun doute dans mon esprit que...", example:"There's no doubt in my mind that she will succeed.", level:'B2' },
  { id:'a31', day:9, category:'Point', chunk:"I firmly believe that...", translation:"Je crois fermement que...", example:"I firmly believe that honesty is the best policy.", level:'B2' },
  { id:'a32', day:9, category:'Point', chunk:"I have no doubt that...", translation:"Je n'ai aucun doute que...", example:"I have no doubt that we'll meet the deadline.", level:'B2' },
  { id:'a33', day:9, category:'Point', chunk:"I am fairly certain that...", translation:"Je suis presque certain que...", example:"I am fairly certain that the meeting was postponed.", level:'B2' },
  { id:'a34', day:9, category:'Point', chunk:"It goes without saying that...", translation:"Il va sans dire que...", example:"It goes without saying that safety comes first.", level:'B2' },
  { id:'a35', day:9, category:'Point', chunk:"I hold the view that...", translation:"Je suis d'avis que...", example:"I hold the view that education should be free.", level:'B2' },
  { id:'a36', day:9, category:'Point', chunk:"My stance is that...", translation:"Ma position est que...", example:"My stance is that we need to invest more in renewable energy.", level:'B2' },
  { id:'a37', day:9, category:'Point', chunk:"I'm inclined to believe that...", translation:"Je suis enclin à croire que...", example:"I'm inclined to believe that it was an honest mistake.", level:'B2' },
  { id:'a38', day:9, category:'Point', chunk:"It's my conviction that...", translation:"C'est ma conviction que...", example:"It's my conviction that everyone deserves a second chance.", level:'B2' },
  { id:'a39', day:9, category:'Point', chunk:"I'm sure that...", translation:"Je suis sûr que...", example:"I'm sure that we can find a compromise.", level:'B2' },
  { id:'a40', day:9, category:'Point', chunk:"I confidently believe that...", translation:"Je crois avec confiance que...", example:"I confidently believe that this new strategy will work.", level:'B2' },
  { id:'a41', day:9, category:'Point', chunk:"It appears to me that...", translation:"Il m'apparaît que...", example:"It appears to me that we need more data.", level:'B2' },
  { id:'a42', day:9, category:'Point', chunk:"Without a doubt,", translation:"Sans aucun doute,", example:"Without a doubt, this is the best decision we've made.", level:'B2' },

  // Day 10: Reason (explaining why)
  { id:'a05', day:10, category:'Reason', chunk:"The main reason is that...", translation:"La raison principale, c'est que...", example:"The main reason is that schools focus on grammar, not conversation.", level:'B2' },
  { id:'a06', day:10, category:'Reason', chunk:"This is mainly because...", translation:"C'est principalement parce que...", example:"This is mainly because people are afraid of making mistakes.", level:'B2' },
  { id:'a43', day:10, category:'Reason', chunk:"Because of the fact that...", translation:"En raison du fait que...", example:"Because of the fact that it's raining, we'll stay inside.", level:'B2' },
  { id:'a44', day:10, category:'Reason', chunk:"That's due to...", translation:"C'est dû à...", example:"That's due to the recent changes in policy.", level:'B2' },
  { id:'a45', day:10, category:'Reason', chunk:"The reason why is...", translation:"La raison pour laquelle c'est...", example:"The reason why is that we didn't have enough time.", level:'B2' },
  { id:'a46', day:10, category:'Reason', chunk:"This stems from...", translation:"Cela découle de...", example:"This stems from a misunderstanding.", level:'B2' },
  { id:'a47', day:10, category:'Reason', chunk:"One of the reasons is...", translation:"L'une des raisons est...", example:"One of the reasons is the lack of funding.", level:'B2' },
  { id:'a48', day:10, category:'Reason', chunk:"Primarily, it's because...", translation:"Principalement, c'est parce que...", example:"Primarily, it's because we want to improve quality.", level:'B2' },
  { id:'a49', day:10, category:'Reason', chunk:"It all comes down to...", translation:"Tout se résume à...", example:"It all comes down to how much you're willing to practice.", level:'B2' },
  { id:'a50', day:10, category:'Reason', chunk:"That happens because...", translation:"Cela arrive parce que...", example:"That happens because the system is overloaded.", level:'B2' },
  { id:'a51', day:10, category:'Reason', chunk:"The driving factor is...", translation:"Le facteur déterminant est...", example:"The driving factor is the high demand.", level:'B2' },
  { id:'a52', day:10, category:'Reason', chunk:"A major reason is...", translation:"Une raison majeure est...", example:"A major reason is the change in management.", level:'B2' },
  { id:'a53', day:10, category:'Reason', chunk:"This is largely because...", translation:"C'est en grande partie parce que...", example:"This is largely because of the new regulations.", level:'B2' },
  { id:'a54', day:10, category:'Reason', chunk:"It's grounded in...", translation:"C'est fondé sur...", example:"It's grounded in our core values.", level:'B2' },
  { id:'a55', day:10, category:'Reason', chunk:"This is driven by...", translation:"C'est motivé par...", example:"This is driven by our commitment to excellence.", level:'B2' },

  // Day 11: Reason (explaining why)
  { id:'a07', day:11, category:'Reason', chunk:"It basically comes down to...", translation:"Ça revient essentiellement à...", example:"It basically comes down to how much time you spend practicing.", level:'B2' },
  { id:'a56', day:11, category:'Reason', chunk:"At the core of it is...", translation:"Au cœur de cela, il y a...", example:"At the core of it is a need for better communication.", level:'B2' },
  { id:'a57', day:11, category:'Reason', chunk:"The underlying cause is...", translation:"La cause sous-jacente est...", example:"The underlying cause is a lack of resources.", level:'B2' },
  { id:'a58', day:11, category:'Reason', chunk:"It's primarily due to...", translation:"C'est principalement dû à...", example:"It's primarily due to the recent economic downturn.", level:'B2' },
  { id:'a59', day:11, category:'Reason', chunk:"Since we know that...", translation:"Puisque nous savons que...", example:"Since we know that, we can plan accordingly.", level:'B2' },
  { id:'a60', day:11, category:'Reason', chunk:"Given that...", translation:"Étant donné que...", example:"Given that you're experienced, you should lead the team.", level:'B2' },
  { id:'a61', day:11, category:'Reason', chunk:"Taking into account that...", translation:"En tenant compte du fait que...", example:"Taking into account that it's a holiday, traffic will be bad.", level:'B2' },
  { id:'a62', day:11, category:'Reason', chunk:"The root of the issue is...", translation:"La racine du problème est...", example:"The root of the issue is poor planning.", level:'B2' },
  { id:'a63', day:11, category:'Reason', chunk:"It revolves around...", translation:"Ça tourne autour de...", example:"It revolves around the concept of sustainability.", level:'B2' },
  { id:'a64', day:11, category:'Reason', chunk:"This is rooted in...", translation:"Ceci est enraciné dans...", example:"This is rooted in our company's history.", level:'B2' },
  { id:'a65', day:11, category:'Reason', chunk:"Because, ultimately,...", translation:"Parce que, finalement,...", example:"Because, ultimately, we want the best for our clients.", level:'B2' },
  { id:'a66', day:11, category:'Reason', chunk:"A big part of it is...", translation:"Une grande partie de cela est...", example:"A big part of it is knowing how to manage your time.", level:'B2' },
  { id:'a67', day:11, category:'Reason', chunk:"Which is why...", translation:"C'est pourquoi...", example:"Which is why I think we need a new approach.", level:'B2' },
  { id:'a68', day:11, category:'Reason', chunk:"This is a result of...", translation:"C'est le résultat de...", example:"This is a result of hard work and dedication.", level:'B2' },
  { id:'a69', day:11, category:'Reason', chunk:"The explanation is...", translation:"L'explication est...", example:"The explanation is quite simple, actually.", level:'B2' },

  // Day 12: Example (giving illustrations)
  { id:'a08', day:12, category:'Example', chunk:"For example, in my experience...", translation:"Par exemple, dans mon expérience...", example:"For example, in my experience, speaking with strangers taught me more than any textbook.", level:'B2' },
  { id:'a09', day:12, category:'Example', chunk:"A good example of this is...", translation:"Un bon exemple de ça, c'est...", example:"A good example of this is how kids learn their first language.", level:'B2' },
  { id:'a70', day:12, category:'Example', chunk:"Take [X] for instance...", translation:"Prends [X] par exemple...", example:"Take language exchange clubs for instance—you can practice speaking for free.", level:'B2' },
  { id:'a71', day:12, category:'Example', chunk:"To give you an idea,", translation:"Pour te donner une idée,", example:"To give you an idea, we spent three days just planning.", level:'B2' },
  { id:'a72', day:12, category:'Example', chunk:"To illustrate my point,", translation:"Pour illustrer mon propos,", example:"To illustrate my point, let's look at last year's sales.", level:'B2' },
  { id:'a73', day:12, category:'Example', chunk:"Like when...", translation:"Comme quand...", example:"Like when we tried to launch the product too early.", level:'B2' },
  { id:'a74', day:12, category:'Example', chunk:"Such as...", translation:"Tel(s) que...", example:"Such as the issues we faced last week.", level:'B2' },
  { id:'a75', day:12, category:'Example', chunk:"A classic example is...", translation:"Un exemple classique est...", example:"A classic example is the story of the tortoise and the hare.", level:'B2' },
  { id:'a76', day:12, category:'Example', chunk:"Look at...", translation:"Regarde...", example:"Look at how successful they became.", level:'B2' },
  { id:'a77', day:12, category:'Example', chunk:"Consider the case of...", translation:"Prenez le cas de...", example:"Consider the case of a small startup competing with a giant.", level:'B2' },
  { id:'a78', day:12, category:'Example', chunk:"Let me give you an example...", translation:"Laisse-moi te donner un exemple...", example:"Let me give you an example of what I mean.", level:'B2' },
  { id:'a79', day:12, category:'Example', chunk:"Case in point,", translation:"Pour preuve / Un bon exemple,", example:"Case in point, the recent software update caused many bugs.", level:'B2' },
  { id:'a80', day:12, category:'Example', chunk:"By way of example,", translation:"À titre d'exemple,", example:"By way of example, consider this scenario.", level:'B2' },
  { id:'a81', day:12, category:'Example', chunk:"Just look at...", translation:"Il suffit de regarder...", example:"Just look at the statistics.", level:'B2' },
  { id:'a82', day:12, category:'Example', chunk:"Specifically,", translation:"Plus précisément,", example:"Specifically, I'm talking about the first quarter.", level:'B2' },

  // Day 13: Example (giving illustrations)
  { id:'a83', day:13, category:'Example', chunk:"Imagine if...", translation:"Imagine si...", example:"Imagine if we could travel anywhere instantly.", level:'B2' },
  { id:'a84', day:13, category:'Example', chunk:"Think about it like this...", translation:"Pense-y de cette façon...", example:"Think about it like this: every mistake is a lesson.", level:'B2' },
  { id:'a85', day:13, category:'Example', chunk:"For instance,", translation:"Par exemple,", example:"For instance, you could start by reading more.", level:'B2' },
  { id:'a86', day:13, category:'Example', chunk:"To demonstrate,", translation:"Pour démontrer,", example:"To demonstrate, let me run the code for you.", level:'B2' },
  { id:'a87', day:13, category:'Example', chunk:"Let's say...", translation:"Disons que...", example:"Let's say you have an hour a day to study.", level:'B2' },
  { id:'a88', day:13, category:'Example', chunk:"Suppose that...", translation:"Supposons que...", example:"Suppose that we change the design completely.", level:'B2' },
  { id:'a89', day:13, category:'Example', chunk:"A prime example would be...", translation:"Un excellent exemple serait...", example:"A prime example would be the way they handled the crisis.", level:'B2' },
  { id:'a90', day:13, category:'Example', chunk:"If we look at...", translation:"Si nous regardons...", example:"If we look at the data, it's clear.", level:'B2' },
  { id:'a91', day:13, category:'Example', chunk:"As a case study,", translation:"Comme étude de cas,", example:"As a case study, we analyzed three different companies.", level:'B2' },
  { id:'a92', day:13, category:'Example', chunk:"To clarify with an example,", translation:"Pour clarifier avec un exemple,", example:"To clarify with an example, think of a tree.", level:'B2' },
  { id:'a93', day:13, category:'Example', chunk:"To be specific,", translation:"Pour être précis,", example:"To be specific, I mean the blue one.", level:'B2' },
  { id:'a94', day:13, category:'Example', chunk:"Namely,", translation:"À savoir,", example:"There's one major issue, namely the cost.", level:'B2' },
  { id:'a95', day:13, category:'Example', chunk:"In particular,", translation:"En particulier,", example:"I liked the food, in particular the dessert.", level:'B2' },
  { id:'a96', day:13, category:'Example', chunk:"As an illustration,", translation:"En guise d'illustration,", example:"As an illustration, see figure 2.", level:'B2' },
  { id:'a97', day:13, category:'Example', chunk:"To paint a picture,", translation:"Pour dépeindre la situation,", example:"To paint a picture, it was chaotic.", level:'B2' },

  // Day 14: Conclusion
  { id:'a11', day:14, category:'Conclusion', chunk:"At the end of the day,", translation:"En fin de compte,", example:"At the end of the day, consistency matters more than talent.", level:'B2' },
  { id:'a12', day:14, category:'Conclusion', chunk:"So all things considered,", translation:"Donc tout bien considéré,", example:"So all things considered, I think the benefits outweigh the risks.", level:'B2' },
  { id:'a13', day:14, category:'Conclusion', chunk:"That's exactly why I think...", translation:"C'est exactement pourquoi je pense que...", example:"That's exactly why I think speaking practice should come first.", level:'B2' },
  { id:'a98', day:14, category:'Conclusion', chunk:"In conclusion,", translation:"En conclusion,", example:"In conclusion, we need a better strategy.", level:'B2' },
  { id:'a99', day:14, category:'Conclusion', chunk:"To sum up,", translation:"Pour résumer,", example:"To sum up, it was a very productive meeting.", level:'B2' },
  { id:'a100', day:14, category:'Conclusion', chunk:"Ultimately,", translation:"Finalement,", example:"Ultimately, the decision is yours.", level:'B2' },
  { id:'a101', day:14, category:'Conclusion', chunk:"In a nutshell,", translation:"En un mot / En bref,", example:"In a nutshell, we're out of budget.", level:'B2' },
  { id:'a102', day:14, category:'Conclusion', chunk:"To wrap things up,", translation:"Pour conclure les choses,", example:"To wrap things up, let's review the action items.", level:'B2' },
  { id:'a103', day:14, category:'Conclusion', chunk:"Basically,", translation:"Fondamentalement / En gros,", example:"Basically, we just need more time.", level:'B2' },
  { id:'a104', day:14, category:'Conclusion', chunk:"When all is said and done,", translation:"Au bout du compte,", example:"When all is said and done, it was a good experience.", level:'B2' },
  { id:'a105', day:14, category:'Conclusion', chunk:"Taking everything into consideration,", translation:"En prenant tout en considération,", example:"Taking everything into consideration, I'd say yes.", level:'B2' },
  { id:'a106', day:14, category:'Conclusion', chunk:"To conclude,", translation:"Pour conclure,", example:"To conclude, I'd like to thank everyone.", level:'B2' },
  { id:'a107', day:14, category:'Conclusion', chunk:"The bottom line is,", translation:"L'essentiel est que,", example:"The bottom line is, we have to act fast.", level:'B2' },
  { id:'a108', day:14, category:'Conclusion', chunk:"In short,", translation:"En bref,", example:"In short, it works perfectly.", level:'B2' },
  { id:'a109', day:14, category:'Conclusion', chunk:"All in all,", translation:"Dans l'ensemble,", example:"All in all, it was a great trip.", level:'B2' },

  // Day 15: Nuance & Debate
  { id:'a14', day:15, category:'Nuance', chunk:"I see your point, but...", translation:"Je vois ce que tu veux dire, mais...", example:"I see your point, but I think there's another side to this.", level:'B2' },
  { id:'a15', day:15, category:'Nuance', chunk:"On the one hand... but on the other hand...", translation:"D'un côté... mais de l'autre...", example:"On the one hand, it saves time, but on the other hand, it can be isolating.", level:'B2' },
  { id:'a16', day:15, category:'Nuance', chunk:"Having said that,", translation:"Ceci dit,", example:"The tool is great. Having said that, it's not perfect.", level:'B2/C1' },
  { id:'a110', day:15, category:'Nuance', chunk:"While that may be true,", translation:"Bien que cela puisse être vrai,", example:"While that may be true, we shouldn't rely entirely on it.", level:'B2' },
  { id:'a111', day:15, category:'Nuance', chunk:"That's a fair point, however...", translation:"C'est un bon point, cependant...", example:"That's a fair point, however we lack the resources.", level:'B2' },
  { id:'a112', day:15, category:'Nuance', chunk:"Even so,", translation:"Malgré tout,", example:"Even so, I still think we should proceed.", level:'B2' },
  { id:'a113', day:15, category:'Nuance', chunk:"On the contrary,", translation:"Au contraire,", example:"On the contrary, I believe it's quite simple.", level:'B2' },
  { id:'a114', day:15, category:'Nuance', chunk:"At the same time,", translation:"En même temps,", example:"It's hard work, but at the same time, it's very rewarding.", level:'B2' },
  { id:'a115', day:15, category:'Nuance', chunk:"That being said,", translation:"Cela étant dit,", example:"That being said, we need to be careful.", level:'B2' },
  { id:'a116', day:15, category:'Nuance', chunk:"I understand, although...", translation:"Je comprends, bien que...", example:"I understand, although I would have done it differently.", level:'B2' },
  { id:'a117', day:15, category:'Nuance', chunk:"Admittedly,", translation:"Il est vrai que / Certes,", example:"Admittedly, the initial costs are high.", level:'B2' },
  { id:'a118', day:15, category:'Nuance', chunk:"While I agree up to a point,", translation:"Bien que je sois d'accord jusqu'à un certain point,", example:"While I agree up to a point, I have some reservations.", level:'B2' },
  { id:'a119', day:15, category:'Nuance', chunk:"Despite this,", translation:"Malgré cela,", example:"Despite this, sales have increased.", level:'B2' },
  { id:'a120', day:15, category:'Nuance', chunk:"However,", translation:"Cependant,", example:"However, we must also consider the environmental impact.", level:'B2' },
  { id:'a121', day:15, category:'Nuance', chunk:"Nevertheless,", translation:"Néanmoins,", example:"Nevertheless, we should stay positive.", level:'B2' }
];

// ─── PHASE 3 (Jours 16-25) : CONVERSATIONS RÉELLES (CONVERSATION LAB) ────────────
export const conversationLab = [
  {
    id: 'conv-selftalk',
    category: '🗣️ Self-Talk (Parle-toi en anglais)',
    desc: 'Décris ta journée, tes pensées et tes actions à voix haute en anglais.',
    scenarios: [
      { title: 'Morning Routine', prompt: 'Describe everything you are doing right now as you get ready for your day.', example: "I'm waking up now. Let me check my phone... OK, I need to brush my teeth and take a shower. After that, I'll make some coffee.", tip: 'Fais ça chaque matin pendant 2 minutes. Force ton cerveau à penser en anglais.' },
      { title: 'Plan Your Day', prompt: 'Talk about what you need to do today. Use "I need to", "I have to", "I\'m going to".', example: "Today I need to finish that report. Then I'm going to grab lunch. After work, I have to go grocery shopping.", tip: 'Les 3 structures (need to, have to, going to) couvrent 80% des conversations quotidiennes.' },
      { title: 'Cooking Narration', prompt: 'Describe each step as you cook or prepare food.', example: "First, I'm going to boil some water. While that's heating up, I'll chop the onions. Now I need to add some salt.", tip: 'Le vocabulaire de la cuisine est universel — tout le monde mange !' },
      { title: 'Review Your Day', prompt: 'Before bed, summarize your day: what went well, what was hard.', example: "Today was pretty productive. I finished my project on time. The hard part was the meeting — I couldn't find my words.", tip: 'Excellent pour ancrer l\'habitude et réfléchir à tes progrès.' },
    ]
  },
  {
    id: 'conv-roleplay',
    category: '🎭 Role-Play (Simulations de situation)',
    desc: 'Joue les deux rôles d\'une conversation réaliste. Parle à voix haute.',
    scenarios: [
      { title: 'Job Interview', prompt: 'You are being interviewed. Answer: "Tell me about yourself" and "Why should we hire you?"', example: "Interviewer: Tell me about yourself.\\nYou: Sure! I'm a developer with 3 years of experience. I specialize in web applications...", tip: 'Prépare 3 réponses types et répète-les jusqu\'à ce qu\'elles soient fluides.' },
      { title: 'Ordering at a Restaurant', prompt: 'You walk into a restaurant. Order food, ask about the menu, handle a problem with your order.', example: "Waiter: What can I get you?\\nYou: I'll have the grilled chicken, please. Actually, is the pasta any good?\\nWaiter: It's our best seller!\\nYou: OK, I'll go with that instead.", tip: 'Utilise "I\'ll have..." et "I\'ll go with..." — les 2 formules magiques au resto.' },
      { title: 'Asking for Directions', prompt: 'You are lost in a city. Ask a stranger for directions to the train station.', example: "Excuse me, do you know how to get to the train station? Is it walking distance or should I take the bus?", tip: 'Simple mais essentiel. "Do you know how to get to..." fonctionne partout.' },
      { title: 'Making a Complaint', prompt: 'Your internet has been down for 2 days. Call customer service.', example: "Hi, I'm calling about my internet connection. It's been down since Monday. I've already tried restarting the router.", tip: 'Le service client est un super entraînement : tu dois expliquer un problème clairement.' },
      { title: 'Meeting Someone New', prompt: 'You are at a meetup event. Start a conversation with a stranger.', example: "Hey! Is this your first time at this meetup? I'm [name]. What do you do for work?", tip: 'Les meetups sont le meilleur terrain d\'entraînement réel.' },
      { title: 'Doctor\'s Appointment', prompt: 'Describe your symptoms to a doctor.', example: "I've been feeling really tired lately, and I have a headache that won't go away. It started about a week ago.", tip: 'Vocabulaire médical de base = sécurité en voyage.' },
    ]
  },
  {
    id: 'conv-mirror',
    category: '🪞 Mirror Technique (Parle devant ton miroir)',
    desc: 'Entraîne-toi à parler de sujets simples pendant 60 secondes en te regardant.',
    scenarios: [
      { title: 'Introduce Yourself (2 min version)', prompt: 'Give a detailed introduction: name, origin, job, hobbies, why you are learning English.', example: "My name is Modou. I'm from Senegal and I work as a developer. In my free time, I enjoy coding and watching tech videos. I'm learning English because I want to be more confident in international meetings.", tip: 'C\'est ta "carte de visite orale". Tu dois pouvoir la réciter sans hésiter.' },
      { title: 'Describe Your Best Friend', prompt: 'Talk about a friend: appearance, personality, how you met, what you do together.', example: "My best friend is Amadou. He's really tall and always smiling. We met in university. He's the kind of person who makes everyone laugh.", tip: 'Décrire quelqu\'un force l\'utilisation d\'adjectifs et de structures variées.' },
      { title: 'Your Opinion on a Hot Topic', prompt: 'Pick a topic (social media, AI, remote work) and share your opinion for 60 seconds.', example: "I think social media has its pros and cons. On one hand, it helps us stay connected. On the other hand, it can be really addictive.", tip: 'C\'est l\'exercice préparatoire avant la méthode PREP.' },
      { title: 'Tell a Short Story', prompt: 'Tell something funny or interesting that happened to you recently.', example: "So last week, something funny happened. I was on a video call and I forgot to mute myself. Everyone heard me singing!", tip: 'Les anecdotes sont l\'arme secrète de la conversation. Les gens adorent les histoires.' },
    ]
  },
  {
    id: 'conv-shadow',
    category: '🎧 Shadowing (Imite un natif)',
    desc: 'Écoute l\'expression puis répète-la immédiatement au micro en copiant le rythme et l\'intonation.',
    scenarios: [
      { title: 'Speed Round: Short Phrases', prompt: 'Shadow these 5 phrases one after another as fast as you can.', phrases: ["I'll be right back.", "Let me check on that.", "That's not what I meant.", "Can we circle back to that?", "I'm running a bit late."], tip: 'Le shadowing entraîne tes muscles buccaux. La vitesse viendra naturellement.' },
      { title: 'Connected Speech', prompt: 'Listen and shadow. Focus on how words connect together.', phrases: ["I'm gonna grab a coffee.", "Wanna come with me?", "Whatcha working on?", "Lemme know if you need help.", "D'you know what I mean?"], tip: 'En vrai anglais parlé, les mots fusionnent. C\'est ça le "connected speech".' },
      { title: 'Emotional Expression', prompt: 'Shadow with the RIGHT emotion. Enthusiasm, surprise, disappointment.', phrases: ["Oh my God, that's amazing!", "Are you kidding me right now?", "Honestly, I'm a bit disappointed.", "I can't believe you did that!", "That's the best news I've heard all day!"], tip: 'L\'intonation porte 40% du sens en anglais. Les mots seuls ne suffisent pas.' },
      { title: 'Professional Tone', prompt: 'Shadow these professional phrases with a calm, confident tone.', phrases: ["I'd like to propose an alternative.", "Could we schedule a follow-up?", "I appreciate your feedback.", "Let's take this offline.", "I'll get back to you by end of day."], tip: 'En milieu pro, le ton compte autant que les mots.' },
    ]
  },
];

// ─── MINI-DIALOGUES RÉALISTES (1 Bonus unique par jour x 30 jours) ───
// Vrais échanges immersifs et vivants du quotidien. Cliquez sur chaque réplique pour l'écouter.
export const miniDialogues = [
  {
    id: 'dial-1',
    day: 1,
    title: "Première session d'échange",
    context: "Vous venez de rejoindre une session d'échange linguistique avec 3 personnes. Voici ce genre d'échange typique.",
    lines: [
      { speaker:'You', text:"Hey everyone! Mind if I join? I'm here to practice my English." },
      { speaker:'Maria (Brazil)', text:"Of course! Welcome! Where are you from?" },
      { speaker:'You', text:"I'm from Senegal. What about you guys?" },
      { speaker:'Kenji (Japan)', text:"I'm from Tokyo. How long have you been learning English?" },
      { speaker:'You', text:"A few years in school, but to be honest, I never really practiced speaking." },
      { speaker:'Maria (Brazil)', text:"Same here! That's why I started joining these conversation practice sessions. It changed everything." },
      { speaker:'You', text:"Really? That's so interesting! Tell me more. How often do you practice?" },
      { speaker:'Maria (Brazil)', text:"Almost every day. Even 15 minutes makes a huge difference." },
      { speaker:'You', text:"That makes sense. I'll try to do the same." }
    ]
  },
  {
    id: 'dial-2',
    day: 2,
    title: "Donner son avis sur un sujet du quotidien",
    context: "Quelqu'un pose une question de discussion typique dans un groupe de parole.",
    lines: [
      { speaker:'Ahmed (Egypt)', text:"So here's a question for everyone: do you think social media is good or bad?" },
      { speaker:'You', text:"Good question. Let me think about that for a second." },
      { speaker:'You', text:"To be honest, I think it depends on how you use it." },
      { speaker:'Li (China)', text:"I agree. What's your take on TikTok specifically?" },
      { speaker:'You', text:"Well, the way I see it, short videos can be addictive. But you can also learn things." },
      { speaker:'Ahmed (Egypt)', text:"That's a fair point. I use it for English content actually." },
      { speaker:'You', text:"That's funny, because I do the same! I follow some English teachers on there." },
      { speaker:'Li (China)', text:"Any recommendations?" },
      { speaker:'You', text:"I'm not sure of the exact names... how should I put it... there's this guy who explains phrasal verbs with stories. Really helpful." }
    ]
  },
  {
    id: 'dial-3',
    day: 3,
    title: "Quand vous ne comprenez pas un mot",
    context: "Un interlocuteur utilise un mot familier ou de l'argot que vous ne connaissez pas encore.",
    lines: [
      { speaker:'Sam (UK)', text:"Yeah, the commute to work is absolutely knackering." },
      { speaker:'You', text:"Sorry, what does 'knackering' mean?" },
      { speaker:'Sam (UK)', text:"Oh, it means really tiring. Exhausting. It's British slang." },
      { speaker:'You', text:"Ah, that makes sense! I'll keep that in mind, thanks!" },
      { speaker:'Sam (UK)', text:"No worries. So how do you get to work?" },
      { speaker:'You', text:"So basically, what happened is, I used to take the bus, but now I work from home." },
      { speaker:'Sam (UK)', text:"Lucky you! I wish I could do that." },
      { speaker:'You', text:"I totally agree, it's great. But the thing is, sometimes I feel a bit isolated." }
    ]
  },
  {
    id: 'dial-4',
    day: 4,
    title: "Raconter une anecdote personnelle",
    context: "Partager une histoire amusante pour briser la glace et créer du lien.",
    lines: [
      { speaker:'Ana (Spain)', text:"Has anyone had a funny travel experience recently?" },
      { speaker:'You', text:"Actually, yes! It reminds me of the time when I went to London for the first time." },
      { speaker:'Ana (Spain)', text:"Oh nice, what happened?" },
      { speaker:'You', text:"So basically, what happened was, I ordered fish and chips but I didn't know the portion would be so huge!" },
      { speaker:'Everyone', text:"Haha!" },
      { speaker:'You', text:"Seriously! It was like food for three people. And the waiter just looked at me like 'are you going to eat all that?' You know what I mean?" },
      { speaker:'Ana (Spain)', text:"That's hilarious! Have you been back since?" },
      { speaker:'You', text:"Not yet, but I'd love to. What about you? Any travel stories?" }
    ]
  },
  {
    id: 'dial-5',
    day: 5,
    title: "Commander dans un coffee shop",
    context: "Vous entrez dans un café animé pour commander votre boisson matinale en anglais.",
    lines: [
      { speaker:'Barista', text:"Hi there! What can I get started for you today?" },
      { speaker:'You', text:"Hi! Could I get an iced oat latte, please?" },
      { speaker:'Barista', text:"Sure thing! What size would you like? Regular or large?" },
      { speaker:'You', text:"A regular is fine. And could you make that with an extra espresso shot?" },
      { speaker:'Barista', text:"You got it. Are you having that here or taking it to go?" },
      { speaker:'You', text:"To go, please. And could I also grab one of those chocolate croissants?" },
      { speaker:'Barista', text:"Warm or as is?" },
      { speaker:'You', text:"Warmed up would be perfect. Thanks a lot!" }
    ]
  },
  {
    id: 'dial-6',
    day: 6,
    title: "Parler de son métier et de ses projets tech",
    context: "Dans un salon professionnel, vous échangez avec un développeur étranger sur vos projets.",
    lines: [
      { speaker:'David (USA)', text:"Nice to meet you! So what kind of work do you do?" },
      { speaker:'You', text:"I'm a software developer. I mainly build modern web applications." },
      { speaker:'David (USA)', text:"Awesome! Which technologies are you currently working with?" },
      { speaker:'You', text:"Mostly JavaScript and modern frontend frameworks, but I'm also exploring AI tools lately." },
      { speaker:'David (USA)', text:"Very cool. How do you find the learning curve with AI integrations?" },
      { speaker:'You', text:"To be honest, it moves fast, but that's what makes it exciting. You have to keep learning every day." },
      { speaker:'David (USA)', text:"I couldn't agree more. Let's exchange contacts on LinkedIn!" }
    ]
  },
  {
    id: 'dial-7',
    day: 7,
    title: "Bilan de la première semaine & célébration",
    context: "Fin de semaine 1 ! Vous discutez de vos premiers progrès avec un ami apprenant.",
    lines: [
      { speaker:'Chloe (France)', text:"Hey! How do you feel after seven days of speaking practice?" },
      { speaker:'You', text:"Honestly, I was nervous on Day 1, but now I feel much more comfortable." },
      { speaker:'Chloe (France)', text:"That's great! What was the hardest part for you?" },
      { speaker:'You', text:"At first, I kept translating every single word in my head before speaking." },
      { speaker:'Chloe (France)', text:"And now?" },
      { speaker:'You', text:"Now, the survival expressions come out much more naturally without overthinking!" },
      { speaker:'Chloe (France)', text:"Way to go! Ready for the next phase?" },
      { speaker:'You', text:"Ready as I'll ever be! Let's keep this momentum going!" }
    ]
  },
  {
    id: 'dial-8',
    day: 8,
    title: "Débat : Télétravail vs Présentiel",
    context: "Une discussion d'équipe sur l'équilibre entre flexibilité à distance et cohésion.",
    lines: [
      { speaker:'Marcus (Germany)', text:"Our company wants everyone back in the office 3 days a week. What's your take?" },
      { speaker:'You', text:"From my perspective, hybrid is good, but full flexibility is even better." },
      { speaker:'Marcus (Germany)', text:"Don't you miss the spontaneous conversations near the coffee machine?" },
      { speaker:'You', text:"I see what you mean, but saving two hours of daily commute is priceless for my focus." },
      { speaker:'Marcus (Germany)', text:"Fair enough. Maybe one team day every two weeks would be enough." },
      { speaker:'You', text:"Exactly! Quality over quantity. That sounds like the sweet spot." }
    ]
  },
  {
    id: 'dial-9',
    day: 9,
    title: "Demander son chemin dans le métro",
    context: "Vous êtes à la gare centrale et demandez confirmation de la direction.",
    lines: [
      { speaker:'You', text:"Excuse me, could you help me for a second? Is this the platform for the Northern Line?" },
      { speaker:'Commuter', text:"Almost! You're on the southbound platform. You want northbound for Camden." },
      { speaker:'You', text:"Ah, thank you! How do I get to the northbound side?" },
      { speaker:'Commuter', text:"Take the stairs over there, follow the green signs, and you'll see it right away." },
      { speaker:'You', text:"Got it! How long does the ride take approximately?" },
      { speaker:'Commuter', text:"About fifteen minutes, six stops. Safe travels!" },
      { speaker:'You', text:"Appreciate your help, have a great day!" }
    ]
  },
  {
    id: 'dial-10',
    day: 10,
    title: "Gérer un pépin technique en appel visio",
    context: "Vous démarrez un appel vidéo et résolvez un petit problème de son avec calme.",
    lines: [
      { speaker:'Sarah (Canada)', text:"Hey! Can you hear me? Your video seems to be freezing slightly." },
      { speaker:'You', text:"Sorry about that! Can you hear my voice properly now?" },
      { speaker:'Sarah (Canada)', text:"Yes, audio is crystal clear now. What happened?" },
      { speaker:'You', text:"My Wi-Fi was switching networks. Let me turn off video for a minute if that helps." },
      { speaker:'Sarah (Canada)', text:"No need, your connection stabilized. We're good to go!" },
      { speaker:'You', text:"Awesome, thanks for your patience! Let's dive straight in." }
    ]
  },
  {
    id: 'dial-11',
    day: 11,
    title: "Recommander une série captivante",
    context: "Une conversation détendue entre collègues sur ce qu'il faut regarder le week-end.",
    lines: [
      { speaker:'Leo (Italy)', text:"I need a new show to binge-watch. Any strong recommendations?" },
      { speaker:'You', text:"Have you seen 'Severance' on Apple TV yet?" },
      { speaker:'Leo (Italy)', text:"No, I've heard about it though. What's the premise?" },
      { speaker:'You', text:"Without spoiling it, employees surgically separate their work memories from personal life." },
      { speaker:'Leo (Italy)', text:"Whoa, that sounds both creepy and genius. Is the pacing good?" },
      { speaker:'You', text:"The first episodes build the tension, and the finale leaves you completely breathless!" },
      { speaker:'Leo (Italy)', text:"Say no more, I'm watching the pilot tonight!" }
    ]
  },
  {
    id: 'dial-12',
    day: 12,
    title: "Négocier un délai sur une livraison",
    context: "Un point d'étape professionnel pour ajuster un calendrier sans compromettre la qualité.",
    lines: [
      { speaker:'Manager', text:"How are we looking for the launch this Thursday?" },
      { speaker:'You', text:"The core features are finished, but we discovered two edge cases during testing." },
      { speaker:'Manager', text:"Can we fix them before Thursday?" },
      { speaker:'You', text:"To be realistic, rushing could compromise quality. Could we push the deploy to Monday?" },
      { speaker:'Manager', text:"If Monday guarantees a bug-free release, I'd rather wait." },
      { speaker:'You', text:"That will give us enough breathing room to test everything thoroughly. Thank you!" }
    ]
  },
  {
    id: 'dial-13',
    day: 13,
    title: "Parler cuisine du monde et spécialités locales",
    context: "Autour d'un déjeuner international, vous faites découvrir un plat traditionnel.",
    lines: [
      { speaker:'Elena (Mexico)', text:"I love discovering authentic dishes. What's a must-try meal from your home country?" },
      { speaker:'You', text:"You definitely have to try Thieboudienne! It's our national dish in Senegal." },
      { speaker:'Elena (Mexico)', text:"What is it made of?" },
      { speaker:'You', text:"It's seasoned rice cooked in rich tomato broth, served with fresh fish, cassava, and vegetables." },
      { speaker:'Elena (Mexico)', text:"That sounds mouth-watering! Is it very spicy?" },
      { speaker:'You', text:"It's flavorful and savory, but you can adjust the chili on the side. If you ever visit, I'll cook it for you!" }
    ]
  },
  {
    id: 'dial-14',
    day: 14,
    title: "Exprimer un désaccord constructif",
    context: "En réunion de projet, vous proposez une approche plus sûre tout en restant courtois.",
    lines: [
      { speaker:'Tom (Australia)', text:"I think we should redesign the whole homepage by next sprint." },
      { speaker:'You', text:"I see where you're coming from, Tom, but redesigning everything at once might confuse users." },
      { speaker:'Tom (Australia)', text:"What would you propose instead?" },
      { speaker:'You', text:"Why not run an A/B test on the sign-up button and hero section first?" },
      { speaker:'Tom (Australia)', text:"That's actually a smarter approach. We'll get hard data before committing." },
      { speaker:'You', text:"Exactly, and we can iterate based on actual user feedback." }
    ]
  },
  {
    id: 'dial-15',
    day: 15,
    title: "Bilan mi-parcours : Les 15 premiers jours !",
    context: "Vous faites le point avec un coach sur vos sensations après 15 jours de pratique.",
    lines: [
      { speaker:'Coach', text:"Congratulations on reaching Day 15! What's the biggest shift you've noticed?" },
      { speaker:'You', text:"I noticed I don't panic anymore when someone speaks English to me suddenly." },
      { speaker:'Coach', text:"That's huge! How did the PREP method help you?" },
      { speaker:'You', text:"It gives me a mental roadmap: Point, Reason, Example, Point. I don't get lost while talking." },
      { speaker:'Coach', text:"Halfway through the 30 days! Ready for real immersion?" },
      { speaker:'You', text:"Absolutely. 15 days down, 15 to go!" }
    ]
  },
  {
    id: 'dial-16',
    day: 16,
    title: "L'Intelligence Artificielle au quotidien",
    context: "Une conversation sur l'impact des outils d'IA générative dans les métiers créatifs.",
    lines: [
      { speaker:'Julian (Sweden)', text:"Do you think AI is going to replace developers and translators completely?" },
      { speaker:'You', text:"I don't think it replaces humans; it empowers those who learn how to collaborate with it." },
      { speaker:'Julian (Sweden)', text:"How do you use it in your daily workflow?" },
      { speaker:'You', text:"I use it as an assistant to brainstorm edge cases, write tests, and draft quick summaries." },
      { speaker:'Julian (Sweden)', text:"So you still do the critical thinking?" },
      { speaker:'You', text:"100%. At the end of the day, human judgement and emotional nuance remain indispensable." }
    ]
  },
  {
    id: 'dial-17',
    day: 17,
    title: "Organiser un voyage de groupe entre amis",
    context: "Planifier un road-trip d'un week-end en se répartissant les réservations.",
    lines: [
      { speaker:'Liam (Ireland)', text:"Alright team, who's in charge of booking our transport for the road trip?" },
      { speaker:'You', text:"I can take care of renting the van if you want. I found good weekend rates." },
      { speaker:'Liam (Ireland)', text:"Perfect! And what about lodging? Hotel rooms or one big Airbnb?" },
      { speaker:'You', text:"An Airbnb would be much more fun. We can cook dinner together and hang out in the evening." },
      { speaker:'Liam (Ireland)', text:"Great call. Let's send the group poll tonight to finalize the dates." },
      { speaker:'You', text:"Sounds like a plan. I'll post the options in our group chat." }
    ]
  },
  {
    id: 'dial-18',
    day: 18,
    title: "Réclamation polie au service client",
    context: "Votre colis est retardé et vous contactez le support pour trouver une solution rapide.",
    lines: [
      { speaker:'Agent', text:"Customer Support, how may I assist you today?" },
      { speaker:'You', text:"Hello. I'm calling regarding order number 8421. It was scheduled for delivery last Monday." },
      { speaker:'Agent', text:"Let me check that in our system... Ah, it seems there was a logistical delay." },
      { speaker:'You', text:"I understand delays happen, but I really need this item for a work presentation this Friday." },
      { speaker:'Agent', text:"I apologize for the inconvenience. I will upgrade your shipping to express right now at no extra charge." },
      { speaker:'You', text:"Thank you very much. Could you please send me the tracking update by email?" },
      { speaker:'Agent', text:"Done! You should receive it in a few minutes." }
    ]
  },
  {
    id: 'dial-19',
    day: 19,
    title: "Routine matinale et discipline sportive",
    context: "Échange sur les astuces pour garder un niveau d'énergie élevé tout au long de la journée.",
    lines: [
      { speaker:'Nadia (Morocco)', text:"You always seem to have high energy in the morning. What's your secret?" },
      { speaker:'You', text:"I stick to a simple rule: no phone screens for the first 30 minutes after waking up." },
      { speaker:'Nadia (Morocco)', text:"Really? What do you do instead?" },
      { speaker:'You', text:"I drink a large glass of water, do a quick stretch, and review my English chunks of the day." },
      { speaker:'Nadia (Morocco)', text:"That sounds peaceful. Doesn't work stress creep in?" },
      { speaker:'You', text:"Setting that boundary gives you control over your morning instead of reacting to notifications." }
    ]
  },
  {
    id: 'dial-20',
    day: 20,
    title: "Pitcher une idée innovante en 60 secondes",
    context: "Lors d'un événement d'entrepreneuriat, vous présentez votre concept avec clarté.",
    lines: [
      { speaker:'Investor', text:"You have 60 seconds! What are you building?" },
      { speaker:'You', text:"Imagine an app that turns 15 minutes of dead time daily into confident oral English fluency." },
      { speaker:'Investor', text:"There are already plenty of flashcard apps. How are you different?" },
      { speaker:'You', text:"Traditional apps test grammar silently on screens. We focus 100% on actual spoken speech, immediate vocal feedback, and structured conversation reflexes." },
      { speaker:'Investor', text:"I like the voice-first angle. How are your user completion rates?" },
      { speaker:'You', text:"Because of our step-by-step daily micro-routines, users stick with it 3 times longer than average." },
      { speaker:'Investor', text:"Impressive. Here's my card, send me a demo video this week." }
    ]
  },
  {
    id: 'dial-21',
    day: 21,
    title: "Maîtriser le Small Talk à la machine à café",
    context: "Discuter météo, week-end et détente avec un nouveau collègue étranger.",
    lines: [
      { speaker:'Ben (New Zealand)', text:"Mondays, right? Can never get enough coffee." },
      { speaker:'You', text:"Tell me about it! Did you manage to do anything fun over the weekend?" },
      { speaker:'Ben (New Zealand)', text:"Just watched the rugby match and caught up on sleep. How about you?" },
      { speaker:'You', text:"Pretty quiet weekend here too. I went for a long walk and worked on a personal coding project." },
      { speaker:'Ben (New Zealand)', text:"Nice! The weather was unexpectedly pleasant on Saturday." },
      { speaker:'You', text:"It was! Fingers crossed it stays like this throughout the week." }
    ]
  },
  {
    id: 'dial-22',
    day: 22,
    title: "Partager une leçon apprise après une erreur",
    context: "Discussion d'équipe sur l'apprentissage par l'expérience et la résilience.",
    lines: [
      { speaker:'Dev Lead', text:"Don't beat yourself up over that deployment bug. We all break production at least once." },
      { speaker:'You', text:"Thanks. I was really stressed out when it went down." },
      { speaker:'Dev Lead', text:"What did we learn from it?" },
      { speaker:'You', text:"We realized our automated smoke tests didn't cover the payment webhook." },
      { speaker:'Dev Lead', text:"Exactly. The bug wasn't your fault, it revealed a gap in our safety net." },
      { speaker:'You', text:"We wrote three new end-to-end tests this morning, so it won't happen again." }
    ]
  },
  {
    id: 'dial-23',
    day: 23,
    title: "Débat environnement : Gestes individuels vs Collectifs",
    context: "Une conversation stimulante sur le développement durable et l'action citoyenne.",
    lines: [
      { speaker:'Greta (Germany)', text:"Do you think individual recycling really matters when big corporations pollute so much?" },
      { speaker:'You', text:"To be fair, corporations produce what consumers demand. Both sides bear responsibility." },
      { speaker:'Greta (Germany)', text:"So you think consumer habits can force industries to change?" },
      { speaker:'You', text:"Definitely. Look at how plant-based alternatives and solar energy boomed once demand grew." },
      { speaker:'Greta (Germany)', text:"That's a hopeful way to look at it." },
      { speaker:'You', text:"Cynicism never solved anything. Small consistent actions build cultural shifts." }
    ]
  },
  {
    id: 'dial-24',
    day: 24,
    title: "Entretien d'embauche : Répondre avec aisance",
    context: "Simulation d'une question comportementale pour valoriser son expérience.",
    lines: [
      { speaker:'Interviewer', text:"Can you tell me about a time when you had to work under intense pressure?" },
      { speaker:'You', text:"Certainly. Last year, our client moved our delivery deadline up by two weeks." },
      { speaker:'Interviewer', text:"How did you react?" },
      { speaker:'You', text:"Instead of working disorganized overtime, I gathered the team and stripped down non-essential features." },
      { speaker:'Interviewer', text:"What was the outcome?" },
      { speaker:'You', text:"We delivered the high-impact core on time, and the client was thrilled with the reliability." }
    ]
  },
  {
    id: 'dial-25',
    day: 25,
    title: "Musique, podcasts et inspiration quotidienne",
    context: "Échanger des recommandations audio pour s'entraîner l'oreille en immersion.",
    lines: [
      { speaker:'Maya (India)', text:"What are you listening to in your headphones right now?" },
      { speaker:'You', text:"Some instrumental lo-fi beats. It keeps me in the zone while writing code." },
      { speaker:'Maya (India)', text:"Do you ever listen to podcasts in English?" },
      { speaker:'You', text:"Yes, all the time! Especially storytelling podcasts and tech interviews." },
      { speaker:'Maya (India)', text:"Does listening to native podcasts help your pronunciation?" },
      { speaker:'You', text:"Enormously! You absorb the natural rhythm, intonations, and common contractions without even realizing it." }
    ]
  },
  {
    id: 'dial-26',
    day: 26,
    title: "Demander conseil pour une décision importante",
    context: "Peser le pour et le contre d'une opportunité internationale avec un ami de confiance.",
    lines: [
      { speaker:'You', text:"Could I get your honest feedback on something? I'm weighing two job options." },
      { speaker:'Friend', text:"Of course! What are the trade-offs?" },
      { speaker:'You', text:"One offers higher compensation, but the second has a worldwide remote team where I'd speak English all day." },
      { speaker:'Friend', text:"Which one will make you grow faster as a person?" },
      { speaker:'You', text:"Hands down the second one. The international exposure would take my career to the next level." },
      { speaker:'Friend', text:"Sounds like you already know your answer deep down!" }
    ]
  },
  {
    id: 'dial-27',
    day: 27,
    title: "Improviser face à un imprévu en voyage",
    context: "Une correspondance manquée dans un grand aéroport gérée avec diplomatie.",
    lines: [
      { speaker:'Airline Agent', text:"I'm very sorry, but the connecting flight to New York has been cancelled due to weather." },
      { speaker:'You', text:"I understand safety comes first. What are our rebooking options?" },
      { speaker:'Airline Agent', text:"We can put you on the first flight tomorrow morning at 8 AM, and we provide a hotel voucher." },
      { speaker:'You', text:"Does the voucher include transportation to and from the hotel?" },
      { speaker:'Airline Agent', text:"Yes, free shuttle right outside Terminal 2, plus meal vouchers for dinner and breakfast." },
      { speaker:'You', text:"That's very fair. Thank you for handling it so efficiently." }
    ]
  },
  {
    id: 'dial-28',
    day: 28,
    title: "Partager ses rêves et objectifs à long terme",
    context: "Une conversation profonde sur ses ambitions et l'impact souhaité dans le monde.",
    lines: [
      { speaker:'Daniel (UK)', text:"Where do you see yourself five years from today?" },
      { speaker:'You', text:"I want to be leading remote development projects and mentoring other young African creators." },
      { speaker:'Daniel (UK)', text:"That's a very noble and inspiring goal." },
      { speaker:'You', text:"Speaking fluent English is a big key to unlocking that door and collaborating globally." },
      { speaker:'Daniel (UK)', text:"With the dedication you're showing every day, you'll get there faster than you think." },
      { speaker:'You', text:"Thank you! One step at a time, every single day." }
    ]
  },
  {
    id: 'dial-29',
    day: 29,
    title: "Remercier chaleureusement et célébrer l'amitié",
    context: "À la veille du dernier jour, vous remerciez vos partenaires de discussion.",
    lines: [
      { speaker:'You', text:"Hey Maria! I just wanted to say thank you for all the practice sessions this month." },
      { speaker:'Maria (Brazil)', text:"Aww, thank you! It was such a blast practicing with you." },
      { speaker:'You', text:"Your patience and good humor made a huge difference. I used to be terrified of making mistakes." },
      { speaker:'Maria (Brazil)', text:"And look at you now! You express your ideas smoothly and with great confidence." },
      { speaker:'You', text:"Let's definitely keep in touch on WhatsApp or Telegram!" },
      { speaker:'Maria (Brazil)', text:"Deal! Don't be a stranger!" }
    ]
  },
  {
    id: 'dial-30',
    day: 30,
    title: "Jour 30 : Décollage réussi ! Parler anglais sans barrière",
    context: "Célébration du 30ème jour ! Vous avez conquis la peur de parler et acquis la fluidité.",
    lines: [
      { speaker:'Coach', text:"You made it to Day 30! Thirty consecutive days of daily speaking!" },
      { speaker:'You', text:"I honestly can't believe how much changed in one month!" },
      { speaker:'Coach', text:"How would you describe your transformation?" },
      { speaker:'You', text:"English is no longer a school subject or a source of anxiety. It has become a natural voice for me." },
      { speaker:'Coach', text:"What is your advice for anyone starting on Day 1?" },
      { speaker:'You', text:"Don't wait to be perfect. Speak every single day, repeat out loud, and trust the process!" },
      { speaker:'Coach', text:"You're ready for the world. Keep shining and never stop speaking!" },
      { speaker:'You', text:"Thank you! This is just the beginning of my journey!" }
    ]
  }
];

// ─── QUESTIONS PREP (taguées par difficulté, accessibles dès le Jour 1) ──────
export const prepFrameworkQuestions = [
  // FACILES (accessibles dès le Jour 1 pour démarrer la méthode PREP)
  {
    id:'prep-1', difficulty:'easy', topic:'Daily Life',
    question:'What is your favorite way to spend a weekend?',
    promptP:'Say what you enjoy directly.', connectorsP:['Personally, I love to...', 'My ideal weekend is...', 'If I had to pick one thing, it would be...'],
    promptR:'Explain why it matters to you.', connectorsR:['The reason I enjoy it is...', 'It helps me because...', 'This is important to me because...'],
    promptE:'Give a specific recent example.', connectorsE:['Last weekend, for example,...', 'A good example is when...', 'Just recently, I...'],
    promptConclusion:'Wrap up naturally.', connectorsC:['So that\'s basically my ideal weekend.', 'That\'s why I always try to...', 'At the end of the day, it makes me happy.']
  },
  {
    id:'prep-2', difficulty:'easy', topic:'Learning',
    question:'What is the hardest part about learning a new language?',
    promptP:'Name the biggest challenge directly.', connectorsP:['In my experience, the hardest part is...', 'I would say that...', 'For me personally,...'],
    promptR:'Explain why it\'s so difficult.', connectorsR:['This is mainly because...', 'The thing is,...', 'What makes it hard is that...'],
    promptE:'Share your own struggle.', connectorsE:['For example, when I try to speak English,...', 'I remember one time...', 'A typical situation is when...'],
    promptConclusion:'End with a positive note.', connectorsC:['But I\'m getting better every day.', 'That\'s why practice is key.', 'So I just keep trying and that\'s what matters.']
  },
  {
    id:'prep-easy-3', difficulty:'easy', topic:'Travel',
    question:'What is the most memorable place you have ever visited?',
    promptP:'Name the place directly.', connectorsP:['Without a doubt, the most memorable place is...', 'If I had to choose, I would say...', 'The place that left the biggest impression is...'],
    promptR:'Give the reason why you loved it.', connectorsR:['What made it special was...', 'I loved it mainly because...', 'The main reason is the incredible atmosphere of...'],
    promptE:'Share a vivid memory.', connectorsE:['I vividly remember when...', 'For instance, watching the sunset at...', 'One moment I will never forget was...'],
    promptConclusion:'Conclude warmly.', connectorsC:['That\'s why I always recommend it.', 'I definitely hope to return there someday.', 'In short, it was an unforgettable experience.']
  },
  {
    id:'prep-easy-4', difficulty:'easy', topic:'Habits',
    question:'Why is having a morning routine helpful for a productive day?',
    promptP:'State your view clearly.', connectorsP:['In my opinion, a solid morning routine...', 'I strongly believe that how you start your morning...', 'The way I see it, mornings set the tone for...'],
    promptR:'Explain the mental benefit.', connectorsR:['This is because having a calm routine...', 'It gives you control before...', 'The main advantage is reducing stress and...'],
    promptE:'Illustrate with your own habit.', connectorsE:['For example, when I take 15 minutes to review English,...', 'Take my mornings for instance,...', 'Whenever I stick to my morning walk,...'],
    promptConclusion:'Reaffirm your point.', connectorsC:['So that\'s why small morning wins matter.', 'All in all, routines create freedom.', 'At the end of the day, consistency is everything.']
  },

  // MOYENNES (accessibles Jour 8-15)
  {
    id:'prep-3', difficulty:'medium', topic:'Career & Work',
    question:'Should everyone work remotely or is going to the office better?',
    promptP:'Take a clear side or balanced view.', connectorsP:['I tend to believe that...', 'As far as I\'m concerned,...', 'The way I see it,...'],
    promptR:'Give the core reason.', connectorsR:['The main reason is that...', 'This is mainly because...', 'It basically comes down to...'],
    promptE:'Use a real work example.', connectorsE:['For example, in my experience,...', 'Take my own job for instance,...', 'I\'ve seen cases where...'],
    promptConclusion:'Summarize your verdict.', connectorsC:['So all things considered,...', 'That\'s exactly why I prefer...', 'At the end of the day,...']
  },
  {
    id:'prep-4', difficulty:'medium', topic:'Language & Learning',
    question:'Why do so many people struggle to speak English despite years of study?',
    promptP:'Pinpoint the real problem.', connectorsP:['In my opinion, the root problem is...', 'I would argue that...', 'The truth is...'],
    promptR:'Contrast school learning with real practice.', connectorsR:['Schools focus too much on...', 'The reason is a lack of...', 'This is mainly because...'],
    promptE:'Give a concrete example.', connectorsE:['For example, I studied English for years and still couldn\'t...', 'Take regular practice for instance...', 'In my own learning journey,...'],
    promptConclusion:'Conclude with the solution.', connectorsC:['That\'s why speaking practice must come first.', 'So the real shift is from memorizing to talking.', 'At the end of the day, fluency requires action.']
  },

  // AVANCÉES (accessibles Jour 16+)
  {
    id:'prep-5', difficulty:'hard', topic:'Technology',
    question:'Is Artificial Intelligence making our daily lives easier or more complicated?',
    promptP:'State your opinion firmly.', connectorsP:['From my perspective,...', 'I strongly believe that...', 'Without a doubt,...'],
    promptR:'Explain the mechanism.', connectorsR:['The main reason is that...', 'This is largely due to...', 'At its core,...'],
    promptE:'Give a specific real-world case.', connectorsE:['A good example of this is...', 'Take for instance how...', 'Consider how...'],
    promptConclusion:'Deliver a strong closing.', connectorsC:['That\'s precisely why...', 'So all things considered,...', 'Ultimately, it comes down to...']
  },
  {
    id:'prep-6', difficulty:'hard', topic:'Society',
    question:'Is social media doing more harm than good to our attention span?',
    promptP:'Declare your stance.', connectorsP:['I\'m convinced that...', 'It\'s hard to deny that...', 'To be perfectly honest,...'],
    promptR:'Analyze the deeper cause.', connectorsR:['The fundamental issue is that...', 'What people don\'t realize is...', 'The problem goes deeper than...'],
    promptE:'Use a personal observation.', connectorsE:['I\'ve noticed that in my own life,...', 'A clear example is how...', 'Just look at how many people...'],
    promptConclusion:'Give your takeaway.', connectorsC:['That\'s why setting boundaries matters.', 'In a nutshell, moderation is key.', 'So we need to be more intentional about...']
  },
];

// ─── ROUTINE QUOTIDIENNE (Déblocage dès le Jour 1) ────────────────────────
export const phaseDescriptions = {
  1: { name:'Les Fondations & Immersion', days:'Jours 1-7', goal:'15 expressions, Speaking Lab PREP, Conversation Lab et Bonus immersif débloqués dès le Jour 1.', color:'#059669' },
  2: { name:'Structurer sa Pensée', days:'Jours 8-15', goal:'Expressions d\'argumentation, approfondissement PREP et simulations réelles.', color:'#8b5cf6' },
  3: { name:'Conversations Réelles', days:'Jours 16-25', goal:'Débats avancés, nuances d\'opinion et pratique conversationnelle intensive.', color:'#45e3a2' },
  4: { name:'Mode Libre & Confiance', days:'Jours 26-30', goal:'Tous les modules débloqués. Maîtrise totale et aisance spontanée.', color:'#ffd166' },
};

export function getPhase(day) {
  if (day <= 7) return 1;
  if (day <= 15) return 2;
  if (day <= 25) return 3;
  return 4;
}

export function getDailyChunks(day) {
  const phase = getPhase(day);
  if (phase === 1) {
    return survivalChunks.filter(c => c.day === day);
  }
  if (phase === 2) {
    return argumentChunks.filter(c => c.day === day);
  }
  // Phase 3-4: rotating revision sets of 15 chunks per day
  const all = [...survivalChunks, ...argumentChunks];
  const offset = ((day - 16) * 15) % all.length;
  return all.slice(offset, offset + 15);
}

// Speaking Lab PREP : Débloqué dès le Jour 1 avec questions adaptées
export function getAvailablePrepQuestions(day) {
  const d = Number(day) || 1;
  if (d <= 7) return prepFrameworkQuestions.filter(q => q.difficulty === 'easy');
  if (d <= 15) return prepFrameworkQuestions.filter(q => q.difficulty === 'easy' || q.difficulty === 'medium');
  return prepFrameworkQuestions; // Toutes les questions
}

// Mini-Dialogue immersif : 1 bonus unique et dédié pour CHAQUE jour (1 à 30)
export function getDailyDialogue(day) {
  const d = Math.max(1, Math.min(30, Number(day) || 1));
  return miniDialogues[d - 1] || miniDialogues[0];
}

// ─── PRONUNCIATION & REFLEX LAB (Gymnastique Articulaire & Anti-Blocage) ────
export const tongueTwisters = [
  { id: 'tt1', level: 'Facile', text: "Red lorry, yellow lorry, red lorry, yellow lorry.", focus: "R & L fluidité", tip: "Force la langue à alterner entre le R reculé et le L projeté sans marquer de pause." },
  { id: 'tt2', level: 'Facile', text: "I scream, you scream, we all scream for ice cream!", focus: "Rythme & Liaisons", tip: "Prononce 'ice cream' en un seul souffle sans couper entre ice et cream." },
  { id: 'tt3', level: 'Moyen', text: "She sells seashells on the seashore.", focus: "S vs SH", tip: "Bouche arrondie vers l'avant pour 'she', lèvres étirées pour 'sells'." },
  { id: 'tt4', level: 'Moyen', text: "Three thin thieves thought thrilling thoughts.", focus: "Le son TH sourd (θ)", tip: "Mets la pointe de la langue entre les dents. Ne dis pas 'tree tin tieves' !" },
  { id: 'tt5', level: 'Moyen', text: "Whether the weather is warm, whether the weather is hot, we must weather the weather.", focus: "Son TH sonore (ð) & W", tip: "Arrondis les lèvres sur 'weather' et vibre doucement la langue entre les dents." },
  { id: 'tt6', level: 'Difficile', text: "How much wood would a woodchuck chuck if a woodchuck could chuck wood?", focus: "W & Ch fluidité", tip: "Arrondis les lèvres sur 'wood' (ne dis pas 'vood') et explose sur 'chuck'." },
  { id: 'tt7', level: 'Difficile', text: "Peter Piper picked a peck of pickled peppers.", focus: "Consonnes explosives P", tip: "Expulse de l'air net sur chaque 'P' pour donner du dynamisme à ton élocution." },
  { id: 'tt8', level: 'Moyen', text: "A proper cup of coffee from a proper copper coffee pot.", focus: "P & K alternance", tip: "Alternance rapide entre les lèvres (P) et le fond du palais (K)." },
  { id: 'tt9', level: 'Facile', text: "Can you can a can as a canner can can a can?", focus: "Voyelle courte /æ/", tip: "Ouvre bien la mâchoire verticalement sur le son /æ/ de 'can'." },
  { id: 'tt10', level: 'Difficile', text: "Betty Botter bought some butter, but she said the butter's bitter.", focus: "B & T fluide (flapped)", tip: "En anglais américain, le 'tt' de 'butter' se prononce comme un léger 'd' rapide." },
  { id: 'tt11', level: 'Moyen', text: "He threw three free throws.", focus: "TH vs F vs TR", tip: "Gare à ne pas confondre le 'th' de 'threw' et le 'f' de 'free' !" },
  { id: 'tt12', level: 'Difficile', text: "Six sticky skeletons, six sticky skeletons, six sticky skeletons.", focus: "Groupes SK & ST", tip: "Verrouille l'expiration pour ne pas rajouter de voyelle parasite avant le S." },
  { id: 'tt13', level: 'Facile', text: "Cooks cook cupcakes quickly.", focus: "Son K explosif", tip: "Articule vigoureusement l'attaque de chaque syllabe pour réveiller le palais." },
  { id: 'tt14', level: 'Difficile', text: "Selfish shellfish, selfish shellfish, selfish shellfish.", focus: "Contraste SH & CH", tip: "Garde le contrôle de la pointe de ta langue entre le 'sh' doux et le 'ch' claquant." },
  { id: 'tt15', level: 'Facile', text: "Fuzzy Wuzzy was a bear. Fuzzy Wuzzy had no hair.", focus: "Vibration continue Z & W", tip: "Fais vibrer les cordes vocales sur 'Fuzzy' puis projette les lèvres sur 'Wuzzy'." }
];

export const pronunciationTraps = [
  { id: 'p1', sound: 'Le son TH (θ / ð)', examples: 'think vs this', rule: "Langue entre les dents !", tip: "Ne dis jamais 'sink' ou 'zink'. Souffle doucement avec la langue entre les incisives.", pairs: [{ word: 'Think', ipa: '/θɪŋk/' }, { word: 'This', ipa: '/ðɪs/' }, { word: 'Three', ipa: '/θriː/' }, { word: 'Together', ipa: '/təˈɡeð.ər/' }] },
  { id: 'p2', sound: 'Le H aspiré (h)', examples: 'hotel, happy, hungry', rule: "Expire depuis la gorge !", tip: "Les francophones disent souvent 'I 'ave an 'otel'. Expire comme pour faire de la buée sur une vitre.", pairs: [{ word: 'Hotel', ipa: '/həʊˈtel/' }, { word: 'Happy', ipa: '/ˈhæp.i/' }, { word: 'Hear', ipa: '/hɪər/' }, { word: 'Huge', ipa: '/hjuːdʒ/' }] },
  { id: 'p3', sound: 'Voyelles courtes vs longues', examples: 'ship vs sheep, fit vs feet', rule: "Le son /ɪ/ est relâché, le /iː/ est souriant", tip: "'Beach' a un i long souriant. Si tu dis un i court relâché, tu dis un gros mot !", pairs: [{ word: 'Ship (bateau)', ipa: '/ʃɪp/' }, { word: 'Sheep (mouton)', ipa: '/ʃiːp/' }, { word: 'Fit (en forme)', ipa: '/fɪt/' }, { word: 'Feet (pieds)', ipa: '/fiːt/' }] },
  { id: 'p4', sound: 'Les terminaisons en -ED', examples: 'worked /t/, played /d/, wanted /ɪd/', rule: "N'ajoute une syllabe 'id' QUE si le verbe finit par T ou D !", tip: "'Worked' se prononce 'weurkt' (1 seule syllabe), JAMAIS 'weurk-ed' !", pairs: [{ word: 'Worked', ipa: '/wɜːkt/' }, { word: 'Played', ipa: '/pleɪd/' }, { word: 'Wanted', ipa: '/ˈwɒn.tɪd/' }, { word: 'Started', ipa: '/ˈstɑː.tɪd/' }] },
  { id: 'p5', sound: 'Le son R anglais (/r/)', examples: 'red, right, river', rule: "Ne roule JAMAIS la gorge !", tip: "La langue se recourbe vers l'arrière du palais sans jamais toucher le palais ni la gorge.", pairs: [{ word: 'Red', ipa: '/red/' }, { word: 'Right', ipa: '/raɪt/' }, { word: 'River', ipa: '/ˈrɪv.ər/' }, { word: 'Real', ipa: '/rɪəl/' }] },
  { id: 'p6', sound: 'Le W anglais vs le V (/w/ vs /v/)', examples: 'wine vs vine, wet vs vet', rule: "W = lèvres en rond, V = dents du haut sur lèvre du bas", tip: "Pour 'water' ou 'wine', forme un rond avec la bouche comme si tu allais siffler.", pairs: [{ word: 'Wine (vin)', ipa: '/waɪn/' }, { word: 'Vine (vigne)', ipa: '/vaɪn/' }, { word: 'Wet (mouillé)', ipa: '/wet/' }, { word: 'Vet (véto)', ipa: '/vet/' }] }
];

export const emergencyPhrases = [
  { phrase: "Hold on, let me rephrase that.", translation: "Attends, laisse-moi reformuler ça." },
  { phrase: "The word completely slipped my mind!", translation: "Le mot m'a complètement échappé !" },
  { phrase: "What I'm trying to say is...", translation: "Ce que j'essaie de dire, c'est..." },
  { phrase: "It's on the tip of my tongue.", translation: "Je l'ai sur le bout de la langue." },
  { phrase: "How should I put this...", translation: "Comment dire ça..." },
  { phrase: "Sorry, I lost my train of thought.", translation: "Désolé, j'ai perdu le fil de ma pensée." },
  { phrase: "Could you say that a bit slower?", translation: "Peux-tu parler un tout petit peu plus lentement ?" },
  { phrase: "What does that mean in this context?", translation: "Que signifie cela dans ce contexte ?" }
];

export function getDailyVocalChallenge(day) {
  const d = Math.max(1, Math.min(30, day || 1));
  const twister = tongueTwisters[(d - 1) % tongueTwisters.length];
  const trap = pronunciationTraps[(d - 1) % pronunciationTraps.length];
  const emergency = emergencyPhrases[(d - 1) % emergencyPhrases.length];
  return {
    day: d,
    twister,
    trap,
    emergency,
    focus: twister.focus,
    dailyTip: `Échauffement Jour ${d} : travaillez particulièrement l'articulation de « ${twister.focus} » aujourd'hui.`
  };
}

