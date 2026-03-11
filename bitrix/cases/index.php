<?php
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$APPLICATION->SetTitle("Кейсы - Лига Права");
$APPLICATION->SetPageProperty("description", "Кейсы юридического агентства Лига Права. Успешные проекты и результаты.");
?>

<section class="cases">
    <div class="container">
        <div class="cases__content">
            <h1 class="cases__title">КЕЙСЫ</h1>

            <!-- Filter Navigation -->
            <nav class="cases__filter">
                <button class="cases__filter-btn active" data-filter="all">Все проекты</button>
                <button class="cases__filter-btn" data-filter="due-diligence">Due Diligence</button>
                <button class="cases__filter-btn" data-filter="disputes">Разрешение споров</button>
                <button class="cases__filter-btn" data-filter="bankruptcy">Банкротство и реструктуризация</button>
                <button class="cases__filter-btn" data-filter="corporate">Корпоративное право</button>
            </nav>

            <!-- Slider Navigation -->
            <div class="cases__slider-wrapper">
                <button class="cases__nav cases__nav--prev" id="prevCase" aria-label="Предыдущие кейсы">
                    <svg width="44" height="18" viewBox="0 0 44 18" fill="none" xmlns="http://www.w3.org/2000/svg"
                        style="transform: rotate(180deg);">
                        <path d="M0 9H43M43 9L35 1M43 9L35 17" stroke="currentColor" stroke-width="1.3"
                            stroke-linecap="square" stroke-linejoin="round" />
                    </svg>
                </button>

                <div class="cases__slider-container">
                    <div class="cases__grid" id="casesGrid">
                        <a href="/cases/detail/" class="cases__item" data-category="disputes">
                            <h3 class="cases__item-title">Возврат неотработанного аванса по договору строительного
                                подряда</h3>
                            <div class="cases__divider"></div>
                            <p class="cases__item-subtitle">Взысканы в пользу Клиента денежные средства</p>
                            <div class="cases__footer">
                                <div class="cases__meta">
                                    <span class="cases__date">Август 2021</span>
                                    <span class="cases__amount">Сумма иска 880 000 000 руб.</span>
                                </div>
                                <div class="cases__arrow">
                                    <svg width="44" height="18" viewBox="0 0 44 18" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 9H43M43 9L35 1M43 9L35 17" stroke="currentColor" stroke-width="1.3"
                                            stroke-linecap="square" stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </a>

                        <a href="/cases/detail/" class="cases__item" data-category="disputes">
                            <h3 class="cases__item-title">Взыскание лизинговых платежей</h3>
                            <div class="cases__divider"></div>
                            <p class="cases__item-subtitle">Взысканы в пользу Клиента денежные средства</p>
                            <div class="cases__footer">
                                <div class="cases__meta">
                                    <span class="cases__date">Сентябрь 2020</span>
                                    <span class="cases__amount">Сумма иска 6 900 000 евро</span>
                                </div>
                                <div class="cases__arrow">
                                    <svg width="44" height="18" viewBox="0 0 44 18" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 9H43M43 9L35 1M43 9L35 17" stroke="currentColor" stroke-width="1.3"
                                            stroke-linecap="square" stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </a>

                        <a href="/cases/detail/" class="cases__item" data-category="disputes">
                            <h3 class="cases__item-title">Защита прав иностранной компании на недвижимость</h3>
                            <div class="cases__divider"></div>
                            <p class="cases__item-subtitle">Признание незаконными действий Росреестра. Право
                                собственности компании восстановлено</p>
                            <div class="cases__footer">
                                <div class="cases__meta">
                                    <span class="cases__date">Сентябрь 2023</span>
                                    <span class="cases__amount">Цена предмета спора 200 000 000 руб.</span>
                                </div>
                                <div class="cases__arrow">
                                    <svg width="44" height="18" viewBox="0 0 44 18" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 9H43M43 9L35 1M43 9L35 17" stroke="currentColor" stroke-width="1.3"
                                            stroke-linecap="square" stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </a>

                        <a href="/cases/detail/" class="cases__item" data-category="disputes">
                            <h3 class="cases__item-title">Оспаривание брачного договора и раздел имущества</h3>
                            <div class="cases__divider"></div>
                            <p class="cases__item-subtitle">Брачный договор признан недействительным. Произведен раздел
                                активов: денежные средства и долей в компаниях бывшего супруга</p>
                            <div class="cases__footer">
                                <div class="cases__meta">
                                    <span class="cases__date">Сентябрь 2023</span>
                                    <span class="cases__amount">Цена предмета спора 2 000 000 000 руб.</span>
                                </div>
                                <div class="cases__arrow">
                                    <svg width="44" height="18" viewBox="0 0 44 18" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 9H43M43 9L35 1M43 9L35 17" stroke="currentColor" stroke-width="1.3"
                                            stroke-linecap="square" stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </a>

                        <a href="/cases/detail/" class="cases__item" data-category="disputes">
                            <h3 class="cases__item-title">Защита деловой репутации компании</h3>
                            <div class="cases__divider"></div>
                            <p class="cases__item-subtitle">Признание публикаций порочащими. Удаление информации и
                                публичное опровержение</p>
                            <div class="cases__footer">
                                <div class="cases__meta">
                                    <span class="cases__date">Октябрь 2014</span>
                                    <span class="cases__amount">Сумма иска 6 000 000 руб.</span>
                                </div>
                                <div class="cases__arrow">
                                    <svg width="44" height="18" viewBox="0 0 44 18" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 9H43M43 9L35 1M43 9L35 17" stroke="currentColor" stroke-width="1.3"
                                            stroke-linecap="square" stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </a>

                        <a href="/cases/detail/" class="cases__item" data-category="disputes">
                            <h3 class="cases__item-title">Приостановление деятельности медицинской организации</h3>
                            <div class="cases__divider"></div>
                            <p class="cases__item-subtitle">Защита публичных интересов PRO-bono. Приостановление работы
                                клиники на 90 дней</p>
                            <div class="cases__footer">
                                <div class="cases__meta">
                                    <span class="cases__date">Август 2021</span>
                                    <span class="cases__amount">PRO-bono</span>
                                </div>
                                <div class="cases__arrow">
                                    <svg width="44" height="18" viewBox="0 0 44 18" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 9H43M43 9L35 1M43 9L35 17" stroke="currentColor" stroke-width="1.3"
                                            stroke-linecap="square" stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </a>

                        <a href="/cases/detail/" class="cases__item" data-category="bankruptcy">
                            <h3 class="cases__item-title">Защита от субсидиарной ответственности в банкротстве</h3>
                            <div class="cases__divider"></div>
                            <p class="cases__item-subtitle">Отмена судебного акта в вышестоящей инстанции. Клиент
                                освобожден от ответственности</p>
                            <div class="cases__footer">
                                <div class="cases__meta">
                                    <span class="cases__date">Август 2025</span>
                                    <span class="cases__amount">Сумма иска 900 000 000 руб.</span>
                                </div>
                                <div class="cases__arrow">
                                    <svg width="44" height="18" viewBox="0 0 44 18" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 9H43M43 9L35 1M43 9L35 17" stroke="currentColor" stroke-width="1.3"
                                            stroke-linecap="square" stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </a>

                        <a href="/cases/detail/" class="cases__item" data-category="due-diligence">
                            <h3 class="cases__item-title">Due Diligence beauty-ритейлера</h3>
                            <div class="cases__divider"></div>
                            <p class="cases__item-subtitle">Комплексная проверка франчайзи международного beauty-бренда.
                            </p>
                            <div class="cases__footer">
                                <div class="cases__meta">
                                    <span class="cases__date">Сентябрь 2022</span>
                                    <span class="cases__amount">Сектор: Ретейл</span>
                                </div>
                                <div class="cases__arrow">
                                    <svg width="44" height="18" viewBox="0 0 44 18" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 9H43M43 9L35 1M43 9L35 17" stroke="currentColor" stroke-width="1.3"
                                            stroke-linecap="square" stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </a>

                        <a href="/cases/detail/" class="cases__item" data-category="due-diligence">
                            <h3 class="cases__item-title">Due Diligence франчайзи QSR-бренда</h3>
                            <div class="cases__divider"></div>
                            <p class="cases__item-subtitle">Оценка рисков смены бренда</p>
                            <div class="cases__footer">
                                <div class="cases__meta">
                                    <span class="cases__date">Сентябрь 2022</span>
                                    <span class="cases__amount">Сектор: Общественное питание</span>
                                </div>
                                <div class="cases__arrow">
                                    <svg width="44" height="18" viewBox="0 0 44 18" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 9H43M43 9L35 1M43 9L35 17" stroke="currentColor" stroke-width="1.3"
                                            stroke-linecap="square" stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>

                <button class="cases__nav cases__nav--next" id="nextCase" aria-label="Следующие кейсы">
                    <svg width="44" height="18" viewBox="0 0 44 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 9H43M43 9L35 1M43 9L35 17" stroke="currentColor" stroke-width="1.3"
                            stroke-linecap="square" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>

            <div class="cases__footer-all">
                <a href="#" class="cases__all-link">Все кейсы
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