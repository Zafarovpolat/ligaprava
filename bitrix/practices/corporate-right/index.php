<?php
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$APPLICATION->SetTitle("Корпоративное право - Лига Права");
$APPLICATION->SetPageProperty("description", "Корпоративное право — правовая архитектура бизнеса.");
?>

<section class="due-diligence">
    <div class="container">
        <div class="due-diligence__wrapper">
            <div class="due-diligence__hero">
                <h1 class="due-diligence__title">КОРПОРАТИВНОЕ ПРАВО</h1>
                <p class="due-diligence__subtitle">Правовая архитектура бизнеса и сопровождение корпоративных процессов
                </p>
            </div>

            <div class="due-diligence__visual">
                <div class="due-diligence__image-container">
                    <img src="<?= SITE_TEMPLATE_PATH ?>/images/corporate-right.png" alt="Корпоративное право"
                        class="due-diligence__image" />
                </div>

                <div class="due-diligence__info-box">
                    <div class="due-diligence__info-grid">
                        <div class="due-diligence__column">
                            <h2 class="due-diligence__section-title">Ключевые аспекты</h2>
                            <ul class="due-diligence__list">
                                <li>Создание и структурирование компаний и холдинговых структур</li>
                                <li>Разработка корпоративных договоров и акционерных соглашений</li>
                                <li>Сопровождение сделок с долями и акциями (M&A)</li>
                                <li>Урегулирование корпоративных конфликтов между участниками</li>
                            </ul>
                        </div>
                        <div class="due-diligence__column">
                            <h2 class="due-diligence__section-title">Методология</h2>
                            <ul class="due-diligence__list">
                                <li>Анализ корпоративной структуры и выявление юридических рисков</li>
                                <li>Разработка эффективной модели корпоративного управления</li>
                                <li>Подготовка юридической документации и корпоративных решений</li>
                                <li>Комплексное сопровождение сделок и корпоративных изменений</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<?php require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php"); ?>