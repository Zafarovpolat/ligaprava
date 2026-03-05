document.addEventListener('DOMContentLoaded', function() {
    if (typeof initPageTransitions === 'function') {
        initPageTransitions();
    }

    if (typeof initLottieOnFirstVisit === 'function') {
        initLottieOnFirstVisit();
    }

    init404Animations();
});

// Анимации для страницы 404
function init404Animations() {
    const title = document.querySelector('.error-404__title');
    const message = document.querySelector('.error-404__message');
    const description = document.querySelector('.error-404__description');
    const button = document.querySelector('.error-404__button');

    // Анимация появления элементов
    setTimeout(() => {
        if (title) {
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }
    }, 200);

    setTimeout(() => {
        if (message) {
            message.style.opacity = '1';
            message.style.transform = 'translateY(0)';
        }
    }, 400);

    setTimeout(() => {
        if (description) {
            description.style.opacity = '1';
            description.style.transform = 'translateY(0)';
        }
    }, 600);

    setTimeout(() => {
        if (button) {
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        }
    }, 800);
}