// window.addEventListener('load');
//ГЛОБАЛЬНЫЙ ОБРАБОТЧИК СОБЫТИЙ НА ВСЮ СТРАНИЦУ
//('load') - СКРИПТ НАЧНЁТ ВЫПОЛНЯТЬСЯ ПОСЛЕ ЗАГРУЗКИ ВСЕХ ЭЛЕМЕНТОВ НА СТРАНИЦЕ
//  (КАРТИНОК, ВИДЕО И ТД) - НЕ БРО!

// window.addEventListener('DOMContentLoaded');
//('DOMContentLoaded') - СКРИПТ НАЧНЁТ ВЫПОЛНЯТЬСЯ ПОСЛЕ ЗАГРУЗКИ DOM-структуры
// сайта(тегов, подтегов и пр.) и скрипт может начинать работать - БРО!

window.addEventListener('DOMContentLoaded', function() {
'use strict'; //Перевод в строгий режим

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    //Функция для добавления и удаления стиля (чтобы на экране скрыть табы)
    function hideTabContent(a) { // (a) - техническая переменная
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1); //а = 1, скрыть все Табы кроме первого

    //Функция для того, чтобы показать нужный ТАБ
    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    //Обработчик событий для показа тамба при клике

    info.addEventListener('click', function(event) {
        let target = event.target;
        
    // Если произошёл "клик" и кликнутый эл-нт содержит класс 'info-header-tab'
        if (target && target.classList.contains('info-header-tab')) {
    // Перебираем ТАБы и проверяем является ли он "кликнутым"
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0); // скрыть все ТАБы
                    showTabContent(i); // добавить к кликнутому класс "show"
                    break;
                }
            }
        }
    });
});

