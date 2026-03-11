<?php
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$APPLICATION->SetTitle("Разрешение споров - Лига Права");
$APPLICATION->SetPageProperty("description", "Разрешение споров — стратегическая защита интересов бизнеса.");
?>

<section class="due-diligence">
    <div class="container">
        <div class="due-diligence__wrapper">
            <div class="due-diligence__hero">
                <h1 class="due-diligence__title">РАЗРЕШЕНИЕ СПОРОВ</h1>
                <p class="due-diligence__subtitle">Стратегическая защита интересов бизнеса в судебных и досудебных
                    спорах</p>
            </div>

            <div class="due-diligence__visual">
                <div class="due-diligence__image-container">
                    <img src="<?= SITE_TEMPLATE_PATH ?>/images/argue.png" alt="Разрешение споров"
                        class="due-diligence__image" />
                </div>

                <div class="due-diligence__info-box">
                    <div class="due-diligence__info-grid">
                        <div class="due-diligence__column">
                            <h2 class="due-diligence__section-title">Ключевые аспекты</h2>
                            <ul class="due-diligence__list">
                                <li>Представительство в арбитражных судах по коммерческим спорам</li>
                                <li>Досудебное урегулирование и переговорные стратегии</li>
                                <li>Споры из договорных отношений, поставки и подрядных контрактов</li>
                                <li>Защита активов и взыскание задолженности</li>
                            </ul>
                        </div>
                        <div class="due-diligence__column">
                            <h2 class="due-diligence__section-title">Методология</h2>
                            <ul class="due-diligence__list">
                                <li>Анализ правовой позиции и судебной практики по аналогичным делам</li>
                                <li>Построение процессуальной стратегии с оценкой рисков</li>
                                <li>Подготовка доказательственной базы и экспертных заключений</li>
                                <li>Сопровождение клиента на всех стадиях судебного процесса</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<?php require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php"); ?>