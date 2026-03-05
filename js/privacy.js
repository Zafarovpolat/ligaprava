document.addEventListener('DOMContentLoaded', function() {
    if (typeof initPageTransitions === 'function') {
        initPageTransitions();
    }

    if (typeof initLottieOnFirstVisit === 'function') {
        initLottieOnFirstVisit();
    }

    initPrivacyAnimations();
});

// Анимации для страницы политики конфиденциальности
function initPrivacyAnimations() {
    const title = document.querySelector('.privacy__title');
    const text = document.querySelector('.privacy__text');

    // Анимация появления заголовка
    setTimeout(() => {
        if (title) {
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }
    }, 200);

    // Анимация появления текста
    setTimeout(() => {
        if (text) {
            text.style.opacity = '1';
            text.style.transform = 'translateY(0)';
        }
    }, 400);
}
