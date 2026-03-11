// /local/templates/liga_prava/js/script.js
// Главный скрипт — one-time инициализация + утилиты
// НЕ используем DOMContentLoaded — вызывается из barba-transitions.js

// ============================================================
// ONE-TIME INIT (вызывается один раз при загрузке страницы)
// ============================================================

function initOneTime() {
    var mainContent = document.getElementById('mainContent');
    if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.visibility = 'hidden';
    }

    setTimeout(function() {
        document.body.classList.add('loaded');
    }, 100);

    initLottieOnFirstVisit();
    initMobileMenu();
    initCookieBanner();
    handleResize();
}

// ============================================================
// LOTTIE — один раз за сессию
// ============================================================

function initLottieOnFirstVisit() {
    var lottieOverlay = document.getElementById('lottieOverlay');
    var lottieContainer = document.getElementById('lottieAnimation');
    var mainContent = document.getElementById('mainContent');

    var hasSeenAnimation = sessionStorage.getItem('hasSeenLottie');

    if (hasSeenAnimation) {
        if (lottieOverlay) lottieOverlay.style.display = 'none';
        if (mainContent) {
            mainContent.style.visibility = 'visible';
            mainContent.style.opacity = '1';
            mainContent.classList.add('loaded');
        }

        if (document.querySelector('.hero__text-block')) {
            setTimeout(function() { startTextAnimations(); }, 300);
            setTimeout(function() { animateHeroTextOut(); }, 3000);
        }
        return;
    }

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
        var isMobile = window.innerWidth <= 700;
        var animationPath = isMobile
            ? SITE_TEMPLATE_PATH + '/js/animation/liga-pad.json'
            : SITE_TEMPLATE_PATH + '/js/animation/Flow 8.json';

        lottieContainer.innerHTML = '';

        var animation = lottie.loadAnimation({
            container: lottieContainer,
            renderer: 'svg',
            loop: false,
            autoplay: true,
            path: animationPath
        });

        var finished = false;

        function finishLottie() {
            if (finished) return;
            finished = true;

            sessionStorage.setItem('hasSeenLottie', 'true');

            if (mainContent) {
                mainContent.style.visibility = 'visible';
                mainContent.style.opacity = '1';
                mainContent.classList.add('loaded');
            }

            lottieOverlay.style.transition = 'opacity 0.5s ease-out';
            lottieOverlay.style.opacity = '0';

            setTimeout(function() {
                lottieOverlay.style.display = 'none';

                if (document.querySelector('.hero__text-block')) {
                    setTimeout(function() { startTextAnimations(); }, 300);
                    setTimeout(function() { animateHeroTextOut(); }, 3000);
                }
            }, 500);
        }

        animation.addEventListener('complete', finishLottie);

        setTimeout(function() {
            if (!finished) {
                finishLottie();
            }
        }, 15000);
    } else {
        sessionStorage.setItem('hasSeenLottie', 'true');
        if (lottieOverlay) lottieOverlay.style.display = 'none';
        if (mainContent) {
            mainContent.style.visibility = 'visible';
            mainContent.style.opacity = '1';
            mainContent.classList.add('loaded');
        }

        if (document.querySelector('.hero__text-block')) {
            setTimeout(function() { startTextAnimations(); }, 300);
            setTimeout(function() { animateHeroTextOut(); }, 3000);
        }
    }
}

// ============================================================
// MOBILE MENU
// ============================================================

var _mobileMenuAbort = null;

function initMobileMenu() {
    // Cleanup предыдущих listeners
    if (_mobileMenuAbort) {
        _mobileMenuAbort.abort();
    }
    _mobileMenuAbort = new AbortController();
    var signal = _mobileMenuAbort.signal;

    var burgerBtn = document.getElementById('burgerMenu');
    var burgerOverlay = document.getElementById('burgerMenuOverlay');
    var burgerClose = document.getElementById('burgerMenuClose');
    var scrollPosition = 0;

    if (burgerBtn && burgerOverlay) {
        burgerBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            scrollPosition = window.pageYOffset;
            burgerOverlay.classList.add('active');
            burgerBtn.classList.add('active');
        }, { signal: signal });

        if (burgerClose) {
            burgerClose.addEventListener('click', closeBurgerMenu, { signal: signal });
        }

        burgerOverlay.addEventListener('click', function(e) {
            if (e.target === burgerOverlay) {
                closeBurgerMenu();
            }
        }, { signal: signal });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && burgerOverlay.classList.contains('active')) {
                closeBurgerMenu();
            }
        }, { signal: signal });
    }

    function closeBurgerMenu() {
        if (burgerOverlay) burgerOverlay.classList.remove('active');
        if (burgerBtn) burgerBtn.classList.remove('active');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollPosition);
    }
}

