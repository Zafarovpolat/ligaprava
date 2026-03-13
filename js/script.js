document.addEventListener('DOMContentLoaded', function() {
    // Сразу блокируем видимость основного контента
    const mainContent = document.getElementById('mainContent');
    if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.visibility = 'hidden';
    }

    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    initLottieOnFirstVisit();
    initMobileMenu();
    initHeroAnimations();
    initPageTransitions();
    initCookieBanner();
});

// Lottie анимация один раз в сессии
function initLottieOnFirstVisit() {
    const lottieOverlay = document.getElementById('lottieOverlay');
    const lottieContainer = document.getElementById('lottieAnimation');
    const mainContent = document.getElementById('mainContent');

    // Проверяем, была ли уже показана анимация в этой сессии
    const hasSeenAnimation = sessionStorage.getItem('hasSeenLottie');
    
    if (hasSeenAnimation) {
        console.log('Lottie анимация уже была показана в этой сессии, пропускаем');
        if (lottieOverlay) lottieOverlay.style.display = 'none';
        if (mainContent) {
            mainContent.style.visibility = 'visible';
            mainContent.style.opacity = '1';
            mainContent.classList.add('loaded');
        }
        
        if (document.querySelector('.hero__text-block')) {
            setTimeout(() => startTextAnimations(), 300);
            setTimeout(() => animateHeroTextOut(), 3000);
        }
        return;
    }

    // === ГАРАНТИЯ что оверлей полностью перекрывает экран ===
    if (lottieOverlay) {
        lottieOverlay.style.position = 'fixed';
        lottieOverlay.style.top = '0';
        lottieOverlay.style.left = '0';
        lottieOverlay.style.width = '100vw';
        lottieOverlay.style.height = '100vh';
        lottieOverlay.style.backgroundColor = '#FFFFFF';
        lottieOverlay.style.zIndex = '9999';
        lottieOverlay.style.opacity = '1';
        lottieOverlay.style.visibility = 'visible';
        lottieOverlay.style.display = 'flex';
    }

    if (lottieOverlay && lottieContainer && typeof lottie !== 'undefined') {
        console.log('Запуск Lottie анимации (первый раз в сессии)');

        // Определяем, является ли устройство мобильным
        const isMobile = window.innerWidth <= 700;
        
        // Выбираем анимацию в зависимости от устройства
        const animationPath = isMobile 
            ? 'js/animation/liga-pad.json' 
            : 'js/animation/Flow 8.json';
        
        const animationName = isMobile ? 'liga-pad.json' : 'Flow 8.json';

        console.log('📱 Размер окна:', window.innerWidth, 'px');
        console.log('🎬 Загружена анимация:', animationName, isMobile ? '(МОБИЛЬНАЯ)' : '(ДЕСКТОП)');

        // Очищаем контейнер перед загрузкой новой анимации
        lottieContainer.innerHTML = '';
        lottieContainer.style.opacity = '0';

        const animation = lottie.loadAnimation({
            container: lottieContainer,
            renderer: 'svg', // Всегда используем SVG для лучшего качества и плавности
            loop: false,
            autoplay: true,
            path: animationPath
        });

        // Плавное появление контейнера анимации после загрузки DOM анимации
        animation.addEventListener('DOMLoaded', function() {
            console.log('✅ Анимация успешно загружена:', animationName);
            lottieContainer.style.opacity = '1';
        });

        let finished = false;

        function finishLottie() {
            if (finished) return;
            finished = true;

            console.log('Lottie завершена, показываем контент');
            
            // Сохраняем информацию, что анимация была показана в этой сессии
            sessionStorage.setItem('hasSeenLottie', 'true');

            // Показываем контент сразу (он будет под overlay)
            if (mainContent) {
                mainContent.style.visibility = 'visible';
                mainContent.style.opacity = '1';
                mainContent.classList.add('loaded');
            }

            // Исчезает overlay поверх контента одновременно
            lottieOverlay.classList.add('hidden');

            // Убираем overlay после завершения анимации
            setTimeout(() => {
                lottieOverlay.style.display = 'none';

                // Анимации hero
                if (document.querySelector('.hero__text-block')) {
                    setTimeout(() => startTextAnimations(), 300);
                    setTimeout(() => animateHeroTextOut(), 3000);
                }
            }, 600);
        }

        animation.addEventListener('complete', finishLottie);

        // Резерв — если зависла
        setTimeout(() => {
            if (!finished) {
                console.warn('Lottie зависла, принудительное завершение');
                finishLottie();
            }
        }, 15000);
    } else {
        // Если Lottie недоступен, показываем контент сразу
        console.log('Lottie недоступен, показываем контент сразу');
        // Сохраняем флаг, чтобы не пытаться показывать анимацию в следующий раз в этой сессии
        sessionStorage.setItem('hasSeenLottie', 'true');
        if (lottieOverlay) lottieOverlay.style.display = 'none';
        if (mainContent) {
            mainContent.style.visibility = 'visible';
            mainContent.style.opacity = '1';
            mainContent.classList.add('loaded');
        }
        
        if (document.querySelector('.hero__text-block')) {
            setTimeout(() => startTextAnimations(), 300);
            setTimeout(() => animateHeroTextOut(), 3000);
        }
    }
}

