<?php
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$APPLICATION->SetTitle("Лига Права - Выверенные юридические решения");
$APPLICATION->SetPageProperty("description", "Юридическое агентство Лига Права. Выверенные юридические решения в сложных правовых ситуациях.");
?>

<!-- Hero Section -->
<section class="hero">
    <div class="container">
        <div class="hero__content">
            <!-- Фоновое изображение -->
            <div class="hero__image">
                <img src="<?= SITE_TEMPLATE_PATH ?>/images/main-building.png" alt="Архитектурное здание" />
            </div>

            <!-- Текстовые блоки -->
            <div class="hero__text-content">
                <div class="hero__text-block hero__text-block--left">
                    <svg class="hero__bracket hero__bracket--left hero__bracket--desktop" width="20" height="240"
                        viewBox="0 0 20 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="path-1-inside-1_25_11421" fill="white">
                            <path d="M0 0H20V240H0V0Z" />
                        </mask>
                        <path
                            d="M0 0V-1.5H-1.5V0H0ZM0 240H-1.5V241.5H0V240ZM0 0V1.5H20V0V-1.5H0V0ZM20 240V238.5H0V240V241.5H20V240ZM0 240H1.5V0H0H-1.5V240H0Z"
                            fill="#98885A" mask="url(#path-1-inside-1_25_11421)" />
                    </svg>
                    <div class="hero__text">
                        <span class="hero__word">ВЫВЕРЕННЫЕ</span>
                        <span class="hero__word">ЮРИДИЧЕСКИЕ</span>
                        <span class="hero__word">РЕШЕНИЯ</span>
                    </div>
                </div>

                <div class="hero__text-block hero__text-block--right">
                    <div class="hero__text">
                        <span class="hero__word">В СЛОЖНЫХ</span>
                        <span class="hero__word">ПРАВОВЫХ</span>
                        <span class="hero__word">СИТУАЦИЯХ</span>
                    </div>
                    <svg class="hero__bracket hero__bracket--right hero__bracket--desktop" width="20" height="240"
                        viewBox="0 0 20 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="path-1-inside-1_25_11420" fill="white">
                            <path d="M0 0H20V240H0V0Z" />
                        </mask>
                        <path
                            d="M20 0H21.5V-1.5H20V0ZM20 240V241.5H21.5V240H20ZM0 0V1.5H20V0V-1.5H0V0ZM20 0H18.5V240H20H21.5V0H20ZM20 240V238.5H0V240V241.5H20V240Z"
                            fill="#98885A" mask="url(#path-1-inside-1_25_11420)" />
                    </svg>
                </div>

                <!-- Мобильный вариант -->
                <div class="hero__text-block hero__text-block--mobile">
                    <svg class="hero__bracket hero__bracket--left" width="20" height="240" viewBox="0 0 20 240"
                        fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="path-1-inside-1_25_11421_mobile" fill="white">
                            <path d="M0 0H20V240H0V0Z" />
                        </mask>
                        <path
                            d="M0 0V-1.5H-1.5V0H0ZM0 240H-1.5V241.5H0V240ZM0 0V1.5H20V0V-1.5H0V0ZM20 240V238.5H0V240V241.5H20V240ZM0 240H1.5V0H0H-1.5V240H0Z"
                            fill="#98885A" mask="url(#path-1-inside-1_25_11421_mobile)" />
                    </svg>
                    <div class="hero__text">
                        <span class="hero__word">ВЫВЕРЕННЫЕ</span>
                        <span class="hero__word">ЮРИДИЧЕСКИЕ</span>
                        <span class="hero__word">РЕШЕНИЯ</span>
                        <span class="hero__word">В СЛОЖНЫХ</span>
                        <span class="hero__word">ПРАВОВЫХ</span>
                        <span class="hero__word">СИТУАЦИЯХ</span>
                    </div>
                    <svg class="hero__bracket hero__bracket--right" width="20" height="240" viewBox="0 0 20 240"
                        fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="path-1-inside-1_25_11420_mobile" fill="white">
                            <path d="M0 0H20V240H0V0Z" />
                        </mask>
                        <path
                            d="M20 0H21.5V-1.5H20V0ZM20 240V241.5H21.5V240H20ZM0 0V1.5H20V0V-1.5H0V0ZM20 0H18.5V240H20H21.5V0H20ZM20 240V238.5H0V240V241.5H20V240Z"
                            fill="#98885A" mask="url(#path-1-inside-1_25_11420_mobile)" />
                    </svg>
                </div>
            </div>

            <!-- Нижний текст -->
            <div class="hero__bottom-text">
                <p>Право - это лабиринт. Мы знаем короткий путь.</p>
            </div>
        </div>
    </div>
</section>

<?php require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php"); ?>