// /local/templates/liga_prava/js/due-diligence.js
// Используется для всех 4 страниц практик
// НЕ используем DOMContentLoaded — вызывается из page-init.js

var _ddResizeHandler = null;

function initDueDiligenceAnimations() {
    var title = document.querySelector('.due-diligence__title');
    var subtitle = document.querySelector('.due-diligence__subtitle');
    var image = document.querySelector('.due-diligence__image');
    var columns = document.querySelectorAll('.due-diligence__column');

    updateInfoBoxPosition();

    if (title) {
        title.style.opacity = '0';
        title.style.transform = 'translateY(30px)';
        title.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        setTimeout(function() {
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 300);
    }

    if (subtitle) {
        subtitle.style.opacity = '0';
        subtitle.style.transform = 'translateY(30px)';
        subtitle.style.transition = 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s';
        setTimeout(function() {
            subtitle.style.opacity = '1';
            subtitle.style.transform = 'translateY(0)';
        }, 500);
    }

    if (image) {
        image.style.opacity = '0';
        image.style.transform = 'translateY(30px)';
        image.style.transition = 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s';
        setTimeout(function() {
            image.style.opacity = '1';
            image.style.transform = 'translateY(0)';
        }, 700);
    }

    columns.forEach(function(column, index) {
        column.style.opacity = '0';
        column.style.transform = 'translateY(30px)';
        column.style.transition = 'opacity 0.8s ease-out ' + (0.6 + index * 0.2) + 's, transform 0.8s ease-out ' + (0.6 + index * 0.2) + 's';
        setTimeout(function() {
            column.style.opacity = '1';
            column.style.transform = 'translateY(0)';
        }, 900 + index * 200);
    });

    _ddResizeHandler = updateInfoBoxPosition;
    window.addEventListener('resize', _ddResizeHandler);
}

function updateInfoBoxPosition() {
    var hero = document.querySelector('.due-diligence__hero');
    var wrapper = document.querySelector('.due-diligence__wrapper');

    if (hero && wrapper && window.innerWidth > 1024) {
        var heroHeight = hero.offsetHeight;
        var offset = window.innerWidth <= 1366 ? 30 : 50;
        var newTop = heroHeight + offset;
        wrapper.style.setProperty('--info-box-top', newTop + 'px');
    } else if (wrapper) {
        wrapper.style.removeProperty('--info-box-top');
    }
}

function cleanupDueDiligencePage() {
    if (_ddResizeHandler) {
        window.removeEventListener('resize', _ddResizeHandler);
        _ddResizeHandler = null;
    }
}