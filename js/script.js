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

    //Обработчик событий для показа таба при клике

    info.addEventListener('click', (event) => {
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

    let deadLine = '2020-08-1'; //КОНЕЧНАЯ ДАТА

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

            // Условие окончания отчсёта таймера и обнуления
            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }

    setClock('timer', deadLine); //Вызываем ф-цию с аргументом id #timer
    
    //////// Modal Window ///////////

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        descriptionBtns = document.querySelectorAll('.description-btn');

        more.addEventListener('click', () => {
            overlay.style.display = 'block'; //make .overlay visible
            this.classList.add('more-splash'); //add animation, this. -
            // обращение к кнопке, которую нажали
            document.body.style.overflow = 'hidden'; //blocks page scrolling
        });

        close.addEventListener('click', () => {
            overlay.style.display = 'none';
            this.classList.remove('more-splash');
            document.body.style.overflow = ''; //remowes overflow 'hidden'
        });

        descriptionBtns.forEach(function(item) {
            item.addEventListener('click', function() {
                overlay.style.display = 'block';
                this.classList.add('more-splash');
                document.body.style.overflow = 'hidden';
            });
        });

        //////// Form //////////

        //Создаём объект в котором будет информация о состоянии запроса
        let message = {
            loading: 'Загрузка...', //будет показываться польз., пока запрос не обработан
            success: 'Спасибо! Скоро мы с Вами свяжемся!',
            failure: 'Что-то пошло не так!'
        };

        let form = document.querySelector('.main-form'),
            input = form.getElementsByTagName('input'),
            //переменная, которая будет принимать знач. message и выводить на страницу, чтобы оповестить пользователя, 
            statusMessage = document.createElement('div');

            statusMessage.classList.add('status');
        //Обрабочтик вешается не на отдельный submit button, а на ФОРМУ ЦЕЛИКОМ!!!
        form.addEventListener('submit', function(event) {
            //Поведение браузера по дефолту: click on submit => restart page, чтобы этого не было:
            event.preventDefault();
            form.appendChild(statusMessage);

            let request = new XMLHttpRequest();

            // настройка запроса:
            request.open('POST', 'server.php');
            // Content будет содержать данные, полученные из формы
            // request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); //Отправка запроса в обычном формате
            // Для отправки в .JSON формате
            request.setRequestHeader('Content-type', 'appliction/json; charset=utf-8');

            //Получение данных, введённых плоьзователем ч-з объект FormData:
            //Чтобы полуить данные должна быть сформирована пара ключ-значение, 
            //а для этого в input-ах должен быть присвоен атрибут name
            let formData = new FormData(form);

            // Преобразование данны полученных из формы в .JSON формат:
            let obj = {};
            formData.forEach(function(value, key) {
                obj[key] = value; //Преобразование объекта formData в обычный читаемый объект
            });
            let json = JSON.stringify(obj); //метод .stringify преобразовывает объекты в .JSON формат


            request.send(json);

            request.addEventListener('readystatechange', () => {
                if (request.readyState < 4) { //пока статус запроса не done
                    statusMessage.innerHTML = message.loading; //здесь можно выводить прогресс бар, анимации
                } else if (request.readyState === 4 && request.status == 200) { 
                    statusMessage.innerHTML = message.success;
                } else {
                    statusMessage.innerHTML = message.failure;
                }
            });
            //Цикл для очистки input-ов после отправки формы
            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
        });

        ////////////////// Feedback Form ///////////

        let feedbackForm = document.getElementById('form'),
            feedbackInputs = feedbackForm.getElementsByTagName('input'),
            feedbackSubmit = feedbackForm.getElementsByTagName('button');

        feedbackForm.addEventListener('submit', function(event) {
            event.preventDefault();
            feedbackForm.appendChild(statusMessage);

            let request = new XMLHttpRequest();

            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            let formData = new FormData(form);

            request.send(formData);

            request.addEventListener('readystatechange', () => {
                if (request.readyState < 4) {
                    statusMessage.innerHTML = message.loading;
                } else if (request.readyState === 4 && request.status == 200) {
                    statusMessage.innerHTML = message.success;
                } else {
                    statusMessage.innerHTML = message.failure;
                }
            });

            //Цикл для очистки input-ов после отправки формы
            for (let i = 0; i < feedbackInputs.length; i++) {
                feedbackInputs[i].value = '';
            }

        });


});

