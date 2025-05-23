<p align="center">
  <img src="https://github.com/user-attachments/assets/6e402a46-1e74-47c1-9fdf-d673b890bd34" alt="logo" width="15%" style=""/>
</p>

Sila — это мобильное веб-приложение, созданное для упрощения отслеживания и анализа прогресса в тренировках. Оно помогает пользователям фиксировать силовые показатели и анализировать динамику роста. Приложение идеально подходит как для новичков, так и для опытных спортсменов, стремящихся эффективно управлять своими тренировками и достигать новых высот.

<p align="center">
  <img src="https://github.com/user-attachments/assets/69689407-700c-4600-afd4-cd0ea508e2ec" alt="Screenshot 1" width="30%" style="margin: 0 10px;" />
  <img src="https://github.com/user-attachments/assets/63d53bd4-1fd6-45dc-abd3-3deb4b122f94" alt="Screenshot 2" width="30%" style="margin: 0 10px;" />
  <img src="https://github.com/user-attachments/assets/fdda04e9-4c7b-4b65-9054-225cdb9234fc" alt="Screenshot 3" width="30%" style="margin: 0 10px;" />
</p>

## Содержание

- [О проекте](#о-проекте)
- [Технологии](#технологии)
- [Использование](#использование)
- [Вклад](#вклад)
- [Лицензия](#лицензия)
- [Документация](#документация)

## О проекте

Sila — это комплексное решение для спортсменов и тренеров по управлению и оптимизации тренировочного процесса. Основные возможности:

- **Аутентификация через Google OAuth2**: безопасный и удобный вход с помощью Google-аккаунта.
- **Управление тренировками**: создание, редактирование и отслеживание тренировок и упражнений.
- **Отслеживание прогресса**: мониторинг силовых показателей и визуализация динамики роста.
- **Ролевая модель доступа**: разные уровни доступа для администраторов, тренеров и обычных пользователей.
- **API-документация**: интерактивная документация API через Swagger.
- **Docker-деплой**: простая установка и запуск с помощью Docker и Docker Compose.
- **PWA**: возможность установки приложения на мобильное устройство для нативного опыта.

## Технологии

### Фронтенд-технологии

- **React** — библиотека для построения пользовательских интерфейсов.
- **Next.js** — фреймворк для React-приложений.
- **TypeScript** — язык с поддержкой строгой типизации на базе JavaScript.
- **OpenAPI Fetch** — типобезопасный клиент для работы с OpenAPI схемой.
- **React Query** — библиотека для работы с асинхронными данными.
- **Zustand** — легковесное и масштабируемое решение для управления состоянием.
- **Shad UI** — современная библиотека UI-компонентов для React.
- **Tailwind CSS** — утилитарный CSS-фреймворк для быстрой разработки интерфейсов.
- **React Hook Form** — удобная работа с формами в React.
- **i18next** — фреймворк для интернационализации.

### Бэкенд-технологии

- **Go (Golang)** — компилируемый язык программирования от Google.
- **Fiber** — веб-фреймворк для Go, вдохновлённый Express.
- **GORM** — ORM-библиотека для Go.
- **PostgreSQL** — мощная объектно-реляционная СУБД.
- **OAuth2** — протокол авторизации.
- **JWT** — безопасная аутентификация через JSON Web Tokens.
- **Swagger** — инструмент для документирования и тестирования API.

## Использование

1. **Откройте приложение**

   Перейдите в браузере по адресу [https://sila-danila.ru](https://sila-danila.ru).

2. **Вход через Google**

   Нажмите кнопку "Login with Google" для аутентификации через Google-аккаунт.

3. **Управление тренировками**

   - **Создать тренировку**: перейдите в раздел "Create Workout" для создания новой тренировки.
   - **Отслеживать прогресс**: просматривайте свои тренировки и анализируйте динамику.
   - **История тренировок**: анализируйте историю своих занятий.

4. **API-документация**

   Интерактивная документация API доступна по адресу [https://sila-danila.ru/api/swagger/index.html](https://sila-danila.ru/api/swagger/index.html).

> Подробная информация по установке, деплою и использованию PWA доступна в [документации](#документация).

## Вклад

Вклад приветствуется! Пожалуйста, ознакомьтесь с `CONTRIBUTING.md` для начала работы.

## Лицензия

Распространяется по лицензии MIT. Подробнее см. в файле `LICENSE`.

## Документация

Полная документация по проекту доступна по адресу: [https://sila-danila.ru/docs/](https://sila-danila.ru/docs/)

Документация проекта разделена на несколько секций:

- [Установка](https://sila-danila.ru/docs/installation) — инструкции по установке и настройке приложения
- [Деплой](https://sila-danila.ru/docs/deployment) — руководство по развертыванию приложения на сервере
- [Установка PWA](https://sila-danila.ru/docs/pwa-installation) — как установить приложение на мобильное устройство

Также в разделе **Документация** вы найдёте подробную информацию по архитектуре фронтенда (структура, подходы, FSD, UI, best practices), а также описание основных технологий, паттернов и принципов, используемых в проекте.

