import { chromium, FullConfig } from "@playwright/test";
import path from "path";
import fs from "fs";

const authFile = path.join(__dirname, "playwright/.auth/user.json");
const AUTH_FILE_TTL = 24 * 60 * 60 * 1000; // 24 часа в миллисекундах

async function globalSetup(config: FullConfig) {
  console.log("🔧 Запуск глобальной настройки авторизации");

  const authDir = path.join(__dirname, "playwright/.auth");

  // Создаем директорию, если она не существует
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
    console.log(`✅ Создана директория: ${authDir}`);
  }

  // Проверяем существующий файл авторизации и его актуальность
  if (fs.existsSync(authFile)) {
    const stats = fs.statSync(authFile);
    const fileAge = Date.now() - stats.mtimeMs;

    // Если файл существует и не старше 24 часов, пропускаем авторизацию
    if (fileAge < AUTH_FILE_TTL) {
      console.log(
        `✅ Найден актуальный файл авторизации (${Math.round(
          fileAge / 60000
        )} минут)`
      );
      return;
    } else {
      console.log(
        `⚠️ Файл авторизации устарел (${Math.round(
          fileAge / 60000
        )} минут), требуется обновление`
      );
    }
  } else {
    console.log("ℹ️ Файл авторизации не найден, выполняем авторизацию");
  }

  const email = process.env.TEST_EMAIL;
  const password = process.env.TEST_PASSWORD;
  const baseUrl = process.env.BASE_URL || "https://sila-danila.ru";

  if (!email || !password) {
    console.error("❌ TEST_EMAIL или TEST_PASSWORD не установлены в .env");
    return;
  }

  console.log(`🔑 Запуск авторизации для пользователя: ${email}`);
  console.log(`🌐 URL: ${baseUrl}`);

  // Максимальное количество попыток авторизации
  const maxRetries = 3;
  let attempt = 0;
  let success = false;

  while (attempt < maxRetries && !success) {
    attempt++;
    console.log(`🔄 Попытка авторизации ${attempt}/${maxRetries}`);

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
      // Авторизация
      const loginUrl = `${baseUrl}/auth/login`;
      await page.goto(loginUrl, { timeout: 30000 });
      await page.waitForLoadState("networkidle");

      await page.getByRole("textbox", { name: "Email" }).fill(email);
      await page.getByRole("textbox", { name: "Password" }).fill(password);
      await page.getByRole("button", { name: "Login" }).click();

      // Проверка успешной авторизации
      await page.waitForSelector("text=You have successfully logged", {
        timeout: 10000,
      });

      // Сохранение состояния
      await context.storageState({ path: authFile });

      if (fs.existsSync(authFile)) {
        const size = fs.statSync(authFile).size;
        console.log(
          `✅ Авторизация успешна! Сохранено состояние (${size} байт)`
        );
        success = true;
      } else {
        throw new Error("Файл состояния не был создан");
      }
    } catch (error) {
      console.error(`❌ Ошибка при попытке ${attempt}:`, error);
      if (attempt === maxRetries) {
        console.error("⛔ Все попытки авторизации исчерпаны");
      }
    } finally {
      await browser.close();
    }
  }

  if (!success) {
    console.error("⛔ Не удалось выполнить авторизацию");
  }
}

export default globalSetup;
