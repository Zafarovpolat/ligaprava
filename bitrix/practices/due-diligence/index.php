<?php
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$APPLICATION->SetTitle("Due Diligence - Лига Права");
$APPLICATION->SetPageProperty("description", "Due Diligence — комплексный аудит и фундамент для риск-менеджмента.");
?>

<section class="due-diligence">
    <div class="container">
        <div class="due-diligence__wrapper">
            <div class="due-diligence__hero">
                <h1 class="due-diligence__title">DUE DILIGENCE</h1>
                <p class="due-diligence__subtitle">Комплексный аудит – фундамент для риск-менеджмента</p>
            </div>

            <div class="due-diligence__visual">
                <div class="due-diligence__image-container">
                    <img src="<?= SITE_TEMPLATE_PATH ?>/images/due-diligence-bg.png" alt="Due Diligence"
                        class="due-diligence__image" />
                </div>

                <div class="due-diligence__info-box">
                    <div class="due-diligence__info-grid">
                        <div class="due-diligence__column">
                            <h2 class="due-diligence__section-title">Ключевые аспекты</h2>
                            <ul class="due-diligence__list">
                                <li>Финансовый due diligence: анализ отчетности, cash flow</li>
                                <li>Юридический аудит: проверка лицензий, судебных рисков, чистоты сделок</li>
                            </ul>
                        </div>
                        <div class="due-diligence__column">
                            <h2 class="due-diligence__section-title">Методология</h2>
                            <ul class="due-diligence__list">
                                <li>Глубинный анализ по 120+ параметрам</li>
                                <li>Risk-mapping с приоритезацией угроз</li>
                                <li>Конфиденциальность на всех этапах</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<?php require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php"); ?>