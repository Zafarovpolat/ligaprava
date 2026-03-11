document.addEventListener('DOMContentLoaded', function() {
    if (typeof initPageTransitions === 'function') {
        initPageTransitions();
    }

    if (typeof initLottieOnFirstVisit === 'function') {
        initLottieOnFirstVisit();
    }

    initDueDiligenceAnimations();
});

// Анимации появления элементов Due Diligence
function initDueDiligenceAnimations() {
    const title = document.querySelector('.due-diligence__title');
    const subtitle = document.querySelector('.due-diligence__subtitle');
    const image = document.querySelector('.due-diligence__image');
    const columns = document.querySelectorAll('.due-diligence__column');

    // Обновляем позицию инфо-бокса перед началом анимаций
    updateInfoBoxPosition();

    if (title) {
        title.style.opacity = '0';
        title.style.transform = 'translateY(30px)';
        title.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';

        setTimeout(() => {
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 300);
    }

    if (subtitle) {
        subtitle.style.opacity = '0';
        subtitle.style.transform = 'translateY(30px)';
        subtitle.style.transition = 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s';

        setTimeout(() => {
            subtitle.style.opacity = '1';
            subtitle.style.transform = 'translateY(0)';
        }, 500);
    }

    if (image) {
        image.style.opacity = '0';
        image.style.transform = 'translateY(30px)';
        image.style.transition = 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s';

        setTimeout(() => {
            image.style.opacity = '1';
            image.style.transform = 'translateY(0)';
        }, 700);
    }

    columns.forEach((column, index) => {
        column.style.opacity = '0';
        column.style.transform = 'translateY(30px)';
        column.style.transition = `opacity 0.8s ease-out ${0.6 + index * 0.2}s, transform 0.8s ease-out ${0.6 + index * 0.2}s`;

        setTimeout(() => {
            column.style.opacity = '1';
            column.style.transform = 'translateY(0)';
        }, 900 + index * 200);
    });
}

function updateInfoBoxPosition() {
    const hero = document.querySelector('.due-diligence__hero');
    const wrapper = document.querySelector('.due-diligence__wrapper');
    
    if (hero && wrapper && window.innerWidth > 900) {
        const heroHeight = hero.offsetHeight;
        const w = window.innerWidth;
        const offset = w <= 1280 ? 30 : w <= 1400 ? 35 : 40;
        const newTop = heroHeight + offset;
        wrapper.style.setProperty('--info-box-top', `${newTop}px`);
    } else if (wrapper) {
        wrapper.style.removeProperty('--info-box-top');
    }
}

// Слушатель изменения размера окна
window.addEventListener('resize', updateInfoBoxPosition);







