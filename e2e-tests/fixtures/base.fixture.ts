import { test as baseTest, expect, Page } from "@playwright/test";
import path from "path";
import fs from "fs";

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

// Интерфейс для параметров повторных попыток
interface RetryOptions {
  maxRetries?: number;
  label?: string;
}

// Создаем класс-обертку для Page с дополнительными методами
class EnhancedPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Проксируем все вызовы к исходной странице
  async $(selector: string) {
    return this.page.$(selector);
  }

  async $$(selector: string) {
    return this.page.$$(selector);
  }

  async waitForSelector(selector: string, options?: any) {
    return this.page.waitForSelector(selector, options);
  }

  async waitForURL(url: string, options?: any) {
    return this.page.waitForURL(url, options);
  }

  async waitForLoadState(state?: any, options?: any) {
    return this.page.waitForLoadState(state, options);
  }

  async waitForTimeout(timeout: number) {
    return this.page.waitForTimeout(timeout);
  }

  async goto(url: string, options?: any) {
    return this.page.goto(url, options);
  }

  async click(selector: string, options?: any) {
    return this.page.click(selector, options);
  }

  async fill(selector: string, text: string) {
    return this.page.fill(selector, text);
  }

  locator(selector: string) {
    return this.page.locator(selector);
  }

  getByRole(role: any, options?: any) {
    return this.page.getByRole(role, options);
  }

  getByText(text: string, options?: any) {
    return this.page.getByText(text, options);
  }

  getByPlaceholder(text: string, options?: any) {
    return this.page.getByPlaceholder(text, options);
  }

  get mouse() {
    return this.page.mouse;
  }

  get keyboard() {
    return this.page.keyboard;
  }

  evaluate(fn: any, ...args: any[]) {
    return this.page.evaluate(fn, ...args);
  }

  // Дополнительные методы
  async retryAction(
    action: () => Promise<void>,
    options: RetryOptions = { maxRetries: 3, label: "действие" }
  ) {
    const { maxRetries = 3, label } = options;
    let attempt = 0;
    let lastError;

    while (attempt < maxRetries) {
      attempt++;
      try {
        await action();
        return; // Успешное выполнение
      } catch (error) {
        lastError = error;
        console.log(
          `⚠️ Попытка ${attempt}/${maxRetries} для "${label}" не удалась. Повторяем...`
        );
        await this.page.waitForTimeout(500);
      }
    }
    throw new Error(
      `❌ Не удалось выполнить "${label}" после ${maxRetries} попыток. Последняя ошибка: ${lastError}`
    );
  }

  async safeGoto(url: string, options = { timeout: 30000 }) {
    await this.page.goto(url, options);
    await this.page.waitForLoadState("networkidle");
  }

  async openCombobox(selector = 'button[role="combobox"]') {
    await this.retryAction(
      async () => {
        const button = this.page.locator(selector).first();
        await button.waitFor({ state: "visible", timeout: 10000 });

        try {
          await button.click();
        } catch (error) {
          const box = await button.boundingBox();
          if (box) {
            await this.page.mouse.move(
              box.x + box.width / 2,
              box.y + box.height / 2
            );
            await this.page.mouse.down();
            await this.page.waitForTimeout(200);
            await this.page.mouse.up();
          } else {
            throw new Error("Не удалось получить границы кнопки");
          }
        }

        await this.page.waitForSelector('[role="option"]', {
          state: "visible",
          timeout: 5000,
        });
      },
      { maxRetries: 3, label: "открытие комбобокса" }
    );
  }
}

// Объявляем новый интерфейс для наших фикстур
interface TestFixtures {
  enhancedPage: EnhancedPage;
}

/**
 * Базовый тест с нашими расширенными методами
 */
export const test = baseTest.extend<TestFixtures>({
  // Создаем расширенную страницу
  enhancedPage: async ({ page }, use) => {
    const enhancedPage = new EnhancedPage(page);
    await use(enhancedPage);
  },
});

// Настройки для авторизованных тестов
export const authTest = test.extend({
  // Используем сохраненное состояние авторизации
  storageState: authFile,
});

// Функция проверки существования файла авторизации
export function checkAuthFile() {
  if (!fs.existsSync(authFile)) {
    console.error(`❌ Файл авторизации не найден: ${authFile}`);
    throw new Error(
      `Файл авторизации отсутствует. Запустите auth-setup.spec.ts`
    );
  }

  const stats = fs.statSync(authFile);
  if (stats.size < 100) {
    console.error(
      `❌ Файл авторизации поврежден: ${authFile} (${stats.size} байт)`
    );
    throw new Error(
      `Файл авторизации поврежден. Запустите auth-setup.spec.ts повторно`
    );
  }

  console.log(`✅ Файл авторизации найден: ${authFile} (${stats.size} байт)`);
  return authFile;
}

export { expect };
