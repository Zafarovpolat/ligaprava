document.addEventListener('DOMContentLoaded', function() {
    if (typeof initPageTransitions === 'function') {
        initPageTransitions();
    }

    if (typeof initLottieOnFirstVisit === 'function') {
        initLottieOnFirstVisit();
    }

    initYandexMap();
    initContactButtons();
    initContactAnimations();
});

function initYandexMap() {
    if (typeof ymaps !== 'undefined') {
        ymaps.ready(function() {
            try {
                const map = new ymaps.Map('yandex-map', {
                    center: [55.751244, 37.618423], // Москва, Ленинский проспект
                    zoom: 15
                }, {
                    suppressMapOpenBlock: true
                });

                const placemark = new ymaps.Placemark([55.751244, 37.618423], {
                    balloonContent: 'г. Москва, Ленинский проспект, д.ЗВА стр.3, офис 96'
                }, {
                    preset: 'islands#redDotIcon'
                });

                map.geoObjects.add(placemark);
            } catch (error) {
                console.warn('Ошибка при инициализации Yandex Maps:', error);
            }
        });
    }
}

function initContactButtons() {
    const routeButton = document.querySelector('.contacts__button:first-child');
    const coordsButton = document.querySelector('.contacts__button:last-child');

    if (routeButton) {
        routeButton.addEventListener('click', function() {
            // Открыть маршрут в Яндекс.Картах
            const url = 'https://yandex.ru/maps/?pt=37.618423,55.751244&z=15&l=map';
            window.open(url, '_blank');
        });
    }

    if (coordsButton) {
        // Создаем тултип
        const tooltip = document.createElement('div');
        tooltip.className = 'contacts__tooltip';
        tooltip.textContent = 'Координаты скопированы';
        coordsButton.appendChild(tooltip);

        coordsButton.addEventListener('click', function() {
            // Копировать координаты в буфер обмена
            navigator.clipboard.writeText('55.751244, 37.618423').then(function() {
                // Показываем тултип
                tooltip.classList.add('show');
                
                // Скрываем тултип через 2 секунды
                setTimeout(() => {
                    tooltip.classList.remove('show');
                }, 2000);
            }).catch(function() {
                // Обработка ошибки копирования
                tooltip.textContent = 'Не удалось скопировать';
                tooltip.classList.add('show');
                
                setTimeout(() => {
                    tooltip.classList.remove('show');
                }, 2000);
            });
        });
    }
}

// Анимации появления элементов контактов
function initContactAnimations() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    contactItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        observer.observe(item);
    });
}
