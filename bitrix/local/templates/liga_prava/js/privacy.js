// /local/templates/liga_prava/js/privacy.js
// НЕ используем DOMContentLoaded — вызывается из page-init.js

function initPrivacyAnimations() {
    var title = document.querySelector('.privacy__title');
    var text = document.querySelector('.privacy__text');

    setTimeout(function() {
        if (title) {
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }
    }, 200);

    setTimeout(function() {
        if (text) {
            text.style.opacity = '1';
            text.style.transform = 'translateY(0)';
        }
    }, 400);
}