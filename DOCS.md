# DOCS — Миграция Лига Права на 1C-Битрикс + Barba.js

## Обзор проекта

**Сайт:** Юридическая компания "Лига Права"
**Текущее состояние:** Статичная HTML-вёрстка (12 страниц)

## Последние обновления (Март 2026)

### UI и Функциональность

- **Карусель партнеров:** Обновлена секция логотипов на странице "О компании". Добавлено 9 новых логотипов в две синхронизированные дорожки с бесконечной анимацией.
- **Профиль пользователя:**
  - Реализована вкладка **"Ограничения" (Restrictions)**: правила сайта, статус модерации, ежедневные лимиты.
  - Рефакторинг вкладок **"Подписки" и "Подписчики"**: оптимизирована верстка карточек (grid), кнопка "Показать еще" интегрирована в контейнер списка.
  - Добавлен тултип **"Поделиться"**: кнопки VK, OK и Telegram для профиля пользователя и админа.
  - Улучшена адаптивность страницы профиля (статистика, сетка рангов).
- **Страница вопроса:** Уточнены стили кнопок голосования (hover, border), добавлена пометка "в ответ" для вложенных комментариев, исправлены цвета в темной теме.

### Технический долг и багфиксы

- Исправлены критические ошибки сборки TypeScript в профиле.
- Устранена проблема с первичным кликом по кнопке "max.ru".
- Оптимизированы CSS-переменные для адаптивности на экранах <1300px.

---

## Структура текущей вёрстки

### Страницы

| Файл                   | Описание                                 |
| ---------------------- | ---------------------------------------- |
| `index.html`           | Главная страница                         |
| `about.html`           | О компании                               |
| `contacts.html`        | Контакты                                 |
| `cases.html`           | Кейсы (список)                           |
| `case-detail.html`     | Детальная страница кейса                 |
| `privacy.html`         | Политика конфиденциальности              |
| `due-diligence.html`   | Практика: Due Diligence                  |
| `argue.html`           | Практика: Разрешение споров              |
| `bankruptcy.html`      | Практика: Банкротство и реструктуризация |
| `bankrupcy.html`       | Дубль (с опечаткой, уточнить)            |
| `corporate-right.html` | Практика: Корпоративное право            |
| `404.html`             | Страница ошибки                          |

### Ассеты

| Папка           | Содержимое                                                                     |
| --------------- | ------------------------------------------------------------------------------ |
| `css/`          | `style.css`, `page-transition.css`, `404.css`                                  |
| `js/`           | `script.js`, `about.js`, `contacts.js`, `practices.js`, `privacy.js`, `404.js` |
| `js/animation/` | Lottie JSON-файлы (`Flow 8.json`, `liga-pad.json`)                             |
| `images/`       | Изображения, иконки, favicon                                                   |
| `fonts/`        | Шрифты                                                                         |
| `build/`        | Продакшн-билд (копия с index.php для навигации)                                |

### Текущие JS-фичи

- Lottie-анимация при первом заходе (сессионная, `sessionStorage`)
- Анимация переходов между страницами (bubble-эффект через `page-transition.css`)
- Мобильное меню
- Hero-анимации текста
- Cookie-баннер

---

## Часть 1 — Миграция на Битрикс

### Этап 1: Подготовка окружения

1. Установить 1C-Битрикс (редакция "Стандарт" или "Малый бизнес")
2. Настроить хостинг (PHP 8.0+, MySQL 5.7+, mod_rewrite)
3. Настроить SSL-сертификат
4. Создать базу данных и выполнить установку через веб-интерфейс

### Этап 2: Создание шаблона сайта

Структура шаблона в `/local/templates/liga_prava/`:

```
/local/templates/liga_prava/
├── header.php          ← <head> + шапка сайта
├── footer.php          ← подвал + закрывающие теги
├── template_styles.css ← основные стили (из style.css)
├── styles.css          ← доп. стили
├── script.js           ← основной скрипт
├── description.php     ← описание шаблона
├── images/             ← изображения шаблона
├── fonts/              ← шрифты
├── js/                 ← JS-файлы
│   ├── script.js
│   ├── about.js
│   ├── contacts.js
│   ├── practices.js
│   └── animation/      ← Lottie JSON
└── components/         ← кастомизация компонентов Битрикса
```

**header.php** — перенести из `index.html`:

- `<head>` с мета-тегами (заменить статичные на `$APPLICATION->ShowTitle()`, `$APPLICATION->ShowHead()`)
- Подключение стилей через `$APPLICATION->SetAdditionalCSS()`
- `<header>` с навигацией (вынести в компонент или include)
- Обёртка `data-barba="wrapper"` и `data-barba-namespace`

**footer.php** — перенести:

- Footer-разметку
- Подключение JS через `$APPLICATION->AddHeadScript()`
- Cookie-баннер
- Закрывающие теги `</body></html>`

### Этап 3: Создание структуры страниц

Соответствие HTML-страниц разделам Битрикса:

