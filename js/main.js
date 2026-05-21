// Header scroll effect
const header = document.getElementById('header');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
  backToTop?.classList.toggle('visible', window.scrollY > 400);
});

// Mobile nav
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id], footer[id]');

const setActiveLink = () => {
  const scrollY = window.scrollY + 120;
  sections.forEach((section) => {
    const id = section.getAttribute('id');
    const top = section.offsetTop;
    const height = section.offsetHeight;
    if (scrollY >= top && scrollY < top + height) {
      navLinks?.querySelectorAll('a').forEach((a) => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
};

window.addEventListener('scroll', setActiveLink);
setActiveLink();

// Skills infinite loop — duplicate cards for seamless marquee
const skillsTrack = document.getElementById('skillsTrack');

if (skillsTrack) {
  const cards = [...skillsTrack.querySelectorAll('.skill-card')];
  cards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    skillsTrack.appendChild(clone);
  });
}

// Project filters
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    projectCards.forEach((card) => {
      const categories = card.dataset.category || '';
      const show = filter === 'all' || categories.includes(filter);
      card.classList.toggle('hidden', !show);
    });
  });
});

// About tabs
const aboutTabs = document.querySelectorAll('.about-tab');
const aboutPanels = document.querySelectorAll('.about-panel');
const exploreMoreBtn = document.getElementById('exploreMoreBtn');
const aboutBackBtn = document.getElementById('aboutBackBtn');
const aboutSection = document.getElementById('about');

const switchAboutTab = (tabName) => {
  aboutTabs.forEach((tab) => {
    const isActive = tab.dataset.tab === tabName;
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', isActive);
    tab.tabIndex = isActive ? 0 : -1;
  });

  aboutPanels.forEach((panel) => {
    const isOverview = panel.id === 'panel-overview';
    const showOverview = tabName === 'overview';
    const isActive = isOverview ? showOverview : !showOverview;

    panel.classList.toggle('active', isActive);
    panel.hidden = !isActive;
  });
};

aboutTabs.forEach((tab) => {
  tab.addEventListener('click', () => switchAboutTab(tab.dataset.tab));
});

exploreMoreBtn?.addEventListener('click', () => {
  switchAboutTab('details');
  aboutSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

aboutBackBtn?.addEventListener('click', () => {
  switchAboutTab('overview');
});

// Back to top
backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Fade-in on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.expertise-card, .project-card, .cert-card, .education-card').forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

document.head.insertAdjacentHTML(
  'beforeend',
  `<style>.visible { opacity: 1 !important; transform: translateY(0) !important; }</style>`
);
