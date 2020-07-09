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

    // TIMER

    let deadLine = '2020-07-21'; //КОНЕЧНАЯ ДАТА

    // Фун-ция определяюща остаток времени
    function getTimeRemaining(endTime) {
        let t = Date.parse(endTime) - Date.parse(new Date()), // переменная с разницей между конечной и текущей датой
            seconds = Math.floor((t/1000) % 60), //получение остатка секунд
            mins = Math.floor((t/1000/60) % 60), //получение остатка минут
            hours = Math.floor(t/(1000 * 60 * 60));
            // hours = Math.floor((t/1000/60/60) % 24) // количество оставшихся дней
            // days = Math.floor(t/(1000*60*60*24)) // количество оставшихся дней

        // Вернуть из функции сразу несколько переменных мы просто так не можем
        return { //Экспортируем объект
            'total' : t,
            'hours' : hours,
            'mins' : mins,
            'seconds' : seconds
        };
    }

    // Ф-ция динамически отсчитывающая время
    function setClock(id, endTime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'), //док-нт из блока timer.
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        // Ф-ция, которая будет обновлять ф-цию setClock каждую секунду
        function updateClock() {
            let t = getTimeRemaining(endTime);

            // Ф-ция добавляющая "0", если значение времени меньше 10

            function addZero(num) {
                if (num <= 9) {
                    return '0' + num;
                } else {
                    return num;
                }
            }

            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.mins);
            seconds.textContent = addZero(t.seconds);

            // Условие окончания отчсёта таймера
            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }

    setClock('timer', deadLine); //Вызываем ф-цию с аргументом id #timer
});

