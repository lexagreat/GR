(function isWebP() {
   function testWebP(callback) {
      let webP = new Image();
      webP.onload = webP.onerror = function () {
         callback(webP.height == 2);
      };
      webP.src =
         "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
   }
   testWebP(function (support) {
      if (support == true) {
         document.querySelector("html").classList.add("webp");
      } else {
         document.querySelector("html").classList.add("no-webp");
      }
   });
})();

const body = document.querySelector("body");
const burger = document.querySelector(".header__burger");
const menu = document.querySelector(".header-menu");
// const backdrop = document.querySelector(".backdrop");
const closeBtn = document.querySelector(".header-menu__close");

function headerWork() {
   if (burger) {
      burger.addEventListener("click", () => {
         openBurger();
      });
      closeBtn.addEventListener("click", () => {
         closeBurger();
      });
   }
   function openBurger() {
      burger.classList.add("active");
      menu.classList.add("active");
      //   backdrop.classList.add("active");
      body.classList.add("lock");
   }
   function closeBurger() {
      burger.classList.remove("active");
      menu.classList.remove("active");
      //   backdrop.classList.remove("active");
      body.classList.remove("lock");
   }
}

document.addEventListener("DOMContentLoaded", () => {
   // header
   headerWork();
   // article
   articlePageNavigation();

   // about
   controlsExampleVideo();

   // portfolio
   accordion(".faq-item__header", ".faq-item__spoiler");
});

// Popup
const popupLinks = document.querySelectorAll(".modal__link");
const lockPadding = document.querySelectorAll(".lock-padding");
const popupCloseIcon = document.querySelectorAll(".modal__close");

let unlock = true;

const timeout = 500;

if (popupLinks.length > 0) {
   for (let index = 0; index < popupLinks.length; index++) {
      const popupLink = popupLinks[index];
      popupLink.addEventListener("click", function (e) {
         const popupName = popupLink.getAttribute("href").replace("#", "");
         const curentPopup = document.getElementById(popupName);
         popupOpen(curentPopup);
         e.preventDefault();
      });
   }
}

if (popupCloseIcon.length > 0) {
   for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener("click", function (e) {
         popupClose(el.closest(".modal"));
         e.preventDefault();
      });
   }
}

function popupOpen(curentPopup) {
   if (curentPopup && unlock) {
      const popupActive = document.querySelector(".modal.open");
      if (popupActive) {
         popupClose(popupActive, false);
      } else {
         bodyLock();
      }
      curentPopup.classList.add("open");
      curentPopup.addEventListener("click", function (e) {
         if (!e.target.closest(".modal__content")) {
            popupClose(e.target.closest(".modal"));
         }
      });
   }
}

function popupClose(popupActive, doUnlock = true) {
   if (unlock) {
      popupActive.classList.remove("open");
      if (doUnlock) {
         bodyUnLock();
      }
   }
}

function bodyLock() {
   const lockPaddingValue =
      window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";

   if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
         const el = lockPadding[index];
         el.style.paddingRight = lockPaddingValue;
      }
   }
   body.style.paddingRight = lockPaddingValue;
   body.classList.add("lock");

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

function bodyUnLock() {
   setTimeout(function () {
      if (lockPadding.length > 0) {
         for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = "0px";
         }
      }
      body.style.paddingRight = "0px";
      body.classList.remove("lock");
   }, timeout);

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

document.addEventListener("keydown", function (e) {
   if (e.which === 27) {
      const popupActive = document.querySelector(".modal.open");
      popupClose(popupActive);
   }
});

