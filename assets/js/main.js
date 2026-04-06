const hs=["../images/site/site-image-001.jpg","../images/site/site-image-002.jpg","../images/site/site-image-003.jpg"];
const hBg=document.getElementById('heroBg');
function setHero(el,i){hBg.style.backgroundImage='url("'+hs[i]+'")';document.querySelectorAll('.hthumb').forEach((t,j)=>t.classList.toggle('active',j===i));}
let hi=0;setInterval(()=>{hi=(hi+1)%hs.length;const th=document.querySelectorAll('.hthumb');hBg.style.backgroundImage='url("'+hs[hi]+'")';th.forEach((t,i)=>t.classList.toggle('active',i===hi));},5000);
const ro=new IntersectionObserver(entries=>{entries.forEach((e,i)=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add('visible'),i*65);ro.unobserve(e.target);}})},{threshold:0.08,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));
window.addEventListener('scroll',()=>{document.getElementById('navbar').style.background=window.scrollY>60?'rgba(13,13,13,0.99)':'rgba(13,13,13,0.96)';});
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{e.preventDefault();const t=document.querySelector(a.getAttribute('href'));if(t)t.scrollIntoView({behavior:'smooth',block:'start'});});});
const projects=[
  {src:"../images/site/site-image-002.jpg",name:"فيلا سكنية حديثة – السيب",type:"فلل سكنية"},
  {src:"../images/site/site-image-004.jpg",name:"فيلا سكنية فاخرة",type:"فلل سكنية"},
  {src:"../images/site/site-image-005.jpg",name:"فيلا عصرية",type:"فلل سكنية"},
  {src:"../images/site/site-image-003.jpg",name:"فيلا راقية",type:"فلل سكنية"},
  {src:"../images/site/site-image-006.jpg",name:"فيلا سكنية – مسقط",type:"فلل سكنية"},
  {src:"../images/site/site-image-007.jpg",name:"مجمع سكني",type:"فلل سكنية"},
  {src:"../images/site/site-image-008.jpg",name:"فيلا كلاسيكية",type:"فلل سكنية"},
  {src:"../images/site/site-image-009.jpg",name:"فيلا بيضاء",type:"فلل سكنية"},
  {src:"../images/site/site-image-010.jpg",name:"فيلا حديثة",type:"فلل سكنية"},
  {src:"../images/site/site-image-011.jpg",name:"فيلا خاصة",type:"فلل سكنية"},
  {src:"../images/site/site-image-012.jpg",name:"فيلا كبيرة",type:"فلل سكنية"},
  {src:"../images/site/site-image-013.jpg",name:"فيلا – الشرقية",type:"فلل سكنية"},
  {src:"../images/site/site-image-014.jpg",name:"فيلا سكنية",type:"فلل سكنية"},
  {src:"../images/site/site-image-015.jpg",name:"فيلا مميزة",type:"فلل سكنية"},
  {src:"../images/site/site-image-016.jpg",name:"فيلا مع تشطيب كامل",type:"فلل سكنية"},
  {src:"../images/site/site-image-017.jpg",name:"فيلا – زاوية جوية",type:"فلل سكنية"},
  {src:"../images/site/site-image-018.jpg",name:"فيلا جبلية",type:"فلل سكنية"},
  {src:"../images/site/site-image-019.jpg",name:"فيلا مكتملة",type:"فلل سكنية"},
  {src:"../images/site/site-image-020.jpg",name:"فيلا – السيب",type:"فلل سكنية"},
  {src:"../images/site/site-image-021.jpg",name:"فيلا – واجهة",type:"فلل سكنية"},
  {src:"../images/site/site-image-022.jpg",name:"مجمع سكني – منظر جوي",type:"منظر جوي"},
  {src:"../images/site/site-image-023.jpg",name:"مشروع – منظر جوي",type:"منظر جوي"},
  {src:"../images/site/site-image-024.jpg",name:"منظر جوي",type:"منظر جوي"},
  {src:"../images/site/site-image-025.jpg",name:"فيلا قيد الإنشاء",type:"قيد الإنشاء"},
  {src:"../images/site/site-image-026.jpg",name:"مشروع قيد الإنشاء",type:"قيد الإنشاء"},
  {src:"../images/site/site-image-027.jpg",name:"مشروع جاري",type:"قيد الإنشاء"},
  {src:"../images/site/site-image-028.jpg",name:"عزل حمام – طبقة ممبرين",type:"أعمال عزل"},
  {src:"../images/site/site-image-029.jpg",name:"عزل حمام – مكتمل",type:"أعمال عزل"},
  {src:"../images/site/site-image-030.jpg",name:"عزل حمام سباحة – تطبيق",type:"أعمال عزل"},
  {src:"../images/site/site-image-031.jpg",name:"حمام سباحة – تبليط",type:"أعمال عزل"},
  {src:"../images/site/site-image-032.jpg",name:"عزل حراري – لهب",type:"أعمال عزل"},
  {src:"../images/site/site-image-033.jpg",name:"عزل سطح أبيض",type:"أعمال عزل"},
  {src:"../images/site/site-image-034.jpg",name:"عزل سطح فيلا",type:"أعمال عزل"},
  {src:"../images/site/site-image-035.jpg",name:"عزل سطح – تفاصيل",type:"أعمال عزل"},
  {src:"../images/site/site-image-036.jpg",name:"عزل مائي – سطح",type:"أعمال عزل"},
  {src:"../images/site/site-image-037.jpg",name:"عزل سطح منزل",type:"أعمال عزل"},
  {src:"../images/site/site-image-038.jpg",name:"عزل حمام سباحة",type:"أعمال عزل"},
  {src:"../images/site/site-image-039.jpg",name:"عزل ممبرين",type:"أعمال عزل"},
  {src:"../images/site/site-image-040.jpg",name:"عزل داخلي",type:"أعمال عزل"},
  {src:"../images/site/site-image-041.jpg",name:"اختبار عزل السطح – مائي",type:"أعمال عزل"},
  {src:"../images/site/site-image-042.jpg",name:"عزل سطح – اختبار",type:"أعمال عزل"},
  {src:"../images/site/site-image-043.jpg",name:"مشروع عزل – لقطة ميدانية",type:"أعمال عزل"},
  {src:"../images/site/site-image-044.jpg",name:"حمام سباحة داخلي – مكتمل",type:"حمام سباحة"},
  {src:"../images/site/site-image-045.jpg",name:"تشطيب داخلي",type:"تشطيبات"},
  {src:"../images/site/site-image-046.jpg",name:"تشطيبات داخلية",type:"تشطيبات"},
  {src:"../images/site/site-image-047.jpg",name:"أعمال داخلية",type:"تشطيبات"},
  {src:"../images/site/site-image-048.jpg",name:"تجهيزات وتشطيبات",type:"تشطيبات"},
  {src:"../images/site/site-image-049.jpg",name:"تصميم معماري",type:"تشطيبات"},
];
let visIdx=[];
function updVI(){visIdx=[...document.querySelectorAll('.gitem:not(.hidden)')].map(el=>parseInt(el.dataset.index));document.getElementById('showing').textContent=visIdx.length;}
updVI();
document.querySelectorAll('.fb').forEach(btn=>{btn.addEventListener('click',()=>{document.querySelectorAll('.fb').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.f;document.querySelectorAll('.gitem').forEach(item=>{item.classList.toggle('hidden',f!=='all'&&item.dataset.type!==f);});updVI();});});
let curIdx=0;
const lb=document.getElementById('lb'),lbImg=document.getElementById('lb-img'),lbCap=document.getElementById('lb-cap'),lbCtr=document.getElementById('lb-ctr');
function openLB(ri){curIdx=visIdx.indexOf(ri);if(curIdx<0)curIdx=0;showLB();lb.classList.add('open');document.body.style.overflow='hidden';}
function showLB(){const p=projects[visIdx[curIdx]];lbImg.src=p.src;lbCap.textContent=p.name+' — '+p.type;lbCtr.textContent=(curIdx+1)+' / '+visIdx.length;}
function closeLB(){lb.classList.remove('open');document.body.style.overflow='';}
document.querySelectorAll('.gitem').forEach(item=>{item.addEventListener('click',()=>openLB(parseInt(item.dataset.index)));});
document.getElementById('lb-close').addEventListener('click',closeLB);
document.getElementById('lb-next').addEventListener('click',()=>{curIdx=(curIdx-1+visIdx.length)%visIdx.length;showLB();});
document.getElementById('lb-prev').addEventListener('click',()=>{curIdx=(curIdx+1)%visIdx.length;showLB();});
lb.addEventListener('click',e=>{if(e.target===lb)closeLB();});
document.addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')closeLB();if(e.key==='ArrowLeft'){curIdx=(curIdx+1)%visIdx.length;showLB();}if(e.key==='ArrowRight'){curIdx=(curIdx-1+visIdx.length)%visIdx.length;showLB();}});
document.getElementById('sendBtn').addEventListener('click',()=>{const n=document.querySelector('input[type=text]').value.trim();if(!n){alert('الرجاء إدخال اسمك الكامل');return;}alert('شكراً '+n+'!\nسيتم التواصل معك قريباً.\n\nThank you! We will contact you shortly.');});
