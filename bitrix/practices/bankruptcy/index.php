<?php
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$APPLICATION->SetTitle("Банкротство и реструктуризация - Лига Права");
$APPLICATION->SetPageProperty("description", "Банкротство и реструктуризация — комплексное сопровождение процедур.");
?>

<section class="due-diligence">
    <div class="container">
        <div class="due-diligence__wrapper">
            <div class="due-diligence__hero">
                <h1 class="due-diligence__title">БАНКРОТСТВО И РЕСТРУКТУРИЗАЦИЯ</h1>
                <p class="due-diligence__subtitle">Комплексное сопровождение процедур банкротства и восстановления
                    бизнеса</p>
            </div>

            <div class="due-diligence__visual">
                <div class="due-diligence__image-container">
                    <img src="<?= SITE_TEMPLATE_PATH ?>/images/bankrupcy.png" alt="Банкротство и реструктуризация"
                        class="due-diligence__image" />
                </div>

                <div class="due-diligence__info-box">
                    <div class="due-diligence__info-grid">
                        <div class="due-diligence__column">
                            <h2 class="due-diligence__section-title">Ключевые аспекты</h2>
                            <ul class="due-diligence__list">
                                <li>Представительство кредиторов и должников в процедурах банкротства</li>
                                <li>Оспаривание сделок и защита активов компании</li>
                                <li>Субсидиарная ответственность контролирующих лиц</li>
                                <li>Разработка стратегий реструктуризации задолженности</li>
                            </ul>
                        </div>
                        <div class="due-diligence__column">
                            <h2 class="due-diligence__section-title">Методология</h2>
                            <ul class="due-diligence__list">
                                <li>Комплексный анализ финансового состояния и структуры долгов</li>
                                <li>Разработка стратегии защиты активов и управления рисками</li>
                                <li>Взаимодействие с арбитражными управляющими и кредиторами</li>
                                <li>Сопровождение процедур наблюдения, внешнего управления и конкурсного производства
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<?php require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php"); ?>