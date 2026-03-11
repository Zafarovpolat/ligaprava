// /local/templates/liga_prava/js/cases.js
// НЕ используем DOMContentLoaded — вызывается из page-init.js

var _casesResizeHandler = null;

function initCasesPage() {
    var casesGrid = document.getElementById('casesGrid');
    var caseItems = Array.from(document.querySelectorAll('.cases__item'));
    var filterButtons = document.querySelectorAll('.cases__filter-btn');
    var prevBtn = document.getElementById('prevCase');
    var nextBtn = document.getElementById('nextCase');

    if (!casesGrid || caseItems.length === 0) return;

    var currentFilter = 'all';
    var currentPage = 0;

    function getItemsPerPage() {
        var width = window.innerWidth;
        if (width <= 900) return Infinity;
        if (width <= 1080) return 4;
        return 6;
    }

    var itemsPerPage = getItemsPerPage();
    var visibleItems = caseItems.slice();

    function updateSlider() {
        visibleItems = caseItems.filter(function(item) {
            var category = item.getAttribute('data-category');
            return currentFilter === 'all' || category === currentFilter;
        });

        var isSliderDisabled = itemsPerPage === Infinity;

        if (isSliderDisabled) {
            caseItems.forEach(function(item) {
                var category = item.getAttribute('data-category');
                if (currentFilter === 'all' || category === currentFilter) {
                    item.style.display = 'flex';
                    item.classList.add('fade-in');
                } else {
                    item.style.display = 'none';
                    item.classList.remove('fade-in');
                }
            });
            return;
        }

        var totalPages = Math.ceil(visibleItems.length / itemsPerPage);
        if (currentPage >= totalPages) currentPage = Math.max(0, totalPages - 1);

        caseItems.forEach(function(item) {
            item.style.display = 'none';
            item.classList.remove('fade-in');
        });

        var start = currentPage * itemsPerPage;
        var end = start + itemsPerPage;
        var pageItems = visibleItems.slice(start, end);

        pageItems.forEach(function(item, index) {
            item.style.display = 'flex';
            setTimeout(function() {
                item.classList.add('fade-in');
            }, index * 50);
        });

        if (prevBtn) prevBtn.disabled = currentPage === 0;
        if (nextBtn) nextBtn.disabled = currentPage >= totalPages - 1 || totalPages <= 1;
    }

    filterButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            filterButtons.forEach(function(btn) { btn.classList.remove('active'); });
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');
            currentPage = 0;
            animateTransition();
        });
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentPage > 0) {
                currentPage--;
                animateTransition();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            var totalPages = Math.ceil(visibleItems.length / itemsPerPage);
            if (currentPage < totalPages - 1) {
                currentPage++;
                animateTransition();
            }
        });
    }

    function animateTransition() {
        if (!casesGrid) return;
        casesGrid.classList.add('fade-out');
        setTimeout(function() {
            updateSlider();
            casesGrid.classList.remove('fade-out');
        }, 300);
    }

    _casesResizeHandler = function() {
        var newItemsPerPage = getItemsPerPage();
        if (newItemsPerPage !== itemsPerPage) {
            if (itemsPerPage !== Infinity && newItemsPerPage !== Infinity) {
                var firstVisibleIndex = currentPage * itemsPerPage;
                itemsPerPage = newItemsPerPage;
                currentPage = Math.floor(firstVisibleIndex / itemsPerPage);
            } else {
                itemsPerPage = newItemsPerPage;
                currentPage = 0;
            }
            updateSlider();
        }
    };

    var resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (_casesResizeHandler) _casesResizeHandler();
        }, 200);
    });

    updateSlider();
}

function cleanupCasesPage() {
    _casesResizeHandler = null;
}