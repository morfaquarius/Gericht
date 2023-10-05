// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile, menuClose, getHash, FLS } from "../functions.js";
// Підключення доповнення для збільшення можливостей
// Документація: https://github.com/cferdinandi/smooth-scroll
// import SmoothScroll from 'smooth-scroll';
//==============================================================================================================================================================================================================================================================================================================================

// Модуль плавной проктутки к блоку
export let gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
  const targetBlockElement = document.querySelector(targetBlock);
  if (targetBlockElement) {
    let headerItem = '';
    let headerItemHeight = 0;
    if (noHeader) {
      headerItem = 'header.header';
      const headerElement = document.querySelector(headerItem);
      if (!headerElement.classList.contains('_header-scroll')) {
        headerElement.style.cssText = `transition-duration: 0s;`;
        headerElement.classList.add('_header-scroll');
        headerItemHeight = headerElement.offsetHeight;
        headerElement.classList.remove('_header-scroll');
        setTimeout(() => {
          headerElement.style.cssText = ``;
        }, 0);
      } else {
        headerItemHeight = headerElement.offsetHeight;
      }
    }

    let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
    targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
    targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;

    const startTime = performance.now();
    const duration = speed;

    function scrollToPosition(currentTime) {
      const elapsedTime = currentTime - startTime;
      const ease = easeOutQuad(elapsedTime, 0, 1, duration);
      window.scrollTo(0, targetBlockElementPosition * ease);
      if (elapsedTime < duration) {
        requestAnimationFrame(scrollToPosition);
      }
    }

    function easeOutQuad(t, b, c, d) {
      t /= d;
      return -c * t * (t - 2) + b;
    }

    requestAnimationFrame(scrollToPosition);
  } else {
    FLS(`[gotoBlock]: Йой... Такого блока нет на странице: ${targetBlock}`);
  }
};