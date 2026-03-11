// /local/templates/liga_prava/js/page-init.js
// Инициализация page-specific скриптов по namespace
// Вызывается из barba-transitions.js после каждого перехода

function initPageByNamespace(namespace) {
    // Общие для всех страниц
    initNavigation();
    initMobileMenu();

    // Показываем контент (после Barba-перехода Lottie уже не нужна)
    var mainContent = document.getElementById('mainContent');
    if (mainContent) {
        mainContent.style.visibility = 'visible';
        mainContent.style.opacity = '1';
        mainContent.classList.add('loaded');
    }

    // Page-specific
    switch (namespace) {
        case 'home':
            initHeroAnimations();
            if (document.querySelector('.hero__text-block')) {
                setTimeout(function() { startTextAnimations(); }, 300);
                setTimeout(function() { animateHeroTextOut(); }, 3000);
            }
            break;

        case 'about':
            if (typeof initPartnersCarousel === 'function') initPartnersCarousel();
            if (typeof initTextAnimations === 'function') initTextAnimations();
            break;

        case 'cases':
            if (typeof initCasesPage === 'function') initCasesPage();
            break;

        case 'case-detail':
            // Статичная страница, не требует специальной инициализации
            break;

        case 'contacts':
            if (typeof initContactsPage === 'function') initContactsPage();
            break;

        case 'due-diligence':
        case 'argue':
        case 'bankruptcy':
        case 'corporate-right':
            if (typeof initDueDiligenceAnimations === 'function') initDueDiligenceAnimations();
            break;

        case 'privacy':
            if (typeof initPrivacyAnimations === 'function') initPrivacyAnimations();
            break;

        case '404':
            if (typeof init404Animations === 'function') init404Animations();
            break;
    }
}

// Cleanup page-specific ресурсов перед уходом со страницы
function cleanupPage(namespace) {
    cleanupNavigation();

    switch (namespace) {
        case 'contacts':
            if (typeof cleanupContactsPage === 'function') cleanupContactsPage();
            break;

        case 'about':
            if (typeof cleanupAboutPage === 'function') cleanupAboutPage();
            break;

        case 'cases':
            if (typeof cleanupCasesPage === 'function') cleanupCasesPage();
            break;

        case 'due-diligence':
        case 'argue':
        case 'bankruptcy':
        case 'corporate-right':
            if (typeof cleanupDueDiligencePage === 'function') cleanupDueDiligencePage();
            break;
    }
}