```
/ (index.php)                    ← Главная
/about/ (about/index.php)        ← О компании
/contacts/ (contacts/index.php)  ← Контакты
/cases/ (cases/index.php)        ← Кейсы (список)
/cases/detail/ (cases/detail.php)← Детальная кейса
/privacy/ (privacy/index.php)    ← Политика конфиденциальности
/practices/due-diligence/        ← Due Diligence
/practices/argue/                ← Разрешение споров
/practices/bankruptcy/           ← Банкротство
/practices/corporate-right/      ← Корпоративное право
```

В каждом `index.php` раздела:

```php
<?php
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Заголовок страницы");
?>

<!-- Контент страницы (из соответствующего HTML) -->
<div data-barba="container" data-barba-namespace="page-name">
    <!-- ... -->
</div>

<?php require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php"); ?>
```

### Этап 4: Инфоблоки (динамический контент)

Создать инфоблоки для управляемого контента:

| Инфоблок | Назначение             | Поля                                             |
| -------- | ---------------------- | ------------------------------------------------ |
| Кейсы    | Список кейсов          | Название, описание, изображение, категория, дата |
| Практики | Направления практик    | Название, описание, иконка, детальный текст      |
| Команда  | Сотрудники (если есть) | ФИО, должность, фото, описание                   |
| Слайдер  | Баннеры главной        | Заголовок, текст, изображение, ссылка            |

### Этап 5: Компоненты Битрикса

Для вывода динамического контента использовать стандартные компоненты:

- `bitrix:news.list` — для списков (кейсы, практики)
- `bitrix:news.detail` — для детальных страниц
- `bitrix:menu` — для меню навигации
- `bitrix:breadcrumb` — для хлебных крошек
- `bitrix:form.result.new` — для форм обратной связи

---

## Часть 2 — SPA-переходы с Barba.js

### Почему Barba.js

- Страницы рендерятся на сервере (SEO из коробки, Битрикс отдаёт полный HTML)
- Barba.js перехватывает клики и подгружает контент через AJAX
- Плавные анимации переходов
- Не требует изменения серверной архитектуры

### Этап 6: Установка и настройка Barba.js

**Установка:**

```bash
npm install @barba/core
# или CDN:
# <script src="https://unpkg.com/@barba/core"></script>
```

**Разметка (в header.php и footer.php):**

```html
<!-- В header.php после <body> -->
<div data-barba="wrapper">
  <!-- В каждой странице контент обёрнут так: -->
  <div data-barba="container" data-barba-namespace="home">
    <!-- контент страницы -->
  </div>

  <!-- В footer.php перед </body> -->
</div>
```

**Инициализация (js/barba-init.js):**

```javascript
import barba from "@barba/core";

barba.init({
  // Предотвращаем перехват ненужных ссылок
  prevent: ({ el }) => el.classList && el.classList.contains("no-barba"),

  transitions: [
    {
      name: "bubble-transition",

      // Анимация выхода текущей страницы
      leave(data) {
        const transition = document.getElementById("pageTransition");
        transition.classList.add("active");

        return new Promise((resolve) => {
          const bubble = transition.querySelector(".bubble");
          bubble.style.transform =
            "translateX(-50%) translateY(-50%) scale(15)";
          setTimeout(resolve, 800);
        });
      },

      // Анимация входа новой страницы
      enter(data) {
        const transition = document.getElementById("pageTransition");

        return new Promise((resolve) => {
          const bubble = transition.querySelector(".bubble");
          bubble.style.transform = "translateX(-50%) translateY(-50%) scale(0)";

          setTimeout(() => {
            transition.classList.remove("active");
            resolve();
          }, 600);
        });
      },

      // После завершения перехода
      after(data) {
        // Реинициализация скриптов страницы
        reinitPageScripts(data.next.namespace);
        window.scrollTo(0, 0);
      },
    },
  ],
});

// Реинициализация скриптов после AJAX-перехода
function reinitPageScripts(namespace) {
  // Общие скрипты
  initMobileMenu();
  initCookieBanner();

  // Скрипты конкретных страниц
  switch (namespace) {
    case "home":
      initHeroAnimations();
      break;
    case "about":
      if (typeof initAboutPage === "function") initAboutPage();
      break;
    case "contacts":
      if (typeof initContactsPage === "function") initContactsPage();
      break;
    case "practices":
      if (typeof initPracticesPage === "function") initPracticesPage();
      break;
  }
}
```

### Этап 7: Адаптация существующих JS-скриптов

Текущие скрипты привязаны к `DOMContentLoaded`, который **не сработает** при AJAX-навигации. Нужно:

1. **Вынести инициализацию из `DOMContentLoaded`** в именованные функции
2. **Убрать `initPageTransitions()`** из `script.js` — Barba.js заменяет эту логику
3. **Сохранить Lottie-анимацию** только для первого захода (уже работает через `sessionStorage`)
4. **Убедиться** что все event listener'ы очищаются при уходе со страницы (предотвращение утечек памяти)

**Что изменить в каждом JS-файле:**

```javascript
// БЫЛО:
document.addEventListener("DOMContentLoaded", function () {
  initSomething();
});

// СТАЛО:
function initSomethingPage() {
  initSomething();
}
// Первый заход — обычная инициализация
document.addEventListener("DOMContentLoaded", initSomethingPage);
// AJAX-переходы — вызов из reinitPageScripts()
```

