План миграции Liga Prava: Static HTML -> 1C-Bitrix + Barba.js
Контекст
Клиент просит натянуть готовую HTML-верстку юридической фирмы "Лига Права" на 1C-Bitrix CMS и реализовать SPA-переходы между страницами с сохранением SEO. Проект — 11 статических HTML-страниц с SCSS, Lottie-анимациями, кастомными page transitions (круговая анимация) и адаптивной версткой (BEM, шрифт Manrope).

Выбранное решение для SPA: Barba.js — страницы рендерятся на сервере (SEO из коробки), Barba перехватывает навигацию и подгружает контент через AJAX с плавными переходами.

Текущая структура проекта
11 HTML-страниц: index, about, cases, case-detail, contacts, privacy, 404, due-diligence, argue, bankruptcy, corporate-right
CSS: SCSS (15 модулей) -> style.css (57KB) + page-transition.css + 404.css
JS: 9 файлов (~1274 строки): script.js, navigation.js, about.js, cases.js, contacts.js, due-diligence.js, 404.js, practices.js, privacy.js
Анимации: 2 Lottie JSON, круговой page transition
Шрифты: Manrope (7 начертаний, локальные TTF)
Изображения: ~52MB
Сборка: Node.js скрипт, SCSS + autoprefixer
Фаза 1: Установка Bitrix и создание шаблона
1.1 Установить Bitrix на сервере
Редакция "Стандарт" или "Малый бизнес"
MySQL/MariaDB, пустой проект (без готового шаблона)
1.2 Создать структуру шаблона
/local/templates/ligaprava/
header.php
footer.php
description.php
/css/
style.css # скомпилированный из SCSS
page-transition.css
/js/
script.js # рефакторинг глобального JS
navigation.js # рефакторинг навигации
barba-transitions.js # НОВЫЙ: логика Barba.js
page-init.js # НОВЫЙ: инициализация страниц
/animation/
Flow 8.json
liga-pad.json
/images/ # все изображения
/fonts/ # шрифты Manrope
/include/
burger-menu.php # вынесенный бургер-меню
Маппинг WordPress -> Bitrix (памятка)
WordPress Bitrix
wp-content/themes/ /local/templates/
functions.php /local/php_interface/init.php
get_template_directory_uri() SITE_TEMPLATE_PATH
wp_enqueue_script/style Asset::getInstance()->addJs/addCss()
get_template_part() $APPLICATION->IncludeFile()
CPT Инфоблоки
Фаза 2: header.php и footer.php
header.php — ключевая архитектура Barba.js

<body>
  <!-- ВНЕ barba wrapper (сохраняются при переходах): -->
  div.page-transition          # оверлей анимации перехода
  div.lottie-overlay           # Lottie при первом заходе

  <!-- Barba wrapper -->

div[data-barba="wrapper"]
<header> # ВНЕ container — сохраняется
burger-menu include # ВНЕ container — сохраняется

    <main data-barba="container" data-barba-namespace="...">
      <!-- СЮДА вставляется контент страницы -->

footer.php
</main>

  </div>  <!-- /wrapper -->

div.cookie-banner # ВНЕ wrapper — сохраняется

  <script> lottie.min.js (CDN)
  <script> @barba/core (CDN)
  <script> script.js, navigation.js, page-init.js, barba-transitions.js
</body>
Критичное решение: data-barba="container" оборачивает ТОЛЬКО контент страницы. Header, footer, overlay'и — вне контейнера, живут постоянно.

Фаза 3: Создание страниц в Bitrix
URL-маппинг
Статика	Bitrix	Файл
index.html	/	/index.php
about.html	/about/	/about/index.php
cases.html	/cases/	/cases/index.php
case-detail.html	/cases/detail/	/cases/detail/index.php
contacts.html	/contacts/	/contacts/index.php
privacy.html	/privacy/	/privacy/index.php
due-diligence.html	/due-diligence/	/due-diligence/index.php
argue.html	/argue/	/argue/index.php
bankruptcy.html	/bankruptcy/	/bankruptcy/index.php
corporate-right.html	/corporate-right/	/corporate-right/index.php
404.html	авто	/404.php
Шаблон каждой страницы
<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("О компании - Лига Права");
$APPLICATION->SetPageProperty("description", "...");?>

<!-- Контент страницы (только то, что между header и footer) -->
<section class="about background-image">
  <!-- ... содержимое about.html без header/footer ... -->
  <!-- Пути к картинкам: <?=SITE_TEMPLATE_PATH?>/images/... -->
</section>

<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>
Фаза 4: Интеграция Barba.js
4.1 barba-transitions.js (новый файл)
Основная логика:

