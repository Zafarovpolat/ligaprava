// /local/templates/liga_prava/js/practices.js
// НЕ используем DOMContentLoaded — вызывается из page-init.js

var _practicesObserver = null;

function initPracticeAnimations() {
    var practiceBlocks = document.querySelectorAll('.practice-block');

    _practicesObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    practiceBlocks.forEach(function(block) {
        _practicesObserver.observe(block);
    });
}

function cleanupPracticesPage() {
    if (_practicesObserver) {
        _practicesObserver.disconnect();
        _practicesObserver = null;
    }
}