### Этап 8: SEO-настройки

Barba.js + серверный рендер = SEO работает автоматически, но нужно убедиться:

1. **Мета-теги обновляются** при переходе:

```javascript
barba.hooks.after((data) => {
  // Обновить title
  const nextTitle = data.next.html.match(/<title>(.*?)<\/title>/);
  if (nextTitle) document.title = nextTitle[1];

  // Обновить meta description
  const nextDesc = data.next.html.match(
    /<meta name="description" content="(.*?)"/,
  );
  if (nextDesc) {
    let meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", nextDesc[1]);
  }

  // Обновить canonical
  const nextCanonical = data.next.html.match(
    /<link rel="canonical" href="(.*?)"/,
  );
  if (nextCanonical) {
    let link = document.querySelector('link[rel="canonical"]');
    if (link) link.setAttribute("href", nextCanonical[1]);
  }

  // Обновить URL для аналитики
  if (typeof gtag === "function") {
    gtag("config", "GA_ID", { page_path: window.location.pathname });
  }
});
```

2. **Robots.txt и sitemap.xml** — стандартная настройка в Битриксе
3. **Все страницы доступны без JS** — сервер всегда отдаёт полный HTML
4. **Open Graph теги** — обновлять аналогично мета-тегам

---

## Порядок работ (чеклист)

### Фаза 1 — Битрикс (серверная часть)

- [ ] Установка и настройка Битрикса на хостинге
- [ ] Создание шаблона сайта (`header.php`, `footer.php`)
- [ ] Перенос стилей, шрифтов, изображений
- [ ] Создание структуры разделов (папки страниц)
- [ ] Перенос контента страниц в `index.php` каждого раздела
- [ ] Создание инфоблоков (кейсы, практики)
- [ ] Настройка компонентов для динамического контента
- [ ] Настройка меню через Битрикс
- [ ] Настройка форм обратной связи
- [ ] Настройка SEO-модуля (meta, sitemap, robots)

### Фаза 2 — Barba.js (клиентская часть)

- [ ] Добавить `data-barba` атрибуты в разметку
- [ ] Установить и подключить Barba.js
- [ ] Адаптировать bubble-анимацию переходов под Barba.js
- [ ] Рефакторинг JS-скриптов (вынести из `DOMContentLoaded`)
- [ ] Реализовать `reinitPageScripts()` для повторной инициализации
- [ ] Обновление мета-тегов при AJAX-переходах
- [ ] Обновление аналитики при AJAX-переходах
- [ ] Сохранить Lottie-анимацию для первого захода

### Фаза 3 — Тестирование

- [ ] Проверить все переходы между страницами
- [ ] Проверить работу кнопок "Назад"/"Вперёд" браузера
- [ ] Проверить прямой заход по URL на каждую страницу
- [ ] Проверить SEO: title, description, OG-теги при переходах
- [ ] Проверить мобильное меню после AJAX-перехода
- [ ] Проверить формы обратной связи
- [ ] Проверить cookie-баннер
- [ ] Проверить работу без JS (fallback на обычную навигацию)
- [ ] Кроссбраузерное тестирование
- [ ] Lighthouse аудит (SEO, Performance)

---

## Ключевые моменты

### Что нужно знать о Битриксе (отличия от WordPress)

| Концепция | WordPress               | Битрикс                                         |
| --------- | ----------------------- | ----------------------------------------------- |
| Шаблон    | `/wp-content/themes/`   | `/local/templates/`                             |
| Header    | `get_header()`          | `require("bitrix/header.php")`                  |
| Footer    | `get_footer()`          | `require("bitrix/footer.php")`                  |
| Контент   | Custom Post Types       | Инфоблоки (IBlock)                              |
| Запросы   | `WP_Query`              | `CIBlockElement::GetList()` / D7 ORM            |
| Меню      | `wp_nav_menu()`         | `$APPLICATION->IncludeComponent("bitrix:menu")` |
| Хуки      | `add_action/add_filter` | `AddEventHandler()`                             |
| Заголовок | `wp_title()`            | `$APPLICATION->ShowTitle()`                     |
| Скрипты   | `wp_enqueue_script()`   | `$APPLICATION->AddHeadScript()`                 |
| Стили     | `wp_enqueue_style()`    | `$APPLICATION->SetAdditionalCSS()`              |

### Возможные проблемы

1. **Утечки памяти** — event listener'ы от предыдущей страницы не удаляются. Решение: использовать `barba.hooks.beforeLeave` для очистки
2. **Inline-скрипты** — `<script>` внутри `data-barba-container` не выполнятся автоматически. Решение: использовать `barba.hooks.after` для eval или переписать на внешние файлы
3. **CSS-конфликты** — стили страниц могут конфликтовать при AJAX-загрузке. Решение: namespace'ить стили через `data-barba-namespace`
4. **Формы Битрикса** — AJAX-формы могут ломаться при Barba-переходах. Решение: реинициализировать формы в `after` хуке
