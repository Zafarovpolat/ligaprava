<?php
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$APPLICATION->SetTitle("Контакты - Лига Права");
$APPLICATION->SetPageProperty("description", "Контакты юридического агентства Лига Права. Адрес, телефон, email.");
?>

<section class="contacts">
    <div class="container contacts__wrapper">
        <div class="contacts__left">
            <h1 class="contacts__title">КОНТАКТЫ</h1>
            <div class="contacts__info-box">
                <div class="contact-item">
                    <h3 class="contact-item__label">Адрес</h3>
                    <p class="contact-item__value">г. Москва, Ленинский проспект,<br>д. 3А, стр.3, офис 96</p>
                </div>
                <div class="contact-item">
                    <h3 class="contact-item__label">Часы работы</h3>
                    <p class="contact-item__value">Пн-Пт: 9:00-18:00</p>
                </div>
                <div class="contact-item">
                    <h3 class="contact-item__label">Телефон</h3>
                    <p class="contact-item__value"><a href="tel:+74951234567">+7 (495) 123-45-67</a></p>
                </div>
                <div class="contact-item">
                    <h3 class="contact-item__label">E-mail</h3>
                    <p class="contact-item__value"><a href="mailto:info@lawfirm.ru">info@lawfirm.ru</a></p>
                </div>
            </div>
        </div>
        <div class="contacts__right">
            <div class="contacts__map">
                <div id="yandex-map"></div>
            </div>
        </div>
    </div>
</section>

<?php require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php"); ?>