// Мобильное меню
function initMobileMenu() {
    const burgerBtn = document.getElementById('burgerMenu');
    const burgerOverlay = document.getElementById('burgerMenuOverlay');
    const burgerClose = document.getElementById('burgerMenuClose');
    let scrollPosition = 0;
    
    if (burgerBtn && burgerOverlay) {
        // Открытие меню
        burgerBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Предотвращаем всплытие события
            scrollPosition = window.pageYOffset;
            burgerOverlay.classList.add('active');
            burgerBtn.classList.add('active');
        });
        
        // Закрытие меню
        if (burgerClose) {
            burgerClose.addEventListener('click', closeBurgerMenu);
        }
        
        // Закрытие по клику на фон (но не на ссылки и элементы меню)
        burgerOverlay.addEventListener('click', function(e) {
            // Закрываем только если клик был именно по overlay, а не по его содержимому
            if (e.target === burgerOverlay) {
                closeBurgerMenu();
            }
        });
        
        // Закрытие по Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && burgerOverlay.classList.contains('active')) {
                closeBurgerMenu();
            }
        });
    }
    
    function closeBurgerMenu() {
        burgerOverlay.classList.remove('active');
        burgerBtn.classList.remove('active');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollPosition);
    }
}

// Анимации hero секции
function initHeroAnimations() {
    // Добавляем класс для активации анимаций после загрузки
    setTimeout(() => {
        const heroTextBlocks = document.querySelectorAll('.hero__text-block');
        heroTextBlocks.forEach(block => {
            block.classList.add('animate-in');
        });
    }, 100);
}

// Анимация выезжания текста в стороны
function animateHeroTextOut() {
    const heroTextBlocks = document.querySelectorAll('.hero__text-block--left, .hero__text-block--right');
    
    if (heroTextBlocks.length === 0) return; // Выходим, если нет элементов
    
    heroTextBlocks.forEach((block, index) => {
        // Добавляем задержку для каждой стороны
        setTimeout(() => {
            block.classList.add('animate-out');
        }, index * 200); // 200ms задержка между анимациями
    });
    
    // Показываем дополнительный контент или кнопки через некоторое время
    setTimeout(() => {
        showAdditionalContent();
    }, 2000);
}

// Показать дополнительный контент (кнопки, ссылки и т.д.)
function showAdditionalContent() {
    // Здесь можно добавить логику для показа дополнительных элементов
    console.log('Hero анимация завершена, можно показывать дополнительный контент');
}

// Плавная прокрутка для якорных ссылок
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Обработка изменения размера окна
window.addEventListener('resize', function() {
    // Пересчет позиций элементов при изменении размера
    handleResize();
});

function handleResize() {
    // Логика для адаптивности при изменении размера окна
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
        // Мобильная логика
        document.body.classList.add('mobile');
    } else {
        // Десктопная логика
        document.body.classList.remove('mobile');
    }
}

// Утилиты для анимаций
const AnimationUtils = {
    // Проверка видимости элемента
    isElementInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Анимация появления элемента
    fadeInElement: function(element, duration = 300) {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        let start = performance.now();
        
        function animate(timestamp) {
            let progress = (timestamp - start) / duration;
            
            if (progress < 1) {
                element.style.opacity = progress;
                requestAnimationFrame(animate);
            } else {
                element.style.opacity = '1';
            }
        }
        
        requestAnimationFrame(animate);
    },
    
    // Анимация исчезновения элемента
    fadeOutElement: function(element, duration = 300) {
        let start = performance.now();
        let initialOpacity = parseFloat(getComputedStyle(element).opacity);
        
        function animate(timestamp) {
            let progress = (timestamp - start) / duration;
            
            if (progress < 1) {
                element.style.opacity = initialOpacity * (1 - progress);
                requestAnimationFrame(animate);
            } else {
                element.style.opacity = '0';
                element.style.display = 'none';
            }
        }
        
        requestAnimationFrame(animate);
    }
};

