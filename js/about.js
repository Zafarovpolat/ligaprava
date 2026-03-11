document.addEventListener('DOMContentLoaded', function() {
    // Initialize page transitions first
    if (typeof initPageTransitions === 'function') {
        initPageTransitions();
    }

    // Initialize Lottie on first visit
    if (typeof initLottieOnFirstVisit === 'function') {
        initLottieOnFirstVisit();
    }

    // Initialize partners carousel
    initPartnersCarousel();

    // Initialize text animations
    initTextAnimations();
});

function initPartnersCarousel() {
    // Initialize first carousel (left to right)
    initSingleCarousel('partnersCarousel1', 'partnersTrack1', 'scroll');
    
    // Initialize second carousel (right to left)
    initSingleCarousel('partnersCarousel2', 'partnersTrack2', 'scrollReverse');
}

async function initSingleCarousel(carouselId, trackId, animationName) {
    const carousel = document.getElementById(carouselId);
    const track = document.getElementById(trackId);
    
    if (!carousel || !track) return;

    // Wait for images inside track to be loaded for correct measurements
    await waitForImages(track);

    // Capture original items
    const originalItems = Array.from(track.children);
    if (originalItems.length === 0) return;

    // Ensure one logical set width >= carousel width to avoid gaps
    // Start with original set inside the DOM to measure
    let baseSetWidth = getSetWidth(originalItems);

    // If too short, keep appending clones of the original set until it exceeds carousel width
    // Use a safety cap to avoid infinite loops
    let safetyCounter = 0;
    while (baseSetWidth < carousel.offsetWidth && safetyCounter < 20) {
        originalItems.forEach((el) => {
            const clone = el.cloneNode(true);
            track.appendChild(clone);
        });
        await waitForImages(track);
        // Recalculate width using current children
        baseSetWidth = getSetWidth(Array.from(track.children));
        safetyCounter += 1;
    }

    // At this point, the current track children represent the BASE SET
    const baseHTML = track.innerHTML;

    // Duplicate base set once to enable seamless loop
    track.innerHTML = baseHTML + baseHTML;

    // Duration based on base set width (constant speed across sizes)
    const duration = Math.max(20, baseSetWidth / 50);
    track.style.animation = `${animationName} ${duration}s linear infinite`;

    // Pause animation on hover
    carousel.addEventListener('mouseenter', function() {
        track.style.animationPlayState = 'paused';
    });

    carousel.addEventListener('mouseleave', function() {
        track.style.animationPlayState = 'running';
    });

    // Handle window resize: rebuild from originals
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(async function() {
            // Reset to original items
            track.innerHTML = '';
            originalItems.forEach((el) => track.appendChild(el.cloneNode(true)));
            await waitForImages(track);

            // Re-run the same logic
            let newBaseWidth = getSetWidth(Array.from(track.children));
            let guard = 0;
            while (newBaseWidth < carousel.offsetWidth && guard < 20) {
                const currentChildren = Array.from(track.children);
                // Append one batch equal to original length
                for (let i = 0; i < originalItems.length; i += 1) {
                    const node = currentChildren[i % currentChildren.length];
                    track.appendChild(node.cloneNode(true));
                }
                await waitForImages(track);
                newBaseWidth = getSetWidth(Array.from(track.children));
                guard += 1;
            }

            const rebuiltBase = track.innerHTML;
            track.innerHTML = rebuiltBase + rebuiltBase;
            const newDuration = Math.max(20, newBaseWidth / 50);
            track.style.animation = `${animationName} ${newDuration}s linear infinite`;
        }, 250);
    });
}

function getSetWidth(elements) {
    // Sum widths of elements in a logical set (flex gap accounted by element rects + computed gap)
    let widthSum = 0;
    for (let i = 0; i < elements.length; i += 1) {
        const el = elements[i];
        const rect = el.getBoundingClientRect();
        widthSum += rect.width;
    }
    return widthSum;
}

function waitForImages(scopeEl) {
    const imgs = Array.from(scopeEl.querySelectorAll('img'));
    if (imgs.length === 0) return Promise.resolve();
    const promises = imgs.map((img) => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise((resolve) => {
            img.addEventListener('load', resolve, { once: true });
            img.addEventListener('error', resolve, { once: true });
        });
    });
    return Promise.all(promises);
}

function initTextAnimations() {
    // Animate about section text blocks
    const textBlocks = document.querySelectorAll('.about__text-block');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                entry.target.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
            }
        });
    }, {
        threshold: 0.3
    });

    textBlocks.forEach(block => {
        observer.observe(block);
    });

    // Animate partner section text
    const quoteText = document.querySelector('.partner__quote-text');
    if (quoteText) {
        const quoteObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    // Используем requestAnimationFrame для плавной анимации
                    requestAnimationFrame(() => {
                        entry.target.classList.add('animated');
                    });
                }
            });
        }, {
            threshold: 0.3
        });

        quoteObserver.observe(quoteText);
    }

    // Animate partners section title
    const partnersTitle = document.querySelector('.partners__title');
    if (partnersTitle) {
        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                    entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                }
            });
        }, {
            threshold: 0.5
        });

        titleObserver.observe(partnersTitle);
    }
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation for images
function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete && img.naturalWidth > 0) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease-in-out';
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
            img.addEventListener('error', function() {
                console.error('Failed to load image:', this.src);
                this.style.opacity = '0.5';
            });
        }
    });
}

// Initialize image preloading
preloadImages();
