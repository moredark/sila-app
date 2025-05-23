# Правила работы с Feature-Sliced Design (FSD)

Feature-Sliced Design (FSD) — это архитектурная методология для организации фронтенд-проектов, направленная на повышение структурированности, читаемости и масштабируемости кода в условиях быстро меняющихся бизнес-требований.

## Основные понятия

* **Слои (Layers)** — главный уровень структурирования проекта, определяющий область ответственности кода.
* **Срезы (Slices)** — разделяют слой по бизнес-домену, группируя связанные модули.
* **Сегменты (Segments)** — организуют код внутри среза по назначению (например, `ui`, `model`, `api` и т.д.).

---

## Слои (Layers) и их назначение

В FSD выделяют до 7 стандартных слоёв. Использование всех слоёв необязательно, однако названия должны быть стандартизированы.

| Слой         | Назначение                                                                                                    | Примеры содержимого                            |
| ------------ | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| **app**      | Точка входа, роутинг, глобальные стили, провайдеры, инициализация приложения                                  | `index.tsx`, `AppRouter`, `ThemeProvider`      |
| **views**    | Полные страницы или крупные части страницы, сгруппированные по тематике. Общие компоненты страницы — в `ui/`. | `WorkoutPage.tsx`, `ui/PageHeader.tsx`         |
| **widgets**  | Крупные самостоятельные блоки UI/логики, реализующие законченные use-case'ы                                   | `UserProfileWidget`, `CartWidget`              |
| **features** | Реализация пользовательских фич, несущих бизнес-ценность                                                      | `ChangePassword`, `AddToCart`, `SearchProduct` |
| **entities** | Бизнес-сущности, с которыми работает проект                                                                   | `user`, `product`, `order`                     |
| **shared**   | Переиспользуемые компоненты, утилиты и настройки, не зависящие от бизнес-логики                               | `ui-kit`, `helpers`, `config`, `constants`     |

> **Важно:** Каждый слой может использовать только слои, находящиеся ниже в иерархии. Например, `features` может использовать `entities` и `shared`, но не `widgets` или `views`.

---

## Срезы (Slices)

Срез — это папка внутри слоя, отражающая конкретный бизнес-домен (например, `user`, `cart`, `product`). Названия выбираются по смыслу и логике домена.

* Срезы **не могут использовать друг друга внутри одного слоя**, что способствует слабой связанности и высокой когезии.

---

## Сегменты (Segments)

Внутри каждого среза код структурируется по сегментам, исходя из назначения:

* **ui/** — компоненты интерфейса, стили, форматтеры.
* **model/** — бизнес-логика, сторы, схемы, интерфейсы.
* **api/** — запросы к backend, типы, мапперы.
* **lib/** — вспомогательные библиотеки, используемые внутри среза.
* **config/** — флаги, настройки, конфигурации.

### Пример структуры

```
features/
  add-to-cart/
    ui/
      AddToCartButton.tsx
    model/
      useAddToCart.ts
    api/
      addToCartApi.ts
```

---

## Конкретика по слою views

Мы используем `views` вместо `pages`, так как `pages` зарезервирован в Next.js. Внутри `views` создаются отдельные папки для каждой страницы (например, `workout`, `profile`). Компоненты, используемые только внутри этой страницы, располагаются в папке `ui/` и предназначены для композиции в основном файле страницы (например, `WorkoutPage.tsx`). Переиспользуемые компоненты, которые могут быть использованы в других местах проекта, следует выносить в `widgets`.

Внутри каждого среза `views`:

* Создаётся файл с основной страницей, например `WorkoutPage.tsx`, в котором собираются компоненты этого среза.
* Компоненты, используемые только на этой странице, располагаются в папке `ui/` внутри среза `workout`.
* В `index.ts` среза экспортируется только `WorkoutPage`, чтобы ограничить внешний доступ к внутренностям страницы.

### Пример

```
views/
  workout/
    ui/
      WorkoutHeader.tsx
      ExerciseList.tsx
    WorkoutPage.tsx
    index.ts // экспортирует WorkoutPage
```

---

## Ключевые правила и рекомендации

* **Иерархия зависимостей**

  * Слой может импортировать только модули из слоёв ниже по иерархии.
  * Срез не может импортировать другой срез на том же слое.

* **Публичный API**

  * Каждый срез должен иметь `index.ts`, экспортирующий только публичные сущности.

* **Масштабируемость**

  * Структура легко расширяется новыми фичами без нарушения изоляции существующего кода.

* **Переиспользуемость**

  * Общие компоненты и утилиты — в `shared`
  * Бизнес-логика и сущности — в `entities`
  * Пользовательские фичи — в `features`
