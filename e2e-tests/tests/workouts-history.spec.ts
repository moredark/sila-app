import { authTest, expect } from "../fixtures/base.fixture";

authTest.describe("Workouts History Tests", () => {
  authTest("Workout History", async ({ enhancedPage, page }) => {
    // Увеличиваем таймаут для этого теста
    authTest.setTimeout(60000);

    // Используем безопасный переход на страницу
    await enhancedPage.safeGoto("/workout-history");

    // Открываем комбобокс с повторными попытками
    await enhancedPage.openCombobox();

    // Выбираем опцию Bench Press
    await enhancedPage.retryAction(
      async () => {
        // Пробуем найти и кликнуть на опцию с точным соответствием
        await page.getByText("Bench Press", { exact: true }).first().click();

        // Проверяем, что опция выбрана (должен появиться элемент .rounded-lg)
        await page.waitForSelector(".rounded-lg", {
          state: "visible",
          timeout: 5000,
        });
      },
      { maxRetries: 3, label: "выбор Bench Press из списка" }
    );

    // Кликаем на первую карточку тренировки
    await page.locator(".rounded-lg").first().click();

    // Проверяем, что мы перешли на страницу с деталями
    await expect(
      page.getByRole("heading", { name: "Bench Press" })
    ).toBeVisible({ timeout: 10000 });
  });
});
