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
            console.log(this);
            this.classList.add('more-splash'); //add animation, this. -
            // обращение к кнопке, которую нажали
            document.body.style.overflow = 'hidden'; //blocks page scrolling
        });

        close.addEventListener('click', () => {
            overlay.style.display = 'none';
            console.log(this);
            more.classList.remove('more-splash');
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
            inputs = document.getElementsByTagName('input'),
            feedbackForm = document.getElementById('form'),
            //переменная, которая будет принимать знач. message и выводить на страницу, чтобы оповестить пользователя, 
            statusMessage = document.createElement('div');

            statusMessage.classList.add('status');

        function sendForm(elem) {
            elem.addEventListener('submit', function(e) {
                e.preventDefault();
                elem.appendChild(statusMessage);

                let formData = new FormData(elem);
                console.log(formData);

                // Function postData
                function postData(data) {
                    return new Promise(function(resolve, reject) {
                        let request = new XMLHttpRequest();

                        request.open('POST', 'server.php');
                        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

                        request.onreadystatechange = function() {
                            if (request.readyState < 4) {
                                resolve();
                            } else if (request.readyState === 4) {
                                if (request.status == 200 && request.status < 300) {
                                    resolve();
                                } else {
                                    reject();
                                }
                            }
                        };

                        request.send(data);
                    });
                } //End postData

                function clearInputs() {
                    for (let i = 0; i < inputs.length; i++) {
                        inputs[i].value = '';
                    }
                }

                postData(formData)
                    .then(() => statusMessage.innerHTML = message.loading)
                    .then(() => statusMessage.innerHTML = message.success)
                    
                    .catch(() => statusMessage.innerHTML = message.failure)
                    .then(clearInputs);
            });
        }

        sendForm(form);
        sendForm(feedbackForm);

        /////////// Slider //////////////

        let slideIndex = 1, //Параметр текущего слайда
            slides = document.querySelectorAll('.slider-item'),
            prev = document.querySelector('.prev'),
            next = document.querySelector('.next'),
            dotsWrap = document.querySelector('.slider-dots'),
            dots = document.querySelectorAll('.dot');

        showSlides(slideIndex); //вызываем ф-ция до её декларации со slideIndex=1

        function showSlides(n) {// Ф-ция, которая скрывает все слайды на стр. и покажет тот, который нужен
            //Реализация перехода от последнего слайда к 1му и наоборот
            if (n > slides.length) {
                slideIndex = 1;
            }
            if (n < 1) {
                slideIndex = slides.length;
            }
            //
            slides.forEach((item) => item.style.display = 'none');
            // аналогично записи:
            // for (let i = 0; i < slides.length; i++) {
            //     slides[i].style.display('none');
            // }
            dots.forEach((item) => item.classList.remove('dot-active')); //делает все точки неактивными
            slides[slideIndex - 1].style.display = 'block'; //делаем видимым выбраный слайд
            dots[slideIndex - 1].classList.add('dot-active'); // делаем активной соответствующую точку
        }
        //Ф-ция, которая будет увеличивать п-р (n), номер текущего слайда
        function plusSlides(n) {
            showSlides(slideIndex += n);
        }
        // Ф-ция, которая определяет текущий слайд и устанавливает его
        function currentSlide(n) {
            showSlides(slideIndex = n);
        }
        // Вызываем ф-цию plusSlides со зн. -1 или +1 слайд от текущего по клику
        prev.addEventListener('click', () => plusSlides(-1));
        next.addEventListener('click', () => plusSlides(1));

        // Реализация перемещения по слайдам при клике на точку, с пом. делегирования
        dotsWrap.addEventListener('click', (event) => {
            for (let i = 0; i < dots.length + 1; i++) {//dots.length + 1, Чтобы цикл доходил до 4ой точки
                if (event.target.classList.contains('dot') && event.target == dots[i - 1]) { //dots[i - 1] Чтобы номер точки совпадал с номером слайда
                    currentSlide(i);
                }
            }
        });

        ///////// Calc //////////

        let persons = document.querySelectorAll('.counter-block-input')[0],
            restDays = document.querySelectorAll('.counter-block-input')[1],
            calcInputs = document.querySelectorAll('.counter-block-input'),
            place = document.getElementById('select'),
            totalValue = document.getElementById('total'),
            //Переменные, которые будут получать данные от пользователя:
            personsSum = 0,
            daySum = 0,
            total = 0;

            totalValue.textContent = 0;

            // В случае, если сумма расчитана, а знчение одного из инпутов удалено,
            // ф-ция выдаст " totalValue = 0"
            function checkValue() {
                calcInputs.forEach((item) => {
                    if (item.value == '' || item.value == null) {
                        totalValue.innerHTML = 0;
                    }
                });
            }

            persons.addEventListener('change', function() {//'change' - сработает после ввода значения
                //нельзя исп. arrFunc, потому что будет исп. контекст вызова (this)
                personsSum = +this.value;
                total = (daySum + personsSum)*4000;
                //условие, если restDays не заполнен, то сумма не будет меняться
                if(restDays.value == '') {
                    totalValue.innerHTML = 0;
                } else {
                    totalValue.innerHTML = total;
                }

                checkValue();
            });

            restDays.addEventListener('change', function() {
                daySum = +this.value;
                total = (daySum + personsSum)*4000;
                //условие, если restDays не заполнен, то сумма не будет меняться
                if(persons.value == '') {
                    totalValue.innerHTML = 0;
                } else {
                    totalValue.innerHTML = total;
                }

                checkValue();
            });

            // Расчёт к-нта place
            place.addEventListener('change', function() {
                if (restDays.value == '' || persons.value == '') {
                   totalValue.innerHTML = 0; 
                } else {
                    let a = total; //тех-кая перемнная, чтобы при повторном выборе селекта, total не умножался повторно!
                    totalValue.innerHTML = a * this.options[this.selectedIndex].value; //Значение value выбранного select-а
                }
            });

    });
        //Обрабочтик вешается не на отдельный submit button, а на ФОРМУ ЦЕЛИКОМ!!!
        // form.addEventListener('submit', function(event) {
        //     //Поведение браузера по дефолту: click on submit => restart page, чтобы этого не было:
        //     event.preventDefault();
        //     form.appendChild(statusMessage);

        //     let request = new XMLHttpRequest();

        //     // настройка запроса:
        //     request.open('POST', 'server.php');
        //     // Content будет содержать данные, полученные из формы
        //     // request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); //Отправка запроса в обычном формате
        //     // Для отправки в .JSON формате
        //     request.setRequestHeader('Content-type', 'appliction/json; charset=utf-8');

        //     //Получение данных, введённых плоьзователем ч-з объект FormData:
        //     //Чтобы полуить данные должна быть сформирована пара ключ-значение, 
        //     //а для этого в input-ах должен быть присвоен атрибут name
        //     let formData = new FormData(form);

        //     // Преобразование данны полученных из формы в .JSON формат:
        //     let obj = {};
        //     formData.forEach(function(value, key) {
        //         obj[key] = value; //Преобразование объекта formData в обычный читаемый объект
        //     });
        //     let json = JSON.stringify(obj); //метод .stringify преобразовывает объекты в .JSON формат


        //     request.send(json);

        //     request.addEventListener('readystatechange', () => {
        //         if (request.readyState < 4) { //пока статус запроса не done
        //             statusMessage.innerHTML = message.loading; //здесь можно выводить прогресс бар, анимации
        //         } else if (request.readyState === 4 && request.status == 200) {
        //             statusMessage.innerHTML = message.success;
        //         } else {
        //             statusMessage.innerHTML = message.failure;
        //         }
        //     });
        //     //Цикл для очистки input-ов после отправки формы
        //     for (let i = 0; i < input.length; i++) {
        //         input[i].value = '';
        //     }
        // });



