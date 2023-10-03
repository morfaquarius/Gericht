/*
Документация по работе в шаблоне:
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper с node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Pagination, Lazy, Autoplay } from 'swiper';
/*
Основные модули слайдера:
Navigation, Pagination, Autoplay,
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей с scss/libs/swiper.scss
//import "../../scss/libs/swiper.scss";
// Полный набор стилей с node_modules
 //import 'swiper/css';

// Инициализация слайдеров
function initSliders() {
  // Список слайдеров
  // Проверяем, есть ли слайдер на странице
	if (document.querySelector('.body-main-slider')) { // Указываем класс нужного слайдера
		// Создаем слайдер
		new Swiper('.body-main-slider', { // Указываем класс нужного слайдера
      // Подключаем модули слайдера
      // для конкретного случая
			modules: [Pagination, Lazy,Autoplay],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 30,
			// autoHeight: false,
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			loop: true,
			preloadImages: false,
			lazy:{
        loadPrevNext:true,
      },


			// Эффекты
			// effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},

			// Пагинация
			
			pagination: {
				el: '.body-main-slider__pagination',
				clickable: true,
			},
			

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "вліво/вправо"
      /*
			navigation: {
				prevEl: '.swiper-button-prev',
				nextEl: '.swiper-button-next',
			},
      */
			// Брейкпоинты
			breakpoints: {
				320: {
					autoHeight: true,
				},
				992: {
					autoHeight: false,
				},
				1070: {
					slidesPerView: 1,
					spaceBetween: 20,
				},
				1333: {
					slidesPerView: 1,
					spaceBetween: 16,
				},
			},

			// События
			on: {
        init: function () {
          const pagination = document.querySelectorAll('.body-main-slider__pagination .swiper-pagination-bullet');
          pagination.forEach((el,index) => {
            let num = index < 10 ? `0` : '';
            el.innerHTML = `${num}${index+1}`;
          });
        },
        breakpoint: function(swiper, info){
          !info.autoHeight ? document.querySelector('.body-main-slider__wrapper').style.height = 'auto': '';
          swiper.updateSize();
        }
			}
		});
	}
}
// Скролл на базе слайдера (по классу swiper scroll для оболочки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}


window.addEventListener("load", function (e) {
  // Запуск инициализации слайдеров
	initSliders();
  // Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
  //initSlidersScroll();
});
