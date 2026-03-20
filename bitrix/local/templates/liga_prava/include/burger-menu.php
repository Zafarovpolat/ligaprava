<?php
// /local/templates/liga_prava/include/burger-menu.php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true)
    die();
?>
<div class="burger-menu" id="burgerMenuOverlay">
    <button class="burger-menu__close" id="burgerMenuClose" aria-label="Закрыть меню">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27 9L9 27" stroke="#122E52" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9 9L27 27" stroke="#122E52" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    </button>
    <div class="burger-menu__content">
        <nav class="burger-menu__nav">
            <ul class="burger-menu__list">
                <li class="burger-menu__item">
                    <a href="/about/" class="burger-menu__link">О компании</a>
                </li>
                <li class="burger-menu__item">
                    <a href="/practices/due-diligence/" class="burger-menu__link">Due Diligence</a>
                </li>
                <li class="burger-menu__item">
                    <a href="/practices/argue/" class="burger-menu__link">Разрешение споров</a>
                </li>
                <li class="burger-menu__item">
                    <a href="/practices/bankruptcy/" class="burger-menu__link">Банкротство и реструктуризация</a>
                </li>
                <li class="burger-menu__item">
                    <a href="/practices/corporate-right/" class="burger-menu__link">Корпоративное право</a>
                </li>
                <li class="burger-menu__item">
                    <a href="/cases/" class="burger-menu__link">Кейсы</a>
                </li>
                <li class="burger-menu__item">
                    <a href="/contacts/" class="burger-menu__link">Контакты</a>
                </li>
            </ul>
        </nav>

        <div class="burger-menu__contact">
            <div class="contact-info">
                <div class="contact-column">
                    <div class="contact-item">
                        <div class="contact-label">АДРЕС</div>
                        <div class="contact-value">г. Москва, Ленинский проспект,<br>д. 38А, стр.3, офис 96</div>
                    </div>
                    <div class="contact-item">
                        <div class="contact-label">ЧАСЫ РАБОТЫ</div>
                        <div class="contact-value">Пн-Пт: 9:00-18:00</div>
                    </div>
                </div>
                <div class="contact-column">
                                                <div class="contact-item">
                                <div class="contact-label">TG &amp; MAX</div>
                                <div class="contact-value contact-value--socials">
                                    <a href="http://t.me/Lprava_service_bot" target="_blank" class="social-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48" fill="none">
                                            <path d="M41.4193 7.30899C41.4193 7.30899 45.3046 5.79399 44.9808 9.47328C44.8729 10.9883 43.9016 16.2908 43.1461 22.0262L40.5559 39.0159C40.5559 39.0159 40.3401 41.5048 38.3974 41.9377C36.4547 42.3705 33.5408 40.4227 33.0011 39.9898C32.5694 39.6652 24.9068 34.7955 22.2086 32.4148C21.4531 31.7655 20.5897 30.4669 22.3165 28.9519L33.6487 18.1305C34.9438 16.8319 36.2389 13.8019 30.8426 17.4812L15.7331 27.7616C15.7331 27.7616 14.0063 28.8437 10.7686 27.8698L3.75342 25.7055C3.75342 25.7055 1.16321 24.0823 5.58815 22.459C16.3807 17.3729 29.6555 12.1786 41.4193 7.30899Z" fill="#122E52"/>
                                        </svg>
                                    </a>
                                    <a href="https://max.ru/id5003119613_bot" target="_blank" class="social-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" xml:space="preserve" viewBox="0 0 1000 1000">
                                            <path fill="#122E52" fill-rule="evenodd" d="M508.211 878.328c-75.007 0-109.864-10.95-170.453-54.75-38.325 49.275-159.686 87.783-164.979 21.9 0-49.456-10.95-91.248-23.36-136.873-14.782-56.21-31.572-118.807-31.572-209.508 0-216.626 177.754-379.597 388.357-379.597 210.786 0 375.947 171.001 375.947 381.604.707 207.347-166.595 376.118-373.94 377.224m3.103-571.585c-102.564-5.292-182.499 65.7-200.201 177.024-14.6 92.162 11.315 204.398 33.397 210.238 10.585 2.555 37.23-18.98 53.837-35.587a189.8 189.8 0 0 0 92.71 33.032c106.273 5.112 197.08-75.794 204.215-181.95 4.154-106.382-77.67-196.486-183.958-202.574z" clip-rule="evenodd"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                    <div class="contact-item">
                        <div class="contact-label">E-MAIL</div>
                        <div class="contact-value"><a href="mailto:info@lawfirm.ru">info@lawfirm.ru</a></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="burger-menu__footer">
            <a href="/privacy/" class="footer-link">ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</a>
        </div>
    </div>
</div>