//swipers
document.addEventListener("DOMContentLoaded", () => {
   const portfolioSwiper = new Swiper(".portfolio-hero__swiper", {
      slidesPerView: 2,
      spaceBetween: 6,

      navigation: {
         nextEl: ".portfolio-hero__nav_next",
         prevEl: ".portfolio-hero__nav_prev",
      },
      breakpoints: {
         993: {
            spaceBetween: 36,
            slidesPerView: 3,
         },
      },
   });
   const mainHeroSwiper = new Swiper(".hero__swiper", {
      spaceBetween: 20,
      // grabCursor: true,
      a11y: false,
      freeMode: false,
      speed: 11000,
      loop: true,
      slidesPerView: "auto",
      allowTouchMove: false,
      autoplay: {
         delay: 0.5,
         disableOnInteraction: false,
      },
   });

   const tabsSwiper = new Swiper(".swiper-tabs__container", {
      freeMode: true,
      spaceBetween: 10,
      slidesPerView: "auto",
      navigation: {
         nextEl: ".swiper-tabs__btn-next",
      },
      breakpoints: {
         769: {
            spaceBetween: 10,
            enabled: true,
         },

         375: {
            spaceBetween: 0,
            enabled: false,
         },
      },
   });

   const commandSwiper = new Swiper(".command__swiper", {
      slidesPerView: 4,
      spaceBetween: 24,
      navigation: {
         nextEl: ".command__pagination-next",
         prevEl: ".command__pagination-prev",
      },
      breakpoints: {
         1200: {
            slidesPerView: 4,
         },

         768: {
            slidesPerView: 3,
         },

         375: {
            slidesPerView: 2.2,
         },
      },
   });

   const clientsSwiper = new Swiper(".clients__swiper", {
      slidesPerView: 2.75,
      spaceBetween: 24,
      navigation: {
         nextEl: ".clients__nav-next",
         prevEl: ".clients__nav-prev",
      },
      pagination: {
         el: ".clients__nav-pagination",
      },
      breakpoints: {
         1200: {
            slidesPerView: 2.75,
         },

         768: {
            slidesPerView: 2,
         },

         375: {
            slidesPerView: 1,
         },
      },
   });
   const developmentSwiper = new Swiper(".development-portfolio__slider", {
      slidesPerView: "auto",
      loop: true,
      speed: 1000,
      spaceBetween: 36,
      navigation: {
         nextEl: ".development-portfolio__nav_next",
         prevEl: ".development-portfolio__nav_prev",
      },
   });
   const avitoTeamSlider = new Swiper(".avito-team__slider", {
      slidesPerView: "auto",
      spaceBetween: 13,
      navigation: {
         nextEl: ".avito-team__nav_next",
         prevEl: ".avito-team__nav_prev",
      },
      breakpoints: {
         993: {
            slidesPerView: 3,
         },
      },
   });
   const avitoGraphSlider = new Swiper(".avito-graph__swiper", {
      slidesPerView: "auto",
      spaceBetween: 13,
      navigation: {
         nextEl: ".portfolio-hero__nav_next",
         prevEl: ".portfolio-hero__nav_prev",
      },
   });
   const cardsSwiper = new Swiper(".cards__swiper", {
      slidesPerView: 1,
      allowTouchMove: false,
   });

   const servicesTabs = document.getElementsByClassName("swiper__tab");
   const serviceTabsSlides =
      document.getElementById("service-swiper")?.children;

   const servicesTabsAttrs = [];

   for (let tab of servicesTabs) {
      tab.addEventListener("click", (event) => {
         if (!tab.classList.contains("tab-active")) {
            for (let item of servicesTabs) {
               if (item.classList.contains("tab-active")) {
                  item.classList.remove("tab-active");
               }
            }
            tab.classList.add("tab-active");
            cardsSwiper.slideTo(tab.dataset.tabId - 1);
         }
      });
   }

   // console.log(servicesTabsAttrs);
});

// mask
const maskOptions = {
   mask: "+{7} (000) 000-00-00",
};
const phoneInputs = document.querySelectorAll("#phoneInput");
if (phoneInputs.length) {
   phoneInputs.forEach((item) => {
      const mask = IMask(item, maskOptions);
   });
}

//article page

function articlePageNavigation() {
   const links = document.querySelectorAll(".article-navigation__item");
   const sections = document.querySelectorAll(".article-section");
   if (!links.length) {
      return;
   }
   links.forEach((link) => {
      link.addEventListener("click", () => {
         let id = link.getAttribute("data-scroll");
         // link.classList.add("active");
         sections.forEach((section) => {
            if (section.getAttribute("data-scroll") === id) {
               window.scrollBy({
                  top: section.getBoundingClientRect().top,
                  behavior: "smooth",
               });
            }
         });
      });
   });

   const callback = (entries, observer) => {
      entries.forEach((entry) => {
         console.log(entry);
         if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
            let section = entry.target?.nextElementSibling;
            if (!section || !section.getAttribute("data-scroll")) {
               return;
            }
            let id = section.getAttribute("data-scroll");
            links.forEach((link) => {
               link.classList.remove("active");
               if (link.getAttribute("data-scroll") === id) {
                  link.classList.add("active");
               }
            });
         } else {
            if (entry.boundingClientRect.top < 0) {
               console.log(entry);
               let section = entry.target;
               if (!section || !section.getAttribute("data-scroll")) {
                  return;
               }
               let id = section.getAttribute("data-scroll");
               links.forEach((link) => {
                  link.classList.remove("active");
                  if (link.getAttribute("data-scroll") === id) {
                     link.classList.add("active");
                  }
               });
            }
         }
      });
   };

   const options = {
      // root: по умолчанию window, но можно задать любой элемент-контейнер
      rootMargin: "0px 0px 75px 0px",
      threshold: 0,
   };

   const observer = new IntersectionObserver(callback, options);

   sections.forEach((section) => observer.observe(section));
}

