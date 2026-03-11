<?php
// /local/templates/liga_prava/footer.php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true)
    die();

$templatePath = SITE_TEMPLATE_PATH;
?>

</div><!-- /.main-content -->
</main><!-- /[data-barba="container"] -->

<!-- Cookie Consent Banner (ВНЕ Barba container, внутри wrapper) -->
<div class="cookie-banner" id="cookieBanner">
    <div class="cookie-banner__content">
        <p class="cookie-banner__text">
            Мы используем файлы cookie для улучшения работы сайта и анализа трафика.
            Продолжая использование сайта, вы соглашаетесь с нашей
            <a href="/privacy/" class="cookie-banner__link">Политикой конфиденциальности</a>
            и обработкой данных.
        </p>
        <div class="cookie-banner__buttons">
            <button class="cookie-banner__button cookie-banner__button--accept" id="acceptCookies">
                Принять
            </button>
            <button class="cookie-banner__button cookie-banner__button--decline" id="declineCookies">
                Отклонить
            </button>
        </div>
    </div>
</div>

</div><!-- /[data-barba="wrapper"] -->

<!-- Scripts -->
<script>var SITE_TEMPLATE_PATH = '<?= $templatePath ?>';</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js"></script>
<script src="https://unpkg.com/@barba/core"></script>
<script src="<?= $templatePath ?>/js/script.js"></script>
<script src="<?= $templatePath ?>/js/navigation.js"></script>
<script src="<?= $templatePath ?>/js/page-init.js"></script>
<script src="<?= $templatePath ?>/js/barba-transitions.js"></script>

<!-- Page-specific scripts (загружаются на всех страницах, вызываются по namespace) -->
<script src="<?= $templatePath ?>/js/about.js"></script>
<script src="<?= $templatePath ?>/js/cases.js"></script>
<script src="<?= $templatePath ?>/js/contacts.js"></script>
<script src="<?= $templatePath ?>/js/due-diligence.js"></script>
<script src="<?= $templatePath ?>/js/practices.js"></script>
<script src="<?= $templatePath ?>/js/privacy.js"></script>
<script src="<?= $templatePath ?>/js/404.js"></script>

</body>

</html>