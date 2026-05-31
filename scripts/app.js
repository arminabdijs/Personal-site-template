let $ = document;

// Caches frequently used DOM elements to improve performance and code readability.
// querySelector: Caches the first element matching the selector.
// querySelectorAll: Caches all elements matching the selector.
function _querySelector(queryName) {
  return $.querySelector(queryName);
}

function _querySelectorAll(queryName) {
  return $.querySelectorAll(queryName);
}

const navToggle = _querySelector('.nav__toggle-icon');
const menuToggle = _querySelector('.menu');
const coverToggle = _querySelector('.cover');
const resumeListItems = _querySelectorAll('.resume-list__item');
const portfolioListItems = _querySelectorAll('.portfolio-list__item');
const menuItems = _querySelectorAll('.menu__item');
const changeTheme = _querySelector('.change__theme');
const sections = _querySelectorAll('main > section');

const darkThemeIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M7 12c0 2.8 2.2 5 5 5s5-2.2 5-5-2.2-5-5-5S7 9.2 7 12zM12 9c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3S10.3 9 12 9zM13 5V3c0-.6-.4-1-1-1s-1 .4-1 1v2c0 .6.4 1 1 1S13 5.6 13 5zM19.1 4.9c-.4-.4-1-.4-1.4 0l-1.4 1.4c-.4.4-.4 1 0 1.4.2.2.5.3.7.3s.5-.1.7-.3l1.4-1.4C19.5 6 19.5 5.3 19.1 4.9zM21 11h-2c-.6 0-1 .4-1 1s.4 1 1 1h2c.6 0 1-.4 1-1S21.6 11 21 11zM17.7 16.2c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l1.4 1.4c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L17.7 16.2zM11 19v2c0 .6.4 1 1 1s1-.4 1-1v-2c0-.6-.4-1-1-1S11 18.4 11 19zM4.9 19.1c.2.2.5.3.7.3s.5-.1.7-.3l1.4-1.4c.4-.4.4-1 0-1.4s-1-.4-1.4 0l-1.4 1.4C4.5 18 4.5 18.7 4.9 19.1zM2 12c0 .6.4 1 1 1h2c.6 0 1-.4 1-1s-.4-1-1-1H3C2.4 11 2 11.4 2 12zM6.3 4.9c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l1.4 1.4C6.5 8 6.8 8.1 7.1 8.1S7.6 8 7.8 7.8c.4-.4.4-1 0-1.4L6.3 4.9z"/>
                        </svg>`;
const lightThemeIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12.3,4.9c0.4-0.2,0.6-0.7,0.5-1.1S12.2,3,11.7,3C6.8,3.1,3,7.1,3,12c0,5,4,9,9,9c3.8,0,7.1-2.4,8.4-5.9c0.2-0.4,0-0.9-0.4-1.2c-0.4-0.3-0.9-0.2-1.2,0.1c-1,0.9-2.3,1.4-3.7,1.4c-3.1,0-5.7-2.5-5.7-5.7C9.4,7.8,10.5,5.9,12.3,4.9zM15.1,17.4c0.5,0,1,0,1.4-0.1C15.3,18.4,13.7,19,12,19c-3.9,0-7-3.1-7-7c0-2.5,1.4-4.8,3.5-6c-0.7,1.1-1,2.4-1,3.8C7.4,14,10.9,17.4,15.1,17.4z"/>
                    </svg>`;

// function for remove class in tag
function removeActiveClass(className) {
  _querySelector(`.${className}`).classList.remove(className);
}

//function use remove class function and add class in tag
function navigationTabInit(listItems, listItemActiveClass, contentItemShowClass) {
  listItems.forEach((listItem) => {
    listItem.addEventListener('click', function () {
      removeActiveClass(listItemActiveClass);
      removeActiveClass(contentItemShowClass);

      this.classList.add(listItemActiveClass);

      let contentId = this.getAttribute('data-content-id');
      _querySelector(contentId).classList.add(contentItemShowClass);
    });
  });
}

//function active Menu Phone
function activeMenuPhone() {
  this.classList.toggle('nav__toggle-icon--open');
  menuToggle.classList.toggle('menu--open');
  coverToggle.classList.toggle('cover--show');
}

//function changeTheme and save theme in localStorage
function changeThemeHandler(e) {
  e.preventDefault();
  $.documentElement.classList.toggle('dark-theme');

  if ($.documentElement.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark-theme');
    this.innerHTML = darkThemeIcon;
  } else {
    localStorage.setItem('theme', 'light-theme');
    this.innerHTML = lightThemeIcon;
  }
}

// active link header Handler and scroll on section

// event Listener

navigationTabInit(portfolioListItems, 'portfolio-list__item--active', 'portfolio-content--show');
navigationTabInit(resumeListItems, 'resume-list__item--active', 'resume-content--show');

navToggle.addEventListener('click', activeMenuPhone);

changeTheme.addEventListener('click', changeThemeHandler);

menuItems.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    removeActiveClass('menu__item--active');

    if (_querySelector('.menu--open')) {
      removeActiveClass('menu--open');
      removeActiveClass('nav__toggle-icon--open');
      removeActiveClass('cover--show');
    }

    item.classList.add('menu__item--active');

    let sectionClass = item.getAttribute('data-section');
    let sectionOffsetTop = _querySelector(`.${sectionClass}`).offsetTop;

    window.scrollTo({
      top: sectionOffsetTop - 130,
      behavior: 'smooth',
    });
  });
});

// refresh page check theme
window.onload = () => {
  let localStorageTheme = localStorage.getItem('theme');

  if (localStorageTheme === 'dark-theme') {
    $.documentElement.classList.toggle('dark-theme');
    changeTheme.innerHTML = darkThemeIcon;
  }
};

//observer scroll page
const observer = new IntersectionObserver(observerHandler, { threshold: 0.3 });

function observerHandler(allSections) {
  allSections.map((sec) => {
    if (sec.isIntersecting) {
      let sectionClassName = sec.target.className;
      removeActiveClass('menu__item--active');
      _querySelector(`.menu__item[data-section=${sectionClassName}]`).classList.add(
        'menu__item--active',
      );
    }
  });
}

sections.forEach((section) => {
  observer.observe(section);
});

//Swiper
new Swiper('.swiper', {
  speed: 600,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 3,
  },

  spaceBetween: 30,
  slidesPerView: 1,

  breakpoints: {
    768: { slidesPerView: 2 },
    1200: { slidesPerView: 3 },
  },
});