// Анимация появления текста
function startTextAnimations() {
    const isMobile = window.innerWidth <= 700;
    
    // Анимация изображения
    const heroImage = document.querySelector('.hero__image');
    if (heroImage) {
        const animationName = isMobile ? 'imageZoomInMobile' : 'imageZoomIn';
        heroImage.style.animation = `${animationName} 1.2s ease-out forwards`;
    }
    
    // Анимация текстовых блоков
    const textBlockLeft = document.querySelector('.hero__text-block--left');
    const textBlockRight = document.querySelector('.hero__text-block--right');
    const textBlockMobile = document.querySelector('.hero__text-block--mobile');
    
    if (textBlockLeft) {
        textBlockLeft.style.animation = 'textBlockLeftAppear 1s ease-out forwards';
    }
    if (textBlockRight) {
        textBlockRight.style.animation = 'textBlockRightAppear 1s ease-out forwards';
    }
    if (textBlockMobile) {
        textBlockMobile.style.animation = 'textBlockMobileAppear 1s ease-out forwards';
    }
    
    // Анимация слов по буквам
    const words = document.querySelectorAll('.hero__word');
    words.forEach((word, index) => {
        const letters = word.textContent.split('');
        word.innerHTML = '';
        
        letters.forEach((letter, letterIndex) => {
            const span = document.createElement('span');
            span.textContent = letter === ' ' ? '\u00A0' : letter;
            span.style.opacity = '0';
            span.style.transform = 'translate3d(0, 20px, 0) scale(0.9)';
            span.style.display = 'inline-block';
            span.style.willChange = 'transform, opacity';
            span.style.animation = `letterAppear 0.6s ease-out ${index * 0.15 + letterIndex * 0.03}s forwards`;
            word.appendChild(span);
        });
    });
    
    // Нижний текст - поднимается снизу
    const bottomText = document.querySelector('.hero__bottom-text');
    if (bottomText) {
        bottomText.style.animation = 'bottomTextSlideUp 1.2s ease-out 0.6s forwards';
    }
}

// Переходы между страницами
function initPageTransitions() {
    const pageTransition = document.getElementById('pageTransition');
    const navLinks = document.querySelectorAll('a[href$=".html"], a[href^="/"], a[href^="./"]');
    
    // Функция для запуска анимации перехода
    function startPageTransition(href) {
        if (pageTransition) {
            console.log('Запуск анимации шара');
            pageTransition.classList.add('active');
            
            setTimeout(() => {
                console.log('Переход на страницу:', href);
                window.location.href = href;
            }, 1000); // Время для полной анимации шара
        } else {
            window.location.href = href;
        }
    }
    
    // Добавляем обработчики для ссылок
    navLinks.forEach(link => {
        // Пропускаем якорные ссылки и внешние ссылки
        if (link.getAttribute('href').startsWith('#') || 
            link.getAttribute('href').startsWith('http') ||
            link.getAttribute('href').startsWith('mailto:') ||
            link.getAttribute('href').startsWith('tel:')) {
            return;
        }
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            startPageTransition(href);
        });
    });
    
    // Анимация входа на страницу - убираем шар, показываем контент сразу
    const mainContent = document.getElementById('mainContent');
    if (mainContent) {
        mainContent.style.opacity = '1';
        mainContent.style.transition = 'opacity 0.5s ease-in-out';
    }
}

// Cookie Banner
function initCookieBanner() {
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptBtn = document.getElementById('acceptCookies');
    const declineBtn = document.getElementById('declineCookies');
    
    // Проверяем, есть ли сохраненное согласие
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (!cookieConsent && cookieBanner) {
        // Показываем баннер с задержкой
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 4000);
    }
    
    // Обработчики кнопок
    if (acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'accepted');
            hideCookieBanner();
        });
    }
    
    if (declineBtn) {
        declineBtn.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'declined');
            hideCookieBanner();
        });
    }
    
    function hideCookieBanner() {
        if (cookieBanner) {
            cookieBanner.classList.remove('show');
            setTimeout(() => {
                cookieBanner.style.display = 'none';
            }, 300);
        }
    }
}

// Экспорт для использования в других модулях
window.AnimationUtils = AnimationUtils;
