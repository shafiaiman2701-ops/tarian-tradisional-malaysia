const views = {
  splash: document.getElementById('splash'),
  login: document.getElementById('login'),
  main: document.getElementById('main'),
  detail: document.getElementById('detail')
};

const elements = {
  splashTitle: document.getElementById('splash-title'),
  username: document.getElementById('username'),
  language: document.getElementById('language'),
  nextBtn: document.getElementById('nextBtn'),
  welcomeText: document.getElementById('welcomeText'),
  danceList: document.getElementById('danceList'),
  backBtn: document.getElementById('backBtn'),
  danceName: document.getElementById('danceName'),
  danceMeta: document.getElementById('danceMeta'),
  danceDesc: document.getElementById('danceDesc'),
  logoutBtn: document.getElementById('logoutBtn')
};

const dances = [
  {
    id: 'zapin',
    name: {ms:'Zapin', en:'Zapin'},
    origin: {ms:'Johor & Seluruh Rantau Melayu', en:'Johor & Malay world'},
    community: {ms:'Melayu', en:'Malay'},
    function: {ms:'Persembahan sosial dan sambutan', en:'Social and celebratory performance'},
    desc: {
      ms: 'Zapin merupakan tarian berirama cepat yang dipengaruhi oleh budaya Arab dan Melayu, menekankan langkah kaki dan rentak gitar tradisional.',
      en: 'Zapin is a lively Malay dance with Arabic influence, noted for quick footwork and rhythmic accompaniment.'
    }
  },
  {
    id: 'joget',
    name: {ms:'Joget', en:'Joget'},
    origin: {ms:'Seluruh Malaysia (Asal: Melayu)', en:'Malaysia (Malay origin)'},
    community: {ms:'Melayu', en:'Malay'},
    function: {ms:'Hiburan dan sambutan', en:'Entertainment and celebration'},
    desc: {
      ms: 'Joget adalah tarian ceria dengan gerakan ringan dan berpusing, sering dipersembahkan semasa majlis keraian.',
      en: 'Joget is an upbeat dance featuring light steps and turns, often performed at festive events.'
    }
  },
  {
    id: 'ngajat',
    name: {ms:'Ngajat', en:'Ngajat'},
    origin: {ms:'Sarawak', en:'Sarawak'},
    community: {ms:'Iban', en:'Iban'},
    function: {ms:'Upacara dan sambutan', en:'Ceremonial and celebratory'},
    desc: {
      ms: 'Ngajat dipersembahkan oleh masyarakat Iban dengan gerakan lincah dan sering diiringi gendang.',
      en: 'Ngajat is performed by the Iban community with lively movements, often accompanied by drums.'
    }
  },
  {
    id: 'sumazau',
    name: {ms:'Sumazau', en:'Sumazau'},
    origin: {ms:'Sabah', en:'Sabah'},
    community: {ms:'Kadazan-Dusun', en:'Kadazan-Dusun'},
    function: {ms:'Perayaan dan upacara', en:'Festival and ritual'},
    desc: {
      ms: 'Sumazau adalah tarian tradisi Kadazan-Dusun dengan gerakan tangan perlahan seperti burung terbang.',
      en: 'Sumazau is a Kadazan-Dusun traditional dance featuring slow, bird-like arm movements.'
    }
  }
];

function show(view){
  Object.values(views).forEach(v=>v.classList.add('hidden'));
  views[view].classList.remove('hidden');
}

function animateSplash(text, cb){
  elements.splashTitle.textContent = '';
  let i = 0;
  const interval = Math.max(30, 1200 / Math.max(1, text.length));
  const id = setInterval(()=>{
    elements.splashTitle.textContent += text[i++] || '';
    if(i>text.length){
      clearInterval(id);
      setTimeout(cb, 600);
    }
  }, interval);
}

function init(){
  animateSplash('TARIAN TRADISIONAL MALAYSIA', ()=>{
    show('login');
  });

  elements.nextBtn.addEventListener('click', ()=>{
    const name = elements.username.value.trim() || 'Tekun';
    const lang = elements.language.value || 'ms';
    sessionStorage.setItem('ttm_username', name);
    sessionStorage.setItem('ttm_lang', lang);
    renderMain();
    show('main');
  });

  elements.logoutBtn.addEventListener('click', ()=>{
    sessionStorage.clear();
    elements.username.value = '';
    show('login');
  });

  elements.backBtn.addEventListener('click', ()=>{
    show('main');
  });
}

function renderMain(){
  const name = sessionStorage.getItem('ttm_username') || 'Tekun';
  const lang = sessionStorage.getItem('ttm_lang') || 'ms';
  elements.welcomeText.textContent = (lang==='ms')? `Selamat datang, ${name}` : `Welcome, ${name}`;
  elements.danceList.innerHTML = '';
  dances.forEach(d=>{
    const btn = document.createElement('button');
    btn.className = 'danceBtn';
    btn.textContent = d.name[lang];
    btn.addEventListener('click', ()=> showDetail(d.id));
    elements.danceList.appendChild(btn);
  });
}

function showDetail(id){
  const dance = dances.find(d=>d.id===id);
  if(!dance) return;
  const lang = sessionStorage.getItem('ttm_lang') || 'ms';
  elements.danceName.textContent = dance.name[lang];
  elements.danceMeta.innerHTML = '';
  const metaItems = [
    {k:(lang==='ms'?'Asal':'Origin'), v:dance.origin[lang]},
    {k:(lang==='ms'?'Kaum':'Community'), v:dance.community[lang]},
    {k:(lang==='ms'?'Fungsi':'Function'), v:dance.function[lang]}
  ];
  metaItems.forEach(it=>{
    const li = document.createElement('li');
    li.textContent = `${it.k}: ${it.v}`;
    elements.danceMeta.appendChild(li);
  });
  elements.danceDesc.textContent = dance.desc[lang];
  show('detail');
}

document.addEventListener('DOMContentLoaded', init);
