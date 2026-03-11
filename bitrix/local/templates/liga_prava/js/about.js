// /local/templates/liga_prava/js/about.js
// НЕ используем DOMContentLoaded — функции вызываются из page-init.js

var _aboutResizeTimeout = null;
var _aboutObservers = [];

function initPartnersCarousel() {
    initSingleCarousel('partnersCarousel1', 'partnersTrack1', 'scroll');
    initSingleCarousel('partnersCarousel2', 'partnersTrack2', 'scrollReverse');
}

async function initSingleCarousel(carouselId, trackId, animationName) {
    var carousel = document.getElementById(carouselId);
    var track = document.getElementById(trackId);

    if (!carousel || !track) return;

    await waitForImages(track);

    var originalItems = Array.from(track.children);
    if (originalItems.length === 0) return;

    var baseSetWidth = getSetWidth(originalItems);

    var safetyCounter = 0;
    while (baseSetWidth < carousel.offsetWidth && safetyCounter < 20) {
        originalItems.forEach(function(el) {
            var clone = el.cloneNode(true);
            track.appendChild(clone);
        });
        await waitForImages(track);
        baseSetWidth = getSetWidth(Array.from(track.children));
        safetyCounter += 1;
    }

    var baseHTML = track.innerHTML;
    track.innerHTML = baseHTML + baseHTML;

    var duration = Math.max(20, baseSetWidth / 50);
    track.style.animation = animationName + ' ' + duration + 's linear infinite';

    carousel.addEventListener('mouseenter', function() {
        track.style.animationPlayState = 'paused';
    });

    carousel.addEventListener('mouseleave', function() {
        track.style.animationPlayState = 'running';
    });
}

function getSetWidth(elements) {
    var widthSum = 0;
    for (var i = 0; i < elements.length; i++) {
        var rect = elements[i].getBoundingClientRect();
        widthSum += rect.width;
    }
    return widthSum;
}

function waitForImages(scopeEl) {
    var imgs = Array.from(scopeEl.querySelectorAll('img'));
    if (imgs.length === 0) return Promise.resolve();
    var promises = imgs.map(function(img) {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise(function(resolve) {
            img.addEventListener('load', resolve, { once: true });
            img.addEventListener('error', resolve, { once: true });
        });
    });
    return Promise.all(promises);
}

function initTextAnimations() {
    var textBlocks = document.querySelectorAll('.about__text-block');
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                entry.target.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                setTimeout(function() {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
            }
        });
    }, { threshold: 0.3 });

    textBlocks.forEach(function(block) { observer.observe(block); });
    _aboutObservers.push(observer);

    var partnersTitle = document.querySelector('.partners__title');
    if (partnersTitle) {
        var titleObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                    entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                    setTimeout(function() {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                }
            });
        }, { threshold: 0.5 });

        titleObserver.observe(partnersTitle);
        _aboutObservers.push(titleObserver);
    }
}

function cleanupAboutPage() {
    _aboutObservers.forEach(function(obs) { obs.disconnect(); });
    _aboutObservers = [];
    if (_aboutResizeTimeout) {
        clearTimeout(_aboutResizeTimeout);
        _aboutResizeTimeout = null;
    }
}