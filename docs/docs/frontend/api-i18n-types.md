# Генерация типов для API и i18n

В проекте используется генерация типов для API и интернационализации (i18n), что обеспечивает типобезопасность при разработке.

## Генерация типов API

### Общая информация

Типы API генерируются из OpenAPI-спецификации, которая получается с бэкенда. Для этого используется скрипт `generate-api-types.js`, который делает следующее:

1. Получает Swagger-документацию с API-сервера
2. Конвертирует её в формат OpenAPI 3.0
3. Генерирует TypeScript-типы с помощью `openapi-typescript`
4. Сохраняет результат в файл `src/shared/api/schema.d.ts`

### Скрипт generate-api-types.js

```js
const fs = require("fs").promises;
const swagger2openapi = require("swagger2openapi");
const { exec } = require("child_process");
const { promisify } = require("util");
const execAsync = promisify(exec);

const API_DOCS_URL = "https://sila-danila.ru/api/swagger/doc.json";
const SCHEMA_ROUTE = "./src/shared/api/schema.d.ts";
const TEMP_FILE = "./openapi-3.json";

async function convertSwaggerToOpenAPI(swagger) {
  return new Promise((resolve, reject) => {
    swagger2openapi.convert(swagger, {}, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.openapi);
      }
    });
  });
}

async function main() {
  try {
    const response = await fetch(API_DOCS_URL);
    const swagger = await response.json();

    const openapi = await convertSwaggerToOpenAPI(swagger);
    await fs.writeFile(TEMP_FILE, JSON.stringify(openapi, null, 2));

    await execAsync(`npx openapi-typescript ${TEMP_FILE} -o ${SCHEMA_ROUTE}`);
    await fs.unlink(TEMP_FILE);

    console.log("API types successfully generated!");
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main();
```

### Использование API-клиента

Сгенерированные типы используются для создания типизированного API-клиента с помощью библиотеки `openapi-fetch`:

```ts
import createClient from "openapi-fetch";

import { backendBaseUrl } from "@/shared/config";

import { paths } from "../schema";

import { authMiddleware, languageMiddleware } from "./middlewares";

const client = createClient<paths>({
  baseUrl: backendBaseUrl,
});

client.use(languageMiddleware);
client.use(authMiddleware);

export const { GET, POST, PUT, DELETE } = client;
```

Этот клиент предоставляет типизированные методы для взаимодействия с API и включает middleware для обработки аутентификации и языковых настроек.

## Генерация типов i18n

### Общая информация

Типы для интернационализации генерируются из файлов сообщений, чтобы обеспечить типобезопасность при использовании переводов. Скрипт `generate-i18n-types.js` анализирует файлы с переводами и создает TypeScript-тип `TranslationKeys`, который содержит все доступные ключи переводов.

### Скрипт generate-i18n-types.js

```js
const fs = require("fs");
const path = require("path");

const messagesPath = path.resolve(__dirname, "../src/app/messages");

const typesPath = path.resolve(__dirname, "../src/shared/types/i18n.d.ts");

const extractKeys = (obj, prefix = "") => {
  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];
    const newPrefix = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "object") {
      acc.push(...extractKeys(value, newPrefix));
    } else {
      acc.push(newPrefix);
    }

    return acc;
  }, []);
};

const generateTypes = () => {
  const locales = fs.readdirSync(messagesPath);
  const keys = new Set();

  locales.forEach((localeFile) => {
    const translations = require(path.join(messagesPath, localeFile));
    const extractedKeys = extractKeys(translations);
    extractedKeys.forEach((key) => keys.add(key));
  });

  const types = `
  // Generated i18n keys
  export type TranslationKeys = 
    ${[...keys].map((key) => `'${key}'`).join(" |\n    ")};
  `;

  fs.writeFileSync(typesPath, types.trim());
  console.log("i18n types generated successfully");
};

generateTypes();
```

### Использование типов i18n

Сгенерированный тип `TranslationKeys` используется в хуке `useTranslation` для обеспечения типобезопасности при доступе к переводам:

```tsx
"use client";

import { useTranslations } from "next-intl";

import { TranslationKeys } from "@/shared/types/i18n";

export function useTranslation() {
  const t = useTranslations();

  const typedT = (key: TranslationKeys) => t(key);

  return typedT;
}
```

Использование этого хука гарантирует, что вы всегда будете использовать существующие ключи переводов, и ошибки будут выявлены на этапе компиляции.

## Запуск скриптов генерации типов

В `package.json` добавлены скрипты для удобного запуска:

```json
{
  "scripts": {
    "generate:api-types": "node scripts/generate-api-types.js",
    "generate:i18n-types": "node scripts/generate-i18n-types.js",
  }
}
```