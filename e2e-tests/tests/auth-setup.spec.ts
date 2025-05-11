import { test } from "@playwright/test";

// Этот тест предназначен для запуска в проекте setup
// Он просто активирует global-setup.ts
test("Настройка аутентификации", async ({ page }) => {
  // Тест не делает ничего, так как авторизация происходит в global-setup.ts
  console.log("✅ Настройка аутентификации завершена");
});

// Запускаем только в проекте setup
test.use({ testIdAttribute: "setup" });
