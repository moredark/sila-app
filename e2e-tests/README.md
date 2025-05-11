# E2E Tests для Sila App

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
TEST_USERNAME=your_test_username
TEST_PASSWORD=your_test_password
BASE_URL=https://sila-danila.ru
```

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
2. Креды для авторизации хранятся в GitHub Secrets (TEST_USERNAME, TEST_PASSWORD)

## Структура тестов

- `/tests` - Файлы тестов
- `/fixtures` - Тестовые фикстуры и моковые данные
- `/utils` - Вспомогательные функции и утилиты

## Конфигурация

Конфигурация Playwright находится в `playwright.config.ts`. В текущей настройке:

- Все тесты запускаются с **мобильным разрешением**
- Поддерживаются два мобильных устройства:
  - Pixel 5 (для Chromium)
  - iPhone 14 (для WebKit)
- Настроены параметры, эмулирующие мобильное устройство:
  - Соответствующий viewport
  - Device Scale Factor
  - Touch события
  - Мобильный User Agent

## Переменные окружения

- `BASE_URL` - Базовый URL для тестов (по умолчанию: http://localhost:3000)
- `CI` - Установить в `true` в среде CI для настройки поведения тестов
