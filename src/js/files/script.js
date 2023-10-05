// Подключение функционала "Чертоги Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей 
import { flsModules } from "./modules.js";

window.addEventListener("load", function (e) {
  const bgItems = document.querySelectorAll('[data-bg]');
  if (bgItems.length) {
    bgItems.forEach(bgItem => {
      const divElement = document.createElement("div");
      divElement.className = "bg-item";
      bgItem.appendChild(divElement);
    });
  }
});