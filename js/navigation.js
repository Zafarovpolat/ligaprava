// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Dropdown functionality
    const practicesDropdown = document.getElementById('practicesDropdown');
    const practicesDropdownMenu = document.getElementById('practicesDropdownMenu');
    
    if (practicesDropdown && practicesDropdownMenu) {
        // Find the parent dropdown item
        const dropdownItem = practicesDropdown.closest('.nav__item--dropdown');
        
        practicesDropdown.addEventListener('click', function(e) {
            e.preventDefault();
            practicesDropdownMenu.classList.toggle('active');
            
            // Toggle active class on parent item for arrow rotation
            if (dropdownItem) {
                dropdownItem.classList.toggle('nav__dropdown-active');
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!practicesDropdown.contains(e.target) && !practicesDropdownMenu.contains(e.target)) {
                practicesDropdownMenu.classList.remove('active');
                
                // Remove active class from parent
                if (dropdownItem) {
                    dropdownItem.classList.remove('nav__dropdown-active');
                }
            }
        });
    }
    
    // Highlight "Практики" when on sub-pages
    const currentPath = window.location.pathname;
    const practicesPages = ['due-diligence.html', 'argue.html', 'bankruptcy.html', 'corporate-right.html'];
    const isPracticesPage = practicesPages.some(page => currentPath.endsWith(page) || currentPath.includes('/' + page));

    if (isPracticesPage && practicesDropdown) {
        practicesDropdown.classList.add('nav__link--active');
    }
    
    // Circle growth animation for page transitions
    function createCircleTransition(clickedElement, targetUrl) {
        console.log('createCircleTransition вызвана для:', targetUrl);
        
        // Hide existing page transition
        const existingTransition = document.getElementById('pageTransition');
        if (existingTransition) {
            existingTransition.style.display = 'none';
        }
        
        // Get the position of the clicked element
        const rect = clickedElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Create circle element
        const circle = document.createElement('div');
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
        
        // Calculate the size needed to cover the entire screen
        const maxDimension = Math.max(window.innerWidth, window.innerHeight) * 2.5;
        
        // Animate the circle growth
        setTimeout(() => {
            circle.style.width = maxDimension + 'px';
            circle.style.height = maxDimension + 'px';
        }, 10);
        
        // Navigate after animation
        setTimeout(() => {
            console.log('Переход на:', targetUrl);
            window.location.href = targetUrl;
        }, 600);
    }
    
    // Функция для закрытия бургер-меню
    function closeBurgerMenuIfOpen() {
        const burgerOverlay = document.getElementById('burgerMenuOverlay');
        const burgerBtn = document.getElementById('burgerMenu');
        if (burgerOverlay && burgerOverlay.classList.contains('active')) {
            burgerOverlay.classList.remove('active');
            if (burgerBtn) burgerBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Функция обработки клика по ссылке
    function handleLinkClick(e, link) {
        if (link.href && !link.href.includes('#') && !link.href.includes('javascript:')) {
            e.preventDefault();
            console.log('Переход по ссылке:', link.href);
            // Закрываем бургер-меню перед переходом
            closeBurgerMenuIfOpen();
            createCircleTransition(link, link.href);
        }
    }
    
    // Add click handlers to all navigation links
    const navLinks = document.querySelectorAll('.nav__link, .nav__dropdown-link, .burger-menu__link');
    console.log('Найдено ссылок:', navLinks.length);
    
    navLinks.forEach(link => {
        console.log('Обработка ссылки:', link.href, link.className);
        if (link.href && !link.href.includes('#') && !link.href.includes('javascript:')) {
            link.addEventListener('click', function(e) {
                handleLinkClick(e, this);
            });
        } else {
            console.log('Ссылка пропущена:', link.href, link);
        }
    });
    
    // Add click handlers to logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            createCircleTransition(this, this.href);
        });
    }
});
