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
                        <div class="contact-label">ТЕЛЕФОН</div>
                        <div class="contact-value"><a href="tel:+74951234567">+7 (495) 123-45-67</a></div>
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