// ============================================================
// HERO ANIMATIONS
// ============================================================

function initHeroAnimations() {
    setTimeout(function() {
        var heroTextBlocks = document.querySelectorAll('.hero__text-block');
        heroTextBlocks.forEach(function(block) {
            block.classList.add('animate-in');
        });
    }, 100);
}

function animateHeroTextOut() {
    var heroTextBlocks = document.querySelectorAll('.hero__text-block--left, .hero__text-block--right');
    if (heroTextBlocks.length === 0) return;

    heroTextBlocks.forEach(function(block, index) {
        setTimeout(function() {
            block.classList.add('animate-out');
        }, index * 200);
    });
}

function startTextAnimations() {
    var isMobile = window.innerWidth <= 700;

    var heroImage = document.querySelector('.hero__image');
    if (heroImage) {
        var animationName = isMobile ? 'imageZoomInMobile' : 'imageZoomIn';
        heroImage.style.animation = animationName + ' 1.2s ease-out forwards';
    }

    var textBlockLeft = document.querySelector('.hero__text-block--left');
    var textBlockRight = document.querySelector('.hero__text-block--right');
    var textBlockMobile = document.querySelector('.hero__text-block--mobile');

    if (textBlockLeft) {
        textBlockLeft.style.animation = 'textBlockLeftAppear 1s ease-out forwards';
    }
    if (textBlockRight) {
        textBlockRight.style.animation = 'textBlockRightAppear 1s ease-out forwards';
    }
    if (textBlockMobile) {
        textBlockMobile.style.animation = 'textBlockMobileAppear 1s ease-out forwards';
    }

    var words = document.querySelectorAll('.hero__word');
    words.forEach(function(word, index) {
        var letters = word.textContent.split('');
        word.innerHTML = '';

        letters.forEach(function(letter, letterIndex) {
            var span = document.createElement('span');
            span.textContent = letter === ' ' ? '\u00A0' : letter;
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px) scale(0.9)';
            span.style.animation = 'letterAppear 0.8s ease-out ' + (index * 0.2 + letterIndex * 0.05) + 's forwards';
            word.appendChild(span);
        });
    });

    var bottomText = document.querySelector('.hero__bottom-text');
    if (bottomText) {
        bottomText.style.animation = 'bottomTextSlideUp 1.2s ease-out 0.6s forwards';
    }
}

// ============================================================
// COOKIE BANNER
// ============================================================

function initCookieBanner() {
    var cookieBanner = document.getElementById('cookieBanner');
    var acceptBtn = document.getElementById('acceptCookies');
    var declineBtn = document.getElementById('declineCookies');

    var cookieConsent = localStorage.getItem('cookieConsent');

    if (!cookieConsent && cookieBanner) {
        setTimeout(function() {
            cookieBanner.classList.add('show');
        }, 4000);
    }

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
            setTimeout(function() {
                cookieBanner.style.display = 'none';
            }, 300);
        }
    }
}

// ============================================================
// RESIZE HANDLER
// ============================================================

function handleResize() {
    var isMobile = window.innerWidth < 768;
    if (isMobile) {
        document.body.classList.add('mobile');
    } else {
        document.body.classList.remove('mobile');
    }
}

window.addEventListener('resize', handleResize);

// ============================================================
// ANIMATION UTILS (глобально доступны)
// ============================================================

var AnimationUtils = {
    isElementInViewport: function(element) {
        var rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    fadeInElement: function(element, duration) {
        duration = duration || 300;
        element.style.opacity = '0';
        element.style.display = 'block';
        var start = performance.now();

        function animate(timestamp) {
            var progress = (timestamp - start) / duration;
            if (progress < 1) {
                element.style.opacity = progress;
                requestAnimationFrame(animate);
            } else {
                element.style.opacity = '1';
            }
        }
        requestAnimationFrame(animate);
    },

    fadeOutElement: function(element, duration) {
        duration = duration || 300;
        var start = performance.now();
        var initialOpacity = parseFloat(getComputedStyle(element).opacity);

        function animate(timestamp) {
            var progress = (timestamp - start) / duration;
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

window.AnimationUtils = AnimationUtils;

// Глобальная переменная для SITE_TEMPLATE_PATH (устанавливается из PHP)
if (typeof SITE_TEMPLATE_PATH === 'undefined') {
    // Fallback — определяем по текущему скрипту
    var scripts = document.querySelectorAll('script[src*="/js/script.js"]');
    if (scripts.length > 0) {
        var src = scripts[scripts.length - 1].getAttribute('src');
        window.SITE_TEMPLATE_PATH = src.replace('/js/script.js', '');
    } else {
        window.SITE_TEMPLATE_PATH = '/local/templates/liga_prava';
    }
}