import { test as base, expect, Page } from "@playwright/test";

// Определяем интерфейс для нашей кастомной фикстуры
interface AuthFixtures {
  authenticatedPage: Page;
}

// Расширяем базовую фикстуру, добавляя авторизованную страницу
export const test = base.extend<AuthFixtures>({
  // Создаем авторизованную страницу
  authenticatedPage: async ({ page }, use) => {
    const email = process.env.TEST_EMAIL;
    const password = process.env.TEST_PASSWORD;

    if (!email || !password) {
      throw new Error("TEST_EMAIL или TEST_PASSWORD не установлены в .env");
    }

    // Открываем страницу авторизации
    await page.goto("/auth/login");

    // Вводим логин и пароль
    await page.getByRole("textbox", { name: "Email" }).fill(email);
    await page.getByRole("textbox", { name: "Password" }).fill(password);
    await page.getByRole("button", { name: "Login" }).click();

    // Проверяем, что авторизация успешна
    await expect(page.getByText("You have successfully logged")).toBeVisible();

    // Нужно дождаться полной загрузки после авторизации
    await page.waitForLoadState("networkidle");

    // Используем авторизованную страницу в тесте
    await use(page);
  },
});

export { expect };
