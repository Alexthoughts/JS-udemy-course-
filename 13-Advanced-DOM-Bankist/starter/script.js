'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');

//////////////////////////////////////////////////////////

// Modal window
const openModal = function (e) {
  e.preventDefault(); //prevent automatic scrolling to the top of the page
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////////////////////////////////

//SCROLLING

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

////////////////////////////////////////////////////////////////

//PAGE NAVIGATION

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href'); //get href after click on button (#section--1/2/3)
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

////////////////////////////////////////////////////////////////

//TABBED COMPONENT
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

//Event delegation
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab'); //button that was clicked

  //fix click out of button - Guard clause...if clicked === null -> finish
  if (!clicked) return;
  //clear classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  //add active class, to the button that was clicked
  clicked.classList.add('operations__tab--active');

  //Activate content area
  console.log(clicked.dataset.tab); //->1/2/3 (method - dataset, tab - name from HTML)
  //remove all content
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  //add content which you need
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//////////////////////////////////////////////////////////////

//MENU FADE ANIMATION
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    // console.log(this); //0.5/1
    const link = e.target; //elment that we are working with
    //Go to all navigation (.nav) and from it select link
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img'); //select logo

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this; //change opacity for all, that not selected
    });
    logo.style.opacity = this;
  }
};

//Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////////////////////////////

//STICKY NAVIGATION
/*
const initialCoords = section1.getBoundingClientRect();
//console.log(initialCoords); //section one position

//Scroll have a bad perfomance on old devices -> solution in next lection
window.addEventListener('scroll', function () {
  // console.log(this.window.scrollY); //current scroll position
  // When we reach the 1st section, make a navigation sticky
  if (this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});

*/

//STICKY NAVIGATION: Intersection Observer
/*
const obsCallback = function (entries, observer) {
  //will be called each time that the observed element intersecting the root element
  //in the threshold we defined
  entries.forEach(entry => {
    console.log(entry);
  });
};

const obsOptions = {
  //section1 - target element
  //root - element that want our target element (section1) to intersect
  //threshold - the percentage of intersaction in which the observer callback will be called
  root: null,
  threshold: [0, 0.2],
  //0 = trigger each time that the target element moves completely out of the view (section 1 not visible)
  //1 = called when 100% of the target is visible in the viewport (all section 1 will be visible)
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);

*/

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const headerObsCallback = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObsOptions = {
  root: null,
  rootMargin: `-${navHeight}px`, //90 = height of navigation (don't override the section 1)
  threshold: 0,
};

const headerObserver = new IntersectionObserver(
  headerObsCallback,
  headerObsOptions
);
headerObserver.observe(header);

/////////////////////////////////////////////////////////////
//REVEAL SECTIONS
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target); //not observe if scroll up
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

///////////////////////////////////////////////////////////
//LAZY LOADING IMAGES
const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  //Replace image (src with data-src)
  entry.target.src = entry.target.dataset.src;
  //In case of poor internet connection, blur disappear, but
  //image still having a bad quality
  //good quality appears after cca 5sec because internet is slow
  //so, remove blur just after loading good quality image
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img'); //remove blur
  });

  //stop observer after loading image
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

