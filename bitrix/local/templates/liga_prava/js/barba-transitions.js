// /local/templates/liga_prava/js/barba-transitions.js
// Инициализация Barba.js + circle transition + SEO hooks
// Загружается последним

(function() {

    // ============================================================
    // ПЕРВИЧНАЯ ЗАГРУЗКА (один раз)
    // ============================================================

    document.addEventListener('DOMContentLoaded', function() {
        // One-time инициализации
        initOneTime();

        // Инициализация текущей страницы
        var container = document.querySelector('[data-barba-namespace]');
        var namespace = container ? container.getAttribute('data-barba-namespace') : 'home';
        initPageByNamespace(namespace);

        // Запуск Barba.js
        initBarba();
    });

    // ============================================================
    // BARBA.JS INIT
    // ============================================================

    function initBarba() {
        if (typeof barba === 'undefined') {
            console.warn('Barba.js не загружен, работаем без SPA-переходов');
            initFallbackNavigation();
            return;
        }

        barba.init({
            // Предотвращаем перехват для определённых ссылок
            prevent: function(data) {
                var el = data.el;
                if (!el) return false;

                // Пропускаем mailto, tel, target=_blank, хэши, внешние ссылки
                var href = el.getAttribute('href') || '';
                if (href.startsWith('mailto:') ||
                    href.startsWith('tel:') ||
                    href.startsWith('#') ||
                    href.startsWith('javascript:') ||
                    el.getAttribute('target') === '_blank' ||
                    el.classList.contains('no-barba') ||
                    el.hostname !== window.location.hostname) {
                    return true;
                }

                return false;
            },

            transitions: [{
                name: 'circle-transition',

                // Анимация ухода
                leave: function(data) {
                    var done = this.async();

                    // Cleanup текущей страницы
                    var currentNamespace = data.current.namespace;
                    cleanupPage(currentNamespace);

                    // Закрываем бургер-меню
                    closeBurgerMenuIfOpen();

                    // Создаём circle overlay
                    var overlay = document.createElement('div');
                    overlay.className = 'barba-circle-overlay';
                    overlay.id = 'barbaCircleOverlay';

                    // Позиция клика (центр экрана по умолчанию)
                    var clickX = window.innerWidth / 2;
                    var clickY = window.innerHeight / 2;

                    // Если есть trigger (кликнутый элемент)
                    if (data.trigger && data.trigger !== 'barba' && data.trigger.getBoundingClientRect) {
                        var rect = data.trigger.getBoundingClientRect();
                        clickX = rect.left + rect.width / 2;
                        clickY = rect.top + rect.height / 2;
                    }

                    overlay.style.left = clickX + 'px';
                    overlay.style.top = clickY + 'px';

                    document.body.appendChild(overlay);

                    // Размер чтобы покрыть весь экран
                    var maxDim = Math.max(window.innerWidth, window.innerHeight) * 2.5;

                    // Запускаем анимацию
                    requestAnimationFrame(function() {
                        overlay.style.width = maxDim + 'px';
                        overlay.style.height = maxDim + 'px';
                    });

                    setTimeout(done, 600);
                },

                // Анимация входа
                enter: function(data) {
                    var done = this.async();

                    var overlay = document.getElementById('barbaCircleOverlay');

                    if (overlay) {
                        // Схлопываем круг
                        overlay.style.transition = 'width 0.5s ease-in, height 0.5s ease-in, opacity 0.3s ease-in 0.2s';
                        overlay.style.width = '0px';
                        overlay.style.height = '0px';
                        overlay.style.opacity = '0';

                        setTimeout(function() {
                            if (overlay.parentNode) {
                                overlay.parentNode.removeChild(overlay);
                            }
                            done();
                        }, 500);
                    } else {
                        done();
                    }
                },

                // После завершения перехода
                after: function(data) {
                    // Инициализируем новую страницу
                    var newNamespace = data.next.namespace;
                    initPageByNamespace(newNamespace);

                    // Скролл вверх
                    window.scrollTo(0, 0);
                }
            }]
        });

        // ============================================================
        // SEO HOOKS — обновляем meta после каждого перехода
        // ============================================================

        barba.hooks.after(function(data) {
            // Обновляем title
            var nextHtml = data.next.html;
            var titleMatch = nextHtml.match(/<title>(.*?)<\/title>/);
            if (titleMatch) {
                document.title = titleMatch[1];
            }

            // Обновляем meta description
            var descMatch = nextHtml.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/);
            if (descMatch) {
                var meta = document.querySelector('meta[name="description"]');
                if (meta) {
                    meta.setAttribute('content', descMatch[1]);
                } else {
                    meta = document.createElement('meta');
                    meta.setAttribute('name', 'description');
                    meta.setAttribute('content', descMatch[1]);
                    document.head.appendChild(meta);
                }
            }

            // Обновляем canonical
            var canonicalMatch = nextHtml.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/);
            if (canonicalMatch) {
                var link = document.querySelector('link[rel="canonical"]');
                if (link) {
                    link.setAttribute('href', canonicalMatch[1]);
                }
            }

            // Яндекс.Метрика / GA
            if (typeof ym === 'function') {
                ym(METRIKA_ID, 'hit', window.location.pathname);
            }
            if (typeof gtag === 'function') {
                gtag('config', 'GA_ID', { page_path: window.location.pathname });
            }
        });
    }

    // ============================================================
    // FALLBACK — если Barba.js не загрузился
    // ============================================================

    function initFallbackNavigation() {
        var navLinks = document.querySelectorAll('.nav__link, .nav__dropdown-link, .burger-menu__link');

        navLinks.forEach(function(link) {
            var href = link.getAttribute('href') || '';
            if (href && !href.startsWith('#') && !href.startsWith('javascript:') &&
                !href.startsWith('mailto:') && !href.startsWith('tel:')) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    closeBurgerMenuIfOpen();
                    createCircleTransition(this, this.href);
                });
            }
        });

        var logo = document.querySelector('.logo');
        if (logo) {
            logo.addEventListener('click', function(e) {
                e.preventDefault();
                createCircleTransition(this, this.href);
            });
        }
    }

})();