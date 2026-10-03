const progress=document.querySelector('.progress');
window.addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(window.scrollY/h*100)+'%';});

const reveals=document.querySelectorAll('.reveal');
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
reveals.forEach(el=>io.observe(el));

const menuBtn=document.querySelector('.menu-btn');
const nav=document.querySelector('#nav');
menuBtn?.addEventListener('click',()=>nav.classList.toggle('mobile-open'));
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('mobile-open')));

const data={
  pharma:{
    title:'Pharmaceutical Sales Intelligence',
    text:'A Power BI executive analytics project focused on turning pharmaceutical sales data into a clear management view across products, customers, channels and sales teams.',
    tags:['Power BI','DAX','Power Query','Data Cleaning'],
    bullets:[
      'Executive overview of sales performance by time, customer city, channel and sub-channel.',
      'Product and drug-class analysis with top-performing products and customers.',
      'Interactive multi-page dashboard designed around KPIs and business questions.',
      'Data preparation and transformation before visualization.'
    ],
    images:['assets/pharma-overview.png','assets/pharma-analysis.png','assets/pharma-team.png']
  },
  hotel:{
    title:'Hotel Booking Behavior Analysis',
    text:'An end-to-end analysis of more than 100K hotel booking records using Python, SQL Server, Power BI and Excel.',
    tags:['Python','SQL Server','Power BI','Excel'],
    bullets:[
      'Cleaned and prepared 119K+ records for analysis.',
      'Explored cancellation behavior, lead time, market segments and deposit types.',
      'Built an interactive dashboard with 15+ KPIs.',
      'Analyzed ADR, cancellation ratios, occupancy and revenue-related patterns.'
    ],
    images:['assets/hotel-dashboard.png','assets/hotel-sql.png','assets/hotel-python.png','assets/hotel-report.png']
  },
  library:{
    title:'Library Management System',
    text:'A Python and SQLite desktop application for managing books, users, borrowing activity and inventory status.',
    tags:['Python','SQLite','Desktop Application'],
    bullets:[
      'Managed 500+ book records and active user accounts.',
      'Included authentication and borrowing tracking.',
      'Used SQL queries for database retrieval and inventory updates.',
      'Designed to reduce repetitive manual processing.'
    ]
  }
};

const modal=document.querySelector('#modal');
const title=document.querySelector('#modal-title');
const text=document.querySelector('#modal-text');
const details=document.querySelector('#modal-details');

document.querySelectorAll('.case-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const p=data[btn.dataset.project];
    const mode=btn.dataset.mode || 'case';
    const isGallery=mode==='gallery';

    modal.classList.toggle('gallery-mode',isGallery);
    title.textContent=isGallery ? `${p.title} — Gallery` : p.title;
    text.textContent=isGallery ? '' : p.text;

    if(isGallery){
      details.innerHTML = p.images && p.images.length
        ? `<div class="case-gallery">${p.images.map((img,i)=>`<figure><img src="${img}" alt="${p.title} image ${i+1}"><figcaption>Project image ${String(i+1).padStart(2,'0')}</figcaption></figure>`).join('')}</div>`
        : '<p class="gallery-empty">No additional project images are available yet.</p>';
    }else{
      details.innerHTML=`<div class="detail-tags">${p.tags.map(x=>`<span>${x}</span>`).join('')}</div><ul>${p.bullets.map(x=>`<li>${x}</li>`).join('')}</ul>`;
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
  });
});
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';}
document.querySelector('.modal-close').addEventListener('click',closeModal);
modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});