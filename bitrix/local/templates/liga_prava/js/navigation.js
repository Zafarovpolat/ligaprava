// /local/templates/liga_prava/js/navigation.js
// Навигация — dropdown, circle transition
// НЕ используем DOMContentLoaded — вызывается из page-init.js и barba-transitions.js

var _navigationAbort = null;

function initNavigation() {
    // Cleanup предыдущих listeners
    if (_navigationAbort) {
        _navigationAbort.abort();
    }
    _navigationAbort = new AbortController();
    var signal = _navigationAbort.signal;

    // Dropdown
    var practicesDropdown = document.getElementById('practicesDropdown');
    var practicesDropdownMenu = document.getElementById('practicesDropdownMenu');

    if (practicesDropdown && practicesDropdownMenu) {
        var dropdownItem = practicesDropdown.closest('.nav__item--dropdown');

        practicesDropdown.addEventListener('click', function(e) {
            e.preventDefault();
            practicesDropdownMenu.classList.toggle('active');
            if (dropdownItem) {
                dropdownItem.classList.toggle('nav__dropdown-active');
            }
        }, { signal: signal });

        document.addEventListener('click', function(e) {
            if (!practicesDropdown.contains(e.target) && !practicesDropdownMenu.contains(e.target)) {
                practicesDropdownMenu.classList.remove('active');
                if (dropdownItem) {
                    dropdownItem.classList.remove('nav__dropdown-active');
                }
            }
        }, { signal: signal });
    }
}

function cleanupNavigation() {
    if (_navigationAbort) {
        _navigationAbort.abort();
        _navigationAbort = null;
    }
}

// Circle transition для НЕ-Barba навигации (fallback)
function createCircleTransition(clickedElement, targetUrl) {
    var existingTransition = document.getElementById('pageTransition');
    if (existingTransition) {
        existingTransition.style.display = 'none';
    }

    var rect = clickedElement.getBoundingClientRect();
    var centerX = rect.left + rect.width / 2;
    var centerY = rect.top + rect.height / 2;

    var circle = document.createElement('div');
    circle.style.position = 'fixed';
    circle.style.left = centerX + 'px';
    circle.style.top = centerY + 'px';
    circle.style.width = '0px';
    circle.style.height = '0px';
    circle.style.borderRadius = '50%';
    circle.style.backgroundColor = '#FFFFFF';
    circle.style.transform = 'translate(-50%, -50%)';
    circle.style.zIndex = '9999';
    circle.style.transition = 'all 0.9s ease-out';
    circle.style.pointerEvents = 'none';

    document.body.appendChild(circle);

    var maxDimension = Math.max(window.innerWidth, window.innerHeight) * 2.5;

    setTimeout(function() {
        circle.style.width = maxDimension + 'px';
        circle.style.height = maxDimension + 'px';
    }, 10);

    setTimeout(function() {
        window.location.href = targetUrl;
    }, 600);
}

function closeBurgerMenuIfOpen() {
    var burgerOverlay = document.getElementById('burgerMenuOverlay');
    var burgerBtn = document.getElementById('burgerMenu');
    if (burgerOverlay && burgerOverlay.classList.contains('active')) {
        burgerOverlay.classList.remove('active');
        if (burgerBtn) burgerBtn.classList.remove('active');
        document.body.style.overflow = '';
    }
}