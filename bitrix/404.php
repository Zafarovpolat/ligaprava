<?php
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$APPLICATION->SetTitle("404 - Страница не найдена - Лига Права");

// Устанавливаем HTTP-статус 404
CHTTP::SetStatus("404 Not Found");
?>

<section class="error-404">
    <div class="container">
        <div class="error-404__content">
            <h1 class="error-404__title">404</h1>
            <p class="error-404__message">Запрашиваемая страница не найдена</p>
            <p class="error-404__submessage">Возможно, она была удалена или перемещена.</p>
            <p class="error-404__actions-title">Что можно сделать:</p>
            <ul class="error-404__actions">
                <li>Проверить адрес на ошибки;</li>
                <li>Вернуться на главную страницу;</li>
                <li>Связаться с нами, если проблема повторяется.</li>
            </ul>
        </div>
    </div>
</section>

<?php require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php"); ?>