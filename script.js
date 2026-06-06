const header = document.getElementById('siteHeader');
const menuToggle = document.getElementById('menuToggle');
const navPanel = document.getElementById('navPanel');
const servicesToggle = document.getElementById('servicesToggle');
const servicesItem = document.querySelector('.has-mega');
const backTop = document.getElementById('backTop');
const appointmentForm = document.getElementById('appointmentForm');
const formSuccess = document.getElementById('formSuccess');

if (window.lucide) lucide.createIcons();

function closeMega(){
  servicesItem?.classList.remove('mega-open');
  servicesToggle?.setAttribute('aria-expanded','false');
}
function closeMenu(){
  navPanel?.classList.remove('open');
  menuToggle?.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded','false');
  document.body.style.overflow='';
  closeMega();
}
menuToggle?.addEventListener('click',()=>{
  const open=navPanel.classList.toggle('open');
  menuToggle.classList.toggle('is-open',open);
  menuToggle.setAttribute('aria-expanded',String(open));
  document.body.style.overflow=open?'hidden':'';
  if(!open) closeMega();
});
servicesToggle?.addEventListener('click',event=>{
  if(window.innerWidth>900) return;
  event.preventDefault();
  const open=servicesItem.classList.toggle('mega-open');
  servicesToggle.setAttribute('aria-expanded',String(open));
});
document.addEventListener('click',event=>{
  if(window.innerWidth>900 && servicesItem && !servicesItem.contains(event.target)) closeMega();
});
navPanel?.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
window.addEventListener('resize',()=>{if(window.innerWidth>900) closeMenu();});

const stagger=(container,item,step=65)=>document.querySelectorAll(container).forEach(group=>group.querySelectorAll(item).forEach((el,i)=>el.style.transitionDelay=`${i*step}ms`));
stagger('.services-grid','.service-card');stagger('.why-grid','.why-card');stagger('.gallery-grid','.gallery-item');stagger('.timeline','article');stagger('.reviews-grid','.review-card');

if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('active');observer.unobserve(entry.target);}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('active'));

const sections=[...document.querySelectorAll('main section[id]')];
const navLinks=[...document.querySelectorAll('.nav-links>a')];
function updateScrollState(){
  header?.classList.toggle('scrolled',window.scrollY>18);
  backTop?.classList.toggle('show',window.scrollY>650);
  const marker=window.scrollY+150;
  let current=sections[0]?.id;
  sections.forEach(section=>{if(section.offsetTop<=marker) current=section.id;});
  navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${current}`));
}
window.addEventListener('scroll',updateScrollState,{passive:true});
window.addEventListener('load',updateScrollState);
backTop?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

appointmentForm?.addEventListener('submit',event=>{
  event.preventDefault();
  const data=new FormData(appointmentForm);
  const name=String(data.get('name')||'').trim();
  const phone=String(data.get('phone')||'').trim();
  const service=String(data.get('service')||'').trim();
  const date=String(data.get('date')||'').trim()||'Not selected';
  const message=String(data.get('message')||'').trim()||'No extra message';
  const text=`Hello Aai Mother & Child Care Hospital,\n\nI want to book an appointment.\n\nPatient Name: ${name}\nPhone: ${phone}\nService Needed: ${service}\nPreferred Date: ${date}\nMessage: ${message}\n\nPlease confirm availability.`;
  window.open(`https://wa.me/919922190800?text=${encodeURIComponent(text)}`,'_blank','noopener');
  appointmentForm.reset();
  if(formSuccess){formSuccess.textContent='Appointment message prepared. Please send it on WhatsApp to confirm.';formSuccess.classList.add('show');setTimeout(()=>formSuccess.classList.remove('show'),4500);}
});