Инициализация Barba с кругой анимацией перехода (адаптация текущей из navigation.js)
Карта namespace -> init-функция для вызова JS нужной страницы после перехода
Обновление active-ссылок в навигации после каждого перехода
prevent-правила для mailto, tel, target="_blank, якорей
Хуки: закрытие бургер-меню, cleanup observers/listeners, scroll to top
4.2 page-init.js (новый файл)
Объединяет инит-функции из ВСЕХ page-specific JS:

initHomePage() — hero-анимации
initAboutPage() — карусель партнёров, текстовые анимации
initCasesPage() — фильтр, слайдер
initContactsPage() — lazy-load Yandex Maps API, кнопки копирования
initPracticePage() — IntersectionObserver анимации
initPrivacyPage() — анимации появления
Все page-specific JS объединяются в один файл, т.к. при Barba-навигации любая страница может быть загружена без полного reload.

4.3 Рефакторинг существующего JS
script.js:

Разделить на one-time init (Lottie, cookie banner, mobile menu) и per-page init (hero анимации)
One-time запускается в DOMContentLoaded
Per-page функции — глобальные, вызываются из Barba
navigation.js:

УДАЛИТЬ createCircleTransition и все click-handlers на ссылках (Barba заменяет)
ОСТАВИТЬ только логику dropdown toggle
about.js, cases.js, contacts.js, practices.js, privacy.js, 404.js:

Извлечь логику в именованные функции
Убрать DOMContentLoaded обёртки
Перенести в page-init.js
4.4 Edge cases
Yandex Maps (contacts): lazy-load скрипта при Barba-переходе на страницу контактов
IntersectionObserver cleanup: disconnect всех observers перед leave-переходом
Event listeners cleanup: AbortController для window-level listeners
Бургер-меню: закрывать при начале перехода
Analytics: пробрасывать pageview в Yandex.Metrica/GA после каждого Barba-перехода
4.5 CSS для Barba-анимации
.barba-circle-overlay {
    position: fixed;
    border-radius: 50%;
    background: #FFFFFF;
    transform: translate(-50%, -50%);
    width: 0; height: 0;
    z-index: 9998;
    pointer-events: none;
    transition: width 0.6s ease-out, height 0.6s ease-out;
}
Фаза 5: SEO
Barba.js SEO-friendly by design:

Сервер отдаёт полный HTML (краулеры видят весь контент)
Barba перехватывает только JS-навигацию
document.title обновляется автоматически из полученной страницы
Дополнительно:

$APPLICATION->SetTitle() и SetPageProperty("description", ...) на каждой странице
<link rel="canonical"> на каждой странице
Семантический HTML (<main>, <section>, <nav>)
Один <h1> на страницу
Фаза 6: 404 и финальная настройка
/404.php с CHTTP::SetStatus("404 Not Found")
.htaccess: ErrorDocument 404 /404.php
Настройка шаблона в админке: Настройки > Настройки продукта > Сайты
Порядок выполнения
Установить Bitrix, создать папку шаблона
Скопировать статические ассеты (images, fonts, CSS, Lottie JSON)
Создать header.php с Barba-wrapper структурой
Создать footer.php с подключением скриптов
Создать burger-menu.php include
Создать все 11 страниц как Bitrix PHP-файлы
Рефакторинг script.js (разделить one-time и per-page init)
Рефакторинг navigation.js (убрать transition handlers)
Создать page-init.js (объединить все page-specific JS)
Создать barba-transitions.js (Barba init + circle transition)
Добавить CSS для Barba overlay
Настроить 404.php
Тестирование
Тестирование
SEO
 Каждая страница доступна по прямому URL (полный серверный рендер)
 View Source показывает весь контент
 Корректные title и meta на каждой странице
 Lighthouse SEO 90+
Barba.js переходы
 Все nav-ссылки — плавный круговой переход
 Кнопка назад/вперёд в браузере работает
 URL и document.title обновляются корректно
 Скролл сбрасывается наверх
 Нет дублирования event listeners после нескольких переходов
Функциональность страниц
 Home: Lottie при первом визите, hero-анимации
 About: карусель, текстовые анимации
 Cases: фильтр, слайдер
 Contacts: Yandex Maps (и при прямом заходе, и через Barba)
 Practices (4 страницы): IntersectionObserver анимации
 404: корректный рендер
Mobile
 Бургер-меню работает
 Бургер закрывается при Barba-переходе
 Адаптив на ~700px breakpoint
Edge cases
 Быстрые клики между ссылками
 JS отключён — обычная навигация (fallback)
 Cookie banner сохраняется при переходах
 Lottie НЕ воспроизводится повторно при Barba-переходах
Критичные файлы для модификации
js/script.js — рефакторинг: разделить one-time/per-page init
js/navigation.js — удалить createCircleTransition, оставить dropdown
js/about.js, js/cases.js, js/contacts.js, js/practices.js, js/privacy.js, js/404.js — объединить в page-init.js
css/page-transition.css — добавить стили .barba-circle-overlay
Все HTML файлы — конвертация в Bitrix PHP-шаблон
