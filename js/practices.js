document.addEventListener('DOMContentLoaded', function() {
    if (typeof initPageTransitions === 'function') {
        initPageTransitions();
    }

    if (typeof initLottieOnFirstVisit === 'function') {
        initLottieOnFirstVisit();
    }

    initPracticeAnimations();
});

// Анимации появления блоков практик
function initPracticeAnimations() {
    const practiceBlocks = document.querySelectorAll('.practice-block');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    practiceBlocks.forEach(block => {
        observer.observe(block);
    });
}
