import { authTest, expect } from "../fixtures/base.fixture";

authTest.describe("Workout Session Tests", () => {
  authTest("Workout Session", async ({ enhancedPage, page }) => {
    // Увеличиваем таймаут для этого теста
    authTest.setTimeout(60000);

    // Безопасно переходим на главную страницу
    await enhancedPage.safeGoto("/");

    // Находим и кликаем на упражнение "Bench Press"
    await enhancedPage.retryAction(
      async () => {
        await page
          .getByRole("heading", { name: "Bench Press", exact: true })
          .click();
      },
      { maxRetries: 3, label: "клик на Bench Press" }
    );

    // Ждем загрузки страницы и кликаем "Start workout"
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "Start workout" }).click();

    // Добавляем сет
    await page.getByRole("button", { name: "Add Set" }).click();

    // Увеличиваем повторения
    await page.getByRole("button", { name: "Increase reps" }).click();
    await page.getByRole("button", { name: "Increase reps" }).click();

    // Устанавливаем вес
    await page.getByPlaceholder("Weight (kg)").click();
    await page.getByPlaceholder("Weight (kg)").fill("40");

    // Подтверждаем сет
    await page.getByRole("button", { name: "Submit" }).click();

    // Проверяем, что сет добавлен
    await expect(page.getByText("Reps")).toBeVisible();

    // Взаимодействуем с таймером
    await page.getByText("Weight (kg)").click();
    await page.getByRole("button", { name: "Start timer" }).click();
    await page.getByRole("button", { name: "Reset timer" }).click();

    // Завершаем тренировку
    await page.getByRole("button", { name: "End Workout" }).click();
    await page.getByRole("button", { name: "End Workout" }).click();

    // Проверяем, что тренировка завершена
    await page.waitForURL("**/workout");
  });
});