function controlsExampleVideo() {
   const controls = document.querySelector(".example-controls");
   const video = document.querySelector(".about-example__video video");
   if (!controls) {
      return;
   }
   controls.addEventListener("click", (e) => {
      console.log(e.target);
      if (e.target.closest(".example-controls__play")) {
         video.play();
      }
   });
}
function accordion(linkSelector, contentSelector) {
   // получаем линки
   const openLinks = document.querySelectorAll(`${linkSelector}`);
   // контенты
   const contents = document.querySelectorAll(`${contentSelector}`);

   if (!openLinks.length) {
      return;
   }
   openLinks.forEach((link, i) => {
      link.addEventListener("click", () => {
         if (contents[i].classList.contains("collapsing")) {
            return;
         }
         slideToggle(contents[i]);
         link.classList.toggle("active");
      });
   });
}

function slideShow(el, duration = 300) {
   // завершаем работу метода, если элемент содержит класс collapsing или collapse_show
   if (
      el.classList.contains("collapsing") ||
      el.classList.contains("collapse_show")
   ) {
      return;
   }
   // удаляем класс collapse
   el.classList.remove("collapse");
   // сохраняем текущую высоту элемента в константу height (это значение понадобится ниже)
   const height = el.offsetHeight;
   // устанавливаем высоте значение 0
   el.style["height"] = 0;
   // не отображаем содержимое элемента, выходящее за его пределы
   el.style["overflow"] = "hidden";
   // создание анимации скольжения с помощью CSS свойства transition
   el.style["transition"] = `height ${duration}ms ease`;
   // добавляем класс collapsing
   el.classList.add("collapsing");
   // получим значение высоты (нам этого необходимо для того, чтобы просто заставить браузер выполнить перерасчет макета, т.к. он не сможет нам вернуть правильное значение высоты, если не сделает это)
   el.offsetHeight;
   // установим в качестве значения высоты значение, которое мы сохранили в константу height
   el.style["height"] = `${height}px`;
   // по истечении времени анимации this._duration
   window.setTimeout(() => {
      // удалим класс collapsing
      el.classList.remove("collapsing");
      // добавим классы collapse и collapse_show
      el.classList.add("collapse");
      el.classList.add("collapse_show");
      // удалим свойства height, transition и overflow
      el.style["height"] = "";
      el.style["transition"] = "";
      el.style["overflow"] = "";
   }, duration);
}
function slideHide(el, duration = 300) {
   // завершаем работу метода, если элемент содержит класс collapsing или collapse_show
   if (
      el.classList.contains("collapsing") ||
      !el.classList.contains("collapse_show")
   ) {
      return;
   }
   // установим свойству height текущее значение высоты элемента
   el.style["height"] = `${el.offsetHeight}px`;
   // получим значение высоты
   el.offsetHeight;
   // установим CSS свойству height значение 0
   el.style["height"] = 0;
   // обрежем содержимое, выходящее за границы элемента
   el.style["overflow"] = "hidden";
   // добавим CSS свойство transition для осуществления перехода длительностью this._duration
   el.style["transition"] = `height ${duration}ms ease`;
   // удалим классы collapse и collapse_show
   el.classList.remove("collapse");
   el.classList.remove("collapse_show");
   // добавим класс collapsing
   el.classList.add("collapsing");
   // после завершения времени анимации
   window.setTimeout(() => {
      // удалим класс collapsing
      el.classList.remove("collapsing");
      // добавим класс collapsing
      el.classList.add("collapse");
      // удалим свойства height, transition и overflow
      el.style["height"] = "";
      el.style["transition"] = "";
      el.style["overflow"] = "";
   }, duration);
}
function slideToggle(el, duration = 300) {
   el.classList.contains("collapse_show")
      ? slideHide(el, duration)
      : slideShow(el, duration);
}
