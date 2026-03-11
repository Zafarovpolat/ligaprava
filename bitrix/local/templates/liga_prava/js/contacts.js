// /local/templates/liga_prava/js/contacts.js
// НЕ используем DOMContentLoaded — вызывается из page-init.js

var _contactsObserver = null;
var _yandexMapInstance = null;

function initContactsPage() {
    initYandexMap();
    initContactButtons();
    initContactAnimations();
}

function initYandexMap() {
    // Lazy-load Yandex Maps API
    if (typeof ymaps !== 'undefined') {
        _createMap();
    } else {
        // Динамически загружаем API
        var script = document.createElement('script');
        script.src = 'https://api-maps.yandex.ru/2.1/?apikey=YOUR_API_KEY&lang=ru_RU';
        script.onload = function() {
            _createMap();
        };
        script.onerror = function() {
            console.warn('Не удалось загрузить Yandex Maps API');
        };
        document.head.appendChild(script);
    }
}

function _createMap() {
    if (typeof ymaps === 'undefined') return;

    ymaps.ready(function() {
        var mapContainer = document.getElementById('yandex-map');
        if (!mapContainer) return;

        try {
            _yandexMapInstance = new ymaps.Map('yandex-map', {
                center: [55.751244, 37.618423],
                zoom: 15
            }, {
                suppressMapOpenBlock: true
            });

            var placemark = new ymaps.Placemark([55.751244, 37.618423], {
                balloonContent: 'г. Москва, Ленинский проспект, д.3А стр.3, офис 96'
            }, {
                preset: 'islands#redDotIcon'
            });

            _yandexMapInstance.geoObjects.add(placemark);
        } catch (error) {
            console.warn('Ошибка при инициализации Yandex Maps:', error);
        }
    });
}

function initContactButtons() {
    var routeButton = document.querySelector('.contacts__button:first-child');
    var coordsButton = document.querySelector('.contacts__button:last-child');

    if (routeButton) {
        routeButton.addEventListener('click', function() {
            var url = 'https://yandex.ru/maps/?pt=37.618423,55.751244&z=15&l=map';
            window.open(url, '_blank');
        });
    }

    if (coordsButton) {
        var tooltip = document.createElement('div');
        tooltip.className = 'contacts__tooltip';
        tooltip.textContent = 'Координаты скопированы';
        coordsButton.appendChild(tooltip);

        coordsButton.addEventListener('click', function() {
            navigator.clipboard.writeText('55.751244, 37.618423').then(function() {
                tooltip.classList.add('show');
                setTimeout(function() { tooltip.classList.remove('show'); }, 2000);
            }).catch(function() {
                tooltip.textContent = 'Не удалось скопировать';
                tooltip.classList.add('show');
                setTimeout(function() { tooltip.classList.remove('show'); }, 2000);
            });
        });
    }
}

function initContactAnimations() {
    var contactItems = document.querySelectorAll('.contacts .contact-item');

    _contactsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    contactItems.forEach(function(item, index) {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease-out ' + (index * 0.1) + 's, transform 0.6s ease-out ' + (index * 0.1) + 's';
        _contactsObserver.observe(item);
    });
}

function cleanupContactsPage() {
    if (_contactsObserver) {
        _contactsObserver.disconnect();
        _contactsObserver = null;
    }
    if (_yandexMapInstance) {
        _yandexMapInstance.destroy();
        _yandexMapInstance = null;
    }
}