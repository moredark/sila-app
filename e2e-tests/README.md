# E2E Tests for Sila App

Этот каталог содержит end-to-end тесты для Sila App с использованием Playwright, настроенные для мобильных устройств.

## Настройка

```bash
# Установка зависимостей
pnpm install

# Установка браузеров Playwright
pnpm run install
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

## Запуск тестов в Docker

Тесты можно запускать в Docker контейнере как часть CI/CD процесса:

```bash
# Запуск только контейнера с тестами
docker build -t e2e-tests .
docker run -it e2e-tests

# Запуск через docker-compose (для локального тестирования)
docker-compose -f ../docker-compose.yml up e2e-tests

# Запуск через docker-compose.ci.yml (для CI/CD)
docker-compose -f ../docker-compose.ci.yml up --build --exit-code-from e2e-tests e2e-tests
```

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
