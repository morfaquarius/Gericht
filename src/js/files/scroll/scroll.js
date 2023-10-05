// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile, getHash, menuClose } from "../functions.js";
import { flsModules } from "../../files/modules.js";
// Модуль прокручування до блоку
import { gotoBlock } from "./gotoblock.js";
// Переменная контроль добавления события window scroll.
let addWindowScrollEvent = false;

//====================================================================================================================================================================================================================================================================================================
// Плавна навігація по сторінці
export function pageNavigation() {
// data-goto – указать ID блока
// data-goto-header – учитывать header
// data-goto-top – недокрутить на указанный размер
// data-goto-speed – скорость (только если используется дополнительный плагин)
// Работаем при нажатии на пункт
	document.addEventListener("click", pageNavigationAction);
  // Если подключен scrollWatcher, подсвечиваем текущий пункт меню
	document.addEventListener("watcherCallback", pageNavigationAction);
	// Основна функція
	function pageNavigationAction(e) {  
		if (e.type === "click") {
			const targetElement = e.target;
			if (targetElement.closest('[data-goto]')) {
				const gotoLink = targetElement.closest('[data-goto]');
				const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : '';
				const noHeader = gotoLink.hasAttribute('data-goto-header') ? true : false;
				const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
				const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
				if (flsModules.fullpage) {
					const fullpageSection = document.querySelector(`${gotoLinkSelector}`).closest('[data-fp-section]');
					const fullpageSectionId = fullpageSection ? +fullpageSection.dataset.fpId : null;
					if (fullpageSectionId !== null) {
						flsModules.fullpage.switchingSection(fullpageSectionId);
						document.documentElement.classList.contains("menu-open") ? menuClose() : null;
					}
				} else {
					gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
				}
				e.preventDefault();
			}
		} else if (e.type === "watcherCallback" && e.detail) {
			const entry = e.detail.entry;
			const targetElement = entry.target;
			// Обробка пунктів навігації, якщо вказано значення navigator, підсвічуємо поточний пункт меню
			if (targetElement.dataset.watch === 'navigator') {
				const navigatorActiveItem = document.querySelector(`[data-goto]._navigator-active`);
				let navigatorCurrentItem;
				if (targetElement.id && document.querySelector(`[data-goto="#${targetElement.id}"]`)) {
					navigatorCurrentItem = document.querySelector(`[data-goto="#${targetElement.id}"]`);
				} else if (targetElement.classList.length) {
					for (let index = 0; index < targetElement.classList.length; index++) {
						const element = targetElement.classList[index];
						if (document.querySelector(`[data-goto=".${element}"]`)) {
							navigatorCurrentItem = document.querySelector(`[data-goto=".${element}"]`);
							break;
						}
					}
				}
				if (entry.isIntersecting) {
					// Видим объект
          // navigatorActiveItem ? navigatorActiveItem.classList.remove('_navigator-active') : null;
					navigatorCurrentItem ? navigatorCurrentItem.classList.add('_navigator-active') : null;
				} else {
					// Не бачимо об'єкт
					navigatorCurrentItem ? navigatorCurrentItem.classList.remove('_navigator-active') : null;
				}
			}
		}
	}
	// Прокручування по хешу
	if (getHash()) {
		let goToHash;
		if (document.querySelector(`#${getHash()}`)) {
			goToHash = `#${getHash()}`;
		} else if (document.querySelector(`.${getHash()}`)) {
			goToHash = `.${getHash()}`;
		}
		goToHash ? gotoBlock(goToHash, true, 500, 20) : null;
	}
}
// Работа с шапкой при скроле
export function headerScroll() {
	addWindowScrollEvent = true;
	const header = document.querySelector('header.header');
	const headerShow = header.hasAttribute('data-scroll-show');
	const headerShowTimer = header.dataset.scrollShow ? header.dataset.scrollShow : 500;
	const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
	let scrollDirection = 0;
	let timer;
	document.addEventListener("windowScroll", function (e) {
		const scrollTop = window.scrollY;
		clearTimeout(timer);
		if (scrollTop >= startPoint) {
			!header.classList.contains('_header-scroll') ? header.classList.add('_header-scroll') : null;
			if (headerShow) {
				if (scrollTop > scrollDirection) {
					// downscroll code
					header.classList.contains('_header-show') ? header.classList.remove('_header-show') : null;
				} else {
					// upscroll code
					!header.classList.contains('_header-show') ? header.classList.add('_header-show') : null;
				}
				timer = setTimeout(() => {
					!header.classList.contains('_header-show') ? header.classList.add('_header-show') : null;
				}, headerShowTimer);
			}
		} else {
			header.classList.contains('_header-scroll') ? header.classList.remove('_header-scroll') : null;
			if (headerShow) {
				header.classList.contains('_header-show') ? header.classList.remove('_header-show') : null;
			}
		}
		scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
	});
}
// Модуль анімація цифрового лічильника
export function digitsCounter() {
	// Обнулення
	if (document.querySelectorAll("[data-digits-counter]").length) {
		document.querySelectorAll("[data-digits-counter]").forEach(element => {
			element.dataset.digitsCounter = element.innerHTML;
			element.innerHTML = `0`;
		});
	}

	// Функція ініціалізації
	function digitsCountersInit(digitsCountersItems) {
		let digitsCounters = digitsCountersItems ? digitsCountersItems : document.querySelectorAll("[data-digits-counter]");
		if (digitsCounters.length) {
			digitsCounters.forEach(digitsCounter => {
				digitsCountersAnimate(digitsCounter);
			});
		}
	}
	// Функція анімації
	function digitsCountersAnimate(digitsCounter) {
		let startTimestamp = null;
		const duration = parseInt(digitsCounter.dataset.digitsCounterSpeed) ? parseInt(digitsCounter.dataset.digitsCounterSpeed) : 1000;
		const startValue = parseInt(digitsCounter.dataset.digitsCounter);
		const startPosition = 0;
		const step = (timestamp) => {
			if (!startTimestamp) startTimestamp = timestamp;
			const progress = Math.min((timestamp - startTimestamp) / duration, 1);
			digitsCounter.innerHTML = Math.floor(progress * (startPosition + startValue));
			if (progress < 1) {
				window.requestAnimationFrame(step);
			}
		};
		window.requestAnimationFrame(step);
	}
	function digitsCounterAction(e) {
		const entry = e.detail.entry;
		const targetElement = entry.target;
		if (targetElement.querySelectorAll("[data-digits-counter]").length) {
			digitsCountersInit(targetElement.querySelectorAll("[data-digits-counter]"));
		}
	}

	document.addEventListener("watcherCallback", digitsCounterAction);
}