////////////////////////////////////////////////////////////////////
//SLIDER
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length - 1;

  //Change size of the slides
  // const slider = document.querySelector('.slider');
  // slider.style.transform = 'scale(0.25) translateX(-1300px)'; //change size of the image
  // slider.style.overflow = 'visible'; //make visible all images

  //Functions
  //Create dots
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeEnd',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  //Show active slide
  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  //Now all slides at the same position
  //Must be at left or right side (0%, 100%, 200%, 300%)
  //translateX moves images
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  //Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    //-100%, 0%, 100%, 200%
    activateDot(curSlide);
  };

  //Previous slide
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    createDots();
    goToSlide(0);
    activateDot(0); //by default active slide is 0
  };
  init();

  //Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  //Moving slides using keys
  document.addEventListener('keydown', function (e) {
    // console.log(e);
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  //Changing the slide after click the dot
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      //if we click exactly the dot
      const { slide } = e.target.dataset;
      //->const slide = DOMStringMap {slide: '0'}
      //->const {slide} = 0
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

//PRACTICE
/*
console.log(document.documentElement); //all html code
console.log(document.head); //html head
console.log(document.body); //html body

const header = document.querySelector('.header'); //select element with class 'header'
const allSections = document.querySelectorAll('.section'); //select all elements with class 'section'
console.log(allSections); //->nodeList with all sections

document.getElementById('#section--1'); //select by id
const allButtons = document.getElementsByTagName('button'); //all elements with name 'button'
console.log(allButtons);

document.getElementsByClassName('btn'); //select by class

//Creating and inserting elements
//.insertAdjacentHTML -> create html (Banklist app)

const message = document.createElement('div'); //in this point the element doesn't exist on a page
message.classList.add('cookie-message'); //add class 'cookie-message' to the created element
//message.textContent ='We use cookies to improve functionality';
message.innerHTML =
  'We use cookies to improve functionality <button class = "btn btn--close-cookie">Got it!</button>';

//We can use prepend and append method to insert and move elements
header.prepend(message); //add message to the top of the header (first child element)
header.append(message); //add message to the bottom of the header (last child element)
//Insert multiple copies of the element
//header.append(message.cloneNode(true)) -> element will be visible in the top and bottom of the header

header.before(message); //add element before the header
header.after(message); //add element after the header

//Delete elements
//delete element after clicking the button 'Got it'
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    //message.parentElement.removeChild(message); -> old way to delete element
  });

//Styles, Attributes and classes
//Styles
message.style.backgroundColor = 'black'; //set background color
message.style.width = '120%'; //width

console.log(getComputedStyle(message).color); //style to console (color/height...) ->rgb(187, 187, 187)

message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + 'px'; //set height

document.documentElement.style.setProperty('--color-primary', 'green'); //change the color of element

//Attributes
//src, alt, class, id -> attributes in HTML
//Read (reading works only for standard attributes)
const logo = document.querySelector('.nav__logo');
console.log(logo.alt); //value from HTML -> Bankist logo
console.log(logo.className);

//Set attribute
logo.alt = 'Beatiful logo';

//Non-standard
console.log(logo.designer); //->undefined
console.log(logo.getAttribute('designer')); //->Alex
logo.setAttribute('company', 'Banklist'); //create attribute "company" with "Banklist" value

const link = document.querySelector('.nav__link--btn');
console.log(link.href); //->http://127.0.0.1:8080/starter/# (absolute url)
console.log(link.getAttribute('href')); //-># (short url)

//Data attributes
//html:data-version-number="3.0" -> remove "-" in JS ->
console.log(logo.dataset.versionNumber); //->3.0

//Classes
logo.classList.add('c', 'j'); // add class to HTML
logo.classList.remove('c', 'j'); //remove class from HTML
logo.classList.toggle('c'); //remove class if it there or add class if it not there
logo.classList.contains('c'); //check if class is on the page (not like includes in js)

*/

/*
//Smooth scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  //get the coordinates of the element that we want to scroll
  const s1coords = section1.getBoundingClientRect();

  console.log('button:', e.target.getBoundingClientRect());
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
  console.log(
    'height/width viewpoint',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  console.log('s1coords top', s1coords.top);
  console.log('s1coords top', s1coords.left);

  //Variant 1 - we are at the top of the page
  //target coordinates: x = 0, y = 574
  //current scroll: x= 0, y = 0
  //scroll: x = 0, y = 574;

  //Variant 2 - we are already scroll the page
  //target coordinates: x = 0, y = 574
  //current scroll: x= 0, y = 150
  //scroll: x = 0, y = 424; -> in this case s1coords.top = 424, window.pageYOffset = 150

  //s1coords.top = сколько осталось прокрутить до нужного элемента
  //window.pageYOffset = сколько уже прокрутили

  //Basic scroll
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  //Nice smooth scroll - OLD WAY
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  //MODERN WAY
  section1.scrollIntoView({ behavior: 'smooth' });
});
*/
/*
//TYPES OF EVENTS AND EVENT HANDLERS
const h1 = document.querySelector('h1');
//наведение мышью на h1
const alertH1 = function (e) {
  alert('addEventListener: You a reading the heading :D');
};

h1.addEventListener('mouseenter', alertH1);

//Remove eventListener -liten event once (will be removed after 3 sec)
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

//Another way - OLD WAY
// h1.onmouseenter = function (e) {
//   alert('onmouseenter: You a reading the heading :D');
// };
*/

/*

// Event Propagation
//random color (rgb(225,225,225))
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

//.nav -> .nav__links -> .nav__link
//after click on .nav__link color will be changed in .nav__links and .nav too
//after click on .nav__links color will be changed in .nav too
document.querySelector('.nav__link').addEventListener('click', function (e) {
  //this keyword points to element that attached "document.querySelector('.nav__link')"
  this.style.backgroundColor = randomColor();
  //e.target = where the event (click) happened
  //e.currentTarget = where element is attached
  console.log('link', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  //Stop propagation
  //e.stopPropagation(); //change color only for this element (not a good idea)
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
});

*/

/*

//DOM TRAVERSING
const h1 = document.querySelector('h1');

//Going downwards: selecting child element
console.log(h1.querySelectorAll('.highlight')); //->NodeList(2) [span.highlight, span.highlight]
console.log(h1.childNodes); //->NodeList(9) [text, comment, text, span.highlight, text, br, text, span.highlight, text]
console.log(h1.children); //->HTMLCollection(3) [span.highlight, br, span.highlight]
console.log(h1.firstElementChild); //->span.highlight (first)
console.log(h1.lastElementChild); //->span.highlight (last)

//Going upwards: selecting parents element
console.log(h1.parentNode); //class 'header__title'
console.log(h1.parentElement); //in this case the same -> class 'header__title'

console.log(h1.closest('.header')); //return the first header
h1.closest('.header').style.background = 'var(--gradient-secondary)';

//Going sideways: siblings
console.log(h1.previousElementSibling); //previous element -> null
console.log(h1.nextElementSibling); //next element after h1 -> <h4>A simplier...</h4>

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children); //all childrens of parent element

//create an array od elements
[...h1.parentElement.children].forEach(function (e) {
  console.log(e);
});

*/
/*
//DOM CONTENT LOADED
//when html has been loaded and converted to a DOM tree
//it is not necessary because js will be readed after HTML
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built', e);
});

//load event (when html AND ALL EXTERNAL RESOURCES (images, css) will be loaded)
window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

//pop-up before page reloading
window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = ''; //default text, can't be changed
});
*/
