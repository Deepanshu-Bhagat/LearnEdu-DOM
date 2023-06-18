'use strict';

const navbar = document.querySelector('.nav');
const navLinks = document.querySelector('.nav-links');
const allNavLink = document.querySelectorAll('.nav-link');
const navLogo = document.querySelector('.nav-logo');
const header = document.getElementById('home');
const allSections = document.querySelectorAll('.section');
const allSlides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.dots');
const openModalBtn = document.querySelectorAll('.open-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-modal-btn');
const featureRight = document.querySelectorAll('.feature-right');
const featureLeft = document.querySelectorAll('.feature-left');

// Smooth scrolling to sections
navLinks.addEventListener('click', function (e) {
  e.preventDefault();
  const targetEl = e.target.classList.contains('nav-link');
  if (!targetEl) return;
  const id = e.target.getAttribute('href');
  document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
});

// Hover Navbar
const handleLinkHover = function (e) {
  const targetEl = e.target.closest('.nav-link');
  if (!targetEl) return;
  allNavLink.forEach(link => {
    if (link !== targetEl) {
      link.style.opacity = this;
    }
  });
  navLogo.style.opacity = this;
};
navLinks.addEventListener('mouseover', handleLinkHover.bind(0.5));
navLinks.addEventListener('mouseout', handleLinkHover.bind(1));

// Sticky navbar
const navHeight = navbar.getBoundingClientRect().height;
const stickyNav = entries => {
  const [entry] = entries;
  if (entry.isIntersecting) navbar.classList.remove('sticky');
  else navbar.classList.add('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Revealing sections
const revealSections = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('section--hidden');
      observer.unobserve(entry.target);
    }
    // else entry.target.classList.add('section--hidden');
  });
};
const sectionObserver = new IntersectionObserver(revealSections, {
  root: null,
  threshold: 0.13,
});
allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Feature Reveal
const revealLeftFeature = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting)
      entry.target.classList.remove('feature-left--hidden');
    else entry.target.classList.add('feature-left--hidden');
  });
};
const featureObserver = new IntersectionObserver(revealLeftFeature, {
  root: null,
  threshold: 0.13,
});
featureLeft.forEach(feature => {
  featureObserver.observe(feature);
  feature.classList.add('feature-left--hidden');
});

const revealRightFeature = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting)
      entry.target.classList.remove('feature-right--hidden');
    else entry.target.classList.add('feature-right--hidden');
  });
};
const featureRightObserver = new IntersectionObserver(revealRightFeature, {
  root: null,
  threshold: 0.13,
});
featureRight.forEach(feature => {
  featureRightObserver.observe(feature);
  feature.classList.add('feature-right--hidden');
});

// Testimonial
let curSlide = 0;
const maxSlides = allSlides.length;

const goToSlide = slide => {
  allSlides.forEach((el, i) => {
    el.style.transform = `translateX(${(i - slide) * 100}%)`;
  });
};
goToSlide(0);

const createDots = function () {
  allSlides.forEach((_, i) => {
    const htmlText = `
  <button class="dots-dot dot-btn-${i}" data-slide=${i}></button>
  `;
    dotsContainer.insertAdjacentHTML('beforeend', htmlText);
  });
};
createDots();

const activeDot = function (slide) {
  document.querySelectorAll('.dots-dot').forEach(btn => {
    btn.classList.remove('dots-dot--active');
  });
  document.querySelector(`.dot-btn-${slide}`).classList.add('dots-dot--active');
};
activeDot(0);

const nextSlide = function () {
  if (curSlide >= maxSlides - 1) {
    curSlide = 0;
  } else curSlide++;
  goToSlide(curSlide);
  activeDot(curSlide);
};
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlides - 1;
  } else curSlide--;
  goToSlide(curSlide);
  activeDot(curSlide);
};

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') prevSlide();
});

dotsContainer.addEventListener('click', function (e) {
  if (!e.target.classList.contains('dots-dot')) return;
  curSlide = e.target.dataset.slide;
  goToSlide(curSlide);
  activeDot(curSlide);
});

// continuos slider
setInterval(() => {
  nextSlide();
}, 2500);

// Modal window
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const hideModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
openModalBtn.forEach(btn => btn.addEventListener('click', openModal));
closeBtn.addEventListener('click', hideModal);
overlay.addEventListener('click', hideModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    hideModal();
  }
});
