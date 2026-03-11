<?php
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$APPLICATION->SetTitle("Создание холдинговой структуры для IT-компании - Лига Права");
$APPLICATION->SetPageProperty("description", "Кейс: Создание холдинговой структуры для IT-компании.");
?>

<section class="case-detail">
    <div class="container">
        <div class="cases__content">
            <h2 class="cases__title">КЕЙСЫ</h2>

            <nav class="cases__filter">
                <a href="/cases/?filter=all" class="cases__filter-btn">Все проекты</a>
                <a href="/cases/?filter=due-diligence" class="cases__filter-btn">Due Diligence</a>
                <a href="/cases/?filter=disputes" class="cases__filter-btn">Разрешение споров</a>
                <a href="/cases/?filter=bankruptcy" class="cases__filter-btn">Банкротство и реструктуризация</a>
                <a href="/cases/?filter=corporate" class="cases__filter-btn active">Корпоративное право</a>
            </nav>

            <h1 class="case-detail__main-title">Создание холдинговой структуры для ІТ-компании</h1>

            <div class="case-detail__cards-wrapper">
                <div class="case-detail__card">
                    <h3 class="case-detail__card-title">Проблема</h3>
                    <div class="case-detail__card-divider"></div>
                    <div class="case-detail__card-content">
                        Необходимость разделения рисков между 9 юрисдикциями при сохранении единого управления.
                    </div>
                </div>

                <div class="case-detail__separator">
                    <svg width="44" height="18" viewBox="0 0 44 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 9H43M43 9L35 1M43 9L35 17" stroke="#9E8C67" stroke-width="1" stroke-linecap="square"
                            stroke-linejoin="round" />
                    </svg>
                </div>

                <div class="case-detail__card">
                    <h3 class="case-detail__card-title">Решение</h3>
                    <div class="case-detail__card-divider"></div>
                    <ul class="case-detail__card-list">
                        <li>Построение многоуровневой структуры с SPV</li>
                        <li>Разработка акционерного соглашения</li>
                        <li>Интеграция с налоговой стратегией</li>
                    </ul>
                </div>

                <div class="case-detail__separator">
                    <svg width="44" height="18" viewBox="0 0 44 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 9H43M43 9L35 1M43 9L35 17" stroke="#9E8C67" stroke-width="1" stroke-linecap="square"
                            stroke-linejoin="round" />
                    </svg>
                </div>

                <div class="case-detail__card">
                    <h3 class="case-detail__card-title">Результат</h3>
                    <div class="case-detail__card-divider"></div>
                    <ul class="case-detail__card-list">
                        <li>Оптимизирована налоговая нагрузка (с 24% до 12%)</li>
                        <li>Обеспечена гибкость при выходе на новые рынки</li>
                    </ul>
                </div>
            </div>

            <div class="case-detail__footer">
                <a href="/cases/" class="cases__all-link">Все кейсы
                    <svg width="44" height="18" viewBox="0 0 44 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 9H43M43 9L35 1M43 9L35 17" stroke="currentColor" stroke-width="1.3"
                            stroke-linecap="square" stroke-linejoin="round" />
                    </svg>
                </a>
            </div>
        </div>
    </div>
</section>

<?php require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php"); ?>