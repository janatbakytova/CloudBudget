document.addEventListener('DOMContentLoaded', () => {

    // язык для видео
    videojs(document.querySelector('.video-js'), {
        language: 'ru'
    });

    // маска для телефона и валидация
    const selector = document.querySelectorAll('input[type="tel"]');
    const im = new Inputmask('+7 (999) 999-99-99');
    im.mask(selector);

    let validateForms = function (selector, rules, successModal, yaGoal) {
        new window.JustValidate(selector, {
            rules: rules,
            submitHandler: function (form) {
                let formData = new FormData(form);

                let xhr = new XMLHttpRequest();

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            console.log('Отправлено');

                            document.querySelector('.thanks-popup').classList.add('thanks-popup--visible');
                            document.querySelector('.thanks-popup__overlay').classList.add('thanks-popup__overlay--visible');

                            setTimeout(function () {
                                document.querySelector('.thanks-popup').classList.remove('thanks-popup--visible');
                                document.querySelector('.thanks-popup__overlay').classList.remove('thanks-popup__overlay--visible');
                            }, 5000);
                        }
                    }
                };

                xhr.open('POST', 'mail.php', true);
                xhr.send(formData);

                form.reset();

            }
        });
    };

    validateForms('.contacts__form', { name: { required: true, minLength: 3, maxLength: 15 }, tel: { required: true }, }, '.thanks-popup', 'send goal');

    validateForms('.modal__form--login', { email: { required: true, email: true }, password: { required: true, minLength: 4, maxLength: 8 } }, '.thanks-popup', 'send goal');

    validateForms('.modal__form--signup', { email: { required: true, email: true }, name: { required: true, minLength: 3, maxLength: 15 }, password: { required: true, minLength: 4, maxLength: 8 } }, '.thanks-popup', 'send goal');

    // меню
    const navElements = document.querySelectorAll('.nav__link');
    const nav = document.querySelector('.header__nav');
    const burger = document.querySelector('.header__burger');
    const close = document.querySelector('.header__close');

    for (const navElement of navElements) {
        navElement.addEventListener('click', function (e) {
            e.preventDefault();
            nav.classList.remove('header__nav__open');
            const href = navElement.getAttribute('href');

            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    };

    burger.addEventListener('click', function (e) {
        e.preventDefault();
        nav.classList.add('header__nav__open');
    });

    close.addEventListener('click', function (e) {
        e.preventDefault();
        nav.classList.remove('header__nav__open');
    });

    // отключение скролла
    const body = document.body;

    function disableScroll() {
        let pagePosition = window.scrollY;
        body.dataset.position = pagePosition;
        body.classList.add('disable-scroll');
        body.style.top = -pagePosition + 'px';
    };

    function enableScroll() {
        let pagePosition = parseInt(body.dataset.position);
        body.style.top = auto;
        body.classList.remove('disable-scroll');
        window.scroll({ top: pagePosition, left: 0 });
        body.removeAttribute('data-position');
    };

    // модальные окна
    const btns = document.querySelectorAll('.btn');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modals = document.querySelectorAll('.modal');

    btns.forEach((el) => {
        el.addEventListener('click', (e) => {
            let path = e.currentTarget.getAttribute('data-path');

            modals.forEach((el) => {
                el.classList.remove('modal--visible');
            });
            document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
            modalOverlay.classList.add('modal-overlay--visible');
            nav.classList.remove('header__nav__open');
            disableScroll();
        });
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target == modalOverlay) {
            modalOverlay.classList.remove('modal-overlay--visible');
            modals.forEach((el) => {
                el.classList.remove('modal--visible');
            });
            enableScroll();
        }
    });



});