export function bgParallax() {
	addWindowScrollEvent = true;
	const bgItems = document.querySelectorAll('[data-bg]');
	if (bgItems.length) {
		document.addEventListener("windowScroll", function (e) {
			bgItems.forEach(bgItem => {
				//let size = bgItem.dataset.bg ? Number(bgItem.dataset.bg) : 30;
				let bgItemPosition = bgItem.getBoundingClientRect().top + scrollY;
				let bgItemHeight = bgItem.offsetHeight;
				let bgItemBg = bgItem.querySelector('.bg-item');
				let bgItemScrollPrc = Math.abs((bgItem.getBoundingClientRect().top - window.innerHeight) / (bgItemHeight + window.innerHeight) * 100);
        let bgItemPositionValue = (bgItemHeight / 100 * 60) / 100 * bgItemScrollPrc;
				if (scrollY > bgItemPosition - window.innerHeight && scrollY < bgItemPosition + bgItemHeight) {
          bgItemBg.style.cssText = `transform: translate3D(0, ${bgItemPositionValue}px, 0) scale(0.99); transition: all 0.08s ease 0s;`;
				}
			});
		});
	}
}

// При подключении модуля обработчик события запустится автоматически
setTimeout(() => {
	if (addWindowScrollEvent) {
		let windowScroll = new Event("windowScroll");
		window.addEventListener("scroll", function (e) {
			document.dispatchEvent(windowScroll);
		});
	}
}, 0);

