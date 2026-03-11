<?php
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$APPLICATION->SetTitle("О компании - Лига Права");
$APPLICATION->SetPageProperty("description", "О юридическом агентстве Лига Права. Миссия, ценности и команда.");
?>

<!-- About Section -->
<section class="about background-image">
    <div class="container">
        <div class="about__content">
            <div class="about__left">
                <div class="about__title">
                    <h1>О КОМПАНИИ</h1>
                </div>
                <div class="about__subtitle">
                    Миссия и ценности
                </div>
                <div class="about__text">
                    <p>В мире, где риски становятся сложнее,
                        а ставки – выше, мы предлагаем нестандартные решения. Наша миссия – обеспечивать максимальную
                        надежность там, где другие видят только ограничения.
                        <br>
                        Мы не просто оказываем юридические услуги – мы создаем стратегии, которые защищают интересы и
                        усиливают позиции наших клиентов
                    </p>
                </div>
            </div>
            <div class="about__right">
                <img src="<?= SITE_TEMPLATE_PATH ?>/images/about_img.png" alt="">
            </div>
        </div>
    </div>
</section>

<!-- Managing Partner Section -->
<section class="partner">
    <div class="container">
        <div class="partner__content">
            <div class="partner__info">
                <div class="partner__image">
                    <img src="<?= SITE_TEMPLATE_PATH ?>/images/advocats/talgir.png" alt="Басаев Талгир Эрдниевич" />
                </div>

                <div class="partner__quote">
                    <div class="partner__author">
                        <h2>Басаев Талгир Эрдниевич</h2>
                        <h3>Основатель, управляющий партнер</h3>
                    </div>

                    <div class="partner__text">
                        <img src="<?= SITE_TEMPLATE_PATH ?>/images/quote.svg" alt="">
                        <p>Мы работаем с теми, для кого результат – единственный
                            приемлемый вариант. Наша команда не просто решает
                            проблемы – мы предвосхищаем их.
                            <br>
                            Здесь нет шаблонных подходов: только анализ, точность
                            и ответственность за каждое принятое решение!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Partners Section -->
<section class="partners">
    <div class="container no-padding">
        <div class="partners__content">
            <div class="partners__title">Нам доверяют</div>

            <div class="partners__carousel" id="partnersCarousel1">
                <div class="partners__track" id="partnersTrack1">
                    <div class="partners__logo"><img
                            src="<?= SITE_TEMPLATE_PATH ?>/images/our-companies/butko-plastic.png" alt="BUTKO PLASTIC" />
                    </div>
                    <div class="partners__logo"><img src="<?= SITE_TEMPLATE_PATH ?>/images/our-companies/kenvik.png"
                            alt="KENVIK" /></div>
                    <div class="partners__logo"><img src="<?= SITE_TEMPLATE_PATH ?>/images/our-companies/saldens.png"
                            alt="SALDEN'S" /></div>
                    <div class="partners__logo"><img src="<?= SITE_TEMPLATE_PATH ?>/images/our-companies/kenzo.png"
                            alt="KENZO" /></div>
                    <div class="partners__logo"><img src="<?= SITE_TEMPLATE_PATH ?>/images/our-companies/my-adress.png"
                            alt="МОЙ АДРЕС" /></div>
                    <div class="partners__logo"><img src="<?= SITE_TEMPLATE_PATH ?>/images/our-companies/paymo.png"
                            alt="PAYMO" /></div>
                    <div class="partners__logo"><img src="<?= SITE_TEMPLATE_PATH ?>/images/our-companies/red-squre.png"
                            alt="RED S" /></div>
                </div>
            </div>
            <div class="partners__carousel" id="partnersCarousel2">
                <div class="partners__track" id="partnersTrack2">
                    <div class="partners__logo"><img
                            src="<?= SITE_TEMPLATE_PATH ?>/images/our-companies/butko-plastic.png" alt="BUTKO PLASTIC" />
                    </div>
                    <div class="partners__logo"><img src="<?= SITE_TEMPLATE_PATH ?>/images/our-companies/kenvik.png"
                            alt="KENVIK" /></div>
                    <div class="partners__logo"><img src="<?= SITE_TEMPLATE_PATH ?>/images/our-companies/saldens.png"
                            alt="SALDEN'S" /></div>
                    <div class="partners__logo"><img src="<?= SITE_TEMPLATE_PATH ?>/images/our-companies/kenzo.png"
                            alt="KENZO" /></div>
                    <div class="partners__logo"><img src="<?= SITE_TEMPLATE_PATH ?>/images/our-companies/my-adress.png"
                            alt="МОЙ АДРЕС" /></div>
                    <div class="partners__logo"><img src="<?= SITE_TEMPLATE_PATH ?>/images/our-companies/paymo.png"
                            alt="PAYMO" /></div>
                    <div class="partners__logo"><img src="<?= SITE_TEMPLATE_PATH ?>/images/our-companies/red-squre.png"
                            alt="RED S" /></div>
                </div>
            </div>
        </div>
    </div>
</section>

<?php require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php"); ?>