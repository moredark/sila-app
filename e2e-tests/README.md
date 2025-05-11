# E2E тесты для Sila App

Этот каталог содержит end-to-end тесты для Sila App с использованием Playwright на мобильных устройствах.

## Настройка

```bash
# Установка зависимостей
pnpm install

# Установка браузеров Playwright
pnpm run install
```

## Настройка переменных окружения

Создайте файл `.env` в директории e2e-tests со следующими переменными:

```
TEST_EMAIL=your_test_email
TEST_PASSWORD=your_test_password
BASE_URL=https://sila-danila.ru
```

### Настройка GitHub Secrets для CI

Для запуска тестов в CI/CD необходимо добавить следующие секреты в GitHub Repository:

1. Откройте репозиторий на GitHub
2. Перейдите в Settings → Secrets and variables → Actions
3. Добавьте следующие секреты:
   - `TEST_EMAIL` - Email тестового пользователя
   - `TEST_PASSWORD` - Пароль тестового пользователя

![GitHub Secrets](https://docs.github.com/assets/cb-33159/mw-1440/images/help/repository/actions-secret-repository-creation.webp)

## Запуск тестов

```bash
# Запуск всех тестов
pnpm test

# Запуск тестов с UI интерфейсом
pnpm test:ui

# Запуск тестов в режиме с видимым браузером
pnpm test:headed

# Запуск тестов в режиме отладки
pnpm test:debug

# Показать отчет о тестировании
pnpm report
```

## Запуск тестов через GitHub Actions

Тесты можно запустить вручную из GitHub Actions. При этом:

1. Вы можете указать URL для тестирования (по умолчанию https://sila-danila.ru)
2. Креды для авторизации хранятся в GitHub Secrets (TEST_EMAIL, TEST_PASSWORD)
3. В CI запускаются только тесты на Chromium, тесты на WebKit отключены во избежание проблем с зависимостями

## Структура тестов

- **fixtures/base.fixture.ts** - расширенные фикстуры и класс EnhancedPage
- **tests/auth-setup.spec.ts** - специальный тест для настройки авторизации
- **tests/** - основные тесты (с авторизацией по умолчанию)
- **tests/public/** - тесты, не требующие авторизации (запускаются отдельно)

## Архитектура тестов

### Фикстуры и EnhancedPage

В проекте реализована система типобезопасных фикстур с использованием класса `EnhancedPage`, который:

- Расширяет стандартный `Page` Playwright, добавляя полезные методы
- Обеспечивает типобезопасность без использования `any`
- Улучшает стабильность тестов через механизмы повторных попыток
- Предоставляет решения для проблемных мест UI (комбобоксы, нестабильные элементы)

Основные расширенные методы:

| Метод                      | Описание                                                           |
| -------------------------- | ------------------------------------------------------------------ |
| `safeGoto(url)`            | Безопасная навигация с ожиданием загрузки страницы                 |
| `retryAction(fn, options)` | Выполняет действие с автоматическими повторными попытками          |
| `openCombobox(selector)`   | Надежно открывает комбобокс с автоматическими повторными попытками |

### Авторизация

Глобальная настройка авторизации в `global-setup.ts`:

- Автоматически применяется ко всем тестам (кроме тестов в папке `public/`)
- Состояние авторизации сохраняется в файле `playwright/.auth/user.json`
- Имеет TTL 24 часа для оптимизации повторных запусков
- Поддерживает механизм повторных попыток авторизации

## Добавление новых тестов

### Тесты с авторизацией (основной тип)

Создайте файл в папке `tests/` и используйте `authTest` и `enhancedPage`:

```typescript
import { authTest, expect } from "../fixtures/base.fixture";

authTest.describe("Название тестового набора", () => {
  authTest("Название теста", async ({ enhancedPage, page }) => {
    // `enhancedPage` - расширенная типобезопасная страница с доп. методами
    // `page` - стандартный Page от Playwright

    // Безопасный переход на страницу
    await enhancedPage.safeGoto("/some-path");

    // Нестабильное действие с повторными попытками
    await enhancedPage.retryAction(
      async () => {
        await page.getByRole("button", { name: "Кнопка" }).click();
      },
      { maxRetries: 3, label: "нажатие кнопки" }
    );

    // Работа с комбобоксом
    await enhancedPage.openCombobox();
    await page.getByText("Опция").click();

    // Проверка
    await expect(page.getByText("Результат")).toBeVisible();
  });
});
```

### Тесты без авторизации

Если нужно создать тест без авторизации, разместите его в папке `tests/public/` и используйте обычный тест:

```typescript
import { test, expect } from "@playwright/test";

test("Название теста", async ({ page }) => {
  await page.goto("/auth/login");
  // ...
});
```

Для запуска этих тестов используйте:

```bash
npx playwright test --project=public
```

## Запуск тестов

```bash
# Запуск всех тестов (включая авторизацию)
npx playwright test

# Запуск конкретного теста (с авторизацией)
npx playwright test tests/workout-session.spec.ts

# Запуск тестов без авторизации
npx playwright test --project=public
```

## Конфигурация

Конфигурация Playwright находится в `playwright.config.ts`. В текущей настройке:

- Все тесты запускаются с **мобильным разрешением**
- Поддерживаются два мобильных устройства:
  - Pixel 5 (для Chromium)
  - iPhone 14 (для WebKit) - **только при локальном запуске**
- В CI среде запускаются только тесты Chromium (Pixel 5) для обеспечения совместимости
- Настроены параметры, эмулирующие мобильное устройство:
  - Соответствующий viewport
  - Device Scale Factor
  - Touch события
  - Мобильный User Agent
- **Авторизация включена по умолчанию** для всех тестов (кроме папки `public/`)

## Переменные окружения

- `BASE_URL` - Базовый URL для тестов (по умолчанию: http://localhost:3000)
- `CI` - Установить в `true` в среде CI для настройки поведения тестов
