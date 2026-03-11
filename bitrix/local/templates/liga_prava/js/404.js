// /local/templates/liga_prava/js/404.js
// НЕ используем DOMContentLoaded — вызывается из page-init.js

function init404Animations() {
    var title = document.querySelector('.error-404__title');
    var message = document.querySelector('.error-404__message');
    var submessage = document.querySelector('.error-404__submessage');
    var actions = document.querySelector('.error-404__actions');

    setTimeout(function() {
        if (title) {
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }
    }, 200);

    setTimeout(function() {
        if (message) {
            message.style.opacity = '1';
            message.style.transform = 'translateY(0)';
        }
    }, 400);

    setTimeout(function() {
        if (submessage) {
            submessage.style.opacity = '1';
            submessage.style.transform = 'translateY(0)';
        }
    }, 600);

    setTimeout(function() {
        if (actions) {
            actions.style.opacity = '1';
            actions.style.transform = 'translateY(0)';
        }
    }, 800);
}