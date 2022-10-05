'use strict';
const toggleButton = document.querySelectorAll('.toggle-button')[0];
const navLinks = document.querySelector('.nav_links');
const navLinks0 = document.querySelector('.nav_links')[0];
const headerBody = document.querySelector('.header_body');
const nav = document.querySelector('.nav');
const learn = document.querySelector('.learn');
const section1 = document.querySelector('#section--1');

//responsive nav
toggleButton.addEventListener('click', function () {
  const toggle = navLinks.classList.toggle('active');
  toggle
    ? (headerBody.style.transform = 'translateY(15rem)')
    : (headerBody.style.transform = 'translateY(-0.9rem)');
});
navLinks.addEventListener('click', function (e) {
  const toggle = e.target.closest('.nav_links').classList.remove('active');
  if (!toggle) headerBody.style.transform = 'translateY(-1rem)';
});
//Scrolling
learn.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

navLinks.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav_link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    // document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  } else console.log('no');
});

//Tabbed components
const tabs = document.querySelectorAll('.about__tab');
const tabsContainer = document.querySelector('.about__tab-container');
const tabsContent = document.querySelectorAll('.about__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.about__tab');

  if (!clicked) return;

  tabs.forEach(t => t.classList.remove('about__tab--active'));
  clicked.classList.add('about__tab--active');

  //changing content

  tabsContent.forEach(c => c.classList.remove('about__content--active'));
  document
    .querySelector(`.about__content--${clicked.dataset.tab}`)
    .classList.add('about__content--active');
});

// Sticky navigation

// const initialCoord = section1.getBoundingClientRect();
// console.log(initialCoord);
// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);
//   if (this.window.scrollY > initialCoord.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//Revealing Elements on Scroll

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//lazy loading images
const imgTarget = document.querySelectorAll('.blur-img');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('lazy-img');
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTarget.forEach(img => imgObserver.observe(img));

//slider
const sliders = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  createDots();

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };
  activateDot(0);

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };
  goToSlide(0);

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else curSlide++;

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else curSlide--;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowLeft' && prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
sliders();
